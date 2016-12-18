class Tile{
  // class attributes and constructor
  constructor(id, color) {
    this.id = id;
    this.color = 'black';
    this.musicIcon = false;
    this.tapped = false;
  }
  // class methods
  hasMusicIcon(bool) { this.musicIcon = bool; }
  isTapped(bool) { this.tapped = bool; }
}

$(document).ready(function() {
  //var core = new MotionDetector.Core();

  // create 7 piano tiles object
  let tilesArray = new Array(7);
  for (let i = 0; i < tilesArray.length; i++) {
    i % 2 === 0? tilesArray[i] = new Tile('tile'+String(i)): tilesArray[i] = new Tile('tile'+String(i));
  }

  let randomTiles = () => {
    // randomly choose 3 tiles
    let randomIndex = new Set();
    while (randomIndex.size < 3) {
        let temp = Math.floor(Math.random()*100)%7;
        if (!randomIndex.has(temp))
          randomIndex.add(temp);
    }
    // set color to white, assign music icon for randomly selected once
    // rest of tiles assign black color
    $('.tiles').each((index, el) => {
      if (randomIndex.has(index)) {
        $('.tiles').eq(index).css({
            'background-color': 'white',
            'background-image': 'url(\'src/img/music_icon.png\')',
            'background-size': '50px 50px',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
          });
        // set properties of Tile objects
        tilesArray[index].color = 'white';
        tilesArray[index].hasMusicIcon(true);
      }
      else {
        $('.tiles').eq(index).css('background-color', 'black');
      }
    });
  }

  let animateTiles = () => {
    $('.tiles').css('animation', 'tilesAnimation 15s linear infinite');
  }

  let removeAnimation = () => {
    $('.tiles').css('animation', '');
  }

  // call randomTiles every 15s (animation time) to random music tiles
  let millisecs = 0;
  while (millisecs <= 150000) {
    window.setTimeout(randomTiles, millisecs);
    window.setTimeout(animateTiles, millisecs);
    window.setTimeout(removeAnimation, millisecs+15000);
    millisecs += 15000;
  }


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
