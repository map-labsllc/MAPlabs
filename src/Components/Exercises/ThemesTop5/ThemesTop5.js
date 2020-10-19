import React from 'react'
import PropTypes from 'prop-types'
import Top5ListCT from '../Top5List/Top5ListCT'

import { QUESTION_TYPE_TOP_THEMES } from '../../../store/answers/constants'
import { IDX_THEME, IDX_SELECTED } from '../../../constants'

/* **************************************************
   ThemesTop5  component

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
export default function ThemesTop5(props) {

  // format answers for checkbox selector
  const hydrateAnswer = (answer) => ({
    theme: answer[IDX_THEME],
    selected: answer[IDX_SELECTED]
  })
  
  // format item into answer for saving
  const dehydrateAnswer = (item) => {
    const record = []
    record[IDX_THEME] = item.theme
    record[IDX_SELECTED] = item.selected
  
    return record
  }

  const headings = ['Theme']
  const fields = ['theme']
  const selectedAttribute = 'theme'

  return <Top5ListCT
    {...props}
    hydrateAnswer={hydrateAnswer}
    dehydrateAnswer={dehydrateAnswer}
    fields={fields}
    headings={headings}
    selectedAttribute={selectedAttribute}
    question_type={QUESTION_TYPE_TOP_THEMES}
  />
  
}

ThemesTop5.propTypes = {
  selectedAttribute: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  hydrateAnswer: PropTypes.func.isRequired,
  hydrateAnswer: PropTypes.func.isRequired,
}

