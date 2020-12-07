var monkey,monkeyAnimation;
var obstacleImg;
var jungleImg;
var bananaImg;
var stoneImg
var background1;
var bananaGroup, obstacleGroup;
var invisGround;
var rockSmash;
var scoreSnd;
var score;

function preload() {
  monkeyAnimation=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","  Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  obstacleImg = loadImage("stone.png");
  jungleImg=loadImage("jungle.jpg");
  bananaImg=loadImage("banana.png");
  stoneImg=loadImage("stone.png");
  rockSmash=loadSound("Smashing-Yuri_Santana-1233262689.mp3");
  scoreSnd=loadSound("Ping-sound.mp3");
} 

function setup() {
  createCanvas(400, 400);
  
  background1 = createSprite(200,200,400,400);
  background1.addImage("background2",jungleImg);
  background1.scale = 2
  background1.x = background1.width/2;
  
  monkey = createSprite(50,330,10,10);
  monkey.addAnimation("running",monkeyAnimation);
  monkey.scale = 0.08
  
  invisGround = createSprite(200,405,400,50);
  
  score = 0;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
}

function draw() {
  background(220);
  
  background1.velocityX=-6
  
  invisGround.visible = false;
  
  monkey.collide(invisGround);
  
  if (monkey.isTouching(bananaGroup)) {
     bananaGroup.destroyEach();
     monkey.scale = monkey.scale + 0.01
     scoreSnd.play();
  } 
  
  if (monkey.isTouching(obstacleGroup)) {
     obstacleGroup.destroyEach();
     monkey.scale = monkey.scale - 0.02
     rockSmash.play();
  } 
    
  monkey.velocityY = monkey.velocityY + 0.9;
  
  if (background1.x < 0){
      background1.x = background1.width/2;
  }
  
  if (keyWentDown("space") && monkey.y >= 250) {
    monkey.velocityY= -20 - monkey.scale * 10;
    
  } 
  
  
  
  
  
  
  
  
  
  
  drawBananas()
  drawObstacles()
  drawSprites();
  
  if (frameCount % 3 === 0) { 
    score = score + 1
  } 
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,100,50);
}

function drawObstacles() {
  
  if (frameCount % 190 === 0) {
    var stone = createSprite(420,350,10,10);
    stone.addImage("stone",stoneImg);
    stone.velocityX=-6
    stone.scale = 0.15
    stone.lifetime = 400/6 + 40
    
    
    obstacleGroup.add(stone);
  }
  
}

function drawBananas() {
  if (World.frameCount % 80 === 0) {
    var banana = createSprite(410,random(90,215),10,10);
    banana.addImage("banana", bananaImg);
    banana.velocityX = -6
    banana.scale = 0.05
    banana.lifetime = 400/6
    
    
    bananaGroup.add(banana)
  }
}


