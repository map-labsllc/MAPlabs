import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'

import {
  SELECTED
} from '../Influences/InfluencesConstants'

import '../../../CSS/ModalNavButtons.css'

/* **************************************************
   InfluenceTop5 component

   Displays a single influence
     -- checkbox to select the top 5
     -- influence


   props:
     id -- integer id for the question (poorman's UUID)
     influence -- { selected:'selected'/'' relationship: name:"Tim", belief:"Charity", impact:"supportive", selected:'selected' }
     isDynamic -- not defined or true
     updateInfluenceCB -- call for all changes
     deleteInfluenceCB -- click trash can
***************************************************** */
export default function Influence(props) {

  /* **********************************************
    onChange()

    e - target.id is a key into the influence object:  'relationship', 'name', 'belief', or 'impact'
  ************************************************ */
  const onChange = (e) => {
    console.log("InfluenceTop5::onChange(), e.target.checked:", e.target.checked)
    const newInfluence = {
      ...props.influence,
      selected: (e.target.checked ? SELECTED : '')
    }
    const { id, updateInfluenceCB } = props
    updateInfluenceCB(id, newInfluence)
  }

  // **********************************************
  // render!
  // console.log("InfluenceTop5::render(): ", props.influence)

  const { influence, isDynamic } = props
  const { selected, relationship, name, belief } = influence

  // static
  if ( !isDynamic ) {
    return (
      <tr>
        <td className="text-left">{relationship}</td>
        <td className="text-left">{name}</td>
        <td className="text-left">{belief}</td>
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
      <td className="text-left">{relationship}</td>
      <td className="text-left">{name}</td>
    </tr>
  )

}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Influence.propTypes = {
//   question: PropTypes.shape( {
//     code: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//   } ).isRequired,
//   previousData: PropTypes.object.isRequired,
//   isDynamic: PropTypes.bool,
//   onUpdateAnswerCB: PropTypes.func,  // required, injected by <Popup>
// }

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
