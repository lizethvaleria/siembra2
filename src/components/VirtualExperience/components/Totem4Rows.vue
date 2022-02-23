<template>
  <a-box
    id="totem"
    :position="position"
    :rotation="rotation"
    scale="0.368 2 0.1"
    color="white"
  >
    <a-box :color="color" position="-0.52 0 0.5" scale="0.1 1 0.1"> </a-box>
    <a-entity id="icons_wrapper">
      <a-entity
        v-for="(icon, currIconIndex) in nonMissingIcons"
        :opacity="icon === undefined ? '0' : '1'"
        :material="`shader: flat; src: ${icon?.iconId}; alpha-test: 0.65; transparent: true`"
        geometry="primitive: plane; height: 1; width: 1;"
        rotation="0 0 0"
        :position="
          getIconPosition(
            String(
              firstIconY -
                currIconIndex * gapBetweenIconYs -
                missingIcons * 0.08
            )
          )
        "
        :scale="iconScale"
        :animation__mouseenter="`property: scale; to: ${scaledIconScale}; startEvents: mouseenter; dur: 100`"
        :animation__mouseleave="`property: scale; to: ${iconScale}; startEvents: mouseleave; dur: 100`"
        v-on:click="
          () => $emit('iconClick', [icon?.emitOnClick || 'other', content])
        "
      >
      </a-entity>
    </a-entity>
  </a-box>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TotemEvent } from "../../../pages/ExampleVirtualExperience.vue";
import { ExampleStandInformation } from "../config/SceneConfig";

export interface IconConfig<T, U> {
  iconId: string;
  title: string;
  emitOnClick: U; // payload to emit
  shouldDisplayItself: (t: T) => boolean;
}

export interface Totem4RowsSlots<T, U> {
  Slot1?: IconConfig<T, U>;
  Slot2?: IconConfig<T, U>;
  Slot3?: IconConfig<T, U>;
  Slot4?: IconConfig<T, U>;
}

export default defineComponent({
  name: "Totem4Rows",
  props: {
    position: {
      type: String,
      required: true,
    },
    rotation: {
      type: String,
      required: true,
    },
    iconsConfig: {
      type: Object as PropType<
        Totem4RowsSlots<ExampleStandInformation, TotemEvent>
      >,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    content: {
      type: Object as PropType<ExampleStandInformation>,
      required: true,
    },
  },
  data() {
    let missingIcons = 0;
    let nonMissingIcons: IconConfig<ExampleStandInformation, TotemEvent>[] = [];
    for (let key in this.iconsConfig) {
      const icon =
        this.iconsConfig[
          key as keyof Totem4RowsSlots<ExampleStandInformation, TotemEvent>
        ];
      if (!icon?.shouldDisplayItself(this.content as ExampleStandInformation)) {
        missingIcons += 1;
      } else {
        nonMissingIcons.push(icon);
      }
    }

    const getIconPosition = (y: string) => `0 ${y} 0.8`;

    const firstIconY = 0.3;
    const gapBetweenIconYs = 0.23;
    const YScale = 0.1288;
    const XScale = 0.7;
    const iconScale = `${XScale} ${YScale} ${XScale}`;
    const scaledIconScale = iconScale
      .split(" ")
      .map(Number)
      .map((n) => n * 1.1)
      .map(String)
      .join(" ");

    return {
      iconScale,
      missingIcons,
      getIconPosition,
      gapBetweenIconYs,
      firstIconY,
      scaledIconScale,
      nonMissingIcons,
    };
  },
  components: {},
});
</script>

<style></style>
