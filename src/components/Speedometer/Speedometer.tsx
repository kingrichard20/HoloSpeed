import { MPS_TO_MPH } from "@/modules/math";
import { AppState, ReducerAction, ReducerActionType } from "@/modules/state/appstate";
import { useEffect, useState } from "react";

export function Speedometer(props: { state: AppState, dispatch: React.ActionDispatch<[action: ReducerAction]> }) {

  useEffect(() => {

    // Setup pos watcher
    const geoWatch = navigator.geolocation.watchPosition(
      // 
      (pos) => {
        // console.log(Date.now(),"Pos updated");
        props.dispatch({ type: ReducerActionType.SetSpeed, speed: (pos.coords.speed! * MPS_TO_MPH) });
      },

      //
      (err) => alert(`[x] Error: ${err.message}`),
      // 
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => {
      // console.log("cleanup")
      navigator.geolocation.clearWatch(geoWatch);
      // props.state.wakeLock!.release(); // Can't use the speed prop in the store because it will release this.
    }
  }, []);

  return <span className={`text-speedometer text-${props.state.speedColor} text-digital`}>{~~(props.state.speed)}</span>
}