function makeConfig(label, value) {
  return { label, value };
}

const distancesConfig = {
  short: {
    time: {
      min: 3 * 60,
      max: 20 * 60,
      buttons: [makeConfig('10s', 10)]
    },
    distance: {
      min: 1 * 1000,
      max: 4 * 1000,
      buttons: []
    }
  },
  medium: {
    time: {
      min: 12 * 60,
      max: 60 * 60,
      buttons: []
    },
    distance: {
      min: 4 * 1000,
      max: 10 * 1000,
      buttons: []
    }
  },
  long: {
    time: {
      min: 30 * 60,
      max: 4 * 60 * 60,
      buttons: []
    },
    distance: {
      min: 10 * 1000,
      max: 42.2 * 1000,
      buttons: []
    }
  },
  ultra: {
    time: {
      min: 2 * 60 * 60,
      max: 24 * 60 * 60,
      buttons: []
    },
    distance: {
      min: 42.2 * 1000,
      max: 100 * 1000,
      buttons: []
    }
  },
};

export default distancesConfig;
