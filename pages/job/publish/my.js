// pages/job/publish/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:'',
    trigger:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        this.setData({
          cityId:options.cityId,
          areaId:options.areaId,
          shop_name:options.shop_name,
          shopId:options.shop_id
        });
        this.loadData();
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
    this.loadData();
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
    console.log("卸载");
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
  jump:function(){
      wx.navigateTo({
        url: "/pages/job/publish/zhaopin?cityId="+this.data.cityId+"&areaId="+this.data.areaId+"&shop_name="+this.data.shop_name+"&shop_id="+this.data.shopId
      })
  },
  loadData() {
    var that = this;
    wx.request({
      url: 'https://www.chinascw.net/xcx/jobs/shopzplist',
      data: {
        shop_id:that.data.shopId
      },
      success: function (res) {
        if (res.data.data== null) {
          that.setData({
            list: "",
            trigger: false
          })
        } else {
          that.setData({
            list: res.data.data,
            trigger: true
          })
        }
      
      }
    })
  }
})