// pages/search/search_list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: "",
    goods:"",
    choice:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    wx.request({
      url: 'https://www.chinascw.net/xcx/index/search',
      method: "GET",
      data: {
        keyword: options.keyword,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        console.log(res.data.shopList == null, res.data.goodList == null)
        if (res.data.shopList == null && res.data.goodList ==null) {
            // console.log(123456)
            // console.log(that);
             that.setData({
            choice: false
          });
        }
        that.setData({
          shop: res.data.shopList,
          goods: res.data.goodList
        });       
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

  }
})