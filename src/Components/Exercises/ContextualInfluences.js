import React, { Component } from 'react'
import { Form,FormControl,FormGroup, Label } from 'react-bootstrap'
// import Beliefs from './valuesAndBeliefs'

export default class ContextualInfluences extends Component{
  constructor( props ){
    super( props )
    this.state= {
      influences: [],
    }
  }


  render(){
    const { group, beliefs} = this.props
    console.log( 'beliefs: ', beliefs )


    return(
      <div className="container">
      { group ? group.name : "" }
      { group ? group.text : "" }
      <Form >

          <Label>Name</Label>
          <input
            type="text"
            placeholder="Jane Doe"
          />
          <Label> Influence Name </Label>
          <select
            placeholder="happy"
          >
          {
            beliefs.map( item =>(
              <option value={ item}>{item}</option>
             ) )
          }
          </select>
          <Label> "Beliefs" </Label>
            <select as ='select'>
              <option value="Supportive">"Supportive"</option>
              <option value="Inhibiting">"Inhibiting"</option>
            </select>

      </Form>
      </div>
    )

  }
}
