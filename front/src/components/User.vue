<template>
<div>
    <ButtonGroup style="margin-bottom: 8px">
        <Button type='primary' @click='addform' aim='add'>添加</Button>
        <Button type="error" @click='delM'>删除多个</Button>
    </ButtonGroup>
     <Input v-model="data.name">
        <Button slot="append" icon="ios-search" @click='search'></Button>
    </Input>
    <Modal
        v-model="modal"
        title="用户信息"
        @on-ok="ok"
        @on-cancel="cancel">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="name">
            <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
        </FormItem>
         <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formValidate.gender">
                <Radio label="male">男</Radio>
                <Radio label="female">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="电子邮箱" prop="mail">
            <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
        </FormItem>
        <FormItem label="密码" prop="password" v-show='toadd'>
            <Input type="password" v-model="formValidate.password" placeholder="Enter your password"></Input>
        </FormItem>
        <FormItem label="重复密码" prop="passwdCheck" v-show='toadd'>
            <Input type="password" v-model="formValidate.passwdCheck" placeholder="repeat your password"></Input>
        </FormItem>
        <FormItem label="描述" prop="desc">
            <quill-editor 
            v-model='formValidate.desc'>
            </quill-editor>
        </FormItem>
         <FormItem id='toadd' v-show='toadd'>
            <Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
         <FormItem id='toxiugai' v-show='!toadd'>
            <Button type="primary" @click="xiugai(id)">确认修改</Button>
            <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button> -->
        </FormItem>
    </Form>
    </Modal>
    <Table border :columns="columns" :data="list" @on-selection-change='onselect'></Table>
    <Page :total="data.total" size="small" @on-page-size-change='changepagesize' 
    :page-size='data.limit' @on-change="change" show-elevator show-sizer ></Page>
</div>
</template>
<script>
import md5 from 'crypto-js/md5';
// import {mapGetters} from 'vuex'
    export default {
        data () {
             const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.formValidate.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formValidate.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formValidate.password) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };
            return {
                searchvalue:'',
                formValidate: {
                    name: '',
                    mail: '',
                    gender: '',
                    password:'',
                    passwdCheck:'',
                    desc:'',
                },
                ruleValidate: {
                    password: [
                        { required: true,validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { required: true,validator: validatePassCheck, trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ]
                },
                modal:false,
                toadd:true,
                id:'',
                columns: [
                  {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title:'Mail',
                        key:'mail'
                    },
                    {
                        title:'Gender',
                        key:'gender'
                    },
                    {
                        title:'Password',
                        key:'password'
                    }
                    ,{
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                 
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list: [],
                delists:[],
                data:{
                    name:'',
                    limit:3,
                    page:0,
                    total:0,
                }
            }
        },
        created(){
            this.getData();
        },
        computed:{
            // mapGetters(['login']);
        },
        methods: {
            addform(){
                this.toadd=true;
                Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                console.log(this.formValidate)
                this.modal=true  
            },
            delM(){
               this.$Modal.confirm({
                    title:'title',
                    content:'<p>确认删除?<p>',
                    onOk:()=>{
                        this.$http({
                            method:'post',
                            url:'http://10.31.153.21:3000/users/data/delm',
                            data:{
                                delists:this.delists
                            }
                        }).then(res=>{
                         this.$Message.info('ok')
                         this.getData();
                        })
                    },
                    onCanel:()=>{
                        this.$Message.info('cancel')
                    }
                }) 
            },
            onselect(selection){
                if(selection&&selection.length>0){
                    var lists=[];
                for(let i=0;i<selection.length;i++){
                    lists.push(selection[i]._id)
                }
                this.delists=lists;
                }
            },
            search(){
                this.getData()
            },
            getData(){
                this.$http({
                    method:'post',
                    url:'http://10.31.153.21:3000/users/list'
                    ,data:this.data
                }).then(res=>{
                    this.list=res.data.docs;
                    this.data.total=res.data.total;
                })
            },
            show (index) {
                this.toadd=false;
                // this.formValidate=this.list[index]
                Object.assign(this.$data.formValidate,this.$data.list[index])
                delete this.formValidate._id;
                this.id=this.list[index]._id
                this.modal=true;
            },
             xiugai(id){
                this.formValidate.
                this.$Modal.confirm({
                    title:'title',
                    content:'<p>确认修改?<p>',
                    onOk:()=>{
                        this.$http({
                            method:'put',
                            url:'http://10.31.153.21:3000/users/data/'+id,
                            data:this.formValidate
                        }).then(res=>{
                         this.$Message.info('ok')
                         this.getData();
                         this.modal=false;
                        })
                    },
                    onCanel:()=>{
                        this.$Message.info('cancel')
                    }
                })
            },
            remove (params) {
                this.$Modal.confirm({
                    title:'title',
                    content:'<p>确认删除?<p>',
                    // data:this.data,
                    onOk:()=>{
                        this.$http({
                            method:'delete',
                            url:`http://10.31.153.21:3000/users/data/${params.row._id}`
                        }).then(res=>{
                         this.$Message.info('ok')
                         this.getData();
                        })
                    },
                    onCanel:()=>{
                        this.$Message.info('cancel')
                    }
                })
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            change(page){
                this.data.page=page
                this.$http({
                    method:"post",
                    url:"http://10.31.153.21:3000/users/list",
                    data:this.data
                }).then(res=>{
                    this.list=res.data.docs;
                    this.data.total=res.data.total;
                })
            },
            changepagesize(pagesize){
                this.data.limit=pagesize;
                this.getData();
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    this.formValidate.password=md5(this.formValidate.password).toString();
                    if (valid) {
                        this.$http({
                            method:'post',
                            url:'http://10.31.153.21:3000/users/data',
                            data:this.formValidate
                        }).then(res=>{
                            this.getData();
                            this.$Message.success('success');
                            this.modal=false;
                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                        })
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
           
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
