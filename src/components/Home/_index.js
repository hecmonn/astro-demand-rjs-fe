import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid,Col,Row,Carousel} from 'react-bootstrap';
import {FaTruck} from 'react-icons/fa';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
import {getUser} from '../../actions/auth';
import Nav from '../Nav';
import {Link} from 'react-router-dom';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: 1
        };
    }
    componentWillMount() {
        const localAuth=JSON.parse(localStorage.getItem('AUTH'));
        if(localAuth!==null){
            let {email}=localAuth;
            this.props.getUser(email)
            .then(r=>{
                this.setState({loading:false})
            })
        } else {
            console.log('Not logged...');
        }
    }

    componentDidMount() {
        // const rootRef=firebase.database().ref('users').orderByChild('email').equalTo('hector@heyastro.co');
        // rootRef.on('value',snapshot=>{
        //     const {fname,lname,email}=snapshot.val();
        //     console.log('snap: ',snapshot.val());
        //     console.log('snap exist: ',snapshot.exists());
        // });
    }
    render () {
        console.log('auth props: ',this.props.auth)
        return (
            <div className='home-holder'>
                    <div className='home-header'>
                        <Nav />
                    </div>
                    <div className='home-body'>
                        <div className='banner' >

                        </div>
                        <div className='content'>
                            <Grid fluid={true}>
                                <Row className='show-grid'>
                                    <Col xs={12} sm={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
                                        <div className='service-holder' >
                                            <div className='service-description'>
                                                <FaTruck size={25} className='icon-lg' />
                                                <h4 className='header'> Errands</h4> <br />
                                                <h4 className='extra'>state:  {this.state.user}</h4>
                                                <h4 className='extra'><Link to='/errands'>Go</Link></h4>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={12} sm={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
                                        <div className='service-holder' >
                                            <div className='service-description'>
                                                <FaTruck size={25} />
                                                <h4 className='header'> Pick-up & Delievery</h4> <br />
                                                <h4 className='extra'><Link to='/delivery'>Go</Link></h4>
                                            </div>
                                        </div>
                                    </Col>

                                    <Col xs={4} sm={4} md={4}>
                                        <h1>h4 3</h1>
                                    </Col>
                                </Row>

                                <Row className='show-grid'>
                                    <Col md={4} mdOffset={4}>
                                        <h1>h4 2</h1>
                                    </Col>

                                    <Col md={4}>
                                        <h1>h4 3</h1>
                                    </Col>
                                </Row>
                            </Grid>
                        </div>
                    </div>

                    <div className='home-footer'></div>
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
