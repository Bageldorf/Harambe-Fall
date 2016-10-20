/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('platform', 'assets/sausage.png');
    game.load.image('star', 'assets/Harambe.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('ster', 'assets/Harambe2.png');
    game.load.audio('bar', 'assets/GayBar.mp3');

}

var keyboard;
var bar;
var credits;
var player;
var platforms;
var cursors;
var sters;
var stars;
var score = 0;
var scoreText;
var music;
var key1;
var key2;
var key3;

function create() {
    
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    key2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    key3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    
    
    music = game.add.audio('bar');

    music.play();

    // A background for the game
    game.add.sprite(0, 0, 'sky');

    // Making the platforms
    // Enable the physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // The group for the different platforms
    platforms = game.add.group();

    // Enable physics for any object that is created
    platforms.enableBody = true;

    // Now for the ground
    var ground = platforms.create(0, 550, 'platform');

    // Make it fit the level
    ground.scale.setTo(2, 2);

    // Makes it so it doesn't fall if you step on it
    ground.body.immovable = true;

    // Lets make the floating platforms
    var ledge = platforms.create(400, 400, 'platform');

    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'platform');

    ledge.body.immovable = true;


    // The player and their settings
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    // Add physics to the player
    game.physics.arcade.enable(player);

    //  Physics Properties
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 100;
    player.body.collideWorldBounds = true;

    // The walking animations
    player.animations.add('right', [0, 1, 2, 3], 10, true);
    player.animations.add('left', [5, 6, 7, 8], 10, true);


    // Group for the stars
    stars = game.add.group();
    sters = game.add.group();

    // Enable physics for all stars in the group
    stars.enableBody = true;
    sters.enableBody = true;

    // Making 12 evenly spaced out
    for (var i = 0; i < 12; i++) {

        // Create a star in the group
        var star = stars.create(i * 70, 0, 'star');

        // LET THERE BE GRAVITY!
        star.body.gravity.y = 70;

        // LET THERE BE BOUNCE
        star.body.bounce.y = 0.9 + Math.random() * 0.2;
    }

    for (var i = 0; i < 6; i++) {

        // Create a star in the group
        var ster = sters.create(i * 200, 0, 'ster');

        // LET THERE BE GRAVITY!
        ster.body.gravity.y = 1000;

        // LET THERE BE BOUNCE
        ster.body.bounce.y = 5.0 + Math.random() * 0.2;
    }

    scoreText = game.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#000'
    });
    credits = game.add.text(200, 550, 'By Yanis and Mark', {
        fontSize: '8px',
        fill: '#ffffff'
    });

    //  Our controls.
    

bar.loopFull(true); 


}

function update() {

    if(Phaser.Keyboard.THREE)


    // Collision Physics
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(sters, platforms);

    // Collision for stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    game.physics.arcade.overlap(player, sters, collectSter, null, this);

    // Moving and Keys
    cursors = game.input.keyboard.createCursorKeys();

    // Reset the player velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {

        // Move to the left
        player.body.velocity.x = -500;

        player.animations.play('left');

    }

    else if (cursors.right.isDown) {

        // Move to the right
        player.body.velocity.x = 500;

        player.animations.play('right');

    }
    else {

        // If standing still
        player.animations.stop();

        player.frame = 4;

    }
    // Lets the player jump if they are on the ground
    if (cursors.up.isDown && player.body.touching.down) {

        player.body.velocity.y = -400;
    }

function collectStar(player, star) {
    var i = 0;
    // Removes the star from the screen
    star.kill();

    // Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score;
    for (i = 0; i < 1.5; i++) {

        // Create a star in the group
        star = stars.create(Math.random() * 800, 50, 'star');

        // LET THERE BE GRAVITY!
        star.body.gravity.y = 70;

        // LET THERE BE BOUNCE
        star.body.bounce.y = 0.9 + Math.random() * 0.2;
    }

}

function collectSter(player, ster) {
    // Removes the star from the screen
    ster.kill();

    // Add and update the score
    score += 50;
    for (var i = 0; i < 1.5; i++) {

        // Create a star in the group
        ster = sters.create(Math.random() * 800, 0, 'ster');

        // LET THERE BE GRAVITY!
        ster.body.gravity.y = 1000;

        // LET THERE BE BOUNCE
        ster.body.bounce.y = 10 + Math.random() * 0.2;
    }

}

if (score === 100000) {
    
    
    
}
    
}
   
 