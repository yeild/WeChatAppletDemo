const Koa = require('koa')
const Router = require('koa-router')
const assets = require('koa-static')('./public')
const bodyParser = require('koa-bodyparser')
const server = new Koa()
const router = new Router()
const goods = require('./data/goods_list')
const goodsDetail = require('./data/goods_detail')

server.use(bodyParser())
server.use(assets)
server.use(router.routes())

router.get('/goods', (ctx) => {
  ctx.body = { goods }
})

router.get('/goods/:id', (ctx) => {
  ctx.body = goodsDetail[ctx.params.id]
})

let coupon = 0
let cash = {Type:"cash", Num: 2.9}
let discount = {Type:"discount", Num: 8.8}
let couponList = []
router.get('/getCoupon', ctx => {
  switch (coupon) {
    case 0:
      ctx.body = cash
      coupon++
      couponList.push(cash)
      break
    case 1:
      ctx.body = discount
      coupon++
      couponList.push(discount)
      break;
    default:
      ctx.body = {Message: "你已经领取了很多优惠券了，先去使用吧！"}
  }
})
router.get('/couponList', ctx => {
  ctx.body = {CouponList: couponList}
})

let addressList = []
let id = 0

router.get('/address', ctx => {
  ctx.body = { addressList }
})

router.post('/address', ctx => {
  let address = ctx.request.body.address
  address.address = address.province + " " + address.city + " " + address.country + " " + address.address
  address.id = id++

  if(addressList.length == 0) {
    address.isDefault = true
    addressList.push(address)
  } else if(address.isDefault) {
    addressList[0].isDefault = false
    addressList.unshift(address)
  } else {
    addressList.push(address)
  }
  ctx.body = {result: true}
})

router.put('/defaultAddress/:id', ctx => {
  addressList[0].isDefault = false
  let index
  addressList.map( (item, i) => {
    if(item.id == ctx.params.id) {
      item.isDefault = true
      index = i
    }
  })
  addressList.unshift(addressList.splice(index,1)[0])
  ctx.body = { result: true }
})

router.delete('/address/:id', ctx => {
  addressList = addressList.filter(function(item){
    return item.id != ctx.params.id
  })
  if(addressList[0] && !addressList[0].isDefault ){
    addressList[0].isDefault = true
  }
  ctx.body = { result: true }
})

server.listen(3000, function () {
  console.log('>localhost:3000')
})

