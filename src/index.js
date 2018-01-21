import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import './inputs.css';
import './classes.css';
import App from './components/App';
import registerServiceWorker from './sw';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
