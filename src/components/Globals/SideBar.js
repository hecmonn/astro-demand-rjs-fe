import React from 'react';
import PropTypes from 'prop-types';
import {Col,Image,Glyphicon} from 'react-bootstrap';
import {Redirect,Link} from 'react-router-dom';
import firebase from 'firebase';
import {FaHome,FaPlusCircle,FaCheckCircle} from 'react-icons/fa';

class SideBar extends React.Component {
   constructor(){
      super();
      this.state={
         redirect:false
      }
   }
   logout=()=>{
      const auth=firebase.auth();
      auth.signOut()
      .then(r=>
         this.setState({redirect:true}))
      }
      render () {
         const{redirect}=this.state;
         return (
            <div>
               {!redirect?
                  <div>
                     <Col xs={2} sm={3} lg={2} style={{backgroundColor:'#0F365E',height:'100vh',color:'white'}}>
                        <Col sm={12} xsHidden style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                           <br/>
                           <Image src='https://252radio.com/wp-content/uploads/2016/11/default-user-image-300x300.png' circle style={{height:150,width:150}} />
                           <h5 style={{textAlign:'center'}}>Powered by <b>ASTRO</b></h5>
                        </Col>
                        <Col sm={12} xsHidden>
                           <ul style={{color:'white',fontSize:22,padding:0}}>
                              <li style={{listStyleType:'none',paddingTop:10}}><Link to='/' style={{color:'white'}}>Próximas tareas</Link></li>
                              <li style={{listStyleType:'none',paddingTop:10}}><Link to='/services' style={{color:'white'}}>Añadir tarea</Link></li>
                              <li style={{listStyleType:'none',paddingTop:10}}><Link to='/orders' style={{color:'white'}}>Tareas Completadas</Link></li>
                              <li style={{listStyleType:'none',paddingTop:10}}><Link to='#' style={{color:'white'}} onClick={()=>firebase.auth().signOut()}>Salir</Link></li>
                           </ul>
                        </Col>
                        <Col xs={12} smHidden mdHidden lgHidden style={{padding:0}}>
                           <ul style={{padding:0,fontSize:22}}>
                              <li style={{listStyleType:'none',paddingTop:20}}><Link to='/' style={{color:'white'}}><FaHome/></Link></li>
                              <li style={{listStyleType:'none',paddingTop:20}}><Link to='/services' style={{color:'white'}}><FaPlusCircle/></Link></li>
                              <li style={{listStyleType:'none',paddingTop:20}}><Link to='/orders' style={{color:'white'}}><FaCheckCircle /></Link></li>
                              <li style={{listStyleType:'none',paddingTop:20}}><Link to='#' style={{color:'white'}} onClick={()=>firebase.auth().signOut()}><Glyphicon glyph="log-out"/></Link></li>
                           </ul>
                        </Col>
                     </Col>
                  </div>
                  :
                  <Redirect to='/auth' />
               }
            </div>




         )
      }
   }

   export default SideBar;
