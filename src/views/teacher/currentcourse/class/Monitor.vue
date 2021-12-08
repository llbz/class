<template>
  <!--  课程班级组件-->
  <div id="class">
    <top-nav :title="titles.taskTheme"></top-nav>
    <main-content>
      <div class="team-content">
        <team :titles="titles"
              :inCode="inCode"
              :state="state"
              :is-exist="false"
              :is-color = "true"
              :is-teams-null= "isTeamsNull"
              :teams="team"
              :count="count"
              :is-button = 'false'
              :number-of-class="numberOfClass"
        >
          <div class="top" slot="top-content">
            点击学生头像查看学生答题情况
          </div>
        </team>
      </div>

    </main-content>
  </div>
</template>

<script>
import TopNav from "../../../../components/common/TopNav";
import MainContent from "../../../../components/common/MainContent";
import Team from "../../../../components/common/Team";




export default {
  name: "class",
  props:{
    teams:{
      type: Array,
      default(){
        return []
      }
    },
    numberOfClass:{
        type: Number,
        default(){
          return 5
        }
    },
  },
  data(){
    return{
      classId: '',
      disabled: true,
      state: '学生答题中',
      index: this.$store.state.index,
      counter: 6,
      titles: {},
    }
  },
  components:{
    TopNav,
    MainContent,
    Team
  },

  created() {
    console.log(this.teams);
    this.titles = this.$store.state.teacher.class[this.index];
    this.$EventBus.$emit('modifyIsTabcontrol', false);
  },

  mounted() {
    this.$EventBus.$on('sendTeams', (item) => {
      console.log(item);
      this.team = item
    })
    //console.log(this.inCode);

  },
  methods:{
    goBack(){
      //退出当前课程以及组队页面
      this.$toast.show({
        isShow: true,
        isShow1: true,
        isToastBtn: true,
        message1: '确定返回？当前组队信息将全部清空！',
        duration: 40000,
      })
    },


  },
  computed:{
    isTeamsNull(){
      if(this.team.length === 0){
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
      return this.$store.state.teacher.vertification;
    },
    count(){
      let count = 0;
      for(let i = 0; i < this.team.length; i++){
        count = count + this.team[i].length - 1
      }
      return count;
    },
    team(){
     return this.teams[0] ? this.teams : JSON.parse(localStorage.getItem('teams'))
    }
  },

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
  background: #F5F5F5;
  border-radius: 9px;
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #525252;
  font-weight: 400;
  text-align: center;
}


.class-team .team .team-item span{
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #8A8A8A;
  font-weight: 400;
}
.disabled{
  pointer-events: none;
  cursor: default;
}
</style>