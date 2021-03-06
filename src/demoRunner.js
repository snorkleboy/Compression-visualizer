import {
    DemoObj,
    DemoRunner
}
from './demo/demo';
import * as DemoPages from './demo/demopages';
import * as DemoAction from './demo/demoactions';

export const fromRightFade = function (el) {
    const parent = document.getElementById('canvasHolder');
    el.style.position = 'absolute';
    el.style.transition = '1s all';
    el.style.left = '300%';
    el.style.opacity = '0';
    parent.appendChild(el);
    setTimeout(() => {
        el.style.left = '0%';
        el.style.opacity = '1';

    }, 0);
}

export const fadeIn = function (el, message) {
    const parent = document.getElementById('canvasHolder');
    el.style.transition = '.7s all';
    el.classList.add('invisible');
    parent.appendChild(el);
    setTimeout(() => {
        el.classList.remove('invisible');
    }, 0);
};

export const fadeOut = function (el, next) {
    const parent = document.getElementById('canvasHolder');
    el.style.opacity = '1';
    el.style.transition = '.3s all';
    setTimeout(() => {
        el.style.opacity = '0';
    }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 400);
};

export const fadeOutStop = function (el, next) {
    DemoAction.clickStopBlockChop();
    DemoAction.clickStopQuad();
    const parent = document.getElementById('canvasHolder');
    el.style.opacity = '1';
    el.style.transition = '.3s all';
    setTimeout(() => {
        el.style.opacity = '0';
    }, 0);
    setTimeout(() => {
        parent.removeChild(el);
        next();
    }, 400);
};


const demo = [
    new DemoObj(DemoPages.intro, fromRightFade, fadeOut, 3000, DemoAction.ensureQuadMenu, DemoAction.ensureQTvar),
    new DemoObj(DemoPages.introExplain, fadeIn, fadeOut, 10000),
    new DemoObj(DemoPages.QuadTreeRun, fadeIn, fadeOut, 12000, DemoAction.clickQuadTree),
    new DemoObj(DemoPages.QuadTreeExplain, fadeIn, fadeOut, 6000, DemoAction.stay),
    new DemoObj(DemoPages.BlockChopIntro, fadeIn, fadeOut, 6000, DemoAction.ensureBlockChopmenu),
    new DemoObj(DemoPages.BlockChop, fadeIn, fadeOutStop, 10000, DemoAction.clickBlockChop),
    new DemoObj(DemoPages.BlockChopOptions, fadeIn, fadeOut, 5000),
    new DemoObj(DemoPages.QuadRec, fadeIn, fadeOut, 10000, DemoAction.ensureQuadMenu, DemoAction.ensureQTrec, DemoAction.clickQuadTree, DemoAction.clickStopQuad),
    new DemoObj(DemoPages.QuadRecRun, fadeIn, fadeOutStop, 6000),
    new DemoObj(DemoPages.QuadRecRun2, fadeIn, fadeOut, 6000),
    new DemoObj(DemoPages.Quadvar, fadeIn, fadeOut, 10000, DemoAction.ensureQuadMenu, DemoAction.ensureQTvar, DemoAction.clickQuadTree),
    new DemoObj(DemoPages.QuadvarGetHighest, fadeIn, fadeOut, 10000),
    new DemoObj(DemoPages.QuadVarexp, fadeIn, fadeOut, 10000),
    new DemoObj(DemoPages.Quadvarparams, fadeIn, fadeOut, 10000, DemoAction.stay),

];

export default new DemoRunner(demo);