import { StackNavigator } from 'react-navigation';

import MainPage from './pages/main';
import LoginPage from './pages/login';

const stackNavigatorConfig = {
  initialRouteName: 'LoginPage',
};

export default StackNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  MainPage: {
    screen: MainPage,
  }
}, stackNavigatorConfig);
