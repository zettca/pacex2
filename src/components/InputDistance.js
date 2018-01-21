import React from 'react';

class InputDistance extends React.PureComponent {
  render() {
    return (
      <section>
        <h2>Distance</h2>
        <input type="range" id="dist" min="100" max="50000" step="100" />
      </section>
    );
  }
}

export default InputDistance;
