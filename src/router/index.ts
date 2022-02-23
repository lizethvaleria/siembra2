import { DefineComponent } from "@vue/runtime-dom";
import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/firebase";
import ExampleVirtualExperience from "../pages/ExampleVirtualExperience.vue";
import Authentication from "../pages/Authentication.vue";
import LoginForm from "../components/LoginForm/LoginForm.vue";
import RegisterForm from "../components/RegisterForm/RegisterForm.vue";
import { onLogin, onRestorePassword } from "@/components/LoginForm/types";
import { onRegister } from "@/components/RegisterForm/types";

const onLogin: onLogin = async (a) => {};
const onRestorePassword: onRestorePassword = async (a) => {};
const onRegister: onRegister = async () => {
  throw "Error bro";
};

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: ExampleVirtualExperience,
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: "/authentication",
      component: Authentication,
      children: [
        {
          path: "login",
          component: LoginForm,
          props: {
            onLogin,
            onRestorePassword,
          },
        },
        {
          path: "register",
          component: RegisterForm,
          props: {
            onRegister,
          },
        },
      ],
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach((route, from, next) => {
  const isLoggedIn = Boolean(auth.currentUser);
  const requiresAuth = Boolean(route.meta.requiresAuth);

  console.log(isLoggedIn, requiresAuth, route.meta);

  if (!isLoggedIn && requiresAuth) {
    return next({
      path: "/authentication/login",
    });
  }

  next();
});

export { router };
