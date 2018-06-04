import { shape, arrayOf, number, Requireable } from 'prop-types'

export interface ReflexBoxShape {
  breakpoints: Requireable<number[]>
  space: Requireable<number[]>
}
export interface ContextTypesI {
  reflexbox: Requireable<ReflexBoxShape>
}

const contextTypes: ContextTypesI = {
  reflexbox: shape({
    breakpoints: arrayOf(number),
    space: arrayOf(number),
  })
}

export default contextTypes