import * as React from 'react'
import { Box, BoxProps } from './box'
import contextTypes, { ContextTypesI } from './context-types'

export function Flex(props: BoxProps): React.StatelessComponent<BoxProps> {
  return Box(Object.assign({}, props, { flex: true }))
}