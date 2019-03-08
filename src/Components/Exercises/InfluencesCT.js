import { connect } from 'react-redux'
import Influences from './Influences'
import { getAnswers } from '../../store/answers/reducer'
import { getUser } from '../../store/user/reducer'
import { updateAnswersAC } from '../../store/answers/actions'
import {
  GROUP_PERSONAL,
  GROUP_SOCIAL,
  GROUP_WIDER,
} from './InfluencesConstants.js'


// indexes into the columns of the 2D data structure coming from the store
const IDX_GROUP  = 0 // personal / social / wider
const IDX_NAME   = 1 // Steve
const IDX_BELIEF = 2 // Charity
const IDX_IMPACT = 3 // supportive / inhibiting

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
  const previousData = {
    [GROUP_PERSONAL]: [], // [ {name:'Tim', belief:'Charity', impact:'supportive'}, {...} ]
    [GROUP_SOCIAL]:   [], // same as above
    [GROUP_WIDER]:    [], // same as above
    }

  // translate data from the 2D array of strings to
  //   the object structure to pass down in props
  if (answerRecords.length) {
    answerRecords.forEach( record => {
      const influence = {
        name:   record[IDX_NAME],
        belief: record[IDX_BELIEF],
        impact: record[IDX_IMPACT],
      }

      switch (record[IDX_GROUP]) {
        case (GROUP_PERSONAL):
          previousData[GROUP_PERSONAL].push(influence)
          break

        case (GROUP_SOCIAL):
          previousData[GROUP_SOCIAL].push(influence)
          break

        case (GROUP_WIDER):
          previousData[GROUP_WIDER].push(influence)
          break

        default:
          console.log("ERROR, unk group:", record[IDX_GROUP] ,"for question.code: ", question.code)
      }
    })
  }


  console.log('InfluencesCT::previousData: ', previousData)

  return {
    userId,
    question,
    instructions,
    previousData,
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

  Save the new answer to store and persist it.

  userId -- integer
  newData -- same format as the object that was passed down in props as "previousData"
  ******************************************** */
  function onPersist( userId, newData ) {
    // const { question } = passedProps
    console.log( `InfluencesCT::onPersist( ${newData} )` )

    // store wants 2D array of strings, so map the array of strings into that format
    // const twoDimArrayOfString = [ [ newAnswer ] ]
    // dispatch( updateAnswersAC( question.code, twoDimArrayOfString ) )
    // dispatch( persistAnswersAC( userId, question.code, QUESTION_TYPE_NARRATIVE, twoDimArrayOfString ) )
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
