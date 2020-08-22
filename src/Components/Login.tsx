import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withFirebase } from '../firebase/withFirebase';
import {Firebase} from '../firebase';
import {requestLogin,receiveLogin,loginError} from '../redux';
import { Card,CardBody,CardHeader,CardTitle,Col,Row,Label,Button, Form, FormGroup,Input } from 'reactstrap';

const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const validateForm = (errors: any) => {
    let valid = true;
    Object.values(errors).forEach((val:any) => val.length > 0 && (valid = false));
    return valid;
  };

  type state = {
    email:string,
    password:string,
    errors: {
      email: string,
      password: string,
    }
};

const mapStateToProps = (state:any) => {
    return {
      
    }
}

const mapDispatchToProps = (dispatch:any) => ({
  
  
})

export class Login extends React.Component<{
    firebase: Firebase;
    recieveLogin: typeof receiveLogin;
    requestLogin: typeof requestLogin;
    loginError: typeof loginError;
},state> {
    constructor(props:any) {
        super(props);
        this.state = {
            email:'',
            password:'',
            errors: {
              email: '',
              password: '',
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event:any) {
        event.preventDefault();
        this.setState({...this.state, [event.target.name]:event.target.value});
            let errors = this.state.errors;
            switch (event.target.name) {
                case 'email': 
                errors.email = 
                    validEmailRegex.test(event.target.value)
                      ? ''
                      : 'Email is not valid!';
                  break;
                case 'password': 
                errors.password = 
                    event.target.value.length < 8
                      ? 'Password must be at least 8 characters long!'
                      : '';
                  break;
                default:
                  break;
              }
               this.setState({...this.state,errors: errors, [event.target.name]: event.target.value});
    }
    handleSubmit = async(event:any)=> {
        //alert(JSON.stringify(this.state));
        requestLogin();
        if(validateForm(this.state.errors)) {
            try
            {
            await this.props.firebase.doSignInWithEmailAndPassword(
                this.state.email.toString(),
                this.state.password.toString()
            )    
            .then(async (authUser:any) => {
                const user = await this.props.firebase.getUser(authUser.user.email);
                alert(JSON.stringify(user));
                return user;
            });
        } catch(err) {
            alert(err);
        }
        }
        else{
           alert('Invalid Form');
          }
          event.preventDefault();
    }
    render() {
        return (
            <div>
                <div className='container'>
                <div className='d-flex justify-content-center'>
                <Card className='col-md-8'>
                    <CardHeader>EduMates</CardHeader>
                    <CardBody>
                        <CardTitle className='d-flex justify-content-center'><h2>Login Form</h2></CardTitle>
                        <Form  onSubmit={this.handleSubmit}>
                        <FormGroup row>
                            <Label for="email" sm={2}>Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="email" placeholder="Enter your email id" onChange={this.handleChange}/>
                                {this.state.errors.email.length > 0 && 
                                <span className='error text-danger'>{this.state.errors.email}</span>}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="password" sm={2}>Password</Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                                {this.state.errors.password.length > 0 && 
                               <span className='error text-danger'>{this.state.errors.password}</span>}
                            </Col>
                        </FormGroup>  
                            <Col sm={10}> 
                                <Button color='primary'>Submit</Button>
                            </Col>
                        </Form>
                    </CardBody>
                </Card> 
                </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps)
  )(Login);

