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
  createAligned(totalWidth, height, texture, scrollFactor) {
    const w = this.textures.get(texture).getSourceImage().width;
    const count = Math.ceil(totalWidth / w) * scrollFactor;

    let x = 0;
    for (let i = 0; i < count; ++i) {
      const m = this.add
        .image(x, height, texture)
        .setScale(1.8)
        .setOrigin(0, 1)
        .setScrollFactor(scrollFactor);
      x += m.width;
    }
  }

  create() {
    const w = this.scale.width;
    const h = this.scale.height;
    const totalW = 10 * w;
    this.add
      .image(0.5 * w, 0.5 * h, "sky")
      .setScale(2.91)
      .setScrollFactor(0);


    this.createAligned(totalW, 0.25 * h, "cloud", 0.1);
    this.createAligned(totalW, 0.6 * h, "mountain", 0.25);
    this.createAligned(totalW, 0.8 * h, "pine1", 0.5);
    this.createAligned(totalW, h, "pine2", 1);

    this.cameras.main.setBounds(0,0,totalW,h);
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
