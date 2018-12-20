import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import isEmpty from 'is-empty';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Indicator extends React.Component {
    constructor(props){
        super(props);
        this.state={
            order:{},
            orderId:0
        };
        this.db=firebase.database().ref();
    }
    componentWillMount() {
        // const {email}=this.props.auth;
        const orderRef=this.db.child('ordersRequests').orderByChild('customer').equalTo('hecmonn');
        orderRef.on('value',snap=>{
            let order=snap.val();
            let orderId=!isEmpty(order) && String(Object.keys(order).pop());
            this.setState({orderId,order});
        });
    }
    render () {
        const {orderId,order}=this.state;
        // let orderId=1;
        // let orderId=String(Object.keys(order)).pop();
        console.log('orderId Indicator: ',orderId);
        return (
            <Link to={{pathname:`/tracking/${orderId}`,state:{order}}}>
                <div style={{backgroundColor:'yellow'}}>
                    {!isEmpty(order) &&
                        <Col xs={12} sm={12} md={12} lg={12}>
                            <h1>You have an order</h1>
                        </Col>
                    }
                </div>
            </Link>
        )
    }
}

export default Indicator;
