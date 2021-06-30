export enum UsersActionTypes {
  SET = 'USERS_SET',
  SET_LOADING = 'USERS_SET_LOADING',
}

export enum FilterActionTypes {
  RESET = 'FILTER_RESET',
  SET = 'FILTER_SET',
  TOGGLE = 'FILTER_TOGGLE',
}

export enum TodosActionTypes {
  SET = 'TODOS_SET',
  SET_USER = 'TODOS_SET_USER',
  OPEN = 'TODOS_OPEN',
  CLOSE = 'TODOS_CLOSE',
  SET_LOADING = 'TODOS_SET_LOADING',
  ADD_TODO = 'TODOS_ADD_TODO',
  EDIT_TODO = 'TODOS_EDIT_TODO',
}

export enum AuthActionTypes {
  LOGIN = 'AUTH_LOGIN',
}

export enum TodosStatuses {
  ALL = 0,
  DONE = 1,
  DOING = 2,
}

export const TodosLabels = ['Все', 'Завершено', 'В работе']