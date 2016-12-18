class Tile{
  // class attributes and constructor
  constructor(id, color) {
    this.id = id;
    this.color = 'white';
    this.key = null;
    this.musicIcon = false;
    this.tapped = false;
  }
  // set methods
  setMusicIcon(bool) { this.musicIcon = bool; }
  setTapped(bool) { this.tapped = bool; }
  setColor (color) { this.color = color; }
  setKey(key) {this.key = key}

  // get methods
  hasMusicIcon() { return this.musicIcon; }
  keyValue() { return this.key; }
}

$(document).ready(function() {
  // var core = new MotionDetector.Core();

  // create 7 piano tiles object
  let tilesArray = new Array(7);
  for (let i = 0; i < tilesArray.length; i++) {
    i % 2 === 0? tilesArray[i] = new Tile('tile'+String(i)): tilesArray[i] = new Tile('tile'+String(i));
  }

  let randomTiles = () => {
    // A,S,E,D,F,G key code
    const keyCode = [65, 83, 69, 68, 70, 71];
    // randomly choose 3 tiles
    let randomIndex = new Set();
    while (randomIndex.size < 3) {
        let temp = Math.floor(Math.random()*100)%6;
        if (!randomIndex.has(temp))
          randomIndex.add(temp);
    }
    // store unique keys
    let diffKeys = new Set();
    // set color to white, assign music icon for randomly selected once
    $('.outer').each((index, el) => {
      if (randomIndex.has(index)) {
        // store url of random key/image
        let imageUrl = ''
        // set properties of Tile objects
        tilesArray[index].setMusicIcon(true);
        // store unique keys/images
        while (true) {
          const randChar = String.fromCharCode(keyCode[Math.floor(Math.random()*100)%6]);
          if (!diffKeys.has(randChar)) {
            diffKeys.add(randChar);
            tilesArray[index].setKey(randChar);
            imageUrl = `src/img/music_icon_${randChar}.png`;
            break;
          }
        }
        // set the css to be rendered on html
        $('.outer').eq(index).css({
            'background-color': 'white',
            'background-image': 'url('+imageUrl+')',
            'background-size': '50px 50px',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
          });
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
    $('.tiles').css('animation', 'tilesAnimation 10s linear infinite');
  }

  let removeAnimation = () => {
    $('.tiles').css('animation', '');
    // decrement misses left if a key is missed
    // within the time frame
    if (pressedKeys.size < 3) {
      missesLeft -= 3 - pressedKeys.size;
      $('#missesLeft').html(`Misses Left: ${missesLeft}`);
    }
    // reset the pressedKeys Set for the next frame
    pressedKeys = new Set();
    // reset the colors of tiles to white for next frame
    tilesArray.forEach((e,i) => {
      $(`#${e.id}`).css('background-color', 'white');
    });
  }

  let score = 0, missesLeft = 10, hits = 0;
  let pressedKeys = new Set();
  $(document).keypress(function(event) {
      tilesArray.forEach((e,i) => {
      if (e.key && (e.key === String.fromCharCode(event.which) || e.key.toLowerCase() === String.fromCharCode(event.which))) {
        if (e.hasMusicIcon()) {
          $(`#${e.id}`).css('background-color', '#00ff00');
        }
        if (!pressedKeys.has(e.key)) {
          pressedKeys.add(e.key);
          hits++;
          score += 5;
          $('#hits').html(`Hits: ${hits}`);
          $('#score').html(`Score: ${score}`);
          }
        }
      });
      // Game win if socre hits 100
      if (score > 99) {
        alert('You Win! Level 1 Completed.');
        document.querySelector('audio').pause();
        removeAnimation();
      }
  });

  let startGame = () => {
    // call randomTiles every 4s (animation time) to random music tiles
    // the game will last for 400s max
    let millisecs = 0;
    while (millisecs <= 100000) {
        window.setTimeout(randomTiles, millisecs);
        window.setTimeout(animateTiles, millisecs);
        window.setTimeout(removeAnimation, millisecs+10000);
        millisecs += 10000;
    }
  }

  $(document).keypress(function(event) {
    // start game when 'enter' key is pressed
    if (event.which === 13) {
      startGame();
    }
  });

  randomTiles();
});
