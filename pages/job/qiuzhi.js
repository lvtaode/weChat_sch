// pages/job/qiuzhi.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city_list: [],
    jobs: [],
    list:"",
    id_list:[],
    jobId:[],
    areaId:'',
    cityId:'',
    job_index:'',
    trigger:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中....',
    })
      this.loadCity();
  },
  loadCity:function(){
    var that=this;
    wx.getStorage({
      key: 'cityId',
      success: function (res) {
        // console.log(res.data);
        var cityId = res.data;
        wx.request({
          url: 'https://www.chinascw.net/xcx/prof/areas',
          data: { cityId: cityId },
          success: function (res) {
            // console.log(res.data.areas);
            var tar = ["全部地区"];
            var tar2 = [0];
            for (var i = 0; i < res.data.areas.length; i++) {
              tar.push(res.data.areas[i].area_name);
              tar2.push(res.data.areas[i].area_id);
            }
            that.setData({
              city_list: tar,
              id_list: tar2,
              cityId:cityId
            })
            that.loadData();
          }
        })
      },
    });
    wx.request({
      url: 'https://www.chinascw.net/xcx/prof/jobs',
      type:"GET",
      success:function(res){
        console.log(res.data.prof);
        var jobIdList=["0"];
        var jobKinds=["全部岗位"]
        for (var i = 0; i < res.data.prof.length; i++) {
          jobIdList.push(res.data.prof[i].jcate_id);
          jobKinds.push(res.data.prof[i].station);
        }
        that.setData({
          jobs:jobKinds,
          jobId:jobIdList
        })
      }
    })
  },
  loadData(){
    var that=this;
    // console.log(that.data.cityId,that.data.areaId);
    wx.request({
      url: 'https://www.chinascw.net/xcx/jobs/worker',
      data: {
        city_id: that.data.cityId,
        area_id: that.data.areaId,
        prof:that.data.job_index
      },
      success: function (res) {
        if(res.data.worker==undefined){
            that.setData({
              list: "",
              trigger:false
            })
        }else{
          that.setData({
            list: res.data.worker,
            trigger:true
          })
        }
        wx.hideLoading();
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
  bindPlaceChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail);
    // console.log(this.data.id_list);
    var area_id=this.data.id_list[e.detail.value];
    if(area_id==0){
      area_id=""
    }
    this.setData({
      city_index: e.detail.value,
      areaId:area_id
    })
    this.loadData();
  },
  bindJobChange: function (e) {
    var target = this.data. jobId[e.detail.value];

    if(target==0){
      target=""
    }
    this.setData({
      job_index: target,
      index:e.detail.value
    });
    this.loadData();
  },
  call: function (e) {
    console.log(e)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel, //此号码并非真实电话号码，仅用于测试 
      success: function (res) {
        console.log("拨打电话成功！");
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
    }
})