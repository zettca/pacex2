import React from 'react';

import InputPace from './InputPace';
import InputTime from './InputTime';
import InputDistance from './InputDistance';

class Calculator extends React.PureComponent {
  render() {
    const NUM_STEPS = 40;

    return (
      <div>
        <InputTime steps={NUM_STEPS} />
        <InputDistance steps={NUM_STEPS} />
        <InputPace />
      </div>
    );
  }
}

export default Calculator;
