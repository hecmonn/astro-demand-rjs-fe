import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Services extends React.Component {
    render () {
        return (
                <Row style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
                    <Col xs={12} md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'purple',height:'50vh',textAlign:'center',color:'white'}}>
                            <div style={{height:'30vh'}}>

                            </div>
                            <div style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <h1>Pickup & Delivery</h1>
                                <Link to='/delivery'>Solicitar</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'purple',height:'50vh',textAlign:'center',color:'white'}}>
                            <div style={{height:'30vh'}}>

                            </div>
                            <div style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <h1>Shopping</h1>
                                <Link to='/delivery'>Solicitar</Link>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} md={3}>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundColor:'purple',height:'50vh',textAlign:'center',color:'white'}}>
                            <div style={{height:'30vh'}}>

                            </div>
                            <div style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                                <h1>Cash</h1>
                                <Link to='/delivery' style={{color:'white'}}><Button bsStyle='primary' bsSize='lg'>Solicitar</Button></Link>
                            </div>
                        </div>
                    </Col>

                </Row>
        )
    }
}

export default Services;
