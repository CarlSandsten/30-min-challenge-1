import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Todo } from "./Todo";

test("loads and displays the Todo List component", () => {
  render(<Todo />);
  const headingElement = screen.getByText(/Todo List/i);
  expect(headingElement).toBeInTheDocument();
});

test("User can add a todo", () => {});
