# [imageReader- compression art](https://imagereader.herokuapp.com/) -live
![alt text](https://res.cloudinary.com/flyakite/image/upload/v1512363891/download_2_zloy9n.png)
### Background and Overview

[A quadTree](https://en.wikipedia.org/wiki/Quadtree) is a kind of data structure where every node has 4 children. They are a kind of expansion of the binary tree where having 4 children makes the Quadtree very useful for partitioning spatially orientated data. They are commonly used in 2 dimensional collision detection and image compression.

For compressing an image One strategy is to have the first node be a single pixel of the midpoint of the picture thats expanded to be the entire area. that node is then split into four children making up the quadrants of the parent node. You can then generate an image to an abitrary deph.

A better strategy is to instead of simply spliting up every node until some arbitrary limit is reached, I will have each node calculate the variance of color within boundary and using the area of the boundry, come up with a fitness score. I will then search for and split the node that varies the most per area, the idea being that giving that area more partitions will have a stronger affect.

the end result just be that if, for example, an image was mostly white and had a face somewhere in it, the algorithm would mostly skip the white areas and devote the most pixels to the face where color varies more. 

I will also make it possible for you to click on the canvas being controlled by the quadtree, it will use the coordinates of the mouse to find whithin which node the mouse is over, and split it. 

![text with variance split](http://res.cloudinary.com/flyakite/video/upload/v1514432390/war_gsu11w.gif)
![whitespace with variance split](http://res.cloudinary.com/flyakite/video/upload/v1514432096/stones_jwd27g.gif)
![comp regulat split](http://res.cloudinary.com/flyakite/video/upload/v1514432097/stones-6_cnywjy.gif) ![comp var split](http://res.cloudinary.com/flyakite/video/upload/v1514432052/smalcircle_jwmeg1.gif)
![comp tomatoes](http://res.cloudinary.com/flyakite/image/upload/v1514431822/quadtreeorder_hhttov.png) ![comp tomatoes var](http://res.cloudinary.com/flyakite/image/upload/v1514431820/quadtree_by_var_yzpqdc.png)
