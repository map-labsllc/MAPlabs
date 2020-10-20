import React from 'react'
import PropTypes from 'prop-types'
import Top5ListCT from '../Top5List/Top5ListCT'

import { QUESTION_TYPE_TOP_STRENGTHS } from '../../../store/answers/constants'
import { IDX_STRENGTH, IDX_SELECTED } from '../../../constants'
import { hydrater, dehydrater } from '../../../store/answers/reducer'

/* **************************************************
   ReflectionsThemes componenReflections Displays a single selection
     -- checkbox to select the top 5
     -- field attributes of the data

   props:
     id -- integer id for the question (poorman's UUID)
     data -- { selected:'selected'/'', label:'this is a label' }
     fields -- [field1, feild2] field attributes to display
     isDynamic -- not defined or true
     updateCB -- call for all changes
***************************************************** */
export default function ReflectionsThemes(props) {
  const answerShape = {
    IDX_STRENGTH: 'strength',
    IDX_SELECTED: 'selected'
  }

  // format answers for checkbox selector
  const hydrateAnswer = hydrater(answerShape)
  
  // format item into answer for saving
  const dehydrateAnswer = dehydrater(answerShape)

  const headings = ['Strength']
  const fields = ['strength']
  const selectedAttribute = 'strength'

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

ReflectionsThemes.propTypes = {
  selectedAttribute: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  hydrateAnswer: PropTypes.func.isRequired,
  hydrateAnswer: PropTypes.func.isRequired,
}

