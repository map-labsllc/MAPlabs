import React from 'react'
import { Card } from 'react-bootstrap'
import { PropTypes } from 'prop-types'
import SectionNav from '../../Modules/SectionNav'
import {
    EXERCISE_510,
    EXERCISE_565,
    EXERCISE_511,
    EXERCISE_512,
    EXERCISE_520,
    EXERCISE_521,
    EXERCISE_522,
    EXERCISE_523,
    EXERCISE_524,
    EXERCISE_530,
    EXERCISE_531,
    EXERCISE_540,
    EXERCISE_550,
    EXERCISE_551,
    EXERCISE_552,
    EXERCISE_560,
} from '../../Modules/Module5'

const Mappers = ({ moduleId, sectionId }) => {
  const navIds = {moduleId, sectionId}

  return (
    <div>
      <SectionNav {...navIds} 
        subSections= {[
          { 
            id: 565,
            title: `In order to reach my future desired situation`,
            exercise: EXERCISE_565
          },
        ]}
      />

      <h4>HOW I'LL DO IT</h4>
      <h5>Goals - I will need to change my beavior</h5>
      <SectionNav {...navIds} 
        subSections= {[
          { 
            id: 560,
            title: `Breaking and Building`,
            exercise: EXERCISE_560
          },
        ]}
      />

      <h5>Commitments</h5>
      <SectionNav {...navIds} 
        subSections= {[
          { 
            id: 550,
            title: `I will need personal growth`,
            exercise: EXERCISE_550
          },
          { 
            id: 551,
            title: `I will need supporting relationships`,
            exercise: EXERCISE_551
          },
          { 
            id: 552,
            title: `I will need engagement mastery`,
            exercise: EXERCISE_552
          },
        ]}
      />

      <SectionNav {...navIds} 
        subSections= {[
          { 
            id: 540,
            title: `My "who" and "what" come together in my life purpose`,
            exercise: EXERCISE_540
          },
        ]}
      />

      <h4>WHAT I CARE ABOUT</h4>
      <SectionNav {...navIds} 
        subSections= {[
          { 
            id: 531,
            title: `These are my thoughts on "what" I care about`,
            exercise: EXERCISE_531
          },
        ]}
      />
      <h5>Focus Beyond Self</h5>
      <SectionNav {...navIds} 
        sectionId={sectionId}
        moduleId={moduleId}
        subSections= {[
          { 
            id: 531,
            title: `These are my thoughts on "what" I care about`,
            exercise: EXERCISE_531
          },
          { 
            id: 530,
            title: `I want to focus on something beyond myself`,
            exercise: EXERCISE_530
          },
          { 
            id: 512,
            title: `I become a purpose-seeking person "who"`,
            exercise: EXERCISE_512
          },
        ]}
      />

      <h4>WHO AM I</h4>
      <h5>My Meaning</h5>
      <SectionNav {...navIds} 
        sectionId={sectionId}
        moduleId={moduleId}
        subSections= {[
          { 
            id: 520,
            title: `By grounding myself in meaning`,
            exercise: EXERCISE_520
          },
          { 
            id: 522,
            title: `By using my top strengths`,
            exercise: EXERCISE_522
          },
          { 
            id: 521,
            title: `By living out my deepest desires`,
            exercise: EXERCISE_521
          },
        ]}
      />

      <SectionNav {...navIds} 
        subSections= {[
          {
            id: 511,
            title: `I need to acknowledge these important themes`,
            exercise: EXERCISE_511
          },
          {
            id: 510,
            title: `In order to improve my current situation`,
            exercise: EXERCISE_510
          }
        ]}
      />
    </div>
  )
}

export default Mappers

Mappers.propTypes = {
  moduleId: PropTypes.number.isRequired,
  sectionId: PropTypes.number.isRequired,
}