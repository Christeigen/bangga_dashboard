import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import "/src/index.css"


const activeIcon = new Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/1A1A1A/marker.png", 
  iconSize: [35, 35],
});

const inactiveIcon = new Icon({
  iconUrl: "https://img.icons8.com/ios-filled/50/FA5252/marker.png",
  iconSize: [35, 35],
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};


export default function Map({source}) {

    console.log(source[0].data.status)
      
    const markers = source.map((item) => ({
        geocode: [parseFloat(item.data.lat), parseFloat(item.data.longt)],
        popUp: item.data.name, 
        status: item.data.status,
      }));

    const center = [
        markers.reduce((sum, marker) => sum + marker.geocode[0], 0) / markers.length,
        markers.reduce((sum, marker) => sum + marker.geocode[1], 0) / markers.length,
    ];

    return (
        <MapContainer className = "text-black" center={center} zoom={10}>

            <TileLayer 
            // attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />


            <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}>

                {markers.map((marker, index) => (
                <Marker 
                key={index} 
                position={marker.geocode} 
                icon={marker.status === "aktif" ? activeIcon : inactiveIcon}
                // icon={customIcon}
                >
                    <Popup>{marker.popUp}</Popup>
                </Marker>
                ))}

            </MarkerClusterGroup>   
        </MapContainer>
    )
}


