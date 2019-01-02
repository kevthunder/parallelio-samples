class LightBulb extends Parallelio.DOM.Tiled
  @extend Parallelio.Obstacle
  @extend Parallelio.SimpleActionProvider
  @extend Parallelio.TiledActionProvider

  constructor: () ->
    super()
    @tile
    @baseCls = 'lighbulb'
    @forwardedActions
    @enabledClass
    @initDisplay()

  @properties
    game:
      change: (old)->
        if @game 
          @setDefaults()
    enabled:
      default: false
    enabledClass:
      updater: Parallelio.DOM.Updater.instance
      active: (invalidator)->
        invalidator.propInitiated('display')
      calcul: (invalidator)->
        invalidator.prop('enabled')
      change: ->
        @display.toggleClass('on', @enabledClass)
        @display.toggleClass('off', !@enabledClass)



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
    @character = @add(new Parallelio.DOM.Character("Character 1"))
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()