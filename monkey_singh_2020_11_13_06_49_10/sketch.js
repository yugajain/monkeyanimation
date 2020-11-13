var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, gameOver
var FoodGroup, obstacleGroup
var score,survivalTime
var backgroundImage

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  backgroundImage = loadImage("jungle.jpg");
}

function setup() {
   createCanvas(500, 400);
  var survivalTime=0;
  
  background = createSprite(400,100);
  background.addImage("background",backgroundImage)
  
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
   monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-0.1;
  ground.x=ground.width/2;
  ground.visible = false;
  console.log(ground.x)
  
  FoodGroup = new Group();
  
  obstaclesGroup = new Group();
  
  score = 0;
  }

function draw() {
    background.velocityX = -3 
  
   if (background.x < 0)
      background.x = background.width/4;
  
  
  if(ground.x<0) {
    ground.x=ground.width/2;
    
  }

  monkey.velocityY = monkey.velocityY + 0.8
     
  if(keyDown("space") ) {
      monkey.velocityY = -12;
    }
  
  
   monkey.collide(ground);   
   spawnFood();
   spawnObstacles();

  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 300,50); 

  if(obstaclesGroup.isTouching(monkey)){
  
    monkey.scale = 0.1
    ground.setVelocity = 0
    
   }
  
  if(FoodGroup.isTouching(monkey)){
    
     FoodGroup.destroyEach();
    score = score +2
     }
  
    switch(score){
      case 10: monkey.scale=0.12;
         break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break;
      case 40: monkey.scale=0.18;
        break;
        default:break;
        }

  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.round(frameCount/frameRate()) 
  text("Survival Time: "+ survivalTime, 100,50);
  
}

function spawnFood() {
    if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
     banana.addImage(bananaImage);
     banana.scale=0.1;
    
    FoodGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}