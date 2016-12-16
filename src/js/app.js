class Tile{
  // class attributes and constructor
  constructor(id, color) {
    this.id = id;
    this.color = color;
    this.musicIcon = false;       // if this has the music icon
    this.tapped = false;
  }
  // class methods
  hasMusicIcon(bool) { this.musicIcon = bool; }
  isTapped(bool) { this.tapped = bool; }
}

let returnTileObject = (id) => {
      switch(id) {
       case("0"):
        return tile0;
       case("1"):
        return tile1;
       case("2"):
        return tile2;
       case("3"):
        return tile3;
       case("4"):
        return tile4;
       case("5"):
        return tile5;
       case("6"):
        return tile6;
       case("7"):
        return tile7;
       case("8"):
        return tile8;
       case("9"):
        return tile9;
       case("10"):
        return tile10;
       case("11"):
        return tile11;
       case("12"):
        return tile12;
       case("13"):
        return tile13;
      }
}




$( document ).ready(function() {
  //var core = new MotionDetector.Core();
  console.log("I am logged.");

  // $('.tiles').on('click', function(event, index) {
  //   console.log(index);
  //     if (returnTileObject(String(index)).musicIcon) {
  //       score += 5;
  //       hits++;
  //       $('#innerHits').html(`Hits: ${hits}`);
  //       $('#currentScore').html(`Score: ${score}`);
  //     }
  // });

  let score = 0;
  let missesLeft = 10;
  let hits = 0;
  let tile0 = new Tile($('.tiles').eq(0).attr('id'), 'white');
  let tile1 = new Tile($('.tiles').eq(1).attr('id'), 'black');
  let tile2 = new Tile($('.tiles').eq(2).attr('id'), 'white');
  let tile3 = new Tile($('.tiles').eq(3).attr('id'), 'black');
  let tile4 = new Tile($('.tiles').eq(4).attr('id'), 'white');
  let tile5 = new Tile($('.tiles').eq(5).attr('id'), 'black');
  let tile6 = new Tile($('.tiles').eq(6).attr('id'), 'white');
  let tile7 = new Tile($('.tiles').eq(7).attr('id'), 'black');
  let tile8 = new Tile($('.tiles').eq(8).attr('id'), 'white');
  let tile9 = new Tile($('.tiles').eq(9).attr('id'), 'black');
  let tile10 = new Tile($('.tiles').eq(10).attr('id'), 'white');
  let tile11 = new Tile($('.tiles').eq(11).attr('id'), 'black');
  let tile12 = new Tile($('.tiles').eq(12).attr('id'), 'white');
  let tile13 = new Tile($('.tiles').eq(13).attr('id'), 'black');
  let tile14 = new Tile($('.tiles').eq(14).attr('id'), 'white');

  let deleteMusicIcon = () => {
    $('.tiles').eq(2).css('background-image', '');
    $('.tiles').eq(10).css('background-image', '');
    console.log("3 secs");
  }

  let addMusicIcon = () => {
    $('.tiles').eq(2).css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');
    tile2.hasMusicIcon(true);
    $('.tiles').eq(10).css('background-image', 'url(https://www.tattooforaweek.com/images/music_note_tattoo.jpg)');
    tile10.hasMusicIcon(true);
    console.log("6 secs");
  }

  let timeCounter = (n) => n+1;

  window.setTimeout(addMusicIcon, 2000);
  window.setTimeout(deleteMusicIcon, 4000);

  $('#tile2, #tile10').on('click', function(event) {
      score += 5;
      hits++;
      $('#innerHits').html(`Hits: ${hits}`);
      $('#currentScore').html(`Score: ${score}`);
  });
});
