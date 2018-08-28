

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    selectPerson: true,
    firstPerson: '全部分类',
    selectArea: false,
    hidden:false,
    list:[],
    loading:true,
    zhezhao1:true,
    zhezhao2: true,
    jiazai:true,
  
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this;
   
    wx.request({
      url: "https://www.chinascw.net/xcx/Goods/goodsList",
      data: {
        city_id: options.city_id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        var goodsCate = [];
        for (var i = 0; i < res.data.goodsCate.length; i++) {
          goodsCate.push(res.data.goodsCate[i]);
        }
        that.setData({
          goodsCate: goodsCate
        })
      }
    })
    var p = 1;
    that.loaclStone=function(){
      wx.request({
        url: "https://www.chinascw.net/xcx/Goods/goodsList",
        data: {
          city_id: options.city_id,
          p: p
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.status == 400) return;
          console.log(res.data);
          var goodListData = res.data.goodsList;
          var goodList = [];
          for (var i = 0; i < goodListData.length; i++) {
            var dd = { title: " ", photo: "", goods_id: "" }
            dd.title = goodListData[i].title;
            dd.photo = goodListData[i].photo;
            dd.goods_id = goodListData[i].goods_id;
            goodList.push(dd);
          }

          Array.prototype.push.apply(that.data.list, goodList);
          console.log(goodList);
          that.setData({
            list: that.data.list,
            hidden: true,
            loading: true
          })
          if (p == Math.ceil(res.data.count / 20)) {
            that.setData({
              hidden: true,
            })
            return false;
          }
          p++;
        }
      })

    
        
      
    }
  
  
 
       
  
   
   
  },
  onReady: function () {
    this.loaclStone();
  },
 
  //点击选择类型
  clickPerson: function () {
    var selectPerson = this.data.selectPerson;
    if (selectPerson == true) {
      this.setData({
        selectArea: true,
        selectPerson: false,
      })
    } else {
      this.setData({
        selectArea: false,
        selectPerson: true,
      })
    }
  },
  //点击切换
  
  mySelect: function (e) {
    var that=this;
     zhezhao1:false
  console.log(that.data.httpLock1)
    console.log(e)
    console.log(this.options)
    var cateId = e.target.dataset.cateid;
    console.log(cateId);
     //种类
        this.setData({
        firstPerson: e.target.dataset.me,
        selectPerson: true,
        selectArea: false,
      })         

       var p = 1;     
         wx.request({
           url: "https://www.chinascw.net/xcx/Goods/goodsList",
           data: {
             city_id: this.options.city_id,
             cate_id: cateId,
             p: p
           },
           header: {
             'content-type': 'application/json' // 默认值
           },

           success: function (res) {
             console.log(res.data);
             var goodListData = res.data.goodsList;
             var goodList = [];
             if (goodListData == null) {
               that.zhezhao2 = false;
               that.setData({
                 zhezhao2: false
               })
               return false;
             }
             for (var i = 0; i < goodListData.length; i++) {
               var ddd = { title: " ", photo: "", goods_id: "" }
               ddd.title = goodListData[i].title;
               ddd.photo = goodListData[i].photo;
               ddd.goods_id = goodListData[i].goods_id;
               goodList.push(ddd);
             }
             that.setData({
               list: goodList,
               zhezhao2: true,
             })
             console.log(p)
             console.log(Math.ceil(res.data.count / 20))
             if (p == Math.ceil(res.data.count / 20)) {
               that.setData({
                 hidden: true,
                 jiazai: true,             
               })
               return false;
             }
             p++;
           }
         })  
  },
  //滚动到底部触发事件
  lower:function(e){
     this.loaclStone();
   
    this.setData({
      hidden: false
    })
  
   
  },

  // onReachBottom: function () {
  //   console.log("上拉");
  //  hidden:false
  //   this.loaclStone();
  // console.log("上拉完成"
  // )
    
  // },
  // onPullDownRefresh: function () {
  //   // Do something when pull down.
  //   console.log('刷新');
  //   this.loaclStone()
  // },
  // onReady: function () {

  //   this.loaclStone()

  // },
  // //下拉
  // onPullDownRefresh: function () {
  //   this.loaclStone();

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成


  /**
   * 生命周期函数--监听页面显示
   */


  
})