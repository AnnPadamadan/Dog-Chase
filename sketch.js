var bg, bgImg;
var rh, rhImg, rhImg2;
var boo, booImg;
var start = 0;
var play = 1;
var end = 2;
var gameState = start;
var sq, sqImg
var redge, ledge, bedge, tedge;
var treat;
var treatImg;
var blueCar;
var whiteCar;
var redCar;
var car;
var score = 0;
var dt = 0;
var touch = 0;
 var music;
 var bool = 0;
 var go;
 var gmov;
 var plg;
 var plgn;
 var help1;
 var helps;
 var st;
 var stImg;

function preload(){
 bgImg = loadImage("imgs/road 2.png")
rhImg = loadAnimation("imgs/red head person 2.png","imgs/red head person 2.png", "imgs/red head person 1.png", "imgs/red head person 1.png");
booImg = loadImage("imgs/boo.png");
sqImg = loadImage("imgs/squirrel.png");
treatImg = loadImage("imgs/treatImg.png");
blueCar = loadImage("imgs/blue car.png");
whiteCar = loadImage("imgs/white car (1).png");
redCar  = loadImage("imgs/red car.png");
music = loadSound("funky music.mp3");
go = loadImage("imgs/gameover cool (1).png");
rhImg2 = loadAnimation("imgs/rh3.png")
plg = loadImage("imgs/playagain modern (1).png")
help1 = loadImage("imgs/help1.png");
stImg =  loadImage("imgs/play button.png");
}
function setup() {
  
  
  createCanvas(500, 500);
  bg = createSprite(300, 350, 10, 10);
  bg.addImage(bgImg);
  bg.scale = 2;
  bg.velocityY = 2;
  bg.y = bg.height/2;

  st = createSprite(400, 450, 10, 10);
  st.addImage(stImg);
  st.scale = 0.3;



rh = createSprite(300, 450, 10, 10);
rh.addAnimation("red head 2", rhImg2);
  rh.addAnimation("red head", rhImg);
  rh.scale = 1;

  boo = createSprite(300, 350, 10, 10);
  boo.addImage(booImg);
  boo.scale = 0.3;

  sq = createSprite(300, 250, 10, 10);
  sq.addImage(sqImg);
  sq.scale = 0.7

  
gmov = createSprite(250, 250, 10, 10);
gmov.addImage(go);
gmov.visible = false;
//go.scale = 1;
  
plgn = createSprite(270, 400, 10, 10);
plgn.addImage(plg);
plgn.visible = false;
//plgn.scale = 1;

helps = createSprite(10, 10, 10, 10);
helps.addImage(help1);
helps.visible = true;
helps.scale = 0.05;

//rh.debug = true;
//rh.setCollider("rectangle", 0, 0, 150, 50);

 

  treatGroup = new Group();
  carGroup = new Group();
}
 


function draw() {
  
  background("gray");
  fill(0);

  textSize(15);

    text("Score: "+ score, 10, 300);
//text(mouseX+" "+mouseY, mouseX, mouseY);
if(mousePressedOver(helps)){
  helper();
}

  if(gameState == start){
    if(bg.y>200){
      bg.y = bg.height/2;
      st.visible = true;
    }
    sq.velocityY = -5;
  boo.velocityY = -5;
  if(mousePressedOver(st)){
    gameState = play;
    music.loop();
  }

 }else if(gameState == play){
   st.visible = false;
  if(bg.y>200){
    bg.y = bg.height/2;
  }
  rh.changeAnimation("red head", rhImg);
if(keyWentDown(49)){
  rh.x = 170;
}
if(keyWentDown(50)){
  rh.x = 300
}
if(keyWentDown(51)){
  rh.x = 450
}
treats();
if(rh.isTouching(treatGroup)){
  treatGroup.destroyEach();
  score = score+1;
}

ob();
if(rh.isTouching(carGroup)){
  carGroup.destroyEach();
  touch++;
  
}
if(touch >= 1){
gameState = 2;
}

}
else if(gameState == 2){
  gmov.visible = true;
  plgn.visible = true;

  bg.velocityY = 0;
  
  //bg.visible = false;
  carGroup.setVelocityYEach(0);
  treatGroup.setVelocityYEach(0);

rh.changeAnimation("red head 2", rhImg2);

carGroup.setLifetimeEach(-1);
  treatGroup.setLifetimeEach(-1);





    if(mousePressedOver(plgn)){
    restart();
    }
 
  
}

 
drawSprites();
}


function treats(){
  if (frameCount % 60 === 0&&gameState == play){
   treat = createSprite(10,280,10,40);
    //banana.debug = true;
   treat.velocityY = 3;
   
   x = Math.round(random(1, 3));
   
   switch(x){
     case 1: treat.x = 100;
     break;
     case 2: treat.x = 250;
     break;
     case 3: treat.x = 440;
     break;
     default: break;
   }
   console.log(treat.x);
    treat.addImage("treat", treatImg );
    
    treat.scale = 0.2;
    treat.lifetime = 300;
    treat.setCollider("rectangle", 0, 0,250, 250)
   // treat.debug = true;
    treatGroup.add(treat);
  }
  
      
}

function ob(){
  if (frameCount % 120 === 0&&gameState==play){
    car = createSprite(100,0,10,40);
     //banana.debug = true;
   
    car.velocityY = Math.round(random(3,10));
    x = Math.round(random(1,3));
   
   switch(x){
     case 1: car.x = 130;
     break;
     case 2: car.x = 280;
     break;
     case 3: car.x = 470;
     break;
     default: break;
   }
    var rand = Math.round(random(2,3));
    switch (rand){
     
      case 2: car.addImage(whiteCar);
      break;
      case 3: car.addImage(redCar);
      break;
      default: break;
    }
 
    console.log(car.x);
     
     
     car.scale = 0.5;
     car.lifetime = 300;
     car.setCollider("rectangle", 0, 0, 100, 250)
   //  car.debug = true;
     carGroup.add(car);
   }
}

function restart(){
  carGroup.destroyEach();
  treatGroup.destroyEach();
  touch = 0;
    gameState = play;
    gmov.visible = false;
    plgn.visible = false;
    rh.changeAnimation("red head", rhImg);
   carGroup.setLifetimeEach(300);
   treatGroup.setLifetimeEach(300);

    score = 0;
  
}

function helper(){
  text("Don't get ", 10, 30);
  text("hit by ", 10, 50);
  text("the cars.", 10, 70);
  text("Collect ", 10, 90);
  text("the food ", 10, 110);
  text("to score.", 10, 130);

  text("Use 1, 2 ", 10, 150);
  text("and 3 to", 10, 170);
  text("switch", 10, 190);
  text("lanes.", 10, 210);
 



  //Don't get hit by the cars. Collect the food to increase your score. Use 1, 2, and 3 to switch lanes.
}