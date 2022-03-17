<template>
  <div class="team-content">
      <!--    左侧内容-->
      <aside class="left">
        <!--      顶部的课程信息-->
        <div class="leftTop">
          <div class="img"></div>
           <h2>{{titles.taskTheme}}</h2>
          <p class="i">邀请码&nbsp;&nbsp; {{inCode}}</p>
           <p :class="{l: isExist}" v-if="isExist">（请将此邀请码告知同学们）</p>
          <p class="c">当前人数&nbsp;&nbsp;{{count}}人</p>
        </div>
        <!--      底部的课程状态-->
        <div class="leftBottom">
          <div class="bottom-left">
            <p>课程状态</p>
            <p :class="{color: isColor}">{{state}}</p>
          </div>
          <div class="bottom-right">
            <button @click="cancelCourse" v-if="!isStartClass">取消课程</button>
            <button  v-else class="afterStartClassButton">取消课程</button>
          </div>
        </div>
      </aside>
      <aside class="right">
        <!--    右侧内容-->
          <!--    组队页面    -->
        <aside v-show="state1 === 'group'" class="group-right">
          <div class="team-top">
            <slot name="top-content"></slot>
          </div>
          <div class="classteam">
            <div v-if="isTeamsNull" class="tips">等待学生加入课程中</div>
<!--            外层循环标识有几组-->
            <div class="team" v-for="(items, index1) in groupTeam" :key="index1">
<!--              内层循环标识每组内的成员-->
              <div class="team-item-content">
                    <div class="team-item" v-for="(item, index2) in items" :key="index2" :class="{n1: isN1, n2: isN2, n3: isN3, n4: isN4, n5: isN5, n6: isN6}" >
                      <a href="#" v-if="index2 === 0" >{{item.id}}</a>
                      <div v-else class="team-item-student" :class="{vstudent: item.id === '999'}" draggable="true">
<!--                       @dragstart="onDragstart($event, item)"
                           @dragend="onDragend($event)"
                           @drop="onDrop(item)"
                           @dragover="onDragOver($event)"
                           @touchstart = 'touchStart'
                           @touchend="touchEnd"-->
                        <div class="photo"  draggable="false"></div>
                        <span >{{item.name}}</span>
                        <span v-if="false">课程昵称</span>
                      </div>
                    </div>
              </div>
              <!--          <div class="leftitem">{{items[0].id}}组</div>-->
              <div class="teamItemButton">
                <button  @click="startClass(index1)">
                  上课
                </button>
              </div>
            </div>
          </div>
        </aside>
          <!--    课堂页面   -->
        <aside v-show="state1 === 'course'" class="course-right">
          <div class="team-top">
            <div class="teamTopLeft">
             <span>点击学生头像查看答题情况</span>
            </div>
            <div class="teamTopRight">
              <button @click="endCourseButton">结束课程</button>
            </div>
          </div>
          <div class="classteam">
            <div v-if="isTeams1Null" class="tips">暂无开始上课的学生</div>
            <div class="team" v-for="(items, index1) in teamOfCourse" :key="index1">
              <!--          <div class="leftitem">{{items[0].id}}组</div>-->
              <div class="team-item-content">
                <div class="team-item" v-for="(item, index2) in items" :key="index2" :class="{n1: isC1, n2: isC2, n3: isC3, n4: isC4, n5: isC5, n6: isC6}">
                  <a href="#" v-if="index2 === 0">{{item.id}}</a>
                  <div v-else class="team-item-student" :class="{vstudent: item.id === '999'}">
                    <div class="photo"></div>
                    <span>{{item.name}}</span>
                    <span v-if="false">课程昵称</span>
                  </div>
                </div>
              </div>
              <button class=finishCourse v-if="!!!isCourseEnd.includes(items[0].id)" @click="finishCourse(index1)">终止</button>
              <div v-else class="finishedCourse"><span>已结束</span></div>
            </div>
          </div>
        </aside>
        <div class="teamBottom">
          <div class="rightButton">
            <button class="mask1" v-show="state1 === 'group'">
              组队
            </button>
            <button class="mask2" v-show="state1 === 'course'">
              课堂
            </button>
            <button class="button" @click="switchState">
              <span>组队</span>
              <span>课堂</span>
            </button>
          </div>
        </div>
      </aside>

  </div>
</template>

<script>
import {endGroup} from "../../netWork/api";
//import draggable from 'vuedraggable';
/*let temp = [];
let temp1 = [];*/
export default {
  name: "Team",
  props: {
    teamState: {
      type: Object,
      default() {
        return {}
      }
    },
    numberOfTeam: {
      type: Number,
      default() {
        return 6
      }
    },
    //每组人数，默认5
    numberOfClass: {
      type: Number,
      default() {
        return 2
      }
    },
    //有没有学生，默认为false，提示语会出现
    isTeamsNull: {
      type: Boolean,
      default() {
        return false
      }
    },
    //邀请码下的提示语是否存在，默认为false
    isExist: {
      type: Boolean,
      default() {
        return false
      }
    },
    //课程
    /*messages: {
      type: String,
      default: ''
    },*/
    //邀请码
    inCode: {
      type: Number,
      default() {
        return 0
      }
    },
    //当前人数
    count: {
      type: Number,
      default: 0
    },
    //课程标题
    titles: {
      type: Object,
      default() {
        return {}
      }
    },
    //当前课程组队学生数组
    groupTeam: {
      type: Array,
      default() {
        return []
      }
    },
    //开始上课的学生数组
    courseTeam: {
      type: Array,
      default() {
        return []
      }
    },
    //左下角课程状态
    state: {
      type: String,
      default() {
        return ''
      }
    },
    //每组后的上课按钮是否存在，默认为true
    /* isButton:{
      type: Boolean,
      default(){
        return true
      }
    },*/
    //左下角状态的字体颜色，默认为true，显示主题色
    isColor: {
      type: Boolean,
      default() {
        return true
      }
    },
    isStartClass: {
      type: Boolean,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      teams: [],
      numberCourse: this.$store.state.numberCourse,
      teamOfCourse: [],
      //state1 : 'course',
      isCourseEnd: [],
      state1: 'group',
      // isStartClass: true,
      isTeams1Null: true,
      isN1: false,
      isN2: false,
      isN3: false,
      isN4: false,
      isN5: false,
      isN6: false,
      isC1: false,
      isC2: false,
      isC3: false,
      isC4: false,
      isC5: false,
      isC6: false,
      /* number: this.numberOfTeam(this.numberOfClass),*/
    }
  },
  computed: {
    /*isCourseEnd(){
      let temp = [];
      for(let i = 0; i < this.teams1.length; i++){
        temp.push(false);
      }
      return temp;*/
    /* isTeams1Null(){
      if(this.teams1.length < 0){
        return true
      }
      else{
        return false
      }
    }*/
  },
  components: {
    // draggable,
  },

  mounted() {

    //刷新
    this.refresh();
    //this.teamCopy(this.courseTeam, this.teams);
    // console.log(this.titles);
    // console.log(this.$store.state.teacher.vertification);
  },
  methods: {
    /*
    * 拖拽相关函数
    * */
  /*  touchStart(e){
      console.log(e);
      console.log('9999999999999999');
    },
    touchEnd(e){
      console.log(e);
    },
    //开始拖拽事件
    onDragstart(e, item) {
      console.log(item);
      console.log('拖拽开始');
      this.$emit('dragStart', item);
    },
    //拖拽结束事件
    onDragend() {
      this.$emit('dragOver');
      console.log('拖拽结束');
    },
    onDragOver(e){
      e.preventDefault();
    },
    onDrop(item){
      console.log(item);
      this.$emit('drop', item);
      console.log('当被拖动元素在目的地元素里放下时');
    },*/
    //数组的复制
    teamCopy(arr1, arr2) {
      for (let i = 0; i < arr1.length; i++) {
        arr2.push(arr1[i]);
      }
    },
    //单组结束上课
    finishCourse(index) {
      console.log('8888888888888888888');
      console.log(index);
      let id1 = this.teamOfCourse[index][0].id;
      this.isCourseEnd.push(id1);
      // this.isCourseEnd.splice(index, 0, 'true');
      console.log(this.isCourseEnd);
      // this.isCourseEnd[index] = true;
      this.adjustTeam(this.teamOfCourse, id1);
      console.log(this.$store.state.user.UID);
      console.log(this.$store.state.classId);
      if (this.$store.state.user.UID && this.$store.state.classId) {
        endGroup({myID: this.$store.state.user.UID, groupIndex: id1, classID: this.$store.state.classId})
            .then((res) => {
              console.log(res);
            })
      }
    },
    switchState() {
      if (this.state1 === 'group') {
        this.state1 = 'course';
      } else {
        this.state1 = 'group';
      }
    },
    //取消课程
    cancelCourse() {
      this.$emit('cancelCourse');
    },
    //刷新，重置每组学生平分的份额
    refresh() {
      if (this.numberOfTeam === 1) {
        this.isN1 = true
      } else {
        this.isN1 = false
      }
      if (this.numberOfTeam === 2) this.isN2 = true
      else this.isN2 = false
      if (this.numberOfTeam === 3) this.isN3 = true
      else this.isN3 = false
      if (this.numberOfTeam === 4) this.isN4 = true
      else this.isN4 = false
      if (this.numberOfTeam === 5) this.isN5 = true
      else this.isN5 = false
      if (this.numberOfTeam === 6) this.isN6 = true
      else this.isN6 = false
      if (this.numberOfTeam === 1) {
        this.isC1 = true
      } else {
        this.isC1 = false
      }
      if (this.numberOfTeam === 2) this.isC2 = true
      else this.isC2 = false
      if (this.numberOfTeam === 3) this.isC3 = true
      else this.isC3 = false
      if (this.numberOfTeam === 4) this.isC4 = true
      else this.isC4 = false
      if (this.numberOfTeam === 5) this.isC5 = true
      else this.isC5 = false
      if (this.numberOfTeam === 6) this.isC6 = true
      else this.isC6 = false
    },
    //单组开始上课
    startClass(index) {
      // this.isButton = false;
      console.log(index);
      this.isStartClass = false;
      this.$emit('startClass', index);
    },
    //调整组内顺序
    adjustTeam(arr, id) {
      //  console.log(arr);
      // console.log(id);
      //let o = {isEnd: true};
      // arr[index].push(o);
      //index标识id的那一组在数组中的下标
      let index;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i][0].id === id) {
          index = i;
        }
      }
      //console.log(index);
      //temp就是结束的那一组
      let temp = arr.splice(index, 1);
      //console.log(temp);
      //count记录有几组学生已经结束了
      let count = this.isCourseEnd.length - 1;
      // console.log(count);
      //index1标识这组应该插入的位置
      let index1 = arr.length - count;
      // console.log(index1);
      for (let i = arr.length - count; i < arr.length; i++) {
        if (temp[0][0].id > arr[i][0].id) {
          index1++;
        }
      }
      //console.log(index1);
      arr.splice(index1, 0, temp[0]);
      //arr.push(temp[0]);
      //console.log(arr);
    },
    //找出每次新加进来的组加到课堂学生数组里面
    newTeams(arr1, arr2) {
      //console.log(arr1);
      // console.log(arr2);
      // let temp = [];
      // console.log('1111111111111111');
      for (let i = 0; i < arr1.length; i++) {
        let exit = true;
        // console.log('22222222222222222');
        for (let j = 0; j < arr2.length; j++) {
          if (arr1[i][0].id === arr2[j][0].id) {
            //console.log('4444444444444444');
            exit = false;
          }
        }
        if (exit) {
          //console.log('333333333333');
          //arr2.push(arr1[i]);
          //console.log(arr1[i]);
          let count = 0;
          for (let i = 0; i < arr2.length; i++) {
            //console.log(this.isCourseEnd);
            if (this.isCourseEnd.includes(arr2[i][0].id)) {
              count++;
            }
          }
          let index = 0;
          console.log(count);
          for (let k = 0; k < arr2.length - count; k++) {
            //console.log('999999999999999');
            // console.log(arr1[i][0].id);
            // console.log(arr2[k][0].id);
            if (arr1[i][0].id > arr2[k][0].id) {
              // console.log('888888888888888');
              index++;
            }
          }
          //console.log(index);
          arr2.splice(index, 0, arr1[i]);
          //arr2.push(arr1[i]);
          //this.isCourseEnd.push(false);
          // console.log(this.isCourseEnd);
          // console.log(temp);
        }
      }
      console.log(arr2);
      // return temp;
    },
    //结束课程的按钮点击事件
    endCourseButton() {
      console.log('55555555555555');
      this.$toast.show({
        message1: '确定结束课程？' + "\n" + '当前组队，上课的小组将会中断操作',
        /*isShow控制整个Toast的展示*/
        isShow: true,
        /*isShow1控制带按钮的toast的展示*/
        isShow1: true,
        /*isToastBtn控制是否有取消按钮*/
        isToastBtn: true,
        /*弹框持续的时间*/
        duration: 30000,
        //改变触发的事件
        delete: 1,
        sure: 5
      })
    },
    //去除自定义的学生
  },
  watch:{
    deep: true,
    immediate: true,
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
      //this.refresh();

    },
    teamState(){
      console.log(this.teamState.groupsEndState);
      let groupsEndState = this.teamState.groupsEndState;
      groupsEndState.forEach((item) => {
        if(item.isEnd){
          console.log('99999999999999');
          console.log(item.groupIndex);
          console.log(this.isCourseEnd);
          if(!this.isCourseEnd.includes(item.groupIndex)){
            this.isCourseEnd.push(item.groupIndex);
            console.log(this.isCourseEnd);
            this.adjustTeam(this.teamOfCourse, item.groupIndex);
          }
        }
      })
    },
    /*
    * 监听curseTeam数组，
    * 长度不为0时，isTeamsNull 为false
    * 更新生成课堂页面的学生数组
    * */
    courseTeam(){
      if(this.courseTeam.length > 0){
        this.isTeams1Null = false;
      }
      this.newTeams(this.courseTeam, this.teamOfCourse);
    },
    /*
    * 监听class组件传进来的组队页面学生数组
    * 更新组队页面的学生数组
    * 若数组中每一组的学生数不到最大数量，自定义id为999的学生自动补足
    * */
    groupTeam(){
     // this.teams.splice(0,this.teams.length);
      // this.teams = [];
      //this.teamCopy(this.groupTeam, this.teams);
    },
    teams(){

    },
    isCourseEnd(){
      if(this.isCourseEnd.length === this.groupTeam.length){
        this.$emit('endGetGroupState');
      }
    },
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
  width: 30%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.left .leftTop{
  height: 85%;
  flex: 1;
  border-right: 1px solid rgba(0,0,0,0.1);
}
.left .leftBottom{
  height: 15%;
  padding: 2%;
  border-top: 1px solid rgba(0,0,0,0.1);
  display: flex;
}
.leftBottom .bottom-left{
  width: 50%;
}
.leftBottom .bottom-right{
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.leftBottom .afterStartClassButton{
  background: #FFFFFF;
  border: 2px solid #B8B8B8;
  box-shadow: 0 3px 0 0 #B8B8B8;
  border-radius: 12px;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #999999;
  line-height: 16px;
  font-weight: 500;
  pointer-events: none;
  cursor: default;
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
.bottom-right button{
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
.right .group-right{
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.right .course-right{
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.right .teamBottom{
  box-shadow: inset 0 2px 0 0 #EBEBEB;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  margin-top: 20px;
}
.teamBottom .rightButton{
  position: relative;
}
.teamBottom .button{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  width: 160px;
  height: 50px;
  border-radius: 50px;
  margin-right: 20px;
  background: #eeebeb;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 20px;
  color: #0a0a0a;
}
.teamBottom .mask1{
  position: absolute;
  left: 0;
  border: none;
  background-color: #d9d9d9;
  width: 90px;
  height: 50px;
  border-radius: 50px;
  color: #0354fd;
  font-size: 20px;
}
.teamBottom .mask2{
  position: absolute;
  right: 0;
  border: none;
  background-color: #d9d9d9;
  width: 90px;
  height: 50px;
  border-radius: 50px;
  color:  #0354fd;
  font-size: 20px;
}
.right .classteam{
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 5%;
  flex: 1;
}
.right .team-top{
  width: 90%;
  height: 60px;
  text-align: center;
  margin: 24px;
}
.right .course-right  .team-top{
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
}
.teamTopLeft span{
   font-family: PingFangSC-Medium;
   font-size: 18px;
   color: #6B6B6B;
   line-height: 18px;
   font-weight: 500;
 }
.teamTopRight button{
  background: #417AF1;
  box-shadow: 0 4px 0 0 #3A69CA;
  border-radius: 12px;
  width: 104px;
  height: 38px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #FFFFFF;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
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
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.classteam .teamItemButton button{
  width: 72px;
  height: 44px;
  background: #FFFFFF;
  border-radius: 22px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3A69CA;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  margin-right: 18px;
}
.classteam .team .finishCourse{
  width: 72px;
  height: 44px;
  background: #FFFFFF;
  border-radius: 22px;
  border: none;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #3A69CA;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  margin-right: 18px;
}
.team .finishedCourse{
  width: 72px;
  height: 44px;
  display: flex;
  align-items: center;
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #999999;
  text-align: center;
  line-height: 16px;
  font-weight: 500;
  margin-right: 18px;
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
.vstudent{
  opacity: 0.1;
}
</style>