import React from "react"
import PropTypes from "prop-types"
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import MadLib from "./MadLib"
import QuestionsCT from "../../Framework/QuestionsCT"
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
    isDynamic: this.props.isDynamic,
    madlibsSet: {}
  }

  async componentDidMount() {
    const { copyParentAnswersCB, question, madlibs, impactFilter } = this.props

    if (!madlibs.length && !this.state.madlibsSet[impactFilter]) {
      console.log('answers not set, copying parent')
      await copyParentAnswersCB(question)
    }
    this.state.madlibsSet[impactFilter] = true
  }

  onSave = () => {
    const { onCloseModalCB } = this.props
    this.setState({isDynamic: false})
    onCloseModalCB()
  }

  render() {
    const { isDynamic } = this.state
    const { madlibs, question, onUpdateStoreCB, impactFilter } = this.props

    console.log("MadLibs question", question)
    if (!isDynamic) {
      return (
        <ListGroup className="text-left">
          {madlibs.map((madlib, i) => (
            <ListGroupItem key={i}>
              <h3>
                {impactFilter}
              </h3>
              <div>
                <MadLib question={question} madlib={madlibs[i]} onUpdateStoreCB={onUpdateStoreCB} />
              </div>
            </ListGroupItem>
          ))
          }
        </ListGroup>
      )
    }

    const MadLibComponents = madlibs.reduce((acc, madlib, idx) => {
      acc.push(<MadLib id={idx} question={question} madlib={madlibs[idx]} onUpdateStoreCB={onUpdateStoreCB}/>)
      return acc
    }, [])
    
    return (
      // previous/next wrapper for each MadLibs
      <QuestionsCT
        question={question}
        questionType={QUESTION_TYPE_MADLIBS}
        onCloseModalCB={this.onSave}
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
  onUpdateStoreCB: PropTypes.func,
  copyParentAnswers: PropTypes.func 
}
