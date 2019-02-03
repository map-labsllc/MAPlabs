
import { connect } from 'react-redux'

import LifeDescriptors from './LifeDescriptors'
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
  const { lifeDescriptors } = state.staticdataRD
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

    dispatch( updateAnswersAC( question.code, lifeDescriptors ) )
    dispatch( persistAnswersAC( userId, question.code, lifeDescriptors ) )
  }

  return {
    onPersistCB: onPersist
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( LifeDescriptors )
