var { apiUrl } = getApp()
Page({
  data:{
    apiUrl,
    showInfo: false,
    hasAddr: false,
    goods:{
      Name: '',
      Type: '',
      Img: '',
      Price: ''
    },
    freight: 8,
    freightText: '8.00',
    goodsPrice: 0,
    goodsNum: 1,
    subtotal: '',
    total:0,
    couponIndex:null,
    coupons: null,
    couponValue : 0,
    couponText: '0.00',
    addrList: null,
    addrIndex: 0
  },
  onLoad (data) {
    this.setData({
      goods:{
        Name: data.goodsName,
        Type: data.goodsType,
        Img: data.goodsImg,
        Price: Number(data.goodsPrice).toFixed(2)
      },
      goodsNum: Number(data.goodsNum),
      goodsPrice: Number(data.goodsPrice),
      subtotal: (data.goodsNum * data.goodsPrice).toFixed(2),
      total: (data.goodsNum * data.goodsPrice + this.data.freight).toFixed(2)
    });
    wx.request({
      url: `${apiUrl}/couponList`,
      success: (res) => {
        if (res.data.CouponList.length!=0){
          var coupon = res.data.CouponList;
          coupon.forEach(function(item){
            if (item.Type == "cash") {
              item.text = "￥" + item.Num + "现金券"
            } else { //item.Type == "discount"
              item.text = item.Num + "折券"
            }
          })
          this.setData({
            coupons: [{
                Type:"cash",
                Num: 0,
                text:'不使用'
            }].concat(res.data.CouponList)
          });
        }
      }
    })
  },
  onShow () {
    wx.request({
      url: `${apiUrl}/address`,
      success: (res) => {
        if (res.data.addressList.length === 0) {
          wx.showModal({
            title: '填写收货地址',
            content: '您还没有收货地址，是否现在创建？',
            confirmText: '创建',
            success: (res) => {
              if (!res.confirm) {
                this.setData({
                  showInfo: true
                })
              } else {
                this.toAddr()
              }
            }
          });
        } else {
          this.setData({
            addrList: res.data.addressList,
            hasAddr: true
          })
        }
      }
    })
  },
  sub () {
    if(this.data.goodsNum == 1){
      return false
    }
    this.setData({
      goodsNum : this.data.goodsNum - 1
    })
    this.getTotal();
  },
  add () {
    this.setData({
      goodsNum : this.data.goodsNum + 1
    })
    this.getTotal();
  },
  getTotal () {
    this.setData({
      subtotal: (this.data.goodsPrice * this.data.goodsNum).toFixed(2)
    })
    var total = this.data.goodsPrice * this.data.goodsNum + this.data.freight
    if (!this.data.couponIndex || this.data.couponIndex == 0){
      this.setData({
        total: total.toFixed(2)
      })
    } else {
      var checkedCoupon = this.data.coupons[this.data.couponIndex];
      if (checkedCoupon.Type =='cash'){
        this.setData({
          total: (total - checkedCoupon.Num).toFixed(2)
        })
      } else { //checkedCoupon.Type=='discount'
        total = this.data.goodsPrice * this.data.goodsNum
        this.setData({
          total: (total * checkedCoupon.Num / 10 + this.data.freight).toFixed(2),
          couponText: (total * (1 - checkedCoupon.Num / 10)).toFixed(2)
        })
      }
    }
  },
  useCounpon (el) {
    this.setData({
      couponIndex: el.detail.value
    });
    var checkedCoupon = this.data.coupons[this.data.couponIndex];
    var total = this.data.goodsPrice * this.data.goodsNum + this.data.freight
    if(checkedCoupon.Type == 'cash'){
      this.setData({
        couponText: checkedCoupon.Num.toFixed(2),
        total: (total - checkedCoupon.Num).toFixed(2),
      })
    } else {
      total = this.data.goodsPrice * this.data.goodsNum;
      this.setData({
        couponText: (total * (1 - checkedCoupon.Num / 10)).toFixed(2),
        total: (total * checkedCoupon.Num / 10 + this.data.freight).toFixed(2),
      })
    }
  },
  selectAddr (el) {
    this.setData({
      addrIndex: el.detail.value
    });
  },
  toAddr () {
    this.setData({
      showInfo: false
    })
    wx.navigateTo({
      url: '../addr/addr'
    })
  }
})