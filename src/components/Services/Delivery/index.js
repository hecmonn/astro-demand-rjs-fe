import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import {Col,Row,Button,FormControl} from 'react-bootstrap';
import Card from './Card';

class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state={
            page:1,
            order:{
                pickUp:{
                    place: null,
                    whatToDo:null,
                    contact:{
                        name:null,
                        phone: null
                    }
                },
                delivery:[{
                    place: null,
                    whatToDo: null,
                    step:1,
                    contact:{
                        name:null,
                        phone:null,
                    }
                }]
            }
        }
    }
    render () {
        const {page}=this.state;
        return (
            <div className='delivery-holder fs' style={{backgroundColor:'white'}}>
                <div className='delivery-header'>
                </div>
                <div className='delivery-body'>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div className='body-header' style={{textAlign:'center',marginBottom:20}}>
                            <h1>ASTRO</h1>
                            <h4>{page} de 3</h4>
                        </div>
                        <div className='delivery-card-holder' style={{backgroundColor:'purple',width:'80vw',height:'80vh',margin:'auto',borderRadius:5,color:'white'}}>
                            <button onClick={()=>this.setState({page:page+1})}></button>
                            <TransitionGroup className='card-container'>
                                <CSSTransition
                                    key={page}
                                    timeout={600}
                                    classNames='fade'
                                >
                                    <Col xs={12} sm={12} md={6} mdOffset={3} lg={6} lgOffset={3} className='delivery-card'>
                                        <div style={{backgroundColor:'transparent',padding:15,fontSize:'2.5em',fontWeight:'bold'}}>
                                            <Card page={page} props={'hey'}/>
                                            <Button onClick={()=>this.setState({page:page+1})}>Next</Button>
                                        </div>
                                    </Col>
                                </CSSTransition>


                            </TransitionGroup>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }
}

export default Delivery;
