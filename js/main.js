  // stores all the window.setTimeout() for animation purposes
  // is also used for removing all the animations once the game is over
  let setTimers = [];

  // scoreboard
  let score = 0, missesLeft = 5, hits = 0;

  // create 7 piano tiles object
  let tilesArray = new Array(7);
  for (let i = 0; i < tilesArray.length; i++) {
    tilesArray[i] = new Tile('tile'+String(i));
  }

  // create 4 random tiles with music
  let randomTiles = () => {

      // before creating tiles, check if player lose or not
      // Game lose if misses 5 keys
      if (missesLeft <= 1) {
        swal("Sorry! You Lose!")
        $('#level').html('Oops! Level 1 Not Completed.')
        document.querySelector('audio').pause();
        removeAnimation();
        // reset all window.setTimeout() for animation
        // once game is over
        for (var i = 0; i < setTimers.length; i++) {
          clearTimeout(setTimers[i]);
        }
      }

      // A,S,E,D,F,G,U,O,N,B,P,H,X key code
      const keyCode = [65, 83, 69, 68, 70, 71, 85, 79, 78, 66, 80, 72, 88];
      let randomIndex = new Set();

      // store unique keys
      let diffKeys = new Set();
      // set color to white, assign randomly selected music keys

      $('.outer').each((index, el) => {
        if (index % 2 !== 0) {
          // store url of random key/image
          let imageUrl = '';
          // set properties of Tile objects
          tilesArray[index].setMusicIcon(true);
          // store unique keys/images
          // every odd index gets a tile with random key
          while (true) {
            const randChar = String.fromCharCode(keyCode[Math.floor(Math.random()*100)%13]);
            if (!diffKeys.has(randChar)) {
              diffKeys.add(randChar);
              tilesArray[index].setKey(randChar);
              imageUrl = `img/music_icon_${randChar}.png`;
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

  // animate the entire tile, keyframes defined in main.css
  let animateTiles = () => {
      $('.tiles').css('animation', 'tilesAnimation 5s linear infinite');
      tilesArray.forEach((el, index) => {
        if (el.key) {
          $(`#${el.id}`)[0].offsetWidth;
          $(`#${el.id}`)[0].offsetLeft;
        }
      });
  }

  // store pressed keys while game in play
  let pressedKeys = new Set();

  // remove the animation after each animation
  // this will help restart next animation
  let removeAnimation = () => {
      $('.tiles').css('animation', '');
      // decrement misses left if a key is missed
      // within the time frame
      if (missesLeft > 0) {
        if (pressedKeys.size < 3) {
          missesLeft -= 3 - pressedKeys.size;
          $('#missesLeft').html(`Misses Left: ${missesLeft}`);
        }
      }
      else {
          $('#missesLeft').html(`Misses Left: 0`);
      }
      // reset the pressedKeys Set for the next frame
      pressedKeys = new Set();
      // reset the colors of tiles to white for next frame
      tilesArray.forEach((e,i) => {
        $(`#${e.id}`).css('background-color', 'white');
      });
  }

  // one game unit using the above three functions with setTimout
  let startGame = () => {
    // start the music
    document.querySelector('audio').play();
    // call randomTiles every 4s (animation time) to random music tiles
    // the game will last for 400s max
    let millisecs = 0;
    while (millisecs <= 50000) {
        setTimers.push(window.setTimeout(randomTiles, millisecs));
        setTimers.push(window.setTimeout(animateTiles, millisecs));
        setTimers.push(window.setTimeout(removeAnimation, millisecs+5000));
        millisecs += 5000;
    }
  }

  // start the game
  $(document).keypress(function(event) {
      // start game when 'Enter' is pressed
      if (event.which === 13) {
        startGame();
      }

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

      // Game win of hits is 20
      if (hits === 20) {
        swal("Congratulations! You Win!!!")
        $('#level').html('Level 1 Completed!')
        document.querySelector('audio').pause();
        removeAnimation();
        // reset all window.setTimeout() for animation
        // once game is over
        for (var i = 0; i < setTimers.length; i++) {
          clearTimeout(setTimers[i]);
        }
      }
  });

  // initialize the game
  randomTiles();
  document.querySelector('audio').pause();
