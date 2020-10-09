import { connect } from 'react-redux'
import StrengthsEmImWrapper from './StrengthsEmImWrapper'
import { getAnswers } from '../../../store/answers/reducer'
import { updateAnswersAC, persistAnswersAC } from '../../../store/answers/actions'
import { QUESTION_TYPE_STRENGTH_EM_IM } from '../../../store/answers/constants'
import { bindActionCreators } from 'redux';
import { getUser } from '../../../store/user/reducer'
import { IDX_STRENGTH,IDX_PHRASE, IDX_EFFECT } from './StrengthsEmImConstants'

/* *****************************************
   mapStateToProps()
   passedProps:
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "question 50" }
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
******************************************** */
const mapStateToProps = ( state, passedProps ) => {

  const {
    number,
    question,
    isDynamic
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get previous data, if any
  let answerRecords = getAnswers( state.answersRD, question.code )
  console.log(`getAnswers(${question.code}): `, answerRecords )

  return {
    number,
    question,
    strengths: answerRecords,
    strengthsList: state.listsRD.lists.strengths,
    isDynamic,
  }
}


/* *****************************************
   mapDispatchToProps()
   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {
  const { question, userId, promptQuestionCode } = passedProps

  function copyParentAnswers() {

    return async(dispatch, getState) => {
      let state = getState()
      // get userId
      const userId = getUser(state.userRD).id
      // get parent answers
      const parentAnswers = getAnswers(state.answersRD, promptQuestionCode)
      console.log('parentAnswers', parentAnswers)
  
      await dispatch(updateAnswersAC(question.code, parentAnswers))
      await dispatch(persistAnswersAC(userId, question.code, QUESTION_TYPE_STRENGTH_EM_IM, parentAnswers))

    }
  }

  /* *****************************************
     onUpdateStore()
     Save the new transitions to store.  Does NOT persist.
     id -- strength id to replace
     newData - {strength, relfections: []}
  ******************************************** */
  function onUpdateStore(newData ) {

    return async(dispatch, getState) => {
      console.log( `StrengthsEmImWrapper::onUpdate`, newData )

      const { question, userId } = passedProps

      const state = getState()

      let answers = getAnswers(state.answersRD, question.code)

      const strength_id = newData.strength
      // store wants 2D array of strings, so map newData into that format
      let reflectionsSet = false
      const twoDimArrayOfString = answers.reduce((acc, answer) => {
        // replace with new data
        if (+answer[IDX_STRENGTH]=== +strength_id) {

          console.log("FOUND MATCHY MATCH", )

          if (!reflectionsSet) { 

            //  map reflections into individaul rows
            newData.reflections.map((reflection) => {
              let arr = []
              arr[IDX_STRENGTH] = newData.strength
              arr[IDX_PHRASE] = reflection.reflection
              arr[IDX_EFFECT] = reflection.effect
              console.log('adding a reflection', arr)
              acc.push(arr)
            })
            reflectionsSet = true
          }
        } else {
          acc.push(answer)
        }

        return acc
      }, [])

      console.log('dispatching store update for StrengthsEmImWrapper', twoDimArrayOfString)

      // update store
      dispatch(updateAnswersAC(question.code, twoDimArrayOfString))
    }

  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onUpdateStoreCB: bindActionCreators(onUpdateStore, dispatch),
    copyParentAnswersCB: bindActionCreators(copyParentAnswers, dispatch)
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( StrengthsEmImWrapper )