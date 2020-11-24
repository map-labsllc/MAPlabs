import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Top5ListCT from '../Top5List/Top5ListCT'

import { QUESTION_TYPE_TOP_STRENGTHS } from '../../../store/answers/constants'
import { IDX_STRENGTH, IDX_SELECTED } from '../../../constants'
import { hydrater, dehydrater } from '../../../store/answers/reducer'
import { listIdToValue } from '../../../store/lists/actions'

/* **************************************************
   StrengthsTop5CT componenReflections Displays a single selection
     -- checkbox to select the top 5
     -- field attributes of the data

   props:
     id -- integer id for the question (poorman's UUID)
     data -- { selected:'selected'/'', label:'this is a label' }
     fields -- [field1, feild2] field attributes to display
     isDynamic -- not defined or true
     updateCB -- call for all changes
***************************************************** */
export default function StrengthsTop5(props) {
  const answerShape = {
    [IDX_STRENGTH]: 'strength',
    [IDX_SELECTED]: 'selected'
  }

  const { strengthOptions } = props
  // format answers for checkbox selector
  const hydrateAnswer = (answer) => {
    const hydrated = hydrater(answerShape)(answer)

    // add strength value to object
    return ({
      strengthValue: listIdToValue(strengthOptions, answer[IDX_STRENGTH]), ...hydrated
    })
  }

  // format item into answer for saving
  const dehydrateAnswer = dehydrater(answerShape)

  const headings = ['Strength']
  const fields = ['strengthValue']
  const selectedAttribute = 'strength'

  const [answersCopied, setAnswersCopied] = useState(false)

  // if first time, copy answers from parent
  useEffect(() => {
    if (!answersCopied) {
      // TODO add copy answers here

    }
    setAnswersCopied(true)
  });

  return <Top5ListCT
    {...props}
    hydrateAnswer={hydrateAnswer}
    dehydrateAnswer={dehydrateAnswer}
    fields={fields}
    headings={headings}
    selectedAttribute={selectedAttribute}
    question_type={QUESTION_TYPE_TOP_STRENGTHS}
  />
}

StrengthsTop5.propTypes = {
  selectedAttribute: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  hydrateAnswer: PropTypes.func.isRequired,
  dehydrateAnswer: PropTypes.func.isRequired,
}
