function northPole(x, y, z, strength){
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = strength;

    this.display = function(){
      var geometry = new THREE.SphereGeometry(5, 32, 32);
      var material = new THREE.MeshBasicMaterial({color: '#ff0000'});

      sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = x;
      sphere.position.y = y;
      sphere.position.z = z;

      sphere.radius = this.s;

      scene.add(sphere);
      }
}

function southPole(x, y, z, strength){
    this.x = x;
    this.y = y;
    this.z = z;
    this.s = strength;

    this.display = function(){
      var geometry = new THREE.SphereGeometry(5, 32, 32);
      var material = new THREE.MeshBasicMaterial({color: '#0000ff'});

      sphere = new THREE.Mesh(geometry, material);

      sphere.position.x = x;
      sphere.position.y = y;
      sphere.position.z = z;

      sphere.radius = this.s;

      scene.add(sphere);
      }
    }
