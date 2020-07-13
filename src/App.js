import React from 'react';
import { Switch, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';

import './App.scss';

import News from './component/news/index';

const App = () => {
  return (
    <div className="App container position-relative">
      <Switch>
        <Route exact path="/page/:number" component={News} />
        <Route exact path="/" component={News} />
      </Switch>
    </div>
  );
};

export default App;
