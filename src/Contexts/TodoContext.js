/* eslint-disable no-unused-vars */

import { createContext , useContext } from "react";

const TodoContext = createContext({
  Todos: [
  {
  id : 1,
  todo: "something to do",
  completed : false
  }
  ] ,
  addTodo : (todo) => {},
  updateTodo : (id , todo) => {},
  deleteTodo : (id) => {} ,
  toggleComplete : (id) => {}
})

const useTodo = () => {
  return useContext(TodoContext) ;
}

const TodoProvider = TodoContext.Provider ;

export {
  TodoContext , useTodo , TodoProvider
}
