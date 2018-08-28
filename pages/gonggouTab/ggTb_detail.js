Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    //时间转换
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
      url: "https://www.chinascw.net/xcx/post/detail",
      method:"GET",
      data:{
        post_id:options.id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        console.log(res.data)
        var name=res.data.name;
       var detail=res.data.detail;
       var user=res.data.user;
       var time=res.data.detail.create_time;
       var detailTime = toDate(time);//转换时间戳
       console.log(res.data.pic)
      if(res.data.pic==null){
        var pic = res.data.pic;
        that.setData({
          pic1:pic
        })
      }else{
        var pic2=[]
        for (var i = 0; i < res.data.pic.length; i++) {
          pic2.push(res.data.pic[i]);
        }
        that.setData({
          pic2:pic2
        })
      }
       
      
      
       var shop=res.data.shop;
        that.setData({
          name:name,
          detail:detail,
          user:user,
          shop:shop,
          hidden:true,
          detailTime: detailTime
        })
      }      
    })
  },
  picBig:function(e){
    wx.previewImage({
      current: e.currentTarget.dataset.img,// 当前显示图片的http链接
      urls: [e.currentTarget.dataset.img] // 需要预览的图片http链接列表
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