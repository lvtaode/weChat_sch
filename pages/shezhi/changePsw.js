// pages/shezhi/changePsw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    registBtnTxt: "确认修改",
    registBtnBgBgColor: "#3283b0",
    getSmsCodeBtnColor: "#3283b0",
    // getSmsCodeBtnTime:60,
    btnLoading: false,
    registDisabled: false,
    smsCodeDisabled: false,
    phoneNum: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userid=options.userId;
  var that=this;
  that.changePsa=function(password,newpsd){
    wx.request({
      url: "https://www.chinascw.net/xcx/User/person",
      data:{
        password: password,
        user_id: userid,
        new_password:newpsd
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formSubmit: function (e) {

    console.log(e)
    var oldPsd=e.detail.value.oldpsd;
    var newPsd = e.detail.value.newpsd;
    var newPsd2 = e.detail.value.newpsd2;
    if (oldPsd==""){
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '原始密码不能为空！'
      });
      return false;
    }
    if (newPsd != newPsd2) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '两次输入不一致，请重新输入！'
      });
      return false;
    }else{
      this.changePsa(oldPsd, newPsd)
    }
      if (newPsd == "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '密码不能为空！'
      });
      return false;
    }else{
      this.changePsa(oldPsd, newPsd)
    }
      if (newPsd2 == "") {
        wx.showModal({
          title: '提示',
          showCancel: false,
          content: '密码不能为空！'
        });
        return false;
      } else {
        this.changePsa(oldPsd, newPsd)
      }
      setTimeout(function () {
        wx.showToast({
          title: '密码修改成功',
          icon: 'success',
          duration: 1500
        });
      }, 2000)
      wx.navigateBack({
        url: "personal.wxml"
      })
  }
})