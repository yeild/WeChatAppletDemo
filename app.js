//app.js
App({
  getUserInfo: function (cb) {
    if(this.userInfo){
      typeof cb == "function" && cb(this.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              this.userInfo = res.userInfo
              typeof cb == "function" && cb(this.userInfo)
            }
          })
        }
      })
    }
  },
  userInfo: null,
  apiUrl: 'http://localhost:3000'
})