northPoles = [];
southPoles = [];
particles = [];

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

/*var myFont;
function preload() {
  myFont = loadFont('assets/Anonymous_Pro.ttf');
}*/

function setup() {
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

function draw() {
    background(250);
    //showFPS();
    for(var i = northPoles.length -1; i >= 0; i--){
    northPoles[i].display();
    northPoles[i].drag();
    }
    for(var i = southPoles.length -1; i >= 0; i--){
    southPoles[i].display();
    southPoles[i].drag();
    }
    for(var i = particles.length -1; i >= 0; i--){
        if(particles[i].delete == false){
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
        if(counter % 4 == 0){
        newparticle = new particle(mouseX, mouseY);
        particles.push(newparticle);
        }
    }
}

function northPole(x, y, strength){
    this.x = x;
    this.y = y;
    this.s = strength;

    this.w = 30 * this.s / 40;

    this.fillColour = color(255, 0, 42);

    this.dragging = false;
    this.rollover = false;

    this.offsetX;
    this.offsetY;

    this.display = function(){

        if(this.dragging){
            this.fillColour = color(122, 23, 39);
        }else if(this.rollover){
            this.fillColour = color(198, 7, 39);
        }else{
            this.fillColour = color(255, 0, 42);
        }

        push()
        rotate(0);
        rectMode(CENTER);
        stroke(18, 17, 18);
        fill(this.fillColour);
        rect(this.x, this.y, 30 * this.s / 40, 30 * this.s / 40);
        stroke(255, 255, 255);
        fill(255, 255, 255);
        //textAlign(CENTER, CENTER);
        //textFont(myFont, 36 * this.s /40);
        //text('N', this.x, this.y);
        pop();
    }

    this.drag = function(){
        if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.w && EditMode){
            this.rollover = true;
        } else{
            this.rollover = false;
        }
        if(this.dragging){
            this.x = mouseX + this.offsetX;
            this.y = mouseY + this.offsetY;
        }
    }
}

function southPole(x, y, strength){
    this.x = x;
    this.y = y;
    this.s = strength;

    this.w = 30 * this.s /40;

    this.fillColour = color(0, 12, 252);

    this.dragging = false;
    this.rollover = false;

    this.offsetX;
    this.offsetY;

    this.display = function(){
        if(this.dragging){
            this.fillColour = color(0, 4, 86);
        }else if(this.rollover){
            this.fillColour = color(1, 10, 173);
        }else{
            this.fillColour = color(0, 12, 252);
        }
        push();
        rotate(0);
        rectMode(CENTER);
        stroke(18, 17, 18);
        fill(this.fillColour);
        rect(this.x, this.y, 30 * this.s /40, 30 * this.s/40);
        stroke(255, 255, 255);
        fill(255, 255, 255);
        //textAlign(CENTER, CENTER);
        //textFont(myFont, 36 * this.s /40);
        //text('S', this.x, this.y);
        noFill();
        //ellipse(this.x, this.y, this.s * strengthScaler);
        pop();
    }
    this.drag = function(){
    if(mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.w && EditMode)
    {
        this.rollover = true;
    } else{
        this.rollover = false;
    }
    if(this.dragging){
        this.x = mouseX + this.offsetX;
        this.y = mouseY + this.offsetY;
        }
    }
}


function particle(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.maxspeed = 2;
    this.angle = 0;

    this.velN = createVector(0, 0);
    this.velS = createVector(0, 0);

    this.delete = false;

    this.history = [];

    this.update = function(){

        var pos = createVector(this.position.x, this.position.y);
        this.history.push(pos);
        this.velocity = createVector(0, 0);
        this.velocity.add(this.velN);
        this.velocity.add(this.velS);
        this.velocity.mult(velMultiplier);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.velN = createVector(0, 0);
        this.velS = createVector(0, 0);
    }

    this.applyForceN = function(force){
        this.velN.add(force);
    }

    this.applyForceS = function(force){
        this.velS.add(force);
    }

    this.behaviours = function(){
        for(var i = 0; i < northPoles.length; i++){
            this.reactN(northPoles[i]);
        }
        for(var i = 0; i < southPoles.length; i++){
            this.reactS(southPoles[i]);
        }
    }


    this.reactN = function(magnet){
        var dif = p5.Vector.sub(createVector(magnet.x, magnet.y), this.position);
        var dist = p5.Vector.dist(createVector(magnet.x, magnet.y), this.position);
        if(dist < 6){
            this.delete = true;
        }
        var mag = distanceScaler * 50 * magnet.s / (dist * dist);
        dif.setMag(-mag);
        this.applyForceN(dif);
    }

     this.reactS = function(magnet){
        var dif = p5.Vector.sub(createVector(magnet.x, magnet.y), this.position);
        var dist = p5.Vector.dist(createVector(magnet.x, magnet.y), this.position);
        if(dist < 6){
            this.delete = true;
        }
        var mag = distanceScaler *50 * magnet.s/ (dist * dist);

        //var mag = map(dist, 0, magnet.s * strengthScaler, 0, this.maxforce);
        dif.setMag(mag);
        this.applyForceS(dif);
    }


    this.show = function(){
        if(this.delete == false){
        var angle = this.velocity.heading() + PI / 2;

        push();
        translate(this.position.x, this.position.y);
        rotate(angle);

        fill(103, 47, 138);
        stroke(103, 47, 138);
        strokeWeight(1);

        beginShape();

        vertex(0, -5);

        vertex(-2.5, 5);

        vertex(2.5, 5);

        endShape(CLOSE);

        pop();
        }

        noFill();
        beginShape();
        for(var i = 0; i < this.history.length; i++){
            var pos = this.history[i];
            //fill(255, 64, 65);
            //ellipse(pos.x, pos.y, 5, 5);
            //console.log(this.history.length);
            vertex(pos.x, pos.y);
        }
        endShape();
        if(this.delete && this.history.length > 4){
            var h = floor(this.history.length / 2);
            //var angle = this.position.angleBetween(this.history[h+1]);
            var v1 = this.history[h];
            var v2 = this.history[h+1];
            var diff = p5.Vector.sub(v2, v1);
            var origin = createVector(0, 0,);
            var angle = Math.atan2(diff.y - origin.y, diff.x - origin.x);
            angle += PI/2;

            push();
            translate(this.history[h].x, this.history[h].y);
            rotate(angle);

            fill(0, 0, 0);
            stroke(0, 0, 0);
            strokeWeight(0.75);

            beginShape();
            vertex(0, -5);
            vertex(-2.5, 5);
            vertex(2.5, 5);

            endShape(CLOSE);

            pop();
        }

    }
}
