import {FilterState, FilterAction} from '../types'
import {FilterActionTypes} from '../constants'

export const initialFilterState = {
  active: false,
  params: {
    name: '',
    post: '',
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
          name: action.data.name.trim(),
          post: action.data.post.trim()
        }
      }
    case FilterActionTypes.TOGGLE:
      return {...state, active: !state.active}
    default:
      return state
  }
}

export default filterReducer