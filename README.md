# [imageReader- compression art](https://imagereader.herokuapp.com/)
![alt text](https://res.cloudinary.com/flyakite/image/upload/v1512363891/download_2_zloy9n.png)
### Background and Overview

[A quadTree](https://en.wikipedia.org/wiki/Quadtree) is a kind of data structure where every node has 4 children. They are a kind of expansion of the binary tree where having 4 children makes the Quadtree very useful for partitioning spatially orientated data. They are commonly used in 2 dimensional collision detection and image compression. I will start by going for the latter.

Most niavely a quadTree could be used to simply recursively define areas of the color of pixels at subsequent midpoints. As in the first node is a single pixel of the midpoint of the picture. that nodes four children are the midpoints of the four quadrants of the first node.

A better strategy is to instead of simply splitting up every node until some arbitrary limit is reached, I will have each node calculate how much the average color of pixels varies in its boundary, and use that and its area to come up with a fitness. I will then search for the node that varies the most per area, the idea being that giving that area more partitions will have a stronger affect.

the end resul just be that if, for example, an image was mostly white and had a face somewher in it, the algorythm would mostly skip the white areas and devote the most pixels to the face where color varies more. 

I will also make it possible for you to click on the canvas being controlled by the quadtree, it will use the coordinates of the mouse to find whithin which node the mouse is over, and split it. 

### Functionality & MVP  
Image reader will-
  - [x] allow user to pick imageurl and open up an imgageData object from it
  - [x] choose different ways to read that data out in block compression
  - [ ] choose different ways to run quadtree compression
  - [x] be stoppable
  - [x] it will be able to split niavely (equally for all children)
  - [ ] split by user click (it loads up the first node and splits at the (x,y) of a users click
  - [ ] split by color variance (every node gets a fitness value from color variance and size, split by most variant)

In addition, this project will include:

- [ ] descriptions on the page telling the user the basic functionality
- [ ] a readme delving into the specific implementation of quadtrees

### Architecture and Technologies

- Vanilla JavaScript and HTML, as well as the node static-server package to get it unto heroku

I will organize my code into a couple different files:

quadtree.js - this file will have all the quadtree logic, its basic structure as well as a controller for it

compress.js - this file will have my starting part, the block compress. 

imagereader.js - this file is an entry file for the page. It sets up event listeners and the canavs and links them to buttons on the page on image load

index.js - this file is the entry file that starts a server
  

### Implementation Timeline

**Over the weekend**:
  - [x] open up an imgData object
  - [x] iterate and ouput pizels
   - [x] add options
   - [x] add image loader
   - [x] load up on heroku
- [x] make quadree
  - [x] be runnable with options
  - [x] be stoppable
  - [x] be able to split niavely (equally for all children)


**Day 1**: finish split by click get most of way through color variance calculation


**Day 2**: finish split by color variance


**Day 3**: style it up, add differing options for the set timeouts which determine how new node are painted on the canvas. 

**Day 4**: add page details and descriptions


### Bonus features

There are many directions in which this project could evolve.

- i will impliment the quadtree as a collision detection engine
- alternatively this could be turned into a minutature piture editor
