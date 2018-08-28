
 const config = require('../../utils/config.js');
 const appInstance = getApp();
 Page({
 
   /**
    * 页面的初始数据
    */
   data: {
     hotcityList1: [{ cityCode: 4, city: '北京市' }, { cityCode: 5, city: '陕西' }, { cityCode: 6, city: '天津' },],
   hotcityList2:[
      { cityCode: 7, city: '河北' }, { cityCode: 8, city: '山西' }, { cityCode: 9, city: '内蒙古' }
    ],
   },
 
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     var that=this;
     wx.request({
      url: "https://www.chinascw.net/xcx/index",
     data: {
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
         var cityBox = [];
         var cityBoxB= []; var cityBoxC = [];
         var cityBoxF = [];
         var cityBoxG = [];
         var cityBoxH = [];
         var cityBoxJ = [];
         var cityBoxL = [];
         var cityBoxN = [];
         var cityBoxQ = [];
         var cityBoxS = [];
         var cityBoxT = [];
         var cityBoxX = [];
         var cityBoxY = [];
         var cityBoxZ = [];

        var cityData = res.data.citys.A;
        var cityDataB = res.data.citys.B;
         var cityDataC = res.data.citys.C;
         var cityDataF = res.data.citys.F;
        var cityDataG = res.data.citys.G;
         var cityDataH = res.data.citys.H;
         var cityDataJ = res.data.citys.J;
        var cityDataL = res.data.citys.L;
         var cityDataN = res.data.citys.N;
         var cityDataQ = res.data.citys.Q;
         var cityDataS = res.data.citys.S;
         var cityDataT = res.data.citys.T;
         var cityDataX = res.data.citys.X;
         var cityDataY = res.data.citys.Y;
         var cityDataZ = res.data.citys.Z;
         console.log(res.data.citys);
         for (var i = 0; i < cityData.length; i++) {
         cityBox.push(cityData[i]);
          }
         for (var i = 0; i < cityDataB.length; i++) {
          cityBoxB.push(cityDataB[i]);
         }
         for (var i = 0; i < cityDataC.length; i++) {
           cityBoxC.push(cityDataC[i]);
         }
         for (var i = 0; i < cityDataF.length; i++) {
           cityBoxF.push(cityDataF[i]);
         }
         for (var i = 0; i < cityDataG.length; i++) {
           cityBoxG.push(cityDataG[i]);
         }
         for (var i = 0; i < cityDataH.length; i++) {
           cityBoxH.push(cityDataH[i]);
         }
        for (var i = 0; i < cityDataJ.length; i++) {
           cityBoxJ.push(cityDataJ[i]);
         }
         for (var i = 0; i < cityDataL.length; i++) {
           cityBoxL.push(cityDataL[i]);
         }
         for (var i = 0; i < cityDataN.length; i++) {
           cityBoxN.push(cityDataN[i]);
         }
        for (var i = 0; i < cityDataQ.length; i++) {
           cityBoxQ.push(cityDataQ[i]);
         }

         for (var i = 0; i < cityDataS.length; i++) {

          cityBoxS.push(cityDataS[i]);
        }
         for (var i = 0; i < cityDataT.length; i++) {
           cityBoxT.push(cityDataT[i]);
         }
         for (var i = 0; i < cityDataX.length; i++) {
          cityBoxX.push(cityDataX[i]);
         }
         for (var i = 0; i < cityDataY.length; i++) {
          cityBoxY.push(cityDataY[i]);
        }
        for (var i = 0; i < cityDataZ.length; i++) {
           cityBoxZ.push(cityDataZ[i]);
         }

          // console.log(tempArr);
        that.setData({
          cityBox: cityBox,
          cityBoxB: cityBoxB, 
          cityBoxC: cityBoxC,
           cityBoxF: cityBoxF,
          cityBoxG: cityBoxG,
          cityBoxH: cityBoxH,
          cityBoxJ: cityBoxJ,
          cityBoxL: cityBoxL,
          cityBoxN: cityBoxN,
           cityBoxQ: cityBoxQ,
         cityBoxS: cityBoxS,
          cityBoxT: cityBoxT,
           cityBoxX: cityBoxX,
          cityBoxY: cityBoxY,
         cityBoxZ: cityBoxZ,

        });
    }
     })
   },
   bindCity:function(e){
     console.log(e)
     this.setData({
      city: e.currentTarget.dataset.city,
      Code: e.currentTarget.dataset.id,
     })
     wx.setStorage({
       key: 'cityId',
       data: e.currentTarget.dataset.id
     })
     appInstance.globalData.defaultCity = this.data.city
     appInstance.globalData.Code = this.data.Code;
     console.log(appInstance.globalData.defaultCity)
     console.log(appInstance.globalData.Code)
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