class Tile{
  // class attributes and constructor
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.musicIcon = false;
    this.tapped = false;
  }
  // class methods
  hasMusicIcon(bool) { this.musicIcon = bool; }
  isTapped(bool) { this.tapped = bool; }
}

$(document).ready(function() {
  //var core = new MotionDetector.Core();

  // the piano tiles on the top screen
  let tiles = new Array(15);
  for (let i = 0; i < tiles.length; i++) {
    i % 2 === 0? tiles[i] = new Tile('tile'+String(i), 'white'): tiles[i] = new Tile('tile'+String(i), 'black');
  }

  // let turnTilesToBlack = () => {
  //   let i = 0;
  //   while (i < 7) {
  //     $('.tiles').eq(i).css('background-color', 'black');
  //     i += 2;
  //   }
  // }

  // let turnTilesToWhite = () => {
  //   let i = 1;
  //   while (i < 8) {
  //     $('.tiles').eq(i).css('background-color', 'white');
  //     i += 2;
  //   }
  // }

  // let count = 0, millisecs = 1000;
  // while (count < 10) {
  //   window.setTimeout(turnTilesToBlack, millisecs);
  //   window.setTimeout(turnTilesToWhite, millisecs);
  //   millisecs += 2000;
  //   count++;
  // }

  // $('#tile0').css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');
  // $('#tile4').css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');


  // let addMusicIcon = () => {
  //   $('.tiles').eq(2).css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');
  //   tile2.hasMusicIcon(true);
  //   $('.tiles').eq(10).css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');
  //   tile10.hasMusicIcon(true);
  //   console.log("add musicIcon");
  // }

  // let deleteMusicIcon = () => {
  //   $('.tiles').eq(2).css('background-image', '');
  //   $('.tiles').eq(10).css('background-image', '');
  //   console.log("delete musicIcon");
  // }

  // let count = 0, millisecs = 1000;
  // while (count < 10) {
  //   window.setTimeout(addMusicIcon, millisecs);
  //   window.setTimeout(deleteMusicIcon, millisecs+2000);
  //   millisecs += 4000;
  //   count++;
  // }

  // let score = 0, missesLeft = 10, hits = 0;
  // $('.tiles').click(function(e,i) {
  //   if (this.style.backgroundImage !== '') {
  //     score += 5;
  //     hits++;
  //     $('#innerHits').html(`Hits: ${hits}`);
  //     $('#currentScore').html(`Score: ${score}`);
  //   }
  // });
});
