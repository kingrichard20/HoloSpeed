import React, { ReactNode } from "react";

export const True = (props: { children?: ReactNode }) => props.children;
export const False = (props: { children?: ReactNode }) => props.children;

// <True> must come before <False>
export function ConditionalComponent(props: { cond: boolean, children: ReactNode }) {
  return React.Children.toArray(props.children)[Number(!props.cond)];
}