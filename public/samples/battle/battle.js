var Allie, Fow, Game;

Allie = class Allie extends Parallelio.DOM.Character {
  canPlaceOnTile(tile) {
    return ((tile != null ? tile.walkable : void 0) != null) && (tile != null ? tile.walkable : void 0) !== false && tile.x < tile.container.boundaries.left + 10;
  }

  putOnRandomTile(tiles) {
    var found;
    found = this.getRandomValidTile(tiles, this.canPlaceOnTile.bind(this));
    if (found) {
      return this.tile = found;
    }
  }

  init() {
    this.actionProvider.actionsMembers.add(new Parallelio.actions.AttackMoveAction({
      actor: this
    }));
    return super.init();
  }

};

Fow = class Fow extends Parallelio.DOM.Character {
  canPlaceOnTile(tile) {
    return ((tile != null ? tile.walkable : void 0) != null) && (tile != null ? tile.walkable : void 0) !== false && tile.x > tile.container.boundaries.right - 10;
  }

  putOnRandomTile(tiles) {
    var found;
    found = this.getRandomValidTile(tiles, this.canPlaceOnTile.bind(this));
    if (found) {
      return this.tile = found;
    }
  }

  init() {
    super.init();
    return this.baseCls = 'character fow';
  }

};

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.ShipInterior());
    this.allies = ['Crew 1', 'Crew 2', 'Crew 3', 'Crew 4'].map((name) => {
      return this.add(new Allie().tap(function() {
        return this.name = name;
      }));
    });
    this.foes = ['Enemy 1', 'Enemy 1', 'Enemy 1', 'Enemy 1'].map((name) => {
      return this.add(new Fow().tap(function() {
        return this.name = name;
      }));
    });
    return this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
