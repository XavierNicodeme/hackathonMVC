var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 700 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var notes;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/images/backGround.png');
    this.load.image('ground', 'assets/images/platform.png');
    this.load.image('note', 'assets/images/note.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('dude', 'assets/images/dudeAli.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('music', 'assets/sounds/metal.mp3');
    this.load.audio('death', 'assets/sounds/scream2.mp3');
    this.load.audio('coin', 'assets/sounds/coin-sound.mp3');
    this.load.audio('win', 'assets/sounds/mission-complete.mp3');
}

function create ()
{
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    notes = this.physics.add.group({
        key: 'note',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    notes.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'Score : 0/100', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(notes, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, notes, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.death = this.sound.add('death');
    this.music = this.sound.add('music');
    this.coin = this.sound.add('coin');
    this.win = this.sound.add('win');

    var musicConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    this.music.play(musicConfig);
}

function update ()
{
    if (gameOver)
    {
        document.location.href = '/';
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-300);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(300);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }
}

function collectStar (player, note)
{
    var coinConfig = {
        mute: false,
        volume: 10,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    this.coin.play(coinConfig);

    note.disableBody(true, true);

    //  Add and update the score
    score += 1;
    scoreText.setText('Score: ' + score + '/100');

    if (notes.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        notes.children.iterate(function (child) {

            child.enableBody(true, child.x, 0, true, true);

        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

function hitBomb (player, bomb)
{
    this.physics.pause();

    var deathConfig = {
        mute: false,
        volume: 10,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
    this.death.play(deathConfig);

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
