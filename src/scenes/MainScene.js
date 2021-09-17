import 'phaser'


export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.scene.launch('BgScene');
    this.scene.launch('FgScene');
    this.scene.launch('Text')
  }
}
