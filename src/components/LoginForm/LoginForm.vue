<template>
  <form v-on:submit.prevent="submit">
    <p class="fs-5">Inicia sesión</p>

    <div class="form-group">
      <p v-if="formError !== null" data-testid="loginform_error">
        {{ formError }}
      </p>
    </div>

    <div class="form-group">
      <p v-if="formError !== null" data-testid="loginform_error">
        {{ formError }}
      </p>
    </div>

    <TextField name="Correo" :errors="errors.email" wrapperClass="">
      <template v-slot:input>
        <input
          type="text"
          name="Correo"
          id="Correo"
          class="form-control"
          aria-label="email"
          data-testid="loginform-email"
          v-model="fields.email"
        />
      </template>
    </TextField>

    <TextField name="Contraseña" :errors="errors.password">
      <template v-slot:input>
        <input
          type="text"
          name="password"
          class="form-control"
          aria-label="password"
          data-testid="loginform_password"
          v-model="fields.password"
        />
      </template>
    </TextField>

    <button
      :disabled="formState === 'PENDING'"
      v-on:click.prevent="submit"
      class="btn btn-primary"
      data-testid="submit-btn"
      aria-label="submit"
    >
      Iniciar sesión
    </button>
    <hr />
    <p class="">
      Olvidaste tu contraseǹa ?
      <span
        role="button"
        aria-label="restore-password"
        v-on:click="openRestorePasswordModal"
        class="restore_password text-primary"
        >recuperala aquí</span
      >
    </p>
    <p>
      Aún no tienes una cuenta ?
      <router-link to="/authentication/register" class="text-primary">
        Registrate</router-link
      >
    </p>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {
  LoginFormFieldsSchema,
  LoginFormFieldsType,
} from "@root/schemas/LoginSchema";
import type { onLogin, onRestorePassword } from "./types";
import { FormError, AsyncState } from "@/types/Misc";
import TextField from "@/components/TextField/TextField.vue";
import Swal from "sweetalert2";
import { Colors } from "@/theme/Colors";
import { initializeFormErrors } from "@/helpers/utilities";

type LoginFormErrors = Record<keyof LoginFormFieldsType, string[]>;

export default defineComponent({
  name: "LoginForm",
  components: {
    TextField,
  },
  data() {
    const initialFields: LoginFormFieldsType = {
      email: "",
      password: "",
    };
    return {
      fields: initialFields,
      errors: initializeFormErrors(initialFields),
      formState: "NOT_SENT" as AsyncState,
      formError: null as FormError,
    };
  },
  props: {
    onLogin: {
      type: Function as PropType<onLogin>,
      required: true,
    },
    onRestorePassword: {
      type: Function as PropType<onRestorePassword>,
      required: true,
    },
  },
  methods: {
    async submit() {
      const parsedFields = LoginFormFieldsSchema.safeParse({
        email: this.fields.email,
        password: this.fields.password,
      });
      if (!parsedFields.success) {
        const errors = parsedFields.error.format();
        this.errors.email = errors.email?._errors || [];
        this.errors.password = errors.password?._errors || [];
        // Invalid inputs, return
        return;
      }

      // Inputs are valid, remove error messages
      for (let key in this.errors) {
        this.errors[key as keyof LoginFormErrors] = [];
      }

      this.formState = "PENDING";
      try {
        await this.onLogin(parsedFields.data);
        this.formState = "SUCCESS";
      } catch (error) {
        const parsedError = "Error";
        this.formError = parsedError;
        this.formState = "ERROR";
      }
    },
    async openRestorePasswordModal() {
      Swal.fire({
        title: "Ingresa tu correo para recuperar tu contraseǹa",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          ["aria-label"]: "restore_password",
        },
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: Colors.primary,
        confirmButtonText: "Enviar",
        confirmButtonAriaLabel: "confirm-restore-password",
        showLoaderOnConfirm: true,
        preConfirm: (login) => {
          return this.onRestorePassword(login).catch((error) => {
            Swal.showValidationMessage(
              "Ocurrió un error, revisa que el correo insertado sea válido o intentalo de nuevo más tarde"
            );
          });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Revisa tu correo para reestablecer tu contraseña",
          });
        }
      });
    },
  },
});
</script>

<style scoped>
.restore_password {
  cursor: pointer;
}
</style>
