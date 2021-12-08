import {IM} from "./im/store";
import {submitAnswer} from "../../../../netWork/api";

function sendMessage(payload){
    payload.contentWindow.postMessage(payload.data, '*')
}
function acceptMessage(payload){
    console.log(payload);
    if(payload.data.questionIndex){
        console.log('5555555555555555555');
        this.questionIndex = String(payload.data.questionIndex)
        console.log(this.questionIndex);
    }
    if (payload.data.startAnswer) {
        IM.startAnswer = payload.data.startAnswer;
        //this.isMessageMask = false;
        // this.isIm = true;
        // this.IMStart(true);
        //this.setIsMessageMask(true);
        IM.setIsIm(true);
        IM.setIsMessageMask(true);
    }
    if(payload.data.firstSubmit){
        //this.isTextMask = false;
        //this.setIsTextMask(true);
        IM.setIsTextMask(true);
        this.questionIndex = payload.data.questionIndex;
        submitAnswer({ myID: this.$store.state.user.id,
            groupID: this.$store.state.groupID ,
            questionIndex: payload.data.questionIndex,
            myAnswer: payload.data.myAnswer,
        })
            .then( () => {
                let iFrame = document.getElementById('widgetIFrame');
                sendMessage({contentWindow: iFrame.contentWindow, data: {submit: 'success'}})
                //iFrame.contentWindow.postMessage({submit: 'success'}, '*')
            })
    }
    if(payload.data.submit){
        submitAnswer({ myID: this.$store.state.user.id,
            groupID: this.$store.state.groupID ,
            questionIndex: payload.data.questionIndex,
            myAnswer: payload.data.myAnswer
        })
    }
    if(payload.endAnswer){
        console.log('88888888888888888888');
        this.$EventBus.$emit('modifyIsTabControl', true);
        this.$store.commit('setVertification', true);
        this.$store.commit('setEndAnswer', payload.data.endAnswer);
        window.localStorage.setItem('isVertification', 'true');
        this.$store.commit('setIsTabControl', true);
        this.$toast.show({
            isShow: true,
            isShow2: true,
            message2: '您已经答完所有课程，将返回到历史课程，之后您可以通过历史课程查看您的答题情况。',
            duration: 3000
        })

        this.$router.push('historycourse');
    }
}

export {sendMessage, acceptMessage}