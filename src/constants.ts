export enum UsersActionTypes {
  SET = 'USERS_SET',
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
}

export enum TodosStatuses {
  ALL = 0,
  DONE = 1,
  DOING = 2,
}

export const TodosLabels = ['Все', 'Завершено', 'В работе']