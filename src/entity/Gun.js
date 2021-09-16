import 'phaser';

const FIRE_DELAY = 300;
export default class Gun extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey,) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.fireDelay = FIRE_DELAY;
    this.lastFired = 0;
    
  }

  update(time, player, cursors, fireLaserFn,laserSound) {
    if (cursors.space.isDown && time > this.lastFired) {
      if (player.armed) {
        laserSound.play();
        fireLaserFn();   
        this.lastFired = time + this.fireDelay;
      }
    }
  }
}
