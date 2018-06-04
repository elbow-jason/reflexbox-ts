import * as React from 'react'
import contextTypes, { ContextTypesI } from './context-types'

class ReflexProvider<P> extends React.Component {
  childContextTypes: ContextTypesI

  constructor(props: P){
    super(props)
    this.childContextTypes = contextTypes
  }

  getChildContext () {
    return {
      reflexbox: this.props
    }
  }

  render () {
    return React.Children.only(this.props.children)
  }
}

export default ReflexProvider