import {FilterState, FilterAction} from '../types'
import {FilterActionTypes} from '../constants'

export const initialFilterState = {
  active: false,
  params: {
    username: '',
    website: '',
  }
}

const filterReducer = (state: FilterState = initialFilterState, action: FilterAction): FilterState => {
  switch(action.type) {
    case FilterActionTypes.RESET:
      return {...state, params: initialFilterState.params}
    case FilterActionTypes.SET:
      return {
        ...state, 
        params: {
          username: action.data.username.trim(),
          website: action.data.website.trim()
        }
      }
    case FilterActionTypes.TOGGLE:
      return {...state, active: !state.active}
    default:
      return state
  }
}

export default filterReducer