import { DemoObj,DemoRunner} from '../assets/demo';
import * as DemoPages from '../assets/demopages';
import * as DemoAction from '../assets/demoactions';


export const fadeIn = function (el) {
    const parent = document.getElementById('canvasHolder');
    el.classList.add('invisible');
    parent.appendChild(el);
    setTimeout(() => { el.classList.remove('invisible'); }, 0);
};

export const fadeOut = function (next, el) {
    const parent = document.getElementById('canvasHolder');
    setTimeout(() => { el.classList.add('invisible'); }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 1010);
};


const demo = [
    new DemoObj(DemoPages.intro, fadeIn, fadeOut, 2000),
    new DemoObj(DemoPages.introExplain, fadeIn, fadeOut, 10000),
    new DemoObj(DemoPages.QuadTreeRun, fadeIn, fadeOut, 10000,DemoAction.clickQuadTree),
    new DemoObj(DemoPages.QuadTreeExplain, fadeIn, fadeOut, 6000),
    new DemoObj(DemoPages.four, fadeIn, fadeOut, 6000),
];

export default new DemoRunner(demo);

    

