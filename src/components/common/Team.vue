<template>
  <div class="team-content">
      <!--    左侧内容-->
      <aside class="left">
        <!--      顶部的课程信息-->
        <div class="img"></div>
        <h2>{{titles.taskTheme}}</h2>
        <p class="i">邀请码&nbsp;&nbsp; {{inCode}}</p>
        <p :class="{l: isExist}" v-if="isExist">（请将此邀请码告知同学们）</p>
        <p class="c">当前人数&nbsp;&nbsp;{{count}}人</p>
        <!--      底部的课程状态-->
        <div class="bottom">
          <div class="bottom-left">
            <p>课程状态</p>
            <p :class="{color: isColor}">{{state}}</p>
          </div>
          <div class="bottom-right">
            <button @click="cancelCourse">取消课程</button>
          </div>
        </div>
      </aside>
      <!--    右侧内容-->
      <aside class="right">
        <div class="team-top">
          <slot name="top-content"></slot>
        </div>
        <div class="classteam">
          <div v-if="isTeamsNull" class="tips">等待学生加入课程中</div>
          <div class="team" v-for="(items, index1) in teams" :key="index1">
            <!--          <div class="leftitem">{{items[0].id}}组</div>-->
            <div class="team-item-content">
              <div class="team-item" v-for="(item, index2) in items" :key="index2" :class="{n1: isN1, n2: isN2, n3: isN3, n4: isN4, n5: isN5, n6: isN6}">
                <a href="#" v-if="index2 === 0">{{item.id}}</a>
                <div v-else class="team-item-student">
                  <div class="photo"></div>
                  <span>{{item.name}}</span>
                  <span v-if="false">课程昵称</span>
                </div>
              </div>
            </div>
            <button v-if="isButton">上课</button>
          </div>
        </div>
      </aside>
  </div>
</template>

<script>
/*let temp = [];
let temp1 = [];*/
export default {
  name: "Team",
  props:{
    //每组人数，默认5
    numberOfClass:{
      type: Number,
      default(){
        return 5
      }
    },
    //有没有学生，默认为false，提示语会出现
    isTeamsNull: {
      type: Boolean,
      default(){
        return false
      }
    },
    //邀请码下的提示语是否存在，默认为false
    isExist:{
      type: Boolean,
      default(){
        return false
      }
    },
    //课程
    /*messages: {
      type: String,
      default: ''
    },*/
    //邀请码
    inCode:{
      type: String,
      default(){
        return ''
      }
    },
    //当前人数
    count: {
      type: Number,
      default: 0
    },
    //课程标题
    titles:{
      type: Object,
      default(){
        return {}
      }
    },
    //当前课程学生数组
    teams:{
      type: Array,
      default(){
        return []
      }
    },
    //左下角课程状态
    state:{
      type: String,
      default(){
        return ''
      }
    },
    //每组后的上课按钮是否存在，默认为true
    isButton:{
      type: Boolean,
      default(){
        return true
      }
    },
    //左下角状态的字体颜色，默认为true，显示主题色
    isColor:{
      type: Boolean,
      default(){
        return true
      }
    }
  },
  data() {
    return {
      isN1 : false,
      isN2 : false,
      isN3 : false,
      isN4 : false,
      isN5 : false,
      isN6 : false,
      /* number: this.numberOfTeam(this.numberOfClass),*/
    }
  },
  computed:{

  },

  mounted() {
    //刷新
   this.refresh();
   // console.log(this.titles);
   // console.log(this.$store.state.teacher.vertification);
  },
  methods:{
    cancelCourse(){
      this.$emit('cancelCourse');
    },
    //刷新，重置每组学生平分的份额
    refresh(){
      if(this.numberOfClass === 1){
        this.isN1 = true
      }
      else{
        this.isN1 = false
      }
      if(this.numberOfClass === 2) this.isN2 = true
      else this.isN2 = false
      if(this.numberOfClass === 3) this.isN3 = true
      else this.isN3 = false
      if(this.numberOfClass === 4) this.isN4 = true
      else this.isN4 = false
      if(this.numberOfClass === 5) this.isN5 = true
      else this.isN5 = false
      if(this.numberOfClass === 6) this.isN6 = true
      else this.isN6 = false
    },
  },
  watch:{
   /* teams(){
      console.log(this.teams);
      this.teams.forEach((arr) => {
        arr.forEach((item) => {
          if(item.id && item.role){
            temp.push(item.id)
          }
        })
        temp1.push(temp);
        temp = [];
      })
      console.log(temp1);

      // var q = JSON.stringify(this.teams)
    },*/
    numberOfClass(){
      this.refresh();
    }
  }

}
</script>

<style scoped>
.team-content{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
}

.left{
  position: relative;
  width: 30%;
  flex: 1;
  border-right: 1px solid rgba(0,0,0,0.1);
}
.left .img{
  width: 85%;
  margin: 7.5%;
  height: 187px;
  background-color: pink;
  border-radius: 2%;
}
.left h2 ,p{
  margin: 4% 7.5%;
  text-align: left;
}
.left h2{
  font-family: PingFangSC-Medium;
  font-size: 25px;
  color: #000000;
  line-height: 25px;
  font-weight: 500;
}
.left .i{
  font-family: PingFangSC-Regular;
  font-size: 25px;
  color: #0a0a0a;
  line-height: 25px;
  font-weight: 500;
}
.left .c{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8A8A8A;
  line-height: 20px;
  font-weight: 400;
}
.left .l{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #8A8A8A;
  line-height: 20px;
  font-weight: 400;
}
.color{
  color: #417AF1 !important;
}
.left .bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 15%;
  padding: 2%;
  border-top: 1px solid rgba(0,0,0,0.1);

}
.bottom .bottom-left{
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
}
.bottom .bottom-right{
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;

}
.bottom-right button{
  position: absolute;
  width: 100px;
  height: 38px;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  left : 50% ;
  top : 50% ;
  transform: translate(-50px, -38px);
}
.left .bottom p:nth-child(2){
  font-family: PingFangSC-Medium;
  font-size: 25px;
  color: #000000;
  line-height: 25px;
  font-weight: 500;
}
.right{
  display: flex;
  flex-direction: column;
  flex: 2;
}
.right .team-top{
  width: 90%;
  height: 70px;
  text-align: center;
  margin: 5%;
  background: #F0F0F0;
  font-family: PingFangSC-Medium;
  font-size: 25px;
  color: #000000;
  line-height: 70px;
  font-weight: 500;
  border-radius: 10px;
}
.right .classteam{
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 5%;
  margin-bottom: 20px;
  flex: 1;
}
.classteam .tips{
  font-size: 26px;
  color: black;
}
.classteam .team{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 70px;
  /* height: 15%;*/
  background: #F0F0F0;
  margin-bottom: 20px;
  border-radius: 10px;
}
.team-item-content{
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.classteam .team button{
  width: 50px;
  height: 38px;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 10px;
  color: #FFFFFF;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  margin-right: 10px;
}

.classteam .team .team-item:nth-child(1){
  width: 10%;
  font-family: PingFangSC-Regular;
  font-size: 25px;
  color: #8A8A8A;
  font-weight: 400;
}
.classteam .team .team-item:nth-child(n + 2){
  display: flex;
  flex-direction: column;
  -webkit-align-items: center;
  padding: 1% 0;
}
.classteam .team .team-item div {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
}
.classteam .team .team-item .photo{
  width: 55px;
  height: 55px;
  border-radius: 55px;
  margin-bottom: 5px;
  background-color: deepskyblue;
}
.classteam .team .team-item span{
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #8A8A8A;
  font-weight: 400;
}
.classteam .n1{
  width: calc(90% / 1);
}
.classteam .n2{
  width: calc(90% / 2);
}
.classteam .n3{
  width: calc(90% / 3);
}
.classteam .n4{
  width: calc(90% / 4);
}
.classteam .n5{
  width: calc(90% / 5);
}
.classteam .n6{
  width: calc(90% / 6);
}
</style>