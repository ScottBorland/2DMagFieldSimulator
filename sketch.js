northPoles = [];
southPoles = [];
particles = [];

var showDir = false;
var proximity = 10;
var randomDispersion = false;

var mouseDragging = false;

var counter = 0;
//scalers
var strengthScaler = 50;
var distanceScaler = 500;
var velMultiplier = 10;

//default to 0.15, lower means curve has more detail
var maxGradDifference = 0.005;

//mode control
var mode = 'click';
var EditMode = false;

var showPoles = true;

//buttons
var modeButton;
var toggleEditModeButton;
var clearTrailsButton;
var clearCanvasButton;
var addNorthButton;
var addSouthButton;
var preset1Button;
var preset2Button;
var preset3Button;
var preset4Button;
var showDirButton;
var disperseParticlesButton;
var trimPointsButton;
var showPolesButton;

//perlin noise variables
var xr = 0.0;
var xg = 100.0;
var xb = 2000.0;

//arbitrary values
var iR = 1000;
var iB = 100;
var iG = 1;

//rate at which perlin noise function is looped through
var speed = 0.04;

/*var myFont;
function preload() {
  myFont = loadFont('assets/Anonymous_Pro.ttf');
}*/

function setup() {
    background(255, 255, 255);

    //this can be played around with, scale is between 1 and 4, fallout is from 0 to 1. (4, 1) gives a very washed out look. (2, 0.2) seems the best so far.
    noiseDetail(2, 0.2);

    var cnv = createCanvas(windowWidth -15,windowHeight - 200);
    cnv.style('display', 'block');
    cnv.parent('sketch-holder');

    toggleEditModeButton = createButton("Toggle Edit mode");
    toggleEditModeButton.parent('sketch-holder');
    toggleEditModeButton.mousePressed(toggleEditMode);

    modeButton = createButton("Toggle fast placement");
    modeButton.position = (windowWidth - 50, windowHeight -60);
    modeButton.parent('sketch-holder');
    modeButton.mousePressed(toggleMode);

    clearTrailsButton = createButton("Clear trails");
    clearTrailsButton.position = (windowWidth -100, windowHeight -30);
    clearTrailsButton.parent('sketch-holder');
    clearTrailsButton.mousePressed(clearTrails);

    clearCanvasButton = createButton("Clear all");
    clearCanvasButton.position = (windowWidth -153, windowHeight -37);
    clearCanvasButton.mousePressed(clearCanvas);
    clearCanvasButton.parent('sketch-holder');

    addNorthButton = createButton("Add North");
    addNorthButton.mousePressed(addNorth);
    addNorthButton.parent('sketch-holder');

    addSouthButton = createButton("Add South");
    addSouthButton.mousePressed(addSouth);
    addSouthButton.parent('sketch-holder');

    preset1Button = createButton("Preset 1");
    preset1Button.mousePressed(preset1);
    preset1Button.parent('sketch-holder');

    preset2Button = createButton("Preset 2");
    preset2Button.mousePressed(preset2);
    preset2Button.parent('sketch-holder');

    preset3Button = createButton("Preset 3");
    preset3Button.mousePressed(preset3);
    preset3Button.parent('sketch-holder');

    preset4Button = createButton("Preset 4");
    preset4Button.mousePressed(preset4);
    preset4Button.parent('sketch-holder');

    showDirButton = createButton("Show Direction");
    showDirButton.mousePressed(showDirection);
    showDirButton.parent('sketch-holder');

    disperseParticlesButton = createButton("Disperse Particle");
    disperseParticlesButton.mousePressed(disperseParticles);
    disperseParticlesButton.parent('sketch-holder');

    showPolesButton = createButton("Show poles");
    showPolesButton.mousePressed(showPolesFn);
    showPolesButton.parent('sketch-holder');

    paintPictureButton = createButton("Paint picture");
    //paintPictureButton.mousePressed(paintPicture);
    paintPictureButton.mousePressed(function() { paintPicture(20, 4);});
    paintPictureButton.parent('sketch-holder');
}
//fps counter
 let be = Date.now(),fps=0;
 requestAnimationFrame(
     function loop(){
         let now = Date.now()
         fps = Math.round(1000 / (now - be))
         be = now
         requestAnimationFrame(loop)
         if (fps < 35){
           kFps.style.color = "red"
           kFps.textContent = fps
         } if (fps >= 35 && fps <= 41) {
             kFps.style.color = "deepskyblue"
             kFps.textContent = fps + " FPS"
           } else {
             kFps.style.color = "black"
             kFps.textContent = fps + " FPS"
         }
         kpFps.value = fps
     }
  )

function showPolesFn(){
  if(showPoles) showPoles = false;
  else if(!showPoles) {
    showPoles = true;
    for(var i = 0; i < northPoles.length; i++){
      northPoles[i].erased = false;
    }
    for(var i = 0; i < southPoles.length; i++){
      southPoles[i].erased = false;
    }
  }
}

function disperseParticles(){
  var particlePositions = [];
  if(randomDispersion == false){
  for(var i = 10; i < windowWidth - 10; i += proximity){
    for(var j = 10; j < windowHeight -10; j += proximity){
      newPos = createVector(i, j);
      particlePositions.push(newPos);
      //console.log(particlePositions);
    }
  }
}else{
  for(var i = 0; i < 10000; i ++){
    newPos = createVector(random(windowWidth), random(windowHeight));
    particlePositions.push(newPos);
  }
}
  for(var k = 0; k < particlePositions.length; k++){
    var newParticle = new particle(particlePositions[k].x, particlePositions[k].y);
    particles.push(newParticle);
  }
}

function roundVector(vector){
  let x = vector.x;
  let y = vector.y;
  x = Number(x.toFixed(2));
  y = Number(y.toFixed(2));
  return createVector(x, y);
}
/*
function calltrimPoints(){
  for(var i = particles.length -1; i >= 0; i--){
    if(particles[i].history.length > 8){
    particles[i].history = trimPoints(particles[i].history);
    //delSomePoints(particles[i].history);
    }
  }
}*/

function paintPicture(n, s){
  clearCanvas();
  showPoles = false;
  for(var i = 0; i < n; i++){
    northPoles.push(new northPole(random(windowWidth), random(windowHeight), random(40)));
  }
  for(var i = 0; i < s; i++){
    southPoles.push(new southPole(random(windowWidth), random(windowHeight), random(40)));
  }
  disperseParticles();
}

function draw() {

    if(EditMode){
      background(255, 255, 255);
    }

    for(var i = northPoles.length -1; i >= 0; i--){
    northPoles[i].display();
    northPoles[i].drag();
    }
    for(var i = southPoles.length -1; i >= 0; i--){
    southPoles[i].display();
    southPoles[i].drag();
    }
    for(var i = particles.length -1; i >= 0; i--){

   if(particles[i].finished == false){
          particles[i].update();
          particles[i].behaviours();
        particles[i].show();
    }
    counter++;
    if(counter > 100){
        counter = 0;
    }
    if(particles[i].finished == true){
      particles.splice(i, 1);
    }
  }
  //perlin noise
  var rx = xr + iR;
  var gx = xg + iG;
  var bx = xb + iB;
  //change these values to tint the colour
  r = map(noise(rx, 1), 0, 1, 0, 255);
  g = map(noise(gx, 1), 0, 1, 0, 255);
  b = map(noise(bx, 1), 0, 1, 0, 255);

  xr += speed;
  xg += speed;
  xb += speed;
}

function windowResized() {
  resizeCanvas(windowWidth -15, windowHeight - 200);
}

function clearTrails(){
    particles.splice(0, particles.length);
    background(255, 255, 255);
}

function clearCanvas(){
    northPoles.splice(0, northPoles.length);
    southPoles.splice(0, southPoles.length);
    particles.splice(0, particles.length);
    background(255, 255, 255);
}

function showDirection(){
  showDir = (showDir == true) ? (showDir = false) : (showDir = true);
}

function addNorth(){
    northPoles.push(new northPole(windowWidth / 2 + random(50), (windowHeight -200) / 2 + random(50), 20));
}

function addSouth(){
    southPoles.push(new southPole(windowWidth /2 + random(50), (windowHeight -200) / 2 + random(50), 20));
}

function preset1(){
    clearCanvas();
    northPoles[0] = new northPole(windowWidth / 4 +220, windowHeight / 2 - 100, 100);
    southPoles[0] = new southPole(windowWidth / 1.47  - 100, windowHeight / 2 - 100, 100);
}

function preset2(){
    clearCanvas();
    northPoles[0] = new northPole(windowWidth / 4 +220, windowHeight / 2 - 100, 100);
    northPoles[1] = new northPole(windowWidth / 1.47  - 100, windowHeight / 2 - 100, 100);
}

function preset3(){
    clearCanvas();
    northPoles[0] = new northPole(windowWidth / 2 -200, windowHeight / 2 -100, 50);
    southPoles[0] = new southPole(windowWidth / 2 -160, windowHeight / 2 -100, 50);
    northPoles[1] = new northPole(windowWidth / 2 -120, windowHeight / 2 -100, 50);
    southPoles[1] = new southPole(windowWidth / 2 -80, windowHeight / 2 -100, 50);
    northPoles[2] = new northPole(windowWidth / 2 -40, windowHeight / 2 -100, 50);
	southPoles[2] = new southPole(windowWidth / 2, windowHeight / 2 -100, 50);
	northPoles[3] = new northPole(windowWidth / 2 +40, windowHeight / 2 -100, 50);
    southPoles[3] = new southPole(windowWidth / 2 +80, windowHeight / 2 -100, 50);
	northPoles[4] = new northPole(windowWidth / 2 +120, windowHeight / 2 -100, 50);
	southPoles[4] = new southPole(windowWidth / 2 + 160, windowHeight / 2 -100, 50);
    northPoles[5] = new northPole(windowWidth / 2 +200, windowHeight / 2 -100, 50);
    southPoles[5] = new southPole(windowWidth / 2 + 240, windowHeight / 2 -100, 50);
}

function preset4(){
    clearCanvas();
	northPoles[0] = new northPole(windowWidth / 2, windowHeight / 2 -100, 40);
    southPoles[0] = new southPole(windowWidth / 2 + 200, windowHeight / 2+110, 40);
    southPoles[1] = new southPole(windowWidth / 2 + 200, windowHeight / 2+80, 40);
    southPoles[2] = new southPole(windowWidth / 2 + 200, windowHeight / 2+50, 40);
    southPoles[3] = new southPole(windowWidth / 2 + 200, windowHeight / 2+20, 40);
    southPoles[4] = new southPole(windowWidth / 2 + 200, windowHeight / 2-10, 40);
    southPoles[5] = new southPole(windowWidth / 2 + 200, windowHeight / 2-40, 40);
	southPoles[6] = new southPole(windowWidth / 2 + 200, windowHeight / 2-70, 40);
	southPoles[7] = new southPole(windowWidth / 2 + 200, windowHeight / 2-100, 40);
    southPoles[8] = new southPole(windowWidth / 2 + 200, windowHeight / 2-130, 40);
    southPoles[9] = new southPole(windowWidth / 2 + 200, windowHeight / 2-160, 40);
    southPoles[10] = new southPole(windowWidth / 2 + 200, windowHeight / 2-190, 40);
    southPoles[11] = new southPole(windowWidth / 2 + 200, windowHeight / 2-220, 40);
    southPoles[12] = new southPole(windowWidth / 2 + 200, windowHeight / 2-250, 40);
	southPoles[13] = new southPole(windowWidth / 2 + 200, windowHeight / 2-280, 40);
	southPoles[14] = new southPole(windowWidth / 2 + 200, windowHeight / 2-310, 40);
    southPoles[15] = new southPole(windowWidth / 2 + 200, windowHeight / 2-340, 40);
}

function toggleMode(){
    if(mode == 'drag'){
        mode = 'click';
    }
    else{
        mode = 'drag';
    }
}

function toggleEditMode(){
    if(EditMode){
        EditMode = false;
    }else{
        EditMode = true;
    }
}

function mouseReleased(){
    for(var i = 0; i < northPoles.length; i++){
      northPoles[i].dragging = false;
    }
    for(var i = 0; i < southPoles.length; i++){
        southPoles[i].dragging = false;
    }
    mouseDragging = false;
}

function mousePressed(){
    if(mouseButton === LEFT && mode == 'click' && mouseDragging == false && EditMode == false){
        newparticle = new particle(mouseX, mouseY);
        particles.push(newparticle);
        }
    for(var i = 0; i < northPoles.length; i++){
        if(mouseX > northPoles[i].x && mouseX < northPoles[i].x + northPoles[i].w && mouseY > northPoles[i].y && mouseY < northPoles[i].y + northPoles[i].w && EditMode){
            mouseDragging = true;
            northPoles[i].dragging = true;
            northPoles[i].offsetX = northPoles[i].x-mouseX;
            northPoles[i].offsetY = northPoles[i].y-mouseY;
        }
    }
      for(var i = 0; i < southPoles.length; i++){
        if(mouseX > southPoles[i].x && mouseX < southPoles[i].x + southPoles[i].w && mouseY > southPoles[i].y && mouseY < southPoles[i].y + southPoles[i].w && EditMode){
            mouseDragging = true;
            southPoles[i].dragging = true;
            southPoles[i].offsetX = southPoles[i].x-mouseX;
            southPoles[i].offsetY = southPoles[i].y-mouseY;
        }
    }
}

function mouseWheel(event){
    for(var i = 0; i < northPoles.length; i++){
        if(northPoles[i].rollover){
            if(northPoles[i].s > 15 || event.delta > 0){
            northPoles[i].s += event.delta * 0.04;
            }
        }
    }
    for(var i = 0; i < southPoles.length; i++){
    if(southPoles[i].rollover){
        if(southPoles[i].s > 15 || event.delta > 0){
        southPoles[i].s += event.delta * 0.04;
            }
        }
    }
    return false;
}

function mouseDragged(){
    if(mouseButton === LEFT && mode == 'drag' && EditMode == false){
        if(counter % 1 == 0){
        newparticle = new particle(mouseX, mouseY);
        particles.push(newparticle);
        }
    }
}
