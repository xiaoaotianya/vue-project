<<<<<<< HEAD
﻿# vueproject
=======
﻿### vueproject
>>>>>>> c4bb82c1fb3b9a0cd993bdd97a6826f863ebf030
小组名单ren
林明煌
汪忠孝
吴雪锋
王云

<<<<<<< HEAD
#1-9：王云
=======
###数据模型：
cate.model:
    title: {type: String},
    type:{type:Number},
    expand:{type:Boolean}

comment.model:
    name:String,
    title:String,
    content:String, 
    date: { type: Date, default: Date.now },
    newsId:mongoose.Schema.ObjectId

news.model:
    title:String,
    author:String,
    type:String,
    content:String,  
    date: { type: Date, default: Date.now },
    commentCount:Number

upload.model:
    fieldname:String,
    originalname:String,
    encoding:String,
    mimetype: String,
    destination:String,
    filename:String,
    path:String,
    size:Number,
    cate:String

user.model:
    name:String,
    password:String,
    mail:String,
    date: { type: Date, default: Date.now },
    gender:String,
    desc:String




###1-9：王云
>>>>>>> c4bb82c1fb3b9a0cd993bdd97a6826f863ebf030

本想用之前的分支来解决冲突，后来发现难以整合，于是在1-9号开始又使用master主支。
评论模块：前台vue——front,后台node.js——backen
实现基本处理事务。
数据模型：
    name:String,
    title:String,
    content:String, 
    date: { type: Date, default: Date.now },
    newsId:mongoose.Schema.ObjectId


###林明煌
##1-9：
#前端vue：front，后台nodejs:backen
    由于复制的项目使用iview出现未知错误，故使用脚手架重新安装，vue init webpack-simple front
#前台ui：iviewui。安装：cnpm i iview -S
#处理用户模块
    记得webpack-simple版本最好为2.9.1，用指定版本安装@符号即可。
##1-10：
#user模块增删改查功能都有。
#user模块的修改，和添加使用同一个表单。解决办法：
    使用v-show对按钮部分进行隐藏和显示，由于双向绑定，默认数据的修改可以直接在表单提交数据上修改。
#user的多行删除，使用@on-selection-change事件，完成这个事件需要在后台添加多行删除方法，这个方法可以
    通过循环遍历删除数组，或者{_id:{$in:delists}。
    提交的密码使用md5加密，需要下载crypto-js模块，npm install crypto-js
##1-11:
    使用vuex状态实现用户登录状态，然后使用在本地使用cookie存储。
##1-12:
    upload上传模块：只有删除操作和添加操作，更改操作没有需求，不做研究
    
###1-9：吴雪锋
#分类管理模块；
#主页
#登录验证模块

使用.gitignore
内容设置为： /front/node_modules
            /backen/node_modules
上传时自动避免node-moudles


##router的设置与引用：
    静态路由表
    分配地址；
    寻址；
    统一入口
    过滤
1)安装router；
2)index的router路径的设置
3)main.js中路由的引入、使用与实例化
4)app中路由的渲染及组件支持用户在具有路由功能的应用中（点击）导航
5)可以设置tag、append、active-class、exact等属性


<<<<<<< HEAD
###1-9：林明煌
#前端vue：front，后台nodejs:backen
由于复制的项目使用iview出现未知错误，故使用脚手架重新安装，vue init webpack-simple front
#前台ui：iviewui。安装：cnpm i iview -S
##处理用户模块
记得webpack-simple版本最好为2.9.1，用指定版本安装@符号即可。
###1-10：
#user模块增删改查功能都有。
#user模块的修改，和添加使用同一个表单。解决办法：
使用v-show对按钮部分进行隐藏和显示，由于双向绑定，默认数据的修改可以直接在表单提交数据上修改。
user的多行删除，使用@on-selection-change事件，完成这个事件需要在后台添加多行删除方法，这个方法可以
通过循环遍历删除数组，或者{_id:{$in:delists}。
提交的密码使用md5加密，需要下载crypto-js模块，npm install crypto-js
###1-11:
使用vuex状态实现用户登录状态，然后使用在本地使用cookie存储。
upload上传模块：只有删除操作和添加操作，更改操作没有需求，不做研究


###1-9：吴雪锋
#分类管理模块；
#主页
#登录验证模块

使用.gitignore
内容设置为： /front/node_modules
            /backen/node_modules
上传时自动避免node-moudles


##router的设置与引用：
    静态路由表
    分配地址；
    寻址；
    统一入口
    过滤
1)安装router；
2)index的router路径的设置
3)main.js中路由的引入、使用与实例化
4)app中路由的渲染及组件支持用户在具有路由功能的应用中（点击）导航
5)可以设置tag、append、active-class、exact等属性


=======
>>>>>>> c4bb82c1fb3b9a0cd993bdd97a6826f863ebf030

###1-9：汪忠孝
新闻模块
1）新闻的增加删除修改和查看功能
2）新闻的分类问题
3）新闻的多个删除功能
