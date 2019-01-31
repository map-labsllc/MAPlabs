import React, { Component } from 'react'
import Influences from './ContextualInfluences'

 export default class ContextualInfluenceGroups extends Component {
  constructor( props ){
    super( props )
    this.state = {
      propmt : []
    }
  }
  render(){
    const { groups } = this.props
    return (
      groups.map( group => (
        <Influences
          key = {group.code}
          question={group.text}
          name= {group.name}
        />

       ) )
    )
  }
}
