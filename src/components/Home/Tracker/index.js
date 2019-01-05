import React from 'react';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Grid,Row,Col,Button} from 'react-bootstrap';
import isEmpty from 'is-empty';
import  Nav from '../../Nav';
import Map from './Map';
import CashDesc from './Descriptions/CashDesc';
import ShoppingDesc from './Descriptions/Shopping';
import DeliveryDesc from './Descriptions/Delivery';
import {FaCheckCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom';

class Tracker extends React.Component {
   constructor(props){
      super(props);
      this.state={
         orderDetails:{
            pickUp:{
               place:'',
               contactName:'',
               contactPhone:'',
               instructions:'',
               _status: 0
            },
            delivery:[],
            _status:0,
            type:''
         },
         currentTask: 1,
         coords:{
            latitude:0,
            longitude:0
         }
      };
      this.db=firebase.database().ref();
   }
   componentWillMount() {
      let  {order}=this.props.match.params;
      // console.log('match props: ',this.props.match.params);
      // let parsedOrder=JSON.parse(order);
      // const orderId=String(Object.keys(parsedOrder).pop());
      const astroLoc=this.db.child(`ordersScheduled/${order}/coords`);
      astroLoc.on('value',snap=>{
         let coords=snap.val();
         if (!isEmpty(coords)) this.setState({coords});
      });
      const ordersRef=this.db.child(`orders/${order}`);
      ordersRef.on('value',snap=>{
         let order=snap.val();
         this.setState({orderDetails:order});
      });
   }
   serviceDescription=()=>{
      const {orderDetails}=this.state;
      switch (orderDetails.type) {
         case 'delivery': return <DeliveryDesc tasks={orderDetails} />;
         case 'cash': return <CashDesc tasks={orderDetails} />
         case 'shopping': return <ShoppingDesc tasks={orderDetails} />;
         default: return null;
      }
   }

   render () {
      const {orderDetails,currentTask,coords}=this.state;
      const {pickUp}=orderDetails;
      return (
         <div style={{height:'100vh',overflow:'scroll'}}>
            <Col xs={12} md={6}>
               <h2>Rastreo de {orderDetails.type}</h2>
               <Grid>
                  <Row>
                     <Col xs={12} md={6}>
                        <Row style={{paddingBottom:15}}>
                           <Col xs={2}>
                              <FaCheckCircle style={{color:'green'}} size='25'/>
                           </Col>
                           <Col xs={8}>
                              <h4>Tu orden fue recibida</h4>
                           </Col>
                        </Row>
                        <Row style={{paddingBottom:15}}>
                           <Col xs={2}>
                              <FaCheckCircle style={{color:orderDetails._status==1?'green':'gray'}} size='25'/>
                           </Col>
                           <Col xs={8}>
                              <h4>{orderDetails._status==0?'Tu orden está siendo asignada':`Tu orden fue asignada a ${orderDetails.astroName}`}</h4>
                           </Col>
                           {/*<Col xs={2}>
                              <h5>Evidence</h5>
                           </Col>*/}
                        </Row>
                     <div>
                        {this.serviceDescription()}
                     </div>
                     <Row style={{paddingBottom:15}}>
                        <Col xs={2}>
                           <FaCheckCircle style={{color:orderDetails._status==3?'green':'gray'}} size='25'/>
                        </Col>
                        <Col xs={8}>
                           <h4>Tu orden fue completada</h4>
                        </Col>
                     </Row>
                  </Col>
                  <Col xs={12} md={5} >
                     <Map coords={coords} />
                  </Col>
               </Row>
            </Grid>
         </Col>
      </div>
   )
}
}

export default Tracker;
