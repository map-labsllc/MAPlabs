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
        <div style={style.marginz}>
          <h2 className="text-center">Module {moduleNum}</h2>
          <h2 className="text-center">{moduleTitle}</h2>
          <ShowMoreLess
            lines={5}
          >
            <span dangerouslySetInnerHTML={{ __html: moduleDescription }} />
          </ShowMoreLess>
          <div style={style.spacing}>
            {children}
          </div>
        </div>
      </div>
    )
  }
}
const style = {
  background: {
    backgroundColor: "white",
    paddingRight: "6%",
    paddingLeft: "6%",
    paddingTop: "2%",
    paddingBottom: "2%",
    marginTop: "8%",
    marginRight: "10%",
    marginLeft: "10%",
    marginBottom: "4%",
    borderRadius: "15px",
    boxShadow: "5px 5px 50px 10px grey",
  },
  spacing: {
    marginTop: "5%",
  }
}


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
