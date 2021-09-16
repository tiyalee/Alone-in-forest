import 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.facingLeft = false;
    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
    
  }
  updateMovement(cursors) {
    // Move left
    if (cursors.left.isDown) {
      if (!this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = true;
      }
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    }
    // Move right
    else if (cursors.right.isDown) {
      if (this.facingLeft) {
        this.flipX = !this.flipX;
        this.facingLeft = false;
      }
      this.setVelocityX(360);
      if(this.body.touching.down){
        this.play('run',true)
      }
    }
    else {
      this.setVelocityX(0);
      if(!this.armed){
      this.anims.play('idleUnarmed', true);
      }else{
        this.anims.play('idleArmed', true);
      }
    }
  }



  updateInAir() {
    if (!this.body.touching.down) {
      this.play('jump');
    }
  }

  
  update(cursors,jumpSound) {
    this.updateMovement(cursors);
    this.updateInAir();
    this.updateJump(cursors,jumpSound);
  }

  updateJump(cursors,jumpSound) {
    if (cursors.up.isDown && this.body.touching.down) {
      this.setVelocityY(-800);
      jumpSound.play();  
    }
  }
}
