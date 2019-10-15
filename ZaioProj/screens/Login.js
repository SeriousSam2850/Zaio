import React, { Component } from 'react';
import { AsyncStorage, Text, TextInput, View, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';
import deviceStorage from '../services/DeviceStorage';
import { formatPrettyObject } from 'jest-validate/build/utils';
const ACCESS_TOKEN = 'access_token';
import StackLayout from './Profile.js';
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

class Login extends Component {
    static navigationOptions = {
        title: 'Login',
    }
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.loginUser = this.loginUser.bind(this);
    }
    async storeToken(accessToken) {
        try {
            await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
            this.getToken();
        } catch (error) {
            console.log('something went wrong')
        }
    }

    async getToken(accessToken) {
        try {
            let token = await AsyncStorage.getItem(ACCESS_TOKEN);
            console.log('token is: ' + token);
        } catch (error) {
            console.log('something went wrong')
        }
    }

    handleEmail = (text) => {
        this.setState({ email: text })
    }
    handlePassword = (text) => {
        this.setState({ password: text })
    }

    async loginUser() {
        try {
            let response = await fetch('http://178.62.11.46:21870/agents/authentication', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            });
            let res = await response.json();
            global.token = res.token;
            if (response.status >= 200 && response.status < 300) {
                this.props.navigation.navigate('List');
                this.setState({error: ""});
                let accessToken = res.token;
                this.storeToken(accessToken);
            } else {
                let error = res;
                alert('incorrect email or password');
                throw error;
            }
        } catch (error) {
            this.setState({error: error});
            alert('incorrect email or password');
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <View style = {styles.container}>
                <View style={styles.container2}>
                    <Image source={require('../iu.png')} />
                </View>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    value = {email}
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    onChangeText = {email => this.setState({ email })}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    value = {password}
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    secureTextEntry={true}
                    onChangeText = {password => this.setState({ password })}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.loginUser()
                    }>
                    <Text style = {styles.submitButtonText}> Login </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login

const styles = StyleSheet.create({
    container: {
        paddingTop: 23
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        resizeMode: 'contain',
    },
    input: {
        margin: 15,
        height: 40,
        borderWidth: 1.3,
        borderColor: '#000000',
        padding: 12,
        borderRadius: 6,
        fontSize: 14
    },
    submitButton: {
        backgroundColor: '#004d66',
        height: 10,
        margin: 15,
        height: 40,
        borderRadius: 10
    },
    submitButtonText: {
        color: 'white',
        fontSize: 20,
        padding: 6,
        justifyContent: 'center'
    }
})
