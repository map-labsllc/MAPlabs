import React, { Component } from 'react'
import {
  Button,
 } from 'react-bootstrap'

import LifeDescriptor from './LifeDescriptor'
import Arrow from '../Utils/Arrow'

import '../../CSS/ModalNavButtons.css'

const NUM_PER_PAGE = 5

/* **************************************************
   LifeDescriptors component

   Displays life descriotors:
     -- Left / Right navigation through pages of life descriptors
     -- Close button when user is done

   props:
     userId
     description
     question
     instructions
     isDynamic
     previousAnswers
     lifeDescriptors - The full list, see staticdataRD for shape.
                       Note: naming mistmach, staticdataRD is lifeDescriptions.
     onCloseModalCB
     onPersistCB
***************************************************** */
export default class LifeDescriptors extends Component {

  constructor( props ) {
    super()
    this.state = {
      page: 0,
      selections: [],
    }
  }

  /* **********************************************
      onclickPrev()

      User clicked prev button, move page left
  ************************************************* */
  onclickPrev = () => e => {

    const { page } = this.state

    if ( page === 0 ) return

    this.setState( {
      page: page - 1,
    } )
  }

  /* **********************************************
      onclickNext()

      User clicked next button, move page right.

  ************************************************* */
  onclickNext = ( arr ) => e => {

    const lastIndex = arr.length
    const { page } = this.state

    if ( page === ( lastIndex - 1 ) ) return

    this.setState( {
      page: page + 1,
    } )
  }

  /* **********************************************
      onclickClose()

      User clicked Close button, update store and persist selections
  ************************************************* */
  onclickClose = () => {

    const {
      userId,
      lifeDescriptors,
      onPersistCB,
      onCloseModalCB
    } = this.props

    const sentences = []

    for ( let i = 0; i < lifeDescriptors.length; i++ ) {
      if ( this.state.selections[i] ) {
        let sentence = this.makeSentence( lifeDescriptors[i], this.state.selections[i] )
        sentences.push( sentence )

      }
    }
    onPersistCB( userId, sentences )
    onCloseModalCB()
  }


  /* **********************************************

  ************************************************* */
  splittingArray = ( arr ) => {
    var size = NUM_PER_PAGE
    var arrayOfArrays = []
    for ( var i = 0; i < arr.length; i += size ) {
      arrayOfArrays.push( arr.slice( i, i + size ) )
    }

    return arrayOfArrays
  }

  /* **********************************************
      addSelection()

      Called by LifeDescriptor when user clicks the a or b choice for sentence

  ************************************************* */
  addSelection = ( idxLifedescriptions, aOrB ) => {
    const newSelections = [...this.state.selections]
    newSelections[idxLifedescriptions] = aOrB
    this.setState( {
      selections: newSelections
    } )
  }

  /* **********************************************
     makeSentence()

     Make a sentence based on the lifeDescriptor and a or b choice

     params
       - lifeDescriptor - {
            description: 'My life # feel full of meaning',
            a: 'does',
            b: 'does not' }
       - aOrb - 'a' or 'b' to indicate which choice makes the sentence

     return completed sentence - "My life does feel full of meaning"
  ************************************************* */
  makeSentence = ( lifeDescriptor, aOrB ) => {

    let structured = lifeDescriptor.description.split( '#' )
    let first = structured[0]
    let second = structured[1]
    const sentence = first + ( aOrB === 'a' ? lifeDescriptor.a : lifeDescriptor.b ) + second
    return sentence

  }
  /* **********************************************
     render
  ************************************************* */
  render() {

    const {
      isDynamic,
      lifeDescriptors,
    } = this.props

    let pages = this.splittingArray( lifeDescriptors )
    let list = pages.map( ( element, pageNum ) => (
      element.map( ( ele, i ) => {
        const idxLifedescriptions = i + pageNum * NUM_PER_PAGE
        return (
          <LifeDescriptor
            key={idxLifedescriptions}
            lifeDescriptor={ele}
            onAddSelectionCB={
              ( aOrB ) => {
                this.addSelection( idxLifedescriptions, aOrB )
              }}
            isCheckedA={this.state.selections[idxLifedescriptions] === 'a'}
            isCheckedB={this.state.selections[idxLifedescriptions] === 'b'}
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
          <p><strong>Previous answers</strong></p>
          {previousAnswers.map( ( previousAnswer, idx ) =>
            <p key={idx}>{previousAnswer}</p>
          )}
          <hr className="divider" />
        </>
      )
    }

    // Dynamic version of the exercise
    // -------------------------------
    return (
      <>
        {list[this.state.page]}

        <br />

        <div className="container-fluid">

          {/* left arrow */}
          <div style={style.left}>
            <Arrow
              direction="left"
              onClickCB={this.onclickPrev()}
              glyph="arrow-left"
            />
          </div>

          {/* close button */}
          <div style={style.center}>
            <Button
              className="closeButton"
              onClick={this.onclickClose}
            >
              Close
            </Button>
          </div>

          {/* right arrow */}
          <div style={style.right}>
            <Arrow
              direction="right"
              onClickCB={this.onclickNext( pages )}
              glyph="arrow-right"
            />
          </div>

        </div>
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

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
