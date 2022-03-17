import Vue from 'vue'
import VueRouter from 'vue-router'
//import {validateToken} from "../netWork/api";

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//const Login = () => import('../components/common/Login')
const CurrentCourse = () =>import('../views/teacher/currentcourse/CurrentCourse')
const Main = () => import('../views/Main')
const HistoryCourseItem = () => import("../views/teacher/historycourse/HistoryCourseItem")
//const HistoryCourse = () => import("../views/teacher/historycourse/historyCourse")
const Class = () => import("../views/teacher/currentcourse/class/Class")
const Profile = () => import('../views/teacher/profile/Profile')

const SCurrentCourse = () =>import('../views/student/currentcourse/SCurrentCourse')
const SHistoryCourse = () =>import('../views/student/historycourse/SHistoryCourse')
const SProfile = () =>import('../views/student/profile/SProfile')
const Answer = () =>import('../views/student/currentcourse/childrenComponents/Answer')
const HistoryCourseList = () => import("../views/teacher/historycourse/historyCourseList")
const Monitor = () => import("../views/teacher/currentcourse/class/Monitor")
const  Login1 = () => import("../components/common/Login_student")
const  Login2 = () => import("../components/common/login_teacher")
const  Login3 = () => import("../components/common/login_account")
const setpassword = () => import('../components/common/setPassword')

/*const Smain = () => import('../views/student/Smain')*/

Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/login_student'
    },
    {
        path: '/login_student',
        component: Login1,
    },
    {
        path: '/login_teacher',
        component: Login2,
    },
    {
        path: '/login_account',
        component: Login3,
    },
    {
        path: '/setpassword',
        component: setpassword,
    },

    {
        path: '/teacher',
        name: 'teacher',
        redirect: '/teacher/current',
        component: Main,
        meta:{
            requireAuth: true,
        },
        children:[
            /*{
                path: '/teacher/userId',
                redirect: '/teacher/current',
            },*/
            {
                path: '/teacher/current',
                component: CurrentCourse,

            },
            {
                path: '/teacher/historycourse',
                redirect: '/teacher/historycourselist',
                component: HistoryCourseList,
            },
            {
                path: '/teacher/historycourselist',
                component: HistoryCourseList,
            },
            {
                path: '/teacher/historycourseItem',
                component: HistoryCourseItem,
            },
            {
                path: '/teacher/profile',
                component: Profile,
            },
            {
                path:'/teacher/class',
                component: Class,
            },
            {
                path: '/monitor',
                component: Monitor,
            }

        ]
    },
    {
        path: '/student',
        name: 'student',
        redirect: '/student/current',
        component: Main,
        meta:{
            requireAuth: true,
        },
        children:[
            /*{
                path: '/teacher/userId',
                redirect: '/teacher/current',
            },*/
            {
                path: '/student/current',
                component: SCurrentCourse,
                children:[
                    {
                        path:'/answer',
                        component: Answer,
                    }
                ]
            },
            {
                path: '/student/historycourse',
                component: SHistoryCourse,
            },
            {
                path: '/student/profile',
                component: SProfile,
            },

        ]
    },


]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

// 路由判断登录 根据路由配置文件的参数
/*router.beforeEach((to, from, next) => {
    // 判断该路由是否需要登录权限
    if (to.matched.some(record => record.meta.requireAuth)){

        if (localStorage.token) {
            // 判断当前的token是否存在 ； 登录存入的token
            validateToken({token : localStorage.token})
                .then( (res) => {
                    if( res){
                        next();
                    }
                    else{
                        next({
                            path: '/login',
                            // 将跳转的路由path作为参数，登录成功后跳转到该路由
                            query: {redirect: to.fullPath}
                        })
                    }

                })
        }
        else {
            console.log('需要登录');
            next({
                path: '/login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
});*/

export default router
