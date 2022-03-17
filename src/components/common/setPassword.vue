<template>
  <!--  登录页-->
  <div id="login" >
    <div class="content">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="password1" :class="{'focus1': isFocus1}">
        <input type="password" placeholder="请输入密码" @focus="onFocus1" @blur="onBlurs1" id="password1" v-model='password1'>
      </div>
      <div class="password2" :class="{'focus2': isFocus2}">
        <input type="password" placeholder="请再次输入密码" @focus="onFocus2" @blur="onBlurs2" id="password2" v-model='password2'>
      </div>
      <div class="error">
        <span class="error" v-if="isError">{{message}}</span>
      </div>
      <button class="submit" @click="submit" >
        <span v-if="!isPoint">确定</span>
        <div class="point" v-else>
          <div class="point1"></div>
          <div class="point2"></div>
          <div class="point3"></div>
        </div>
      </button>
      <div class="tip">
        <span>其他身份登录 </span>
        <span style="color: #417AF1" @click="goToLogin_student"> 学生登录 </span>
      </div>
    </div>
  </div>
</template>
<script>
import {modifyOriginalPassword} from "../../netWork/api";

export default {
  name: "Login",
  data() {
    return {
      isError: false,
      isPoint:  false,
      message: '',
      password1: '',
      password2: '',
      isFocus1: false,
      isFocus2: false,



    }
  },
  methods:{
    onFocus1(){
      this.isFocus1 = true;
      let input = document.getElementById('password1');
      input.style.background = 'white';
    },
    onFocus2(){
      this.isFocus2 = true;
      let input = document.getElementById('password2');
      input.style.background = 'white';
    },
    onBlurs1(){
      this.isFocus1 = false;
      let input = document.getElementById('password1');
      input.style.background = '#F7F7F7';
    },
    onBlurs2(){
      this.isFocus2 = false;
      let input = document.getElementById('password2');
      input.style.background = '#F7F7F7';
    },
    submit(){
      if(this.password1 === ''){
        this.isError = true;
        this.message = "请输入密码";
      }
      else if(this.password2 === ''){
        this.isError = true;
        this.message = "请确认密码";
      }
      else if(this.password1 !== this.password2){
          this.isError = true;
          this.message = "两次输入的密码不一致，请重新输入！"
        }
      else{
        modifyOriginalPassword({newPassword: this.password2})
        .then((res) => {
          this.isError = false;
          this.message = '';
          console.log(res);
          this.$router.push('teacher');
        })
        .catch(() => {
          this.isError = true;
          this.message = "修改失败，请重新尝试";
        })
      }
    },
    goToLogin_student(){
      this.$router.push('login_student');
    }
  },

}
</script>
<style scoped>
#login{
  height: 100%;
  position: relative;
}
.content{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 50%;
  transform: translate(-50%, -70%);
  display: flex;
  flex-direction: column;
  align-items: center;
}
input{
  width: 314px;
  height: 55px;
  background: #F7F7F7;
  border-radius: 12px;
  border: none;
  outline: none;
  line-height: normal;
  font-family: PingFangSC-Medium;
  text-indent: 20px;
  font-size: 19px;
  color: #333333;
  font-weight: 500;
}
input::placeholder {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #B7B7B7;
  line-height: normal;
  font-weight: 400;
}
.password1 , .password2{
  padding: 0;
  margin: 10px;
  width: 318px;
  height: 60px;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  background:  #F7F7F7;
}
.focus1, .focus2{
  border: 2px solid #5F8FF2;
  background: white;
}
.error{
  width: 284px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  font-weight: 500;
  margin: 10px 0;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FF4141;
  line-height: 16px;
}
.error div{
  text-align: left;
  height: 20px;
  width: 200px;
}
.logo img{
  width: 210px;
  height: 100px;
}
.content button{
  display: block;
  width: 284px;
  height: 55px;
  outline: none;
  background: #417AF1;
  border: none;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #FFFFFF;
  font-weight: 500;
  margin: 10px auto;
}
.tip{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8A8A8A;
  line-height: 16px;
  font-weight: 400;
  margin-top: 30px;
}
.point{
  display: flex;
  justify-content: center;
}
.point2{
  margin: 0 5px;
}
.point > div{
  width: 10px;
  height: 10px;
  background-color: #fff;
  opacity: 50%;
  border-radius: 50%;
  display: inline-block;
  animation: action 1s infinite ease-in-out;
}
.point .point1{
  animation-delay: -.4s;
}
.point .point2{
  animation-delay: -0.2s;
}
@keyframes action {
  0%, 20%{
    transform: scale(0);
    opacity: .2;
  }
  40%{
    transform: scale(.2);
    opacity: .4;
  }
  60%{
    transform: scale(.4);
    opacity: .6;
  }
  80%{
    transform: scale(0.6);
    opacity: .8;
  }
  100%{
    transform: scale(1.0);
    opacity: 1;
  }
}
</style>