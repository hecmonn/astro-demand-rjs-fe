import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';
import {createOrder} from '../../../actions/orders';

class Confirmation extends React.Component {
    constructor(props){
        super(props);
        this.state={
            orderKey:null,
            loading:false,
            redirect:false,
        };

        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.setState({loading:true});
        const {order}=this.props.location.state;
        const {userId,email,company}=this.props.auth;
        let orderKey=this.props.createOrder({order:{...order,type:'pd',company},userId,email,company});
        this.setState({loading:false,redirect:true,orderKey});
        // })
        // .catch(err=>console.log('Err delivery: ',err));
    }

    componentWillMount() {
        const {order}=this.props.location.state;
    }



    render () {
        const {order}=this.props.location.state;
        const {redirect,orderKey}=this.state;
        console.log('conf order:' ,order);
        return (
            <div>
                {!redirect?

                    <div style={{height:'100vh',overflow:'scroll',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <h1>¡Gracias por utilizar Astro!</h1>
                        <h4>Tu astro recogera tu paquete en {order.pickUp.place} y los llevará a los siguientes lugares</h4>
                        <ul>
                            {order.delivery.map(r=><li><h4>{r.place}</h4></li>)}
                        </ul>

                        <Button onClick={this.handleSubmit}>Confirmar</Button> <br/>
                        <Link to={{pathname:'/delivery',state:{order}}}>Editar</Link>
                    </div>
                    :
                    <Redirect to={{pathname:`/tracking/${orderKey}`,state:{orderKey}}} />
                }
            </div>
        )
    }
}

// Confirmation.propTypes={
//     information: PropTypes.Object.isRequired,
//     handleSubmit: PropTypes.func.isRequired
// }

let mapStateToProps=state=>{
    return {
        auth:state.auth
    }
}
export default connect(mapStateToProps,{createOrder})(Confirmation);
