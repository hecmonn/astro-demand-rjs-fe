import React from 'react';
import PropTypes from 'prop-types';
import {Col,Button,ControlLabel} from 'react-bootstrap';
import Datetime from 'react-datetime';
import firebase from 'firebase';
import {Link} from 'react-router-dom';

class Shopping extends React.Component {
   constructor(props){
      super(props);
      this.state={
         order:{
            scheduled:1,
            date: new Date(),
            type:'shopping',
            file:null
         }
      }
      this.handleDateChange=this.handleDateChange.bind(this);
      this.handleChange=this.handleChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
   }
   handleChange(e){
      e.preventDefault();
      let file=e.target.files[0];
      console.log('handleChange file: ',file);
      this.setState({order:{...this.state.order,file}});
   }

   handleSubmit(e){
      const {file}=this.state;
      const storage=firebase.storage().ref('/shopping');

      // fileReader.onload=(fr)=>{
      //    console.log('filereader...', fr);
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
   }

   handleDateChange(date){
      let prevOrder=this.state.order;
      this.setState({order:{...prevOrder,date:date._d}})
   }

   render () {
      const {order}=this.state;
      console.log('shopping order: ',order);
      return (
         <div style={{height:'100vh',overflow:'scroll',display:'flex',justifyContent:'center',alignItems:'center',}}>
            <Col xs={12}>
               <h3 style={{textAlign:'center'}}>¡Sube tu lista de compras y nosotros nos encargamos!</h3>
                  <Col xs={12} sm={12} md={12} lg={12}>
                      <p style={{textAlign:'center',fontWeight:'bold'}}>¿Cuándo lo hacemos?</p>
                      {/*<Checkbox checked={!order.scheduled} onChange={()=>this.setState({order:{...order,scheduled:!order.scheduled}})}>Ahora</Checkbox>*/}
                      {order.scheduled &&
                          <div>
                              <Datetime
                                  onChange={this.handleDateChange}
                                  value={this.state.order.date}
                              /><br/>
                          </div>
                      }
                  </Col>
               <Button bsSize='small'>
                  <input
                     type="file"
                     name="myFile"
                     onChange={this.handleChange}
                  />
               </Button><br/><br/>
               <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  {/*<Button onClick={this.handleSubmit}>Subir</Button>*/}
                  <Link to={{pathname:'/confirmation',state:{order}}} style={{textDecoration:'none'}}><Button>Agendar orden</Button></Link>
               </div>
            </Col>
         </div>
      )
   }
}

export default Shopping;
