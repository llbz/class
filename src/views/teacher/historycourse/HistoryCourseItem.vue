<template>
<!--  历史课程组件-->
<div id="history-course">
<!--  历史课程顶部-->
 <top-nav :title="message"></top-nav>
<!--  历史课程内容-->
  <main-content>
    <div class="historycourse-contnet">
      <team :is-exist="true" :in-code="item.vertification" :titles = "item.taskInfo" :state="state">
        <div class="top" slot="top-content">点击组号查看学生答题情况</div>
      </team>
    </div>
  </main-content>

</div>
</template>

<script>
import TopNav from "../../../components/common/TopNav";
import MainContent from "../../../components/common/MainContent";
import Team from "../../../components/common/Team";

export default {
  name: "HistoryCourse",
  data(){
    return{
      incode: 'TV59B3',
      count: '32',
      title: '气候变暖',
      state: '课程已结束',
      team:[
          [
            {id: 'A组'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
          ],
          [
            {id: 'B组'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
            {img: '', name: '学生名字'},
          ],

      ]
    }
  },
  components: {
    TopNav,
    MainContent,
    Team,
  },
  computed:{
    i(){
      return this.$store.state.index
      ? this.$store.state.index
          : localStorage.getItem('index')
    },
    item(){
      return this.historyClass[this.i]
    },
    historyClass(){
      return localStorage.getItem('teacher')
          ?  JSON.parse(localStorage.getItem('teacher')).historyCourse
          :this.$store.state.teacher.historyCourse
    },
    message(){
      return this.item.taskInfo.taskTheme
    }
  },
  mounted() {
    console.log(this.historyClass[this.i]);
  }

}
</script>

<style scoped>
#history-course{
  width: 100%;
  height: 100%;
}

.historycourse-contnet{
  position: absolute;
  display: flex;
  width:100%;
  height: 100%;
}
.historycourse-contnet .top{
  width:100%;
  text-align: center;
  background: #F0F0F0;
  font-family: PingFangSC-Medium;
  font-size: 25px;
  color: #000000;
  line-height: 70px;
  font-weight: 500;
  border-radius: 10px;
}

</style>