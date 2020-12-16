import React from 'react'

/* **************************************************
   MultiLineString component

   Output string with embeded '/n' as seperate <p>'s

   props:
     str
***************************************************** */
const MultiLineString = (props) => {
  const {
    str
  } = props

  return (
    <>
      {str.split('\n').map((para, key) => (
        <p key={key} className="text-left">{para}</p>
      ))}
    </>
  )
}
export default MultiLineString
