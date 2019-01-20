import { connect } from 'react-redux'
import Narrative from '../Components/Narrative'
import { getAnswers } from '../store/answers/reducer'

// import { countComments, getComments } from '../reducers/commentsRD'
// import { getComments } from '../reducers/commentsRD'
// import { voteUpAC, voteDownAC, addCommentAC } from '../actionCreators'

/* *****************************************
   mapStateToProps()

   passedProps:
     question_code -- "50"  // needs to be converted to integer
     question -- the question string
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("NarrativeCT::mapStateToProps()");

  // get and validate question_code and question
  let { question_code, question } = passedProps
  question_code = parseInt(question_code, 10)
  if (!question_code) throw new Error("missing or non-integer question code: ", passedProps.question_code)
  console.log("question: ", question);

  // lookup the previous answer, note: getAnswers() returns an array of answers
  const answers = getAnswers(state.answersRD, question_code)
  console.log(`getAnswers(${question_code}): `, answers);
  if (1 < answers.length) throw new Error("more than one narrative answer: ", passedProps.question_code, answers)
  const previousAnswer= answers[0] || ''

  return {
    question: passedProps.question,
    previousAnswer: previousAnswer,
    // post: passedProps.post,
    // comments: getComments(state.commentsRD, passedProps.post.id),
 }
}

/* *****************************************
   mapDispatchToProps()
******************************************** */
const mapDispatchToProps = dispatch => ({
  // voteUpCB: (post) => dispatch(voteUpAC(post)),
  // voteDownCB: (post) => dispatch(voteDownAC(post)),
  // addCommentCB: (comment) => dispatch(addCommentAC(comment)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Narrative)
