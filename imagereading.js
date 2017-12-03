
class ImageReader{
    constructor(img){
        const originalCanvass = document.getElementById('originalCanvass');
        const ctx = originalCanvass.getContext('2d');
        const resultCanvas = document.getElementById('result');
        const resultCtx = resultCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        resultCtx.imageSmoothingEnabled = false;
        
        ctx.drawImage(img,0,0);
        // this.imageData = ctx.getImageData(0, 0, originalCanvass.width, originalCanvass.height);

        // resultCtx.drawImage(originalCanvass, 0, 0);

        this.menuColor = document.getElementById('menu-color');

        originalCanvass.addEventListener('mousemove', handleMouseMove(ctx,this.menuColor).bind(this));

        const niaveButton = document.getElementById('niave');
        niaveButton.addEventListener('click', (e)=>{
            // console.log("this", this);
            this.imageData = ctx.getImageData(0, 0, originalCanvass.width, originalCanvass.height);
            const inY = parseInt(document.getElementById('niaveInputX').value);
            const inX = parseInt(document.getElementById('niaveInputY').value);
            let expand = parseInt(document.getElementById('niaveInputExpand').value);
            const exval = parseFloat(document.getElementById('niaveInputExpandval').value);

            console.log("x,y,e", inY, inX, { x: inX || 10, y: inY || 10 }, expand);
            if (expand>4 || expand<1){
                expand = 1;
            }
           
            this.NiaveCompress(this.imageData, resultCtx, { x: inX || 10, y: inY || 10 }, expand || 1, exval || 1);
        });
        
    }

    NiaveCompress(imagedata, ctx, blockSize,expand, exval) {
        ctx.clearRect(0, 0, imagedata.width, imagedata.height);
        console.log("there", imagedata, ctx);
        const data = imagedata.data;
        for (let y = 0; y < imagedata.height; y = y + (blockSize.y)){
            for (let x = 0; x < imagedata.width * 4; x = x + (blockSize.x)){
                const i = ((y*imagedata.width) + x)*4;
                // console.log('x,y,i,data', { x: x, y: y },i, data[x + imagedata.width * 4 * y]);
                ctx.fillStyle = 'rgba(' + data[i] + ', ' + data[i+1] +
                 ', ' + data[i+2] + ', ' + (data[i+3]) + ')';

                //standard mode, fillrect of blocksize to color. color is set above to the top left pixel of block
                // defined by x*blocksize,y*blocksize
                if (expand===1){
                    // console.log('expand1', expand)
                    ctx.fillRect(x, y, blockSize.x, blockSize.y);
                    // ctx.fillStyle = 'black';
                    // ctx.fillRect(x, y, blockSize.x, 1);
                    // ctx.fillRect(x, y, 1, blockSize.y);
                
                //doesnt expand, fillrect of 1x1 (single pixel) of color as defined above into an image blocksize smaller.
                //ie if you have a blocksize of 2 the result will be an image half the size
                }else if (expand===2){
                    // console.log('expand2', expand)
                    ctx.fillRect(x/blockSize.x, y/blockSize.y, 1, 1);

                 //doesnt expand, but uses the same x, y coordinate of original image
                // this basically shows which pixel is being selected for each block
                }else if (expand===3){
                    ctx.fillRect(x, y, exval, exval);
                //expands by making a circle of radius=the averge of blocksize.x and blocksize.y, fills with color defined above.
                //the optional expandValue attribute changes how much less than the average the circle is filled by, so larget value means saller circle
                }else if (expand===4){
                    // console.log('expand3', expand)
                    
                    ctx.beginPath();
                    ctx.arc(x, y, (blockSize.x + blockSize.y) / (2 * exval), 0, 2 * Math.PI, false);
                    ctx.fill();
                }

                
            }

        }
    }

}

function handleNiaveCompress(){}

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



document.addEventListener("DOMContentLoaded", function(){
    const img = new Image();
    img.src = 'http://i.imgur.com/8zNVLr6.jpg';
    img.crossOrigin = "";
    img.onload = ()=> new ImageReader(img);
});