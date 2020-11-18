import React, { useState} from 'react'
import PropTypes from 'prop-types'
import { Form, FormControl } from 'react-bootstrap'
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
  const { id, updateCB, data, isDynamic, fields, selectedAttribute, editFields = [] } = props

  const [formData, setData] = useState(data);

  const onCheck = (e) => {
    const newData = {
      ...props.data,
      selected: (e.target.checked ? SELECTED : '') 
    }

    setData(newData)
    updateCB(id, newData)
  }

  const onChange = (e, attribute) => {
    let value = e.target.value
    const newData = {
      ...formData,
      [attribute]: value,
    }

    setData(newData)
    updateCB(id, newData)
  }

  if (!editFields.length) {
    editFields.push(selectedAttribute)
  }

  const fieldsToCells = () => (
    <>
      { fields.map((field, idx) => 
        <td className="text-left" key={idx}>
          {isDynamic && editFields.includes(field) ?
            <FormControl 
              onChange={(e) => onChange(e, field)}
              type="text" 
              value={formData[field]}
            />
            : <>{formData[field]}</> }
        </td>)
      }
    </>
  )

  // static
  if ( !isDynamic ) {
    return (
      <>
        <tr>
          { fieldsToCells() }
        </tr>
      </>
    )
  }

  // dynamic render
  return (
    <>
      <tr>
        <td className="text-left" key="-1">
          <input 
            onChange={onCheck}
            type="checkbox" 
            checked={!!formData.selected}
          />
        </td>
        { fieldsToCells() }
      </tr>
    </>
  )
}


Top5.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
  isDynamic: PropTypes.bool,
  updateCB: PropTypes.func,
  selectedAttribute: PropTypes.string,
  editFields: PropTypes.array
}

