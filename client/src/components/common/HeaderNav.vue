<template>
  <div id="Main">

    <header class="nav-container">
      <nav class="site-nav">
        <div class="catalog">博客目录</div>
        <ul class="site-nav-list">
          <li>
            <a name="articles" @click="jump($event)" :class="{'active': $route.path === '/articles'}">文章</a>
          </li>
          <li>
            <a name="archives" @click="jump($event)" :class="{'active': $route.path === '/archives'}">归档</a>
          </li>
          <li>
            <a name="tags" @click="jump($event)" :class="{'active': $route.path === '/tags'}">标签</a>
          </li>
          <li>
            <a name="lists" @click="jump($event)" :class="{'active': $route.path === '/lists'}">阅读列表</a>
          </li>
          <li>
            <a name="about" @click="jump($event)" :class="{'active': $route.path === '/about'}">关于我</a>
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
    props: ['maskFlag'],
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
                case 'tags':
                    this.$router.push('/tags')
                    break
                case 'lists':
                    this.$router.push('/lists')
                    break
                case 'about':
                    this.$router.push('/about')
                    break
                default:
                    break
            }
        }
    },
    watch: {
        maskFlag() {
            this.isMaskShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../../assets/style/variable";
  #Main{
    height: 100%;

    .nav-container {
      display: inline-block;
      height: 100%;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
    }
  }
  .nav-title {
    .title {
      font: {
        size: 2rem;
        family: Dosis, Source Sans Pro, Helvetica Neue, Arial, sans-serif;
      }
      letter-spacing: 0.1em;
      color: #ffffff;
    }
  }
.site-nav {
  display: inline-block;
  background-color: rgba(255, 255, 255,0.3);
  height: 100%;
  padding-top: 3em;
  .catalog{
    font-size: 3em;
    color: black;
    width: 5em;
    text-align: center;
    color: #fcee6d;
  }
    .site-nav-list {
      margin-top: 2em;
      li{
        height: 6em;
        a{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          cursor: pointer;
          color: white;
          font-size: 2em;
          color: #ffffff;
        }
      }

    }
  .icon {
    width: 1.5em;
    height: 1.5em;
  }
}


[class$="nav-list"] {
  padding: 0;
  list-style: none;
  a {
    padding-bottom: 0.2em;
  }
  li:hover{
    background-color: rgba(0, 0, 0, 0.25);
  }
  .active {
    @include chosen-item;
    background-color: rgba(0, 0, 0, 0.25)!important;
  }
}

.menu-chosen {
    border: 1px solid $base !important;
    fill: $base !important;
}

@media screen and (max-width: 480px) {
    .site-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100%;
        padding: 0.5em;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
        .site-nav-list {
            display: none;
        }
        .nav-menu {
            visibility: visible;
        }
    }
}
</style>
