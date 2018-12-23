import React from 'react';
// import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

import App from './components';
// import {setAuthToken} from './helpers/helpers';

// setAuthToken(localStorage.token);
const store=createStore(
        rootReducer,
        compose(
            applyMiddleware(thunk)
        )
);

class Main extends React.Component {
    render () {
        return(
            <BrowserRouter>
                <Provider store={store} >
                    <App/>
                </Provider>
            </BrowserRouter>
        )
    }
}


export default Main ;
