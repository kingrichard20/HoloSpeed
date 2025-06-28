import { MPS_TO_MPH } from "@/modules/math";
import "./app.css"

import { useState, useEffect } from "react"

// May not need to use haversine on certain devices.
type AppState = {
  // lastUpdateTimeMs: number;
  speed: number;
  // pos: (GeolocationPosition | null);
};

export function App() {

  const [state, setState] = useState<AppState>({ speed: 0 });



  useEffect(() => {

    // Setup pos watcher
    const geoWatch = navigator.geolocation.watchPosition(
      // 
      (pos) => {

        console.log(pos.coords.speed);

        setState((oldState) => {
          // const dTime = (pos.timestamp - oldState.lastUpdateTimeMs);
          return {
            speed: (pos.coords.speed! * MPS_TO_MPH)
          }
        })
      },
      //
      (err) => {
        alert(`Error: ${err.message}`);
      },
      // 
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    function toggleFullscreen(_e: MouseEvent) {
      document.body.requestFullscreen();
    }
    document.addEventListener("click", toggleFullscreen);

    // 
    return () => {
      navigator.geolocation.clearWatch(geoWatch);
      document.removeEventListener("click", toggleFullscreen);
    }

  }, []);

  return (<div className="app-body">
    <span className="text-speedometer text-pink text-digital">{~~(state.speed)}</span>
  </div>)
}