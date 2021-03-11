import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
var placeSearch, autocomplete;

class GoogleMap extends  Component{

    // AutoCompleteSearch = () =>{
    // autocomplete = new google.maps.places.Autocomplete(
    //     document.getElementById('autocomplete'), {types: ['geocode']});
    // autocomplete.setFields(['address_component']);
    // }


    // fillPlaceAddress = () => {
    // var place = autocomplete.getPlace();
    //
    // for (var component in componentForm) {
    //     document.getElementById(component).value = '';
    //     document.getElementById(component).disabled = false;
    // }
    //
    // // Get each component of the address from the place details,
    // // and then fill-in the corresponding field on the form.
    // for (var i = 0; i < place.address_components.length; i++) {
    //     var addressType = place.address_components[i].types[0];
    //     if (componentForm[addressType]) {
    //         var val = place.address_components[i][componentForm[addressType]];
    //         document.getElementById(addressType).value = val;
    //     }
    // }
    // }

    render() {
        return(
            <Map
                google={this.props.google}
                zoom={12}
                style={mapStyles}
                initialCenter={{lat: -6.13142 , lng: 106.774125}}
            >
            <Marker position={{lat: -6.233297, lng: 106.9010937}}/>
            <Marker position={{lat: -6.2809869, lng: 106.7140413}}/>
                <Marker position={{lat: -6.2269869, lng: 106.7430413}}/>
                <Marker position={{lat: -6.2434869, lng: 106.6540413}}/>
                <Marker position={{lat: -6.2909869, lng: 106.7940413}}/>
                <Marker position={{lat: -6.2609869, lng: 106.7840413}}/>
                <Marker position={{lat: -6.2509869, lng: 106.7740413}}/>
                <Marker position={{lat: -6.2609869, lng: 106.7340413}}/>
                <Marker position={{lat: -6.2709869, lng: 106.7940413}}/>
                <Marker position={{lat: -6.2809869, lng: 106.7240413}}/>
                <Marker position={{lat: -6.2909869, lng: 106.7540413}}/>
                <Marker position={{lat: -6.2109869, lng: 106.7140413}}/>

            </Map>
        )
    }
}

export default  GoogleApiWrapper({
// Insert Your API Key In Here
})(GoogleMap)

const mapStyles = {
    width: 1280,
    height: 800,
};


