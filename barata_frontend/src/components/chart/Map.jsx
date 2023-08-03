import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "leaflet/dist/leaflet.css";
import "/src/index.css"


const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  iconSize: [38, 38] // size of the icon
});

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};


export default function Map({source}) {
      
    const markers = source.map((item) => ({
        geocode: [parseFloat(item.data.lat), parseFloat(item.data.longt)],
        popUp: item.data.name, 
      }));

    const center = [
        markers.reduce((sum, marker) => sum + marker.geocode[0], 0) / markers.length,
        markers.reduce((sum, marker) => sum + marker.geocode[1], 0) / markers.length,
    ];

    console.log(center)

    return (
        <MapContainer className = "text-black" center={center} zoom={13}>

            <TileLayer 
            // attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            />


            <MarkerClusterGroup
            chunkedLoading
            iconCreateFunction={createClusterCustomIcon}>

                {markers.map((marker, index) => (
                <Marker key={index} position={marker.geocode} icon={customIcon}>
                    <Popup>{marker.popUp}</Popup>
                </Marker>
                ))}

            </MarkerClusterGroup>   
        </MapContainer>
    )
}


