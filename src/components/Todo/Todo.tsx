import { useState, useRef } from "react";
import styles from "./Todo.module.css";

type TodoItem = {
  id: string;
  description: string;
  completed: boolean;
};

const initialTodos = [
  {
    id: "1",
    description: "Feed the dog",
    completed: false,
  },
];

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>(initialTodos);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const completedTodos = todos.filter((todo) => todo.completed);
  const readyTodos = todos.filter((todo) => !todo.completed);

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const todo = formData.get("todo") as string;
    setTodos((todos) => {
      return [
        { id: String(Date.now()), description: todo, completed: false },
        ...todos,
      ];
    });
    inputRef.current!.value = "";
  };

  // Toggles the complete state in a todo.
  const handleComplete = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        else return todo;
      })
    );
  };

  // Removes a todo from the todos list.
  const handleDelete = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className={styles.card}>
      <h2 className={styles.heading}>Todo List</h2>
      <form className={styles.form} onSubmit={handleAddTodo}>
        <input ref={inputRef} type="text" name="todo" />
        <button type="submit">Submit</button>
      </form>
      {/* {todos.length > 0 && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <p>{todo.description}</p>
              <button onClick={() => handleComplete(todo.id)}>Done</button>
              <button onClick={() => handleDelete(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )} */}
      {/* Ready */}
      {readyTodos.length > 0 && (
        <>
          <h3 className={styles.subHeading}>Ready</h3>
          <ul>
            {readyTodos.map((todo) => (
              <li key={todo.id}>
                <p>{todo.description}</p>
                <button onClick={() => handleComplete(todo.id)}>Done</button>
                <button onClick={() => handleDelete(todo.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}
      {/* Completed */}
      {completedTodos.length > 0 && (
        <>
          <h3 className={styles.subHeading}>Completed</h3>
          <ul>
            {completedTodos.map((todo) => (
              <li key={todo.id}>
                <p>{todo.description}</p>
                <button onClick={() => handleComplete(todo.id)}>
                  Move Back
                </button>
                <button onClick={() => handleDelete(todo.id)}>Remove</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
