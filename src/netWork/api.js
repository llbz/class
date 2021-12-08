import {post, get} from "./http";

export const login = p => post('/class/login' ,p)
export const submitVertification = s => post('/class/joinClass', s)
export const requireVertification = r => post('/class/createClass', r)
export const requireClassStudent = rc => get('/class/searchStudents', rc)
export const startClass = sc => post('/tim/createGroup', sc)
export const studentStartClass = ssc => get('/class/searchGroupState', ssc)
export const cancelClass = cc => post('/class/deleteClass', cc)
export const validateToken = vt => get('/class/testToken',vt)
export const submitAnswer = sa => post('/class/submitAnswer', sa)
export const requireAnsweredNumber = ran => get('/class/searchAnswerState', ran)