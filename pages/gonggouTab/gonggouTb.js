var p = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ggxx:[],
    hidden:false,
    uid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var uid = wx.getStorageSync('uid');
    console.log(uid);
    if (uid) {
      this.setData({
        uid: uid
      })
    }
    var that=this;
    that.toutiao=function(){
      wx.request({
        url: "https://www.chinascw.net/xcx/post/index",
        method: 'GET',
        data: {
          p: p
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data)
          console.log(res.data.post[0].title)
          var ddData = res.data.post;
          var ggxx = [];
          var choose = [];
          if (ddData.length<20){
            wx.showToast({ title: "亲，没有数据了", duration: 5000 }
            
            );
            that.setData({
              hidden: true
            })
            //阻止触发事件
            wx.stopPullDownRefresh();
            return false;
          } 
          var gg=[];
          for (var i = 0; i < ddData.length; i++) {
            var dd = { title: "", details: "",f_choose:"",post_id:""};
            dd.title=ddData[i].title;
            dd.details=ddData[i].details;
            dd.f_choose = ddData[i].f_choose;
            dd.post_id=ddData[i].post_id;
            gg.push(dd);
          }
           p++;
           Array.prototype.push.apply(that.data.ggxx, gg);
          that.setData({
            ggxx: that.data.ggxx,
            hidden:true
          })
        }
      })
    }
   
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.toutiao()
  },
  //滚动到底部触发事件
  lower: function (e) {
    console.log(this.data.hidden)
    this.data.hidden = true
    console.log("触发");
    this.toutiao()
    this.setData({
      hidden: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var uid = wx.getStorageSync('uid');
    console.log(uid);
    this.setData({
        uid: uid
    })
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
  publish:function(){
    console.log(this.data.uid);
    if(this.data.uid==""){
      wx.showToast({
        title: '请先登录',
        icon: 'none',
        image: '../../images/remind.png',
        duration: 1500
      }) ;
      setTimeout(function(){
        wx.switchTab({
          url: '/pages/login/index',
        })
      },1000)
  }else{
      wx.navigateTo({
        url: '/pages/gonggou/publish?uid='+this.data.uid,
      })
    }
  }
})