Page({
  data:{
    orderList:[
      {
       goodsName: '[180g]麻辣兔头',
       goodsNum: 1,
       status: '待付款',
       total: '19.80',
      },{
       goodsName: '[180g]麻辣兔头',
       goodsNum: 1,
       status: '待收货',
       logistics: '顺水快递',
      },{
       goodsName: '[180g]麻辣兔头',
       goodsNum: 2,
       status: '待付款',
       total: '39.60',
      }
    ],
    nowtab: '全部订单'
  },
  onLoad:function(data){
    this.setData({
      nowtab: data.toTab
    })
  },
  switchTabs: function (el) {
    this.setData({
      nowtab: el.currentTarget.dataset.nowtab
    })
  }
})
