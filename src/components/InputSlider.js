import React from 'react';
import PropTypes from 'prop-types';

import DataStore from '../stores/DataStore';
import { updateInput } from '../actions/InputActions';

class InputSlider extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.state = {
      units: DataStore.getUnits(),
      input: DataStore.getInput(props.name),
    };
  }

  componentWillMount() {
    DataStore.on('changed', this.updateData);
  }

  componentWillUnmount() {
    DataStore.removeListener('changed', this.updateData);
  }

  updateData() {
    this.setState(DataStore.getInput(this.props.name));
  }

  handleChange(event) {
    const { value } = event.target;
    updateInput(this.props.name, value);
  }

  render() {
    const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);
    const { name, steps, formatValue } = this.props;
    const { units } = this.state;
    const { value, config: { max, min } } = this.state.input;
    return (
      <section>
        <h3>
          {`${cap(name)} ${formatValue(value, units)}`}
        </h3>
        <input type='range'
          min={min}
          max={max}
          step={(max - min) / steps}
          value={value}
          onChange={this.handleChange.bind(this)} />
      </section>
    );
  }
}

InputSlider.propTypes = {
  name: PropTypes.string,
  steps: PropTypes.number,
  formatValue: PropTypes.func,
};

export default InputSlider;
