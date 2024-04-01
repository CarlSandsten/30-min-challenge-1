import { useState, useRef } from "react";
import styles from "./Todo.module.css";

type TodoItem = {
  id: string;
  description: string;
  completed: boolean;
};

// const initialTodos = [
//   {
//     id: String(Date.now()),
//     description: "Test Todo",
//     completed: false,
//   },
// ];

export const Todo = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const formRef = useRef<HTMLFormElement | null>(null);
  const completedTodos = todos.filter((todo) => todo.completed);
  const readyTodos = todos.filter((todo) => !todo.completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setDisabled(!e.target.value.length);
  };

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const todo = formData.get("todo") as string;
    setTodos((todos) => {
      setValue("");
      setDisabled(true);
      return [
        { id: String(Date.now()), description: todo, completed: false },
        ...todos,
      ];
    });
  };

  const handleComplete = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, completed: !todo.completed };
        else return todo;
      })
    );
  };

  const handleDelete = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <section className={styles.card} aria-label="todo-list">
      <h2 className={styles.heading}>Todo List</h2>
      <form
        ref={formRef}
        className={styles.form}
        onSubmit={handleAddTodo}
        aria-label="todo"
      >
        <input
          onChange={handleChange}
          type="text"
          name="todo"
          autoComplete="off"
          value={value}
        />
        <button
          className={styles.submitButton}
          type="submit"
          disabled={disabled}
        >
          Submit
        </button>
      </form>
      {readyTodos.length > 0 && (
        <>
          <h3 className={styles.subHeading}>Ready</h3>
          <ul data-testid="ready-list">
            {readyTodos.map((todo) => (
              <li key={todo.id} className={styles.listItem}>
                <p className={styles.text}>{todo.description}</p>
                <button
                  className={`${styles.roundButton} ${styles.doneButton}`}
                  onClick={() => handleComplete(todo.id)}
                  aria-label="done"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
      {completedTodos.length > 0 && (
        <>
          <h3 className={styles.subHeading}>Completed</h3>
          <ul data-testid="completed-list">
            {completedTodos.map((todo) => (
              <li key={todo.id} className={styles.listItem}>
                <p className={styles.text}>{todo.description}</p>
                <button
                  className={`${styles.roundButton} ${styles.moveButton}`}
                  onClick={() => handleComplete(todo.id)}
                  aria-label="move back"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                  </svg>
                </button>
                <button
                  className={`${styles.roundButton} ${styles.deleteButton}`}
                  onClick={() => handleDelete(todo.id)}
                  aria-label="remove"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 -960 960 960"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
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
