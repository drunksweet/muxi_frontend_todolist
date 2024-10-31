import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function Todolist() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        { id: uuidv4(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-wikiYellow-25 py-8">
      <div className="relative max-w-sm md:max-w-md xl:max-w-xl mx-auto bg-white rounded-lg shadow-md">

        <div className="relative bg-white rounded-lg shadow-md overflow-hidden z-10">
          <header className="bg-wikiYellow-100 px-4 py-3">
            <h1
              className="bg-gradient-to-br from-red-400 to-blue-400 text-transparent bg-clip-text text-2xl md:text-3xl font-bold text-center uppercase ">
              todos
            </h1>
            <form onSubmit={addTodo} className="mt-4">
              <input
                className="w-full px-3 py-2 border rounded-md"
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
              />
            </form>
          </header>
          <main className="px-4 py-3">
            <ul>
              {filteredTodos.map((todo) => (
                <li
                  key={todo.id}
                  className="flex items-center py-2 md:py-3 border-b"
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="hidden"
                    id={`todo-${todo.id}`}
                  />
                  <label
                    htmlFor={`todo-${todo.id}`}
                    className={`h-4 md:h-5 w-4 md:w-5 border border-gray-400 rounded-md flex items-center justify-center mr-2 cursor-pointer ${todo.completed ? 'bg-amber-500' : ''}`}
                  >
                    {todo.completed && <span className="text-white">✔</span>}
                  </label>
                  <span
                    className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : ''} text-md md:text-xl pb-1`}
                  >
                  {todo.text}
                </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-xl md:text-2xl mb-1 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </main>
          <footer className="bg-wikiYellow-100 px-4 py-3 flex justify-between items-center text-sm shadow-md ">
          <span>
            {todos.filter((todo) => !todo.completed).length} items left
          </span>
            <div>
              <button
                onClick={() => setFilter('all')}
                className={`mx-1 ${filter === 'all' ? 'font-bold' : ''} hover:border-2 hover:font-bold border-amber-300 rounded-md p-1`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`mx-1 ${filter === 'active' ? 'font-bold' : ''} hover:border-2 hover:font-bold border-amber-300 rounded-md p-1`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('completed')}
                className={`mx-1 ${filter === 'completed' ? 'font-bold' : ''} hover:border-2 hover:font-bold border-amber-300 rounded-md p-1`}
              >
                Completed
              </button>
            </div>
            <button
              onClick={clearCompleted}
              className="text-gray-500 hover:text-gray-700 hover:border-2 hover:font-bold border-amber-300 rounded-md p-1"
              disabled={!todos.some((todo) => todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        </div>
        <div className="absolute w-full -bottom-6">
          <div className="absolute inset-x-1.5 bottom-0 h-4 bg-wikiYellow-250 rounded-lg shadow-md"></div>
          <div className="absolute inset-x-1 bottom-2 h-4 bg-wikiYellow-200 rounded-lg shadow-md"></div>
          <div className="absolute inset-x-0.5 bottom-4 h-4 bg-wikiYellow-150 rounded-lg shadow-md"></div>
        </div>
      </div>

    </div>
  );
}
