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
            :group-team="team"
            :course-team="team2"
            :number-of-class="numberOfTeam"
            :count="totalNumber"
            :team-state="teamState"
            :is-start-class="isStartClass"
            :number-of-team="numberOfTeam2"
            @cancelCourse="cancelCourse"
            @endGetGroupState="endGetGroupState"
            @startClass="startClass($event,index)"
      >
        <div class="top" slot="top-content">
          <div class="top-left">
            <span>组队逻辑</span>
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
let name = 1;
let temp1 = [];
//let student = [];
import TopNav from "../../../../components/common/TopNav";
import MainContent from "../../../../components/common/MainContent";
import Team from "../../../../components/common/Team";

import {startClass, teamStartClass, getTeamsState, requireClassStudent, endClass, getHistoryClass} from "../../../../netWork/api";



export default {
  name: "class",
  props:{
  },
  data(){
    return{
      isRequireClassStudent: true,
      //记录已经上课学生的上课状态
      teamState:{},
      teams: [],
      //判断是否需要查询已经上课的学生的上课状态
      isGetTeamsState: false,
      classId: '',
      disabled: true,
      isStartClass:false,
      //控制组内人数加减的按钮是否可以点击
      reduceDisabled: true,
      plusDisabled: false,
      //控制开始上课按钮是否可用
      startClassDisabled: true,
      //当前人数
      totalNumber: 0,
      state: '组队中 ...',
      index: this.$store.state.index,
      //分组的组号设置
      counter: 0,
      titles: {},
      //课程包中关于每组人数的规定
      numberCourse: this.$store.state.numberCourse,
      // 当前每小组的人数，可加减调整
      numberOfTeam: 2,
      //是否动画
      isPoint: false,
      //最后组完队后学生数组，长度代表分了几组，
      team: [],
      // 记录每次新进来的学生，也就是当前的所有学生
      team1: [],
      teams1: [],
      //记录已经开始上课的学生数组
      team2: [],
      //记录在组队中的学生数组，已经有小组开始上课了时将这个小组进行分组
      team3:[],
      list: 'ff',
      switchTeam : [],
      tempTeam: [],
    }
  },
  components:{
    TopNav,
    MainContent,
    Team
  },
  created() {
    //console.log('9999999999999999999999999999');
    this.titles = this.$store.state.teacher.class[this.index] || JSON.parse(localStorage.getItem('teacher')).class[this.index]
    this.numberOfTeam = this.numberCourse.number;
    this.isStartClass = false;
    //this.$store.commit('setIsRequireClassStudent', false);
  },

  mounted() {
    this.$EventBus.$on('teamEnd', () => {
      this.isPoint = true;
      this.team3 = [];
      this.teamEnd();
    })
    //console.log(this.inCode);
    this.$store.commit('setIsRequireClassStudent', true);
    this.requireStudent();
    this.$EventBus.$on('endCourse', () => {
      let count = 0;
      if(count === 0) {
        console.log('点击了取消课程按钮，结束了课程');
        endClass({classID: this.$store.state.classId, myID: this.$store.state.user.UID})
            .then((res) => {
              console.log(res);
              this.isGetTeamsState = false;
              this.$store.commit('setIsClass', false);
              this.$router.push('/teacher/current');
              getHistoryClass({id: this.$store.state.user.UID})
                  .then((res) => {
                    console.log(res);
                  })
            })
        count++;
      }
    })


  },
  methods: {
   /* //交换数组内两个元素的的位置
    switchState(student1, student2){
      console.log(student1);
      console.log(student2);
      let index1, index2, index3, index4;
      this.switchTeam = [];
      //学生交换
      /!*if(student2.id !== '999') {
        let switchTeam = [];
        console.log(this.team);
        this.team.forEach((item) => {
          item.forEach((item2) => {
            //console.log(item2);
            if (item2.name) {
              switchTeam.push(item2);
            }
          })
        })
        console.log(switchTeam);
        if (!this.isStartClass) {
          // console.log(this.team1);
          let index1, index2;
          for (let i = 0; i < switchTeam.length; i++) {
            if (switchTeam[i].id === student1.id && switchTeam[i].name === student1.name) index1 = i;
            if (switchTeam[i].id === student2.id && switchTeam[i].name === student2.name) index2 = i;
          }
          console.log(index1);
          console.log(index2);
          if (switchTeam[index2].id !== '999') {
            let temp = switchTeam[index1];
            switchTeam[index1] = switchTeam[index2];
            switchTeam[index2] = temp;
          }
          console.log(switchTeam);
          this.team = this.groupTeams(switchTeam, this.numberOfTeam);
          console.log(this.team);
          this.refreshTeam();
        }
      }*!/
       // this.teamCopy(this.team, switchTeam);
        for(let i = 0; i < this.team.length; i++){
          let temp = [];
          for(let j = 0; j < this.team[i].length; j++){
            if(this.team[i][j].name !== 'list'){
              temp.push(this.team[i][j]);
            }
          }
          this.switchTeam.push(temp);
        }
      console.log('交换前的');
      console.log(this.switchTeam);
      //console.log(student1);
      //console.log(student2);
      //找到交换学生的位置
        for(let i = 0; i < this.switchTeam.length; i++){
          for(let j = 0; j < this.switchTeam[i].length; j++){
            if (this.switchTeam[i][j].id === student1.id && this.switchTeam[i][j].name === student1.name)
            {
              index1 = i;
              index2 = j;
            }

            if (this.switchTeam[i][j].id === student2.id && this.switchTeam[i][j].name === student2.name)
            {
              index3 = i;
              index4 = j;
            }
          }
        }
        console.log(index1); console.log(index2);
        console.log(index3); console.log(index4);
        if(index1 !== index3) {
          let temp = this.switchTeam[index1][index2];
          this.switchTeam[index1][index2] = this.switchTeam[index3][index4];
          this.switchTeam[index3][index4] = temp;
        }
      console.log('交换后的');
      console.log(this.switchTeam);
      this.tempTeam = [];
        for(let i = 0; i < this.switchTeam.length; i++){
          let number = 0;
            for(let j = 0; j < this.switchTeam[i].length; j++){
              if(this.switchTeam[i][j].id !== '999'){
                this.tempTeam.push(this.switchTeam[i][j]);
                number++
              }
            }
            let count = this.numberOfTeam - number;
          console.log(count);
          for(let i = 0; i < count; i++){
            this.tempTeam.push({id: '999', name: name});
              name++;
            }
        }
      console.log(this.tempTeam);
      this.team = this.groupTeams(this.tempTeam,this.numberOfTeam);
       // this.refreshTeam();
       // this.refreshTeam();
    /!*  let index1, index2, index3, index4;
      let temp = {};
      if(student1.id !== student2.id) {
        for(let i = 0; i < this.team.length; i++){
          for(let j =0; j < this.team[i].length; j++){
            if(this.team[i][j].id === student1.id)
            {
              index1 = i;
              index2 = j;
            }
            if(this.team[i][j].id === student2.id) {
              index3 = i;
              index4 = j;
            }
          }

      }
      }
      temp = this.team[index1][index2];
      this.team[index1][index2] = this.team[index3][index4];
      this.team[index3][index4] = temp;*!/
      /!*console.log(index1);
      console.log(index2);
      console.log(index3);
      console.log(index4);*!/
    },
    dragStart(item){
      student = [];
      student.push(item);
      console.log(item);
    },
    drop(item){
      student.push(item)
      console.log(item);
    },
    dragOver(){
      this.switchState(student[0], student[1]);
      console.log('拖拽结束');
    },*/
    /*
  * 定时请求查询加入了课程的学生
  * 只有当isClass为真即进入课程页面才查询
  * 所有加入的学生以数组的形式返回，保存在teams中
  * */
    requireStudent(){
      //console.log('9999999999999999999999');
      if(this.$store.state.isClass){
        // console.log('88888888888888888888');
        var interVal1 = setInterval(() => {
          // console.log(this.$store.state.isRequireClassStudent);
         // console.log(this.$store.state.isRequireClassStudent);
          if(this.isRequireClassStudent){
            //console.log('77777777777777777777');
            //console.log(this.classID);
            requireClassStudent({'classID': this.classID})
                .then(
                    res => {
                      // console.log(res);
                      this.teams = res;
                    })
          }
          else {
            clearInterval(interVal1) ;
          }
        }, 10000)
      }
    },
    //点击随机按钮事件
    random() {
      if (!this.isStartClass) {
        console.log('22222222222222');
        this.teamsRandoms(this.team1);
        console.log(this.team1);
        this.team = this.groupTeams(this.team1, this.numberOfTeam);
        this.refreshTeam();
      } else {
        console.log('33333333333333333');
        this.teamsRandoms(this.team3);
        console.log(this.team3);
        this.team = this.groupTeams(this.team3, this.numberOfTeam);
        this.refreshTeam();
      }
    },
    //取消课程
    cancelCourse() {
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
    //组队要求的每组人数减一
    reduceNumberOfTeam() {
      this.numberOfTeam--;
      if (!this.isStartClass) {
        this.teamsRandoms(this.team1);
        this.team = this.groupTeams(this.team1, this.numberOfTeam);
        this.refreshTeam();
        console.log(this.team);
      } else {
        this.teamsRandoms(this.team3);
        this.team = this.groupTeams(this.team3, this.numberOfTeam);
        this.refreshTeam();
        console.log(this.team);
      }
      if (this.numberCourse.count > 0 && this.numberOfTeam > this.numberCourse.number) {
        this.reduceDisabled = false;
      } else {
        this.reduceDisabled = true;
      }
      this.plusDisabled = false;
    },
    //组队要求的每组人数加一
    plusNumberOfTeam() {
      this.numberOfTeam++;
      if (!this.isStartClass) {
        this.teamsRandoms(this.team1);
        this.team = this.groupTeams(this.team1, this.numberOfTeam);
        this.refreshTeam();
        console.log(this.team);
      } else {
        this.teamsRandoms(this.team3);
        this.team = this.groupTeams(this.team3, this.numberOfTeam);
        this.refreshTeam();
        console.log(this.team);
      }
      console.log(this.team);
      if (this.numberCourse.count > 0 && this.numberOfTeam < this.numberOfTeam2) {
        this.plusDisabled = false;
      } else {
        this.plusDisabled = true;
      }
      this.reduceDisabled = false;
    },
    //组队结束，处理组队的数组
    teamEnd() {
      this.isPoint = true;
      this.isStartClass = true;
      this.isGetTeamsState = true;
      this.startClassDisabled = true;
      this.getTeamsState();
      console.log(this.teams);
      this.$emit('sendTeams', {
        team: this.team,
        numberOfClass: this.numberOfTeam,
      });
      console.log(this.team);
      this.team.forEach((arr) => {
        arr.forEach((item) => {
          if (item.id && item.name) {
            temp.push(item);
          } else {
            let o = {groupIndex: item.id}
            temp.push(o);
          }
        })
        temp1.push(temp);
        temp = [];
      })
      this.classId = this.$store.state.classId;
      console.log(temp1);
      startClass({
        classID: this.$store.state.classId,
        groupsResult: JSON.stringify(temp1),
        validGroupLength: this.numberOfTeam
      })
          .then(() => {
            /*this.$emit('setIsMonitor', true);
            localStorage.setItem('isMonitor', 'true');
            this.$store.commit('setIsClass', false);*/
            let temp = this.team.splice(0, this.team.length);
            console.log(temp);
            temp.forEach((item) => {
              this.team2.push(item);
            })
            console.log(this.team);
            this.isPoint = false;

          })
          .catch(() => {
            this.isPoint = false;
          })
      temp1 = [];

      // var q = JSON.stringify(this.teams)
    },
    //全部开始上课
    startCourse() {
      let isToast = false;
      this.$store.commit('setIsRequireClassStudent', false);
      for (let i = 0; i < this.team.length; i++) {
        if (this.team[i].length !== this.numberOfTeam + 1) {
          isToast = true;
        }
      }
      if (isToast) {
        this.$toast.show({
          isShow: true,
          /*带按钮的toast的提示消息*/
          message1: '确定上课？当前有组成员未满！',
          /*isShow1控制带按钮的toast的展示*/
          isShow1: true,
          /*isToastBtn控制是否有取消按钮*/
          isToastBtn: true,
          /*弹框持续的时间*/
          duration: 3000,
          //改变触发的事件
          delete: 1,
          sure: 4
        })
      } else {
        this.teamEnd();
      }
    },
    //单组开始上课
    startClass(index) {
      this.team3 = [];
      console.log(index);
      let temp = this.team.splice(index, 1);
      console.log(temp);
      this.team2 = this.team2.concat(temp);
      this.team1.forEach((item) => {
        let exit = false;
        if (this.isStartClass) {
          this.team2.forEach((item1) => {
            item1.forEach((item2) => {
              if (item.id === item2.id) {
                exit = true;
              }
            })
          })
        } else {
          temp[0].forEach((item1) => {
            if (item.id === item1.id) {
              exit = true;
            }
          })
        }
        if (!exit) {
          let exit1 = false;
          console.log('999999999999999999');
          this.team3.forEach((item3) => {
            if (item.id === item3.id) {
              exit1 = true;
            }
          })
          if (!exit1) {
            this.team3.push(item);
            exit1 = false;
          }
        }
      })
      this.isStartClass = true;
      this.isGetTeamsState = true;
      this.getTeamsState();
      /*console.log(temp[0]);
      console.log(this.team1);
      console.log(temp[0][0].id);*/
      this.list = temp[0][0].id;
     /* console.log(this.team3);
      console.log(this.team2);
      console.log(this.team2[index]);*/
      let p = [];
      for (let i = 0; i < temp[0].length; i++) {
        if (i === 0) {
          let arr = {groupIndex: temp[0][0].id};
          p.push(arr);
        } else {
          p.push(temp[0][i])
        }
      }
      console.log(p);
      teamStartClass({
        classID: this.$store.state.classId,
        validGroupLength: this.numberOfTeam,
        groupResult: JSON.stringify(p)
      })
    },
    /*
    * 随机排序算法
    * */
    teamsRandoms(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        if (arr[i].id !== '999') {
          let randomIndex = Math.floor(Math.random() * (i + 1));
          if (arr[randomIndex].id !== '999') {
          let temp = arr[randomIndex];
          arr[randomIndex] = arr[i];
          arr[i] = temp;
        }
        }
      }
    },

    /*
    * 数组的复制
    * */
    teamCopy(arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
    },
    /*
    * 加入课程的学生数组去重算法，返回每次新加入的学生数组
    * */
    newTeams(arr1, arr2) {
      //console.log(arr1);
      // console.log(arr2);
      let temp = [];
      // console.log('1111111111111111');
      for (let i = 0; i < arr1.length; i++) {
        let exit = true;
        // console.log('22222222222222222');
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i].id === arr2[j].id) {
            //console.log('4444444444444444');
            exit = false;
          }
        }
        if (exit) {
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
    groupTeams(arr, count) {
      let teams1 = [];
      // 分组首先去掉添加的自定义学生
       for(let i = 0; i < arr.length; i++){
         if(arr[i].id !== '999'){
           teams1.push(arr[i])
         }
      }
      //this.teamCopy(arr, teams1);
      let team1 = [];
      let temp = [];
      let list1 = ['ff', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      let counter = list1.indexOf(this.list) + 1;
      console.log(counter);
      if (teams1.length !== 0) {
        //当前人数少于要求的组队人数时候，直接将当前的学生分组即可
        if (teams1.length <= count) {
          temp[0] = {id: list1[counter], name : 'list' };
         // this.list = list1[counter];
          teams1.forEach((item) => {
            temp.push(item)
          })
          team1.push(temp);
          return team1;
        }
        //当前的学生人数多于要求每组的组队人数时的分组
        else {
          temp = [{id: list1[counter++],  name:'list'}];
          for (let j = 0; j < teams1.length; j++) {
            temp.push(teams1[j]);
            //每组分满了
            if (temp.length === count + 1) {
              // console.log(temp);
              team1.push(temp);
              temp = [{id: list1[counter], name:'list'}];
              //this.list = list1[counter];
              counter++;
            }
          }
          //判断是不是最后一个人,是的话继续分组，不是的话将counter的值减一
          if (temp.length !== 1) {
            team1.push(temp);
          } else {
            counter--;
          }
          return team1;
        }
      }
      return team1;
    },
    //获取课堂上学生的上课状况，看是否已经上完课了
    getTeamsState() {
      if (this.isStartClass) {
        var interval2 = setInterval(() => {
          if (this.isGetTeamsState) {
            //向服务器发送请求，查询已经上课的组的上课状态
            getTeamsState({classID: this.$store.state.classId})
                .then((res) => {
                  console.log(res);
                  this.teamState = res;
                })
          } else {
            clearInterval(interval2);
          }
        }, 10000)
      }
    },
    endGetGroupState(){
      this.isGetTeamsState = false;
    },
    //结束课程函数
    endCourse(){


    },
    //分组后补空位
    refreshTeam(){
      console.log('1111111111');
      console.log(this.team);
      for(let i = 0; i < this.team.length; i++){
        //console.log('222222222222');
        //console.log(this.team[i].length);
        //console.log(this.numberOfTeam);
        let count = this.numberOfTeam + 1  -  this.team[i].length;
        console.log(count);
        if(this.team[i].length < this.numberOfTeam + 1){
          console.log('3333333333333333333');
          for(let j = 0; j < count; j++){
            this.team[i].push({
              id: '999',
              name: name,
            })
            name++;
          }
        }
      }
    },

  },
  destroyed() {
    console.log('44444444444444444444444');
    this.isRequireClassStudent = false;
    this.isGetTeamsState = false;
  },
  computed: {
    // 课程课分组的当前总人数
      numberOfTeam2(){
        return this.numberCourse.number + this.numberCourse.count;
        },
      classID(){
      return this.$store.state.classId;
    },

      isTeamsNull() {
        if (this.teams.length === 0) {
          return true
        } else {
          return false
        }
      },
      isClass() {
        return this.$store.state.isClass;
      },
      inCode() {
        return this.$store.state.teacher.vertification || JSON.parse(localStorage.getItem('teacher')).vertification
      }
    },
  watch: {
      deep: true,
      immediate: true,
      isStartClass() {
        if (this.isStartClass) {
         /* this.reduceDisabled = true;
          this.plusDisabled = true;*/
          if(this.team3.length > 0){
            this.team.forEach((item) => {
              if(item.length < (this.numberCourse.count + this.numberCourse.number + 1)){
                this.plusDisabled = false;
              }
              else{
                this.plusDisabled = true;
              }
            })
          }
          else{
            this.plusDisabled = true;
          }
        }
      },
      tempTeam(){
         if(this.tempTeam.length){
           this.team1 = [];
           this.tempTeam.forEach((item) => {
             this.team1.push(item);
           })
         }
        console.log(this.team1);
      },
      team() {
       /* if(this.team.length > 0){
          this.startClassDisabled = false;
        }
        else{
          this.startClassDisabled = true;
        }*/
        //this.count = this.team.length;
        //监控team数组的长度来判断随机按钮是否可用
       let count = 0;
       this.team.forEach((item) => {
         item.forEach((item2) => {
           if(item2.id !== '999'){
             count++;
           }
         })
       })
        console.log(count);

        if (count > this.numberOfTeam && this.team.length > 1) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      },
      team1() {
        console.log(this.team1);
        if(!this.isStartClass) {
          let count = 0;
          this.team1.forEach((item) => {
              if(item.id !== '999') {
                count++
              }
          })
          console.log(count);
          console.log(this.team1);
          if (count > 0) {
            this.startClassDisabled = false;
         }
          else
            {
              this.startClassDisabled = true;
            }
          }
      },
      team3(){
        if(this.isStartClass){
          if(this.team3.length > 0){
            this.startClassDisabled = false;
            this.plusDisabled = false
          }
          else{
            this.startClassDisabled = true;
            this.plusDisabled = true;
          }
        }
      },
      teams() {
         //console.log('111111111111');
        if (this.teams.length > 0) {
          //this.startClassDisabled = false;
       /*   if (!this.isStartClass) {
            if (this.numberCourse.count > 0 && this.numberOfTeam < this.numberCourse.count + this.numberCourse.number && !this.isStartClass) {
              this.plusDisabled = false;
            }
          } else {
            this.plusDisabled = true;
          }*/
          //console.log(this.teams);
          let temp = this.newTeams(this.teams, this.team1);
           //console.log(temp);
          if (temp.length > 0) {
            console.log('666666666666666666');
            if(this.team1.length - this.numberOfTeam > 0) {
              temp.forEach((item) => {
                let sig = false;
                for (let i = this.team1.length - this.numberOfTeam; i < this.team1.length; i++) {
                  if (this.team1[i].id === '999') {
                    this.team1.splice(i, 1, item);
                    sig = true;
                  }
                }
                if(!sig){
                  this.team1.push(item);
                }
              })
            }
            else{
              this.team1 = this.team1.concat(temp);
            }
            console.log(this.team1);
            let count = 0;
            this.team1.forEach((item) => {
              if(item.id !== '999') {
                count++
              }
            })
            this.totalNumber = count;
            // this.team3 = this.team1;
            // console.log(this.team1);
            if (this.isStartClass) {
              //有小组开始上课以后
              this.team3 = this.team3.concat(temp);
              this.team = this.groupTeams(this.team3, this.numberOfTeam);
             // console.log(this.team);
              this.refreshTeam();
              console.log(this.team);
            } else {
              //还没有小组开始上课
              this.team = this.groupTeams(this.team1, this.numberOfTeam);
              //console.log(this.team);
              this.refreshTeam();
              console.log(this.team);
            }
            // console.log(this.team);
          }
        }
      },
  }
}
</script>

<style scoped>
#class{
  width: 100%;
  height: 100%;
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

/*.logic button{
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
}*/
.counter span{
  font-family: PingFangSC-Medium;
  font-size: 18px;
  color: #417AF1;
  line-height: 18px;
  font-weight: 500;
}

.team-content .top{
  width: 100%;
  height: 100%;
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
.top .top-left{
  font-family: PingFangSC-Regular;
  font-size: 16px;
  color: #525252;
  line-height: 16px;
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
  background: #EBEBEB;
  border-radius: 22px;
  opacity: 0.4;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3A69CA;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
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
  width: 104px;
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
.top  .startClassDisabled{
  opacity: .5;
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  pointer-events: none;
  cursor: default;
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