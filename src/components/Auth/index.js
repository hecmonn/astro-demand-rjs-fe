import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Redirect} from 'react-router-dom';
import {getUser} from '../../actions/auth'
import {Form,FormGroup,FormControl,ControlLabel,Button,Col,Checkbox} from 'react-bootstrap';


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
    }

    handleChange(e){
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true})
        const {email,password}=this.state;
        const auth=firebase.auth();
        auth.signInWithEmailAndPassword(email,password)
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
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user=>{
            if(user) console.log('user: ',user);
            else console.log('no user found');
        });
    }

    render () {
        const {email,password,remember,loading,redirect}=this.state;
        return(
            <div>
            {!redirect?
                <div>
                    <div>
                        <h1>Login</h1>
                    </div>
                    <Form horizontal>
                        <FormGroup controlId='formHorizontalEmail'>
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type='email' placeholder='Email' name='email' onChange={this.handleChange} value={email} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId='formHorizontalPassword'>
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type='password' placeholder='Password' name='password' onChange={this.handleChange} value={password} />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Checkbox>Remember me</Checkbox>
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.handleSubmit} type='submit' disabled={loading}>Sign in</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
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
