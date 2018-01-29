<template>
    <div>
     
        <ButtonGroup>
            <Button type="primary" @click="modpl">添加</Button>
            <Button type="error" @click='removes'>删除多个</Button>
            <Button type="default" @click='re'>返回</Button>
           
        </ButtonGroup>

       
    
        <Modal
            v-model="modal"
            title="评论"
            @on-ok="ok"
            @on-cancel="cancel">
           <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
             <FormItem label="用户：" prop="name">
                <Input v-model="formValidate.name" placeholder="用户"></Input>
             </FormItem>
             <FormItem label="标题：" prop="title">
                <Input v-model="formValidate.title" placeholder="手动输入新闻标题"></Input>
             </FormItem>
             <FormItem label="新闻：" prop="newsId">
                <Input v-model="formValidate.newsId" ></Input>
             </FormItem>
                <FormItem label="内容：" prop="content">
                 <quill-editor v-model="formValidate.content">
                </quill-editor>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">确认添加</Button>
                <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
                
        </Modal>

<!-- {{$router.params.id}} -->
            <br>
        <div id='search'>     
            <!-- <Input v-model="data.name" placeholder="搜索" style="width: 300px" class='search'>    
                <Button type="info" class='search' @click="search">搜索</Button>
            </Input> -->
             <Input v-model="data.name">       
                <Button slot="append" icon="ios-search" @click="search"></Button>
            </Input>
            {{data.name}}
        </div>
        <Table border :columns="columns" :data="list" @on-selection-change="onSelectionChange"
        :page-size="4" :page-size-opts="[4,8,12]"></Table>
        
        <Page :total="data.total" 
        :page-size='data.limit'
        @on-change="onChangePage" 
        @on-page-size-change="onPageSizeChange" size="small" show-elevator show-sizer></Page>
      
    </div>
</template>
<script>
    export default {
        data () {
            return {
                pl:'',
                ids:[],
                 formValidate: {
                    name:'',
                    title:'',
                    newsId:'',
                    content:'',

                },
                ruleValidate: {
                   
                    
                },
                modal:false,
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
                        title: 'Title',
                        key: 'title'
                    },
                    {
                        title: 'Content',
                        key: 'content',
                        type:'html'
                    },
                    {
                        title: 'Date',
                        key: 'date'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, 'View'),
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
                                }, 'Delete')
                            ]);
                        }
                    }
                ],
                list:[],
                data: {
                    name:'',
                    limit:4,
                    page:1,
                    total:0,
                    id:''
                }           
            }
        },
        created(){
            //在初始化阶段，去请求nodejs的api，返回来的json数据
          this.data.id=location.href.split('/')[5]
          this.getData();
     
        },
        methods: {
      
               modpl(){
                    this.modal=true;
                    this.formValidate.newsId=this.$route.path.split('/')[2];
                    // this.formValidate.title=
                   
               },
               re(){
                   this.$router.push({path:'/news/'});
               },
               
            
          getData(){
              console.log(123123213);
            //   {{$router.params.id}}
            this.$http({
              method:'post',
              url:'http://10.31.153.18:3000/comment/list',
              data:this.data
            //   data:{
            //       limit:this.data.limit
            //   }

            
            }).then(res=>{
            
              console.log(res.data);
              this.list = res.data.docs;
              this.data.total = res.data.total;

            })
          },
            show (index) {                          
                this._id=this.list[index]._id;
                this.getData()
                // this.$Modal.info({
                //     // title: 'User Info',
                //     // content: `Name：${this.data[index].name}<br>Title${this.data[index].title}<br>Content:${this.data[index].content}<br>Date:${this.data[index].date}`
                     
                // })
            },


            

             remove (params) {
            
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        // this.$Message.info('Clicked ok');
                        //  console.log(params.row._id)

                        this.$http({
                          method:'delete',
                          url:`http://10.31.153.18:3000/comment/data/${params.row._id}`
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
            onSelectionChange(selection){
                if(selection&&selection.length>0){
                    var ids=[];
                    for(var i=0;i<selection.length;i++){
                        ids.push(selection[i]._id)
                    }

                    this.ids=ids
                }
            },
             removes(){
                this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确认删除？？？</p>',
                    onOk: () => {
                        console.log(this)
                        this.$http({
                            method:'post',
                            url:'http://10.31.153.18:3000/comment/data/removes',
                            data:{
                                ids:this.ids
                            }
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
             handleSubmit (name) {
                 //this.formValidate.newsId=$route.params.id
                // alert(this.formValidate.newsId)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                      this.$http({
                        method:'post',
                        url:'http://10.31.153.18:3000/comment/data',
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
              this.data.page = page;
              this.$http({
                method:'post',
                url:'http://10.31.153.18:3000/comment/list',
                data: this.data
                // data:{
                //     limit:this.data.limit,
                //     page:page
                // }               
              }).then(res=>{
                this.list =res.data.docs;
                this.data.total = res.data.total;
              })
            },
            onPageSizeChange(pageSize){
                this.data.limit = pageSize;//一页显示的个数
                this.getData();
            },
            search(){
              this.getData();
            }
        }
    }
</script>