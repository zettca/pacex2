import React from 'react';

import DataStore from '../stores/DataStore';

class InputPace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      units: DataStore.getUnits(),
      input: DataStore.getPace(),
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
    this.setState(DataStore.getPace());
  }

  parsePace(pace) {
    const f00 = (n) => (n < 10) ? '0' + n : String(n);
    const { units } = this.state;
    const multi = (units === 'mile') ? 1610 : 1000;
    const mpk = pace * (multi / 60);

    return [mpk, (mpk % 1) * 60].map(Math.floor).map(f00).join(':') + '/' + units;
  }

  render() {
    const { value } = this.state.input;
    return (
      <section>
        <h2>Pace</h2>
        <div>{this.parsePace(value)}</div>
      </section>
    );
  }
}

export default InputPace;
