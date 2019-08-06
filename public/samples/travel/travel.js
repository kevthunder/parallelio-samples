var Game;

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.map = (new Parallelio.DOM.StarMapGenerator()).generate();
    this.add(this.map);
    this.ship = new Parallelio.DOM.Ship();
    this.ship.location = this.map.locations.get(1);
    this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
    return this.currentPlayer.globalActionProviders.add(this.ship);
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
