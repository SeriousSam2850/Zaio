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
Button
} from 'react-native';

export default class Edit extends Component {
    static navigationOptions = {
        title: 'Edit',
  }
    constructor(props) {
        super(props);
        this.state = {
            Name: this.props.navigation.getParam('name'), 
            Location: this.props.navigation.getParam('location'), 
            Price: this.props.navigation.getParam('price'),
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

    delete = () => {
        let data = {
            method: 'DELETE',
            body: JSON.stringify({
                token: global.token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        
       fetch("http://178.62.11.46:21870/properties/" + this.props.navigation.getParam('item'), data)
       .then((response) => response.json())
       .then((responseJson) => {
            this.setState({
                data: responseJson.data,
            })
            this.props.navigation.navigate('List');
       })
       .catch((error) => {
           console.error(error);
       })
       .done();
    }

    change = () => {
        let data = {
            method: 'PATCH',
            body: JSON.stringify({
                name: this.state.Name,
                location: this.state.Location,
                price: this.state.Price,
                token: global.token
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        
       fetch("http://178.62.11.46:21870/properties/" + this.props.navigation.getParam('item'), data)
       .then((response) => response.json())
       .then((responseJson) => {
            this.setState({
                data: responseJson.data,
            })
            this.props.navigation.navigate('List');
       })
       .catch((error) => {
           console.error(error);
       })
       .done();
    }
    
    render() {
        return (
            <View style={styles.container}>
              <View style={[styles.box, styles.box2]}>
              <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Name"
                  value={this.state.Name}
                  placeholderTextColor = "#4169e1"
                  autoCapitalize = "none"
                  onChangeText = {this.handleName}/>

              <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Location"
                  value={this.state.Location}
                  placeholderTextColor = "#4169e1"
                  autoCapitalize = "none"
                  onChangeText = {this.handleLocation}/>

              <TextInput style = {styles.input}
                  underlineColorAndroid = "transparent"
                  placeholder = "Price"
                  value={this.state.Price}
                  placeholderTextColor = "#4169e1"
                  autoCapitalize = "none"
                  onChangeText = {this.handlePrice}/>
              <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.change()
                  }>
                  <Text style = {styles.submitButtonText}> Submit Changes </Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style = {styles.submitButton}
                  onPress = {
                      () => this.delete()
                  }>
                  <Text style = {styles.submitButtonText}> Delete </Text>
              </TouchableOpacity>
              </View>
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
        color: 'white',
        height: 60,
        padding: 10,
        fontSize: 35
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
