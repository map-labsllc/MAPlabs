import React, { Component } from 'react'
import { Form,FormControl,FormGroup } from 'react-bootstrap'
import Beliefs from './valuesAndBeliefs'

export default class ContextualInfluences extends Component{
  constructor( props ){
    super( props )
    this.state= {
      influences: [],
    }
  }


  render(){
    const { group } = this.props

    return(
      <div className="container">
      { group ? group.name : "" }
      { group ? group.text : "" }
      <Form >
        <FormGroup>
          <Form.Label>Name</Form.Label>
          <FormControl
            type="text"
            placeholder="Jane Doe"
          />
          <Form.Label> Influence Name </Form.Label>
          <FormControl
            as="select"
            placeholder="happy"
          >
          {
            Beliefs.map( item =>(
              <option value={ item}>{item}</option>
             ) )
          }
          </FormControl>
          <Form.Label> "Beliefs" </Form.Label>
            <FormControl as ='select'>
              <option value="Supportive">"Supportive"</option>
              <option value="Inhibiting">"Inhibiting"</option>
            </FormControl>
        </FormGroup>
      </Form>
      </div>
    )

  }
}
