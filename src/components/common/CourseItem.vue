<template>
<!--  单个课程卡片组件-->
<div id="courseitems">
  <div class="courseimg">

  </div>
  <div class="comment">
    <h4>{{taskTheme }}</h4>
    <p>课程的描述说明</p>
    <button @click="Sclassbtn" v-if="this.isBtn">查看详情</button>
    <button @click="Tclassbtn" v-if="!this.isBtn">新建</button>
  </div>
</div>
</template>

<script>
import  {requireVertification} from "../../netWork/api";

export default {
  name: "CourseItem",
  props:{
    role:{
      type: String,
      default: ''
    },
/*
    btn用来控制不同按钮，默认是false，显示的新建的按钮样式
*/
    isBtn: {
      type: Boolean,
      default(){
        return false;
      }
    },
    courseItem:{
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default(){
        return 0
      }
    },
  },
  computed:{
    taskTheme(){
      if(this.courseItem.taskInfo){
        return this.courseItem.taskInfo.taskTheme
      }
      else{
        return this.courseItem.taskTheme
      }
    },

  },
  methods:{
   /*
   教师端点击新建按钮触发该事件
   先向服务器请求课程邀请码
   邀请码请求成功后，将邀请码，以及相应控制变量写入store中
   * */
    Tclassbtn(){
      console.log(this.$store.state.user.id);
      console.log(this.$store.state.userInfo.id);
      requireVertification({
        id: this.$store.state.user.id,
        classID: '1',
        className: '1',
        taskID: this.courseItem.taskID
      })
      .then(res =>{
        console.log(res);
        //将邀请码写入store中
        this.$store.commit('setVertification', res);
        console.log(this.$store.state.classId);
        console.log(JSON.parse(localStorage.getItem('teacher')));
        if(this.$store.state.teacher.vertification || JSON.parse(localStorage.getItem('teacher')).vertification){
         // this.$router.push('class');
          //修改isClass信号量为true，会进入新建班级页面
          this.$store.commit('setIsClass', true);
          console.log(this.$store.state.isClass);
          //设置index的值
          this.$store.commit('setIndex', this.index)
          console.log(this.index);
        }
      })

    },
    Sclassbtn(){
      if(this.$store.state.userInfo.role === 'teacher' || JSON.parse(localStorage.getItem('userInfo')).role === 'teacher'){
        this.$store.commit('setIndex', this.index)
        this.$router.push('historycourseitem')
      }
      else if(this.$store.state.userInfo.role === 'student' || JSON.parse(localStorage.getItem('userInfo')).role === 'student'){
        console.log("11111");
      }

    }
  },
}
</script>

<style scoped>
#courseitems{
  display: flex;
  width: 100%;
  height: 187px;
  background-color: #FFFFFF;
  border: 2px solid rgba(0,0,0,0.06);
  box-shadow: 0 3px 9px 0 rgba(0,0,0,0.04);
  border-radius: 8px;
  margin: 15px 0;
}
.courseimg{
  width: 50%;
  height: 151px;
  background-color: #e8a2a2;
  margin: 18px;
  border-radius: 3px;
}
.comment{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  margin: 18px;
  margin-left: 0;
}
.comment h4{

  font-family: PingFangSC-Medium;
  margin-bottom: 6px;
  text-align: left;
  font-size: 20px;
  letter-spacing: 3px;
  color: #000000;
  line-height: 20px;
  font-weight: 500;
}
.comment p{
  text-align: left;
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8A8A8A;
  font-weight: 400;
}
.comment button{
  width: 102px;
  height: 40px;
  background: #417AF1;
  border: none;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 16px;
  font-weight: 500;
}
</style>