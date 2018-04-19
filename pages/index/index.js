var { apiUrl } = getApp()
Page({
  data: {
    goodsList: [],
    apiUrl
  },
  onLoad () {
    wx.request({
      url: `${apiUrl}/goods`,
      success: (res) => {
        this.setData({
          goodsList: res.data.goods
        })
      }
    }) 
  },
  toDetail (el) {
    wx.navigateTo({
      url: `../detail/detail?Id=${el.target.dataset.id}`
    })
  },
  getCoupon () {
    wx.request({
      url: `${apiUrl}/getCoupon`,
      success: function (res) {
        var title = '恭喜，领取成功', content = ''
        switch (res.data.Type) {
          case "cash":
            content = '你获得了： 代金券 ￥' + res.data.Num + ' ，点击“订单-优惠券”查看'
            break
          case "discount":
            content = '你获得了： 折扣券 ' + res.data.Num + '折 ，点击“订单-优惠券”查看'
            break
          default:
            title = null
            content = res.data.Message
        }
        wx.showModal({
          title: title || '',
          content: content,
          showCancel: false
        })  
      }
    })
  }

})
