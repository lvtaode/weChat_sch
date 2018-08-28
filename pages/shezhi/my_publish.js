// pages/shezhi/my_publish.js
const config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
      msgList:[],
      status:"checked",
      trigger:true,
      userId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        console.log(options);
        var uid=options.userId;
        this.setData({
          userId:uid
        })
        var that=this;
        wx.request({
          url: 'https://www.chinascw.net/xcx/user/post',
          method:"GET",
          data:{
            user_id:uid
          },
          success:function(res){
          
            var listData=res.data.data;
            if(listData==null){
              that.setData({
                  trigger:false
              });
            }else{
              var list = [];
              listData.map((item, index) => {
                var dd = { post_id: "", title: "", create_time: "", audit: "", f_choose: "" };
                dd.post_id = item.post_id;
                dd.title = item.title;
                dd.create_time = that.toDate(item.create_time);
                dd.audit = item.audit;
                dd.f_choose = item.f_choose;
                list.push(dd);
              });
              Array.prototype.push.apply(that.data.msgList, list);
              that.setData({
                msgList: that.data.msgList
              });
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
   toDate:function(number) {
    var n = number * 1000;
    var date = new Date(n);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return(Y + M + D)
  },
   jump: function (e) {
     console.log(e.currentTarget.id);
      wx.navigateTo({
        url: '../gonggou/gg_detail?id=' + e.currentTarget.id,
      })
   },  
   hint:function(){
     wx.showToast({
       title: '审核中...',
       icon:'none'
     })
   }
})