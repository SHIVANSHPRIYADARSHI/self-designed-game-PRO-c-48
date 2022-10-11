class Ufo {
    constructor(x, y, width, height,ufoPos) {
     
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
     this.ufoImg=loadImage("ufo.png")
  
      World.add(world, this.body);
    }
   
  
    remove(index) {
      
      setTimeout(() => {
        Matter.World.remove(world,ufos[index].body);
        ufos.splice(index, 1);
      }, 1000);
    }
  
    display() {
      var pos = this.body.position;
  
      push();
      
      imageMode(CENTER);
      image(this.ufoImg,pos.x,pos.y, this.width, this.height);
      
      pop();
    }
  }
  