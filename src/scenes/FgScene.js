import Player from "../entity/Player";
import Ground from "../entity/Ground";
import Enemy from "../entity/Enemy";
import Gun from "../entity/Gun";
import Laser from "../entity/Laser";
import Bomb from "../entity/Bomb";
import GameOver from "./GameOver";
import {event} from "./event"

export default class FgScene extends Phaser.Scene {
  constructor() {
    super("FgScene");
    // this.score = 0;
    this.Health = 100;
    // this.scoreText;
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
    this.load.spritesheet("brandon", "assets/sprites/monster.png", {
      frameWidth: 340,
      frameHeight: 460,
    });
    this.load.image("ground", "assets/sprites/ground1.png", {
      frameWidth: 120,
      frameHeight: 30,
    });

    this.load.image("gun", "assets/sprites/gun.png");
    this.load.image("laserBolt", "assets/sprites/laserBolt.png");
    this.load.image("bomb", "assets/sprites/monster.png");

    this.load.audio("laser", "assets/audio/laser.wav");
    this.load.audio("jump", "assets/audio/jump.wav");
    this.load.audio("scream", "assets/audio/scream.wav");

    this.cursors = this.input.keyboard.createCursorKeys();
  }
  createGround(x, y) {
    this.groundGroup.create(x, y, "ground");
  }

  createMultiGround() {
    let x = 40;
    let y = 480;
    this.createGround(60, 540);
    for (let i = 0; i < 200; i++) {
      if (i < 30) {
        x += Phaser.Math.Between(100, 250);
      } else if (i < 60) {
        x += Phaser.Math.Between(250, 300);
      } else {
        x += Phaser.Math.Between(250, 350);
      }
      if (y > 540) {
        y -= 100;
      } else if(y< 200 ){
        y+=100;
      }
      else {
        y += Phaser.Math.Between(-100, 100);
      }
      this.createGround(x, y);
    }
  }
  createBomb() {
    this.bomb =this.bombs.create(
     
      Phaser.Math.Between(0, 1200) + this.cameras.main.scrollX,
      0,
        "bomb"
      )
      .setScale(0.6)
    this.bomb.setBounce(1);
    // this.bomb.setCollideWorldBounds(true);
    this.bomb.setVelocity(Phaser.Math.Between(-500, 500), 
    Phaser.Math.Between(-500, 500));
  }

  createEnemy() {
    if (this.Health > 0) {
      this.enemy = new Enemy(
        this,
        Phaser.Math.Between(0, 1200) + this.cameras.main.scrollX,
        0,
        "brandon"
      )
        .setScale(0.5)
        .setScrollFactor(1);

      this.physics.add.collider(this.enemy, this.groundGroup);
    }
  }
  create() {

    // this.graphics = this.add.graphics()
    // this.graphics.fillStyle(0x808080);
    // this.graphics.fillRoundedRect(10,10,200,20,5);
    // this.graphics.fillStyle(0x00ff00);
    // this.graphics.fillRoundedRect(10,10,100,20,5)
     
    this.HealthText = this.add.text(
      16 + this.cameras.main.scrollX,
      60,
      "Health: 100",
      {
        fontSize: "32px",
        backgroundColor: "white",
        fill: "#000",
      }
    );
    this.player = new Player(this, 40, 400, "josh").setScale(0.25);
    this.createEnemy();

    // for(let i=0; i< 100;i++){
    //   this.createEnemy();
    //       this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);
    //       this.physics.add.collider(this.lasers, this.enemy);
    //       this.physics.add.collider(this.player, this.enemy);
    // }


    this.enemyInterval = setInterval(() => {
      if (this.Health > 0) {
        this.createEnemy();
        this.physics.add.overlap(this.lasers, this.enemy, this.hit, null, this);
        this.physics.add.overlap(this.player, this.enemy, this.enemyHit, null, this);
        this.physics.add.collider(this.lasers, this.enemy);
        this.physics.add.collider(this.enemy, this.enemy);
        this.physics.add.collider(this.player, this.enemy);
      }
    }, 3000);
    this.groundGroup = this.physics.add.staticGroup({
      key: "ground",
    });
    this.gun = new Gun(this, 100, 400, "gun").setScale(0.25);
    this.createMultiGround();

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
    // this.physics.add.overlap(this.lasers, this.bomb, this.hitB, null, this);
    this.physics.add.collider(this.lasers, this.bomb);

    this.jumpSound = this.sound.add("jump");
    this.screamSound = this.sound.add("scream");
    this.laserSound = this.sound.add("laser");
    this.laserSound.volume = 0.5;
    this.bombs = this.physics.add.group({
      classType: Bomb,
      runChildUpdate: true,
      allowGravity: false,
    });
    this.bombInterval = setInterval(() => {
  
        this.createBomb();
      
    }, 1000);

    this.physics.add.collider(
      this.player,
      this.bombs,
      this.hitBomb,
      null,
      this
    );

    this.cameras.main.setBounds(0, 0, this.scale.width*10, 600);
  }

  hitBomb() {
    // this.player.flipY;
    // this.player.setY(500);
    if (this.Health <= 0) {
      this.player.setY(1500);
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
  event.emit("scoreText");
  }

  // hitB(bomb, laser) {
  //   laser.setActive(false);
  //   laser.setVisible(false);
  //   bomb.y = 800;
  //   bomb.setActive(false);
  //   bomb.setVisible(false);
  //  event.emit("scoreText");
  // }


  enemyHit(enemy,player) {
    this.Health -= 1;
    this.HealthText.setText("Health: " + this.Health);
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

  update(time, delta) {
    if (this.Health < 0 || this.player.y > 600) {
      clearInterval(this.enemyInterval);
      clearInterval(this.bombInterval);
      this.scene.stop("FgScene");
      this.scene.start("GameOver");
      // this.scene.stop('BgScene')
      return;
    }

    this.gun.update(
      time,
      this.player,
      this.cursors,
      this.fireLaser,
      this.laserSound
    );
    this.player.update(this.cursors, this.jumpSound);
    this.enemy.update(this.screamSound);

    if (this.cursors.left.isDown) {
      this.cameras.main.scrollX = this.player.x - 300;
    } else if (this.cursors.right.isDown) {
      this.cameras.main.scrollX = this.player.x - 300;
    }
  }
}
