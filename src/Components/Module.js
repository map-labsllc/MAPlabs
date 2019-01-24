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
***************************************************** */
export default class Module extends React.Component {

  render() {
    console.log("Module::render()")

    let { moduleNum, moduleTitle } = this.props

    return (
      <>
        <h1>Module: {moduleNum} - {moduleTitle}</h1>
        <Section moduleNum = {moduleNum} sectionNum = "1" sectionTitle = "Section One" />
        <p> </p>
      </>
    )
  }
}
