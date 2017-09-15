// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: [
      {name: 'Sunday', value: '0'},
      {name: 'Monday', value: '1'},
      {name: 'Tuesday', value: '2'},
      {name: 'Wednesday', value: '3'},
      {name: 'Thursday', value: '4'},
      {name: 'Friday', value: '5'},
      {name: 'Saturday', value: '6'}
    ],
    weekdayArray: [0,0,0,0,0,0,0],
    startTime: 7,
    endTime: 23,
    numOfMembers: '# of team members'
  },

  /**
   * Handle # of team members input 
   */
  inputMembers: function(e) {
    //console.log(e.detail.value);
    this.setData({
      numOfMembers: Number(e.detail.value)
    })
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
      url: '../box/box?startTime=' + this.data.startTime 
        + '&endTime=' + this.data.endTime + '&weekdayLine=' + this.data.weekdayArray.join('')
        + '&numOfMembers=' + this.data.numOfMembers
    });
  },

  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);
    var newWeekdayArray = [0,0,0,0,0,0,0];
    for (var i = 0; i < e.detail.value.length; i++) {
      newWeekdayArray[e.detail.value[i]] = 1;
    }
    this.setData({
      weekdayArray: newWeekdayArray
    })
  },

  bindTimeChange1: function (e) {
    var startTime = Number(e.detail.value.split(':')[0]);
    console.log('time1发生change事件，携带value值为：', startTime);
    this.setData( {
      startTime: startTime
    })
  },
  bindTimeChange2: function (e) {
    var endTime = Number(e.detail.value.split(':')[0]);
    console.log('time2发生change事件，携带value值为：', endTime);
    this.setData({
      endTime: endTime 
    })
  },
})