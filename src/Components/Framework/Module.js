import React from 'react';
import Section from './Section'
import ShowMoreLess from '../Utils/ShowMoreLess'
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
      <div style={style.background}>
        <div style={style.top} >
          <h2 className="text-center">{moduleTitle}</h2>
          {/*<p style={style.descript}>{moduleDescription}</p>*/}
          <div style={style.descript}>
            <ShowMoreLess
              lines={5}
            >
              <span dangerouslySetInnerHTML={ { __html: moduleDescription } } />
            </ShowMoreLess>
          </div>

        </div>
        <div className="centering container-fluid" style={style.textContain}>
          {children}
        </div>
      </div>
    )


        // return (
        //   <>
        //     <Col lg={3} md={2}></Col>
        //     <Col lg={6} md={8} sm={12}></Col>
        //     <div className="text-center">
        //       <p>...... spacer ......</p>
        //       <p>...... spacer ......</p>
        //       <h3>{moduleTitle}</h3>
        //       <p>...... spacer ......</p>
        //       <p>...... spacer ......</p>
        //       <ShowMoreLess
        //         lines={5}
        //       >
        //         <span dangerouslySetInnerHTML={ { __html: moduleDescription } } />
        //       </ShowMoreLess>
        //       <p>...... spacer ......</p>
        //     </div>
        //     <div className="centering">
        //       {children}
        //     </div>
        //     <Col lg={3} md={2}></Col>
        //   </>
        // )
    // return (
    //   <>
    //     <div style={style.top} >
    //       <h2 className="text-center">{moduleTitle}</h2>
    //       <p style={style.descript}>{moduleDescription}</p>
    //     </div>
    //     <div className="centering">
    //       {children}
    //     </div>
    //   </>
    // )
    // {moduleDescription}
  }
}

const style = {
  descript: {
    marginLeft: "25%",
    marginRight: "25%",
    fontSize: "12pt",
  },
  top: {
    marginTop: "5%",
    //width: "80%",
    //marginLeft: "auto",
    //marginRight: "auto",
  },
  background: {
    backgroundColor: "#AEC6EF",
    paddingTop: "1em",
  },
  textContain: {
    backgroundColor: "white"
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
