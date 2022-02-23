<template>
  <button
    type="button"
    class="hidden"
    :id="'btn-for-modal-' + forEvent"
    data-bs-toggle="modal"
    :data-bs-target="'#' + forEvent"
  ></button>

  <div
    class="modal fade"
    :id="forEvent"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Slot 4 Modal</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">{{ information }}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ExampleStandInformation } from "../config/SceneConfig";

export default defineComponent({
  name: "Slot4Modal",
  props: {
    forEvent: {
      // Must be a TotemEvent, can't use generics, so you'll have to remeber this :s
      type: String,
      required: true,
    },
    information: {
      type: Object as PropType<ExampleStandInformation>,
      required: true,
    },
  },
});
</script>

<style></style>
