export const db = {
    //主机名
    host:'localhost',
    //端口号
    port:'3306',
    //数据库用户名
    user:'root',
    //密码
    password:'123456',
    multipleStatements:true //必须加上这句话,不然的话就无法执行多条sql语句
}
export const dbName = {
    database:'lwc_blog'
}

export const base_API = '/api'

export const secret = 'lwc_blog'