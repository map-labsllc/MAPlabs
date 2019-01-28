import React from 'react'
import { Navbar } from 'react-bootstrap'

const Footer = () => {
  return (
    <Navbar style={style.navStyle}>
      <Navbar.Header>
        <Navbar.Brand>
          M.A.P.Labs
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Text pullRight>&copy; 2019</Navbar.Text>
    </Navbar>
  )
}
const style = {
  navStyle: {
    marginBottom: "0px",

  }
}
export default Footer