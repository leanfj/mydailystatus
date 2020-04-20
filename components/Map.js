import React from "react";
import GoogleMapReact from "google-map-react";
const PinComponent = ({ pinStyle }) => <div className={pinStyle}></div>;
const Map = (props) => {
  const center = props.markers.filter((marke) => {
    if (marke.id === props.user) {
      return true;
    }
  });
  return (
    <div style={{ height: "400px", width: "100%" }} className="mt-4">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.maps }}
        defaultCenter={{
          lat: center[0].coords.lat,
          lng: center[0].coords.long,
        }}
        defaultZoom={15}
      >
        {props.markers.map((marke) => {
          return (
            <PinComponent
              lat={marke.coords.lat.toFixed(6)}
              lng={marke.coords.long.toFixed(6)}
              pinStyle={marke.id === props.user ? "yourPin" : "otherPin"}
              key={marke.id}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
