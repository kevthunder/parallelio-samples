
class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @map = (new Parallelio.DOM.StarMapGenerator()).generate()
    @add(@map)
    @ship = new Parallelio.DOM.Ship()
    @ship.location = @map.locations.get(1)
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())
    @currentPlayer.globalActionProviders.add(@ship)
    

$ =>
  this.game = new Game()
  this.game.start()