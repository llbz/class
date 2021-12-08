<template>
<!--  登录页-->
<div id="login" >
  <div class="content">
    <div class="logo">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <form action="#" @keyup.enter="submit()">
      <input name='name' type="text" placeholder="请输入账号" v-model="account">
      <input name='id' type="password" placeholder="密码" v-model="password">
    </form>
    <div class="error" v-if="isPasswordError">账号或密码不正确,请重新输入</div>
    <button class="submit" @click="submit" >
      <span v-if="!isPoint">登录</span>
      <div class="point" v-else>
        <div class="point1"></div>
        <div class="point2"></div>
        <div class="point3"></div>
      </div>
    </button>
  </div>
</div>
</template>
<script>
import {login} from "../../netWork/api";
import {IM} from "../../views/student/currentcourse/childrenComponents/im/store";

export default {
  name: "Login",
  data() {
    return {
      account: '',
      password: '',
      /*  name: 'teacher',*/
      name: '',
      //是否密码错误
      isPasswordError: false,
      //是否展示动画
      isPoint: false
    }
  },
  methods:{
    /*表单提交*/
    submit() {
      //前端验证，账号密码不能为空
      if(this.account.length === 0|| this.password.length === 0)
      {
        this.$toast.show({
          isShow: true,
          isShow2: true,
          message2: '账号或密码不能为空!',
          duration: 3000
        })
      }
      else if(localStorage.isLogin && localStorage.userInfo.role){
        this.$router.push({ name: localStorage.userInfo.role});
      }
      else{
        //登录动画
        this.isPoint = true;
        //登录提交表单到服务器
        login({id: this.account, password: this.password})
            .then(res => {
              console.log(res);
              if(res.myInfo && res.myInfo.role ==='teacher'){
                console.log('教师端');
                this.name = res.myInfo.role;
                console.log(this.name);
                this.$store.commit('loginSuccess', res);
                console.log(this.$store.state.userInfo);
                console.log(this.$store.state.user);
                console.log(this.$store.state.teacher.historyCourse);
                this.$router.push({ name: this.name});
                this.isPoint = false;
              }
              else if(res.myInfo && res.myInfo.role === 'student'){
                console.log('学生端');
                this.name = res.myInfo.role;
                console.log(this.name);
                this.$store.commit('loginSuccess',res);
                IM.loginSuccess(res);
                this.$router.push({ name: this.name});
                this.isPoint = false;
              }
              else{
                console.log("4444444444444444");
                this.isPoint = false;
              }
            })
            .catch(() => {
              this.isPasswordError = true;
             /* setTimeout(() => {
                this.isPasswordError = false
              }, 3000)*/
              this.isPoint = false;
              this.account = '';
              this.password = '';
        })
      }

    }
  },
  watch:{
    account(){
      if(this.account)
      {
        this.isPasswordError = false
      }
    },
    password(){
      if(this.password)
      {
        this.isPasswordError = false
      }
    }
  }

}
</script>
<style scoped>
#login{
  position: relative;
  height: 100%;
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
  font-size: 18px;
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
  width: 284px;
  height: 44px;
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
}
form input:nth-child(1){
  margin: 12px auto;
}
form input:nth-child(2){
  margin: 12px auto;
}
.error{
  position: absolute;
  text-align: left;
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #FF4141;
  line-height: 14px;
  font-weight: 500;
  left: 546px;
  top: 262px;
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
  margin: 36px auto;
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