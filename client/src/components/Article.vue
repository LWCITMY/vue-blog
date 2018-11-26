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
        url:`/articles/${id}`,
        method:'get'
      }).then(res => {
        const data = res[0]
        this.title = data.title
        this.publishTime = moment(data.publishTime).format('YYYY年 MMM DD日 HH:mm:ss')
        this.content = data.content
        this.tags = data.tags ? data.tags.split(',') : []
      }).catch(err => {
        console.log(err)
      })
    }
}
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
.tag {
    color: $quote;
    margin-right: 1em;
}
  .color{
    color: #ffffff!important;
  }
</style>
