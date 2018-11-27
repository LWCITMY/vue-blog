<template>
    <div class="NewArticles">
      <div class="New-main">
        <h2>最新发布</h2>
        <div class="main-Con">
          <article v-for="{id, title, publishTime, content} in articles" :key="id">
            <header>
                <router-link class="Con-link" :to="'/articles/' + id">
                  <div>{{ title }}</div>
                  <div>{{ publishTime }}</div>
                </router-link>
            </header>
          </article>
        </div>
      </div>
    </div>
</template>

<script>
  import moment from 'moment'
  import request from '@/utils/request'
    export default {
      name: "NewArticles",
      data(){
          return{
            articles: ''
          }
      },
      created() {
        request({
          url:`/articles`,
          method:'get'
        }).then(res => {
          for (let article of res) {
            article.publishTime = moment(article.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')
            article.content = RegExp['$`']
          }
          this.articles = res
          // console.log(res)
        }).catch(err =>{
          console.log(err)
        })
      }
    }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";
.NewArticles{
  width: 300px;
  height: 240px;
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
  .main-Con{
    width: 100%;
    height: 200px;
    padding: 10px;
    overflow: hidden;
    .Con-link{
      display: flex;
      justify-content: space-between;
      line-height: 24px;
      &:hover>div:nth-child(1){
        color: #f65a8a;
      }
      div:nth-child(1){
        font-size: 14px;
        color: #333333;
      }
      div:nth-child(2){
        font-size: 12px;
        color: #5f5f5f;
      }
    }
  }
}
</style>
