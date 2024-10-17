// src/components/Todo.tsx
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Todo.scss';

interface TodoItem {
  id: string;
  task: string;
  completed: boolean;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() === '') return; // Prevent empty tasks
    const newTodo: TodoItem = { id: uuidv4(), task: newTask, completed: false };
    setTodos([...todos, newTodo]);
    setNewTask('');
  };

  const handleToggleComplete = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.task}
            <button onClick={() => handleToggleComplete(todo.id)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
