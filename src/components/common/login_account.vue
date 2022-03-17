<template>
  <!--  登录页-->
  <div id="login" >
    <div class="content">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="account" :class="{'focus1': isFocus1}">
        <input type="text" placeholder="请输入账号" @focus="onFocus" @blur="onBlurs" id="input_account" v-model='account'>
      </div>
      <div class="password" :class="{'focus2': isFocus2}">
        <input type="text" placeholder="请输入密码" @focus="onFocus1" @blur="onBlurs1" id="input_password" v-model="password">
      </div>
      <div class="forgetPassword">
        <div>
          <span class="error" v-if="isPasswordError">{{message}}</span>
        </div>
        <span>忘记密码</span>
      </div>
      <button class="submit" @click="submit" >
        <span v-if="!isPoint">登录</span>
        <div class="point" v-else>
          <div class="point1"></div>
          <div class="point2"></div>
          <div class="point3"></div>
        </div>
      </button>
      <div class="accountTip">
        <span @click="goToLogin_teacher">验证码登录</span>
      </div>
      <div class="tip">
        <span>其他身份登录 </span>
        <span style="color: #417AF1" @click="goToLogin_student"> 学生登录 </span>
      </div>
    </div>
  </div>
</template>
<script>
import {teacherNormalLogin} from "../../netWork/api";

export default {
  name: "Login",
  data() {
    return {
      //是否密码错误
      isPasswordError: false,
      account: '',
      password: '',
      //是否展示动画
      isPoint: false,
      isFocus1: false,
      isFocus2: false,
      message: '',
    }
  },
  methods:{
    /*表单提交*/
    submit() {
      //前端验证，账号密码不能为空
      if(this.isError()){
        this.isPasswordError = true;
      }
      else{
        this.isPasswordError = false;
        console.log('提交登录');
        teacherNormalLogin({mobile: this.account, password: this.password})
        .then((res) => {
          console.log(res);
          this.$store.commit('teacherLoginSuccess', res);
          this.$router.push('teacher');
        })
        .catch(() => {
          this.isPasswordError = true;
          this.message = "账号或密码错误，请重新输入！";
          setTimeout(() => {
            this.password = '';
          },200)
        })

      }

    },
    onFocus(){
      this.isFocus1 = true;
      let input = document.getElementById('input_account');
      input.style.background = 'white';

    },
    onBlurs(){
      this.isFocus1 = false;
      let input = document.getElementById('input_account');
      input.style.background = '#F7F7F7';
    },
    onFocus1(){
      this.isFocus2 = true;
      let input = document.getElementById('input_password');
      input.style.background = 'white';

    },
    onBlurs1(){
      this.isFocus2 = false;
      let input = document.getElementById('input_password');
      input.style.background = '#F7F7F7';
    },
    goToLogin_student(){
      this.$router.push('login_student');
    },
    goToLogin_teacher(){
      this.$router.push('login_teacher');
    },
    isError(){
      let flag = false;
      if(this.account === ''){
        flag =true;
        this.message = '账号不能为空！';
      }
      else if(this.password === ''){
        flag = true;
        this.message = '密码不能为空';
      }
      return flag
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
.account , .password{
  padding: 0;
  margin: 10px;
  width: 318px;
  height: 60px;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  background:  #F7F7F7;
}
.password{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}
.focus1, .focus2{
  border: 2px solid #5F8FF2;
  background: white;
}
#input_password{
  width: 150px;
  height: 55px;
}
.accountTip{
  width: 284px;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #417AF1;
  text-align: right;
  line-height: 14px;
  font-weight: 500;
}
.forgetPassword{
  width: 284px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #8A8A8A ;
  text-align: right;
  font-weight: 500;
  margin: 10px 0;
}
.forgetPassword div{
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
.error{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FF4141;
  line-height: 16px;
  font-weight: 500;
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