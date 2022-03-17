//import {IM} from "../views/student/currentcourse/childrenComponents/im/store";

export default {
    modify_isVerification(state, payload){
        state.isVerification = payload;
        localStorage.setItem('isVerification', payload)
    },
    setVertification(state,payload){
      this.state.teacher.vertification = payload.classInviteCode;
      this.state.classId = payload.classID;
      localStorage.setItem('classId', payload.classID);
    },
    setGroupID(state, payload){
        state.groupID = payload
    },
    setCurrentCourse(state, payload){
      state.student.currentCourse = payload.taskInfo;
      state.student.currentCourse.classInviteCode = payload.classInviteCode;
      state.classId = payload.classID;
      /*let temp = JSON.parse(localStorage.getItem('student'));
      temp.currentCourse = payload.taskInfo;
      temp.currentCourse.classInviteCode = payload.classInviteCode;
      localStorage.setItem('student', JSON.stringify(temp));
      localStorage.setItem('classId', payload.taskInfo);*/
    },
    setIsCompleteTeamFormation(state, payload){
        state.isCompleteTeamFormation = payload;
    },
    teacherLoginSuccess(state, payload){
        state.user = payload.myInfo;
        state.token = payload.token;
        state.teacher.user = payload.myInfo;
        state.teacher.class = payload.tasksInfo;
        state.teacher.historyCourse = payload.myHistoryClassInfo;
        window.localStorage.setItem('token', JSON.stringify(payload.token));
    },
    studentLoginSuccess(state, payload){
        state.user = payload.myInfo;
        state.token = payload.token;
        state.student.im.user = payload.myInfo;
        state.student.historyCourse = payload.myHistoryClassInfo;
        window.localStorage.setItem('token', JSON.stringify(payload.token));
    },
    addMessage(state, payload){
      this.state.student.im.messages.push(payload)
    },
    setIndex(state, index){
        this.state.index = index;
        localStorage.setItem('index', index)
    },
    setIsClass(state, payload){
        state.isClass = payload
        window.localStorage.setItem('isClass', JSON.stringify(payload));
    },
    setState(state) {
        state.userInfo =  window.localStorage.getItem('userInfo')
            ? JSON.parse(window.localStorage.getItem('userInfo'))
            : {};
        state.user = {};
        state.token =  window.localStorage.getItem('token')
            ? JSON.parse(window.localStorage.getItem('token'))
            : '';
        state.isVerification =  window.localStorage.getItem('isVerification')
            ? JSON.parse(window.localStorage.getItem('isVerification'))
            : true;
        state.isCompleteTeamFormation = false;
        state.isClass = false;
        state.isTabControl = false;
        state.isClass = false;
        state.index = 0;
        state.isLogin = window.localStorage.getItem('isLogin')
            ? JSON.parse(window.localStorage.getItem('isLogin'))
            : '';
        state.student = {
            im: {},
            historyCourse: [],
            currentCourse: [],
        }
        state.teacher = {
            vertification: '',
            user: {},
            class: [],
            historyCourse: [],
        }
    },
    setGroup(state, payload){
        this.state.student.group = payload
    },
    setNickname(state, payload){
        state.nickname = payload.nickName
    },
    setGroupLength(state, payload){
        state.groupLength = payload
    },
    setIsTabControl(state, payload){
      state.isTabControl = payload
    },
    setEndAnswer(state, payload) {
        state.endAnswer = payload
    },
    setIsIm(state,payload){
        state.isIm = payload
    },
    setIsMessageMask (state,payload){
        state.isMessageMask = payload
    },
    setIsTextMask (state,payload){
        state.isTextMask = payload
    },
    setIsRequireClassStudent(state, payload){
        state.isRequireClassStudent = payload;
    },
    setRangeNumber(state, payload){
        state.numberCourse = {number: payload.taskMinMemberNum, count: payload.taskMemberNumRange};
    }

}