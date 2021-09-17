import 'phaser';

const LIFE_SPAN = 39000;
export default class Monster extends Phaser.Physics.Arcade.Sprite {

  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.speed = Phaser.Math.GetSpeed(80, 1);
    this.lifespan = LIFE_SPAN;
    this.body.setAllowGravity(false);

    
  }
  // reset(x, y) {
  //   this.setActive(true);
  //   this.setVisible(true);
  //   this.lifespan = LIFE_SPAN;
  //   this.setPosition(x, y)
  // }

  
}
