import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListGroup,Button,Grid, Row, Col } from 'react-bootstrap'
import LifeDescriptor from './lifeDescriptor'
import Arrows from './Arrows'
import { getUser } from '../store/user/reducer'
import { loadAllAnswersAC } from '../store/answers/actions'
import { getAnswers } from '../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
 } from '../store/answers/actions'


 class QuestionsList extends Component {
   constructor( props ){
     super()
     this.state= {
       currentIndex:0,
       page: 0,
       selections:[],
       persistingArray: [],
       clickedA:"link",
       clickedB:"link"
     }
   }

   checkSelections=()=> {

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
    var size = 5
    var arrayOfArrays = []
    for ( var i=0; i<arr.length; i+=size ) {
        arrayOfArrays.push( arr.slice( i,i+size ) )
    }

    return arrayOfArrays
  }


  addToPersistingArray =( field1, action, field2,cb ) =>  {

      const sentence = field1 + action + field2

      this.setState( {persistingArray: [...this.state.persistingArray,sentence]} )
      console.log( this.state.persistingArray )
  }

  render(){

    const { lifeDescriptors,isLoading,userId, onPersistCB,onCloseModalCB } = this.props
    let pages = this.splittingArray( lifeDescriptors )
    let list = pages.map( ( element ) => (
      element.map( ( ele,i ) =>(

        <LifeDescriptor
          key={i}
          data= { ele }
          showCheckedA= {
            (  )=> {
              const newArr = this.state.selections
              newArr[i]= "a"

             this.setState( {
               clickedA:'success',
               selections:newArr
             } )
             console.log( 'ed says put a title', newArr )
            }}
          showCheckedB= {
            ( )=> {
              const newArr = this.state.selections
              newArr[i]= "b"
              this.setState( {
               clickedB:'success',
               selections: newArr
              } )
              console.log( 'ed says put a title', newArr )
            }
          }
          checkedA= {this.state.clickedA}
          checkedB= {this.state.clickedB}
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
            <Grid>
              <Row>
                <Col sm={6} md={6} lg={6} >
                  <Arrows
                    direction="left"
                    clickFunction={ this.previousSlide( pages ) }
                    glyph="arrow-left"
                  />
                </Col>
                <Col sm={6} md={6}lg={6} >
                  <Arrows
                     direction="right"
                     clickFunction={ this.nextSlide( pages ) }
                     glyph="arrow-right"
                   />
                 </Col>
               </Row>
               <Row>
                 <Col sm={12}md={12} lg={12} align='bottom'>
                   <Button
                    onClick= {()=>{
                      onPersistCB( userId,this.state.persistingArray )
                      onCloseModalCB()
                   }}>Close</Button>
                 </Col>
               </Row>
              </Grid>
            </>
          )}
        </>
      )
    }
  }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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
