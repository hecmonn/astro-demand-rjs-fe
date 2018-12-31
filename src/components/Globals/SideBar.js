import React from 'react';
import PropTypes from 'prop-types';
import {Col,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';


class SideBar extends React.Component {
    render () {
        return (


                <Col xs={12} sm={12} md={3} lg={3} style={{backgroundColor:'purple',height:'100vh',color:'white'}}>
                    <Col xs={6} xsOffset={3}>
                        <br/>
                        <Image src='https://252radio.com/wp-content/uploads/2016/11/default-user-image-300x300.png' circle style={{height:150,width:150}} />
                        <br/><br/>
                        <h5 style={{textAlign:'center'}}>Powered by <b>ASTRO</b></h5>
                    </Col>
                    <Col xs={12} style={{backgroundColor:'purple'}}>
                        <ul style={{color:'white',fontSize:25}}>
                            <li style={{listStyleType:'none',padding:10}}><Link to='/' style={{color:'white'}}>Próximas tareas</Link></li>
                            <li style={{listStyleType:'none',padding:10}}><Link to='/services' style={{color:'white'}}>Añadir tarea</Link></li>
                            <li style={{listStyleType:'none',padding:10}}><Link to='#' style={{color:'white'}}>Tareas Completadas</Link></li>
                            <li style={{listStyleType:'none',padding:10}}><Link to='#' style={{color:'white'}}>Agenda</Link></li>
                            <li style={{listStyleType:'none',padding:10}}><Link to='#' style={{color:'white'}}>Mis facturas</Link></li>
                        </ul>
                    </Col>
                </Col>

        )
    }
}

export default SideBar;
