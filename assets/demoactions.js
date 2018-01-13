import quadtree from "../js/quadtree";

export const stayCB = function (runner) {
    runner.stay();
};

export const clickQuadTree = function(){
    const quadtreeButton = document.getElementById('quadtree');
    quadtreeButton.click();
};

export const clickReset = function(){
    const resetButton = document.getElementById('reset')
    resetButton.click();
}

