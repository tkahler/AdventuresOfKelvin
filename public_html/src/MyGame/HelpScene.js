/*
 * File: HelpScene.js
 * Help scene when clicking help
 *
 */

/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObj, SpriteAnimateRenderable, GameScene */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function HelpScene() {
    this.kUIButton = "assets/UI/button.png";
    
    // The camera to view the scene
    this.mCamera = null;
    
    this.UIText = null;
    this.LevelSelect = null;
    
    //Our game test scene
    this.backButton = null;
    this.startLevelButton = null;
}
gEngine.Core.inheritPrototype(HelpScene, Scene);


HelpScene.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kUIButton);
};

HelpScene.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kUIButton);
    if(this.LevelSelect==="Back"){
        gEngine.Core.startScene(new MyGame());
    }
    else if(this.LevelSelect==="StartGame"){
        gEngine.Core.startScene(new Level1Scene());
    }
};

HelpScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 40), // position of the camera
        100,                     // width of camera
        [0, 0, 800, 600]         // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
    gEngine.DefaultResources.setGlobalAmbientIntensity(3);
    
    
    //this.ParticleButton = new UIButton(this.kUIButton,this.particleSelect,this,[400,400],[600,100],"Particle Demos",8,[1,1,1,1],[0,0,0,1]);
    //this.PhysicsButton = new UIButton(this.kUIButton,this.physicsSelect,this,[400,300],[500,100],"Physics Demo",8,[1,1,1,1],[0,0,0,1]);
    //this.UIButton =  new UIButton(this.kUIButton,this.uiSelect,this,[400,200],[320,100],"UI Demo",8,[1,1,1,1],[0,0,0,1]);
    this.UIText = new UIText("HELP PAGE",[400,600],8,1,0,[0,0,0,1]);
    
    //param: sprite, run when click, return contect to, buttonPos, buttonSize, text, textSize, textColor, textColorClicked
    this.backButton = new UIButton(this.kUIButton,this.backSelect,this,[400,400],[350,100],"BACK",8,[1,1,1,1],[0,0,0,1]);
    this.startLevelButton = new UIButton(this.kUIButton,this.startGameSelect,this,[400,200],[350,100],"START GAME",8,[1,1,1,1],[0,0,0,1]);
};  

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
HelpScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    
    this.mCamera.setupViewProjection();
    //this.ParticleButton.draw(this.mCamera);
    //this.PhysicsButton.draw(this.mCamera);
    //this.UIButton.draw(this.mCamera);
    this.UIText.draw(this.mCamera);
    this.backButton.draw(this.mCamera);
    this.startLevelButton.draw(this.mCamera);
};

HelpScene.prototype.update = function () {
    //this.ParticleButton.update();
    //this.PhysicsButton.update();
    //this.UIButton.update();
    this.backButton.update();
    this.startLevelButton.update();
};

HelpScene.prototype.backSelect= function(){
    this.LevelSelect="Back";
    gEngine.GameLoop.stop();
};

HelpScene.prototype.startGameSelect= function(){
    this.LevelSelect="StartGame";
    gEngine.GameLoop.stop();
};