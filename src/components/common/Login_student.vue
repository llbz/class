<template>
  <!--  登录页-->
  <div id="login" >
    <div class="content">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <form action="#" @keyup.enter="submit()">
        <input name='name' type="text" placeholder="请输入学号" v-model="account" @focus="onfocus" @blur="onblur" id="input">
      </form>
      <div class="error" >
        <span v-if="isAccountError">
          {{message}}
        </span>
      </div>
      <button class="submit" @click="submit" >
        <span v-if="!isPoint">登录</span>
        <div class="point" v-else>
          <div class="point1"></div>
          <div class="point2"></div>
          <div class="point3"></div>
        </div>
      </button>
      <div class="tip">
        <span>其他身份登录 </span>
        <span style="color: #417AF1" @click="goToLogin_teacher"> 教师登录 </span>
      </div>
    </div>
  </div>
</template>
<script>
import {studentNormalLogin} from "../../netWork/api";
export default {
  name: "Login",
  data() {
    return {
      account: '',
      //是否密码错误
      isAccountError: false,
      //是否展示动画
      isPoint: false,
      message: '',
    }
  },
  methods:{
    isError(){
      let flag = false;
      if(this.account === ''){
        this.message = '学号不能为空';
        flag = true;
      }
      return flag;
    },
    /*表单提交*/
    submit() {
      //前端验证，账号密码不能为空
      if(this.isError()){
        this.isAccountError = true;
      }
      else{
        console.log("登录，提交账号到服务器");
        studentNormalLogin({id: this.account})
        .then((res) => {
          console.log('222222');
          this.isAccountError = false;
          this.message = '';
          console.log(res);
          this.$store.commit('studentLoginSuccess', res);
          this.$router.push('student');
        })
        .catch(() => {
          console.log('11111');
          this.isAccountError = true;
          this.message = "账号不存在";
        })
      }

    },
    goToLogin_teacher(){
      this.$router.push('login_teacher');
    },
    onfocus(){
      let input = document.getElementById('input');
      input.style.background = 'white';
    },
    onblur(){
      let input = document.getElementById('input');
      input.style.background = '#F7F7F7';
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
form input::placeholder {
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #B7B7B7;
  line-height: normal;
  font-weight: 400;
}
.logo img{
  width: 210px;
  height: 100px;
}
form{
  margin-top: 2%;
}
form input{
  display: block;
  width: 314px;
  height: 55px;
  outline: none;
  background: #F7F7F7;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  line-height: normal;
  font-family: PingFangSC-Medium;
  text-indent: 20px;
  font-size: 19px;
  color: #333333;
  font-weight: 500;
}
form input:focus{
  border: 2px solid #5F8FF2;
  background: white;
}
form input:nth-child(1){
  margin: 12px auto;
}
form input:nth-child(2){
  margin: 12px auto;
}
.error{
  width: 284px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  text-align: right;
  margin: 10px 0;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FF4141;
  line-height: 16px;
  font-weight: 500;
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
  font-weight: 500;
  margin-top: 36px;
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