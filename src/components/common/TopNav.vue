<template>
<!--  顶部组件-->
  <div class="top">
    {{title}}
  </div>
</template>

<script>
export default {
  name: "TopNav",
  data(){
    return{

    }
  },
  props:{
    title:{
      type: String,
      default() {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.top{
  position: fixed;
  top: 24px;
  width: 100%;
  height: 50px;
  background-color: #FFFFFF;
  font-family: PingFangSC-Medium;
  font-size: 17px;
  color: #333333;
  text-align: center;
  font-weight: 500;
  line-height: 50px;
  box-shadow: 0 2px 0 0 rgba(0,0,0,0.06);
}
</style>