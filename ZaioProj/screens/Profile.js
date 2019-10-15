import React, { Component } from 'react';
      import {
        StyleSheet,
        View,
        Image,
        Dimensions,
        Text,
        AsyncStorage,
        Button
      } from 'react-native';

import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {Register} from './Registration.js'; 
export default class Profile extends Component {
          static navigationOptions = {
                title: 'Profile',
          }
          constructor(props) {
              super(props);
              this.state = {
                  firstname: global.firstname,
                  lastname: global.lastname,
                  email: global.email
              }
          }
        
          render() {
              return (
                  <ScrollView>
                  <View style={{backgroundColor: '#e6e6e6'}}>
                      <View>
                      <Image style = {styles.img} source={require("../iu-2.png")}/>
                          <View style={styles.container2}>
                              <Text style={styles.text2}>
                                  First Name
                              </Text>
                            <Text style={styles.text1}>   
                                { this.state.firstname }               
                             </Text>
                            <Text style={styles.text2}>
                                Last Name
                            </Text>
                            <Text style={styles.text1}>
                                {this.state.lastname}
                            </Text>
                            <Text style={styles.text3}>
                                Email
                            </Text>
                            <Text style={styles.text1}>
                                {this.state.email}
                            </Text>
                          </View>
                      </View>
                  </View>
                  </ScrollView>

              );
          }
      }

       const styles = StyleSheet.create({
          container: {
              flex:1,
              flexDirection: 'column'
          },
          container2: {
              justifyContent: 'center',
              alignItems: 'center',
              height: 300,
              resizeMode: 'contain',
          },
          img: {
            marginLeft: 125,
            marginTop: 50,
            height: 150,
            width: 150,
            borderRadius: 73,
            borderWidth: 1.2,
          },
          text1: {
              margin: 15,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 0.7,
              backgroundColor: '#004d66',
              color: 'white',
              height: 40,
              width: 300,
              padding: 5,
              paddingLeft: 20,
              paddingRight: 20,
              fontSize: 18
          },
          text2: {
              paddingRight:200,
              fontSize: 20,
          },
          text3: {
            paddingRight:250,
            fontSize: 20,
          },
          name: {
              color: "white",
              fontSize: 22,
              marginLeft: 110,
              marginTop: 4,
          }
      });