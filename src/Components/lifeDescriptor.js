import React from 'react'
import { ListGroupItem, ButtonGroup, Button } from 'react-bootstrap'

 const lifeDescriptorQuestion = ({data}) => {



   const handleClick = (event) => {
    if(event.variant === '') event.ref.variant = 'success'
    return false
  }
  const renderButton = (children) => {
    return (
      <ButtonGroup>
        <Button variant='' onClick={handleClick()}>{children.a}</Button>
        <Button variant = ''>{children.b}</Button>
      </ButtonGroup>
    )
  }



  let structured = data.descr.split('#')
  let first = structured[0]
  let second = structured[1]



  return (

    <ListGroupItem>{ first } { renderButton(data) } { second }</ListGroupItem>


  )
}

export default lifeDescriptorQuestion
