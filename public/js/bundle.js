!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){t.DemoObj=class{constructor(e,t,n,i,...o){this.el=null,this.htmlMaker=e,this.add=t,this.remove=n,this.time=i,this.attached=!1,this.cbScripts=o}build(e){this.el=document.createElement("div"),this.el.id="DemoDiv";try{this.el.innerHTML=this.htmlMaker()}catch(e){"function"!=typeof this.el.innerHTML?console.log("DemoObjs first parameter must be a function which returns InnerHtml",`\n      got:${typeof this.el} :${this.el}\n      expected: a function which returns HTML\n      `):console.log(e)}this.add(this.el,e),this.attached=!0}destroy(e){this.attached=!1,this.remove(this.el,e)}},t.DemoRunner=class{constructor(e,t){this.destroyCB=t,this.elements=e,this.index=0,this.to=null,this.current=null,this.switch=!1}toggle(){this.switch?this.endRun():(this.switch=!0,this.run())}run(e){if(this.switch){if(this.index>this.elements.length-1)return this.endRun();const t=this.elements[this.index];this.current=t,this.bindMethods(),t.build(e),++this.index,this.to=setTimeout(this.destroyCurrentAndRun.bind(this),t.time);const n=this;t.cbScripts.forEach((function(e){"function"==typeof e&&e(n)}))}}bindMethods(){window.demo={},window.demo.stay=this.stay.bind(this),window.demo.destroyCurrentAndRun=this.destroyCurrentAndRun.bind(this),window.demo.goBack=this.goBack.bind(this),window.demo.endRun=this.endRun.bind(this)}goBack(){this.index>1&&(clearTimeout(this.to),this.destroyCurrent(),this.index=this.index-2,this.run())}stay(){clearTimeout(this.to)}destroyCurrentAndRun(){clearTimeout(this.to),this.current.destroy(this.run.bind(this))}destroyCurrent(){clearTimeout(this.to),this.current.destroy((function(){}))}endRun(){clearTimeout(this.to),this.current.attached&&this.destroyCurrent(),this.switch=!1,"function"==typeof this.destroyCB&&this.destroyCB(),window.demo=void 0,this.index=0}}},function(t,n,i){"use strict";i.r(n);class o{constructor(e,t=0,n,i,o,s,a){this.options=a,this.imageData=i,this.devisions=0,this.intervals=o,this.timeoutes=s,this.use=!0,this.bounds=e,this.nextWidth=Math.round(this.bounds.width/2),this.nextHeight=Math.round(this.bounds.height/2),this.mpX=e.x+this.nextWidth,this.mpY=e.y+this.nextHeight,this.getHighestVarNode=this.getHighestVarNode.bind(this);this.mpY,this.imageData.width,this.mpX;this.coloravg=this.calcAverageColor(),this.color="rgba("+this.coloravg[0]+", "+this.coloravg[1]+", "+this.coloravg[2]+", "+this.coloravg[3]+")",this.variance=this.calcColorVar(),this.varVal=Math.pow(this.variance,2)*this.bounds.width,this.level=t,this.bounds=e,this.nodes=[],n.fillStyle=this.color,this.options.circleBool?(n.beginPath(),n.ellipse(this.mpX,this.mpY,e.width*this.options.ratio,e.height*this.options.ratio,0,0,2*Math.PI,!1),n.fill()):n.fillRect(e.x,e.y,e.width*this.options.ratio,e.height*this.options.ratio)}makeNode(e,t){return new o(e,t,this.intervals,this.timeoutes,this.imageData)}calcAverageColor(){let e=0,t=0,n=0,i=0;const o=imageData.data;let s=0;for(let a=this.bounds.x;a<this.bounds.x+this.bounds.width-1;a++)for(let d=this.bounds.y;d<this.bounds.y+this.bounds.height-1;d++){const h=4*(d*this.imageData.width+a);Number.isInteger(o[h+3])&&(s+=1,e+=o[h],t+=o[h+1],n+=o[h+2],i+=o[h+3])}const a=s||1;return e=Math.round(e/a),t=Math.round(t/a),n=Math.round(n/a),i=Math.round(i/a),(void 0===e||Number.isNaN(e))&&console.log("!!color avg!!",[e,t,n,i],a,this),[e,t,n,i]}calcColorVar(){if(this.width<2)return 0;let e=[0,0,0,0],t=0;const n=imageData.data;for(let i=this.bounds.x;i<this.bounds.x+this.bounds.width;i+=1)for(let o=this.bounds.y;o<this.bounds.y+this.bounds.height;o++){const s=4*(o*this.imageData.width+i);void 0!==n[s]&&(t++,e[0]+=Math.pow(n[s]-this.coloravg[0],2),e[1]+=Math.pow(n[s+1]-this.coloravg[1],2),e[2]+=Math.pow(n[s+2]-this.coloravg[2],2),e[3]+=Math.pow(n[s+3]-this.coloravg[3],2))}const i=t;let o=0;e.forEach(e=>{o+=e/i});const s=o/4;return s*s*(i/(this.imageData.width*this.imageData.height))}getIndex(e,t){let n=-1;return this.nodes.forEach((i,o)=>{i.bounds.x<e&&e<i.bounds.x+i.bounds.width&&i.bounds.y<t&&t<i.bounds.y+i.bounds.height&&(n=o)}),n}GetNode(e,t){if(void 0!==this.nodes[0]){const n=this.getIndex(e,t);return-1!==n?this.nodes[n].GetNode(e,t):null}return this}split(e=!1){if(!e&&(this.bounds.width<this.options.blockSize||this.bounds.width<2||this.bounds.height<this.options.blockSize||this.bounds.height<2))return this.variance=0,!1;return this.nodes[0]=this.makeNode({width:this.nextWidth,height:this.nextHeight,x:this.bounds.x,y:this.bounds.y},this.level+1),this.nodes[1]=this.makeNode({width:this.nextWidth,height:this.nextHeight,x:this.mpX,y:this.bounds.y},this.level+1),this.nodes[2]=this.makeNode({width:this.nextWidth,height:this.nextHeight,x:this.bounds.x,y:this.mpY},this.level+1),this.nodes[3]=this.makeNode({width:this.nextWidth,height:this.nextHeight,x:this.mpX,y:this.mpY},this.level+1),this.devisions++,document.getElementById("divisionsNumber").innerText=`division: ${this.devisions}\n bottom-level-nodes:${1+3*this.devisions}`,this}splitChildren(){this.nodes.forEach(e=>{e.split(e)})}recusiveSplit(e){e.split()&&e.nodes.forEach((function(e,t){e.nextWidth>=this.options.blockSize&&e.nextWidth>=1&&e.nextHeight>=1&&("2"===this.options.timeoutType?this.timeOutes.push(setTimeout(()=>e.recusiveSplit(e),e.level*t*100)):"1"===this.options.timeoutType?this.timeOutes.push(setTimeout(()=>e.recusiveSplit(e),10)):"3"===this.options.timeoutType?this.timeOutes.push(setTimeout(()=>e.recusiveSplit(e),100/(e.level*t*t))):"4"===this.options.timeoutType&&this.timeOutes.push(setTimeout(()=>e.recusiveSplit(e),devisions/(t*t*e.level))))}))}splitByVar(e){const t=setInterval(()=>{0;let n=e.getHighestVarNode();null!==n.node&&0!==n.var||clearInterval(t),n.node.split()},1);this.intervals.push(t)}iterateNodes(e){e(this),void 0!==this.nodes[0]&&node.nodes.forEach(t=>{t.iterateNodes(e)})}getHighestVarNode(){let e={node:null,var:0,val:0};return this.iterateNodes(t=>{void 0===t.nodes[0]&&e.varVal<t.varVal&&(e.node=t,e.var=t.variance,e.val=t.varVal)}),e}}var s=class{constructor(e){this.timeOutes=[],this.intervals=[],this.context=e,document.getElementById("stopQuads").addEventListener("click",this.stop),e.canvas.addEventListener("click",this.clickCanvasSplit())}stop(){this.timeOutes.forEach(e=>clearTimeout(e)),this.intervals.forEach(e=>clearInterval(e))}clickCanvasSplit(){if(this.tree){const t=document.getElementById("canvasHolder"),n=this.tree.GetNode(e.pageX-t.offsetLeft,e.pageY-t.offsetTop);n&&n.split(!0)}}makeQuadTree(e,t,n,i="1",s=!1,a=1){const d={x:0,y:0,width:e.width,height:e.height};this.tree=new o(d,0,this.context,e,this.intervals,this.timeOutes,{blockSize:t,circleBool:n,timeoutType:i,ratio:a}),s?this.tree.splitByVar(this.tree):this.tree.recusiveSplit(this.tree)}};var a=i(0);const d=function(e){e.stay()},h=function(){const e=document.getElementById("quadtree");setTimeout(()=>e.click(),500)},l=function(){const e=document.getElementById("stopQuads");setTimeout(()=>e.click(),3e3)},r=function(){document.getElementById("quadTreeVariance").checked=!0},c=function(){const e=document.getElementById("bc"),t=document.getElementById("qt");t.classList.contains("collapse")&&t.classList.remove("collapse"),e.classList.contains("collapse")||e.classList.add("collapse")},u=function(e,t){const n=document.getElementById("canvasHolder");e.style.transition=".7s all",e.classList.add("invisible"),n.appendChild(e),setTimeout(()=>{e.classList.remove("invisible")},0)},m=function(e,t){const n=document.getElementById("canvasHolder");e.style.opacity="1",e.style.transition=".3s all",setTimeout(()=>{e.style.opacity="0"},0),setTimeout(()=>{n.removeChild(e),t()},400)},p=function(e,t){!function(){const e=document.getElementById("stopNiave");setTimeout(()=>e.click(),100)}(),l();const n=document.getElementById("canvasHolder");e.style.opacity="1",e.style.transition=".3s all",setTimeout(()=>{e.style.opacity="0"},0),setTimeout(()=>{n.removeChild(e),t()},400)},g=[new a.DemoObj(()=>"\n<div class='demo-intro demo-div'>\n    <h1> QuadTree Compressor</h1>\n    <img class='demoImg' src='http://res.cloudinary.com/flyakite/image/upload/v1515907377/download_1_fl6gow_kltvt8.png'></img>\n</div>\n",(function(e){const t=document.getElementById("canvasHolder");e.style.position="absolute",e.style.transition="1s all",e.style.left="300%",e.style.opacity="0",t.appendChild(e),setTimeout(()=>{e.style.left="0%",e.style.opacity="1"},0)}),m,3e3,c,r),new a.DemoObj(()=>'\n<div class=\'demo-div\'>\n    <h1> QuadTree Compressor</h1>\n    <h2>Quick Run Down (1/3)</h2>\n    <h3>Intro</h3>\n<p> \nThis is a Javasript/HTML5 Canvas app that visualizes Quadtree Compression\n</p>\n<p>\nThe idea behind image compression is to find  way to represent the same image using less data.\nThis QuadTree compression algorithm accomplishes this by displaying areas with less color variation with fewer pixels and animates the process\nusing HTML5 canvas and Javascripts setTimeout.  \n\n</p>\n\n  <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n</div>\n',u,m,1e4),new a.DemoObj(()=>'\n<div class=\'demo-div\'>\n<h2>Quick Run Down (2/3)</h2>\n<h3>Implementation</h3>\n <p>\n The algorithm works by recursively splitting the image into quadrants, QuadTree nodes, that encompass an area and have an average color\nand a variance score. This variance score is calculated as the variance from the average color divided by the area. The algorithm\nfinds the node with then highest score, and breaks it into four nodes that each encompass one of its quadrants, the origin of\nthe name. The process then repeats constantly spliting the Node with the highest variance into four. \n</p>\n  <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n</div>\n',u,m,12e3,h),new a.DemoObj(()=>'\n<div class=\'demo-div\'>\n<h2>Quick Run Down (3/3)</h2>\n<h3>Results</h3>\n <p>This results in something like an edge finder. Areas with high color variance get lots of data, and areas with little variance get less. \n </p>\n <img src=\'http://res.cloudinary.com/flyakite/image/upload/v1515907371/download_13_rq5j2u_yrrgtd.png\' >\n            <button onclick="demo.stay()">Stay</button>\n            <button class=\'onto button-glow\' onclick="demo.destroyCurrentAndRun()">Next( Full Explanation)</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n</div>\n',u,m,6e3,d),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>BlockChop (1/3)</h2>\n            <h3>A Simple Intro</h3>\n            <p>\n              A more simple and naive example of how this works is the BlockChop. It\niterates through all the pixels in the image and picks one out of some area to represent that area. \n            </p>\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,6e3,(function(){const e=document.getElementById("qt"),t=document.getElementById("bc");t.classList.contains("collapse")&&t.classList.remove("collapse"),e.classList.contains("collapse")||e.classList.add("collapse")})),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>BlockChop (2/3)</h2>\n            <h3>A Simple Intro</h3>\n            <p>\n              For example with a  block size of 4x4, it would chop the image up into 4x4 blocks, choose one pixel out of each block and represent the entire block using the color of that pixel. So I this case the resulting image will have 1/(4*4) = 1/16th as many pixels as the original image. \n            </p>\n\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,p,1e4,(function(){const e=document.getElementById("niave");setTimeout(()=>e.click(),100)})),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>BlockChop (3/3)</h2>\n            <h3>Options</h3>\n<p>\n  If you would like to play around with it you can set the blocksize parameters, as well as how the chosen pixel is blown up to represent its block.\n            </p>\n\n  <ul>\n    <li>\n      <p>\n       * The default is by block, where the pixel is simply drawn the size of its block.\n                </p>\n    </li>\n    <li>\n      <p>\n       * real size which simply knits the pixels together and doesnt resize them\n                </p>\n    </li>\n\n    <li>\n      <p>\n       * pins neither resizes nor moves the pixels, and you can really see how this algorithm works\n                </p>\n    </li>\n\n    <li>\n      <p>\n       * circles uses arcs instead of fillRect which can be a cool effect\n                </p>\n    </li>\n  </ul>\n\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,5e3),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>The Simple Quadtree (1/3)</h2>\n            <h3>The Simple QuadTree version</h3>\n            <p>\n              The naive version of QuadTree compression doesn\'t calculate the average color nor the color variance.\nIt is similar to Blockchop in that it will give an equal pixel depth to all areas on the image,\nthe only difference is that it accomplishes this recursively using QuadTrees\n            </p>\n\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,1e4,c,(function(){document.getElementById("quadTreeVariance").checked=!1}),h,l),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>The Simple Quadtree (2/3)</h2>\n            <h3> Recusive Split</h3>\n            <p> the code for this is straight forward. A node is split into four, if thats successful the same process called on its children.</p>\n            <pre><code>\n    recusiveSplit(QuadNode) {\n      if(QuadNode.split()){\n        QuadNode.nodes.forEach((node)=>{\n          node.recusiveSplit(node)                                \n        });\n      }\n    }\n            </code></pre>\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,p,6e3),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>The Simple Quadtree(3/3)</h2>\n            <h3> Animating Each Step</h3>\n            <p> The process is animated by putting the calls to recursiveSplit into setTimeoutes and saving the ID of the timeouts in an array so that they can be cancelled by a button press using clearTimeout</p>\n            <pre>\n              <code>\n    timeOutes.push(setTimeout(\n      () => node.recusiveSplit(node),\n      100 / (node.boundaries.width * level)\n    );\n    \n              </code>\n            </pre>\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,6e3),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>Quadtree (1/4)</h2>\n            <h3>Next Step</h3>\n            <p>The full version of Quadtree compression has a few extra steps.\n            </p>\n            <p>When a node is created first an average color is calculated, and then using that average a variance is calculated and a variance score is assigned to every node as varaince/area</p>\n\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,1e4,c,r,h),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>Quadtree (2/4)</h2>\n            <h3>Finding The Right Node</h3>\n            <p>getHighestVarNode is an important helper function I wrote which searches for the highest variance node and returns it</p>\n            <pre><code>\n  getHighestVarNode() {\n    let highestVar = {node:null, var:0};\n    const finder = (Pnode) => {\n    //nodes[0]===undefined when this node has \n    //no children, meaning it is a leaf node.\n    //if this is a leaf node, check its\n    //variance against the highest seen so far\n      if (Pnode.nodes[0] === undefined) {\n        if (highestVar.var < Pnode.variance){\n          highestVar.node = Pnode;\n          highestVar.var = Pnode.variance;\n        }\n      }else{\n        Pnode.nodes.forEach( (node)=>{\n          finder(node);\n        });\n      }\n    };\n    finder(this);\n    return highestVar;\n  }\n            </code>\n            </pre>\n            <p>\n              The idea here is that finder takes a node (starts with the root). If the node has children it calls the function on all the children, otherwise it is a leaf node and its variance is compared to the largest variance seen and stored if larger.  \n            </p>\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,1e4),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>Quadtree (3/4)</h2>\n            <h3>Spliting by color Variance</h3>\n            <p>\n              With nodes that calculate color and variance on initialization, and a helper function\n              to find nodes with the highest variance, all we need to do is call it repeatedly in a way that can be animated.\n            </p>\n              <pre>\n                <code>\n  splitByVar(tree){\n      intervals.push(setInterval(()=>{\n          let hvn = tree.getHighestVarNode();\n          if (hvn.node === null || hvn.var === 0) clearInterval(a);\n          hvn.node.split();\n      },10));\n  }                  \n                </code>\n              </pre>\n              <p>\n                  splitByVar works by getting the highest variance node and calling for it to be split. It is done within a set interval so that the process can be animated and cancelled. \n                  The default escape conditions are that the highest variance node has a score of 0. \n              </p>\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.destroyCurrentAndRun()">Next</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,1e4),new a.DemoObj(()=>'\n            <div class=\'demo-div\'>\n            <h2>Quadtree (4/4)</h2>\n            <h3>Options</h3>\n            <p>if you would like to play around with it there are several parameters you can choose from</p>\n            <ul>\n              <li>\n                <p>* the split by var chechbox toggles whether to fo naive Quadtree compression or to go by color variance.\n                </p>\n              </li>\n\n              <li>\n                <p>* the circles checkbox toggles whether to fill in areas with circles or squares\n                </p>\n              </li>\n\n              <li>\n                <p>* the size ratio is how much each node is expanded. 1 is the same size as the nodes boundaries in square mode, or a radius of the width in circle mode. a value of .5 is half that. \n                </p>\n              </li>\n\n              <li>\n                <p>* the size limit is how deep into th image the quadtree will go. setting up a size limit of 10 will the smallest node be a 10x10 box. \n                </p>\n              </li>\n\n              <li>\n                <p>* The traverse type is the order in which the nodes are split. Different values are put into the setTimeoutes to change their order of execution.\n                </p>\n              </li>\n            \n            </ul>\n\n\n            <button onclick="demo.stay()">Stay</button>\n            <button onclick="demo.goBack()">Go Back</button>\n            <button onClick="demo.endRun()">End Demo</button>\n            </div>\n            ',u,m,1e4,d)];var v=new a.DemoRunner(g);const b=["https://i.imgur.com/cMMwsek.jpg"];document.addEventListener("DOMContentLoaded",(function(){const e=new y,t=(new Date).getTime();e.getImage(b[t%b.length]+`?${t}`),document.getElementById("imageUrlSubmit").addEventListener("click",(function(t){t.preventDefault();const n=document.getElementById("imageUrlInput").value;e.getImage(n+`?${(new Date).getTime()}`)})),document.getElementById("demoButton").addEventListener("click",(function(){v.toggle()}))}));class y{constructor(){this.setup()}getImage(e){let t=new Image;t.src=e,t.crossOrigin="Anonymous",t.onload=()=>{this.receiveImage(t)}}setup(){this.stopButton=document.getElementById("stopQuads"),this.resetButton=document.getElementById("reset"),this.resetButton.addEventListener("click",e=>{this.stopButton.click(),this.resultCtx.drawImage(this.img,0,0,this.img.width,this.img.height,0,0,this.resultCanvas.width,this.resultCanvas.height),this.imageData=this.resultCtx.getImageData(0,0,this.resultCanvas.width,this.resultCanvas.height)}),this.resultCanvas=document.getElementById("result"),this.resultCanvas.addEventListener("mousemove",this.handleMouseMove(this.resultCtx,this.menuColor)),this.menuColor=document.getElementById("menu-color"),this.clearButton=document.getElementById("clear"),this.clearButton.addEventListener("click",e=>this.resultCtx.clearRect(0,0,this.resultCanvas.width,this.resultCanvas.height)),this.resultCtx=this.resultCanvas.getContext("2d"),this.resultCtx.imageSmoothingEnabled=!1,this.quadTreeSimpleButton=document.getElementById("quadtree"),this.quadTreeSimpleButton.addEventListener("click",this.handleQuadTreeClick),this.divisionsNumberEl=document.getElementById("divisionsNumber"),this.blockChopButton=document.getElementById("blockChopToggle"),this.blockChopButton.addEventListener("click",this.blockChopMenuClick),this.niaveButton=document.getElementById("niave"),this.niaveButton.addEventListener("click",this.niaveCompressClick),this.quadTreeButton=document.getElementById("quadTreeToggle"),this.quadTreeButton.addEventListener("click",this.quadTreeMenuClick),this.varCheckbox=document.getElementById("quadTreeVariance"),this.traverseTypeSelect=document.getElementById("QuadTreeTraverse"),this.varCheckbox.checked&&(this.traverseTypeSelect.classList.add("greyed"),this.traverseTypeSelect.disabled=!0),this.varCheckbox.addEventListener("click",this.changeTraverseType),this.expandTypeSelect=document.getElementById("niaveInputExpand"),this.expandTypeSelect.addEventListener("change",this.changeExpandType),this.quadtreeMaker=new s(this.resultCtx)}blockChopMenuClick(){const e=document.getElementById("qt"),t=document.getElementById("bc");t.classList.contains("collapse")?t.classList.remove("collapse"):t.classList.add("collapse"),e.classList.contains("collapse")||e.classList.add("collapse")}quadTreeMenuClick(){const e=document.getElementById("bc"),t=document.getElementById("qt");t.classList.contains("collapse")?t.classList.remove("collapse"):t.classList.add("collapse"),e.classList.contains("collapse")||e.classList.add("collapse")}changeTraverseType(){this.varCheckbox.checked?(this.traverseTypeSelect.classList.add("greyed"),this.traverseTypeSelect.disabled=!0):(this.traverseTypeSelect.classList.remove("greyed"),this.traverseTypeSelect.disabled=!1)}changeExpandType(){const e=document.getElementById("niaveInputExpandval");this.expandTypeSelect.value<=2?(e.classList.add("greyed"),e.disabled=!0):this.expandTypeSelect.value>=3&&(e.classList.remove("greyed"),e.disabled=!1)}handleMouseMove(e,t){return n=>{const i=n.layerX,o=n.layerY,s=e.getImageData(i,o,1,1).data,a="color: rgba("+s[0]+", "+s[1]+", "+s[2]+", "+s[3]/255+")";t.style.background=a,t.textContent=a}}receiveImage(e){this.img=e,this.stopButton.click(),this.divisionsNumberEl.innerText="";this.resultCanvas.width=1024;const t=1024/e.width;this.resultCanvas.height=e.height*t,this.resultCtx.drawImage(e,0,0,e.width,e.height,0,0,this.resultCanvas.width,this.resultCanvas.height),this.imageData=this.resultCtx.getImageData(0,0,this.resultCanvas.width,this.resultCanvas.height)}niaveCompressClick(e){stopButton.click();let t=parseInt(document.getElementById("niaveInputX").value),n=parseInt(document.getElementById("niaveInputY").value),i=parseInt(document.getElementById("niaveInputExpand").value),o=parseFloat(document.getElementById("niaveInputExpandval").value);(i>5||i<1)&&(i=1),n<1&&(n=1),t<1&&(n=1),function(e,t,n,i,o){const s=[];document.getElementById("stopNiave").addEventListener("click",e=>s.forEach(e=>clearTimeout(e)));const a=e.data;if(2===i?(t.canvas.width=e.width/n.x,t.canvas.height=e.height/n.y):(t.canvas.width=e.width,t.canvas.height=e.height),5===i){const e=document.getElementById("svgOne");for(;e.firstChild;)e.removeChild(e.firstChild)}for(let d=0;d<e.height;d+=n.y)for(let h=0;h<e.width;h+=n.x)s.push(setTimeout(()=>{const s=4*(d*e.width+h);if(t.fillStyle="rgba("+a[s]+", "+a[s+1]+", "+a[s+2]+", "+a[s+3]+")",1===i)t.fillRect(h,d,n.x,n.y);else if(2===i)t.fillRect(h/n.x,d/n.y,1,1);else if(3===i)t.fillRect(h,d,o,o);else if(4===i)t.beginPath(),t.arc(h,d,(n.x+n.y)/(2*o),0,2*Math.PI,!1),t.fill();else if(5===i){let e="http://www.w3.org/2000/svg",i=document.createElementNS(e,"rect");i.setAttributeNS(null,"x",5*h),i.setAttributeNS(null,"y",5*d),i.setAttributeNS(null,"height",5*n.y),i.setAttributeNS(null,"width",5*n.x),i.setAttributeNS(null,"fill",t.fillStyle),document.getElementById("svgOne").appendChild(i)}},(h+600*d)/100))}(this.imageData,this.resultCtx,{x:t||10,y:n||10},i||1,o||1)}handleQuadTreeClick(){const t=this.imageData,n=(this.resultCtx,this.quadtreeMaker);stopButton.click(),e.preventDefault();let i=parseFloat(document.getElementById("quadTreeSize").value),o=parseInt(document.getElementById("quadTreeBlockSize").value);const s=document.getElementById("quadTreeCircle").checked,a=document.getElementById("QuadTreeTraverse").value,d=document.getElementById("quadTreeVariance").checked;o=o>=1?o:1,i=i>.001?i:1,n.makeQuadTree(t,o,s,a,d,i)}}}]);