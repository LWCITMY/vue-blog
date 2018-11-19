<template>
  <!--用svg引入图标-->
  <!--<div>-->
  <!--<svg class="icon" aria-hidden="true">-->
  <!--<use xlink:href="#icon-liebiao"></use>-->
  <!--</svg>-->
  <!--</div>-->
  <div class="login-container">
    <el-form ref="LoginForm" :model="LoginForm"  class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">博客交流系统</h3>
      <el-form-item prop="username">
        <span class="svg-container">
           <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-40one"></use>
           </svg>
        </span>
        <el-input v-validate="'required'" v-model="LoginForm.user" name="user" type="text" auto-complete="on" placeholder="username" />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-password"></use>
           </svg>
        </span>
        <el-input v-validate="'required'" :type="pwdType" v-model="LoginForm.password" name="password" auto-complete="on" placeholder="password" @keyup.enter.native="login" />

        <span class="show-pwd" @click="showPwd">
          <svg class="icon" aria-hidden="true">
             <use xlink:href="#icon-yanjing"></use>
          </svg>
        </span>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <notifications group="user"></notifications>
    <notifications group="admin"></notifications>
  </div>
</template>

<script>
  //设置验证的提示消息
  import {Validator} from 'vee-validate';
  //引入设置cookie的方法
  import {setToken} from "../utils/auth";

  const dict = {
    custom: {
      user: {
        required: '您的用户名不能为空'
      },
      password: {
        required: () => '您的密码不能为空'
      }
    }
  };
  Validator.localize('en', dict);
  //引入发请求的模块
  import request from '@/utils/request'

  export default {
    name: "Login",
    data() {
      return {
        LoginForm: {
          user: '',
          password: ''
        },
        loading:false,
        pwdType:'password'
      }
    },
    methods: {
      //展示密码
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      //登录方法
      login: function () {
        //首先拿到验证成功失败的结果,如果成功了,在进行登录,如果失败了,则进行消息提示
        if (this.errors.items.length === 0) {
          request({
            url: '/login',
            method: 'post',
            data: this.LoginForm
          }).then(res => {
            // console.log(res)
            if (res.success) {
              //正确后,要先得到token值,将token存到cookie里面
              //跳转到博客系统的首页,也就是.list页面
              let token = res.token;
              setToken(token);
              this.$store.commit('SET_TOKEN', token)
              this.$router.push('/list')
            } else {
              //如果用户名密码不正确的话,要给出提示
              this.$notify({
                type: 'error',
                group: 'admin',
                title: '登录失败',
                text: res.message
              })
              this.LoginForm = {}
            }
          }).catch(err => {
            //如果发请求的时候有错误,把错误扔到控制台
            console.log(err)
          })
        } else {
          this.$notify({
            type: 'warn',
            group: 'user',
            title: '验证失败',
            text: this.errors.items[0].msg
          })
        }
      }
    }
    // //钩子函数,当组件加载完毕的时候自动执行
    // mounted:function () {
    //   request({
    //     url:"/index",
    //     method:'get'
    //   }).then((res)=>{
    //     console.log(res);
    //   })
    // }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../assets/style/variable";
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
