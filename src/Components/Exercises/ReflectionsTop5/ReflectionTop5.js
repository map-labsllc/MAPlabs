import React from 'react'
import PropTypes from 'prop-types'

import { FormControl } from 'react-bootstrap'

/* **************************************************
   Top5 component

   Displays
     -- checkbox to select the top 5
     -- reflection

   props:
     id -- integer id for the question (poorman's UUID)
     reflection -- {}
     isDynamic -- not defined or true
     updateInfluenceCB -- call for all changes
     deleteInfluenceCB -- click trash can
***************************************************** */
export default function StrengthEmImTop5(props) {

  /* **********************************************
    onChange()

    e - target.id is a key into the  object: 
  ************************************************ */
  const onChange = (e) => {
    const newReflection = {
      ...props.reflection,
      selected: (e.target.checked ? SELECTED : '')
    }
    const { id, updateReflectionCB } = props
    updateReflectionCB(id, newReflection)
  }

  // render!
  const { relection, isDynamic } = props
  const { selected, strength, strengthValue, phrase, effect } = reflection

  // static
  if ( !isDynamic ) {
    return (
      <tr>
        <td></td>
        <td className="text-left">{strengthValue}</td>
        <td className="text-left">{phrase}</td>
        <td className="text-left">{effect}</td>
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
            checked={selected.length!==0 ? true : false}
          />
        </Form>
      </td>
      <td className="text-left">{strengthValue}</td>
      <td className="text-left">{phrase}</td>
      <td className="text-left">{effect}</td>
    </tr>
  )
}

// love me some propTypes
StrengthEmImTop5.propTypes = {
  reflection: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  id: PropTypes.number.isRequired,
  updateReflectionCB: PropTypes.func,  
}


