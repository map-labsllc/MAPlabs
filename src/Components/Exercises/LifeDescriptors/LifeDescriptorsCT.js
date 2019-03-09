
import { connect } from 'react-redux'

import LifeDescriptors from './LifeDescriptors'
import { getUser } from '../../../store/user/reducer'
import { getAnswers } from '../../../store/answers/reducer'
import { QUESTION_TYPE_LIFEDESCRIPTORS } from '../../../store/answers/constants'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

/* *****************************************
   mapStateToProps()

   passedProps:
    question -- { code: 50, text: "question 50" }
    description
    instructions
    isDynamic -- undefined or true
                 rendering static version in Popup or dynamic verison in Modal
    onCloseModalCB -- call to close the modal
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( 'state', state )
  const {
    question,
    description,
    instructions,
    isDynamic,
    onCloseModalCB } = passedProps
  const { lifeDescriptors } = state.staticdataRD
  const userId = getUser( state.userRD ).user_id

  // find previous answers, if any, to display when static
  const answers = getAnswers( state.answersRD, question.code )

  // pull answers out of 2D array of strings to an simple array of strings
  const previousAnswers = answers.map(answerArray => answerArray[0])

  return {
    userId,
    description,
    question,
    instructions,
    isDynamic,
    previousAnswers,
    lifeDescriptors: lifeDescriptors,
    onCloseModalCB,
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  const onPersist = ( userId, lifeDescriptors ) => {
    const { question } = passedProps

    // store wants 2D array of strings, so map the array of strings into that format
    const twoDimArrayOfString = lifeDescriptors.map(str => [str])
    console.log("LifeDescriptors::onPersist(), 2darray ", twoDimArrayOfString)

    dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_LIFEDESCRIPTORS, twoDimArrayOfString ) )
  }

  return {
    onPersistCB: onPersist
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LifeDescriptors )
