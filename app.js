//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.login()
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  login: function() {
    const self = this

    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://hfextreme.cn/api/connect',
            data: {
              code: res.code
            },
            success: function (res) {
              const data = res.data.data
              wx.setStorage({
                key: "token",
                data: data.token
              })

              // 后台保存 userInfo
              if (!data.has_info) {
                self.getUserInfo((userInfo) => {
                  wx.request({
                    url: 'https://hfextreme.cn/api/user_info',
                    method: 'POST',
                    header: {
                      'Authorization': 'Bearer ' + data.token
                    },
                    data: userInfo
                  })
                })
              }
              
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

  globalData: {
    userInfo: null
  }
})
