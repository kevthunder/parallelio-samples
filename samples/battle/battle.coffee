
class Character extends Parallelio.DOM.Character
  putOnRandomTile: (tiles)->
    found = this.getRandomValidTile(tiles,this.canPlaceOnTile.bind(this))
    if found
      this.tile = found

  @properties
    owner: {} 
    name: {} 
    weapons: 
      calcul: ->
        [ new Parallelio.PersonalWeapon(user:this,power:100) ]

class Allie extends Character
  canPlaceOnTile: (tile)->
    tile?.walkable? and 
      tile?.walkable != false and
      tile.x < tile.container.boundaries.left + 10

  init: ()->
    this.actionProvider.actionsMembers.add(new Parallelio.actions.AttackMoveAction({actor:this}))
    super()

class Fow extends Character
  canPlaceOnTile: (tile)->
    tile?.walkable? and 
      tile?.walkable != false and
      tile.x > tile.container.boundaries.right - 10

  init: ()->
    super()
    @baseCls = 'character fow'

class Player extends Parallelio.Player
  isEnemy: (target)->
    target.owner? and target.owner != this

class Game extends Parallelio.DOM.Game
  start: ->
    super()
    @ship = @add(new Parallelio.DOM.ShipInterior())

    @player1 = @add(new Player())
    @player2 = @add(new Player())

    @allies = ['Crew 1','Crew 2','Crew 3','Crew 4'].map (name) =>
      @add(
        new Allie({
          name: name
          owner: @player1
        })
      )

    @foes = ['Enemy 1','Enemy 1','Enemy 1','Enemy 1'].map (name) =>
      @add(
        new Fow({
          name: name
          owner: @player2
        })
      )
    
    @selectionInfo = @add(new Parallelio.DOM.PlayerSelectionInfo())

$ =>
  this.game = new Game()
  this.game.start()