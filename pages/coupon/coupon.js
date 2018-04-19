var { apiUrl } = getApp()
Page({
  data:{
    hasCoupon: false,
    coupons:[]
  },
  onLoad () {
    wx.request({
      url: `${apiUrl}/couponList`,
      success: (res) => {
        if (res.data.CouponList.length !=0 ){
          this.setData({
            coupons: res.data.CouponList,
            hasCoupon: true
          })
        }
      }
    })
  },
  toIndex () {
    wx.switchTab({
      url: '../index/index'
    })
  }
})