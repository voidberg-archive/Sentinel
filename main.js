/*!
 * 
 *   melonJS
 *   http://www.melonjs.org
 *		
 **/

var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 480, 320, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
    
    // me.debug.renderHitBox = true;
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());

    // add our player entity in the entity pool
    me.entityPool.add("mainPlayer", PlayerEntity);
    me.entityPool.add("keyEntity", KeyEntity);  
    me.entityPool.add("gemEntity", GemEntity);
    me.entityPool.add("spiderEntity", SpiderEntity);
    me.entityPool.add("snakeEntity", SnakeEntity);
    me.entityPool.add("boulderEntity", BoulderEntity);
    
    // enable the keyboard
    me.input.bindKey(me.input.KEY.LEFT,   "left");
    me.input.bindKey(me.input.KEY.RIGHT,  "right");
    me.input.bindKey(me.input.KEY.UP,     "up");
    me.input.bindKey(me.input.KEY.DOWN,   "down");
    me.input.bindKey(me.input.KEY.X,      "jump", true);      
    
    // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
      me.levelDirector.loadLevel("level1");
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});
