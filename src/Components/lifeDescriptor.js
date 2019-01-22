import React from 'react'
import { ListGroupItem, ButtonGroup, Button, } from 'react-bootstrap'

 const lifeDescriptorQuestion = ({data}) => {
console.log('ASDFGHJKLQWERTYUIOP', data)
  //
  // let  variant = ''
  //  const handleClick = () => {
  //   if(variant === '') variant = 'success'
  //   else{variant = ''}
  // }
  const renderButton = (children) => {
    return (
      <ButtonGroup>
        <Button variant="outline-success" >{children.a}</Button>
        <Button >{children.b}</Button>
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
