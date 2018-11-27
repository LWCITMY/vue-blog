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
  width: 300px;
  height: 200px;
  background-color: #f7f7f7;
  margin-bottom: 20px;
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
    height: 170px;
    overflow: hidden;
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
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
}
</style>
