import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Enemy from "../entity/Enemy";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";
import Bomb from "../entity/Bomb";

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    this.score = 0;
    this.Health = 100;
    this.scoreText;
    this.HealthText;
    this.collectGun = this.collectGun.bind(this);
    this.fireLaser = this.fireLaser.bind(this);
    this.hit = this.hit.bind(this);
  }

  preload() {
    this.load.spritesheet("josh", "assets/spriteSheets/josh.png", {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.spritesheet("brandon", "assets/sprites/brandon.png", {
      frameWidth: 340,
      frameHeight: 460,   
    });
    this.load.image("ground", "assets/sprites/ground.png", {
      frameWidth: 850,
      frameHeight: 700,
    });

    this.load.image("gun", "assets/sprites/gun.png");
    this.load.image("laserBolt", "assets/sprites/laserBolt.png");
    this.load.image("bomb", "assets/sprites/bomb.gif");

    this.load.audio("laser", "assets/audio/laser.wav");
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("scream", "assets/audio/scream.wav");
  }
  createGround(x, y) {
    this.groundGroup.create(x, y, "ground");
  }
  createBomb() {
    this.bomb = this.bombs
      .create(Phaser.Math.Between(0, 800), Phaser.Math.Between(0, 800), "bomb")
      .setScale(1.5);
    this.bomb.setBounce(1);
    this.bomb.setCollideWorldBounds(true);
    this.bomb.setVelocity(Phaser.Math.Between(-500, 500), 20);
  }
  createEnemy() {
    this.enemy = new Enemy(
      this,
      Phaser.Math.Between(0, 800),
      0,
      "brandon"
    ).setScale(0.2);

    this.physics.add.collider(this.enemy, this.groundGroup);
  }
  create() {
    this.scoreText = this.add.text(16, 16, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
    });
    this.HealthText = this.add.text(16, 60, "Health: 100", {
      fontSize: "32px",
      fill: "#000",
    });
    this.player = new Player(this, 40, 400, "josh").setScale(0.25);
    this.createEnemy();
    setInterval(() => {
      if (this.Health > 0) {
        this.createEnemy();
        this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);
        this.physics.add.collider(this.lasers, this.enemy);
        this.physics.add.collider(this.player, this.enemy);
      }
    }, 3000);
    this.groundGroup = this.physics.add.staticGroup({ classType: Ground });
    this.gun = new Gun(this, 200, 400, "gun").setScale(0.25);
    this.createGround(60, 540);
    this.createGround(160, 540);
    this.createGround(260, 540);
    this.createGround(360, 540);
    this.createGround(600, 580);
    this.createGround(480, 650);
    this.createGround(850, 540);
    this.createGround(720, 650);
    this.createGround(960, 650);
    this.createGround(1060, 650);
    this.createGround(1160, 650);
    this.createGround(1260, 650);
    this.createGround(520, 340);
    this.createGround(1200, 200);
    this.createGround(720, 250);
    this.createGround(900, 150);

    this.physics.add.collider(this.player, this.groundGroup);
    this.physics.add.collider(this.enemy, this.groundGroup);
    this.physics.add.collider(this.player, this.enemy);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(this.gun, this.groundGroup);
    this.createAnimations();
    this.physics.add.overlap(
      this.player,
      this.gun,
      this.collectGun,
      null,
      this
    );

    this.lasers = this.physics.add.group({
      classType: Laser,
      runChildUpdate: true,
      allowGravity: false,
      maxSize: 40,
    });

    this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);
    this.physics.add.collider(this.lasers, this.enemy);

    this.jumpSound = this.sound.add("jump");
    this.screamSound = this.sound.add("scream");
    this.laserSound = this.sound.add("laser");
    this.laserSound.volume = 0.5;
    this.bombs = this.physics.add.group({
      classType: Bomb,
      runChildUpdate: true,
      allowGravity: false,
    });
    setInterval(() => {
      if (this.Health > 0) {
        this.createBomb();
      }
    }, 15000);

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );
  }

  hitBomb() {
    // this.player.flipY;
    // this.player.setY(500);
    if (this.Health <= 0) {
      this.HealthText.setText("You are death!");
      this.player.flipY;
      this.player.setY(800);
      this.physics.pause();
    } else {
      this.Health -= 1;
      this.HealthText.setText("Health: " + this.Health);
    }
  }
  fireLaser(x, y, left) {
    // These are the offsets from the player's position that make it look like
    // the laser starts from the gun in the player's hand
    const offsetX = 56;
    const offsetY = 14;
    const laserX =
      this.player.x + (this.player.facingLeft ? -offsetX : offsetX);
    const laserY = this.player.y + offsetY;
    let laser = this.lasers.getFirstDead();

    if (!laser) {
      laser = new Laser(
        this,
        laserX,
        laserY,
        "laserBolt",
        this.player.facingLeft
      ).setScale(0.25);
      // Add our newly created to the group
      this.lasers.add(laser);
    }

    laser.reset(laserX, laserY, this.player.facingLeft);
  }
  hit(enemy, laser) {
    laser.setActive(false);
    laser.setVisible(false);
    enemy.dead(this.screamSound);
    this.score += 100;
    this.scoreText.setText("Score: " + this.score);
  }
  createAnimations() {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("josh", { start: 17, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: [{ key: "josh", frame: 17 }],
      frameRate: 20,
    });
    this.anims.create({
      key: "idleUnarmed",
      frames: [{ key: "josh", frame: 11 }],
      frameRate: 10,
    });
    this.anims.create({
      key: "idleArmed",
      frames: [{ key: "josh", frame: 6 }],
      frameRate: 10,
    });
  }

  collectGun(player, gun) {
    gun.disableBody(true, true);
    this.player.armed = true;
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    this.gun.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser,
      this.laserSound
    );
    this.player.update(this.cursors, this.jumpSound);
    this.enemy.update(this.screamSound);
  }
}
