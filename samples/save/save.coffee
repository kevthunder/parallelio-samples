class ControlPanel extends Parallelio.DOM.Tiled
  @extend Parallelio.Obstacle

  init: () ->
    @baseCls = 'controlPanel'
    @actionProvider

  @properties
    game:
      change: (old)->
        if @game 
          @setDefaults()
    actionProvider:
      calcul: ()->
        return new Parallelio.actions.TiledActionProvider({
          owner: this,
          actions: [
            new ControlPanel.actions.Save()
          ]
        })

  setDefaults: ->
    if !@tile && @game.mainTileContainer?
      @putOnRandomTile(@game.mainTileContainer.tiles)
      
ControlPanel.actions = {}
class ControlPanel.actions.Save extends Parallelio.actions.TargetAction
    execute: ->
      @target.game.save()

class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.ShipInterior())
    @controlPanel = this.add(new ControlPanel());
    @character = @add(new Parallelio.DOM.Character("Character 1"))
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()