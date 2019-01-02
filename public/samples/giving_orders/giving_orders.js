var Game, LightBulb, Toggle;

LightBulb = (function() {
  class LightBulb extends Parallelio.DOM.Tiled {
    constructor() {
      super();
      this.tile;
      this.baseCls = 'lighbulb';
      this.forwardedActions;
      this.enabledClass;
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
    },
    enabled: {
      default: false
    },
    enabledClass: {
      updater: Parallelio.DOM.Updater.instance,
      active: function(invalidator) {
        return invalidator.propInitiated('display');
      },
      calcul: function(invalidator) {
        return invalidator.prop('enabled');
      },
      change: function() {
        this.display.toggleClass('on', this.enabledClass);
        return this.display.toggleClass('off', !this.enabledClass);
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
    this.character = this.add(new Parallelio.DOM.Character("Character 1"));
    return this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
