import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListGroup, Button, Grid, Row, Col } from 'react-bootstrap'
import ShowMoreLess from '../Utils/ShowMoreLess'
import LifeDescriptor from './lifeDescriptor'
import Arrows from '../Utils/Arrows'
import { getUser } from '../../store/user/reducer'
import { loadAllAnswersAC } from '../../store/answers/actions'
import { getAnswers } from '../../store/answers/reducer'
import '../../CSS/ModalNavButtons.css'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../store/answers/actions'

const NUM_PER_PAGE = 5

class QuestionsList extends Component {
  constructor( props ) {
    super()
    this.state = {
      currentIndex: 0,
      page: 0,
      selections: [],
      persistingArray: [],
    }
  }

  previousSlide = ( arr ) => e => {
    const lastIndex = arr.length
    const { currentIndex } = this.state
    const shouldResetIndex = currentIndex === 0
    const index = shouldResetIndex ? lastIndex : currentIndex - 1
    const page = this.state.page > 0 ? this.state.page - 1 : lastIndex - 1

    this.setState( {
      currentIndex: index,
      page
    } )

  }

  nextSlide = ( arr ) => e => {
    const lastIndex = arr.length
    const { currentIndex } = this.state
    const shouldResetIndex = currentIndex === lastIndex
    const index = shouldResetIndex ? 0 : currentIndex + 1
    const page = this.state.page < lastIndex - 1 ? this.state.page + 1 : 0

    this.setState( {
      currentIndex: index,
      page
    } )
  }

  splittingArray = ( arr ) => {
    var size = NUM_PER_PAGE
    var arrayOfArrays = []
    for ( var i = 0; i < arr.length; i += size ) {
      arrayOfArrays.push( arr.slice( i, i + size ) )
    }

    return arrayOfArrays
  }


  addToPersistingArray = ( field1, action, field2, cb ) => {

    const sentence = field1 + action + field2

    this.setState( { persistingArray: [...this.state.persistingArray, sentence] } )
    console.log( this.state.persistingArray )
  }

  buildingCongruentSentence = ( lifedescriptor, aOrB ) => {

    let structured = lifedescriptor.description.split( '#' )
    let first = structured[0]
    let second = structured[1]
    const sentence = first + ( aOrB === 'a' ? lifedescriptor.a : lifedescriptor.b ) + second
    return sentence

  }
  render() {

    const { isDynamic, lifeDescriptors, isLoading, userId, onPersistCB, onCloseModalCB } = this.props

    let pages = this.splittingArray( lifeDescriptors )
    let list = pages.map( ( element, pageNum ) => (
      element.map( ( ele, i ) => {
        const idxLifedescriptions = i + pageNum * NUM_PER_PAGE
        return (
          <LifeDescriptor
            key={idxLifedescriptions}
            data={ele}
            showCheckedA={
              () => {
                const newArr = this.state.selections
                newArr[idxLifedescriptions] = "a"
                this.setState( {
                  clickedA: 'success',
                  selections: newArr
                } )
              }}
            showCheckedB={
              () => {
                const newArr = this.state.selections
                newArr[idxLifedescriptions] = "b"
                this.setState( {
                  clickedB: 'success',
                  selections: newArr
                } )
                console.log( 'ed says put a title', newArr )
              }
            }
            checkedA={this.state.selections[idxLifedescriptions] === 'a'}
            checkedB={this.state.selections[idxLifedescriptions] === 'b'}
            addingData={this.addToPersistingArray}
          />

        )
      } )
    ) )

    // Static version of the exercise
    // ------------------------------
    if ( !isDynamic ) {
      const { previousAnswers } = this.props
      return (
        <>
          <p><strong>Previous answers:</strong></p>
          {previousAnswers.map( ( previousAnswer, idx ) =>
            <p key={idx}>- {previousAnswer}</p>
          )}
          <hr className="divider" />
        </>
      )

      // const sentences = []
      // const { lifeDescriptors } = this.props
      // for (let i = 0; i < lifeDescriptors.length; i++) {
      //   if (this.state.selections[i]) {
      //     let sentence = this.buildingCongruentSentence(lifeDescriptors[i], this.state.selections[i])
      //     sentences.push(sentence)
      //   }
      // }
      //
      // return (
      //   <>
      //     {sentences.map((sentence, idx) => (
      //       <p key={idx}>{sentence.text}</p>
      //     ))}
      //   </>
      // )

    }

    // Dynamic ersion of the exercise
    // ------------------------------
    return (
      <>
        <p>{( ( isLoading ) ? "loading...." : "" )}</p>
        {!isLoading && (
          <>

            {list[this.state.page]}
            <br />
            <div className="container-fluid">
              <div style={style.left}>
                <Arrows
                  direction="left"
                  clickFunction={this.previousSlide( pages )}
                  glyph="arrow-left"
                />
              </div>
              <div style={style.center}>
                <Button
                  className="closeButton"
                  onClick={() => {
                    const sentences = []

                    for ( let i = 0; i < lifeDescriptors.length; i++ ) {
                      if ( this.state.selections[i] ) {
                        let sentence = this.buildingCongruentSentence( lifeDescriptors[i], this.state.selections[i] )
                        sentences.push( sentence )

                      }
                    }
                    onPersistCB( userId, sentences )
                    onCloseModalCB()
                  }}>Close</Button>
              </div>
              <div style={style.right}>
                <Arrows
                  direction="right"
                  clickFunction={this.nextSlide( pages )}
                  glyph="arrow-right"
                />
              </div>
            </div>
          </>
        )}
      </>
    )
  }
}
const style = {
  right: {
    display: "inline-block",
    float: "right",
  },
  left: {
    display: "inline-block",
    float: "left",
  },
  center: {
    display: "inline-block",
    marginLeft: "42%"
  }
}


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Wrap in container to get access to store and dispatch
const mapStateToProps = ( state, passedProps ) => {
  console.log( 'state', state )
  const { isDynamic, description, question, instructions, onCloseModalCB } = passedProps

  // find previous answers, if any, to display when static
  let previousAnswers = []
  if ( !isDynamic )
    previousAnswers = getAnswers( state.answersRD, question.code )

  return {
    isLoading: state.answersRD.isLoading || state.staticdataRD.isLoading,
    userId: getUser( state.userRD ).user_id,
    description,
    question,
    instructions,
    isDynamic,
    previousAnswers,
    onCloseModalCB,
    lifeDescriptors: state.staticdataRD.lifeDescriptions,
    persistant_array: state.persistant_array
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const mapDispatchToProps = ( dispatch, passedProps ) => {
  const onPersist = ( userId, lifeDescriptionsArray ) => {
    const { question } = passedProps

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
