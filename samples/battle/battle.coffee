

class Allie extends Parallelio.DOM.Character
  canGoOnTile: (tile)->
    tile?.walkable != false and 
      tile.x < tile.container.boundaries.left + 10


class Fow extends Parallelio.DOM.Character
  canGoOnTile: (tile)->
    tile?.walkable != false and 
      tile.x > tile.container.boundaries.right - 10

  init: ()->
    super()
    @baseCls = 'character fow'


class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.Ship())

    @allies = ['Crew 1','Crew 2','Crew 3','Crew 4'].map (name) =>
      @add(
        new Allie().tap ->
          @name = name
      )

    @foes = ['Enemy 1','Enemy 1','Enemy 1','Enemy 1'].map (name) =>
      @add(
        new Fow().tap ->
          @name = name
      )
    
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()