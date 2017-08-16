import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Router from 'react-router-dom/Route';
import Provider from 'react-redux/lib/components/Provider';
import configureStore from '../redux/configureStore';
const store = configureStore();

const RouteApp = (
  <Provider store={store}>
    <BrowserRouter>
      <Router render={({ history }) => (
          <App history={history}/>
        )} />
    </BrowserRouter>
  </Provider>
)
ReactDOM.render(RouteApp, document.getElementById('react-view'));
