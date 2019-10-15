import React, { Component, Fragment } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TouchableOpacity
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './screens/Login.js';
import Register from './screens/Registration.js';
import Profile from './screens/Profile.js';
import Create from './screens/CreateProperty.js';
import List from './screens/ListProperties.js';
import AppNavigator from './screens/AppNavigator.js';
import { ScrollView } from 'react-native-gesture-handler';
import deviceStorage from './services/DeviceStorage.js';

global.token;
global.email;
global.firstname;
global.lastname;
global.property_id;

/*class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.buttons}>
        <TouchableOpacity 
                    style = {styles.submitButton}
                    onPress={() => this.props.navigation.navigate('Details')}>
                    <Text style = {styles.submitButtonText}> Login </Text>
        </TouchableOpacity>

        <TouchableOpacity
                    style = {styles.submitButton}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style = {styles.submitButtonText}> Register </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class RegisterScreen extends React.Component {
  render() {
    return (
      <ScrollView>
      <Fragment>
      <Register />
        <Button
            title= "Already have an account? Login"
            onPress={() => this.props.navigation.navigate('Details')}
        />        
       </Fragment>
       </ScrollView>
    );
  }
}

class ProfileScreen extends React.Component {
    render() {
        return (
          <ScrollView>
            <Fragment>
              <StackLayout />
              <View style={styles.profile}>
              <Button 
                    title="Add new property"
                    onPress={() => this.props.navigation.navigate('CreateProperty')}
                />
                <Button
                    title="Properties"
                    onPress={() => this.props.navigation.navigate('ListProperties')}
                />
              </View>
                
              </Fragment>
            </ScrollView>
        )
    }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <ScrollView>
          <Fragment>
            <Login />
            <Button style={styles.submitButton}
                title= "Login"
                onPress={() =>
                        this.props.navigation.navigate('Profile')}
            />
        </Fragment>
      </ScrollView>
    
    );
  }
}

class CreateProperty extends React.Component {
    render() {
        return (
          <ScrollView>
                <Fragment>
                <Create />
            </Fragment>
          </ScrollView>
            
        )
    }
}

class ListProperties extends React.Component {  
      render() {
        return (
          <ScrollView>
              <Fragment>
                <List />
              </Fragment>
          </ScrollView>
          
        )
      }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    } ,
    Details: {
      screen: DetailsScreen
    },
    Profile: {
    screen: ProfileScreen
    },
    CreateProperty: {
    screen: Create
    },
    ListProperties: {
      screen: ListProperties
    },
    Register: {
      screen: RegisterScreen
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);*/

export default class App extends React.Component {
  render() {
    //return <AppContainer />;
    return (
      <AppNavigator />
    )
  }
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  submitButton: {
    backgroundColor: '#004d66',
    height: 10,
    margin: 15,
    borderRadius: 10,
    height: 40,
},
submitButtonText: {
    color: 'white',
    fontSize: 20,
    padding: 6,
    justifyContent: 'center'
},
  container: {
      flex: 0.5,
      height: '100%',
      width: '100%',
      justifyContent: "center",
      alignItems: "center",
  },
  headerText: {
      fontSize: 20,
      textAlign: "center",
      fontWeight: "bold",
      margin: 10
  },
  profile: {
    backgroundColor: '#e6e6e6',
    height:620,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  buttons: {
      paddingTop: '50%',
      paddingBottom: '50%',
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  text1: {
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6e6e6',
    borderWidth: 0.7,
    color: 'white',
    height: 40,
    width: 300,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 18
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
})

