import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Form,
  FormControl,
  FormGroup
} from 'react-bootstrap'

/* **************************************************
   Transition component

   Displays a single question with:
     -- A single transition
     -- Delete button

   props:
     id -- integer id for the question (poorman's UUID)
     previousTransition -- previous transition
     isDynamic -- undefined or true
                  rendering static version in Popup or dynamic verison in Modal
     updateTransitionCB(newTransition) -- callback for when user moves off on the field
     deleteTransitionCB -- callback when user clicks the Delete button
***************************************************** */
export default function Transition(props) {
  const { transition, isDynamic, onSubComponentChange } = props

  const [to, setTo] = useState(transition.to)
  const [from, setFrom] = useState(transition.from)

  const onChange = async (e) => {
    e.preventDefault()

    // get data from state variables
    const data = {
      to,
      from
    }

    const { updateTransitionCB, id } = props

    await updateTransitionCB(id, data)
  }

  const onclickDelete = () => {
    console.log('Transition::onclickDelete()')
    const { deleteTransitionCB, id } = props
    deleteTransitionCB(id)
  }

  const handleFromChange = (e) => {
    setFrom(e.target.value);
    if (onSubComponentChange) {
      onSubComponentChange();
    }
  };

  const handleToChange = (e) => {
    setTo(e.target.value);
    if (onSubComponentChange) {
      onSubComponentChange();
    }
  };

  if (!isDynamic) {
    // nothing to display
    if (!transition.from.length) {
      return (
        <p>Not started.</p>
      )
    }

    // display the transition
    return (
      <ul className="list-group">
        <li className="list-group-item">{transition.from} &rarr; {transition.to}</li>
      </ul>
    )
  }

  return (
    <Form inline onBlur={onChange}>
      <div className="text-center" style={style.size}>
        <FormGroup>
          {'From this '}
          <FormControl
            type="text"
            onChange={handleFromChange}
            value={from}
            style={style.width}
            placeholder="Please enter a from"
          />
          {' to '}
          <FormControl
            type="text"
            onChange={handleToChange}
            value={to}
            style={style.width}
            placeholder="Please enter a to"
          />
        </FormGroup>
        {' '}
        <Button type="button" onClick={onclickDelete}><i className="nc-icon nc-simple-remove"></i></Button>
      </div>
    </Form>
  )
}

Transition.propTypes = {
  id: PropTypes.number.isRequired,
  transition: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool, // required but injected by <Popup>
  updateAnswerCB: PropTypes.func, // required but injected by <Popup>
  deleteAnswerCB: PropTypes.func, // required but injected by <Popup>
}

/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////
/// /////////////////////////////////////////////////////////////

const style = {
  size: {
    fontSize: '18pt',
  },
  width: {
    width: '280px',
  }
}
