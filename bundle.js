/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);



 class QuadtreeMaker {
    constructor(){}
     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = '1', byVar = false, ratio = 1 ){
        const timeOutes = [];
        const intervals = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => {
            timeOutes.forEach(to => clearTimeout(to));
            intervals.forEach(to => clearInterval(to));
        });

        let devisions = 0;
        const pixelArray = imageData.data;
        const initialBounds = { x: 0, y: 0, width: imageData.width, height: imageData.height };

         const divisionsNumberEl = document.getElementById('divisionsNumber');
        this.Quadtree = class Quadtree{
            constructor(bounds, level) {       
            this.use = true;
            this.bounds = bounds;
            this.nextWidth = Math.round(this.bounds.width / 2);
            this.nextHeight = Math.round(this.bounds.height / 2);
            this.mpX = bounds.x + this.nextWidth;
            this.mpY = bounds.y + this.nextHeight;

            this.getHighestVarNode = this.getHighestVarNode.bind(this);               
            
            const i4 = (this.mpY * imageData.width * 4) + this.mpX * 4;                 
            this.coloravg = this.calcAverageColor();
            this.color = 'rgba(' + this.coloravg [0] + ', ' + this.coloravg [1] +
                    ', ' + this.coloravg [2] + ', ' + (this.coloravg [3]) + ')';
            this.variance = this.calcColorVar();
            this.level = level || 0;
            this.bounds = bounds;
            this.nodes = [];
            
            context.fillStyle = this.color;
            if (circleBool) {
                context.beginPath();
                context.ellipse(this.mpX, this.mpY, bounds.width*ratio, bounds.height*ratio,0, 0, 2 * Math.PI, false);
                // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fill();
            } else {
                // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fillRect(bounds.x, bounds.y, bounds.width*ratio, bounds.height*ratio);
            }
        }
        calcAverageColor(){
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            let counter = 0;
            for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width-1; x++) {
                for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height-1; y++) {
                    const i4 = ((y * imageData.width) + x) * 4;
                    if (Number.isInteger(pixelArray[i4+3]))
                    {
                        counter = counter + 1;
                        r += pixelArray[i4];
                        g += pixelArray[i4+1];
                        b += pixelArray[i4+2];
                        a += pixelArray[i4+3];
                    }
                }
            }
            const area = counter || 1;

            r = Math.round(r / area);
            g = Math.round(g / area);
            b = Math.round(b / area);
            a = Math.round(a / area);
            if (r === undefined || Number.isNaN(r)) console.log("!!color avg!!", [r, g, b, a],area, this);
            return [r,g,b,a];
        }
        calcColorVar() {
                if (this.width < 2) return 0;
            let sum = [0,0,0,0];
            let n = 0;
                for (let x = this.bounds.x; x < this.bounds.x+this.bounds.width;x = x+1){
                    for (let y = this.bounds.y; y<this.bounds.y+this.bounds.height;y++){
                        const i4 = (y * imageData.width + x) * 4;
                        if (pixelArray[i4] !== undefined){
                            n++;
                            sum[0] += Math.pow(pixelArray[i4]- this.coloravg[0],2);
                            sum[1] += Math.pow(pixelArray[i4 + 1] - this.coloravg[1],2);
                            sum[2] += Math.pow(pixelArray[i4 + 2]- this.coloravg[2],2);
                            sum[3] += Math.pow(pixelArray[i4 + 3] - this.coloravg[3],2);
                        }
                    }
                }
            const area = n;
            let varSum = 0;
            
            sum.forEach((color) => {
                varSum += color/area;
            });
            const variance = varSum / 4;            
            const score = (variance * variance) * (area/(imageData.width * imageData.height )) ;
            return score;


         }
        getIndex(x,y){
            let index = -1;
            this.nodes.forEach( (node, idx) =>{
                if (node.bounds.x < x && x < node.bounds.x+node.bounds.width){
                    if ( node.bounds.y < y && y < node.bounds.y+node.bounds.height){
                        index = idx;
                    }
                }
            });
            return index;
        }
        //every node has either no children or 4 children. If xy is within bounds, if there are no children return this node,
        // if there are children getIndex and run getNode on that child node. 

        GetNode(x,y){
            if (this.nodes[0] !== undefined){
                const idx = this.getIndex(x,y);
                if (idx !== -1) return this.nodes[idx].GetNode(x,y);
                return null;
            }else{
                return this;
            }
        }



        split(force=false) {
            if (!force && (
                    this.bounds.width < blockSize ||
                    this.bounds.width < 2 ||
                    this.bounds.height < blockSize ||
                    this.bounds.height < 2
                    ))
            {
                this.variance = 0;
                return false;
            }

            this.nodes[0] = new Quadtree({
                width: this.nextWidth,
                height: this.nextHeight,
                x: this.bounds.x,
                y: this.bounds.y,

            }, this.level + 1);

            this.nodes[1] = new Quadtree({
                width: this.nextWidth,
                height: this.nextHeight,
                x: this.mpX,
                y: this.bounds.y,

            }, this.level + 1);

            this.nodes[2] = new Quadtree({
                width: this.nextWidth,
                height: this.nextHeight,
                x: this.bounds.x,
                y: this.mpY,

            }, this.level + 1);
            this.nodes[3] = new Quadtree({
                width: this.nextWidth,
                height: this.nextHeight,
                x: this.mpX,
                y: this.mpY,

            }, this.level + 1);
            devisions++;
            divisionsNumberEl.innerText = `devisions: ${devisions}\n bottom-level nodes${1 + 3 * devisions}`;
            return this;
        }

        splitChildren() {
            this.nodes.forEach((quadNode) => {
                quadNode.split(quadNode);
            });
        }

        recusiveSplit(QuadNode) {
            if(QuadNode.split()){
                QuadNode.nodes.forEach(function (node, index) {
                    if (node.nextWidth >= blockSize && node.nextWidth >= 1 && node.nextHeight >=1) {
                        if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), (node.level * index) * 100 )); }
                        else if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                        else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((100) / (node.level * index * index)) ));}
                        else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((devisions) / (index * index * node.level)))); }
                    }                                                                            
                });
            }
        }
        splitByVar(parentNode){
            let counter =0;
            const a = setInterval(()=>{
                counter++;
                let hvn = parentNode.getHighestVarNode();
                if (hvn.node === null || hvn.var === 0) clearInterval(a);
                hvn.node.split();
            },1);
            intervals.push(a);
        }
        getHighestVarNode() {
            
            let highestVar = {node:null, var:0};
             const recIter = (Pnode) => {
                 
                 if (Pnode.nodes[0] === undefined) {
                     if (highestVar.var < Pnode.variance){
                         highestVar.node = Pnode;
                         highestVar.var = Pnode.variance;
                    }
                }else{
                     Pnode.nodes.forEach( (node)=>{
                         recIter(node);
                    });
                }
            };
            recIter(this);
            return highestVar;
            

            
        }
    };
    
         if (this.tree) {
             this.tree.use = false;
         }
        this.tree = new this.Quadtree(initialBounds);
         byVar ? this.tree.splitByVar(this.tree) : this.tree.recusiveSplit(this.tree);

        

        function quadClickSplit(tree){
            return (e)=>{
            if (tree.use === true){
                const canvasHolder = document.getElementById('canvasHolder')                
                const node = tree.GetNode(e.pageX - canvasHolder.offsetLeft, e.pageY - canvasHolder.offsetTop);
                if (node) node.split(true); 
            }
        };}

         context.canvas.addEventListener('click', quadClickSplit(this.tree));
    
    }
}


/* harmony default export */ __webpack_exports__["a"] = (QuadtreeMaker);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quadtree_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blockCompress_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__demo__ = __webpack_require__(8);



const urls = [
    // 'https://i.imgur.com/drGvplW.jpg',
    // 'https://i.imgur.com/zkc1tq7.jpg',
    'https://i.imgur.com/cMMwsek.jpg',
    // 'https://i.imgur.com/5BMFvAC.jpg'
];
document.addEventListener("DOMContentLoaded", function () {
    
    // console.log(QuadtreeMaker);
    const imagereader = new ImageReader();
    let img = new Image();
    const time = new Date().getTime();
    img.src = urls[time % urls.length]  + time;
    img.crossOrigin = "Anonymous";
    img.onload = () => {
        imagereader.receiveImage(img);
    };

    const imgForm = document.getElementById('imageUrlSubmit');
    // console.log(imgForm);
    imgForm.addEventListener('click', function (event) {
        event.preventDefault();
        const imgURl = document.getElementById('imageUrlInput').value;
        
        img.src = imgURl+ '?' + new Date().getTime();
        // console.log('img', imgURl, img);
        img.crossOrigin = "Anonymous";
        img.onload = () => imagereader.receiveImage(img);
    });
});


class ImageReader{
    constructor(){
        // console.log(that, that());
    }
    //initiates a new canvas and starts event handlers on buttons
    receiveImage(img){

        // console.log("image recieved", img);
        this.img=img;

        // make new canvas to clean event handlers
        this.resultCanvas = document.getElementById('result');
        const canvasClone =  this.resultCanvas.cloneNode(true);
        this.resultCanvas.parentNode.replaceChild(canvasClone, this.resultCanvas);
        this.resultCanvas = canvasClone;
        
        //stop any running quad trees
        const stopButton = document.getElementById('stopQuads');
        stopButton.click();
        const divisionsNumberEl = document.getElementById('divisionsNumber');
        divisionsNumberEl.innerText = '';


        //turn off anti aliasing to set canvas size
        this.resultCtx = this.resultCanvas.getContext('2d');
        this.resultCtx.imageSmoothingEnabled = false;
        const htmlWidth = 1024;
        this.resultCanvas.width = htmlWidth;
        const ratio = htmlWidth/img.width;
        this.resultCanvas.height = img.height * ratio;
        
        this.resultCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height);  
        this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);

        //setup reset button
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', e => {
            stopButton.click();
            this.resultCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height)
            this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        });

        //setup color picker
        this.menuColor = document.getElementById('menu-color');
        this.resultCanvas.addEventListener('mousemove', handleMouseMove(this.resultCtx, this.menuColor));

        
        //setup clearbutton
        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', e => this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height));

        //setup niaveCommression button and handler
        this.niaveButton = document.getElementById('niave');
        const newNiaveButton = this.niaveButton.cloneNode(true);
        this.niaveButton.parentNode.replaceChild(newNiaveButton, this.niaveButton);
        this.niaveButton = newNiaveButton;
        this.niaveButton.addEventListener('click', niaveCompressClick.bind(this));
        
        //quad button
        this.quadtreeMaker = new __WEBPACK_IMPORTED_MODULE_0__quadtree_js__["a" /* default */]();
        const quadTreeSimpleButton = document.getElementById('quadtree');
        const newquadTreeSimpleButton = quadTreeSimpleButton.cloneNode(true);
        quadTreeSimpleButton.parentNode.replaceChild(newquadTreeSimpleButton, quadTreeSimpleButton);
        newquadTreeSimpleButton.addEventListener('click', handleQuadTreeClick(this.imageData, this.resultCtx, this.quadtreeMaker));





    }

}

const stopButton = document.getElementById('stopQuads');
///ui buttons
const blockChopButton = document.getElementById('blockChopToggle');
blockChopButton.addEventListener('click', function (e) {
    const otherContainer = document.getElementById('qt');
    const container = document.getElementById('bc');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
});

const quadTreeButton = document.getElementById('quadTreeToggle');
quadTreeButton.addEventListener('click', function (e) {
    const otherContainer = document.getElementById('bc');
    const container = document.getElementById('qt');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
});

//grey out traversetype on SplitByColorVar
const varCheckbox = document.getElementById('quadTreeVariance');
const traverseTypeSelect = document.getElementById('QuadTreeTraverse');
if (varCheckbox.checked) {
    traverseTypeSelect.classList.add('greyed');
    traverseTypeSelect.disabled = true;
}

varCheckbox.addEventListener('click', function (e){
    // const traverseTypeSelect = document.getElementById('QuadTreeTraverse');
    if (varCheckbox.checked){
        traverseTypeSelect.classList.add('greyed');
        traverseTypeSelect.disabled=true;
    }else{
        traverseTypeSelect.classList.remove('greyed');
        traverseTypeSelect.disabled=false;
    }
});
//grey out expand by unless its option 3 or 4
const expandTypeSelect = document.getElementById('niaveInputExpand');
expandTypeSelect.addEventListener('change', function(e){
    const exapandAmountInput = document.getElementById('niaveInputExpandval');
     if (expandTypeSelect.value <= 2){
         exapandAmountInput.classList.add('greyed');
         exapandAmountInput.disabled = true;
     } else if (expandTypeSelect.value >= 3){
         exapandAmountInput.classList.remove('greyed');
         exapandAmountInput.disabled = false;
     }
    
});



function handleMouseMove(ctx, element){
    return ((event) => {
        // console.log('mouseoverevent', event);
        const x = event.layerX;
        const y = event.layerY;
        // console.log('here', ctx , element,x,y)
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;
        const rgba = 'color: rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        element.style.background = rgba;
        element.textContent = rgba;
    });
}



function niaveCompressClick(e) {
    stopButton.click();
    ///
    //get inputs
    let inX = parseInt(document.getElementById('niaveInputX').value);
    let inY = parseInt(document.getElementById('niaveInputY').value);
    let expand = parseInt(document.getElementById('niaveInputExpand').value);
    let exval = parseFloat(document.getElementById('niaveInputExpandval').value);
    //
    //validations           
    if (expand > 5 || expand < 1) {
        expand = 1;
    }
    if (inY < 1) inY = 1;
    if (inX < 1) inY = 1;
    ///
    //call compression
    // console.log("x,y,e", inY, inX, { x: inX || 10, y: inY || 10 }, expand);

    Object(__WEBPACK_IMPORTED_MODULE_1__blockCompress_js__["a" /* default */])(this.imageData, this.resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
}
function handleQuadTreeClick(imageData, context, quadtreeMaker){
    return (e) => {
        stopButton.click();
        e.preventDefault();
        let ratio = parseFloat(document.getElementById('quadTreeSize').value);
        let blockSize = parseInt(document.getElementById('quadTreeBlockSize').value);
        const circleBool = document.getElementById('quadTreeCircle').checked;
        const traverseType = document.getElementById('QuadTreeTraverse').value;
        const splitbyVariance = document.getElementById('quadTreeVariance').checked;

        blockSize = blockSize >= 1 ? blockSize : 1;
        ratio = ratio > .001 ? ratio : 1;

        quadtreeMaker.makeQuadTree(imageData, context, blockSize, circleBool, traverseType, splitbyVariance, ratio);
        //  new QuadtreeMaker(imageData, context, blockSize, circleBool, traverseType);
    };
}
const demoButton = document.getElementById('demoButton');
demoButton.addEventListener('click',function(){
    __WEBPACK_IMPORTED_MODULE_2__demo__["a" /* default */].toggle();
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(5);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(6);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(4)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = NiaveCompress;
function NiaveCompress(imagedata, ctx, blockSize, expand, exval) {
    //setup stop button
    const timeOuts = [];
    const stopNiaveButton = document.getElementById('stopNiave');
    stopNiaveButton.addEventListener('click', e => timeOuts.forEach(to => clearTimeout(to)));

    const data = imagedata.data;
    //set/reset canvas width and height by blocksize. 

    if (expand === 2) {
        ctx.canvas.width = imagedata.width / blockSize.x;
        ctx.canvas.height = imagedata.height / blockSize.y;
    } else {
        ctx.canvas.width = imagedata.width;
        ctx.canvas.height = imagedata.height;
    }
    //delete previously made svg elements
    if (expand === 5) {
        const myNode = document.getElementById('svgOne');
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }



    for (let y = 0; y < imagedata.height; y = y + (blockSize.y)) {
        for (let x = 0; x < imagedata.width; x = x + (blockSize.x)) {
            timeOuts.push(setTimeout(() => {

                const i = ((y * imagedata.width) + x) * 4;
                // console.log('x,y,i,data', { x: x, y: y },i, data[x + imagedata.width * 4 * y]);
                ctx.fillStyle = 'rgba(' + data[i] + ', ' + data[i + 1] +
                    ', ' + data[i + 2] + ', ' + (data[i + 3]) + ')';



                //standard mode, fillrect of blocksize to color. color is set above to the top left pixel of block
                // defined by x*blocksize,y*blocksize
                if (expand === 1) {
                    // (imagedata.height-y) type stuff to rotate
                    ctx.fillRect(x, y, blockSize.x, blockSize.y);
                    // ctx.fillStyle = 'black';
                    // ctx.fillRect(x, y, blockSize.x, 1);
                    // ctx.fillRect(x, y, 1, blockSize.y);

                    //doesnt expand, fillrect of 1x1 (single pixel) of color as defined above into an image blocksize smaller.
                    //ie if you have a blocksize of 2 the result will be an image half the size
                    //the canvass id resized before the for loop to make the image downloadable as a small image
                } else if (expand === 2) {

                    ctx.fillRect(x / blockSize.x, y / blockSize.y, 1, 1);

                    //doesnt expand, but uses the same x, y coordinate of original image
                    // this basically shows which pixel is being selected for each block
                } else if (expand === 3) {

                    ctx.fillRect(x, y, exval, exval);
                    //expands by making a circle of radius=the averge of blocksize.x and blocksize.y, fills with color defined above.
                    //the optional expandValue attribute changes how much less than the average the circle is filled by, so larget value means saller circle
                } else if (expand === 4) {
                    ctx.beginPath();
                    ctx.arc(x, y, (blockSize.x + blockSize.y) / (2 * exval), 0, 2 * Math.PI, false);
                    ctx.fill();
                } else if (expand === 5) {
                    // console.log('here')
                    let svgns = "http://www.w3.org/2000/svg";
                    let rect = document.createElementNS(svgns, 'rect');
                    rect.setAttributeNS(null, 'x', x * 5);
                    rect.setAttributeNS(null, 'y', y * 5);
                    rect.setAttributeNS(null, 'height', 5 * blockSize.y);
                    rect.setAttributeNS(null, 'width', 5 * blockSize.x);
                    rect.setAttributeNS(null, 'fill', ctx.fillStyle);
                    document.getElementById('svgOne').appendChild(rect);
                }
            }, (x + y * 600) / 100));
        }


    }
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_demopages__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__ = __webpack_require__(11);




const fromRightFade = function(el){
    const parent = document.getElementById('canvasHolder');
    el.style.position = 'absolute';
    el.style.transition = '1s all';
    el.style.left = '300%';
    el.style.opacity = '0';
    parent.appendChild(el);
    setTimeout(() => { 
        el.style.left = '0%';
        el.style.opacity= '1';
    
    }, 0);
}
/* unused harmony export fromRightFade */


const fadeIn = function (el, message) {
    const parent = document.getElementById('canvasHolder');
    el.style.transition = '.7s all';
    el.classList.add('invisible');
    parent.appendChild(el);
    setTimeout(() => { el.classList.remove('invisible'); }, 0);
};
/* unused harmony export fadeIn */


const fadeOut = function (el, next) {
    const parent = document.getElementById('canvasHolder');
    el.style.opacity = '1';
    el.style.transition = '.3s all';
    setTimeout(() => { el.style.opacity = '0'; }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 400);
};
/* unused harmony export fadeOut */


const fadeOutStop = function (el, next) {
    __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["c" /* clickStopBlockChop */]();
    __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["d" /* clickStopQuad */]();
    const parent = document.getElementById('canvasHolder');
    el.style.opacity = '1';
    el.style.transition = '.3s all';
    setTimeout(() => { el.style.opacity = '0'; }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 400);
};
/* unused harmony export fadeOutStop */



const demo = [
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["m" /* intro */], fromRightFade, fadeOut, 3500, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["h" /* ensureQuadMenu */], __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["g" /* ensureQTvar */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["n" /* introExplain */], fadeIn, fadeOut, 13000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["h" /* QuadTreeRun */], fadeIn, fadeOut, 12000, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["b" /* clickQuadTree */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["g" /* QuadTreeExplain */], fadeIn, fadeOut, 6000, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["i" /* stay */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["b" /* BlockChopIntro */], fadeIn, fadeOut, 6000,__WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["e" /* ensureBlockChopmenu */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["a" /* BlockChop */], fadeIn, fadeOutStop, 10000, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["a" /* clickBlockChop */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["c" /* BlockChopOptions */], fadeIn, fadeOut,5000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["d" /* QuadRec */], fadeIn, fadeOut, 10000, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["h" /* ensureQuadMenu */], __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["f" /* ensureQTrec */], __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["b" /* clickQuadTree */], __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["d" /* clickStopQuad */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["e" /* QuadRecRun */], fadeIn, fadeOutStop, 6000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["f" /* QuadRecRun2 */], fadeIn, fadeOut, 6000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["j" /* Quadvar */], fadeIn, fadeOut, 10000, __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["h" /* ensureQuadMenu */], __WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["g" /* ensureQTvar */],__WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["b" /* clickQuadTree */]),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["k" /* QuadvarGetHighest */], fadeIn, fadeOut, 10000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["i" /* QuadVarexp */], fadeIn, fadeOut, 10000),
    new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoObj"](__WEBPACK_IMPORTED_MODULE_1__assets_demopages__["l" /* Quadvarparams */], fadeIn, fadeOut, 10000,__WEBPACK_IMPORTED_MODULE_2__assets_demoactions__["i" /* stay */]),

];

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_0__assets_modules_demo__["DemoRunner"](demo));

    



/***/ }),
/* 9 */
/***/ (function(module, exports) {

class DemoObj {
  constructor(HTMLStringFunction, add, remove, time, ...cbScripts) {
    this.el = null;
    this.htmlMaker = HTMLStringFunction;
    this.add = add;
    this.remove = remove;
    this.time = time;
    this.attached = false;
    this.cbScripts = cbScripts;
  }
  build(message) {
    this.el = document.createElement('div');
    this.el.id = 'DemoDiv';
    try {
      this.el.innerHTML = this.htmlMaker();
    } 
    catch(err){
      typeof this.el.innerHTML !== 'function' ?
      console.log(`DemoObjs first parameter must be a function which returns InnerHtml`,
      `
      got:${typeof this.el} :${this.el}
      expected: a function which returns HTML
      `) :
      console.log(err);

    }
    this.add(this.el, message);
    this.attached = true;
  }
  destroy(next) {
    this.attached = false;
    this.remove(this.el, next);
  }
};
class DemoRunner {
  constructor(elobjs, destroyCB) {
    this.destroyCB = destroyCB;
    this.elements = elobjs;
    this.index = 0;
    this.to = null;
    this.current = null;

    this.switch = false;
  }
  toggle(){
    if(!this.switch){
      this.run();
      this.switch = true;
    } else{
      this.endRun();
    }
    
  }
  run(message) {
    if (this.index > this.elements.length - 1) return this.endRun();
    const obj = this.elements[this.index];
    this.current = obj;
    this.bindMethods();
    obj.build(message);
    ++this.index;
    this.to = setTimeout(this.destroyCurrentAndRun.bind(this), obj.time);
    const that = this;
    obj.cbScripts.forEach(function(cbScript){
      if (typeof cbScript === 'function') cbScript(that);
    });
  }
  bindMethods() {
    window.demo = {};
    window.demo.stay = this.stay.bind(this);
    window.demo.destroyCurrentAndRun = this.destroyCurrentAndRun.bind(this);
    window.demo.goBack = this.goBack.bind(this);
    window.demo.endRun = this.endRun.bind(this);
  }
  goBack() {
    if (this.index > 1) {
      clearTimeout(this.to);
      this.destroyCurrent();
      this.index = this.index - 2;
      this.run();
    }
  }
  stay() {
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    clearTimeout(this.to);
    this.current.destroy(this.run.bind(this));
  }
  destroyCurrent() {
    clearTimeout(this.to);
    this.current.destroy(function () {});
  }
  endRun() {
    clearTimeout(this.to);
    if (this.current.attached) this.destroyCurrent();
    this.switch = false;
    if (typeof this.destroyCB === 'function') this.destroyCB();
    window.demo = undefined;
    this.index = 0;
    
  }
};


exports.DemoObj = DemoObj;
exports.DemoRunner = DemoRunner;

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const intro = () => `
<div class='demo-intro demo-div'>
    <h1> QuadTree Compressor</h1>
    <img class='demoImg' src='http://res.cloudinary.com/flyakite/image/upload/v1515907377/download_1_fl6gow_kltvt8.png'></img>
</div>
`
/* harmony export (immutable) */ __webpack_exports__["m"] = intro;

const introExplain = () => `
<div class='demo-div'>
    <h1> QuadTree Compressor</h1>
    <h2>Quick Run Down (1/3)</h2>
    <h3>Intro</h3>
<p> 
This is a Javasript/HTML5 Canvas app that visualizes Quadtree Compression
</p>
<p>
The idea behind image compression is to find  way to represent the same image using less data.
This QuadTree compression algorithm accomplishes this by displaying areas with less color variation with fewer pixels and animates the process
using HTML5 canvas and Javascripts setTimeout.  

</p>

  <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
/* harmony export (immutable) */ __webpack_exports__["n"] = introExplain;

const QuadTreeRun = () => `
<div class='demo-div'>
<h2>Quick Run Down (2/3)</h2>
<h3>Implementation</h3>
 <p>
 The algorithm works by recursively splitting the image into quadrants, QuadTree nodes, that encompass an area and have an average color
and a variance score. This variance score is calculated as the variance from the average color divided by the area. The algorithm
finds the node with then highest score, and breaks it into four nodes that each encompass one of its quadrants, the origin of
the name. The process then repeats constantly spliting the Node with the highest variance into four. 
</p>
  <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
/* harmony export (immutable) */ __webpack_exports__["h"] = QuadTreeRun;

const QuadTreeExplain = () => `
<div class='demo-div'>
<h2>Quick Run Down (3/3)</h2>
<h3>Results</h3>
 <p>This results in something like an edge finder. Areas with high color variance get lots of data, and areas with little variance get less. 
 </p>
 <img src='http://res.cloudinary.com/flyakite/image/upload/v1515907371/download_13_rq5j2u_yrrgtd.png' >
            <button onclick="demo.stay()">Stay</button>
            <button class='onto button-glow' onclick="demo.destroyCurrentAndRun()">Next( Full Explanation)</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
/* harmony export (immutable) */ __webpack_exports__["g"] = QuadTreeExplain;

const BlockChopIntro = () => {
    return `
            <div class='demo-div'>
            <h2>BlockChop (1/3)</h2>
            <h3>A Simple Intro</h3>
            <p>
              A more simple and naive example of how this works is the BlockChop. It
iterates through all the pixels in the image and picks one out of some area to represent that area. 
            </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["b"] = BlockChopIntro;


const BlockChop = () => {
  return `
            <div class='demo-div'>
            <h2>BlockChop (2/3)</h2>
            <h3>A Simple Intro</h3>
            <p>
              For example with a  block size of 4x4, it would chop the image up into 4x4 blocks, choose one pixel out of each block and represent the entire block using the color of that pixel. So I this case the resulting image will have 1/(4*4) = 1/16th as many pixels as the original image. 
            </p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["a"] = BlockChop;

const BlockChopOptions = () => {
  return `
            <div class='demo-div'>
            <h2>BlockChop (3/3)</h2>
            <h3>Options</h3>
<p>
  If you would like to play around with it you can set the blocksize parameters, as well as how the chosen pixel is blown up to represent its block.
            </p>

  <ul>
    <li>
      <p>
       * The default is by block, where the pixel is simply drawn the size of its block.
                </p>
    </li>
    <li>
      <p>
       * real size which simply knits the pixels together and doesnt resize them
                </p>
    </li>

    <li>
      <p>
       * pins neither resizes nor moves the pixels, and you can really see how this algorithm works
                </p>
    </li>

    <li>
      <p>
       * circles uses arcs instead of fillRect which can be a cool effect
                </p>
    </li>
  </ul>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["c"] = BlockChopOptions;


const QuadRec = () => {
  return `
            <div class='demo-div'>
            <h2>The Simple Quadtree (1/3)</h2>
            <h3>The Simple QuadTree version</h3>
            <p>
              The naive version of QuadTree compression doesn't calculate the average color nor the color variance.
It is similar to Blockchop in that it will give an equal pixel depth to all areas on the image,
the only difference is that it accomplishes this recursively using QuadTrees
            </p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["d"] = QuadRec;


const QuadRecRun = () => {
  return `
            <div class='demo-div'>
            <h2>The Simple Quadtree (2/3)</h2>
            <h3> Recusive Split</h3>
            <p> the code for this is straight forward. A node is split into four, if thats successful the same process called on its children.</p>
            <pre><code>
    recusiveSplit(QuadNode) {
      if(QuadNode.split()){
        QuadNode.nodes.forEach((node)=>{
          node.recusiveSplit(node)                                
        });
      }
    }
            </code></pre>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["e"] = QuadRecRun;

const QuadRecRun2 = () => {
  return `
            <div class='demo-div'>
            <h2>The Simple Quadtree(3/3)</h2>
            <h3> Animating Each Step</h3>
            <p> The process is animated by putting the calls to recursiveSplit into setTimeoutes and saving the ID of the timeouts in an array so that they can be cancelled by a button press using clearTimeout</p>
            <pre>
              <code>
    timeOutes.push(setTimeout(
      () => node.recusiveSplit(node),
      100 / (node.boundaries.width * level)
    );
    
              </code>
            </pre>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["f"] = QuadRecRun2;






const Quadvar = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (1/4)</h2>
            <h3>Next Step</h3>
            <p>The full version of Quadtree compression has a few extra steps.
            </p>
            <p>When a node is created first an average color is calculated, and then using that average a variance is calculated and a variance score is assigned to every node as varaince/area</p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["j"] = Quadvar;


const QuadvarGetHighest = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (2/4)</h2>
            <h3>Finding The Right Node</h3>
            <p>getHighestVarNode is an important helper function I wrote which searches for the highest variance node and returns it</p>
            <pre><code>
  getHighestVarNode() {
    let highestVar = {node:null, var:0};
    const finder = (Pnode) => {
    //nodes[0]===undefined when this node has 
    //no children, meaning it is a leaf node.
    //if this is a leaf node, check its
    //variance against the highest seen so far
      if (Pnode.nodes[0] === undefined) {
        if (highestVar.var < Pnode.variance){
          highestVar.node = Pnode;
          highestVar.var = Pnode.variance;
        }
      }else{
        Pnode.nodes.forEach( (node)=>{
          finder(node);
        });
      }
    };
    finder(this);
    return highestVar;
  }
            </code>
            </pre>
            <p>
              The idea here is that finder takes a node (starts with the root). If the node has children it calls the function on all the children, otherwise it is a leaf node and its variance is compared to the largest variance seen and stored if larger.  
            </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["k"] = QuadvarGetHighest;

const QuadVarexp = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (3/4)</h2>
            <h3>Spliting by color Variance</h3>
            <p>
              With nodes that calculate color and variance on initialization, and a helper function
              to find nodes with the highest variance, all we need to do is call it repeatedly in a way that can be animated.
            </p>
              <pre>
                <code>
  splitByVar(tree){
      intervals.push(setInterval(()=>{
          let hvn = tree.getHighestVarNode();
          if (hvn.node === null || hvn.var === 0) clearInterval(a);
          hvn.node.split();
      },10));
  }                  
                </code>
              </pre>
              <p>
                  splitByVar works by getting the highest variance node and calling for it to be split. It is done within a set interval so that the process can be animated and cancelled. 
                  The default escape conditions are that the highest variance node has a score of 0. 
              </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
/* harmony export (immutable) */ __webpack_exports__["i"] = QuadVarexp;

const Quadvarparams = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (4/4)</h2>
            <h3>Options</h3>
            <p>if you would like to play around with it there are several parameters you can choose from</p>
            <ul>
              <li>
                <p>* the split by var chechbox toggles whether to fo naive Quadtree compression or to go by color variance.
                </p>
              </li>

              <li>
                <p>* the circles checkbox toggles whether to fill in areas with circles or squares
                </p>
              </li>

              <li>
                <p>* the size ratio is how much each node is expanded. 1 is the same size as the nodes boundaries in square mode, or a radius of the width in circle mode. a value of .5 is half that. 
                </p>
              </li>

              <li>
                <p>* the size limit is how deep into th image the quadtree will go. setting up a size limit of 10 will the smallest node be a 10x10 box. 
                </p>
              </li>

              <li>
                <p>* The traverse type is the order in which the nodes are split. Different values are put into the setTimeoutes to change their order of execution.
                </p>
              </li>
            
            </ul>


            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `;
};
/* harmony export (immutable) */ __webpack_exports__["l"] = Quadvarparams;








/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_quadtree__ = __webpack_require__(0);


const stay = function (runner) {
    runner.stay();
};
/* harmony export (immutable) */ __webpack_exports__["i"] = stay;


const clickQuadTree = function(){
    const quadtreeButton = document.getElementById('quadtree');
    setTimeout(() =>quadtreeButton.click(),500);
};
/* harmony export (immutable) */ __webpack_exports__["b"] = clickQuadTree;


const clickReset = function(){
    const resetButton = document.getElementById('reset')
    resetButton.click();
};
/* unused harmony export clickReset */

const clickStopQuad = function(){
    const stopButton = document.getElementById('stopQuads');
    setTimeout(() => stopButton.click(), 3000)
    
}
/* harmony export (immutable) */ __webpack_exports__["d"] = clickStopQuad;

const clickBlockChop = function(){
    const blockChop = document.getElementById('niave');
    setTimeout(()=>blockChop.click(),100);
};
/* harmony export (immutable) */ __webpack_exports__["a"] = clickBlockChop;

const clickStopBlockChop = function () {
    const blockChopbutton = document.getElementById('stopNiave');
    setTimeout(() => blockChopbutton.click(), 100);
};
/* harmony export (immutable) */ __webpack_exports__["c"] = clickStopBlockChop;

const ensureQTrec = function(){
    const variance = document.getElementById('quadTreeVariance');
    variance.checked = false;
}
/* harmony export (immutable) */ __webpack_exports__["f"] = ensureQTrec;

const ensureQTvar = function () {
    const variance = document.getElementById('quadTreeVariance');
    variance.checked = true;
}
/* harmony export (immutable) */ __webpack_exports__["g"] = ensureQTvar;

const ensureQuadMenu = function () {
    const otherContainer = document.getElementById('bc');
    const container = document.getElementById('qt');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : null;
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');

};
/* harmony export (immutable) */ __webpack_exports__["h"] = ensureQuadMenu;


const ensureBlockChopmenu = function () {
    const otherContainer = document.getElementById('qt');
    const container = document.getElementById('bc');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : null;
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
};
/* harmony export (immutable) */ __webpack_exports__["e"] = ensureBlockChopmenu;




/***/ })
/******/ ]);