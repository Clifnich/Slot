

Page( {
  data: {
    array1: [
      {id: '1', changeColor: false},
      {id: '2', changeColor: false},
      {id: '3', changeColor: false},
      {id: '4', changeColor: false}
    ],
    array2: [
      {id: '5', changeColor: false},
      {id: '6', changeColor: false}
    ],
    startWhite: true,
    windowWidth: 0,
    windowHeight: 0
  },

  onLoad: function() {
    var windowWidth, windowHeight;
    wx.getSystemInfo({
      success: function (res) {
        windowWidth = res.windowWidth;
        windowHeight = res.windowHeight;
      }
    });
    this.setData({
      windowWidth: windowWidth,
      windowHeight: windowHeight
    });
    console.log("Set windowWidth to be: " + this.data.windowWidth);
    console.log("Set windowHeight to be: " + this.data.windowHeight);
  },

  handletouch: function(e) {
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;
    console.log("(" + x + ", " + y + ")");
    // if x < half of screen width
    // && y < half of screen height
    // we are touching block #1, change it to green background
    var windowWidth = this.data.windowWidth, windowHeight = this.data.windowHeight;
    var newArray1 = this.data.array1,
      newArray2 = this.data.array2;
    var halfWidth = windowWidth / 2, halfHeight = windowHeight / 2;
    var quarterWidth = halfWidth / 2, quarterHeight = halfHeight / 2;

    var colIndex = this.getColumnIndex(x);
    console.log('colIndex is: ' + colIndex);
    var changeColor = this.data.startWhite;
    if (y < halfHeight) {
      console.log("column #" + colIndex + " should change color!");
      newArray1[colIndex - 1].changeColor = changeColor;
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

    var windowWidth = this.data.windowWidth, 
      windowHeight = this.data.windowHeight;

    var halfWidth = windowWidth / 2, halfHeight = windowHeight / 2;
    var quarterWidth = halfWidth / 2, quarterHeight = halfHeight / 2;

    var colIndex = this.getColumnIndex(x);
    console.log('colIndex is: ' + colIndex);

    // change the startWhite attribute
    var changeColor = this.data.startWhite;
    if (y < halfHeight) {
      this.setData({ startWhite: !this.data.array1[colIndex-1].changeColor});
    } else if (x < halfWidth && y > halfHeight) {
      this.setData({ startWhite: !this.data.array2[0].changeColor });
    } else if (x > halfWidth && y > halfHeight) {
      this.setData({ startWhite: !this.data.array2[1].changeColor });
    }
  },
  // This function returns the column index of a given position x
  // Please -1 to get the actual array index
  getColumnIndex: function(x) {
    return (x / (this.data.windowWidth / 4) + 0.5).toFixed(0);
  }
})