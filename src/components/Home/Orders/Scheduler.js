import React from 'react';
import {connect} from 'react-redux';
// import PropTypes from 'prop-types';
import firebase from 'firebase';
import {Panel,Row,Col} from 'react-bootstrap';
import {objectConvertor} from '../../../lib/helpers';
import df from 'dateformat';
import isEmpty from 'is-empty';
import {Link} from 'react-router-dom';

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
                    // let date=df(r.date,'mm/dd HH:MM');
                    let status,type;
                    if(r._status==0) status='No ha empezado';
                    else if(r._status==1) status='En progreso';

                    if(r.type=='pd') type='Entrega';
                    console.log('ogo : ',r);
                    return (
                        <Panel key={i}>
                            <Panel.Heading>
                                <Row>
                                    <Col xs={8} sm={8} md={8} lg={10}>
                                        <p>Servicio de {type}</p>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={2} xsOffset={2} smOffset={2} mdOffset={2}>
                                        <Link to={`/tracking/${r.key}`}> Ver</Link>
                                    </Col>
                                </Row>
                            </Panel.Heading>
                            <Panel.Body>
                                <div>
                                    <p>Agendada el {r.date}</p>
                                    <p>{status}</p>
                                </div>
                            </Panel.Body>
                        </Panel>
                    )
                })}
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
        return(
            <div>
                <h4>Ordenes agendadas</h4>
                {!isEmpty(onGoingOrders) ? this.onGoingOrders(): <p>No tienes ordenes agendadas...</p>}
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
