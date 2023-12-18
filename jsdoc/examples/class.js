// @ts-check
// 定义构造器 @class, @constructor
// - @class/@constructor 可以用来定义构造函数，并且**只允许通过 `new` 关键字来调用构造函数**。

/**
 * @constructor
 * @param {number} width 宽度
 * @param {number} height 高度
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function() {
  return this.width * this.height
}

// 必须要通过 new 来调用，不然编辑器会报错
var rectrangele = new Rectangle(30, 40);

