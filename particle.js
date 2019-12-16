function particle(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.maxspeed = 2;
    this.angle = 0;

    this.velN = createVector(0, 0);
    this.velS = createVector(0, 0);

    this.finished = false;

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

        //dist = Number(dist.toFixed(2));

        if(dist < 6){
            this.finished = true;
        }
        var mag = distanceScaler * magnet.s / (dist * dist);

        //mag = Number(mag.toFixed(2));

        dif.setMag(-mag);
        //dif = roundVector(dif);
        this.applyForceN(dif);
    }

     this.reactS = function(magnet){
        var dif = p5.Vector.sub(createVector(magnet.x, magnet.y), this.position);
        var dist = p5.Vector.dist(createVector(magnet.x, magnet.y), this.position);

        //dist = Number(dist.toFixed(2));

        if(dist < 6 || this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
            this.finished = true;
        }
        var mag = distanceScaler * magnet.s/ (dist * dist);

        //mag = Number(mag.toFixed(2));

        //var mag = map(dist, 0, magnet.s * strengthScaler, 0, this.maxforce);
        dif.setMag(mag);
        this.applyForceS(dif);
    }


    this.show = function(){
        if(this.finished == false){
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

        if(this.finished && this.history.length > 4){
          trimPoints(this.history);
        }

        if(this.finished && this.history.length > 4 && showDir == true){
            var h = floor(this.history.length / 2);
            //var angle = this.position.angleBetween(this.history[h+1]);
            var v1 = this.history[h];
            var v2 = this.history[h+1];
            var diff = p5.Vector.sub(v2, v1);
            var origin = createVector(0, 0);
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
