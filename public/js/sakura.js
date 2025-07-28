// 樱花飘落特效 - 基于 poetize.cn 的设计
var stop;
var img = new Image();

// 樱花花瓣的 base64 图片数据
img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4SU";

function getRandom(option) {
  var ret, random;
  switch (option) {
    case 'x':
      ret = Math.random() * window.innerWidth;
      break;
    case 'y':
      ret = Math.random() * window.innerHeight;
      break;
    case 's':
      ret = Math.random() * 0.8 + 0.2; // 大小范围 0.2-1.0
      break;
    case 'r':
      ret = Math.random() * 6;
      break;
    case 'fnx':
      ret = -0.5 + Math.random() * 1;
      break;
    case 'fny':
      ret = 0.5 + Math.random() * 0.5;
      break;
    case 'fnr':
      ret = -2 + Math.random() * 4;
      break;
  }
  return ret;
}

function Sakura(x, y, s, r, fn) {
  this.x = x;
  this.y = y;
  this.s = s;
  this.r = r;
  this.fn = fn;
}

Sakura.prototype.draw = function(cxt) {
  var xc = this.x;
  var yc = this.y;
  var sc = this.s;
  var rc = this.r;
  cxt.save();
  cxt.translate(xc, yc);
  cxt.rotate(rc);
  cxt.scale(sc, sc);
  
  // 绘制樱花花瓣
  cxt.fillStyle = 'rgba(255, 182, 193, 0.8)'; // 粉色
  cxt.beginPath();
  cxt.arc(0, 0, 3, 0, Math.PI * 2);
  cxt.fill();
  
  // 添加花瓣细节
  cxt.fillStyle = 'rgba(255, 192, 203, 0.6)';
  cxt.beginPath();
  cxt.ellipse(-1, -1, 2, 1, 0, 0, Math.PI * 2);
  cxt.fill();
  
  cxt.restore();
};

Sakura.prototype.update = function() {
  this.x = this.fn.x(this.x, this.y);
  this.y = this.fn.y(this.x, this.y);
  this.r = this.fn.r(this.r);
  
  if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
    this.r = getRandom('fnr');
    if (Math.random() > 0.4) {
      this.x = getRandom('x');
      this.y = 0;
      this.s = getRandom('s');
      this.r = getRandom('r');
    } else {
      this.x = 0;
      this.y = getRandom('y');
      this.s = getRandom('s');
      this.r = getRandom('r');
    }
  }
};

function SakuraList() {
  this.list = [];
}

SakuraList.prototype.push = function(sakura) {
  this.list.push(sakura);
};

SakuraList.prototype.update = function() {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].update();
  }
};

SakuraList.prototype.draw = function(cxt) {
  for (var i = 0, len = this.list.length; i < len; i++) {
    this.list[i].draw(cxt);
  }
};

var requestAnimationFrame = window.requestAnimationFrame || 
                           window.mozRequestAnimationFrame || 
                           window.webkitRequestAnimationFrame || 
                           window.msRequestAnimationFrame || 
                           window.oRequestAnimationFrame;

function startSakura() {
  var canvas = document.createElement('canvas');
  var cxt = canvas.getContext("2d");
  
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.setAttribute('style', 'position: fixed;left: 0;top: 0;pointer-events: none;z-index: 1000;');
  canvas.setAttribute('id', 'canvas_sakura');
  document.getElementsByTagName('body')[0].appendChild(canvas);
  
  var sakuraList = new SakuraList();
  
  // 创建樱花
  for (var i = 0; i < 30; i++) {
    var sakura, randomX, randomY, randomS, randomR, randomFnx, randomFny, randomFnR;
    randomX = getRandom('x');
    randomY = getRandom('y');
    randomR = getRandom('r');
    randomS = getRandom('s');
    randomFnx = getRandom('fnx');
    randomFny = getRandom('fny');
    randomFnR = getRandom('fnr');
    
    sakura = new Sakura(randomX, randomY, randomS, randomR, {
      x: function(x, y) {
        return x + randomFnx;
      },
      y: function(x, y) {
        return y + randomFny;
      },
      r: function(r) {
        return r + randomFnR;
      }
    });
    
    sakuraList.push(sakura);
  }
  
  function animate() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    sakuraList.update();
    sakuraList.draw(cxt);
    stop = requestAnimationFrame(animate);
  }
  
  animate();
}

function stopSakura() {
  if (stop) {
    cancelAnimationFrame(stop);
    stop = null;
  }
  var canvas = document.getElementById('canvas_sakura');
  if (canvas) {
    canvas.remove();
  }
}

// 窗口大小改变时重新调整画布
window.addEventListener('resize', function() {
  var canvas = document.getElementById('canvas_sakura');
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// 导出到全局
window.sakura = { startSakura: startSakura, stopSakura: stopSakura };
