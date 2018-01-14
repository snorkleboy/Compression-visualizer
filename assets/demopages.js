
export const intro = () => `
<div class='demo-intro demo-div'>
    <h1> QuadTree Compressor</h1>
    <img class='demoImg' src='http://res.cloudinary.com/flyakite/image/upload/v1512363891/download_1_fl6gow.png'></img>
</div>
`
export const introExplain = () => `
<div class='demo-div'>
    <h1> QuadTree Compressor</h1>
    <h2>Quick Run Down (1/3)</h2>
<p> 
This is a Javasript/HTML5 app that visualizes quadtree Compression
</p>
<p>
The idea behind image compression is to find  way to represent the same image using less data.
This QuadTree compression algorithm accomplishes this by describing areas with less color variation with fewer pixels,
so a thousand white pixels might be represented by a single box, whereas black text on a white background would get very many. 
</p>

  <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
export const QuadTreeRun = () => `
<div class='demo-div'>
<h2>Quick Run Down (2/3)</h2>
 <p>
 The algorithm works by recursively breaking down the image into QuadTree nodes that encompass an area and have an average color
and a variance score. This variance score is calculated as the variance from the average color divided by the area. The algorithm
finds the node with then highest score, and breaks it into four nodes that each encompass one of its quadrants, the origin of
the name. The process then repeats constantly spliting the Node with the highest variance into four. 
</p>
  <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
export const QuadTreeExplain = () => `
<div class='demo-div'>
<h2>Quick Run Down (3/3)</h2>
 <p>This results in something like an edge finder. Areas with high color variance get lots of data, and areas with little variance get less. 
 </p>
 <img class='demoImg' src=http://res.cloudinary.com/flyakite/image/upload/v1515897356/download_13_rq5j2u.png />
            <button onclick="demo.stay()">Stay</button>
            <button class='onto' onclick="demo.destroyCurrentAndRun()">Next( Full Explanation)</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
</div>
`;
export const BlockChopIntro = () => {
    return `
            <div class='demo-div'>
            <h2>BlockChop (1/3)</h2>
            <p>
              A more simple and naive example of how this works is the BlockChop. It
iterates through all the pixels in the image and picks one out of some area to represent that area. 
            </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};

export const BlockChop = () => {
  return `
            <div class='demo-div'>
            <h2>BlockChop (2/3)</h2>
            <p>
              For example with a  block size of 4x4, it would chop the image up into 4x4 blocks, choose one pixel out of each block and represent the entire block using the color of that pixel. So I this case the resulting image will have 1/(4*4) = 1/16th as many pixels as the original image. 
            </p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
export const BlockChopOptions = () => {
  return `
            <div class='demo-div'>
            <h2>BlockChop (3/3)</h2>
<p>
  If you would like to play around with it you can set the blocksize parameters, as well as how the chosen pixel is blown up to represent its block.
            </p>

  <ul>
    <li>
      <p>
        The default is by block, where the pixel is simply drawn the size of its block.
                </p>
    </li>
    <li>
      <p>
        real size which simply knits the pixels together and doesn’t resize them
                </p>
    </li>

    <li>
      <p>
        pins neither resizes nor moves the pixels, and you can really see how this algorithm works
                </p>
    </li>

    <li>
      <p>
        circles uses arcs instead of fillRect which can be a cool effect
                </p>
    </li>
  </ul>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};

export const QuadRec = () => {
  return `
            <div class='demo-div'>
            <h2>Naive Quadtree (2/3)</h2>
            <p>
              The naive version of QuadTree compression doesn't calculate the average color nor the color variance.
It is similar to Blockchop in that it will give an equal pixel depth to all areas on the image,
the only difference is that it accomplishes this recursively using QuadTrees
            </p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};

export const QuadRecRun = () => {
  return `
            <div class='demo-div'>
            <h2>naive Quadtree (3/3)</h2>
            <p> the code for this is simple:</p>
            <pre><code>
            recusiveSplit(QuadNode) {
                if(QuadNode.split()){
                    QuadNode.nodes.forEach(function (node) {
                          node.recusiveSplit(node)                                
                    });
                }
              }
            </code></pre>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
export const Quadvar = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (1/5)</h2>
            <p>The full version of Quadtree compression has a few extra steps.
            </p>
            <p>When a node is created first an average color is calculated, and then using that average a variance is calculated and a variance score is assigned to every node as varaince/area</p>

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};

export const QuadvarGetHighest = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (2/5)</h2>
            <p>getHighestVarNode is an important helper function I wrote which searches for the highest variance node and returns it</p>
            <pre><code>
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
                         finder(node);
                    });
                }
              };
              finder(this);
              return highestVar;
            }
            </code>
            </pre>
            <p>
              The idea here is that finder takes a node (starts with the root). If the node has children it calls the function on all the children, otherwise it is a leaf node and its variance is compared to the largest variance seen and stored if larger.  
            </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
export const QuadVarexp = () => {
  return `
            <div class='demo-div'>
            <h2>Quadtree (3/5)</h2>
            <p>
              With nodes that calculate color and variance on initialization, and a helper function
              to find nodes with the highest variance, all we need to do is call it repeatedly in a way that can be animated
            </p>
              <pre>
                <code>
                  splitByVar(tree){
                      const a = setInterval(()=>{
                          let hvn = tree.getHighestVarNode();
                          if (hvn.node === null || hvn.var === 0) clearInterval(a);
                          hvn.node.split();
                      },10);
                      intervals.push(a);
                  }                  
                </code>
              </pre>
              <p>
                  splitByVar works by getting the highest variance node and calling for it to be split. It is done within a set interval so that the process can be animated and cancelled. 
              </p>
            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};
export const example = () => `
<div class='demo-intro demo-div'>
    <h1> QuadTree Compressor</h1>
    <img class='demoImg' src='http://res.cloudinary.com/flyakite/image/upload/v1512363891/download_1_fl6gow.png'></img>
</div>
`





