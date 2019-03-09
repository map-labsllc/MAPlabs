import { connect } from 'react-redux'
import Influences from './Influences'
import { getAnswers } from '../../../store/answers/reducer'
import { getUser } from '../../../store/user/reducer'
import {
  updateAnswersAC,
  persistAnswersAC
} from '../../../store/answers/actions'

import {
  QUESTION_TYPE_INFLUENCES,
 } from '../../../store/answers/constants'

import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER,

  IDX_RELATIONSHIP,
  IDX_GROUP,
  IDX_NAME,
  IDX_BELIEF,
  IDX_IMPACT,
} from './InfluencesConstants.js'

/* *****************************************
   mapStateToProps()

   passedProps:
     question -- { code: 50, text: "question 50" }
     instructions
     isDynamic -- undefined - rendering static version in <Popup>
                  true - rendering dynamic verison in <ModalX>
     onCloseModalCB -- call when user clicks Save button
******************************************** */
const mapStateToProps = ( state, passedProps ) => {
  console.log( "InfluencesCT::mapStateToProps()" )

  const {
    question,
    instructions,
    isDynamic,
    onCloseModalCB,
  } = passedProps

  // validate params
  if ( !question || !question.code ) throw new Error( "missing question code: ", passedProps.question_code )

  // get userId
  const userId = getUser( state.userRD ).user_id

  // get previous data, if any
  const answerRecords = getAnswers( state.answersRD, question.code )
  console.log( `getAnswers(${question.code}): `, answerRecords )

  // data structure to pass down in props
  const influences = {
    [GROUP_PERSONAL]: [], // [ {name:'Tim', belief:'Charity', impact:'supportive'}, {...} ]
    [GROUP_SOCIAL]:   [], // same as above
    [GROUP_WIDER]:    [], // same as above
    }

  // translate data from the 2D array of strings to
  //   the object structure to pass down in props
  if (answerRecords.length) {
    answerRecords.forEach( record => {
      const influence = {
        relationship: record[IDX_RELATIONSHIP],
        name:         record[IDX_NAME],
        belief:       record[IDX_BELIEF],
        impact:       record[IDX_IMPACT],
      }

      switch (record[IDX_GROUP]) {
        case (GROUP_PERSONAL):
          influences[GROUP_PERSONAL].push(influence)
          break

        case (GROUP_SOCIAL):
          influences[GROUP_SOCIAL].push(influence)
          break

        case (GROUP_WIDER):
          influences[GROUP_WIDER].push(influence)
          break

        default:
          console.log("ERROR, unk group:", record[IDX_GROUP] ,"for question.code: ", question.code)
      }
    })
  }

  console.log('InfluencesCT::influences: ', influences)

  return {
    userId,
    question,
    instructions,
    beliefs: state.staticdataRD.beliefs,
    relationships: state.staticdataRD.relationships,
    influences,
    isDynamic,
    onCloseModalCB,
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* *****************************************
   mapDispatchToProps()

   passedProps -- see mapStateToProps above
******************************************** */
const mapDispatchToProps = ( dispatch, passedProps ) => {

  /* *****************************************
  onPersist()

  Save the new influences to store and persist them.

  userId -- integer
  newInfluences -- same format as the object that was passed down in props as "influences"
            {
              [GROUP_PERSONAL]: [ {name:'Tim', belief:'Charity', impact:'supportive'}, {...} ]
              [GROUP_SOCIAL]:   [], // same as above
              [GROUP_WIDER]:    [], // same as above
            }

  ******************************************** */
  function onPersist( userId, newInfluences ) {
    console.log( `InfluencesCT::onPersist( ${newInfluences} )` )

    const { question } = passedProps

    // store wants 2D array of strings, so map the object into that format
    const twoDimArrayOfString = []
    const groupIds = [GROUP_PERSONAL, GROUP_SOCIAL, GROUP_WIDER]
    groupIds.forEach(groupId => {
      newInfluences[groupId].forEach(influence => {
        // don't save unless name was entered
        if (influence.name.trim().length) {
          const record = []
          record[IDX_GROUP]        = groupId
          record[IDX_RELATIONSHIP] = influence.relationship
          record[IDX_NAME]         = influence.name
          record[IDX_BELIEF]       = influence.belief
          record[IDX_IMPACT]       = influence.impact
          twoDimArrayOfString.push(record)
        }
      })
    })

    console.log('-------------------- persisting')
    console.log(JSON.stringify(twoDimArrayOfString))

    dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_INFLUENCES, twoDimArrayOfString ) )
  }

  /* *****************************************
     The props being passed down
  ******************************************** */
  return {
    onPersistCB: onPersist,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)( Influences )
