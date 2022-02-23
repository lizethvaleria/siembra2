<template>
  <a-entity
    :material="`shader: flat; src: ${src}; alpha-test: 0.65; transparent: true`"
    geometry="primitive: plane; height: 1; width: 1;"
    :rotation="rotation"
    :position="position"
    scale="1 1 1"
    animation__mouseenter="property: scale; to: 1.1 1.1 1.1; startEvents: mouseenter; dur: 100"
    animation__mouseleave="property: scale; to: 1 1 1; startEvents: mouseleave; dur: 100"
    v-on:click="() => $emit('goTo', toSkyId)"
  >
  </a-entity>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "NavigatorEntity",
  props: {
    src: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    rotation: {
      type: String,
      required: true,
    },
    type: {
      type: String as PropType<"arrow" | "hotspot">,
      required: true,
    },
    toSkyId: {
      type: String,
      required: true,
    },
  },
});
</script>

<style></style>
