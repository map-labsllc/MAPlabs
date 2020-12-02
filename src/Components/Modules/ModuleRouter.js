import React from 'react'
import ModuleLayout from './ModuleLayout'
import { getModule } from './ModuleData'

export default function ModuleRouter(props) {
  const moduleId = +(props.match.params.moduleId ?? 1)
  const sectionId = props.match.params.sectionId

  const mod = getModule(moduleId)

  return (
    <ModuleLayout
      description= { mod.description }
      moduleId = { moduleId }
      sectionId = { sectionId }
      sections = { mod.sections }
      title = { mod.title }
    />
  )
}
