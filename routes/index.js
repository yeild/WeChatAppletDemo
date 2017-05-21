var express = require('express');
var router = express.Router();
var itemList = [{
  Id:"1",
  ImgUrl: "http://ooqymz3vm.bkt.clouddn.com/mltt.jpg",
  Name: "麻辣兔头",
  Price:"29.80",
  PromotionPrice:"19.80",
  SalesNum:"5914"
},{
  Id:"2",
  ImgUrl: "http://ooqymz3vm.bkt.clouddn.com/lxnr2.jpg",
  Name: "冷香牛肉",
  Price:"42.80",
  PromotionPrice:"24.80",
  SalesNum:"2910"
},{
  Id:"3",
  ImgUrl: "http://ooqymz3vm.bkt.clouddn.com/xltd.jpg",
  Name: "香辣兔丁",
  Price:"82.80",
  PromotionPrice:"39.90",
  SalesNum:"15288"
},{
  Id:"4",
  ImgUrl: "http://ooqymz3vm.bkt.clouddn.com/xlttr.jpg",
  Name: "香辣兔腿",
  Price:"72.80",
  PromotionPrice:"28.80",
  SalesNum:"2829"
}];
var itemDetail = {
  "1": {
    Pictures: ["http://ooqymz3vm.bkt.clouddn.com/mltt.jpg", "http://ooqymz3vm.bkt.clouddn.com/mltt2.jpg"],
    Name: "麻辣兔头",
    TypeList: [
      {Type: "180g", PromotionPrice: "19.80", Price: "29.80"},
      {Type: "360g", PromotionPrice: "37.60", Price: "56.60"}
    ],
    SalesNum: "5914",
    Intro: "<p>麻辣兔头2个装 四川双流特产美食小吃兔头</p><img src=\"http://ooqymz3vm.bkt.clouddn.com/ttjs.jpg\">"
  },
  "2": {
    Pictures: ["http://ooqymz3vm.bkt.clouddn.com/lxnr2.jpg", "http://ooqymz3vm.bkt.clouddn.com/lxnr.jpg"],
    Name: "冷香牛肉",
    TypeList: [
      {Type: "120g", PromotionPrice: "42.80", Price: "24.80"},
      {Type: "240g", PromotionPrice: "80.40", Price: "46.60"}
    ],
    SalesNum: "2969",
    Intro: "<p>老四川麻辣牛肉干120g 四川特产零食小吃冷吃牛肉条</p><img src=\"http://ooqymz3vm.bkt.clouddn.com/nrjs.jpg\"><img src=\"http://ooqymz3vm.bkt.clouddn.com/nrjs2.jpg\">"
  },
  "3": {
    Pictures: ["http://ooqymz3vm.bkt.clouddn.com/xltd.jpg"],
    Name: "香辣兔丁",
    TypeList: [
      {Type: "200g*2", PromotionPrice: "82.80", Price: "39.90"}
    ],
    SalesNum: "17723",
    Intro: "<p>自贡冷吃兔麻辣兔肉200g*2袋 四川特产小吃美食兔丁</p><img src=\"http://ooqymz3vm.bkt.clouddn.com/tdjs.jpg\"><img src=\"http://ooqymz3vm.bkt.clouddn.com/tdjs2.jpg\">"
  },
  "4": {
    Pictures: ["http://ooqymz3vm.bkt.clouddn.com/xlttr.jpg", "http://ooqymz3vm.bkt.clouddn.com/xlttr2.jpg"],
    Name: "香辣兔腿",
    TypeList: [
      {Type: "3个装", PromotionPrice: "28.80", Price: "72.80"}
    ],
    SalesNum: "2829",
    Intro: "<p>香辣卤麻辣兔腿3个四川特产小吃美食另售兔头冷吃兔</p><img src=\"http://ooqymz3vm.bkt.clouddn.com/ttrjs.jpg\">"
  }
};
var coupon = 0,
  cash = {Type:"cash", Num: 2.9},
  discount = {Type:"discount", Num: 8.8},
  couponList = [];
router.get('/itemList', function(req, res, next) {
  res.send({ItemList: itemList});
});
router.get('/getCoupon', function(req, res, next) {
  switch (coupon) {
    case 0:
      res.send(cash);
      coupon++;
      couponList.push(cash);
      break;
    case 1:
      res.send(discount);
      coupon++;
      couponList.push(discount);
      break;
    default:
      res.send({Message: "你已经领取了很多优惠券了，先去使用吧！"});
  }
});
router.get('/couponList', function(req, res, next) {
  res.send({CouponList: couponList});
});
router.get('/detail', function(req, res, next) {

  res.send(itemDetail[req.query.Id]);
});
var addrList = [];
var counter = 0;
router.get('/addrList', function(req, res, next) {
  res.send({addrList: addrList});
});
router.post('/addAddr', function(req, res, next) {
  var _addr = req.body.addr
  var addr = {
    name: _addr.name,
    phone: _addr.phone,
    address: _addr.province + " " + _addr.city + " " + _addr.country + " " + _addr.address,
    isDefault: _addr.isDefault
  };
  addr.id = counter++;
  if(addrList.length == 0) {
    addr.isDefault = true;
    addrList.push(addr)
  } else if(addr.isDefault) {
    addrList[0].isDefault = false;
    addrList.unshift(addr)
  } else {
    addrList.push(addr)
  }
  res.send({result: true});
});
router.get('/setDefaultAddr', function(req, res, next) {
  addrList[0].isDefault = false;
  var _index;
  addrList.map(function(item, index){
    if(item.id == req.query.id) {
      item.isDefault = true
      _index = index
    }
  })
  addrList.unshift(addrList.splice(_index,1)[0])
  res.send({result: true});
});
router.get('/delAddr', function(req, res, next) {
  addrList = addrList.filter(function(item){
    return item.id != req.query.id
  })
  if(addrList[0] && !addrList[0].isDefault ){
    addrList[0].isDefault = true
  }
  res.send({result: true});
});
module.exports = router;
