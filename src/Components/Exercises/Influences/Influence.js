import React, { useState, useEffect, useRef } from 'react'
import ErrorAlert from '../../Utils/ErrorAlert'

import PropTypes from 'prop-types'

import {
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'

import {
  IMPACT_SUPPORTIVE,
  IMPACT_INHIBITING
} from '../../../constants'

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
export default function Influence(props) {
  const { beliefs, relationships, influence, isDynamic, setDisableNext } = props
  const { relationship, name, belief, impact } = influence

  // we use the help of useRef to test if it's the first render
  const firstRender = useRef(true)

  // set a state variable which can be used to disable the save/submit button
  // we set it to true so that the form is disabled on first render
  const [disable, setDisabled] = useState(true)

  // we can also set error messages to display to the user
  const [nameError, setNameError] = useState(null)
  const [impactError, setImpactError] = useState(null)
  const [beliefError, setBeliefError] = useState(null)
  const [relationshipError, setRelationshipError] = useState(null)
  const [formHasError, setFormHasError] = useState(false)

  const [nameLabel, setNameLabel] = useState(name)

  // for every change in our state this will be fired
  // we add validation here and disable the save button if required
  useEffect(() => {
    // we want to skip validation on first render
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    setDisabled(checkFormErrors())
    setDisableNext(formHasError)
  }, [relationship, name, belief, impact, formHasError])

  // here we run any validation, returning true/false
  const checkFormErrors = () => {
    setNameError(name ? null : 'Enter a name.')
    setRelationshipError(relationship ? null : 'Select a relationship.')
    setBeliefError(belief ? null : 'Select a belief.')
    setImpactError(impact ? null : 'Select an impact.')

    console.log("form error", nameError , relationshipError , beliefError , impactError)
    setFormHasError(nameError || relationshipError || beliefError || impactError ? true : false)

    return formHasError
  }

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

  // static render, note: no surrounding <table> tag, but still working
  if (!isDynamic) {
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
        <option value='' disabled hidden>-- select influence --</option>
        {relationships.map((rel) => <option key={rel.id} value={rel.value}>{rel.value}</option>)}
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
        {/* 'key' added to suppress react warning */}
        {beliefs.map((belief) => <option key={belief.id} value={belief.value}>{belief.value}</option>)}
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

      <Button onClick={onclickDelete}><i className="nc-icon nc-simple-remove"></i></Button>

      { formHasError &&
        <ErrorAlert>
          <ul>
            {relationshipError && <li>{relationshipError}</li>}
            {nameError && <li>{nameError}</li>}
            {beliefError && <li>{beliefError}</li>}
            {impactError && <li>{impactError}</li>}
          </ul>
        </ErrorAlert>
      }
    </Form>
  )
}

Influence.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  influence: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateAnswerCB: PropTypes.func,
  setDisableNext: PropTypes.func
}
