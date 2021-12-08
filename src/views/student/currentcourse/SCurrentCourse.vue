<template>
<div id="scurrent-course">
  <div class="mask" v-if="isMask"/>
  <verification-code v-if="this.$store.state.isVerification" @Onwait="Onwait"/>
  <waiting @isMask="mask" v-else/>
  <router-view/>
<!--  <answer v-if="isAnswer"/>-->

</div>
</template>

<script>
import VerificationCode from "./childrenComponents/VerificationCode";
import Waiting from "./childrenComponents/Waiting";
/*import Answer from "./childrenComponents/Answer";*/

export default {
  name: "currentCourse",
  data(){
    return{
      isMask: false,
     /* isAnswer: false,*/
    }
  },
  computed:{
    isVerification(){
      return this.$store.state.isVerification;
    }
  },

  components:{
    VerificationCode,
    Waiting,
   /* Answer*/
  },
  methods:{
    Onwait(){
      this.$store.commit('modify_isVerification', false);
      this.isMask = true;
    },
    mask(){
      this.isMask = true
    },
  },
  mounted() {
    this.$EventBus.$on("isMask", () => {
      console.log('111111111');
      // A发送来的消息
        this.isMask = false;
    });
    this.$EventBus.$on('answer', () => {
      this.isAnswer = true;
    })
  },

}

</script>

<style scoped>
#scurrent-course{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mask{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.2;
  z-index: 99;
}
</style>