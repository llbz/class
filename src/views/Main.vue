<template>
<!--  主页面-->
<div id="t-main" >
<!--  <bottom-nav/>-->
<!--  底部导航-->
  <keep-alive>
  <router-view>
  </router-view>
  </keep-alive>
  <tab-control :titles="['当前课程', '历史课程', '个人中心']"
               ref="tabControl1"
               class="tabControl"
               @tabClick="tabClick"
               v-if="isTabControl"
  />

</div>
</template>

<script>
/*import BottomNav from "../components/common/BottomNav";*/
import TabControl from "../components/content/tabcontrol/TabControl";

export default {
  name: "Main",
  data() {
    return {
      currentType: 'teacher/current',

    }
  },
  components: {
    // BottomNav
    TabControl,
  },
  created() {
    this.$store.commit('setIsTabControl', true);
  },
  computed:{
    isLogin(){
     /* return localStorage.getItem('isLogin')
             ? localStorage.getItem('isLogin')
             : false*/
      return this.$store.state.isLogin;
    },
    isTabControl(){
      return  this.$store.state.isTabControl;
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0: {
          this.currentType = 'current'
          break
        }
        case 1: {
          this.currentType = 'historycourse'
          break
        }
        case 2: {
          this.currentType = 'profile'
        }
      }
      /*this.$router.push(this.currentType)*/
    }
  },

 /* created() {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },*/
  mounted() {

  },
  watch:{
    currentType(){
      this.$router.push(this.currentType)
    },
  },

}

</script>

<style scoped>
#t-main{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>