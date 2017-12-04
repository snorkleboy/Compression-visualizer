
document.addEventListener("DOMContentLoaded", function () {
    const imagereader = new ImageReader();
    const imgForm = document.getElementById('imageUrlSubmit');
    console.log(imgForm);
    imgForm.addEventListener('click', function (event) {
        event.preventDefault();
        const imgURl = document.getElementById('imageUrlInput').value;
        const img = new Image();
        img.src = imgURl;
        console.log('img', imgURl, img);
        img.crossOrigin = "";
        img.onload = () => imagereader.receiveImage(img);

    });
});
class ImageReader{
    constructor(){


    }
    receiveImage(img){

        this.resultCanvas = document.getElementById('result');
        //turn off anti aliasing to see pixels
        this.resultCtx = this.resultCanvas.getContext('2d');
        this.resultCtx.imageSmoothingEnabled = false;
        this.resultCanvas.width = img.width > 1200 ? 1200 : img.width;
        this.resultCanvas.height = img.height > 1200 ? 1200: img.height;
        this.resultCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.makeHandlers();
    }
    makeHandlers(){
        console.log('make handlers', this);
        //setup color picker
        this.menuColor = document.getElementById('menu-color');
        this.resultCanvas.addEventListener('mousemove', handleMouseMove(this.resultCtx, this.menuColor));
        ///
        //setup clearbutton
        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', e => this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height));
        //setup reset button
        this.resetButton = document.getElementById('reset');
        this.resetButton.addEventListener('click', e => {
            this.resultCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height)
            this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        });
        ///
        //setup niaveCommression button and handler
        this.niaveButton = document.getElementById('niave');
        this.niaveButton.addEventListener('click', (e) => {

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
            console.log("x,y,e", inY, inX, { x: inX || 10, y: inY || 10 }, expand);

            NiaveCompress(this.imageData, this.resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
        });

        //quad tree testing
        const quadTreeSimpleButton = document.getElementById('quadtree');
        quadTreeSimpleButton.addEventListener('click', handleQuadTreeClick(this.imageData, this.resultCtx));
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

function handleQuadTreeClick(imageData, context){
    return (e) => {
        e.preventDefault();
        const blockSize = parseInt(document.getElementById('quadTreeBlockSize').value);
        const circleBool = document.getElementById('quadTreeCircle').checked;
        const traverseType = document.getElementById('QuadTreeTraverse').value;

        if (traverseType > 4 || traverseType < 0) traverseType = 2;
        console.log('blocksize', blockSize);
        console.log('circlebool', circleBool);
        console.log('handleclickQUad', blockSize, circleBool);
    
        QuadtreeMaker(imageData, context, blockSize, circleBool, traverseType);
    };
}

function NiaveCompress(imagedata, ctx, blockSize, expand, exval) {
    //setup stop button
    const timeOuts = [];
    const stopNiaveButton = document.getElementById('stopNiave');
    stopNiaveButton.addEventListener('click', e => timeOuts.forEach( to => clearTimeout(to) ));

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
            timeOuts.push( setTimeout(() => {

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
            }, 1000 + (x+y*600) / 100));
        }


    }
}


//bound is {x:,y:,width:,height:} in pixels(4 index values per pixel);
function QuadtreeMaker(imageData, context, blockSize, circleBool, timeoutType ='fun2'){
    console.log(timeoutType);
     //create stop button
    const timeOutes = [];
    const stopButton = document.getElementById('stopQuads');
    stopButton.addEventListener('click', e => timeOutes.forEach( (to=>clearTimeout(to)) ));
    
    console.log('qtc',  circleBool, blockSize, imageData, context);
    
    let devisions = 0;
    const pixelArray = imageData.data;
    const initialBounds = {x:0,y:0,width:imageData.width, height:imageData.height};
 
    //start node and 
    //enable click split
    let a = new Quadtree(initialBounds);
    context.canvas.addEventListener('click', (e) => {
        console.log('clickevent, quadtree', e.layerX, e.layerY, e,a);
    });

    function Quadtree(bounds,level) {
        // console.log('quadcon', pixelArray);

        this.bounds = bounds;
        this.nextWidth = Math.round(this.bounds.width / 2);
        this.nextHeight = Math.round(this.bounds.height / 2);
        this.mpX = bounds.x + Math.round(bounds.width/2);
        this.mpY = bounds.y + Math.round(bounds.height/2);
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
        if (circleBool){
            context.beginPath();
            context.arc(this.mpX, this.mpY, (bounds.width), 0, 2 * Math.PI, false);
            context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
            context.fill();
        }else{

            context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
            context.fillRect(bounds.x,bounds.y,bounds.width,bounds.height);
        }
        


    }
    Quadtree.prototype.calcColorVar = function () {

    };
    Quadtree.prototype.split = function (){
        // console.log("split", this);
        
        this.nodes[0]= new Quadtree({
            width: this.nextWidth,
            height: this.nextHeight,
            x:this.bounds.x,
            y:this.bounds.y,
            
        },this.level+1);

        this.nodes[1] = new Quadtree({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.mpX,
            y: this.bounds.y,
            
        }, this.level+1);

        this.nodes[2] = new Quadtree({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.bounds.x,
            y: this.mpY,
            
        }, this.level+1);

        this.nodes[3] = new Quadtree({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.mpX,
            y: this.mpY,
            
        }, this.level+1);

        // console.log('split', this);
        return this;
    };  
    Quadtree.prototype.splitChildren = function () {
        // console.log("splitchildren", this);
        this.nodes.forEach((quadNode) => {
            quadNode.split(quadNode);
        });
    };
    Quadtree.prototype.recusiveSplit = function(QuadNode) {
        // console.log('rec split', this);
        QuadNode.split().nodes.forEach( function(node, index){
            devisions++;
            if (node.nextWidth >= blockSize){
                if (timeoutType === '1'){ timeOutes.push(setTimeout(() => node.recusiveSplit(node), devisions*10));}
                else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node),10 )); }
                else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 100 + devisions/20)));}
                else if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 500))); }
            }
        });
    };



    
    // console.log(a);
    a.recusiveSplit(a); 
    // a.split();
    // a.splitChildren();
}