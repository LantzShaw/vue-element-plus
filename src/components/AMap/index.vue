<template>
  <div style="display: flex">
    <div>
      <div>
        <el-select
          v-model="keywords"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词搜索"
          :remote-method="remoteMethod"
          :loading="loading"
          :clearable="true"
          size="mini"
          @change="currentSelect"
          style="width: 600px"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item"
            class="one-text"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.district }}</span>
          </el-option>
        </el-select>
        <div class="info-box" v-if="isShowInfo">
          纬度：{{ lat }}
          <br />
          经度：{{ lng }}
          <br />
          <!-- 详细地址：{{ form.address }} -->
        </div>
      </div>
      <div id="container" class="container"></div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
window._AMapSecurityConfig = {
  // 安全密钥
  securityJsCode: '35123a195f135cfbaec371fb7b2fde4c',
}
export default {
  name: 'AMap',
  data() {
    return {
      // 地图实例
      map: null,
      // 标记点
      marker: '',
      // 地址逆解析
      geoCoder: null,
      // 搜索提示
      AutoComplete: null,
      // 搜索关键字
      keywords: '',
      // 位置信息
      form: {
        lng: '',
        lat: '',
        address: '',
        adcode: '', //地区编码
      },
      // 搜索节流阀
      loading: false,
      // 搜索提示信息
      options: [],
    }
  },
  props: {
    lng: {
      require: true,
      default: '',
    },
    lat: { require: true, default: '' },
    isShowInfo: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    initMap() {
      const vm = this
      AMapLoader.load({
        // 你申请的Key
        key: 'add372ddce91f163228d4d5b5c8abf2a',
        version: '2.0',
        // 需要用到的插件
        plugins: ['AMap.Geocoder', 'AMap.AutoComplete'],
      })
        .then(AMap => {
          if (vm.lng && vm.lat) {
            this.map = new AMap.Map('container', {
              viewMode: '3D', //是否为3D地图模式
              zoom: 15, //初始化地图级别
              center: [vm.lng, vm.lat], //初始化地图中心点位置
            })
          } else {
            this.map = new AMap.Map('container', {
              viewMode: '3D', //是否为3D地图模式
              zoom: 11, //初始化地图级别
              // center: [vm.lng, vm.lat],
              // center: [105.602725, 37.076636], //初始化地图中心点位置
            })
          }

          //地址逆解析插件
          this.geoCoder = new AMap.Geocoder({
            city: '010', //城市设为北京，默认：“全国”
            radius: 1000, //范围，默认：500
          })

          // 搜索提示插件
          this.AutoComplete = new AMap.AutoComplete({ city: '全国' })

          //点击获取经纬度;
          this.map.on('click', e => {
            console.log('e', e)

            // 获取经纬度
            this.form.lng = e.lnglat.lng
            this.form.lat = e.lnglat.lat
            vm.$emit('getPosition', { lng: e.lnglat.lng, lat: e.lnglat.lat })
            // 清除点
            this.removeMarker()
            // 标记点
            this.setMapMarker(e.lnglat.lng, e.lnglat.lat)
          })

          if (vm.lng && vm.lat) {
            this.setMapMarker(vm.lng, vm.lat)
          }
        })
        .catch(err => {
          // 错误
          console.log(err)
        })
    },
    // 标记点
    setMapMarker(lng, lat) {
      // 自动适应显示想显示的范围区域
      this.map.setFitView()

      // const position = [+lng, +lat];
      // const position = new AMap.LngLat(Number(lng), Number(lat));

      this.marker = new AMap.Marker({
        map: this.map,
        position: [lng, lat],
      })

      // 逆解析地址
      this.toGeoCoder()
      this.map.setFitView()
      this.map.add(this.marker)
    },
    // 清除点
    removeMarker() {
      if (this.marker) {
        this.map.remove(this.marker)
      }
    },
    // 逆解析地址
    toGeoCoder() {
      // let lnglat = [this.form.lng, this.form.lat];
      if (this.lng && this.lat) {
        let lnglat = [this.lng, this.lat]

        this.geoCoder.getAddress(lnglat, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            this.form.address = result.regeocode.formattedAddress
          }
        })
      }
    },
    // 搜索
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.AutoComplete.search(query, (status, result) => {
            this.options = result.tips
          })
        }, 200)
      } else {
        this.options = []
      }
    },
    // 选中提示
    currentSelect(val) {
      // 清空时不执行后面代码
      if (!val) {
        return
      }
      this.form = {
        lng: val.location.lng,
        lat: val.location.lat,
        address: val.district + val.address,
        adcode: val.adcode,
      }
      this.$emit('getPosition', {
        lng: val.location.lng,
        lat: val.location.lat,
      })
      // 清除点
      this.removeMarker()
      // 标记点
      this.setMapMarker(val.location.lng, val.location.lat)
    },
  },
  mounted() {
    this.initMap()
  },
}
</script>

<style>
.container {
  width: 600px;
  height: 300px;
}
</style>
