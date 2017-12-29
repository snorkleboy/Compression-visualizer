import { debug } from "util";


 class QuadtreeMaker {
    constructor(){}
     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = '2', byVar = false, ratio = 1 ){
        const timeOutes = [];
        const intervals = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => {
            timeOutes.forEach(to => clearTimeout(to));
            intervals.forEach(to => clearInterval(to));
        });

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
                context.ellipse(this.mpX, this.mpY, bounds.width*ratio, bounds.height*ratio,0, 0, 2 * Math.PI, false);
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
            let counter = 0;
            for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width; x++) {
                for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height; y++) {
                    const i4 = ((y * imageData.width) + x) * 4;
                    if (pixelArray[i4+3])
                    {
                        counter = counter + 1;
                        r += pixelArray[i4];
                        g += pixelArray[i4+1];
                        b += pixelArray[i4+2];
                        a += pixelArray[i4+3];
                    // if (r === undefined || Number.isNaN(r)) console.log("color", [r, g, b, a],x,y ,i4,this.bounds, this);
                    }
                }
            }
            const area = counter;
            r = Math.round(r / area);
            g = Math.round(g / area);
            b = Math.round(b / area);
            a = Math.round(a / area);
            // if (r === undefined || Number.isNaN(r)) console.log("color avg", [r, g, b, a], this);

            if (r === 0 && g === 0 && b === 0 && a === 0) console.log(this)
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
                            sum[0] += Math.pow(pixelArray[i4]- this.coloravg[0],2);
                            sum[1] += Math.pow(pixelArray[i4 + 1] - this.coloravg[1],2);
                            sum[2] += Math.pow(pixelArray[i4 + 2]- this.coloravg[2],2);
                            sum[3] += Math.pow(pixelArray[i4 + 3] - this.coloravg[3],2);
                        }
                    }
                }
            const area = n;
            let varSum = 0;
            
            sum.forEach((color) => {
                varSum += color/area;
            });
            const variance = varSum / 4;            
            const score = (variance * variance) * (area/(imageData.width * imageData.height )) ;
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



        split(force=false) {
            if (!force && (this.bounds.width < blockSize || this.bounds.height < blockSize)){
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
                        if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((100 * index * index) / (node.level)))); }
                        else if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                        else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((100) / (node.level * index * index)) ));}
                        else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((devisions) / (index * index * node.level)))); }
                    }                                                                            
                });
            }
        }
        splitByVar(parentNode){
            let counter =0;
            const a = setInterval(()=>{
                counter++;
                let hvn = parentNode.getHighestVarNode();
                if (hvn.node === null || hvn.var < .0000001) clearInterval(a);
                hvn.node.split();
            },devisions);
            intervals.push(a);
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
                const node = tree.GetNode(e.pageX - context.canvas.offsetLeft, e.pageY - context.canvas.offsetTop);
            if (node) node.split(true); 
            }
        };}

        // console.log(context.canvas.removeEventListener('click', quadClickSplit(this.tree)));
         context.canvas.addEventListener('click', quadClickSplit(this.tree));
    
    }
}


export default QuadtreeMaker;