import dispatcher from '../Dispatcher';

export function updateValue(type, name, value) {
  dispatcher.dispatch({
    type: 'CALCULATE',
    calcType: type,
    name,
    value,
  });
}


