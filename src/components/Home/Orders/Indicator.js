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
            order:{}
        };
        this.db=firebase.database().ref();
    }
    componentWillMount() {
        // const {email}=this.props.auth;
        const orderRef=this.db.child('ordersRequests').orderByChild('customer').equalTo('hecmonn');
        orderRef.on('value',snap=>{
            let order=snap.val();
            this.setState({order});
        });
    }
    render () {
        const {order}=this.state;
        console.log('order indicator: ',order);
        let parsedOrder=JSON.stringify(order);
        return (
            <Link to={`orders/${parsedOrder}`}>
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
