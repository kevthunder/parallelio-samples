$ =>
  this.game = new Parallelio.DOM.Game()
  this.ship = this.game.add(new Parallelio.DOM.ShipInterior())
  this.character = this.game.add(new Parallelio.DOM.Character())
  this.game.start()