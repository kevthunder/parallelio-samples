class LightBulb extends Parallelio.DOM.Tiled
  @extend Parallelio.Obstacle
  @extend Parallelio.SimpleActionProvider
  @extend Parallelio.TiledActionProvider

  constructor: () ->
    super()
    @baseCls = 'lighbulb'
    @forwardedActions
    @initDisplay()

  @properties
    game:
      change: (old)->
        if @game 
          @setDefaults()

  setDefaults: ->
    if !@tile && @game.mainTileContainer?
      @putOnRandomTile(@game.mainTileContainer.tiles)

LightBulb.actions = 
  Toggle : class Toggle extends Parallelio.TargetAction
    execute: ->
      @target.enabled = !@target.enabled


class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.Ship())
    @lightBulb = @add(new LightBulb())
    @character = @add(new Parallelio.DOM.Character())

$ =>
  this.game = new Game()
  this.game.start()