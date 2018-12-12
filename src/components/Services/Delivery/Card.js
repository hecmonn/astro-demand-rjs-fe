import React from 'react';
import PropTypes from 'prop-types';
import {FormControl,Checkbox,Radio} from 'react-bootstrap';
import DateTimePicker from 'rc-datetime-picker';
import moment from 'moment';

class Card extends React.Component {
    constructor(props){
        super(props);
        this.state={
            moment: moment()
        };
        this.handleDTP=this.handleDTP.bind(this)
    }
    handleDTP = (moment) => {
        this.setState({
            moment
        });
    }
    page1=(
        <div>
            <p>¿A dónde debo ir?</p>
            <FormControl
                type='text'
                placeholder='Apellido'
                onChange={this.handleChange}
            />
        </div>
    )
    page2=(
        <div>
            <div style={{marginBottom:20}}>
                <p>¿Qué debo hacer al llegar?</p>
                <FormControl
                    type='text'
                    placeholder='Apellido'
                    onChange={this.handleChange}
                />
            </div>
            <div>
                <p>¿Con quién me comunico?</p>
                <FormControl
                    type='text'
                    placeholder='Nombre'
                    onChange={this.handleChange}
                />
                <FormControl
                    type='text'
                    placeholder='Telefono celular'
                    onChange={this.handleChange}
                />
            </div>
        </div>
    )
    page3=()=>{
        const shortcuts = {
            'Today': moment(),
            'Yesterday': moment().subtract(1, 'days'),
            'Clear': ''
        };

        return (
            <div>
                <p>¿Cuándo lo hacemos?</p>

                <Checkbox onChange={()=>this.setState({})} value={this.props.scheduled}>De inmediato</Checkbox>



            </div>
        )
    }
    page4=(
        <div style={{fontSize:'0.5em'}}>
            <p>En 15 minutos llegará tu Astro a <b>calle 142 #11 -79</b> y hará tu envío hasta <b>calle 55 sur #24 c 85</b></p>
            <p>Tu servicio costará <b>30 MXN</b></p>
            <hr/>
            <p><b>¿Cómo te gustaría pagar?</b></p>
            <Radio>En efectivo</Radio>
            <Radio>Con mi tarjeta guardada</Radio>
        </div>
    )
    render () {
        const {page}=this.props;
            {switch (page) {
                case 1:
                    return this.page1;
                case 2:
                    return this.page2;
                case 3:
                    return this.page3();
                case 4:
                    return this.page4;
                default: return 0;

            }}
    }
}

export default Card;
