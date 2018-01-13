import { DemoObj,DemoRunner} from '../assets/demo';
import * as DemoPages from '../assets/demopages';
import * as DemoAction from '../assets/demoactions';


export const fadeIn = function (el, message) {
    const parent = document.getElementById('canvasHolder');
    el.classList.add('invisible');
    parent.appendChild(el);
    setTimeout(() => { el.classList.remove('invisible'); }, 0);
};

export const fadeOut = function (el, next) {
    const parent = document.getElementById('canvasHolder');
    el.style.transition = '.3s opacity';
    setTimeout(() => { el.classList.add('invisible'); }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 400);
};


const demo = [
    new DemoObj(DemoPages.intro, fadeIn, fadeOut, 3000),
    new DemoObj(DemoPages.introExplain, fadeIn, fadeOut, 10000, DemoAction.ensureQuadMenu),
    new DemoObj(DemoPages.QuadTreeRun, fadeIn, fadeOut, 10000,DemoAction.clickQuadTree),
    new DemoObj(DemoPages.QuadTreeExplain, fadeIn, fadeOut, 6000, DemoAction.stay),
    new DemoObj(DemoPages.BlockChopIntro, fadeIn, fadeOut, 6000,DemoAction.ensureBlockChopmenu),
    new DemoObj(DemoPages.BlockChop, fadeIn, fadeOut, 10000, DemoAction.clickBlockChop),
    new DemoObj(DemoPages.BlockChopOptions, fadeIn, fadeOut,5000),
    
];

export default new DemoRunner(demo);

    

