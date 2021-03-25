var ground, background, bgImg;
var monkey, monkey_running, obstacle, obstacleImg, banana, bananaImg;
var foodGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  bgImg = loadImage("jungle.png");
  
  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png");
  
 bananaImg = loadImage("banana.png");
 obstacleImg = loadImage("obstacle.png");
}


function setup(){
  createCanvas(400, 400);
  
  background = createSprite(200, 160, 400, 400);
  background.addImage("background", bgImg);
  background.velocityX = -4;
  
  ground = createSprite(200, 380, 400, 30);
  ground.visible = false;
  
  monkey = createSprite(150, 350, 10, 10);
  monkey.addAnimation("monkey", monkey_running);
  monkey.scale = 0.15;
  
   foodGroup = new Group();
   obstacleGroup = new Group();
}


function draw(){
  //background("skyBlue");
  if(gameState === PLAY){
    if (background.x < 0){
      background.x = background.width/2;
    }
  
  //monkey.velocityY = monkey.velocityY + 0.5
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 310) {
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.5
  monkey.collide(ground); 

  if(foodGroup.isTouching(monkey)){
    score = score + 2;
    foodGroup.destroyEach();
    monkey.scale += + 0.1;
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default: break;
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
  spawnBananas();
  spawnObstacles();
  }
  
  
  
  else if(gameState === END){
    bg.velocityX = 0;
    monkey.visible = false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();

    textSize(30);
    fill("black");
    text("Game Over!", 300, 50);
  }
  
  
  
  drawSprites();
  
  stroke("white");
  textSize = 20;
  fill("black");
  text("Score: " + score, 300, 50);
}

  function spawnBananas(){
  if (frameCount % 80 === 0) {
    var banana = createSprite(200,120,40,10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImg);
    banana.scale = 0.09;
    banana.velocityX = -4;
    banana.lifetime = 100;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
}
  }

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.addImage(obstacleImg);
    obstacle.velocityX = -6;
    obstacle.scale = 0.15;    
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle);
  }
}


