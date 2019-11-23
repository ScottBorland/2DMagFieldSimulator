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
