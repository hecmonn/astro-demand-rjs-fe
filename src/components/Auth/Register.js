import React from 'react';
import PropTypes from 'prop-types';
import {Grid,Row,Col,FormGroup,FormControl,ControlLabel,HelpBlock,Button} from 'react-bootstrap';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange=()=>{

    }
    handleSubmit=()=>{

    }
    getValidationState=()=>{
        console.log('validation...');
    }
    render () {
        const {fname,lname,email,phone}=this.state;
        return (
            <div>
                <h1>Register</h1>
                <Grid fluid={true}>
                    <Col xs={12} sm={12} md={6} mdOffset={3} lg={6} lgOffset={3}>
                        <div className='register-holder'>
                            <form>
                                <FormGroup
                                    controlId="formBasicText"
                                    validationState={this.getValidationState()}
                                    >
                                    <Row>
                                        <Col xs={12} sm={12} md={6} lg={6}>
                                            <ControlLabel>Nombre</ControlLabel>
                                            <FormControl
                                                type='text'
                                                value={fname}
                                                placeholder='Nombre'
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                        <Col xs={12} sm={12} md={6} lg={6}>
                                            <ControlLabel>Apellido</ControlLabel>
                                            <FormControl
                                                type='text'
                                                value={lname}
                                                placeholder='Apellido'
                                                onChange={this.handleChange}
                                            />
                                        </Col>
                                    </Row>
                                    <ControlLabel>Empresa</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={this.state.value}
                                        placeholder="Enter text"
                                        onChange={this.handleChange}
                                    />
                                    <ControlLabel>Correo electrónico</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={email}
                                        placeholder="Enter text"
                                        onChange={this.handleChange}
                                    />
                                    <ControlLabel>Número telefónico</ControlLabel>
                                    <FormControl
                                        type="text"
                                        value={phone}
                                        placeholder="Enter text"
                                        onChange={this.handleChange}
                                    />
                                    <FormControl.Feedback />
                                    <HelpBlock>Validation is based on string length.</HelpBlock>
                                    <Button onClick={this.handleSubmit} type='submit'>Solicitar invitación</Button>
                                </FormGroup>
                            </form>
                        </div>
                    </Col>
                </Grid>
            </div>
        )
    }
}

export default Register;
