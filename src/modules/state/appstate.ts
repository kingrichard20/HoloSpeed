import { useReducer } from "react";
import { Opt } from "../types";

export enum SpeedometerColor {
  White = "white",
  Pink = "pink",
  Yellow = "yellow",
  Red = "red",
  SatRed = "satred"
};

export type AppState = {
  speed: number;
  speedColor: SpeedometerColor;
  permissionsGranted: boolean;
  wakeLock: Opt<WakeLockSentinel>; // May have to release it at some point
}

const initialAppState: AppState = {
  speed: 0,
  speedColor: SpeedometerColor.White,
  permissionsGranted: false,
  wakeLock: null
}

export enum ReducerActionType {
  SetSpeed,
  SetSpeedColor,
  SetPermissionStatus,
  SetLockSentinel
}

export type ReducerAction =
  { type: ReducerActionType.SetSpeed, speed: number } |
  { type: ReducerActionType.SetSpeedColor, color: SpeedometerColor } |
  { type: ReducerActionType.SetPermissionStatus, granted: boolean } |
  { type: ReducerActionType.SetLockSentinel, wakeLock: WakeLockSentinel };

function appStateReducer(state: AppState, action: ReducerAction): AppState {
  switch (action.type) {
    case ReducerActionType.SetSpeed:
      return { ...state, speed: action.speed };
    case ReducerActionType.SetSpeedColor:
      return { ...state, speedColor: action.color };
    case ReducerActionType.SetPermissionStatus:
      return { ...state, permissionsGranted: action.granted };
    case ReducerActionType.SetLockSentinel:
      return { ...state, wakeLock: action.wakeLock };
    default:
      return state;
  }
}

export function useAppStore() {
  return useReducer(appStateReducer, initialAppState);
}