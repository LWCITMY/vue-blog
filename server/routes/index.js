import Router from 'koa-router'
import {base_API} from "../config"

//引入我们的登录注册控制器
import UserController from '../Controller/UserController'
//引入文章相关的控制器
import ArticleController from '../Controller/ArticleController'
//引入书籍相关的控制器
import BookController from '../Controller/BookController'
//引入标签筛选的控制器
import TagController from '../Controller/TagController'
//引入关于我的控制器
import BriefController from '../Controller/BriefController'
//引入文章归档的控制器
import IntroController from '../Controller/IntroController'

//引入验证token合法性的方法
import checkToken from '../utils/checkToken'

const router = new Router()


router.get('/',async ctx=>{
    ctx.body = '欢迎使用vue-blog接口测试服务器'
})
//所有的路由都写在这里就可以了
//前端所有的请求发过来的时候都是http:/localhost/api/......
router.prefix(`${base_API}`)

//登录
router.post('/login',UserController.login);
//退出
//只要是登录后才能看到的内容都需要验证一下token的合法性
router.get('/logOut',checkToken,UserController.logOut);
//获取所有文章
router.get('/articles',ArticleController.getArticles);
//添加一篇新的文章
router.post('/article/add',checkToken,ArticleController.addArticle);
//查询一下最新发布的那篇文章的详细信息
router.get('/articles/:id',ArticleController.getOneArticle);
//更新一篇新的文章
router.post('/articles/update/:id',checkToken,ArticleController.updateArticle);
//删除一篇文章
router.delete('/articles/:id',checkToken,ArticleController.deleteArticle);
//发布文章
router.put('/articles/publish/:id',checkToken,ArticleController.publishArticle);
//获取所有书籍
router.get('/books',checkToken,BookController.getBookList)
//添加书籍
router.post('/books',checkToken,BookController.addBook)
//编辑书籍
router.put('/books/edit/:id',checkToken,BookController.editBook)
//删除书籍
router.delete('/books/delete/:id',checkToken,BookController.deleteBook)
//获取标签
router.put('/:id', checkToken,TagController.updateTag)
//获取我的
router.get('/briefs',checkToken, BriefController.getBrief)
//编辑我的
router.put('/briefs/:id',checkToken, BriefController.updateBrief)

router.get('/introductions',checkToken,IntroController.getIntroductions)
export default router