<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="chatDrawer">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title">Chat</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="chatDrawer"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div>Chat drawer body</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>
