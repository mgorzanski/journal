import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
//import PropTypes from 'prop-types';
import history from './utils/history';
import Callback from './components/Callback';
import Header from './components/header';
import Home from './pages/home';
//import Error404 from './pages/errors/404';
import NewEntry from './pages/new-entry';
import { login, isLoggedIn, requireAuth } from './utils/AuthService';
import Login from './pages/login';

class App extends Component {
  render() {
    return (
        <Router history={history}>
          <React.Fragment>
            <Route path="/callback" component={Callback} />
            {
              ( isLoggedIn() ) ? (
                  <React.Fragment>
                    <Header />
                    <main className="main">
                      <Route exact path="/" component={Home} onEnter={requireAuth} />
                      <Route path="/new" component={NewEntry} onEnter={requireAuth} />
                      {/*<Route path="/entry/:id" component={Entry} />*/}
                    </main>
                  </React.Fragment>
              ) : ( login() )
            }
          </React.Fragment>
        </Router>
    );
  }
}

export default App;
