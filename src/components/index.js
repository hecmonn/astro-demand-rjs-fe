import React from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './Home';
import * as firebase from 'firebase';
import {firebaseConfig} from '../config';
import {getUser} from '../actions/auth';
import Nav from './Nav';
import Register from './Auth/Register';
import Auth from './Auth';
import Services from './Services';
import Errands from './Services/Errands';
import Delivery from './Services/Delivery';
// import Tracking from './Services/Tracking';
import Tracker from './Home/Tracker';
import SideBar from './Globals/SideBar';


class App extends React.Component {

    componentWillMount() {
        firebase.initializeApp(firebaseConfig)
    }

    render () {
        return(
            <div className="main-app">
                <SideBar />
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/errands" component={Errands} />
                <Route exact path="/delivery" component={Delivery} />
                <Route exact path="/tracking/:order" component={Tracker} />

                <Route exact path="/services" component={Services} />
            </div>
        )
    }
}

export default App;
