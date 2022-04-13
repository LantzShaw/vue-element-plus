import type { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios'
import type { RequestOptions, Result } from '@/types/http'
import type { Recordable } from '@/src/typings'
import { RESULT, REQUEST } from '@/constants/http'
import { isString } from '@/utils/is'
import { checkStatus } from './httpCheckStatus'
import HttpRetry from './httpRetry'
import { formatRequestDate, joinTimestamp, setObjToUrlParams } from './helpers'

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  transform?: HttpTransform
  requestOptions?: RequestOptions
}

export default class HttpTransform {
  transformRequest(res: AxiosResponse<Result>, options: RequestOptions) {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    // 错误的时候返回

    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('sys.api.apiRequestFailed')
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, result, message } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === RESULT.SUCCESS
    if (hasSuccess) {
      return result
    }

    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    let timeoutMsg = ''
    switch (code) {
      case RESULT.TIMEOUT:
        // timeoutMsg = t('sys.api.timeoutMessage')
        // const userStore = useUserStoreWithOut()
        // userStore.setToken(undefined)
        // userStore.logout(true)
        break
      default:
        if (message) {
          timeoutMsg = message
        }
    }

    // errorMessageMode=‘modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      //   createErrorModal({ title: 'sys.api.errorTip', content: timeoutMsg })
    } else if (options.errorMessageMode === 'message') {
      //   createMessage.error(timeoutMsg)
    }

    throw new Error(timeoutMsg || 'sys.api.apiRequestFailed')
  }

  // 请求之前处理config
  beforeRequest(config: AxiosRequestConfig, options: RequestOptions) {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === REQUEST.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  }

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors(config: AxiosRequestConfig, options: CreateAxiosOptions) {
    // 请求之前处理config
    // const token = getToken()
    const token = ''

    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      // jwt token
      ;(config as Recordable).headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    return config
  }

  /**
   * @description: 请求失败处理
   */
  requestCatch(e: Error, options: RequestOptions) {
    return Promise.reject(e)
  }

  requestInterceptorsCatch(error: any, options: CreateAxiosOptions) {
    // 请求拦截器处理
    // const { createErrorModal } = useCreateModal()
    // const { t } = useTranslation()
    // const { errorMessageMode } = options
    // if (errorMessageMode === 'modal') {
    //   createErrorModal({ title: 'sys.api.errorTip', content: error.message })
    // } else if (errorMessageMode === 'message') {
    //   createMessage.error(t('sys.api.errorTip'))
    // }
    return Promise.reject(error)
  }

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors(res: AxiosResponse<any>) {
    return res
  }

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch(axiosInstance: AxiosInstance, error: any) {
    const { response, code, message, config } = error || {}
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none'
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = 'sys.api.apiTimeoutMessage'
      }
      if (err?.includes('Network Error')) {
        errMessage = 'sys.api.networkExceptionMsg'
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          //   createErrorModal({ title: t('sys.api.errorTip'), content: errMessage })
        } else if (errorMessageMode === 'message') {
          //   createMessage.error(errMessage)
        }
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }

    checkStatus(error?.response?.status, msg, errorMessageMode)

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new HttpRetry()
    const { isOpenRetry } = config.requestOptions.retryRequest
    config.method?.toUpperCase() === REQUEST.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error)
    return Promise.reject(error)
  }
}
