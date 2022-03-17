<template>
  <div id="waiting">
      <top-nav :title="title"/>
      <main-content>
        <aside class="left">
          <img src="#" alt="">
          <h4>{{title}}</h4>
          <div class="v"><span>邀请码</span> <span>{{ classInviteCode }}</span></div>
          <div class="left-bottom">
            <div class="left-bottom-left">
              <p>课程状态</p>
              <p v-if="!this.$store.state.isCompleteTeamFormation">等待老师组队中...</p>
              <p v-else> 00 : {{countdown}}</p>
            </div>
            <button v-if="isAnswer" @click="goAnswer">去答题</button>
          </div>
        </aside>
        <aside class="right">
          <h3>课程简介</h3>
          <p>{{taskIntro}}</p>
          <h3>视频介绍</h3>
          <div class="video">
            <div class="video-left">
              <video src=""></video>
              <p>视频标题</p>
            </div>
            <div class="video-right">
              <video src=""></video>
              <p>视频标题</p>
            </div>
          </div>
        </aside>
      </main-content>
    </div>

</template>

<script>
import TopNav from "../../../../components/common/TopNav";
import MainContent from "../../../../components/common/MainContent";

import {studentStartClass} from "../../../../netWork/api";




export default {
  name: "Waiting",
  data() {
    return {
      message: '当前课程',
      /*是否显示去答题按钮，默认为false，不显示*/
      isAnswer: false,
      countdown: 0,
      isRequireClassStudent: true,

    }
  },
  components: {
    TopNav,
    MainContent,
  },
  watch: {
    //监测store中isCompleteTeamFormation的值是否变化
    "$store.state.isCompleteTeamFormation": {
      handler: function () {
        if (this.$store.state.isCompleteTeamFormation) {
          this.$emit('isMask');
          this.startCountdown();
          this.$toast.show({
            isShow: true,
            isShow1: true,
            message1: '组队完成，距离答题还有十秒钟',
            duration: 10000,
            sure: 2
          })
        }
      }
    },
  },
  computed: {
    currentCourse() {
      if(this.$store.state.student.currentCourse){
        return this.$store.state.student.currentCourse
      }
     else{
       return  JSON.parse(localStorage.getItem('student')).currentCourse
      }
    },
    title() {
      return this.currentCourse.taskTheme
    },
    taskIntro() {
      return this.currentCourse.taskIntro
    },
    classInviteCode() {
      return this.currentCourse.classInviteCode
    }
  },

  methods: {
    /*倒计时*/
    startCountdown() {
      if(!this.$store.state.isVerification) {
        this.countdown = 10;
        let timeInt = setInterval(() => {
          if(!this.$store.state.isVerification){
          this.countdown--
          if (this.countdown <= 0) {
            window.clearInterval(timeInt);
            this.$router.push('/answer')
            this.$store.commit('setIsTabControl', false);
           }
          }
        }, 1000)
      }
    },
    //定时请求查询组队状态
    requireIsStart() {
     let interVal = setInterval(() => {
       if(this.isRequireClassStudent) {
         //向服务器发送请求，查询是否完成了组队
         //返回值包括表示课程状态的classState，1表示依然在组队中，2表示组队完成了，3表示该课程被老师清除了
         studentStartClass({classID: this.$store.state.classId, myID: this.$store.state.user.UID})
             .then((res) => {
               console.log(res);
               if (res.groupState === 'ACTIVE') {
                 //组队完成，保存组别状态到store中，该值为一个下标值，
                 //调用test函数，改变isCompleteTeamFormation信号量的值
                 this.$store.commit('setGroup', res.groupIndex);
                 console.log(this.$store.state.student.group);
                 this.$store.commit('setIsCompleteTeamFormation', true);
                 this.$store.commit('setNickname', res.nickName);
                 this.$store.commit('setGroupID', res.groupID);
                 this.$store.commit('setGroupLength', res.groupLength);
                 console.log(this.$store.state.nickname);
                 //clearInterval(interVal);
               } else if (res.groupState === 'GROUPUNDEFIND') {
                 this.$toast.show({
                   isShow: true,
                   isShow2: true,
                   message2: '该课程已被老师取消',
                   duration: 3000,
                   delete: 2,
                 });
                 if (!this.$store.state.isVerification) {
                   setTimeout(() => {
                     this.isAnswer = false;
                     this.$store.commit('setIsCompleteTeamFormation', false);
                     this.$router.push('/student/current');
                     this.$store.commit('modify_isVerification', true);
                     this.$store.commit('setIsTabControl', true);
                     console.log('111111111111');
                   }, 3000)
                 }
                 clearInterval(interVal);
               } else if (res.groupState === 'END') {
                 this.$toast.show({
                   isShow: true,
                   isShow2: true,
                   message2: '该课程已被老师结束',
                   duration: 3000,
                   delete: 3,
                 });
                 setTimeout(this.endAnswer, 3000);
                 clearInterval(interVal);
               }
             })
       }
       else{
         clearInterval(interVal);
       }
        }, 5000)

  /*   var interVal = 1etInterval(() => {
        //向服务器发送请求，查询是否完成了组队
        //返回值包括表示课程状态的classState，1表示依然在组队中，2表示组队完成了，3表示该课程被老师清除了
        studentStartClass({classID: this.$store.state.classId, myID: this.$store.state.user.id})
            .then((res) => {
              console.log(res);
              if (res.classState === '2') {
                //组队完成，保存组别状态到store中，该值为一个下标值，
                //调用test函数，改变isCompleteTeamFormation信号量的值
                this.$store.commit('setGroup', res.groupIndex);
                console.log(this.$store.state.student.group);
                this.$store.commit('modify_isCompleteTeamFormation');
                this.$store.commit('setNickname', res.nickName);
                console.log(this.$store.state.nickname);
                clearInterval(interVal);
              } else if (res.classState === '3') {
                this.$toast.show({
                  isShow: true,
                  isShow2: true,
                  message2: '该课程已被老师取消',
                  duration: 3000,
                  delete: 2
                });
                if(!this.$store.state.isVerification){
                  setTimeout(() => {
                    this.$store.commit('modify_isVerification', true);
                    console.log('111111111111');
                  }, 3000)
                }
                clearInterval(interVal);
              }
            })
      }, 5000)*/
    },
    goAnswer() {
      /*this.$EventBus.$emit('answer')*/
      this.$router.push('/answer')
      this.$store.commit('setIsTabControl', false);
    },
    endAnswer(){
      this.$store.commit('setIsCompleteTeamFormation', false);
      this.$store.commit('modify_isVerification', true);
      this.$router.push('current');
    }
  },
  mounted() {
    this.$EventBus.$on('isAnswer', () => {
      this.isAnswer = true
    });
    this.$EventBus.$on('exit', () => {
      console.log('222222');
      this.$store.commit('modify_isVerification', true);
    });
    this.requireIsStart();
    console.log(this.currentCourse);
  },
  destroyed() {
    this.isRequireClassStudent = false;
  }

}

</script>

<style scoped>

#waiting{
  position: relative;
  width: 100%;
  height: 100%;
}
.left{
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 340px;
  height: 100%;
  background: #FFFFFF;
  box-shadow: 2px 0 0 0 #EBEBEB;
  border-right: 2px solid rgba(50,50,50,0.1);
}
.left img {
  width: 292px;
  height: 164px;
  border-radius: 3px;
  margin: 24px;
  background-color: pink;
}
.left h4{
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #000000;
  line-height: 24px;
  font-weight: 500;
  margin-left: 24px;
  margin-bottom: 24px;
  align-self: flex-start;
}
.left p{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #6B6B6B;
  line-height: 16px;
  font-weight: 400;
}
.left .v{
  align-self: flex-start;
  margin-left: 24px;
  text-align: left;
}
.left span{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #6B6B6B;
  line-height: 24px;
  font-weight: 500;
}
.left button{
  flex: 1;
  width: 120px;
  height: 44px;
  align-self: flex-start;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 18px;
  font-weight: 500;
  margin-right: 20px;
}
.left-bottom{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30px 0;
  border-top: 2px solid rgba(50,50,50,0.1);
}
.left-bottom-left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
}
.left-bottom p:nth-child(1){
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: #999999;
  line-height: 14px;
  font-weight: 500;
  margin-left: 24px;
}
.left-bottom p:nth-child(2){
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #417AF1;
  line-height: 18px;
  font-weight: 500;
  margin-top: 12px;
  margin-left: 24px;

}
.right{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  left: 340px;
  top: 0;
  height:100%;
  width: 790px;
  background: #FFFFFF;
}
.right h3{
  font-family: PingFangSC-Medium;
  align-self: flex-start;
  font-size: 20px;
  color: rgba(0,0,0,0.85);
  line-height: 24px;
  font-weight: 600;
  margin-left: 24px;
  margin-top: 24px;
}
.right p{
  margin: 24px 24px 42px 24px;
  font-family: PingFangSC-Regular;
  text-align: left;
  font-size: 18px;
  text-indent: 36px;
  color: #6B6B6B;
  line-height: 32px;
  font-weight: 400;
}
.right .video{
  display: flex;
  flex-direction: row;
  width: 620px;
  height: 195px;
  margin: 30px 0 10px 24px;
}
.right .video p{
  ont-family: PingFangSC-Regular;
  font-size: 16px;
  color: #6B6B6B;
  line-height: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
}
.video-right, .video-left{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.video-left video, .video-right video{
  width: 292px;
  height: 164px;
  margin-bottom: 15px;
  border-radius: 6px;
  background-color: pink;

}
.video-right{
  margin-left: 36px;
}
</style>