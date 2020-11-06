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


    // ******************************************
    // render static version in <Popup>
    if (subComponents ) {
      // console.log('subComponents', subComponents)
      // subComponents.map((comp, idx) => {
      //   console.log(idx, comp.props)
      //   if (!comp.props.question) { console.log(idx, ' has no question')}
      // })

      return (
        <>
          {subComponents.map( ( subComponent, idx ) => (
            <div className="background text-left" key={idx}>
              <Card>
                <Card.Header>
                  <Card.Title>{subComponent.props.summaryTitle}</Card.Title>
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
