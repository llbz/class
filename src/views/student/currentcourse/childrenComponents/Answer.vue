<template>
<div id="Answer">
  <top-nav :title="title"/>
    <div class="answer-content">
       <div class="left-subject">
          <div class="subject-center">
               <iframe name="widgetIFrame"
                       ref="widgetIframe"
                       id="widgetIFrame"
                       frameborder="0"
                       allow="payment;camera;microphone"
                       :src= 'mySrc'
                       scrolling="no"
               />
          </div>
       </div>
       <div class="right-im">
       <im-main v-if="isIm"/>
         <div class="mask" v-else> 暂不可用</div>
<!--      <div  class="imMask" v-if="isMessageMask || isTextMask">
        <div class="messageMask" v-show="isMessageMask">
          <p>暂不可用</p>
        </div>
        <div class="textMask" v-if="isTextMask">
          <p>暂不可用</p>
        </div>
      </div>-->
    </div>
    </div>
</div>

</template>

<script>
import TopNav from "../../../../components/common/TopNav";
import imMain from "./im/imMain";
import {IM} from "./im/store";
import {submitAnswer, requireAnsweredNumber} from "../../../../netWork/api";
import {sendMessage} from "./IframeAnswerCommunication";
//import subject from "./subject/subject";

export default {
  name: "Answer",
  data() {
    return {
      title: this.$store.state.student.currentCourse.taskTheme,
      //控制IM是否可用
     // isIm: this.$store.state.isIm,
      //控制IM接受消息框上层的遮罩
      isMessageMask: false,
      //控制IM输入消息框上层的遮罩
      isTextMask: false,
      //昵称
      nickname: this.$store.state.nickname,
      mySrc: " http://210.45.123.127:8081",
     // mySrc: "http://10.0.1.71:8081",
      questionIndex: '1',
      groupLength: this.$store.state.groupLength,
      endAnswer: false
    }
  },
  components: {
    TopNav,
    imMain,
    // subject
  },
  created() {
    this.$EventBus.$emit('modifyIsTabControl', false)
  },
  computed:{
    isIm(){
      return this.$store.state.isIm;
    }
  },
  methods: {
   /* IMStart(payload){
     // IM.startAnswer = true;
      //this.isIm = true;
      this.$store.commit('setIsIm', payload);
    },
    setIsMessageMask(payload){
      this.$store.commit('setIsMessageMask', payload);
    },
    setIsTextMask(payload){
      this.$store.commit('setIsTextMask', payload);
    },*/
    interval(){
        var interval1 = setInterval(() => {
          if(!this.$store.state.endAnswer) {
            console.log(this.questionIndex);
            requireAnsweredNumber({
              groupID: this.$store.state.groupID,
              questionIndex: this.questionIndex
            })
                .then((res) => {
                  console.log(res);
                  let iFrame = document.getElementById('widgetIFrame')
                  iFrame.contentWindow.postMessage({'number': res.count, 'questionIndex': res.questionIndex}, '*');
                })
          }
          else{
              console.log('999999999999999');
              clearInterval(interval1);
            }

        }, 500)

    },
    /*sendMessages(w) {
      w.contentWindow.postMessage({'nickname': this.nickname, 'groupLength': this.groupLength}, '*');
    },*/
    accept(e) {
      //console.log('11111');
      console.log(e);
      if(e.data.questionIndex){
        console.log('5555555555555555555');
        this.questionIndex = String(e.data.questionIndex)
        console.log(this.questionIndex);
      }
      if (e.data.startAnswer) {
        IM.startAnswer = e.data.startAnswer;
        //this.isMessageMask = false;
       // this.isIm = true;
       // this.IMStart(true);
        //this.setIsMessageMask(true);
        IM.setIsIm(true);
        IM.setIsMessageMask(true);
      }
      if(e.data.firstSubmit){
        console.log(e);
       //this.isTextMask = false;
        //this.setIsTextMask(true);
        IM.setIsTextMask(true);
        this.questionIndex = e.data.questionIndex;
        submitAnswer({ myID: this.$store.state.user.id,
          groupID: this.$store.state.groupID ,
          questionIndex: e.data.questionIndex,
          myAnswer: e.data.myAnswer,
      })
        .then( () => {
          let iFrame = document.getElementById('widgetIFrame')
          iFrame.contentWindow.postMessage({submit: 'success'}, '*')
        })
      }
      if(e.data.submit){
        submitAnswer({ myID: this.$store.state.user.id,
          groupID: this.$store.state.groupID ,
          questionIndex: e.data.questionIndex,
          myAnswer: e.data.myAnswer
        })
      }
      if(e.data.endAnswer){
        setTimeout(() =>{
          this.$EventBus.$emit('modifyIsTabControl', true);
          //this.$store.commit('setVertification', true);
          this.$store.commit('modify_isVerification', true);
          this.$store.commit('setEndAnswer', e.data.endAnswer);
          //window.localStorage.setItem('isVertification', 'true');
          this.$store.commit('setIsTabControl', true);
          //this.$router.push('historycourse');
          window.location.replace('/student/current');
        },4000)
        console.log('88888888888888888888');
          this.$toast.show({
            isShow: true,
            isShow2: true,
            message2: '您已经答完所有课程，将返回到历史课程，之后您可以通过历史课程查看您的答题情况。',
            duration: 3000
          })
      }
     /* if(e.data.isNext){
        console.log('1111111111111');
        this.questionIndex =  String(Number(this.questionIndex) + 1);
        console.log(this.questionIndex);
      }*/
    }
  },
  mounted() {
    let that = this;
//获取iframe元素
    let iFrame = document.getElementById('widgetIFrame')
//iframe加载完毕后再发送消息，否则子页面接收不到message

    //iframe加载完立即发送一条消息
    iFrame.onload = function () {
      //that.sendMessages(iFrame);
      console.log(that.nickname);
      console.log(that.groupLength);
      sendMessage({contentWindow: iFrame.contentWindow, data:{'nickname': that.nickname, 'groupLength': that.groupLength}})
      /*setInterval(() => {
        //console.log(that.questionIndex);
        requireAnsweredNumber({
          groupID: that.$store.state.groupID,
          questionIndex: that.questionIndex
        })
            .then((res) => {
              let iFrame = document.getElementById('widgetIFrame')
             // console.log(res);
              iFrame.contentWindow.postMessage({'number': res.count, 'questionIndex': res.questionIndex}, '*');
            })

      }, 10000)*/
      that.interval();
      //window.addEventListener('message', this.accept, false);
      window.onmessage = function(e) {
        that.accept(e);
        // code
      }

    }
  }
}
</script>

<style scoped>
#Answer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.answer-content{
  display: flex;
  flex: 1;
  position: absolute;
  width:calc(100% - 230px);
  height: calc(100% - 50px - 24px - 60px);
  top: 50%;
  left: 50%;
  margin-top: 40px;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(0,0,0,0.06);
  box-shadow: 0 3px 9px 0 rgba(0,0,0,0.04);
  border-radius: 9px;

}
.left-subject{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 776px;
  height: 100%;
  background: #FFFFFF;
  border: 2px solid rgba(0,0,0,0.06);
  box-shadow: 0 3px 9px 0 rgba(0,0,0,0.04);
  border-radius: 9px;
  margin-right: 20px;
}
.right-im{
  position: relative;
  flex: 1;
  height: 100%;
  background: #FFFFFF;
  border: 2px solid rgba(0,0,0,0.06);
  box-shadow: 0 3px 9px 0 rgba(0,0,0,0.04);
  border-radius: 9px;
}
.right-im .mask{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 20px;


}
.right-im .imMask{
  position: absolute;
  right: 0;
  top: 0;


}
.imMask .messageMask{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 150px);
  background-color: #fff;
  border-bottom: 1px solid rgba(103, 101, 101, 0.1);
}
.imMask .textMask{
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: #fff;
  text-align: center;
  border-top: 1px solid rgba(103, 101, 101, 0.1);

}
.right-im .imMask p{
  font-family: PingFangSC-Medium;
  font-size: 15px;
  color: #100f0f;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
}

.subject-center{
  flex: 1;
}
iframe{
  width: 100%;
  height: 100%;
}
</style>