import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';
import UploadPage from './UploadPage';
var apiBaseUrl = "http://139.59.206.3/";


class Login extends Component {

  constructor(props){
    super(props);
    var localloginComponent=[];

    localloginComponent.push(
      <MuiThemeProvider key={"theme"}>
        <div>
         <TextField
           hintText="Enter your email"
           floatingLabelText="Email"
           onChange={(event,newValue) => this.setState({email:newValue})}
           />
         <br/>
           <TextField
             type="password"
             hintText="Enter your Password"
             floatingLabelText="Password"
             onChange = {(event,newValue) => this.setState({password:newValue})}
             />
           <br/>
           <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
       </div>
       </MuiThemeProvider>
    )

    this.state={
      email:'',
      password:'',
      menuValue:1,
      loginComponent:localloginComponent,
      loginRole:'customer'
    }

  }
  componentWillMount(){
  // console.log("willmount prop values",this.props);
  if(this.props.role != undefined){
    if(this.props.role == 'customer'){
      console.log("in customer componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:1,loginComponent:localloginComponent,loginRole:'customer'})
    }
    else if(this.props.role == 'agent'){
      console.log("in agent componentWillMount");
      var localloginComponent=[];
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             floatingLabelText="Email"
             onChange={(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange={(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
      this.setState({menuValue:2,loginComponent:localloginComponent,loginRole:'agent'})
    }
  }
  }

  handleClick(event){
    var self = this;
    var payload={
      "email":this.state.email,
	    "password":this.state.password,
      "role":this.state.loginRole
    }

    axios.post('http://139.59.206.3:80/'+this.state.loginRole+'s/authentication', {
      "email": payload.email,
      "password": payload.password
    })
   .then(function (response) {
     console.log(response);
     if(response.status == 200){
     console.log("Login successfull");
     //  var uploadScreen=[];
     //  uploadScreen.push(<UploadPage appContext={self.props.appContext} role={self.state.loginRole}/>)
     //  self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
     }
     else if(response.status == 204){
      console.log("Username password do not match");
      alert(response.data.success)
     } else {
        console.log("Username does not exist");
       alert("Username does not exist");
     }
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  handleMenuChange(value){
    console.log("menuvalue",value);
    var loginRole;
    if(value==1){
      var localloginComponent=[];
      loginRole='user';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({email:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }
    else if(value == 2){
      var localloginComponent=[];
      loginRole='agent';
      localloginComponent.push(
        <MuiThemeProvider>
          <div>
           <TextField
             floatingLabelText="Email"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      )
    }

    this.setState({menuValue:value,
                   loginComponent:localloginComponent,
                   loginRole:loginRole})
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
        <div>
        <p></p>
        <p>Login as:</p>
        <DropDownMenu value={this.state.menuValue} onChange={(event,index,value)=>this.handleMenuChange(value)}>
          <MenuItem value={1} primaryText="User" />
          <MenuItem value={2} primaryText="Agent" />
        </DropDownMenu>
        </div>
        </MuiThemeProvider>
        {this.state.loginComponent}
      </div>
    );
  }
}

const style = {
  margin: 15,
};

export default Login;
