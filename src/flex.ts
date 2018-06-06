import * as React from 'react'
import { Box } from './box'
import contextTypes, { ContextTypesI } from './context-types'

export const Flex = <P={}>(props: P) => React.createElement(Box, Object.assign({}, props, { flex: true }))