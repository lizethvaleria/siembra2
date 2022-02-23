<template>
  <div
    class="
      bg-primary
      min-vh-100
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <div class="bg-white shadow p-4 col-11 col-md-6 col-lg-4">
      <!-- <LoginForm :onLogin="onLogin" :onRestorePassword="onRestorePassword" /> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { onLogin, onRestorePassword } from "@/components/LoginForm/types";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Authentication",
});
</script>

<style lang="sass" scoped></style>
