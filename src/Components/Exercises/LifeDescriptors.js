import React, { Component } from 'react'
import {
  Button,
 } from 'react-bootstrap'

import LifeDescriptor from './LifeDescriptor'
import Arrow from '../Utils/Arrow'

import '../../CSS/ModalNavButtons.css'

const NUM_PER_PAGE = 5
// const NUM_PER_PAGE = 5

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
                       Note: naming mistmach, staticdataRD is lifeDescriptors.
     onCloseModalCB
     onPersistCB
***************************************************** */
export default class LifeDescriptors extends Component {

  constructor( props ) {
    super()
    this.state = {
      page: 0,
      // aOrB_Selections: [], // sparse array w/ values 'a' or 'b' and index paralelling the index of lifeDesctriptors
      aOrB_Selections: {}, // hashmap of selections:
                           //     key -- lifeDescriptors index
                           //     value -- 'a' or 'b' w/ values 'a' or 'b'
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
  onclickNext = () => e => {
    const { lifeDescriptors } = this.props
    const maxPage = Math.ceil( lifeDescriptors.length / NUM_PER_PAGE ) - 1

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

    // const sentences = aOrB_Selections.map( ( selection, idx ) => {
    //   return this.makeSentence( lifeDescriptors[idx], selection )
    // } )

    const sentences = Object.keys( aOrB_Selections ).map( ( idx ) => {
      return this.makeSentence( lifeDescriptors[idx], aOrB_Selections[ idx ] )
    } )

    onPersistCB( userId, sentences )
    onCloseModalCB()
  }

  /* **********************************************
      addSelection()

      Called from LifeDescriptor when user clicks the a or b choice for a sentence

      idxLifeDescriptors -- index into lifeDescriptors
      aOrB -- 'a' or 'b'
  ************************************************* */
  addSelection = ( idxLifeDescriptors, aOrB ) => {

    console.log( ' ' )
    console.log( '+++++++++++' )
    console.log( 'state: ', this.state.aOrB_Selections )

    const { aOrB_Selections } = this.state
    const newAorB_Selections = { ...aOrB_Selections }
    newAorB_Selections[idxLifeDescriptors] = aOrB

    console.log( 'new  : ', newAorB_Selections )

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
    return lifeDescriptor.firstPart + ( aOrB === 'a' ? lifeDescriptor.a : lifeDescriptor.b ) + lifeDescriptor.lastPart
  }
  /* **********************************************
     render
  ************************************************* */
  render() {

    const {
      isDynamic,
      lifeDescriptors,
    } = this.props
    const { page } = this.state

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

    let thisPage = []
    const startIdx = page * NUM_PER_PAGE
    const endIdx = Math.min( ( ( page + 1 ) * NUM_PER_PAGE ), lifeDescriptors.length )
    for ( let i = startIdx ; i < endIdx ; i++ ) {
      thisPage.push( (
        <LifeDescriptor
          key={i}
          lifeDescriptor={lifeDescriptors[i]}
          onAddSelectionCB={
            ( aOrB ) => {
              this.addSelection( i, aOrB )
            }}
          isSelectedA={this.state.aOrB_Selections[i] === 'a'}
          isSelectedB={this.state.aOrB_Selections[i] === 'b'}
        />
        )
      )
    }

    return (
      <>
        {thisPage}

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
              onClickCB={this.onclickNext()}
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
