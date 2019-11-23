northPoles = [];
southPoles = [];
particles = [];

var showDir = false;
var proximity = 30;

var mouseDragging = false;

var counter = 0;
//scalers
var strengthScaler = 50;
var distanceScaler = 10;
var velMultiplier = 10;

//mode control
var mode = 'click';
var EditMode = false;

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

/*var myFont;
function preload() {
  myFont = loadFont('assets/Anonymous_Pro.ttf');
}*/

function setup() {
    disperseParticles();
    //createCanvas(1905, 880);
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

function disperseParticles(){
  var particlePositions = [];
  for(var i = 10; i < windowWidth - 10; i += proximity){
    for(var j = 10; j < windowHeight -10; j += proximity){
      newPos = createVector(i, j);
      particlePositions.push(newPos);
      console.log(particlePositions);
    }
  }
  for(var k = 0; k < particlePositions.length; k++){
    var newParticle = new particle(particlePositions[k].x, particlePositions[k].y);
    particles.push(newParticle);
  }
}

function draw() {
    background(250);

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
        }
        particles[i].show();
    }
    counter++;
    if(counter > 100){
        counter = 0;
    }
}

function windowResized() {
  resizeCanvas(windowWidth -15, windowHeight - 200);
}

function clearTrails(){
    particles.splice(0, particles.length);
}

function clearCanvas(){
    northPoles.splice(0, northPoles.length);
    southPoles.splice(0, southPoles.length);
    particles.splice(0, particles.length);
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

/*function showDirection(){
  if(showDirection == true) showDirection = false;
  else showDirection = true;
}*/

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
        if(counter % 4 == 0){
        newparticle = new particle(mouseX, mouseY);
        particles.push(newparticle);
        }
    }
}
