class Tile {
  // class attributes and constructor
  constructor(id) {
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
