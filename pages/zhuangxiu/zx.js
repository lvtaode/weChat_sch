

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    selectPerson: true,
    firstPerson: '请选择地区',
    selectArea: false,
    hidden: false,
    zhezhao2: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    wx.request({
      url: "https://www.chinascw.net/xcx/zhuangxiu/lists",
      data: {
        city_id: options.id,
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var areasData = res.data.area;
        var areas = []
        areasData.map((item, index) => {
          areas.push(item);
        })
        that.setData({
          areas: areas
        })
      }

    })

    that.qB = function () {
      wx.request({
        url: "https://www.chinascw.net/xcx/zhuangxiu/lists",
        data: {
          city_id: options.id,
        },
        method: "GET",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          var listData = res.data.list;
          var list = []
          listData.map((item, index) => {
            list.push(item);
          })
          that.setData({
            list: list,
            hidden: true
          })
        }
      })
    }



  },
  onReady: function () {
    this.qB()
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
    var that = this;
    zhezhao1: false
    console.log(that.data.httpLock)
    console.log(e)
    console.log(this.options)
    var cateId = e.target.dataset.areaid;
    console.log(cateId);
    wx.request({
      url: "https://www.chinascw.net/xcx/zhuangxiu/lists",
      data: {
        city_id: this.options.id,
        area_id: cateId
      },

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var listData = res.data.list;
        console.log(listData)
        var list = []
        if (listData == null) {
          that.setData({
            zhezhao2: false
          })
          return false;
        }
        listData.map((item, index) => {
          list.push(item);
        })
        that.setData({
          list: list,
          zhezhao2: true,
        })
      }
    })
    this.setData({
      firstPerson: e.target.dataset.me,
      selectPerson: true,
      selectArea: false,

    })




  },

})