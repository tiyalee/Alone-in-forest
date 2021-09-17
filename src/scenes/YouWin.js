import Phaser from "phaser";

export default class YouWin extends Phaser.Scene {
  constructor() {
    super("YouWin");
  }

  create() {
    const { width, height } = this.scale;

    const x = width * 0.5;
    const y = height * 0.5;

    this.add
      .text(x, y, "You Win!", {
        fontSize: "64px",
        backgroundColor: "white",
        fill: "#000",
        shadow: { fill: true, blur: 0, offsetY: 0 },
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
      })
      .setOrigin(0.5);

    // this.input.keyboard.once("keydown-SPACE", () => {
    //   this.scene.stop("GameOver");
    //   this.scene.start("BgScene");
    //   this.scene.start("FgScene");
    // });
  }
}