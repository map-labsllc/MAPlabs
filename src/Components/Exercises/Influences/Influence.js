import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormControl,
  Glyphicon,
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
export default class Influence extends React.Component {

  /* **********************************************
    onChange()

    e - target.id is a key for the influence object:  'relationship', 'name', 'belief', or 'impact'
  ************************************************ */
  onChange = (e) => {
    console.log("Influence::onChange()")
    const newInfluence = {
      ...this.props.influence,
      [e.target.id]: e.target.value
    }
    const { id, updateInfluenceCB } = this.props
    updateInfluenceCB(id, newInfluence)
  }

  // **********************************************
  onclickDelete = (e) => {
    console.log("Influence::onclickDelete()")
    const { id, deleteInfluenceCB } = this.props
    deleteInfluenceCB(id)
  }

  // **********************************************
  // render!
  render() {
    console.log("Influence::render(): ", this.props.influence)

    const { beliefs, relationships, influence, isDynamic } = this.props
    const { relationship, name, belief, impact } = influence

    // static render, note: no surrounding <table> tag, but still working
    if ( !isDynamic ) {
      return (
        <tr>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{relationship}</th>
          <th>&nbsp;&nbsp;--&nbsp;&nbsp;{name}</th>
          <th>&nbsp;&nbsp;--&nbsp;&nbsp;{belief}</th>
          <th>&nbsp;&nbsp;--&nbsp;&nbsp;{impact}</th>
        </tr>
      )
    }

    // dynamic render
    return (
      <Form inline>

        &nbsp;&nbsp;&nbsp;
        <Button type="button" onClick={this.onclickDelete}><Glyphicon glyph="trash"></Glyphicon></Button>

        &nbsp;
        &nbsp;
        <select
          id="relationship"
          defaultValue={relationship}
          onChange={this.onChange}
        >
          <option value='' disabled hidden>- relationship -</option>
          {/*'key' added to suppress react warning*/}
          {relationships.map((relationship, idx) =>
            <option key={idx} value={relationship}>{relationship}</option>
          )}
        </select>

        &nbsp;
        &nbsp;
        <FormControl
          id='name'
          type='text'
          value={name}
          placeholder='Individual'
          onChange={this.onChange}
        />

        &nbsp;
        &nbsp;
        <select
          id="belief"
          defaultValue={belief}
          onChange={this.onChange}
        >
          <option value='' disabled hidden>- belief/value -</option>
          {/*'key' added to suppress react warning*/}
          {beliefs.map((belief, idx) =>
            <option key={idx} value={belief}>{belief}</option>
          )}
        </select>

        &nbsp;
        &nbsp;
        <select
          id="impact"
          defaultValue={impact}
          onChange={this.onChange}
        >
          <option value='' disabled hidden>- impact -</option>
          <option value={IMPACT_SUPPORTIVE}>{IMPACT_SUPPORTIVE}</option>
          <option value={IMPACT_INHIBITING}>{IMPACT_INHIBITING}</option>
        </select>

      </Form>
    )
  }
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
