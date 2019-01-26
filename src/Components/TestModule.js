import React from 'react'
import { connect } from 'react-redux'
import LifeDescriptions from '../Components/questionsList'
import Module from '../Components/Module'
import Section from '../Components/Section'
import QuestionsCT from '../Containers/QuestionsCT'
import NarrativeCT from '../Containers/NarrativeCT'
import { loadAllAnswersAC } from '../store/answers/actions'
import { loadAllTransitionsAC } from '../store/transitions/actions'
import { loadAllStaticdataAC } from '../store/staticdata/actions'
import { getUser } from '../store/user/reducer'
import {
  QUESTION_TYPE_SHORT_ANSWERS,
  QUESTION_TYPE_TRANSITIONS} from '../constants.js'

import {
  Button,
  Form,
} from 'react-bootstrap'

/* **************************************************
   Used to test components during development
***************************************************** */
class TestModule extends React.Component {

  state = {
    ready: false,
  }

  // load user data
  componentDidMount = () => {
    const { dispatch, userId } = this.props
    dispatch( loadAllAnswersAC( userId ) )
    dispatch( loadAllTransitionsAC( userId ) )
    dispatch( loadAllStaticdataAC() )
  }

  // Define some question lists for use by <ShortAnswers> and <Transtions>
  // ---------------------------------------------------------------------
  questions150 = [
    { code: 141, text: "List the most important overarching themes that impact how meaningful and purposeful your life is. " },
    { code: 142, text: "Which core feelings and experiences are most important to providing you with personal senses of the meaning in your life?" },
    { code: 143, text: "Name some things beyond yourself that you could serve if you lived with more of your core feelings and experiences" },
    { code: 144, text: "List the areas of personal growth that will enable your life to be more filled with the core feelings and experiences you desire" },
    { code: 145, text: "List which relationships that you either currently have or need to develop in the future (to any influence, such as people, groups, practices, experiences, etc.) are most important to supporting your life being lived with more of your core feelings and experiences" },
    { code: 146, text: "List any areas of engagement or mastery (either in your life’s work or avocationally) that would provide you with more of your core feelings and experiences" },

  ]
  questions160 = [
    { code: 151, text: "Thoughts/Attitudes" },
    { code: 152, text: "Behaviors/Actions" },
    { code: 153, text: "Goals" },
    { code: 154, text: "Commitments" },
  ]

  questions170 = [
    { code: 161, text: "What changes would you like to see in your everyday life?" },
    { code: 162, text: "What changes would you like to see in your personal growth?" },
    { code: 163, text: "What changes would you like to see in your relationships?" },
    { code: 164, text: "What changes would you like to see in your life’s work (your vocation)?" },
    { code: 165, text: "What changes would you like to see in your avocational pursuits?" },
  ]


  exercise110 = (<NarrativeCT
    question = { { code: 110, text: "Reflect on your current situation" } }
    promptQuestionCode = "0"
    instructions = "** This Narrative will be replaced with the LifeDescriptors component"
    />)

  exercise120 = (<NarrativeCT
    question = { { code: 120, text: "Current Situation Descriptor" } }
    promptQuestionCode = "0"
    instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your current state of mind, state of being, and general assessment of your current condition today as you begin MAPmaker."
    />)

  exercise130 = (<NarrativeCT
    question = { { code: 130, text: "Imagine your Future Desired Situation" } }
    promptQuestionCode = "0"
    instructions = "** This Narrative will be replaced with the LifeDescriptors component"
    />)

  exercise140 = (<NarrativeCT
    question = { { code: 140, text: "Future Desired Situation Description" } }
    promptQuestionCode = "0"
    instructions = "Using the phrases you chose, as well as the descriptions you created next to each one of them, write a full description of your future desired state of being as you begin MAPmaker. Create this description in your own image capturing how you want to feel, what you will think of your future situation, what will be good and bad, and how you would describe your future self to your current self. "
    />)

  exercise150 = (<QuestionsCT

    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    questions = {this.questions150}/> )


  exercise160 = (<QuestionsCT

    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    questions = {this.questions160}/> )


  exercise170 = (<QuestionsCT

    questionType = {QUESTION_TYPE_SHORT_ANSWERS}
    questions = {this.questions170}/> )

  // quick setup of a Transtion question
  questions1 = [
    { code: 30 , text: "From -> to" },
  ]
  exercise1 = ( <QuestionsCT
    questionType = {QUESTION_TYPE_TRANSITIONS}
    questions = {this.questions1}/> )


  exercise25 = (
    <LifeDescriptions
      question = {{code: 25,text:"Question25"}}
      instructions= 'pick what feels best'

    />
      )

  // render!
  render() {
    console.log( "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" )
    console.log( "QUESTION_TYPE_SHORT_ANSWERS", QUESTION_TYPE_SHORT_ANSWERS )


    const isLoading = this.props.isLoading

    return (
      <>
        <p>{( ( isLoading ) ? "loading...." : ""  )}</p>
        {!isLoading && (
          <>
            <Module moduleNum = "1" moduleTitle = "Module 1" moduleDescription = "Description of the module here...">


            <Section moduleNum = "1" sectionNum = "25" sectionTitle = "Current Life Descriptors" excercise = {this.exercise25} />

              <Section moduleNum = "1" sectionNum = "1" sectionTitle = "From To" excercise = {this.excercise1} />


              <Section moduleNum = "1" sectionNum = "110" sectionTitle = "Reflect on your current situation" exercise = {this.exercise110} />
              {/*<Section moduleNum = "1" sectionNum = "120" sectionTitle = "Current Situation Descriptor" exercise = {this.exercise120} />
              <Section moduleNum = "1" sectionNum = "130" sectionTitle = "Imagine your Future Desired Situation" exercise = {this.exercise130} />
              <Section moduleNum = "1" sectionNum = "140" sectionTitle = "Future Desired Situation Description" exercise = {this.exercise140} />
              <Section moduleNum = "1" sectionNum = "150" sectionTitle = "Compare your “current situation” statement to your “future desired situation” statement" exercise = {this.exercise150} />
              <Section moduleNum = "1" sectionNum = "160" sectionTitle = "Breaking and building" exercise = {this.exercise160} />*/}
              <Section moduleNum = "1" sectionNum = "170" sectionTitle = "Tie these reflections to the course" exercise = {this.exercise170} />
            </Module>
          </>
        )}
      </>
    )
  }
}

// Wrap in container to get access to store and dispatch
const mapStateToProps = state => {
  return {
    isLoading: state.answersRD.isLoading || state.transitionsRD.isLoading || state.staticdataRD.isLoading,
    userId: getUser( state.userRD ).user_id,
  }
}

const mapDispatchToProps = dispatch => ( {
  dispatch,
} )

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )( TestModule )
