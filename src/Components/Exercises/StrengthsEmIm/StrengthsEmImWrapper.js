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
const IDX_STRENGTH = 0
export default class StrengthsEmImWrapper extends React.Component {

  state = {
    isDynamic: this.props.isDynamic,
    strengthsSet: false
  }

  async componentDidMount() {
    let { copyParentAnswersCB, strengths } = this.props
    if (!strengths.length && !this.state.strengthsSet) {
      console.log('answers not set, copying parent')
      await copyParentAnswersCB()
    }

    this.state.strengthsSet = true
  }

  onSave = () => {
    const { onCloseModalCB } = this.props
    onCloseModalCB() // call parent onCloseModalCB
    this.setState({isDynamic: false})
  }

  render() {
    const { isDynamic } = this.state

    const { strengths, strengthsList, question, onUpdateStoreCB } = this.props

    if (!isDynamic) {
      return (
        <ListGroup className="text-left">
          {strengths.map((strength, i) => (
            <ListGroupItem key={i}>
              <h3>
                {i + 1}. {listIdToValue(strengthsList, strengths[i][IDX_STRENGTH])}
              </h3>
              <div>
                <StrengthsEmImCT question={question} strength={strengths[i]} strengthValue={listIdToValue(strengthsList, strengths[i][IDX_STRENGTH])}/>
              </div>
            </ListGroupItem>
          ))
          }
        </ListGroup>
      )
    }

    let EmImReflections = strengths.reduce((acc, strength, i) => {
      acc.push(<StrengthsEmImCT question={question} onUpdateStoreCB={onUpdateStoreCB} strength={strengths[i]} strengthValue={listIdToValue(strengthsList, strengths[i][IDX_STRENGTH])} />)
      return acc
    }, [])
    
    return (
      // previous/next wrapper for each strength
      <QuestionsCT
        question={question}
        questionType={QUESTION_TYPE_STRENGTH}
        onCloseModalCB={this.onSave} 
        subComponents={EmImReflections}
        isDynamic={isDynamic}
      />
    )
  }
}

StrengthsEmImWrapper.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  promptQuestionCode: PropTypes.number.isRequired,
  strengths: PropTypes.array.isRequired,
  strengthsList: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool.isRequired,
  onUpdateStoreCB: PropTypes.func,
  copyParentAnswers: PropTypes.func.isRequired 
}
