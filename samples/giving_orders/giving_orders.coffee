class LightBulb extends Parallelio.DOM.Tiled
  constructor: () ->
    super()
    @baseCls = 'lighbulb'
    @initDisplay()

  @properties
    game:
      change: (old)->
        if @game 
          @setDefaults()
          
  setDefaults: ->
    if !@tile && @game.mainTileContainer?
      @putOnRandomTile(@game.mainTileContainer.tiles)

class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.Ship())
    @character = @add(new Parallelio.DOM.Character())
    @lightBulb = @add(new LightBulb())

$ =>
  this.game = new Game()
  this.game.start()