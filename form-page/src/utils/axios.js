import Axios from "axios";

const axios = Axios.create()

const serverUrl = 'http://localhost:8088'

export const baseURL = `${serverUrl}`

axios.defaults.timeout = 120000

axios.interceptors.request.use(
    function (config) {
        const token = ''

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }

        if (!config.headers?.['Content-Type'] && !(config.data instanceof FormData)) {
            config.headers["Content-Type"] = "application/json";
        }

        config.credentials = "same-origin"
        config.baseURL = baseURL

        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (res) => {
        return res
    },
    (error) => {
        if (error?.response?.status === 403) {
            console.warn('Access forbidded');
        }
        if (error?.response?.status === 401) {
            console.warn('Unauthorized ')
        }
        throw error
    }
)

export default axios;