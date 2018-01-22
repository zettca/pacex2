import React from 'react';
import numeral from 'numeral';

import InputPace from './InputPace';
import InputSlider from './InputSlider';

class Calculator extends React.PureComponent {
  formatTime(time) {
    return numeral(time).format('00:00:00');
  }

  formatDistance(dist, units) {
    const multi = (units === 'mile') ? 1610 : 1000;
    return (dist / multi).toFixed(1) + units;
  }

  render() {
    const NUM_STEPS = 100;

    return (
      <div>
        <div>
          <InputPace />
          <InputSlider
            name={'time'}
            steps={NUM_STEPS}
            formatValue={this.formatTime} />
          <InputSlider
            name={'distance'}
            steps={NUM_STEPS}
            formatValue={this.formatDistance} />
        </div>
      </div>
    );
  }
}

export default Calculator;
