import { DemoObj,DemoRunner} from '../assets/demo';

const intro = `
<div class='aa'>
 <h2> 1</h2>
  <h2> this is template</h2>
  <h1> it might explain stuff</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.test()">test</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const two = `
<div class='aa'>
 <h2> 2</h2>
  <h2> another page</h2>
  <h1> wweeeeeeee</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.test()">test</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const fadeIn = function(el){
    console.log('fadein')
    const body = document.querySelector('body');
    body.appendChild(el);

};

const fadeOut = function(next,el){
    console.log('fadeout')
    const body = document.querySelector('body');
    console.log(body);
    body.removeChild(el);
    next();
};

const demo = [
    new DemoObj(intro, fadeIn, fadeOut, 4000),
    new DemoObj(two, fadeIn, fadeOut, 4000),
    new DemoObj(intro, fadeIn, fadeOut, 4000),
    new DemoObj(two, fadeIn, fadeOut, 4000),
];

export default new DemoRunner(demo);

    

