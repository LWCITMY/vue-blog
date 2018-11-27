<template>
  <div class="about-container">
    <h2>关于</h2>
    <ul>
      <i>
        <img src="../assets/img/about.jpg" alt="">
      </i>
      <p v-html="about"></p>
    </ul>
  </div>
</template>

<script>
  /**
   * @author
   * @file About me组件
   */

  import request from '@/utils/request'

  export default {
    data() {
      return {
        about: ''
      }
    },
    created() {
      request({
        url:'/briefs',
        method:'get'
      }).then(res =>{
        this.about = res[0].content
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .about-container{
    background-color: #ffffff;
    width: 100%;
    display: block;
    min-width: 410px;
    padding: 25px;
    padding-top: 15px;
    margin-bottom: 20px;
    h2{
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      color: #484848;
      font-weight: normal;
      margin-bottom: 10px;
    }
    ul{
      padding: 10px;
      margin: 0;
      p{
        width: 100%;
        height: 100%;
        padding: 10px;
        margin: 0;
        line-height: 24px;
        font-size: 14px;
      }
      i{
        width: 120px;
        height: 120px;
        float: left;
        clear: left;
        margin-right: 10px;
        img{
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
</style>
