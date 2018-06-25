import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'semantic-ui-css/semantic.min.css';
import "video-react/dist/video-react.css";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import allReducers from './redux/store/combine-all-reducers';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(allReducers);


ReactDOM.render((
    <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
    </BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
