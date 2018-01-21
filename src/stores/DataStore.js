import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher';

class DataStore extends EventEmitter {
  constructor() {
    super();
    this.settings = {
      units: 'metric' || 'imperial',
      distance: 'short' || 'medium' || 'long',
    };
    this.inputs = {
      time: {
        min: 1,
        max: 10000,
        value: 2,
      },
      distance: {
        min: 1,
        max: 10000,
        value: 2,
      },
      pace: {
        min: 1,
        max: 10000,
        value: 2,
      },
    };
  }

  getInputs() {
    return this.inputs;
  }

  getInputValues() {
    return Object.keys(this.inputs).reduce((obj, input) => {
      obj[input] = this.inputs[input].value;
      return obj;
    }, {});
  }

  getSettings() {
    return this.settings;
  }

  getValue(key) {
    return this.inputs[key].value;
  }

  setValue(key, value) {
    if (this.inputs[key]) {
      this.inputs[key].value = value;
    }
  }

  calculateData(type) {
    const { time, distance, pace } = this.inputs;
    switch (type) {
      case 'time':
        time.value = pace.value * distance.value;
        break;
      case 'distance':
        distance.value = time.value / pace.value;
        break;
      case 'pace':
        pace.value = time.value / distance.value;
        break;
      default:
        break;
    }
  }

  handleAction(action) {
    console.log(action);

    switch (action.type) {
      case 'CALCULATE':
        this.setValue(action.name, action.value);
        this.calculateData(action.calcType);
        break;
      case 'SETTINGS':
        break;
      default:
        break;
    }
    this.emit('changed');
  }
}

const dataStore = new DataStore();
dispatcher.register(dataStore.handleAction.bind(dataStore));

export default dataStore;
