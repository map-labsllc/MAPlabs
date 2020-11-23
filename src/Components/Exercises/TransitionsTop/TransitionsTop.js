import React from 'react'
import PropTypes from 'prop-types'
import Top5ListCT from '../Top5List/Top5ListCT'

import { QUESTION_TYPE_TOP_TRANSITIONS} from '../../../store/answers/constants'
import { IDX_FROM, IDX_SELECTED, IDX_TO, IDX_TRANSITION, SELECTED } from '../../../constants'
import { hydrater, dehydrater } from '../../../store/answers/reducer'

/* **************************************************
     Displays a single selection
     -- checkbox to select the top 5
     -- field attributes of the data

   props:
     id -- integer id for the question (poorman's UUID)
     data -- { selected:'selected'/'', label:'this is a label' }
     fields -- [field1, feild2] field attributes to display
     isDynamic -- not defined or true
     updateCB -- call for all changes
***************************************************** */
export default function TransitionsTop(props) {
  const answerShape = {
    [IDX_FROM]: 'from',
    [IDX_TO]: 'to',
    [IDX_TRANSITION]: 'area',
    [IDX_SELECTED]: SELECTED
  }

  // format answers for checkbox selector
  const hydrateAnswer = hydrater(answerShape)
  
  // format item into answer for saving
  const dehydrateAnswer = dehydrater(answerShape)

  const headings = ['Area', 'From', 'To']
  const fields = ['area', 'from', 'to']
  const selectedAttribute = 'from' // TODO, fix
  const editFields = ['from', 'to']

  return <Top5ListCT
    {...props}
    hydrateAnswer={hydrateAnswer}
    dehydrateAnswer={dehydrateAnswer}
    fields={fields}
    headings={headings}
    selectedAttribute={selectedAttribute}
    question_type={QUESTION_TYPE_TOP_TRANSITIONS}
    editFields={editFields}
  />
}

TransitionsTop.propTypes = {
  question: PropTypes.object.isRequired,
  promptQuestionCodes: PropTypes.arrayOf(PropTypes.number).isRequired
}

