/* File: StoryPanel.js 
 *
 * Creates and initializes the StoryPanel object
 * overrides the update function of GameObject
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function StoryPanel(texture, spawnX, spawnY, width, camRef, heroRef, lineAry, midScreenY = 20){
    this.mCamRef = camRef;
    this.mHeroRef = heroRef;
    this.mMidScreenY = midScreenY;
    this.mActive = false; // If the panel should be shown or not
    
    
    // the board as background of txt
    this.mPanel = new TextureRenderable(texture);
    this.mPanel.getXform().setSize(width, width);
    
    this.mText1 = new FontRenderable(" ");
    this.mText2 = new FontRenderable(" ");
    this.mText3 = new FontRenderable(" ");
    this.mText4 = new FontRenderable(" ");
    
    
    //the text - positions are set in update()
    if(lineAry.length >= 4)
    {
        this.mText4.setText(lineAry[3]);
        this.mText4.setTextHeight(2);
    }
    
    if(lineAry.length >= 3)
    {
        this.mText3.setText(lineAry[2]);
        this.mText3.setTextHeight(2);
    }
    
    if(lineAry.length >= 2)
    {
        this.mText2.setText(lineAry[1]);
        this.mText2.setTextHeight(2);
    }
    
    if(lineAry.length >= 1)
    {
        this.mText1.setText(lineAry[0]);
        this.mText1.setTextHeight(2);
    }
    
    //stub in game
    this.mStub = new Renderable();
    this.mStub.setColor([0.5,0,0.5,1]);
    this.mStub.getXform().setPosition(spawnX, spawnY);
    this.mStub.getXform().setSize(2,2);
    
    this.mMinimapObj = new Renderable();
    this.mMinimapObj.setColor([.3, .9, .9, 1]);
    this.mMinimapObj.getXform().setPosition(spawnX, spawnY + 5);
    this.mMinimapObj.getXform().setSize(3, 3);
    
    GameObject.call(this,this.mPanel);
    
    // bounding box for stub that appears outside
    this.mPanelBBox = this.getBBox();
    this.mPanelBBox.setBounds(this.mStub.getXform().getPosition(),2,2);
    
}
gEngine.Core.inheritPrototype(StoryPanel, GameObject);

StoryPanel.prototype.update = function(){
    GameObject.prototype.update.call(this);
    var camPos = this.mCamRef.getWCCenter();
    var camX = camPos[0];
    
    // tutorial panel bounding box collision
    var heroCollision = this.mPanelBBox.boundCollideStatus(this.mHeroRef.getBBox());
    if(heroCollision !== 0){
        this.mActive = true;
    }
    else
    {
        this.mActive = false;
    }

    if(this.mActive){
        this.mPanel.getXform().setPosition(camX, this.mMidScreenY);
   
        //the text
        this.mText1.getXform().setPosition(camX-21,this.mMidScreenY+17);   
        this.mText2.getXform().setPosition(camX-21,this.mMidScreenY+14);  
        this.mText3.getXform().setPosition(camX-21,this.mMidScreenY+11);
        this.mText4.getXform().setPosition(camX-21,this.mMidScreenY+8);
    }
    
    var c = this.mStub.getColor()[1];
    var d = 0.01;
    if(c < 1){
        this.mStub.setColor([0.5,c+d,0.5,1]);
    }else{ this.mStub.setColor([0.5,0,0.5,1]);}
    
};

StoryPanel.prototype.draw = function(aCam){
    this.mStub.draw(aCam);
    if(this.mActive){
        GameObject.prototype.draw.call(this,aCam);
        this.mText1.draw(aCam);
        this.mText2.draw(aCam);
        this.mText3.draw(aCam);
        this.mText4.draw(aCam);
    };
};

StoryPanel.prototype.drawMini = function(aCam)
{
    this.mMinimapObj.draw(aCam);
};