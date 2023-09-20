import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom";

test("renders the login form", () => {
  const { getByPlaceholderText } = render(
    <LoginForm onFormSubmit={jest.fn()} />
  );
  expect(getByPlaceholderText("Email")).toBeInTheDocument();
  expect(getByPlaceholderText("Password")).toBeInTheDocument();
});

test("submits form with values", () => {
  const onFormSubmit = jest.fn();
  const { getByPlaceholderText, getByRole } = render(
    <LoginForm onFormSubmit={onFormSubmit} />
  );

  fireEvent.change(getByPlaceholderText("Email"), {
    target: { value: "test@email.com" },
  });
  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "password123" },
  });
  fireEvent.click(getByRole("button", { name: "Log in" }));

  expect(onFormSubmit).toHaveBeenCalledWith({
    email: "test@email.com",
    password: "password123",
  });
});

test("toggles password visibility", () => {
  const { getByPlaceholderText, getByTestId } = render(
    <LoginForm onFormSubmit={jest.fn()} />
  );

  const passwordInput = getByPlaceholderText("Password");
  const visibilityIcon = getByTestId("visibility-icon");

  expect(passwordInput.type).toBe("password");

  fireEvent.click(visibilityIcon);

  expect(passwordInput.type).toBe("text");
});
