import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import isEmpty from 'is-empty';
import  Nav from '../../Nav';

class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orderDetails:{
                pickUp:{
                    place:'',
                    contactName:'',
                    contactPhone:'',
                    instructions:''
                },
                delivery:[],
                _status:0
            },
            currentTask: 0
        };
        this.db=firebase.database().ref();
    }
    componentWillMount() {
        let  {order}=this.props.match.params;
        console.log('props match: ',this.props)
        let parsedOrder=JSON.parse(order);
        const orderId=String(Object.keys(parsedOrder).pop());
        const ordersRef=this.db.child(`orders/${orderId}`);
        ordersRef.on('value',snap=>{
            let order=snap.val();
            this.setState({orderDetails:order})
        });

        
    }
    render () {
        const {orderDetails,currentTask}=this.state;
        const {pickUp}=orderDetails;
        return (
            <div>
                <Nav />
                <h2>Rastreo de orden</h2>
                <Grid>
                    <Row style={{paddingBottom:15}}>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <h4>{orderDetails._status}</h4>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8}>
                            <h4 style={{fontWeight:'bold'}}>Orden tomada por AstroName</h4>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:15}}>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <h4>{pickUp._status}</h4>
                        </Col>
                        <Col xs={8} sm={8} md={8} lg={8}>
                            <h4 style={{fontWeight:'bold'}}>Iniciar en {pickUp.place}</h4>
                            <h4>
                                {pickUp.instructions}
                                Cualquier percance comunicate con {pickUp.contactName} al {pickUp.contactPhone}
                            </h4>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                        </Col>
                    </Row>
                    {!isEmpty(orderDetails) && orderDetails.delivery.map((r,i)=>{
                        // if (i+2==currentTask) this.currentTaskId=r.orderId;
                        return (
                            <Row key={i} style={{paddingBottom:15}}>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <h4>{r._status}</h4>
                                </Col>

                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <h4 style={{fontWeight:'bold'}}>{r.place}</h4>
                                        <h4>
                                            {r.instructions}
                                            Cualquier percance comunicate con {r.contactName} al {r.contactPhone}
                                        </h4>
                                </Col>

                                <Col xs={2} sm={2} md={2} lg={2}>
                                    {i+2==r._status &&
                                        <Button bsStyle='default' bsSize='sm'>
                                            <h3>i</h3>
                                        </Button>
                                    }
                                </Col>
                            </Row>
                        )
                    })}
                </Grid>

            </div>
        )
    }
}

export default Orders;
