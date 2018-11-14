$(() => {
  this.game = new Parallelio.DOM.Game();
  return this.ship = this.game.add(new Parallelio.DOM.Ship());
});
