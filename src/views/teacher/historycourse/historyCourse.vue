<template>
  <!--  历史课程组件-->
  <div id="history-course">
    <!--  历史课程顶部-->
    <top-nav :title="title"/>
    <div class="content">
      <div class="classlist">
        <class-list :is-btn="isBtn" :course="historyCourse"/>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from "../../../components/common/TopNav";
import ClassList from "../../../components/common/ClassList";

export default {
  name: "HistoryCourse",
  data(){
    return{
      title: '课程班级',
      isBtn: true,
    }
  },
  components: {
    TopNav,
    ClassList,
  },
  computed:{
    historyCourse(){
      return localStorage.getItem('teacher')
             ?  JSON.parse(localStorage.getItem('teacher')).historyCourse
             :this.$store.state.teacher.historyCourse
    }
  },

  mounted() {
    console.log(JSON.parse(localStorage.getItem('teacher')).historyCourse);
  }
}
</script>

<style scoped>
#history-course{
  width: 100%;
  height: 100%;
}
.content{
  width: 100%;
  height: 870px;
  margin-top: 80px;
  overflow: scroll;
}
.classlist{
  width: 1136px;
  height: 100%;
  margin: 0 auto;
}
</style>