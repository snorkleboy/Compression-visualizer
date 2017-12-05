
//bound is {x:,y:,width:,height:} in pixels(4 index values per pixel);
 class QuadtreeMaker {
    constructor(){}


     makeQuadTree(imageData, context, blockSize, circleBool, timeoutType = 'fun2'){
         console.log("makequadtree", this);
        if (this.tree) {
            console.log("delete tree nodes", delete this.tree, this);
            console.log("after tree nodes", this);
        }
         
        //create stop button
        const timeOutes = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => timeOutes.forEach((to => clearTimeout(to))));

        console.log('qtmaker start', circleBool, blockSize, imageData, context);

        let devisions = 0;
        let highestVar = 0;
        const pixelArray = imageData.data;
        const initialBounds = { x: 0, y: 0, width: imageData.width, height: imageData.height };


        this.Quadtree = class Quadtree{
            constructor(bounds, level) {
            // console.log("quadtree node");

            this.bounds = bounds;
            this.nextWidth = Math.round(this.bounds.width / 2);
            this.nextHeight = Math.round(this.bounds.height / 2);
            this.mpX = bounds.x + Math.round(bounds.width / 2);
            this.mpY = bounds.y + Math.round(bounds.height / 2);
            
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

        // takes in xy and determines which child that x,y would be bounded by. 

        getIndex(x,y){
            let index = -1;
            this.nodes.forEach( (node, idx) =>{
                if (node.bounds.x < x && x < node.bounds.width+node.bounds.x){
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
            // none of the none of the nodes contain the x,y probably shouldnt ever happen

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

        calcColorVar () {
            // this.bounds = bounds;
            // this.nextWidth = Math.round(this.bounds.width / 2);
            // this.nextHeight = Math.round(this.bounds.height / 2);
            // this.mpX = bounds.x + Math.round(bounds.width / 2);
            // this.mpY = bounds.y + Math.round(bounds.height / 2);

            // const i4 = (this.mpY * imageData.width * 4) + this.mpX * 4;
        }

        split() {
            // console.log("split", this);
            if (this.bounds.width === 1 || this.bounds.height===1){
                return -1;
            }
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
                devisions++;
                if (node.nextWidth >= blockSize) {
                    if (timeoutType === '1') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), devisions * 10)); }
                    else if (timeoutType === '4') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), 10)); }
                    else if (timeoutType === '3') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level * index) * 100 + devisions / 20))); }
                    else if (timeoutType === '2') { timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((node.level + index) * 500))); }
                }
            });
        }
    };
    




        //start node and 
        console.log('quadtreemaker', this);
        this.tree = new this.Quadtree(initialBounds);

        // tree.split();
        // tree.splitChildren();
        // console.log("first node", tree);
        
        this.tree.recusiveSplit(this.tree);

        
        // console.log("node after split", tree);
        

         function quadClickSplit(tree){
            return (e)=>{
                // console.log('clickevent, quadtree', e.layerX, e.layerY, tree);
                console.log("getIndex in handler", tree.GetNode(e.layerX,e.layerY) );

            const node = tree.GetNode(e.layerX, e.layerY);
            if (node) node.split(); 
            // console.log("getNode x,y node",e.layerX, e.layerY,  tree.GetNode(e.layerX, e.layerY));
        };}

        // console.log(context.canvas.removeEventListener('click', quadClickSplit));
         context.canvas.addEventListener('click', quadClickSplit(this.tree));
    
    }
}


export default QuadtreeMaker;