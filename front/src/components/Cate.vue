<template>

<div>
      <ButtonGroup>
        <Button type='primary' @click="typechange(0)">新闻分类</Button>
        <Button type="error" @click="typechange(1)">产品分类</Button>
        <Button type='primary' @click="typechange(2)">列表</Button>
        <Button type="error" @click="typechange(3)">上传分类</Button>

    </ButtonGroup>

    <Tree :data="data" :render="renderContent"></Tree>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="标题分类" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="parentID" prop="parentId">
            <Input v-model="formValidate.parentId" placeholder="parentID"></Input>
        </FormItem>
        <FormItem label="typeid" prop="type">
            <Input v-model="formValidate.type" placeholder="typeid"></Input>
        </FormItem>
         <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>
</template>
<script>
    export default {
        data () {
            return {
              formValidate: {
                    title: '',
                    parentId:null,
                    type:0
               
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }]
                },
                data:[],
                buttonProps: {
                    type: 'ghost',
                    size: 'small',
                }
            }
        },
        created(){
          this.getdata()
        },
        methods: {
          getdata(type){
              var type=type||0
              this.$http.post(`http://localhost:3000/cate/list/${type}`).then((response) => {
                  console.log(response.data)
                     this.data=response.data
                      })
          },
          renderContent (h, { root, node, data }) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-plus-empty'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () => { 
                                    this.formValidate.parentId=data._id
                                    console.log(data)
                             }
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-minus-empty'
                            }),
                            on: {
                                click: () => {
                                  
                                     this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            },
            remove (root, node, data) {
                    this.$Modal.confirm({
                    title:'title',
                    content:'<p>确认删除?<p>',
                onOk:()=>{
                    this.$http({
                            method:"delete",
                            url:`http://localhost:3000/cate/data/${data._id}`,
                        }).then(res=>{
                            this.getdata()
                            this.$Message.success('删除成功!');
                         
                        })
                }
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$http({
                            method:"post",
                            url:"http://localhost:3000/cate/data",
                            data:this.formValidate
                        }).then(res=>{
                            this.getdata()
                            this.$Message.success('标题上传成功!');

                            Object.assign(this.$data.formValidate,this.$options.data().formValidate)
                        })
                           // })
                    } else {
                        this.$Message.error('标题上传失败!');
                    }
                })
            }, 
            handleReset (name) {
      
                this.$refs[name].resetFields();
            },
            typechange(type){
               this.getdata(type)
                this.formValidate.type=type

            }

        }
    }
</script>
