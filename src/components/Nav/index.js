import React from 'react'
// import PropTypes from 'prop-types'
import {Navbar,Nav,NavItem,MenuItem,NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends React.Component {
    render () {
        return (
            <Navbar collapseOnSelect style={{backgroundColor:'transparent',border:0}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to='/'>Astro Demand</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>

                <Navbar.Collapse>
                    <Nav>
                        <NavItem eventKey={1} href="#">
                            {/*<Link to='/register'>Register</Link>
                            <Link to='/auth'>Login</Link>*/}

                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            {/*}<Link to='/tracking'>Tracking</Link>*/}
                        </NavItem>
                        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>Something else here</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>

        )
    }
}

export default NavigationBar;
