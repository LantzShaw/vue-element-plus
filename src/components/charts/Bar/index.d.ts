import { SeriesOption } from 'echarts/types/dist/shared'

export interface ThemeColor {
  backgroundColor: string
  textColor: string
}

export type ThemeMode = 'light' | 'dark' // 字符串字面量类型

export interface Props {
  title?: string
  isLoading?: boolean
  themeColor?: ThemeColor
  themeMode?: ThemeMode
  legendData?: (string | number)[]
  xAxisData?: (string | number)[]
  series?: SeriesOption[]
  seriesData?: (string | number)[] | (number | number[])[]
  seriesColor?: (number | string)[][] // Array<Array<number | string>>
}
