<template>
  <!--  当前课程组件-->
  <div id="historyCourseList">
    <!--  页面顶部CPS课程-->
    <div class="tab-nav">
      <top-nav :title="message"></top-nav>
    </div>
    <!--页面内容-->
    <div class="scroll-content">
      <div class="course-content">
        <div class="courseListContent">
          <class-list :is-btn="true" :course="historyCourse">

          </class-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../../../components/common/TopNav";
import ClassList from "../../../components/common/ClassList";
export default {
  name: "CurrentCourse",
  data(){
    return {
      message: '历史课程',
    }
  },
  components:{
    TopNav,
    ClassList
  },
  computed:{
    historyCourse(){
      return localStorage.getItem('teacher')
          ?  JSON.parse(localStorage.getItem('teacher')).historyCourse
          :this.$store.state.teacher.historyCourse
    }
  }
}
</script>

<style scoped>
#historyCourseList{
  position: relative;
  width: 100%;
  height: calc(100% - 50px);
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
  height: calc(100% - 74px);
  flex: 1;
  position: absolute;
  top: 74px;
  overflow: scroll;
}
.course-content{
  position: absolute;
  left: 50%;
  top: 0;
  transform: translate(-568px);
  width: 1136px;
  /* height: 870px;*/
  height: 100%;
}

.text p:nth-child(1){
  font-family: SourceHanSansSC-Medium;
  font-size: 18px;
  color: #417AF1;
  letter-spacing: 2.1px;
  font-weight: 500;
  margin-top: 8px;
}
.text p:nth-child(2){
  font-family: Baloo2-Regular;
  font-size: 14px;
  color: #417AF1;
  letter-spacing: -0.7px;
  font-weight: 400;
}
</style>