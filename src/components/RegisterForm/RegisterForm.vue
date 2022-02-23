<template>
  <form v-on:submit.prevent="onSubmit">
    <p class="fs-5">Registro</p>

    <div class="form-group">
      <p v-if="formError !== null" role="alert" aria-label="formError">
        {{ formError }}
      </p>
    </div>

    <TextField name="Correo" :errors="errors.email">
      <template v-slot:input>
        <input
          type="text"
          name="Correo"
          id="Correo"
          class="form-control"
          aria-label="email"
          placeholder="correo@gmail.com"
          v-model="fields.email"
        />
      </template>
    </TextField>

    <TextField name="Contraseña" :errors="errors.password">
      <template v-slot:input>
        <input
          id="Contraseña"
          type="password"
          name="Password"
          class="form-control"
          aria-label="password"
          v-model="fields.password"
        />
      </template>
    </TextField>

    <TextField name="Confirmar contraseña" :errors="errors.confirmPassword">
      <template v-slot:input>
        <input
          id="Confirmar contraseña"
          type="password"
          name="ConfirmPassword"
          class="form-control"
          aria-label="confirmPassword"
          v-model="fields.confirmPassword"
        />
      </template>
    </TextField>

    <TextField name="Edad" :errors="errors.age">
      <template v-slot:input>
        <input
          type="number"
          name="Age"
          id="Edad"
          class="form-control"
          placeholder="24"
          aria-label="age"
          v-model="fields.age"
        />
      </template>
    </TextField>

    <TextField name="Cuál color prefiers ?" :errors="errors.preferedColor">
      <template v-slot:input>
        <select
          name="ColorPreferido"
          class="form-select"
          placeholder="Selecciona un color"
          aria-label="preferedColor"
          v-model="fields.preferedColor"
        >
          <option v-for="color in ColorOptionsArray" :value="color">
            {{ color }}
          </option>
        </select>
      </template>
    </TextField>

    <TextField isCheckbox name="Me gustan los gatos" :errors="errors.likesCats">
      <template v-slot:input>
        <input
          id="Me gustan los gatos"
          type="checkbox"
          name="LikesCats"
          class="form-check-input"
          aria-label="likesCats"
          v-model="fields.likesCats"
        />
      </template>
    </TextField>

    <p>
      Ya tienes una cuenta ?
      <router-link to="/authentication/login" class="text-primary">
        Inicia sesión</router-link
      >
    </p>

    <button
      class="btn btn-primary"
      :disabled="formState === 'PENDING'"
      type="submit"
      aria-label="submit"
    >
      Registrarse
    </button>
  </form>
</template>

<script lang="ts">
import { initializeFormErrors } from "@/helpers/utilities";
import { defineComponent, PropType } from "@vue/runtime-core";
import { onRegister } from "./types";
import TextField from "@/components/TextField/TextField.vue";
import {
  RegisterFormFieldsSchema,
  RegisterFormFieldsType,
  withConfirmationPassword,
} from "@root/schemas/RegisterSchema";
import { ColorOptionsArray } from "@root/schemas/common";
import { AsyncState, FormError } from "@/types/Misc";
import { getAuthErrorMessage } from "@/helpers/firebaseErrorMessages";

type RegisterFormErrors = Record<keyof RegisterFormFieldsType, string[]>;

export default defineComponent({
  name: "RegisterForm",
  components: {
    TextField,
  },
  props: {
    onRegister: {
      type: Function as PropType<onRegister>,
      required: true,
    },
  },
  data() {
    const initialFields: withConfirmationPassword<RegisterFormFieldsType> = {
      email: "",
      password: "",
      confirmPassword: "",
      // Convert to unknown an then to number to avoid initializing it with a number, this way we
      // avoid removing the placeholder
      age: undefined as unknown as number,
      preferedColor: null,
      likesCats: false,
    };
    return {
      fields: initialFields,
      errors: initializeFormErrors(initialFields),
      formState: "NOT_SENT" as AsyncState,
      formError: null as FormError,
    };
  },
  setup() {
    return { ColorOptionsArray };
  },
  methods: {
    async onSubmit() {
      const parsedResults = RegisterFormFieldsSchema.safeParse(this.fields);
      if (!parsedResults.success) {
        const errors = parsedResults.error.format();

        for (let fieldError in errors) {
          const key = fieldError as keyof RegisterFormFieldsType;
          this.errors[key] = errors[key]?._errors || [];
        }
        return;
      }

      // Inputs are valid, remove error messages
      for (let key in this.errors) {
        this.errors[key as keyof RegisterFormErrors] = [];
      }

      this.formState = "PENDING";
      try {
        await this.onRegister(parsedResults.data);
        this.formState = "SUCCESS";
      } catch (error) {
        this.formState = "ERROR";
        if (error instanceof Error) {
          this.formError = getAuthErrorMessage(error.message);
          return;
        }
        this.formError = "Error desconocido, por favor intentalo de nuevo";
      }
    },
  },
});
</script>

<style lang="scss" scoped></style>
