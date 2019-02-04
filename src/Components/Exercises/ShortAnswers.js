import React from 'react';
import PropTypes from 'prop-types'
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';
import ShortAnswer from './ShortAnswer'
import '../../CSS/ModalNavButtons.css'

/* **************************************************
   ShortAnswers component

   Displays a single question with:
     -- Add button to add a new space for a short answer
     -- <ShortAnswer> for each answer

   state:
     Manages the list of answers in state to provide better UX when adding
       new blank entries.  Future: may want to route this back to Store as
       State can prevent rerenders from operating correctly if Store is
       updated by another CT.

   props:
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- [] or array of strings of previous answers
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
     onUpdateStoreCB(newAnswers) -- callback to update the store
***************************************************** */
export default class ShortAnswers extends React.Component {

  // -------------------------------------------------------
  // UUID to be used as the component key
  uuid = 1;

  // get new UUID
  getUUID = () => {
    console.log("ShortAnswers::getUUID() retruning ", this.uuid + 1);
    return this.uuid++
  }

  // make a new answerWithKey
  getNewAnswerWithKey = (answer) => ({
    key: this.getUUID(),
    text: answer,
  })

  // strip keys
  stripKeys = (answersWithKeys) => answersWithKeys.map(answerWithKey => answerWithKey.text)

  // add keys
  // addKeys = (answers) => answers.map(answer => ({ key: this.getUUID() , text: answer}))
  addKeys = (answers) => answers.map((answer) => {
    console.log("addKeys: ", answer);
    return { key: this.getUUID(), text: answer }
  })
  // -------------------------------------------------------

  state = {
    isDirty: false,
    answersWithKeys: this.addKeys(this.props.previousAnswers)
  }

  // **********************************************
  componentDidMount = () => {
    // add an initial blank entry if there are no previous entries
    const { previousAnswers } = this.props
    if (previousAnswers.length === 0) this.onclickAdd()
  }


  // **********************************************
  // tell parent to update array of answers to store
  updateAnswer = (key, newAnswer) => {
    console.log(`ShortAnswers::updateAnswer(${key}, ${newAnswer})`);

    const { onUpdateStoreCB } = this.props
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.map(answerWithKey =>
      (answerWithKey.key === key) ? { key: key, text: newAnswer } : answerWithKey)

    onUpdateStoreCB(this.stripKeys(newAnswersWithKeys))
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // delete answer from state::answers and
  //   tell parent to update array of answers to store
  deleteAnswer = (keyToDelete) => {
    console.log(`ShortAnswers::deleteAnswer(${keyToDelete})`);

    const { onUpdateStoreCB } = this.props
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.filter((answerWithKey) =>
      keyToDelete !== answerWithKey.key)

    onUpdateStoreCB(this.stripKeys(newAnswersWithKeys))
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // add an empty answer to state::answers
  onclickAdd = () => {
    console.log(`ShortAnswers::onclickAdd()`);
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.concat(this.getNewAnswerWithKey(''))
    console.log("newAnswersWithKeys: ", newAnswersWithKeys);
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // render!
  render() {
    console.log("ShortAnswers::render()")

    const { question, isDynamic } = this.props
    const { answersWithKeys } = this.state

    console.log("answersWithKeys", answersWithKeys);
    console.log("this.props.previousAnswers", this.props.previousAnswers);
    console.log("this.state.answers", this.state.answers);

    // render static version in <Popup>
    if (!isDynamic) {
      return (
        <>
          {answersWithKeys.map((answerWithKey) =>
            <ShortAnswer
              key={answerWithKey.key}
              id={answerWithKey.key}
              previousAnswer={answerWithKey.text}
              updateAnswerCB={this.updateAnswer}
              deleteAnswerCB={this.deleteAnswer}
              isDynamic={isDynamic}
            >
            </ShortAnswer>
          )}
        </>
      )
    }

    // render dynamic version in <ModalX>
    return (
      <>
        <p> </p>
        <h4>{question.text}</h4>
        <br />
        {answersWithKeys.map((answerWithKey) =>
          <ShortAnswer
            key={answerWithKey.key}
            id={answerWithKey.key}
            previousAnswer={answerWithKey.text}
            updateAnswerCB={this.updateAnswer}
            deleteAnswerCB={this.deleteAnswer}
            isDynamic={isDynamic}
          >
          </ShortAnswer>
        )}

        <hr />
        <div style={style.centering} >
          <Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>Add answer</Button>
        </div>
        <hr />
      </>
    )
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

ShortAnswers.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  previousAnswers: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func, // required, injevted by <Popup>
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

const style = {
  centering: {
    marginLeft: "45%",
    marginRight: "45%",
  }
}
