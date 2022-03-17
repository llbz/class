<template>
  <div class="toast" v-if="isShow">
      <div class="toast1" v-if="isShow1">
          <div class="top">
            <span>{{message1}}</span>
          </div>
        <div class="bottom">
          <button @click="waiting_mask">确定</button>
          <button v-if="isToastBtn" @click="cancel">取消</button>
        </div>
      </div>
      <div class="toast2" v-if="isShow2">
        <img src="../../../assets/img/close.png" alt="" @click="deleteToast">
        <div class="text">
          <span>{{message2}}</span>
        </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'Toast',
    data(){
        return {
          /*带按钮的toast的提示消息*/
          message1: '确定返回？当前组队信息将全部清空！',
          /*不带按钮的toast提示消息*/
          message2: '加入课堂成功！\n' +
              '答题组队等待中…',
        /*  message2:'加入课堂成功',*/
          /*isShow控制整个Toast的展示*/
          isShow: false,
          /*isShow1控制带按钮的toast的展示*/
          isShow1: false,
          /*isShow2控制不带按钮的toast的展示*/
          isShow2: false,
          /*isToastBtn控制是否有取消按钮*/
          isToastBtn: false,
          /*弹框持续的时间*/
          duration: 2000,
          //改变触发的事件
          delete: 1,
          sure: 4
          }
    },
    methods: {
      show(Alias){
          this.message1 = Alias.message1 || '';
          this.message2 = Alias.message2 || '';
          this.isShow = Alias.isShow || false;
          this.isShow1 = Alias.isShow1 || false;
          this.isShow2 = Alias.isShow2 || false;
          this.duration = Alias.duration || 2000;
          this.isToastBtn = Alias.isToastBtn || false;
          this.delete = Alias.delete || 1;
          this.sure = Alias.sure || 1;

          if(this.isShow && this.isShow1){
            setTimeout(()=>{
              this.message1 = '';
              this.isShow1 = false
              this.isShow = false;
              this.isToastBtn = false;
              this.duration = 2000;
              this.$EventBus.$emit('isMask');
            }, this.duration);
          }
          else if(this.isShow && this.isShow2){
            setTimeout(()=>{
              this.message2 = '';
              this.isShow2 = false
              this.isShow = false;
              this.duration = 2000;
              this.$EventBus.$emit('isMask')
            }, this.duration);
          }
      },
      deleteToast(){
        this.isShow = false;
        if(this.delete === 1){
          this.$EventBus.$emit('isMask');
        }
       else if( this.delete === 2){
         this.$EventBus.$emit('exit');
        }
      },
      waiting_mask(){
        this.isShow = false;
        if(this.sure === 1){
          this.$EventBus.$emit('isMask');
        }
        else if(this.sure === 2){
          this.$EventBus.$emit('isAnswer');
          this.$EventBus.$emit('isMask');
        }
        else if(this.sure === 3){
          this.$EventBus.$emit('deleteClass');
        }
        else if(this.sure === 4){
          this.$EventBus.$emit('teamEnd');
        }
        else if(this.sure === 5){
          this.$EventBus.$emit('endCourse');
        }
      },
      cancel(){
        this.isShow = false;
      }
      /*Toast_click(){
          this.isShow = false;
      }*/
    },

}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-240px, -250px);
  width: 480px;
  height: 216px;
  z-index: 999;
}
.toast1{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 216px;
  background: #F5F5F5;
  border: 2px solid rgba(0,0,0, .1);
  border-radius: 20px;
  overflow: hidden;
}
.toast1 .top{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 136px;
  background: #F5F5F5;
  box-shadow: 0 2px 0 0 #EBEBEB;
  border-bottom: 1px solid rgba(50, 50, 50, .1);
  padding: 0 20px;

}
.top span{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #525252;
  font-weight: 500;
  text-align: center;
  white-space: pre;
  word-wrap: break-word;
  word-break: break-all;
}
.toast1 .bottom{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 80px;
  line-height: 80px;
  background: #FFFFFF;
}
.bottom button{
  width: 120px;
  height: 44px;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  line-height: 18px;
  font-weight: 500;
  border: none;
}
.bottom button:nth-child(1){
  color: white;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  margin-right: 15px;
}
.bottom button:nth-child(2){
  background: #FFFFFF;
  border: 2px solid #B8B8B8;
  box-shadow: 0 3px 0 0 #B8B8B8;
  border-radius: 12px;
  color: #999999;
  margin-left: 15px;
}
.toast2{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 172px;
  background: #F5F5F5;
  border: 2px solid rgba(0,0,0, .1);
  border-radius: 20px;
  overflow: hidden;
}
.toast2 img{
  width: 24px;
  height: 24px;
  align-self: flex-end;
  margin-right: 10px;
  margin-top: 10px;
}
.toast2 .text{
  flex: 1;
  display: flex;
  width: 90%;
  justify-content: center;
  align-items: center;
  overflow: hidden;

}
.toast2 .text span{
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #525252;
  font-weight: 500;
  transform: translateY(-24px);
}
</style>
