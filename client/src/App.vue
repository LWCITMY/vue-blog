<template>
  <div id="app">
    <div class="app-main">
      <div class="content">
        <header-nav :maskFlag="maskFlag"></header-nav>
        <div class="main" @click="sweepMask">
          <div class="main-title"></div>
          <div class="main-con">
            <transition mode="out-in" name="fade" @before-enter="beforeEnter" @after-enter="afterEnter" class="nav">
              <router-view/>
            </transition>
          </div>
        </div>
        <div>
          <calendar ref="calendar1" :events="calendar1.events" :lunar="calendar1.lunar" :value="calendar1.value" :values="calendar1.values" :weeks="calendar1.weeks" :months="calendar1.months" :totalMonth="calendar1.totalMonth" @select="calendar1.select" @selectMonth="calendar1.selectMonth" @selectYear="calendar1.selectYear"></calendar>
          <NewArticles></NewArticles>
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
  import calendar from '@/components/common/calendar'
  import NewArticles from '@/components/common/NewArticles'
  export default {
    name: 'App',
    components: {
      HeaderNav,
      calendar,
      NewArticles
    },
    data() {
      return {
        maskFlag: false,
        year: 0,
        month: 0,
        day: 0,
        calendar1:{
          totalMonth:1,   //一共显示几个月
          // value:[2017,11,1], //默认日期  如果没设置就默认选中今天
          //  values:[[2018,5,1],[2018,6,2],[2018,6,6],[2018,7,11],[2018,8,11],[2018,8,12],[2018,8,14]], //有哪些时间点是被选中的
          lunar:true, //显示农历
          weeks:['Sun', 'Mon' , 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          events:{
            '2017-7-7':'$408',
            '2017-7-20':'$408',
            '2017-7-21':'$460',
            '2017-7-22':'$500',
          },
          select(value){
            console.log(value.toString());
          },
          selectMonth(month,year){
            console.log(year,month)
          },
          selectYear(year){
            console.log(year)
          },
          timestamp:Date.now()
        }
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
      .content{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-between;
      }
    }

  }
  footer {
    font-weight: 200;
    width: 100%;
    text-align: center;
    font-size: 1.4rem;
    margin: 0 auto;
    padding-top: 2em;
    color: $special;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, .25);
    position: absolute;
    bottom: 2em;
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


    /*滚动条样式*/
  .main-con::-webkit-scrollbar {/*滚动条整体样式*/
    width: 4px;     /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
  }
  .main-con::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
  }
  .main-con::-webkit-scrollbar-track {/*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: red;
  }
</style>
