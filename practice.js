function Movable(position, velocity=[0,0], charge=1,mass=20, size=10){
        this.charge=charge;
        this.mass=mass;
        this.size=size;
        this.position=position;
        this.velocity=velocity;
        
    }
    Movable.prototype.updateFromList= function (objArr, delta){
        let force=[0,0]
        objArr.forEach(function (obj){            
            this.getforceFrom(obj, force)
           }.bind(this))
        // console.log(force + "     " + this)
        this.applyForce(force);
        this.move(delta);
    }
    Movable.prototype.getforceFrom= function(obj, force){
        let dc=this.charge*obj.charge;
        let dpx=(this.position[0]-obj.position[0]);
        let dpy=(this.position[1]-obj.position[1]);
        let dist=Math.sqrt(dpx*dpx+dpy*dpy)
        // console.log (dpx+ "    "  +dpy);
        if (dpx===0){
            dp=1
        }
        if (dpy===0){
            dpy=1
        }
        forceT=(10000) * (dc)/ (dist*dist);
        // if (forceT>100) {
        //     forceT=100;
        // }
        // if (forceT<-100) {
        //     forceT=-100;
        // }
        
        force[0]=forceT*Math.sin(dpx/dist)
        //  if (dpx>0){ force[0] *= -1}
        force[1]=forceT*Math.sin(dpy/dist);
        // console.log("position:  " + this.position)
        // console.log("total force:   "+forceT)
        // console.log("force vectors:    "+force)
        
        //  if (dpy<0){ force[1] *= -1}
    
            // secretsauceforce
            //  if (Math.abs(dpx) < this.size && Math.abs(dpy)< this.size){

            //      this.velocity[0]*=-.5;
            //      this.velocity[1]*=-.5;
            //  }
        //  console.log(this.position + "   " + force)
        return (force);
        
    }
    Movable.prototype.applyForce= function(force){
        this.velocity[0]+=force[0]/this.mass;
        this.velocity[1]+=force[1]/this.mass;
        
    
    }
    Movable.prototype.move= function(delta){
        this.position[0] += this.velocity[0]*delta;
        this.position[1] += this.velocity[1]*delta;
        
        if (this.position[0]<0){
            this.position[0]=0;
            this.velocity[0]*=-.7;
        }
        if (this.position[0]>500){
            this.position[0]=500;
            this.velocity[0]*=-.7;
        }
        if (this.position[1]<0){
            this.position[1]=0;
            this.velocity[1]*=-.7;
        }
        if (this.position[1]>500){
            this.position[1]=500;
            this.velocity[1]*=-.7;
        }
        
    }
    
    Movable.prototype.drawMe= function (ctx){
        ctx.beginPath();
        ctx.arc(this.position[0], this.position[1], 10, 0, 360);
        if (this.charge>0){
        ctx.fillStyle = "blue";
        } else{
            ctx.fillStyle = "red";
        }
        ctx.fill();    
    }
document.addEventListener("DOMContentLoaded", function(){



    function init() {  
        this.step=1;
        this.time = new Date();
        this.objArr=[]
         for(let i=0;i<5;i++){
             this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,-1));
             this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,1));
             
         }
        // this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,-1));
        // this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,1));

        // console.log(objArr[0].charge)
        this.canvas = document.getElementById('mycanvas');
        this.canvas.width=500;
        this.canvas.height=500;
        this.ctx = canvas.getContext('2d');
      window.requestAnimationFrame(draw.bind(this));
    }
    
    function draw() {
        let deltat = this.time;
        this.time= new Date();

        deltat=35/(this.time.getTime()-deltat.getTime());
        // console.log(deltat);
        
        
      ctx.globalCompositeOperation = 'destination-over';
    
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
      ctx.clearRect(0, 0, 500, 500);
      ctx.save();
      
    //   console.log("obj0 pos:  " + objArr[0].position);
    //   console.log("obj0 vel:  " + objArr[0].velocity);
    //   console.log("obj1 pos:  " + objArr[1].position);
    //   console.log("obj1 vel:  " + objArr[1].velocity);
      

         objArr.forEach(function (el, i){
             el.drawMe(ctx);             
             nobjarr=objArr.slice(0,i).concat(objArr.slice(i+1,objArr.length))
             el.updateFromList(nobjarr,deltat);             
         })

        ctx.restore()
         step++;
      window.requestAnimationFrame(draw.bind(this));
    }
    
    init();
});
