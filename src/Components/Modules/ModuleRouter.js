import React from 'react'
import Module1 from './Module1'
import Module2 from './Module2'
import Module3 from './Module3'
import Module4 from './Module4'
import Module5 from './Module5'

const ModuleRouter = (props) => {
  const moduleList = {
    1: Module1,
    2: Module2,
    3: Module3,
    4: Module4,
    5: Module5,
  }

  const Module = moduleList[props.match.params.moduleId || 1]

  return <Module moduleId={props.match.params.moduleId} sectionId={props.match.params.sectionId} />
}

export default ModuleRouter