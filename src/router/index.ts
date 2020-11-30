import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes, asyncRoutes } from './router'

Vue.use(Router)

const defaultRouter = constantRoutes.concat(asyncRoutes)

const createRouter = () =>
    new Router({
        scrollBehavior: () => {
        	y: 0
        },
        routes: constantRoutes,
        mode: 'history'
    })
const router: any = createRouter()

export function resetRouter() {
	const newRouter: any = createRouter()
	router.matcher = newRouter.matcher // 重置 router
}

const originalPush = Router.prototype.push

export { constantRoutes, asyncRoutes }

export default router