<template>
<!--  课程班级组件-->
<div id="class">
  <top-nav :title="titles.taskTheme"></top-nav>
<!--  <div class="goback" @click="goBack">
    <span class="icon-font"></span>
  </div>-->
  <main-content>
    <div class="team-content">
      <team :titles="titles"
            :inCode="inCode"
            :state="state"
            :is-exist="true"
            :is-teams-null= "isTeamsNull"
            :teams="team"
            :number-of-class="numberOfTeam"
            :count="count"
            @cancelCourse="cancelCourse"
      >
        <div class="top" slot="top-content">
          <div class="top-left">
            组队逻辑
            <button :class="{disabled: disabled}" class="random" @click="random">随机</button>
          </div>
          <div class="top-center">
            <span>组内人数</span>
            <div>
              <div class="img" @click="reduceNumberOfTeam" :class="{reduceDisabled: reduceDisabled}"><img src="../../../../assets/img/reduce.png" alt=""></div>
              {{numberOfTeam}}
              <div class="img" @click="plusNumberOfTeam" :class="{plusDisabled: plusDisabled}"><img src="../../../../assets/img/plus.png" alt="" ></div>
            </div>
          </div>
          <button class="top-right" :class="{startClassDisabled: startClassDisabled}"  @click = startCourse>
            <span  v-if="!isPoint">开始上课</span>
            <div class="point" v-else>
              <div class="point1"></div>
              <div class="point2"></div>
              <div class="point3"></div>
            </div>
          </button>
        </div>
      </team>
    </div>

  </main-content>
</div>
</template>

<script>
let temp = [];
let temp1 = [];
import TopNav from "../../../../components/common/TopNav";
import MainContent from "../../../../components/common/MainContent";
import Team from "../../../../components/common/Team";

import {startClass} from "../../../../netWork/api";



export default {
  name: "class",
  props:{
    teams:{
      type: Array,
      default(){
        return []
      }
    }
  },
  data(){
    return{
      classId: '',
      disabled: true,
      //控制组内人数加减的按钮是否可以点击
      reduceDisabled: true,
      plusDisabled: true,
      startClassDisabled: true,
      count: 0,
      state: '组队中 ...',
      index: this.$store.state.index,
      counter: 6,
      titles: {},
      //课程包中关于每组人数的规定
      numberCourse: {number: 3, count: 3},
      numberOfTeam: 0,
      isPoint: false,
      team: [],
      team1: [],
      teams1: []
    }
  },
  components:{
    TopNav,
    MainContent,
    Team
  },
  created() {
    this.titles = this.$store.state.teacher.class[this.index] || JSON.parse(localStorage.getItem('teacher')).class[this.index]
    this.numberOfTeam = this.numberCourse.number;
  },

  mounted() {
    //console.log(this.inCode);
    if(this.numberCourse.count > 0 && this.teams.length > 0){
      this.plusDisabled = false;
    }

  },
  methods:{
    //点击随机按钮事件
    random(){
      console.log('22222222222222');
      this.teamsRandoms(this.team1);
      console.log(this.team1);
      this.team = this.groupTeams(this.team1, this.numberOfTeam);

    },
    cancelCourse(){
      //退出当前课程以及组队页面
      this.$toast.show({
        isShow: true,
        sure: 3,
        isShow1: true,
        isToastBtn: true,
        message1: '确定返回？当前组队信息将全部清空！',
        duration: 40000,
      })
    },
    reduceNumberOfTeam(){
      this.numberOfTeam--;
      this.team = this.groupTeams(this.team1, this.numberOfTeam);
      if(this.numberCourse.count > 0 && this.numberOfTeam > this.numberCourse.number){
        this.reduceDisabled = false;
      }
      else{
        this.reduceDisabled = true;
      }
      this.plusDisabled = false;
    },
    plusNumberOfTeam(){
      this.numberOfTeam++;
      this.team = this.groupTeams(this.team1, this.numberOfTeam);
      console.log(this.team);
      if(this.numberCourse.count > 0 && this.numberOfTeam < (this.numberCourse.number + this.numberCourse.count)){
        this.plusDisabled = false;
      }
      else{
        this.plusDisabled = true;
      }
      this.reduceDisabled = false;
    },
    teamEnd(){
      console.log(this.teams);
      this.$emit('sendTeams', {
        team: this.team,
        numberOfClass: this.numberOfTeam,
      });
      this.team.forEach((arr) => {
        arr.forEach((item) => {
          if(item.id && item.role){
            temp.push(item.id)
          }
        })
        temp1.push(temp);
        temp = [];
      })
      this.classId = this.$store.state.classId;
      console.log(temp1);
      startClass({classID: this.$store.state.classId, groupResult: JSON.stringify(temp1)})
          .then(() => {
            this.isPoint = false;
            this.$emit('setIsMonitor', true);
            localStorage.setItem('isMonitor', 'true');
            this.$store.commit('setIsClass', false);
          })
      temp1 = [];

      // var q = JSON.stringify(this.teams)
    },
    startCourse(){
      this.isPoint = true;
      this.teamEnd();
    },
    /*
    * 随机排序算法
    * */
    teamsRandoms(arr){
      for(let i = arr.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let temp = arr[randomIndex];
        arr[randomIndex] = arr[i];
        arr[i] = temp;
      }
    },
    /*
    * 加入课程的学生数组去重算法，返回每次新加入学生的数组
    * */
    newTeams(arr1, arr2){
      //console.log(arr1);
     // console.log(arr2);
      let temp = [];
      // console.log('1111111111111111');
      for(let i = 0; i < arr1.length; i++){
        let exit = true;
       // console.log('22222222222222222');
        for(let j = 0; j < arr2.length; j++){
          if(arr1[i].id === arr2[j].id){
            //console.log('4444444444444444');
            exit = false;
          }
        }
        if(exit){
         //console.log('333333333333');
          //arr2.push(arr1[i]);
          temp.push(arr1[i]);
        }
      }
     //console.log(arr2);
      return temp;
    },
    /*
    * 分组
    * */
    groupTeams(arr, count){
      let teams1 = [];
      for(let i = 0; i < arr.length; i++){
        teams1.push(arr[i])
      }
      let team1 = [];
      let temp = [];
      let counter = 0;
      let list =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // console.log(teams1);
      if(teams1.length!== 0){
        if (teams1.length <= count){
          temp[0] = {id: list[0]};
          teams1.forEach((item) => {
            temp.push(item)
          })
          team1.push(temp);
          return team1;
        }
        else{
          temp = [{id: list[counter++]}];
          for(let j = 0; j < teams1.length; j++){
            temp.push(teams1[j]);
            if(temp.length === count + 1){
              // console.log(temp);
              team1.push(temp);
              // console.log(team1);
              //判断是不是最后一个学生了
              temp = [{id: list[counter++]}]
            }
          }
          if(temp.length !== 1)
          {
            team1.push(temp);
          }
          return team1;
        }
      }
      return team1;
    }


  },
  computed:{
    /*
    * 排队分组算法
    * */
   /* team(){
      return this.groupTeams(this.teams, this.numberOfTeam);
     /!* let teams1 = [];
      for(let i = 0; i < this.teams.length; i++){
        teams1.push(this.teams[i])
      }
      let team1 = [];
      let temp = [];
      let counter = 0;
      let list =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
     // console.log(teams1);
      if(teams1.length!== 0){
        if (teams1.length <= this.numberOfTeam){
          temp[0] = {id: list[0]};
          teams1.forEach((item) => {
            temp.push(item)
          })
          team1.push(temp);
          return team1;
        }
        else{
          temp = [{id: list[counter++]}];
          for(let j = 0; j < teams1.length; j++){
            temp.push(teams1[j]);
            if(temp.length === this.numberOfTeam + 1){
             // console.log(temp);
              team1.push(temp);
             // console.log(team1);
              //判断是不是最后一个学生了
                temp = [{id: list[counter++]}]
            }
          }
          if(temp.length !== 1)
          {
            team1.push(temp);
          }
          return team1;
        }
      }
      return team1;*!/
    },*/
    isTeamsNull(){
      if(this.teams.length === 0){
        return true
      }
      else{
        return false
      }
    },
    isClass(){
      return this.$store.state.isClass;
    },
    inCode(){
      return this.$store.state.teacher.vertification || JSON.parse(localStorage.getItem('teacher')).vertification
    }
  },
  watch:{
    deep: true,
    immediate: true,
    team(){
      console.log('999999999999999999');
      //this.count = this.team.length;
      if(this.teams.length > this.numberOfTeam && this.team.length > 1){
        this.disabled = false
      }
      else{
        this.disabled = true
      }
    },
    team1(){
      //console.log('666666666666666');
    },
    teams(){
      if(this.teams.length > 0){
        this.startClassDisabled = false
      }
      //console.log(this.teams);
      let temp  = this.newTeams(this.teams, this.team1);
     // console.log(temp);
      if(temp.length > 0) {
        //console.log('666666666666666666');
       this.team1 =  this.team1.concat(temp);
       this.count = this.team1.length;
       // console.log(this.team1);
        this.team = this.groupTeams(this.team1, this.numberOfTeam);
        // console.log(this.team);
      }
    }
  },

}
</script>

<style scoped>
#class{
  width: 100%;
  height: 100%;
}
.goback{
  text-align: center;
  position: fixed;
  top: 30px;
  left: 15px;
  font-size: 22px;
  color: #417AF1;
}

.team-content{
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
}

.left .bottom p:nth-child(2){
  font-weight: 500;
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #417AF1;
  line-height: 18px;
  font-weight: 500;
}

.logic button{
  width: 72px;
  height: 44px;
  background: #EBEBEB;
  border-radius: 22px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3A69CA;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
}
.counter span{
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #417AF1;
  line-height: 18px;
  font-weight: 500;
}

.team-content .top{
  width: 100%;
  background: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  font-family: PingFangSC-Regular;
  align-items: center;
  font-size: 16px;
  color: #525252;
  font-weight: 400;
}
.top .top-left button{
  width: 72px;
  height: 44px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  margin-left: 15px;
  background: #417AF1;
  border-radius: 44px;
  color: #FFFFFF;
}
.top .top-left .disabled{
  background: #ecebeb;
  color: #417AF1;
  border-radius: 44px;
  opacity: .5;
}
.top .top-center{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 44px;
}
.top .top-center div{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 44px;
  background: #EBEBEB;
  color: #417AF1;
  border-radius: 22px;
  margin: 0 18px;
}
.top .top-center .img{
  margin-left: 5px;
  margin-right: 5px;
  width: 34px;
  height: 34px;
  background: #417AF1;
  border-radius: 18px;
}
.top .top-center .reduceDisabled{
  background-color: #d5d4d4;
  pointer-events: none;
  cursor: default;
}
.top .top-center .plusDisabled{
  background-color: #d5d4d4;
  pointer-events: none;
  cursor: default;
}
.top .top-center img{
  width: 16px;
  height: 16px;
  margin: 0 auto;
}
.top .top-right{
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
}
.top .startClassDisabled{
  background: #ecebeb;
  color: #417AF1;
  opacity: .5;
  box-shadow: none;
}


.class-team .team .team-item span{
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #8A8A8A;
  font-weight: 400;
}
.team-content .disabled{
  pointer-events: none;
  cursor: default;
}
.point{
  display: flex;
  justify-content: center;
}
.point2{
  margin: 0 5px;
}
.point > div{
  width: 10px;
  height: 10px;
  background-color: #fff;
  opacity: 50%;
  border-radius: 50%;
  display: inline-block;
  animation: action 1s infinite ease-in-out;
}
.point .point1{
  animation-delay: -.4s;
}
.point .point2{
  animation-delay: -0.2s;
}
@keyframes action {
  0%, 20%{
    transform: scale(0);
    opacity: .2;
  }
  40%{
    transform: scale(.2);
    opacity: .4;
  }
  60%{
    transform: scale(.4);
    opacity: .6;
  }
  80%{
    transform: scale(0.6);
    opacity: .8;
  }
  100%{
    transform: scale(1.0);
    opacity: 1;
  }
}
</style>