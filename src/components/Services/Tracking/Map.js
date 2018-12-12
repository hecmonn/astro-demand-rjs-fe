import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapsKeys} from '../../../config';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state={
            currentLocation: {}
        };
    }
    static defaultProps = {
        center: {
            lat: 19.432608,
            lng: -99.133209
        },
        zoom: 17
    };

    render() {
        return (
            <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapsKeys.apiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                    <AnyReactComponent
                        lat={19.432608}
                        lng={-99.133209}
                        text={'Kreyser Avrora'}
                        />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;


// lat:19.432608,lng:-99.133209
