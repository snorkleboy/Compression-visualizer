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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__blockCompress_js__ = __webpack_require__(2);



document.addEventListener("DOMContentLoaded", function () {
    // console.log(QuadtreeMaker);
    const imagereader = new ImageReader();
    const img = new Image();
    const imgForm = document.getElementById('imageUrlSubmit');
    // console.log(imgForm);
    imgForm.addEventListener('click', function (event) {
        event.preventDefault();
        const imgURl = document.getElementById('imageUrlInput').value;
        img.src = imgURl;
        console.log('img', imgURl, img);
        img.crossOrigin = "";
        img.onload = () => imagereader.receiveImage(img);

    });
});
class ImageReader{
    constructor(){
        // console.log(that, that());
    }
    receiveImage(img){
        console.log("image recieved", img);
        this.resultCanvas = document.getElementById('result');
        //turn off anti aliasing to see pixels
        this.resultCtx = this.resultCanvas.getContext('2d');
        this.resultCtx.imageSmoothingEnabled = false;
        this.resultCanvas.width = img.width > 1200 ? 1200 : img.width;
        this.resultCanvas.height = img.height > 1200 ? 1200: img.height;
        this.resultCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);

        //setup reset button
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', e => {
            this.resultCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height)
            this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        });

        //setup color picker
        this.menuColor = document.getElementById('menu-color');
        this.resultCanvas.addEventListener('mousemove', handleMouseMove(this.resultCtx, this.menuColor));
        
        this.makeHandlers();
    }
    makeHandlers(){
        // console.log('make handlers', this);

        ///
        //setup clearbutton
        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', e => this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height));

        ///
        //setup niaveCommression button and handler
        this.niaveButton = document.getElementById('niave');
        const newNiaveButton = this.niaveButton.cloneNode(true);
        // console.log(this.niaveButton, newNiaveButton);
        this.niaveButton.parentNode.replaceChild(newNiaveButton, this.niaveButton);
        this.niaveButton = newNiaveButton;
        this.niaveButton.addEventListener('click', ()=>{

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
            });
        


        //quad tree testing
        this.quadtreeMaker = new __WEBPACK_IMPORTED_MODULE_0__quadtree_js__["a" /* default */]();
        const quadTreeSimpleButton = document.getElementById('quadtree');
        const newquadTreeSimpleButton = quadTreeSimpleButton.cloneNode(true);
        quadTreeSimpleButton.parentNode.replaceChild(newquadTreeSimpleButton, quadTreeSimpleButton);
        newquadTreeSimpleButton.addEventListener('click', handleQuadTreeClick(this.imageData, this.resultCtx, this.quadtreeMaker));
    }

}



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

function handleQuadTreeClick(imageData, context, quadtreeMaker){
    return (e) => {
        e.preventDefault();
        const blockSize = parseInt(document.getElementById('quadTreeBlockSize').value);
        const circleBool = document.getElementById('quadTreeCircle').checked;
        const traverseType = document.getElementById('QuadTreeTraverse').value;

        if (traverseType > 4 || traverseType < 0) traverseType = 2;
        // console.log('blocksize', blockSize);
        // console.log('circlebool', circleBool);
        // console.log('handleclickQUad', blockSize, circleBool);
        
        //make new canvas to get rid of event handlers
        

        quadtreeMaker.makeQuadTree(imageData, context, blockSize, circleBool, traverseType);
        //  new QuadtreeMaker(imageData, context, blockSize, circleBool, traverseType);
    };
}






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

//bound is {x:,y:,width:,height:} in pixels(4 index values per pixel);
 class QuadtreeMaker {
    constructor(){}


     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = 'fun2'){
         console.log("makequadtree", this);
        if (this.tree) {
            console.log("delete tree nodes", delete this.tree, this);
            console.log("after tree nodes", this);
        }
         
        //create stop button
        const timeOutes = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => timeOutes.forEach((to => clearTimeout(to))));

        console.log('qtmaker start', circleBool, blockSize, imageData, context);

        let devisions = 0;
        let highestVar = 0;
        const pixelArray = imageData.data;
        const initialBounds = { x: 0, y: 0, width: imageData.width, height: imageData.height };


        this.Quadtree = class Quadtree{
            constructor(bounds, level) {
            // console.log("quadtree node");

            this.bounds = bounds;
            this.nextWidth = Math.round(this.bounds.width / 2);
            this.nextHeight = Math.round(this.bounds.height / 2);
            this.mpX = bounds.x + Math.round(bounds.width / 2);
            this.mpY = bounds.y + Math.round(bounds.height / 2);
            
            const i4 = (this.mpY * imageData.width * 4) + this.mpX * 4;
            
            //
            /// maybe refactor following into this.render()?
            //        
            this.color = 'rgba(' + pixelArray[i4] + ', ' + pixelArray[i4 + 1] +
                ', ' + pixelArray[i4 + 2] + ', ' + (pixelArray[i4 + 3]) + ')';
            this.variance = 0;
            this.level = level || 0;
            this.bounds = bounds;
            this.nodes = [];


            context.fillStyle = this.color;
            if (circleBool) {
                context.beginPath();
                context.arc(this.mpX, this.mpY, (bounds.width), 0, 2 * Math.PI, false);
                context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fill();
            } else {

                context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
            }



        }

        // takes in xy and determines which child that x,y would be bounded by. 

        getIndex(x,y){
            let index = -1;
            this.nodes.forEach( (node, idx) =>{
                if (node.bounds.x < x && x < node.bounds.width+node.bounds.x){
                    // console.log("inside x bounds of", node.bounds.x, node.bounds.x+node.bounds.width);
                    if ( node.bounds.y < y && y < node.bounds.y+node.bounds.height){
                        // console.log("inside y bounds of", node.bounds.y, node.bounds.y + node.bounds.height);
                        index = idx;
                        
                        // console.log("shouldnt see this");
                    }
                }
            });
            if (index === -1) console.log('get index returning -1: x,y this=', x, y, this);
            return index;
            // none of the none of the nodes contain the x,y probably shouldnt ever happen

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

        calcColorVar () {
            // this.bounds = bounds;
            // this.nextWidth = Math.round(this.bounds.width / 2);
            // this.nextHeight = Math.round(this.bounds.height / 2);
            // this.mpX = bounds.x + Math.round(bounds.width / 2);
            // this.mpY = bounds.y + Math.round(bounds.height / 2);

            // const i4 = (this.mpY * imageData.width * 4) + this.mpX * 4;
        }

        split() {
            // console.log("split", this);
            if (this.bounds.width === 1 || this.bounds.height===1){
                return -1;
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
            QuadNode.split().nodes.forEach(function (node, index) {
                devisions++;
                if (node.nextWidth >= blockSize) {
                    if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), devisions * 10)); }
                    else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                    else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 100 + devisions / 20))); }
                    else if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level + index) * 500))); }
                }
            });
        }
    };
    




        //start node and 
        console.log('quadtreemaker', this);
        this.tree = new this.Quadtree(initialBounds);

        // tree.split();
        // tree.splitChildren();
        // console.log("first node", tree);
        
        this.tree.recusiveSplit(this.tree);

        
        // console.log("node after split", tree);
        

         function quadClickSplit(tree){
            return (e)=>{
                // console.log('clickevent, quadtree', e.layerX, e.layerY, tree);
                console.log("getIndex in handler", tree.GetNode(e.layerX,e.layerY) );

            const node = tree.GetNode(e.layerX, e.layerY);
            if (node) node.split(); 
            // console.log("getNode x,y node",e.layerX, e.layerY,  tree.GetNode(e.layerX, e.layerY));
        };}

        // console.log(context.canvas.removeEventListener('click', quadClickSplit));
         context.canvas.addEventListener('click', quadClickSplit(this.tree));
    
    }
}


/* harmony default export */ __webpack_exports__["a"] = (QuadtreeMaker);

/***/ }),
/* 2 */
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