import "phaser";
export default class Monster extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.speed = Phaser.Math.GetSpeed(80, 1);
    this.body.setAllowGravity(false);
    this.flipX = !this.flipX;
    this.playedSound = false;
  }

  update() {
    // if (!this.playedSound) {
    //   this.playedSound = true;
    //   screamSound.play();
    // }
  }

  dead(screamSound) {
    // if (!this.playedSound) {
    //   this.playedSound = true;
    //   screamSound.play();
    // }
    // this.setY(1000);
    // this.setActive(false);
    // this.setVisible(false);
  }
}
