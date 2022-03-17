<template>
  <div id="verification-code">
    <top-nav :title="title"/>
    <main-content>
      <span class="tips color" v-if="isShow">请输入班级邀请码</span>
      <span class="tips" :style="{color: showcolor}" v-if="isError1">请输入六位邀请码加入课程</span>
      <span class="tips right" v-if="isShow1">载入中...</span>
      <span class="error-tips color" v-if="isError2">邀请码不存在</span>
      <div class="six-input-box">
        <input v-for="(item,index) in inputbox"
               :key="index"
               :ref="`ref${index}`"
               :class="{'input': true, 'modify-color': iscolor}"
               v-model="item.value"
               type="number"
               oninput="value=value.replace(/[^\d]/g,'')"
               @input="onInput(index)"
               @keyup.delete="onDelete(index)"
               @keyup.enter="onEnter()"
               maxlength="1"
               onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"
              />
      </div>
    </main-content>
  </div>
</template>

<script>
import TopNav from "../../../../components/common/TopNav";
import MainContent from "../../../../components/common/MainContent";
/*import {login} from "../../../../netWork/api";*/
import  {submitVertification} from "../../../../netWork/api";


export default {
  name: "currentCourse",
  data() {
    return {
      iscolor: false,
      title: '当前课程',
      /* 记录下输入的验证码*/
      inputValue: [],
      length: 0,
      showcolor: '#417AF1',
      inputbox: [
        {
          value: []
        },
        {
          value: []
        },
        {
          value:  []
        },
        {
          value:  []
        },
        {
          value: []
        },
        {
          value:  []
        }
      ],
      /*  默认为false，为true时显示请输入六位邀请码*/
      isError1: false,
      /*isError2默认为false，为true时显邀请码不存在*/
      isError2: false,
      /* isShow默认为true  显示请输入班级邀请码*/
      isShow: true,
      /*默认为false，当输入完成后修改为true，显示载入中*/
      isShow1: false,

    }
  },
  components: {
    TopNav,
    MainContent,
  },
  watch:{
    length(){
      this.isError2 = false;
      if(this.length === 0){
        this.isShow = true
        this.isError1 = false
      }
      else {
        this.isShow = false
        this.isError1 = true
      }
      if(this.inputValue.length === 6){
        this.iscolor = true;
        this.showcolor = ' #8A8A8A'
          console.log(this.inputValue.join(''));
          /*提交课程邀请码到服务器验证*/
          submitVertification({
            id: this.$store.state.student.im.user.UID,
            inviteCode: this.inputValue.join('')
          })
          .then( res =>{
            console.log(res);
            this.$store.commit('setCurrentCourse', res);
            console.log(this.$store.state.classId);
            console.log(this.$store.state.student.currentCourse);
            this.$emit('Onwait');
            this.$toast.show({
              isShow: true,
              isShow2: true,
              message2: '加入课堂成功！\n' +
                  '答题组队等待中…',
              duration: 2000,
              sure: 1
            })
            this.$store.commit('modify_isVerification', false)
          })
          .catch( () => {
            console.log('999999999999999');
            this.isShow1 = false
          this.isError2 = true
          setTimeout(() =>{
            this.isShow1 = false;
            this.isError1 = false;
            this.isError2 = false
            this.isShow = true
            this.inputValue = [];
            this.iscolor = false;
            this.inputbox.forEach((item) =>{
              item.value = []
            })
            this.$refs['ref0'][0].focus();
          },2000)
        })
      }
    }
  },
  computed:{

},
  methods: {
    onInput(index) {
        if (index === 5 && this.inputbox[index].value.length === 1) {
          this.$refs['ref5'][0].blur();
        }
        // index < 5 ，如果是第6格，不触发光标移动至下一个输入框。
        if (this.inputbox[index].value.length === 1 && index < 5) {
          this.$refs['ref' + (index + 1)][0].focus();
        }
        this.inputValue.push(this.inputbox[index].value[0]);
        this.length = this.inputValue.length
        /*this.onEnter(inputValue.length)*/
        if (this.inputValue.length < 6) {
          this.isShow1 = false;
          /*this.isError1 = true;
        this.isShow = false;*/
        } else {
          this.isError1 = false;
          this.isShow1 = true;
        }
      },
    onEnter(){
      if (this.inputValue.length < 6) {
        this.isError1 = true;
        this.isShow = false;
      } else {
        this.isError1 = false;
        this.isShow1 = true;
      }
    },
    onDelete(index) {
      // 如果是第1格，不触发光标移动至上一个输入框
      if (index > 0) {
        this.$refs['ref' + (index - 1)][0].focus();
        this.inputbox[index - 1].value = [];
        this.inputbox[index].value = [];
        this.inputValue.splice(index);
        this.inputValue.length--;
        this.length = this.inputValue.length
      }
    },
  },
  mounted() {
    this.$refs['ref0'][0].focus();
  }


}
</script>

<style scoped>
#verification-code{
  width:100%;
  height: 100%;
  position: relative;
  /*background-color: pink;*/
}
.tips{
  position: absolute;
  top: 72px;
  left: 272px;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  color: #8A8A8A;
  text-align: center;
  line-height: 24px;
  font-weight: 500;
}
.color{
  color: #417AF1;
}
.right{
  left: 788px;
}
.error-tips{
  position: absolute;
  top: 76px;
  left: 788px;
  font-family: PingFangSC-Regular;
  font-size: 20px;
  color: #417AF1;
  text-align: right;
  line-height: 20px;
  font-weight: 400;
}
.six-input-box {
  position: absolute;
  top: 150px;
  left: 272px;
  display: flex;
  flex-direction: row;
}
.input {
  display: flex;
  width: 72px;
  height: 96px;
  margin-right: 35px;
  font-family: Baloo2-Bold;
  font-size: 60px;
  color: #417AF1;
  text-align: center;
  line-height: 60px;
  font-weight: 700;
  background: #F0F0F0;
  border-radius: 9px;
  outline: none;
  border: none;
}
.modify-color{
  font-family: Baloo2-Bold;
  font-size: 60px;
  color: #417AF1;
  text-align: center;
  line-height: 60px;
  font-weight: 700;
  opacity: .3;
}

</style>