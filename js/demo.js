import { DemoObj,DemoRunner} from '../assets/demo';
import { setTimeout } from 'timers';

const intro = () => `
<div class='aa'>
 <h2> 1</h2>
  <h2> this is template</h2>
  <h1> it might explain stuff</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const two = () => `
<div class='aa'>
 <h2> 2</h2>
  <h2> another page</h2>
  <h1> wweeeeeeee</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const three = () => `
<div class='aa'>
 <h2> 3</h2>
  <h2> a third? no way</h2>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`;
const four = () => {

    return `
<div class='aa'>
 <h2> 4</h2>
  <h2> back</h2>
  <h1> fo mo</h1>
  <button onclick="demo.stay()">stay</button>
  <button onclick="demo.destroy()">destroy</button>
  <button onclick="demo.goBack()">goBack</button>
  <button onClick="demo.end()">end demo</button>
</div>
`};
const fadeIn = function(el){
    const body = document.querySelector('body');
    body.appendChild(el);

};

const fadeOut = function(next,el){
    const body = document.querySelector('body');
    console.log(el);

    el.style.opacity ='0';
    setTimeout(()=>{
        body.removeChild(el);
        next();
    },1010)
};

const demo = [
    new DemoObj(intro, fadeIn, fadeOut, 4000),
    new DemoObj(two, fadeIn, fadeOut, 4000),
    new DemoObj(three, fadeIn, fadeOut, 4000),
    new DemoObj(four, fadeIn, fadeOut, 4000),
];

export default new DemoRunner(demo);

    

