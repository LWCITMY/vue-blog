<template>
  <div id="Main">
    <header class="nav-container">
      <nav class="site-nav">
        <div class="bolog">成哥的个人博客</div>
        <ul class="site-nav-list">
          <li>
            <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
          </li>
          <li>
            <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">时间轴</a>
          </li>
          <!--<li>-->
            <!--<a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">标签</a>-->
          <!--</li>-->
          <li>
            <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读列表</a>
          </li>
          <li>
            <a name="about" @click="jump($event)" :class="{'active': $route.path === '/abouts'}">关于我</a>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
/**
 * @author
 * @file 公用的header
 */

export default {
    data() {
        return {

        }
    },
    methods: {
        jump(evt) {
            const path = evt.target.name
            switch (path) {
                case 'articles':
                    this.$router.push('/articles')
                    break
                case 'archives':
                    this.$router.push('/archives')
                    break
                // case 'tags':
                //     this.$router.push('/tags')
                //     break
                case 'lists':
                    this.$router.push('/lists')
                    break
                case 'about':
                    this.$router.push('/abouts')
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";
#Main{
  position: fixed;
  width: 100%;
  z-index: 999;
  min-width: 1100px;
  .nav-container{
    background-color: #ffffff;
    .site-nav{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2em 0;
      width: 55%;
      margin: 0 auto;
      .bolog{
        font-size: 22px;
        color: #555555;
      }
      .site-nav-list{
        display: flex;
        margin: 0;
        padding: 0;
        li{
          list-style: none;
          font-size: 16px;
          padding: 0 0 0 40px;
          color: #555555;
          a:hover{
            cursor: pointer;
            color: black;
          }
        }
      }
    }
  }
  [class$="nav-list"] {
    .active {
      color: #f65a8a;
    }
  }
}
</style>
