<template>
  <!--  登录页-->
  <div id="login" >
    <div class="content">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="">
      </div>
      <div class="phone_number" :class="{'focus1': isFocus1}">
        <input type="text" placeholder="请输入手机号码" @focus="onFocus" @blur="onBlurs" id="input_phone" v-model="phoneNumber">
      </div>
      <div class="photo_verification" :class="{'focus3': isFocus3}" v-if="isPhoto_verification">
        <input type="text" placeholder="请输入图形验证码" @focus="onFocus3" @blur="onBlurs3" id="photo_verification" v-model="photo_verification">
        <div class="photo" @click="getPhoto_verification" id="photo">
        </div>
      </div>
      <div class="verification" :class="{'focus2': isFocus2}">
        <input type="text" placeholder="请输入验证码" @focus="onFocus2" @blur="onBlurs2" id="verification" v-model="verification">
        <span class="requireVerification" @click="requireVerification" v-if="isRequireVerification">获取验证码</span>
        <span class="anewRequiredVerification" v-else>{{count}}秒后重新获取</span>
      </div>
      <div class="error" >
        <span v-if="isError">{{this.message}}</span>
      </div>
      <button class="submit" @click="submit" >
        <span v-if="!isPoint">登录</span>
        <div class="point" v-else>
          <div class="point1"></div>
          <div class="point2"></div>
          <div class="point3"></div>
        </div>
      </button>
      <div class="account">
        <span @click="goToLogin_account">账号密码登录</span>
      </div>
      <div class="tip">
        <span>其他身份登录 </span>
        <span style="color: #417AF1" @click="goToLogin_student"> 学生登录 </span>
      </div>
    </div>
  </div>
</template>
<script>
import {getMsgVerifyCode, verifyMsgCode, getCaptcha, verifyCaptcha} from "../../netWork/api";

export default {
  name: "Login",
  data() {
    return {
      phoneNumber: '',
      verification: '',
      message: '',
      //是否密码错误
      isPasswordError: false,
      isRequireVerification: true,
      isError: false,
      photo_verification: '',
      //是否展示动画
      isPoint: false,
      isFocus1: false,
      isFocus2: false,
      isFocus3: false,
      isPhoto_verification: false,
      count: 60,
      signal: true,
    }
  },
  methods: {
    //倒计时
    timeDown() {
      this.count = 60;
      this.isRequireVerification = false;
      if (this.count > 0) {
        let time = setInterval(() => {
          if (this.count > 0) {
            this.count--;
          } else {
            this.isRequireVerification = true;
            clearInterval(time);
          }
        }, 1000)
      }
    },
    /*表单提交*/
    submit() {
      //前端验证，账号密码不能为空
      if (this.verification === '') {
        this.isError = true;
        this.message = '请输入验证码';
      } else {
        verifyMsgCode({mobile: this.phoneNumber, msgVerifyCode: this.verification})
            .then((res) => {
              this.isError = false;
              this.message = '';
              console.log(res);
              this.$store.commit('teacherLoginSuccess', res);
              if (res.isSystemUser === false) {
                this.$router.push('setpassword');
              } else {
                this.$router.push('teacher');
              }
            })
        .catch(() => {
          this.isError = true;
          this.message = "验证码错误，请重试！";
        })
      }

  },
  onFocus() {
    this.isFocus1 = true;
    let input = document.getElementById('input_phone');
    input.style.background = 'white';

  },
  onBlurs() {
    this.isFocus1 = false;
    let input = document.getElementById('input_phone');
    input.style.background = '#F7F7F7';
  },
  onFocus2() {
    this.isFocus2 = true;
    let input = document.getElementById('verification');
    input.style.background = 'white';

  },
  onFocus3() {
    this.isFocus3 = true;
    let input = document.getElementById('photo_verification');
    input.style.background = 'white';

  },
  onBlurs2() {
    this.isFocus2 = false;
    let input = document.getElementById('verification');
    input.style.background = '#F7F7F7';
  },
  onBlurs3() {
    this.isFocus3 = false;
    let input = document.getElementById('photo_verification');
    input.style.background = '#F7F7F7';
  },
  goToLogin_student() {
    this.$router.push('login_student');
  },

  //请求短信验证码
  requireVerification() {
    if (this.signal === true) {
      if (this.isMobileNumber(this.phoneNumber) === true) {
        this.isError = false;
        console.log(this.phoneNumber);
        getMsgVerifyCode({mobile: this.phoneNumber})
            .then((res) => {
              console.log(res);
              if (res.logState === 'UNSAFE') {
                this.isPhoto_verification = true;
                if (this.signal) {
                  getCaptcha({mobile: this.phoneNumber})
                      .then((res) => {
                        console.log(res);
                        let photo = document.getElementById('photo');
                        photo.innerHTML = res;
                        this.signal = false;
                      })
                }
              } else if (res.logState === 'SAFE') {
                this.timeDown();
                this.isPhoto_verification = false;
              }
            })
      } else {
        this.isError = true;
        this.message = '请输入图片验证码！';
      }
    }
    else {
      if (this.photo_verification === '') {
        console.log('121111');
        this.message = '请输入图片验证码！';
        this.isError = true;
      } else {
        console.log(this.photo_verification);
        verifyCaptcha({mobile: this.phoneNumber, captchaText: this.photo_verification})
            .then((res) => {
              console.log(res);
              if(res.verified === true){
                this.timeDown();
                console.log('成功');
                this.timeDown();
                this.isError = false;
                this.message = '';
              }
              else{
                console.log('失败');
                this.isError = true;
                this.message = "图片验证码错误，请重新输入";
              }

            })
        .catch(() => {
          this.isError = true;
          this.message = "图片验证码错误，请注意大小写，重新输入！";
          this.getPhoto_verification();
          this.photo_verification = '';
        })
      }

    }
  },

  //获取图片验证码
  getPhoto_verification() {
    getCaptcha({mobile: this.phoneNumber})
        .then((res) => {
          console.log(res);
          let photo = document.getElementById('photo');
          photo.innerHTML = res;
        })
  },

  //跳转至账号登录页面
  goToLogin_account() {
    this.$router.push('login_account');
  },

  //验证手机号
  isMobileNumber(phone) {
    let flag = false;
    let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    if (phone === '') {
      // console.log("手机号码不能为空");
      this.message = "手机号码不能为空！";
    } else if (phone.length !== 11) {
      //console.log("请输入11位手机号码！");
      this.message = "请输入11位手机号码！";
    } else if (!myreg.test(phone)) {
      //console.log("请输入有效的手机号码！");
      this.message = "请输入有效的手机号码！";
    } else {
      flag = true;
    }
    return flag;
  },
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
.phone_number , .verification, .photo_verification{
  padding: 0;
  margin: 10px;
  width: 318px;
  height: 60px;
  border: 2px solid #E0E0E0;
  border-radius: 12px;
  background:  #F7F7F7;
}
.verification ,.photo_verification{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
}
.focus1, .focus2 , .focus3{
  border: 2px solid #5F8FF2;
  background: white;
}
#verification, #photo_verification{
  width: 150px;
  height: 55px;
}
.photo{
  display: block;
  width: 150px;
  height: 55px;
}
.requireVerification, .photo{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #417AF1;
  text-align: center;
  font-weight: 500;
  margin-right: 5px;
}
.anewRequiredVerification{
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #7C7C7C;
  text-align: right;
  line-height: 12px;
  font-weight: 400;
}
.account{
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

.logo img{
  width: 210px;
  height: 100px;
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
  font-size: 14px;
  color: #FF4141;
  line-height: 14px;
  font-weight: 400;
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
.focus1, .focus2{
  border: 2px solid #5F8FF2;
  background: white;
}
.tip{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8A8A8A;
  line-height: 16px;
  font-weight: 500;
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