import dispatcher from '../Dispatcher';

export function updateTime(value) {
  dispatcher.dispatch({
    type: 'CALCULATE',
    input: 'time',
    value,
  });
}

export function updateDistance(value) {
  dispatcher.dispatch({
    type: 'CALCULATE',
    input: 'distance',
    value,
  });
}
