<template>
  <div id="app">
    <div class="app-main">
      <div class="main-title">欢迎来到我的博客</div>
      <div class="content">
        <header-nav :maskFlag="maskFlag"></header-nav>
        <div id="main" @click="sweepMask">
          <transition mode="out-in" name="fade" @before-enter="beforeEnter" @after-enter="afterEnter">
            <router-view/>
          </transition>
        </div>
      </div>
      <footer id="app-footer">本博客由lwc提供支持</footer>
    </div>
  </div>
</template>

<script>
  /**
   * @author
   * @file client根组件
   */

  import HeaderNav from '@/components/common/HeaderNav'

  export default {
    name: 'App',
    components: {
      HeaderNav
    },
    data() {
      return {
        maskFlag: false
      }
    },
    methods: {
      sweepMask() {
        this.maskFlag = !this.maskFlag
      },
      afterEnter() {
        const footer = document.getElementById('app-footer')
        footer.className = 'solid'
      },
      beforeEnter() {
        const footer = document.getElementById('app-footer')
        footer.className = 'trans'
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "assets/style/variable";
  #app{
    z-index: 999;
    width: 100%;
    height: 100%;
    .app-main{
      height: 100%;
      position: relative;
      .main-title{
        text-align: center;
        font-size: 5em;
        color: #c8c2b1;
        margin: 0.5em 0;
      }
      .content{
        height: 100%;
        display: flex;
      }
    }

  }
  footer {
    font-weight: 200;
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    margin: 0 auto;
    padding: 2em 0;
    color: $special;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
    position: absolute;
    bottom: 100px;
    .github {
      color: $base;
    }
  }
  .trans {
    opacity: 0;
  }

  .solid {
    opacity: 1;
  }
</style>
