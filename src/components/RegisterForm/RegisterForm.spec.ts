import RegisterForm from "./RegisterForm.vue";
import { render, screen, within } from "@testing-library/vue";
import { onRegister } from "./types";
import userEvent from "@testing-library/user-event";
import { fireEvent, waitFor } from "@testing-library/dom";

describe("Register form", () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;
  let ageInput: HTMLElement;
  let favoriteColor: HTMLElement;
  let likesCatsInput: HTMLElement;
  let submitBtn: HTMLElement;

  let requiredFields: HTMLElement[];

  let onRegisterMock = jest.fn<ReturnType<onRegister>, [onRegister]>();

  beforeEach(async () => {
    render(RegisterForm, {
      props: {
        onRegister: onRegisterMock,
      },
    });
    emailInput = await screen.getByRole("textbox", { name: "email" });
    confirmPasswordInput = await screen.getByLabelText("Confirmar contraseña");
    passwordInput = await screen.getByLabelText("Contraseña");
    ageInput = await screen.getByLabelText("Edad");
    likesCatsInput = await screen.getByRole("checkbox");
    favoriteColor = await screen.getByRole("combobox", {
      name: "preferedColor",
    });
    requiredFields = [
      emailInput,
      passwordInput,
      confirmPasswordInput,
      ageInput,
    ];
    submitBtn = await screen.getByRole("button", { name: "submit" });
    onRegisterMock.mockClear();
  });

  const validInputs = {
    email: "test@test.com",
    password: "1234567",
    age: "18",
    preferedColor: "Negro",
    likesCats: true,
  };

  const hasErrorMessage = (el: HTMLElement) =>
    expect(
      within(el.parentElement as HTMLElement).getByRole("alert")
    ).toBeInTheDocument();

  const doesNotHaveErrorMessage = (el: HTMLElement) =>
    expect(
      within(el.parentElement as HTMLElement).queryByRole("alert")
    ).toBeNull();

  const submit = async () => await userEvent.click(submitBtn);
  const toggleLikesCatsCheckbox = async () =>
    await userEvent.click(likesCatsInput);

  const typeRequiredFields = ({
    withCorrectPassword,
  }: {
    withCorrectPassword: boolean;
  }) => {
    let password = validInputs.password;
    if (!withCorrectPassword) {
      password += "wrongpass";
    }
    userEvent.type(emailInput, validInputs.email);
    userEvent.type(passwordInput, validInputs.password);
    userEvent.type(confirmPasswordInput, password);
    userEvent.type(ageInput, validInputs.age);
  };

  it("Requires the user to fill most inputs before submitting and shows error messages", async () => {
    onRegisterMock.mockResolvedValue();
    await submit();
    expect(onRegisterMock).not.toHaveBeenCalled();
    requiredFields.forEach(hasErrorMessage);
    expect(
      within(favoriteColor.parentNode as HTMLElement).queryByRole("alert")
    ).toBeNull();
  });

  it("Calls onRegister with required inputs if they are filled and passwords match and clears errors", async () => {
    await userEvent.click(submitBtn);
    expect(onRegisterMock).not.toHaveBeenCalled();
    typeRequiredFields({ withCorrectPassword: false });
    await toggleLikesCatsCheckbox();
    await submit();
    expect(onRegisterMock).not.toHaveBeenCalled();

    userEvent.clear(confirmPasswordInput);
    userEvent.type(confirmPasswordInput, validInputs.password);
    await submit();
    await waitFor(() => {
      expect(submitBtn).toBeDisabled();
    });
    await waitFor(() => {
      expect(submitBtn).not.toBeDisabled();
    });
    expect(onRegisterMock).toHaveBeenCalledWith({
      ...validInputs,
      preferedColor: null,
      age: Number(validInputs.age),
    });

    await userEvent.selectOptions(favoriteColor, "Negro");
    await submit();
    expect(onRegisterMock).toHaveBeenCalledWith({
      ...validInputs,
      preferedColor: "Negro",
      age: Number(validInputs.age),
    });

    requiredFields.forEach(doesNotHaveErrorMessage);
  });

  it("Shows a form error if onRegister throws", async () => {
    onRegisterMock.mockRejectedValue("Error");
    await typeRequiredFields({ withCorrectPassword: true });
    await submit();
    expect(onRegisterMock).toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen.getByRole("alert", { name: "formError" })
      ).toBeInTheDocument();
    });
  });
});
