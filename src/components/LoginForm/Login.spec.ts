import {
  render,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/vue";
import LoginForm from "./LoginForm.vue";
import { onLogin, onRestorePassword } from "./types";
import userEvent from "@testing-library/user-event";

type onLoginArg = Parameters<onLogin>[0];

describe("Login form", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let submitBtn: HTMLElement;
  let openRestorePasswordModalBtn: HTMLElement;
  let requiredFields: HTMLElement[];
  let onLoginMock = jest.fn<ReturnType<onLogin>, [onLogin]>();
  let onRestorePasswordMock =
    jest.fn<ReturnType<onRestorePassword>, [onRestorePassword]>();

  const validInputs = {
    email: "test@test.com",
    password: "1234567",
  };

  const hasErrorMessage = (el: HTMLElement) =>
    expect(
      within(el.parentElement as HTMLElement).getByRole("alert")
    ).toBeInTheDocument();

  const doesNotHaveErrorMessage = (el: HTMLElement) =>
    expect(
      within(el.parentElement as HTMLElement).queryByRole("alert")
    ).toBeNull();

  beforeEach(async () => {
    render(LoginForm, {
      props: {
        onLogin: onLoginMock,
        onRestorePassword: onRestorePasswordMock,
      },
    });
    emailInput = await screen.getByRole("textbox", { name: "email" });
    passwordInput = await screen.getByRole("textbox", { name: "password" });
    requiredFields = [emailInput, passwordInput];
    submitBtn = await screen.getByRole("button", { name: "submit" });
    openRestorePasswordModalBtn = await screen.getByRole("button", {
      name: "restore-password",
    });
    onLoginMock.mockClear();
  });

  const submit = async () => await userEvent.click(submitBtn);

  describe("Login", () => {
    it("Does not call onLogin if input is not valid and shows error validation messages", async () => {
      onLoginMock.mockResolvedValue();
      await submit();
      expect(onLoginMock).not.toBeCalled();
      requiredFields.forEach(hasErrorMessage);
    });

    it("Removes error messages after a successful submit", async () => {
      await submit();
      userEvent.type(emailInput, validInputs.email);
      userEvent.type(passwordInput, validInputs.password);
      await submit();
      requiredFields.forEach(doesNotHaveErrorMessage);
    });

    it("Button is disabled while submitting", async () => {
      userEvent.type(emailInput, validInputs.email);
      userEvent.type(passwordInput, validInputs.password);
      await fireEvent.click(submitBtn);
      await waitFor(() => {
        expect(submitBtn).toBeDisabled();
      });
      await waitFor(() => {
        expect(submitBtn).not.toBeDisabled();
      });
      expect(onLoginMock).toHaveBeenCalledWith(validInputs);
    });

    it("Shows an error if onLogin throws", async () => {
      onLoginMock.mockRejectedValue("Error");
      userEvent.type(emailInput, validInputs.email);
      userEvent.type(passwordInput, validInputs.password);
      await fireEvent.click(submitBtn);
      screen.findByTestId("loginform_error");
    });
  });

  describe("Password recovery", () => {
    const openRestorePasswordModalPutEmailAndConfirm = async () => {
      userEvent.click(openRestorePasswordModalBtn);
      const resendEmailInput = await screen.getByRole("textbox", {
        name: "restore_password",
      });
      const sendEmailBtn = await screen.getByRole("button", {
        name: "confirm-restore-password",
      });
      userEvent.type(resendEmailInput, validInputs.email);
      await userEvent.click(sendEmailBtn);
      expect(onRestorePasswordMock).toHaveBeenCalledWith(validInputs.email);
    };

    it.skip("Opens a modal with an input and returns a message after an email is provided", async () => {
      onRestorePasswordMock.mockResolvedValue();
      await openRestorePasswordModalPutEmailAndConfirm();
      expect(screen.queryByText(/Revisa tu correo/i)).not.toBeNull();
    });

    it("Shows an error if a errors occurs at onPasswordResend", async () => {
      onRestorePasswordMock.mockRejectedValue("Error");
      await openRestorePasswordModalPutEmailAndConfirm();
      expect(screen.queryByText(/Ocurrió un error/i)).not.toBeNull();
    });
  });
});
