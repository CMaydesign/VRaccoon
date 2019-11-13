  
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}
  // document.addEventListener('DOMContentLoaded', function() {
  //     const scene = document.querySelector('a-scene');
  //     const splash = document.querySelector('#splash');
  //     const loading = document.querySelector('#splash .loading');
  //     const startButton = document.querySelector('#splash .start-button');

  //     const emitEvent = (eventName, listeners) => {
  //         listeners.forEach((listener) => {
  //             const el = document.querySelector(listener);
  //             el.emit(eventName);
  //         })
  //     };

  //     const emitMediaEvent = (eventType, listeners) => {
  //         listeners.forEach((listener) => {
  //             const el = document.querySelector(listener);
  //             el.components.sound[eventType]();
  //         })
  //     };


  //     scene.addEventListener('loaded', function(e) {
  //         setTimeout(() => {
  //             loading.style.display = 'none';
  //             splash.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
  //             startButton.style.opacity = .8;
  //         }, 50);
  //     });

  //     startButton.addEventListener('click', function(e) {
  //         splash.style.display = 'none';
  //         emitEvent('scene-started', ['#groundTexture', '#text', '#bushes', '#raccoon', '#trees']);
  //     });
  // });

  // document.querySelector('a-assets').addEventListener('loaded', function() {
  //     console.log("OK LOADED");
  // });
var tempBushPos;
var tempFlamePos;

AFRAME.registerComponent('game-manager', {
    schema: {
        numberTrees: { type: 'int' },
        numberBush: { type: 'int'},      
        numberFlames: { type: 'int'},
    },

    init: function () 
	{   
		
		var sceneEl = document.querySelector('a-scene');
        var numTrees = this.data['numberTrees'];
        var newTrees = [];
        var numBush = this.data['numberBush'];
        var newBush = [];
        var numFlame = this.data['numberFlames'];
		var numLight = numFlame;
        var newFlame = [];
        var newLight = [];



		
        


        for (var i = 0; i < numTrees; i++) {
            newTrees.push(GameManagerUtils.createTree());
        }
        sceneEl.addEventListener('loaded', function () {
            newTrees.forEach(function (tree) {
                sceneEl.appendChild(tree);
            });
        });
        for (var i = 0; i < numBush; i++) {
            newBush.push(GameManagerUtils.createBush());
            
        }
        sceneEl.addEventListener('loaded', function () {
            newBush.forEach(function (bush) {
                sceneEl.appendChild(bush);
            });
        });


        for (var i = 0; i < numFlame; i++) {

        	
            newFlame.push(GameManagerUtils.createFlame());
            newLight.push(GameManagerUtils.createLight());
           
            

        }
        sceneEl.addEventListener('loaded', function () {
            newFlame.forEach(function (flame) {
                sceneEl.appendChild(flame);
            });
        });
        sceneEl.addEventListener('loaded', function () {
            newLight.forEach(function (flamelight) {
                sceneEl.appendChild(flamelight);
               
            });
        });
    },
});

var GameManagerUtils = {
    generateRandomNumber: function (min, max) {
        return Math.floor(Math.random() * max + min);
    },
    chooseRandomPosition: function () {
       var xPos = GameManagerUtils.generateRandomNumber(100,  -100);
        var yPos = 0;
        var zPos = GameManagerUtils.generateRandomNumber(100, -100);
        return { 'x': xPos, 'y': yPos, 'z': zPos};
    },
    // Create a new tree entity.
    createTree: function () {
        console.log('createTree');
        var newTree = document.createElement('a-entity');
        newTree.setAttribute('obj-model', 'obj:#tree-model');
        newTree.setAttribute('scale', '1.5 1.5 1.5');
        newTree.setAttribute('material', 'src:tree/bubing/BubingaTree_BaseColor.png');
        // newTree.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        newTree.setAttribute('position', position);
        return newTree;
    },
    createBush: function () {
        console.log('createBush');
        var newBush = document.createElement('a-entity');
        newBush.setAttribute('template', 'src:bush.template');
        // newTree.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        newBush.setAttribute('position', position);
        tempBushPos = position;
        return newBush;    
	},
    



    
     createFlame: function () {

     	
        console.log('createFlame');
        var newFlame = document.createElement('a-entity');
        newFlame.setAttribute('fire', 'particles: 800');
        // newFlame.setAttribute('visible', 'false')
        newFlame.setAttribute('id','flame')
        var position = GameManagerUtils.chooseRandomPosition();
        newFlame.setAttribute('position', position);
        tempFlamePos = position;
	    return newFlame;
	    
	    
	},
    
     createLight: function () {
        console.log('createLight');
        var newLight = document.createElement('a-light');
        newLight.setAttribute('light', 'type: point; color: #FFA200; intensity: 3; distance: 20');
        newLight.setAttribute('position', tempFlamePos);
        newLight.setAttribute('position', {y: 0.5});
        return newLight;
    }

    
    
};

document.querySelector('p').addEventListener('click', function (evt) {
  console.log('This 2D element was clicked!');
});

// Component to change to a sequential color on click.
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('visibility', 'true');
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});

/**
 * Set random position within bounds.
 */
AFRAME.registerComponent('random-position', {
  schema: {
    min: {default: {x: -10, y: 0, z: -10}, type: 'vec3'},
    max: {default: {x: 10, y: 0, z: 10}, type: 'vec3'}
  },

  update: function () {
    var data = this.data;
    var max = data.max;
    var min = data.min;
    this.el.setAttribute('position', {
      x: Math.random() * (max.x - min.x) + min.x,
      y: Math.random() * (max.y - min.y) + min.y,
      z: Math.random() * (max.z - min.z) + min.z
    });
  }
});

/**
 * Set random rotation within bounds.
 */
AFRAME.registerComponent('random-rotation', {
  schema: {
    min: {default: {x: 0, y: 0, z: 0}, type: 'vec3'},
    max: {default: {x: 360, y: 360, z: 360}, type: 'vec3'}
  },

  update: function () {
    var data = this.data;
    var max = data.max;
    var min = data.min;
    this.el.setAttribute('rotation', {
      x: Math.random() * max.x + min.x,
      y: Math.random() * max.y + min.y,
      z: Math.random() * max.z + min.z
    });
  }
});

//from fire.js
const VERTEX = `
    precision highp float;
    #define PI 3.1415926535897932384626433832795
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    uniform float time;
    uniform float size;
    
    attribute vec3 position;
    attribute vec3 direction;
    attribute float offset;
    varying vec3 vUv;
    void main() {
        float sawTime = mod(time * offset, PI);
        float sineTime = (sawTime * abs(sin(time * offset)));
        vec3 timeVec = vec3(sineTime, sawTime, sineTime);
        vUv = ((normalize(position) * 0.2) + (timeVec * direction)) * size;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( vUv, 1.0 );
    }
    `;

const FRAGMENT = `
    precision highp float;
    uniform float time;
    uniform float yMax;
    varying vec3 vUv;
    float random(vec2 ab) {
        float f = (cos(dot(ab ,vec2(21.9898,78.233))) * 43758.5453);
        return fract(f);
    }
    void main() {
        float alpha = (yMax - vUv.y) * 0.8;
        float red = 1.0;
        float green = 0.3 + (0.7 * mix(((yMax - vUv.y) * 0.5) + 0.5, 0.5 - abs(max(vUv.x, vUv.y)), 0.5));
        float blueMin = abs(max(max(vUv.x, vUv.z), (vUv.y / yMax)));
        float blue = (1.0 / (blueMin + 0.5)) - 1.0;
        gl_FragColor = vec4(red, green, blue, alpha);
    }
    `;

const createSparks = (count) => {
        const positions = [];
        const directions = [];
        const offsets = [];
        const verticesCount = count * 3;

        for (let i = 0; i < count; i += 1) {
            const direction = [
                Math.random() - 0.5,
                (Math.random() + 0.3),
                Math.random() - 0.5];
            const offset = Math.random() * Math.PI;

            const xFactor = 1;
            const zFactor = 1;

            for (let j = 0; j < 3; j += 1) {
                const x = Math.random() - 0.5;
                const y = Math.random() - 0.2;
                const z = Math.random() - 0.5;

                positions.push(x, y, z);
                directions.push(...direction);
                offsets.push(offset);
            }
        }

        const geometry = new THREE.BufferGeometry();

        geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.addAttribute('direction', new THREE.Float32BufferAttribute(directions, 3));
        geometry.addAttribute('offset', new THREE.Float32BufferAttribute(offsets, 1));

        return geometry;
    };

AFRAME.registerComponent('fire', {
        schema: {
            particles: {
                type: 'number',
                default: 1000
            },
            size: {
                type: 'number',
                default: 0.5,
            },
        },
        init() {
            this.data.size = Math.random() * 2.5 + 1.5;
            const size = this.data.size;

            this.material = new THREE.RawShaderMaterial({
                uniforms: {
                    time: { value: 0.0 },
                    size: { value: size },
                    yMax: { value: 0.3 + Math.PI * size },
                },
                vertexShader: VERTEX,
                fragmentShader: FRAGMENT,
                side: THREE.DoubleSide,
                transparent: true,
            });

            this.object3D = new THREE.Object3D();
            this.el.setObject3D('mesh', this.object3D);
        },
        update() {
            const data = this.data;
            const size = data.size;

            if (this.mesh) {
                this.object3D.remove(this.mesh);
            }

            this.material.uniforms.size.value = size;

            const geometry = createSparks(data.particles);
            this.mesh = new THREE.Mesh(geometry, this.material);

            this.object3D.add(this.mesh);
        },
        remove() {
            const curr = this.el.getObject3D('mesh')
            if (curr) {
                this.object3D.remove(curr);
            }
        },
        tick(time) {
            this.material.uniforms.time.value = time * 0.0005;
        },
});


