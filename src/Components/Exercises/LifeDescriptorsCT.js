
import { connect } from 'react-redux'

import LifeDescriptorsX from './LifeDescriptorsX'
import { getUser } from '../../store/user/reducer'
import { getAnswers } from '../../store/answers/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../store/answers/actions'

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
  const { lifeDescriptions } = state.staticdataRD
  const userId = getUser( state.userRD ).user_id

  // find previous answers, if any, to display when static
  let previousAnswers = getAnswers( state.answersRD, question.code )

  return {
    userId,
    description,
    question,
    instructions,
    isDynamic,
    previousAnswers,
    lifeDescriptors: lifeDescriptions,
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

  const onPersist = ( userId, lifeDescriptions ) => {
    const { question } = passedProps

    dispatch( updateAnswersAC( question.code, lifeDescriptions ) )
    dispatch( persistAnswersAC( userId, question.code, lifeDescriptions ) )
  }

  return {
    onPersistCB: onPersist
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LifeDescriptorsX )
