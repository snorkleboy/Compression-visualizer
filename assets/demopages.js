
export const intro = () => `
<div class='demo-div'>
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
  <button onclick="demo.destroy()">Next</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
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
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">Next</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
export const QuadTreeExplain = () => `
<div class='demo-div'>
<h2>Quick Run Down (3/3)</h2>
 <p>This results in something like an edge finder. Areas with high color variance get lots of data, and areas with little variance get less. 

 </p>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">Next</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
export const BlockChopIntro = () => {
    return `
            <div class='demo-div'>
            <h2>BlockChop (1/3)</h2>
            <p></p>
            <button onclick="demo.stay()">stay</button>
            <button onclick="demo.destroy()">Next</button>
            <button onclick="demo.goBack()">goBack</button>
            <button onClick="demo.end()">end demo</button>
            </div>
            `
};