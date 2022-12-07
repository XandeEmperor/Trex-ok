
var trex ,trex_running,trex_collided;

var ground, invisibleGround, groundImage;

var cloud,cloud_img;

var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score = 0;

var PLAY = 1;

var END = 0;

var gameState = PLAY;

var cloudsGroup;

var obstaclesGroup; 

var gameOverImage, restartImage;

var restart, gameOver;

//CARREGAR IMAGENS
function preload(){
trex_running= loadAnimation ("trex1.png","trex3.png","trex4.png")  
groundImage = loadImage ("ground2.png")

cloud_img = loadImage("cloud.png")

obstacle1 = loadImage ("obstacle1.png");
obstacle2 = loadImage ("obstacle2.png");
obstacle3 = loadImage ("obstacle3.png");
obstacle4 = loadImage ("obstacle4.png");
obstacle5 = loadImage ("obstacle5.png");
obstacle6 = loadImage ("obstacle6.png");


 restartImg = loadImage("restart.png");
 gameOverImg = loadImage("gameOver.png");
 trex_collided = loadImage("trex_collided.png");

 trex_collided = loadAnimation("trex_collided.png");
}


// CONFIGURAÇÕES E PROPRIEDADES
function setup(){
   
   
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite (50,160,20,50);

  trex.addAnimation("running",trex_running);

  trex.addAnimation("collided",trex_collided);

  trex.scale= 0.5

  trex.x = 50
  //raio de colisão do trex
  trex.setCollider("circle",0,0,40);

  trex.debug = true


  //crie um sprite ground (solo)
  ground=createSprite (200,180,400,20);
  ground.addImage("ground",groundImage)

  //criar grupos de obstaculos e nuvens
  obstaclesGroup = createGroup ();

  cloudsGroup = createGroup ();

 gameOver = createSprite(300,50);
 gameOver.addImage(gameOverImg);
 
 gameOver.scale = 0.5

 restart = createSprite(300,100);
 restart.addImage(restartImg);

 restart.scale = 0.5
}

//DESENHAR NA TELA
function draw(){
  background("white")  //COR DE FUNDO

 
  if (gameState === PLAY) {

    //função criar nuvens
    spawnClouds();
    spawnObstacles();     
  //pontuação
  score = score + Math.round(getFrameRate()/30);
  
  // movimento do chão
  ground.velocityX = -(4 + 3* score/500);

  gameOver.visible = false
    restart.visible = false
  if(ground.x <0){
  ground.x= ground.width/2}

  //pular quando a tecla espaço for pressionada
  if(keyDown("space") && trex.y >= 200 ) { trex.velocityY = -10; }

  //adicionando gravidade
  trex.velocityY = trex.velocityY +0.8

   //trex pular com espaço
   if(keyDown("space")){

  trex.velocityY = -10}

  if (obstaclesGroup.isTouching(trex)){
   
       gameState = END;
  }}

  else if (gameState === END) {

    //impedir que o trex caia
    trex.collide (ground);

    ground.velocityX = 0;

    obstaclesGroup.setVelocityXEach (0);

    cloudsGroup.setVelocityXEach (0);

    gameOver.visible = true
     restart.visible = true

     //mudar a animação do trex
     trex.changeAnimation("collided", trex_collided);
     
     trex.velocityY = 0;

     if(mousePressedOver (restart)) {
          reset();
     }


  }

  


  //exibindo pontuação
  text("Pontuação: "+ score, 500,50)

  
  
   //impedir que o trex caia
   trex.collide (ground);

  drawSprites();}



  // criar nuvens
  function spawnClouds(){
  cloud_img = loadImage("cloud.png")
  if(frameCount % 60 == 0){
  cloud = createSprite(600,100,40,10)
  cloud.velocityX = -3
  cloud.addImage(cloud_img)
  cloud.scale = 0.4;
  cloud.y = Math.round(random(60,100))


  //Profundidade das sprites

  cloud.depth = trex.depth;
     trex.depth = trex.depth + 1;
  
  

  //Tempo de vida das nuvens
  cloud.lifetime = 200;

  //adicionando nuvens ao grupo
    cloudsGroup.add(cloud);

  }
}







function spawnObstacles () {

if (frameCount % 60 === 0){
  var obstacle = createSprite (400,155,10,40);
  obstacle.velocityX = -(4 + 3* score/500);
  obstacle.scale = 0.7;

  //gerar obstaculos aleatórios

var rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacle.addImage(obstacle1);
          break;
  case 2: obstacle.addImage(obstacle2);
          break;
  case 3: obstacle.addImage(obstacle3);
          break;
  case 4: obstacle.addImage(obstacle4);
          break;
  case 5: obstacle.addImage(obstacle5);
          break;
  case 6: obstacle.addImage(obstacle6);
          break;
  default: break;

}
//tempo de vida dos obstaculos
obstacle.lifetime = 200;

//adicione cada obstaculo ao grupo
   obstaclesGroup.add(obstacle);

} 


}



function reset(){

gameState = PLAY;

gameOver.visible = false;
restart.visible = false;

obstaclesGroup.destroyEach();
cloudsGroup.destroyEach();

score = 0;

trex.changeAnimation("running", trex_running);
}