import * as React from 'react'
import css from './css'
import defaultConfig from './config'
import contextTypes, { ContextTypesI } from './context-types'

export type ContextTyped = {contextTypes: ContextTypesI}
export type ReflexFunc<P> = <P>(props: P, context: ContextTypesI) => React.SFCElement<P> 
export type ReflexI<P> = ContextTyped & ReflexFunc<P>

export const reflex = <P>(component: any) => {
  const Reflex: any = <P>(props: P, context: ContextTypesI) => {
    const config = Object.assign({}, defaultConfig(), context.reflexbox)
    const next: P = css.configure<P>(config)(props)
    return React.createElement<P>(component, next)
  }

  Reflex.contextTypes = contextTypes

  return Reflex as ReflexI<P>
}

