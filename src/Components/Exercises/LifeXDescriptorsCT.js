
import { connect } from 'react-redux'

import LifeXDescriptors from './LifeXDescriptors'
import { getUser } from '../../store/user/reducer'
import { getAnswersx } from '../../store/answersx/reducer'
import { QUESTION_TYPE_LIFEDESCRIPTORS } from '../../store/answersx/constants'
import {
  updateAnswersxAC,
  persistAnswersxAC
} from '../../store/answersx/actions'

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
  const answers = getAnswersx( state.answersxRD, question.code )

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
    console.log("LifeXDescriptors::onPersist(), 2darray ", twoDimArrayOfString)

    dispatch( updateAnswersxAC( question.code, twoDimArrayOfString ) )
    dispatch( persistAnswersxAC( userId, question.code, QUESTION_TYPE_LIFEDESCRIPTORS, twoDimArrayOfString ) )
  }

  return {
    onPersistCB: onPersist
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LifeXDescriptors )
