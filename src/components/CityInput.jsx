import { useContext, useRef } from "react";
import AppContext from "../provider/appContext";
import { getCityName } from "../services/weatherService";
import geoCoords from "../utils/geoCoords";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { IoMdLocate } from "react-icons/io";

function CityInput() {
  const input = useRef();
  const {
    app: { isDark },
    dispatchApp,
  } = useContext(AppContext);
  let time;
  return (
    <div className="input-group">
      <span
        onClick={async () => {
          const coords = await geoCoords();
          dispatchApp({
            type: "GEO_COORDS",
            payload: { lon: coords.longitude, lat: coords.latitude },
          });
          const { country, name } = await getCityName(
            coords.longitude,
            coords.latitude
          );
          dispatchApp({ type: "COUNTRY", payload: country });
          dispatchApp({ type: "CITY", payload: name });
          input.current.value = "";
        }}
        style={isDark ? { background: "#37435a" } : null}
      >
       
        <div className="location-icon">
        <IoMdLocate className="fa-solid" />
        </div>
        
        
      </span>
      {/* <i className="fa-solid fa-magnifying-glass search-icon"></i> */}
      <div className="fa-solid search-icon">
            <PiMagnifyingGlassBold className="fa-solid text-2xl" />
          </div>
      <input
        type="text"
        ref={input}
        style={isDark ? { background: "#232b39", color: "#fff" } : null}
        placeholder="Search for places ..."
        onInput={(e) => {
          const value = e.target.value;
          clearTimeout(time);
          time = setTimeout(() => {
            dispatchApp({ type: "CITY", payload: value });
          }, 500);
        }}
      />
    </div>
  );
}

export default CityInput;
