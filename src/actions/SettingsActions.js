import dispatcher from '../Dispatcher';

export function changeUnitsMetric() {
  dispatcher.dispatch({
    type: 'SETTINGS',
    input: 'units',
    value: 'km',
  });
}

export function changeUnitsImperial() {
  dispatcher.dispatch({
    type: 'SETTINGS',
    input: 'units',
    value: 'mile',
  });
}

export function changeDistance(value) {
  dispatcher.dispatch({
    type: 'SETTINGS',
    input: 'distance',
    value,
  });
}
