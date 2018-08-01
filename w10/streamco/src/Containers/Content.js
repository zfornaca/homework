import React, { Component } from 'react';
import TitleList from './TitleList';
import { Route, Switch } from 'react-router-dom';

export default class Content extends Component {
  render() {
    return (
      <div className="Content">
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={props => <TitleList type="menu" {...props} />}
            />
            <Route
              exact
              path="/movie"
              component={props => <TitleList type="movie" {...props} />}
            />
            <Route
              exact
              path="/series"
              component={props => <TitleList type="series" {...props} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
