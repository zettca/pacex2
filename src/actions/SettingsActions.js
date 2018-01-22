import dispatcher from '../Dispatcher';

export function changeUnits(value) {
  dispatcher.dispatch({
    type: 'SETTINGS',
    input: 'units',
    value,
  });
}

export function changeDistance(value) {
  dispatcher.dispatch({
    type: 'SETTINGS',
    input: 'distance',
    value,
  });
}
