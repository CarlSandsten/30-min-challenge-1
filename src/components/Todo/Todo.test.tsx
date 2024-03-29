import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Todo } from "./Todo";

test("loads and displays the Todo List component.", () => {
  render(<Todo />);
  const todoComponent = screen.getByTestId("todo-list");
  expect(todoComponent).toBeInTheDocument();
});

test("loads and render an input field.", () => {
  render(<Todo />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("loads and render a submit button.", () => {
  render(<Todo />);
  const button = screen.getByTestId("submit");
  expect(button).toBeInTheDocument();
});

test("submit button shall be disabled if no value in input.", () => {
  render(<Todo />);
  const button = screen.getByTestId("submit");
  expect(button).toBeDisabled();
});

test("submit button shall be enabled if there is input value.", () => {
  render(<Todo />);
  const input = screen.getByRole("textbox");
  const button = screen.getByTestId("submit");
  userEvent.type(input, "test");

  expect(button).toBeEnabled();
});

test("submit button should be disabled after being cleared of input.", () => {
  render(<Todo />);
  const input = screen.getByRole("textbox");
  const button = screen.getByTestId("submit");

  userEvent.type(input, "test");
  userEvent.clear(input);

  expect(button).toBeDisabled();
});

xtest("User can add a todo and it will be displayed.", () => {
  render(<Todo />);
  const input = screen.getByRole("textbox");
  const button = screen.getByTestId("submit");

  userEvent.type(input, "test todo");
  userEvent.click(button);

  expect(input).toBeInTheDocument();
});

xtest("User can mark a todo as done.", () => {});
xtest("User can move a todo from done.", () => {});
xtest("User can delete a todo.", () => {});
