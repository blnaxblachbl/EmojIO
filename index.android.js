/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import store from './store';
import { Provider } from 'mobx-react';
import { StackNavigator } from 'react-navigation';
import { AppRegistry } from 'react-native';
import Router from './router';

export default class EmojIO extends Component {
  render() {
    return (
      <Provider {...store}>
        <Router/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('EmojIO', () => EmojIO);
