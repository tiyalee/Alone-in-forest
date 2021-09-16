import 'phaser';

export default class Ground extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);
    this.scene = scene;
    this.scene.add.existing(this);
    
  }
   

 update() {
  // const cam = this.cameras.main;
  // const speed = 3;
  // if (this.cursors.left.isDown) {
  //   cam.scrollX -= speed;
  // } else if (this.cursors.right.isDown) {
  //   cam.scrollX += speed;
  // }
  }
}