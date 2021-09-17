import "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.flipX = !this.flipX;
    this.playedSound = false;
    // this.reset(x, y)
  }

//   reset(x, y) {
//     this.setPosition(x, y)
//   }
  update(screamSound) {
    if (y>800 || !this.playedSound) {
      this.playedSound = true;
      screamSound.play();
    }

    
  }

  dead(screamSound) {
    if (!this.playedSound) {
      this.playedSound = true;
      screamSound.play();
    }
    this.setY(1000);
    this.setActive(false);
    this.setVisible(false);
  }
}
