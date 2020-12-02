import React from 'react'
import ModuleLayout from './ModuleLayout'
import { MODULES } from './ModuleData'

export default function ModuleRouter(props) {
  const moduleId = +(props.match.params.moduleId ?? 1)
  const sectionId = props.match.params.sectionId

  const _module = MODULES.filter(m => m.id === moduleId)[0]
  // console.log('MODULES', MODULES)
  // console.log('_module', _module)
  // console.log('_module.sections', _module.sections)

  return (
    <ModuleLayout
      description= { _module.description }
      moduleId = { moduleId }
      sectionId = { sectionId }
      sections = { _module.sections }
      title = { _module.title }
    />
  )
}
