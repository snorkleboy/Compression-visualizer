import quadtree from "../quadtree";

export const stay = function (runner) {
    runner.stay();
};

export const clickQuadTree = function(){
    const quadtreeButton = document.getElementById('quadtree');
    setTimeout(() =>quadtreeButton.click(),500);
};

export const clickReset = function(){
    const resetButton = document.getElementById('reset')
    resetButton.click();
};
export const clickStopQuad = function(){
    const stopButton = document.getElementById('stopQuads');
    setTimeout(() => stopButton.click(), 3000)
    
}
export const clickBlockChop = function(){
    const blockChop = document.getElementById('niave');
    setTimeout(()=>blockChop.click(),100);
};
export const clickStopBlockChop = function () {
    const blockChopbutton = document.getElementById('stopNiave');
    setTimeout(() => blockChopbutton.click(), 100);
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

