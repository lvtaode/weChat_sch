var util = require("../../utils/util.js");

Page({
  data: {
    registBtnTxt: "提交",
    registBtnBgBgColor: "#3283b0",
    getSmsCodeBtnColor: "#3283b0",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    phoneNum: '',

  },
  onLoad: function (options) {
    var that=this;
    var userid=options.userId;
    // 页面初始化 options为页面跳转所带来的参数
    that.changeIP = function (mobile) {
      wx.request({
        url: "https://www.chinascw.net/xcx/User/person",
        data: {
          mobile: mobile,
          user_id: userid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
        }
      })
    }

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
  formSubmit: function (e) {
    var param = e.detail.value;
    var iphone = param.iphone;
    var iphone1 = param.iphone2;
    var ip = util.regexConfig().phone;
    if (iphone1!=iphone){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '两次输入不一致，请重新输入！'
      });
      return false;
    }
  
    if (ip.test(iphone)==false && ip.test(iphone1)==false ) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入正确的手机号码'
      });
      return false;
    } else {
      this.changeIP(iphone)
    } 
    this.changeIP(iphone)
   setTimeout(function () {
     wx.showToast({
       title: '修改成功',
       icon: 'success',
       duration: 1500
     });},2000)
    wx.navigateBack({
      url: "personal.wxml"
    })
  },
 

})