import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-bootstrap'
import { SELECTED } from '../../../constants'

/* **************************************************
   Top5 component

   Displays a single influence
     -- checkbox to select the top 5
     -- data

   props:
     id -- integer id for the question (poorman's UUID)
     data -- { selected:'selected'/'', label:'this is a label' }
     isDynamic -- not defined or true
     updateInfluenceCB -- call for all changes
     deleteInfluenceCB -- click trash can
***************************************************** */
export default function Top5(props) {

  /* **********************************************
    onChange()
    e - target.id is a key into the data object:
    *********************************************** */
  const onChange = (e) => {
    console.log("Top5::onChange(), e.target.checked:", e.target.checked)
    const newData = {
      ...props.data,
      selected: (e.target.checked ? SELECTED : '')
    }
    const { id, updateCB } = props
    updateCB(id, newData)
  }

  // **********************************************
  // render!
  // console.log("ThemeTop::render(): ", props.influence)

  const { data, isDynamic } = props
  const { selected, label } = data

  // static
  if ( !isDynamic ) {
    return (
      <tr>
        <td></td>
        <td className="text-left">{label}</td>
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
      <td className="text-left">{label}</td>
    </tr>
  )
}


Top5.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  data: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  isDynamic: PropTypes.bool,
  updateCB: PropTypes.func,
}

