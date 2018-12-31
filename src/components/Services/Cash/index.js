import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {mapsKeys} from '../../../config';
import {createOrder} from '../../../actions/orders';
import {Grid,Col,Row,ControlLabel,FormControl,FormGroup,HelpBlock,Button,Checkbox} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Datetime from 'react-datetime';
import style from '../calendar_style.css';
import geostyle from '../geosuggest.css';
import Geosuggest from 'react-geosuggest';
import isEmpty from 'is-empty';

class Cash extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            order:{
                type:'cash',
                date: new Date(),
                scheduled: 1,
                pickUp:{
                    place: '',
                    instructions:'',
                    contactName:'',
                    contactPhone:'',
                    _status:0
                },
            }
        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleDateChange=this.handleDateChange.bind(this);
    }
    handleChange(e){
        let prevOrder=this.state.order;
        if (e.target.className.includes('deliveryPoint')) {
            let deliveryPoints = [...prevOrder.delivery];
            deliveryPoints[e.target.dataset.id][e.target.name] = e.target.value;
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

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        const {order}=this.state;
        const {userId,email}=this.props.auth;
        let orderKey=this.props.createOrder({order:{...order,type:'cash'},userId,email});
        this.setState({loading:false,redirect:true,orderKey});
    }

    render () {
        const {loading,redirect,order,orderKey}=this.state;
        const {pickUp}=order;
        return(
            <div style={{height:'100vh', overflow:'scroll'}}>
                {!redirect?
                    <form>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getValidationState()}
                        >
                            <h3>¿Dónde recogemos?</h3>
                            <Col xs={5}>
                                <ControlLabel>¿A dónde vamos?</ControlLabel>
                                <FormControl
                                    type='text'
                                    value={pickUp.place}
                                    name='place'
                                    placeholder='Recogida'
                                    onChange={this.handleChange}
                                />
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
                                />
                                <Row>
                                    <Col xs={12} sm={6} md={6} lg={6}>
                                        <ControlLabel>Persona de contacto</ControlLabel>
                                        <FormControl
                                            type='text'
                                            value={pickUp.contactName}
                                            name='contactName'
                                            placeholder='Nombre de contact'
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} sm={6} md={6} lg={6}>
                                        <ControlLabel>Número telefónico de contacto</ControlLabel>
                                        <FormControl
                                            type='number'
                                            value={pickUp.contactPhone}
                                            name='contactPhone'
                                            placeholder='Número'
                                            onChange={this.handleChange}
                                        />
                                    </Col>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <ControlLabel>¿Cuándo lo hacemos?</ControlLabel>
                                        <Checkbox checked={!order.scheduled} onChange={()=>this.setState({order:{...order,scheduled:!order.scheduled}})}>Ahora</Checkbox>
                                        {order.scheduled &&
                                            <div style={{cursor:'pointer'}}>
                                                <Datetime
                                                    onChange={this.handleDateChange}
                                                    value={this.state.order.date}
                                                    style={{cursor:'pointer'}}
                                                />
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <hr/>
                                <div>
                                    <p>Un Astro pasará a recoger el efectivo a la sucursal asignada</p>
                                    <p>Una vez que el Astro valide la cantidad entregada por el encargado, se relizará un SPEI hacia la cuenta de registrada previamente</p>
                                </div>
                                <Button bsStyle='default' onClick={this.handleSubmit}>Agendar</Button>

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
export default connect(mapStateToProps,{createOrder})(Cash);
