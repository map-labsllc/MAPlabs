import React from 'react'
import { Card } from 'react-bootstrap'
import SectionExerciseCT from './SectionExerciseCT'
import SectionId from '../Utils/SectionId'

/* **************************************************
   Section

   Shows / hides a section depending on user's curr_module / curr_section

   props:
     user -- the complete user object to check the furthest mod/sec they've gotten to
     isVisible -- is the user able to view this section yet?
     moduleNum -- integer, the module this section is in (1-based)
     sectionNum -- integer, the section, ex: 260
     number -- the order number of this section in the module: 1, 2, 3, ...
     sectionTitle -- title of the section
     exercise -- component user will interact with
***************************************************** */
export default class Section extends React.Component {
  render() {
    const {
      number, isVisible, moduleNum, sectionNum, sectionTitle, section_ids, exercise, showEdit
    } = this.props

    return (
      <div className="background">
        <Card>
          <Card.Header>
            <Card.Title>
              <div className="text-center">
                <h2>
                  <SectionId sectionId={number}/> {sectionTitle}
                </h2>
              </div>
            </Card.Title>
          </Card.Header>

          {isVisible && (
            <Card.Body >
              <div className="container-fluid contain">
                <SectionExerciseCT moduleNum={moduleNum} sectionNum={sectionNum} sectionTitle={sectionTitle} exercise={exercise} section_ids={section_ids} />
              </div>
            </Card.Body>
          )}

          {!isVisible && (
            <p>Please complete the the previous exercise.</p>
          )}
        </Card>
      </div>
    )
  }
}
