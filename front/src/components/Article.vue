<template>
  <article>
    <header>
      <h1>{{ title }}</h1>
      <h4 class="time">{{ publishTime }}</h4>
      <h4>
        <span class="tag" v-for="tag in tags">{{ tag }}</span>
      </h4>
    </header>
    <p v-html="content" class="color"></p>
  </article>
</template>

<script>
  /**
   * @author
   * @file 特定文章组件
   */

  import moment from 'moment'
  import request from '@/utils/request'


  moment.locale('zh-CN')
  export default {
    data() {
      return {
        title: '',
        publishTime: '',
        tags: '',
        content: ''
      }
    },
    created() {
      const id = this.$route.params.id
      request({
        url: `/articles/${id}`,
        method: 'get'
      }).then(res => {
        const data = res[0]
        this.title = data.title
        this.publishTime = moment(data.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')
        this.content = data.content
        this.tags = data.tags ? data.tags.split(',') : []
      }).catch(err => {
        console.log(err)
      })
    },

  }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";

  article {
    background-color: #ffffff;
    width: 100%;
    display: block;
    min-width: 410px;
    padding: 25px;
    padding-top: 15px;
    margin-bottom: 20px;
    header {
      h1 {
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #eee;
        color: #484848;
        font-weight: normal;
        margin-bottom: 10px;
      }
    }
    .color {
      color: #333333;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .tag {
    color: $quote;
    margin-right: 1em;
  }
</style>
