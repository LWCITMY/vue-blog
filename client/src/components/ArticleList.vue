<template>
    <div class="articlelist-container">
      <div class="article-list">
        <article v-for="{id, title, publishTime, content} in articles" :key="id">
          <header>
            <h2>
              <router-link class="title" :to="'/articles/' + id">标题:{{ title }}</router-link>
            </h2>
            <h4 class="time">发布时间:{{ publishTime }}</h4>
          </header>
          <footer>
            <router-link class="read-more" :to="'/articles/' + id">点击继续阅读</router-link>
          </footer>
          <div class="line"></div>
        </article>
      </div>
    </div>
</template>

<script>
    /**
     * @author
     * @file 文章列表组件
     */

    import moment from 'moment'
    import request from '@/utils/request'

    moment.locale('zh-CN')
    export default {
      data() {
        return {
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
        }).catch(err =>{
          console.log(err)
        })
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
    // 覆盖article全局样式
    h2 {
        border-bottom: none;
        padding: 0;
    }

    .title {
        color: #99c24d;
        padding-bottom: 0.3em;
      font-weight: 500!important;
    }

    .title:hover {
        border-bottom: 2px solid $base;
    }

    .read-more {
        color: $base;
      &:hover{
        color: #99c24d;
      }
    }
  .line{
    width: 100%;
    height: 0.5em;
    background-color: #2c3e50;
    margin-top: 0.5em;
  }

</style>

