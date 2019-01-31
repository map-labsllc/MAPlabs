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
    return (
      this.props.questions.map( question => (
        <Influences
          question={question.text}
          group= {question.group}
        />

       ) )
    )
  }
}
