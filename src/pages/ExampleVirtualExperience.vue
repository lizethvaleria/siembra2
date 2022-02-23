<template>
  <VirtualExperience
    :skies="skies"
    :initialSky="initialSky"
    :assets="assets"
    :sceneConfigs="SceneConfigs"
    :totemIcons="TotemIcons"
    @iconClick="onIconClick($event)"
    :navigatorsPaths="{
      arrowPath: '/navigators/arrow.png',
      hotspotPath: '/navigators/hotspot.png',
    }"
  />
  <!-- Keep forEvent in sync with the type of event that will activate a modal vvvvvvvv -->
  <Slot1Modal forEvent="Slot1" :information="currentInformation" />
  <Slot2Modal forEvent="Slot2" :information="currentInformation" />
  <Slot3Modal forEvent="Slot3" :information="currentInformation" />
  <Slot4Modal forEvent="Slot4" :information="currentInformation" />

  <!-- Floating icons -->
  <!--<div class="icons">
    <FloatingIcon>
      <button
        data-bs-toggle="offcanvas"
        data-bs-target="#chatDrawer"
        class="floating_icon"
      >
        <i class="fas fa-comments"></i>
      </button>
    </FloatingIcon>
  </div>-->

  <ChatDrawer />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VirtualExperience from "../components/VirtualExperience/VirtualExperience.vue";
import { Asset } from "../components/VirtualExperience/config/types";
import {
  renderPaths,
  SceneConfigs,
  ExampleStandInformation,
} from "../components/VirtualExperience/config/SceneConfig";
import { Totem4RowsSlots } from "../components/VirtualExperience/components/Totem4Rows.vue";
import Slot1Modal from "../components/VirtualExperience/NormalComponents/Slot1Modal.vue";
import Slot2Modal from "../components/VirtualExperience/NormalComponents/Slot2Modal.vue";
import Slot3Modal from "../components/VirtualExperience/NormalComponents/Slot3Modal.vue";
import Slot4Modal from "../components/VirtualExperience/NormalComponents/Slot4Modal.vue";
import ChatDrawer from "../components/VirtualExperience/NormalComponents/ChatDrawer.vue";

// Keep in sync with forEvent ^^^^^^^^^^^^
// We declare the type of events we'll have for a better DX (Developer Experience)
type Slot1Event = "Slot1";
type Slot2Event = "Slot2";
type Slot3Event = "Slot3";
type Slot4Event = "Slot4";
export type TotemEvent = Slot1Event | Slot2Event | Slot3Event | Slot4Event;

export default defineComponent({
  components: {
    VirtualExperience,
    Slot1Modal,
    Slot2Modal,
    Slot3Modal,
    Slot4Modal,
    ChatDrawer,
  },
  data() {
    const skies = renderPaths;
    const initialSky = skies[0];
    const assets = [] as Asset[];

    const TotemIcons: Totem4RowsSlots<ExampleStandInformation, TotemEvent> = {
      Slot1: {
        iconId: "#/navigators/arrow.png",
        title: "Slot1",
        emitOnClick: "Slot1",
        shouldDisplayItself: (info) => false,
      },
      Slot2: {
        iconId: "#/navigators/arrow.png",
        title: "Slot2",
        emitOnClick: "Slot2",
        shouldDisplayItself: (info) => true,
      },
      Slot3: {
        iconId: "#/navigators/arrow.png",
        title: "Slot3",
        emitOnClick: "Slot3",
        shouldDisplayItself: (info) => true,
      },
      Slot4: {
        iconId: "#/navigators/arrow.png",
        title: "Slot4",
        emitOnClick: "Slot4",
        shouldDisplayItself: (info) => true,
      },
    };
    return {
      skies,
      initialSky,
      assets,
      SceneConfigs,
      TotemIcons,
      currentInformation: {} as ExampleStandInformation,
    };
  },
  methods: {
    onIconClick: function ([eventName, information]: [
      TotemEvent,
      ExampleStandInformation
    ]) {
      document.getElementById(`btn-for-modal-${eventName}`)?.click();
      this.currentInformation = information;
    },
  },
});
</script>

<style lang="scss" scoped>
.icons {
  z-index: 50;
  position: absolute;
  top: 1em;
  right: 1em;
}

.floating_icon {
  background: #ffffff99;
  height: 2.5em;
  width: 2.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.1s linear;
  border-radius: 100%;
  border: none;
  outline: none;

  i {
    font-size: 1.1em;
  }

  &:hover {
    background: #ffffffdd;
  }
}
</style>
