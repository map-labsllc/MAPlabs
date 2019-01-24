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

    console.log('-----------------------------------------');
    console.log("children", children);
    console.log('-----------------------------------------');

    return (
      <>
        <h1>Module: {moduleNum} - {moduleTitle}</h1>
        {children}
        <p> </p>
      </>
    )
  }
}

// <Section moduleNum = {moduleNum} sectionNum = "1" sectionTitle = "Section One" />
