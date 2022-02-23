import type { RegisterFormFieldsType } from "@root/schemas/RegisterSchema";
export type onRegister = (fields: RegisterFormFieldsType) => Promise<void>;
export { RegisterFormFieldsType };
