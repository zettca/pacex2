import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.PureComponent {
  render() {
    return (
      <div className='flex'>
        <Link to={'/calculator/time'} className='menu-item'>
          <span>Calculate Time</span>
        </Link>
        <Link to={'/calculator/distance'} className='menu-item'>
          <span>Calculate Distance</span>
        </Link>
        <Link to={'/calculator/pace'} className='menu-item'>
          <span>Calculate Pace</span>
        </Link>
        <Link to={'/calculator/'} className='menu-item'>
          <span>Calculate Everything</span>
        </Link>
      </div>
    );
  }
}

export default Menu;
