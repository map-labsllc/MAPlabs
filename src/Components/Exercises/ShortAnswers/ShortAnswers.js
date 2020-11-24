import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
} from 'react-bootstrap'
import ShortAnswer from './ShortAnswer'
import '../../../CSS/ModalNavButtons.css'
import { UUID } from '../../Utils/UUID'

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
     number -- number of the question in <Questions>, 1-based
     question -- { code: 50, text: "Question 50" }
     previousAnswers -- [] or array of strings of previous answers
     isDynamic -- undefined or true
                  undefined: render static version in Popup
                  true: render dynamic/interactive verison in Modal
     onUpdateStoreCB(newAnswers) -- callback to update the store
***************************************************** */


/// ////////////////////////////////////////
export default class ShortAnswers extends React.Component {

  uuid = new UUID() // provides unique keys for <ShortAnswer> components

  state = {
    isDirty: false,
    answersWithKeys: this.uuid.addKeys(this.props.previousAnswers)
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
    // console.log(`ShortAnswers::updateAnswer(${key}, ${newAnswer})`)

    const { onUpdateStoreCB } = this.props
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.map(answerWithKey =>
      ((answerWithKey.key === key) ? { key, item: newAnswer } : answerWithKey))

    onUpdateStoreCB(this.uuid.stripKeys(newAnswersWithKeys))
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // delete answer from state::answers and
  //   tell parent to update array of answers to store
  deleteAnswer = (keyToDelete) => {
    // console.log(`ShortAnswers::deleteAnswer(${keyToDelete})`)

    const { onUpdateStoreCB } = this.props
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.filter((answerWithKey) =>
      keyToDelete !== answerWithKey.key)

    onUpdateStoreCB(this.uuid.stripKeys(newAnswersWithKeys))
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // add an empty answer to state::answers
  onclickAdd = () => {
    // console.log(`ShortAnswers::onclickAdd()`)
    const { answersWithKeys } = this.state

    const newAnswersWithKeys = answersWithKeys.concat(this.uuid.getNewItemWithKey(''))
    // console.log("newAnswersWithKeys: ", newAnswersWithKeys)
    this.setState({ answersWithKeys: newAnswersWithKeys })
  }

  // **********************************************
  // render!
  render() {
    // console.log("ShortAnswers::render()")

    const { number, question, isDynamic } = this.props
    const { answersWithKeys } = this.state

    // render static version
  
    if (!isDynamic) {
      console.log(number, question, answersWithKeys)
      return (
        <ul className="list-group text-left">
          { answersWithKeys.map((answerWithKey) =>
            <li className="list-group-item" key={answerWithKey.key}>
              <ShortAnswer
                key={answerWithKey.key}
                id={answerWithKey.key}
                previousAnswer={answerWithKey.item}
                updateAnswerCB={this.updateAnswer}
                deleteAnswerCB={this.deleteAnswer}
                isDynamic={isDynamic}
              />
            </li>
          )}
        </ul>
      )
    }

    // render dynamic version
    return (
      <div className="text-left">
        <h4 style={style.h4}>{number}. {question.text}</h4>
        {answersWithKeys.map((answerWithKey) =>
          <ShortAnswer
            key={answerWithKey.key}
            id={answerWithKey.key}
            previousAnswer={answerWithKey.item}
            updateAnswerCB={this.updateAnswer}
            deleteAnswerCB={this.deleteAnswer}
            placeholder={ question.placeholder }
            isDynamic={isDynamic}
          >
          </ShortAnswer>
        )}

        <div>
          <Button className="addAnswerButton" type="button" onClick={this.onclickAdd}>Add Answer</Button>
        </div>
        <hr />
      </div>
        
    )
  }
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////

ShortAnswers.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  previousAnswers: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func, // required, injevted by <Popup>
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////

const style = {
  h4: { marginTop: '1em' },
  centering: {
    marginLeft: "45%",
    marginRight: "45%",
  }
}
