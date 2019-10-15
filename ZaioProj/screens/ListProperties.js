import React, { Component } from 'react';
import {
StyleSheet,
View,
Image,
Dimensions,
Text,
TextInput,
TouchableOpacity,
Alert,
Button,
ScrollView
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

var properties = [];

export default class List extends Component {
    static navigationOptions = {
        title: 'Properties',
        headerLeft: null,
        disableBack: true
  }
    constructor(props) {
        super(props);
        this.state = {
            property: [],
            id: ''
        };
    }

    handleName = (text) => {
        this.setState({Name: text})
    }
    handleLocation = (text) => {
        this.setState({Location: text})
    }
    handlePrice = (text) => {
        this.setState({Price: text})
    }

    async getDetails() {
        try {
            let response = await fetch('http://178.62.11.46:21870/users/get', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    token: global.token
                })
            });
            let res = await response.json();
            global.email = res.email;
            global.firstname = res.firstname;
            global.lastname = res.lastname;
            if (response.status >= 200 && response.status < 300) {
            } else {
                let error = res;
                throw error;
            }
        } catch (error) {
            this.setState({error: error});
            console.log('error: ' + error);
        }
    }

    async getProperty() {
        let data = {
            method: 'POST',
            body: JSON.stringify({
                token: global.token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        fetch("http://178.62.11.46:21870/properties/get/agent/" + global.email, data)
        .then((response) => response.json())
        .then((responseJson) => {
            properties = responseJson;
             this.setState({
                 property: responseJson
             })
             //alert(JSON.stringify(responseJson[1].name));
        })
        .catch((error) => {
            console.error(error);
        })
        .done();
    }
    
    render() {
        this.getDetails()
        this.getProperty()
        return ( 
            <View>
                 <Button style={styles.submitButton}
                title= "Go to Profile"
                onPress={() =>
                        this.props.navigation.navigate('Profile')}
            />
                <View>
                <TouchableOpacity
                                style = {styles.submitButton}     
                                onPress = {
                                    () => this.props.navigation.navigate('Create')
                            }>
                            <Text style={styles.submitButtonText}> Create New Property</Text>
            </TouchableOpacity>
                </View>
                { properties.length > 0 ?
                <FlatList data={properties}
                keyExtractor={(item, index) => item._id}
                renderItem={({item}) =>
                {global.property_id = item._id;
                    return (
                        <View>
                        <View style={styles.text1} >
                            <Text> Name: {item.name} </Text>
                            <Text> Location: {item.location} </Text>
                            <Text> Price: {item.price}</Text>
                        </View>
                        
                        <TouchableOpacity
                                style = {styles.submitButton}     
                                onPress = {
                                    () =>
                                    this.props.navigation.navigate('Edit', {item: item._id, name: item.name, location: item.location, price: item.price})
                                    
                            }>
                            <Text style={styles.submitButtonText}> Edit Property</Text>
                        </TouchableOpacity>
                </View>
                    )
                    
                     }} />
                
                :
                    <Text>
                        loading...
                    </Text>
                } 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    box2: {
        flex: 0.80,
        backgroundColor: '#f5f5f5'
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
    text1: {
        margin: 15,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'white',
        borderColor: 'black',
        color: 'black',
        height: 60,
        padding: 10,
        fontSize: 35,
        justifyContent: 'center',

    },
    text2: {
        margin: 15,
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: 'white',
        borderColor: 'black',
        color: 'black',
        height: 60,
        padding: 10,
        fontSize: 35,
        justifyContent: 'center',
        textDecorationLine: 'underline'
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
});
