export const DemoObj = class DemoObj {
  constructor(el, add, remove, time) {
    this.el = null;
    this.htmlMaker = el;
    this.add = add;
    this.remove = remove;
    this.time = time;
    this.attached = false;
  }
  build() {
    this.el = document.createElement('div');
    this.el.innerHTML = this.htmlMaker();
    this.add(this.el);
    this.attached = true;
  }
  destroy(next) {
    this.attached = false;
    this.remove(next, this.el);
  }
};
export const DemoRunner = class DemoRunner {
  constructor(elobjs, destroy) {
    this.destroy = destroy;
    this.elements = elobjs;
    this.index = 0;
    this.to = null;
    this.current = null;
  }
  run() {
    if (this.index > this.elements.length - 1) return this.endRun();
    const obj = this.elements[this.index];
    this.current = obj;
    this.bindMethods();
    obj.build();
    ++this.index;
    this.to = setTimeout(this.destroyCurrentAndRun.bind(this), obj.time);
  }
  bindMethods() {
    window.demo = {};
    window.demo.stay = this.stay.bind(this);
    window.demo.destroy = this.destroyCurrentAndRun.bind(this);
    window.demo.goBack = this.goBack.bind(this);
    window.demo.end = this.endRun.bind(this);
  }
  goBack() {
    if (this.index > 1) {
      clearTimeout(this.to);
      this.destroyCurrent();
      this.index = this.index - 2;
      this.run();
    }
  }
  stay() {
    clearTimeout(this.to);
  }
  destroyCurrentAndRun() {
    clearTimeout(this.to);
    this.current.destroy(this.run.bind(this));
  }
  destroyCurrent() {
    clearTimeout(this.to);
    this.current.destroy(function () { });
  }
  endRun() {
    clearTimeout(this.to);
    if (this.current.attached) this.destroyCurrent();
    if (typeof this.destroy === 'function') this.destroy();
    window.demo = undefined;
    this.index = 0;
  }
};