import { True, False, ConditionalComponent } from "../Conditional/Conditional";
import { useAppStore } from "@/modules/state/appstate";
import { Intro } from "../Intro/Intro";

import "./app.css"
import { Speedometer } from "../Speedometer/Speedometer";


export function App() {

  const [state, dispatch] = useAppStore();

  // const wakeLockRef = useRef<WakeLockSentinel>(null);
  // const [state, setState] = useState<AppState>({ speed: 0 });



  // useEffect(() => {

  //   async function keepAwake() {
  //     try {
  //       wakeLockRef.current = await navigator.wakeLock.request("screen");
  //     } catch (err) {
  //       alert("[x] WakeLock request failed")
  //     }
  //   }
  //   keepAwake();

  //   // Setup pos watcher
  //   const geoWatch = navigator.geolocation.watchPosition(
  //     // 
  //     (pos) => {

  //       console.log(pos.coords.speed);

  //       setState((oldState) => {
  //         // const dTime = (pos.timestamp - oldState.lastUpdateTimeMs);
  //         return {
  //           speed: (pos.coords.speed! * MPS_TO_MPH)
  //         }
  //       })
  //     },
  //     //
  //     (err) => {
  //       alert(`[x] Error: ${err.message}`);
  //     },
  //     // 
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 5000,
  //       maximumAge: 0
  //     }
  //   );

  //   // function toggleFullscreen(_e: MouseEvent) {
  //   //   document.documentElement.requestFullscreen();
  //   // }
  //   // document.documentElement.addEventListener("click", toggleFullscreen);

  //   // 
  //   return () => {
  //     navigator.geolocation.clearWatch(geoWatch);
  //     // document.documentElement.removeEventListener("click", toggleFullscreen);
  //     if (wakeLockRef.current !== null) {
  //       wakeLockRef.current.release();
  //     }
  //   }

  // }, []);

  // console.log(state);

  return (<div className="app-body">
    <ConditionalComponent cond={state.permissionsGranted}>
      <True>
        <Speedometer state={state} dispatch={dispatch} />
      </True>
      <False>
        <Intro state={state} dispatch={dispatch} />
      </False>
    </ConditionalComponent>
  </div>)
}