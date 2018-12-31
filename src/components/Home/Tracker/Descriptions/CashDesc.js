import React from 'react';
import PropTypes from 'prop-types';

class CashDesc extends React.Component {
    render () {
        return (
            <h1>Cash steps</h1>
        )
    }
}

CashDesc.propTypes={
    tasks: PropTypes.array.isRequired
}

export default CashDesc;
