import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Index from './Index';
import Menu from './Menu';
import Settings from './Settings';
import Calculator from './Calculator';

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <header>
            <nav>
              <Link to={'/'}>
                <h3>PaceX</h3>
              </Link>
              <Link to={'/menu'}>
                <h3>Menu</h3>
              </Link>
              <Link to={'/settings'}>
                <h3>Settings</h3>
              </Link>
            </nav>
          </header>
          <main>
            <div>
              <Route exact path='/' component={Index} />
              <Route path='/menu' component={Menu} />
              <Route path='/settings' component={Settings} />
              <Route path='/calculator/:type?' component={Calculator} />
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
