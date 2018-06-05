import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
    {
        path: '/auth/register',
        name: 'Register',
        component:()=> import('@/views/auth/Register')
    },
    // 首页路由配置
    {
        path: '/',
        name: 'Home',
        component:()=> import('@/views/Home')
    },
    // 其他未配置的路由都跳转到首页
    {
        path: '*',
        // 重定向
        redirect: '/'
    }
]

const router = new Router({
    mode: 'history',
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 使用 router.app 可以获取 router 对应的 Vue 根实例，使用实例的 $options.store 可以从选项中访问仓库；
    const auth = router.app.$options.store.state.auth

    if (auth && to.path.indexOf('/auth/') != -1) {
        next('/')
    } else {
        next()
    }
})

export default router