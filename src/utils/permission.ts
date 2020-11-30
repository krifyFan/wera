///<reference path='../variable.d.ts'/>
import router from '@/router/index'
import store from '../store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Route } from 'vue-router';

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList: string[] = ['/login'] // no redirect 的白名单

const permission = async() => {
    router.beforeEach(async(to: Route, from: Route, next: any) => {
        NProgress.start()
        // 确定用户是否登录
		store.commit('GET_TOKEN')
        const hasToken = store.state.user.token
        // 是否有token
        if (hasToken) {
            // 如果有token并且要进登录页面，直接定位到首页
            if (to.path === '/login') {
                next('/um/overview/info')
                NProgress.done()
            } else {
                //确定用户是否已通过getInfo获得其权限角色
                const hasRoles:boolean = store.getters.name && store.getters.name.length > 0
                if (hasRoles) {
                    next()
                } else {
                    try {
                        // 获取用户信息
                        const data = await store.dispatch('getInfo')
                        // 生成动态路由
                        const accessRoutes: any[] = await store.dispatch('generateRoutes', data)
                        router.addRoutes(accessRoutes)
                        next({ ...to, replace: true })
                    } catch (error) {
                        // remove token and go to login page to re-login
                        await store.commit('REMOVE_TOKEN')
                        next(`/login`)
                        NProgress.done()
                    }
                }
            }
        } else {
            if (whiteList.indexOf(to.path) !== -1) {
                // 白名单内 直接进入
                next()
            } else {
                // 没有访问权限的其他页将重定向到登录页。
                next(`/login`)
                NProgress.done()
            }
        }
        // 判断是否需要权限验证
        // if (to.meta.requireAuth) { 
        // }
    })

    router.afterEach(() => {
		NProgress.done()
	})
}

export {
    permission
} 