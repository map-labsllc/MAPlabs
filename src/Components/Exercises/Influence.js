import React from 'react'
import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormGroup,
  FormControl,
  Glyphicon,
} from 'react-bootstrap'

import '../../CSS/ModalNavButtons.css'
import { UUID } from '../Utils/UUID'

// legal values for an impact
export const IMPACT_SUPPORTIVE = 'supportive'
export const IMPACT_INHIBITING = 'inhibiting'
export const IMPACT_BOTH       = 'both'

/* **************************************************
   Influence component

   Displays a single influence
     -- text control for name
     -- selection for belief
     -- selection for impact
     -- delete button

   state:
     todo: fill this in

   props:
     id -- integer id for the question (poorman's UUID)
     influence -- { name:"Tim", belief:"Charity", impact:"supportive" }
     isDynamic -- not defined or true
     updateInfluenceCB -- call for all changes, updt store
     deleteInfluenceCB -- click trash can
***************************************************** */
export default class Influence extends React.Component {

  /* **********************************************
    onChange()

    e - target.id is key for influence object:  name, belief, or impact
  ************************************************ */
  onChange = (e) => {
    console.log("Influence::onChange()")
    const newInfluence = {
      ...this.props.influence,
      [e.target.id]: e.target.value
    }
    console.log('-----------')
    console.log('newInfluence:', newInfluence)
    console.log('-----------')
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

    const { influence, isDynamic } = this.props
    const { name, belief, impact } = influence

    // if ( !isDynamic ) {
    //   return (
    //     <>
    //       <p>&nbsp;&nbsp;&nbsp;{name} -- {belief} -- {impact}</p>
    //     </>
    //   )
    // }

    return (
      <Form inline>
        {/*<p>&nbsp;&nbsp;&nbsp;{name} -- {belief} -- {impact}</p>*/}

        &nbsp;&nbsp;&nbsp;
        <Button type="button" onClick={this.onclickDelete}><Glyphicon glyph="trash"></Glyphicon></Button>
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
          <option value='Balance'>Balance</option>
          <option value='Charity'>Charity</option>
          <option value='Courage'>Courage</option>
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
          <option value={IMPACT_BOTH}      >{IMPACT_BOTH}</option>
        </select>
      </Form>
    )
  }
}

// <select id="belief">
//   <option selected={belief==='Balance'}>Balance</option>
//   <option selected={belief==='Charity'}>Charity</option>
//   <option selected={belief==='Courage'}>Courage</option>
// </select>

// <option {((belief === IMPACT_SUPPORTIVE) ? 'selected' : 'x')}>{IMPACT_SUPPORTIVE}</option>
// <option {((belief === IMPACT_INHIBITING) ? 'selected' : 'x')}>{IMPACT_INHIBITING}</option>
// <option {((belief === IMPACT_BOTH)       ? 'selected' : 'x')}>{IMPACT_BOTH}</option>


// onChange={this.onChangeFrom}
// onBlur={this.onBlur}
// style={style.width}

// <Form>
//   <p>&nbsp;&nbsp;&nbsp;{name} -- {belief} -- {impact}</p>
//   <Form.Control as="select">
//     <option>{IMPACT_SUPPORTIVE}</option>
//     <option>{IMPACT_INHIBITING}</option>
//     <option>{IMPACT_BOTH}</option>
//   </Form.Control>
// </Form>


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
