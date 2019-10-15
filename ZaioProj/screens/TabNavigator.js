import React, {Component} from 'react';

import { Image } from 'react-native';

import { createBottomTabNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './Home.js';
import Login from './Login.js';
import Register from './Registration.js';
import Profile from './Profile.js';
import Create from './CreateProperty.js';
import List from './ListProperties.js';
import Edit from './EditProperty.js';

const ProfileTab = createStackNavigator(
  {
    Profile: Profile ,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#0091EA',
      },
      headerTintColor: '#fff',
      title: 'Home Tab',
     
    },
  }
);

const MainApp = createBottomTabNavigator(
  {
    Profile: Profile ,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Profile') {
          return (
            <Image
              source={ require('./assets/home.png') }
              style={{ width: 20, height: 20, }} />
          );
        } else {
          return (
            <Image
              source={ require('./assets/settings.png') }
              style={{ width: 20, height: 20 }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF6F00',
      inactiveTintColor: '#263238',
    },
  }
);


export default createAppContainer(MainApp);