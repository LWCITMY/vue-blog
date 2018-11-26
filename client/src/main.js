// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/assets/style/index.scss'
import Vue from 'vue'
import App from './App'
import router from './router'
//将图标库的js文件引入进来
import '@/assets/img/icon/iconfont'
//引入element-ui
import ElementUI from 'element-ui'
//引入element-ui的样式表
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

//使用element-ui作为我们的框架
Vue.use(ElementUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
