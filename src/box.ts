import * as React from "react"
import { reflex, ReflexI} from './reflex'
import { ContextTypesI } from "./context-types"

export function Box<P>(props: P): React.StatelessComponent<P> {
  return reflex<P>('div')
}
