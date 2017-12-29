# [imageReader- compression art](https://imagereader.herokuapp.com/) 
![](https://res.cloudinary.com/flyakite/image/upload/v1512363891/download_2_zloy9n.png)
### Background and Overview

[A quadTree](https://en.wikipedia.org/wiki/Quadtree) is a kind of data structure where every node has 4 children. They are a kind of expansion of the binary tree where having 4 children makes the Quadtree very useful for partitioning spatially orientated data. They are commonly used in 2 dimensional collision detection and image processing.I was inspired by the gif in the wikipedia article showing the step by step compression of an image using quadtrees and wanted to try and replicate it. 

The general idea behind image compression is to find a way to represent the image using less information than you started with. Lossy compression works by finding what pixels may be thrown away without significantly affecting the quality of the image. one way of thinking about it is tht if you have an all white image, you dont need millions of pixels to represent a white square, you could toss out all but one. Similarly if its an all white image with some black text, the edges around the text may need many pixels, but white space doesnt.




## implimentation

The idea is that the first node of the QuadTree has borders that represent the dimensions of the image and it has a color somehow calculated from the image ( I calculate an average color by averaging the seperate r,g,b,a channels of the pixels of the image). When this node is split, it makes 4 new child nodes and puts them into its nodes[] array:

### simple recursive split

For compressing an image One strategy is to have the first node be a single pixel of the midpoint of the picture thats expanded to be the entire area. that node is then split into four children making up the quadrants of the parent node. You can then generate an image to an abitrary depth.

Here is a resursive solution for that task, where split() returns false once a certian pixel depth has been reached (block size)

!{recursive split](http://res.cloudinary.com/flyakite/video/upload/v1514588416/recsplit_fuhmre.gif)
```
        recusiveSplit(QuadNode) {
            if(QuadNode.split()){
                QuadNode.nodes.forEach(function (node, index) {
                         node.recusiveSplit(node)                                
                });
            }
        }
```

### split by color variance

A better strategy is to instead of simply spliting up every node until some arbitrary limit is reached, I will have each node calculate the variance of color within boundary and come up with a fitness score using that and the area of the boundry. I will then search for and split the node with the highest score, the idea being that giving more pixels or the area which currently has the most unrepresented color variance will have the most effect

to get the average color i iterate through the pixel array using the boundaries and postition of the node like so:

```
            for (let x = this.bounds.x; x < this.bounds.x + this.bounds.width; x++) {
                for (let y = this.bounds.y; y < this.bounds.y + this.bounds.height; y++) {
                    const i4 = ((y * imageData.width) + x) * 4;
                        r += pixelArray[i4];
                        g += pixelArray[i4+1];
                        b += pixelArray[i4+2];
                        a += pixelArray[i4+3]; 
                }
            }
```
            
 and then devide the sums by the area. To get the variance I iterate once again finding the square of the difference of each pixel from the average of the node, then devide by the area. The final score of a node is the square of its variance multiplied by what percent of the total image its area is:
            
```
const score = (variance * variance) * (area/(imageData.width * imageData.height )) 
```

then you can search for the node with the highest score:

```
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
        
```

and then using that you can build the compression algorithm, where its inside of a setInterval so that I can cancel it (more on that in the next section)

```
        splitByVar(tree){
            const a = setInterval(()=>{
                let hvn = tree.getHighestVarNode();
                if (hvn.node === null || hvn.var === 0) clearInterval(a);
                hvn.node.split();
            },10);
            intervals.push(a);
        }
```
![split by var]()

### animation

I made the whole process animated by putting the calls to split(), which call fillrect(), in a set timeout. setTimeout returns a reference to that timeout, upon which clearTimeout(yourTimeout) may be called. I used that to make it cancellable by putting every timeout in an array which has an event which clears the array.:

```
        const timeOutes = [];
        const stopButton = document.getElementById('stopQuads');
        stopButton.addEventListener('click', e => {
            timeOutes.forEach(to => clearTimeout(to));
        });
        //...
        //...
        //...
        timeOutes.push(setTimeout(() => node.recusiveSplit(node), ((devisions) / (index * index * node.level))))   
```

 I also made it possible for you to click on an spot and split the node at that location.
 
 ![click split](http://res.cloudinary.com/flyakite/video/upload/v1514587876/clicksplit_v1bsay.gif)
 I get the position of the mouse relative to the canvas and pass it to getNode(x,y). Every node either has 4 children or is a leaf node. so if nodes[0] exists, I call getIndex(x,y) which uses the boundaries of the children to find which one to search next, otherwisse I return 'this', which should be the bottom most node which encompasses the position of the mouse.
 
```
        getNode(x,y){
            if (this.nodes[0] !== undefined){
                const idx = this.getIndex(x,y);
                if (idx !== -1) return this.nodes[idx].getNode(x,y);
                return null;
            }else{
                return this;
            }
        }
        ///
         context.canvas.addEventListener('click', ()=>{
                 const node = tree.GetNode(e.pageX - context.canvas.offsetLeft, e.pageY - context.canvas.offsetTop);
            if (node) node.split(true); 
            });
  ```
  
## some more results and comparisons

This approach works particularily well in images where there is a lot of area with similar colorsc such as in the following image
![whitespace with variance split]()

or images with text
![text example]()

| simple split | color variance split |
| --------------- | --------------- |




| simple split | color variance split |
| --------------- | --------------- |

there are also some fun modes I built in


