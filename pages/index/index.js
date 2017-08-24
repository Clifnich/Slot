//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    array7: [{ id: '1', color: 'white' }, { id: '2', color: 'white' }, { id: '3', color: 'white' },
      { id: '4', color: 'white' }, { id: '5', color: 'white' }, { id: '6', color: 'white' }, 
      { id: '7', color: 'white' }],
    array: [
      [{ color: 'white' }, { color: 'white' }, { color: 'white' }, 
        { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }],
      [{ color: 'white' }, { color: 'white' }, { color: 'white' },
      { color: 'white' }, { color: 'white' }, { color: 'white' }, { color: 'white' }]
    ],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdayInFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    marginLeft: 71,
    marginTop: 61,
    lastWeekDay: -1,
    lastHour: -1
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  tapColor: function(e) {
    console.log(e);
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY; 
    var marginLeft = this.data.marginLeft, marginTop = this.data.marginTop;
    x -= marginLeft;
    y -= marginTop;
    var weekday = (x / 41 + 0.5).toFixed(0);
    console.log("You just touched block \"" + this.data.weekdayInFull[weekday-1] + "\"");

    var hour = Number((y / 30 + 0.5).toFixed(0)) + 6;
    var oneMoreHour = Number(hour) + 1;
    console.log("You just touched block [" + hour + " - " + oneMoreHour + "].");

    var newArray = this.data.array;
    var element = newArray[hour - 7][weekday - 1];
    if (element.color === 'green') {
      element.color = 'white';
    } else {
      element.color = 'green';
    }
    this.setData({array: newArray});
  },
  dragToColor: function(e) {
    console.log(e);
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;
    var marginLeft = this.data.marginLeft, marginTop = this.data.marginTop;
    x -= marginLeft;
    y -= marginTop;
    var weekday = (x / 41 + 0.5).toFixed(0);

    var hour = Number((y / 30 + 0.5).toFixed(0)) + 6;
    if (weekday === this.data.lastWeekday && hour === this.data.lastHour)
      return;
    var oneMoreHour = Number(hour) + 1;
    if (this.data.array[hour - 7][weekday - 1].color === 'green')
      return;
    var newArray = this.data.array[hour-7];
    
    newArray[weekday - 1].color = 'green';
    var index = hour-7;
    if (index === 0) {
      this.setData({ 'array[0]': newArray });
    }
    //this.setData({ 'array[{{hour-7}}]': newArray });
  },
  old_array7DragToColor: function(e) {
    console.log(e);
    var touch = e.touches[0];
    var x = touch.pageX;
    x -= this.data.marginLeft;
    var weekday = (x / 41 + 0.5).toFixed(0);
    if (this.data.array7[weekday].color !== 'green') {
      var newArray = this.data.array7;
      newArray[weekday].color = 'green';
      this.setData({array7: newArray});
    }
  },
  array7Tap: function(e) {
    console.log(e);
    var newArray = this.data.array7;
    newArray[Number(e.target.id) - 1].color = 'green';
    this.setData({array7: newArray});
  },
  array7DragToColor: function(e) {
    console.log(e);
    var newArray = this.data.array7;
    newArray[Number(e.target.id) - 1].color = 'green';
    this.setData({ array7: newArray });
  }
})
