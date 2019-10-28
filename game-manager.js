  
if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}



AFRAME.registerComponent('game-manager', {
    schema: {
        numberTrees: { type: 'int' }
        // numberBush: { type: 'int'}
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
        for (var i = 0; i < numBush; i++) {
            newBush.push(GameManagerUtils.createBush());
        }
        sceneEl.addEventListener('loaded', function () {
            newBush.forEach(function (bush) {
                sceneEl.appendChild(bush);
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
        //text
        var bushText = document.createElement('a-entity');
        newBush.setAttribute('template', 'src:bush.template');
        bushText.setAttribute('text' , 'Grab berries');
        //bushText.setAttribute('material' , 'white');
        //bushText.setAttribute('visability' , 'true');
        //
        // newTree.setAttribute('cursor-listener', '');
        var position = GameManagerUtils.chooseRandomPosition();
        var positionStr = position.x.toString() + ' ' + position.y.toString() + ' ' + position.z.toString();
        newBush.setAttribute('position', position);
        //text position
        bushText.setAttribute('position + 1 ' , 'position + 1');
        //
        
        return newBush;
        return bushText;
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
