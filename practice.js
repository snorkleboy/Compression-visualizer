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
        if (dist<1){
            dist=1; 
        }
        forceT=(100) * (dc)/ (dist*dist);
        if (forceT>50) {
            forceT=50;
        }
        if (forceT<-50) {
            forceT=-50;
        }
        
        force[0]+=forceT*Math.sin(dpx/dist)
        force[1]+=forceT*Math.sin(dpy/dist);

    
            // secretsauceforce
            //  if (dist<5){

            //     force[0]-=10*forceT*Math.sin(dpx/dist)/dist;
            //     force[1]-=10*forceT*Math.sin(dpy/dist)/dist;
                
            //  }
        //  console.log(this.position + "   " + force)
        return (force);
        
    }
    Movable.prototype.applyForce= function(force){
        speed=Math.sqrt(this.velocity[0]*this.velocity[0]+this.velocity[1]*this.velocity[1])
        speedFac= speed;
        this.velocity[0]+=force[0]/this.mass;
        this.velocity[1]+=force[1]/this.mass;
        this.velocity[0]*=.99;
        this.velocity[1]*=.99;
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
         for(let i=0;i<3;i++){
             this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,1));
             this.objArr.push( new Movable( [Math.random()*100,Math.random()*100] , [0,0] ,-1));
         }
        this.canvas = document.getElementById('mycanvas');
        this.canvas.width=500;
        this.canvas.height=500;
        this.ctx = this.canvas.getContext('2d');
      window.requestAnimationFrame(draw.bind(this));
    }
    
    function draw() {
        let deltat = this.time;
        this.time= new Date();

        deltat=500/(this.time.getTime()-deltat.getTime());
         console.log(deltat);

      ctx.globalCompositeOperation = 'destination-over';

      ctx.clearRect(0, 0, 500, 500);
      ctx.save();
      
         objArr.forEach(function (el, i){
             el.drawMe(ctx);             
             let nobjarr=objArr.slice(0,i).concat(objArr.slice(i+1,objArr.length))
             el.updateFromList(nobjarr,deltat);             
         })

        ctx.restore()
         step++;
      window.requestAnimationFrame(draw.bind(this));
    }
    
    init();
});
