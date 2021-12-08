<template>
  <div>
    <div id="text" v-if="isTextMask">
      <textarea class="textarea" v-model="text"></textarea>
      <button @click="inputting" :class="{active: isActive}">发送(s)</button>
      <div class="empty" v-if="isempty">不能发送空白消息</div>
    </div>
    <div v-else class="textMask"><p>暂不可用</p></div>
  </div>

</template>

<script>
import {IM} from "./store";

export default {
  name: "imText",
  data () {
    return {
      nickname: this.$store.state.nickname,
      name: IM.user.name,
      text: '',
      isempty: false,
      isActive: false

    };
  },
  props:{
    isTextMask: {
      type: Boolean,
      default() {
        return false
      }
    },
    tim: null
  },
  methods:{
    inputting() {
      if (this.text === '') {
          this.isempty = true;
          setTimeout(() =>{
            this.isempty = false;
            this.isActive = false;
          }, 500)
      } else {
        var message = {
          text: this.text,
          date: new Date(),
          sendTime: new Date(),
          self: true,
          user: {
            name: this.name,
            nickname: this.nickname,
            url: '#',
          }
        };
        this.tim.sendMessage(this.text);
        this.$store.commit('addMessage', message);
          IM.addMessage(message);
          //console.log("++++++++++++++++++");
          //console.log(this.tim);
          this.text = '';
          this.isActive = false;

          this.text = '';
          this.isActive = false
      }
    }
  },
  watch:{
    text(){
      if(this.text !== ''){
        this.isActive = true
      }
    }
  }
}
</script>

<style scoped>
#text{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: #FCFCFCFF;
  border-top:1px solid rgba(103, 101, 101, 0.1);
}
.textMask{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: #FCFCFCFF;
  border-top:1px solid rgba(103, 101, 101, 0.1);
}
.textarea{
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  padding: 5px 10px;
  background-color: #fcfcfc;
  overflow: scroll;
  font-size: 18px;
  text-indent: 5px;
}
button {
  border: none;
  width: 25%;
  height: 25%;
  align-self: flex-end;
  background-color: #f3f2f2;
  color: black;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  margin-bottom: 10px;
}
.active{
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #FFFFFF;
  line-height: 18px;
  font-weight: 500;
}
.empty{
  width: 50%;
  position: absolute;
  background-color: #eceaea;
  font-size: 14px;
  padding: 5px;
  color: black;
  right: 0;
  bottom: 40%;

}

</style>