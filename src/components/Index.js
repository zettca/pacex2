import React from 'react';
import { Link } from 'react-router-dom';

class Index extends React.PureComponent {
  render() {
    return (
      <div>
        <span>Hello there, you might want to check:</span>
        <br />
        <Link to={'/menu'}>MENU</Link>
      </div>
    );
  }
}

export default Index;
