import React from 'react';
import Section from '../Components/Section'
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
     children -- the Section components to display
***************************************************** */
export default class Module extends React.Component {

  render() {
    console.log("Module::render()")

    let { moduleNum, moduleTitle, children } = this.props

    return (
      <>
        <h3>Module: {moduleNum} - {moduleTitle}</h3>
        {children}
        <p> </p>
      </>
    )
  }
}

// <Section moduleNum = {moduleNum} sectionNum = "1" sectionTitle = "Section One" />
