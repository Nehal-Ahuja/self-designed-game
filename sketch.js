var PLAY = 1;
var END = 0;
var gameState = PLAY;

var dog, dogImg;
var ground, groundImg, invisibleGround;
var bone, boneImg, boneGroup;
var obstacle, obstacleGroup;
var spike1,spike2,spike3,spike4;
var sadDog;
var gameOverImg, restartButton;
var score;
var dogBarking;
var wonderfulText,wonderfulTextImg;
var dogSound;

function preload(){
  
  dogImg=loadAnimation("dog.png");
  groundImg=loadImage("groundImg.png");
  boneImg=loadImage("boneImg.png");
  
  spike1=loadImage("spike1_image.png");
  spike2=loadImage("spike2_withoutBg.png");
  spike3=loadImage("spike3_img.png");
  spike4=loadImage("spike4_img.png");
  
  sadDog=loadAnimation("SAD.DOG-removebg-preview.png");
  
  gameOverImg=loadImage("gameOver-removebg-preview.png");
  restartButton=loadImage("restartImg-removebg-preview.png");
  
  wonderfulTextImg=loadImage("wonderfulImg-removebg-preview.png")
  
  dogSound=loadSound("dogBarkingSound.mp3");
 
}

function setup(){
  createCanvas(600,400);
  
    dog=createSprite(100,355,40,40);
    dog.addAnimation("happyDog",dogImg);
    dog.addAnimation("sad_dog",sadDog);
    dog.scale=0.2;
    

    ground=createSprite(300,375,600,10);
    ground.velocityX=-3;
    ground.addImage(groundImg);
    ground.scale=2;

  invisibleGround=createSprite(300,355,600,10);
    invisibleGround.visible=false;

    obstacleGroup=new Group();
    boneGroup=new Group();
  
    gameOver=createSprite(300,100,0,0);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.7;
  
    restart=createSprite(300,200,0,0);
    restart.addImage(restartButton);
    restart.scale=0.3;
  
    wonderfulText=createSprite(300,50,0,0);
    wonderfulText.addImage(wonderfulTextImg);
    wonderfulText.scale=0.5;
    wonderfulText.visible=false;
  
    dog.setCollider("circle",0,0,150);
    dog.debug=false;
  
    score=0;
}

function draw(){
  background("lightBlue");
  
   textSize(20);
    text("Score= "+score,480,50);
  
   //console.log(dog.y);
  
  if(gameState===PLAY){
    
    ground.velocityX = -(3 + 1* score/100)
    //score = score+Math.round(getFrameRate()/60);
    
     if(ground.x<50){
         ground.x=300;
    }
      
      //jump when the space key is pressed
    if(keyDown("space") && dog.y>=285){
      dog.velocityY=-18;
      dogSound.play();
    } 

    //add gravity
    dog.velocityY = dog.velocityY + 0.8;
    
    //destroy a bone at a time
    for(var i=0;i<boneGroup.length;i++){
      if(dog.isTouching(boneGroup.get(i))){
        boneGroup.get(i).destroy();
        score=score+10;
      }
    }
  
    
    if(dog.isTouching(obstacleGroup)){
      gameState=END;
    }

    bones();
    obstacles();
    
    gameOver.visible=false;
    restart.visible=false;
    
    if(score===100){
     wonderfulText.visible=true;
    }
    else if(score>100){
      wonderfulText.visible=false;
    }
    
  }
  else if(gameState===END){
    gameOver.visible=true;
    restart.visible=true;
    
    dog.changeAnimation("sad_dog", sadDog);
    ground.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    boneGroup.setLifetimeEach(-1);
     
    obstacleGroup.setVelocityXEach(0);
    boneGroup.setVelocityXEach(0);
    
    if(mousePressedOver(restart)) {
      reset();
    }
    
  }
  
    ground.depth = dog.depth;
    dog.depth = dog.depth + 1;
  
    dog.collide(invisibleGround);
  
  drawSprites();
  

}

function bones(){
  if(frameCount%100===0){
    bone=createSprite(600,150,50,50);
    bone.addImage(boneImg);
    bone.scale=0.15;
    bone.velocityX=-3;
    bone.lifetime=200;
    bone.y=Math.round(random(130,180));
    boneGroup.add(bone);
  }
  
  
}

function obstacles(){
  if(frameCount%100===0){
     obstacle=createSprite(600,325,0,0);
     obstacle.velocityX=-3;
     obstacle.scale=0.25;
     obstacle.lifetime=200;
    
     var rand = Math.round(random(1,4));
     switch(rand) {
      case 1: obstacle.addImage(spike1);
              break;
      case 2: obstacle.addImage(spike2);
              break;
      case 3: obstacle.addImage(spike3);
              break;
      case 4: obstacle.addImage(spike4);
              break;
      default: break;
    }
    obstacleGroup.add(obstacle);
}
 
  
}

function reset(){
    gameState=PLAY;
    dog.changeAnimation("happyDog",dogImg);
    ground.velocityX=-3;
    score=0;
    obstacleGroup.destroyEach();
    boneGroup.destroyEach();
  
}

