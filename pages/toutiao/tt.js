Page({

  /**
   * 页面的初始数据
   */
  data: {
      trigger:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //时间戳转换时间  
    function toDate(number) {
      var n = number * 1000;
      var date = new Date(n);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return (Y + M + D)
    }  
    var that=this;
    wx.request({
      url: "https://www.chinascw.net/xcx/toutiao/detail",
      method: "GET",
      data: {
        id: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.data)
      var ttDetails=res.data.details;
      var shop=res.data.shop;
      var trigger=false;
      if(shop==null){
        trigger=true;
      }
      ttDetails.create_time = toDate(ttDetails.create_time);
      that.setData({
        ttDetails:ttDetails,
        shop:shop,
        trigger:trigger
      })
      }
    })
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
    wx.switchTab({
      url: '/pages/shop/shop',
    })
  }
})