

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
      {id: '6', changeColor: false},
      {id: '7', changeColor: false},
      {id: '8', changeColor: false}
    ],
    array3: [
      { id: '9', changeColor: false },
      { id: '10', changeColor: false },
      { id: '11', changeColor: false },
      { id: '12', changeColor: false }
    ],
    array4: [
      { id: '13', changeColor: false },
      { id: '14', changeColor: false },
      { id: '15', changeColor: false },
      { id: '16', changeColor: false }
    ],
    startWhite: true,
    windowWidth: 0,
    windowHeight: 0,
    canvasWidth: 0,
    canvasHeight: 0
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
      windowHeight: windowHeight,
      canvasWidth: windowWidth - 2,
      canvasHeight: (windowHeight * 0.8)
    });
    console.log("Set windowWidth to be: " + this.data.windowWidth);
    console.log("Set windowHeight to be: " + this.data.windowHeight);
    
  },

  // when the elements are ready, draw rectangles on the canvas
  onReady: function(e) {
    console.log('This is ready function!');
    var recWidth = this.data.canvasWidth / 4, 
      recHeight = this.data.canvasHeight / 4;
    const context = wx.createCanvasContext('1');
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        context.rect(recWidth * i, recHeight * j, recWidth, recHeight);
        context.stroke();
      }
    }
    context.draw();
    // context.rect(0, 0, recWidth, recHeight);
    // context.stroke();
    // context.rect(recWidth, 0, recWidth, recHeight);
    // context.stroke();
    // context.rect(recWidth * 2, 0, recWidth, recHeight);
    // context.stroke();
    // context.rect(recWidth * 3, 0, recWidth, recHeight);
    // context.stroke();
    // context.rect(0, 75, recWidth, recHeight);
    // context.stroke();
    // context.rect(150, 75, recWidth, recHeight);
    // context.stroke();
    // context.draw();
    // var context = wx.createCanvasContext('1');
    // context.strokeRect(0, 500, 10, 10);
    // context.draw();
    // context.stroke();
    // context.rect(156, 445, 312, middleHeight);
    // context.stroke();
    // context.rect(0, middleHeight, 156, windowHeight);
    // context.stroke();
    // context.rect(156, middleHeight, 312, windowHeight);
    // wx.drawCanvas({
    //   canvasId: 1,
    //   actions: context.getActions()
    // });
  },

  // this function listens to user's finger movement
  handletouch: function(e) {
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;
    console.log("(" + x + ", " + y + ")");
    // if x < half of screen width
    // && y < half of screen height
    // we are touching block #1, change it to green background
    var windowWidth = this.data.windowWidth, windowHeight = this.data.windowHeight;
    var newArray1 = this.data.array1,
      newArray2 = this.data.array2,
      newArray3 = this.data.array3,
      newArray4 = this.data.array4;
    var halfWidth = windowWidth / 2, quarterHeight = windowHeight / 4;
    var quarterWidth = halfWidth / 2;

    var colIndex = this.getColumnIndex(x);
    console.log('colIndex is: ' + colIndex);
    var changeColor = this.data.startWhite;
    if (y < quarterHeight) {
      console.log("column #" + colIndex + " should change color!");
      newArray1[colIndex - 1].changeColor = changeColor;
    } else if (y < quarterHeight * 2) {
      console.log("column #" + (colIndex + 4) + " should change color!");
      newArray2[colIndex - 1].changeColor = changeColor;
    } else if (y < quarterHeight * 3) {
      console.log("column #" + (colIndex + 8) + " should change color!");
      newArray3[colIndex - 1].changeColor = changeColor;
    } else {
      console.log("column #" + (colIndex + 12) + " should change color!");
      newArray4[colIndex - 1].changeColor = changeColor;
    }

    this.setData({
      array1: newArray1,
      array2: newArray2,
      array3: newArray3,
      array4: newArray4
    });
  },

  handletouchstart: function(e) {
    var touch = e.touches[0];
    var x = touch.pageX, y = touch.pageY;

    var windowWidth = this.data.windowWidth, 
      windowHeight = this.data.windowHeight;

    var halfWidth = windowWidth / 2, quarterHeight = windowHeight / 4;
    var quarterWidth = halfWidth / 2;

    var colIndex = this.getColumnIndex(x);
    console.log('colIndex is: ' + colIndex);

    // change the startWhite attribute
    var changeColor = this.data.startWhite;
    if (y < quarterHeight) {
      this.setData({ startWhite: !this.data.array1[colIndex-1].changeColor});
    } else if (y < quarterHeight * 2){
      this.setData({ startWhite: !this.data.array2[colIndex-1].changeColor});
    } else if (y < quarterHeight * 3){
      this.setData({ startWhite: !this.data.array3[colIndex - 1].changeColor });
    } else {
      this.setData({ startWhite: !this.data.array4[colIndex - 1].changeColor });
    }
  },
  // This function returns the column index of a given position x
  // Please -1 to get the actual array index
  getColumnIndex: function(x) {
    return (x / (this.data.windowWidth / 4) + 0.5).toFixed(0);
  },
  dummyStart: function(e) {
    console.log('start' + e);
  },
  dummyMove: function(e) {
    console.log('move (' + e.touches[0].x + ', ' + e.touches[0].y
      + ').');
  },
  dummyEnd: function(e) {
    console.log('end' + e);
  }
})