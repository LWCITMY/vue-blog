<template>
    <div class="articlelist-container">
      <div class="article-list">
        <article v-for="{id, title, publishTime, content} in articles" :key="id">
          <header>
            <h2>
              <router-link class="title" :to="'/articles/' + id">{{ title }}</router-link>
            </h2>
            <h4 class="time">{{ publishTime }}</h4>
          </header>
          <footer>
            <p v-html="content"></p>
          </footer>
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
            article.publishTime = moment(article.publishTime).format('YYYY年 MM月 DD日 HH:mm:ss')
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
  .articlelist-container{
    width: 100%;
    min-width: 410px;
    article{
      margin-bottom: 20px;
      padding: 15px;
      background-color: #ffffff;
      header{
        display: flex;
        width: 100%;
        justify-content: space-between;
        padding: 10px;
        h2{
          font-size: 16px;
          margin: 0;
          padding: 0;
          a{
            color: #222222;
            font-weight: bold;
            &:hover{
              color: #50a14f;
              text-decoration: underline;
            }
          }
        }
        h4{
          margin: 0;
          padding: 0;
        }
      }
      footer{
        width: 100%;
        padding: 10px;

        p{
          font-size: 15px;
          line-height: 22px;
          height: 150px;
          overflow: hidden;
          text-align: left;
        }
      }
    }
  }



</style>

