import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListGroup,Button } from 'react-bootstrap'
import LifeDescriptor from './lifeDescriptor'
import Arrows from './Arrows'
import { getUser } from '../store/user/reducer'
import { loadAllAnswersAC } from '../store/answers/actions'
import { getAnswers } from '../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
// import { getUser } from '../store/users/reducer'
import * as actions from '../store/staticdata/actions'


 class QuestionsList extends Component {
   constructor( props ){
     super()
     this.state= {
       currentIndex:0,
       page: 0,
       persistingArray: []
     }
   }
  //  componentDidMount = async ( ) => {
   //
  //      const { dispatch, userId } = this.props
  //      try {
  //
  //        await dispatch( loadAllAnswersAC( userId ) )
  //        await dispatch( loadAllTransitionsAC( userId ) )
  //        await dispatch( loadAllStaticdataAC() )
  //
  //      } catch ( error ) {
  //        console.error( error )
  //      }
  //    }

   previousSlide= ( arr ) => e => {
     const lastIndex = arr.length
     const {currentIndex} = this.state
     const shouldResetIndex = currentIndex === 0
     const index =  shouldResetIndex ? lastIndex : currentIndex - 1
     const page = this.state.page > 0 ? this.state.page - 1 : lastIndex - 1

     this.setState( {
       currentIndex : index,
       page
     } )

   }

  nextSlide = ( arr ) => e => {
   const lastIndex = arr.length
   const { currentIndex } = this.state
   const shouldResetIndex = currentIndex === lastIndex
   const index =  shouldResetIndex ? 0 : currentIndex + 1
   const page = this.state.page < lastIndex - 1 ? this.state.page + 1 : 0

   this.setState( {
     currentIndex: index,
     page
   } )
 }

  splittingArray= ( arr ) => {
    var size = 10
    var arrayOfArrays = []
    for ( var i=0; i<arr.length; i+=size ) {
        arrayOfArrays.push( arr.slice( i,i+size ) )
    }

    return arrayOfArrays
  }

  addToPersistingArray =( field1, action, field2 ) =>  {

    console.log( 'addToPersisting>>>>>' )
      const sentence = field1 + action + field2


      this.setState( {persistingArray: [...this.state.persistingArray,sentence]} )
      console.log( this.state.persistingArray )
  }
  render(){
    const { lifeDescriptors,isLoading,userId, onPersistCB,onCloseModalCB } = this.props
    let pages = this.splittingArray( lifeDescriptors )
    let list = pages.map( ( element ) => (
      element.map( ele =>(
        <LifeDescriptor
          data= { ele }
          addingData = { this.addToPersistingArray }
        />

      ) )
    ) )
      return(
        <>
          <p>{( ( isLoading ) ? "loading...." : ""  )}</p>
          {!isLoading && (
            <>

            { list[this.state.page] }
            <Arrows
            direction="left"
            clickFunction={ this.previousSlide( pages ) }
            glyph="&#9664;"
            />
            <Arrows
             direction="right"
             clickFunction={ this.nextSlide( pages ) }
             glyph="&#9654;"
             />
             <Button
              onClick= {()=>{
                onPersistCB( userId,this.state.persistingArray )
                onCloseModalCB()
             }}>Close</Button>
            </>
          )}
        </>
      )
    }
  }


// Wrap in container to get access to store and dispatch
const mapStateToProps = ( state,passedProps ) => {
  console.log( 'ststetet', state )
  const {question,instructions,onCloseModalCB} = passedProps
  return {
    isLoading: state.answersRD.isLoading || state.staticdataRD.isLoading,
    userId: getUser( state.userRD ).user_id,
    question,
    instructions,
    onCloseModalCB,
    lifeDescriptors: state.staticdataRD.lifeDescriptions,
    persistant_array: state.persistant_array
  }
}

const mapDispatchToProps = ( dispatch,passedProps ) => {
  const onPersist = ( userId, lifeDescriptionsArray ) => {
    const {question} = passedProps
  
    dispatch( updateAnswersAC( question.code, lifeDescriptionsArray ) )
    dispatch( persistAnswersAC( userId, question.code, lifeDescriptionsArray ) )
  }
  return {
    onPersistCB: onPersist
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( QuestionsList )
