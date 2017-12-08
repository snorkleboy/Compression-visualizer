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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__quadtree_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blockCompress_js__ = __webpack_require__(7);



document.addEventListener("DOMContentLoaded", function () {
    
    // console.log(QuadtreeMaker);
    const imagereader = new ImageReader();
    let img = new Image();
    img.src = 'https://i.imgur.com/AIgar9n.jpg?' + new Date().getTime();
    img.crossOrigin = "Anonymous";
    img.onload = () => imagereader.receiveImage(img);


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
        //
        //
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', e => {
            this.resultCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height)
            this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        });

        //setup color picker
        this.menuColor = document.getElementById('menu-color');
        this.resultCanvas.addEventListener('mousemove', handleMouseMove(this.resultCtx, this.menuColor));

        ///
        //setup clearbutton
        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', e => this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height));

        ///
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
///ui buttons
const blockChopButton = document.getElementById('blockChopToggle');
blockChopButton.addEventListener('click', function (e) {
    const otherContainer = document.getElementById('qt');
    const container = document.getElementById('bc');
    // console.log(container);

    container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
    // console.log(container);
});

const quadTreeButton = document.getElementById('quadTreeToggle');
quadTreeButton.addEventListener('click', function (e) {
    const otherContainer = document.getElementById('bc');
    const container = document.getElementById('qt');
    // console.log(container);

    container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
    // console.log(container);
});

//grey out traversetype on SplitByColorVar
const varCheckbox = document.getElementById('quadTreeVariance');
// console.log(varCheckbox);    
varCheckbox.addEventListener('click', function (e){
    const traverseTypeSelect = document.getElementById('QuadTreeTraverse');
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
        const rgba = 'rgba(' + data[0] + ', ' + data[1] +
            ', ' + data[2] + ', ' + (data[3] / 255) + ')';
        element.style.background = rgba;
        element.textContent = rgba;
    });
}


function makeDownload(imageData, element){
    const dlLinkDiv = document.getElementById(element);
    const link = document.createElement('a');
    link.innerText = 'download';
    link.setAttribute('href', imageData);
    link.setAttribute('download', 'myimage.png');
    dlLinkDiv.appendChild(link);
}
function niaveCompressClick(e) {

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






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);



 class QuadtreeMaker {
    constructor(){}
     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = '2', byVar = false, ratio = 1 ){
        const timeOutes = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => timeOutes.forEach((to => clearTimeout(to))));
        let devisions = 0;
        const pixelArray = imageData.data;
        const initialBounds = { x: 0, y: 0, width: imageData.width, height: imageData.height };
        // console.log("QTM", imageData, context.canvas,initialBounds, timeoutType);

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
            //
            /// maybe refactor following into this.render()?
            //                   
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
                context.arc(this.mpX, this.mpY, (bounds.width*ratio), 0, 2 * Math.PI, false);
                // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fill();
            } else {
                // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fillRect(bounds.x, bounds.y, bounds.width*ratio, bounds.height*ratio);
            }
        }
        calcAverageColor(){

            //get color from ccorner
            // const i4 = ((this.bounds.y * imageData.width) + this.bounds.x) * 4;
            //        let r = pixelArray[i4];
            //        let g = pixelArray[i4+1];
            //        let b = pixelArray[i4+2];
            //        let a = pixelArray[i4+3];
            //        if (r === undefined || Number.isNaN(r))console.log("color avg",[r,g,b,a], i4,this);
            //        return [r,g,b,a];
                   /// get real average
            let r = 0;
            let g = 0;
            let b = 0;
            let a = 0;
            for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width; x++) {
                for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height; y++) {
                    const i4 = ((y * imageData.width) + x) * 4;
                   if (pixelArray[i4+4])
                    {
                   r += pixelArray[i4];
                   g += pixelArray[i4+1];
                   b += pixelArray[i4+2];
                   a += pixelArray[i4+3];
                    // if (r === undefined || Number.isNaN(r)) console.log("color", [r, g, b, a],x,y ,i4,this.bounds, this);
                    }
                }
            }
            const area = this.bounds.width * this.bounds.height;
            r = Math.round(r / area);
            g = Math.round(g / area);
            b = Math.round(b / area);
            a = Math.round(a / area);
            if (r === undefined || Number.isNaN(r)) console.log("color avg", [r, g, b, a], this);
            return [r,g,b,a];
        }
        calcColorVar() {
                if (this.width < 2) return 0;
            // console.log("start", this.coloravg,  variance, this);
            let sum = [0,0,0,0];
            let n = 0;
                for (let x = this.bounds.x; x < this.bounds.x+this.bounds.width;x = x+1){
                    for (let y = this.bounds.y; y<this.bounds.y+this.bounds.height;y++){
                        const i4 = (y * imageData.width + x) * 4;
                        if (pixelArray[i4] !== undefined){
                            n++;
                            sum[0] += Math.pow(pixelArray[i4]-this.coloravg[0],2);
                            sum[1] += Math.pow(pixelArray[i4 + 1] - this.coloravg[1],2);
                            sum[2] += Math.pow(pixelArray[i4 + 2]-this.coloravg[2],2);
                            sum[3] += Math.pow(pixelArray[i4 + 3] - this.coloravg[3],2);
                            // if (sum[0] === undefined || Number.isNaN(sum[0])){ // console.log('sum undefined', x,y,i4,this.bounds,this);  // }
                        }
                    }
                }
            const area = n;
            let varSum = 0;
            
            sum.forEach((color) => {
                varSum += color/area;
            });
            const variance = varSum / 4;
                
            
            const score = variance/ ((imageData.width * imageData.height )/ area) ;
            // console.log(score, this.coloravg, sum, area, variance, this);
            //if (score === Infinity || Number.isNaN(score)){// console.log("nan prob",score, this.coloravg, sum, area, variance, this);}
            return score;


         }
        getIndex(x,y){
            let index = -1;
            this.nodes.forEach( (node, idx) =>{
                if (node.bounds.x < x && x < node.bounds.x+node.bounds.width){
                    // console.log("inside x bounds of", node.bounds.x, node.bounds.x+node.bounds.width);
                    if ( node.bounds.y < y && y < node.bounds.y+node.bounds.height){
                        // console.log("inside y bounds of", node.bounds.y, node.bounds.y + node.bounds.height);
                        index = idx;
                        
                        // return index;
                        // console.log("shouldnt see this");
                    }
                }
            });
            // if (index === -1) //console.log('get index returning -1: x,y this=', x, y, this);
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



        split() {
            
            // console.log(this.bounds);
            if (this.bounds.width < blockSize || this.bounds.height < blockSize){
                // console.log("split below 1 width", this);
                this.variance = 0;
                return false;
            }
            devisions++;
            divisionsNumberEl.innerText = `devisions: ${devisions} number of nodes:${1+4*devisions} bottom-level nodes${1+3*devisions}`
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

            // console.log('split', this);
            return this;
        }

        splitChildren() {
            // console.log("splitchildren", this);
            this.nodes.forEach((quadNode) => {
                quadNode.split(quadNode);
            });
        }

        recusiveSplit(QuadNode) {
            // console.log('rec split', this);
            if(QuadNode.split()){
                QuadNode.nodes.forEach(function (node, index) {
            
                    // console.log("tt qt",timeoutType==='3');
                    if (node.nextWidth >= blockSize && node.nextWidth >= 1 && node.nextHeight >=1) {
                        if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), node.level*devisions * 10)); }
                        else if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                        else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 100 + devisions / 20))); }
                        else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level) * 100 + index * devisions / 20))); }
                    }                                                                            
                });
            }
        }
        splitByVar(parentNode){
            
            function splitBV(){
                let counter =0;
                const a = setInterval(()=>{
                    counter++;
                    let hvn = parentNode.getHighestVarNode();
                    if (hvn.variance < .0000001) clearInterval(a);
                    hvn.node.split();
                    
                },.001);
                timeOutes.push(a);
            }
            splitBV();
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
    
        // console.log('quadtreemaker', this);
         if (this.tree) {
             //  console.log("after tree nodes", this.tree);
             this.tree.use = false;
         }
        this.tree = new this.Quadtree(initialBounds);
         byVar ? this.tree.splitByVar(this.tree) : this.tree.recusiveSplit(this.tree);
        // this.tree.split();
        // this.tree.splitChildren();

        

        function quadClickSplit(tree){
            return (e)=>{
                // console.log("getIndex in handler", tree.GetNode(e.layerX,e.layerY) );
            if (tree.use === true){
                const node = tree.GetNode(e.layerX, e.layerY);
            if (node) node.split(); 
            }
        };}

        // console.log(context.canvas.removeEventListener('click', quadClickSplit(this.tree)));
         context.canvas.addEventListener('click', quadClickSplit(this.tree));
    
    }
}


/* harmony default export */ __webpack_exports__["a"] = (QuadtreeMaker);

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
            }, 1000 + (x + y * 600) / 100));
        }


    }
}

/***/ })
/******/ ]);