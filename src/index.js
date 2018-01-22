import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';
import './styles/inputs.css';
import './styles/classes.css';
import App from './components/App';
import registerServiceWorker from './sw';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
