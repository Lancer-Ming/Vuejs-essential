import Vue from 'vue'
import Router from 'vue-router'
// 引入 ./routes.js 的默认值
import routes from './routes'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkExactActiveClass: 'active',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 使用 router.app 可以获取 router 对应的 Vue 根实例，使用实例的 $options.store 可以从选项中访问仓库；
    const auth = router.app.$options.store.state.auth

    if ((auth && to.path.indexOf('/auth/') != -1) || (!auth && to.meta.auth)) {
        next('/')
    } else {
        next()
    }
})

export default router