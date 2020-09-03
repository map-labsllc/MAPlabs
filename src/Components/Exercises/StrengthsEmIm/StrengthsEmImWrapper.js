import React from "react"
import PropTypes from "prop-types"
import { UUID } from "../../Utils/UUID"
import StrengthsEmImCT from "./StrengthsEmImCT"
import QuestionsCT from "../../Framework/QuestionsCT"
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { QUESTION_TYPE_STRENGTH } from "../../../store/answers/constants"

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
  uuid = new UUID() // provides unique keys for <StrengthsEmImWrapper> components

  state = {
    strengths: this.props.strengths,
    isDynamic: this.props.isDynamic,
  }

  render() {
    const { strengths, isDynamic } = this.state

    const { question, onUpdateStoreCB } = this.props

    if (!isDynamic) {
      return (
        <ListGroup className="text-left">
          {strengths.map((strength, i) => (
            <ListGroupItem key={i}>
              <h3>
                {i + 1}. {strength}
              </h3>
              <div>
                <StrengthsEmImCT question={question} strength={strength } />
              </div>
            </ListGroupItem>
          ))
          }
        </ListGroup>
      )
    }

    let EmImReflections = strengths.reduce((acc, strength) => {
      acc.push(<StrengthsEmImCT question={question} strength={strength} />)
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
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func 
}
