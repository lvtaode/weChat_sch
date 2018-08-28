Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var n=options.article_id;
    //时间戳转换时间  
    this.loadData(n);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  toDate:function(number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return(Y + M + D)
  },  
loadData : function (j) {
  var that=this;
    this.setData({
      id: j
    })
    wx.request({
      url: "https://www.chinascw.net/xcx/news/detail",
      method: "GET",
      data: {
        article_id: j
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var details = res.data.details;
        res.data.details.create_time = that.toDate(res.data.details.create_time);
        that.setData({
          details: details,
          count: res.data.count
        })
      }
    })
  },
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
  next: function () {
    var  j = parseInt(this.data.id);
    j-=1;
    console.log(j);
   this.loadData(j);
  },
 prev: function () {
   var i=parseInt(this.data.id);
   i += 1;
   console.log(i);
   this.loadData(i);
  }    
})