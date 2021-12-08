<template>
  <div id="profile">
    <top-nav :title="title"/>
    <main-content>
      <div class="profile-content">
        <div class="content_top">
          <img src="" alt="">
          <div class="text">
            <p>{{name}}</p>
            <p>{{gender}} {{ role}}</p>
            <p>{{schoolName}}</p>
          </div>
        </div>
        <div class="q">
          <a class="set">
            <span>设置</span>
            <div class="triangle"></div>
          </a>
          <a class="feedback">
            <span>客服与反馈</span>
            <div class="triangle"></div>
          </a>
        </div>
        <button @click="loginOut">退出登录</button>
      </div>
      <toast/>
    </main-content>
  </div>
</template>

<script>
import TopNav from "../../../components/common/TopNav";
import MainContent from "../../../components/common/MainContent";
import Toast from "../../../components/common/toast/Toast";

export default {
  name: "Profile",
  data(){
    return{
      title: '个人中心',

    }
  },
  components:{
    TopNav,
    MainContent,
    Toast,
  },
  computed:{
    user(){
      return this.$store.state.user.name
             ? this.$store.state.user
             : JSON.parse(localStorage.getItem('userInfo'))
    },
    name(){
      return this.user.name
    },
    gender(){
      return this.user.gender
    },
    role(){
      return this.user.role
    },
    schoolName(){
      return this.user.schoolName
    }
  },
  methods:{
    loginOut(){
      this.$store.commit('setState');
      this.$router.push('/login');
      window.localStorage.removeItem('userInfo');
      window.sessionStorage.removeItem('store');
      localStorage.clear();
    }
  }
}
</script>

<style scoped>
#profile{
  position: relative;
  width: 100%;
  height: 100%;
}
.profile-content{
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
}
.content_top{
  width: 544px;
  height: 168px;
  margin: 60px 296px 0;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
.content_top img{
  float: left;
  width: 120px;
  height: 120px;
  margin: 24px 0;
  border: 2px solid rgba(0,0,0,0.09);
  border-radius: 120px;
  overflow: hidden;
}
.content_top .text{
  display: flex;
  flex-direction: column;
  justify-content: center;
  float: left;
  margin: 24px 24px;
  text-align: left;
}
.text p:nth-child(1){
  width: 40px;
  height: 20px;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #000000;
  line-height: 20px;
  font-weight: 500;
}
.text p{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #6B6B6B;
  line-height: 16px;
  font-weight: 500;
  margin: 9px 0;
}
.q{
  display: flex;
  flex-direction: column;
  width: 544px;
  margin: 0 auto;
  background-color: #fff;
}
.set, .feedback{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #4D4D4D;
  font-weight: 400;
  border-bottom: 1px solid rgba(0,0,0,0.12);
}
.set .triangle, .feedback .triangle{
  float: right;
  width: 14px;
  height: 14px;
  border-top: 2px solid #D9D9D9 ;
  border-right:2px solid #D9D9D9 ;
  transform: rotate(45deg);
  margin-right: 10px;
}
button{
  width: 150px;
  height: 50px;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border: none;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 16px;
  font-weight: 500;
  margin-top: 100px;
}

</style>