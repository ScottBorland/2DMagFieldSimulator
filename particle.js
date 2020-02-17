function particle(x, y, z){
    this.position = createVector(x, y, z);
    this.velocity = createVector(0, 0, 0);
    this.maxspeed = 1;
    this.angle = 0;

    this.velN = createVector(0, 0, 0);
    this.velS = createVector(0, 0, 0);

    this.finished = false;

    this.history = [];
    this.newLine = false;

    this.update = function(){
        var pos = createVector(this.position.x, this.position.y, this.position.z);
        this.history.push(pos);
        this.velocity = createVector(0, 0, 0);
        this.velocity.add(this.velN);
        this.velocity.add(this.velS);
        this.velocity.mult(velMultiplier);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        if(this.velocity.mag() > 0){
          this.newLine = true;
        }else{
          this.newLine = false;
        }
        this.velN = createVector(0, 0, 0);
        this.velS = createVector(0, 0, 0);
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
        var dif = p5.Vector.sub(createVector(magnet.x, magnet.y, magnet.z), this.position);
        var dist = p5.Vector.dist(createVector(magnet.x, magnet.y, magnet.z), this.position);

        if(dist < 6 || this.position.x < -universeSizeX || this.position.x > universeSizeX || this.position.y < -universeSizeY || this.position.y > universeSizeY || this.position.z < -universeSizeZ || this.position.z > universeSizeZ){
             this.finished = true;
        }
        var mag = distanceScaler * magnet.s / (dist * dist);

        dif.setMag(-mag);

        this.applyForceN(dif);
    }

     this.reactS = function(magnet){
       var dif = p5.Vector.sub(createVector(magnet.x, magnet.y, magnet.z), this.position);
       var dist = p5.Vector.dist(createVector(magnet.x, magnet.y, magnet.z), this.position);

       if(dist < 6 || this.position.x < -universeSizeX || this.position.x > universeSizeX || this.position.y < -universeSizeY || this.position.y > universeSizeY || this.position.z < -universeSizeZ || this.position.z > universeSizeZ){
            this.finished = true;
       }
       var mag = distanceScaler * magnet.s / (dist * dist);

       dif.setMag(mag);

       this.applyForceN(dif);
    }

    const generateColor = (forceMag = this.velocity.mag()) => {
            //console.log(forceMag)
            const rgbArray = [
                1 / (- 0.01 * (forceMag - 1.4)) - 80,
                - 700 * (forceMag) * (forceMag - 1),
                1 / (0.01 * (forceMag + 0.4))
            ]
            const [red, green, blue] = rgbArray.map(value => Math.round(value))
            return `rgb(${red},${green},${blue})`
        }

    this.show = function(){
        if(this.finished == false && this.newLine){
        if(this.history.length > 1){
        if(counter % 1 == 0){
        let index = this.history.length - 1;

        var material = new THREE.LineBasicMaterial({color: color});

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(this.position.x, this.position.y, this.position.z));
        geometry.vertices.push(new THREE.Vector3(this.history[index].x, this.history[index].y, this.history[index].z));
        var line = new THREE.Line(geometry, material);

        var colour = 'rgb(' + parseFloat(r) + ',' + parseFloat(g) + ',' + parseFloat(b) + ')';
        line.material.color = new THREE.Color(generateColor());
        // line.material.color = new THREE.Color(0xffffff * Math.random());
        line.material.needsUpdate = true;
        scene.add(line);
        }
      }

        // if(this.finished && this.history.length > 4 && showDir == true){
        //     var h = floor(this.history.length / 2);
        //     //var angle = this.position.angleBetween(this.history[h+1]);
        //     var v1 = this.history[h];
        //     var v2 = this.history[h+1];
        //     var diff = p5.Vector.sub(v2, v1);
        //     var origin = createVector(0, 0);
        //     var angle = Math.atan2(diff.y - origin.y, diff.x - origin.x);
        //     angle += PI/2;
        //
        //     push();
        //     translate(this.history[h].x, this.history[h].y);
        //     rotate(angle);
        //
        //     fill(0, 0, 0);
        //     stroke(0, 0, 0);
        //     strokeWeight(0.75);
        //
        //     beginShape();
        //     vertex(0, -5);
        //     vertex(-2.5, 5);
        //     vertex(2.5, 5);
        //
        //     endShape(CLOSE);
        //
        //     pop();
        // }
      }
    }
}
