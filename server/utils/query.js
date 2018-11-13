//首先来接mysql数据库
//封装一个query方法,方便我们进行sql语句的执行
import mysql from 'mysql'
import { db,dbName } from '../config'
import fs from 'fs'
import path from 'path'
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/lwc_blog.sql'), 'utf-8')
//第一次连接数据库的时候,没有指定数据库名称,这次连接的目的是为了能够创建一个lwc_blog数据库
//并且将数据库文件执行,执行完毕之后lwc_blog数据库就有对应的表的和数据了
const init = mysql.createConnection(db)
init.connect()
let pool = null;
init.query('CREATE DATABASE lwc_blog',err=>{
    Object.assign(db,dbName)
    //第二次那连接数据库,这时候,数据库lwc_blog已经创建成功了,这时候,直接连接lwc_blog数据库
    //然后执行sql文件夹下的lwc_blog.sql文件,对应的表和测试数据就已经存在数据库里面了
    pool = mysql.createPool(db)
    if(err){
        console.log('数据库已经存在')
    }else {
        query(sqlContent).then(res=>{
            console.log('数据库创建成功')
        }).catch(err=>{
            console.log(err)
        })
    }
})
init.end()


export default function query(sql,values){
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(err,collection){
            if(err){
                reject(err);
            }else{
                collection.query(sql,values,(err,data)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(data);
                    }
                })
            }
        })
    })
}

