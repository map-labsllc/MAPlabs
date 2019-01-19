import React from 'react'
import { connect } from 'react-redux'
import { ListGroupItem,ButtonGroup, Button,ListGroup } from 'react-bootstrap'

 const lifeDescriptorQuestion = () => {

  const children = {
    "order": 38,
    "descr": "I # feel positively challenged in my life",
    "a": "do",
    "b": "do not"
  }
  const renderButton = (children) => {
    return (
      <ButtonGroup>
        <Button>{children.a}</Button>
        <Button>{children.b}</Button>
      </ButtonGroup>
    )
  }



  let structured = children.descr.split('#')
  let first = structured[0]
  let second = structured[1]



  return (
    <ListGroup>
    <ListGroupItem>{first} { renderButton(children)}{second}</ListGroupItem>
      <ListGroupItem>{first} { renderButton(children)}{second}</ListGroupItem>  <ListGroupItem>{first} { renderButton(children)}{second}</ListGroupItem>  <ListGroupItem>{first} { renderButton(children)}{second}</ListGroupItem>  <ListGroupItem>{first} { renderButton(children)}{second}</ListGroupItem>  <ListGroupItem>{first} { renderButton(children)} {second} </ListGroupItem>
      </ListGroup>
  )
}

export default lifeDescriptorQuestion
