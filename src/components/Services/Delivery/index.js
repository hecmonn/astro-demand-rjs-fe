import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {mapsKeys} from '../../../config';
import {createDelivery} from '../../../actions/orders';
import ReactGoogleMapLoader from 'react-google-maps-loader';
import ReactGooglePlacesSuggest from 'react-google-places-suggest';
import {Grid,Col,Row,ControlLabel,FormControl,FormGroup,HelpBlock,Button} from 'react-bootstrap';
// import firebase from 'firebase';
import {Redirect} from 'react-router-dom';

class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state={
            loading:false,
            order:{
                type:'pd',
                pickUp:{
                    place: '',
                    instructions:'',
                    contactName:'',
                    contactPhone:''
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
        this.handleSubmit=this.handleSubmit.bind(this);
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

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        const {order}=this.state;
        const {userId,email}=this.props.auth;
        let orderKey=this.props.createDelivery({order,userId,email});
        this.setState({loading:false,redirect:true,orderKey});
        // })
        // .catch(err=>console.log('Err delivery: ',err));
    }

    addPoint=()=>{
        let {delivery,pickUp}=this.state.order;
        delivery.push({
            step:delivery.length+1,
            place: '',
            instructions: '',
            contactName:'',
            contactPhone:'',
        });
        this.setState({order:{pickUp,delivery}});
    }

    removePoint=(step)=>{
        let {delivery,pickUp}=this.state.order;
        let filteredDelivery=delivery.filter(r=> step!==r.step);
        console.log('delivery: ',filteredDelivery);
        this.setState({order:{pickUp,delivery: filteredDelivery }})
    }
    predictionHandlerA=(pred)=>{
        this.setState({point_a: pred.formatted_address});
    }

    predictionHandlerB=(pred)=>{
        this.setState({point_b: pred.formatted_address});
    }
    render () {
        const {loading,redirect,order,orderKey}=this.state;
        const {pickUp,delivery}=order;
        return(
            <div>
                {!redirect?
                    <div>
                        <h1>P&D</h1>
                            <ReactGoogleMapLoader
                                params={{
                                    key: mapsKeys.apiKey,
                                    libraries: "places,geocode",
                                }}
                                render={googleMaps =>
                                    googleMaps && (
                                        <div>{/*
                                            <ReactGooglePlacesSuggest
                                                googleMaps={googleMaps}
                                                autocompletionRequest={{
                                                    input: point_a,
                                                    // radius: 5000000,
                                                    // location: {
                                                    //     lat: '19.432608',
                                                    //     lng: '-99.133209'
                                                    // }
                                                    // Optional options
                                                    // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                                                }}
                                                onSelectSuggest={this.predictionHandlerA}
                                                textNoResults="My custom no results text"
                                                customRender={prediction => (
                                                    <div className="customWrapper">
                                                        {prediction? prediction.description: "My custom no results text"}
                                                    </div>
                                                    )}
                                                    >
                                                    <input
                                                        type="text"
                                                        value={point_a}
                                                        placeholder="Lugar de recogida"
                                                        onChange={this.handleChange}
                                                        name='point_a'
                                                    />
                                                </ReactGooglePlacesSuggest>

                                                <ReactGooglePlacesSuggest
                                                    googleMaps={googleMaps}
                                                    autocompletionRequest={{
                                                        input: point_b,
                                                        country:'MX'
                                                        // Optional options
                                                        // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                                                    }}
                                                    onSelectSuggest={this.predictionHandlerB}
                                                    textNoResults="My custom no results text"
                                                    customRender={prediction => (
                                                        <div className="customWrapper">
                                                            {prediction? prediction.description: "My custom no results text"}
                                                        </div>
                                                        )}
                                                        >

                                                        <input
                                                            type="text"
                                                            value={point_b}
                                                            placeholder="Lugar de entrega"
                                                            onChange={this.handleChange}
                                                            name='point_b'
                                                        />
                                                    </ReactGooglePlacesSuggest>
                                                    */}
                                                </div>
                                        )
                                    }
                                />
                                <Grid fluid={true}>
                                    <Col xs={12} sm={12} md={8} mdOffset={2} lg={8} lgOffset={2}>
                                        <div className='register-holder'>
                                            <form>
                                                <FormGroup
                                                    controlId="formBasicText"
                                                    validationState={this.getValidationState()}
                                                    >
                                                    <Col xs={12} sm={12} md={12} lg={12}>
                                                        <ControlLabel>¿A dónde vamos?</ControlLabel>
                                                        <FormControl
                                                            type='text'
                                                            value={pickUp.place}
                                                            name='place'
                                                            placeholder='Recogida'
                                                            onChange={this.handleChange}
                                                        />
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
                                                        </Row>
                                                        <hr/>

                                                        <Row>
                                                            <Col xs={10} sm={10} md={10} lg={10}>
                                                                <h5>¿Qué hacemos?</h5>
                                                            </Col>

                                                            <Col xs={2} sm={2} md={2} lg={2}>
                                                                <Button bsStyle='primary' bsSize='xs' onClick={this.addPoint}>+</Button>
                                                            </Col>
                                                        </Row>
                                                        {delivery.map((r,i)=>{
                                                            let step=i+1;
                                                            return (
                                                                <div key={i}>
                                                                    <Row>
                                                                        <Col xs={10} sm={10} md={10} lg={10}>
                                                                            <h3>Punto {step} </h3>
                                                                        </Col>
                                                                        <br/>
                                                                        {step>1&&

                                                                            <Col xs={2} sm={2} md={2} lg={2}>
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
                                                                    />
                                                                    <ControlLabel>¿Qué hacemos al llegar?</ControlLabel>
                                                                    <FormControl
                                                                        componentClass='textarea'
                                                                        value={r.instructions}
                                                                        name='instructions'
                                                                        placeholder='Instrucciones en lugar de entrega'
                                                                        onChange={this.handleChange}
                                                                        className='deliveryPoint'
                                                                        data-id={i}
                                                                    />
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
                                                                            />
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
                                                    </Col>

                                                    <FormControl.Feedback />
                                                    <HelpBlock>Validation is based on string length.</HelpBlock>
                                                    <Button onClick={this.handleSubmit} type='submit'>Set Order</Button>
                                                </FormGroup>
                                            </form>
                                        </div>
                                    </Col>
                                </Grid>
                    </div>
                    :
                    <Redirect to={{pathname:{`/tracking/${orderKey}`},state:{}}} />
                }
            </div>
        )
    }
}

let mapStateToProps=state=>{
    return {
        orders:state.orders,
        auth: state.auth
    }
}
export default connect(mapStateToProps,{createDelivery})(Delivery);
