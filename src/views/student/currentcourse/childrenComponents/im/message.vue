<template>
  <div  id="message">
    <div class="m-message" v-if="isMessageMask">
      <ul>
        <li v-for="(item, index) in messages" :key="index" ref="scroll">
          <div class="main" :class="{ self: item.self}" v-if="item.self">
            <div class="content">
              <div class="top">
                <span class="time" >{{item.date | time}}</span>
                <span class="name">{{nickname}}</span>
              </div>
              <span class="text">{{item.text}}</span>
            </div>
            <div class="avatar" ></div>
          </div>
          <div class="accept_message" v-else>
            <div class="avatar" ></div>
            <div class="content">
              <div class="top">
                <span class="name">{{item.user.nickname}}</span>
                <span class="time">{{item.date | time}}</span>
              </div>
              <span class="text">{{item.text}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="messageMask"> <p>暂不可用</p></div>
  </div>

</template>

<script>
/*import Vue from "vue";*/
import {IM} from "./store";
//let past = 0;
//let time = 0;
/*import Vue from "vue";*/

export default {
  data(){
    return {
      user: IM.user,
      messages: IM.messages,
      //messages: this.$store.state.student.im.messages,
      nickname: this.$store.state.nickname
    }
  },
  props:{
    isMessageMask:{
      type: Boolean,
      default(){
        return false
      }
    }
  },
  computed:{

  },
  methods:{
   /* setPast(i){
      past = i
    },
    isDateShow(item){
      console.log(past);
      console.log(time);
      console.log(item.date);
      if(past === 0){
        past = 1
        return true
      }
      else{
        if(item.date - time > 120000){
          time = item.date;
          this.setPast(item.date);
          return true
        }
        else{
          var t = item.date - past;
          this.setPast(item.date);
          console.log(t);
          if(t > 60000){
            time = item.date;
            return true;
          }
        }
        //console.log(item.date.getTime());
      }
      }*/
  },
  created() {
    //time = new Date();
  },


  filters: {
    // 筛选出用户头像
    /*avatar () {
      // 如果是自己发的消息显示登录用户的头像
      let users =  this.user;
      return users && users.img;
    },*/
    // 将日期过滤为 hour:minutes
    time (date) {
      //格式化时间
      if (typeof date === 'string') {
        date = new Date(date);
      }
      if(date.getMinutes() < 10){
        return date.getHours() + ':' + '0' + date.getMinutes();
      }
      return date.getHours() + ':' + date.getMinutes();
    }
  },
  /* directives: {
     // 发送消息后滚动到底部
     'scroll-bottom'(){
       Vue.nextTick(() => {
       this.that.scrollTop = this.that.scrollHeight - this.that.clientHeight;
       });
     }
   }*/
};
</script>

<style scoped>
#message{
  width: 100%;
  flex: 1;
  overflow: scroll;
}
.m-message{
  width: 100%;
  flex: 1;
  overflow: scroll;
}
.messageMask{
  width: 100%;
  flex: 1;
}
.m-message li{
  list-style: none;
  margin: 5px 0;
}
.main, .accept_message{
  display: flex;
}
.main{
  justify-content: flex-end;
}
.accept_message{
  justify-content: flex-start;
}
.avatar {
  border: none;
  outline: none;
  float: left;
  margin: 0 10px 0 0;
  width: 50px;
  height: 50px;
  background-color: pink;
  border-radius:50px;
}
.content{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.main .content{
  align-items: flex-end;
}
.accept_message .content{
  align-items: flex-start;
}
.name{
  font-size: 14px;
  margin: 0 10px;
  color: #8A8A8A;
}
.time{
  font-size: 14px;
  color: #8A8A8A;
}
.text{
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  max-width: calc(80%);
  min-height: 30px;
  line-height: 2;
  font-size: 14px;
  word-break: break-all;
  background-color: #f3f1f1;
  border-radius: 4px;
  margin: 0 5px;
  text-align: left;
}
.accept_message .text::before{
  position: absolute;
  top: 1px;
  left: -18px;
  content: ' ';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-right: 10px solid  #f3f1f1;
}
.self .text {
  background-color: #b2e281;
}
.self .text::before{
  position: absolute;
  top: 1px;
  right: -18px;
  content: ' ';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-left: 10px solid #b2e281;

}

/*.self .text:before {
  right: inherit;
  left: 100%;
  border-right-color: transparent;
  border-left-color: #b2e281;
}*/


/*.time{
  margin: 7px 0;
  text-align: center;
}

.avatar {
  border: none;
  outline: none;
  float: left;
  margin: 0 10px 0 0;
  width: 50px;
  height: 50px;
  background-color: pink;
  border-radius:50px;
}
.text {
  display: block;
  position: relative;
  padding: 0 10px;
  max-width: calc(70%);
  min-height: 30px;
  line-height: 2.5;
  font-size: 14px;
  text-align: left;
  word-break: break-all;
  background-color: #fafafa;
  border-radius: 4px;
}
.name{
  padding: 0 10px;
  font-size: 14px;
  text-align: right;
  word-break: break-all;
  border-radius: 4px;
  color: #8A8A8A;
}

.text:before {
   content: " ";
   position: absolute;
   top: 9px;
   right: 100%;
   border: 6px solid transparent;
   border-right-color: #fafafa;
 }

.self {
  text-align: right;
}

.self .avatar {
  float: right;
  margin: 0 10px;
}
.self .text {
  text-align: right;
  background-color: #b2e281;
}

.self .text:before {
   right: inherit;
   left: 100%;
   border-right-color: transparent;
   border-left-color: #b2e281;
 }
.accept_message{
  text-align: left;
}
.accept_message .name{
  text-align: left;
  padding: 0 10px;
  font-size: 14px;
  word-break: break-all;
  border-radius: 4px;
  color: #8A8A8A;
}
.accept_message .text{
  text-align: left;
}*/
</style>