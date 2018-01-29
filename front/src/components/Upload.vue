<template>
  <div class='layout'>
      <Layout>
          <Upload 
            multiple
            type="drag"
            name='avatar'
            @success="getData()"
            action="http://10.31.153.21:3000/upload/file">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>上传后台产品图片</p>
            </div>
        </Upload>
      </Layout>
      <Layout> 
         <Sider hide-trigger style="background:white;">
                <div>
                <Tree :data="data1" @on-select-change="onSelectChange"></Tree></div>
        </Sider>      
        <Layout>  
          <Table border :columns="columns" :data="list" @on-selection-change="onSelectionChange"></Table>
                    <Page :total="data.total" @on-change="onChangePage" @on-page-size-change="onPageSizeChange" size="small"
                     show-elevator show-sizer :page-size="5" :page-size-opts="[5,10,15]"></Page> 
        </Layout>         
      </Layout>
  </div>
</template>

<script>
export default {
      data(){
        return {
          columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '文件名',
                        key: 'originalname',
                        width:250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.originalname)
                            ]);
                        }
                    },
                   {
                        title: '类型',
                        key: 'cate',
                        width:200,
                        align: 'center'                      
                    },
                    {
                        title: '图片本地路径',
                        key: 'destination',
                        width:200,
                        align: 'center'                      
                    },
                     {
                        title: 'Action',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
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
                ],
            list:[],
          ids:'',
          data: {  
                  limit:5,
                  page:1,    
                  total:0,
                  cate:''
                },    
          data1: [
                    {
                        title: '图片',
                        expand: true,                       
                        children: [
                            {
                                title: 'gif'
                            },
                            {
                                title: 'jpg'
                            },
                            {
                                title: 'png'
                            }
                         ]
                    },
                    {
                        title: '文档',
                        expand: true,                       
                       /*  children: [
                            {
                                title: '篮球新闻'
                            }
                        ] */
                    }
                ],

          
        }
      },
      created(){
        this.getData()
      },
      methods:{
       remove (params) {
        //  console.log(params)
                 this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>确认删除？</p>',
                    onOk: () => {
                        this.$http({
                          method:'delete',
                          url:`http://10.31.153.21:3000/upload/data/${params.row._id}`
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
        onChangePage(page){
              this.$http({
                method:'post',
                url:'http://10.31.153.21:3000/upload/list',
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
        onSelectionChange(selection){
                if(selection && selection.length>0){
                    var ids = [];
                    for(let i =0;i<selection.length;i++){
                        ids.push(selection[i]._id)
                    }
                    this.ids = ids;                  
                }
            },
        search(){
              this.getData();
        },
        onSelectChange(select){
              this.data.cate=select[0].title;
              this.getData();
        },
        getData(){
            this.$http({
                method:'post',
                url:'http://10.31.153.21:3000/upload/list'
                ,data:this.data
            }).then(res=>{
                this.list=res.data.docs;
                this.data.total=res.data.total;
                this.data.cate='';
            })
        },
      }
}
</script>

<style>

</style>
