import axios from 'axios'
import { createState, useState } from '@hookstate/core';

const initialTodosState = {
  active: false,
  userId: -1,
  name: '',
}

const globalState = createState({
  todos: initialTodosState,
});

export const useGlobalState = () => useState(globalState)

export const request = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  withCredentials: true,
})
