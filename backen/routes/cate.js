var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/cate.controller');
// post是新增 put是修改 delete是删除 get是获取
router.post('/data',dataCtrl.create);
router.put('/data/:id',dataCtrl.update);
router.delete('/data/:id',dataCtrl.remove);
router.post('/list/:type',dataCtrl.list);
module.exports = router;
