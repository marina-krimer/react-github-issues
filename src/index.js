import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'

//ReactDOM.render(ЧТО ВЫВОДИТЬ, КУДА ВЫВОДИТЬ)
ReactDOM.render(<App />, document.getElementById('root'));

// const appRoot = document.getElementById('root');
// const modalRoot = document.getElementById('modal-root');

// ReactDOM.render(<App />, appRoot);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();