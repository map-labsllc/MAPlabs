import React from 'react';
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
     -- Save button  NOTE: THIS FUNCTIONALITY SHOULD BE REMOVED, component will always be wrapped with Modal

   state:
     Manages the list of answers in state to provide better UX when adding
       new blank entries (it allows us to be in control of the focus).

   props:
     userId -- integer
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- [] or array of strings of previous answers
     doesHandlePesistence -- { value: true }
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     onUpdateStoreCB(newAnswers) -- callback to update the store
     onPersistCB(newAnswers) -- callback for when user clicks Save, updates store and persists
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
  // tell parent to persist the answers
  onclickSave = () => {
    console.log(`ShortAnswers::onclickSave()`);

    const { answersWithKeys } = this.state
    const { onPersistCB, userId } = this.props

    onPersistCB(userId, this.stripKeys(answersWithKeys))
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
        <div className="text-center">
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
        </div>
        <hr />
        <div className="text-center">
          <Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>Add answer</Button>
        </div>
        <hr />
      </>
    )
  }
}
