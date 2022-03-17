<template>
<!--  当前课程组件-->
<div id="current-course">
<!--  页面顶部信息-->
  <div class="tab-nav">
    <top-nav :title="message"></top-nav>
  </div>
<!-- 班级页面-->
  <class v-if="isClass" @sendTeams="sendTeams" @setIsMonitor="setIsMonitor"/>
<!-- 监控页面-->
  <monitor v-else-if="!isClass && isMonitor" :teams="monitorTeam" :number-of-class="numberOfClass"/>
  <!--当前页面的课程-->
  <div class="scroll-content" v-else>
    <div class="course-content">
      <div class="logo">
        <img src="../../../assets/img/logo1.png" alt="">
      </div>
      <div class="courseListContent">
        <class-list :course="course" :role="role"/>
      </div>
    </div>
  </div>

</div>
</template>

<script>

import TopNav from "../../../components/common/TopNav";
import ClassList from "../../../components/common/ClassList";
import Class from "./class/Class";
import Monitor from "./class/Monitor";
import {cancelClass} from "../../../netWork/api";
export default {
  name: "CurrentCourse",
  data(){
    return {
      message: 'CPS课程',
      course: this.$store.state.teacher.class,
      role: this.$store.state.userInfo.role,
      isClass: this.$store.state.isClass,
      teams: [],
      monitorTeam: [],
      numberOfClass: 5,
      //标识教师端是否在监控页面
      isMonitor: localStorage.getItem('isMonitor')
               ?localStorage.getItem('isMonitor')
               : false,
    }
  },
  created() {
    this.$store.commit('setIsRequireClassStudent', true);
  },
  components:{
    TopNav,
    ClassList,
    Class,
    Monitor
  },
  methods:{

    /*
    * 将组队页面的组队信息记录下来，用于教师的监控页面
    * */
    sendTeams(args){
      console.log(args);
      this.monitorTeam = args.team;
      this.numberOfClass = args.numberOfClass;
      localStorage.setItem('teams', JSON.stringify(args.team))
    },

    setIsMonitor(args){
      this.isMonitor = args;
    },
  },
  mounted() {
    /*
    * 监听点击toast确定按钮发出的isClass事件
    * 该事件为取消组队事件
    * 首先将store中的isClass标识置否
    * 发出取消组队的网络请求，告知服务器
    * */
    this.$EventBus.$on('deleteClass',() => {
       console.log('1111');
      this.teams = [];
      console.log(this.$store.state.classId);
      console.log(this.$store.state.user.UID);
      cancelClass({classID: this.$store.state.classId, id: this.$store.state.user.UID})
          .then( (res) => {
            console.log(res);
            this.$store.commit("setIsClass", false);
           // this.$EventBus.$off('isClass');
          })

      //console.log(this.$store.state.isClass);
    });
  },
  computed:{
    Class(){
      return this.$store.state.isClass
    },
    // 当前课程的邀请码
   /* inCode(){
      if(this.$store.state.teacher.vertification) {
        console.log('11111111111111111');
        return this.$store.state.teacher.vertification
      }

       else{
        console.log('222222222222222222');
        console.log(JSON.parse(localStorage.getItem('teacher')));
        return JSON.parse(localStorage.getItem('teacher')).vertification;
      }
    },*/
  },
  watch:{
    Class(){
      this.isClass = this.$store.state.isClass;

    }
  },
}
</script>

<style scoped>
#current-course{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.tab-nav{
  height: 74px;
}
.scroll-content{
  width: 100%;
  /*height: 870px;*/
  height: calc(100% - 74px - 50px - 15px);
  flex: 1;
  position: absolute;
  top: 74px;
  overflow: scroll;
}
.course-content{
  height: 100%;
  position: absolute;
  left: 50%;
  top: 0;
  display: flex;
  flex-direction: column;
  transform: translate(-50%);
  width: 1136px;
 /* height: 870px;*/
  height: 100%;
}
.logo{
  text-align: left;
}
.logo img{
  width: 382px;
  height: 60px;
}
.courseListContent{
  flex: 1;
}
</style>