function particle(x, y){
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.maxspeed = 1;
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

        if(dist < 6 || this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height){
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

    //method 1 of color generation, blue when magnitude of force weakest, green in middle, red when strongest
    //optimal with distanceScaler 10
    // const generateColor = (forceMag = this.velocity.mag()) => {
    //         const rgbArray = [
    //             1 / (- 0.01 * (forceMag - 1.4)) - 80,
    //             - 700 * (forceMag) * (forceMag - 1),
    //             1 / (0.01 * (forceMag + 0.4))
    //         ]
    //         const [red, green, blue] = rgbArray.map(value => Math.round(value))
    //         var particleColour = color (red, green, blue)
    //         return particleColour
    //     }

    const generateColor = (forceMag = createVector(this.velN.mag(), this.velS.mag())) => {
          forceMag.setMag(0.91);
          //console.log(forceMag);
            // const rgbArray = [
            //     1 / (- 0.01 * (forceMag.x - 1.4)) - 80,
            //     30,
            //     1 / (-0.01 * (forceMag.y - 1.4)) - 80
            // ]
            const rgbArray = [
                100 * Math.pow(forceMag.x + 0.2, 8),
                60,
                100 * Math.pow(forceMag.y + 0.2, 8)
            ]
            const [red, green, blue] = rgbArray.map(value => Math.round(value))
            var particleColour = color (red, green, blue)
            return particleColour
        }

    this.show = function(){
        if(this.finished == false){
        var angle = this.velocity.heading() + PI / 2;
        }

        if(this.history.length > 1){
        let index = this.history.length - 1;
        let c = generateColor();
        console.log(generateColor())
        stroke(c);
        line(this.position.x, this.position.y, this.history[index].x, this.history[index].y);
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
