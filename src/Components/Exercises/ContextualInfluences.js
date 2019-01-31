import React, { Component } from 'react'
import { Form,FormControl,FormGroup } from 'react-bootsterap'

export default class ContextualInfluences extends Component{
  constructor( props ){
    super( props )
    this.state= {
      influences: [],
    }
  }


  render(){
    const { name, question } = this.props
    return(
      <div className="container">
      { name }
      { question }
      <Form onSubmit={'blajsdflakshdf'}>
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
          {'<option>add data here to map over options</option>'}
          </FormControl>
          <Form.Label> Beliefs </Form.Label>
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
