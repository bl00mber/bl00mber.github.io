// Trail
// dots is an array of Dot objects,
// mouse is an object used to track the X and Y position
   // of the mouse, set with a mousemove event listener below
var dots = [],
    mouse = {
      x: 0,
      y: 0
    };

// The Dot object used to scaffold the dots
var Dot = function() {
  this.x = 0;
  this.y = 0;
  this.node = (function(){
    var n = document.createElement("div");
    n.className = "trail";
    document.body.appendChild(n);
    return n;
  }());
};
// The Dot.prototype.draw() method sets the position of
  // the object's <div> node
Dot.prototype.draw = function() {
  this.node.style.left = this.x+5 + "px";
  this.node.style.top = this.y+10 + "px";
};

// Creates the Dot objects, populates the dots array
for (var i = 0; i < 12; i++) {
  var d = new Dot();
  dots.push(d);
}

// This is the screen redraw function
function draw() {
  // Make sure the mouse position is set everytime
    // draw() is called.
  var x = mouse.x,
      y = mouse.y;

  dots.forEach(function(dot, index, dots) {
    var nextDot = dots[index + 1] || dots[0];

    dot.x = x;
    dot.y = y;
    dot.draw();
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;

  });
}

addEventListener("mousemove", function(event) {
  //event.preventDefault();
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

// animate() calls draw() then recursively calls itself
  // everytime the screen repaints via requestAnimationFrame().
let cursorAnimationId;
function animateCursor() {
  document.querySelectorAll('.trail').forEach(el => { el.style.opacity = 1; })
  draw();
  cursorAnimationId = requestAnimationFrame(animateCursor);
}

// And get it started by calling animate().
animateCursor();



// Print
let printId;

var showText = function (el, message, index, interval) {
  if (index < message.length) {
    el.textContent += message[index++];
    printId = setTimeout(function () { showText(el, message, index, interval); }, interval);
  }
}

var text = `!function(){"use strict";var r={}.hasOwnProperty;function a(){for(var e=[],t=0;t<arguments.length;t++){var n=arguments[t];if(n){var o=typeof n;if("string"===o||"number"===o)e.push(n);else if(Array.isArray(n)&&n.length){var i=a.apply(null,n);i&&e.push(i)}else if("object"===o)for(var u in n)r.call(n,u)&&n[u]&&e.push(u)}}return e.join(" ")}e.exports?(a.default=a,e.exports=a):void 0===(n=function(){return a}.apply(t,[]))||(e.exports=n)}()},function(e,t){var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){(function(t){var r="Expected a function",n="__lodash_hash_undefined__",a="[object Function]",o="[object GeneratorFunction]",i=/^\[object .+?Constructor\]$/,u="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,s=u||c||Function("return this")();var l,f=Array.prototype,d=Function.prototype,p=Object.prototype,h=s["__core-js_shared__"],y=(l=/[^.]+$/.exec(h&&h.keys&&h.keys.IE_PROTO||""))?"Symbol(src)_1."+l:"",m=d.toString,g=p.hasOwnProperty,b=p.toString,v=RegExp("^"+m.call(g).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),C=f.splice,_=I(s,"Map"),w=I(Object,"create");function S(e){var t=-1,r=e?e.length:0;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}`

showText(document.querySelector('.print'), text, 0, 50)



// Toggler
let executed = false;
let active = true;

document.querySelector('.slider.round').addEventListener('click', e => {
  if (executed) return;
  executed = true;
  if (active) {
    active = false;
    clearTimeout(printId)
    document.querySelector('.print').textContent = ''

    document.querySelectorAll('.trail').forEach(el => { el.style.opacity = 0; })
    window.cancelAnimationFrame(cursorAnimationId)
  } else {
    active = true;
    showText(document.querySelector('.print'), text, 0, 50)

    animateCursor()
  }
  executed = false;
})
