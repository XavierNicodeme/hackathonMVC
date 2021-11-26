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
var myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {
    keyboard: false
})
let allSongs = [];
for (let i = 1; i < 44; i++) {
    allSongs.push('starwars'+i+'.mp3');
}
let count = 0

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/images/backGround.png');
    this.load.image('ground', 'assets/images/platform2.png');
    this.load.image('note', 'assets/images/note.png');
    this.load.image('bomb', 'assets/images/bomb.png');
    this.load.spritesheet('dude', 'assets/images/dudeAli2.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('music', 'assets/sounds/metal.mp3');
    this.load.audio('death', 'assets/sounds/scream2.mp3');
    this.load.audio('coin', 'assets/sounds/coin-sound.mp3');
    this.load.audio('win', 'assets/sounds/mission-complete.mp3');
    this.load.audio('starwars1', 'assets/sounds/starwars1.mp3')
    this.load.audio('starwars2', 'assets/sounds/starwars2.mp3')
    this.load.audio('starwars3', 'assets/sounds/starwars3.mp3')
    this.load.audio('starwars4', 'assets/sounds/starwars4.mp3')
    this.load.audio('starwars5', 'assets/sounds/starwars5.mp3')
    this.load.audio('starwars6', 'assets/sounds/starwars6.mp3')
    this.load.audio('starwars7', 'assets/sounds/starwars7.mp3')
    this.load.audio('starwars8', 'assets/sounds/starwars8.mp3')
    this.load.audio('starwars9', 'assets/sounds/starwars9.mp3')
    this.load.audio('starwars10', 'assets/sounds/starwars10.mp3')
    this.load.audio('starwars11', 'assets/sounds/starwars11.mp3')
    this.load.audio('starwars12', 'assets/sounds/starwars12.mp3')
    this.load.audio('starwars13', 'assets/sounds/starwars13.mp3')
    this.load.audio('starwars14', 'assets/sounds/starwars14.mp3')
    this.load.audio('starwars15', 'assets/sounds/starwars15.mp3')
    this.load.audio('starwars16', 'assets/sounds/starwars16.mp3')
    this.load.audio('starwars17', 'assets/sounds/starwars17.mp3')
    this.load.audio('starwars18', 'assets/sounds/starwars18.mp3')
    this.load.audio('starwars19', 'assets/sounds/starwars19.mp3')
    this.load.audio('starwars20', 'assets/sounds/starwars20.mp3')
    this.load.audio('starwars21', 'assets/sounds/starwars21.mp3')
    this.load.audio('starwars22', 'assets/sounds/starwars22.mp3')
    this.load.audio('starwars23', 'assets/sounds/starwars23.mp3')
    this.load.audio('starwars24', 'assets/sounds/starwars24.mp3')
    this.load.audio('starwars25', 'assets/sounds/starwars25.mp3')
    this.load.audio('starwars26', 'assets/sounds/starwars26.mp3')
    this.load.audio('starwars27', 'assets/sounds/starwars27.mp3')
    this.load.audio('starwars28', 'assets/sounds/starwars28.mp3')
    this.load.audio('starwars29', 'assets/sounds/starwars29.mp3')
    this.load.audio('starwars30', 'assets/sounds/starwars30.mp3')
    this.load.audio('starwars31', 'assets/sounds/starwars31.mp3')
    this.load.audio('starwars32', 'assets/sounds/starwars32.mp3')
    this.load.audio('starwars33', 'assets/sounds/starwars33.mp3')
    this.load.audio('starwars34', 'assets/sounds/starwars34.mp3')
    this.load.audio('starwars35', 'assets/sounds/starwars35.mp3')
    this.load.audio('starwars36', 'assets/sounds/starwars36.mp3')
    this.load.audio('starwars37', 'assets/sounds/starwars37.mp3')
    this.load.audio('starwars38', 'assets/sounds/starwars38.mp3')
    this.load.audio('starwars39', 'assets/sounds/starwars39.mp3')
    this.load.audio('starwars40', 'assets/sounds/starwars40.mp3')
    this.load.audio('starwars41', 'assets/sounds/starwars41.mp3')
    this.load.audio('starwars42', 'assets/sounds/starwars42.mp3')
    this.load.audio('starwars43', 'assets/sounds/starwars43.mp3')
    this.load.audio('starwars44', 'assets/sounds/starwars44.mp3')
    for (let i = 1; i < 60; i++) {
        this.load.audio('aliperry'+i, 'assets/sounds/aliperry' +i+'.mp3')
    }
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
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    notes.children.iterate(function (child) {

        //  Give each star a slightly different bounce
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    bombs = this.physics.add.group();

    //  The score
    scoreText = this.add.text(16, 16, 'Score : 0/60', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(notes, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, notes, collectStar, null, this);

    this.physics.add.collider(player, bombs, hitBomb, null, this);

    this.death = this.sound.add('death');
    this.music = this.sound.add('music');
    this.song1 = this.sound.add('aliperry1')
    this.song2 = this.sound.add('aliperry2')
    this.song3 = this.sound.add('aliperry3')
    this.song4 = this.sound.add('aliperry4')
    this.song5 = this.sound.add('aliperry5')
    this.song6 = this.sound.add('aliperry6')
    this.song7 = this.sound.add('aliperry7')
    this.song8 = this.sound.add('aliperry8')
    this.song9 = this.sound.add('aliperry9')
    this.song10 = this.sound.add('aliperry10')
    this.song11 = this.sound.add('aliperry11')
    this.song12 = this.sound.add('aliperry12')
    this.song13 = this.sound.add('aliperry13')
    this.song14 = this.sound.add('aliperry14')
    this.song15 = this.sound.add('aliperry15')
    this.song16 = this.sound.add('aliperry16')
    this.song17 = this.sound.add('aliperry17')
    this.song18 = this.sound.add('aliperry18')
    this.song19 = this.sound.add('aliperry19')
    this.song20 = this.sound.add('aliperry20')
    this.song21 = this.sound.add('aliperry21')
    this.song22 = this.sound.add('aliperry22')
    this.song23 = this.sound.add('aliperry23')
    this.song24 = this.sound.add('aliperry24')
    this.song25 = this.sound.add('aliperry25')
    this.song26 = this.sound.add('aliperry26')
    this.song27 = this.sound.add('aliperry27')
    this.song28 = this.sound.add('aliperry28')
    this.song29 = this.sound.add('aliperry29')
    this.song30 = this.sound.add('aliperry30')
    this.song31 = this.sound.add('aliperry31')
    this.song32 = this.sound.add('aliperry32')
    this.song33 = this.sound.add('aliperry33')
    this.song34 = this.sound.add('aliperry34')
    this.song35 = this.sound.add('aliperry35')
    this.song36 = this.sound.add('aliperry36')
    this.song37 = this.sound.add('aliperry37')
    this.song38 = this.sound.add('aliperry38')
    this.song39 = this.sound.add('aliperry39')
    this.song40 = this.sound.add('aliperry40')
    this.song41 = this.sound.add('aliperry41')
    this.song42 = this.sound.add('aliperry42')
    this.song43 = this.sound.add('aliperry43')
    this.song44 = this.sound.add('aliperry44')
    this.song45 = this.sound.add('aliperry45')
    this.song46 = this.sound.add('aliperry46')
    this.song47 = this.sound.add('aliperry47')
    this.song48 = this.sound.add('aliperry48')
    this.song49 = this.sound.add('aliperry49')
    this.song50 = this.sound.add('aliperry50')
    this.song51 = this.sound.add('aliperry51')
    this.song52 = this.sound.add('aliperry52')
    this.song53 = this.sound.add('aliperry53')
    this.song54 = this.sound.add('aliperry54')
    this.song55 = this.sound.add('aliperry55')
    this.song56 = this.sound.add('aliperry56')
    this.song57 = this.sound.add('aliperry57')
    this.song58 = this.sound.add('aliperry58')
    this.song59 = this.sound.add('aliperry59')

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
}

function update ()
{
    if (gameOver)
    {
        document.location.href = '/game';
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
    count++
    var coinConfig = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 1,
        seek: 0,
        loop: false,
        delay: 0
    }
    switch (count) {
        case 1 :
            this.song1.play(coinConfig);
            break;
        case 2 :
            this.song2.play(coinConfig);
            break;
        case 3 :
            this.song3.play(coinConfig);
            break;
        case 4 :
            this.song4.play(coinConfig);
            break;
        case 5 :
            this.song5.play(coinConfig);
            break;
        case 6 :
            this.song6.play(coinConfig);
            break;
        case 7 :
            this.song7.play(coinConfig);
            break;
        case 8 :
            this.song8.play(coinConfig);
            break;
        case 9 :
            this.song9.play(coinConfig);
            break;
        case 10 :
            this.song10.play(coinConfig);
            break;
        case 11 :
            this.song11.play(coinConfig);
            break;
        case 12 :
            this.song12.play(coinConfig);
            break;
        case 13 :
            this.song13.play(coinConfig);
            break;
        case 14 :
            this.song14.play(coinConfig);
            break;
        case 15 :
            this.song15.play(coinConfig);
            break;
        case 16 :
            this.song16.play(coinConfig);
            break;
        case 17 :
            this.song17.play(coinConfig);
            break;
        case 18 :
            this.song18.play(coinConfig);
            break;
        case 19 :
            this.song19.play(coinConfig);
            break;
        case 20 :
            this.song20.play(coinConfig);
            break;
        case 21 :
            this.song21.play(coinConfig);
            break;
        case 22 :
            this.song22.play(coinConfig);
            break;
        case 23 :
            this.song23.play(coinConfig);
            break;
        case 24 :
            this.song24.play(coinConfig);
            break;
        case 25 :
            this.song25.play(coinConfig);
            break;
        case 26 :
            this.song26.play(coinConfig);
            break;
        case 27 :
            this.song27.play(coinConfig);
            break;
        case 28 :
            this.song28.play(coinConfig);
            break;
        case 29 :
            this.song29.play(coinConfig);
            break;
        case 30 :
            this.song30.play(coinConfig);
            break;
        case 31 :
            this.song31.play(coinConfig);
            break;
        case 32 :
            this.song32.play(coinConfig);
            break;
        case 33 :
            this.song33.play(coinConfig);
            break;
        case 34 :
            this.song34.play(coinConfig);
            break;
        case 35 :
            this.song35.play(coinConfig);
            break;
        case 36 :
            this.song36.play(coinConfig);
            break;
        case 37 :
            this.song37.play(coinConfig);
            break;
        case 38 :
            this.song38.play(coinConfig);
            break;
        case 39 :
            this.song39.play(coinConfig);
            break;
        case 40 :
            this.song40.play(coinConfig);
            break;
        case 41 :
            this.song41.play(coinConfig);
            break;
        case 42 :
            this.song42.play(coinConfig);
            break;
        case 43 :
            this.song43.play(coinConfig);
            break;
        case 44 :
            this.song44.play(coinConfig);
            break;
        case 45 :
            this.song45.play(coinConfig);
            break;
        case 46 :
            this.song46.play(coinConfig);
            break;
        case 47 :
            this.song47.play(coinConfig);
            break;
        case 48 :
            this.song48.play(coinConfig);
            break;
        case 49 :
            this.song49.play(coinConfig);
            break;
        case 50 :
            this.song50.play(coinConfig);
            break;
        case 51 :
            this.song51.play(coinConfig);
            break;
        case 52 :
            this.song52.play(coinConfig);
            break;
        case 53 :
            this.song53.play(coinConfig);
            break;
        case 54 :
            this.song54.play(coinConfig);
            break;
        case 55 :
            this.song55.play(coinConfig);
            break;
        case 56 :
            this.song56.play(coinConfig);
            break;
        case 57 :
            this.song57.play(coinConfig);
            break;
        case 58 :
            this.song58.play(coinConfig);
            break;
        case 59 :
            this.song59.play(coinConfig);
            break;
    }



    note.disableBody(true, true);

    //  Add and update the score
    score += 1;
    scoreText.setText('Score: ' + score + '/60');
    if (score === 60) {
        myModal.show();
        console.log(modal)
    }

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

