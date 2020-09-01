var Allie, Character, Fow, Game, Player;

Character = (function() {
  class Character extends Parallelio.DOM.Character {
    putOnRandomTile(tiles) {
      var found;
      found = this.getRandomValidTile(tiles, this.canPlaceOnTile.bind(this));
      if (found) {
        return this.tile = found;
      }
    }

  };

  Character.properties({
    owner: {},
    name: {},
    weapons: {
      calcul: function() {
        return [
          new Parallelio.PersonalWeapon({
            user: this,
            power: 100
          })
        ];
      }
    }
  });

  return Character;

}).call(this);

Allie = class Allie extends Character {
  canPlaceOnTile(tile) {
    return ((tile != null ? tile.walkable : void 0) != null) && (tile != null ? tile.walkable : void 0) !== false && tile.x < tile.container.boundaries.left + 10;
  }

  init() {
    this.actionProvider.actionsMembers.add(new Parallelio.actions.AttackMoveAction({
      actor: this
    }));
    return super.init();
  }

};

Fow = class Fow extends Character {
  canPlaceOnTile(tile) {
    return ((tile != null ? tile.walkable : void 0) != null) && (tile != null ? tile.walkable : void 0) !== false && tile.x > tile.container.boundaries.right - 10;
  }

  init() {
    super.init();
    return this.baseCls = 'character fow';
  }

};

Player = class Player extends Parallelio.Player {
  isEnemy(target) {
    return (target.owner != null) && target.owner !== this;
  }

};

Game = class Game extends Parallelio.DOM.Game {
  start() {
    super.start();
    this.ship = this.add(new Parallelio.DOM.ShipInterior());
    this.player1 = this.add(new Player());
    this.player2 = this.add(new Player());
    this.allies = ['Crew 1', 'Crew 2', 'Crew 3', 'Crew 4'].map((name) => {
      return this.add(new Allie({
        name: name,
        owner: this.player1
      }));
    });
    this.foes = ['Enemy 1', 'Enemy 1', 'Enemy 1', 'Enemy 1'].map((name) => {
      return this.add(new Fow({
        name: name,
        owner: this.player2
      }));
    });
    return this.selectionInfo = this.add(new Parallelio.DOM.PlayerSelectionInfo());
  }

};

$(() => {
  this.game = new Game();
  return this.game.start();
});
