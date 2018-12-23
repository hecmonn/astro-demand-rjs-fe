import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import {getUser} from '../../actions/auth'
import {Form,FormGroup,FormControl,ControlLabel,Button,Col,Checkbox,HelpBlock} from 'react-bootstrap';


class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password:'',
            remember:false,
            loading: false,
            redirect: false
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.auth=firebase.auth();
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }
    getValidationState=()=>{
        return null;
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true})
        const {email,password}=this.state;
        // this.auth.setPersistence(this.auth.Auth.Persistence.SESSION)
        // .then(r=>{
            this.auth.signInWithEmailAndPassword(email,password)
            .then(r=>{
                console.log('login res: ',r);
                this.props.getUser(email)
                .then(r=>{
                    this.setState({loading:false,redirect:true})
                });
            })
            .catch(err=>{
                this.setState({loading:false})
                console.log('err: ',err)
            });
        // })
    }

    componentDidMount() {
        this.auth.onAuthStateChanged(user=>{
            if(user) return 1;
            else console.log('no user found');
        });
    }
    render () {
        const {redirect,email,password,loading}=this.state;
        return (
            <div>
                {!redirect?
                    <Col xs={12} sm={12} md={6} lg={6} mdOffset={3} lgOffset={3}>
                        <h1>Astro Demand Login</h1>
                        <form>
                            <FormGroup
                                controlId="formBasicText"
                                validationState={this.getValidationState()}
                                >
                                <ControlLabel>Correo electrónico</ControlLabel>
                                <FormControl
                                    type='text'
                                    name='email'
                                    value={email}
                                    placeholder='Enter text'
                                    onChange={this.handleChange}
                                    id='email'
                                    />
                                <ControlLabel>Contraseña</ControlLabel>
                                <FormControl
                                    type='password'
                                    name='password'
                                    value={password}
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                    id='psswd'
                                    />
                                <FormControl.Feedback />
                                <HelpBlock>Validation is based on string length.</HelpBlock>
                            </FormGroup>



                            <FormGroup>
                                <Col sm={10}>
                                    <Checkbox>Remember me</Checkbox>
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col sm={6}>
                                    <Button onClick={this.handleSubmit} type='submit' bsSize='sm' disabled={loading}>Sign in</Button>
                                </Col>
                            </FormGroup>
                        </form>
                    </Col>
                    :
                    <Redirect to={{pathname:'/',state:{}}} />
                }
            </div>
        )
    }
}


let mapStateToProps=state=>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,{getUser})(Auth);
