import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {FaCheckCircle} from 'react-icons/fa';
import isEmpty from 'is-empty';
import {Link} from 'react-router-dom';

class DeliveryDesc extends React.Component {

   render () {
      const {tasks}=this.props;
      console.log('tasks: ',tasks);
      return (
         <div>
            <Row style={{paddingBottom:15}}>
               <Col xs={2}>
                  <FaCheckCircle style={{color:tasks.pickUp._status==1?'green':'gray'}} size='25'/>
               </Col>
               <Col xs={8}>
                  <h4>Tu Astro iniciará en <span style={{fontWeight:'bold'}}>{tasks.pickUp.place}</span></h4>
                  <Link to='#'>Evidencia</Link>
               </Col>

            </Row>
            {!isEmpty(tasks) && tasks.delivery.map((r,i)=>{
               // if (i+2==currentTask) this.currentTaskId=r.orderId;
               return (
                  <div>
                     <Row key={i} style={{paddingBottom:15}}>
                        <Col xs={2} sm={2} md={2} lg={2}>
                           <FaCheckCircle style={{color:r._status==1?'green':'gray'}} size='25'/>
                        </Col>

                        <Col xs={10}>
                           <h4 style={{fontWeight:'bold'}}>{r.place}</h4>
                           <h4>
                              {r.instructions} <br />
                           Cualquier percance comunicate con {r.contactName} al {r.contactPhone}
                        </h4>
                     </Col>
                  </Row>
               </div>
            )
         })}
      </div>
   )
}
}

DeliveryDesc.propTypes={
   tasks: PropTypes.array.isRequired
};

export default DeliveryDesc;
