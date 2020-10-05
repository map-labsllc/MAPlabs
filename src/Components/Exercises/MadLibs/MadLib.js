import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MadLibHtml } from './MadLibHtml'

import {
  Button,
  Form,
  FormControl,
  FormLabel
} from 'react-bootstrap'

const Label = FormLabel


/* **************************************************
  MadLib component

  Displays a single influence



   props:
     id -- integer id for the question (poorman's UUID)
    influence
      relationship
      belief
      emotion
      desire
      identity
      action
      result
      change
      intention

***************************************************** */
export default function MadLib(props) {
  const { madlib, isDynamic, onUpdateStoreCB } = props

    
  const [name, setName] = useState(madlib.name);
  const [belief, setBelief] = useState(madlib.belief);
  const [emotion, setEmotion] = useState(madlib.emotion);
  const [desire, setDesire] = useState(madlib.desire);
  const [identity, setIdentity] = useState(madlib.identity);
  const [action, setAction] = useState(madlib.action);
  const [result, setResult] = useState(madlib.result);
  const [impact, setImpact] = useState(madlib.impact);
  const [change, setChange] = useState(madlib.change);
  const [intention, setIntention] = useState(madlib.intention);

  /* **********************************************
    onChange()

    e - target.id is a key into the influence object:  'relationship', 'name', 'belief', or 'impact'
  ************************************************ */
  const onChange = async (e) => {
    // console.log("MadLib::onChange()")
    e.preventDefault()

    // get data from state variables
    let data = { name,
      action,
      belief,
      emotion,
      desire,
      identity,
      result,
      impact,
      change,
      intention } 
 
    const { id, onUpdateStoreCB } = props
    console.log("onUpdateStoreCB with data=", data)

    await onUpdateStoreCB(id, data)
  }

  // **********************************************
  // render!
  // console.log("InfluenceTop5::render(): ", props.influence)

  // static
  if (!isDynamic ) {
    return MadLibHtml(madlib)
  }

  // dynamic render
  return (
    <Form className="text-left" onChange={onChange}>
      <Label>From</Label>
      <FormControl disabled={true} id="name" placeholder="name" value={name} onChange={ (e) => setName(e.target.value.trim()) }/>
      <Label>I appropriated</Label> 
      <FormControl disabled={true} id="belief" placeholder="belief" value={belief} onChange={ (e) => setBelief(e.target.value.trim()) }/> 
      <Label>which makes me feel </Label>
      <FormControl id="emotion" placeholder="emotion" value={emotion} onChange={ (e) => setEmotion(e.target.value.trim()) }/> 
      <Label>The effect of this value/belief is that it</Label>
      <FormControl disabled={true} id="impact" placeholder="impact" value={impact} onChange={ (e) => setImpact(e.target.value.trim()) }/> 
      <Label>me from</Label> 
      <FormControl id="desire" placeholder="personal desire" value={desire} onChange={ (e) => setDesire(e.target.value.trim()) }/> 
      <Label>because I see myself as</Label> 
      <FormControl id="identity" placeholder="identity descriptor" value={identity} onChange={ (e) => setIdentity(e.target.value.trim()) }/> 
      <Label>who can/should </Label>
      <FormControl id="action" placeholder="action/behavior" value={action} onChange={ (e) => setAction(e.target.value.trim()) } /> 
      <Label>so that</Label> 
      <FormControl id="result" placeholder="result" value={result} onChange={ (e) => setResult(e.target.value.trim()) }/>
      <Label>Moving forward, I would like to</Label> 
      <FormControl id="change" placeholder="desired change" value={change} onChange={ (e) => setChange(e.target.value.trim()) }/>
      <Label>by</Label>
      <FormControl id="intention" as="textarea" row={4} placeholder="personal intention" value={intention} onChange={ (e) => setIntention(e.target.value.trim()) } />
    </Form>
  )
}


MadLib.propTypes = {
  question: PropTypes.shape( {
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  } ).isRequired,
  madlib: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateStoreCB: PropTypes.func.isRequired
}

