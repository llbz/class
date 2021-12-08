<template>
  <div class="main-content">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content"
}
</script>

<style scoped>
.main-content {
/*  background-color: palegreen;*/
  position: absolute;
  width: 100%;
  height: calc(100% - 50px - 50px - 15px - 24px);
  top: 80px;
}
.content{
  position: absolute;
  width:calc(100% - 230px);
  height: 94%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(0,0,0,0.06);
  box-shadow: 0 3px 9px 0 rgba(0,0,0,0.04);
  border-radius: 9px;
}
</style>