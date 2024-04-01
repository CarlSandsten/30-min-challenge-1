import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Todo } from "./Todo";

/**
 * @tests
 *
 * Part 1: Renders the component and elements when called.
 * Part 2: Misc. Behaviors.
 * Part 2: Adding a todo item.
 * Part 3: Moving a todo item.
 * Part 4: Removing a todo item.
 */

/**
 * @1: Renders the component and elements when called.
 * @test - If the component renders.
 */
test("renders the <Todo /> component.", () => {
  render(<Todo />);
  const todoComponent = screen.getByLabelText("todo-list");
  expect(todoComponent).toBeInTheDocument();
});

/**
 * @test - If the component rendered has an input field.
 */
test("renders an input field.", () => {
  render(<Todo />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("renders a submit button.", () => {
  render(<Todo />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toBeInTheDocument();
});

/**
 * @2: Misc. Behaviors.
 * @rule - As a user, I shouldn't be allowed to add a todo item to the list
 *         if the input is empty.
 * @test - This tests that the submit button is disabled.
 */
test("submit button should be disabled if no value in input.", () => {
  render(<Todo />);
  const button = screen.getByRole("button", { name: "Submit" });
  expect(button).toBeDisabled();
});

/**
 * @2: Misc. Behaviors.
 * @rule - As a user, I shouldn't be allowed to add a todo item to the list
 *         if the input is empty.
 * @test - This tests that the user can't submit the form.
 */

xtest("the user can't submit the form if there is no value in the input.", () => {});

/**
 * @2: Misc. Behaviors.
 * @rule - As a user, I shouldn't be allowed to add a todo item to the list
 *         if the input is empty.
 * @test - This tests that the user can't submit the form after clearing the input field.
 */
test("submit button should be disabled after input field has been cleared.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: "Submit" });
  user.type(input, "test");
  user.clear(input);
  await waitFor(() => {
    expect(button).toBeDisabled();
  });
});

/**
 * @2: Misc. Behaviors.
 * @rule - As a user, I can add a todo item to a list.
 * @test - This tests that the submit button is enabled when there is value in the input field.
 *
 * When using async updates, there will be an error showing that we need to use 'act()'.
 * However, RTL already is using that and provides different ways we can handle our tests
 * with async updates:
 * https://chrisboakes.com/fixing-act-error-react-testing-library/
 * https://davidwcai.medium.com/react-testing-library-and-the-not-wrapped-in-act-errors-491a5629193b
 */
test("submit button should be enabled if input value has value.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  const button = screen.getByRole("button", { name: "Submit" });
  user.type(input, "test");
  await waitFor(() => {
    expect(button).toBeEnabled();
  });
});

/**
 * @3: Adding a todo item.
 *
 * The submit tests only includes the submit event as RTL has issues with submitting the event
 * with a click. This is a reported issue:
 * https://github.com/testing-library/user-event/issues/1032
 *
 * Also, getting a form with role has issues as well, so we added an aria-label:
 * https://github.com/testing-library/dom-testing-library/issues/937
 * https://stackoverflow.com/questions/77242789/cannot-target-form-element-using-getbyrole
 *
 * How we handle async updates:
 * https://testing-library.com/docs/guide-disappearance
 */
test("renders a ready list element when adding a todo.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const form = screen.getByLabelText("todo");
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(form);
  const list = await screen.findByTestId("ready-list");
  await waitFor(async () => {
    expect(list).toBeInTheDocument();
  });
});

xtest("renders a heading for the ready list rendered.", async () => {});

test("renders a todo list item element.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const listItem = within(getByRole("listitem")).getByText("test");
  await waitFor(() => {
    expect(listItem).toBeInTheDocument();
  });
});

test("renders a todo list item element with a done button.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const button = within(getByRole("listitem")).getByLabelText("done");
  await waitFor(() => {
    expect(button).toBeInTheDocument();
  });
});

test("renders the completed list element when removing a todo list item from the ready list.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const button = within(getByRole("listitem")).getByLabelText("done");
  user.click(button);
  const completedList = await screen.findByTestId("completed-list");
  await waitFor(() => {
    expect(completedList).toBeInTheDocument();
  });
});

test("renders the todo list item element in the completed list.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const button = within(getByRole("listitem")).getByLabelText("done");
  user.click(button);
  const completedList = await screen.findByTestId("completed-list");
  const listItem = within(completedList).getByRole("listitem");
  await waitFor(() => {
    expect(listItem).toBeInTheDocument();
  });
});

test("renders the todo list item element in the completed list with a move back button.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const button = within(getByRole("listitem")).getByLabelText("done");
  user.click(button);
  const completedList = await screen.findByTestId("completed-list");
  const moveBackButton = within(
    within(completedList).getByRole("listitem")
  ).getByLabelText("move back");

  await waitFor(() => {
    expect(moveBackButton).toBeInTheDocument();
  });
});

test("renders the todo list item element in the completed list with a remove button.", async () => {
  const user = userEvent.setup();
  render(<Todo />);
  const input = screen.getByRole("textbox");
  user.type(input, "test");
  fireEvent.submit(input, { target: { value: "test" } });
  const list = await screen.findByTestId("ready-list");
  const { getByRole } = within(list);
  const button = within(getByRole("listitem")).getByLabelText("done");
  user.click(button);
  const completedList = await screen.findByTestId("completed-list");
  const removeButton = within(
    within(completedList).getByRole("listitem")
  ).getByLabelText("remove");

  await waitFor(() => {
    expect(removeButton).toBeInTheDocument();
  });
});

// TODO: test what was removed, specifically when more items.
xtest("should not render the ready list element after marking a single todo item as done.", async () => {});
xtest("should not render the completed list element after moving back all completed todo items.", async () => {});
xtest("should not render any list element after removing all todo items from the ready and completed list.", async () => {});
xtest("render both list elements when adding items to their lists.", async () => {});
