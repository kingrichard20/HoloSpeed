import { MPS_TO_MPH } from "@/modules/math";
import "./app.css"

import { useState, useEffect, useRef } from "react"

// May not need to use haversine on certain devices.
type AppState = {
  // lastUpdateTimeMs: number;
  speed: number;
  // pos: (GeolocationPosition | null);
};

export function App() {

  const wakeLockRef = useRef<WakeLockSentinel>(null);
  const [state, setState] = useState<AppState>({ speed: 0 });



  useEffect(() => {

    async function keepAwake() {
      try {
        wakeLockRef.current = await navigator.wakeLock.request("screen");

        document.onvisibilitychange = async () => {
          if (wakeLockRef.current !== null && document.visibilityState === 'visible') {
            wakeLockRef.current = await navigator.wakeLock.request('screen');
          }
        };
      } catch (err) {
        alert("[x] WakeLock request failed")
      }
    }
    keepAwake();

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
        alert(`[x] Error: ${err.message}`);
      },
      // 
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    // function toggleFullscreen(_e: MouseEvent) {
    //   document.documentElement.requestFullscreen();
    // }
    // document.documentElement.addEventListener("click", toggleFullscreen);

    // 
    return () => {
      navigator.geolocation.clearWatch(geoWatch);
      // document.documentElement.removeEventListener("click", toggleFullscreen);
      if (wakeLockRef.current !== null) {
        wakeLockRef.current.release();
      }
    }

  }, []);

  return (<div className="app-body">
    <span className="text-speedometer text-red text-digital">{~~(state.speed)}</span>
  </div>)
}