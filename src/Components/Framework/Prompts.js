import React from 'react'

/* **************************************************
   Prompts component

   Display prompts before a Narrative question, if any

   props:
     prompts -- 2D [] of short string prompts
***************************************************** */
const Prompts = (props) => {
  const { prompts } = props
  // no prompts
  if (!prompts.length) return null

  // kludge/special case: handle the mutiline prompt generated
  //   from completing the madlibs.  That prompt is a single
  //   string with mutltiple paragrahs (split with '\n\n', newlines).
  if (prompts.length === 1 && prompts[0][0].includes('\n')) {
    const removeDblNewLine = prompts[0][0].replace(/\n\n/g, '\n')
    return (
      <>
        <p><b>Prompts</b></p>
        <ul className="list-group">
          {removeDblNewLine.split('\n').map((para, key) => (
            <li className="list-group-item" key={key}>{para}</li>
          ))}
        </ul>
      </>
    )
  }

  // normal layout, one or more single para prompts to display as bulleted list
  return (
    <>
      <p><b>Prompts</b></p>
      <ul className="list-group text-left">
        {prompts.map((prompt, idx) => <li className="list-group-item" key={idx}>
          {prompt[0]}
        </li>)}
      </ul>
    </>
  )
}

export default Prompts
