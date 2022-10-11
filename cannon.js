class Cannon{
    constructor(x,y,w,h,angle){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.angle=angle
        this.canoImg=loadImage("canon.png")
        this.canobaseImg=loadImage("cannonBase.png")

    }
    
display(){
    if(keyIsDown(RIGHT_ARROW)){
        this.angle=this.angle+3
    }
    if(keyIsDown(LEFT_ARROW)){
        this.angle=this.angle-3
    }
    push()
    
    translate(this.x,this.y)
    rotate(this.angle)
    imageMode(CENTER)
    image(this.canoImg,0,0,this.w,this.h)
    pop()

    image(this.canobaseImg,310,410,200,200)
}
   
}