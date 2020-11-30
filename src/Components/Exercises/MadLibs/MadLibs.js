import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import MadLib from './MadLib'
import QuestionsCT from '../../Framework/QuestionsCT'
import { QUESTION_TYPE_MADLIBS } from '../../../store/answers/constants'

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
const MadLibs = (props) => {
  const { copyParentAnswersCB, question, madlibs, impactFilter, onCloseModalCB, onUpdateStoreCB } = props

  const [isDynamic, setIsDynamic] = useState(props.isDynamic)
  const [parentCopied, setParentCopied] = useState({})

  useEffect(() => {
    if (!madlibs.length && !parentCopied[impactFilter]) {
      console.log('answers not set, copying parent', question)
      copyParentAnswersCB(question)
      const parentCopyCheck = { ...parentCopied, [impactFilter]: true }
      setParentCopied(parentCopyCheck)
    }
  }, [madlibs, impactFilter])

  const onSave = () => {
    setIsDynamic(false)
    onCloseModalCB()
  }

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
      onCloseModalCB={onSave}
      subComponents={MadLibComponents}
      isDynamic={true}
    />
  )
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

export default MadLibs