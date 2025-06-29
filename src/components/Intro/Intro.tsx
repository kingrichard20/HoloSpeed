import { AppState, ReducerAction, ReducerActionType, SpeedometerColor, useAppStore } from "@/modules/state/appstate";

import "./intro.css";

export function Intro(props: { state: AppState, dispatch: React.ActionDispatch<[action: ReducerAction]> }) {

  return (
    <div className="intro-bg">

      <div className="intro-color-container">
        {Object.values(SpeedometerColor).map((color, i) =>
          <span
            className={`${(props.state.speedColor === color ? "intro-color-swatch-selected" : "intro-color-swatch")} text-${color}`}
            onClick={(_e) => { props.dispatch({ type: ReducerActionType.SetSpeedColor, color }) }}
            key={i} />)}
      </div>

      <button onClick={async (e) => {
        e.preventDefault();

        try {

          const wakeLock = await navigator.wakeLock.request("screen");
          props.dispatch({ type: ReducerActionType.SetLockSentinel, wakeLock });

        } catch (err) {
          alert("[x] Failed to acquire WakeLockSentinel");
        }

        navigator.geolocation.getCurrentPosition((_pos) => {
          props.dispatch({ type: ReducerActionType.SetPermissionStatus, granted: true });
        }, (_err) => {
          alert("[x] Failed to get geolocation");
        });

      }}>
        Start
      </button>
    </div>
  )
}