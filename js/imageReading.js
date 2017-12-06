import QuadtreeMaker from './quadtree.js';
import NiaveCompress from './blockCompress.js';

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

        this.resultCanvas.width = 1024;
        const ratio = 1024/img.width;
        this.resultCanvas.height = img.height * ratio;
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

                NiaveCompress(this.imageData, this.resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
            });
        


        //quad tree testing
        this.quadtreeMaker = new QuadtreeMaker();
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




