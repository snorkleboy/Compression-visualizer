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

    const blockChopButton = document.getElementById('blockChop');
    blockChopButton.addEventListener('click', function(e){
        const container = document.getElementById('bc');
        // console.log(container);

        container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
        // console.log(container);
    });

    const quadTreeButton = document.getElementById('quadTree');
    quadTreeButton.addEventListener('click', function(e){
        const container = document.getElementById('qt');
        // console.log(container);

        container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
        // console.log(container);
    });

});
class ImageReader{
    constructor(){
        // console.log(that, that());
    }
    receiveImage(img){
        console.log("image recieved", img);
        this.img=img;
        this.resultCanvas = document.getElementById('result');
        //turn off anti aliasing to see pixels
        this.resultCtx = this.resultCanvas.getContext('2d');
        this.resultCtx.imageSmoothingEnabled = false;
        const htmlHeight = 680;
        this.resultCanvas.height = htmlHeight;
        const ratio = htmlHeight/img.height;
        this.resultCanvas.width = img.width * ratio;
        this.resultCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height);
        
        this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);

        //setup reset button
        //
        //
        //move to window scope and have it remake entire ImageREader class.
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
        const splitbyVariance = document.getElementById('quadTreeVariance').checked;
        if (traverseType > 4 || traverseType < 0) traverseType = 2;
        // console.log('blocksize', blockSize);
        // console.log('circlebool', circleBool);
        // console.log('handleclickQUad', blockSize, circleBool);
        
        //make new canvas to get rid of event handlers
        console.log('splitbyvar',splitbyVariance);

        quadtreeMaker.makeQuadTree(imageData, context, blockSize, circleBool, traverseType, splitbyVariance);
        //  new QuadtreeMaker(imageData, context, blockSize, circleBool, traverseType);
    };
}






/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

 class QuadtreeMaker {
    constructor(){}
     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = '2', byVar = false ){

        const timeOutes = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => timeOutes.forEach((to => clearTimeout(to))));
        let devisions = 0;
        const pixelArray = imageData.data;
        const initialBounds = { x: 0, y: 0, width: imageData.width, height: imageData.height };
        console.log("QTM", imageData, context.canvas,initialBounds);

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
                context.arc(this.mpX, this.mpY, (bounds.width), 0, 2 * Math.PI, false);
                context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fill();
            } else {
                context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
                context.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
            }
        }
        calcAverageColor(){

            // const mpX = this.bounds.x + this.bounds.width/2;
            // const mpY = this.bounds.y + this.bounds.height/2;
            // const i4 = ((this.mpY * imageData.width) + this.mpX) * 4;
            //        let r = pixelArray[i4];
            //        let g = pixelArray[i4+1];
            //        let b = pixelArray[i4+2];
            //        let a = pixelArray[i4+3];
            //        if (r === undefined)console.log("color avg",[r,g,b,a], i4,this);
            //        return [r,g,b,a];
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
                    if (r === undefined || Number.isNaN(r)) console.log("color", [r, g, b, a],x,y ,i4,this.bounds, this);}
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
               for (let x = this.bounds.x; x < this.bounds.x+this.bounds.width-4;x = x+1){
                for (let y = this.bounds.y; y<this.bounds.y+this.bounds.height-4;y++){
                    const i4 = (y * imageData.width + x) * 4;
                    sum[0] += Math.pow(pixelArray[i4]-this.coloravg[0],2);
                    sum[1] += Math.pow(pixelArray[i4 + 1] - this.coloravg[1],2);
                    sum[2] += Math.pow(pixelArray[i4 + 2]-this.coloravg[2],2);
                    sum[3] += Math.pow(pixelArray[i4 + 3] - this.coloravg[3],2);
                    if (sum[0] === undefined || Number.isNaN(sum[0]))
                        console.log('sum undefined', x,y,i4,this.bounds,this);
                    }
                }
            const area = this.bounds.width * this.bounds.height;
            let varSum = 0;
            
            sum.forEach((color) => {
                varSum += color/area;
            });
            const variance = varSum / 4;
                
            
            const score = variance/ ((imageData.width * imageData.height )/ area) ;
            // console.log(score, this.coloravg, sum, area, variance, this);
            if (score === Infinity || Number.isNaN(score)){
                console.log("nan prob",score, this.coloravg, sum, area, variance, this);
            }
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
                        
                        // console.log("shouldnt see this");
                    }
                }
            });
            if (index === -1) console.log('get index returning -1: x,y this=', x, y, this);
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
            if (this.bounds.width === 1 || this.bounds.height===1){
                console.log("split below 1 width", this);
                this.variance = 0;
                return -1;
            }
            devisions++;
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
        
                // console.log(leaves);
                if (node.nextWidth >= blockSize && node.nextWidth >= 2) {
                    if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), node.level*devisions * 10)); }
                    else if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                    else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 100 + devisions / 20))); }
                    else if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level + index) * 500))); }
                }
            });
        }
        splitByVar(parentNode){
            
            function splitBV(){
                let counter =0;
                const a = setInterval(()=>{
                    counter++;
                    let hvn = parentNode.getHighestVarNode();
                    if (hvn.variance < 1) clearInterval(a);
                    hvn.node.split();
                    
                },devisions);
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
                console.log("getIndex in handler", tree.GetNode(e.layerX,e.layerY) );
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