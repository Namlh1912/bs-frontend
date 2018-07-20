import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/form.css'

const user = {
  username: 'namlh1912',
  password: 'abcdef',
}

class Login extends React.Component {

  handleUserLogin = (e) =>{
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;

    if(username === user.username && password === user.password){
      console.log('correct');
    }
  }

  render(){
    return(
      <div className="container form-wrapper">
        <div id="login-form">
          <h3><Glyphicon glyph="lock" /> Login</h3>
          <form onSubmit={this.handleUserLogin}>
            <FormGroup controlId="Username">
              <ControlLabel className="text"> Username</ControlLabel>
              <FormControl
                type="text"
                inputRef={ref=>{this.username = ref ;}}
              />
            </FormGroup>
            <FormGroup controlId="Password">
              <ControlLabel className="text">
                Password
              </ControlLabel>
              <FormControl
                type="password"
                inputRef={ref=>{this.password = ref ;}}
              />
            </FormGroup>
            <div style={{textAlign:'center'}}>
              <Button type="submit" bsClass="btn submit" >Submit</Button>
            </div>
          </form>
          <div className="login-footer">
            <p>Forgot <Link to="#">Password?</Link> </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;