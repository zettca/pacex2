import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Settings from './Settings';
import Calculator from './Calculator';

class App extends React.PureComponent {
  render() {
    const base = process.env.PUBLIC_URL;
    return (
      <BrowserRouter>
        <div className='App'>
          <header>
            <nav>
              <Link to={base + '/'}>
                <h3>PaceX</h3>
              </Link>
              <Link to={base + '/settings'}>
                <h3>Settings</h3>
              </Link>
            </nav>
          </header>
          <main>
            <div>
              <Route exact path={base + '/'} component={Calculator} />
              <Route path={base + '/settings'} component={Settings} />
            </div>
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
