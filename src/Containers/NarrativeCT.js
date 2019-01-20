import { connect } from 'react-redux'
import Narrative from '../Components/Narrative'
// import { countComments, getComments } from '../reducers/commentsRD'
// import { getComments } from '../reducers/commentsRD'
// import { voteUpAC, voteDownAC, addCommentAC } from '../actionCreators'

/* *****************************************
   mapStateToProps()
******************************************** */
const mapStateToProps = (state, passedProps) => {
  console.log("NarrativeCT::mapStateToProps()");
  const { question_code, question } = passedProps
  console.log("question_code, question: ", question_code, question);


  return {
    question: passedProps.question,
    previousAnswer: passedProps.previousAnswer,
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
