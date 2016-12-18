class Tile{
  // class attributes and constructor
  constructor(id, color) {
    this.id = id;
    this.color = 'white';
    this.musicIcon = false;
    this.tapped = false;
  }
  // set methods
  setMusicIcon(bool) { this.musicIcon = bool; }
  setTapped(bool) { this.tapped = bool; }
  setColor (color) { this.color = color; }

  // get methods
  hasMusicIcon() { return this.musicIcon; }
}

$(document).ready(function() {
  // var core = new MotionDetector.Core();

  // create 7 piano tiles object
  let tilesArray = new Array(7);
  for (let i = 0; i < tilesArray.length; i++) {
    i % 2 === 0? tilesArray[i] = new Tile('tile'+String(i)): tilesArray[i] = new Tile('tile'+String(i));
  }

  let randomTiles = () => {
    // randomly choose 3 tiles
    let randomIndex = new Set();
    while (randomIndex.size < 3) {
        let temp = Math.floor(Math.random()*100)%6;
        if (!randomIndex.has(temp))
          randomIndex.add(temp);
    }
    // set color to white, assign music icon for randomly selected once
    $('.outer').each((index, el) => {
      if (randomIndex.has(index)) {
        $('.outer').eq(index).css({
            'background-color': 'white',
            'background-image': 'url(\'src/img/music_icon.png\')',
            'background-size': '50px 50px',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
          });
        // set properties of Tile objects
        tilesArray[index].setMusicIcon(true);
      }
      else {
        $('.outer').eq(index).css('background-image', '');
        if(index % 2 === 0) {
          $('.outer').eq(index).css('background-color', 'white');
        }
        // set properties of Tile objects
        tilesArray[index].setMusicIcon(false);
      }
    });
  }

  let animateTiles = () => {
    $('.tiles').css('animation', 'tilesAnimation 14s linear infinite');
  }

  let removeAnimation = () => {
    $('.tiles').css('animation', '');
  }

  // call randomTiles every 14s (animation time) to random music tiles
  // the game will last for 140s max
  let millisecs = 0;
  while (millisecs <= 140000) {
    window.setTimeout(randomTiles, millisecs);
    window.setTimeout(animateTiles, millisecs);
    window.setTimeout(removeAnimation, millisecs+14000);
    millisecs += 14000;
  }

  let score = 0, missesLeft = 10, hits = 0;
  $('.outer').click(function(e,i) {
    if (tilesArray[e.target.id.charAt(4)].hasMusicIcon()) {
      score += 5;
      hits++;
      $('#hits').html(`Hits: ${hits}`);
      $('#score').html(`Score: ${score}`);
    }
  });

});
