import * as z from "zod";
import { emailValidator, passwordValidator } from "./common";

export const LoginFormFieldsSchema = z.object({
  email: emailValidator,
  password: passwordValidator,
});
export type LoginFormFieldsType = z.infer<typeof LoginFormFieldsSchema>;
