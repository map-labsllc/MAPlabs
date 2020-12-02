import { MOD_1_DESC } from './Module1Text'
import { MOD_2_DESC } from './Module2Text'
import { MOD_3_DESC } from './Module3Text'
import { MOD_4_DESC } from './Module4Text'
import { MOD_5_DESC } from './Module5Text'

import { MODULE1_SECTIONS } from './Module1'
import { MODULE2_SECTIONS } from './Module2'
import { MODULE3_SECTIONS } from './Module3'
import { MODULE4_SECTIONS } from './Module4'
import { MODULE5_SECTIONS } from './Module5'

export const MODULES = [
  {
    id: 1,
    title: 'Your Meanings and Motivations',
    description: MOD_1_DESC,
    sections: MODULE1_SECTIONS,
  },
  {
    id: 2,
    title: 'Social Context',
    description: MOD_2_DESC,
    sections: MODULE2_SECTIONS,
  },
  {
    id: 3,
    title: 'Personal Desires',
    description: MOD_3_DESC,
    sections: MODULE3_SECTIONS,
  },
  {
    id: 4,
    title: 'Personal Strengths',
    description: MOD_4_DESC,
    sections: MODULE4_SECTIONS,
  },
  {
    id: 5,
    title: 'Summary',
    description: MOD_5_DESC,
    sections: MODULE5_SECTIONS,
  }
]

export const getModule = (moduleId) => MODULES.filter(m => m.id === moduleId)[0]