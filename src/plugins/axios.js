import axios from 'axios'
import Cookie from 'js-cookie'

const instance = axios.create()
instance.defaults.baseURL = process.env.API_ENDPOINT
instance.defaults.headers.common['Accept'] = 'application/json'
instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

// Interceptors
instance.interceptors.request.use((config) => {
  if (Cookie.get('access_token')) {
    config.headers['Authorization'] = `Bearer ${Cookie.get('access_token')}`
  }
  return config
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Do something with response error
    // let { status } = error.response
    // let { data } = error.response

    return Promise.reject(error)
  }
)

export default instance
