<template>
    <div class="NewArticles">
      <div class="New-main">
        <div class="main-Tit">最新发布</div>
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
          console.log(res)
        }).catch(err =>{
          console.log(err)
        })
      }
    }
</script>

<style scoped>
.NewArticles{
  width: 100%;
  height: 300px;
  background-color: #29323f;
  border-radius: 15px;
  margin-top: 2em;
  padding: 1em 3em;
}
  .New-main{
    width: 90%;
    height: 95%;
    margin: auto 0;
    overflow: hidden;
  }
  .main-Tit{
    font-size: 2em;
    font-weight: bold;
    color: #fcee6d;
    margin-bottom: 0.5em;
  }
  .Con-link{
    display: flex;
    justify-content: space-between;
    margin: 1.1em 0;
    font-size: 1em;
  }
</style>
