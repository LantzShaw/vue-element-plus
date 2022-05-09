<template>
  <v-chart
    class="chart"
    :option="option"
    :loading="isLoading"
    :loadingOptions="{ color: '#00daff', text: 'Loading...' }"
  />
</template>

<script lang="ts" name="Bar" setup>
import { ref, provide, watch, onMounted } from 'vue'
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart } from 'echarts/charts'
import VChart, { THEME_KEY } from 'vue-echarts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'

import useTheme from '../hooks/useTheme'
import type { Props } from './index'

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const props = withDefaults(defineProps<Props>(), {
  // title: 'Title',
  // isLoading: false,
  // themeColor: () => ({ backgroundColor: '#fff', textColor: '#000' }),
  // themeMode: 'light',
  // legendData: () => ['helo'],
  // xAxisData: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // series: () => [],
  // seriesData: () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  // seriesColor: () => [['#00daff', '#00daff']],
})

const { title, legendData, xAxisData, seriesData, themeMode, themeColor, seriesColor, series } =
  props
provide(THEME_KEY, props.themeMode)

const THEME_COLOR = useTheme(themeMode, themeColor)

const option = ref<any>({
  backgroundColor: '#000', // 优先级高于 themeMode
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
    containLabel: true,
  },
  title: {
    text: title ?? '',
    left: 'center',
    show: title ? true : false,
  },
  legend: {
    show: true,
    orient: 'vertical',
    left: 'right',
    textStyle: {
      color: THEME_COLOR.textColor,
    },
  },
  // legend: {
  //         orient: this.legendOrient,

  //         textStyle: {
  //           color: this.isDark ? '#aaa' : '#333',
  //         },
  //         // data: ['Traffic Sources'],
  //         show: this.isShowLegend,
  //         align: this.legendAlign,
  //         right: '28',
  //       },

  tooltip: {
    trigger: 'axis', // "axis" | "item"
    // axisPointer: {
    //   type: this.seriesData[0].type === 'bar' ? null : 'cross',
    // },
    // formatter: '{a} <br/>{b} : {c}',
  },
  xAxis: {
    type: 'category',
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'Direct',
      data: seriesData,
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(220, 220, 220, 0.8)',
      },
    },
  ],
})

const setupYAxis = () => {}

const setupXAxis = () => {
  option.value.xAxis.data = xAxisData
}

const setupLegend = () => {
  option.value.legend.data = legendData
}

const setupSeries = () => {
  seriesData?.forEach((item: any) => {
    option.value.series.push({
      name: item.name,
      nameStyle: {
        color: '#f40',
      },
      type: 'bar',
      radius: '55%',
      center: ['50%', '60%'],
      smooth: true,
      // barGap: '10%',
      // barCategoryGap: this.barCategoryGap,
      // barWidth: this.isScale ? null : 27,
      barWidth: 25,
      // showAllSymbol: false,
      showAllSymbol: false,
      // yAxisIndex: item.yAxisIndex ? item.yAxisIndex : null,
      areaStyle: {},
      itemStyle: {
        // color: this.colorList[index],
        barBorderRadius: [4, 4, 0, 0],
        normal: {
          color: ({ dataIndex }) => {
            return new graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color:
                  typeof seriesColor !== 'undefined' ? (seriesColor[dataIndex][0] as string) : '',
              },
              {
                offset: 1,
                color:
                  typeof seriesColor !== 'undefined' ? (seriesColor[dataIndex][1] as string) : '',
              },
            ])
          },
        },
      },
      data: item,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.3)',
        },
      },
    })
  })

  const series = [
    {
      name: '',
      itemStyle: {
        color: '#f40',
      },
      data: [[]],
    },
  ]
}

const updateChart = () => {
  // option.value.title.text = props.title
}

// const setupTheme = () => {

// }

watch(
  () => option,
  () => {
    console.log('option changed')
  }
)

onMounted(() => {
  console.log('mounted')
})
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
