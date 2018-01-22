import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher';
import { distances } from './dataConfig';

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.settings = JSON.parse(localStorage.getItem('settings')) || {
      units: 'km' || 'mi',
      distance: 'medium' || 'long' || 'ultra',
    };

    const { time, distance } = distances[this.settings.distance];
    this.inputs = {
      pace: {
        value: 1,
      },
      time: {
        config: time,
        value: this.midPoint(time.max, time.min),
      },
      distance: {
        config: distance,
        value: this.midPoint(distance.max, distance.min),
      },
    };
  }

  getPace() {
    return this.inputs.pace;
  }

  getTime() {
    return this.inputs.time;
  }

  getDistance() {
    return this.inputs.distance;
  }

  getUnits() {
    return this.settings.units;
  }

  getSettings() {
    return this.settings;
  }

  getInput(key) {
    return key ? this.inputs[key] : this.inputs;
  }

  setValue(key, value) {
    if (this.inputs[key]) {
      this.inputs[key].value = value;
    }
  }

  setUnits(units) {
    this.settings.units = units;
  }

  setDistance(distance) {
    this.settings.distance = distance;
    this.updateDistances();
  }

  updateDistances() {
    const { time, distance } = this.inputs;
    const configs = distances[this.settings.distance];
    time.config = configs.time;
    time.value = this.midPoint(configs.time.min, configs.time.max);
    distance.config = configs.distance;
    distance.value = this.midPoint(configs.distance.min, configs.distance.max);
  }

  updatePace() {
    const { time, distance, pace } = this.inputs;
    pace.value = time.value / distance.value;
  }

  midPoint(min, max) {
    return min + Math.floor((max - min) / 2);
  }

  handleAction(action) {
    switch (action.type) {
      case 'CALCULATE':
        this.setValue(action.input, action.value);
        this.updatePace();
        break;
      case 'SETTINGS':
        if (action.input === 'units') this.setUnits(action.value);
        if (action.input === 'distance') this.setDistance(action.value);

        localStorage.setItem('settings', JSON.stringify(this.settings));
        break;
      default:
        break;
    }
    this.emit('changed');
  }
}

const dataStore = new DataStore();
window.STORE = dataStore;
dispatcher.register(dataStore.handleAction.bind(dataStore));

export default dataStore;
