
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine,world
var astronaut,astroImg
var bgImg
var ufo,ufoImg
var cannon,cannonball
var ground
var balls=[]
var ufos=[]
var muteImg
var muteBtn

var bgMusic,explosion

var score =0

function preload(){
bgImg=loadImage("bg.jpeg")
astroImg=loadImage("astronaut.jpeg")
ufoImg=loadImage("ufo.png")
explosion=loadSound("cannon_explosion.mp3")
bgMusic=loadSound("spooky.wav")
muteImg=loadImage("mute.png")

}

function setup() {
    createCanvas(800,600);

    engine = Engine.create();
    world = engine.world;

    groundOpt={
        isStatic:true
    }
    ground=Bodies.rectangle(width/2,height-10,width*2,10,groundOpt)
    World.add(world,ground)

    angleMode(DEGREES)
    angle=20
    cannon=new Cannon(410,510,150,150,angle)
    cannonball=new CannonBall(cannon.x,cannon.y)
   // ufo= new Ufo(400,50,50,50)

//    muteBtn=createImg("mute.png")
//    muteBtn.position(700,50)
//    muteBtn.size(50,50)
//    muteBtn.mouseClicked(mute)
}

function draw() {
    background(51);
image(bgImg,0,0,800,600)



   if(!bgMusic.isPlaying()){
    bgMusic.play()
    bgMusic.setVolume(0.1)
   }

    Engine.update(engine);
    rectMode(CENTER)
    rect(ground.position.x,ground.position.y,width*2,10)
    cannon.display()
    //ufo.display()
for (var i=0;i < balls.length;i++){
    showCannonBalls(balls[i],i)
    collisionWithUfo(i)
    
}    

showUfo()


// if(balls!=null){


// if(collide(balls,ufo) == true){
// World.remove(world,cannonball)
// ufo.destroy()
// }
// }
drawSprites()
fill("blue")
textSize(40)
text("score:"+score,60,50)
   
}





// function spawnUfo(){
//     if(frameCount%60===0){

    
//     ufo=createSprite(200,50,10,10)
//     ufo.addImage(ufoImg)
//     ufo.scale=0.2

    
    
//     ufo.x=Math.round(random(50,750))
//     ufo.velocityY=2
// }
// }


function keyReleased(){
    if(keyCode===DOWN_ARROW){
        explosion.play()
        balls[balls.length-1].shoot()

    }
}

function keyPressed(){
    if (keyCode === DOWN_ARROW) {
        var cannonBall = new CannonBall(cannon.x, cannon.y);
        Matter.Body.setAngle(cannonBall.body, cannon.angle);
        balls.push(cannonBall);
      }
}
function showCannonBalls(ball,index){
    if(ball){
        ball.display()
        
            if (ball.body.position.x>=width||ball.body.position.y>=height) {
                ball.remove(index)
            }
           
    }
    
}

// function collide(body,sprite){
//     if(body!=null){
//         var d =dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
//         if(d<=30){
//             return true
//         }
//         else{
//             return false

//         }
         
//     }
// }


function showUfo(){
    if (ufos.length > 0) {
        if (
         // ufos.length < 4 &&
          ufos[ufos.length - 1].body.position.y > height - 500
        ) {
          var positions = [120,150,10,200,550,400,250,700];
          var position = random(positions);
          var ufo = new Ufo(
            position,
            10,
            50,
            50,
            
            
          );
    
          ufos.push(ufo);
        }
        for (var i = 0; i < ufos.length; i++) {
            Matter.Body.setVelocity(ufos[i].body, {
              x: 0,
              y: 0.9
            });
            
            ufos[i].display();
            var collision=Matter.SAT.collides(ground,ufos[i].body)
            if(collision.collided){
               // Over()
                gameOver()
               
              }
        }
    }
    else {
        var ufo = new Ufo(width-400, height - 400, 50, 50);
        ufos.push(ufo);
      }
    
    
}



function collisionWithUfo(index){
for (var i=0;i<ufos.length;i++) {
    if (balls[index]!=undefined&&ufos[i]!=undefined) {
        var collision=Matter.SAT.collides(balls[index].body,ufos[i].body)

        if(collision.collided){
            score=score+5
            ufos[i].remove(i)
            Matter.World.remove(world,balls[index])
            delete balls[index]
        }
    }

   
}
}

// function Over(){
//     Matter.Body.setVelocity(ufos[index].body,{x:0,y:0})
//     bgMusic.stop()
    

//   }

  
function gameOver(){
    bgMusic.stop()
    swal({
      title:' game Over ',
      text:"thanks for playing ",
      imageUrl:"https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
      imageSize:"150x150",
      confirmButton:"play again "
  
    },
    function(isConfirm){
      if(isConfirm){
        location.reload()
  
      }
    }
    )
  }
  
// function mute(){
//     if(bgMusic.isPlaying()){
//         bgMusic.stop()
//     }
//    else{
//     bgMusic.play()
//    }
// }


