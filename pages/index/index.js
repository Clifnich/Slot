// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: [
      {name: 'Sunday', value: 'Sunday'},
      {name: 'Monday', value: 'Monday'},
      {name: 'Tuesday', value: 'Tuesday'},
      {name: 'Wednesday', value: 'Wednesday'},
      {name: 'Thursday', value: 'Thursday'},
      {name: 'Friday', value: 'Friday'},
      {name: 'Saturday', value: 'Saturday'}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  buttonAction: function() {
    wx.navigateTo({
      url: '../box/box?startTime=7&endTime=10&weekdayLine=111111'
    });
  }
})