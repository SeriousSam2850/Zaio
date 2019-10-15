import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, StyleSheet, Dimensions, Image, AsyncStorage, Button} from 'react-native';
import deviceStorage from '../services/DeviceStorage';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { tsConstructorType } from '@babel/types';

var { height } = Dimensions.get('window');
var box_height = height / 2;
var user1 = [];
var name;
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '', 
            password: '', 
            firstname: '',
            lastname: '',
        };
        this.onRegisterPressed = this.onRegisterPressed.bind(this);
    }

    async onRegisterPressed() {
        try {
            let response = await fetch('http://178.62.11.46:21870/agents', {
               method: 'POST',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password
               }) 
            })

            let res = await response.json();
            
            if (response.status >= 200 && response.status < 300) {
                /* login automatically */
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
                       // this.storeToken(accessToken);
                    }
                } catch (error) {
                    this.setState({error: error});
                    alert(error)
                }

            } else {
                let errors = res;
                throw errors;
            }
        } catch (errors) {
            console.log('user already exists ');
            alert("user already exists");
        }

    }

    render() {
        return (
            <View style = {styles.container}>
                <View style={styles.container2}>
                    <Image source={require('../iu.png')} />
                    
                </View>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "First Name"
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    onChangeText = {(text) => this.setState({ firstname: text})}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Surname"
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    onChangeText = {(text) => this.setState({ lastname: text})}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Email"
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    onChangeText = {(text) => this.setState({ email: text})}/>

                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Password"
                    placeholderTextColor = "#4169e1"
                    autoCapitalize = "none"
                    secureTextEntry={true}
                    onChangeText = {(text) => this.setState({ password: text})}/>

                <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                        () => this.onRegisterPressed()
                    }>
                    <Text style = {styles.submitButtonText}> Register </Text>
                </TouchableOpacity>
                <Button
                    title= "Already have an account? Login"
                    onPress={() => this.props.navigation.navigate('Login')}
                />    
            </View>
        )
    }
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 0.83,
        paddingTop: 23,
    },
    container2: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        resizeMode: 'stretch',
    },
    box: {
        height: 20
    },
    box1: {
        backgroundColor: '#b0e0e6'
    },
    box2: {
        backgroundColor: '#ff0000'
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
        borderRadius: 10,
        height: 40,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 20,
        padding: 6,
        justifyContent: 'center'
    }
})
