<template>
  <div>
    <ul class="list">
      <li class="article" :class="{active: activeIndex === index, published: isPublished === 1}"
          v-for="{title,createTime,isPublished,isChosen},index in articleList" @click="select(index)">
        <div class="article-content">
          <section class="content-right">
            <section>
              <img src="../../../static/img/sprite.png" alt="">
            </section>
            <section>
              <header>{{title}}</header>
              <p class="p">{{createTime}}</p>
            </section>
          </section>
          <section :class="{show:activeIndex === index}" style='display: none;position: relative;padding: 1em'>
              <svg class="icon" aria-hidden="true" @click="yincang">
                <use xlink:href="#icon-shezhi"></use>
              </svg>
              <el-collapse-transition>
                <div class="transition-main" v-show="show5">
                  <div class="transition-box" @click="publishArticle">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yijingfabu"></use>
                    </svg>
                    <p class="descript">直接发布</p>
                  </div>
                  <div class="transition-box" @click="deleteArticle">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-web-icon-"></use>
                    </svg>
                    <p class="descript">删除文章</p>
                  </div>
                </div>
              </el-collapse-transition>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import request from '@/utils/request'
  import moment from 'moment'
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "ArticleList",
    data() {
      return {
        articleList: [],
        activeIndex: -1,
        showIndex:0,
        show5:false
      }
    },
    //把全局的vuex里面的state和mutations放到计算属性中
    computed: {
      ...mapState(['id', 'title', 'tags', 'content', 'isPublished','toggleDelete'])
    },
    //当该组件创建成功的时候自动执行里面的请求
    created() {
      request({
        url: '/articles',
        method: 'get'
      }).then(res => {
        for (let article of res) {
          article.createTime = moment(article.createTime).format('YYYY年 MM月 DD日 HH:mm:ss')
          article.isChosen = true
        }
        this.articleList.push(...res)
        //如果查询出文章,则第一篇文章作为正在编辑的文章
        if(this.articleList.length !== 0){
          this.SET_CURRENT_ARTICLE(this.articleList[0])
          this.activeIndex = 0;
        }
      }).catch(err => {
        console.log(err)
      })
    },
    methods:{
      updateList(updateId){
        request({
          url:`/articles/${updateId}`,
          method:'get'
        }).then(res=>{
          const article = res[0]
          article.createTime = moment(article.createTime).format('YYYY年 MM月 DD日 HH:mm:ss')
          article.isChosen = true
          this.articleList.unshift(article)
          //如果发布了新文章的话,当前被选中的文章下标自动+1
          this.activeIndex ++
        }).catch(err=>{
          console.log(err)
        })
      },
      updateListByTags(chosenTags) {
        if (chosenTags.length === 0) {
          for (let article of this.articleList) {
            article.isChosen = true
          }
        }
        else {
          for (let article of this.articleList) {
            let flag = false
            for (let tag of chosenTags) {
              if (article.tags.indexOf(tag) !== -1) {
                flag = true
              }
            }
            if (flag) {
              article.isChosen = true
            }
            else {
              article.isChosen = false
            }
          }

          for (let [index, article] of this.articleList.entries()) {
            if (article.isChosen) {
              this.activeIndex = index
              this.updateArticle(this.articleList[this.activeIndex])
              break
            }
          }
        }
      },
      updateArticleTag(oldVal, newVal, chosenTags) {
        for (let [i, article] of this.articleList.entries()) {
          if (article.tags.length) {
            const tags = article.tags.split(',')
            const index = tags.indexOf(oldVal)
            if (index !== -1) {
              const newIndex = tags.indexOf(newVal)
              // 如果新值在该文章中已经有了，则直接删除旧值，否则将旧值修改为新值
              if (newIndex === -1) {
                tags[index] = newVal
                article.tags = tags.join(',')
                request({
                  url:`/tags/${article.id}`,
                  method:'put',
                  data:{
                    tags: article.tags
                  }
                }).catch(err => alert(err))
              }
              else {
                this.deleteSpecArticleTag(oldVal, i)
              }
              this.updateListByTags(chosenTags)
            }
          }
        }
        // 防止更改了activeIndex的article，所以提交一个mutation
        this.updateArticle(this.articleList[this.activeIndex])
      },
      deleteSpecArticleTag(tag, i) {
        const article = this.articleList[i]
        article.tags = article.tags.split(',')
        const index = article.tags.indexOf(tag)
        article.tags.splice(index, 1)
        article.tags = article.tags.join(',')
        request({
          url:`/tags/${article.id}`,
          method:'put',
          data:{
            tags: article.tags
          }
        }).catch(err => alert(err))
      },
      deleteArticleTag(tag) {
        for (let article of this.articleList) {
          if (article.tags.length) {
            const tags = article.tags.split(',')
            const index = tags.indexOf(tag)
            if (index !== -1) {
              if (tags.length === 1 && article.isPublished === 1) {
                console.error('已发布文章请至少保持一个tag!')
              }
              else {
                tags.splice(index, 1)
                article.tags = tags.join(',')
                request({
                  url:`/tags/${article.id}`,
                  method:'put',
                  data:{
                    tags: article.tags
                  }
                }).catch(err => alert(err))
              }
            }
          }
        }
        // 防止更改了activeIndex的article，所以提交一个mutation
        this.updateArticle(this.articleList[this.activeIndex])
      },
      yincang(){
        this.show5 = !this.show5
        console.log('aa' + this.show5)
      },
      select(index){
        this.activeIndex = index
        // this.show5 = false
        //当你在选择文章的时候,将当前被选中的文章扔到全局状态管理里面
        this.SET_CURRENT_ARTICLE(this.articleList[index])
        console.log('bb' + this.show5)
      },
      ...mapMutations(['SET_CURRENT_ARTICLE']),
      //删除文章
      deleteArticle(){
        request({
          url:`/articles/${this.id}`,
          method:'delete',
          data:{}
        }).then(res=>{
          //删除之后更新视图,让视图中的文章也删除
          this.$store.commit('SET_DELETE_ARTICLE')
          this.show5 = false
        }).catch(err=>{
          console.log(err)
        })
      },
      //发布文章
      publishArticle(){
        if (!this.isPublished){
          request({
            url:`/articles/publish/${this.id}`,
            method:'put',
            data:{}
          }).then(res=>{
            this.$store.commit('SET_PUBLISH_ARTICLE')
            this.show5 = false
          }).catch(err=>{
            console.log(err)
          })
        }
      }
    },
    //监听vuex数据的变化,如果发生变化,更新articleList数据
    watch:{
      title(val){
        if(this.articleList.length !== 0){
          this.articleList[this.activeIndex].title = val
        }
      },
      tags(val){
        if(this.articleList.length !== 0){
          this.articleList[this.activeIndex].tags = val
        }
      },
      content(val){
        if(this.articleList.length !== 0){
          this.articleList[this.activeIndex].content = val
        }
      },
      isPublished(val){
        if(this.articleList.length !== 0){
          this.articleList[this.activeIndex].isPublished = val
        }
      },
      toggleDelete(val){
        //如果这个值有变化,从false变化为true,说明当前文章是需要删除的
        this.articleList.splice(this.activeIndex,1)
        if (this.activeIndex === this.articleList.length){
          this.activeIndex --
        }
        if (this.articleList.length !== 0 ){
          this.SET_CURRENT_ARTICLE(this.articleList[this.activeIndex])
        } else {
          this.SET_CURRENT_ARTICLE({
            id:'',
            title:'',
            tags:'',
            content:'',
            isPublished:''
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";

  .article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0em 2em;
    height: 7em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid #d9d9d9;
    cursor: pointer;
    .article-content{
      @include flex($justify: space-between);
      width: 100%;
      header {
        max-width: 100%;
        font-size: 1.6rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-bottom: 0.5em;
      }
      .p {
        margin: 0;
        font-size: 1.5rem;
        color: $special;
      }
      .icon {
        width: 1.5em;
        height: 1.5em;
      }
      &:last-child {
        margin-bottom: 0;
      }
      .content-right{
        display: flex;
        align-items: center;

        :first-child{
          margin-right: 1em;
          img{
            width: 2.5em;
            height: 3.3em;
          }
        }
      }
    }
  }

  .active {
    background-color: #e6e6e6;
  }
  .show{
    display: block!important;
  }
  /*.show3{*/
    /*display: block!important;*/
  /*}*/
  .published {
    border-left: 4px solid $base;
  }
  .transition-main{
    box-shadow: 0 5px 10px rgba(0,0,0,.2);
    list-style: none;
    background-color: #fff;
    border-radius: 6px;
    color: #595959;
    position: absolute;
    right: 0;
    top: 3.7em;
    p{
      margin: 0;
      font-size: 1.5rem;
    }
  }
  .transition-main:before{
    position: absolute;
    right: 1em;
    content: "";
    display: inline-block;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #fff;
    top: -0.8em;
  }
  .transition-box {
    display: flex;
    align-items: center;
    white-space: nowrap;
    padding: 0.9em 1.4em;
    border-bottom: 1px solid #d9d9d9;
    .icon {
      width: 1.5em;
      height: 1.5em;
    }
    .descript {
      padding-left: 0.3em;
      font-size: 1rem;
    }
    &:hover{
      cursor: pointer;
      background-color: #666666;
      color: #ffffff!important;
    }
  }
  .transition-box:first-child{
    border-radius: 6px 6px 0 0;
  }
  .transition-box:last-child{
    border-radius:0 0 6px 6px;
  }
</style>
