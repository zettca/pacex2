import React from 'react';
import PropTypes from 'prop-types';

import DataStore from '../stores/DataStore';
import { updateTime } from '../actions/InputActions';

class InputTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: DataStore.getTime(),
    };
  }

  componentWillMount() {
    this.handleDataChange = this.handleDataChange.bind(this);
    DataStore.on('changed', this.handleDataChange);
  }

  componentWillUnmount() {
    DataStore.removeListener('changed', this.handleDataChange);
  }

  handleDataChange() {
    this.setState(DataStore.getTime());
  }

  handleChange(event) {
    const { value } = event.target;
    updateTime(value);
  }

  parseTime(time) {
    const f00 = (n) => (n < 10) ? '0' + n : String(n);
    const t = [time / (60 * 60), Math.floor(time / 60) % 60, time % 60].map(Math.floor);
    return t.map(f00).join(':');
  }

  render() {
    const { steps } = this.props;
    const { value } = this.state.input;
    const { max, min } = this.state.input.config;
    return (
      <section>
        <h2>Time</h2>
        <div>{this.parseTime(value)}</div>
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

InputTime.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
};

export default InputTime;
