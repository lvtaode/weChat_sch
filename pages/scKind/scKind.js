

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    selectPerson: true,
    firstPerson: "",
    selectArea: false,
    hidden: false,
    list: [],
    loading: true,
    zhezhao1: true,
    zhezhao2: true,
    httpLock:false
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
          cate_id: options.cate_id,
         
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function(res){
          var goodsCate = [];
          for (var i = 0; i < res.data.goodsCate.length; i++) {
            goodsCate.push(res.data.goodsCate[i]);
            if (options.cate_id == res.data.goodsCate[i].cate_id) {
              that.data.firstPerson = res.data.goodsCate[i].cate_name;
              that.setData({
                firstPerson: that.data.firstPerson
              })
            }
          }
          that.setData({
            goodsCate: goodsCate
          })
        }
      })
    
    that.loaclStone = function () {
      var p = 1;
      if (that.data.httpLock == false) {
        wx.request({
          url: "https://www.chinascw.net/xcx/Goods/goodsList",
          data: {
            city_id: options.city_id,
            cate_id: options.cate_id,
            p: p
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.status == 400) return;
            console.log(res.data);
            try {
              if (res.data.goodsList == null) {

                wx.showToast({ title: "亲，没有数据了", duration: 5000 })
                that.setData({
                  hidden: true
                })
                return false;
              }
            } catch (err) {

            }

            var goodListData = res.data.goodsList;
            console.log(goodListData)
            console.log(goodListData.length)


            var goodList = [];
            for (var i = 0; i < goodListData.length; i++) {
              var dd = { title: " ", photo: "", goods_id: "" }
              dd.title = goodListData[i].title;
              dd.photo = goodListData[i].photo;
              dd.goods_id = goodListData[i].goods_id;
              goodList.push(dd);
            }




            Array.prototype.push.apply(that.data.list, goodList);
            console.log(goodListData);


            that.setData({
              list: that.data.list,

              hidden: true,
              loading: true
            })

            if (p == Math.ceil(res.data.count / 20)) {
              wx.showToast({ title: "亲，没有数据了", duration: 3000 }

              );
              that.setData({
                hidden: true,
                httpLock:true

              })



            }
            p++;
          }
        })
      }
    
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

    zhezhao1: false
    var p = 1;
    console.log(e)
    console.log(this.options)
    var cateId = e.target.dataset.cateid;
    console.log(cateId);
    var that = this;
    wx.request({
      url: "https://www.chinascw.net/xcx/Goods/goodsList",
      data: {
        city_id: this.options.city_id,
        cate_id: cateId,
         p:p
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {

        console.log(res.data.goodsList);
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
        p++;

        that.setData({
          list: goodList,
          zhezhao2: true
        })
        if (p == Math.ceil(res.data.count / 20)) {
          wx.showToast({ title: "亲，没有数据了", duration: 3000 }

          );
          that.setData({
            hidden: true,
            httpLock: true

          })

          return false;

        }
        p++;
      }
    })
  
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,


    })
    
  },
  //滚动到底部触发事件
  lower: function (e) {
    console.log(this.data.hidden)
    this.data.hidden = true


    console.log("触发");
if(this.data.httpLock==false){
  this.loaclStone();
}
   
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
  //下拉
  // onPullDownRefresh: function () {
  //   this.loaclStone();

  // },
  /**
   * 生命周期函数--监听页面初次渲染完成


  /**
   * 生命周期函数--监听页面显示
   */



})