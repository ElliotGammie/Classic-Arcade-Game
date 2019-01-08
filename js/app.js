

// Creating the player, we use the Es6 class creation for functions to set this up
class Character {
  constructor() {
    // positon player at the starting positio
    this.xAxis = 202;
    this.yAxis = 400;
    // draw the image on screen
    this.character = 'images/char-horn-girl.png';
    this.barrier = 0;
  }

  // constructing player at the current x axis and y axis on the game board
  // The creation of the player gets the image from our sting (url)  and uses the x and y coordinates we assinged in the player class
  render() {
    ctx.drawImage(Resources.get(this.character), this.xAxis, this.yAxis);
    }
    // this update call to the update function within the engine will allow the player icon to check if the player ends up past the bricks on the keyboard
    // if they do then they are moved back to the starting point.
  update(){
  }

// This handles the keyboard commands with if statements
  handleInput (input) {
    // checks the right keyboard arrow input and moves the player while checking if they will collide with the edge of the board
    // all keyboard commands are linked to certain numbers which Udacity set up in a handleinput section at the bottom for use
    if (input =='right' && this.xAxis < 400 ) {
    this.xAxis += 101;
    };
    // checks the left keyboard arrow input and moves the player while checking if they will collide with the edge of the board
    if (input == 'left' && this.xAxis > 0) {
    this.xAxis -= 101;
    };
    // checks the down keyboard arrow input and moves the player while checking if they will collide with the edge of the board
    if (input == 'down' && this.yAxis < 400) {
    this.yAxis +=83;
    };
    // checks the up keyboard arrow input and moves the player while checking if they will collide with the edge of the board
    if (input == 'up' && this.yAxis > 0) {
    this.yAxis -=83;
    };
    // added a setTimeout function to allow for the player to sit in the water for a duration then get moved to the starting position (indicating a win!)
    // I've also referenced again the barrier which can be used for checking if the player moves past this and will be
    // moved back after a short delay to the starting position
    if (this.yAxis < this.barrier ) setTimeout (function () {
      console.log('win');
      player.xAxis = 202;
      player.yAxis = 400;
    }, 600);
  }
}


// intitalisation of the player, creates a new object that has the same arguments and values of the Character class
const player = new Character ();

// Enemies our player must avoid, I moved this to ES6 as it was easier to use and view for me
class Enemy {
  constructor(xAxis, yAxis, movement){
    // these this statements are setup to allows for the x and y axis to be used in the constructor function,
    // they also give us a value of this which can be referred to for later use
    this.xAxis = xAxis;
    this.yAxis = yAxis
    this.movement = movement;
    this.barrier = 500;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
  }
  // Draw the enemy on the screen, required method for game
  render () {
      ctx.drawImage(Resources.get(this.sprite), this.xAxis, this.yAxis);
  };
};

// intitalisation of the insects, they all all vaired movement speeds, they have three inputs xAxis, yAxis, and the movement
const cockroach1 = new Enemy(-101, 60, 200);
const cockroach2 = new Enemy(-101,143, 300);
const cockroach3 = new Enemy(-60, 226, 360);

// move all the roaches into an array so they can be used under the Enemy Class
const allEnemies = [];
allEnemies.push(cockroach1, cockroach2, cockroach3,);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

  // If the bug is not passed the tile then move forward,
  // and then increment x by the speed at which it is going and multiple by deltaTime
  if (this.xAxis < this.barrier) {
  this.xAxis += this.movement * dt;
  }
  // this checks if the roach hits the barrier and if so it is moved back to its orginal starting postion and startings its cross of the board
  if (this.xAxis > this.barrier)  {
  this.xAxis = -20;
  }

  // This if statement is to all the roaches and player to have a small bubble around them so if they get close enough on the x and y axis then the player will be moved to the starting positon
  if (this.xAxis < player.xAxis + 70 &&
        this.xAxis + 70 > player.xAxis &&
        this.yAxis < player.yAxis + 55 &&
        55 + this.yAxis > player.yAxis) {
        player.xAxis = 202;
        player.yAxis = 400;
    };
    // otherwise reset the position to the starting position
  };


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
