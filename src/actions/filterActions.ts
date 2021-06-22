import { FilterActionTypes } from "../constants";
import { FilterAction, SetFilterActionType } from "../types";

export const setFilterAction: SetFilterActionType = (params) => ({type: FilterActionTypes.SET, data: params})
export const resetFilterAction = (): FilterAction => ({type: FilterActionTypes.RESET})
export const toggleFilterAction = (): FilterAction => ({type: FilterActionTypes.TOGGLE})