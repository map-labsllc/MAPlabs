import React from 'react'
import { Card } from 'react-bootstrap'

/* **************************************************
   Summary component

   props:
     subComponents -- array of React components to work with a single question

***************************************************** */
export default class Summary extends React.Component {

  // ******************************************
  render() {
    // console.log( "ShortAnswers::render()" )

    const { subComponents } = this.props

    if (subComponents ) {
      return (
        <>
          {subComponents.map( ( subComponent, idx ) => (
            <div className="background text-left" key={idx}>
              <Card>
                <Card.Header>
                  <Card.Title><h4>{subComponent.props.summaryTitle}</h4></Card.Title>
                </Card.Header>
                <Card.Body>
                  <div className="container-fluid contain"> 
                    {subComponent}
                  </div>
                </Card.Body>  
              </Card>
            </div>
          ) )}
        </>
      )
    }
  }
}
