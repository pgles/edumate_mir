import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { FirebaseContext, Firebase } from './firebase';
import { Provider } from 'react-redux';
import {ConfigureStore} from './redux';
import 'bootstrap/dist/css/bootstrap.min.css'; 
console.log("USE YARN TO INSTALL PACKAGES");

const store = ConfigureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
