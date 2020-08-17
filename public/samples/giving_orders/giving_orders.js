var Character, Game, LightBulb;

LightBulb = (function() {
  class LightBulb extends Parallelio.DOM.Tiled {
    constructor() {
      super();
      this.baseCls = 'lighbulb';
      this.actionProvider;
      this.initDisplay();
    }

    setDefaults() {
      if (!this.tile && (this.game.mainTileContainer != null)) {
        return this.putOnRandomTile(this.game.mainTileContainer.tiles);
      }
    }

  };

  LightBulb.extend(Parallelio.Obstacle);

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
      calcul: function(invalidator) {
        return invalidator.prop(this.enabledProperty);
      },
      change: new Parallelio.DOM.DomUpdater({
        callback: function() {
          this.display.toggleClass('on', this.enabledClass);
          return this.display.toggleClass('off', !this.enabledClass);
        }
      })
    },
    actionProvider: {
      calcul: function() {
        return new Parallelio.actions.TiledActionProvider({
          owner: this,
          actions: [
            new LightBulb.actions.Toggle({
              target: this
            })
          ]
        });
      }
    }
  });

  return LightBulb;

}).call(this);

LightBulb.actions = {};

LightBulb.actions.Toggle = class Toggle extends Parallelio.actions.TargetAction {
  execute() {
    return this.target.enabled = !this.target.enabled;
  }

};

Character = (function() {
  class Character extends Parallelio.DOM.Character {};

  Character.properties({
    actionProvider: {
      calcul: function(invalidator) {
        var provider;
        provider = new Parallelio.actions.ActionProvider({
          owner: this
        });
        provider.actionsMembers.push((prev, invalidator) => {
          var actions;
          actions = invalidator.propPath('owner.tile.actionProvider.actions');
          if (actions != null) {
            console.log(actions);
            return actions.map((a) => {
              return a.withActor(this);
            });
          }
        });
        return provider;
      }
    }
  });

  return Character;

}).call(this);

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.ShipInterior());
    this.lightBulb = this.add(new LightBulb());
    this.character = this.add(new Character("Character 1"));
    return this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
