import React, { Component } from 'react'
import Influences from './ContextualInfluences'

 export default class ContextualInfluenceGroups extends Component {
  constructor( props ){
    super( props )

  }
  render(){
    const { groups, beliefs } = this.props
    return (
      groups.map( group => (
        <div>

          <Influences
            key = {group.code}
            beliefs = {beliefs}
            question={group.text}
            name= {group.name}
          />
        </div>
       ) )
    )
  }
}
