var WxParse = require('../../wxParse/wxParse.js')
var { apiUrl } = getApp()
Page({
  data: {
    goods:{},
    goodsNum: 1,
    typeIndex:0,
    apiUrl
  },
  onLoad (data) {
    wx.request({
      url: `${apiUrl}/goods/${data.Id}`,
      success: (res) => {
        this.setData({
          goods: res.data
        })
        WxParse.wxParse('intro', 'html', this.data.goods.Intro.replace(/="/g, '="' + apiUrl), this, 10)
      }
    })
  },
  checkType (el) {
    this.setData({
      typeIndex: el.target.dataset.id
    })
  },
  sub () {
    if(this.data.goodsNum == 1){
      return false
    }
    this.setData({
      goodsNum: this.data.goodsNum - 1
    })
  },
  add () {
    this.setData({
      goodsNum: this.data.goodsNum + 1
    })
  },
  toPay () {
    wx.navigateTo({
      url: '../pay/pay?goodsName=' + this.data.goods.Name + '&goodsType=' + this.data.goods.TypeList[this.data.typeIndex].Type + '&goodsPrice=' + this.data.goods.TypeList[this.data.typeIndex].PromotionPrice + '&goodsImg=' + this.data.goods.Pictures[0] + '&goodsNum=' + this.data.goodsNum
    })
  }
})