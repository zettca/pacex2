import React from 'react';
import PropTypes from 'prop-types';

import DataStore from '../stores/DataStore';
import { updateDistance } from '../actions/InputActions';

class InputDistance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: DataStore.getUnits(),
      input: DataStore.getDistance(),
    };
  }

  componentWillMount() {
    DataStore.on('changed', () => {
      this.setState(DataStore.getDistance());
    });
  }

  handleChange(event) {
    const { value } = event.target;
    updateDistance(value);
  }

  parseDistance(dist) {
    const { units } = this.state;
    const multi = (units === 'mile') ? 1610 : 1000;
    return (dist / multi).toFixed(1) + `${units}s`;
  }

  render() {
    const { steps } = this.props;
    const { value } = this.state.input;
    const { max, min } = this.state.input.config;
    return (
      <section>
        <h2>Distance</h2>
        <div>{this.parseDistance(value)}</div>
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

InputDistance.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
};

export default InputDistance;
