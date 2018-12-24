import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Panel} from 'react-bootstrap';
import {objectConvertor} from '../../../lib/helpers';
import df from 'dateformat';
import isEmpty from 'is-empty';

class Scheduler extends React.Component {
    constructor(props){
        super(props);
        this.state={

        };
        this.db=firebase.database().ref();
    }

    onGoingOrders=()=>{
        const {onGoingOrders}=this.state;
        return(
            <div>
                {onGoingOrders.map((r,i)=>{
                    let date=df(r.created_date,'mm/dd HH:MM');
                    console.log('ogo : ',r);
                    return (
                        <Panel key={i}>
                            <Panel.Heading>
                                {r.type} agendada el {date}
                            </Panel.Heading>
                            <Panel.Body>
                                <div>
                                    <p>Recoger en: {r.pickUp.place}</p>
                                    <p>Status: {r._status}</p>
                                    <p>Customer: {r.customer}</p>
                                </div>
                            </Panel.Body>
                        </Panel>
                    )
                })}
            </div>
        )
    }
    componentWillMount() {
        const {email}=this.props.auth;
        const ordersRef=this.db.child('orders').orderByChild('customer').equalTo(email);
        // console.log('auth props sch: ',this.props.auth);
        ordersRef.on('value',snap=>{
            let orders=snap.val();
            console.log('orders: ',orders);
            let ordersCleaned=objectConvertor(orders);
            let ordersFiltered=ordersCleaned.filter(r=>r._status<=0 && r._status>2);
            console.log('ordersFiltered: ',ordersFiltered);
            this.setState({onGoingOrders: ordersFiltered, completeOrders: ordersCleaned});
        });
    }
    render () {
        const {onGoingOrders}=this.state;
        return(
            <div>
                <h5>Ordened agendadas</h5>
                {!isEmpty(onGoingOrders) ? this.onGoingOrders(): <h3>No tienes ordenes agendadas...</h3>}
            </div>
        )
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth
    }
}

export default Scheduler;
