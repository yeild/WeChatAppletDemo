var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    goods:{},
    goodsNum: 1,
    typeIndex:0
  },
  onLoad: function (data) {
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:3000/detail?Id='+data.Id,
      success: function(res) {
        that.setData({
          goods: res.data
        })
        WxParse.wxParse('intro' , 'html', that.data.goods.Intro, that,10)
      }
    })
  },
  checkType: function (el) {
    this.setData({
      typeIndex: el.target.dataset.id
    })
  },
  sub: function () {
    if(this.data.goodsNum == 1){
      return false
    }
    this.setData({
      goodsNum : this.data.goodsNum - 1
    })
  },
  add: function () {
    this.setData({
      goodsNum : this.data.goodsNum + 1
    })
  },
  toPay: function () {
    wx.navigateTo({
      url: '../pay/pay?goodsName=' + this.data.goods.Name + '&goodsType=' + this.data.goods.TypeList[this.data.typeIndex].Type + '&goodsPrice=' + this.data.goods.TypeList[this.data.typeIndex].PromotionPrice + '&goodsImg=' + this.data.goods.Pictures[0] + '&goodsNum=' + this.data.goodsNum
    })
  }
})