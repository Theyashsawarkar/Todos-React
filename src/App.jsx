import { useEffect, useState } from "react";
import {TodoProvider} from './Contexts'
import TodoForm from './Components/TodoForm'
import TodoItem from "./Components/TodoItem";

const App = () => {

  const [todos , setTodos] = useState([]);

  function addTodo(todo) {
    console.log(todo)
    setTodos((prevTodos) => [{ ...todo} , ...prevTodos]) ;
  }

  function deleteTodo(id) {
    setTodos((prevTodos) => (
      prevTodos.filter((todo) => todo.id !== id)
    ))
  }

  function updateTodo(id , todo) {
    setTodos((prevTodos) => (
      prevTodos.map((prevTodo) => (
        prevTodo.id === id ? todo : prevTodo
      ))
    ))
  }

  function toggleComplete(id) {
    setTodos((prevTodos) => (
      prevTodos.map((prevTodo) => (
        prevTodo.id === id ? {...prevTodo , completed : !( prevTodo.completed ) } : prevTodo
      ))
    ))
  }

  // after every reload get the values from local storage
  useEffect(() => {
    const tempTodos = JSON.parse(window.localStorage.getItem('todos')) 

    if(tempTodos && tempTodos.length > 0)
    setTodos(tempTodos) 
  },[])

  // after every updation in todos save the todos in local storage
  useEffect(() =>(
    window.localStorage.setItem('todos', JSON.stringify(todos))
  ),[todos])

  return (
    <TodoProvider 
      value={
        {addTodo , updateTodo ,deleteTodo , toggleComplete }
      }
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */} 
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div 
                  key={todo.id}
                  className="w-full"
                >
                  <TodoItem  todo={todo}/>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App ;
