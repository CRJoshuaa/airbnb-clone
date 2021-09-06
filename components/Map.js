import { getCenter } from 'geolib';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

function Map({searchResults}) {

        /// transform into lat long object

        const [selectedLocation,setSelectedLocation]=useState({})

        const coordinates=searchResults.map(result =>({
            longitude:result.long,
            latitude:result.lat,
        }))

        const center=getCenter(coordinates)

        const [viewport,setViewport]=useState({
            width:"100%",
            height:"100%",
            latitude:center.latitude,
            longitude:center.longitude,
            zoom:11
        })


    console.log(selectedLocation)

    return (
        <ReactMapGL
            mapStyle="mapbox://styles/crjoshuaa99/ckt8mc8333htm17nshxoh8udr"
            mapboxApiAccessToken={process.env.MAPBOX_KEY}
            {...viewport}
            onViewportChange={(nextViewport)=> setViewport(nextViewport)} 
        >
            {searchResults.map(location =>(
                <div key={location.long}>
                    <Marker
                        longitude={location.long}
                        latitude={location.lat}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p
                            role="img"
                            className="cursor-pointer text-2xl animate-pulse"
                            aria-label="push-pin"
                            onClick={()=>setSelectedLocation(location)}
                        >📌</p>
                    </Marker>
                    {/* pop up */}
                    {selectedLocation.long === location.long ?(
                        <Popup
                            onClose={()=>setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={location.lat}
                            longitude={location.long}
                        >
                            {location.title}
                        </Popup>
                    ):(false)}
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
