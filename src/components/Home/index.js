import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col,Row,FormControl} from 'react-bootstrap';
import {FaTruck} from 'react-icons/fa';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
import {getUser,initAuth} from '../../actions/auth';
import {Link,Redirect} from 'react-router-dom';
import Scheduler from './Tracker/Scheduler';
import SideBar from '../Globals/SideBar';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: 1,
            redirect: false,
        };
    }
    componentWillMount=async()=> {
        const auth=firebase.auth();
        const db=firebase.database().ref();
        auth.onAuthStateChanged(user=>{
            if(user) {
                let userRef=db.child('users').orderByChild('email').equalTo(user.email);
                return userRef.once('value',snap=>{
                    let userData=snap.val();
                    let userVals=Object.values(userData).pop();
                    let userId=Object.keys(userData).pop();
                    console.log('userId: ',userId);
                    let userObj={
                        ...userVals,
                        userId
                    }
                    this.props.initAuth(userObj);
                    // .then(r=>{
                    //     this.setState({loading:false})
                    // })
                })
            } else {
                this.setState({redirect:true})
            }
        })
    }

    render () {
        const {redirect}=this.state;
        return (
            <div>
                {!redirect?
                    <div className='home-holder'>
                        <div className='home-body'>
                            <div className='content'>
                                <Col xs={12} sm={12} md={7} lg={7}>
                                    <div>
                                        <Col xs={8}>
                                            <FormControl
                                                type='text'
                                                placeholder='Buscar'
                                                onChange={null}
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <Scheduler auth={this.props.auth}/>
                                        </Col>
                                    </div>
                                </Col>
                            </div>
                        </div>
                    </div>
                :
                    <Redirect to='/auth' />
                }
            </div>
        )
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps,{getUser,initAuth})(Home);
