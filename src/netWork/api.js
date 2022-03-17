import {post, get} from "./http";

export const login = p => post('/class/login' ,p)
export const submitVertification = s => post('/class/joinClass', s)
export const requireVertification = r => post('/class/createClass', r)
export const requireClassStudent = rc => get('/class/searchStudents', rc)
export const startClass = sc => post('/class/createGroups', sc)
export const studentStartClass = ssc => get('/class/searchGroupState', ssc)
export const cancelClass = cc => post('/class/deleteClass', cc)
export const validateToken = vt => get('/class/testToken',vt)
export const submitAnswer = sa => post('/class/submitAnswer', sa)
export const requireAnsweredNumber = ran => get('/class/searchAnswerState', ran)
export const teamStartClass = tsc => post('/class/createOneGroup', tsc)
export const getTeamsState = gtc => get('/class/getGroupsState', gtc)
export const endAnswer = ea => post('/class/endAnswer', ea)
//结束单组课程
export const endGroup = eg => post('/class/endGroup', eg)
//结束全部课程
export const endClass = ec => post("/class/endClass", ec)
//请求历史课程
export const getHistoryClass = ghc => get('/class/getHistoryClassInfo', ghc)
//请求课程iframe的链接
export const GetTaskWidget = gwt => get('/class/getTaskWidget', gwt)

export const getMsgVerifyCode = gmv => post('/user/getMsgVerifyCode', gmv)


export const verifyMsgCode = vmc => post('/user/verifyMsgCode', vmc)

export const getCaptcha = gc => post('/user/getCaptcha', gc)

export const verifyCaptcha = vc => post('/user/verifyCaptcha', vc)

export const  modifyOriginalPassword = mop => post('/user/modifyOriginalPassword', mop)

export const teacherNormalLogin = tnl => post('/user/teacherNormalLogin', tnl)

export const studentNormalLogin = snl => post('/user/studentNormalLogin', snl)

