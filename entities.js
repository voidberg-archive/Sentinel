var PlayerEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
        this.gravity = 0;
 
        this.setVelocity(3, 3);
        
        this.updateColRect(4, 24, 2, 28);
        
        this.addAnimation("walk_down", [0, 1, 2]);
        this.addAnimation("walk_up", [3, 4, 5]);
        this.addAnimation("walk_right", [6, 7, 8]);
        this.addAnimation("walk_left", [9, 10, 11]);
                
        this.setCurrentAnimation("walk_down");       
        
        this.keys = 0;
        this.gems = 0;
        this.score = 0;
        
        me.player = this; 
    },
 
    update: function() {
        if (me.input.isKeyPressed('left')) {
            this.walk(4);
            this.setCurrentAnimation("walk_left");        
        } else if (me.input.isKeyPressed('right')) {
            this.walk(2);
            this.setCurrentAnimation("walk_right");        
        } else {
            this.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('up')) {
          this.walk(1);
          this.setCurrentAnimation("walk_up");        
        } else if (me.input.isKeyPressed('down')) {
          this.walk(3);
          this.setCurrentAnimation("walk_down");        
        }
        else {
          this.vel.y = 0;
        }
        
        this.updateMovement();
        
        var res = me.game.collide(this);
        if (res) {
          console.log(res);
        }
        
        if (this.vel.x != 0 || this.vel.y != 0) {
            this.parent(this);
            return true;
        }

        return false;
    },
    
    walk: function(dir) {
      if (dir == 2 || dir == 4) {
        this.vel.x += (dir == 4) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
      }
      if (dir == 1 || dir == 3) {
        this.vel.y += (dir == 1) ? -this.accel.y * me.timer.tick : this.accel.y * me.timer.tick;
      }
    },
});

var KeyEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }
 
});

var GemEntity = me.CollectableEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
        this.collidable = false;
        // remove it
        me.game.remove(this);    
        
        me.player.score += 300;
        console.log(me.player.score);    
    } 
});

var SnakeEntity = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.type = me.game.ENEMY_OBJECT;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
    } 
});

var SpiderEntity = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.type = me.game.ENEMY_OBJECT;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
    } 
});

var BoulderEntity = me.ObjectEntity.extend({
    // extending the init function is not mandatory
    // unless you need to add some extra initialization
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.gravity = 0;
        this.setVelocity(3, 3);
        this.type = me.game.ACTION_OBJECT;
    },
 
    // this function is called by the engine, when
    // an object is touched by something (here collected)
    onCollision: function() {
        // do something when collected
        this.vel.x = me.player.vel.x;
        this.vel.y = me.player.vel.y;
        console.log('Colliding');
    } 
});
