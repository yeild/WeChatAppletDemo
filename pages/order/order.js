
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  toAddr: function () {
    wx.navigateTo({
      url: '../addrList/addrList'
    })
  },
  toCoupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  toOrderList: function (el) {
    wx.navigateTo({
      url: '../orderList/orderList?toTab='+el.target.dataset.totab
    })
  }
})