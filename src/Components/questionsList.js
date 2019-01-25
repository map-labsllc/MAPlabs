import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListGroup } from 'react-bootstrap'
import LifeDescriptor from './lifeDescriptor'
// import excersizes from '../store/reducers/exercizes'
import Arrows from './Arrows'
import { loadAllAnswersAC } from '../store/answers/actions'
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
   componentDidMount = async ( ) => {

       const { dispatch, userId } = this.props
       try {
         await dispatch( loadAllAnswersAC( userId ) )
         await dispatch( loadAllTransitionsAC( userId ) )
         await dispatch( loadAllStaticdataAC() )
       } catch ( error ) {
         console.error( error )
       }
     }

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
    const {
      addToPersistingArray
    } = this.props
    console.log( 'addToPersisting>>>>>' )
      const sentence = field1 + action + field2
      // const newPersistingArray = [...persistant_array]

      addToPersistingArray( sentence )
      // this.setState( {persistingArray: newPersistingArray} )
      // console.log( this.props.persistant_array )
  }
  render(){
    console.log( this.props.persistant_array )
    const { lifeDescriptors,isLoading } = this.props
    console.log( 'LERROOYYYYYYYYY JENKINNNSSSSSS',this.props )
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
          </>
        )}
      </>
    )
  }
}


// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  console.log( 'ststetet', state )
  return {
    isLoading: state.answersRD.isLoading || state.staticdataRD.isLoading,
    userId: 1,
    lifeDescriptors: state.staticdataRD.lifeDescriptions,
    persistant_array: state.persistant_array
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators( actions, dispatch )
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( QuestionsList )
