import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormControl,
  FormLabel
} from 'react-bootstrap'
import { MadLibHtml } from './MadLibHtml'

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
  const { madlib, isDynamic, isSupportive } = props

  const [name, setName] = useState(madlib.name);
  const [belief, setBelief] = useState(madlib.belief);
  const [impact, setImpact] = useState(madlib.impact);
  const [change, setChange] = useState(madlib.change);

  /* **********************************************
    onChange()

    e - target.id is a key into the influence object:  'relationship', 'name', 'belief', or 'impact'
  ************************************************ */
  const onChange = async (e) => {
    console.log('MadLib::onChange()')
    e.preventDefault()

    // get data from state variables
    const data = {
      name,
      belief,
      impact,
      change,
    }

    const { id, onUpdateStoreCB } = props
    // console.log("onUpdateStoreCB with data=", id, data)

    await onUpdateStoreCB(id, data)
  }

  // **********************************************
  // render!
  // console.log("InfluenceTop5::render(): ", props.influence)

  // static
  if (!isDynamic) {
    return MadLibHtml(madlib, isSupportive)
  }

  // dynamic render
  return (
    <Form className="text-left" onChange={onChange}>
      <Label className="madlib-label" style={style.label}>My influence, </Label>
      <FormControl disabled={true} id="name" placeholder="name" defaultValue={name} onKeyUp={ (e) => setName(e.target.value) }/>

      <Label className="madlib-label"style={style.label}>, has{isSupportive ? ' supported ' : ' inhibited '}my sense of</Label>
      <FormControl disabled={true} id="belief" placeholder="belief" defaultValue={belief} onKeyUp={ (e) => setBelief(e.target.value) }/>

      <Label className="madlib-label" style={style.label}>. The effect of this influence is that</Label>
      <FormControl id="impact" placeholder="impact on my life" defaultValue={impact} onKeyUp={ (e) => setImpact(e.target.value) }/>

      <Label className="madlib-label" style={style.label}>. In order to keep growing, I would like to</Label>
      <FormControl id="change" placeholder="desired change" defaultValue={change} onKeyUp={ (e) => { setChange(e.target.value); } }/>

    </Form>
  )
}

const style = {
  label: { color: 'rgb(41, 41, 41)' }
}

MadLib.propTypes = {
  question: PropTypes.shape({
    code: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  madlib: PropTypes.object.isRequired,
  isDynamic: PropTypes.bool,
  onUpdateStoreCB: PropTypes.func.isRequired,
  isSupportive: PropTypes.bool,
}
