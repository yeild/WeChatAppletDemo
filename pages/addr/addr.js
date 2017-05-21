var city = require("../../utils/city.js");
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
  onLoad:function(options){
   var that = this;
   city.init(that);
  },
  onReady:function(){
    // 页面渲染完成
  },
  setName: function (el) {
    this.setData({
      'address.name': el.detail.value
    })
  },
  setTel: function (el) {
    this.setData({
      'address.phone': el.detail.value
    })
  },  
  setDetail: function (el) {
    this.setData({
      'address.address': el.detail.value
    })
  },
  setDefalut: function () {
    this.setData({
      'address.isDefault': !this.data.address.isDefault
    })
  },
  addAddr: function () {
    this.setData({
      'address.province': this.data.city.selectedProvince,
      'address.city': this.data.city.selectedCity,
      'address.country': this.data.city.selectedDistrct
    })
    var phone = this.data.address.phone;
    var phoneReg = /^1[34578]\d{9}$/;
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
    var that = this;

    wx.request({
      url: 'http://127.0.0.1:3000/addAddr',
      method:'POST',
      data: {addr: that.data.address}, 
      success: function(res) {
        if(res.data.result){
          wx.showToast({
            title: '添加成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    wx.navigateBack();
  }
})