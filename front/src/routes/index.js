import Cate from '../components/Cate'
import User from '../components/User'
import News from '../components/News'
import Upload from '../components/Upload'
import Home from '../components/Home'
import Comment from '../components/Comment'
export const routes=[
    {path:'/',component:Home},
    {path:'/cate',component:Cate},
    {path:'/user',component:User},
    {path:'/news',component:News},
    {path:'/news/:id',component:Comment},
    {path:'/upload',component:Upload}
]