//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  
    // 登录
  //   wx.login({
  //     success: res => {
  //       console.log(res)
  //       console.log(res.code)
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       if (res.code) {
  //         //发起网络请求
  //         wx.request({
  //           url: 'https://www.chinascw.net/xcx/login/wxlogin',
  //           data: {
  //             code: res.code
  //           },
  //           success: function (a) {
  //              console.log(a)
  //             // console.log(a.data.obj.openid)
  //             // that.globalData.openid = a.data.obj.openid
  //           }
  //         })
  //       } else {
  //         console.log('获取用户登录态失败！' + res.errMsg)
  //       }
  //      }
  //   })
  //   // 获取用户信息
  //   wx.getSetting({
  //     success: res => {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
  //         wx.getUserInfo({
  //           success: res => {
  //             console.log(res)
  //             // 可以将 res 发送给后台解码出 unionId
  //             this.globalData.userInfo = res.userInfo

  //             // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //             // 所以此处加入 callback 以防止这种情况
  //             if (this.userInfoReadyCallback) {
  //               this.userInfoReadyCallback(res)
  //             }
  //           }
  //         })
  //       }
  //     }
  //   })
   },
  onShow: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  globalData: {
    userInfo: null,
    defaultCity: ' 定位中',
   city_id2:""
  },
  toDate:function (number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return(Y + M + D)
  }
})