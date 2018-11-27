<template>
        <div class="archive-container">
            <div class="archive-list">
                <h1>往期文章</h1>
                <section v-for="year in years" class="section">
                    <span class="year">{{ year }}</span>
                    <ul class="list" v-for="intro in introductions[year]">
                        <li>
                          <span class="time"> {{ intro.publishTime }}</span>
                          <router-link :to="'/articles/' + intro.id">{{ intro.title }}</router-link>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
</template>

<script>
/**
 * @author
 * @file 往期文章
 */

import moment from 'moment'
import request from '@/utils/request'


moment.locale('zh-CN')
export default {
    data() {
        return {
            introductions: {},
            years: []
        }
    },
    created() {
      request({
        url:'/introductions',
        method:'get'
      }).then(res => {
        for (let intro of res) {
          const introYear = moment(intro.publishTime).year()
          if (this.years.indexOf(introYear) === -1) {
            this.years.push(introYear)
            this.introductions[introYear] = []
          }
          intro.publishTime = moment(intro.publishTime).format('MM-DD')
          this.introductions[introYear].push(intro)
        }
      }).catch(err => {
        console.log(err)
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*记得引入全局变量的文件*/
  @import "../assets/style/variable";
.archive-container{
  background-color: #ffffff;
  width: 100%;
  display: block;
  min-width: 410px;
  padding: 25px;
  padding-top: 15px;
  margin-bottom: 20px;
  .archive-list{
    h1{
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      color: #484848;
      font-weight: normal;
      margin-bottom: 10px;
      position: relative;
    }
    h1::after{
      position: absolute;
      width: 70px;
      height: 2px;
      content: "";
      background: #000;
      left: 0;
      bottom: 0;
    }
    .section{
      .year{
        font-size: 15px;
        font-weight: bold;
      }
      .list{
        li{
          list-style: none;
          line-height: 24px;
          .time{
            font-size: 14px;
            color: #999999;
            margin-right: 10px;
          }
          a{
            color: black;
            &:hover{
              color: #50a14f;
            }
          }
        }
      }
    }
  }
}
</style>
