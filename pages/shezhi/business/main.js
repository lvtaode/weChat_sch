// pages/shezhi/business/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner:[
      {
      photo:"huanjin.png"
    },
      {
        photo: "huanjin.png"
      },
      {
        photo: "huanjin.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    this.setData({
        userId:options.userId
    });
    this.banner=function(){
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopadmin',
        data:{
          user_id:options.userId
          },
        success:function(res){
            var result=res.data;
            console.log(res);
            if(result.banner!=null){
              that.setData({
                banner:result.banner
              })
            }
              that.setData({
                shop:result.shop
              })
             }
         })
      }
      this.banner();
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
    this.banner();
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
  call: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试 
      success: function (res) {
        console.log("拨打电话成功！");
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})