import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import PropTypes from 'prop-types';
import Header from './components/header';
import Home from './pages/home';
import Error404 from './pages/errors/404';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <main className="main">
            <Route exact path="/" component={Home} />
          </main>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
