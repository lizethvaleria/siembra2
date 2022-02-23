<template>
  <div>
    <router-view />
  
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
.main_screen {
  height: 100vh;
}
</style>
