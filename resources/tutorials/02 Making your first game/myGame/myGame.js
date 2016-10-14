/*global Phaser*/
/*global myimag*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('platform', 'assets/sausage.png');
    game.load.image('star', 'assets/Harambe.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);

}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {
    
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
   player.animations.add('left', [0, 1, 2, 3], 10, true);
   player.animations.add('right', [5, 6, 7, 8], 10, true);
   

    // Group for the stars
    stars = game.add.group();

    // Enable physics for all stars in the group
    stars.enableBody = true;
    
    // Making 12 evenly spaced out
    for (var i = 0; i < 12; i++)
    {
     
        // Create a star in the group
        var star = stars.create(i * 70, 0, 'star');
    
        // LET THERE BE GRAVITY!
        star.body.gravity.y = 70;
    
        // LET THERE BE BOUNCE
        star.body.bounce.y = 0.9 + Math.random() * 0.2;
    }
    
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000'});
    
     //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
    
    }
    
function update() {

    // Collision Physics
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    
    // Collision for stars
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    // Moving and Keys
    cursors = game.input.keyboard.createCursorKeys();

    // Reset the player velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {

     // Move to the left
     player.body.velocity.x = -1000;

     player.animations.play('left');

    }

else if (cursors.right.isDown)
{

    // Move to the right
    player.body.velocity.x = 1000;

    player.animations.play('right');

}
else
{

    // If standing still
    player.animations.stop();
    
    player.frame = 4;
  
}
    // Lets the player jump if they are on the ground
    if (cursors.up.isDown && player.body.touching.down)
{
   
    player.body.velocity.y = -400;
    }



}

function collectStar (player, star) {
    var i = 0;
    // Removes the star from the screen
    star.kill();

    // Add and update the score
    score += 1;
    scoreText.te
    xt = 'Score: ' + score;
      for (i = 0; i < 2; i++)
    {
     
        // Create a star in the group
        var star = stars.create(Math.random(10)*2, 50, 'star');
    
        // LET THERE BE GRAVITY!
        star.body.gravity.y = 70;
    
        // LET THERE BE BOUNCE
        star.body.bounce.y = 0.9 + Math.random() * 0.2;
    }

}