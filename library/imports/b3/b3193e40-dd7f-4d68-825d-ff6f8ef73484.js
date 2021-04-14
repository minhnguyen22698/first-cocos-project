"use strict";
cc._RF.push(module, 'b31935A3X9NaIJd/2+O9zSE', 'Player');
// textures/scripts/Player.js

'use strict';

// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // Main character's jump height
        jumpHeight: 0,
        // Main character's jump duration
        jumpDuration: 0,
        // Maximal movement speed
        maxMoveSpeed: 0,
        // Acceleration
        accel: 0

    },

    runJumpAction: function runJumpAction() {
        // Jump up
        var jumpUp = cc.tween().by(this.jumpDuration, { y: this.jumpHeight }, { easing: 'sineOut' });
        // Jump down
        var jumpDown = cc.tween().by(this.jumpDuration, { y: -this.jumpHeight }, { easing: 'sineIn' });

        // Create a easing and perform actions in the order of "jumpUp", "jumpDown"
        var tween = cc.tween().sequence(jumpUp, jumpDown);
        // Repeat
        return cc.tween().repeatForever(tween);
    },


    //Player move
    onKeyDown: function onKeyDown(event) {
        // Set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },
    onKeyUp: function onKeyUp(event) {
        // Unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        //Khoi tao jump
        var jumpAction = this.runJumpAction();
        cc.tween(this.node).then(jumpAction).start();

        //Khoi tao huong chuyen doi
        this.accLeft = false;
        this.accRight = false;

        this.xSpeed = 0;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDestroy: function onDestroy() {
        // Cancel keyboard input monitoring
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start: function start() {},


    update: function update(dt) {
        console.log(dt);
        // Update speed of each frame according to the current acceleration direction
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // Restrict the movement speed of the main character to the maximum movement speed
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // If speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // Update the position of the main character according to the current speed
        this.node.x += this.xSpeed * dt;
    }
});

cc._RF.pop();