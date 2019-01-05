import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Panel,Row,Col} from 'react-bootstrap';
import {objectConvertor} from '../../../lib/helpers';
import df from 'dateformat';
import isEmpty from 'is-empty';
import {FaTruck,FaAmericanSignLanguageInterpreting} from 'react-icons/fa';
import ServiceCard from '../../Globals/ServiceCard';

class Scheduler extends React.Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.db=firebase.database().ref();
    }

    onGoingOrders=()=>{
        const {onGoingOrders}=this.state;
        console.log('ogo ogo: ',onGoingOrders);
        return(
            <div>
                {onGoingOrders.map((r,i)=><ServiceCard orders={onGoingOrders} key={i}/>)}
            </div>
        )
    }

    componentWillReceiveProps(nextProps){
        if(this.props.auth!==nextProps.auth){
            const {email}=nextProps.auth;
            const ordersRef=this.db.child('ordersScheduled').orderByChild('customer').equalTo(email);
            ordersRef.on('value',snap=>{
                let orders=snap.val();
                let ordersCleaned=objectConvertor(orders);
                this.setState({onGoingOrders: ordersCleaned});
            });
        }
    }
    render () {
        const {onGoingOrders}=this.state;
        console.log('ogo state: ',onGoingOrders);
        return(
            <div>
                {!isEmpty(onGoingOrders) ? <ServiceCard orders={onGoingOrders} />: <p>No tienes ordenes agendadas...</p>}
            </div>
        )
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps,null)(Scheduler);
