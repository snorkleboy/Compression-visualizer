
document.addEventListener("DOMContentLoaded", function () {
    const imgForm = document.getElementById('imageUrlSubmit');
    console.log(imgForm);
    imgForm.addEventListener('click', function(event){
        event.preventDefault();
        const imgURl = document.getElementById('imageUrlInput').value;
        const img = new Image();
        img.src = imgURl;
        console.log('img',imgURl, img);
        img.crossOrigin = "";
        img.onload = () => new ImageReader(img);
    });
    
});
class ImageReader{
    constructor(img){
        ///
        //get convass that the image is loaded into and a blank canvass that I will put result onto
        const originalCanvass = document.getElementById('originalCanvass');
        const ctx = originalCanvass.getContext('2d');
        const resultCanvas = document.getElementById('result');
        const resultCtx = resultCanvas.getContext('2d');
        ///
        //turn off anti aliasing to see pixels
        ctx.imageSmoothingEnabled = false;
        resultCtx.imageSmoothingEnabled = false;
        ///
        //draw original image
        ctx.drawImage(img,0,0);
        ///
        //draw original image onto result canvass
        // resultCtx.drawImage(originalCanvass, 0, 0);
        ///
        //setup color picker
        const menuColor = document.getElementById('menu-color');
        originalCanvass.addEventListener('mousemove', handleMouseMove(ctx,menuColor).bind(this));
        ///
        //setup niaveCommression button and handler
        //on click gets imageData, value of inputs, validates input, and the calls niave compress of this.imageData, resultCtx, and input
        const niaveButton = document.getElementById('niave');
        niaveButton.addEventListener('click', (e) => {
            //
            //get pixel data from original image and put into this.imageData
            this.imageData = ctx.getImageData(0, 0, originalCanvass.width, originalCanvass.height);
            ///
            //get inputs
            let inX = parseInt(document.getElementById('niaveInputX').value);
            let inY = parseInt(document.getElementById('niaveInputY').value);
            let expand = parseInt(document.getElementById('niaveInputExpand').value);
            let exval = parseFloat(document.getElementById('niaveInputExpandval').value);           
            //
            //validations           
            if (expand>5 || expand<1){
                expand = 1;
            }
            if (inY < 1)inY = 1;
            if (inX < 1) inY = 1;           
            ///
            //call compression
            console.log("x,y,e", inY, inX, { x: inX || 10, y: inY || 10 }, expand);
            resultCtx.clearRect(0, 0, resultCanvas.width, resultCanvas.height);
            this.NiaveCompress(this.imageData, resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
        });
        
        console.log("start");
        //quad tree testing
        this.imageData = ctx.getImageData(0, 0, originalCanvass.width, originalCanvass.height);
        QuadtreeContainer(this.imageData,resultCtx);
    }

    NiaveCompress(imagedata, ctx, blockSize,expand, exval) {
        // ctx.clearRect(0, 0, imagedata.width, imagedata.height);
        // console.log("niavecompress", imagedata, ctx);
        const data = imagedata.data;
        //set/reset canvas width and height by blocksize. 
        
        if (expand === 2){
            ctx.canvas.width = imagedata.width / blockSize.x;
            ctx.canvas.height = imagedata.height / blockSize.y;
        }else{
            ctx.canvas.width = imagedata.width;
            ctx.canvas.height = imagedata.height;
        }
        //delete previously made svg elements
        if (expand === 5){
            const myNode = document.getElementById('svgOne');
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
        }

        

        for (let y = 0; y < imagedata.height; y = y + (blockSize.y)){
            for (let x = 0; x < imagedata.width; x = x + (blockSize.x)){
                const interval = setInterval( ()=>{

                    const i = ((y*imagedata.width) + x)*4;
                    // console.log('x,y,i,data', { x: x, y: y },i, data[x + imagedata.width * 4 * y]);
                    ctx.fillStyle = 'rgba(' + data[i] + ', ' + data[i+1] +
                    ', ' + data[i+2] + ', ' + (data[i+3]) + ')';
                    

        
                    //standard mode, fillrect of blocksize to color. color is set above to the top left pixel of block
                    // defined by x*blocksize,y*blocksize
                    if (expand===1){
                        // (imagedata.height-y) type stuff to rotate
                        ctx.fillRect(x,y, blockSize.x, blockSize.y);
                        // ctx.fillStyle = 'black';
                        // ctx.fillRect(x, y, blockSize.x, 1);
                        // ctx.fillRect(x, y, 1, blockSize.y);
                    
                    //doesnt expand, fillrect of 1x1 (single pixel) of color as defined above into an image blocksize smaller.
                    //ie if you have a blocksize of 2 the result will be an image half the size
                    //the canvass id resized before the for loop to make the image downloadable as a small image
                    }else if (expand===2){
                        
                        ctx.fillRect(x/blockSize.x, y/blockSize.y, 1, 1);

                    //doesnt expand, but uses the same x, y coordinate of original image
                    // this basically shows which pixel is being selected for each block
                    }else if (expand===3){

                        ctx.fillRect(x, y, exval, exval);
                    //expands by making a circle of radius=the averge of blocksize.x and blocksize.y, fills with color defined above.
                    //the optional expandValue attribute changes how much less than the average the circle is filled by, so larget value means saller circle
                    }else if (expand===4){     
                        ctx.beginPath();
                        ctx.arc(x, y, (blockSize.x + blockSize.y) / (2 * exval), 0, 2 * Math.PI, false);
                        ctx.fill();
                    }else if (expand ===5){
                        // console.log('here')
                        let svgns = "http://www.w3.org/2000/svg";
                        let rect = document.createElementNS(svgns, 'rect');
                        rect.setAttributeNS(null, 'x', x*5);
                        rect.setAttributeNS(null, 'y', y*5);
                        rect.setAttributeNS(null, 'height', 5*blockSize.y);
                        rect.setAttributeNS(null, 'width', 5*blockSize.x);
                        rect.setAttributeNS(null, 'fill', ctx.fillStyle);
                        document.getElementById('svgOne').appendChild(rect);
                    }
                    clearInterval(interval);                
                },1000+(x*10+y*imagedata.width)/100);}
            

        }
    }

}


function handleMouseMove(ctx, element){
    return ((event) => {
        const x = event.layerX;
        const y = event.layerY;
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


//bound is {x:,y:,width:,height:} in pixels(4 index values per pixel);
function QuadtreeContainer(imageData, context){
    
    this.that = 5;
    console.log("here", this);
    const devisions = 0;
    const pixelArray = imageData.data;
    const initialBounds = {x:0,y:0,width:imageData.width, height:imageData.height};
 
    function Quadtree(bounds,level) {
        this.bounds = bounds;
        this.mpX = bounds.x + bounds.width/2;
        this.mpY = bounds.y + bounds.height/2;
        this.i4 = ((this.mpY * imageData.width) + this.mpX) * 4; 
        this.Color = 0;
        this.variance = 0;
        this.level = level || 0;
        this.bounds = bounds;
        this.nodes = [];
        this.nextWidth = this.bounds.width / 2;
        this.nextHeight = this.bounds.height / 2;
        context.fillStyle = 'rgba(' + pixelArray[this.i4] + ', ' + pixelArray[this.i4 + 1] +
            ', ' + pixelArray[this.i4 + 2] + ', ' + (pixelArray[this.i4 + 3]) + ')';
        context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
        context.fillRect(bounds.x,bounds.y,bounds.width,bounds.height);
        console.log(this);


        ///if (width <= 1 || height <= 1 ) it is a single pixel and should not try to make more nodes...
        // probaby should figure omething out before I start getting color error
    }
    Quadtree.prototype.split = function (){
        console.log("split", this);
        
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
            y: this.bounds.y + this.mpY,
            
        }, this.level+1);

        this.nodes[3] = new Quadtree({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.bounds.x + this.mpX,
            y: this.bounds.y + this.mpY,
            
        }, this.level+1);

        console.log('split', this);
        return this;
    };  
    Quadtree.prototype.splitChildren = function () {
        console.log("splitchildren", this);
        this.nodes.forEach((quadNode) => {
            quadNode.split(quadNode);
        });
    };
    Quadtree.prototype.recusiveSplit = function(QuadNode) {
        console.log('rec split', this);
        QuadNode.split().nodes.forEach( function(node){

            if (node.nextWidth > 10 ) node.recusiveSplit(node);
        });
    };
    let a = new Quadtree(initialBounds);
    console.log(a);
    a.recusiveSplit(a); 
    // a.splitChildren();

    

    


}