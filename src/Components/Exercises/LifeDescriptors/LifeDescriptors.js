import React, { Component } from 'react'
import { Button, ProgressBar } from 'react-bootstrap'
import LifeDescriptor from './LifeDescriptor'
import Arrow from '../../Utils/Arrow'

import '../../../CSS/ModalNavButtons.css'

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
                       Note: naming mistmach, staticdataRD is lifeDescriptors.
     onCloseModalCB
     onPersistCB
***************************************************** */
export default class LifeDescriptors extends Component {
  constructor(props) {
    super()
    this.state = {
      page: 0,
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
    if (page === 0) return

    this.setState({
      page: page - 1,
    })
  }

  /* **********************************************
      onclickNext()

      User clicked next button, move page right.

      maxPage - the max acceptable value of state.page
  ************************************************* */
  onclickNext = () => e => {
    const { lifeDescriptors } = this.props
    const maxPage = Math.ceil(lifeDescriptors.length / NUM_PER_PAGE) - 1

    const { page } = this.state
    if (page === (maxPage)) return

    this.setState({
      page: page + 1,
    })
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

    const sentences = Object.keys(aOrB_Selections).map((idx) => this.makeSentence(lifeDescriptors[idx], aOrB_Selections[idx]))

    onPersistCB(userId, sentences)
    onCloseModalCB()
  }

  /* **********************************************
      addSelection()

      Called from LifeDescriptor when user clicks the a or b choice for a sentence

      idxLifeDescriptors -- index into lifeDescriptors
      aOrB -- 'a' or 'b'
  ************************************************* */
  addSelection = (idxLifeDescriptors, aOrB) => {
    console.log(' ')
    console.log('+++++++++++')
    console.log('state: ', this.state.aOrB_Selections)

    const { aOrB_Selections } = this.state
    const newAorB_Selections = { ...aOrB_Selections }
    newAorB_Selections[idxLifeDescriptors] = aOrB

    console.log('new  : ', newAorB_Selections)

    this.setState({
      aOrB_Selections: newAorB_Selections
    })
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
  makeSentence = (lifeDescriptor, aOrB) => lifeDescriptor.firstPart + (aOrB === 'a' ? lifeDescriptor.a : lifeDescriptor.b) + lifeDescriptor.lastPart

  /* **********************************************
     render
  ************************************************* */
  render() {
    const {
      instructions,
      isDynamic,
      lifeDescriptors,
    } = this.props
    const { page } = this.state
    const { previousAnswers } = this.props

    // Static version of the exercise
    // ------------------------------
    if (!isDynamic) {
      // display the previous answers
      return (
        previousAnswers.length ?
          <>
            <p><strong>Answers</strong></p>
            <ul className="list-group text-left">
              {previousAnswers.map((previousAnswer, idx) => <li className="list-group-item" key={idx}>{previousAnswer}</li>)}
            </ul>
            <hr className="divider" />
          </>
          :
          <></>
      )
    }

    // Dynamic version of the exercise
    // -------------------------------
    const thisPage = []
    const startIdx = page * NUM_PER_PAGE
    const endIdx = Math.min(((page + 1) * NUM_PER_PAGE), lifeDescriptors.length)

    for (let i = startIdx; i < endIdx; i++) {
      thisPage.push((
        <LifeDescriptor
          key={i}
          lifeDescriptor={lifeDescriptors[i]}
          onAddSelectionCB={
            (aOrB) => {
              this.addSelection(i, aOrB)
            }}
          isSelectedA={this.state.aOrB_Selections[i] === 'a'}
          isSelectedB={this.state.aOrB_Selections[i] === 'b'}
        />
      ))
    }

    const progressAmount = Math.round(100 * (startIdx + 1) / lifeDescriptors.length)

    return (
      <>
        <p><b>{instructions}</b></p>

        <ProgressBar variant="success" now={progressAmount} label={`${progressAmount}%`} />

        <ul className="list-group text-left">
          { thisPage.map((p, key) => <li key={key} className="list-group-item">{p}</li>) }
        </ul>
        <br />

        <div className="container-fluid text-center">

          {/* left arrow */}
          { startIdx > 0 &&
            <div style={style.left}>
              <Arrow
                direction="left"
                onClickCB={this.onclickPrev()}
                glyph="arrow-left"
              />
            </div>
          }

          {/* close button */}
          <div style={style.center}>
            <Button
              className="closeButton"
              onClick={this.onclickClose}
            >
              Save
            </Button>
          </div>

          {/* right arrow */}
          { endIdx !== (lifeDescriptors.length) &&
            <div style={style.right}>
              <Arrow
                direction="right"
                onClickCB={this.onclickNext()}
                glyph="arrow-right"
              />
            </div>
          }

        </div>
      </>
    )
  }
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////

const style = {
  right: {
    display: 'inline-block',
    float: 'right',
  },
  left: {
    display: 'inline-block',
    float: 'left',
  },
  center: {
    display: 'inline-block',
  }
}
