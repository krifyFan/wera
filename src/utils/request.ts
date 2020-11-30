import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 创建axios实例
const service = axios.create({
    baseURL: '/api',
    // timeout: 5000, // request timeout
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})
// request拦截器
service.interceptors.request.use(
    (config: any) => {
        store.commit('GET_TOKEN')
        if (store.state.user.token) {
            let Authorization = 'Authorization'
            config.headers.common[Authorization] = store.state.user.token
        }
        return config
    },
    (error: any) => {
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    (response: any) => {
        const res: any = response.data
        if (response.status !== 200) {
            console.log(response.status)
        } else {
            if (res.code === 20011 || res.data === 500) {
                store.dispatch('logout').then(() => {
                    location.reload();
                });
                router.push({
                    path: '/login'
                })
            } else {
                return response
            }
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default service