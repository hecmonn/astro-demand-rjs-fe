import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {FaCheckCircle} from 'react-icons/fa';

class CashDesc extends React.Component {
   render () {
      const {tasks}=this.props;
      return (
         <div>

            {tasks._status==2 &&
               <Row style={{paddingBottom:15}}>
                  <Col xs={2} sm={2} md={2} lg={2}>
                     <FaCheckCircle style={{color:tasks._status==2?'green':'gray'}} size='25'/>
                  </Col>
                     <Col xs={8} sm={8} md={8} lg={8}>
                        <h4>Tu Astro está corriendo hacia ti</h4>
                        <p>Una vez que tu Astro llegue a <b>{tasks.pickUp.place}</b> se validará la cantidad entregada y se relizará un SPEI</p>
                     </Col>
                  <Col xs={2} sm={2} md={2} lg={2}>
                     {3==tasks._status &&
                        <Button bsStyle='default' bsSize='sm'>
                           <h3>1</h3>
                        </Button>
                     }
                  </Col>
               </Row>
            }
         </div>
      )
   }
}

CashDesc.propTypes={
   tasks: PropTypes.object.isRequired
}

export default CashDesc;
