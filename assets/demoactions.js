import quadtree from "../js/quadtree";

export const stay = function (runner) {
    runner.stay();
};

export const clickQuadTree = function(){
    const quadtreeButton = document.getElementById('quadtree');
    setTimeout(() =>quadtreeButton.click(),1500);
};

export const clickReset = function(){
    const resetButton = document.getElementById('reset')
    resetButton.click();
};

export const clickBlockChop = function(){
    const blockChop = document.getElementById('niave');
    setTimeout(()=>blockChop.click(),0);
};
export const ensureQTrec = function(){
    const variance = document.getElementById('quadTreeVariance');
    variance.checked = false;
}
export const ensureQTvar = function () {
    const variance = document.getElementById('quadTreeVariance');
    variance.checked = true;
}
export const ensureQuadMenu = function () {
    const otherContainer = document.getElementById('bc');
    const container = document.getElementById('qt');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : null;
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');

};

export const ensureBlockChopmenu = function () {
    const otherContainer = document.getElementById('qt');
    const container = document.getElementById('bc');
    container.classList.contains('collapse') ? container.classList.remove('collapse') : null;
    if (!otherContainer.classList.contains('collapse')) otherContainer.classList.add('collapse');
};

