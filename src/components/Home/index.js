import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col,Row,FormControl} from 'react-bootstrap';
import {FaTruck} from 'react-icons/fa';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
import {getUser} from '../../actions/auth';
import Nav from '../Nav';
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
    componentWillMount() {
        this.props.getUser();
        console.log('this.props.auth: ',this.props.auth)
        if(!this.props.auth){
            this.setState({redirect:true})
        }
    }

    render () {
        const {redirect}=this.state;
        return (
            <div style={{backgroundColor:'white'}}>
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

export default connect(mapStateToProps,{getUser})(Home);
