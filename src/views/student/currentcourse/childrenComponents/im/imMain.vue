<template>
    <div id="im-main" v-if="isIM">
      <div class="group">
        组 {{group}}
      </div>
      <message :is-message-mask="isMessageMask"/>
      <im-text :tim="tim" :is-text-mask="isTextMask"/>
    </div>
</template>

<script>
import imText from "./imText";
import message from "./message";
import {CPSTim} from "../../../../../assets/im/CPSIM";
import {IM} from "./store";


export default {
  name: "imMain",
  data(){
    return{
      user: this.$store.state.student.im.user,
      tim: new CPSTim(this.$store.state.student.im.user.UID, this.$store.state.student.im.user.name,this.$store.state.classId, this.$store.state.nickname),
      length: 0,
      /*isIm: this.$store.state.isIm,
      isMessageMask: this.$store.state.isMessageMask,
      isTextMask: this.$store.state.isTextMask*/
    }
  },
  components:{
    imText,
    message,

  },
  computed:{
    isIM(){
      return this.$store.state.isIm
    },
    isMessageMask(){
      return this.$store.state.isMessageMask
    },
    isTextMask(){
      return this.$store.state.isTextMask
    },

    accept_message() {
      console.log(this.tim.groupmsgList);
      //tim返回的接收的消息列表
      return this.tim.groupmsgList;
    },
    group(){
      let list =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      console.log(this.$store.state.student.group);
      return list[this.$store.state.student.group]
    }

  },
   watch:{
    accept_message(){
      //处理消息
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
      let temp1 = [];
      let temp2 =[];
      let isd = 1;
      for(let i = 0; i < this.tim.groupmsgList.length; i++) {
        // 如果不是自己发送的消息（接收到的消息），重新定义消息格式
        if (this.user.name !== this.tim.groupmsgList[i].from) {
          let message = {
            text: this.tim.groupmsgList[i].payload.data,
            date: new Date(),
            sendTime: this.tim.groupmsgList[i].sendTime,
            self: false,
            user: {
              name: this.tim.groupmsgList[i].from,
              url: '#',
              nickname: this.tim.groupmsgList[i].payload.description
            }
          };
          //将重新定义格式的消息添加到过渡数组中
          temp1.push(message);
        }
      }
      console.log(temp1);
      /*
      将过渡数组中的消息加到IM message数组里
      message数组为空时，可以直接添加
      不为空时，要过滤掉重复消息，保证添加的消息都是新消息
      * */
      if(IM.messages.length === 0){
       for(let n = 0; n < temp1.length; n++){
         IM.addMessage(temp1[n]);
         console.log("+++++++++++++++++++++++++++++");
       }
        temp1 = [];
      }
      else{
        for(let p = 0; p < temp1.length; p++ ){
          isd = 1;
          for(let j = 0; j < IM.messages.length; j++){
           /* console.log(temp1[p].text);
            console.log(IM.messages[j].text);*/
            if(temp1[p].sendTime === IM.messages[j].sendTime){
              isd = 0;
            }
          }
          if(isd !== 0){
            temp2.push(temp1[p]);
          }
          console.log(temp2);
        }
        temp1 = [];
        for(let i = 0; i < temp2.length; i++){
          IM.addMessage(temp2[i]);
          console.log("++++++++++++++++++++++++++++++++");
        }
        temp2 = [];
      }
    },
  }
}
</script>

<style scoped>
#im-main{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.group{
  height: 50px;
  font-size: 16px;
  line-height: 50px;
  border-bottom: 1px solid rgba(103, 101, 101, 0.1);;
}
</style>