<template>
  <a-scene>
    <!-- We setup a camera without the ability to move, if needed, we could add an
        a-entity with some rotation to set an initial rotation
       -->
    <a-entity rotation="0 90 0">
      <a-camera
        wasd-controls="acceleration:0"
        rotation="80 80 80"
        position="0 1.6 0"
      >
      </a-camera>
    </a-entity>
    <!-- We need to add rayOrigin: mouse to give the cursor the ability to interact with entities -->
    <a-entity id="mouseCursor" cursor="rayOrigin: mouse"></a-entity>
    <a-assets>
      <img
        v-for="sky in loadedSkies"
        v-on:load="skyDownloaded(sky)"
        :key="sky"
        :id="sky"
        :src="sky"
      />
      <img
        v-for="sky in loadedSkies"
        :key="normalPathToLowresPath(sky)"
        :id="normalPathToLowresPath(sky)"
        :src="normalPathToLowresPath(sky)"
      />
      <img :id="navigatorsPaths.arrowPath" :src="navigatorsPaths.arrowPath" />
      <img
        :id="navigatorsPaths.hotspotPath"
        :src="navigatorsPaths.hotspotPath"
      />
      
    </a-assets>
    <!-- Navigators are the way to change between skies (hotspots and arrows) -->
    <a-entity id="navigators_wrapper" v-if="currentSceneConfig !== undefined">
      <NavigatorEntity
        v-for="{
          type,
          position,
          rotation,
          to,
        } in currentSceneConfig.navigators"
        :toSkyId="to"
        :type="type"
        :src="
          type === 'arrow'
            ? `#${navigatorsPaths.arrowPath}`
            : `#${navigatorsPaths.hotspotPath}`
        "
        :rotation="rotation"
        :position="position"
        @goTo="() => goTo(to)"
      />
    </a-entity>
    
  
    <!-- a-sky shows the current render, whenever we click on a navigator we make it point to another one -->
    <a-sky
      id="sky"
      :rotation="currentSceneConfig?.skyRotation || '0 0 0'"
      :src="`#${renderedSky}`"
      color="#ECECEC"
      :animation="`property: components.material.material.color; type: color; to: ${to} ; from: ${from}; loop: false; dur: 300`"
    ></a-sky>
  </a-scene>
</template>

<script lang="ts">
import { ref, defineComponent, reactive, PropType } from "vue";
import NavigatorEntity from "./components/NavigatorEntity.vue";
import { sleep } from "../../helpers/utilities";
import { Asset, SceneConfig, SkyPath } from "./config/types";
import Totem4Rows, { Totem4RowsSlots } from "./components/Totem4Rows.vue";
import { ExampleStandInformation } from "./config/SceneConfig";
import { TotemEvent } from "../../pages/ExampleVirtualExperience.vue";
import { insert } from "ramda";
import { LazyLoadRenders } from "./LazyLoadRenders";

export default defineComponent({
  name: "VirtualExperience",
  components: {
    NavigatorEntity,
    Totem4Rows,
  },
  props: {
    skies: {
      type: Array as PropType<string[]>,
      required: true,
    },
    initialSky: {
      type: String,
      required: true,
    },
    assets: {
      type: Object as PropType<Asset[]>,
      required: true,
    },
    sceneConfigs: {
      type: Object as PropType<
        Record<SkyPath, SceneConfig<ExampleStandInformation>>
      >,
      required: true,
    },
    navigatorsPaths: {
      type: Object as PropType<{ arrowPath: string; hotspotPath: string }>,
      required: true,
    },
    totemIcons: {
      type: Object as PropType<
        Totem4RowsSlots<ExampleStandInformation, TotemEvent>
      >,
      required: true,
    },
  },
  data: function () {
    return {
      loadedSkies: [
        ...LazyLoadRenders(
          this.skies[0],
          [this.initialSky],
          this.sceneConfigs,
          1
        ),
      ] as string[],
      downloadedSkies: [] as string[],
      currentSky: this.initialSky,
      isTransitioning: false,
    };
  },
  computed: {
    to: function (): string {
      return this.isTransitioning ? "black" : "white";
    },
    from: function (): string {
      return this.isTransitioning ? "white" : "black";
    },
    currentSceneConfig: function ():
      | SceneConfig<ExampleStandInformation>
      | undefined {
      return this.sceneConfigs ? this.sceneConfigs[this.currentSky] : undefined;
    },
    renderedSky: function (): string {
      return this.downloadedSkies.includes(this.currentSky)
        ? this.currentSky
        : this.normalPathToLowresPath(this.currentSky);
    },
  },
  methods: {
    async goTo(to: string) {
      this.isTransitioning = true;
      await sleep(300);
      this.currentSky = to;
      this.isTransitioning = false;
      this.loadedSkies = LazyLoadRenders(
        this.currentSky,
        this.loadedSkies,
        this.sceneConfigs,
        2
      );
    },
    normalPathToLowresPath(s: string) {
      return insert(1, "lowres/render0", s.split("render0")).join("");
    },
    skyDownloaded(skyId: string) {
      if (skyId.includes("low")) return;
      this.downloadedSkies = [...this.downloadedSkies, skyId];
    },
  },
});
</script>

<style lang="scss" scoped></style>
