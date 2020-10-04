import React from "react"
import PropTypes from "prop-types"
import MadLib from "./MadLib"
import QuestionsCT from "../../Framework/QuestionsCT"
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { QUESTION_TYPE_MADLIBS } from "../../../store/answers/constants"

/* **************************************************
   MadLibs component
   Displays the list of MadLibs with reflections on embodiments/impediments
   state:
    madlibs
   props:
     number -- number of the question in <Questions> when isDynamic, 1-based
     question -- { code: 50, text: "Question 50" }
     madlibs
     isDynamic
     onUpdateStoreCB() -- callback to update the store
***************************************************** */
export default class MadLibs extends React.Component {

  state = {
    madlibs: this.props.madlibs,
    isDynamic: this.props.isDynamic,
    madlibsSet: false
  }

  async componentDidMount() {
    let { copyParentAnswersCB, question } = this.props
    if (!this.state.madlibs.length && !this.state.madlibsSet) {
      console.log('answers not set, copying parent')
      await copyParentAnswersCB(question)
    }
    this.state.madlibsSet = true
  }

  render() {
    const { madlibs, isDynamic } = this.state

    const { question, onUpdateStoreCB, onUpdateAnswerCB } = this.props

    if (!isDynamic) {
      return (
        <ListGroup className="text-left">
          {madlibs.map((madlib, i) => (
            <ListGroupItem key={i}>
              <h3>
                {i + 1}. {}
              </h3>
              <div>
                <MadLib question={question} madlib={madlib} />
              </div>
            </ListGroupItem>
          ))
          }
        </ListGroup>
      )
    }

    let MadLibComponents = madlibs.reduce((acc, madlib) => {
      acc.push(<MadLib question={question} madlib={madlib} onUpdateStoreCB={onUpdateStoreCB}/>)
      return acc
    }, [])
    
    return (
      // previous/next wrapper for each MadLibs
      <QuestionsCT
        question={question}
        questionType={QUESTION_TYPE_MADLIBS}
        onCloseModalCB={onUpdateAnswerCB}
        subComponents={MadLibComponents}
        isDynamic={true}
      />
    )
  }
}

MadLibs.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired,
  madlibs: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,
  onUpdateStoreCB: PropTypes.func,
  copyParentAnswers: PropTypes.func 
}
