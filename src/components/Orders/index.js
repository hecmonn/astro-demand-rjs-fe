import React from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {Col} from 'react-bootstrap';
import {objectConvertor} from '../../lib/helpers';
import ServiceCard from '../Globals/ServiceCard';
import isEmpty from 'is-empty';
import {Link} from 'react-router-dom';

class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orders: [],
            loading:true
        };
        this.db=firebase.database().ref();
    }

    componentWillMount() {
        const {email}=this.props.auth;
        console.log('this.props.auth: ',this.props.auth);
        const ordersRef=this.db.child('orders').orderByChild('customer').equalTo(email);
        ordersRef.once('value',snap=>{
            let ordersSnap=snap.val();
            let orders=objectConvertor(ordersSnap);
            this.setState({orders,loading:false});
        });
    }
    ordersList=()=>{
        const {orders}=this.state
        if(!isEmpty(orders)){
            console.log('orders: ',orders);
            return(
               <Col xs={12}>
                  <h3>Ordenes realizadas</h3>
                  <ServiceCard orders={orders} />
               </Col>
            )
        } else return this.empty

    }

    empty=(
        <Col>
            <h3>No tienes ordenes previas <br/> <Link to ='/'>Crea tu primer orden</Link></h3>
        </Col>
    )

    render () {
        const {orders,loading}=this.state;
        return (
            <div style={{height:'100vh',overflow:'scroll'}}>
                {loading? <h1>loading...</h1>:this.ordersList()}

            </div>
        )
    }
}

let mapStateToProps=state=>{
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps,null)(Orders);
