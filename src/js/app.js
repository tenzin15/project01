class Tile{
  // class attributes and constructor
  constructor() {
    this.color = null;
    this.hasMusicIcon = false;       // if this has the music icon
    this.tapped = false;
    this.id = null;
  }

  // class methods
  changeColor(color) => this.color = color;
  isMusicIcon(bool) =>  this.hasMusicIcon = bool;
  isTapped(bool) => this.tapped = bool;
}


let score = 0;
let missesLeft = 10;

$( document ).ready(function() {
  //var core = new MotionDetector.Core();
  console.log("I am logged.");

  $('.tiles').on('click', function(event) {
    score += 5;
    $('#currentScore').html(`Score: ${score}`);
    console.log(score);
  });

});
