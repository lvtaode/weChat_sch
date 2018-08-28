var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    count:0,
    hid:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      shopId:options.shopId
    })
      var that=this;
      var shop_id=options.shopId;
      this.loadPhoto=function(){
        wx.request({
          url: 'https://www.chinascw.net/xcx/user/shopHuanList',
          method:'GET',
          data:{
            shop_id:shop_id
          },
          success:function(res){
            // console.log(res);
            var banner=res.data.data;
            if(res.data.data==null){
              that.setData({
                hid:false
              })
              wx.showToast({
                title: '未添加环境图',
                image:'/images/remind.png'
              })
              return;
            }
            that.setData({
              count:banner.length
            })
            for(var i=0;i<banner.length;i++){
              banner[i].create_time = app.toDate(banner[i].create_time);
            }
            that.setData({
              banner:banner
            })
          }
        })
      }
      this.loadPhoto();
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
    this.setData({
      hid:true
    })
    this.loadPhoto();
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
  remove:function(e){
      var tar = e.target.id;
      var shop = this.data.shopId;
      var that=this;
      // console.log(tar,shop);
      wx.request({
        url: 'https://www.chinascw.net/xcx/user/shopHuanDel?shop_id='+shop+"&pic_id="+tar,
        method:'POST',
        success:function(res){
          wx.showToast({
            title: '删除成功',
          });
          that.setData({
            banner: [],
            count:0
          })
          that.loadPhoto();
        }
      })
  }
})