import QuadtreeMaker from './quadtree.js';
import NiaveCompress from './blockCompress.js';
import Demo from './demoRunner';
const urls = [
    // 'https://i.imgur.com/drGvplW.jpg',
    // 'https://i.imgur.com/zkc1tq7.jpg',
    'https://i.imgur.com/cMMwsek.jpg',
    // 'https://i.imgur.com/5BMFvAC.jpg'
];
document.addEventListener("DOMContentLoaded", function () {
    const imageReaderController = new ImageReaderController();
    const time = new Date().getTime();
    imageReaderController.getImage(urls[time % urls.length] + `?${time}`);
    
    const imgForm = document.getElementById('imageUrlSubmit');
    imgForm.addEventListener('click', function (event) {
        event.preventDefault();
        const imgURl = document.getElementById('imageUrlInput').value;
        imageReaderController.getImage(imgURl + `?${new Date().getTime()}`);
    });

    const demoButton = document.getElementById('demoButton');
    demoButton.addEventListener('click', function () {
        Demo.toggle();
    });
});

class ImageReaderController {
    constructor() {
        this.setup();
    }
    getImage(url){
        let img = new Image();
        img.src = url
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            this.receiveImage(img);
        };
    }
    setup() {

        this.stopButton = document.getElementById('stopQuads');

        this.resetButton = document.getElementById('reset');   
        this.resetButton.addEventListener('click', e => {
            this.stopButton.click();
            this.resultCtx.drawImage(this.img, 0, 0, this.img.width, this.img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height)
            this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        });

        this.resultCanvas = document.getElementById('result');
        this.resultCanvas.addEventListener('mousemove', this.handleMouseMove(this.resultCtx, this.menuColor));

        this.menuColor = document.getElementById('menu-color');

        this.clearButton = document.getElementById('clear');
        this.clearButton.addEventListener('click', e => this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height));

        this.resultCtx = this.resultCanvas.getContext('2d');
        this.resultCtx.imageSmoothingEnabled = false;
        
        this.quadTreeSimpleButton = document.getElementById('quadtree');
        this.quadTreeSimpleButton.addEventListener('click', this.handleQuadTreeClick);

        this.divisionsNumberEl = document.getElementById('divisionsNumber');

        this.blockChopButton = document.getElementById('blockChopToggle');
        this.blockChopButton.addEventListener('click', this.blockChopMenuClick);
        this.niaveButton = document.getElementById('niave');
        this.niaveButton.addEventListener('click', this.niaveCompressClick);


        this.quadTreeButton = document.getElementById('quadTreeToggle');
        this.quadTreeButton.addEventListener('click', this.quadTreeMenuClick);

        //grey out traversetype on SplitByColorVar
        this.varCheckbox = document.getElementById('quadTreeVariance');
        this.traverseTypeSelect = document.getElementById('QuadTreeTraverse');
        if (this.varCheckbox.checked) {
            this.traverseTypeSelect.classList.add('greyed');
            this.traverseTypeSelect.disabled = true;
        }
        this.varCheckbox.addEventListener('click', this.changeTraverseType);

        this.expandTypeSelect = document.getElementById('niaveInputExpand');
        this.expandTypeSelect.addEventListener('change', this.changeExpandType);

        this.quadtreeMaker = new QuadtreeMaker(this.resultCtx);

    }
    blockChopMenuClick() {
        const otherContainer = document.getElementById('qt');
        const container = document.getElementById('bc');
        container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
        if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
    }
    quadTreeMenuClick() {
        const otherContainer = document.getElementById('bc');
        const container = document.getElementById('qt');
        container.classList.contains('collapse') ? container.classList.remove('collapse') : container.classList.add('collapse');
        if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
    }
    changeTraverseType() {
        // const traverseTypeSelect = document.getElementById('QuadTreeTraverse');
        if (this.varCheckbox.checked) {
            this.traverseTypeSelect.classList.add('greyed');
            this.traverseTypeSelect.disabled = true;
        } else {
            this.traverseTypeSelect.classList.remove('greyed');
            this.traverseTypeSelect.disabled = false;
        }
    }
    changeExpandType() {
        const exapandAmountInput = document.getElementById('niaveInputExpandval');
        if (this.expandTypeSelect.value <= 2) {
            exapandAmountInput.classList.add('greyed');
            exapandAmountInput.disabled = true;
        } else if (this.expandTypeSelect.value >= 3) {
            exapandAmountInput.classList.remove('greyed');
            exapandAmountInput.disabled = false;
        }
    }
    handleMouseMove(ctx, element) {
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
    receiveImage(img) {
        this.img = img;
        this.stopButton.click();
        this.divisionsNumberEl.innerText = '';
        const htmlWidth = 1024;
        this.resultCanvas.width = htmlWidth;
        const ratio = htmlWidth / img.width;
        this.resultCanvas.height = img.height * ratio;
        this.resultCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.imageData = this.resultCtx.getImageData(0, 0, this.resultCanvas.width, this.resultCanvas.height);
    }
    niaveCompressClick(e) {
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

        NiaveCompress(this.imageData, this.resultCtx, {
            x: inX || 10,
            y: inY || 10
        }, expand || 1, exval || 1);
    }

    handleQuadTreeClick() {
        const imageData = this.imageData,
            context = this.resultCtx, 
            quadtreeMaker=this.quadtreeMaker
        
        stopButton.click();
        e.preventDefault();
        let ratio = parseFloat(document.getElementById('quadTreeSize').value);
        let blockSize = parseInt(document.getElementById('quadTreeBlockSize').value);
        const circleBool = document.getElementById('quadTreeCircle').checked;
        const traverseType = document.getElementById('QuadTreeTraverse').value;
        const splitbyVariance = document.getElementById('quadTreeVariance').checked;

        blockSize = blockSize >= 1 ? blockSize : 1;
        ratio = ratio > .001 ? ratio : 1;

        quadtreeMaker.makeQuadTree(imageData, blockSize, circleBool, traverseType, splitbyVariance, ratio);
        //  new QuadtreeMaker(imageData, context, blockSize, circleBool, traverseType);
    }

}











