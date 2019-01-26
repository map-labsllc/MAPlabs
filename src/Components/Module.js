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
       moduleDescription -- could be many lines, is we need paragraphs then will need to set innerHTML
       children -- the Section components to display
  ***************************************************** */
  export default class Module extends React.Component {

    render() {
      console.log("Module::render()")

      let { moduleNum, moduleTitle, moduleDescription, children } = this.props

      return (
        <>
          <h3>Module: {moduleNum} - {moduleTitle}</h3>
          <p><i>Module Description: {moduleDescription}</i></p>
          {children}
          <p> </p>
        </>
      )
    }
  }

  // <Section moduleNum = {moduleNum} sectionNum = "1" sectionTitle = "Section One" />
