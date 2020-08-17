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
            new LightBulb.actions.Toggle(target:this)
          ]
        })

  setDefaults: ->
    if !@tile && @game.mainTileContainer?
      @putOnRandomTile(@game.mainTileContainer.tiles)
      
LightBulb.actions = {}
class LightBulb.actions.Toggle extends Parallelio.actions.TargetAction
    execute: ->
      @target.enabled = !@target.enabled

class Character extends Parallelio.DOM.Character
  @properties
   actionProvider:
    calcul: (invalidator)->
      provider = new Parallelio.actions.ActionProvider({
        owner: this
      })
      provider.actionsMembers.push (prev, invalidator)=>
        actions = invalidator.propPath('owner.tile.actionProvider.actions')
        if actions?
          console.log(actions)
          actions.map (a)=>
            a.withActor(this)
      return provider


class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.ShipInterior())
    @lightBulb = @add(new LightBulb())
    @character = @add(new Character("Character 1"))
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()