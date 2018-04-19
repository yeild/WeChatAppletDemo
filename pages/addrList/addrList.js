var { apiUrl } = getApp()
Page({
  data:{
    address:[]
  },
  onShow () {
    this.getAddress()
  },
  getAddress () {
    wx.request({
      url: `${apiUrl}/address`,
      success: (res) => {
        this.setData({
          address: res.data.addressList
        })
      }
    })
  },
  toAddr () {
    wx.navigateTo({
      url: '../addr/addr'
    })
  },
  setDefault (el) {
    wx.request({
      url: `${apiUrl}/defaultAddress/${el.target.dataset.id}`,
      method: 'PUT',
      success: () => {
        this.getAddress()
      }
    })
  },
  deleteAddr (el) {
    var that = this;
    wx.request({
      url: `${apiUrl}/address/${el.target.dataset.id}`,
      method: 'DELETE',
      success: (res) => {
        if(res.data.result){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          this.getAddress()
        }
      }
    })
  }
})