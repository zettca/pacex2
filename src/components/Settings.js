import React from 'react';
import { RadioGroup, ReversedRadioButton } from 'react-radio-buttons';

import DataStore from '../stores/DataStore';
import { changeUnits, changeDistance } from '../actions/SettingsActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = DataStore.getSettings();
  }

  handleChangeUnits(option) {
    changeUnits(option);
  }

  handleChangeDistance(option) {
    changeDistance(option);
  }

  render() {
    const { units, distance } = this.state;
    const makeRadio = (value, label) => {
      return (<ReversedRadioButton
        value={value}
        padding={0}
        rootColor={'#212121'}
        pointColor={'#009688'}>
        {label}
      </ReversedRadioButton>);
    };

    return (
      <div>
        <section>
          <h2>Units</h2>
          <RadioGroup horizontal
            value={units}
            onChange={this.handleChangeUnits}>
            {makeRadio('km', 'Metric')}
            {makeRadio('mi', 'Imperial')}
          </RadioGroup>
        </section>
        <section>
          <h2>Distance</h2>
          <RadioGroup horizontal
            value={distance}
            onChange={this.handleChangeDistance}>
            {makeRadio('medium', 'Medium')}
            {makeRadio('long', 'Long')}
            {makeRadio('ultra', 'Ultra')}
          </RadioGroup>
        </section>
      </div>
    );
  }
}

export default Settings;
