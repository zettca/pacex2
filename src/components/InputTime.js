import React from 'react';

class InputTime extends React.PureComponent {
  render() {
    return (
      <section>
        <h2>Time</h2>
        <input type="range" id="dist" min="100" max="50000" step="100" />
      </section>
    );
  }
}

export default InputTime;
