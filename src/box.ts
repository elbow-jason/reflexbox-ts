import * as React from "react"
import { reflex, ReflexI} from './reflex'
import { ContextTypesI } from "./context-types"

export interface BoxProps {
  w?: number | string,
  h?: number | string,
  
  flex?: boolean,
  wrap?: boolean,
  column?: boolean,
  auto?: boolean,
  order?: number,
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline",
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly",

  m?: number | string,
  mx?: number | string,
  my?: number | string,
  mt?: number | string,
  mb?: number | string,
  ml?: number | string,
  mr?: number | string,

  p?: number | string,
  px?: number | string,
  py?: number | string,
  pt?: number | string,
  pb?: number | string,
  pl?: number | string,
  pr?: number | string,
}

export function Box(props: BoxProps): React.StatelessComponent<BoxProps> {
  return reflex<BoxProps>('div')
}
