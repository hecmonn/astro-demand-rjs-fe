import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {mapsKeys} from '../../../config';
import {createOrder} from '../../../actions/orders';
import {Grid,Col,Row,ControlLabel,FormControl,FormGroup,HelpBlock,Button,Checkbox} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';
import Datetime from 'react-datetime';
import style from '../calendar_style.css';
import geostyle from '../geosuggest.css';
import Geosuggest from 'react-geosuggest';
import isEmpty from 'is-empty';

class Delivery extends React.Component {
   constructor(props){
      super(props);
      this.state={
         loading:false,
         order: {
            type:'delivery',
            date: new Date(),
            scheduled: 1,
            pickUp:{
               place: '',
               instructions:'',
               contactName:'',
               contactPhone:'',
               _status:0
            },
            delivery:[{
               place: '',
               instructions: '',
               step:1,
               contactName:'',
               contactPhone:'',
            }]
         }
      };
      this.handleChange=this.handleChange.bind(this);
      // this.handleSubmit=this.handleSubmit.bind(this);
      this.handleDateChange=this.handleDateChange.bind(this);
   }
   handleChange(e){
      let prevOrder=this.state.order;
      if (e.target.className.includes('deliveryPoint')) {
         let deliveryPoints = [...prevOrder.delivery];
         deliveryPoints[e.target.dataset.id][e.target.name] = e.target.value;
         let newOrder={
            ...prevOrder,
            delivery:deliveryPoints
         };
         this.setState({ order:{...prevOrder,delivery:deliveryPoints}});
      } else {
         this.setState({ order:{...prevOrder,pickUp:{...prevOrder.pickUp, [e.target.name]: e.target.value}}});
      }
   }
   // this.setState({[e.target.name]:e.target.value})
   getValidationState=(e)=>{
      // e.preventDefault();
   }

   handleDateChange(date){
      let prevOrder=this.state.order;
      this.setState({order:{...prevOrder,date:date._d}})
   }

   // handleSubmit(e){
   //    e.preventDefault();
   //    this.setState({loading:true});
   //    const {order}=this.state;
   //    const {userId,email,company}=this.props.auth;
   //    let orderKey=this.props.createOrder({order:{...order,type:'delivery',company},userId,email,company});
   //    this.setState({loading:false,redirect:true,orderKey});
   //    // })
   //    // .catch(err=>console.log('Err delivery: ',err));
   // }

   addPoint=()=>{
      const {delivery}=this.state.order;
      const {order}=this.state;
      delivery.push({
         step:delivery.length+1,
         place: '',
         instructions: '',
         contactName:'',
         contactPhone:'',
      });
      this.setState({order:{...order,delivery}});
   }

   removePoint=(step)=>{
      let {delivery,pickUp}=this.state.order;
      let filteredDelivery=delivery.filter(r=> step!==r.step);
      this.setState({order:{pickUp,delivery: filteredDelivery }})
   }

   componentWillMount() {
      if(!isEmpty(this.props.location.state)) this.setState({order:this.props.location.state.order});
      // const script = document.createElement('script');
      // script.src =`https://maps.googleapis.com/maps/api/js?key=${mapsKeys.apiKey}&libraries=places`;
      // script.async = true;
      // document.body.appendChild(script);
      // console.log('script: ',script);
   }
   render () {
      const {loading,redirect,order,orderKey}=this.state;
      const {pickUp,delivery}=order;
      console.log('order: ',order);
      return(
         <div style={{height:'100vh',overflow:'scroll'}}>
            {!redirect?
               <form>
                  <FormGroup
                     controlId="formBasicText"
                     validationState={this.getValidationState()}
                     >
                     <h3>¿Dónde recogemos?</h3>
                     <Col xs={12} md={6}>
                        <ControlLabel>¿A dónde vamos?</ControlLabel>
                        <FormControl
                           type='text'
                           value={pickUp.place}
                           name='place'
                           placeholder='Recogida'
                           onChange={this.handleChange}
                           /><br/>
                        {/*<Geosuggest
                           ref={el=>this._geoSuggest=el}
                           placeholder="Start typing!"
                           initialValue="Hamburg"
                           onSuggestSelect={this.onSuggestSelect}
                           location={new google.maps.LatLng(53.558572, 9.9278215)}
                           radius="20"
                           />*/}
                           <ControlLabel>¿Qué hacemos?</ControlLabel>
                           <FormControl
                              componentClass='textarea'
                              value={pickUp.instructions}
                              name='instructions'
                              placeholder='Dime qué hacer'
                              onChange={this.handleChange}
                              /><br/>
                           <Row>
                              <Col xs={12} md={6}>
                                 <ControlLabel>Persona de contacto</ControlLabel>
                                 <FormControl
                                    type='text'
                                    value={pickUp.contactName}
                                    name='contactName'
                                    placeholder='Nombre de contact'
                                    onChange={this.handleChange}
                                    /><br/>
                              </Col>
                              <Col xs={12} sm={6} md={6} lg={6}>
                                 <ControlLabel>Número telefónico de contacto</ControlLabel>
                                 <FormControl
                                    type='number'
                                    value={pickUp.contactPhone}
                                    name='contactPhone'
                                    placeholder='Número'
                                    onChange={this.handleChange}
                                    /><br/>
                              </Col>
                              <Col xs={12} sm={12} md={12} lg={12}>
                                 <ControlLabel>¿Cuándo lo hacemos?</ControlLabel>
                                 {/*<Checkbox checked={!order.scheduled} onChange={()=>this.setState({order:{...order,scheduled:!order.scheduled}})}>Ahora</Checkbox>*/}
                                 {order.scheduled &&
                                    <div style={{cursor:'pointer'}}>
                                       <Datetime
                                          onChange={this.handleDateChange}
                                          value={this.state.order.date}
                                          style={{cursor:'pointer'}}
                                          /><br/>
                                    </div>
                                 }
                              </Col>
                           </Row>
                           <hr/>

                           <Row>
                              <Col xs={10}>
                                 <h3>¿Qué hacemos?</h3>
                              </Col>

                              <Col xs={2}>
                                 <br/>
                                 <Button bsStyle='primary' bsSize='xs' onClick={this.addPoint}>+</Button>
                              </Col>
                           </Row>
                           {delivery.map((r,i)=>{
                              let step=i+1;
                              return (
                                 <div key={i}>
                                    <Row>
                                       <Col xs={10}>
                                          <h5>Punto {step} </h5>
                                       </Col>
                                       {step>1&&

                                          <Col xs={2}>
                                             <Button bsStyle='danger' bsSize='xs' onClick={()=>this.removePoint(r.step)}>X</Button>
                                          </Col>
                                       }
                                    </Row>

                                    <ControlLabel>Lugar de entrega</ControlLabel>
                                    <FormControl
                                       type='text'
                                       value={r.place}
                                       name='place'
                                       placeholder='Entrega'
                                       onChange={this.handleChange}
                                       className='deliveryPoint'
                                       data-id={i}
                                       /><br/>
                                    <ControlLabel>¿Qué hacemos al llegar?</ControlLabel>
                                    <FormControl
                                       componentClass='textarea'
                                       value={r.instructions}
                                       name='instructions'
                                       placeholder='Instrucciones en lugar de entrega'
                                       onChange={this.handleChange}
                                       className='deliveryPoint'
                                       data-id={i}
                                       /><br/>
                                    <Row>
                                       <Col xs={12} sm={6} md={6} lg={6}>
                                          <ControlLabel>Persona de contacto</ControlLabel>
                                          <FormControl
                                             type='text'
                                             value={r.contactName}
                                             name='contactName'
                                             placeholder='Nombre de contact'
                                             onChange={this.handleChange}
                                             className='deliveryPoint'
                                             data-id={i}
                                             /><br/>
                                       </Col>
                                       <Col xs={12} sm={6} md={6} lg={6}>
                                          <ControlLabel>Número telefónico de contacto</ControlLabel>
                                          <FormControl
                                             type='number'
                                             value={r.contactPhone}
                                             name='contactPhone'
                                             placeholder='Número'
                                             onChange={this.handleChange}
                                             className='deliveryPoint'
                                             data-id={i}
                                             />
                                       </Col>
                                    </Row>
                                 </div>
                              )
                           })}
                           <FormControl.Feedback /><br/>
                           <Link to={{pathname:'/confirmation',state:{order,auth:this.props.auth}}} style={{textDecoration:'none'}}><Button>Agendar orden</Button></Link>
                        </Col>


                     </FormGroup>
                  </form>
                  :
                  <Redirect to={{pathname:`/tracking/${orderKey}`,state:{orderKey}}} />
               }
            </div>
         )
      }
   }

   let mapStateToProps=state=>{
      return {
         orders: state.orders,
         auth: state.auth
      }
   }

   export default connect(mapStateToProps,{createOrder})(Delivery);
