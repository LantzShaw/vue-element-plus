import HttpClient from './httpClient'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const http = new HttpClient({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // 是否有证书，
  timeout: 30000,
})

export default http
