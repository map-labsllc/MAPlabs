import React from 'react';
import Section from './Section'
import {
  Button,
  Checkbox,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
} from 'react-bootstrap';

/* **************************************************
   Module

   Shows a module

   props:
     moduleNum -- integer, the module number
     moduleTitle -- title of the Module
     moduleDescription -- could be many lines, is we need paragraphs then will need to set innerHTML
     children -- the Section components to display
***************************************************** */
export default class Module extends React.Component {

  render() {
    console.log("Module::render()")

    let { moduleNum, moduleTitle, moduleDescription, children } = this.props

    return (
      <>
        <Col lg={3} md={2}></Col>
        <Col lg={6} md={8} sm={12}></Col>
        <div className="text-center">
          <h3>{moduleTitle}</h3>
          <p>{moduleDescription}</p>
        </div>
        <div className="centering">
          {children}
        </div>
        <Col lg={3} md={2}></Col>
      </>
    )
  }
}





////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////


// <Section moduleNum = {moduleNum} sectionNum = "1" sectionTitle = "Section One" />
{/* <>
        <h3>Module: {moduleNum} - {moduleTitle}</h3>
        <p><i>Module Description: {moduleDescription}</i></p>
        {children}
        <p> </p>
      </> */}