<template>
    <div class="follow">
      <h2>友情链接</h2>
      <ul>
        <a href="https://github.com/LWCITMY">成哥的GitHub</a>
      </ul>
    </div>
</template>

<script>
    export default {
        name: "Follow",
      data(){

      }
    }
</script>

<style lang="scss" scoped>
.follow{
  width: 300px;
  background-color: #f7f7f7;
  h2{
    color: #333;
    font-size: 14px;
    line-height: 30px;
    padding-left: 20px;
    background: #fff;
    margin: 0;
  }
  ul{
    padding: 10px;
    margin: 0;
    font-size: 14px;
    a{
      color: #000000;
      &:hover{
        color: #f65a8a;
      }
    }
  }
}
</style>
