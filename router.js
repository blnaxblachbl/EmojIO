import { StackNavigator } from 'react-navigation';

import MainPage from './pages/main';
import LoginPage from './pages/login';
import CheckPage from './pages/check';
import PlayPage from './pages/play';

const stackNavigatorConfig = {
  initialRouteName: 'LoginPage',
};

export default StackNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  MainPage: {
    screen: MainPage,
  },
  CheckPage: {
    screen: CheckPage,
  },
  PlayPage:{
    screen: PlayPage,
  }
}, stackNavigatorConfig);
