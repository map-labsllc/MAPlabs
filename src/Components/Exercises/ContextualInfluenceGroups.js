import React, { Component } from 'react'
import Influences from './ContextualInfluences'
import { Button } from 'react-bootstrap'
 export default class ContextualInfluenceGroups extends Component {
  constructor( props ){
    super( props )
    this.state = {

    }
    this.uuid = 1
  }
  // UUID to be used as the component key
  //
  // // get new UUID
  // getUUID = () => {
  //   console.log( "Influences::getUUID() returning ", this.uuid + 1 )
  //   return this.uuid++
  // }
  //
  // // make a new influenceWithKey
  // getNewInfluencesWithKey = ( influence ) => ( {
  //   key: this.getUUID(),
  //   influence,
  // } )
  //
  // // strip keys
  // stripKeys = ( influencesWithKeys ) => influencesWithKeys.map( influenceWithKey => influenceWithKey.influence )
  //
  // // add keys
  // // addKeys = (influences) => influences.map(influence => ({ key: this.getUUID() , influence}))
  // addKeys = ( influences ) => influences.map( ( influence ) => {
  //   console.log( "addKeys: ", influence )
  //   return { key: this.getUUID(), influence }
  // } )
  // // -------------------------------------------------------
  //
  // state = {
  //   isDirty: false,
  //   influencesWithKeys: this.addKeys( this.props.previousInfluences )
  // }
  // updateInfluence = ( key, newInfluence ) => {
  //   console.log( `Influences::updateInfluences(${key}, ${newInfluence})` )
  //
  //   const { onUpdateStoreCB } = this.props
  //   const { influencesWithKeys } = this.state
  //
  //   const newInfluencesWithKeys = influencesWithKeys.map( influenceWithKey =>
  //     ( influenceWithKey.key === key ) ? { key: key, influence: newInfluence } : influenceWithKey )
  //
  //   onUpdateStoreCB( this.stripKeys( newInfluencesWithKeys ) )
  //   this.setState( { influencesWithKeys: newInfluencesWithKeys } )
  // }
  //
  // onBlur = ( e ) => {
  //   console.log( "Influences::onBlur(), e: ", e.target.value )
  //   const { updateInfluenceCB, id } = this.props
  //   const { isDirty, influence } = this.state
  //   if ( isDirty ) {
  //     updateInfluenceCB( id, influence )
  //     this.setState( {
  //       isDirty: false,
  //     } )
  //   }
  // }
  // // add an empty transition to state::influences
  // onclickAdd = () => {
  //   console.log( `Influences::onclickAdd()` )
  //   const { transitionsWithKeys } = this.state
  //
  //   const newInfluencesWithKeys = influencesWithKeys.concat( this.getNewInfluenceWithKey( { from: '', to: '' } ) )
  //   console.log( "newInfluencesWithKeys: ", newInfluencesWithKeys )
  //   this.setState( { influencesWithKeys: newInfluencesWithKeys } )
  // }
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
