import React from 'react';
import PropTypes from 'prop-types';
import {Row,Col,Button} from 'react-bootstrap';
import {FaCheckCircle} from 'react-icons/fa';
import isEmpty from 'is-empty';

class DeliveryDesc extends React.Component {

    render () {
        const {tasks}=this.props;
        return (
            <div>
                {!isEmpty(tasks) && tasks.map((r,i)=>{
                    // if (i+2==currentTask) this.currentTaskId=r.orderId;
                    return (
                        <Row key={i} style={{paddingBottom:15}}>
                            <Col xs={2} sm={2} md={2} lg={2}>
                                <FaCheckCircle style={{color:r._status==1?'green':'gray'}} size='25'/>
                            </Col>

                            <Col xs={8} sm={8} md={8} lg={8}>
                                <h4 style={{fontWeight:'bold'}}>{r.place}</h4>
                                    <h4>
                                        {r.instructions} <br />
                                        Cualquier percance comunicate con {r.contactName} al {r.contactPhone}
                                    </h4>
                            </Col>

                            <Col xs={2} sm={2} md={2} lg={2}>
                                {i+2==r._status &&
                                    <Button bsStyle='default' bsSize='sm'>
                                        <h3>i</h3>
                                    </Button>
                                }
                            </Col>
                        </Row>
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
