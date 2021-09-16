import "phaser";


export default class BgScene extends Phaser.Scene {
  constructor() {
    super("BgScene");
  }

  preload() {
    this.load.image("sky", "assets/backgrounds/sky.png");
    this.load.image("cloud", "assets/backgrounds/cloud.png");
    this.load.image("mountain", "assets/backgrounds/mountain2.png");
    this.load.image("pine1", "assets/backgrounds/pine1.png");
    this.load.image("pine2", "assets/backgrounds/pine2.png");

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  createAligned (scene,count,texture,scrollFactor){

  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    this.add.image(0.5 * w, 0.5 * h, "sky").setScale(2.91).setScrollFactor(0);
    this.add
      .image(0, 0.25 * h, "cloud")
      .setScale(1)
      .setOrigin(0, 1)
      .setScrollFactor(0.15);
    this.add
      .image(0, 0.6 * h, "mountain")
      .setScale(1.8)
      .setOrigin(0, 1).setScrollFactor(0.2);
    this.add
      .image(0, 0.8 * h, "pine1")
      .setScale(1.8)
      .setOrigin(0, 1).setScrollFactor(0.5);
    this.add.image(0, h, "pine2").setScale(1.8).setOrigin(0, 1).setScrollFactor(1);
  }

  update() {
    const cam = this.cameras.main;
    const speed = 3;
    if (this.cursors.left.isDown) {
      cam.scrollX -= speed;
    } else if (this.cursors.right.isDown) {
      cam.scrollX += speed;
    }
  }
}
