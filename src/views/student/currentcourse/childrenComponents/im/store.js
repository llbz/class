import store from '../../../../../store/index';
export const IM ={
    user: {},
    messages: [],
    control:[],
    isIm: false,
    //控制IM接受消息框上层的遮罩
    isMessageMask: false,
    //控制IM输入消息框上层的遮罩
    isTextMask: false,

}
IM.loginSuccess = function(payload){
    IM.user = payload.myInfo;
}

IM.addMessage = function (payload){
    IM.messages.push(payload)
}

IM.messagesLength = function(){
    return IM.messages.length
}
IM.setControl = function (payload){
    IM.control.push(payload)
}
IM.setIsIm = function(payload){
    IM.isIm = payload;
    store.commit('setIsIm', payload);
}
IM.setIsMessageMask = function(payload){
    IM.isMessageMask = payload;
    store.commit('setIsMessageMask', payload);
}
IM.setIsTextMask = function(payload){
    IM.isTextMask = payload;
    store.commit('setIsTextMask', payload);
}
