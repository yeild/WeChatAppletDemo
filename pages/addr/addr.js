var city = require("../../utils/city.js")
var { apiUrl } = getApp()
Page({
  data:{
    address:{
      name:'',
      phone:'',
      province:'',
      city:'',
      country:'',
      address:'',
      isDefault: false
    }
  },
  onLoad () {
   city.init(this)
  },
  setName (el) {
    this.setData({
      'address.name': el.detail.value
    })
  },
  setTel (el) {
    this.setData({
      'address.phone': el.detail.value
    })
  },  
  setDetail (el) {
    this.setData({
      'address.address': el.detail.value
    })
  },
  setDefalut () {
    this.setData({
      'address.isDefault': !this.data.address.isDefault
    })
  },
  addAddr () {
    this.setData({
      'address.province': this.data.city.selectedProvince,
      'address.city': this.data.city.selectedCity,
      'address.country': this.data.city.selectedDistrct
    })
    var phone = this.data.address.phone
    var phoneReg = /^1[34578]\d{9}$/
    if(this.data.address.name==''){
      wx.showModal({
        content: '请输入收货人姓名',
        showCancel: false
      })
      return false
    }
    if(this.data.address.phone==''){
      wx.showModal({
        content: '请输入手机号码',
        showCancel: false
      })
      return false
    }
    if(this.data.address.province=='-请选择-'||this.data.address.city=='-请选择-'||this.data.address.country=='-请选择-'){
      wx.showModal({
        content: '请选择省市区',
        showCancel: false
      })
      return false
    }
    if(this.data.address.address==''){
      wx.showModal({
        content: '请输入详细地址',
        showCancel: false
      })
      return false
    }
    if(!phoneReg.test(phone)){
      wx.showModal({
        content: '手机号码格式错误',
        showCancel: false
      })
      return false
    }

    wx.request({
      url: `${apiUrl}/address`,
      method:'POST',
      data: {address: this.data.address}, 
      success: (res) => {
        if(res.data.result){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    wx.navigateBack()
  }
})