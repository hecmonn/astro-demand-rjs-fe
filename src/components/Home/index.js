import React from 'react';
// import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Col,Row,FormControl} from 'react-bootstrap';
import {FaTruck} from 'react-icons/fa';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
import {getUser,initAuth} from '../../actions/auth';
import {getSignature} from '../../actions/orders';
import {Link,Redirect} from 'react-router-dom';
import Scheduler from './Tracker/Scheduler';
import SideBar from '../Globals/SideBar';
import isEmpty from 'is-empty';

class Home extends React.Component {
   constructor(props){
      super(props);
      this.state={
         user: 1,
         redirect: false,
         imgRef: '',
         orders: null
      };
   }
   componentWillMount=async()=> {
      const auth=firebase.auth();
      const db=firebase.database().ref();

      // this.props.getSignature()
      auth.onAuthStateChanged(user=>{
         if(user) {
            let userRef=db.child('users').orderByChild('email').equalTo(user.email);
            return userRef.once('value',snap=>{
               let userData=snap.val();
               let userVals=Object.values(userData).pop();
               let userId=Object.keys(userData).pop();
               console.log('userId: ',userId);
               let userObj={
                  ...userVals,
                  userId
               }
               this.props.initAuth(userObj);
               // .then(r=>{
               //     this.setState({loading:false})
               // })
            })
         } else {
            this.setState({redirect:true})
         }
      });
      // const storage=firebase.storage();
      // const imgRef=storage.ref('/signatures/orderId/file');
      // this.setState({imgRef});
   }

   //  componentWillReceiveProps(nextProps){
   //    if(this.props.orders !== nextProps.orders){
   //       this.setState({orders:nextProps.orders})
   //    }
   // }

   render () {
      const {redirect,imgRef,orders}=this.state;
      const {company}=this.props.auth;
      console.log('orders: ',orders);
      return (
         <div style={{height:'100vh',overflow:'scroll'}}>
            {!redirect?
               <div className='home-holder'>
                  <div className='home-body'>
                     <div className='content'>
                        <Col xs={12} md={8}>
                           <h2>¡Hola, {company}!</h2>
                           <div>
                              {/*<FormControl
                                 type='text'
                                 placeholder='Buscar'
                                 onChange={null}
                                 />
                                 */}
                              <Col xs={12}>
                                 <img src={!isEmpty(this.props.orders)&& this.props.orders.url} />
                                 <h4>Ordenes en progreso</h4>
                                 <Scheduler auth={this.props.auth}/>
                              </Col>
                           </div>
                        </Col>
                     </div>
                  </div>
               </div>
               :
               <Redirect to='/auth' />
            }
         </div>
      )
   }
}

let mapStateToProps=state=>{
   return {
      auth: state.auth,
      orders: state.orders
   }
};

export default connect(mapStateToProps,{getUser,initAuth,getSignature})(Home);
