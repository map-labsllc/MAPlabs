import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { SELECTED } from '../../../constants'

/* **************************************************
   Top5 Checkbox component

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
export default function Top5(props) {

  /* **********************************************
    onChange()
    e - target.id is a key into the data object:
    *********************************************** */
  const onChange = (e) => {
    const newData = {
      ...props.data,
      selected: (e.target.checked ? SELECTED : '')
    }
    const { id, updateCB } = props
    updateCB(id, newData)
  }

  const { data, isDynamic, fields } = props
  const { selected } = data

  console.log('Top5 render', data, fields)
  const fieldsToCells = () => (fields.map(field => 
    <td className="text-left">{data[field]}</td>
  ))

  // static
  if ( !isDynamic ) {
    return (
      <tr>
        <td></td>
        { fieldsToCells() }
      </tr>
    )
  }

  // dynamic render
  return (
    <tr>
      <td className="text-left">
        <Form inline>
          <input 
            onChange={onChange}
            type="checkbox" 
            checked={selected ? true : false}
          />
        </Form>
      </td>
      { fieldsToCells() }
    </tr>
  )
}


Top5.propTypes = {
  id: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  updateCB: PropTypes.func,
}

