var ControlPanel, Game;

ControlPanel = (function() {
  class ControlPanel extends Parallelio.DOM.Tiled {
    init() {
      this.baseCls = 'controlPanel';
      return this.actionProvider;
    }

    setDefaults() {
      if (!this.tile && (this.game.mainTileContainer != null)) {
        return this.putOnRandomTile(this.game.mainTileContainer.tiles);
      }
    }

  };

  ControlPanel.extend(Parallelio.Obstacle);

  ControlPanel.properties({
    game: {
      change: function(old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    },
    actionProvider: {
      calcul: function() {
        return new Parallelio.actions.TiledActionProvider({
          owner: this,
          actions: [new ControlPanel.actions.Save()]
        });
      }
    }
  });

  return ControlPanel;

}).call(this);

ControlPanel.actions = {};

ControlPanel.actions.Save = class Save extends Parallelio.actions.TargetAction {
  execute() {
    return this.target.game.save();
  }

};

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.ShipInterior());
    this.controlPanel = this.add(new ControlPanel());
    this.character = this.add(new Parallelio.DOM.Character("Character 1"));
    return this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
