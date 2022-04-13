// import axios, { AxiosResponse, AxiosRequestConfig, AxiosInstance, AxiosPromise } from 'axios'
import type { AxiosResponse, AxiosRequestConfig, AxiosInstance } from 'axios'
import axios, { AxiosError } from 'axios'
import { cloneDeep } from 'lodash-es'
import qs from 'qs'
import HttpCanceler from './httpCancel'
import HttpTransform, { CreateAxiosOptions } from './httpTransform'
import { RequestOptions, Result, UploadFileParams } from '@/types/http'
import { CONTENT_TYPE, REQUEST } from '@/constants/http'

export default class HttpClient {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.axiosInstance = axios.create(options)
    this.options = options

    this.setInterceptors()
  }

  // private createAxios(): void {
  //   this.axiosInstance = axios.create(this.options)
  // }

  private setInterceptors(): void {
    const httpTransform = new HttpTransform()
    const httpCanceler = new HttpCanceler()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      // @ts-ignore
      const { ignoreCancelToken } = config.requestOptions
      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && httpCanceler.addPending(config)
      // if (httpTransform.requestInterceptors && isFunction(requestInterceptors)) {
      //   config = requestInterceptors(config, this.options)
      // }

      config = httpTransform.requestInterceptors(config, this.options)
      return config
    }, undefined)

    // Request interceptor error capture
    // requestInterceptorsCatch &&
    //   isFunction(requestInterceptorsCatch) &&
    this.axiosInstance.interceptors.request.use(undefined, error => {
      httpTransform.requestInterceptorsCatch(error, this.options)
    })

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      // res && httpCanceler.removePending(res.config)
      // if (httpTransform.responseInterceptors && isFunction(responseInterceptors)) {
      //   res = responseInterceptors(res)
      // }

      res = httpTransform.responseInterceptors(res)

      return res
    }, undefined)

    // Response result interceptor error capture
    // responseInterceptorsCatch &&
    //   isFunction(responseInterceptorsCatch) &&
    this.axiosInstance.interceptors.response.use(undefined, error => {
      httpTransform.responseInterceptorsCatch(this.axiosInstance, error)
    })
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach(key => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': CONTENT_TYPE.FORM_DATA,
        // @ts-ignore
        ignoreCancelToken: true,
      },
    })
  }

  // support form-data
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== CONTENT_TYPE.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === REQUEST.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const httpTransform = new HttpTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    conf = httpTransform.beforeRequest(conf, opt)

    conf.requestOptions = opt

    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // if (transformRequestHook && isFunction(transformRequestHook)) {
          try {
            const ret = httpTransform.transformRequest(res, opt)
            resolve(ret)
          } catch (err) {
            reject(err || new Error('request error!'))
          }
          return
          // }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          // if (requestCatch && isFunction(requestCatchHook)) {
          reject(httpTransform.requestCatch(e, opt))
          return
          // }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e)
        })
    })
  }
}
