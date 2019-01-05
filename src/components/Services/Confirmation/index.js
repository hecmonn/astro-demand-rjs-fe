import React from 'react';
import {connect} from 'react-redux';
import {Button} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';
import {createOrder} from '../../../actions/orders';
import df from 'dateformat';
import firebase from 'firebase';

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

    handleSubmit=async(e)=>{
        e.preventDefault();
        this.setState({loading:true});
        const {order}=this.props.location.state;
        const {userId,email,company}=this.props.auth;
        let orderKey=await this.props.createOrder({order:{...order,company},userId,email,company});
        if(order.type=='shopping'){
           let today=df(new Date(),'ddmmyyHHMM');
           const {file}=order;
           let filename=`${userId}_${orderKey}_${today}`;
           const storage=firebase.storage().ref(`/shopping/${orderKey}/${filename}`);
           let storageRef=storage.put(file);
           storageRef.on('state_changed' ,
               //progress
               (snap)=>{
                    this.setState({progress:((snap.bytesTransferred/snap.totalBytes)*100)});
               },
               //err
               (err)=>{
                   console.log('Something went wrong uploading singature: ',err);
               },
               //completed
               (completed)=>{
                   // this.props.navigation.goBack();
                   console.log('completed')
                   return 1;
               }
           )
           console.log('shop')// await this.props.uploadFile(let data=[]);
        }
        this.setState({loading:false,redirect:true,orderKey});
        // })
        // .catch(err=>console.log('Err delivery: ',err));
    }

    componentWillMount() {
        const {order}=this.props.location.state;
    }

    deliveryDescription=()=>{
        const {order}=this.props.location.state;
        return (
            <div>
                <h4 style={{textAlign:'center'}}>Tu astro recogera tu paquete en {order.pickUp.place} y los llevará a los siguientes lugares</h4>
                <ul>
                    {order.delivery.map(r=><li><h4>{r.place}</h4></li>)}
                </ul>

            </div>
        )
    }

    cashDescription=()=>{
        const {order}=this.props.location.state;
        console.log('order type: ',order.type)
        return (
            <div>
                <h4 style={{textAlign:'center'}}>Tu Astro irá a {order.pickUp.place}, validará el efectivo entregada y realizará un SPEI por la cantidad recibida</h4>
            </div>
        )
    }

    shoppingDescription=()=>{
      const {order}=this.props.location.state;
      const date=df(order.date,'dd/mm HH:MM');
      return (
         <div>
             <h4 style={{textAlign:'center'}}>Tu Astro comprará los productos anexados en al lista y los entregará el {date}</h4>
         </div>
      )
   }

   descriptionHandler=(order)=>{
      if(order.type=='delivery') return this.deliveryDescription()
      else if(order.type=='cash') return this.cashDescription()
      else if(order.type=='shopping') return this.shoppingDescription()
   }

    render () {
        const {redirect,orderKey}=this.state;
        const {order}=this.props.location.state;
        console.log('conf order:' ,order);
        return (
            <div>
                {!redirect?
                    <div style={{height:'100vh',overflow:'scroll',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <h1 style={{textAlign:'center'}}>¡Gracias por utilizar Astro!</h1>
                        {this.descriptionHandler(order)}
                        {/*order.type=='delivery'?this.deliveryDescription() : this.cashDescription()*/}
                        <Button onClick={this.handleSubmit}>Confirmar</Button> <br/>
                        <Link to={{pathname:`/${order.type}`,state:{order}}}>Editar</Link>
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
