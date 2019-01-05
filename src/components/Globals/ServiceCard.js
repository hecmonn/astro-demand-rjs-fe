import React from 'react';
import PropTypes from 'prop-types';
import {Col,Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FaTruck,FaAmericanSignLanguageInterpreting,FaShoppingCart} from 'react-icons/fa';
import df from 'dateformat';
import {descriptionTranslator,statusTranslator} from '../../lib/helpers';

class ServiceCard extends React.Component {
   constructor(props){
      super(props);
      this.state={
         orders: this.props.orders
      }
   }
   render () {
      const {orders}=this.state;
      console.log('orders: ',orders);
      return (
         <div>
            {orders.map((r,i)=>{
               let date=df(r.date,'mm/dd HH:MM');
               const {_status,astroName}=r;
               console.log('sc r:',r);
               let description=descriptionTranslator(r.type);
               let {status}=statusTranslator({_status,astroName});
               //icon logic
               let icon;
               if(r.type=='delivery') {
                  icon=<FaTruck size={25} className='icon-lg' />;
               }  else if (r.type=='cash'){
                  icon=<FaAmericanSignLanguageInterpreting size={25} className='icon-lg' />;
               } else if (r.type=='shopping'){
                  icon=<FaShoppingCart size={25} />
               }

               return (
                  <Col xs={12} key={i} style={{padding:0,margin:0}}>
                     <Col xs={1} sm={1} md={1} lg={1} style={{padding:0,margin:0}}>
                        <br />
                        {icon}
                     </Col>
                     <Col xs={10} sm={10} md={4} lg={4}>
                        <Link to={`/tracking/${r.key}`}><h4>{description.type}</h4></Link>
                        <h5>{status}</h5>
                        <h6 style={{color:'gray'}}>{date}</h6>
                     </Col>
                  </Col>
               )
            })}
         </div>
      )
   }
}

ServiceCard.propTypes={
   orders: PropTypes.array.isRequired
}

export default ServiceCard;
