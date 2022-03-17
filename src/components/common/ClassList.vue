<template>
  <div class="top">
    <div class="courselist" v-for="(item, index) in course" :key="index">
      <course-item :is-btn="isBtn" :course-item="item" :index= 'index' :role="role"/>
    </div>
  </div>
</template>

<script>
import CourseItem from "./CourseItem";
export default {
  name: "ClassList",
  props:{
    role:{
      type: String,
      default: ''
    },
    /*isBtn控制按钮样式的，false时候为新建按钮*/
    isBtn:{
      type: Boolean,
      default(){
        return false
      }
    },
     course:{
        type: Array,
      default(){
        return []
      }
    }
  },
  components:{
    CourseItem,
  },
}
</script>

<style scoped>
.top{
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
 align-content: flex-start;
}
.courselist{
  width: 48%;
  height: 227px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>