import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home.js';
import Login from './Login.js';
import Register from './Registration.js';
import Profile from './Profile.js';
import Create from './CreateProperty.js';
import List from './ListProperties.js';
import Edit from './EditProperty.js';

const NavStack = createStackNavigator({
  Home: { screen: Home },
  Login: {screen: Login},
  Profile: {screen: Profile},
  Register: {screen: Register},
  Edit: {screen: Edit},
  List: {screen: List},
  Create: {screen: Create}
},
  {
    initialRouteName: 'Home'
  }
);

const AppNavigator = createAppContainer(NavStack);

export default AppNavigator;