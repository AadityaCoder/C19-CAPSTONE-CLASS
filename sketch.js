var spaceBack , spaceBackImg;  
var rocket , rocketImg;
var MissilesGroup , MissileImg , MissileSound ;
var edges;
var gameState=1;
var cashG , cashImg ; 
var meteroidImg , meteroidsGroup;
var gameOver , gameOverImg , gameOverSound;
var starImg , starsGroup;
var winSound;


function preload(){
  spaceBackImg=loadImage("spaceBackground.jpg")
  rocketImg=loadImage("rocket.png")
  MissileImg=loadImage("charlie.png")
  MissileSound=loadSound("rocketExplosion.wav")
  cashImg=loadImage("starImg.png");
  meteroidImg=loadImage("meteroid.png");
  gameOverImg=loadImage("gameOver.gif");
  gameOverSound=loadSound("gameOverEffect.wav");
  starImg=loadImage("starImage.png");
  winSound=loadSound("winSound.wav");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  spaceBack=createSprite(300,300);
  spaceBack.addImage("moving",spaceBackImg)
  spaceBack.scale=3;
  spaceBack.velocityY=2;
  
  rocket=createSprite(325,499);
  rocket.addImage("moving",rocketImg)
  rocket.scale=0.05 ;
  
  gameOver=createSprite(350,300,100,100);
  gameOver.addImage("moving",gameOverImg);
  
  
  
 MissilesGroup = new Group (); 
 starsGroup = new Group ();
 meteroidsGroup = new Group(); 
  
 edges = createEdgeSprites() ; 
}

function draw() { 
  background(0);
  
if (gameState===1)  {
  gameOver.visible=false;
  
  if(spaceBack.y>400){
     spaceBack.y=300
}
  
  rocket.x = World.mouseX
  
   //when space key is pressed bullet release
  if (keyDown("space")) {
    createMissile();
    MissileSound.play();
  }
  
  
  if(MissilesGroup.isTouching( meteroidsGroup)){
     meteroidsGroup.destroyEach();
    
  }
  if(starsGroup.isTouching(rocket)){
    
    winSound.play();
    starsGroup.destroyEach();
  }
  
  if( meteroidsGroup.isTouching(rocket)){
    gameState=0;
    
  }
  
}
  if(gameState===0){
  fill("green");
  text("Press Mouse Key to Restart", 300,40)  ;
    
    
    
    if(spaceBack.y>400){
     spaceBack.y=300
}
  gameOverSound.play()  ;
   rocket.destroy();
   MissilesGroup.destroyEach();
   meteroidsGroup.destroyEach(); 
   starsGroup.destroyEach() ;
   gameOver.visible=true; 
   gameOver.scale=2; 
    
    
    
    
    
  }
  createMeteroid();
  createStar();
  drawSprites();
  
}

function  createMissile() {
    var missile= createSprite(10, 400, 60, 10);
    missile.addImage(MissileImg );
    missile.x = 400;
    missile.x=rocket.x;    
    missile.velocityY = -11;
    missile.lifetime = 89;
    missile.scale = 0.03;
    missile.debug=false;
    rocket.depth=missile.depth+1; 
    MissilesGroup.add(missile);
}
  
function createMeteroid(){
if (frameCount%80===0) {
     var x = Math.round(random(0,500));
     //console.log(x);
     
     var meteroid=createSprite(x,10,40,10)  
     meteroid.addImage(meteroidImg);  
     meteroid.velocityY=5;  
     meteroid.scale=0.7;  
     meteroid.lifetime=600;  
     meteroidsGroup.add(meteroid)

  
     rocket.depth=meteroid.depth+1;  
  
}  
  
}

function createStar(){
if (frameCount%100===0) {
     var y = Math.round(random(1,550));
     //console.log(x);
     
     var star=createSprite(y,20,40,10)  
     star.addImage(starImg);  
     star.velocityY=5;  
     star.scale=0.06;  
     star.lifetime=600;  
     starsGroup.add(star)

  
     rocket.depth=star.depth+1;  
  
}  
  
}






