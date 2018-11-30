<template>
    <div class="tag-container">
        <h2>标签云</h2>
        <ul class="tag-list">
            <li v-for="{id,tags} in tags">
              <!--<router-link :to="'/articles/' + tag.id">{{ tag.tags }}</router-link>-->
              <div class="asty" @click="view(id)">{{tags}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
/**
 * @author
 * @file Hello World
 */

import moment from 'moment'
import request from '@/utils/request'

moment.locale('zh-CN')
export default {
  data() {
    return {
      tags: [],
      Id:''
    }
  },
  watch:{
    Id(newVal,oldVal){
      this.$router.push('/articles')
    }
  },
  methods:{
    view(id){
      this.$router.push('/articles/' + id)
      this.Id = id
    }
  },
  created() {
    request({
      url:`/introductions`,
      method:'get'
    }).then(res => {
      this.tags = res
      console.log(res)
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
  .tag-container{
    width: 300px;
    background-color: #f7f7f7;
    margin-bottom: 20px;
    h2{
      color: #333;
      font-size: 14px;
      line-height: 30px;
      padding-left: 20px;
      background: #fff;
      margin: 0;
    }
    .tag-list{
      padding: 10px;
      li{
        list-style: none;
        display: inline-block;
        border-radius: 15px;
        padding: 8px;
        margin: 5px;
        background-color: #FC9D9A;
        .asty{
          color: #ffffff;
        }
      }
      li:hover{
        cursor: pointer;
        border-radius: 0px!important;
      }
    }
  }
</style>
