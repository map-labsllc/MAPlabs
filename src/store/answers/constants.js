
export const ANSWERS_LOADING  = "ANSWERS_LOADING"
export const ANSWERS_LOAD     = "ANSWERS_LOAD"
export const ANSWERS_ERROR_DB = "ANSWERS_ERROR_DB"
export const ANSWERS_UPDATE   = "ANSWERS_UPDATE"
export const ANSWERS_PERSIST  = "ANSWERS_PERSIST"

// These are saved back to db in answers::question_type
// to allow ad hoc queries for specific types of questions 
export const QUESTION_TYPE_NARRATIVE       = 1
export const QUESTION_TYPE_SHORT_ANSWERS   = 2
export const QUESTION_TYPE_TRANSITIONS     = 3
export const QUESTION_TYPE_LIFEDESCRIPTORS = 4
export const QUESTION_TYPE_BRACKET         = 5
export const QUESTION_TYPE_INFLUENCES      = 6
export const QUESTION_TYPE_STRENGTH        = 7
export const QUESTION_TYPE_STRENGTH_EM_IM  = 8
