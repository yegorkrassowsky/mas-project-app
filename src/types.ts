import {IUser, IState, IActive, ITodo, IUserSet, ILoading, IName, ICredentials, ILoggedIn, IPost, ITodoForm} from './interfaces'
import {UsersActionTypes, FilterActionTypes, TodosActionTypes, AuthActionTypes} from './constants'
import {ThunkDispatch} from 'redux-thunk'

export type UsersState = {
  items: IUser[]
} & ILoading

export type FilterParams = IName & IPost

export type FilterState = {
  params: FilterParams
} & IActive

export type TodosState = {
  items: ITodo[]
  userId: string | null
} & IName & IActive & ILoading

export type AuthState = {} & ILoggedIn

export type FilterUsersType = (users: IUser[], params: FilterParams) => IUser[]

// Action Types

export type UsersAction =
| {type: UsersActionTypes.SET, data: IUser[]}
| {type: UsersActionTypes.SET_LOADING, loading: boolean}

export type FilterAction =
| {type: FilterActionTypes.RESET}
| {type: FilterActionTypes.TOGGLE}
| {type: FilterActionTypes.SET, data: FilterParams}

export type TodosAction =
| {type: TodosActionTypes.SET, data: ITodo[]}
| {type: TodosActionTypes.SET_USER, user: IUserSet}
| {type: TodosActionTypes.OPEN}
| {type: TodosActionTypes.CLOSE}
| {type: TodosActionTypes.SET_LOADING, loading: boolean}
| {type: TodosActionTypes.ADD_TODO, data: ITodo}
| {type: TodosActionTypes.EDIT_TODO, data: ITodo}

export type AuthAction =
| {type: AuthActionTypes.LOGIN}

export type ActionType = UsersAction | FilterAction | TodosAction | AuthAction

// Dispatched to props

export type SetFilterType = (params: FilterParams) => void
export type ResetFilterType = () => void
export type ToggleFilterType = () => void
export type OpenTodosType = (user: IUserSet) => void
export type CloseTodosType = () => void

// Thunks

export type ThunkDispatchType = ThunkDispatch<IState, void, ActionType>
export type GetStateType = () => IState
export type DispatchCallbackType = (dispatch: ThunkDispatchType, getState: GetStateType) => void
export type FetchTodosActionType = (userId: string) => DispatchCallbackType
export type FetchUsersActionType = () => DispatchCallbackType
export type OpenTodosActionType = (user: IUserSet) => DispatchCallbackType
export type LoginActionType = (credentials: ICredentials) => DispatchCallbackType
export type SaveTodoActionType = (todo: ITodoForm) => DispatchCallbackType
// Actions

export type SetLoadingActionType = (loading: boolean) => ActionType
export type SetFilterActionType = (params: FilterParams) => FilterAction
export type CloseTodosActionType = () => TodosAction
export type SetUsersLoadingActionType = (loading: boolean) => UsersAction

// Callbacks

export type HandleDescriptionType = (event: React.ChangeEvent<HTMLInputElement>) => void
export type HandleStatusType = (event: React.ChangeEvent<HTMLInputElement>) => void
export type HandlePriorityType = (event: React.ChangeEvent<{ value: unknown }>) => void
export type OpenEditTodoType = (todo: ITodoForm) => void
export type HandleSaveTodoType = () => void
export type SaveTodoType = (todo: ITodoForm) => void
