import QuadtreeMaker from './quadtree.js';
import NiaveCompress from './blockCompress.js';

document.addEventListener("DOMContentLoaded", function () {
    
    // console.log(QuadtreeMaker);
    const imagereader = new ImageReader();
    let img = new Image();
    const time = new Date().getTime();
    img.src = time % 2 === 0 ? 'https://i.imgur.com/zkc1tq7.jpg' : 'https://i.imgur.com/cMMwsek.jpg' + time;
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
        this.quadtreeMaker = new QuadtreeMaker();
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

    NiaveCompress(this.imageData, this.resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
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




