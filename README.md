# [imageReader- compression art](https://imagereader.herokuapp.com/) 
![](http://res.cloudinary.com/flyakite/image/upload/v1512363891/download_1_fl6gow.png)
### Background and Overview

[A quadTree](https://en.wikipedia.org/wiki/Quadtree) is a kind of data structure where every node has 4 children. They are a kind of expansion of the binary tree where having 4 children makes the Quadtree very useful for partitioning spatially orientated data. They are commonly used in 2 dimensional collision detection and image processing.I was inspired by the gif in the wikipedia article showing the step by step compression of an image using quadtrees and wanted to try and replicate it. 

The general idea behind image compression is to find a way to represent the image using less information than you started with. Lossy compression works by finding what pixels may be thrown away without significantly affecting the quality of the image. one way of thinking about it is tht if you have an all white image, you dont need millions of pixels to represent a white square, you could toss out all but one. Similarly if its an all white image with some black text, the edges around the text may need many pixels, but white space doesnt.




## implimentation

The idea is that the first node of the QuadTree has borders that represent the dimensions of the image and it has a color somehow calculated from the image ( I calculate an average color by averaging the seperate r,g,b,a channels of the pixels of the image). When this node is split, it makes 4 new child nodes and puts them into its nodes[] array:

To get the pixel data I simply draw an image onto a HTML5 canvas and call getImageData on the context to get an object which holds an array of raw pixel data. 

### simple recursive split

For compressing an image One strategy is to have the first node be a single pixel of the midpoint of the picture thats expanded to be the entire area. and filled with the average color of that space. that node is then split into four children making up the quadrants of the parent node. You can then generate an image to an abitrary depth.

Here is a resursive solution for that task, where split() returns false once a certian pixel depth has been reached (block size)

![recursive split](http://res.cloudinary.com/flyakite/video/upload/v1514588416/recsplit_fuhmre.gif)
```
        recusiveSplit(QuadNode) {
            if(QuadNode.split()){
                QuadNode.nodes.forEach(function (node) {
                      node.recusiveSplit(node)                                
                });
            }
        }
```
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
then just devide the sums by the area

### split by color variance

A better strategy is to instead of simply spliting up every node until some arbitrary limit is reached, I will have each node calculate the variance of color within boundary and come up with a fitness score using that and the area of the boundry. I will then search for and split the node with the highest score, the idea being that giving more pixels or the area which currently has the most unrepresented color variance will have the most effect

![split by var](http://res.cloudinary.com/flyakite/video/upload/v1514589638/recsplit1_flp8fq.gif)


 Every node already calculates an average, so to get the variance I iterate once again finding the square of the difference of each pixels values from the average, then devide by the area. The final score of a node is the square of its variance multiplied by what percent of the total image its area is:
            
```
const score = (variance * variance) * (area/(imageData.width * imageData.height )) 
```

once every node has a variance score, you can search for the node with the highest score similar to the recurive split: you check whether the node has children, if not its a leaf node and you need to check whether its variance score is higher than the previously largest varaince score seen:

```
        getHighestVarNode() {
            let highestVar = {node:null, var:0};
             const finder = (Pnode) => {
                 
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
            finder(this);
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

In terms of how many nodes it needs to describe a readable image This approach works particularily well in images where there is a lot of area with similar colors or images with text
![text example](http://res.cloudinary.com/flyakite/video/upload/v1514589381/vasplit_lhj5e2.gif)

however as you can see while it can intilligently single out text and kee areas of similar color together that does introduce a lot of artifacts.


Here is a comparison of the numbers of nodes nessisary to get a readable sign by doing a simple split and color varaince split
| simple split | color variance split |
| --------------- | --------------- |
|![rec](http://res.cloudinary.com/flyakite/image/upload/v1514431822/quadtreeorder_hhttov.png)|![var](http://res.cloudinary.com/flyakite/image/upload/v1514431820/quadtree_by_var_yzpqdc.png)|




there are also some fun modes I built in
[](http://res.cloudinary.com/flyakite/image/upload/v1514590288/download_2_hqyiv2.png)
[](http://res.cloudinary.com/flyakite/image/upload/v1514590287/download_4_jpan4b.png)
[])http://res.cloudinary.com/flyakite/image/upload/v1514590287/download_edkzv9.png)



