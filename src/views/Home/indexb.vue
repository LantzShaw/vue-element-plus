<template>
  <div style="height: 100%; width: 100%">
    <l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
      <l-tile-layer
        url="http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"
        layer-type="base"
        name="OpenStreetMap"
      ></l-tile-layer>
    </l-map>
  </div>
</template>

<script lang="ts" setup>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'

import 'leaflet/dist/leaflet.css'

const zoom = ref<number>(2)
</script>
