var Game, LightBulb;

LightBulb = (function() {
  class LightBulb extends Parallelio.DOM.Tiled {
    constructor() {
      super();
      this.baseCls = 'lighbulb';
      this.initDisplay();
    }

    setDefaults() {
      if (!this.tile && (this.game.mainTileContainer != null)) {
        return this.putOnRandomTile(this.game.mainTileContainer.tiles);
      }
    }

  };

  LightBulb.properties({
    game: {
      change: function(old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return LightBulb;

}).call(this);

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.Ship());
    this.character = this.add(new Parallelio.DOM.Character());
    return this.lightBulb = this.add(new LightBulb());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
