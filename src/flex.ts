import * as React from 'react'
import { Box, BoxProps } from './box'
import contextTypes, { ContextTypesI } from './context-types'

export function Flex<P={}>(props: P): React.StatelessComponent<P & BoxProps> {
  return Box<P>(Object.assign({}, props, { flex: true }))
}