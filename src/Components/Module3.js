import React from 'react'
import { connect } from 'react-redux'

import Module from '../Components/Module'
import SectionCT from '../Containers/SectionCT'
import QuestionsCT from '../Containers/QuestionsCT'
import QuestionsList from './questionsList'
import NarrativeCT from '../Containers/NarrativeCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS,
  QUESTION_TYPE_BRACKET,
} from '../constants.js'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
class Module3 extends React.Component {



  // Define questions and excercises for Module 3
  // ---------------------------------------------------------------------

  // -------------------------
  // 1A
  questions_310 = [
    { code: 311, text: "Financial/Material" },
    { code: 312, text: "Vocation/Career/Life Work" },
    { code: 313, text: "Social/Community" },
    { code: 314, text: "Family" },
    { code: 315, text: "Mental/Educational" },
    { code: 316, text: "Spiritual/Emotional/Creative" },
    { code: 317, text: "Physical/Health/Recreational" },
    { code: 318, text: "Other" },
  ]
  exercise_310 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_SHORT_ANSWERS}
      questions = {this.questions_310}
    /> )

  // -------------------------
  // 3A
  questions_320 = [
    { promptCode: 311, code: 321, text: "Financial/Material" },
    { promptCode: 312, code: 322, text: "Vocation/Career/Life Work" },
    { promptCode: 313, code: 323, text: "Social/Community" },
    { promptCode: 314, code: 324, text: "Family" },
    { promptCode: 315, code: 325, text: "Mental/Educational" },
    { promptCode: 316, code: 326, text: "Spiritual/Emotional/Creative" },
    { promptCode: 317, code: 327, text: "Physical/Health/Recreational" },
    { promptCode: 318, code: 328, text: "Other" },
  ]
  exercise_320 = (
    <QuestionsCT
      questionType = {QUESTION_TYPE_BRACKET}
      questions = {this.questions_320}
    /> )



  /* *********************************************************** */
  // render!
  render() {
    const isLoading = this.props.isLoading

    return (
      <>
        <p>{( ( isLoading ) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <Module
              moduleNum = { 3 }
              moduleTitle = "Personal Desires"
              moduleDescription = "Desire plays an important role in well-being. In Module 3 we will focus on differentiating between inauthentic desires, which we appropriate from the influences and distractions around us, and our authentic ones, which we source from our deepest selves. "
            >
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 310 }
                sectionTitle = "Deep Desires"
                exercise = {this.exercise_310}
              />
              <SectionCT
                moduleNum = { 3 }
                sectionNum = { 330 }
                sectionTitle = "Make tradeoffs within each category"
                exercise = {this.exercise_320}
              />
            </Module>
          </>
        )}
      </>
    )
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading || state.staticdataRD.isLoading,
    userId: getUser( state.userRD ).user_id,
  }
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( Module3 )
