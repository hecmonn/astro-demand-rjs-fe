import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FaTruck,FaCoffee,FaShoppingCart} from 'react-icons/fa';

class Services extends React.Component {
   render () {
      return (
         <div style={{height:'100vh',overflow:'scroll'}}>
            <Col xs={12} >
               <div style={{height:'5vh'}}></div>
               <h1 style={{textAlign:'center'}}>En Astro te apoyamos con:</h1>
               <Row>
                  <Col>
                     <Col xs={12} md={4}>
                        <Link to='/delivery' style={{textDecoration:'none',color:'#0F365E'}}>
                           <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',borderColor:'black',flexDirection:'column'}}>
                              <FaTruck size={50} />
                              <h1 style={{textAlign:'center'}}>Pickup & Delivery</h1>
                              <p style={{textAlign:'center',color:'gray'}}>Recogemos y entregamos lo que tu empresa necesite</p>

                           </div>
                        </Link>
                     </Col>
                     <Col xs={12} md={4}>
                        <Link to='#' style={{textDecoration:'none',color:'#0F365E'}}>
                           <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',borderColor:'black',flexDirection:'column'}}>
                              <FaShoppingCart size={50} />
                              <h1 style={{textAlign:'center'}}>Shopping</h1>
                              <p style={{textAlign:'center',color:'gray'}}>Hacemos las compras de tu negocio en minutos</p>

                           </div>
                        </Link>
                     </Col>
                     <Col xs={12} md={4}>
                        <Link to='/cash' style={{textDecoration:'none',color:'#0F365E'}}>
                           <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'50vh',borderColor:'black',flexDirection:'column'}}>
                              <FaCoffee size={50} />
                              <h1 style={{textAlign:'center'}}>Others</h1>
                              <p style={{textAlign:'center',color:'gray'}}>¿Necesitas apoyo en otras tareas?</p>

                           </div>
                        </Link>
                     </Col>
                  </Col>
               </Row>
            </Col>
         </div>
      )
   }
}

export default Services;
