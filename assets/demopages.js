
export const intro = () => `
<div class='demo-intro demo-div'>
    <h1> QuadTree Compressor</h1>
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
This quadTree compression algorithm accomplishes this by describing areas with less color variation with fewer pixels,
so a thousand white pixels might be represented by a single box, whereas black text on a white background would get a lot of definition. 
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
 The Algorithm works by recursively breaking down the image into Quad tree nodes that encompass an area and have an average color
and a variance score. This variance score is calculated as the variance from the average color divided by the area. The algorithm
finds the node with then highest score, and breaks it into four nodes that each encompass one of its quadrants, the origin of
the name. 
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
  <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
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
            <h2>Niave Quadtree (2/3)</h2>
            

            <button onclick="demo.stay()">Stay</button>
            <button onclick="demo.destroyCurrentAndRun()">Next</button>
            <button onclick="demo.goBack()">Go Back</button>
            <button onClick="demo.endRun()">End Demo</button>
            </div>
            `
};






