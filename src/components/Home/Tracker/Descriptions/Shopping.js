import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {FaCheckCircle} from 'react-icons/fa';

class ShoppingDesc extends React.Component {
   render () {
      const {tasks}=this.props;
      return (
         <Row style={{paddingBottom:15}}>
            <Col xs={2}>
               <FaCheckCircle style={{color:tasks._status==2?'green':'gray'}} size={25}/>
            </Col>
               <Col xs={8}>
                  <h4>Tu Astro está corriendo por tus productos</h4>
               </Col>
            <Col xs={2}>
               {3==tasks._status &&
                  <Button bsStyle='default' bsSize='sm'>
                     <h3>1</h3>
                  </Button>
               }
            </Col>
         </Row>
      )
   }
}

ShoppingDesc.propTypes={
   tasks: PropTypes.object.isRequired
}

export default ShoppingDesc;
