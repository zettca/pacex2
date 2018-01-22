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
              <h3>
                <Link to={base + '/'}>PaceX</Link>
              </h3>
              <h3>
                <Link to={base + '/settings'}>Settings</Link>
              </h3>            </nav>
          </header>
          <main>
            <Route exact path={base + '/'} component={Calculator} />
            <Route path={base + '/settings'} component={Settings} />
          </main>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
