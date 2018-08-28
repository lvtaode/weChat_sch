// index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
hidden:false,
    scBgc:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var p=1;
    var that=this;
    that.bgc=function(){
      wx.request({
        url: "https://www.chinascw.net/xcx/case/index",
        method: "GET",
        data: {
          p: p
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

          console.log(res);
          var scData = res.data.data;
          var scbgc = [];
          scData.map((item, index) => {
            var dd = { name: "", photo: "" };
            dd.name = item.name;
            dd.photo = item.photo;
            scbgc.push(dd);

          })
          p++;
          if(scData.length<10){
            wx.showToast({ title: "亲，没有数据了", duration: 5000 }

            );
            that.setData({
              hidden: true
            })
            //阻止触发事件
            wx.stopPullDownRefresh();
            return false;
          }
          Array.prototype.push.apply(that.data.scBgc, scbgc);

          that.setData({
            scBgc: that.data.scBgc,
            hidden:true
          })

        }
      })
    }
  
  },
  
onReady:function(){
this.bgc()
},
 //滚动到底部触发事件
  lower: function (e) {

  this.data.hidden = true

  this.bgc();
  this.setData({
    hidden: false
  })
},
})