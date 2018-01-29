<style scoped lang="scss">
    .active{
      color:white
    }
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
    
      <div v-if="!login">
       <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="5">
                            <Icon type="chevron-right" color="red"></Icon>
                        
                        </MenuItem>
                        <MenuItem name="6">
                          <Icon type="chevron-right" color="yellow"></Icon>
                         
                        </MenuItem>
                        <MenuItem name="7">
                            <Icon type="chevron-right" color="blue"></Icon>
                        
                        </MenuItem>
                        <MenuItem name="8">
                            <Icon type="person" color="red"></Icon>
                          欢迎您 :{{cookie}}
                        </MenuItem>

                        <Button type="primary" @click="exit">退出登录</Button>
                    </div>
                </Menu>
            </Header>
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                   <router-link to="/"  name='dwasad' active-class="active" exact>
                        <MenuItem name="1-1"  @click.native="cps='sads'">
                                <Icon type="ios-navigate"></Icon>
                                <span>首页管理</span>
                        </MenuItem>
                    </router-link>
                        
                    <router-link :to="{path:'/cate',query: {name: '分类管理'}}" name='1-2' active-class="active">
                        <MenuItem name="1-2">
                                <Icon type="ios-navigate"></Icon>
                                <span>分类管理</span>
                        </MenuItem>
                    </router-link>
                        <router-link :to="{path:'/user',query: {name: '用户管理'}}" active-class="active">
                        <MenuItem name="1-3">
                                <Icon type="search"></Icon>
                                <span>用户管理</span>
                        </MenuItem>
                        </router-link>
                        <router-link :to="{path:'/news',query: {name: '新闻管理'}}" active-class="active">
                    <MenuItem name="1-4">
                            <Icon type="settings"></Icon>
                            <span>新闻管理</span>
                    </MenuItem>
                        </router-link>
                        <router-link :to="{path:'/upload',query: {name: '上传管理'}}" active-class="active">
                            <MenuItem name="1-5">
                                    <Icon type="settings"></Icon>
                                    <span>上传管理</span>
                            </MenuItem>
                        </router-link>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#4696C4', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">     
              
                <Icon type="ios-home-outline" style="font-size:40px;color:#fff;font-weight:900"></Icon>
                <span  style="font-size:30px;color:#fff;font-family:'KaiTi'">　　欢 迎 来 到 管 理 系 统</span>
                                     
                </Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <router-link to='/'><BreadcrumbItem>首页</BreadcrumbItem></router-link>
                      <BreadcrumbItem>/　{{$route.query.name}}</BreadcrumbItem>
                        
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                          <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
        </div>
        <div class="login-1" v-else>
       <div class="login-2">
       <h2>请输入用户名</h2>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
            <FormItem prop="user">
                <Input type="text" v-model="formInline.user" placeholder="Username"　@on-blur='surename'>
                    <Icon type="ios-person-outline" color="red" slot="prepend"></Icon>
                </Input>
            </FormItem>
            </br>
            <FormItem prop="password">
                <Input type="password" v-model="formInline.password" placeholder="Password">
                    <Icon type="ios-locked-outline" color="red" slot="prepend"></Icon>
                </Input>
            </FormItem>
            </br>
            <FormItem>
                <Button type="primary" @click="tologin('formInline')">登录</Button>
            </FormItem>
        </Form>
    </div>
    </div>
    </div>
</template>
<script>

import md5 from 'crypto-js/md5';
import {mapGetters,mapActions} from 'vuex'
    export default {
        data () {
            return {
                isCollapsed: false,
                cookie:'',
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 3, message: 'The password length cannot be less than 3 bits', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){
            
            if(this.$cookie.get('username')){
                this.checkLogin(true)
                this.cookie=this.$cookie.get('username')
            }else{
                this.checkLogin(false)
            }
        },
        methods:{
          surename(){
                if (this.formInline.user) {
                this.$http({
                    method: "post",
                    url: "http://10.31.153.21:3000/users/ishe",
                    data: {
                    name:this.formInline.user
                    }
                }).then(res => {
                    if(!res.data.name){
                       this.$Message.error('用户名不存在!');
                    }
                })
                }
              },

            exit(){
                  this.checkLogin(false);             
                  this.$cookie.delete('username');
                  Object.assign(this.$data.formInline,this.$options.data().formInline)
            },
            ...mapActions(['checkLogin']),
            tologin(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {                   
                                                                  
                        this.$http({
                            method:'post',
                            url:'http://10.31.153.21:3000/users/login',
                            data:{
                                name:this.formInline.user,
                                password:md5(this.formInline.password).toString()
                            }
                        }).then(res=>{
                            console.log('asdsadsadsd')
                            if(res.data.name){
                                this.$cookie.set('username', res.data.name, 10);                              
                                this.cookie=this.$cookie.get('username')
                                this.checkLogin(true);
                                this.$Notice.open({
                                    title: '登录成功',
                                    desc: '恭喜你，登录成功，即将进入后台管理系统'
                                });
                            }else{
                                this.$Notice.open({
                                    title: '登录失败',
                                    desc: '用户名或者密码错误'
                                });
                            }
                        })
                      
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            }
        },
        computed: {            
                    ...mapGetters(['login']),                
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>

<style lang="scss">
.active{
  color:#fff
}
.login-1{
    padding:200px 450px;
     width:100%;
     height:100%;
     background:url(./img/16.png) no-repeat
}
.login-2{
    width:400px;
    height:400px;
    background:red;
    background:#f2f2f2;
    border-radius:10px;
    padding:50px 100px
}
.login-2 h2{
    margin-bottom:50px
}

</style>