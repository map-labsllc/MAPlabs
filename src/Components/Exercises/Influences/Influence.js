import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'

import {
  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING
} from './InfluencesConstants'

import '../../../CSS/ModalNavButtons.css'

/* **************************************************
   Influence component

   Displays a single influence
     -- delete button
     -- selection for relationship
     -- text control for name
     -- selection for belief
     -- selection for impact

   props:
     id -- integer id for the question (poorman's UUID)
     beliefs -- statcdata -- [ 'belief1', 'belief2', ... ]
     relationships -- staticdata -- ['brother',...]
     influence -- { relationship:"brother", name:"Tim", belief:"Charity", impact:"supportive", selected:'selected' }
     isDynamic -- not defined or true
     updateInfluenceCB -- call for all changes
     deleteInfluenceCB -- click trash can
***************************************************** */
export default function Influence( props )  {

  /* **********************************************
    onChange()

    e - target.id is a key for the influence object:  'relationship', 'name', 'belief', or 'impact'
  ************************************************ */
  const onChange = (e) => {
    // console.log("Influence::onChange()")
    const newInfluence = {
      ...props.influence,
      [e.target.id]: e.target.value
    }
    const { id, updateInfluenceCB } = props
    updateInfluenceCB(id, newInfluence)
  }

  // **********************************************
  const onclickDelete = (e) => {
    // console.log("Influence::onclickDelete()")
    const { id, deleteInfluenceCB } = props
    deleteInfluenceCB(id)
  }

  // **********************************************
  // console.log("Influence::render(): ", props.influence)

  const { beliefs, relationships, influence, isDynamic } = props
  const { relationship, name, belief, impact } = influence

  // static render, note: no surrounding <table> tag, but still working
  if ( !isDynamic ) {
    return (
      <tr>
        <td className="text-left">{relationship}</td>
        <td className="text-left">{name}</td>
        <td className="text-left">{belief}</td>
        <td className="text-left">{impact}</td>
      </tr>
    )
  }
  

  // dynamic render
  return (
    <Form inline>
      <FormControl
        id="relationship"
        value={relationship}
        onChange={onChange}
        as="select"
      >
        <option value='' disabled hidden>-- select relationship --</option>
        {relationships.map((relationship, idx) =>
          <option key={relationship.id} value={relationship.value}>{relationship.value}</option>
        )}
      </FormControl>

      <FormControl
        id='name'
        type='text'
        value={name}
        placeholder='Individual'
        onChange={onChange}
      />

      <FormControl
        id="belief"
        value={belief}
        onChange={onChange}
        as="select"
      >
        <option value='' disabled hidden>-- select belief/value --</option>
        {/*'key' added to suppress react warning*/}
        {beliefs.map((belief, idx) =>
          <option key={belief.id} value={belief.value}>{belief.value}</option>
        )}
      </FormControl>

      <FormControl
        id="impact"
        value={impact}
        onChange={onChange}
        as="select"
      >
        <option value='' disabled hidden>-- select impact --</option>
        <option value={IMPACT_SUPPORTIVE}>{IMPACT_SUPPORTIVE}</option>
        <option value={IMPACT_INHIBITING}>{IMPACT_INHIBITING}</option>
      </FormControl>

      <Button type="button" onClick={onclickDelete}><i className="nc-icon nc-simple-remove"></i></Button>

    </Form>
  )
}

//export default Influence

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
