<template>

    <div class="layout">
        <Layout>
            <Sider hide-trigger style="background:white;width:50px">
                <div>
                <Tree :data="data1"  @on-select-change="onSelectChange"></Tree></div>
            </Sider>
            <Layout>                
                <Content>
                   <ButtonGroup>
                        <Button type="primary" @click="add">添加</Button>
                        <Button type="error" @click="removes">删除多个</Button>      
                    </ButtonGroup>

                    <Input v-model="data.title">       
                        <Button slot="append" icon="ios-search" @click="search"></Button>
                    </Input>
                
                    <Modal
                        v-model="modal"
                        title="添加新闻"
                        @on-ok="ok"
                        @on-cancel="cancel">
                        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                            <FormItem label="标题：" prop="title">
                                <Input v-model="formValidate.title" placeholder="输入新闻标题："></Input>
                            </FormItem>
                            <FormItem label="作者：" prop="author">
                                <Input v-model="formValidate.author" placeholder="输入新闻作者："></Input>
                            </FormItem>
                            <FormItem label="分类：" prop="type">
                                <Select v-model="formValidate.type" style="width:200px">
                                    <OptionGroup label="国内新闻">
                                        <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </OptionGroup>
                                    <OptionGroup label="国外新闻">
                                        <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </OptionGroup>
                                </Select>
                            </FormItem>
                            <FormItem label="内容：" prop="content">
                                <!-- <textarea v-model="formValidate.content" placeholder="输入新闻内容："></textarea> -->
                                <quill-editor  v-model="formValidate.content">
                                </quill-editor>
                            </FormItem>
                        
                            <FormItem id='toxiugai' v-show='toadd'>
                                <Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
                                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                            </FormItem>
                            <FormItem id='toxiugai' v-show='!toadd'>
                                <Button type="primary" @click="xiugai(id)">确认修改</Button>
                                <!-- <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button> -->
                            </FormItem>
                        </Form>
                    </Modal>
                    <Table border :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
                    <Page :total="data.total" @on-change="onChangePage" @on-page-size-change="onPageSizeChange" size="small"
                     show-elevator show-sizer :page-size="5" :page-size-opts="[5,10,15]"></Page> 
                </Content>               
            </Layout>
        </Layout>
           
                    
           
        
    </div>
</template>

<script>
export default {
       
        data () {
            return {
                data1: [
                    {
                        title: '国内新闻',
                        expand: true,                       
                        children: [
                            {
                                title: '娱乐新闻'
                            },
                            {
                                title: '体育新闻'
                            }
                         ]
                    },
                    {
                        title: '国外新闻',
                        expand: true,                       
                        children: [
                            {
                                title: '篮球新闻'
                            }
                        ]
                    }
                ],
                ids:[],
                formValidate: {
                    title: '',
                    author: '',
                    type:'',
                    content:''
                   
                },
                ruleValidate: {
                    title: [
                        { required: true, message: 'The title cannot be empty', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: 'The author cannot be empty', trigger: 'blur' }
                    ]
                    
                },
                modal:false,
                toadd:true,
                columns: [
                     {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '标题',
                        key: 'title',
                        width:150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.title)
                            ]);
                        }
                    },
                   
                    {
                        title: '作者',
                        key: 'author',
                        width:100,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.author)
                            ]);
                        }                      
                    },
                    {
                        title: '分类',
                        key: 'type',
                        width:100,
                        align: 'center'                      
                    },
                     {
                        title: '内容',
                        key: 'content' , 
                        type:'html',
                        width:100,
                        align: 'center'                  
                    },
                    {
                        title: '时间',
                        key: 'date' ,
                        width:100,
                        align: 'center'                                      
                    },
                    {
                        title: '评论数',
                        key: 'contentCount' , 
                        width:100 ,
                        align: 'center'                                     
                    },
                    {
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
                    },
                     {
                        title: '评论',
                        key: 'action',
                        width: 80,
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
                                            this.pingshow(params)
                                        }
                                    }
                                }, '评论'),                              
                            ]);
                        }
                    }
                ],
                list:[],
                data: {  
                  title: '',                
                  limit:5,
                  page:1,    
                  total:0,
                  type:''
                },               
                cityList1: [
                    {
                        value: '娱乐新闻',
                        label: '娱乐新闻'
                    },
                    {
                        value: '体育新闻',
                        label: '体育新闻'
                    }
                ],
                cityList2: [
                    {
                        value: '篮球新闻',
                        label: '篮球新闻'
                    }
                ]
            }
        },
        created(){
          this.getData()
        },
        methods: {
            getData(){
                this.$http({
                    method:'post',
                    url:'http://10.31.153.18:3000/news/list',
                    data:this.data
                }).then(res=>{
                    this.list =res.data.docs;
                    this.data.total = res.data.total;
                })
            },
            pingshow(params){
            
                this.$router.push('/product')
            
            },
            show (index) {
                this.toadd=false;
                this.modal=true;
                Object.assign(this.$data.formValidate,this.$data.list[index]);
                delete this.formValidate._id;
                this.id=this.list[index]._id;
            },
            remove (params) {
            
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        this.$http({
                          method:'delete',
                          url:`http://10.31.153.18:3000/news/data/${params.row._id}`
                        }).then(res=>{
                          this.$Message.info('Clicked ok');
                          this.getData();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });                       
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            add (){
                Object.assign(this.$data.formValidate, this.$options.data().formValidate);
                this.modal = true;
                this.toadd=true;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http({
                            method:'post',
                            url:'http://10.31.153.18:3000/news/data',
                            data: this.formValidate
                            
                        }).then(res=>{
                            this.getData();
                            this.$Message.success('Success!');
                            Object.assign(this.$data.formValidate, this.$options.data().formValidate)
                            this.modal = false;
                        })
                        
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            onChangePage(page){
              this.$http({
                method:'post',
                url:'http://10.31.153.18:3000/news/list',
                data: {
                  limit:this.data.limit,
                  page:page
                }                
              }).then(res=>{
                this.list =res.data.docs;
                this.data.total = res.data.total;
              })
            },
            onPageSizeChange(pageSize){
                this.data.limit = pageSize;
                this.getData();
            },
            search(){
                this.getData();
            },
            onSelectionChange(selection){
                if(selection && selection.length>0){
                    var ids = [];
                    for(let i =0;i<selection.length;i++){
                        ids.push(selection[i]._id)
                    }
                    this.ids = ids;                  
                }
            },
            removes(){               
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确认删除选中的新闻？</p>',
                    onOk: () => {
                       this.$http({
                            method:'post',
                            url:'http://10.31.153.18:3000/news/data/removes',
                            data:{
                                ids:this.ids
                            }
                        }).then(res=>{
                        
                            this.getData();
                        })
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });                
            },
            xiugai(id){               
                this.$Modal.confirm({
                    title:'title',
                    content:'<p>确认修改?<p>',
                    onOk:()=>{
                        this.$http({
                            method:'put',
                            url:'http://10.31.153.18:3000/news/data/'+id,
                            data:this.formValidate
                        }).then(res=>{
                         this.$Message.info('ok');
                         this.modal=false;
                         this.getData();
                        })
                    },
                    onCanel:()=>{
                        this.$Message.info('cancel')
                        Object.assign(this.$data.formValidate, this.$options.data().formValidate)
                    }
                })
            },
            onSelectChange(select){
                this.data.title='';
                this.data.type=select[0].title;
                this.getData();
            }
        }
    }
</script>

<style>

</style>
