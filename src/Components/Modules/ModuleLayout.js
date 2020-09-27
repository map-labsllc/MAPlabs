import React from 'react'

import ModuleCT from '../Framework/ModuleCT'
import SectionCT from '../Framework/SectionCT'

import ModuleNav from './ModuleNav'
import ModuleIntro from './ModuleIntro'
import { Alert } from 'react-bootstrap'

const ModuleWrapper = ( {moduleId, title, description, sectionId, sections} ) => {

  // find current section
  const section = sectionId ? 
    sections.filter(sec => sec.id === +(sectionId))[0] : null;

    console.log("section", sectionId, section)
  // determine first section link
  const firstSectionHref = `/modules/${moduleId}/section/${sections[0].id}`
  
  // dislay overview, intro or section
  const displaySection = (sectionId = 'overview', section) => {
    switch (sectionId) {
      case 'overview':
        return (<ModuleNav title={'Exercises'} sections={sections} moduleId={moduleId} />)

      case 'intro':
        return (<ModuleIntro description={description} firstSectionHref={firstSectionHref}/>)

      default:
        return (sectionId && section ?
          <SectionCT
            moduleNum = { moduleId }
            sectionNum = { sectionId }
            number = { section.id }
            sectionTitle = { section.title }
            exercise = { section.exercise }
            section = { section }
          />
          : 
          <Alert variant="warning">
            Unknown exercise.
          </Alert>
        )
    }
  }

  return (
    <ModuleCT
      moduleNum = { moduleId }
      moduleTitle = { title }  
    >
      {displaySection(sectionId, section)}
    </ModuleCT>
  )
}

export default ModuleWrapper