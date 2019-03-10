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
     prompts -- 2D [] of short string prompts
***************************************************** */
const Prompts = (props) => {
  const { prompts } = props
  // debugger
  // no prompts
  if ( !prompts.length ) return null

  // kludge/special case: handle the mutiline prompt generated 
  //   from completing the madlibs.  That prompt is a single 
  //   string with mutltiple paragrahs (split with '\n\n', newlines).
  if (prompts.length === 1 && prompts[0][0].includes('\n')) {
    const removeDblNewLine = prompts[0][0].replace(/\n\n/g, '\n')
    return (
      <>
        <p><b>Prompts</b></p>
        <ul>
          {removeDblNewLine.split('\n').map(function(para, key) {
            return (
              <li key={key}>{para}</li>
            )
          })}  
        </ul>  
      </>
    )
  }

  // normal layout, one or more single para prompts to display as bulleted list
  return (
    <>
      <p><b>Prompts</b></p>
      <ul>
      {prompts.map( ( prompt, idx ) =>
        <li key={idx}>
          {prompt[0]}
        </li>
      )}
      </ul>
    </>
  )
}

export default Prompts
