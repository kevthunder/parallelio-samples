var Game, LightBulb, Toggle;

LightBulb = (function() {
  class LightBulb extends Parallelio.DOM.Tiled {
    constructor() {
      super();
      this.baseCls = 'lighbulb';
      this.forwardedActions;
      this.initDisplay();
    }

    setDefaults() {
      if (!this.tile && (this.game.mainTileContainer != null)) {
        return this.putOnRandomTile(this.game.mainTileContainer.tiles);
      }
    }

  };

  LightBulb.extend(Parallelio.Obstacle);

  LightBulb.extend(Parallelio.SimpleActionProvider);

  LightBulb.extend(Parallelio.TiledActionProvider);

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

LightBulb.actions = {
  Toggle: Toggle = class Toggle extends Parallelio.TargetAction {
    execute() {
      return this.target.enabled = !this.target.enabled;
    }

  }
};

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.Ship());
    this.lightBulb = this.add(new LightBulb());
    return this.character = this.add(new Parallelio.DOM.Character());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
