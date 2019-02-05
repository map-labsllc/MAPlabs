import React from 'react'
import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap'

/* **************************************************
   Prompts component

   Display prompts before a Narrative question, if any

   props:
     prompts -- [] or array a short string prompts
***************************************************** */
const Prompts = (props) => {
  const { prompts } = props
  if ( !prompts.length ) return null
  return (
    <>
      <p><b>Prompts</b></p>
      <ul>
      {prompts.map( ( prompt, idx ) =>
        <li key={idx}>{prompt}</li>
      )}
      </ul>
    </>
  )
}

export default Prompts
