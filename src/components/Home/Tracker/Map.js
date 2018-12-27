import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {mapsKeys} from '../../../config';
import isEmpty from 'is-empty';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state={
            currentLocation: {},
        };
    }
    static defaultProps = {
        center: {
            lat: 19.432608,
            lng: -99.133209
        },
        zoom: 13
    };

    componentWillReceiveProps(nextProps) {
        if(!isEmpty(this.props.coords) &&  this.props.coords!=nextProps.coords){
            const {coords}=this.props;
            let center={
                lat: coords.latitude,
                lng: coords.longitude
            }
            this.setState({center});
        }
    }

    render() {
        const {center}=this.state;
        const {latitude,longitude}=this.props.coords
        return (
            <div style={{ height: '30vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: mapsKeys.apiKey }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    >
                    <AnyReactComponent
                        lat={latitude}
                        lng={longitude}
                        text={'Astro Loc'}
                        />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;


// lat:19.432608,lng:-99.133209
