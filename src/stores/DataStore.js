import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher';
import distancesConfig from '../distancesConfig';

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.settings = JSON.parse(localStorage.getItem('settings')) || {
      units: 'km' || 'mile',
      distance: 'short' || 'medium' || 'long' || 'ultra',
    };

    const configs = distancesConfig[this.settings.distance];
    this.inputs = {
      pace: {
        value: 2,
      },
      time: {
        value: 2,
        config: configs.time,
      },
      distance: {
        value: 2,
        config: configs.distance,
      },
    };
  }

  getInputs() {
    return this.inputs;
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

  getValue(key) {
    return this.inputs[key].value;
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
