<template>
<!--  底部组件-->
<div class="tab-control">
  <div class="bottom">
    <div
        v-for="(item, i) in titles"
        :key="i"
        class="tab-control-item"
        @click="itemClick(i)"
        :class="{active: currentIndex === i}"
    >
      <img :src= imgActiveAddress[i] alt="" v-if="(currentIndex === i)">
      <img :src=imgAddress[i] alt="" v-if="!(currentIndex === i)">
       {{item}}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
      index: 0,
      imgAddress: [require('../../../assets/img/course.png'),
        require('../../../assets/img/history.png'),
        require('../../../assets/img/profile.png')],

      imgActiveAddress: [require('../../../assets/img/course-on.png'),
        require('../../../assets/img/history-on.png'),
        require('../../../assets/img/profile-on.png')]
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.index = index;
     // this.$emit("tabClick", index);
    },

  },
  watch:{
    currentIndex(){
      this.$emit("tabClick", this.index);
    }
  },
  created() {
    this.$emit("tabClick", this.index);
  }
}
</script>

<style scoped>
.tab-control {
  width: 100%;
  height: 50px;
  /*display: flex;
  justify-content: center;
  height: 50px;
  line-height: 50px;*/
  background: #fff;
  border-top: 1px solid rgba(0, 0, 0, .1);
  position: fixed;
  bottom: 15px;
}
.bottom{
  display: flex;
  align-content: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  align-items: center;
  margin: 0 auto;
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: #333333;
  font-weight: 500;
}
.bottom img{
  width: 16px;
  height: 20px;
  margin-right: 5px;
}
.tab-control-item {
  flex: 1;
  display: flex;
  color: #333333;
  align-content: center;
  justify-content: center;
}
.active{
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: #417AF1;
  font-weight: 500;
}


</style>