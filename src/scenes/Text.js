import Phaser from "phaser";
import { event } from "./event";

export default class Text extends Phaser.Scene {

  constructor() {
    super("Text");
    this.Health = 100;
    this.score = 0;
  }

  create() {
    this.scoreText = this.add
      .text(16, 16, "Score: 0", {
        fontSize: "32px",
        backgroundColor: "white",
        fill: "#000",
      })
   
    this.HealthText = this.add.text(
      16 ,
      60,
      "Health: 100",
      {
        fontSize: "32px",
        backgroundColor: "white",  
        fill: "#000",
      }
    );
    event.on("scoreText", this.handleScore, this);
    event.on("HealthText", this.handleHealth, this);
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      event.off("scoreText", this.handleScore, this);
    });
    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      event.off("HealthText", this.handleHealth, this);
    });
  }

  handleHealth() {
    this.Health -= 1;
    this.HealthText.setText("Health: " + this.Health);
  }

  handleScore() {
    this.score = this.score + 100;
    this.scoreText.setText("Score: " + this.score);
  }
}
