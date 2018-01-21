import React from 'react';
import PropTypes from 'prop-types';

import DataStore from '../stores/DataStore';

class InputSlider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: DataStore.getValue(props.name),
    };
  }

  componentWillMount() {
    DataStore.on('changed', () => {
      const { name } = this.props;
      this.setState({ value: DataStore.getValue(name) });
    });
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  render() {

    const cap = str => str.charAt(0).toUpperCase() + str.slice(1);
    const { onChange, steps, enabled, name, min, max } = this.props;
    const { value } = this.state;
    return (
      <section>
        <h2>{cap(name)}</h2>
        <div>{value}</div>
        {enabled &&
          <input
            type='range'
            name={name}
            min={min}
            max={max}
            step={(max - min) / steps}
            value={value}
            onChange={onChange} />}
      </section>
    );
  }
}

InputSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  steps: PropTypes.number,
  name: PropTypes.string,
  enabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputSlider;
