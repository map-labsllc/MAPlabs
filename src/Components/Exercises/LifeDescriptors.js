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
      aOrB_Selections: [], // sparse array w/ values 'a' or 'b' and index paralelling the index of lifeDesctriptors
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

      maxPage - the max acceptable value of state.page
  ************************************************* */
  onclickNext = ( maxPage ) => e => {

    const { page } = this.state
    if ( page === ( maxPage ) ) return

    this.setState( {
      page: page + 1,
    } )
  }

  /* **********************************************
      onclickClose()

      User clicked Close button, update store and persist aOrB_Selections
  ************************************************* */
  onclickClose = () => {

    const {
      userId,
      lifeDescriptors,
      onPersistCB,
      onCloseModalCB
    } = this.props
    const { aOrB_Selections } = this.state

    const sentences = aOrB_Selections.map( ( selection, idx ) => {
      return this.makeSentence( lifeDescriptors[idx], selection )
    } )

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

      Called from LifeDescriptor when user clicks the a or b choice for a sentence

      idxLifedescriptions -- index into lifeDescriptions
      aOrB -- 'a' or 'b'
  ************************************************* */
  addSelection = ( idxLifedescriptions, aOrB ) => {
    const newAorB_Selections = [...this.state.aOrB_Selections]
    newAorB_Selections[idxLifedescriptions] = aOrB
    this.setState( {
      aOrB_Selections: newAorB_Selections
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
    let split = lifeDescriptor.description.split( '#' )
    let first = split[0]
    let second = split[1]
    return first + ( aOrB === 'a' ? lifeDescriptor.a : lifeDescriptor.b ) + second
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
            isCheckedA={this.state.aOrB_Selections[idxLifedescriptions] === 'a'}
            isCheckedB={this.state.aOrB_Selections[idxLifedescriptions] === 'b'}
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
              onClickCB={this.onclickNext( pages.length - 1 )}
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
