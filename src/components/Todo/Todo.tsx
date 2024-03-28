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

// todo: one with not fprm and ref
// another with form no ref
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
        <button className={styles.submitButton} type="submit">
          Submit
        </button>
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
              <li key={todo.id} className={styles.listItem}>
                <p className={styles.text}>{todo.description}</p>
                <button
                  className={`${styles.roundButton} ${styles.doneButton}`}
                  onClick={() => handleComplete(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </button>
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
              <li key={todo.id} className={styles.listItem}>
                <p className={styles.text}>{todo.description}</p>
                <button
                  className={`${styles.roundButton} ${styles.moveButton}`}
                  onClick={() => handleComplete(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                  </svg>
                </button>
                <button
                  className={`${styles.roundButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
};
