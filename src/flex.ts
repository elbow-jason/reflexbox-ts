import { createElement, SFCElement } from 'react'
import Box from './box'

const Flex = <P={}>(props: P) => createElement(Box, Object.assign({}, props, { flex: true }))

export default Flex