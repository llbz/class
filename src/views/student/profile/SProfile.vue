<template>
  <div id="profile">
    <top-nav :title="title"/>
    <main-content>
      <div class="content_top">
        <img src="" alt="">
        <div class="text">
          <h2>{{name}}</h2>
          <p>{{gender}} &nbsp;&nbsp;{{className}}</p>
          <p>{{ schoolName }}</p>
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
  computed:{
    name(){
      return  this.$store.state.student.im.user.name
    },
    gender(){
      return this.$store.state.student.im.user.gender
    },
    className(){
      return this.$store.state.student.im.user.className
    },
    schoolName(){
      return this.$store.state.student.im.user.schoolName
    }
  },
  components:{
    TopNav,
    MainContent,
    Toast,
  },
  mounted() {
    console.log(this.$store.state.student.im.user);
  },
  methods:{
    loginOut() {
      this.$router.push('/login');
      this.$store.commit('setState');
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
  height: 100%;
}
.content_top{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 60px 296px 0;
  background: #FFFFFF;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.12);
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
.text h2{
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
  height: 116px;
  margin: 0 auto;
  line-height: 58px;
}
.set, .feedback{
  display: flex;
  justify-content: space-between;
  align-items: center;
 /* display: block;*/
  width: 544px;
  height: 58px;
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #4D4D4D;
  font-weight: 400;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.12);
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
  width: 104px;
  height: 36px;
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