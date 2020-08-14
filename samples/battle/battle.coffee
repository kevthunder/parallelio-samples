

class Allie extends Parallelio.DOM.Character
  canPlaceOnTile: (tile)->
    tile?.walkable? and 
      tile?.walkable != false and
      tile.x < tile.container.boundaries.left + 10

  putOnRandomTile: (tiles)->
    found = this.getRandomValidTile(tiles,this.canPlaceOnTile.bind(this))
    if found
      this.tile = found

class Fow extends Parallelio.DOM.Character
  canPlaceOnTile: (tile)->
    tile?.walkable? and 
      tile?.walkable != false and
      tile.x > tile.container.boundaries.right - 10

  putOnRandomTile: (tiles)->
    found = this.getRandomValidTile(tiles,this.canPlaceOnTile.bind(this))
    if found
      this.tile = found

  init: ()->
    super()
    @baseCls = 'character fow'


class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.ShipInterior())

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