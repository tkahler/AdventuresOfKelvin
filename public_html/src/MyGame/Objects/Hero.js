/* File: Hero.js 
 *
 * Creates and initializes the Hero
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture, atX, atY, lgtSet) {
    this.kDelta = 0.2;
    this.kWidth = 6;
    this.kHeight = 6;
    
    // light renderable 
    this.mKelvin = new LightRenderable(spriteTexture);
    
    this.mKelvin.setColor([1, 1, 1, 0]);
    this.mKelvin.getXform().setPosition(atX, atY);
    this.mKelvin.getXform().setZPos(1);
    this.mKelvin.getXform().setSize(this.kWidth, this.kHeight);

    //this.mHeroState = Hero.eHeroState.eRunRight;
    //this.mPreviousHeroState = Hero.eHeroState.eRunLeft;
    this.mIsMoving = false;
    this.mCanJump = false;
    this.mInAir = false;

    this.mKelvin.setSpriteSequence(256,0,128,256,8,0);
    this.mKelvin.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mKelvin.setAnimationSpeed(12);         // show each element for mAnimSpeed updates                               
    
    //this.mKelvin.addLight(lgtSet.getLightAt(2)); //jeb fix
    //this.mKelvin.addLight(lgtSet.getLightAt(3));
    //this.mKelvin.addLight(lgtSet.getLightAt(2);
    
    GameObject.call(this, this.mKelvin);
    
    var r = new RigidRectangle(this.getXform(), this.kWidth/1.2 , this.kHeight/1.1 );
    this.setRigidBody(r);
    r.setMass(10);     // high mass so wont get affected by other object much
    r.setRestitution(-0.1); // higher means more bouncy
    r.setFriction(1);   //how much it slides with other object
    
    this.mRbox = r;
    
    //this.toggleDrawRenderable();
    this.toggleDrawRigidShape();
    
}
gEngine.Core.inheritPrototype(Hero, GameObject);

/*
Hero.eHeroState = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});
*/

Hero.prototype.update = function () {
    GameObject.prototype.update.call(this);
    
    // control by WASD
    var xform = this.getXform();
    this.mIsMoving = false;
    var v = this.getRigidBody().getVelocity();

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if (this.mCanJump === true) {
            //this.mPreviousHeroState = this.mHeroState;
            //this.mHeroState = Hero.eHeroState.eRunLeft;
            this.mIsMoving = true;
        }
        //make less movement in air
        if(!this.mCanJump){
            xform.incXPosBy(-this.kDelta*0.5);
        } else {
            xform.incXPosBy(-this.kDelta);
        }
        
        this.mKelvin.updateAnimation();
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if (this.mCanJump === true) {
            //this.mPreviousHeroState = this.mHeroState;
            //this.mHeroState = Hero.eHeroState.eRunRight;
            this.mIsMoving = true;
        }
        //make less movement in air
        if(!this.mCanJump){
            xform.incXPosBy(this.kDelta*0.5);
        } else {
            xform.incXPosBy(this.kDelta);
        }
        this.mKelvin.updateAnimation();
    }

    
    if (this.mCanJump === true && this.mInAir === false) {
        if (this.mIsMoving === false) {
            /*
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === Hero.eHeroState.eRunRight || this.mHeroState === Hero.eHeroState.eJumpRight)
                this.mHeroState = Hero.eHeroState.eFaceRight;
            if (this.mHeroState === Hero.eHeroState.eRunLeft || this.mHeroState === Hero.eHeroState.eJumpLeft)
                this.mHeroState = Hero.eHeroState.eFaceLeft;
            */
        }
        if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space)) {          
            v[1] = 25; // Jump velocity
            /*
            this.mPreviousHeroState = this.mHeroState;
            if (this.mHeroState === Hero.eHeroState.eRunRight
                    || this.mHeroState === Hero.eHeroState.eFaceRight)
                this.mHeroState = Hero.eHeroState.eJumpRight;
            if (this.mHeroState === Hero.eHeroState.eRunLeft
                    || this.mHeroState === Hero.eHeroState.eFaceLeft)
                this.mHeroState = Hero.eHeroState.eJumpLeft;
            */
            this.mIsMoving = true;
            this.mInAir = true;
        }
    }

    //this.changeAnimation();
    // attempt to make kelvin upright
    this.setCurrentFrontDir(vec2.fromValues(0, xform.getYPos()+1));
    
    this.mIsMoving = false;
    this.mCanJump = false;
    this.mInAir = false;
    
};

/*
Hero.prototype.changeAnimation = function () {
    if (this.mHeroState !== this.mPreviousHeroState) {
        switch (this.mHeroState) {
            case Hero.eHeroState.eFaceLeft:
                this.mKelvin.setSpriteSequence(1508, 0, 140, 180, 3, 0);
                this.mKelvin.getXform().setSize(-this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(20);
                break;
            case Hero.eHeroState.eFaceRight:
                this.mKelvin.setSpriteSequence(1508, 0, 140, 180, 3, 0);
                this.mKelvin.getXform().setSize(this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(20);
                break;
            case Hero.eHeroState.eRunLeft:
                this.mKelvin.setSpriteSequence(1688, 0, 140, 180, 6, 0);
                this.mKelvin.getXform().setSize(-this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(5);
                break;
            case Hero.eHeroState.eRunRight:
                this.mKelvin.setSpriteSequence(1688, 0, 140, 180, 6, 0);
                this.mKelvin.getXform().setSize(this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(5);
                break;
            case Hero.eHeroState.eJumpLeft:
                this.mKelvin.setSpriteSequence(2048, 0, 140, 180, 10, 0);
                this.mKelvin.getXform().setSize(-this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(4);
                break;
            case Hero.eHeroState.eJumpRight:
                this.mKelvin.setSpriteSequence(2048, 0, 140, 180, 10, 0);
                this.mKelvin.getXform().setSize(this.kWidth, this.kHeight);
                this.mKelvin.setAnimationSpeed(4);
                break;
        }
    }
};

*/

Hero.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

Hero.prototype.canJump = function (b) {
    this.mCanJump = b;
};

Hero.prototype.getRbox = function() {
    return this.mRbox;
};

