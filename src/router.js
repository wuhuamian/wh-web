import Vue from 'vue';
import VueRouter from 'vue-router';
import iView from 'iview';
import Util from './libs/util';

Vue.use(VueRouter);

const routers = [
	{
	    path: '/',
	    meta: {
	        title: ''
	    },
	    component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
	    path: '/index',
	    meta: {
	        title: ''
	    },
	    component: (resolve) => require(['./views/index.vue'], resolve)
	},
	{
	    path: '/test',
	    meta: {
	        title: 'test'
	    },
	    component: (resolve) => require(['./views/test.vue'], resolve)
	},
	{
	    path: '/base',
	    meta: {
	        title: 'base',
	        requiresAuth: true
	    },
	    component: (resolve) => require(['./views/base/base.vue'], resolve),
	    children: [
	    	{
	    		path: 'test1',
                name: 'test1',
                component: (resolve) => require(['./views/test/test1.vue'], resolve),
                meta: {
                    title:"test1"
                }
	    	},
	    	{
	    		path: 'test2',
                name: 'test2',
                component: (resolve) => require(['./views/test/test2.vue'], resolve),
                meta: {
                    title:"test2"
                }
	    	},
	    	{
	    		path: 'test3',
                name: 'test3',
                component: (resolve) => require(['./views/test/test3.vue'], resolve),
                meta: {
                    title:"test3"
                }
	    	},
	    	{
	    		path: 'test4',
                name: 'test4',
                component: (resolve) => require(['./views/test/test4.vue'], resolve),
                meta: {
                    title:"test4"
                }
	    	},
	    	{
	    		path: 'test5',
                name: 'test5',
                component: (resolve) => require(['./views/test/test5.vue'], resolve),
                meta: {
                    title:"test5"
                }
	    	},
	    	{
	    		path: 'test6',
                name: 'test6',
                component: (resolve) => require(['./views/test/test6.vue'], resolve),
                meta: {
                    title:"test6"
                }
	    	},
	    ]
	}
];

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    let token = window.localStorage.getItem('currentUser_token')
    if (to.matched.some(record => record.meta.requiresAuth) && (!token || token === null)) {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router;