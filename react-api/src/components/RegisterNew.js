import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './LoginNew';
import { black } from 'material-ui/styles/colors';

class Register extends Component {
  constructor(props){
    super(props);
    this.state={
      first_name:'',
      last_name:'',
      email:'',
      password:''
    }
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps",nextProps);
  }

  handleClick(event,role){
    var apiBaseUrl = "http://139.59.206.3/";
    // console.log("values in register handler",role);
    var self = this;
    //To be done:check for empty values before hitting submit
    if(this.state.first_name.length>0 && this.state.last_name.length>0 && this.state.email.length>0 && this.state.password.length>0){

      var payload={
      "firstname": this.state.first_name,
      "lastname":this.state.last_name,
      "email":this.state.email,
      "password":this.state.password
      //"role":role
      }

      axios.post(apiBaseUrl+'customers', payload)
     .then(function (response) {
       console.log(response);
       if(response.status === 201){
        console.log("registration successfull");
         var loginscreen=[];
         loginscreen.push(<Login parentContext={this} appContext={self.props.appContext} role={role}/>);
         var loginmessage = "Not Registered yet.Go to registration";

         self.props.parentContext.setState({
            loginscreen:loginscreen,
            loginmessage:loginmessage,
            buttonLabel:"Register",
            isLogin:false
          });

       }else if (response.status === 409) {
        alert("Username/email exists");
       } else{
         console.log("some error ocurred",response.data.code);
       }
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    else{
      alert("Input field value is missing");
    }

  }
  render() {
    // console.log("props",this.props);
    var userhintText,userLabel;
    if(this.props.role === "user"){
      userhintText="Enter email";
      userLabel="Email";
    }
    else{
      userhintText="Enter email";
      userLabel="email";
    }
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <h1>Register</h1>
           <TextField
             hintText="Enter your First Name"
             floatingLabelText="First Name"
             onChange = {(event,newValue) => this.setState({first_name:newValue})}
             />
           <br/>
           <TextField
             hintText="Enter your Last Name"
             floatingLabelText="Last Name"
             onChange = {(event,newValue) => this.setState({last_name:newValue})}
             />
           <br/>
           <TextField
             hintText={userhintText}
             floatingLabelText={userLabel}
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
           <TextField
             type = "password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style}  onClick={(event) => this.handleClick(event,this.props.role)}/>
          </div>
         </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
  margin: 15, 
};



export default Register;
