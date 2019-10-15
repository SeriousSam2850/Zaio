
import React, { Component, Fragment } from 'react';
import { 
  Platform, 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TouchableOpacity
} from 'react-native';

export default class Home extends React.Component {
    render() {
      return (
        <View style={styles.buttons}>
          <TouchableOpacity 
                      style = {styles.submitButton}
                      onPress={() => this.props.navigation.navigate('Login')}>
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