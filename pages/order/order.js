//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad () {
    app.getUserInfo((userInfo) => {
      this.setData({
        userInfo:userInfo
      })
    })
  },
  toAddr () {
    wx.navigateTo({
      url: '../addrList/addrList'
    })
  },
  toCoupon () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  toOrderList (el) {
    wx.navigateTo({
      url: '../orderList/orderList?toTab='+el.target.dataset.totab
    })
  }
})