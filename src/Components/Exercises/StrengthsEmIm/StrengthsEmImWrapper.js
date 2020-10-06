import React from "react"
import PropTypes from "prop-types"
import StrengthsEmImCT from "./StrengthsEmImCT"
import QuestionsCT from "../../Framework/QuestionsCT"
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { QUESTION_TYPE_STRENGTH } from "../../../store/answers/constants"
import { listIdToValue } from "../../../store/lists/actions"

/* **************************************************
   Strength component
   Displays the list of strengths with reflections on embodiments/impediments
   state:
    strengths
   props:
     number -- number of the question in <Questions> when isDynamic, 1-based
     question -- { code: 50, text: "Question 50" }
     strengths
     isDynamic
     onUpdateStoreCB() -- callback to update the store
***************************************************** */
export default class StrengthsEmImWrapper extends React.Component {

  state = {
    strengths: this.props.strengths,
    isDynamic: this.props.isDynamic,
    strengthsSet: false
  }

  async componentDidMount() {
    let { copyParentAnswersCB } = this.props
    if (!this.state.strengths.length && !this.state.strengthsSet) {
      console.log('answers not set, copying parent')
      await copyParentAnswersCB()
    }

    this.state.strengthsSet = true
  }

  render() {
    const { strengths, strengthsList, isDynamic } = this.state

    const { question, onUpdateStoreCB } = this.props

    if (!isDynamic) {
      return (
        <ListGroup className="text-left">
          {strengths.map((strength, i) => (
            <ListGroupItem key={i}>
              <h3>
                {i + 1}. {listIdToValue(strengthsList, strengths[i])}
              </h3>
              <div>
                <StrengthsEmImCT question={question} strength={strengths[i] } />
              </div>
            </ListGroupItem>
          ))
          }
        </ListGroup>
      )
    }

    let EmImReflections = strengths.reduce((acc, strength, idx) => {
      acc.push(<StrengthsEmImCT question={question} strength={listIdToValue(strengthsList, strength[idx])} />)
      return acc
    }, [])
    
    return (
      // previous/next wrapper for each strength
      <QuestionsCT
        question={question}
        questionType={QUESTION_TYPE_STRENGTH}
        onCloseModalCB={() => {}} 
        subComponents={EmImReflections}
        isDynamic={true}
      />
    )
  }
}

StrengthsEmImWrapper.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  strengths: PropTypes.array.isRequired,
  strengthsList: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,
  copyParentAnswers: PropTypes.func 
}
