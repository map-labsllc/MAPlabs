import React from 'react'
import { Jumbotron } from 'react-bootstrap'

const StartPage = () => {
  return (
    <div >
      <Jumbotron style={style.background}>
        <h2>Thank you for signing up for MAPMaker</h2>
        <h5>This is a cool website for cool people</h5>
        <p></p>
      </Jumbotron>
    </div >
  )
}
const style = {
  background: {
    backgroundImage: "url('https://bongiornocc.com/wp-content/uploads/2014/08/100_0782.jpg')",
  },
  text: {
    margin: "5em"
  }
}
export default StartPage
