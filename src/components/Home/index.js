import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Grid,Col,Row,Button} from 'react-bootstrap';
import {FaTruck} from 'react-icons/fa';
import firebase from 'firebase';
import {firebaseConfig} from '../../config';
import {getUser} from '../../actions/auth';
import Nav from '../Nav';
import {Link} from 'react-router-dom';
class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: 1
        };
    }
    componentWillMount() {
        const localAuth=JSON.parse(localStorage.getItem('AUTH'));
        if(localAuth!==null){
            let {email}=localAuth;
            this.props.getUser(email)
            .then(r=>{
                this.setState({loading:false})
            })
        } else {
            console.log('Not logged...');
        }
    }

    componentDidMount() {
        // const rootRef=firebase.database().ref('users').orderByChild('email').equalTo('hector@heyastro.co');
        // rootRef.on('value',snapshot=>{
        //     const {fname,lname,email}=snapshot.val();
        //     console.log('snap: ',snapshot.val());
        //     console.log('snap exist: ',snapshot.exists());
        // });
    }
    render () {
        console.log('auth props: ',this.props.auth)
        return (
            <div className='home-holder'>
                    <div className='home-header'>
                        <Nav />
                    </div>
                    <div className='home-body' style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <div className='landing' className='fs' style={{textAlign:'center',backgroundColor:'blue',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding: 20,color:'white'}}>
                            <p style={{fontSize:'3em'}}>La solución para todas las tareas de Back-office <b>que te consumen tiempo</b></p>
                        </div>
                        <div className='landing' className='fs' style={{textAlign:'center',backgroundColor:'red',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding: 20,color:'white',height:'50vh'}}>
                            <img alt='astro' style={{width:'20px',heigth:'50px',borderColor:'black',borderWidth:1}} />
                            <h1>Ahorra tiempo con Astro</h1>
                            <p style={{fontSize:'2em'}}>Dinos que quieres...</p>
                            <Button bsStyle='primary' bsSize='large'>SOLICITAR INVITACIÓN</Button>
                        </div>
                        <div className='services' className='fs' style={{textAlign:'center',backgroundColor:'blue',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding: 20,color:'white',height:'165vh'}}>
                            <div className='service-holder'>
                                <div style={{width:'60vw', height:'50vh',backgroundColor:'white',color:'black'}}>
                                    <div style={{height:'20vh',backgroundColor:'gray'}}>
                                        <h3>image holder</h3>
                                    </div>
                                    <div style={{heigth:'30vh'}}>
                                        <p style={{color:'purple',fontSize:'1.5em',fontWeight:900,padding:10}}>Pick up and delivery </p>
                                        <p style={{fontSize:'1.2em'}}>Recogemos y lo llevamos a donde lo necesitas</p>
                                        <Link to='/delivery'><p style={{border:0,color:'purple',fontWeight:900,pointer:'cursor',border:0}}>Solicitar</p></Link>
                                    </div>
                                </div>
                            </div>
                            <div className='service-holder'>
                                <div style={{width:'60vw', height:'50vh',backgroundColor:'white',color:'black'}}>
                                    <div style={{height:'20vh',backgroundColor:'gray'}}>
                                        <h3>image holder</h3>
                                    </div>
                                    <div style={{heigth:'30vh'}}>
                                        <h3>Shopping</h3>
                                        <p style={{fontSize:'1.5em'}}>Te compramos lo que quieras en minutos</p>
                                        <Button bsStyle='success' bsSize='large'>Solicitar</Button>
                                    </div>
                                </div>
                            </div>
                            <div className='service-holder'>
                                <div style={{width:'60vw', height:'50vh',backgroundColor:'white',color:'black'}}>
                                    <div style={{height:'20vh',backgroundColor:'gray'}}>
                                        <h3>image holder</h3>
                                    </div>
                                    <div style={{heigth:'30vh'}}>
                                        <h3>Errands</h3>
                                        <p style={{fontSize:'1.5em'}}>¿Necesitas un favor especial o apoyo en una tarea?</p>
                                        <Button bsStyle='success' bsSize='large'>Solicitar</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='astro-invite' className='fs' style={{textAlign:'center',backgroundColor:'red',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',padding: 20,color:'white',height:'50vh'}}>
                            <p style={{fontSize:'2em'}}>¿Quieres ser <b>un astro</b>?</p>
                            <Button bsStyle='primary' bsSize='large'>SOLICITAR INVITACIÓN</Button>
                        </div>
                    </div>

                    <div className='home-footer'>
                    </div>
            </div>
        )
    }
}

let mapStateToProps=state=>{
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps,{getUser})(Home);
