<template>
  <div style="height: 100%;">
    <head-nav></head-nav>
    <Aside></Aside>
    <div class="list-container main">
      <h2>文章列表 /
        <span>ARTICLE LIST</span>
      </h2>
      <hr>
      <main>
        <div class="article-list">
          <section class="btn-container-link" @click="AddArticle">
            <!--<button id="add" class="not-del" @click="AddArticle">新文章</button>-->
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xinjian"></use>
            </svg>
            <p class="descript">新建文章</p>
          </section>
          <!--文章列表的组件-->
          <article-list ref="articleList"></article-list>
        </div>
        <!--编辑器的组件-->
        <editor></editor>
      </main>
    </div>
  </div>
</template>

<script>
  import Aside from '@/components/common/Aside'
  import HeadNav from '@/components/common/HeadNav'
  import ArticleList from '@/components/common/ArticleList'
  import Editor from '@/components/common/Editor'
  import request from '@/utils/request'
  export default {
    name: "List",
    data() {
      return {
        ArticleList: []
      }
    },
    components: {
      Aside,
      HeadNav,
      ArticleList,
      Editor
    },
    methods: {
      //发表文章的方法
      AddArticle() {
        request({
          url:'/article/add',
          method:'post',
          data:{}
        }).then(res=>{
          //1.首先获取到插入文章的id值
          const addId = res.insertId
          //2.调用子组件中的updateArticle方法来更新文章列表
          this.$refs.articleList.updateList(addId)
          // console.log(this.$refs.articleList)
        }).catch(err=>{
          console.log(err)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";

  main {
    @include flex($justify: space-between);
    height: calc(100% - 48px);
    padding: 0.5em 0;
  }

  .article-list {
    width: 40%;
    height: 100%;
    overflow: auto;
    padding: 0 0.8em 0.5em 0;
    .list {
      // margin: 0;
      padding: 0;
      list-style: none;
    }
  }

  .editor {
    width: 58%;
    height: 100%;
    padding: 0 0.8em 0.5em 0;
    overflow: auto;
  }

  .btn-container-link {
    @include flex($flow: row wrap);
    -webkit-justify-content: flex-start;
    justify-content: flex-start;
    margin-left: 3em;
    width: 8em;
    .icon {
      width: 1.7em;
      height: 1.7em;
    }
    .descript {
      padding-left: 0.3em;
      font-size: 1.5rem;
    }
    &:hover{
      cursor: pointer;
    }
    &:hover > .icon {
      fill: $base;
    }
    &:hover > .descript {
      color: $base;
    }
  }
</style>
