
class ImageReader{
    constructor(img){
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const resultCanvas = document.getElementById('result');
        const resultCtx = resultCanvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        resultCtx.imageSmoothingEnabled = false;
        
        ctx.drawImage(img,0,0);
        this.imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // resultCtx.putImageData(this.imageData, 0, 0);

        this.menuColor = document.getElementById('menu-color');

        canvas.addEventListener('mousemove', handleMouseMove(ctx,this.menuColor).bind(this));

        console.log("here");
        this.iterateThroughColors(this.imageData, resultCtx,(10));
    }

    iterateThroughColors(imagedata, ctx, blockSize) {
        console.log("there", imagedata, ctx);
        const data = imagedata.data;
        for (let y = 0; y < imagedata.height; y = y + (blockSize)){
            for (let x = 0; x < imagedata.width * 4; x = x + (blockSize)){
                const i = ((y*imagedata.width) + x)*4;
                console.log('x,y,i,data', { x: x, y: y },i, data[x + imagedata.width * 4 * y]);


                ctx.fillStyle = 'rgba(' + data[i] + ', ' + data[i+1] +
                 ', ' + data[i+2] + ', ' + (data[i+3]) + ')';

                
                ctx.fillRect(x, y, blockSize, blockSize);

                // ctx.fillStyle = 'black';
                // ctx.fillRect(x,y,(200),(1));
                // ctx.fillRect(x,y,(1),(200));
            }

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
// const imagedata = canvas.toDataURL('/myimage');
// makeDownload(imagedata, 'download');
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