class LightBulb extends Parallelio.DOM.Tiled
  @extend Parallelio.Obstacle

  constructor: () ->
    super()
    @baseCls = 'lighbulb'
    @actionProvider
    @initDisplay()

  @properties
    game:
      change: (old)->
        if @game 
          @setDefaults()
    enabled:
      default: false
    enabledClass:
      calcul: (invalidator)->
        invalidator.prop(@enabledProperty)
      change: new Parallelio.DOM.DomUpdater callback: ()->
        @display.toggleClass('on', @enabledClass)
        @display.toggleClass('off', !@enabledClass)
    actionProvider:
      calcul: ()->
        return new Parallelio.actions.TiledActionProvider({
          owner: this,
          actions: [
            new LightBulb.actions.Toggle()
          ]
        })

  setDefaults: ->
    if !@tile && @game.mainTileContainer?
      @putOnRandomTile(@game.mainTileContainer.tiles)
      
LightBulb.actions = {}
class LightBulb.actions.Toggle extends Parallelio.actions.TargetAction
    execute: ->
      @target.enabled = !@target.enabled


class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.ShipInterior())
    @lightBulb = @add(new LightBulb())
    @character = @add(new Parallelio.DOM.Character("Character 1"))
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()