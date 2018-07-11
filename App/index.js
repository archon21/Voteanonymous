import React from 'react';

import { Provider } from 'react-redux';
import { Login, SignUpP1, SignUpP2, SignUpP3, Vote } from './components/index';
import Root from './Root';
import store from './store';
import { createStackNavigator } from 'react-navigation';

const AppNavigator = createStackNavigator(
  {
    Root: { screen: Root },
    Login: { screen: Login },
    SignUpP1: { screen: SignUpP1 },
    SignUpP2: { screen: SignUpP2 },
    SignUpP3: { screen: SignUpP3 },
    Vote: {screen: Vote}
  },
  {
    initialRouteName: 'Root',
    headerMode: 'none'
  }
);
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
