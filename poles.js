function northPole(x, y, strength){
    this.x = x;
    this.y = y;
    this.s = strength;

    this.w = this.s * 0.75;

    this.fillColour = color(255, 0, 42);

    this.dragging = false;
    this.rollover = false;

    this.offsetX;
    this.offsetY;

    this.erased = false;

    this.display = function(){

      if(this.erased == false){
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
      if(!showPoles){
        fill(backgroundColour);
        strokeWeight(4);
        stroke(backgroundColour);
        this.erased = true;
      }else{
        fill(this.fillColour);
        strokeWeight(1);
        stroke(18, 17, 18);
        this.erased = false;
      }
      rect(this.x, this.y, 0.75 * this.s, 0.75 * this.s);

      //fill(255, 255, 255);
      //textAlign(CENTER, CENTER);
      //textFont(myFont, 36 * this.s /40);
      //text('N', this.x, this.y);
      pop();
    }
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

    this.w = 0.75 * this.s;

    this.fillColour = color(0, 12, 252);

    this.dragging = false;
    this.rollover = false;

    this.offsetX;
    this.offsetY;

    this.erased = false;

    this.display = function(){

        if(this.erased == false){
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
        if(!showPoles){
          fill(backgroundColour);
          strokeWeight(4);
          stroke(backgroundColour);
          this.erased = true;
        }else{
          strokeWeight(1);
          this.erased = false;
          fill(this.fillColour);
        }
        rect(this.x, this.y, 0.75 * this.s, 0.75 * this.s);
        //textAlign(CENTER, CENTER);
        //textFont(myFont, 36 * this.s /40);
        //text('S', this.x, this.y);
        noFill();
        //ellipse(this.x, this.y, this.s * strengthScaler);
        pop();
      }
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
