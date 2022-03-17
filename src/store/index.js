import Vue from 'vue';
import Vuex from 'vuex';

import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
/*    iid: teacher,*/
    token: window.localStorage.getItem('token')
        ? JSON.parse(window.localStorage.getItem('token'))
        : '',
    //是否登录
    isLogin: window.localStorage.getItem('isLogin')
        ? JSON.parse(window.localStorage.getItem('isLogin'))
        : false,
    //个人信息
    userInfo: window.localStorage.getItem('userInfo')
        ? JSON.parse(window.localStorage.getItem('userInfo'))
        : {},
    //是否需要输入邀请码
    isVerification: window.localStorage.getItem('isVerification')
        ? JSON.parse(window.localStorage.getItem('isVerification'))
        : true,
    classId: window.localStorage.getItem('classId')

        ? window.localStorage.getItem('classId')
        : '',
    nickname: '',
    //标识是否输入过邀请码,是否出现邀请码页面

    //标识是否完成了组队
    isCompleteTeamFormation: false,
    //标识是否需要底部的控制导航按钮
    isTabControl: true,
    //标识教师端是否在组建班级页面
    isClass: window.localStorage.getItem('isClass')
        ? JSON.parse(window.localStorage.getItem('isClass'))
        : false,
    //
    index:window.localStorage.getItem('index')
        ? JSON.parse(window.localStorage.getItem('index'))
        : 0,
    groupID:'',
    groupLength: 0,
    endAnswer: false,
    isIm: false,
    isMessageMask: false,
    isTextMask: false,
    isRequireClassStudent: true,
    //用户信息
    user:{

    },

    //学生端
    student:{
        //学生组别
        group:'',
        im:{
            user:{
                age: " ",
                gender: " ",
                headImgURL: "",
                id: " ",
                name: " ",
                password: " ",
                role: " ",

            },
            messages: [

            ]
        },
        historyCourse: [],
        currentCourse: [],
    },
    //教师端
    teacher:{
        vertification: '',
        user:{},
        class:[],
        historyCourse: [],
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})