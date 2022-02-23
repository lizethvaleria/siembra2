<template>
  <div :class="`${wrapperClass} ${isCheckbox && 'form-check'} mt-3 mb-3`">
    <label v-if="!isCheckbox" :for="name">{{ name }}</label>
    <slot name="input"></slot>
    <label class="form-check-label" v-if="isCheckbox" :for="name">{{
      name
    }}</label>
    <small role="alert" v-if="errors && errors.length > 0" class="text-danger">
      {{ errors.join(". ") }}.
    </small>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "@vue/runtime-core";

export default defineComponent({
  name: "TextField",
  props: {
    name: {
      type: String,
      required: true,
    },
    errors: {
      type: Array as PropType<string[]>,
      required: true,
    },
    wrapperClass: {
      type: String,
    },
    isCheckbox: {
      type: Boolean,
    },
  },
});
</script>
