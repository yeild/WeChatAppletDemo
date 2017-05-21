// pages/orderList/orderList.js
Page({
  data:{
    orderList:[
      {goodsName: '[200g]冷吃兔三件套',
       goodsNum: 1,
       status: '待付款',
       total: 98,
      },
      {goodsName: '[200g]冷吃兔',
       goodsNum: 1,
       status: '待收货',
       logistics: '顺水快递',
      },
      {goodsName: '[200g]冷吃牛肉',
       goodsNum: 2,
       status: '待付款',
       total: 48,
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