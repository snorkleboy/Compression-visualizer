# [imageReader- compression art](https://imagereader.herokuapp.com/) 
![alt text](https://res.cloudinary.com/flyakite/image/upload/v1512363891/download_2_zloy9n.png)
### Background and Overview

[A quadTree](https://en.wikipedia.org/wiki/Quadtree) is a kind of data structure where every node has 4 children. They are a kind of expansion of the binary tree where having 4 children makes the Quadtree very useful for partitioning spatially orientated data. They are commonly used in 2 dimensional collision detection and image compression.

The idea is that the first node has borders that represent the dimensions of the image and it has a color somehow calculated from the image ( I calculate an average color by averaging the seperate r,g,b,a channels of the pixels of the image). When this node is split, it makes 4 and puts them into its nodes[] array:
```
        split() {
        if (this.bounds.width<2 || this.bounds.height<2 || this.nextWidth<blocksize || this.nextHeight < blocksize){
           return false;
           this.variance = 0;
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

            return this;
        }
        
 ```
 

For compressing an image One strategy is to have the first node be a single pixel of the midpoint of the picture thats expanded to be the entire area. that node is then split into four children making up the quadrants of the parent node. You can then generate an image to an abitrary depth.

Here is a resursive solution for that task, whee split() returns false once a certian pixel depth has been reached (block size)
```
        recusiveSplit(QuadNode) {
            if(QuadNode.split()){
                QuadNode.nodes.forEach(function (node, index) {
                         node.recusiveSplit(node)                                
                });
            }
        }
```

A better strategy is to instead of simply spliting up every node until some arbitrary limit is reached, I will have each node calculate the variance of color within boundary and using the area of the boundry, come up with a fitness score. I will then search for and split the node that varies the most per area, the idea being that giving that area more partitions will have a stronger affect.

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
            and then devide the sums by the are. To get the varaince I iterate once again finding the square of the difference of each pixel from the average of the node, then devide by the area. The final score of a node is the square of its varaince multiplied by what percent of the total image its area is:
```
const score = (variance * variance) * (area/(imageData.width * imageData.height )) 
```

I made the whole process animiated by putting the calls to split(), which call fillrect(), in a set timeout. setTimeout returns a reference to that timeout, upon which clearTimeout(yourTimeout) may be called. I used that to make it cancellable by putting every timeout in an array which has an event which clears the array.:
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




![whitespace with variance split](https://github.com/snorkleboy/imageReader/blob/master/assets/flowersquarevar_ifiwtu.gif)


| simple split | color variance split |
| --------------- | --------------- |
![comp tomatoes](http://res.cloudinary.com/flyakite/image/upload/v1514431822/quadtreeorder_hhttov.png) | ![comp tomatoes var](http://res.cloudinary.com/flyakite/image/upload/v1514431820/quadtree_by_var_yzpqdc.png)|

![text with variance split](https://github.com/snorkleboy/imageReader/blob/master/assets/war_tlxpkw.gif)


| simple split | color variance split |
| --------------- | --------------- |
![comp regulat split](https://github.com/snorkleboy/imageReader/blob/master/assets/stones-6_cnywjy.gif)|![comp var split](https://github.com/snorkleboy/imageReader/blob/master/assets/ezgif.com-optimize.gif)|



![stones](https://github.com/snorkleboy/imageReader/blob/master/assets/stones_wegr2r.gif)
