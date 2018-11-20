<template>
  <div>
    <ul class="list">
      <li class="article" :class="{active: activeIndex === index, published: isPublished === 1}"
          v-for="{title,createTime,isPublished,isChosen},index in articleList" @click="select(index)">
        <div class="article-right">
          <section>
            <header>{{title}}</header>
            <p class="p">{{createTime}}</p>
          </section>
          <section :class="{show:activeIndex === index}" style='display: none;position: relative;padding: 1em'>
              <svg class="icon" aria-hidden="true" @click="yincang(index)">
                <use xlink:href="#icon-shezhi"></use>
              </svg>
              <el-collapse-transition>
                <div class="transition-main" v-show="show5">
                  <div class="transition-box">
                    <svg class="icon" aria-hidden="true">
                      <use xlink:href="#icon-yijingfabu"></use>
                    </svg>
                    <p class="descript">直接发布</p>
                  </div>
                  <div class="transition-box">
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
        showIndex: -1,
        show5:false
      }
    },
    //把全局的vuex里面的state和mutations放到计算属性中
    computed: {
      ...mapState(['id', 'title', 'tags', 'content', 'isPublished'])
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
      yincang(index){
        this.showIndex = index
        console.log(index)
        console.log(this.showIndex)
        if (this.showIndex = index){
          return this.show5 = !this.show5
        }else {
          return this.show5 = false
        }
      },
      // show3(index){
      //   this.showIndex = index
      // },
      select(index){
        this.activeIndex = index
        //当你在选择文章的时候,将当前被选中的文章扔到全局状态管理里面
        this.SET_CURRENT_ARTICLE(this.articleList[index])
      },
      ...mapMutations(['SET_CURRENT_ARTICLE'])
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";

  .article {
    @include flex($flow: column wrap, $align: flex-start);
    padding: 0em 3em;
    height: 7em;
    max-width: 100%;
    background: $white;
    border: 0.1em solid #d9d9d9;
    cursor: pointer;
    .article-right{
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
