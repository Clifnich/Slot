

Page( {
  data: {
    array1: [
      {id: '1', changeColor: false},
      {id: '2', changeColor: false}
    ],
    array2: [
      {id: '3', changeColor: false},
      {id: '4', changeColor: false}
    ],
    startWhite: true
  },

  handletouch: function(e, res) {
    console.log(e);
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;
    // if x < half of screen width
    // && y < half of screen height
    // we are touching block #1, change it to green background
    var windowWidth, windowHeight;
    wx.getSystemInfo({
      success: function(res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      },
    });
    var newArray1 = this.data.array1,
      newArray2 = this.data.array2;
    var halfWidth = windowWidth / 2, halfHeight = windowHeight / 2;
    var changeColor = this.data.startWhite;
    if (x < halfWidth && y < halfHeight) {
      newArray1[0].changeColor = changeColor;
    } else if (x > halfWidth && y < halfHeight) {
      newArray1[1].changeColor = changeColor;
    } else if (x < halfWidth && y > halfHeight) {
      newArray2[0].changeColor = changeColor;
    } else if (x > halfWidth && y > halfHeight) {
      newArray2[1].changeColor = changeColor;
    }

    this.setData({
      array1: newArray1,
      array2: newArray2
    });
  },

  handletouchstart: function(e) {
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;

    var windowWidth, windowHeight;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      },
    });

    var halfWidth = windowWidth / 2, halfHeight = windowHeight / 2;
    // change the startWhite attribute
    if (x < halfWidth && y < halfHeight) {
      this.setData({ startWhite: !this.data.array1[0].changeColor});
    } else if (x > halfWidth && y < halfHeight) {
      this.setData({ startWhite: !this.data.array1[1].changeColor });
    } else if (x < halfWidth && y > halfHeight) {
      this.setData({ startWhite: !this.data.array2[0].changeColor });
    } else if (x > halfWidth && y > halfHeight) {
      this.setData({ startWhite: !this.data.array2[1].changeColor });
    }
  }
})