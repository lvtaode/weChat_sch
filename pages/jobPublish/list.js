// pages/jobPublish/list.js
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
      this.setData({
        uid:options.userId
      });
      this.loadData();
  },

  loadData(){
    var that=this;
    wx.request({
      url: 'https://www.chinascw.net/xcx/jobs/resumeList',
      data:{
        uid:that.data.uid
      },
      method:'GET',
      success:function(res){
          console.log(res.data.data);
          if(res.data.data=="undefined"){
                return;
          }else{
            that.setData({
              list:res.data.data,
              trigger:true
            })
          }
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
      url: '/pages/jobPublish/publish?uid='+this.data.uid
    })
  }
})