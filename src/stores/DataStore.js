import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher';
import { distances } from './dataConfig';

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.settings = JSON.parse(localStorage.getItem('settings')) || {
      units: 'km' || 'mile',
      distance: 'short' || 'medium' || 'long' || 'ultra',
    };

    const putMiddle = (min, max) => min + Math.floor((max - min) / 2);
    const configs = distances[this.settings.distance];
    this.inputs = {
      pace: {
        value: 1,
      },
      time: {
        config: configs.time,
        value: putMiddle(configs.time.max, configs.time.min),
      },
      distance: {
        config: configs.distance,
        value: putMiddle(configs.distance.max, configs.distance.min),
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
  }

  updatePace() {
    const { time, distance, pace } = this.inputs;
    pace.value = time.value / distance.value;
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
