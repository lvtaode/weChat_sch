
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
   list1:[],
   httpLock:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var p = 1;
    var that=this;
    that.zxList=function(){
      if (that.data.httpLock==false){
        wx.request({
          url: "https://www.chinascw.net/xcx/news/index",
          method: "GET",
          data: {
            p: p
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res.data)
            var listData = res.data.list;
            var lists = [];

            listData.map((item, index) => {
              var dd = { article_id: "", title: "", details: "", day: "", month: "" };
              dd.article_id = item.article_id;
              dd.title = item.title;
              dd.details = item.details;
              dd.day = item.day;
              dd.month = item.month;
              lists.push(dd); 
            })
            Array.prototype.push.apply(that.data.list1, lists);
            console.log(that.data.list1);
            that.setData({
              lists1: that.data.list1,
              hidden: true
            })

            console.log(p)
            if (p >= Math.ceil(res.data.count / 10)) {
              wx.showToast({ title: "亲，没有数据了", duration: 3000 }

              );
              that.setData({
                hidden: true,
                httpLock:true
              })
              return false;
            }
            p++;
          }
        })
      }
    
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.zxList()
  },
 
   lower1: function () {
     this.data.hidden=true;
     this.zxList()
     this.setData({
       hidden: false
     })
     if(this.data.httpLock==true){
       this.setData({
         hidden:true
       })
     }
  return false;
  },
})