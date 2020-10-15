export const SELECTED = 'selected' 

// Influences
// Legal values for the IDX_GROUP field
//   Also used to key the data structure
export const GROUP_PERSONAL = 'personal'
export const GROUP_SOCIAL   = 'social'
export const GROUP_WIDER    = 'wider'

// indexes into the columns of the 2D data structure coming from the store
export const IDX_GROUP        = 0 // personal / social / wider
export const IDX_RELATIONSHIP = 1 // brother
export const IDX_NAME         = 2 // Steve
export const IDX_BELIEF       = 3 // Charity
export const IDX_IMPACT       = 4 // supportive / inhibiting
export const IDX_SELECTED     = 5 // 'selected' or ''

// legal values for an impact
export const IMPACT_SUPPORTIVE = 'supportive'
export const IMPACT_INHIBITING = 'inhibiting'
export const IMPACT_SUPPORTS = 'supports'
export const IMPACT_INHIBITS = 'inhibits'

export const IDX_STRENGTH = 0
export const IDX_PHRASE = 1
export const IDX_EFFECT = 2
// export const IDX_SELECTED = 3

// legal values for an effect
export const EFFECT_IMPEDIMENT = "impediment"
export const EFFECT_EMBODIMENT = "embodiment"