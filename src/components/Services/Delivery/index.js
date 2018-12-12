import React from 'react';
import PropTypes from 'prop-types';
import {CSSTransition,TransitionGroup} from 'react-transition-group';

class Delivery extends React.Component {
    constructor(props){
        super(props);
        this.state={
            count:1
        }
    }
    render () {
        const {count}=this.state;
        return (
            <div className='delivery-holder'>
                <div className='delivery-header'>

                </div>
                <div className='delivery-body'>
                    <div className='delivery-card-holder'>
                        <button onClick={()=>this.setState({count:count+1})}></button>
                        <TransitionGroup className='card-container'>
                            <CSSTransition
                                key={count}
                                timeout={600}
                                classNames='fade'
                            >
                                <div style={{width:'50vw',height:'50vh',backgroundColor:'yellow'}}>
                                    <h1>card {count}</h1>
                                </div>
                            </CSSTransition>
                        </TransitionGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default Delivery;
