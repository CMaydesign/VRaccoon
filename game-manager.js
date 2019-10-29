  
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var temppos;

AFRAME.registerComponent('game-manager', {
    schema: {
        numberTrees: { type: 'int' },
        numberBush: { type: 'int'},
        numberText: { type: 'int'}
    },
    init: function () {
        var numTrees = this.data['numberTrees'];
        var sceneEl = document.querySelector('a-scene');
        var newTrees = [];
        for (var i = 0; i < numTrees; i++) {
            newTrees.push(GameManagerUtils.createTree());
        }
        sceneEl.addEventListener('loaded', function () {
            newTrees.forEach(function (tree) {
                sceneEl.appendChild(tree);
            });
        });
        var numBush = this.data['numberBush'];
        var newBush = [];
        var numText = this.data['numberText'];
        var newText = [];
        for (var i = 0; i < numBush; i++) {
            newBush.push(GameManagerUtils.createBush());
            newText.push(GameManagerUtils.createText());
        }
        sceneEl.addEventListener('loaded', function () {
            newBush.forEach(function (bush) {
                sceneEl.appendChild(bush);
            });
        });
        sceneEl.addEventListener('loaded', function () {
            newText.forEach(function (text) {
                sceneEl.appendChild(text);
            });
        });
    }
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
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newTree.setAttribute('position', position);
        return newTree;
    },
    createBush: function () {
        console.log('createBush');
        var newBush = document.createElement('a-entity');
        newBush.setAttribute('template', 'src:bush.template');
        //
        // newTree.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newBush.setAttribute('position', position);
        temppos = position;
        return newBush;    },
    
    //text
    createText: function () {
        console.log('createText');
        var newText = document.createElement('a-entity');
        newText.setAttribute('rotation', '0 200 0');
        //newText.setAttribute('id', 'opacity');
        //newText.setAttribute('animation', 'property: components.text.material.uniforms.opacity.value; to: 0; dir: alternate; loop: true');
        newText.setAttribute('text', 'value: Goraz; width:10; align: center;');
        //newText.setAttribute('material', 'color:white;');
        //newText.setAttribute('value', 'Grab berries');
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newText.setAttribute('position', temppos);
        newText.setAttribute('position', {y: 2});
        return newText;
    }
    
    
};
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
