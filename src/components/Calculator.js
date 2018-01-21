import React from 'react';
import PropTypes from 'prop-types';

import DataStore from '../stores/DataStore';
import * as InputActions from '../actions/InputActions';
import InputSlider from './InputSlider';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    const { type } = this.props.match.params;
    const values = DataStore.getInputValues();

    this.state = {
      units: DataStore.getSettings().units,
      inputs: ['time', 'distance', 'pace'].reduce((obj, el) => {
        obj[el] = { value: values[el], enabled: type !== el };
        return obj;
      }, {}),
    };
  }

  handleChange(comp, event) {
    const { type } = this.props.match.params;
    const { value } = event.target;

    // type, key, value
    InputActions.updateValue(type, comp, value);
  }

  render() {
    const { type } = this.props.match.params;
    const { inputs } = this.state;
    const NUM_STEPS = 40;

    return (
      <div>
        {
          Object.keys(inputs)
            .sort(input => (input === type) ? -1 : 1)
            .map(input => (
              <InputSlider
                key={input}
                name={input}
                min={0}
                max={10000}
                steps={NUM_STEPS}
                value={inputs[input].value}
                enabled={inputs[input].enabled}
                onChange={this.handleChange.bind(this, input)} />))
        }
      </div>
    );
  }
}

Calculator.propTypes = {
  match: PropTypes.object,
};

export default Calculator;
