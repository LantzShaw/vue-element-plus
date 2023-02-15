<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
import L from 'leaflet'
import 'leaflet.chinatmsproviders'
import 'leaflet-ant-path'
import 'leaflet/dist/leaflet.css'
import { onMounted, ref } from 'vue'

import feature from '@/data/feature.json'

let map = null

const initMap = () => {
  // NOTE: 需要设置center、zoom 否则可能会看不到
  map = L.map('map', {
    center: new L.LatLng(39.86, 116.45),
    zoom: 13,
    zoomControl: true,
    attributionControl: false, // 是否版权
    closePopupOnClick: false, // 点击画布是否直接隐藏弹窗
    maxZoom: 13, // 最大缩放
    minZoom: 3, // 最小缩放
    noWrap: false, // 该层是否包裹在逆子午线周围
    worldCopyJump: true, // 拷贝当前配置
    renderer: L.svg(), // 矢量渲染
    doubleClickZoom: false, // 禁用双击放大
    // style: "http://localhost:1234/api/styles/style"
  })

  // TODO: chinaProvider 这个好像用不了
  // L.tileLayer
  //   ?.chinaProvider('Baidu.Satellite.Map', {
  //     maxZoom: 18,
  //     minZoom: 5,
  //   })
  //   .addTo(map)

  // 百度
  // "http://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}"

  // 高德 这个地图的url不知道怎么找的
  // L.tileLayer(
  //   'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
  //   {}
  // ).addTo(map)

  // /api/tilesets/{tilesetId}/{z}/{x}/{y}.{format}
  L.tileLayer('http://localhost:1234/api/tilesets/admin/{z}/{x}/{y}.mvt', {}).addTo(map)

  // L.tileLayer('http://{s}.tiles.maps.sputnik.ru/{z}/{x}/{y}.png', {}).addTo(map)

  console.log('map', map)

  var bj = L.marker([39.92, 116.46]).bindPopup('这里是北京'),
    sh = L.marker([31.213, 121.445]).bindPopup('这里是上海'),
    gz = L.marker([23.16, 113.23]).bindPopup('这里是广州')
  var cities = L.layerGroup([bj, sh, gz]).addTo(map)

  var style = {
    color: '#f40', //边框颜色
    weight: 3, //边框粗细
    opacity: 1, //透明度
    fillColor: '#f40', //区域填充颜色
    fillOpacity: 0, //区域填充颜色的透明
  }

  // TODO: 用leaflet在地图上绘制省的边界
  // https://blog.csdn.net/workhard0905/article/details/107941518

  // NOTE: 填充某个省市、城市 在 http://datav.aliyun.com/portal/school/atlas/area_selector这个链接下载
  // https://geo.datav.aliyun.com/areas_v3/bound/330000_full.json
  L.geoJSON(feature, { style: style }).addTo(map) // features是指geojson数据

  map?.setView([41.02999636902566, 108.984375], 4)

  // NOTE: 离线地图服务
  // https://www.jianshu.com/p/eb795c08a9ae
  // 参考文章: https://juejin.cn/post/6884144929098956813
  // https://jingsam.github.io/foxgis-server-lite/#/tilesets
  // https://github.com/jingsam/foxgis-server-lite
  // https://blog.csdn.net/javawebrookie/article/details/98847947

  // 使用GeoServer开发离线地图服务 arcgis、mapbox

  // openlayers
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
