/* File: Coin.js 
 *
 * Creates and initializes the Powerup
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable, Powerup */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Coin(spriteTexture, atX, atY, heroRef) {
    this.kWidth = 3;
    this.kHeight = 3;
    this.mHeroRef = heroRef;
    this.mRespawnTimer = 300;
    this.mRespawningFlag = false;
    this.mSpriteText = spriteTexture;
    
    // sprite renderable 
    this.mCoin = new SpriteAnimateRenderable(spriteTexture);
    this.mCoin.setColor([1, 1, 1, 0]);
    this.mCoin.getXform().setPosition(atX, atY);
    this.mCoin.getXform().setSize(this.kWidth, this.kHeight);
    
    this.mCoin.setSpriteSequence(460,0,410,410,10,0);
    this.mCoin.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mCoin.setAnimationSpeed(8); 
    GameObject.call(this, this.mCoin);
    
    this.mMinimapObj = new Renderable();
    this.mMinimapObj.setColor([.2, .8, .8, 0]);
    this.mMinimapObj.getXform().setPosition(atX, atY);
    this.mMinimapObj.getXform().setSize(this.kWidth, this.kHeight);
    
}
gEngine.Core.inheritPrototype(Coin, Powerup);

Coin.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mCoin.updateAnimation();
    var thisBox = this.getBBox();
    var heroBox = this.mHeroRef.getBBox();
    var collideStatus = thisBox.boundCollideStatus(heroBox);
    // Only do collision detection if the powerup isn't still respawning and hero isn't full hp
    if(collideStatus !== 0){
        this.mRespawningFlag = true;
    }
    
    // Always return true for now, as this powerup respawns
    return true;
};

Coin.prototype.draw = function (aCamera) {
    if(!this.mRespawningFlag)
        GameObject.prototype.draw.call(this, aCamera);
};

Coin.prototype.drawMini = function (aCamera) {
    if(!this.mRespawningFlag)
        this.mMinimapObj.draw(aCamera);
};