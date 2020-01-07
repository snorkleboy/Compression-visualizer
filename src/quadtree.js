class QuadtreeMaker {
    constructor(context) {
        this.timeOutes = [];
        this.intervals = [];
        this.context = context
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', this.stop);
        context.canvas.addEventListener('click', this.clickCanvasSplit());
    }
    stop(){
        this.timeOutes.forEach(to => clearTimeout(to));
        this.intervals.forEach(to => clearInterval(to));
    }
    clickCanvasSplit() {
        if(this.tree){
            const canvasHolder = document.getElementById('canvasHolder')
            const node = this.tree.GetNode(e.pageX - canvasHolder.offsetLeft, e.pageY - canvasHolder.offsetTop);
            if (node) node.split(true);
        }
    }
    makeQuadTree(imageData, blockSize, circleBool, timeoutType = '1', byVar = false, ratio = 1) {
        const initialBounds = {
            x: 0,
            y: 0,
            width: imageData.width,
            height: imageData.height
        };
        this.tree = new Quadtree(initialBounds, 0, this.context, imageData, this.intervals, this.timeOutes,{
            blockSize,
            circleBool,
            timeoutType,
            ratio
        } );
        byVar ? this.tree.splitByVar(this.tree) : this.tree.recusiveSplit(this.tree);
    }
}
class Quadtree {
    constructor(bounds, level = 0, context, imageData, intervals, timeoutes,options) {
        this.options = options;
        this.imageData = imageData;
        this.devisions = 0;
        this.intervals = intervals;
        this.timeoutes = timeoutes;
        this.use = true;
        this.bounds = bounds;
        this.nextWidth = Math.round(this.bounds.width / 2);
        this.nextHeight = Math.round(this.bounds.height / 2);
        this.mpX = bounds.x + this.nextWidth;
        this.mpY = bounds.y + this.nextHeight;

        this.getHighestVarNode = this.getHighestVarNode.bind(this);

        const i4 = (this.mpY * this.imageData.width * 4) + this.mpX * 4;
        this.coloravg = this.calcAverageColor();
        this.color = 'rgba(' + this.coloravg[0] + ', ' + this.coloravg[1] +
            ', ' + this.coloravg[2] + ', ' + (this.coloravg[3]) + ')';
        this.variance = this.calcColorVar();
        this.varVal = Math.pow(this.variance,2) * this.bounds.width
        this.level = level;
        this.bounds = bounds;
        this.nodes = [];

        context.fillStyle = this.color;
        if (this.options.circleBool) {
            context.beginPath();
            context.ellipse(this.mpX, this.mpY, bounds.width * this.options.ratio, bounds.height * this.options.ratio, 0, 0, 2 * Math.PI, false);
            // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
            context.fill();
        } else {
            // context.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
            context.fillRect(bounds.x, bounds.y, bounds.width * this.options.ratio, bounds.height * this.options.ratio);
        }
    }
    makeNode(bounds, level){
        return new Quadtree(bounds, level,this.intervals,this.timeoutes,this.imageData)
    }
    
    calcAverageColor() {
        let r = 0;
        let g = 0;
        let b = 0;
        let a = 0;
        const pixelArray = imageData.data;

        let counter = 0;
        for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width - 1; x++) {
            for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height - 1; y++) {
                const i4 = ((y * this.imageData.width) + x) * 4;
                if (Number.isInteger(pixelArray[i4 + 3])) {
                    counter = counter + 1;
                    r += pixelArray[i4];
                    g += pixelArray[i4 + 1];
                    b += pixelArray[i4 + 2];
                    a += pixelArray[i4 + 3];
                }
            }
        }
        const area = counter || 1;

        r = Math.round(r / area);
        g = Math.round(g / area);
        b = Math.round(b / area);
        a = Math.round(a / area);
        if (r === undefined || Number.isNaN(r)) console.log("!!color avg!!", [r, g, b, a], area, this);
        return [r, g, b, a];
    }
    calcColorVar() {
        if (this.width < 2) return 0;
        let sum = [0, 0, 0, 0];
        let n = 0;
        const pixelArray = imageData.data;

        for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width; x = x + 1) {
            for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height; y++) {
                const i4 = (y * this.imageData.width + x) * 4;
                if (pixelArray[i4] !== undefined) {
                    n++;
                    sum[0] += Math.pow(pixelArray[i4] - this.coloravg[0], 2);
                    sum[1] += Math.pow(pixelArray[i4 + 1] - this.coloravg[1], 2);
                    sum[2] += Math.pow(pixelArray[i4 + 2] - this.coloravg[2], 2);
                    sum[3] += Math.pow(pixelArray[i4 + 3] - this.coloravg[3], 2);
                }
            }
        }
        const area = n;
        let varSum = 0;

        sum.forEach((color) => {
            varSum += color / area;
        });
        const variance = varSum / 4;
        const score = (variance * variance) * (area / (this.imageData.width * this.imageData.height));
        return score;


    }
    getIndex(x, y) {
        let index = -1;
        this.nodes.forEach((node, idx) => {
            if (node.bounds.x < x && x < node.bounds.x + node.bounds.width) {
                if (node.bounds.y < y && y < node.bounds.y + node.bounds.height) {
                    index = idx;
                }
            }
        });
        return index;
    }
    //every node has either no children or 4 children. If xy is within bounds, if there are no children return this node,
    // if there are children getIndex and run getNode on that child node. 

    GetNode(x, y) {
        if (this.nodes[0] !== undefined) {
            const idx = this.getIndex(x, y);
            if (idx !== -1) return this.nodes[idx].GetNode(x, y);
            return null;
        } else {
            return this;
        }
    }
    split(force = false) {
        if (!force && (
                this.bounds.width < this.options.blockSize ||
                this.bounds.width < 2 ||
                this.bounds.height < this.options.blockSize ||
                this.bounds.height < 2
            )) {
            this.variance = 0;
            return false;
        }
        this.nodes[0] = this.makeNode({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.bounds.x,
            y: this.bounds.y,
        }, this.level + 1);
        this.nodes[1] = this.makeNode({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.mpX,
            y: this.bounds.y,
        }, this.level + 1);
        this.nodes[2] = this.makeNode({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.bounds.x,
            y: this.mpY,
        }, this.level + 1);
        this.nodes[3] = this.makeNode({
            width: this.nextWidth,
            height: this.nextHeight,
            x: this.mpX,
            y: this.mpY,
        }, this.level + 1);
        this.devisions++;
        const divisionsNumberEl = document.getElementById('divisionsNumber');
        divisionsNumberEl.innerText = `division: ${this.devisions}\n bottom-level-nodes:${1 + 3 * this.devisions}`;
        return this;
    }
    splitChildren() {
        this.nodes.forEach((quadNode) => {
            quadNode.split(quadNode);
        });
    }
    recusiveSplit(QuadNode) {
        if (QuadNode.split()) {
            QuadNode.nodes.forEach(function (node, index) {
                if (node.nextWidth >= this.options.blockSize && node.nextWidth >= 1 && node.nextHeight >= 1) {
                    if (this.options.timeoutType === '2') {
                        this.timeOutes.push(setTimeout(() => node.recusiveSplit(node), (node.level * index) * 100));
                    } else if (this.options.timeoutType === '1') {
                        this.timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10));
                    } else if (this.options.timeoutType === '3') {
                        this.timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((100) / (node.level * index * index))));
                    } else if (this.options.timeoutType === '4') {
                        this.timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((devisions) / (index * index * node.level))));
                    }
                }
            });
        }
    }
    splitByVar(parentNode) {
        let counter = 0;
        const a = setInterval(() => {
            counter++;
            let hvn = parentNode.getHighestVarNode();
            if (hvn.node === null || hvn.var === 0) clearInterval(a);
            hvn.node.split();
        }, 1);
        this.intervals.push(a);
    }
    iterateNodes(cb){
        cb(this);
        if (this.nodes[0] !== undefined) {
            node.nodes.forEach((node) => {
                node.iterateNodes(cb);
            });
        }
    }
    getHighestVarNode() {
        let highestVar = {
            node: null,
            var: 0,
            val:0
        };
        this.iterateNodes((node)=>{
            if (node.nodes[0] === undefined && highestVar.varVal < node.varVal) {
                highestVar.node = node;
                highestVar.var = node.variance;
                highestVar.val = node.varVal
            }
        })
        return highestVar;
    }
};

export default QuadtreeMaker;