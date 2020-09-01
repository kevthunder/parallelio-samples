(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Parallelio = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var AutomaticDoor, BaseAutomaticDoor, Door;

Door = require('./Door');

BaseAutomaticDoor = require('parallelio').AutomaticDoor;

module.exports = AutomaticDoor = (function() {
  class AutomaticDoor extends BaseAutomaticDoor {
    init() {
      this.baseCls = 'door';
      super.init();
      return this.initDisplay();
    }

  };

  AutomaticDoor.extend(Door);

  return AutomaticDoor;

}).call(this);



},{"./Door":6,"parallelio":71}],2:[function(require,module,exports){
var BaseCharacter, Character, DomUpdater, Element, Tiled;

Tiled = require('./Tiled');

BaseCharacter = require('parallelio').Character;

DomUpdater = require('./DomUpdater');

Element = require('spark-starter').Element;

module.exports = Character = (function() {
  class Character extends BaseCharacter {
    init() {
      this.baseCls = 'character';
      super.init();
      return this.initDisplay();
    }

  };

  Character.extend(Tiled);

  Character.properties({
    selected: {
      change: new DomUpdater({
        callback: function(old) {
          return this.display.toggleClass('selected', this.selected);
        }
      })
    }
  });

  return Character;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":71,"spark-starter":194}],3:[function(require,module,exports){
var BaseDamageable, Damageable, Display, DomUpdater;

BaseDamageable = require('parallelio').Damageable;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = Damageable = (function() {
  class Damageable extends BaseDamageable {
    constructor() {
      super();
      this.healthCls();
      this.initDisplay();
    }

  };

  Damageable.extend(Display);

  Damageable.properties({
    healthClsSteps: {
      default: 10
    },
    healthCls: {
      calcul: function(invalidator) {
        return 'health-' + (Math.ceil(invalidator.propByName('health') / invalidator.propByName('maxHealth') * invalidator.propByName('healthClsSteps')));
      },
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.healthCls != null) {
            return this.display.addClass(this.healthCls);
          }
        }
      })
    }
  });

  return Damageable;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":71}],4:[function(require,module,exports){
var Display, DomUpdater, Element;

Element = require('parallelio').Element;

DomUpdater = require('./DomUpdater');

module.exports = Display = (function() {
  class Display extends Element {
    initDisplay() {}

    destroyDisplay() {
      if (this.displayProperty.value != null) {
        return this.display.remove();
      }
    }

  };

  Display.properties({
    displayContainer: {
      default: null,
      change: new DomUpdater({
        callback: function() {
          if (this.displayContainer != null) {
            return this.display.appendTo(this.displayContainer);
          }
        }
      })
    },
    cls: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.cls != null) {
            return this.display.addClass(this.cls);
          }
        }
      })
    },
    display: {
      calcul: function() {
        var display, newDiv;
        newDiv = document.createElement("div");
        display = jQuery(newDiv).addClass(this.baseCls);
        display.get(0)._parallelio_obj = this;
        return display;
      }
    },
    displayX: {
      change: new DomUpdater({
        callback: function() {
          return this.display.css({
            left: this.displayX
          });
        }
      })
    },
    displayY: {
      change: new DomUpdater({
        callback: function() {
          return this.display.css({
            top: this.displayY
          });
        }
      })
    }
  });

  return Display;

}).call(this);



},{"./DomUpdater":5,"parallelio":71}],5:[function(require,module,exports){
var DomUpdater, PropertyWatcher;

PropertyWatcher = require('parallelio').Spark.watchers.PropertyWatcher;

module.exports = DomUpdater = class DomUpdater extends PropertyWatcher {
  constructor(options) {
    super(options);
  }

  init() {
    this.updateDomCallback = () => {
      return this.updateDom();
    };
    return super.init();
  }

  requestFrame() {
    if (!this.framebinded) {
      this.framebinded = true;
      return window.requestAnimationFrame(this.updateDomCallback);
    }
  }

  validContext() {
    return true;
  }

  invalidate() {
    return this.requestFrame();
  }

  update() {
    return this.requestFrame();
  }

  updateDom(old) {
    var value;
    value = this.getProperty().get();
    if (value !== this.old) {
      this.old = value;
      this.handleChange(value, old);
    }
    return this.framebinded = false;
  }

};



},{"parallelio":71}],6:[function(require,module,exports){
var BaseDoor, DomUpdater, Door, Element, Tiled;

Tiled = require('./Tiled');

BaseDoor = require('parallelio').Door;

DomUpdater = require('./DomUpdater');

Element = require('spark-starter').Element;

module.exports = Door = (function() {
  class Door extends BaseDoor {
    init() {
      this.baseCls = 'door';
      super.init();
      return this.initDisplay();
    }

  };

  Door.extend(Tiled);

  Door.properties({
    direction: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old);
          }
          if (this.direction != null) {
            return this.display.addClass(this.direction);
          }
        }
      })
    },
    open: {
      change: new DomUpdater({
        callback: function(old) {
          this.display.toggleClass('close', !this.open);
          return this.display.toggleClass('open', this.open);
        }
      })
    }
  });

  return Door;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":71,"spark-starter":194}],7:[function(require,module,exports){
var BaseGame, Game, PlayerController, View;

BaseGame = require('parallelio').Game;

View = require('./View');

PlayerController = require('./PlayerController');

// Updater = require('./Updater')
module.exports = Game = (function() {
  class Game extends BaseGame {};

  Game.properties({
    timing: {
      calcul: function(invalidator, original) {
        var timing;
        timing = original();
        // timing.updater = Updater.instance
        return timing;
      }
    },
    mainUI: {
      calcul: function() {
        var div;
        div = document.createElement("div");
        div.classList.add("ui");
        document.body.appendChild(div);
        return div;
      }
    }
  });

  Game.prototype.defaultViewClass = View;

  Game.prototype.defaultPlayerControllerClass = PlayerController;

  return Game;

}).call(this);



},{"./PlayerController":9,"./View":20,"parallelio":71}],8:[function(require,module,exports){
var BaseMap, Map;

BaseMap = require('parallelio').Map;

module.exports = Map = (function() {
  class Map extends BaseMap {
    setDefaults() {
      if (this.displayContainer == null) {
        return this.displayContainer = this.game.mainView.contentDisplay;
      }
    }

    drawBackground(canvas) {
      var context;
      context = canvas.getContext('2d');
      return this.locations.forEach((location) => {
        return typeof location.draw === "function" ? location.draw(this, context) : void 0;
      });
    }

  };

  Map.properties({
    displayContainer: {
      default: null,
      change: function() {
        this.locations.forEach((location) => {
          return location.displayContainer = this.displayContainer;
        });
        if (this.displayContainer != null) {
          return this.displayContainer.append(this.backgroundCanvas);
        }
      }
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    },
    starMargin: {
      default: 10
    },
    backgroundCanvas: {
      calcul: function() {
        var canvas;
        canvas = document.createElement("canvas");
        canvas.width = this.boundaries.right - this.boundaries.left + this.starMargin * 2;
        canvas.height = this.boundaries.bottom - this.boundaries.top + this.starMargin * 2;
        canvas.classList.add("mapBackground");
        canvas.style.top = this.boundaries.top - this.starMargin + "px";
        canvas.style.left = this.boundaries.left - this.starMargin + "px";
        this.drawBackground(canvas);
        return canvas;
      }
    }
  });

  return Map;

}).call(this);



},{"parallelio":71}],9:[function(require,module,exports){
var Element, PlayerController;

Element = require('spark-starter').Element;

module.exports = PlayerController = (function() {
  class PlayerController extends Element {
    setDefaults() {
      if (!this.gameDisplay) {
        return this.gameDisplay = document.body;
      }
    }

    checkFocus(e) {
      return this._bubbleUp(e.target, (target) => {
        if (this.player.canFocusOn(target)) {
          this.player.focused = target;
          return true;
        }
      });
    }

    checkTargetOrSelectable(e) {
      return this._bubbleUp(e.target, (target) => {
        var action;
        if (action = this.player.canTargetActionOn(target)) {
          this.player.selectedAction = action;
          this.player.setActionTarget(target);
          return true;
        } else if (this.player.canSelect(target)) {
          this.player.selected = target;
          return true;
        }
      });
    }

    _bubbleUp(target, stopCallback) {
      var ref;
      while (target) {
        target = target._parallelio_obj != null ? target._parallelio_obj : target.parentNode != null ? target.parentNode : stopCallback(target) ? null : target.tile != null ? target.tile : ((ref = target.display) != null ? ref.get(0).parentNode : void 0) != null ? target.display.get(0).parentNode : null;
      }
      return null;
    }

  };

  PlayerController.properties({
    player: {
      change: function() {
        if (this.player) {
          return this.setDefaults();
        }
      }
    },
    gameDisplay: {
      change: function() {
        if (this.gameDisplay) {
          $(this.gameDisplay).on('click', this.callback('checkTargetOrSelectable'));
          return $(this.gameDisplay).on('mouseover', this.callback('checkFocus'));
        }
      }
    }
  });

  return PlayerController;

}).call(this);



},{"spark-starter":194}],10:[function(require,module,exports){
var Display, DomUpdater, PlayerSelectionInfo;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = PlayerSelectionInfo = (function() {
  class PlayerSelectionInfo extends Display {
    constructor() {
      super();
      this.initDisplay();
      this.baseCls = 'selectionInfo';
      this.name;
      this.game;
      this.actions;
    }

    setDefaults() {
      if (!this.displayContainer && this.game.mainUI) {
        this.displayContainer = this.game.mainUI;
      }
      if (!this.player && this.game.currentPlayer) {
        return this.player = this.game.currentPlayer;
      }
    }

  };

  PlayerSelectionInfo.properties({
    display: {
      calcul: function(invalidator, overrided) {
        var div;
        div = overrided();
        div.html('<div class="name"></div><div class="actions"><span class="title">Actions :</span><ul></ul></div>');
        return div;
      }
    },
    player: {
      default: null
    },
    selection: {
      calcul: function(invalidator) {
        return invalidator.propPath("player.selected");
      }
    },
    name: {
      calcul: function(invalidator) {
        var sel;
        sel = invalidator.prop(this.selectionProperty);
        if (sel != null) {
          return invalidator.prop(sel.nameProperty) || sel.constructor.name;
        }
      },
      change: new DomUpdater({
        callback: function(old) {
          return this.display.find(".name").text(this.name);
        }
      })
    },
    actions: {
      collection: true,
      calcul: function(invalidator) {
        return invalidator.propPath("player.availableActions") || [];
      },
      change: new DomUpdater({
        callback: function(old) {
          var list;
          list = this.display.find(".actions ul");
          list.empty();
          return this.actions.forEach((action) => {
            var display, name;
            name = action.name || action.constructor.name;
            display = $('<li>' + name + '</li>');
            display.on("click", () => {
              return this.player.selectAction(action);
            });
            return list.append(display);
          });
        }
      })
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return PlayerSelectionInfo;

}).call(this);



},{"./Display":4,"./DomUpdater":5}],11:[function(require,module,exports){
var BaseProjectile, Display, Projectile, Updater;

BaseProjectile = require('parallelio').Projectile;

Display = require('./Display');

Updater = require('./Updater');

module.exports = Projectile = (function() {
  class Projectile extends BaseProjectile {
    init() {
      super.init();
      this.baseCls = 'projectile';
      return this.initDisplay();
    }

    destroy() {
      return this.destroyDisplay();
    }

  };

  Projectile.extend(Display);

  Projectile.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('tileDisplay') : void 0) {
          return invalidator.propByName('tileDisplay', container);
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
          return invalidator.propByName('display', container);
        } else {
          return invalidator.propByName('originTile').displayContainer;
        }
      }
    },
    displayX: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayX(invalidate.propByName('x'));
      }
    },
    displayY: {
      calcul: function(invalidate) {
        return this.originTile.tileToDisplayY(invalidate.propByName('y'));
      }
    }
  });

  return Projectile;

}).call(this);



},{"./Display":4,"./Updater":19,"parallelio":71}],12:[function(require,module,exports){
var BaseShip, Display, DomUpdater, Ship;

BaseShip = require('parallelio').Ship;

Display = require('./Display');

DomUpdater = require('./DomUpdater');

module.exports = Ship = (function() {
  class Ship extends BaseShip {
    init() {
      this.baseCls = 'ship';
      return super.init();
    }

  };

  Ship.extend(Display);

  Ship.properties({
    displayContainer: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.displayContainer');
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.x');
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return invalidator.propPath('location.y');
      }
    },
    orbiting: {
      calcul: function(invalidator) {
        return invalidator.propByName('travel') === null;
      },
      change: new DomUpdater({
        callback: function(old) {
          if (this.orbiting) {
            return this.display.addClass("orbiting");
          } else {
            return this.display.removeClass("orbiting");
          }
        }
      })
    }
  });

  return Ship;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":71}],13:[function(require,module,exports){
var DefaultGenerator, Door, ShipInterior, Tile, TileContainer;

Tile = require('./Tile');

TileContainer = require('parallelio').tiles.TileContainer;

DefaultGenerator = require('parallelio').generators.RoomGenerator;

Door = require('./AutomaticDoor');

module.exports = ShipInterior = (function() {
  class ShipInterior extends TileContainer {
    init() {
      super.init();
      return this.displayContainer;
    }

    setDefaults() {
      if (this.displayContainer == null) {
        this.displayContainer = this.game.mainView.contentDisplay;
      }
      if (!(this.tiles.length > 0)) {
        this.generate();
      }
      if (this.game.mainTileContainer == null) {
        return this.game.mainTileContainer = this;
      }
    }

    generate(generator) {
      generator = generator || (new ShipInterior.Generator()).tap(function() {});
      return generator.getTiles().forEach((tile) => {
        return this.addTile(tile);
      });
    }

  };

  ShipInterior.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('contentDisplay') : void 0) {
          return container.contentDisplay;
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
          return container.display;
        }
      },
      change: function() {
        if (this.displayContainer != null) {
          return this.display.appendTo(this.displayContainer);
        }
      }
    },
    display: {
      calcul: function() {
        var display;
        display = $(document.createElement("div")).addClass('ship');
        display.get(0)._parallelio_obj = this;
        return display;
      }
    },
    game: {
      change: function(val, old) {
        if (this.game) {
          return this.setDefaults();
        }
      }
    }
  });

  return ShipInterior;

}).call(this);

ShipInterior.Generator = class Generator extends DefaultGenerator {
  wallFactory(opt) {
    return (new Tile(opt.x, opt.y)).tap(function() {
      this.cls = 'wall';
      return this.walkable = false;
    });
  }

  floorFactory(opt) {
    return new Tile.Floor(opt.x, opt.y);
  }

  doorFactory(opt) {
    return (new Tile.Floor(opt.x, opt.y)).tap(function() {
      return this.addChild(new Door({
        direction: opt.direction
      }));
    });
  }

};



},{"./AutomaticDoor":1,"./Tile":17,"parallelio":71}],14:[function(require,module,exports){
var BaseWeapon, Damageable, DomUpdater, Projectile, ShipWeapon, Tiled;

Tiled = require('./Tiled');

Projectile = require('./Projectile');

Damageable = require('./Damageable');

BaseWeapon = require('parallelio').ShipWeapon;

DomUpdater = require('./DomUpdater');

module.exports = ShipWeapon = (function() {
  class ShipWeapon extends BaseWeapon {
    constructor(direction) {
      super(direction);
      this.baseCls = 'weapon';
    }

  };

  ShipWeapon.extend(Tiled);

  ShipWeapon.extend(Damageable);

  ShipWeapon.properties({
    direction: {
      change: new DomUpdater({
        callback: function(old) {
          if (old != null) {
            this.display.removeClass(old.name);
          }
          if (this.direction.name != null) {
            return this.display.addClass(this.direction.name);
          }
        }
      })
    },
    projectileClass: {
      default: Projectile
    }
  });

  return ShipWeapon;

}).call(this);



},{"./Damageable":3,"./DomUpdater":5,"./Projectile":11,"./Tiled":18,"parallelio":71}],15:[function(require,module,exports){
var BaseStarMapGenerator, Map, StarMapGenerator, StarSystem;

BaseStarMapGenerator = require('parallelio').generators.StarMapGenerator;

Map = require('./Map');

StarSystem = require('./StarSystem');

module.exports = StarMapGenerator = (function() {
  class StarMapGenerator extends BaseStarMapGenerator {};

  StarMapGenerator.prototype.defOpt = Object.assign({}, BaseStarMapGenerator.prototype.defOpt, {
    mapClass: Map,
    starClass: StarSystem,
    linkClass: StarSystem.Link
  });

  return StarMapGenerator;

}).call(this);



},{"./Map":8,"./StarSystem":16,"parallelio":71}],16:[function(require,module,exports){
var BaseStarSystem, Display, StarSystem;

BaseStarSystem = require('parallelio').StarSystem;

Display = require('./Display');

module.exports = StarSystem = (function() {
  class StarSystem extends BaseStarSystem {
    init() {
      this.baseCls = 'star';
      return super.init();
    }

    draw(map, context) {
      context.beginPath();
      context.lineWidth = 1.5;
      context.strokeStyle = "#336";
      context.arc(this.x - map.boundaries.left + map.starMargin, this.y - map.boundaries.top + map.starMargin, map.starMargin, 0, 2 * Math.PI);
      context.stroke();
      return this.links.forEach((link) => {
        if (link.star1 === this) {
          return typeof link.draw === "function" ? link.draw(map, context) : void 0;
        }
      });
    }

  };

  StarSystem.extend(Display);

  StarSystem.properties({
    displayX: {
      calcul: function(invalidator) {
        return invalidator.propByName('x');
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return invalidator.propByName('y');
      }
    }
  });

  return StarSystem;

}).call(this);

StarSystem.Link = class Link extends BaseStarSystem.Link {
  draw(map, context) {
    var dist, x1, x2, xDist, y1, y2, yDist;
    xDist = this.star2.x - this.star1.x;
    yDist = this.star2.y - this.star1.y;
    dist = Math.sqrt((xDist * xDist) + (yDist * yDist));
    x1 = this.star1.x + map.starMargin * xDist / dist - map.boundaries.left + map.starMargin;
    y1 = this.star1.y + map.starMargin * yDist / dist - map.boundaries.top + map.starMargin;
    x2 = this.star2.x - map.starMargin * xDist / dist - map.boundaries.left + map.starMargin;
    y2 = this.star2.y - map.starMargin * yDist / dist - map.boundaries.top + map.starMargin;
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "#336";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    return context.stroke();
  }

};



},{"./Display":4,"parallelio":71}],17:[function(require,module,exports){
var BaseFloor, BaseTile, Display, Tile;

BaseTile = require('parallelio').tiles.Tile;

BaseFloor = require('parallelio').Floor;

Display = require('./Display');

module.exports = Tile = (function() {
  class Tile extends BaseTile {
    init() {
      super.init();
      this.baseCls = 'tile';
      return this.initDisplay();
    }

    tileToDisplayX(x) {
      return x * Tile.size;
    }

    tileToDisplayY(y) {
      return y * Tile.size;
    }

  };

  Tile.extend(Display);

  Tile.size = 20;

  Tile.properties({
    container: {},
    displayContainer: {
      calcul: function(invalidator) {
        var container;
        container = invalidator.propByName('container');
        if (container != null ? container.propertiesManager.getProperty('tileDisplay') : void 0) {
          return invalidator.propByName('tileDisplay', container);
        } else if (container != null ? container.propertiesManager.getProperty('display') : void 0) {
          return invalidator.propByName('display', container);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        return this.tileToDisplayX(invalidator.propByName('x'));
      }
    },
    displayY: {
      calcul: function(invalidator) {
        return this.tileToDisplayY(invalidator.propByName('y'));
      }
    }
  });

  return Tile;

}).call(this);

Tile.Floor = (function() {
  class Floor extends BaseFloor {
    init() {
      super.init();
      this.baseCls = 'tile';
      return this.cls = 'floor';
    }

  };

  Floor.extend(Tile);

  return Floor;

}).call(this);



},{"./Display":4,"parallelio":71}],18:[function(require,module,exports){
var BaseTiled, Display, Tiled;

BaseTiled = require('parallelio').tiles.Tiled;

Display = require('./Display');

module.exports = Tiled = (function() {
  class Tiled extends Display {
    constructor() {
      super();
      this.initDisplay();
    }

  };

  Tiled.properties({
    displayContainer: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return invalidator.propByName('displayContainer', tile);
        }
      }
    },
    displayX: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return tile.displayX + tile.tileToDisplayX(invalidator.propByName('offsetX'));
        }
      }
    },
    displayY: {
      calcul: function(invalidator) {
        var tile;
        tile = invalidator.propByName('tile');
        if (tile != null) {
          return tile.displayY + tile.tileToDisplayY(invalidator.propByName('offsetY'));
        }
      }
    }
  });

  return Tiled;

}).call(this);



},{"./Display":4,"parallelio":71}],19:[function(require,module,exports){
var BaseUpdater, Updater;

BaseUpdater = require('parallelio').Spark.Updater;

module.exports = Updater = class Updater extends BaseUpdater {
  constructor() {
    super();
    this.updateCallback = () => {
      return this.update();
    };
    this.binded = false;
  }

  update() {
    super.update();
    this.binded = false;
    if (this.callbacks.length > 0) {
      return this.requestFrame();
    }
  }

  requestFrame() {
    if (!this.binded) {
      window.requestAnimationFrame(this.updateCallback);
      return this.binded = true;
    }
  }

  addCallback(callback) {
    super.addCallback(callback);
    return this.requestFrame();
  }

};

Updater.instance = new Updater();



},{"parallelio":71}],20:[function(require,module,exports){
var BaseView, Display, DomUpdater, View;

BaseView = require('parallelio').View;

DomUpdater = require('./DomUpdater');

Display = require('./Display');

module.exports = View = (function() {
  class View extends BaseView {
    constructor(display = null) {
      super();
      if (display != null) {
        this.display = display;
      }
      this.hovered = false;
      this.keysInterval = {};
      this.baseCls = 'view';
      this.boundsStyles;
    }

    setDefaults() {
      super.setDefaults();
      if (this.displayContainer == null) {
        return this.displayContainer = $('body');
      }
    }

    mouseEnter() {
      this.hovered = true;
      $('body').keydown(this.callback('keyDown'));
      return $('body').keyup(this.callback('keyUp'));
    }

    mouseLeave() {
      var code, interval, ref, results;
      this.hovered = false;
      $('body').off('keydown', this.callback('keyDown'));
      $('body').off('keyup', this.callback('keyUp'));
      ref = this.keysInterval;
      results = [];
      for (code in ref) {
        interval = ref[code];
        results.push(clearInterval(interval));
      }
      return results;
    }

    keyDown(e) {
      var key;
      if (View.directionkeys[e.which] != null) {
        key = View.directionkeys[e.which];
        if (this.keysInterval[key.name] != null) {
          clearInterval(this.keysInterval[key.name]);
        }
        return this.keysInterval[key.name] = setInterval(() => {
          this.x += key.x * 2;
          return this.y += key.y * 2;
        }, 10);
      }
    }

    keyUp(e) {
      var key;
      if (View.directionkeys[e.which] != null) {
        key = View.directionkeys[e.which];
        if (this.keysInterval[key.name] != null) {
          return clearInterval(this.keysInterval[key.name]);
        }
      }
    }

    updateDisplayPos() {
      return $('.viewContent', this.display).css({
        left: this.x + 'px',
        top: this.y + 'px'
      });
    }

    containsPoint(x, y) {
      var container;
      container = this.display[0];
      while (container) {
        x -= container.offsetLeft;
        y -= container.offsetTop;
        container = container.offsetParent;
      }
      return (0 <= x && x <= this.display.width()) && (0 <= y && y <= this.display.height());
    }

  };

  View.extend(Display);

  View.directionkeys = {
    38: {
      name: 'top',
      x: 0,
      y: 1
    },
    39: {
      name: 'right',
      x: -1,
      y: 0
    },
    40: {
      name: 'bottom',
      x: 0,
      y: -1
    },
    37: {
      name: 'left',
      x: 1,
      y: 0
    }
  };

  View.properties({
    x: {
      default: 0,
      change: function() {
        return this.updateDisplayPos();
      }
    },
    y: {
      default: 0,
      change: function() {
        return this.updateDisplayPos();
      }
    },
    display: {
      calcul: function(invalidator, original) {
        var display;
        display = original();
        if ($('.viewContent', display).length === 0) {
          $(display).append('<div class="viewContent"></div>');
        }
        $(display).mouseenter(this.callback('mouseEnter'));
        return $(display).mouseleave(this.callback('mouseLeave'));
      },
      change: function() {
        return this.updateDisplayPos();
      }
    },
    contentDisplay: {
      calcul: function() {
        return $('.viewContent', this.display);
      }
    },
    boundsStyles: {
      calcul: function(invalidator) {
        return {
          top: invalidator.propPath('bounds.top') * 100 + '%',
          left: invalidator.propPath('bounds.left') * 100 + '%',
          bottom: (1 - invalidator.propPath('bounds.bottom')) * 100 + '%',
          right: (1 - invalidator.propPath('bounds.right')) * 100 + '%'
        };
      },
      change: new DomUpdater({
        callback: function(old) {
          return this.display.css(this.boundsStyles);
        }
      })
    }
  });

  return View;

}).call(this);



},{"./Display":4,"./DomUpdater":5,"parallelio":71}],21:[function(require,module,exports){
var BaseWire, DomUpdater, Tiled, Wire;

Tiled = require('./Tiled');

BaseWire = require('parallelio').wiring.Wire;

DomUpdater = require('./DomUpdater');

module.exports = Wire = (function() {
  class Wire extends BaseWire {
    constructor(wireType) {
      super(wireType);
      this.baseCls = 'wire';
      this.connectedDirections;
    }

    getClassFromDirection(d) {
      return 'conn' + d.name.charAt(0).toUpperCase() + d.name.slice(1);
    }

  };

  Wire.extend(Tiled);

  Wire.properties({
    connectedDirections: {
      change: new DomUpdater({
        callback: function(old) {
          if (old) {
            old.forEach((d) => {
              return this.display.removeClass(this.getClassFromDirection(d));
            });
          }
          return this.connectedDirections.forEach((d) => {
            return this.display.addClass(this.getClassFromDirection(d));
          });
        }
      })
    },
    wireType: {
      change: new DomUpdater({
        callback: function(old) {
          if (old) {
            this.display.removeClass(old);
          }
          return this.display.addClass(this.wireType);
        }
      })
    }
  });

  return Wire;

}).call(this);



},{"./DomUpdater":5,"./Tiled":18,"parallelio":71}],22:[function(require,module,exports){
module.exports = {
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "Damageable": require("./Damageable"),
  "Display": require("./Display"),
  "DomUpdater": require("./DomUpdater"),
  "Door": require("./Door"),
  "Game": require("./Game"),
  "Map": require("./Map"),
  "PlayerController": require("./PlayerController"),
  "PlayerSelectionInfo": require("./PlayerSelectionInfo"),
  "Projectile": require("./Projectile"),
  "Ship": require("./Ship"),
  "ShipInterior": require("./ShipInterior"),
  "ShipWeapon": require("./ShipWeapon"),
  "StarMapGenerator": require("./StarMapGenerator"),
  "StarSystem": require("./StarSystem"),
  "Tile": require("./Tile"),
  "Tiled": require("./Tiled"),
  "Updater": require("./Updater"),
  "View": require("./View"),
  "Wire": require("./Wire"),
}
},{"./AutomaticDoor":1,"./Character":2,"./Damageable":3,"./Display":4,"./DomUpdater":5,"./Door":6,"./Game":7,"./Map":8,"./PlayerController":9,"./PlayerSelectionInfo":10,"./Projectile":11,"./Ship":12,"./ShipInterior":13,"./ShipWeapon":14,"./StarMapGenerator":15,"./StarSystem":16,"./Tile":17,"./Tiled":18,"./Updater":19,"./View":20,"./Wire":21}],23:[function(require,module,exports){
var Parallelio, libs;

libs = require('./libs');

Parallelio = require('parallelio');

module.exports = Object.assign({}, Parallelio, {
  DOM: libs
});



},{"./libs":22,"parallelio":71}],24:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],25:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],26:[function(require,module,exports){
(function (setImmediate,clearImmediate){
var nextTick = require('process/browser.js').nextTick;
var apply = Function.prototype.apply;
var slice = Array.prototype.slice;
var immediateIds = {};
var nextImmediateId = 0;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) { timeout.close(); };

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// That's not how node.js implements it but the exposed api is the same.
exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
  var id = nextImmediateId++;
  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

  immediateIds[id] = true;

  nextTick(function onNextTick() {
    if (immediateIds[id]) {
      // fn.call() is faster so we optimize for the common use-case
      // @see http://jsperf.com/call-apply-segu
      if (args) {
        fn.apply(null, args);
      } else {
        fn.call(null);
      }
      // Prevent ids from leaking
      exports.clearImmediate(id);
    }
  });

  return id;
};

exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
  delete immediateIds[id];
};
}).call(this,require("timers").setImmediate,require("timers").clearImmediate)

},{"process/browser.js":25,"timers":26}],27:[function(require,module,exports){
const Tile = require('parallelio-tiles').Tile

class Airlock extends Tile {
  attachTo (airlock) {
    this.attachedTo = airlock
  }

  copyAndRotate (angle, origin) {
    const copy = super.copyAndRotate(angle, origin)
    copy.direction = this.direction.rotate(angle)
    return copy
  }
}

Airlock.properties({
  direction: {},
  attachedTo: {}
})

module.exports = Airlock

},{"parallelio-tiles":118}],28:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')

class Approach extends Element {
  start () {
    if (this.valid) {
      this.moving = true
      this.subject.xMembers.addPropertyPath('currentPos.x', this)
      this.subject.yMembers.addPropertyPath('currentPos.x', this)
      this.timeout = this.timing.setTimeout(() => {
        return this.done()
      }, this.duration)
    }
  }

  done () {
    this.subject.xMembers.removeRef({
      name: 'currentPos.x',
      obj: this
    })
    this.subject.yMembers.removeRef({
      name: 'currentPos.x',
      obj: this
    })
    this.subject.x = this.targetPos.x
    this.subject.y = this.targetPos.x
    this.subjectAirlock.attachTo(this.targetAirlock)
    this.moving = false
    this.complete = true
  }

  destroy () {
    if (this.timeout) {
      this.timeout.destroy()
    }
  }
};

Approach.properties({
  timing: {
    calcul: function () {
      return new Timing()
    }
  },
  initialDist: {
    default: 500
  },
  rng: {
    default: Math.random
  },
  angle: {
    calcul: function () {
      return this.rng * Math.PI * 2
    }
  },
  startingPos: {
    calcul: function () {
      return {
        x: this.startingPos.x + this.initialDist * Math.cos(this.angle),
        y: this.startingPos.y + this.initialDist * Math.sin(this.angle)
      }
    }
  },
  targetPos: {
    calcul: function () {
      return {
        x: this.targetAirlock.x - this.subjectAirlock.x,
        y: this.targetAirlock.y - this.subjectAirlock.y
      }
    }
  },
  subject: {},
  target: {},
  valid: {
    calcul: function () {
      return this.subject != null &&
        this.target != null &&
        this.subject.airlocks.length > 0 &&
        this.target.airlocks.length > 0
    }
  },
  subjectAirlock: {
    calcul: function () {
      var airlocks
      airlocks = this.subject.airlocks.slice()
      airlocks.sort((a, b) => {
        var valA, valB
        valA = Math.abs(a.direction.x - Math.cos(this.angle)) + Math.abs(a.direction.y - Math.sin(this.angle))
        valB = Math.abs(b.direction.x - Math.cos(this.angle)) + Math.abs(b.direction.y - Math.sin(this.angle))
        return valA - valB
      })
      return airlocks.get(0)
    }
  },
  targetAirlock: {
    calcul: function () {
      return this.target.airlocks.find((target) => {
        return target.direction.getInverse() === this.subjectAirlock.direction
      })
    }
  },
  moving: {
    default: false
  },
  complete: {
    default: false
  },
  currentPos: {
    calcul: function (invalidator) {
      var end, prc, start
      start = invalidator.prop(this.startingPosProperty)
      end = invalidator.prop(this.targetPosProperty)
      prc = invalidator.propPath('timeout.prc') || 0
      return {
        x: (end.x - start.x) * prc + start.x,
        y: (end.y - start.y) * prc + start.y
      }
    }
  },
  duration: {
    default: 10000
  },
  timeout: {}
})

module.exports = Approach

},{"parallelio-timing":128,"spark-starter":185}],29:[function(require,module,exports){
const Door = require('./Door')
const Character = require('./Character')

class AutomaticDoor extends Door {
  updateTileMembers (old) {
    var ref, ref1, ref2, ref3
    if (old != null) {
      if ((ref = old.walkableMembers) != null) {
        ref.removeProperty(this.unlockedProperty)
      }
      if ((ref1 = old.transparentMembers) != null) {
        ref1.removeProperty(this.openProperty)
      }
    }
    if (this.tile) {
      if ((ref2 = this.tile.walkableMembers) != null) {
        ref2.addProperty(this.unlockedProperty)
      }
      return (ref3 = this.tile.transparentMembers) != null ? ref3.addProperty(this.openProperty) : null
    }
  }

  init () {
    super.init()
    return this.open
  }

  isActivatorPresent (invalidate) {
    return this.getReactiveTiles(invalidate).some((tile) => {
      var children
      children = invalidate ? invalidate.prop(tile.childrenProperty) : tile.children
      return children.some((child) => {
        return this.canBeActivatedBy(child)
      })
    })
  }

  canBeActivatedBy (elem) {
    return elem instanceof Character
  }

  getReactiveTiles (invalidate) {
    var direction, tile
    tile = invalidate ? invalidate.prop(this.tileProperty) : this.tile
    if (!tile) {
      return []
    }
    direction = invalidate ? invalidate.prop(this.directionProperty) : this.direction
    if (direction === Door.directions.horizontal) {
      return [tile, tile.getRelativeTile(0, 1), tile.getRelativeTile(0, -1)].filter(function (t) {
        return t != null
      })
    } else {
      return [tile, tile.getRelativeTile(1, 0), tile.getRelativeTile(-1, 0)].filter(function (t) {
        return t != null
      })
    }
  }
};

AutomaticDoor.properties({
  open: {
    calcul: function (invalidate) {
      return !invalidate.prop(this.lockedProperty) && this.isActivatorPresent(invalidate)
    }
  },
  locked: {
    default: false
  },
  unlocked: {
    calcul: function (invalidate) {
      return !invalidate.prop(this.lockedProperty)
    }
  }
})

module.exports = AutomaticDoor

},{"./Character":30,"./Door":35}],30:[function(require,module,exports){
const Tiled = require('parallelio-tiles').Tiled
const Damageable = require('./Damageable')
const WalkAction = require('./actions/WalkAction')
const ActionProvider = require('./actions/ActionProvider')

class Character extends Tiled {
  constructor (options) {
    if (typeof options === 'string') {
      options = { name: options }
    }
    super(options)
  }

  setDefaults () {
    if (!this.tile && (this.game.mainTileContainer != null)) {
      return this.putOnRandomTile(this.game.mainTileContainer.tiles)
    }
  }

  canGoOnTile (tile) {
    return (tile != null ? tile.walkable : null) !== false
  }

  walkTo (tile) {
    var action
    action = new WalkAction({
      actor: this,
      target: tile
    })
    action.start()
    return action
  }

  isSelectableBy (player) {
    return true
  }
};

Character.extend(Damageable)

Character.properties({
  name: {},
  game: {
    change: function (val, old) {
      if (this.game) {
        return this.setDefaults()
      }
    }
  },
  offsetX: {
    composed: true,
    default: 0.5
  },
  offsetY: {
    composed: true,
    default: 0.5
  },
  tile: {
    composed: true
  },
  defaultAction: {
    calcul: function () {
      return new WalkAction({
        actor: this
      })
    }
  },
  actionProvider: {
    calcul: function (invalidator) {
      const provider = new ActionProvider({
        owner: this
      })
      provider.actionsMembers.addPropertyPath('owner.tile.actionProvider.actions')
      return provider
    }
  }
})

module.exports = Character

},{"./Damageable":34,"./actions/ActionProvider":58,"./actions/WalkAction":65,"parallelio-tiles":118}],31:[function(require,module,exports){
const TileContainer = require('parallelio-tiles').TileContainer
const VisionCalculator = require('./VisionCalculator')
const Door = require('./Door')
const WalkAction = require('./actions/WalkAction')
const AttackMoveAction = require('./actions/AttackMoveAction')
const PropertyWatcher = require('spark-starter').watchers.PropertyWatcher

class CharacterAI {
  constructor (character) {
    this.character = character
    this.nextActionCallback = () => {
      return this.nextAction()
    }
    this.visionMemory = new TileContainer()
    this.tileWatcher = new PropertyWatcher({
      callback: () => {
        return this.updateVisionMemory()
      },
      property: this.character.propertiesManager.getProperty('tile')
    })
  }

  start () {
    this.tileWatcher.bind()
    return this.nextAction()
  }

  nextAction () {
    this.updateVisionMemory()
    const enemy = this.getClosestEnemy()
    if (enemy) {
      return this.attackMoveTo(enemy).on('end', this.nextActionCallback)
    }
    const unexplored = this.getClosestUnexplored()
    if (unexplored) {
      return this.walkTo(unexplored).on('end', this.nextActionCallback)
    } else {
      this.resetVisionMemory()
      return this.walkTo(this.getClosestUnexplored()).on('end', this.nextActionCallback)
    }
  }

  updateVisionMemory () {
    var calculator
    calculator = new VisionCalculator(this.character.tile)
    calculator.calcul()
    this.visionMemory = calculator.toContainer().merge(this.visionMemory, (a, b) => {
      if (a != null) {
        a = this.analyzeTile(a)
      }
      if ((a != null) && (b != null)) {
        a.visibility = Math.max(a.visibility, b.visibility)
        return a
      } else {
        return a || b
      }
    })
  }

  analyzeTile (tile) {
    var ref
    tile.ennemySpotted = (ref = tile.getFinalTile().children) != null ? ref.find((c) => {
      return this.isEnnemy(c)
    }) : null
    tile.explorable = this.isExplorable(tile)
    return tile
  }

  isEnnemy (elem) {
    var ref
    return (ref = this.character.owner) != null ? typeof ref.isEnemy === 'function' ? ref.isEnemy(elem) : null : null
  }

  getClosestEnemy () {
    return this.visionMemory.closest(this.character.tile, (t) => {
      return t.ennemySpotted
    })
  }

  getClosestUnexplored () {
    return this.visionMemory.closest(this.character.tile, (t) => {
      return t.visibility < 1 && t.explorable
    })
  }

  isExplorable (tile) {
    var ref
    tile = tile.getFinalTile()
    return tile.walkable || ((ref = tile.children) != null ? ref.find((c) => {
      return c instanceof Door
    }) : null)
  }

  attackMoveTo (tile) {
    var action
    tile = tile.getFinalTile()
    action = new AttackMoveAction({
      actor: this.character,
      target: tile
    })
    if (action.isReady()) {
      action.start()
      return action
    }
  }

  walkTo (tile) {
    var action
    tile = tile.getFinalTile()
    action = new WalkAction({
      actor: this.character,
      target: tile
    })
    if (action.isReady()) {
      action.start()
      return action
    }
  }
}

module.exports = CharacterAI

},{"./Door":35,"./VisionCalculator":56,"./actions/AttackMoveAction":60,"./actions/WalkAction":65,"parallelio-tiles":118,"spark-starter":185}],32:[function(require,module,exports){
const Element = require('spark-starter').Element
const View = require('./View')
const Ship = require('./Ship')
const Approach = require('./Approach')

class Confrontation extends Element {
  start () {
    this.subject.encounter = this
    this.game.mainView = this.view
    this.game.add(this.subject.interrior)
    this.subject.interrior.container = this.view
    this.game.add(this.opponent.interrior)
    this.opponent.interrior.container = this.view
    this.approach.start()
  }
};

Confrontation.properties({
  game: {
    default: null
  },
  subject: {
    default: null
  },
  view: {
    calcul: function () {
      return new View()
    }
  },
  opponent: {
    calcul: function () {
      return new Ship()
    }
  },
  approach: {
    calcul: function () {
      return new Approach({
        subject: this.opponent.interrior,
        target: this.subject.interrior
      })
    }
  }
})

module.exports = Confrontation

},{"./Approach":28,"./Ship":50,"./View":55,"spark-starter":185}],33:[function(require,module,exports){
const Element = require('spark-starter').Element
const LineOfSight = require('./LineOfSight')
const Direction = require('parallelio-tiles').Direction

class DamagePropagation extends Element {
  getTileContainer () {
    return this.tile.container
  }

  apply () {
    this.getDamaged().forEach((damage) => {
      damage.target.damage(damage.damage)
    })
  }

  getInitialTiles () {
    var ctn
    ctn = this.getTileContainer()
    return ctn.inRange(this.tile, this.range)
  }

  getInitialDamages () {
    const tiles = this.getInitialTiles()
    return tiles.reduce((damages, tile) => {
      if (tile.damageable) {
        const dmg = this.initialDamage(tile, tiles.length)
        if (dmg) {
          damages.push(dmg)
        }
      }
      return damages
    }, [])
  }

  getDamaged () {
    var added
    if (this._damaged == null) {
      added = null
      do {
        added = this.step(added)
      } while (added)
    }
    return this._damaged
  }

  step (added) {
    if (added != null) {
      if (this.extendedDamage != null) {
        added = this.extend(added)
        this._damaged = added.concat(this._damaged)
        return added.length > 0 && added
      }
    } else {
      this._damaged = this.getInitialDamages()
      return this._damaged
    }
  }

  inDamaged (target, damaged) {
    const pos = damaged.findIndex((damage) => damage.target === target)
    if (pos === -1) {
      return false
    }
    return pos
  }

  extend (damaged) {
    const ctn = this.getTileContainer()
    return damaged.reduce((added, damage) => {
      if (damage.target.x == null) {
        return added
      }
      const local = Direction.adjacents.reduce((local, dir) => {
        const tile = ctn.getTile(damage.target.x + dir.x, damage.target.y + dir.y)
        if ((tile != null) && tile.damageable && this.inDamaged(tile, this._damaged) === false) {
          local.push(tile)
        }
        return local
      }, [])
      return local.reduce((added, target) => {
        const dmg = this.extendedDamage(target, damage, local.length)
        if (dmg) {
          const existing = this.inDamaged(target, added)
          if (existing === false) {
            added.push(dmg)
          } else {
            added[existing] = this.mergeDamage(added[existing], dmg)
          }
        }
        return added
      }, added)
    }, [])
  }

  mergeDamage (d1, d2) {
    return {
      target: d1.target,
      power: d1.power + d2.power,
      damage: d1.damage + d2.damage
    }
  }

  modifyDamage (target, power) {
    if (typeof target.modifyDamage === 'function') {
      return Math.floor(target.modifyDamage(power, this.type))
    } else {
      return Math.floor(power)
    }
  }
};

DamagePropagation.properties({
  tile: {
    default: null
  },
  power: {
    default: 10
  },
  range: {
    default: 1
  },
  type: {
    default: null
  }
})

DamagePropagation.Normal = class Normal extends DamagePropagation {
  initialDamage (target, nb) {
    var dmg
    dmg = this.modifyDamage(target, this.power)
    if (dmg > 0) {
      return {
        target: target,
        power: this.power,
        damage: dmg
      }
    }
  }
}

DamagePropagation.Thermic = class Thermic extends DamagePropagation {
  extendedDamage (target, last, nb) {
    var dmg, power
    power = (last.damage - 1) / 2 / nb * Math.min(1, last.target.health / last.target.maxHealth * 5)
    dmg = this.modifyDamage(target, power)
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      }
    }
  }

  initialDamage (target, nb) {
    var dmg, power
    power = this.power / nb
    dmg = this.modifyDamage(target, power)
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      }
    }
  }
}

DamagePropagation.Kinetic = class Kinetic extends DamagePropagation {
  extendedDamage (target, last, nb) {
    var dmg, power
    power = (last.power - last.damage) * Math.min(1, last.target.health / last.target.maxHealth * 2) - 1
    dmg = this.modifyDamage(target, power)
    if (dmg > 0) {
      return {
        target: target,
        power: power,
        damage: dmg
      }
    }
  }

  initialDamage (target, nb) {
    var dmg
    dmg = this.modifyDamage(target, this.power)
    if (dmg > 0) {
      return {
        target: target,
        power: this.power,
        damage: dmg
      }
    }
  }

  modifyDamage (target, power) {
    if (typeof target.modifyDamage === 'function') {
      return Math.floor(target.modifyDamage(power, this.type))
    } else {
      return Math.floor(power * 0.25)
    }
  }

  mergeDamage (d1, d2) {
    return {
      target: d1.target,
      power: Math.floor((d1.power + d2.power) / 2),
      damage: Math.floor((d1.damage + d2.damage) / 2)
    }
  }
}

DamagePropagation.Explosive = (function () {
  class Explosive extends DamagePropagation {
    getDamaged () {
      var angle, inside, shardPower, target
      this._damaged = []
      const shards = Math.pow(this.range + 1, 2)
      shardPower = this.power / shards
      inside = this.tile.health <= this.modifyDamage(this.tile, shardPower)
      if (inside) {
        shardPower *= 4
      }
      this._damaged = Array(...Array(shards + 1)).reduce((damaged) => {
        angle = this.rng() * Math.PI * 2
        target = this.getTileHitByShard(inside, angle)
        if (target != null) {
          damaged.push({
            target: target,
            power: shardPower,
            damage: this.modifyDamage(target, shardPower)
          })
        }
        return damaged
      }, [])
      return this._damaged
    }

    getTileHitByShard (inside, angle) {
      var ctn, dist, target, vertex
      ctn = this.getTileContainer()
      dist = this.range * this.rng()
      target = {
        x: this.tile.x + 0.5 + dist * Math.cos(angle),
        y: this.tile.y + 0.5 + dist * Math.sin(angle)
      }
      if (inside) {
        vertex = new LineOfSight(ctn, this.tile.x + 0.5, this.tile.y + 0.5, target.x, target.y)
        vertex.traversableCallback = (tile) => {
          return !inside || ((tile != null) && this.traversableCallback(tile))
        }
        return vertex.getEndPoint().tile
      } else {
        return ctn.getTile(Math.floor(target.x), Math.floor(target.y))
      }
    }
  };

  Explosive.properties({
    rng: {
      default: Math.random
    },
    traversableCallback: {
      default: function (tile) {
        return !(typeof tile.getSolid === 'function' && tile.getSolid())
      }
    }
  })

  return Explosive
}.call(this))

module.exports = DamagePropagation

},{"./LineOfSight":41,"parallelio-tiles":118,"spark-starter":185}],34:[function(require,module,exports){
const Element = require('spark-starter').Element

class Damageable extends Element {
  damage (val) {
    this.health = Math.max(0, this.health - val)
  }

  whenNoHealth () {}
};

Damageable.properties({
  damageable: {
    default: true
  },
  maxHealth: {
    default: 1000
  },
  health: {
    default: 1000,
    change: function () {
      if (this.health <= 0) {
        return this.whenNoHealth()
      }
    }
  }
})

module.exports = Damageable

},{"spark-starter":185}],35:[function(require,module,exports){
const Tiled = require('parallelio-tiles').Tiled

const directions = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

class Door extends Tiled {
  updateTileMembers (old) {
    var ref, ref1, ref2, ref3
    if (old != null) {
      if ((ref = old.walkableMembers) != null) {
        ref.removeProperty(this.openProperty)
      }
      if ((ref1 = old.transparentMembers) != null) {
        ref1.removeProperty(this.openProperty)
      }
    }
    if (this.tile) {
      if ((ref2 = this.tile.walkableMembers) != null) {
        ref2.addProperty(this.openProperty)
      }
      return (ref3 = this.tile.transparentMembers) != null ? ref3.addProperty(this.openProperty) : null
    }
  }
};

Door.properties({
  tile: {
    change: function (val, old) {
      return this.updateTileMembers(old)
    }
  },
  open: {
    default: false
  },
  direction: {
    default: directions.horizontal
  }
})

Door.directions = directions

module.exports = Door

},{"parallelio-tiles":118}],36:[function(require,module,exports){
module.exports = require('spark-starter').Element

},{"spark-starter":185}],37:[function(require,module,exports){
const Element = require('spark-starter').Element
const PropertyWatcher = require('spark-starter').watchers.PropertyWatcher
const Confrontation = require('./Confrontation')

class EncounterManager extends Element {
  init () {
    return this.locationWatcher.bind()
  }

  testEncounter () {
    if (this.rng() <= this.baseProbability) {
      return this.startEncounter()
    }
  }

  startEncounter () {
    var encounter
    encounter = new Confrontation({
      subject: this.subject,
      game: this.game
    })
    return encounter.start()
  }
};

EncounterManager.properties({
  subject: {
    default: null
  },
  game: {
    default: null
  },
  baseProbability: {
    default: 0.2
  },
  locationWatcher: {
    calcul: function () {
      return new PropertyWatcher({
        callback: () => {
          return this.testEncounter()
        },
        property: this.subject.propertiesManager.getProperty('location')
      })
    }
  },
  rng: {
    default: Math.random
  }
})

module.exports = EncounterManager

},{"./Confrontation":32,"spark-starter":185}],38:[function(require,module,exports){
const Tile = require('parallelio-tiles').Tile

class Floor extends Tile {};

Floor.properties({
  walkable: {
    composed: true,
    default: true
  },
  transparent: {
    composed: true,
    default: true
  }
})

module.exports = Floor

},{"parallelio-tiles":118}],39:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')
const View = require('./View')
const Player = require('./Player')
const LoaderCollection = require('./saveEngines/LoaderCollection')

class Game extends Element {
  start () {
    return this.currentPlayer
  }

  add (elem) {
    if (Array.isArray(elem)) {
      return elem.map((e) => {
        return this.add(e)
      })
    }
    elem.game = this
    return elem
  }

  load (slot) {
    if (!this.saveEngine) {
      throw (new Error('No Save engine enabled'))
    }
    const data = this.saveEngine.load(slot)
    const loaded = this.loaders.load(data)
    this.add(loaded)
  }

  save (slot) {
    if (!this.saveEngine) {
      throw (new Error('No Save engine enabled'))
    }
    const data = this.savables.map((elem) => {
      return elem.getSaveData()
    })
    this.saveEngine.save(data, slot)
  }
};

Game.properties({
  timing: {
    calcul: function () {
      return new Timing()
    }
  },
  mainView: {
    calcul: function () {
      if (this.views.length > 0) {
        return this.views.get(0)
      } else {
        const ViewClass = this.defaultViewClass
        return this.add(new ViewClass())
      }
    }
  },
  views: {
    collection: true
  },
  currentPlayer: {
    calcul: function () {
      if (this.players.length > 0) {
        return this.players.get(0)
      } else {
        const PlayerClass = this.defaultPlayerClass
        return this.add(new PlayerClass())
      }
    }
  },
  players: {
    collection: true
  },
  savables: {
    collection: true
  },
  loaders: {
    calcul: function () {
      return new LoaderCollection()
    }
  }
})

Game.prototype.defaultViewClass = View

Game.prototype.defaultPlayerClass = Player

module.exports = Game

},{"./Player":46,"./View":55,"./saveEngines/LoaderCollection":72,"parallelio-timing":128,"spark-starter":185}],40:[function(require,module,exports){
const Collection = require('spark-starter').Collection

class Inventory extends Collection {
  getByType (type) {
    var res
    res = this.filter(function (r) {
      return r.type === type
    })
    if (res.length) {
      return res[0]
    }
  }

  addByType (type, qte, partial = false) {
    var ressource
    ressource = this.getByType(type)
    if (!ressource) {
      ressource = this.initRessource(type)
    }
    if (partial) {
      ressource.partialChange(ressource.qte + qte)
    } else {
      ressource.qte += qte
    }
  }

  initRessource (type, opt) {
    return type.initRessource(opt)
  }
}

module.exports = Inventory

},{"spark-starter":185}],41:[function(require,module,exports){
class LineOfSight {
  constructor (tiles, x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
    this.tiles = tiles
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  setX1 (val) {
    this.x1 = val
    return this.invalidade()
  }

  setY1 (val) {
    this.y1 = val
    return this.invalidade()
  }

  setX2 (val) {
    this.x2 = val
    return this.invalidade()
  }

  setY2 (val) {
    this.y2 = val
    return this.invalidade()
  }

  invalidade () {
    this.endPoint = null
    this.success = null
    this.calculated = false
  }

  testTile (tile, entryX, entryY) {
    if (this.traversableCallback != null) {
      return this.traversableCallback(tile, entryX, entryY)
    } else {
      return (tile != null) && (typeof tile.getTransparent === 'function' ? tile.getTransparent() : tile.transparent != null ? tile.transparent : true)
    }
  }

  testTileAt (x, y, entryX, entryY) {
    return this.testTile(this.tiles.getTile(Math.floor(x), Math.floor(y)), entryX, entryY)
  }

  reverseTracing () {
    var tmpX, tmpY
    tmpX = this.x1
    tmpY = this.y1
    this.x1 = this.x2
    this.y1 = this.y2
    this.x2 = tmpX
    this.y2 = tmpY
    this.reversed = !this.reversed
  }

  calcul () {
    var nextX, nextY, positiveX, positiveY, ratio, tileX, tileY, total, x, y
    ratio = (this.x2 - this.x1) / (this.y2 - this.y1)
    total = Math.abs(this.x2 - this.x1) + Math.abs(this.y2 - this.y1)
    positiveX = (this.x2 - this.x1) >= 0
    positiveY = (this.y2 - this.y1) >= 0
    tileX = x = this.x1
    tileY = y = this.y1
    if (this.reversed) {
      tileX = positiveX ? x : Math.ceil(x) - 1
      tileY = positiveY ? y : Math.ceil(y) - 1
    }
    while (total > Math.abs(x - this.x1) + Math.abs(y - this.y1) && this.testTileAt(tileX, tileY, x, y)) {
      nextX = positiveX ? Math.floor(x) + 1 : Math.ceil(x) - 1
      nextY = positiveY ? Math.floor(y) + 1 : Math.ceil(y) - 1
      if (this.x2 - this.x1 === 0) {
        y = nextY
      } else if (this.y2 - this.y1 === 0) {
        x = nextX
      } else if (Math.abs((nextX - x) / (this.x2 - this.x1)) < Math.abs((nextY - y) / (this.y2 - this.y1))) {
        x = nextX
        y = (nextX - this.x1) / ratio + this.y1
      } else {
        x = (nextY - this.y1) * ratio + this.x1
        y = nextY
      }
      tileX = positiveX ? x : Math.ceil(x) - 1
      tileY = positiveY ? y : Math.ceil(y) - 1
    }
    if (total <= Math.abs(x - this.x1) + Math.abs(y - this.y1)) {
      this.endPoint = {
        x: this.x2,
        y: this.y2,
        tile: this.tiles.getTile(Math.floor(this.x2), Math.floor(this.y2))
      }
      this.success = true
    } else {
      this.endPoint = {
        x: x,
        y: y,
        tile: this.tiles.getTile(Math.floor(tileX), Math.floor(tileY))
      }
      this.success = false
    }
  }

  forceSuccess () {
    this.endPoint = {
      x: this.x2,
      y: this.y2,
      tile: this.tiles.getTile(Math.floor(this.x2), Math.floor(this.y2))
    }
    this.success = true
    this.calculated = true
    return true
  }

  getSuccess () {
    if (!this.calculated) {
      this.calcul()
    }
    return this.success
  }

  getEndPoint () {
    if (!this.calculated) {
      this.calcul()
    }
    return this.endPoint
  }
}

module.exports = LineOfSight

},{}],42:[function(require,module,exports){
const Element = require('spark-starter').Element

class Map extends Element {
  _addToBondaries (location, boundaries) {
    if ((boundaries.top == null) || location.y < boundaries.top) {
      boundaries.top = location.y
    }
    if ((boundaries.left == null) || location.x < boundaries.left) {
      boundaries.left = location.x
    }
    if ((boundaries.bottom == null) || location.y > boundaries.bottom) {
      boundaries.bottom = location.y
    }
    if ((boundaries.right == null) || location.x > boundaries.right) {
      boundaries.right = location.x
    }
  }
};

Map.properties({
  locations: {
    collection: {
      closest: function (x, y) {
        var min, minDist
        min = null
        minDist = null
        this.forEach(function (location) {
          var dist
          dist = location.dist(x, y)
          if ((min == null) || minDist > dist) {
            min = location
            minDist = dist
          }
        })
        return min
      },
      closests: function (x, y) {
        var dists
        dists = this.map(function (location) {
          return {
            dist: location.dist(x, y),
            location: location
          }
        })
        dists.sort(function (a, b) {
          return a.dist - b.dist
        })
        return this.copy(dists.map(function (dist) {
          return dist.location
        }))
      }
    }
  },
  boundaries: {
    calcul: function () {
      var boundaries
      boundaries = {
        top: null,
        left: null,
        bottom: null,
        right: null
      }
      this.locations.forEach((location) => {
        return this._addToBondaries(location, boundaries)
      })
      return boundaries
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  }
})

module.exports = Map

},{"spark-starter":185}],43:[function(require,module,exports){
const Tiled = require('parallelio-tiles').Tiled

class Obstacle extends Tiled {
  updateWalkables (old) {
    var ref, ref1
    if (old != null) {
      if ((ref = old.walkableMembers) != null) {
        ref.removeRef({
          name: 'walkable',
          obj: this
        })
      }
    }
    if (this.tile) {
      return (ref1 = this.tile.walkableMembers) != null ? ref1.setValueRef(false, 'walkable', this) : null
    }
  }
};

Obstacle.properties({
  tile: {
    change: function (val, old, overrided) {
      overrided(old)
      return this.updateWalkables(old)
    }
  }
})

module.exports = Obstacle

},{"parallelio-tiles":118}],44:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')
const EventEmitter = require('events')

class PathWalk extends Element {
  constructor (walker, path, options) {
    super(options)
    this.walker = walker
    this.path = path
  }

  start () {
    if (!this.path.solution) {
      this.path.calcul()
    }
    if (this.path.solution) {
      this.pathTimeout = this.timing.setTimeout(() => {
        return this.finish()
      }, this.totalTime)
      this.walker.tileMembers.addPropertyPath('position.tile', this)
      this.walker.offsetXMembers.addPropertyPath('position.offsetX', this)
      return this.walker.offsetYMembers.addPropertyPath('position.offsetY', this)
    }
  }

  stop () {
    return this.pathTimeout.pause()
  }

  finish () {
    this.walker.tile = this.position.tile
    this.walker.offsetX = this.position.offsetX
    this.walker.offsetY = this.position.offsetY
    this.emit('finished')
    return this.end()
  }

  interrupt () {
    this.emit('interrupted')
    return this.end()
  }

  end () {
    this.emit('end')
    return this.destroy()
  }

  destroy () {
    if (this.walker.walk === this) {
      this.walker.walk = null
    }
    this.walker.tileMembers.removeRef({
      name: 'position.tile',
      obj: this
    })
    this.walker.offsetXMembers.removeRef({
      name: 'position.offsetX',
      obj: this
    })
    this.walker.offsetYMembers.removeRef({
      name: 'position.offsetY',
      obj: this
    })
    this.pathTimeout.destroy()
    this.propertiesManager.destroy()
    return this.removeAllListeners()
  }
};

PathWalk.include(EventEmitter.prototype)

PathWalk.properties({
  speed: {
    default: 5
  },
  timing: {
    calcul: function () {
      var ref
      if ((ref = this.walker.game) != null ? ref.timing : null) {
        return this.walker.game.timing
      } else {
        return new Timing()
      }
    }
  },
  pathLength: {
    calcul: function () {
      return this.path.solution.getTotalLength()
    }
  },
  totalTime: {
    calcul: function () {
      return this.pathLength / this.speed * 1000
    }
  },
  position: {
    calcul: function (invalidator) {
      return this.path.getPosAtPrc(invalidator.propPath('pathTimeout.prc') || 0)
    }
  }
})

module.exports = PathWalk

},{"events":24,"parallelio-timing":128,"spark-starter":185}],45:[function(require,module,exports){
const Element = require('spark-starter').Element
const LineOfSight = require('./LineOfSight')
const Timing = require('parallelio-timing')

class PersonalWeapon extends Element {
  canBeUsed () {
    return this.charged
  }

  canUseOn (target) {
    return this.canUseFrom(this.user.tile, target)
  }

  canUseFrom (tile, target) {
    if (this.range === 1) {
      return this.inMeleeRange(tile, target)
    } else {
      return this.inRange(tile, target) && this.hasLineOfSight(tile, target)
    }
  }

  inRange (tile, target) {
    var ref, targetTile
    targetTile = target.tile || target
    return ((ref = tile.dist(targetTile)) != null ? ref.length : null) <= this.range
  }

  inMeleeRange (tile, target) {
    var targetTile
    targetTile = target.tile || target
    return Math.abs(targetTile.x - tile.x) + Math.abs(targetTile.y - tile.y) === 1
  }

  hasLineOfSight (tile, target) {
    var los, targetTile
    targetTile = target.tile || target
    los = new LineOfSight(targetTile.container, tile.x + 0.5, tile.y + 0.5, targetTile.x + 0.5, targetTile.y + 0.5)
    los.traversableCallback = function (tile) {
      return tile.walkable
    }
    return los.getSuccess()
  }

  useOn (target) {
    if (this.canBeUsed()) {
      target.damage(this.power)
      this.charged = false
      return this.recharge()
    }
  }

  recharge () {
    this.charging = true
    this.chargeTimeout = this.timing.setTimeout(() => {
      this.charging = false
      return this.recharged()
    }, this.rechargeTime)
  }

  recharged () {
    this.charged = true
  }

  destroy () {
    if (this.chargeTimeout) {
      return this.chargeTimeout.destroy()
    }
  }
};

PersonalWeapon.properties({
  rechargeTime: {
    default: 1000
  },
  charged: {
    default: true
  },
  charging: {
    default: true
  },
  power: {
    default: 10
  },
  dps: {
    calcul: function (invalidator) {
      return invalidator.prop(this.powerProperty) / invalidator.prop(this.rechargeTimeProperty) * 1000
    }
  },
  range: {
    default: 10
  },
  user: {
    default: null
  },
  timing: {
    calcul: function () {
      return new Timing()
    }
  }
})

module.exports = PersonalWeapon

},{"./LineOfSight":41,"parallelio-timing":128,"spark-starter":185}],46:[function(require,module,exports){
const Element = require('spark-starter').Element

class Player extends Element {
  setDefaults () {
    var first
    first = this.game.players.length === 0
    this.game.players.add(this)
    if (first && !this.controller && this.game.defaultPlayerControllerClass) {
      const PlayerControllerClass = this.game.defaultPlayerControllerClass
      this.controller = new PlayerControllerClass()
    }
  }

  canTargetActionOn (elem) {
    var action, ref
    action = this.selectedAction || ((ref = this.selected) != null ? ref.defaultAction : null)
    return (action != null) && typeof action.canTarget === 'function' && action.canTarget(elem)
  }

  guessActionTarget (action) {
    var selected
    selected = this.selected
    if (typeof action.canTarget === 'function' && (action.target == null) && action.actor !== selected && action.canTarget(selected)) {
      return action.withTarget(selected)
    } else {
      return action
    }
  }

  canSelect (elem) {
    return typeof elem.isSelectableBy === 'function' && elem.isSelectableBy(this)
  }

  canFocusOn (elem) {
    if (typeof elem.IsFocusableBy === 'function') {
      return elem.IsFocusableBy(this)
    } else if (typeof elem.IsSelectableBy === 'function') {
      return elem.IsSelectableBy(this)
    }
  }

  selectAction (action) {
    if (action.isReady()) {
      action.start()
    } else {
      this.selectedAction = action
    }
  }

  setActionTarget (elem) {
    var action
    action = this.selectedAction || (this.selected != null ? this.selected.defaultAction : null)
    action = action.withTarget(elem)
    if (action.isReady()) {
      action.start()
      this.selectedAction = null
    } else {
      this.selectedAction = action
    }
  }
};

Player.properties({
  name: {
    default: 'Player'
  },
  focused: {},
  selected: {
    change: function (val, old) {
      if (old != null && old.propertiesManager != null && old.propertiesManager.getProperty('selected')) {
        old.selected = false
      }
      if (val != null && val.propertiesManager != null && val.propertiesManager.getProperty('selected')) {
        val.selected = this
      }
    }
  },
  globalActionProviders: {
    collection: true
  },
  actionProviders: {
    calcul: function (invalidator) {
      var res, selected
      res = invalidator.prop(this.globalActionProvidersProperty).toArray()
      selected = invalidator.prop(this.selectedProperty)
      if (selected && selected.actionProvider) {
        res.push(selected.actionProvider)
      }
      return res
    }
  },
  availableActions: {
    calcul: function (invalidator) {
      return invalidator.prop(this.actionProvidersProperty).reduce((res, provider) => {
        var actions, selected
        actions = invalidator.prop(provider.actionsProperty).toArray()
        selected = invalidator.prop(this.selectedProperty)
        if (selected != null) {
          actions = actions.map((action) => {
            return this.guessActionTarget(action)
          })
        }
        if (actions) {
          return res.concat(actions)
        } else {
          return res
        }
      }, [])
    }
  },
  selectedAction: {},
  controller: {
    change: function (val, old) {
      if (this.controller) {
        this.controller.player = this
      }
    }
  },
  game: {
    change: function (val, old) {
      if (this.game) {
        return this.setDefaults()
      }
    }
  }
})

module.exports = Player

},{"spark-starter":185}],47:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')

class Projectile extends Element {
  constructor (options) {
    super(options)
    this.init()
  }

  init () {}

  launch () {
    this.moving = true
    this.pathTimeout = this.timing.setTimeout(() => {
      this.deliverPayload()
      this.moving = false
    }, this.pathLength / this.speed * 1000)
  }

  deliverPayload () {
    const PropagationType = this.propagationType
    const payload = new PropagationType({
      tile: this.target.tile || this.target,
      power: this.power,
      range: this.blastRange
    })
    payload.apply()
    this.payloadDelivered()
    return payload
  }

  payloadDelivered () {
    return this.destroy()
  }

  destroy () {
    return this.propertiesManager.destroy()
  }
};

Projectile.properties({
  origin: {
    default: null
  },
  target: {
    default: null
  },
  power: {
    default: 10
  },
  blastRange: {
    default: 1
  },
  propagationType: {
    default: null
  },
  speed: {
    default: 10
  },
  pathLength: {
    calcul: function () {
      var dist
      if ((this.originTile != null) && (this.targetTile != null)) {
        dist = this.originTile.dist(this.targetTile)
        if (dist) {
          return dist.length
        }
      }
      return 100
    }
  },
  originTile: {
    calcul: function (invalidator) {
      var origin
      origin = invalidator.prop(this.originProperty)
      if (origin != null) {
        return origin.tile || origin
      }
    }
  },
  targetTile: {
    calcul: function (invalidator) {
      var target
      target = invalidator.prop(this.targetProperty)
      if (target != null) {
        return target.tile || target
      }
    }
  },
  container: {
    calcul: function (invalidate) {
      var originTile, targetTile
      originTile = invalidate.prop(this.originTileProperty)
      targetTile = invalidate.prop(this.targetTileProperty)
      if (originTile.container === targetTile.container) {
        return originTile.container
      } else if (invalidate.prop(this.prcPathProperty) > 0.5) {
        return targetTile.container
      } else {
        return originTile.container
      }
    }
  },
  x: {
    calcul: function (invalidate) {
      var startPos
      startPos = invalidate.prop(this.startPosProperty)
      return (invalidate.prop(this.targetPosProperty).x - startPos.x) * invalidate.prop(this.prcPathProperty) + startPos.x
    }
  },
  y: {
    calcul: function (invalidate) {
      var startPos
      startPos = invalidate.prop(this.startPosProperty)
      return (invalidate.prop(this.targetPosProperty).y - startPos.y) * invalidate.prop(this.prcPathProperty) + startPos.y
    }
  },
  startPos: {
    calcul: function (invalidate) {
      var container, dist, offset, originTile
      originTile = invalidate.prop(this.originTileProperty)
      container = invalidate.prop(this.containerProperty)
      offset = this.startOffset
      if (originTile.container !== container) {
        dist = container.dist(originTile.container)
        offset.x += dist.x
        offset.y += dist.y
      }
      return {
        x: originTile.x + offset.x,
        y: originTile.y + offset.y
      }
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  },
  targetPos: {
    calcul: function (invalidate) {
      var container, dist, offset, targetTile
      targetTile = invalidate.prop(this.targetTileProperty)
      container = invalidate.prop(this.containerProperty)
      offset = this.targetOffset
      if (targetTile.container !== container) {
        dist = container.dist(targetTile.container)
        offset.x += dist.x
        offset.y += dist.y
      }
      return {
        x: targetTile.x + offset.x,
        y: targetTile.y + offset.y
      }
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  },
  startOffset: {
    default: {
      x: 0.5,
      y: 0.5
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  },
  targetOffset: {
    default: {
      x: 0.5,
      y: 0.5
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  },
  prcPath: {
    calcul: function () {
      var ref
      return ((ref = this.pathTimeout) != null ? ref.prc : null) || 0
    }
  },
  timing: {
    calcul: function () {
      return new Timing()
    }
  },
  moving: {
    default: false
  }
})

module.exports = Projectile

},{"parallelio-timing":128,"spark-starter":185}],48:[function(require,module,exports){
const Element = require('spark-starter').Element

class Ressource extends Element {
  partialChange (qte) {
    var acceptable
    acceptable = Math.max(this.minQte, Math.min(this.maxQte, qte))
    this.qte = acceptable
    return qte - acceptable
  }
};

Ressource.properties({
  type: {
    default: null
  },
  qte: {
    default: 0,
    ingest: function (qte) {
      if (this.maxQte !== null && qte > this.maxQte) {
        throw new Error('Cant have more than ' + this.maxQte + ' of ' + this.type.name)
      }
      if (this.minQte !== null && qte < this.minQte) {
        throw new Error('Cant have less than ' + this.minQte + ' of ' + this.type.name)
      }
      return qte
    }
  },
  maxQte: {
    default: null
  },
  minQte: {
    default: 0
  }
})

module.exports = Ressource

},{"spark-starter":185}],49:[function(require,module,exports){
const Element = require('spark-starter').Element
const Ressource = require('./Ressource')

class RessourceType extends Element {
  initRessource (opt) {
    if (typeof opt !== 'object') {
      opt = {
        qte: opt
      }
    }
    opt = Object.assign({}, this.defaultOptions, opt)
    const RessourceClass = this.ressourceClass
    return new RessourceClass(opt)
  }
};

RessourceType.properties({
  name: {
    default: null
  },
  ressourceClass: {
    default: Ressource
  },
  defaultOptions: {
    default: {}
  }
})

module.exports = RessourceType

},{"./Ressource":48,"spark-starter":185}],50:[function(require,module,exports){
const Element = require('spark-starter').Element
const Travel = require('./Travel')
const TravelAction = require('./actions/TravelAction')
const ActionProvider = require('./actions/ActionProvider')
const ShipInterior = require('./ShipInterior')

class Ship extends Element {
  travelTo (location) {
    var travel
    travel = new Travel({
      traveller: this,
      startLocation: this.location,
      targetLocation: location
    })
    if (travel.valid) {
      travel.start()
      this.travel = travel
    }
  }
};

Ship.properties({
  location: {
    default: null
  },
  travel: {
    default: null
  },
  interrior: {
    calcul: function () {
      return new ShipInterior({ ship: this })
    }
  },
  actionProvider: {
    calcul: function () {
      const provider = new ActionProvider({
        owner: this
      })
      provider.actionsMembers.add(new TravelAction({
        actor: this
      }))
      return provider
    }
  },
  spaceCoodinate: {
    calcul: function (invalidator) {
      if (invalidator.prop(this.travelProperty)) {
        return invalidator.propPath('travel.spaceCoodinate')
      } else {
        return {
          x: invalidator.propPath('location.x'),
          y: invalidator.propPath('location.y')
        }
      }
    }
  }
})

module.exports = Ship

},{"./ShipInterior":51,"./Travel":54,"./actions/ActionProvider":58,"./actions/TravelAction":64,"spark-starter":185}],51:[function(require,module,exports){
const TileContainer = require('parallelio-tiles').TileContainer
const ShipInteriorGenerator = require('./generators/ShipInteriorGenerator')

class ShipInterior extends TileContainer {
  setDefaults () {
    if (!(this.tiles.length > 0)) {
      this.generate()
    }
    if (this.game.mainTileContainer == null) {
      this.game.mainTileContainer = this
    }
  }

  generate (generator) {
    generator = generator || new ShipInteriorGenerator()
    generator.shipInterior = this
    generator.generate()
  }
}

ShipInterior.properties({
  x: {
    composed: true,
    default: 0
  },
  y: {
    composed: true,
    default: 0
  },
  container: {},
  ship: {},
  game: {
    change: function (val, old) {
      if (val) {
        return this.setDefaults()
      }
    }
  },
  airlocks: {
    collection: true,
    calcul: function () {
      return this.allTiles().filter((t) => typeof t.attachTo === 'function')
    }
  }
})

module.exports = ShipInterior

},{"./generators/ShipInteriorGenerator":68,"parallelio-tiles":118}],52:[function(require,module,exports){
const Tiled = require('parallelio-tiles').Tiled
const Timing = require('parallelio-timing')
const Damageable = require('./Damageable')
const Projectile = require('./Projectile')

class ShipWeapon extends Tiled {
  fire () {
    var projectile
    if (this.canFire) {
      const ProjectileClass = this.projectileClass
      projectile = new ProjectileClass({
        origin: this,
        target: this.target,
        power: this.power,
        blastRange: this.blastRange,
        propagationType: this.propagationType,
        speed: this.projectileSpeed,
        timing: this.timing
      })
      projectile.launch()
      this.charged = false
      this.recharge()
      return projectile
    }
  }

  recharge () {
    this.charging = true
    this.chargeTimeout = this.timing.setTimeout(() => {
      this.charging = false
      return this.recharged()
    }, this.rechargeTime)
  }

  recharged () {
    this.charged = true
    if (this.autoFire) {
      return this.fire()
    }
  }
};

ShipWeapon.extend(Damageable)

ShipWeapon.properties({
  rechargeTime: {
    default: 1000
  },
  power: {
    default: 10
  },
  blastRange: {
    default: 1
  },
  propagationType: {
    default: null
  },
  projectileSpeed: {
    default: 10
  },
  target: {
    default: null,
    change: function () {
      if (this.autoFire) {
        return this.fire()
      }
    }
  },
  charged: {
    default: true
  },
  charging: {
    default: true
  },
  enabled: {
    default: true
  },
  autoFire: {
    default: true
  },
  criticalHealth: {
    default: 0.3
  },
  canFire: {
    get: function () {
      return this.target && this.enabled && this.charged && this.health / this.maxHealth >= this.criticalHealth
    }
  },
  timing: {
    calcul: function () {
      return new Timing()
    }
  },
  projectileClass: {
    default: Projectile
  }
})

module.exports = ShipWeapon

},{"./Damageable":34,"./Projectile":47,"parallelio-tiles":118,"parallelio-timing":128}],53:[function(require,module,exports){
const Element = require('spark-starter').Element

class StarSystem extends Element {
  constructor (data) {
    super(data)
    this.init()
  }

  init () {}

  linkTo (star) {
    if (!this.links.findStar(star)) {
      return this.addLink(new this.constructor.Link(this, star))
    }
  }

  addLink (link) {
    this.links.add(link)
    link.otherStar(this).links.add(link)
    return link
  }

  dist (x, y) {
    var xDist, yDist
    xDist = this.x - x
    yDist = this.y - y
    return Math.sqrt((xDist * xDist) + (yDist * yDist))
  }

  isSelectableBy (player) {
    return true
  }
};

StarSystem.properties({
  x: {},
  y: {},
  name: {},
  links: {
    collection: {
      findStar: function (star) {
        return this.find(function (link) {
          return link.star2 === star || link.star1 === star
        })
      }
    }
  }
})

StarSystem.collenctionFn = {
  closest: function (x, y) {
    var min, minDist
    min = null
    minDist = null
    this.forEach(function (star) {
      var dist
      dist = star.dist(x, y)
      if ((min == null) || minDist > dist) {
        min = star
        minDist = dist
      }
    })
    return min
  },
  closests: function (x, y) {
    var dists
    dists = this.map(function (star) {
      return {
        dist: star.dist(x, y),
        star: star
      }
    })
    dists.sort(function (a, b) {
      return a.dist - b.dist
    })
    return this.copy(dists.map(function (dist) {
      return dist.star
    }))
  }
}

module.exports = StarSystem

StarSystem.Link = class Link extends Element {
  constructor (star1, star2) {
    super()
    this.star1 = star1
    this.star2 = star2
  }

  remove () {
    this.star1.links.remove(this)
    return this.star2.links.remove(this)
  }

  otherStar (star) {
    if (star === this.star1) {
      return this.star2
    } else {
      return this.star1
    }
  }

  getLength () {
    return this.star1.dist(this.star2.x, this.star2.y)
  }

  inBoundaryBox (x, y, padding = 0) {
    var x1, x2, y1, y2
    x1 = Math.min(this.star1.x, this.star2.x) - padding
    y1 = Math.min(this.star1.y, this.star2.y) - padding
    x2 = Math.max(this.star1.x, this.star2.x) + padding
    y2 = Math.max(this.star1.y, this.star2.y) + padding
    return x >= x1 && x <= x2 && y >= y1 && y <= y2
  }

  closeToPoint (x, y, minDist) {
    var a, abcAngle, abxAngle, acDist, acxAngle, b, c, cdDist, xAbDist, xAcDist, yAbDist, yAcDist
    if (!this.inBoundaryBox(x, y, minDist)) {
      return false
    }
    a = this.star1
    b = this.star2
    c = {
      x: x,
      y: y
    }
    xAbDist = b.x - a.x
    yAbDist = b.y - a.y
    abxAngle = Math.atan(yAbDist / xAbDist)
    xAcDist = c.x - a.x
    yAcDist = c.y - a.y
    acDist = Math.sqrt((xAcDist * xAcDist) + (yAcDist * yAcDist))
    acxAngle = Math.atan(yAcDist / xAcDist)
    abcAngle = abxAngle - acxAngle
    cdDist = Math.abs(Math.sin(abcAngle) * acDist)
    return cdDist <= minDist
  }

  intersectLink (link) {
    var s, s1x, s1y, s2x, s2y, t, x1, x2, x3, x4, y1, y2, y3, y4
    x1 = this.star1.x
    y1 = this.star1.y
    x2 = this.star2.x
    y2 = this.star2.y
    x3 = link.star1.x
    y3 = link.star1.y
    x4 = link.star2.x
    y4 = link.star2.y
    s1x = x2 - x1
    s1y = y2 - y1
    s2x = x4 - x3
    s2y = y4 - y3
    s = (-s1y * (x1 - x3) + s1x * (y1 - y3)) / (-s2x * s1y + s1x * s2y)
    t = (s2x * (y1 - y3) - s2y * (x1 - x3)) / (-s2x * s1y + s1x * s2y)
    return s > 0 && s < 1 && t > 0 && t < 1
  }
}

},{"spark-starter":185}],54:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')

class Travel extends Element {
  start (location) {
    if (this.valid) {
      this.moving = true
      this.traveller.travel = this
      this.pathTimeout = this.timing.setTimeout(() => {
        this.traveller.location = this.targetLocation
        this.traveller.travel = null
        this.moving = false
      }, this.duration)
    }
  }
};

Travel.properties({
  traveller: {
    default: null
  },
  startLocation: {
    default: null
  },
  targetLocation: {
    default: null
  },
  currentSection: {
    calcul: function () {
      return this.startLocation.links.findStar(this.targetLocation)
    }
  },
  duration: {
    default: 1000
  },
  moving: {
    default: false
  },
  valid: {
    calcul: function () {
      var ref, ref1
      if (this.targetLocation === this.startLocation) {
        return false
      }
      if ((((ref = this.targetLocation) != null ? ref.links : null) != null) && (((ref1 = this.startLocation) != null ? ref1.links : null) != null)) {
        return this.currentSection != null
      }
    }
  },
  timing: {
    calcul: function () {
      return new Timing()
    }
  },
  spaceCoodinate: {
    calcul: function (invalidator) {
      var endX, endY, prc, startX, startY
      startX = invalidator.propPath('startLocation.x')
      startY = invalidator.propPath('startLocation.y')
      endX = invalidator.propPath('targetLocation.x')
      endY = invalidator.propPath('targetLocation.y')
      prc = invalidator.propPath('pathTimeout.prc')
      return {
        x: (startX - endX) * prc + endX,
        y: (startY - endY) * prc + endY
      }
    }
  }
})

module.exports = Travel

},{"parallelio-timing":128,"spark-starter":185}],55:[function(require,module,exports){
const Element = require('spark-starter').Element
const Grid = require('parallelio-grids').Grid

class View extends Element {
  setDefaults () {
    var ref
    if (!this.bounds) {
      this.grid = this.grid || ((ref = this.game.mainViewProperty.value) != null ? ref.grid : null) || new Grid()
      this.bounds = this.grid.addCell()
    }
  }

  destroy () {
    this.game = null
  }
};

View.properties({
  game: {
    change: function (val, old) {
      if (this.game) {
        this.game.views.add(this)
        this.setDefaults()
      }
      if (old) {
        return old.views.remove(this)
      }
    }
  },
  x: {
    default: 0
  },
  y: {
    default: 0
  },
  grid: {
    default: null
  },
  bounds: {
    default: null
  }
})

module.exports = View

},{"parallelio-grids":78,"spark-starter":185}],56:[function(require,module,exports){
const LineOfSight = require('./LineOfSight')
const Direction = require('parallelio-tiles').Direction
const TileContainer = require('parallelio-tiles').TileContainer
const TileReference = require('parallelio-tiles').TileReference

class VisionCalculator {
  constructor (originTile, offset = {
    x: 0.5,
    y: 0.5
  }) {
    this.originTile = originTile
    this.offset = offset
    this.pts = {}
    this.visibility = {}
    this.stack = []
    this.calculated = false
  }

  calcul () {
    this.init()
    while (this.stack.length) {
      this.step()
    }
    this.calculated = true
  }

  init () {
    var firstBatch, initialPts
    this.pts = {}
    this.visibility = {}
    initialPts = [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }]
    initialPts.forEach((pt) => {
      return this.setPt(this.originTile.x + pt.x, this.originTile.y + pt.y, true)
    })
    firstBatch = [
      { x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }, { x: -1, y: 2 },
      { x: 2, y: -1 }, { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 },
      { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: 0, y: 2 }, { x: 1, y: 2 }
    ]
    this.stack = firstBatch.map((pt) => {
      return {
        x: this.originTile.x + pt.x,
        y: this.originTile.y + pt.y
      }
    })
  }

  setPt (x, y, val) {
    var adjancent
    this.pts[x + ':' + y] = val
    adjancent = [
      {
        x: 0,
        y: 0
      },
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: -1
      },
      {
        x: -1,
        y: -1
      }
    ]
    return adjancent.forEach((pt) => {
      return this.addVisibility(x + pt.x, y + pt.y, val ? 1 / adjancent.length : 0)
    })
  }

  getPt (x, y) {
    return this.pts[x + ':' + y]
  }

  addVisibility (x, y, val) {
    if (this.visibility[x] == null) {
      this.visibility[x] = {}
    }
    if (this.visibility[x][y] != null) {
      this.visibility[x][y] += val
    } else {
      this.visibility[x][y] = val
    }
    return this
  }

  getVisibility (x, y) {
    if ((this.visibility[x] == null) || (this.visibility[x][y] == null)) {
      return 0
    } else {
      return this.visibility[x][y]
    }
  }

  canProcess (x, y) {
    return !this.stack.some((pt) => {
      return pt.x === x && pt.y === y
    }) && (this.getPt(x, y) == null)
  }

  step () {
    var los, pt
    pt = this.stack.shift()
    los = new LineOfSight(this.originTile.container, this.originTile.x + this.offset.x, this.originTile.y + this.offset.y, pt.x, pt.y)
    los.reverseTracing()
    los.traversableCallback = (tile, entryX, entryY) => {
      if (tile != null) {
        if (this.getVisibility(tile.x, tile.y) === 1) {
          return los.forceSuccess()
        } else {
          return tile.transparent
        }
      }
    }
    this.setPt(pt.x, pt.y, los.getSuccess())
    if (los.getSuccess()) {
      return Direction.all.forEach((direction) => {
        var nextPt
        nextPt = {
          x: pt.x + direction.x,
          y: pt.y + direction.y
        }
        if (this.canProcess(nextPt.x, nextPt.y)) {
          return this.stack.push(nextPt)
        }
      })
    }
  }

  getBounds () {
    var boundaries, col, ref, x, y
    boundaries = {
      top: null,
      left: null,
      bottom: null,
      right: null
    }
    ref = this.visibility
    for (x in ref) {
      col = ref[x]
      for (y in col) {
        if ((boundaries.top == null) || y < boundaries.top) {
          boundaries.top = y
        }
        if ((boundaries.left == null) || x < boundaries.left) {
          boundaries.left = x
        }
        if ((boundaries.bottom == null) || y > boundaries.bottom) {
          boundaries.bottom = y
        }
        if ((boundaries.right == null) || x > boundaries.right) {
          boundaries.right = x
        }
      }
    }
    return boundaries
  }

  /**
   * @returns {TileContainer}
   */
  toContainer () {
    var col, ref, tile, val, x, y
    const res = new TileContainer()
    res.owner = false
    ref = this.visibility
    for (x in ref) {
      col = ref[x]
      for (y in col) {
        val = col[y]
        tile = this.originTile.container.getTile(x, y)
        if (val !== 0 && (tile != null)) {
          tile = new TileReference(tile)
          tile.visibility = val
          res.addTile(tile)
        }
      }
    }
    return res
  }

  toMap () {
    var i, j, ref, ref1, ref2, ref3, res, x, y
    res = Object.assign({
      map: []
    }, this.getBounds())
    for (y = i = ref = res.top, ref1 = res.bottom - 1; (ref <= ref1 ? i <= ref1 : i >= ref1); y = ref <= ref1 ? ++i : --i) {
      res.map[y - res.top] = []
      for (x = j = ref2 = res.left, ref3 = res.right - 1; (ref2 <= ref3 ? j <= ref3 : j >= ref3); x = ref2 <= ref3 ? ++j : --j) {
        res.map[y - res.top][x - res.left] = this.getVisibility(x, y)
      }
    }
    return res
  }
}

module.exports = VisionCalculator

},{"./LineOfSight":41,"parallelio-tiles":118}],57:[function(require,module,exports){
const Element = require('spark-starter').Element
const EventEmitter = require('events')

class Action extends Element {
  withActor (actor) {
    if (this.actor !== actor) {
      return this.copyWith({
        actor: actor
      })
    } else {
      return this
    }
  }

  copyWith (options) {
    return new this.constructor(Object.assign({
      base: this.baseOrThis()
    }, this.propertiesManager.getManualDataProperties(), options))
  }

  baseOrThis () {
    return this.base || this
  }

  start () {
    this.actor.currentAction = this
    return this.execute()
  }

  validActor () {
    return this.actor != null
  }

  isReady () {
    return this.validActor()
  }

  finish () {
    this.emit('finished')
    return this.end()
  }

  interrupt () {
    this.emit('interrupted')
    return this.end()
  }

  end () {
    if (this.actor.currentAction === this) {
      this.actor.currentAction = null
    }
    this.emit('end')
    return this.destroy()
  }

  destroy () {
    return this.propertiesManager.destroy()
  }
};

Action.include(EventEmitter.prototype)

Action.properties({
  actor: {},
  base: {}
})

module.exports = Action

},{"events":24,"spark-starter":185}],58:[function(require,module,exports){
const Element = require('spark-starter').Element

class ActionProvider extends Element {};

ActionProvider.properties({
  actions: {
    collection: true,
    composed: true
  },
  owner: {}
})

module.exports = ActionProvider

},{"spark-starter":185}],59:[function(require,module,exports){
const WalkAction = require('./WalkAction')
const TargetAction = require('./TargetAction')
const EventBind = require('spark-starter').EventBind
const PropertyWatcher = require('spark-starter').watchers.PropertyWatcher

class AttackAction extends TargetAction {
  validTarget () {
    return this.targetIsAttackable() && (this.canUseWeapon() || this.canWalkToTarget())
  }

  targetIsAttackable () {
    return this.target.damageable && this.target.health > 0
  }

  canMelee () {
    return Math.abs(this.target.tile.x - this.actor.tile.x) + Math.abs(this.target.tile.y - this.actor.tile.y) === 1
  }

  canUseWeapon () {
    return this.bestUsableWeapon != null
  }

  canUseWeaponAt (tile) {
    var ref
    return ((ref = this.actor.weapons) != null ? ref.length : null) && this.actor.weapons.find((weapon) => {
      return weapon.canUseFrom(tile, this.target)
    })
  }

  canWalkToTarget () {
    return this.walkAction.isReady()
  }

  useWeapon () {
    this.bestUsableWeapon.useOn(this.target)
    return this.finish()
  }

  execute () {
    if (this.actor.walk != null) {
      this.actor.walk.interrupt()
    }
    if (this.bestUsableWeapon != null) {
      if (this.bestUsableWeapon.charged) {
        return this.useWeapon()
      } else {
        return this.weaponChargeWatcher.bind()
      }
    } else {
      this.walkAction.on('finished', () => {
        this.interruptBinder.unbind()
        this.walkAction.destroy()
        this.walkActionProperty.invalidate()
        if (this.isReady()) {
          return this.start()
        }
      })
      this.interruptBinder.bindTo(this.walkAction)
      return this.walkAction.execute()
    }
  }
};

AttackAction.properties({
  walkAction: {
    calcul: function () {
      var walkAction
      walkAction = new WalkAction({
        actor: this.actor,
        target: this.target.tile,
        parent: this.parent
      })
      walkAction.pathFinder.arrivedCallback = (step) => {
        return this.canUseWeaponAt(step.tile)
      }
      return walkAction
    }
  },
  bestUsableWeapon: {
    calcul: function (invalidator) {
      var ref, usableWeapons
      invalidator.propPath('actor.tile')
      if ((ref = this.actor.weapons) != null ? ref.length : null) {
        usableWeapons = this.actor.weapons.filter((weapon) => {
          return weapon.canUseOn(this.target)
        })
        usableWeapons.sort((a, b) => {
          return b.dps - a.dps
        })
        return usableWeapons[0]
      } else {
        return null
      }
    }
  },
  interruptBinder: {
    calcul: function () {
      return new EventBind('interrupted', null, () => {
        return this.interrupt()
      })
    },
    destroy: true
  },
  weaponChargeWatcher: {
    calcul: function () {
      return new PropertyWatcher({
        callback: () => {
          if (this.bestUsableWeapon.charged) {
            return this.useWeapon()
          }
        },
        property: this.bestUsableWeapon.propertiesManager.getProperty('charged')
      })
    },
    destroy: true
  }
})

module.exports = AttackAction

},{"./TargetAction":62,"./WalkAction":65,"spark-starter":185}],60:[function(require,module,exports){
const WalkAction = require('./WalkAction')
const AttackAction = require('./AttackAction')
const TargetAction = require('./TargetAction')
const PathFinder = require('parallelio-pathfinder')
const LineOfSight = require('../LineOfSight')
const PropertyWatcher = require('spark-starter').watchers.PropertyWatcher
const EventBind = require('spark-starter').EventBind

class AttackMoveAction extends TargetAction {
  isEnemy (elem) {
    var ref
    return (ref = this.actor.owner) != null ? typeof ref.isEnemy === 'function' ? ref.isEnemy(elem) : null : null
  }

  validTarget () {
    return this.walkAction.validTarget()
  }

  testEnemySpotted () {
    this.enemySpottedProperty.invalidate()
    if (this.enemySpotted) {
      this.attackAction = new AttackAction({
        actor: this.actor,
        target: this.enemySpotted
      })
      if (!this.attackAction.isReady()) {
        return null
      }
      this.attackAction.on('finished', () => {
        if (this.isReady()) {
          return this.execute()
        }
      })
      this.interruptBinder.bindTo(this.attackAction)
      this.walkAction.interrupt()
      this.walkActionProperty.invalidate()
      return this.attackAction.execute()
    }
  }

  execute () {
    if (!this.testEnemySpotted()) {
      this.walkAction.on('finished', () => {
        return this.finish()
      })
      this.interruptBinder.bindTo(this.walkAction)
      this.tileWatcher.bind()
      return this.walkAction.execute()
    }
  }
};

AttackMoveAction.properties({
  walkAction: {
    calcul: function () {
      var walkAction
      walkAction = new WalkAction({
        actor: this.actor,
        target: this.target,
        parent: this.parent
      })
      return walkAction
    }
  },
  enemySpotted: {
    calcul: function () {
      var ref
      this.path = new PathFinder(this.actor.tile.container, this.actor.tile, false, {
        validTile: (tile) => {
          return tile.transparent && (new LineOfSight(this.actor.tile.container, this.actor.tile.x, this.actor.tile.y, tile.x, tile.y)).getSuccess()
        },
        arrived: (step) => {
          step.enemy = step.tile.children.find((c) => {
            return this.isEnemy(c)
          })
          return step.enemy
        },
        efficiency: (tile) => {}
      })
      this.path.calcul()
      return (ref = this.path.solution) != null ? ref.enemy : null
    }
  },
  tileWatcher: {
    calcul: function () {
      return new PropertyWatcher({
        callback: () => {
          return this.testEnemySpotted()
        },
        property: this.actor.propertiesManager.getProperty('tile')
      })
    },
    destroy: true
  },
  interruptBinder: {
    calcul: function () {
      return new EventBind('interrupted', null, () => {
        return this.interrupt()
      })
    },
    destroy: true
  }
})

module.exports = AttackMoveAction

},{"../LineOfSight":41,"./AttackAction":59,"./TargetAction":62,"./WalkAction":65,"parallelio-pathfinder":99,"spark-starter":185}],61:[function(require,module,exports){
const ActionProvider = require('./ActionProvider')

class SimpleActionProvider extends ActionProvider {};

SimpleActionProvider.properties({
  actions: {
    calcul: function () {
      var actions
      actions = this.actionOptions || this.constructor.actions || []
      if (typeof actions === 'object') {
        actions = Object.keys(actions).map(function (key) {
          return actions[key]
        })
      }
      return actions.map((action) => {
        if (typeof action.withTarget === 'function') {
          return action.withTarget(this)
        } else if (typeof action === 'function') {
          const ActionClass = action
          return new ActionClass({
            target: this
          })
        } else {
          return action
        }
      })
    }
  }
})

module.exports = SimpleActionProvider

},{"./ActionProvider":58}],62:[function(require,module,exports){
const Action = require('./Action')

class TargetAction extends Action {
  withTarget (target) {
    if (this.target !== target) {
      return this.copyWith({
        target: target
      })
    } else {
      return this
    }
  }

  canTarget (target) {
    var instance
    instance = this.withTarget(target)
    if (instance.validTarget()) {
      return instance
    }
  }

  validTarget () {
    return this.target != null
  }

  isReady () {
    return super.isReady() && this.validTarget()
  }
};

TargetAction.properties({
  target: {}
})

module.exports = TargetAction

},{"./Action":57}],63:[function(require,module,exports){
const ActionProvider = require('./ActionProvider')

class TiledActionProvider extends ActionProvider {
  validActionTile (tile) {
    return tile != null
  }

  prepareActionTile (tile) {
    if (!tile.actionProvider) {
      tile.actionProvider = new ActionProvider({
        owner: tile
      })
    }
  }
};

TiledActionProvider.properties({
  originTile: {
    calcul: function (invalidator) {
      return invalidator.propPath('owner.tile')
    }
  },
  actionTiles: {
    collection: true,
    calcul: function (invalidator) {
      var myTile
      myTile = invalidator.prop(this.originTileProperty)
      if (myTile) {
        return this.actionTilesCoord.map((coord) => {
          return myTile.getRelativeTile(coord.x, coord.y)
        }).filter((tile) => {
          return this.validActionTile(tile)
        })
      } else {
        return []
      }
    },
    itemAdded: function (tile) {
      this.prepareActionTile(tile)
      return tile.actionProvider.actionsMembers.addProperty(this.actionsProperty)
    },
    itemRemoved: function (tile) {
      return tile.actionProvider.actionsMembers.removeProperty(this.actionsProperty)
    }
  }
})

TiledActionProvider.prototype.actionTilesCoord = [
  {
    x: 0,
    y: -1
  },
  {
    x: -1,
    y: 0
  },
  {
    x: 0,
    y: 0
  },
  {
    x: +1,
    y: 0
  },
  {
    x: 0,
    y: +1
  }
]

module.exports = TiledActionProvider

},{"./ActionProvider":58}],64:[function(require,module,exports){
const TargetAction = require('./TargetAction')
const Travel = require('../Travel')

class TravelAction extends TargetAction {
  validTarget () {
    return this.travel.valid
  }

  execute () {
    return this.travel.start()
  }
};

TravelAction.properties({
  travel: {
    calcul: function () {
      return new Travel({
        traveller: this.actor,
        startLocation: this.actor.location,
        targetLocation: this.target
      })
    }
  }
})

module.exports = TravelAction

},{"../Travel":54,"./TargetAction":62}],65:[function(require,module,exports){
const PathFinder = require('parallelio-pathfinder')
const PathWalk = require('../PathWalk')
const TargetAction = require('./TargetAction')

class WalkAction extends TargetAction {
  execute () {
    if (this.actor.walk != null) {
      this.actor.walk.interrupt()
    }
    this.walk = this.actor.walk = new PathWalk(this.actor, this.pathFinder)
    this.actor.walk.on('finished', () => {
      return this.finish()
    })
    this.actor.walk.on('interrupted', () => {
      return this.interrupt()
    })
    return this.actor.walk.start()
  }

  destroy () {
    super.destroy()
    if (this.walk) {
      return this.walk.destroy()
    }
  }

  validTarget () {
    if (!this.target) {
      return false
    }
    this.pathFinder.calcul()
    return this.pathFinder.solution != null
  }
};

WalkAction.properties({
  pathFinder: {
    calcul: function () {
      return new PathFinder(this.actor.tile.container, this.actor.tile, this.target, {
        validTile: (tile) => {
          if (typeof this.actor.canGoOnTile === 'function') {
            return this.actor.canGoOnTile(tile)
          } else {
            return tile.walkable
          }
        }
      })
    }
  }
})

module.exports = WalkAction

},{"../PathWalk":44,"./TargetAction":62,"parallelio-pathfinder":99}],66:[function(require,module,exports){
const Element = require('spark-starter').Element
const TileContainer = require('parallelio-tiles').TileContainer
const Tile = require('parallelio-tiles').Tile
const Direction = require('parallelio-tiles').Direction
const Airlock = require('../Airlock')
const Floor = require('../Floor')

class AirlockGenerator extends Element {
  generate () {
    const pos = this.getPos()
    this.structure.allTiles().map((tile) => {
      tile = tile.copyAndRotate(this.direction.angle)
      tile.x += pos.x
      tile.y += pos.y
      this.tileContainer.removeTileAt(tile.x, tile.y)
      this.tileContainer.addTile(tile)
    })
  }

  getPos () {
    const direction = this.direction
    const boundaries = this.tileContainer.boundaries
    let i = 0
    while (i < 20) {
      const x = this.getAxisPos(direction.x, boundaries.left, boundaries.right)
      const y = this.getAxisPos(direction.y, boundaries.top, boundaries.bottom)
      const tileToTest = this.tileContainer.getTile(x + direction.getInverse().x, y + direction.getInverse().y)
      if (tileToTest && tileToTest.walkable) {
        return { x: x, y: y }
      }
      i++
    }
  }

  getAxisPos (mode, min, max) {
    if (mode === 0) {
      return Math.floor(this.rng() * (max - min)) + min
    } else if (mode === 1) {
      return max
    } else {
      return min
    }
  }

  airlockFactory (opt) {
    opt.direction = Direction.up
    return new Airlock(opt)
  }
}

AirlockGenerator.properties({
  tileContainer: {},
  direction: {
    default: Direction.up
  },
  rng: {
    default: Math.random
  },
  wallFactory: {
    calcul: function () {
      return this.parent ? this.parent.wallFactory : function (opt) {
        return new Tile(opt)
      }
    }
  },
  floorFactory: {
    calcul: function () {
      return this.parent ? this.parent.wallFactory : function (opt) {
        return new Floor(opt)
      }
    }
  },
  structure: {
    calcul: function () {
      const tiles = new TileContainer()
      const w = this.wallFactory
      const f = this.floorFactory
      const a = this.airlockFactory.bind(this)
      tiles.loadMatrix([
        [w, a, w],
        [w, f, w]
      ], { x: -1, y: -1 })
      return tiles
    }
  }
})

module.exports = AirlockGenerator

},{"../Airlock":27,"../Floor":38,"parallelio-tiles":118,"spark-starter":185}],67:[function(require,module,exports){
var indexOf = [].indexOf
const Element = require('spark-starter').Element
const TileContainer = require('parallelio-tiles').TileContainer
const Tile = require('parallelio-tiles').Tile
const Direction = require('parallelio-tiles').Direction
const Door = require('../Door')

class RoomGenerator extends Element {
  initTiles () {
    this.finalTiles = null
    this.rooms = []
    this.free = this.plan.allTiles().filter((tile) => {
      return !Direction.all.some((direction) => {
        return this.plan.getTile(tile.x + direction.x, tile.y + direction.y) == null
      })
    })
  }

  generate () {
    this.getTiles().forEach((tile) => {
      this.tileContainer.addTile(tile)
    })
  }

  calcul () {
    this.initTiles()
    while (this.step() || this.newRoom()) {}
    this.createDoors()
    this.makeFinalTiles()
  }

  floorFactory (opt) {
    return new Tile(opt.x, opt.y)
  }

  doorFactory (opt) {
    return this.floorFactory(opt)
  }

  makeFinalTiles () {
    this.finalTiles = this.plan.allTiles().map((tile) => {
      var opt
      if (tile.factory != null) {
        opt = {
          x: tile.x,
          y: tile.y
        }
        if (tile.factoryOptions != null) {
          opt = Object.assign(opt, tile.factoryOptions)
        }
        return tile.factory(opt)
      }
    }).filter((tile) => {
      return tile != null
    })
  }

  getTiles () {
    if (this.finalTiles == null) {
      this.calcul()
    }
    return this.finalTiles
  }

  newRoom () {
    if (this.free.length) {
      this.volume = Math.floor(this.rng() * (this.maxVolume - this.minVolume)) + this.minVolume
      this.room = new RoomGenerator.Room()
      return this.room
    }
  }

  randomDirections () {
    var i, j, o, x
    o = Direction.adjacents.slice()
    j = null
    x = null
    i = o.length
    while (i) {
      j = Math.floor(this.rng() * i)
      x = o[--i]
      o[i] = o[j]
      o[j] = x
    }
    return o
  }

  step () {
    var success, tries
    if (this.room) {
      if (this.free.length && this.room.tiles.length < this.volume - 1) {
        if (this.room.tiles.length) {
          tries = this.randomDirections()
          success = false
          while (tries.length && !success) {
            success = this.expand(this.room, tries.pop(), this.volume)
          }
          if (!success) {
            this.roomDone()
          }
          return success
        } else {
          this.allocateTile(this.randomFreeTile(), this.room)
          return true
        }
      } else {
        this.roomDone()
        return false
      }
    }
  }

  roomDone () {
    this.rooms.push(this.room)
    this.allocateWalls(this.room)
    this.room = null
  }

  expand (room, direction, max = 0) {
    return room.tiles.slice().reduce((success, tile) => {
      if (max === 0 || room.tiles.length < max) {
        const next = this.tileOffsetIsFree(tile, direction)
        if (next) {
          this.allocateTile(next, room)
          success = true
          const second = this.tileOffsetIsFree(tile, direction, 2)
          if (second && !this.tileOffsetIsFree(tile, direction, 3)) {
            this.allocateTile(second, room)
          }
        }
      }
      return success
    }, false)
  }

  allocateWalls (room) {
    var direction, k, len, next, nextRoom, otherSide, ref, results, tile
    ref = room.tiles
    results = []
    for (k = 0, len = ref.length; k < len; k++) {
      tile = ref[k]
      results.push(function () {
        var l, len1, ref1, results1
        ref1 = Direction.all
        results1 = []
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          direction = ref1[l]
          next = this.plan.getTile(tile.x + direction.x, tile.y + direction.y)
          if ((next != null) && next.room !== room) {
            if (indexOf.call(Direction.corners, direction) < 0) {
              otherSide = this.plan.getTile(tile.x + direction.x * 2, tile.y + direction.y * 2)
              nextRoom = (otherSide != null ? otherSide.room : null) != null ? otherSide.room : null
              room.addWall(next, nextRoom)
              if (nextRoom != null) {
                nextRoom.addWall(next, room)
              }
            }
            if (this.wallFactory) {
              next.factory = (opt) => {
                return this.wallFactory(opt)
              }
              next.factory.base = this.wallFactory
            }
            results1.push(this.allocateTile(next))
          } else {
            results1.push(null)
          }
        }
        return results1
      }.call(this))
    }
    return results
  }

  createDoors () {
    var adjacent, door, k, len, ref, results, room, walls
    ref = this.rooms
    results = []
    for (k = 0, len = ref.length; k < len; k++) {
      room = ref[k]
      results.push(function () {
        var l, len1, ref1, results1
        ref1 = room.wallsByRooms()
        results1 = []
        for (l = 0, len1 = ref1.length; l < len1; l++) {
          walls = ref1[l]
          if ((walls.room != null) && room.doorsForRoom(walls.room) < 1) {
            door = walls.tiles[Math.floor(this.rng() * walls.tiles.length)]
            door.factory = (opt) => {
              return this.doorFactory(opt)
            }
            door.factory.base = this.doorFactory
            adjacent = this.plan.getTile(door.x + 1, door.y)
            door.factoryOptions = {
              direction: adjacent.factory && adjacent.factory.base === this.floorFactory ? Door.directions.vertical : Door.directions.horizontal
            }
            room.addDoor(door, walls.room)
            results1.push(walls.room.addDoor(door, room))
          } else {
            results1.push(null)
          }
        }
        return results1
      }.call(this))
    }
    return results
  }

  allocateTile (tile, room = null) {
    var index
    if (room != null) {
      room.addTile(tile)
      tile.factory = (opt) => {
        return this.floorFactory(opt)
      }
      tile.factory.base = this.floorFactory
    }
    index = this.free.indexOf(tile)
    if (index > -1) {
      return this.free.splice(index, 1)
    }
  }

  tileOffsetIsFree (tile, direction, multiply = 1) {
    return this.tileIsFree(tile.x + direction.x * multiply, tile.y + direction.y * multiply)
  }

  tileIsFree (x, y) {
    var tile
    tile = this.plan.getTile(x, y)
    if ((tile != null) && indexOf.call(this.free, tile) >= 0) {
      return tile
    } else {
      return false
    }
  }

  randomFreeTile () {
    return this.free[Math.floor(this.rng() * this.free.length)]
  }
};

RoomGenerator.properties({
  tileContainer: {
    calcul: function () {
      return new TileContainer()
    }
  },
  rng: {
    default: Math.random
  },
  maxVolume: {
    default: 25
  },
  minVolume: {
    default: 50
  },
  width: {
    default: 30
  },
  height: {
    default: 15
  },
  plan: {
    calcul: function () {
      const tiles = new TileContainer()
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          tiles.addTile(new Tile(x, y))
        }
      }
      return tiles
    }
  }
})

RoomGenerator.Room = class Room {
  constructor () {
    this.tiles = []
    this.walls = []
    this.doors = []
  }

  addTile (tile) {
    this.tiles.push(tile)
    tile.room = this
  }

  containsWall (tile) {
    var k, len, ref, wall
    ref = this.walls
    for (k = 0, len = ref.length; k < len; k++) {
      wall = ref[k]
      if (wall.tile === tile) {
        return wall
      }
    }
    return false
  }

  addWall (tile, nextRoom) {
    var existing
    existing = this.containsWall(tile)
    if (existing) {
      existing.nextRoom = nextRoom
    } else {
      this.walls.push({
        tile: tile,
        nextRoom: nextRoom
      })
    }
  }

  wallsByRooms () {
    var k, len, pos, ref, res, rooms, wall
    rooms = []
    res = []
    ref = this.walls
    for (k = 0, len = ref.length; k < len; k++) {
      wall = ref[k]
      pos = rooms.indexOf(wall.nextRoom)
      if (pos === -1) {
        pos = rooms.length
        rooms.push(wall.nextRoom)
        res.push({
          room: wall.nextRoom,
          tiles: []
        })
      }
      res[pos].tiles.push(wall.tile)
    }
    return res
  }

  addDoor (tile, nextRoom) {
    return this.doors.push({
      tile: tile,
      nextRoom: nextRoom
    })
  }

  doorsForRoom (room) {
    return this.doors
      .filter((door) => door.nextRoom === room)
      .map((door) => door.tile)
  }
}

module.exports = RoomGenerator

},{"../Door":35,"parallelio-tiles":118,"spark-starter":185}],68:[function(require,module,exports){
const Tile = require('parallelio-tiles').Tile
const RoomGenerator = require('./RoomGenerator')
const AirlockGenerator = require('./AirlockGenerator')
const Floor = require('../Floor')
const Door = require('../AutomaticDoor')
const Element = require('spark-starter').Element
const Direction = require('parallelio-tiles').Direction

class ShipInteriorGenerator extends Element {
  generate () {
    this.roomGenerator.generate()

    this.airlockGenerators.forEach((airlockGen) => {
      airlockGen.generate()
    })

    return this.shipInterior
  }

  wallFactory (opt) {
    return (new Tile(opt.x, opt.y)).tap(function () {
      this.walkable = false
    })
  }

  floorFactory (opt) {
    return new Floor(opt.x, opt.y)
  }

  doorFactory (opt) {
    return (new Floor(opt.x, opt.y)).tap(function () {
      this.addChild(new Door({
        direction: opt.direction
      }))
    })
  }
}

ShipInteriorGenerator.properties({
  shipInterior: {
  },
  rng: {
    default: Math.random
  },
  roomGenerator: {
    calcul: function () {
      const roomGen = new RoomGenerator({
        tileContainer: this.shipInterior,
        rng: this.rng
      })
      roomGen.wallFactory = this.wallFactory
      roomGen.floorFactory = this.floorFactory
      roomGen.doorFactory = this.doorFactory
      return roomGen
    }
  },
  airlockGenerators: {
    calcul: function () {
      return [
        new AirlockGenerator({
          tileContainer: this.shipInterior,
          rng: this.rng,
          direction: Direction.up
        }),
        new AirlockGenerator({
          tileContainer: this.shipInterior,
          rng: this.rng,
          direction: Direction.down
        })
      ]
    }
  }
})

module.exports = ShipInteriorGenerator

},{"../AutomaticDoor":29,"../Floor":38,"./AirlockGenerator":66,"./RoomGenerator":67,"parallelio-tiles":118,"spark-starter":185}],69:[function(require,module,exports){
const Element = require('spark-starter').Element
const Map = require('../Map')
const StarSystem = require('../StarSystem')
const starNames = require('parallelio-strings').starNames

class StarMapGenerator extends Element {
  constructor (options) {
    super()
    this.opt = Object.assign({}, this.defOpt, options)
  }

  generate () {
    const MapClass = this.opt.mapClass
    this.map = new MapClass()
    this.stars = this.map.locations.copy()
    this.links = []
    this.createStars(this.opt.nbStars)
    this.makeLinks()
    return this.map
  }

  createStars (nb) {
    return Array.from(Array(nb), () => this.createStar())
  }

  createStar (opt = {}) {
    var name, pos, star
    if (!(opt.x && opt.y)) {
      pos = this.randomStarPos()
      if (pos != null) {
        opt = Object.assign({}, opt, {
          x: pos.x,
          y: pos.y
        })
      } else {
        return null
      }
    }
    if (!opt.name) {
      name = this.randomStarName()
      if (name != null) {
        opt = Object.assign({}, opt, {
          name: name
        })
      } else {
        return null
      }
    }
    const StarClass = this.opt.starClass
    star = new StarClass(opt)
    this.map.locations.push(star)
    this.stars.push(star)
    return star
  }

  randomStarPos () {
    var j, pos
    j = 0
    while (true) {
      pos = {
        x: Math.floor(this.opt.rng() * (this.opt.maxX - this.opt.minX) + this.opt.minX),
        y: Math.floor(this.opt.rng() * (this.opt.maxY - this.opt.minY) + this.opt.minY)
      }
      if (!(j < 10 && this.stars.find((star) => {
        return star.dist(pos.x, pos.y) <= this.opt.minStarDist
      }))) {
        break
      }
      j++
    }
    if (!(j >= 10)) {
      return pos
    }
  }

  randomStarName () {
    var name, pos, ref
    if ((ref = this.opt.starNames) != null ? ref.length : null) {
      pos = Math.floor(this.opt.rng() * this.opt.starNames.length)
      name = this.opt.starNames[pos]
      this.opt.starNames.splice(pos, 1)
      return name
    }
  }

  makeLinks () {
    return this.stars.forEach((star) => {
      return this.makeLinksFrom(star)
    })
  }

  makeLinksFrom (star) {
    var close, closests, link, needed, results, tries
    tries = this.opt.linkTries
    needed = this.opt.linksByStars - star.links.count()
    if (needed > 0) {
      closests = this.stars.filter((star2) => {
        return star2 !== star && !star.links.findStar(star2)
      }).closests(star.x, star.y)
      if (closests.count() > 0) {
        results = []
        while (true) {
          close = closests.shift()
          link = this.createLink(star, close)
          if (this.validateLink(link)) {
            this.links.push(link)
            star.addLink(link)
            needed -= 1
          } else {
            tries -= 1
          }
          if (!(needed > 0 && tries > 0 && closests.count() > 0)) {
            break
          } else {
            results.push(null)
          }
        }
        return results
      }
    }
  }

  createLink (star1, star2) {
    const LinkClass = this.opt.linkClass
    return new LinkClass(star1, star2)
  }

  validateLink (link) {
    return !this.stars.find((star) => {
      return star !== link.star1 && star !== link.star2 && link.closeToPoint(star.x, star.y, this.opt.minLinkDist)
    }) && !this.links.find((link2) => {
      return link2.intersectLink(link)
    })
  }
};

StarMapGenerator.prototype.defOpt = {
  nbStars: 20,
  minX: 0,
  maxX: 500,
  minY: 0,
  maxY: 500,
  minStarDist: 20,
  minLinkDist: 20,
  linksByStars: 3,
  linkTries: 3,
  mapClass: Map,
  starClass: StarSystem,
  linkClass: StarSystem.Link,
  rng: Math.random,
  starNames: starNames
}

module.exports = StarMapGenerator

},{"../Map":42,"../StarSystem":53,"parallelio-strings":109,"spark-starter":185}],70:[function(require,module,exports){
module.exports = {
  "Airlock": require("./Airlock"),
  "Approach": require("./Approach"),
  "AutomaticDoor": require("./AutomaticDoor"),
  "Character": require("./Character"),
  "CharacterAI": require("./CharacterAI"),
  "Confrontation": require("./Confrontation"),
  "Damageable": require("./Damageable"),
  "DamagePropagation": require("./DamagePropagation"),
  "Door": require("./Door"),
  "Element": require("./Element"),
  "EncounterManager": require("./EncounterManager"),
  "Floor": require("./Floor"),
  "Game": require("./Game"),
  "Inventory": require("./Inventory"),
  "LineOfSight": require("./LineOfSight"),
  "Map": require("./Map"),
  "Obstacle": require("./Obstacle"),
  "PathWalk": require("./PathWalk"),
  "PersonalWeapon": require("./PersonalWeapon"),
  "Player": require("./Player"),
  "Projectile": require("./Projectile"),
  "Ressource": require("./Ressource"),
  "RessourceType": require("./RessourceType"),
  "Ship": require("./Ship"),
  "ShipInterior": require("./ShipInterior"),
  "ShipWeapon": require("./ShipWeapon"),
  "StarSystem": require("./StarSystem"),
  "Travel": require("./Travel"),
  "View": require("./View"),
  "VisionCalculator": require("./VisionCalculator"),
  "actions": {
    "Action": require("./actions/Action"),
    "ActionProvider": require("./actions/ActionProvider"),
    "AttackAction": require("./actions/AttackAction"),
    "AttackMoveAction": require("./actions/AttackMoveAction"),
    "SimpleActionProvider": require("./actions/SimpleActionProvider"),
    "TargetAction": require("./actions/TargetAction"),
    "TiledActionProvider": require("./actions/TiledActionProvider"),
    "TravelAction": require("./actions/TravelAction"),
    "WalkAction": require("./actions/WalkAction"),
  },
  "generators": {
    "AirlockGenerator": require("./generators/AirlockGenerator"),
    "RoomGenerator": require("./generators/RoomGenerator"),
    "ShipInteriorGenerator": require("./generators/ShipInteriorGenerator"),
    "StarMapGenerator": require("./generators/StarMapGenerator"),
  },
  "saveEngines": {
    "LoaderCollection": require("./saveEngines/LoaderCollection"),
    "SimpleLoader": require("./saveEngines/SimpleLoader"),
    "SimpleSavable": require("./saveEngines/SimpleSavable"),
  },
}
},{"./Airlock":27,"./Approach":28,"./AutomaticDoor":29,"./Character":30,"./CharacterAI":31,"./Confrontation":32,"./DamagePropagation":33,"./Damageable":34,"./Door":35,"./Element":36,"./EncounterManager":37,"./Floor":38,"./Game":39,"./Inventory":40,"./LineOfSight":41,"./Map":42,"./Obstacle":43,"./PathWalk":44,"./PersonalWeapon":45,"./Player":46,"./Projectile":47,"./Ressource":48,"./RessourceType":49,"./Ship":50,"./ShipInterior":51,"./ShipWeapon":52,"./StarSystem":53,"./Travel":54,"./View":55,"./VisionCalculator":56,"./actions/Action":57,"./actions/ActionProvider":58,"./actions/AttackAction":59,"./actions/AttackMoveAction":60,"./actions/SimpleActionProvider":61,"./actions/TargetAction":62,"./actions/TiledActionProvider":63,"./actions/TravelAction":64,"./actions/WalkAction":65,"./generators/AirlockGenerator":66,"./generators/RoomGenerator":67,"./generators/ShipInteriorGenerator":68,"./generators/StarMapGenerator":69,"./saveEngines/LoaderCollection":72,"./saveEngines/SimpleLoader":73,"./saveEngines/SimpleSavable":74}],71:[function(require,module,exports){
const libs = require('./libs')

module.exports = Object.assign({}, libs, {
  grids: require('parallelio-grids'),
  PathFinder: require('parallelio-pathfinder'),
  strings: require('parallelio-strings'),
  tiles: require('parallelio-tiles'),
  Timing: require('parallelio-timing'),
  wiring: require('parallelio-wiring'),
  Spark: require('spark-starter')
})

},{"./libs":70,"parallelio-grids":78,"parallelio-pathfinder":99,"parallelio-strings":109,"parallelio-tiles":118,"parallelio-timing":128,"parallelio-wiring":135,"spark-starter":185}],72:[function(require,module,exports){
const Collection = require('spark-starter').Collection

class LoaderCollection extends Collection {
  load (data) {
    return data.map(elem => {
      const loader = this.loaders.find(l => l.match(elem))
      if (loader) {
        loader.load(elem)
      }
    })
  }
}

module.exports = LoaderCollection

},{"spark-starter":185}],73:[function(require,module,exports){

class SimpleLoader {
  constructor (construct, alias = null) {
    this.construct = construct
    this.alias = alias || construct.name
  }

  register (game) {
    game.loaders.add(this)
  }

  match (data) {
    return data.typeAlias === this.alias
  }

  load (data) {
    const Construct = this.construct
    return new Construct(data)
  }
}

module.exports = SimpleLoader

},{}],74:[function(require,module,exports){

const SimpleLoader = require('./SimpleLoader')

class SimpleSavable {
  constructor (obj, alias = null, loader = null) {
    this.obj = obj
    this.alias = alias || obj.constructor.name
    this.loader = loader
  }

  makeDefaultLoader () {
    if (!this.obj.constructor.loader) {
      this.obj.constructor.loader = new SimpleLoader(this.obj.constructor, this.alias)
    }
    return this.obj.constructor.loader
  }

  register (game) {
    if (!this.loader) {
      this.loader = this.makeDefaultLoader()
    }
    this.loader.register(game)
    game.savables.add(this)
  }

  getRawData () {
    if (typeof this.obj.getSaveData === 'function') {
      return this.obj.getSaveData()
    }
    return this.obj.propertiesManager.getManualDataProperties()
  }

  getSaveData () {
    return Object.assign(
      { typeAlias: this.alias },
      this.getRawData()
    )
  }
}

module.exports = SimpleSavable

},{"./SimpleLoader":73}],75:[function(require,module,exports){
(function(definition){var Grid=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Grid.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Grid;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Grid=Grid;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Grid=Grid;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell = dependencies.hasOwnProperty("GridCell") ? dependencies.GridCell : require('./GridCell');
var GridRow = dependencies.hasOwnProperty("GridRow") ? dependencies.GridRow : require('./GridRow');
var Grid;
Grid = (function() {
  class Grid extends Element {
    addCell(cell = null) {
      var row, spot;
      if (!cell) {
        cell = new GridCell();
      }
      spot = this.getFreeSpot();
      row = this.rows.get(spot.row);
      if (!row) {
        row = this.addRow();
      }
      row.addCell(cell);
      return cell;
    }

    addRow(row = null) {
      if (!row) {
        row = new GridRow();
      }
      this.rows.push(row);
      return row;
    }

    getFreeSpot() {
      var spot;
      spot = null;
      this.rows.some((row) => {
        if (row.cells.length < this.maxColumns) {
          return spot = {
            row: row.rowPosition,
            column: row.cells.length
          };
        }
      });
      if (!spot) {
        if (this.maxColumns > this.rows.length) {
          spot = {
            row: this.rows.length,
            column: 0
          };
        } else {
          spot = {
            row: 0,
            column: this.maxColumns + 1
          };
        }
      }
      return spot;
    }

  };

  Grid.extend(EventEmitter);

  Grid.properties({
    rows: {
      collection: true,
      itemAdded: function(row) {
        return row.grid = this;
      },
      itemRemoved: function(row) {
        if (row.grid === this) {
          return row.grid = null;
        }
      }
    },
    maxColumns: {
      calcul: function(invalidator) {
        var rows;
        rows = invalidator.prop('rows');
        return rows.reduce(function(max, row) {
          return Math.max(max, invalidator.prop('cells', row).length);
        }, 0);
      }
    }
  });

  return Grid;

}).call(this);

return(Grid);});
},{"./GridCell":76,"./GridRow":77,"spark-starter":98}],76:[function(require,module,exports){
(function(definition){var GridCell=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);GridCell.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=GridCell;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.GridCell=GridCell;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.GridCell=GridCell;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell;
GridCell = (function() {
  class GridCell extends Element {};

  GridCell.extend(EventEmitter);

  GridCell.properties({
    grid: {
      calcul: function(invalidator) {
        return invalidator.prop('grid', invalidator.prop('row'));
      }
    },
    row: {},
    columnPosition: {
      calcul: function(invalidator) {
        var row;
        row = invalidator.prop('row');
        if (row) {
          return invalidator.prop('cells', row).indexOf(this);
        }
      }
    },
    width: {
      calcul: function(invalidator) {
        return 1 / invalidator.prop('cells', invalidator.prop('row')).length;
      }
    },
    left: {
      calcul: function(invalidator) {
        return invalidator.prop('width') * invalidator.prop('columnPosition');
      }
    },
    right: {
      calcul: function(invalidator) {
        return invalidator.prop('width') * (invalidator.prop('columnPosition') + 1);
      }
    },
    height: {
      calcul: function(invalidator) {
        return invalidator.prop('height', invalidator.prop('row'));
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop('top', invalidator.prop('row'));
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop('bottom', invalidator.prop('row'));
      }
    }
  });

  return GridCell;

}).call(this);

return(GridCell);});
},{"spark-starter":98}],77:[function(require,module,exports){
(function(definition){var GridRow=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);GridRow.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=GridRow;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.GridRow=GridRow;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.GridRow=GridRow;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var EventEmitter = dependencies.hasOwnProperty("EventEmitter") ? dependencies.EventEmitter : require('spark-starter').EventEmitter;
var GridCell = dependencies.hasOwnProperty("GridCell") ? dependencies.GridCell : require('./GridCell');
var GridRow;
GridRow = (function() {
  class GridRow extends Element {
    addCell(cell = null) {
      if (!cell) {
        cell = new GridCell();
      }
      this.cells.push(cell);
      return cell;
    }

  };

  GridRow.extend(EventEmitter);

  GridRow.properties({
    grid: {},
    cells: {
      collection: true,
      itemAdded: function(cell) {
        return cell.row = this;
      },
      itemRemoved: function(cell) {
        if (cell.row === this) {
          return cell.row = null;
        }
      }
    },
    rowPosition: {
      calcul: function(invalidator) {
        var grid;
        grid = invalidator.prop('grid');
        if (grid) {
          return invalidator.prop('rows', grid).indexOf(this);
        }
      }
    },
    height: {
      calcul: function(invalidator) {
        return 1 / invalidator.prop('rows', invalidator.prop('grid')).length;
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop('height') * invalidator.prop('rowPosition');
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop('height') * (invalidator.prop('rowPosition') + 1);
      }
    }
  });

  return GridRow;

}).call(this);

return(GridRow);});
},{"./GridCell":76,"spark-starter":98}],78:[function(require,module,exports){
if(module){
  module.exports = {
    Grid: require('./Grid.js'),
    GridCell: require('./GridCell.js'),
    GridRow: require('./GridRow.js')
  };
}
},{"./Grid.js":75,"./GridCell.js":76,"./GridRow.js":77}],79:[function(require,module,exports){
(function(definition){var Binder=definition(typeof Spark!=="undefined"?Spark:this.Spark);Binder.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Binder;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Binder=Binder;}else{if(this.Spark==null){this.Spark={};}this.Spark.Binder=Binder;}}})(function(){
var Binder;
Binder = (function() {
  class Binder {
    bind() {
      if (!this.binded && (this.callback != null) && (this.target != null)) {
        this.doBind();
      }
      return this.binded = true;
    }
    doBind() {
      throw new Error('Not implemented');
    }
    unbind() {
      if (this.binded && (this.callback != null) && (this.target != null)) {
        this.doUnbind();
      }
      return this.binded = false;
    }
    doUnbind() {
      throw new Error('Not implemented');
    }
    equals(binder) {
      return this.constructor.compareRefered(binder, this);
    }
    getRef() {}
    static compareRefered(obj1, obj2) {
      return obj1 === obj2 || ((obj1 != null) && (obj2 != null) && obj1.constructor === obj2.constructor && this.compareRef(obj1.ref, obj2.ref));
    }
    static compareRef(ref1, ref2) {
      return (ref1 != null) && (ref2 != null) && (ref1 === ref2 || (Array.isArray(ref1) && Array.isArray(ref1) && ref1.every((val, i) => {
        return this.compareRefered(ref1[i], ref2[i]);
      })) || (typeof ref1 === "object" && typeof ref2 === "object" && Object.keys(ref1).join() === Object.keys(ref2).join() && Object.keys(ref1).every((key) => {
        return this.compareRefered(ref1[key], ref2[key]);
      })));
    }
  };
  Object.defineProperty(Binder.prototype, 'ref', {
    get: function() {
      return this.getRef();
    }
  });
  return Binder;
}).call(this);
return(Binder);});


},{}],80:[function(require,module,exports){
(function(definition){var Collection=definition(typeof Spark!=="undefined"?Spark:this.Spark);Collection.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Collection;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Collection=Collection;}else{if(this.Spark==null){this.Spark={};}this.Spark.Collection=Collection;}}})(function(){
var Collection;
Collection = (function() {
  class Collection {
    constructor(arr) {
      if (arr != null) {
        if (typeof arr.toArray === 'function') {
          this._array = arr.toArray();
        } else if (Array.isArray(arr)) {
          this._array = arr;
        } else {
          this._array = [arr];
        }
      } else {
        this._array = [];
      }
    }
    changed() {}
    checkChanges(old, ordered = true, compareFunction = null) {
      if (compareFunction == null) {
        compareFunction = function(a, b) {
          return a === b;
        };
      }
      old = this.copy(old.slice());
      return this.count() !== old.length || (ordered ? this.some(function(val, i) {
        return !compareFunction(old.get(i), val);
      }) : this.some(function(a) {
        return !old.pluck(function(b) {
          return compareFunction(a, b);
        });
      }));
    }
    get(i) {
      return this._array[i];
    }
    set(i, val) {
      var old;
      if (this._array[i] !== val) {
        old = this.toArray();
        this._array[i] = val;
        this.changed(old);
      }
      return val;
    }
    add(val) {
      if (!this._array.includes(val)) {
        return this.push(val);
      }
    }
    remove(val) {
      var index, old;
      index = this._array.indexOf(val);
      if (index !== -1) {
        old = this.toArray();
        this._array.splice(index, 1);
        return this.changed(old);
      }
    }
    pluck(fn) {
      var found, index, old;
      index = this._array.findIndex(fn);
      if (index > -1) {
        old = this.toArray();
        found = this._array[index];
        this._array.splice(index, 1);
        this.changed(old);
        return found;
      } else {
        return null;
      }
    }
    toArray() {
      return this._array.slice();
    }
    count() {
      return this._array.length;
    }
    static newSubClass(fn, arr) {
      var SubClass;
      if (typeof fn === 'object') {
        SubClass = class extends this {};
        Object.assign(SubClass.prototype, fn);
        return new SubClass(arr);
      } else {
        return new this(arr);
      }
    }
    copy(arr) {
      var coll;
      if (arr == null) {
        arr = this.toArray();
      }
      coll = new this.constructor(arr);
      return coll;
    }
    equals(arr) {
      return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function(val, i) {
        return arr[i] === val;
      });
    }
    getAddedFrom(arr) {
      return this._array.filter(function(item) {
        return !arr.includes(item);
      });
    }
    getRemovedFrom(arr) {
      return arr.filter((item) => {
        return !this.includes(item);
      });
    }
  };
  Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString'];
  Collection.readListFunctions = ['concat', 'filter', 'slice'];
  Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'];
  Collection.readFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this._array[funct](...arg);
    };
  });
  Collection.readListFunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      return this.copy(this._array[funct](...arg));
    };
  });
  Collection.writefunctions.forEach(function(funct) {
    return Collection.prototype[funct] = function(...arg) {
      var old, res;
      old = this.toArray();
      res = this._array[funct](...arg);
      this.changed(old);
      return res;
    };
  });
  return Collection;
}).call(this);
Object.defineProperty(Collection.prototype, 'length', {
  get: function() {
    return this.count();
  }
});
if (typeof Symbol !== "undefined" && Symbol !== null ? Symbol.iterator : void 0) {
  Collection.prototype[Symbol.iterator] = function() {
    return this._array[Symbol.iterator]();
  };
}
return(Collection);});


},{}],81:[function(require,module,exports){
(function(definition){var Element=definition(typeof Spark!=="undefined"?Spark:this.Spark);Element.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Element;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Element=Element;}else{if(this.Spark==null){this.Spark={};}this.Spark.Element=Element;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Property = dependencies.hasOwnProperty("Property") ? dependencies.Property : require('./Property');
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('./Mixable');
var Element;
Element = class Element extends Mixable {
  tap(name) {
    var args;
    args = Array.prototype.slice.call(arguments);
    if (typeof name === 'function') {
      name.apply(this, args.slice(1));
    } else {
      this[name].apply(this, args.slice(1));
    }
    return this;
  }

  callback(name) {
    if (this._callbacks == null) {
      this._callbacks = {};
    }
    if (this._callbacks[name] == null) {
      this._callbacks[name] = (...args) => {
        this[name].apply(this, args);
        return null;
      };
      this._callbacks[name].owner = this;
    }
    return this._callbacks[name];
  }

  getFinalProperties() {
    if (this._properties != null) {
      return ['_properties'].concat(this._properties.map(function(prop) {
        return prop.name;
      }));
    } else {
      return [];
    }
  }

  extended(target) {
    var i, len, options, property, ref, results;
    if (this._properties != null) {
      ref = this._properties;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        property = ref[i];
        options = Object.assign({}, property.options);
        results.push((new Property(property.name, options)).bind(target));
      }
      return results;
    }
  }

  static property(prop, desc) {
    return (new Property(prop, desc)).bind(this.prototype);
  }

  static properties(properties) {
    var desc, prop, results;
    results = [];
    for (prop in properties) {
      desc = properties[prop];
      results.push(this.property(prop, desc));
    }
    return results;
  }

};

return(Element);});


},{"./Mixable":85,"./Property":87}],82:[function(require,module,exports){
(function(definition){var EventBind=definition(typeof Spark!=="undefined"?Spark:this.Spark);EventBind.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=EventBind;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.EventBind=EventBind;}else{if(this.Spark==null){this.Spark={};}this.Spark.EventBind=EventBind;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var EventBind;
EventBind = class EventBind extends Binder {
  constructor(event1, target1, callback) {
    super();
    this.event = event1;
    this.target = target1;
    this.callback = callback;
  }

  getRef() {
    return {
      event: this.event,
      target: this.target,
      callback: this.callback
    };
  }

  doBind() {
    if (typeof this.target.addEventListener === 'function') {
      return this.target.addEventListener(this.event, this.callback);
    } else if (typeof this.target.addListener === 'function') {
      return this.target.addListener(this.event, this.callback);
    } else if (typeof this.target.on === 'function') {
      return this.target.on(this.event, this.callback);
    } else {
      throw new Error('No function to add event listeners was found');
    }
  }

  doUnbind() {
    if (typeof this.target.removeEventListener === 'function') {
      return this.target.removeEventListener(this.event, this.callback);
    } else if (typeof this.target.removeListener === 'function') {
      return this.target.removeListener(this.event, this.callback);
    } else if (typeof this.target.off === 'function') {
      return this.target.off(this.event, this.callback);
    } else {
      throw new Error('No function to remove event listeners was found');
    }
  }

  equals(eventBind) {
    return super.equals(eventBind) && eventBind.event === this.event;
  }

  match(event, target) {
    return event === this.event && target === this.target;
  }

  static checkEmitter(emitter, fatal = true) {
    if (typeof emitter.addEventListener === 'function' || typeof emitter.addListener === 'function' || typeof emitter.on === 'function') {
      return true;
    } else if (fatal) {
      throw new Error('No function to add event listeners was found');
    } else {
      return false;
    }
  }

};

return(EventBind);});


},{"./Binder":79}],83:[function(require,module,exports){
(function(definition){var EventEmitter=definition(typeof Spark!=="undefined"?Spark:this.Spark);EventEmitter.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=EventEmitter;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.EventEmitter=EventEmitter;}else{if(this.Spark==null){this.Spark={};}this.Spark.EventEmitter=EventEmitter;}}})(function(){
var EventEmitter;
EventEmitter = (function() {
  class EventEmitter {
    getAllEvents() {
      return this._events || (this._events = {});
    }
    getListeners(e) {
      var events;
      events = this.getAllEvents();
      return events[e] || (events[e] = []);
    }
    hasListener(e, listener) {
      return this.getListeners(e).includes(listener);
    }
    addListener(e, listener) {
      if (!this.hasListener(e, listener)) {
        this.getListeners(e).push(listener);
        return this.listenerAdded(e, listener);
      }
    }
    listenerAdded(e, listener) {}
    removeListener(e, listener) {
      var index, listeners;
      listeners = this.getListeners(e);
      index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
        return this.listenerRemoved(e, listener);
      }
    }
    listenerRemoved(e, listener) {}
    emitEvent(e, ...args) {
      var listeners;
      listeners = this.getListeners(e).slice();
      return listeners.forEach(function(listener) {
        return listener(...args);
      });
    }
  };
  EventEmitter.prototype.emit = EventEmitter.prototype.emitEvent;
  EventEmitter.prototype.trigger = EventEmitter.prototype.emitEvent;
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
  return EventEmitter;
}).call(this);
return(EventEmitter);});


},{}],84:[function(require,module,exports){
(function(definition){var Invalidator=definition(typeof Spark!=="undefined"?Spark:this.Spark);Invalidator.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Invalidator;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Invalidator=Invalidator;}else{if(this.Spark==null){this.Spark={};}this.Spark.Invalidator=Invalidator;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var EventBind = dependencies.hasOwnProperty("EventBind") ? dependencies.EventBind : require('./EventBind');
var Invalidator, pluck;
pluck = function(arr, fn) {
  var found, index;
  index = arr.findIndex(fn);
  if (index > -1) {
    found = arr[index];
    arr.splice(index, 1);
    return found;
  } else {
    return null;
  }
};

Invalidator = (function() {
  class Invalidator extends Binder {
    constructor(property, obj = null) {
      super();
      this.property = property;
      this.obj = obj;
      this.invalidationEvents = [];
      this.recycled = [];
      this.unknowns = [];
      this.strict = this.constructor.strict;
      this.invalidated = false;
      this.invalidateCallback = () => {
        this.invalidate();
        return null;
      };
      this.invalidateCallback.owner = this;
    }

    invalidate() {
      var functName;
      this.invalidated = true;
      if (typeof this.property === "function") {
        return this.property();
      } else if (typeof this.callback === "function") {
        return this.callback();
      } else if ((this.property != null) && typeof this.property.invalidate === "function") {
        return this.property.invalidate();
      } else if (typeof this.property === "string") {
        functName = 'invalidate' + this.property.charAt(0).toUpperCase() + this.property.slice(1);
        if (typeof this.obj[functName] === "function") {
          return this.obj[functName]();
        } else {
          return this.obj[this.property] = null;
        }
      }
    }

    unknown() {
      if (typeof this.property.unknown === "function") {
        return this.property.unknown();
      } else {
        return this.invalidate();
      }
    }

    addEventBind(event, target, callback) {
      return this.addBinder(new EventBind(event, target, callback));
    }

    addBinder(binder) {
      if (binder.callback == null) {
        binder.callback = this.invalidateCallback;
      }
      if (!this.invalidationEvents.some(function(eventBind) {
        return eventBind.equals(binder);
      })) {
        return this.invalidationEvents.push(pluck(this.recycled, function(eventBind) {
          return eventBind.equals(binder);
        }) || binder);
      }
    }

    getUnknownCallback(prop, target) {
      var callback;
      callback = () => {
        return this.addUnknown(function() {
          return target[prop];
        }, prop, target);
      };
      callback.ref = {
        prop: prop,
        target: target
      };
      return callback;
    }

    addUnknown(fn, prop, target) {
      if (!this.findUnknown(prop, target)) {
        fn.ref = {
          "prop": prop,
          "target": target
        };
        this.unknowns.push(fn);
        return this.unknown();
      }
    }

    findUnknown(prop, target) {
      if ((prop != null) || (target != null)) {
        return this.unknowns.find(function(unknown) {
          return unknown.ref.prop === prop && unknown.ref.target === target;
        });
      }
    }

    event(event, target = this.obj) {
      if (this.checkEmitter(target)) {
        return this.addEventBind(event, target);
      }
    }

    value(val, event, target = this.obj) {
      this.event(event, target);
      return val;
    }

    prop(prop, target = this.obj) {
      if (typeof prop !== 'string') {
        throw new Error('Property name must be a string');
      }
      if (this.checkEmitter(target)) {
        this.addEventBind(prop + 'Invalidated', target, this.getUnknownCallback(prop, target));
        return this.value(target[prop], prop + 'Updated', target);
      } else {
        return target[prop];
      }
    }

    propInitiated(prop, target = this.obj) {
      var initiated;
      initiated = target.getPropertyInstance(prop).initiated;
      if (!initiated && this.checkEmitter(target)) {
        this.event(prop + 'Updated', target);
      }
      return initiated;
    }

    funct(funct) {
      var invalidator, res;
      invalidator = new Invalidator(() => {
        return this.addUnknown(() => {
          var res2;
          res2 = funct(invalidator);
          if (res !== res2) {
            return this.invalidate();
          }
        }, invalidator);
      });
      res = funct(invalidator);
      this.invalidationEvents.push(invalidator);
      return res;
    }

    validateUnknowns(prop, target = this.obj) {
      var unknowns;
      unknowns = this.unknowns;
      this.unknowns = [];
      return unknowns.forEach(function(unknown) {
        return unknown();
      });
    }

    isEmpty() {
      return this.invalidationEvents.length === 0;
    }

    bind() {
      this.invalidated = false;
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.bind();
      });
    }

    recycle(callback) {
      var done, res;
      this.recycled = this.invalidationEvents;
      this.invalidationEvents = [];
      done = () => {
        this.recycled.forEach(function(eventBind) {
          return eventBind.unbind();
        });
        return this.recycled = [];
      };
      if (typeof callback === "function") {
        if (callback.length > 1) {
          return callback(this, done);
        } else {
          res = callback(this);
          done();
          return res;
        }
      } else {
        return done;
      }
    }

    checkEmitter(emitter) {
      return EventBind.checkEmitter(emitter, this.strict);
    }

    unbind() {
      return this.invalidationEvents.forEach(function(eventBind) {
        return eventBind.unbind();
      });
    }

  };

  Invalidator.strict = true;

  return Invalidator;

}).call(this);

return(Invalidator);});


},{"./Binder":79,"./EventBind":82}],85:[function(require,module,exports){
(function(definition){var Mixable=definition(typeof Spark!=="undefined"?Spark:this.Spark);Mixable.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Mixable;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Mixable=Mixable;}else{if(this.Spark==null){this.Spark={};}this.Spark.Mixable=Mixable;}}})(function(){
var Mixable,
  indexOf = [].indexOf;
Mixable = (function() {
  class Mixable {
    static extend(obj) {
      this.Extension.make(obj, this);
      if (obj.prototype != null) {
        return this.Extension.make(obj.prototype, this.prototype);
      }
    }
    static include(obj) {
      return this.Extension.make(obj, this.prototype);
    }
  };
  Mixable.Extension = {
    make: function(source, target) {
      var i, len, prop, ref;
      ref = this.getExtensionProperties(source, target);
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        Object.defineProperty(target, prop.name, prop);
      }
      target.extensions = (target.extensions || []).concat([source]);
      if (typeof source.extended === 'function') {
        return source.extended(target);
      }
    },
    alwaysFinal: ['extended', 'extensions', '__super__', 'constructor'],
    getExtensionProperties: function(source, target) {
      var alwaysFinal, props, targetChain;
      alwaysFinal = this.alwaysFinal;
      targetChain = this.getPrototypeChain(target);
      props = [];
      this.getPrototypeChain(source).every(function(obj) {
        var exclude;
        if (!targetChain.includes(obj)) {
          exclude = alwaysFinal;
          if (source.getFinalProperties != null) {
            exclude = exclude.concat(source.getFinalProperties());
          }
          if (typeof obj === 'function') {
            exclude = exclude.concat(["length", "prototype", "name"]);
          }
          props = props.concat(Object.getOwnPropertyNames(obj).filter((key) => {
            return !target.hasOwnProperty(key) && key.substr(0, 2) !== "__" && indexOf.call(exclude, key) < 0 && !props.find(function(prop) {
              return prop.name === key;
            });
          }).map(function(key) {
            var prop;
            prop = Object.getOwnPropertyDescriptor(obj, key);
            prop.name = key;
            return prop;
          }));
          return true;
        }
      });
      return props;
    },
    getPrototypeChain: function(obj) {
      var basePrototype, chain;
      chain = [];
      basePrototype = Object.getPrototypeOf(Object);
      while (true) {
        chain.push(obj);
        if (!((obj = Object.getPrototypeOf(obj)) && obj !== Object && obj !== basePrototype)) {
          break;
        }
      }
      return chain;
    }
  };
  return Mixable;
}).call(this);
return(Mixable);});


},{}],86:[function(require,module,exports){
(function(definition){var Overrider=definition(typeof Spark!=="undefined"?Spark:this.Spark);Overrider.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Overrider;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Overrider=Overrider;}else{if(this.Spark==null){this.Spark={};}this.Spark.Overrider=Overrider;}}})(function(){
var Overrider;
Overrider = (function() {
  class Overrider {
    static overrides(overrides) {
      return this.Override.applyMany(this.prototype, this.name, overrides);
    }
    getFinalProperties() {
      if (this._overrides != null) {
        return ['_overrides'].concat(Object.keys(this._overrides));
      } else {
        return [];
      }
    }
    extended(target) {
      if (this._overrides != null) {
        this.constructor.Override.applyMany(target, this.constructor.name, this._overrides);
      }
      if (this.constructor === Overrider) {
        return target.extended = this.extended;
      }
    }
  };
  Overrider.Override = {
    makeMany: function(target, namespace, overrides) {
      var fn, key, override, results;
      results = [];
      for (key in overrides) {
        fn = overrides[key];
        results.push(override = this.make(target, namespace, key, fn));
      }
      return results;
    },
    applyMany: function(target, namespace, overrides) {
      var key, override, results;
      results = [];
      for (key in overrides) {
        override = overrides[key];
        if (typeof override === "function") {
          override = this.make(target, namespace, key, override);
        }
        results.push(this.apply(target, namespace, override));
      }
      return results;
    },
    make: function(target, namespace, fnName, fn) {
      var override;
      override = {
        fn: {
          current: fn
        },
        name: fnName
      };
      override.fn['with' + namespace] = fn;
      return override;
    },
    emptyFn: function() {},
    apply: function(target, namespace, override) {
      var fnName, overrides, ref, ref1, without;
      fnName = override.name;
      overrides = target._overrides != null ? Object.assign({}, target._overrides) : {};
      without = ((ref = target._overrides) != null ? (ref1 = ref[fnName]) != null ? ref1.fn.current : void 0 : void 0) || target[fnName];
      override = Object.assign({}, override);
      if (overrides[fnName] != null) {
        override.fn = Object.assign({}, overrides[fnName].fn, override.fn);
      } else {
        override.fn = Object.assign({}, override.fn);
      }
      override.fn['without' + namespace] = without || this.emptyFn;
      if (without == null) {
        override.missingWithout = 'without' + namespace;
      } else if (override.missingWithout) {
        override.fn[override.missingWithout] = without;
      }
      Object.defineProperty(target, fnName, {
        configurable: true,
        get: function() {
          var finalFn, fn, key, ref2;
          finalFn = override.fn.current.bind(this);
          ref2 = override.fn;
          for (key in ref2) {
            fn = ref2[key];
            finalFn[key] = fn.bind(this);
          }
          if (this.constructor.prototype !== this) {
            Object.defineProperty(this, fnName, {
              value: finalFn
            });
          }
          return finalFn;
        }
      });
      overrides[fnName] = override;
      return target._overrides = overrides;
    }
  };
  return Overrider;
}).call(this);
return(Overrider);});


},{}],87:[function(require,module,exports){
(function(definition){var Property=definition(typeof Spark!=="undefined"?Spark:this.Spark);Property.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Property;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Property=Property;}else{if(this.Spark==null){this.Spark={};}this.Spark.Property=Property;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./PropertyTypes/BasicProperty');
var CollectionProperty = dependencies.hasOwnProperty("CollectionProperty") ? dependencies.CollectionProperty : require('./PropertyTypes/CollectionProperty');
var ComposedProperty = dependencies.hasOwnProperty("ComposedProperty") ? dependencies.ComposedProperty : require('./PropertyTypes/ComposedProperty');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./PropertyTypes/DynamicProperty');
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./PropertyTypes/CalculatedProperty');
var InvalidatedProperty = dependencies.hasOwnProperty("InvalidatedProperty") ? dependencies.InvalidatedProperty : require('./PropertyTypes/InvalidatedProperty');
var ActivableProperty = dependencies.hasOwnProperty("ActivableProperty") ? dependencies.ActivableProperty : require('./PropertyTypes/ActivableProperty');
var UpdatedProperty = dependencies.hasOwnProperty("UpdatedProperty") ? dependencies.UpdatedProperty : require('./PropertyTypes/UpdatedProperty');
var PropertyOwner = dependencies.hasOwnProperty("PropertyOwner") ? dependencies.PropertyOwner : require('./PropertyOwner');
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('./Mixable');
var Property;
Property = (function() {
  class Property {
    constructor(name, options = {}) {
      this.name = name;
      this.options = options;
    }

    bind(target) {
      var parent, prop;
      prop = this;
      if (!(typeof target.getProperty === 'function' && target.getProperty(this.name) === this)) {
        if (typeof target.getProperty === 'function' && ((parent = target.getProperty(this.name)) != null)) {
          this.override(parent);
        }
        this.getInstanceType().bind(target, prop);
        target._properties = (target._properties || []).concat([prop]);
        if (parent != null) {
          target._properties = target._properties.filter(function(existing) {
            return existing !== parent;
          });
        }
        this.makeOwner(target);
      }
      return prop;
    }

    override(parent) {
      var key, ref, results, value;
      if (this.options.parent == null) {
        this.options.parent = parent.options;
        ref = parent.options;
        results = [];
        for (key in ref) {
          value = ref[key];
          if (typeof this.options[key] === 'function' && typeof value === 'function') {
            results.push(this.options[key].overrided = value);
          } else if (typeof this.options[key] === 'undefined') {
            results.push(this.options[key] = value);
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    }

    makeOwner(target) {
      var ref;
      if (!((ref = target.extensions) != null ? ref.includes(PropertyOwner.prototype) : void 0)) {
        return Mixable.Extension.make(PropertyOwner.prototype, target);
      }
    }

    getInstanceVarName() {
      return this.options.instanceVarName || '_' + this.name;
    }

    isInstantiated(obj) {
      return obj[this.getInstanceVarName()] != null;
    }

    getInstance(obj) {
      var Type, varName;
      varName = this.getInstanceVarName();
      if (!this.isInstantiated(obj)) {
        Type = this.getInstanceType();
        obj[varName] = new Type(this, obj);
      }
      return obj[varName];
    }

    getInstanceType() {
      if (!this.instanceType) {
        this.composers.forEach((composer) => {
          return composer.compose(this);
        });
      }
      return this.instanceType;
    }

  };

  Property.prototype.composers = [ComposedProperty, CollectionProperty, DynamicProperty, BasicProperty, UpdatedProperty, CalculatedProperty, InvalidatedProperty, ActivableProperty];

  return Property;

}).call(this);

return(Property);});


},{"./Mixable":85,"./PropertyOwner":88,"./PropertyTypes/ActivableProperty":89,"./PropertyTypes/BasicProperty":90,"./PropertyTypes/CalculatedProperty":91,"./PropertyTypes/CollectionProperty":92,"./PropertyTypes/ComposedProperty":93,"./PropertyTypes/DynamicProperty":94,"./PropertyTypes/InvalidatedProperty":95,"./PropertyTypes/UpdatedProperty":96}],88:[function(require,module,exports){
(function(definition){var PropertyOwner=definition(typeof Spark!=="undefined"?Spark:this.Spark);PropertyOwner.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=PropertyOwner;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.PropertyOwner=PropertyOwner;}else{if(this.Spark==null){this.Spark={};}this.Spark.PropertyOwner=PropertyOwner;}}})(function(){
var PropertyOwner;
PropertyOwner = class PropertyOwner {
  getProperty(name) {
    return this._properties && this._properties.find(function(prop) {
      return prop.name === name;
    });
  }
  getPropertyInstance(name) {
    var res;
    res = this.getProperty(name);
    if (res) {
      return res.getInstance(this);
    }
  }
  getProperties() {
    return this._properties.slice();
  }
  getPropertyInstances() {
    return this._properties.map((prop) => {
      return prop.getInstance(this);
    });
  }
  getInstantiatedProperties() {
    return this._properties.filter((prop) => {
      return prop.isInstantiated(this);
    }).map((prop) => {
      return prop.getInstance(this);
    });
  }
  getManualDataProperties() {
    return this._properties.reduce((res, prop) => {
      var instance;
      if (prop.isInstantiated(this)) {
        instance = prop.getInstance(this);
        if (instance.calculated && instance.manual) {
          res[prop.name] = instance.value;
        }
      }
      return res;
    }, {});
  }
  setProperties(data, options = {}) {
    var key, prop, val;
    for (key in data) {
      val = data[key];
      if (((options.whitelist == null) || options.whitelist.indexOf(key) !== -1) && ((options.blacklist == null) || options.blacklist.indexOf(key) === -1)) {
        prop = this.getPropertyInstance(key);
        if (prop != null) {
          prop.set(val);
        }
      }
    }
    return this;
  }
  destroyProperties() {
    this.getInstantiatedProperties().forEach((prop) => {
      return prop.destroy();
    });
    this._properties = [];
    return true;
  }
  listenerAdded(event, listener) {
    return this._properties.forEach((prop) => {
      if (prop.getInstanceType().prototype.changeEventName === event) {
        return prop.getInstance(this).get();
      }
    });
  }
  extended(target) {
    return target.listenerAdded = this.listenerAdded;
  }
};
return(PropertyOwner);});


},{}],89:[function(require,module,exports){
(function(definition){var ActivableProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);ActivableProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=ActivableProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.ActivableProperty=ActivableProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.ActivableProperty=ActivableProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./BasicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var ActivableProperty;
ActivableProperty = (function() {
  class ActivableProperty extends BasicProperty {
    isActive() {
      return true;
    }

    manualActive() {
      return this.active;
    }

    callbackActive() {
      var invalidator;
      invalidator = this.activeInvalidator || new Invalidator(this, this.obj);
      invalidator.recycle((invalidator, done) => {
        this.active = this.callOptionFunct(this.activeFunct, invalidator);
        done();
        if (this.active || invalidator.isEmpty()) {
          invalidator.unbind();
          return this.activeInvalidator = null;
        } else {
          this.invalidator = invalidator;
          this.activeInvalidator = invalidator;
          return invalidator.bind();
        }
      });
      return this.active;
    }

    static compose(prop) {
      if (typeof prop.options.active !== "undefined") {
        prop.instanceType.extend(ActivableProperty);
        if (typeof prop.options.active === "boolean") {
          prop.instanceType.prototype.active = prop.options.active;
          return prop.instanceType.prototype.isActive = this.prototype.manualActive;
        } else if (typeof prop.options.active === 'function') {
          prop.instanceType.prototype.activeFunct = prop.options.active;
          return prop.instanceType.prototype.isActive = this.prototype.callbackActive;
        }
      }
    }

  };

  ActivableProperty.extend(Overrider);

  ActivableProperty.overrides({
    get: function() {
      var out;
      if (this.isActive()) {
        out = this.get.withoutActivableProperty();
        if (this.pendingChanges) {
          this.changed(this.pendingOld);
        }
        return out;
      } else {
        this.initiated = true;
        return void 0;
      }
    },
    changed: function(old) {
      if (this.isActive()) {
        this.pendingChanges = false;
        this.pendingOld = void 0;
        this.changed.withoutActivableProperty(old);
      } else {
        this.pendingChanges = true;
        if (typeof this.pendingOld === 'undefined') {
          this.pendingOld = old;
        }
      }
      return this;
    }
  });

  return ActivableProperty;

}).call(this);

return(ActivableProperty);});


},{"../Invalidator":84,"../Overrider":86,"./BasicProperty":90}],90:[function(require,module,exports){
(function(definition){var BasicProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);BasicProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=BasicProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.BasicProperty=BasicProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.BasicProperty=BasicProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Mixable = dependencies.hasOwnProperty("Mixable") ? dependencies.Mixable : require('../Mixable');
var BasicProperty;
BasicProperty = class BasicProperty extends Mixable {
  constructor(property, obj) {
    super();
    this.property = property;
    this.obj = obj;
    this.init();
  }

  init() {
    this.value = this.ingest(this.default);
    return this.calculated = false;
  }

  get() {
    this.calculated = true;
    return this.output();
  }

  set(val) {
    return this.setAndCheckChanges(val);
  }

  callbackSet(val) {
    this.callOptionFunct("set", val);
    return this;
  }

  setAndCheckChanges(val) {
    var old;
    val = this.ingest(val);
    this.revalidated();
    if (this.checkChanges(val, this.value)) {
      old = this.value;
      this.value = val;
      this.manual = true;
      this.changed(old);
    }
    return this;
  }

  checkChanges(val, old) {
    return val !== old;
  }

  destroy() {}

  callOptionFunct(funct, ...args) {
    if (typeof funct === 'string') {
      funct = this.property.options[funct];
    }
    if (typeof funct.overrided === 'function') {
      args.push((...args) => {
        return this.callOptionFunct(funct.overrided, ...args);
      });
    }
    return funct.apply(this.obj, args);
  }

  revalidated() {
    this.calculated = true;
    return this.initiated = true;
  }

  ingest(val) {
    if (typeof this.property.options.ingest === 'function') {
      return val = this.callOptionFunct("ingest", val);
    } else {
      return val;
    }
  }

  output() {
    if (typeof this.property.options.output === 'function') {
      return this.callOptionFunct("output", this.value);
    } else {
      return this.value;
    }
  }

  changed(old) {
    this.callChangedFunctions(old);
    if (typeof this.obj.emitEvent === 'function') {
      this.obj.emitEvent(this.updateEventName, [old]);
      this.obj.emitEvent(this.changeEventName, [old]);
    }
    return this;
  }

  callChangedFunctions(old) {
    if (typeof this.property.options.change === 'function') {
      return this.callOptionFunct("change", old);
    }
  }

  hasChangedFunctions() {
    return typeof this.property.options.change === 'function';
  }

  hasChangedEvents() {
    return typeof this.obj.getListeners === 'function' && this.obj.getListeners(this.changeEventName).length > 0;
  }

  static compose(prop) {
    if (prop.instanceType == null) {
      prop.instanceType = class extends BasicProperty {};
    }
    if (typeof prop.options.set === 'function') {
      prop.instanceType.prototype.set = this.prototype.callbackSet;
    } else {
      prop.instanceType.prototype.set = this.prototype.setAndCheckChanges;
    }
    prop.instanceType.prototype.default = prop.options.default;
    prop.instanceType.prototype.initiated = typeof prop.options.default !== 'undefined';
    return this.setEventNames(prop);
  }

  static setEventNames(prop) {
    prop.instanceType.prototype.changeEventName = prop.options.changeEventName || prop.name + 'Changed';
    prop.instanceType.prototype.updateEventName = prop.options.updateEventName || prop.name + 'Updated';
    return prop.instanceType.prototype.invalidateEventName = prop.options.invalidateEventName || prop.name + 'Invalidated';
  }

  static bind(target, prop) {
    var maj, opt;
    maj = prop.name.charAt(0).toUpperCase() + prop.name.slice(1);
    opt = {
      configurable: true,
      get: function() {
        return prop.getInstance(this).get();
      }
    };
    if (prop.options.set !== false) {
      opt.set = function(val) {
        return prop.getInstance(this).set(val);
      };
    }
    Object.defineProperty(target, prop.name, opt);
    target['get' + maj] = function() {
      return prop.getInstance(this).get();
    };
    if (prop.options.set !== false) {
      target['set' + maj] = function(val) {
        prop.getInstance(this).set(val);
        return this;
      };
    }
    return target['invalidate' + maj] = function() {
      prop.getInstance(this).invalidate();
      return this;
    };
  }

};

return(BasicProperty);});


},{"../Mixable":85}],91:[function(require,module,exports){
(function(definition){var CalculatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);CalculatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=CalculatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.CalculatedProperty=CalculatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.CalculatedProperty=CalculatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var CalculatedProperty;
CalculatedProperty = (function() {
  class CalculatedProperty extends DynamicProperty {
    calcul() {
      this.value = this.callOptionFunct(this.calculFunct);
      this.manual = false;
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function') {
        prop.instanceType.prototype.calculFunct = prop.options.calcul;
        if (!(prop.options.calcul.length > 0)) {
          return prop.instanceType.extend(CalculatedProperty);
        }
      }
    }

  };

  CalculatedProperty.extend(Overrider);

  CalculatedProperty.overrides({
    get: function() {
      var initiated, old;
      if (this.invalidator) {
        this.invalidator.validateUnknowns();
      }
      if (!this.calculated) {
        old = this.value;
        initiated = this.initiated;
        this.calcul();
        if (this.checkChanges(this.value, old)) {
          if (initiated) {
            this.changed(old);
          } else if (typeof this.obj.emitEvent === 'function') {
            this.obj.emitEvent(this.updateEventName, [old]);
          }
        }
      }
      return this.output();
    }
  });

  return CalculatedProperty;

}).call(this);

return(CalculatedProperty);});


},{"../Invalidator":84,"../Overrider":86,"./DynamicProperty":94}],92:[function(require,module,exports){
(function(definition){var CollectionProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);CollectionProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=CollectionProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.CollectionProperty=CollectionProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.CollectionProperty=CollectionProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Collection = dependencies.hasOwnProperty("Collection") ? dependencies.Collection : require('../Collection');
var CollectionProperty;
CollectionProperty = (function() {
  class CollectionProperty extends DynamicProperty {
    ingest(val) {
      if (typeof this.property.options.ingest === 'function') {
        val = this.callOptionFunct("ingest", val);
      }
      if (val == null) {
        return [];
      } else if (typeof val.toArray === 'function') {
        return val.toArray();
      } else if (Array.isArray(val)) {
        return val.slice();
      } else {
        return [val];
      }
    }

    checkChangedItems(val, old) {
      var compareFunction;
      if (typeof this.collectionOptions.compare === 'function') {
        compareFunction = this.collectionOptions.compare;
      }
      return (new Collection(val)).checkChanges(old, this.collectionOptions.ordered, compareFunction);
    }

    output() {
      var col, prop, value;
      value = this.value;
      if (typeof this.property.options.output === 'function') {
        value = this.callOptionFunct("output", this.value);
      }
      prop = this;
      col = Collection.newSubClass(this.collectionOptions, value);
      col.changed = function(old) {
        return prop.changed(old);
      };
      return col;
    }

    callChangedFunctions(old) {
      if (typeof this.property.options.itemAdded === 'function') {
        this.value.forEach((item, i) => {
          if (!old.includes(item)) {
            return this.callOptionFunct("itemAdded", item, i);
          }
        });
      }
      if (typeof this.property.options.itemRemoved === 'function') {
        old.forEach((item, i) => {
          if (!this.value.includes(item)) {
            return this.callOptionFunct("itemRemoved", item, i);
          }
        });
      }
      return super.callChangedFunctions(old);
    }

    hasChangedFunctions() {
      return super.hasChangedFunctions() || typeof this.property.options.itemAdded === 'function' || typeof this.property.options.itemRemoved === 'function';
    }

    static compose(prop) {
      if (prop.options.collection != null) {
        prop.instanceType = class extends CollectionProperty {};
        prop.instanceType.prototype.collectionOptions = Object.assign({}, this.defaultCollectionOptions, typeof prop.options.collection === 'object' ? prop.options.collection : {});
        if (prop.options.collection.compare != null) {
          return prop.instanceType.prototype.checkChanges = this.prototype.checkChangedItems;
        }
      }
    }

  };

  CollectionProperty.defaultCollectionOptions = {
    compare: false,
    ordered: true
  };

  return CollectionProperty;

}).call(this);

return(CollectionProperty);});


},{"../Collection":80,"./DynamicProperty":94}],93:[function(require,module,exports){
(function(definition){var ComposedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);ComposedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=ComposedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.ComposedProperty=ComposedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.ComposedProperty=ComposedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./CalculatedProperty');
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var Collection = dependencies.hasOwnProperty("Collection") ? dependencies.Collection : require('../Collection');
var ComposedProperty;
ComposedProperty = (function() {
  class ComposedProperty extends CalculatedProperty {
    init() {
      super.init();
      return this.initComposed();
    }

    initComposed() {
      if (this.property.options.hasOwnProperty('default')) {
        this.default = this.property.options.default;
      } else {
        this.default = this.value = true;
      }
      this.members = new ComposedProperty.Members(this.property.options.members);
      this.members.changed = (old) => {
        return this.invalidate();
      };
      return this.join = typeof this.property.options.composed === 'function' ? this.property.options.composed : this.property.options.default === false ? ComposedProperty.joinFunctions.or : ComposedProperty.joinFunctions.and;
    }

    calcul() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.members.reduce((prev, member) => {
          var val;
          val = typeof member === 'function' ? member(this.invalidator) : member;
          return this.join(prev, val);
        }, this.default);
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    }

    static compose(prop) {
      if (prop.options.composed != null) {
        return prop.instanceType = class extends ComposedProperty {};
      }
    }

    static bind(target, prop) {
      CalculatedProperty.bind(target, prop);
      return Object.defineProperty(target, prop.name + 'Members', {
        configurable: true,
        get: function() {
          return prop.getInstance(this).members;
        }
      });
    }

  };

  ComposedProperty.joinFunctions = {
    and: function(a, b) {
      return a && b;
    },
    or: function(a, b) {
      return a || b;
    }
  };

  return ComposedProperty;

}).call(this);

ComposedProperty.Members = class Members extends Collection {
  addPropertyRef(name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return invalidator.prop(name, obj);
      };
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  addValueRef(val, name, obj) {
    var fn;
    if (this.findRefIndex(name, obj) === -1) {
      fn = function(invalidator) {
        return val;
      };
      fn.ref = {
        name: name,
        obj: obj,
        val: val
      };
      return this.push(fn);
    }
  }

  setValueRef(val, name, obj) {
    var fn, i, ref;
    i = this.findRefIndex(name, obj);
    if (i === -1) {
      return this.addValueRef(val, name, obj);
    } else if (this.get(i).ref.val !== val) {
      ref = {
        name: name,
        obj: obj,
        val: val
      };
      fn = function(invalidator) {
        return val;
      };
      fn.ref = ref;
      return this.set(i, fn);
    }
  }

  getValueRef(name, obj) {
    return this.findByRef(name, obj).ref.val;
  }

  addFunctionRef(fn, name, obj) {
    if (this.findRefIndex(name, obj) === -1) {
      fn.ref = {
        name: name,
        obj: obj
      };
      return this.push(fn);
    }
  }

  findByRef(name, obj) {
    return this._array[this.findRefIndex(name, obj)];
  }

  findRefIndex(name, obj) {
    return this._array.findIndex(function(member) {
      return (member.ref != null) && member.ref.obj === obj && member.ref.name === name;
    });
  }

  removeRef(name, obj) {
    var index, old;
    index = this.findRefIndex(name, obj);
    if (index !== -1) {
      old = this.toArray();
      this._array.splice(index, 1);
      return this.changed(old);
    }
  }

};

return(ComposedProperty);});


},{"../Collection":80,"../Invalidator":84,"./CalculatedProperty":91}],94:[function(require,module,exports){
(function(definition){var DynamicProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);DynamicProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=DynamicProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.DynamicProperty=DynamicProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.DynamicProperty=DynamicProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var BasicProperty = dependencies.hasOwnProperty("BasicProperty") ? dependencies.BasicProperty : require('./BasicProperty');
var DynamicProperty;
DynamicProperty = class DynamicProperty extends BasicProperty {
  callbackGet() {
    var res;
    res = this.callOptionFunct("get");
    this.revalidated();
    return res;
  }

  invalidate() {
    if (this.calculated || this.active === false) {
      this.calculated = false;
      this._invalidateNotice();
    }
    return this;
  }

  _invalidateNotice() {
    if (this.isImmediate()) {
      this.get();
      return false;
    } else {
      if (typeof this.obj.emitEvent === 'function') {
        this.obj.emitEvent(this.invalidateEventName);
      }
      return true;
    }
  }

  isImmediate() {
    return this.property.options.immediate !== false && (this.property.options.immediate === true || (typeof this.property.options.immediate === 'function' ? this.callOptionFunct("immediate") : this.hasChangedEvents() || this.hasChangedFunctions()));
  }

  static compose(prop) {
    if (typeof prop.options.get === 'function' || typeof prop.options.calcul === 'function' || typeof prop.options.active === 'function') {
      if (prop.instanceType == null) {
        prop.instanceType = class extends DynamicProperty {};
      }
    }
    if (typeof prop.options.get === 'function') {
      return prop.instanceType.prototype.get = this.prototype.callbackGet;
    }
  }

};

return(DynamicProperty);});


},{"../Invalidator":84,"./BasicProperty":90}],95:[function(require,module,exports){
(function(definition){var InvalidatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);InvalidatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=InvalidatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.InvalidatedProperty=InvalidatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.InvalidatedProperty=InvalidatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var CalculatedProperty = dependencies.hasOwnProperty("CalculatedProperty") ? dependencies.CalculatedProperty : require('./CalculatedProperty');
var InvalidatedProperty;
InvalidatedProperty = (function() {
  class InvalidatedProperty extends CalculatedProperty {
    unknown() {
      if (this.calculated || this.active === false) {
        this._invalidateNotice();
      }
      return this;
    }

    static compose(prop) {
      if (typeof prop.options.calcul === 'function' && prop.options.calcul.length > 0) {
        return prop.instanceType.extend(InvalidatedProperty);
      }
    }

  };

  InvalidatedProperty.overrides({
    calcul: function() {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this, this.obj);
      }
      this.invalidator.recycle((invalidator, done) => {
        this.value = this.callOptionFunct(this.calculFunct, invalidator);
        this.manual = false;
        done();
        if (invalidator.isEmpty()) {
          return this.invalidator = null;
        } else {
          return invalidator.bind();
        }
      });
      this.revalidated();
      return this.value;
    },
    destroy: function() {
      this.destroy.withoutInvalidatedProperty();
      if (this.invalidator != null) {
        return this.invalidator.unbind();
      }
    },
    invalidate: function() {
      if (this.calculated || this.active === false) {
        this.calculated = false;
        if (this._invalidateNotice() && !this.calculated && (this.invalidator != null)) {
          this.invalidator.unbind();
        }
      }
      return this;
    }
  });

  return InvalidatedProperty;

}).call(this);

return(InvalidatedProperty);});


},{"../Invalidator":84,"./CalculatedProperty":91}],96:[function(require,module,exports){
(function(definition){var UpdatedProperty=definition(typeof Spark!=="undefined"?Spark:this.Spark);UpdatedProperty.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=UpdatedProperty;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.UpdatedProperty=UpdatedProperty;}else{if(this.Spark==null){this.Spark={};}this.Spark.UpdatedProperty=UpdatedProperty;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Invalidator = dependencies.hasOwnProperty("Invalidator") ? dependencies.Invalidator : require('../Invalidator');
var DynamicProperty = dependencies.hasOwnProperty("DynamicProperty") ? dependencies.DynamicProperty : require('./DynamicProperty');
var Overrider = dependencies.hasOwnProperty("Overrider") ? dependencies.Overrider : require('../Overrider');
var UpdatedProperty;
UpdatedProperty = (function() {
  class UpdatedProperty extends DynamicProperty {
    initRevalidate() {
      this.revalidateCallback = () => {
        this.updating = true;
        this.get();
        this.getUpdater().unbind();
        if (this.pendingChanges) {
          this.changed(this.pendingOld);
        }
        return this.updating = false;
      };
      return this.revalidateCallback.owner = this;
    }

    getUpdater() {
      if (typeof this.updater === 'undefined') {
        if (this.property.options.updater != null) {
          this.updater = this.property.options.updater;
          if (typeof this.updater.getBinder === 'function') {
            this.updater = this.updater.getBinder();
          }
          if (typeof this.updater.bind !== 'function' || typeof this.updater.unbind !== 'function') {
            this.updater = null;
          } else {
            this.updater.callback = this.revalidateCallback;
          }
        } else {
          this.updater = null;
        }
      }
      return this.updater;
    }

    static compose(prop) {
      if (prop.options.updater != null) {
        return prop.instanceType.extend(UpdatedProperty);
      }
    }

  };

  UpdatedProperty.extend(Overrider);

  UpdatedProperty.overrides({
    init: function() {
      this.init.withoutUpdatedProperty();
      return this.initRevalidate();
    },
    _invalidateNotice: function() {
      var res;
      res = this._invalidateNotice.withoutUpdatedProperty();
      if (res) {
        this.getUpdater().bind();
      }
      return res;
    },
    isImmediate: function() {
      return false;
    },
    changed: function(old) {
      if (this.updating) {
        this.pendingChanges = false;
        this.pendingOld = void 0;
        this.changed.withoutUpdatedProperty(old);
      } else {
        this.pendingChanges = true;
        if (typeof this.pendingOld === 'undefined') {
          this.pendingOld = old;
        }
        this.getUpdater().bind();
      }
      return this;
    }
  });

  return UpdatedProperty;

}).call(this);

return(UpdatedProperty);});


},{"../Invalidator":84,"../Overrider":86,"./DynamicProperty":94}],97:[function(require,module,exports){
(function(definition){var Updater=definition(typeof Spark!=="undefined"?Spark:this.Spark);Updater.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Updater;}else{if(typeof Spark!=="undefined"&&Spark!==null){Spark.Updater=Updater;}else{if(this.Spark==null){this.Spark={};}this.Spark.Updater=Updater;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Binder = dependencies.hasOwnProperty("Binder") ? dependencies.Binder : require('./Binder');
var Updater;
Updater = class Updater {
  constructor() {
    this.callbacks = [];
    this.next = [];
    this.updating = false;
  }

  update() {
    var callback;
    this.updating = true;
    this.next = this.callbacks.slice();
    while (this.callbacks.length > 0) {
      callback = this.callbacks.shift();
      callback();
    }
    this.callbacks = this.next;
    this.updating = false;
    return this;
  }

  addCallback(callback) {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
    if (this.updating && !this.next.includes(callback)) {
      return this.next.push(callback);
    }
  }

  nextTick(callback) {
    if (this.updating) {
      if (!this.next.includes(callback)) {
        return this.next.push(callback);
      }
    } else {
      return this.addCallback(callback);
    }
  }

  removeCallback(callback) {
    var index;
    index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
    index = this.next.indexOf(callback);
    if (index !== -1) {
      return this.next.splice(index, 1);
    }
  }

  getBinder() {
    return new Updater.Binder(this);
  }

  destroy() {
    this.callbacks = [];
    return this.next = [];
  }

};

Updater.Binder = (function(superClass) {
  class Binder extends superClass {
    constructor(target, callback1) {
      super();
      this.target = target;
      this.callback = callback1;
    }

    getRef() {
      return {
        target: this.target,
        callback: this.callback
      };
    }

    doBind() {
      return this.target.addCallback(this.callback);
    }

    doUnbind() {
      return this.target.removeCallback(this.callback);
    }

  };

  return Binder;

}).call(this, Binder);

return(Updater);});


},{"./Binder":79}],98:[function(require,module,exports){
if(module){
  module.exports = {
    Binder: require('./Binder.js'),
    Collection: require('./Collection.js'),
    Element: require('./Element.js'),
    EventBind: require('./EventBind.js'),
    EventEmitter: require('./EventEmitter.js'),
    Invalidator: require('./Invalidator.js'),
    Mixable: require('./Mixable.js'),
    Overrider: require('./Overrider.js'),
    Property: require('./Property.js'),
    PropertyOwner: require('./PropertyOwner.js'),
    Updater: require('./Updater.js'),
    ActivableProperty: require('./PropertyTypes/ActivableProperty.js'),
    BasicProperty: require('./PropertyTypes/BasicProperty.js'),
    CalculatedProperty: require('./PropertyTypes/CalculatedProperty.js'),
    CollectionProperty: require('./PropertyTypes/CollectionProperty.js'),
    ComposedProperty: require('./PropertyTypes/ComposedProperty.js'),
    DynamicProperty: require('./PropertyTypes/DynamicProperty.js'),
    InvalidatedProperty: require('./PropertyTypes/InvalidatedProperty.js'),
    UpdatedProperty: require('./PropertyTypes/UpdatedProperty.js')
  };
}
},{"./Binder.js":79,"./Collection.js":80,"./Element.js":81,"./EventBind.js":82,"./EventEmitter.js":83,"./Invalidator.js":84,"./Mixable.js":85,"./Overrider.js":86,"./Property.js":87,"./PropertyOwner.js":88,"./PropertyTypes/ActivableProperty.js":89,"./PropertyTypes/BasicProperty.js":90,"./PropertyTypes/CalculatedProperty.js":91,"./PropertyTypes/CollectionProperty.js":92,"./PropertyTypes/ComposedProperty.js":93,"./PropertyTypes/DynamicProperty.js":94,"./PropertyTypes/InvalidatedProperty.js":95,"./PropertyTypes/UpdatedProperty.js":96,"./Updater.js":97}],99:[function(require,module,exports){
(function(definition){var PathFinder=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);PathFinder.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=PathFinder;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.PathFinder=PathFinder;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.PathFinder=PathFinder;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var PathFinder;
PathFinder = (function() {
  class PathFinder extends Element {
    constructor(tilesContainer, from1, to1, options = {}) {
      super();
      this.tilesContainer = tilesContainer;
      this.from = from1;
      this.to = to1;
      this.reset();
      if (options.validTile != null) {
        this.validTileCallback = options.validTile;
      }
      if (options.arrived != null) {
        this.arrivedCallback = options.arrived;
      }
      if (options.efficiency != null) {
        this.efficiencyCallback = options.efficiency;
      }
    }

    reset() {
      this.queue = [];
      this.paths = {};
      this.solution = null;
      return this.started = false;
    }

    calcul() {
      while (!this.solution && (!this.started || this.queue.length)) {
        this.step();
      }
      return this.getPath();
    }

    step() {
      var next;
      if (this.queue.length) {
        next = this.queue.pop();
        this.addNextSteps(next);
        return true;
      } else if (!this.started) {
        return this.start();
      }
    }

    start() {
      this.started = true;
      if (this.to === false || this.tileIsValid(this.to)) {
        this.addNextSteps();
        return true;
      }
    }

    getPath() {
      var res, step;
      if (this.solution) {
        res = [this.solution];
        step = this.solution;
        while (step.prev != null) {
          res.unshift(step.prev);
          step = step.prev;
        }
        return res;
      }
    }

    getPosAtPrc(prc) {
      if (isNaN(prc)) {
        throw new Error('Invalid number');
      }
      if (this.solution) {
        return this.getPosAtTime(this.solution.getTotalLength() * prc);
      }
    }

    getPosAtTime(time) {
      var prc, step;
      if (this.solution) {
        if (time >= this.solution.getTotalLength()) {
          return this.solution.posToTileOffset(this.solution.getExit().x, this.solution.getExit().y);
        } else {
          step = this.solution;
          while (step.getStartLength() > time && (step.prev != null)) {
            step = step.prev;
          }
          prc = (time - step.getStartLength()) / step.getLength();
          return step.posToTileOffset(step.getEntry().x + (step.getExit().x - step.getEntry().x) * prc, step.getEntry().y + (step.getExit().y - step.getEntry().y) * prc);
        }
      }
    }

    getSolutionTileList() {
      var step, tilelist;
      if (this.solution) {
        step = this.solution;
        tilelist = [step.tile];
        while (step.prev != null) {
          step = step.prev;
          tilelist.unshift(step.tile);
        }
        return tilelist;
      }
    }

    tileIsValid(tile) {
      if (this.validTileCallback != null) {
        return this.validTileCallback(tile);
      } else {
        return (tile != null) && (!tile.emulated || (tile.tile !== 0 && tile.tile !== false));
      }
    }

    getTile(x, y) {
      var ref1;
      if (this.tilesContainer.getTile != null) {
        return this.tilesContainer.getTile(x, y);
      } else if (((ref1 = this.tilesContainer[y]) != null ? ref1[x] : void 0) != null) {
        return {
          x: x,
          y: y,
          tile: this.tilesContainer[y][x],
          emulated: true
        };
      }
    }

    getConnectedToTile(tile) {
      var connected, t;
      if (tile.getConnected != null) {
        return tile.getConnected();
      } else {
        connected = [];
        if (t = this.getTile(tile.x + 1, tile.y)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x - 1, tile.y)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x, tile.y + 1)) {
          connected.push(t);
        }
        if (t = this.getTile(tile.x, tile.y - 1)) {
          connected.push(t);
        }
        return connected;
      }
    }

    addNextSteps(step = null) {
      var i, len, next, ref1, results, tile;
      tile = step != null ? step.nextTile : this.from;
      ref1 = this.getConnectedToTile(tile);
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        next = ref1[i];
        if (this.tileIsValid(next)) {
          results.push(this.addStep(new PathFinder.Step(this, (step != null ? step : null), tile, next)));
        } else {
          results.push(void 0);
        }
      }
      return results;
    }

    tileEqual(tileA, tileB) {
      return tileA === tileB || ((tileA.emulated || tileB.emulated) && tileA.x === tileB.x && tileA.y === tileB.y);
    }

    arrivedAtDestination(step) {
      if (this.arrivedCallback != null) {
        return this.arrivedCallback(step);
      } else {
        return this.tileEqual(step.tile, this.to);
      }
    }

    addStep(step) {
      var solutionCandidate;
      if (this.paths[step.getExit().x] == null) {
        this.paths[step.getExit().x] = {};
      }
      if (!((this.paths[step.getExit().x][step.getExit().y] != null) && this.paths[step.getExit().x][step.getExit().y].getTotalLength() <= step.getTotalLength())) {
        if (this.paths[step.getExit().x][step.getExit().y] != null) {
          this.removeStep(this.paths[step.getExit().x][step.getExit().y]);
        }
        this.paths[step.getExit().x][step.getExit().y] = step;
        this.queue.splice(this.getStepRank(step), 0, step);
        solutionCandidate = new PathFinder.Step(this, step, step.nextTile, null);
        if (this.arrivedAtDestination(solutionCandidate) && !((this.solution != null) && this.solution.prev.getTotalLength() <= step.getTotalLength())) {
          return this.solution = solutionCandidate;
        }
      }
    }

    removeStep(step) {
      var index;
      index = this.queue.indexOf(step);
      if (index > -1) {
        return this.queue.splice(index, 1);
      }
    }

    best() {
      return this.queue[this.queue.length - 1];
    }

    getStepRank(step) {
      if (this.queue.length === 0) {
        return 0;
      } else {
        return this._getStepRank(step.getEfficiency(), 0, this.queue.length - 1);
      }
    }

    _getStepRank(efficiency, min, max) {
      var ref, refPos;
      refPos = Math.floor((max - min) / 2) + min;
      ref = this.queue[refPos].getEfficiency();
      if (ref === efficiency) {
        return refPos;
      } else if (ref > efficiency) {
        if (refPos === min) {
          return min;
        } else {
          return this._getStepRank(efficiency, min, refPos - 1);
        }
      } else {
        if (refPos === max) {
          return max + 1;
        } else {
          return this._getStepRank(efficiency, refPos + 1, max);
        }
      }
    }

  };

  PathFinder.properties({
    validTileCallback: {}
  });

  return PathFinder;

}).call(this);

PathFinder.Step = class Step {
  constructor(pathFinder, prev, tile1, nextTile) {
    this.pathFinder = pathFinder;
    this.prev = prev;
    this.tile = tile1;
    this.nextTile = nextTile;
  }

  posToTileOffset(x, y) {
    var tile;
    tile = Math.floor(x) === this.tile.x && Math.floor(y) === this.tile.y ? this.tile : (this.nextTile != null) && Math.floor(x) === this.nextTile.x && Math.floor(y) === this.nextTile.y ? this.nextTile : (this.prev != null) && Math.floor(x) === this.prev.tile.x && Math.floor(y) === this.prev.tile.y ? this.prev.tile : console.log('Math.floor(' + x + ') == ' + this.tile.x, 'Math.floor(' + y + ') == ' + this.tile.y, this);
    return {
      x: x,
      y: y,
      tile: tile,
      offsetX: x - tile.x,
      offsetY: y - tile.y
    };
  }

  getExit() {
    if (this.exit == null) {
      if (this.nextTile != null) {
        this.exit = {
          x: (this.tile.x + this.nextTile.x + 1) / 2,
          y: (this.tile.y + this.nextTile.y + 1) / 2
        };
      } else {
        this.exit = {
          x: this.tile.x + 0.5,
          y: this.tile.y + 0.5
        };
      }
    }
    return this.exit;
  }

  getEntry() {
    if (this.entry == null) {
      if (this.prev != null) {
        this.entry = {
          x: (this.tile.x + this.prev.tile.x + 1) / 2,
          y: (this.tile.y + this.prev.tile.y + 1) / 2
        };
      } else {
        this.entry = {
          x: this.tile.x + 0.5,
          y: this.tile.y + 0.5
        };
      }
    }
    return this.entry;
  }

  getLength() {
    if (this.length == null) {
      this.length = (this.nextTile == null) || (this.prev == null) ? 0.5 : this.prev.tile.x === this.nextTile.x || this.prev.tile.y === this.nextTile.y ? 1 : Math.sqrt(0.5);
    }
    return this.length;
  }

  getStartLength() {
    if (this.startLength == null) {
      this.startLength = this.prev != null ? this.prev.getTotalLength() : 0;
    }
    return this.startLength;
  }

  getTotalLength() {
    if (this.totalLength == null) {
      this.totalLength = this.getStartLength() + this.getLength();
    }
    return this.totalLength;
  }

  getEfficiency() {
    if (this.efficiency == null) {
      if (typeof this.pathFinder.efficiencyCallback === "function") {
        this.efficiency = this.pathFinder.efficiencyCallback(this);
      } else {
        this.efficiency = -this.getRemaining() * 1.1 - this.getTotalLength();
      }
    }
    return this.efficiency;
  }

  getRemaining() {
    var from, to, x, y;
    if (this.remaining == null) {
      from = this.getExit();
      to = {
        x: this.pathFinder.to.x + 0.5,
        y: this.pathFinder.to.y + 0.5
      };
      x = to.x - from.x;
      y = to.y - from.y;
      this.remaining = Math.sqrt(x * x + y * y);
    }
    return this.remaining;
  }

};

return(PathFinder);});
},{"spark-starter":108}],100:[function(require,module,exports){
var Element, Mixable, PropertiesManager;

PropertiesManager = require('spark-properties').PropertiesManager;

Mixable = require('./Mixable');

module.exports = Element = (function() {
  class Element extends Mixable {
    constructor(data) {
      super();
      this.initPropertiesManager(data);
      this.init();
      this.propertiesManager.initWatchers();
    }

    initPropertiesManager(data) {
      this.propertiesManager = this.propertiesManager.useScope(this);
      this.propertiesManager.initProperties();
      this.propertiesManager.createScopeGetterSetters();
      if (typeof data === "object") {
        this.propertiesManager.setPropertiesData(data);
      }
      return this;
    }

    init() {
      return this;
    }

    tap(name) {
      var args;
      args = Array.prototype.slice.call(arguments);
      if (typeof name === 'function') {
        name.apply(this, args.slice(1));
      } else {
        this[name].apply(this, args.slice(1));
      }
      return this;
    }

    callback(name) {
      if (this._callbacks == null) {
        this._callbacks = {};
      }
      if (this._callbacks[name] == null) {
        this._callbacks[name] = (...args) => {
          this[name].apply(this, args);
          return null;
        };
        this._callbacks[name].owner = this;
      }
      return this._callbacks[name];
    }

    destroy() {
      return this.propertiesManager.destroy();
    }

    getFinalProperties() {
      return ['propertiesManager'];
    }

    extended(target) {
      if (target.propertiesManager) {
        return target.propertiesManager = target.propertiesManager.copyWith(this.propertiesManager.propertiesOptions);
      } else {
        return target.propertiesManager = this.propertiesManager;
      }
    }

    static property(prop, desc) {
      return this.prototype.propertiesManager = this.prototype.propertiesManager.withProperty(prop, desc);
    }

    static properties(properties) {
      return this.prototype.propertiesManager = this.prototype.propertiesManager.copyWith(properties);
    }

  };

  Element.prototype.propertiesManager = new PropertiesManager();

  return Element;

}).call(this);



},{"./Mixable":104,"spark-properties":158}],101:[function(require,module,exports){
var ActivablePropertyWatcher, Invalidator, PropertyWatcher;

PropertyWatcher = require('spark-properties').watchers.PropertyWatcher;

Invalidator = require('spark-properties').Invalidator;

module.exports = ActivablePropertyWatcher = class ActivablePropertyWatcher extends PropertyWatcher {
  loadOptions(options) {
    super.loadOptions(options);
    return this.active = options.active;
  }

  shouldBind() {
    var active;
    if (this.active != null) {
      if (this.invalidator == null) {
        this.invalidator = new Invalidator(this, this.scope);
        this.invalidator.callback = () => {
          return this.checkBind();
        };
      }
      this.invalidator.recycle();
      active = this.active(this.invalidator);
      this.invalidator.endRecycle();
      this.invalidator.bind();
      return active;
    } else {
      return true;
    }
  }

};



},{"spark-properties":158}],102:[function(require,module,exports){
var Invalidated, Invalidator;

Invalidator = require('spark-properties').Invalidator;

module.exports = Invalidated = class Invalidated {
  constructor(options) {
    if (options != null) {
      this.loadOptions(options);
    }
    if (!((options != null ? options.initByLoader : void 0) && (options.loader != null))) {
      this.init();
    }
  }

  loadOptions(options) {
    this.scope = options.scope;
    if (options.loaderAsScope && (options.loader != null)) {
      this.scope = options.loader;
    }
    return this.callback = options.callback;
  }

  init() {
    return this.update();
  }

  unknown() {
    return this.invalidator.validateUnknowns();
  }

  invalidate() {
    return this.update();
  }

  update() {
    if (this.invalidator == null) {
      this.invalidator = new Invalidator(this, this.scope);
    }
    this.invalidator.recycle();
    this.handleUpdate(this.invalidator);
    this.invalidator.endRecycle();
    this.invalidator.bind();
    return this;
  }

  handleUpdate(invalidator) {
    if (this.scope != null) {
      return this.callback.call(this.scope, invalidator);
    } else {
      return this.callback(invalidator);
    }
  }

  destroy() {
    if (this.invalidator) {
      return this.invalidator.unbind();
    }
  }

};



},{"spark-properties":158}],103:[function(require,module,exports){
var Loader, Overrider;

Overrider = require('./Overrider');

module.exports = Loader = (function() {
  class Loader extends Overrider {
    constructor() {
      super();
      this.initPreloaded();
    }

    initPreloaded() {
      var defList;
      defList = this.preloaded;
      this.preloaded = [];
      return this.load(defList);
    }

    load(defList) {
      var loaded, toLoad;
      toLoad = [];
      loaded = defList.map((def) => {
        var instance;
        if (def.instance == null) {
          def = Object.assign({
            loader: this
          }, def);
          instance = Loader.load(def);
          def = Object.assign({
            instance: instance
          }, def);
          if (def.initByLoader && (instance.init != null)) {
            toLoad.push(instance);
          }
        }
        return def;
      });
      this.preloaded = this.preloaded.concat(loaded);
      return toLoad.forEach(function(instance) {
        return instance.init();
      });
    }

    preload(def) {
      if (!Array.isArray(def)) {
        def = [def];
      }
      return this.preloaded = (this.preloaded || []).concat(def);
    }

    destroyLoaded() {
      return this.preloaded.forEach(function(def) {
        var ref;
        return (ref = def.instance) != null ? typeof ref.destroy === "function" ? ref.destroy() : void 0 : void 0;
      });
    }

    getFinalProperties() {
      return super.getFinalProperties().concat(['preloaded']);
    }

    extended(target) {
      super.extended(target);
      if (this.preloaded) {
        return target.preloaded = (target.preloaded || []).concat(this.preloaded);
      }
    }

    static loadMany(def) {
      return def.map((d) => {
        return this.load(d);
      });
    }

    static load(def) {
      if (typeof def.type.copyWith === "function") {
        return def.type.copyWith(def);
      } else {
        return new def.type(def);
      }
    }

    static preload(def) {
      return this.prototype.preload(def);
    }

  };

  Loader.prototype.preloaded = [];

  Loader.overrides({
    init: function() {
      this.init.withoutLoader();
      return this.initPreloaded();
    },
    destroy: function() {
      this.destroy.withoutLoader();
      return this.destroyLoaded();
    }
  });

  return Loader;

}).call(this);



},{"./Overrider":105}],104:[function(require,module,exports){
var Mixable,
  indexOf = [].indexOf;

module.exports = Mixable = (function() {
  class Mixable {
    static extend(obj) {
      this.Extension.make(obj, this);
      if (obj.prototype != null) {
        return this.Extension.make(obj.prototype, this.prototype);
      }
    }

    static include(obj) {
      return this.Extension.make(obj, this.prototype);
    }

  };

  Mixable.Extension = {
    makeOnce: function(source, target) {
      var ref;
      if (!((ref = target.extensions) != null ? ref.includes(source) : void 0)) {
        return this.make(source, target);
      }
    },
    make: function(source, target) {
      var i, len, originalFinalProperties, prop, ref;
      ref = this.getExtensionProperties(source, target);
      for (i = 0, len = ref.length; i < len; i++) {
        prop = ref[i];
        Object.defineProperty(target, prop.name, prop);
      }
      if (source.getFinalProperties && target.getFinalProperties) {
        originalFinalProperties = target.getFinalProperties;
        target.getFinalProperties = function() {
          return source.getFinalProperties().concat(originalFinalProperties.call(this));
        };
      } else {
        target.getFinalProperties = source.getFinalProperties || target.getFinalProperties;
      }
      target.extensions = (target.extensions || []).concat([source]);
      if (typeof source.extended === 'function') {
        return source.extended(target);
      }
    },
    alwaysFinal: ['extended', 'extensions', '__super__', 'constructor', 'getFinalProperties'],
    getExtensionProperties: function(source, target) {
      var alwaysFinal, props, targetChain;
      alwaysFinal = this.alwaysFinal;
      targetChain = this.getPrototypeChain(target);
      props = [];
      this.getPrototypeChain(source).every(function(obj) {
        var exclude;
        if (!targetChain.includes(obj)) {
          exclude = alwaysFinal;
          if (source.getFinalProperties != null) {
            exclude = exclude.concat(source.getFinalProperties());
          }
          if (typeof obj === 'function') {
            exclude = exclude.concat(["length", "prototype", "name"]);
          }
          props = props.concat(Object.getOwnPropertyNames(obj).filter((key) => {
            return !target.hasOwnProperty(key) && key.substr(0, 2) !== "__" && indexOf.call(exclude, key) < 0 && !props.find(function(prop) {
              return prop.name === key;
            });
          }).map(function(key) {
            var prop;
            prop = Object.getOwnPropertyDescriptor(obj, key);
            prop.name = key;
            return prop;
          }));
          return true;
        }
      });
      return props;
    },
    getPrototypeChain: function(obj) {
      var basePrototype, chain;
      chain = [];
      basePrototype = Object.getPrototypeOf(Object);
      while (true) {
        chain.push(obj);
        if (!((obj = Object.getPrototypeOf(obj)) && obj !== Object && obj !== basePrototype)) {
          break;
        }
      }
      return chain;
    }
  };

  return Mixable;

}).call(this);



},{}],105:[function(require,module,exports){
// todo : 
//  simplified form : @withoutName method
var Overrider;

module.exports = Overrider = (function() {
  class Overrider {
    static overrides(overrides) {
      return this.Override.applyMany(this.prototype, this.name, overrides);
    }

    getFinalProperties() {
      if (this._overrides != null) {
        return ['_overrides'].concat(Object.keys(this._overrides));
      } else {
        return [];
      }
    }

    extended(target) {
      if (this._overrides != null) {
        this.constructor.Override.applyMany(target, this.constructor.name, this._overrides);
      }
      if (this.constructor === Overrider) {
        return target.extended = this.extended;
      }
    }

  };

  Overrider.Override = {
    makeMany: function(target, namespace, overrides) {
      var fn, key, override, results;
      results = [];
      for (key in overrides) {
        fn = overrides[key];
        results.push(override = this.make(target, namespace, key, fn));
      }
      return results;
    },
    applyMany: function(target, namespace, overrides) {
      var key, override, results;
      results = [];
      for (key in overrides) {
        override = overrides[key];
        if (typeof override === "function") {
          override = this.make(target, namespace, key, override);
        }
        results.push(this.apply(target, namespace, override));
      }
      return results;
    },
    make: function(target, namespace, fnName, fn) {
      var override;
      override = {
        fn: {
          current: fn
        },
        name: fnName
      };
      override.fn['with' + namespace] = fn;
      return override;
    },
    emptyFn: function() {},
    apply: function(target, namespace, override) {
      var fnName, overrides, ref, ref1, without;
      fnName = override.name;
      overrides = target._overrides != null ? Object.assign({}, target._overrides) : {};
      without = ((ref = target._overrides) != null ? (ref1 = ref[fnName]) != null ? ref1.fn.current : void 0 : void 0) || target[fnName];
      override = Object.assign({}, override);
      if (overrides[fnName] != null) {
        override.fn = Object.assign({}, overrides[fnName].fn, override.fn);
      } else {
        override.fn = Object.assign({}, override.fn);
      }
      override.fn['without' + namespace] = without || this.emptyFn;
      if (without == null) {
        override.missingWithout = 'without' + namespace;
      } else if (override.missingWithout) {
        override.fn[override.missingWithout] = without;
      }
      Object.defineProperty(target, fnName, {
        configurable: true,
        get: function() {
          var finalFn, fn, key, ref2;
          finalFn = override.fn.current.bind(this);
          ref2 = override.fn;
          for (key in ref2) {
            fn = ref2[key];
            finalFn[key] = fn.bind(this);
          }
          if (this.constructor.prototype !== this) {
            Object.defineProperty(this, fnName, {
              value: finalFn
            });
          }
          return finalFn;
        }
      });
      overrides[fnName] = override;
      return target._overrides = overrides;
    }
  };

  return Overrider;

}).call(this);



},{}],106:[function(require,module,exports){
var Binder, Updater;

Binder = require('spark-binding').Binder;

module.exports = Updater = class Updater {
  constructor(options) {
    var ref;
    this.callbacks = [];
    this.next = [];
    this.updating = false;
    if ((options != null ? options.callback : void 0) != null) {
      this.addCallback(options.callback);
    }
    if ((options != null ? (ref = options.callbacks) != null ? ref.forEach : void 0 : void 0) != null) {
      options.callbacks.forEach((callback) => {
        return this.addCallback(callback);
      });
    }
  }

  update() {
    var callback;
    this.updating = true;
    this.next = this.callbacks.slice();
    while (this.callbacks.length > 0) {
      callback = this.callbacks.shift();
      this.runCallback(callback);
    }
    this.callbacks = this.next;
    this.updating = false;
    return this;
  }

  runCallback(callback) {
    return callback();
  }

  addCallback(callback) {
    if (!this.callbacks.includes(callback)) {
      this.callbacks.push(callback);
    }
    if (this.updating && !this.next.includes(callback)) {
      return this.next.push(callback);
    }
  }

  nextTick(callback) {
    if (this.updating) {
      if (!this.next.includes(callback)) {
        return this.next.push(callback);
      }
    } else {
      return this.addCallback(callback);
    }
  }

  removeCallback(callback) {
    var index;
    index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
    index = this.next.indexOf(callback);
    if (index !== -1) {
      return this.next.splice(index, 1);
    }
  }

  getBinder() {
    return new Updater.Binder(this);
  }

  destroy() {
    this.callbacks = [];
    return this.next = [];
  }

};

Updater.Binder = (function(superClass) {
  class Binder extends superClass {
    constructor(target, callback1) {
      super();
      this.target = target;
      this.callback = callback1;
    }

    getRef() {
      return {
        target: this.target,
        callback: this.callback
      };
    }

    doBind() {
      return this.target.addCallback(this.callback);
    }

    doUnbind() {
      return this.target.removeCallback(this.callback);
    }

  };

  return Binder;

}).call(this, Binder);



},{"spark-binding":152}],107:[function(require,module,exports){
module.exports = {
  "Element": require("./Element"),
  "Loader": require("./Loader"),
  "Mixable": require("./Mixable"),
  "Overrider": require("./Overrider"),
  "Updater": require("./Updater"),
  "Invalidated": {
    "ActivablePropertyWatcher": require("./Invalidated/ActivablePropertyWatcher"),
    "Invalidated": require("./Invalidated/Invalidated"),
  },
}
},{"./Element":100,"./Invalidated/ActivablePropertyWatcher":101,"./Invalidated/Invalidated":102,"./Loader":103,"./Mixable":104,"./Overrider":105,"./Updater":106}],108:[function(require,module,exports){
var libs;

libs = require('./libs');

module.exports = Object.assign({
  'Collection': require('spark-collection')
}, libs, require('spark-properties'), require('spark-binding'));



},{"./libs":107,"spark-binding":152,"spark-collection":156,"spark-properties":158}],109:[function(require,module,exports){
if (typeof module !== "undefined" && module !== null) {
  module.exports = {
      greekAlphabet: require('./strings/greekAlphabet'),
      starNames: require('./strings/starNames')
  };
}
},{"./strings/greekAlphabet":110,"./strings/starNames":111}],110:[function(require,module,exports){
module.exports=[
"alpha",   "beta",    "gamma",   "delta",
"epsilon", "zeta",    "eta",     "theta",
"iota",    "kappa",   "lambda",  "mu",
"nu",      "xi",      "omicron", "pi",	
"rho",     "sigma",   "tau",     "upsilon",
"phi",     "chi",     "psi",     "omega"
]
},{}],111:[function(require,module,exports){
module.exports=[
"Achernar",     "Maia",        "Atlas",        "Salm",       "Alnilam",      "Nekkar",      "Elnath",       "Thuban",
"Achird",       "Marfik",      "Auva",         "Sargas",     "Alnitak",      "Nihal",       "Enif",         "Torcularis",
"Acrux",        "Markab",      "Avior",        "Sarin",      "Alphard",      "Nunki",       "Etamin",       "Turais",
"Acubens",      "Matar",       "Azelfafage",   "Sceptrum",   "Alphekka",     "Nusakan",     "Fomalhaut",    "Tyl",
"Adara",        "Mebsuta",     "Azha",         "Scheat",     "Alpheratz",    "Peacock",     "Fornacis",     "Unukalhai",
"Adhafera",     "Megrez",      "Azmidiske",    "Segin",      "Alrai",        "Phad",        "Furud",        "Vega",
"Adhil",        "Meissa",      "Baham",        "Seginus",    "Alrisha",      "Phaet",       "Gacrux",       "Vindemiatrix",
"Agena",        "Mekbuda",     "Becrux",       "Sham",       "Alsafi",       "Pherkad",     "Gianfar",      "Wasat",
"Aladfar",      "Menkalinan",  "Beid",         "Sharatan",   "Alsciaukat",   "Pleione",     "Gomeisa",      "Wezen",
"Alathfar",     "Menkar",      "Bellatrix",    "Shaula",     "Alshain",      "Polaris",     "Graffias",     "Wezn",
"Albaldah",     "Menkent",     "Betelgeuse",   "Shedir",     "Alshat",       "Pollux",      "Grafias",      "Yed",
"Albali",       "Menkib",      "Botein",       "Sheliak",    "Alsuhail",     "Porrima",     "Grumium",      "Yildun",
"Albireo",      "Merak",       "Brachium",     "Sirius",     "Altair",       "Praecipua",   "Hadar",        "Zaniah",
"Alchiba",      "Merga",       "Canopus",      "Situla",     "Altarf",       "Procyon",     "Haedi",        "Zaurak",
"Alcor",        "Merope",      "Capella",      "Skat",       "Alterf",       "Propus",      "Hamal",        "Zavijah",
"Alcyone",      "Mesarthim",   "Caph",         "Spica",      "Aludra",       "Rana",        "Hassaleh",     "Zibal",
"Alderamin",    "Metallah",    "Castor",       "Sterope",    "Alula",        "Ras",         "Heze",         "Zosma",
"Aldhibah",     "Miaplacidus", "Cebalrai",     "Sualocin",   "Alya",         "Rasalgethi",  "Hoedus",       "Aquarius",
"Alfirk",       "Minkar",      "Celaeno",      "Subra",      "Alzirr",       "Rasalhague",  "Homam",        "Aries",
"Algenib",      "Mintaka",     "Chara",        "Suhail",     "Ancha",        "Rastaban",    "Hyadum",       "Cepheus",
"Algieba",      "Mira",        "Chort",        "Sulafat",    "Angetenar",    "Regulus",     "Izar",         "Cetus",
"Algol",        "Mirach",      "Cursa",        "Syrma",      "Ankaa",        "Rigel",       "Jabbah",       "Columba",
"Algorab",      "Miram",       "Dabih",        "Tabit",      "Anser",        "Rotanev",     "Kajam",        "Coma",
"Alhena",       "Mirphak",     "Deneb",        "Talitha",    "Antares",      "Ruchba",      "Kaus",         "Corona",
"Alioth",       "Mizar",       "Denebola",     "Tania",      "Arcturus",     "Ruchbah",     "Keid",         "Crux",
"Alkaid",       "Mufrid",      "Dheneb",       "Tarazed",    "Arkab",        "Rukbat",      "Kitalpha",     "Draco",
"Alkalurops",   "Muliphen",    "Diadem",       "Taygeta",    "Arneb",        "Sabik",       "Kocab",        "Grus",
"Alkes",        "Murzim",      "Diphda",       "Tegmen",     "Arrakis",      "Sadalachbia", "Kornephoros",  "Hydra",
"Alkurhah",     "Muscida",     "Dschubba",     "Tejat",      "Ascella",      "Sadalmelik",  "Kraz",         "Lacerta",
"Almaak",       "Naos",        "Dsiban",       "Terebellum", "Asellus",      "Sadalsuud",   "Kuma",         "Mensa",
"Alnair",       "Nash",        "Dubhe",        "Thabit",     "Asterope",     "Sadr",        "Lesath",       "Maasym",
"Alnath",       "Nashira",     "Electra",      "Theemim",    "Atik",         "Saiph",       "Phoenix",      "Norma"
]
},{}],112:[function(require,module,exports){
module.exports = {
  /**
   * @param {{x: number, y: number}} coord
   * @param {number} angle
   * @param {{x: number, y: number}} origin
   * @returns {{x: number, y: number}}
   */
  rotate: function (coord, angle, origin = { x: 0, y: 0 }) {
    const recenterX = coord.x - origin.x
    const recenterY = coord.y - origin.y
    return {
      x: Math.round(Math.cos(angle) * recenterX - Math.sin(angle) * recenterY) + origin.x + 0,
      y: Math.round(Math.sin(angle) * recenterX + Math.cos(angle) * recenterY) + origin.y + 0
    }
  }
}

},{}],113:[function(require,module,exports){

const CoordHelper = require('./CoordHelper')

class Direction {
  constructor (name, x, y, angle, inverseName) {
    this.name = name
    this.x = x
    this.y = y
    this.angle = angle
    this.inverseName = inverseName
  }

  getInverse () {
    return this.constructor[this.inverseName]
  }

  rotate (angle) {
    const coord = CoordHelper.rotate(this, angle)
    return Direction.all.find((d) => {
      return d.x === coord.x && d.y === coord.y
    })
  }
}

Direction.up = new Direction('up', 0, -1, 0, 'down')

Direction.down = new Direction('down', 0, 1, Math.PI, 'up')

Direction.left = new Direction('left', -1, 0, Math.PI / 2 * 3, 'right')

Direction.right = new Direction('right', 1, 0, Math.PI / 2, 'left')

Direction.adjacents = [Direction.up, Direction.down, Direction.left, Direction.right]

Direction.topLeft = new Direction('topLeft', -1, -1, Math.PI / 4 * 7, 'bottomRight')

Direction.topRight = new Direction('topRight', 1, -1, Math.PI / 4, 'bottomLeft')

Direction.bottomRight = new Direction('bottomRight', 1, 1, Math.PI / 4 * 3, 'topLeft')

Direction.bottomLeft = new Direction('bottomLeft', -1, 1, Math.PI / 4 * 5, 'topRight')

Direction.corners = [Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft]

Direction.all = [Direction.up, Direction.down, Direction.left, Direction.right, Direction.topLeft, Direction.topRight, Direction.bottomRight, Direction.bottomLeft]

module.exports = Direction

},{"./CoordHelper":112}],114:[function(require,module,exports){
const Element = require('spark-starter').Element
const Direction = require('./Direction')
const CoordHelper = require('./CoordHelper')

class Tile extends Element {
  constructor (xOrOptions, y = 0) {
    let opt = xOrOptions
    if (typeof xOrOptions !== 'object') {
      opt = { x: xOrOptions, y: y }
    }
    super(opt)
    this.x = opt.x
    this.y = opt.y
  }

  getRelativeTile (x, y) {
    if (x === 0 && y === 0) {
      return this
    }
    if (this.container != null) {
      return this.container.getTile(this.x + x, this.y + y)
    }
  }

  findDirectionOf (tile) {
    if (tile.tile) {
      tile = tile.tile
    }
    if ((tile.x != null) && (tile.y != null)) {
      return Direction.all.find((d) => {
        return d.x === tile.x - this.x && d.y === tile.y - this.y
      })
    }
  }

  addChild (child, checkRef = true) {
    var index
    index = this.children.indexOf(child)
    if (index === -1) {
      this.children.push(child)
    }
    if (checkRef) {
      child.tile = this
    }
    return child
  }

  removeChild (child, checkRef = true) {
    var index
    index = this.children.indexOf(child)
    if (index > -1) {
      this.children.splice(index, 1)
    }
    if (checkRef && child.tile === this) {
      child.tile = null
    }
  }

  dist (tile) {
    var ctnDist, ref, x, y
    if ((tile != null ? tile.getFinalTile : null) != null) {
      tile = tile.getFinalTile()
    }
    if (((tile != null ? tile.x : null) != null) && (tile.y != null) && (this.x != null) && (this.y != null) && (this.container === tile.container || (ctnDist = (ref = this.container) != null ? typeof ref.dist === 'function' ? ref.dist(tile.container) : null : null))) {
      x = tile.x - this.x
      y = tile.y - this.y
      if (ctnDist) {
        x += ctnDist.x
        y += ctnDist.y
      }
      return {
        x: x,
        y: y,
        length: Math.sqrt(x * x + y * y)
      }
    } else {
      return null
    }
  }

  /**
   * @param {number} angle
   * @param {{x: number, y: number}} origin
   * @returns {this}
   */
  copyAndRotate (angle, origin = { x: 0, y: 0 }) {
    const TileClass = this.constructor
    const data = Object.assign(
      this.propertiesManager.getManualDataProperties(),
      CoordHelper.rotate(this, angle, origin)
    )
    return new TileClass(data)
  }

  getFinalTile () {
    return this
  }

  getCoord () {
    return { x: this.x, y: this.y }
  }
};

Tile.properties({
  children: {
    collection: true
  },
  container: {
    change: function () {
      if (this.container != null) {
        return this.adjacentTiles.forEach(function (tile) {
          return tile.adjacentTilesProperty.invalidate()
        })
      }
    }
  },
  adjacentTiles: {
    calcul: function (invalidation) {
      if (invalidation.prop(this.containerProperty)) {
        return Direction.adjacents.map((d) => {
          return this.getRelativeTile(d.x, d.y)
        }).filter((t) => {
          return t != null
        })
      }
    },
    collection: true
  }
})

module.exports = Tile

},{"./CoordHelper":112,"./Direction":113,"spark-starter":127}],115:[function(require,module,exports){
const Element = require('spark-starter').Element
const TileReference = require('./TileReference')

class TileContainer extends Element {
  _addToBondaries (tile, boundaries) {
    if ((boundaries.top == null) || tile.y < boundaries.top) {
      boundaries.top = tile.y
    }
    if ((boundaries.left == null) || tile.x < boundaries.left) {
      boundaries.left = tile.x
    }
    if ((boundaries.bottom == null) || tile.y > boundaries.bottom) {
      boundaries.bottom = tile.y
    }
    if ((boundaries.right == null) || tile.x > boundaries.right) {
      boundaries.right = tile.x
    }
  }

  init () {
    this.coords = {}
    this.tiles = []
  }

  addTile (tile) {
    if (!this.tiles.includes(tile)) {
      this.tiles.push(tile)
      if (this.coords[tile.x] == null) {
        this.coords[tile.x] = {}
      }
      this.coords[tile.x][tile.y] = tile
      if (this.owner) {
        tile.container = this
      }
      if (this.boundariesProperty.getter.calculated) {
        this._addToBondaries(tile, this.boundariesProperty.value)
      }
    }
    return this
  }

  removeTile (tile) {
    var index
    index = this.tiles.indexOf(tile)
    if (index > -1) {
      this.tiles.splice(index, 1)
      delete this.coords[tile.x][tile.y]
      if (this.owner) {
        tile.container = null
      }
      if (this.boundariesProperty.getter.calculated) {
        if (this.boundaries.top === tile.y || this.boundaries.bottom === tile.y || this.boundaries.left === tile.x || this.boundaries.right === tile.x) {
          return this.boundariesProperty.invalidate()
        }
      }
    }
  }

  removeTileAt (x, y) {
    const tile = this.getTile(x, y)
    if (tile) {
      return this.removeTile(tile)
    }
  }

  getTile (x, y) {
    var ref
    if (((ref = this.coords[x]) != null ? ref[y] : null) != null) {
      return this.coords[x][y]
    }
  }

  loadMatrix (matrix, offset = { x: 0, y: 0 }) {
    var options, row, tile, x, y
    for (y in matrix) {
      row = matrix[y]
      for (x in row) {
        tile = row[x]
        options = {
          x: parseInt(x) + offset.x,
          y: parseInt(y) + offset.y
        }
        if (typeof tile === 'function') {
          this.addTile(tile(options))
        } else {
          tile.x = options.x
          tile.y = options.y
          this.addTile(tile)
        }
      }
    }
    return this
  }

  reduceMatrix (matrix, initalValue = null, offset = { x: 0, y: 0 }) {
    let value = initalValue
    for (const y in matrix) {
      const row = matrix[y]
      for (const x in row) {
        const fn = row[x]
        const pos = {
          x: parseInt(x) + offset.x,
          y: parseInt(y) + offset.y
        }
        value = fn(value, this.getTile(pos.x, pos.y), pos)
      }
    }
    return value
  }

  inRange (tile, range) {
    var found, i, j, ref, ref1, ref2, ref3, tiles, x, y
    tiles = []
    range--
    for (x = i = ref = tile.x - range, ref1 = tile.x + range; (ref <= ref1 ? i <= ref1 : i >= ref1); x = ref <= ref1 ? ++i : --i) {
      for (y = j = ref2 = tile.y - range, ref3 = tile.y + range; (ref2 <= ref3 ? j <= ref3 : j >= ref3); y = ref2 <= ref3 ? ++j : --j) {
        if (Math.sqrt((x - tile.x) * (x - tile.x) + (y - tile.y) * (y - tile.y)) <= range && ((found = this.getTile(x, y)) != null)) {
          tiles.push(found)
        }
      }
    }
    return tiles
  }

  allTiles () {
    return this.tiles.slice()
  }

  clearAll () {
    var i, len, ref, tile
    if (this.owner) {
      ref = this.tiles
      for (i = 0, len = ref.length; i < len; i++) {
        tile = ref[i]
        tile.container = null
      }
    }
    this.coords = {}
    this.tiles = []
    return this
  }

  closest (originTile, filter) {
    var candidates, getScore
    getScore = function (candidate) {
      if (candidate.score == null) {
        candidate.score = candidate.getFinalTile().dist(originTile).length
      }
      return candidate.score
    }
    candidates = this.tiles.filter(filter).map((t) => {
      return new TileReference(t)
    })
    candidates.sort((a, b) => {
      return getScore(a) - getScore(b)
    })
    if (candidates.length > 0) {
      return candidates[0].tile
    } else {
      return null
    }
  }

  copy () {
    var out
    out = new TileContainer()
    out.coords = this.coords
    out.tiles = this.tiles
    out.owner = false
    return out
  }

  merge (ctn, mergeFn, asOwner = false) {
    var out, tmp
    out = new TileContainer()
    out.owner = asOwner
    tmp = ctn.copy()
    this.tiles.forEach(function (tileA) {
      var mergedTile, tileB
      tileB = tmp.getTile(tileA.x, tileA.y)
      if (tileB) {
        tmp.removeTile(tileB)
      }
      mergedTile = mergeFn(tileA, tileB)
      if (mergedTile) {
        return out.addTile(mergedTile)
      }
    })
    tmp.tiles.forEach(function (tileB) {
      var mergedTile
      mergedTile = mergeFn(null, tileB)
      if (mergedTile) {
        return out.addTile(mergedTile)
      }
    })
    return out
  }
};

TileContainer.properties({
  owner: {
    default: true
  },
  boundaries: {
    calcul: function () {
      var boundaries
      boundaries = {
        top: null,
        left: null,
        bottom: null,
        right: null
      }
      this.tiles.forEach((tile) => {
        return this._addToBondaries(tile, boundaries)
      })
      return boundaries
    },
    output: function (val) {
      return Object.assign({}, val)
    }
  }
})

module.exports = TileContainer

},{"./TileReference":116,"spark-starter":127}],116:[function(require,module,exports){
class TileReference {
  constructor (tile) {
    this.tile = tile
    Object.defineProperties(this, {
      x: {
        get: () => {
          return this.getFinalTile().x
        }
      },
      y: {
        get: () => {
          return this.getFinalTile().y
        }
      }
    })
  }

  getFinalTile () {
    return this.tile.getFinalTile()
  }
}
module.exports = TileReference

},{}],117:[function(require,module,exports){
const Element = require('spark-starter').Element

class Tiled extends Element {
  putOnRandomTile (tiles) {
    var found
    found = this.getRandomValidTile(tiles)
    if (found) {
      this.tile = found
    }
  }

  getRandomValidTile (tiles, validator = this.canGoOnTile.bind(this)) {
    var candidate, pos, remaining
    remaining = tiles.slice()
    while (remaining.length > 0) {
      pos = Math.floor(Math.random() * remaining.length)
      candidate = remaining.splice(pos, 1)[0]
      if (validator(candidate)) {
        return candidate
      }
    }
    return null
  }

  canGoOnTile (tile) {
    return true
  }

  getFinalTile () {
    return this.tile.getFinalTile()
  }
};

Tiled.properties({
  tile: {
    change: function (val, old) {
      if (old != null) {
        old.removeChild(this)
      }
      if (this.tile) {
        return this.tile.addChild(this)
      }
    }
  },
  offsetX: {
    default: 0
  },
  offsetY: {
    default: 0
  }
})

module.exports = Tiled

},{"spark-starter":127}],118:[function(require,module,exports){
module.exports = {
  CoordHelper: require('./CoordHelper'),
  Direction: require('./Direction'),
  Tile: require('./Tile'),
  TileContainer: require('./TileContainer'),
  TileReference: require('./TileReference'),
  Tiled: require('./Tiled')
}

},{"./CoordHelper":112,"./Direction":113,"./Tile":114,"./TileContainer":115,"./TileReference":116,"./Tiled":117}],119:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./Mixable":123,"dup":100,"spark-properties":158}],120:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101,"spark-properties":158}],121:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102,"spark-properties":158}],122:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"./Overrider":124,"dup":103}],123:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],124:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"dup":105}],125:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"spark-binding":152}],126:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"./Element":119,"./Invalidated/ActivablePropertyWatcher":120,"./Invalidated/Invalidated":121,"./Loader":122,"./Mixable":123,"./Overrider":124,"./Updater":125,"dup":107}],127:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"./libs":126,"dup":108,"spark-binding":152,"spark-collection":156,"spark-properties":158}],128:[function(require,module,exports){
(function (process,setImmediate){
(function(definition){var Timing=definition(typeof Parallelio!=="undefined"?Parallelio:this.Parallelio);Timing.definition=definition;if(typeof module!=="undefined"&&module!==null){module.exports=Timing;}else{if(typeof Parallelio!=="undefined"&&Parallelio!==null){Parallelio.Timing=Timing;}else{if(this.Parallelio==null){this.Parallelio={};}this.Parallelio.Timing=Timing;}}})(function(dependencies){if(dependencies==null){dependencies={};}
var Element = dependencies.hasOwnProperty("Element") ? dependencies.Element : require('spark-starter').Element;
var Timing;
Timing = (function() {
  class Timing extends Element {
    toggle(val) {
      if (typeof val === "undefined") {
        val = !this.running;
      }
      return this.running = val;
    }

    setTimeout(callback, time) {
      return new this.constructor.Timer({
        time: time,
        callback: callback,
        timing: this
      });
    }

    setInterval(callback, time) {
      return new this.constructor.Timer({
        time: time,
        callback: callback,
        repeat: true,
        timing: this
      });
    }

    pause() {
      return this.toggle(false);
    }

    unpause() {
      return this.toggle(true);
    }

  };

  Timing.properties({
    running: {
      default: true
    }
  });

  return Timing;

}).call(this);

Timing.Timer = (function() {
  class Timer extends Element {
    toggle(val) {
      if (typeof val === "undefined") {
        val = !this.paused;
      }
      return this.paused = val;
    }

    immediateInvalidation() {
      if (this.running) {
        return this.elapsedTimeProperty.invalidate({
          preventImmediate: true,
          origin: this
        });
      }
    }

    pause() {
      return this.toggle(true);
    }

    unpause() {
      return this.toggle(false);
    }

    start() {
      this.startTime = this.constructor.now();
      if (this.repeat) {
        return this.id = setInterval(this.tick.bind(this), this.remainingTime);
      } else {
        return this.id = setTimeout(this.tick.bind(this), this.remainingTime);
      }
    }

    stop() {
      this.remainingTime = this.time - (this.constructor.now() - this.startTime);
      if (this.repeat) {
        return clearInterval(this.id);
      } else {
        return clearTimeout(this.id);
      }
    }

    static now() {
      var ref;
      if ((typeof window !== "undefined" && window !== null ? (ref = window.performance) != null ? ref.now : void 0 : void 0) != null) {
        return window.performance.now();
      } else if ((typeof process !== "undefined" && process !== null ? process.uptime : void 0) != null) {
        return process.uptime() * 1000;
      } else {
        return Date.now();
      }
    }

    tick() {
      this.repetition += 1;
      if (this.callback != null) {
        this.callback();
      }
      if (this.repeat) {
        this.startTime = this.constructor.now();
        return this.remainingTime = this.time;
      } else {
        this.running = false;
        return this.remainingTime = 0;
      }
    }

    destroy() {
      if (this.repeat) {
        clearInterval(this.id);
      } else {
        clearTimeout(this.id);
      }
      this.running = false;
      return this.propertiesManager.destroy();
    }

  };

  Timer.properties({
    time: {
      default: 1000
    },
    paused: {
      default: false
    },
    running: {
      calcul: function(invalidator) {
        return !invalidator.prop(this.pausedProperty) && invalidator.propPath('timing.running') !== false;
      },
      change: function(val, old) {
        if (val) {
          return this.start();
        } else if (old) {
          return this.stop();
        }
      }
    },
    timing: {
      default: null
    },
    elapsedTime: {
      calcul: function(invalidator) {
        if (invalidator.prop(this.runningProperty)) {
          setImmediate(() => {
            return this.immediateInvalidation();
          });
          return this.constructor.now() - this.startTime + this.time - this.remainingTime;
        } else {
          return this.time - this.remainingTime;
        }
      },
      set: function(val) {
        if (this.running) {
          this.stop();
          this.remainingTime = this.time - val;
          if (this.remainingTime <= 0) {
            return this.tick();
          } else {
            return this.start();
          }
        } else {
          this.remainingTime = this.time - val;
          return this.elapsedTimeProperty.invalidate();
        }
      }
    },
    prc: {
      calcul: function(invalidator) {
        return invalidator.prop(this.elapsedTimeProperty) / this.time;
      },
      set: function(val) {
        return this.elapsedTime = this.time * val;
      }
    },
    remainingTime: {
      calcul: function(invalidator) {
        return this.time;
      }
    },
    repeat: {
      default: false
    },
    repetition: {
      default: 0
    },
    callback: {
      default: null
    }
  });

  return Timer;

}).call(this);

return(Timing);});
}).call(this,require('_process'),require("timers").setImmediate)

},{"_process":25,"spark-starter":185,"timers":26}],129:[function(require,module,exports){
var CollectionPropertyWatcher, Connected, Element, SignalOperation;

Element = require('spark-starter').Element;

SignalOperation = require('./SignalOperation');

CollectionPropertyWatcher = require('spark-starter').watchers.CollectionPropertyWatcher;

module.exports = Connected = (function() {
  class Connected extends Element {
    canConnectTo(target) {
      return typeof target.addSignal === "function";
    }

    acceptSignal(signal) {
      return true;
    }

    onAddConnection(conn) {}

    onRemoveConnection(conn) {}

    onNewSignalType(signal) {}

    onAddSignal(signal, op) {}

    onRemoveSignal(signal, op) {}

    onRemoveSignalType(signal, op) {}

    onReplaceSignal(oldSignal, newSignal, op) {}

    containsSignal(signal, checkLast = false, checkOrigin) {
      return this.signals.find(function(c) {
        return c.match(signal, checkLast, checkOrigin);
      });
    }

    addSignal(signal, op) {
      var autoStart;
      if (!(op != null ? op.findLimiter(this) : void 0)) {
        if (!op) {
          op = new SignalOperation();
          autoStart = true;
        }
        op.addOperation(() => {
          var similar;
          if (!this.containsSignal(signal, true) && this.acceptSignal(signal)) {
            similar = this.containsSignal(signal);
            this.signals.push(signal);
            this.onAddSignal(signal, op);
            if (!similar) {
              return this.onNewSignalType(signal, op);
            }
          }
        });
        if (autoStart) {
          op.start();
        }
      }
      return signal;
    }

    removeSignal(signal, op) {
      var autoStart;
      if (!(op != null ? op.findLimiter(this) : void 0)) {
        if (!op) {
          op = new SignalOperation;
          autoStart = true;
        }
        op.addOperation(() => {
          var existing;
          if ((existing = this.containsSignal(signal, true)) && this.acceptSignal(signal)) {
            this.signals.splice(this.signals.indexOf(existing), 1);
            this.onRemoveSignal(signal, op);
            op.addOperation(() => {
              var similar;
              similar = this.containsSignal(signal);
              if (similar) {
                return this.onReplaceSignal(signal, similar, op);
              } else {
                return this.onRemoveSignalType(signal, op);
              }
            }, 0);
          }
          if (stepByStep) {
            return op.step();
          }
        });
        if (autoStart) {
          return op.start();
        }
      }
    }

    prepForwardedSignal(signal) {
      if (signal.last === this) {
        return signal;
      } else {
        return signal.withLast(this);
      }
    }

    checkForwardWatcher() {
      if (!this.forwardWatcher) {
        this.forwardWatcher = new CollectionPropertyWatcher({
          scope: this,
          property: 'outputs',
          onAdded: function(output, i) {
            return this.forwardedSignals.forEach((signal) => {
              return this.forwardSignalTo(signal, output);
            });
          },
          onRemoved: function(output, i) {
            return this.forwardedSignals.forEach((signal) => {
              return this.stopForwardedSignalTo(signal, output);
            });
          }
        });
        return this.forwardWatcher.bind();
      }
    }

    forwardSignal(signal, op) {
      var next;
      this.forwardedSignals.add(signal);
      next = this.prepForwardedSignal(signal);
      this.outputs.forEach(function(conn) {
        if (signal.last !== conn) {
          return conn.addSignal(next, op);
        }
      });
      return this.checkForwardWatcher();
    }

    forwardAllSignalsTo(conn, op) {
      return this.signals.forEach((signal) => {
        var next;
        next = this.prepForwardedSignal(signal);
        return conn.addSignal(next, op);
      });
    }

    stopForwardedSignal(signal, op) {
      var next;
      this.forwardedSignals.remove(signal);
      next = this.prepForwardedSignal(signal);
      return this.outputs.forEach(function(conn) {
        if (signal.last !== conn) {
          return conn.removeSignal(next, op);
        }
      });
    }

    stopAllForwardedSignalTo(conn, op) {
      return this.signals.forEach((signal) => {
        var next;
        next = this.prepForwardedSignal(signal);
        return conn.removeSignal(next, op);
      });
    }

    forwardSignalTo(signal, conn, op) {
      var next;
      next = this.prepForwardedSignal(signal);
      if (signal.last !== conn) {
        return conn.addSignal(next, op);
      }
    }

    stopForwardedSignalTo(signal, conn, op) {
      var next;
      next = this.prepForwardedSignal(signal);
      if (signal.last !== conn) {
        return conn.removeSignal(next, op);
      }
    }

  };

  Connected.properties({
    signals: {
      collection: true
    },
    inputs: {
      collection: true
    },
    outputs: {
      collection: true
    },
    forwardedSignals: {
      collection: true
    }
  });

  return Connected;

}).call(this);

},{"./SignalOperation":131,"spark-starter":151}],130:[function(require,module,exports){
var Element, Signal;

Element = require('spark-starter').Element;

module.exports = Signal = class Signal extends Element {
  constructor(origin, type = 'signal', exclusive = false) {
    super();
    this.origin = origin;
    this.type = type;
    this.exclusive = exclusive;
    this.last = this.origin;
  }

  withLast(last) {
    var signal;
    signal = new this.__proto__.constructor(this.origin, this.type, this.exclusive);
    signal.last = last;
    return signal;
  }

  copy() {
    var signal;
    signal = new this.__proto__.constructor(this.origin, this.type, this.exclusive);
    signal.last = this.last;
    return signal;
  }

  match(signal, checkLast = false, checkOrigin = this.exclusive) {
    return (!checkLast || signal.last === this.last) && (checkOrigin || signal.origin === this.origin) && signal.type === this.type;
  }

};

},{"spark-starter":151}],131:[function(require,module,exports){
var Element, SignalOperation;

Element = require('spark-starter').Element;

module.exports = SignalOperation = class SignalOperation extends Element {
  constructor() {
    super();
    this.queue = [];
    this.limiters = [];
  }

  addOperation(funct, priority = 1) {
    if (priority) {
      return this.queue.unshift(funct);
    } else {
      return this.queue.push(funct);
    }
  }

  addLimiter(connected) {
    if (!this.findLimiter(connected)) {
      return this.limiters.push(connected);
    }
  }

  findLimiter(connected) {
    return this.limiters.indexOf(connected) > -1;
  }

  start() {
    var results;
    results = [];
    while (this.queue.length) {
      results.push(this.step());
    }
    return results;
  }

  step() {
    var funct;
    if (this.queue.length === 0) {
      return this.done();
    } else {
      funct = this.queue.shift(funct);
      return funct(this);
    }
  }

  done() {}

};

},{"spark-starter":151}],132:[function(require,module,exports){
var Connected, Signal, SignalOperation, SignalSource;

Connected = require('./Connected');

Signal = require('./Signal');

SignalOperation = require('./SignalOperation');

module.exports = SignalSource = (function() {
  class SignalSource extends Connected {};

  SignalSource.properties({
    activated: {
      change: function() {
        var op;
        op = new SignalOperation();
        if (this.activated) {
          this.forwardSignal(this.signal, op);
        } else {
          this.stopForwardedSignal(this.signal, op);
        }
        return op.start();
      }
    },
    signal: {
      calcul: function() {
        return new Signal(this, 'power', true);
      }
    }
  });

  return SignalSource;

}).call(this);

},{"./Connected":129,"./Signal":130,"./SignalOperation":131}],133:[function(require,module,exports){
var Connected, Switch;

Connected = require('./Connected');

module.exports = Switch = class Switch extends Connected {};

},{"./Connected":129}],134:[function(require,module,exports){
var Connected, Direction, Tiled, Wire,
  indexOf = [].indexOf;

Tiled = require('parallelio-tiles').Tiled;

Direction = require('parallelio-tiles').Direction;

Connected = require('./Connected');

module.exports = Wire = (function() {
  class Wire extends Tiled {
    constructor(wireType = 'red') {
      super();
      this.wireType = wireType;
    }

    findDirectionsTo(conn) {
      var directions;
      directions = conn.tiles != null ? conn.tiles.map((tile) => {
        return this.tile.findDirectionOf(tile);
      }) : [this.tile.findDirectionOf(conn)];
      return directions.filter(function(d) {
        return d != null;
      });
    }

    canConnectTo(target) {
      return Connected.prototype.canConnectTo.call(this, target) && ((target.wireType == null) || target.wireType === this.wireType);
    }

    onNewSignalType(signal, op) {
      return this.forwardSignal(signal, op);
    }

  };

  Wire.extend(Connected);

  Wire.properties({
    outputs: {
      calcul: function(invalidation) {
        var parent;
        parent = invalidation.prop(this.tileProperty);
        if (parent) {
          return invalidation.prop(parent.adjacentTilesProperty).reduce((res, tile) => {
            return res.concat(invalidation.prop(tile.childrenProperty).filter((child) => {
              return this.canConnectTo(child);
            }).toArray());
          }, []);
        } else {
          return [];
        }
      }
    },
    connectedDirections: {
      calcul: function(invalidation) {
        return invalidation.prop(this.outputsProperty).reduce((out, conn) => {
          this.findDirectionsTo(conn).forEach(function(d) {
            if (indexOf.call(out, d) < 0) {
              return out.push(d);
            }
          });
          return out;
        }, []);
      }
    }
  });

  return Wire;

}).call(this);

},{"./Connected":129,"parallelio-tiles":142}],135:[function(require,module,exports){
module.exports = {
  "Connected": require("./Connected"),
  "Signal": require("./Signal"),
  "SignalOperation": require("./SignalOperation"),
  "SignalSource": require("./SignalSource"),
  "Switch": require("./Switch"),
  "Wire": require("./Wire"),
}
},{"./Connected":129,"./Signal":130,"./SignalOperation":131,"./SignalSource":132,"./Switch":133,"./Wire":134}],136:[function(require,module,exports){
arguments[4][112][0].apply(exports,arguments)
},{"dup":112}],137:[function(require,module,exports){
arguments[4][113][0].apply(exports,arguments)
},{"./CoordHelper":136,"dup":113}],138:[function(require,module,exports){
arguments[4][114][0].apply(exports,arguments)
},{"./CoordHelper":136,"./Direction":137,"dup":114,"spark-starter":151}],139:[function(require,module,exports){
arguments[4][115][0].apply(exports,arguments)
},{"./TileReference":140,"dup":115,"spark-starter":151}],140:[function(require,module,exports){
arguments[4][116][0].apply(exports,arguments)
},{"dup":116}],141:[function(require,module,exports){
arguments[4][117][0].apply(exports,arguments)
},{"dup":117,"spark-starter":151}],142:[function(require,module,exports){
arguments[4][118][0].apply(exports,arguments)
},{"./CoordHelper":136,"./Direction":137,"./Tile":138,"./TileContainer":139,"./TileReference":140,"./Tiled":141,"dup":118}],143:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./Mixable":147,"dup":100,"spark-properties":158}],144:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101,"spark-properties":158}],145:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102,"spark-properties":158}],146:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"./Overrider":148,"dup":103}],147:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],148:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"dup":105}],149:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"spark-binding":152}],150:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"./Element":143,"./Invalidated/ActivablePropertyWatcher":144,"./Invalidated/Invalidated":145,"./Loader":146,"./Mixable":147,"./Overrider":148,"./Updater":149,"dup":107}],151:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"./libs":150,"dup":108,"spark-binding":152,"spark-collection":156,"spark-properties":158}],152:[function(require,module,exports){
module.exports = {
  Binder: require('./src/Binder'),
  EventBind: require('./src/EventBind'),
  Reference: require('./src/Reference')
}

},{"./src/Binder":153,"./src/EventBind":154,"./src/Reference":155}],153:[function(require,module,exports){
class Binder {
  toggleBind (val = !this.binded) {
    if (val) {
      return this.bind()
    } else {
      return this.unbind()
    }
  }

  bind () {
    if (!this.binded && this.canBind()) {
      this.doBind()
    }
    this.binded = true
    return this
  }

  canBind () {
    return true
  }

  doBind () {
    throw new Error('Not implemented')
  }

  unbind () {
    if (this.binded && this.canBind()) {
      this.doUnbind()
    }
    this.binded = false
    return this
  }

  doUnbind () {
    throw new Error('Not implemented')
  }

  destroy () {
    this.unbind()
  }
};

module.exports = Binder

},{}],154:[function(require,module,exports){

const Binder = require('./Binder')
const Reference = require('./Reference')

class EventBind extends Binder {
  constructor (event1, target1, callback) {
    super()
    this.event = event1
    this.target = target1
    this.callback = callback
  }

  canBind () {
    return (this.callback != null) && (this.target != null)
  }

  bindTo (target) {
    this.unbind()
    this.target = target
    return this.bind()
  }

  doBind () {
    if (typeof this.target.addEventListener === 'function') {
      return this.target.addEventListener(this.event, this.callback)
    } else if (typeof this.target.addListener === 'function') {
      return this.target.addListener(this.event, this.callback)
    } else if (typeof this.target.on === 'function') {
      return this.target.on(this.event, this.callback)
    } else {
      throw new Error('No function to add event listeners was found')
    }
  }

  doUnbind () {
    if (typeof this.target.removeEventListener === 'function') {
      return this.target.removeEventListener(this.event, this.callback)
    } else if (typeof this.target.removeListener === 'function') {
      return this.target.removeListener(this.event, this.callback)
    } else if (typeof this.target.off === 'function') {
      return this.target.off(this.event, this.callback)
    } else {
      throw new Error('No function to remove event listeners was found')
    }
  }

  equals (eventBind) {
    return eventBind != null &&
      eventBind.constructor === this.constructor &&
      eventBind.event === this.event &&
      Reference.compareVal(eventBind.target, this.target) &&
      Reference.compareVal(eventBind.callback, this.callback)
  }

  static checkEmitter (emitter, fatal = true) {
    if (typeof emitter.addEventListener === 'function' || typeof emitter.addListener === 'function' || typeof emitter.on === 'function') {
      return true
    } else if (fatal) {
      throw new Error('No function to add event listeners was found')
    } else {
      return false
    }
  }
}
module.exports = EventBind

},{"./Binder":153,"./Reference":155}],155:[function(require,module,exports){
class Reference {
  constructor (data) {
    this.data = data
  }

  equals (ref) {
    return ref != null && ref.constructor === this.constructor && this.compareData(ref.data)
  }

  compareData (data) {
    if (data instanceof Reference) {
      return this.equals(data)
    }
    if (this.data === data) {
      return true
    }
    if (this.data == null || data == null) {
      return false
    }
    if (typeof this.data === 'object' && typeof data === 'object') {
      return Object.keys(this.data).length === Object.keys(data).length && Object.keys(data).every((key) => {
        return Reference.compareVal(this.data[key], data[key])
      })
    }
    return Reference.compareVal(this.data, data)
  }

  /**
   * @param {*} val1
   * @param {*} val2
   * @return {boolean}
   */
  static compareVal (val1, val2) {
    if (val1 === val2) {
      return true
    }
    if (val1 == null || val2 == null) {
      return false
    }
    if (typeof val1.equals === 'function') {
      return val1.equals(val2)
    }
    if (typeof val2.equals === 'function') {
      return val2.equals(val1)
    }
    if (Array.isArray(val1) && Array.isArray(val2)) {
      return val1.length === val2.length && val1.every((val, i) => {
        return this.compareVal(val, val2[i])
      })
    }
    // if (typeof val1 === 'object' && typeof val2 === 'object') {
    //   return Object.keys(val1).length === Object.keys(val2).length && Object.keys(val1).every((key) => {
    //     return this.compareVal(val1[key], val2[key])
    //   })
    // }
    return false
  }

  static makeReferred (obj, data) {
    if (data instanceof Reference) {
      obj.ref = data
    } else {
      obj.ref = new Reference(data)
    }
    obj.equals = function (obj2) {
      return obj2 != null && this.ref.equals(obj2.ref)
    }
    return obj
  }
};

module.exports = Reference

},{}],156:[function(require,module,exports){
module.exports = require('./src/Collection')

},{"./src/Collection":157}],157:[function(require,module,exports){
/**
 * @template T
 */
class Collection {
  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   */
  constructor (arr) {
    if (arr != null) {
      if (typeof arr.toArray === 'function') {
        this._array = arr.toArray()
      } else if (Array.isArray(arr)) {
        this._array = arr
      } else {
        this._array = [arr]
      }
    } else {
      this._array = []
    }
  }

  changed () {}

  /**
   * @param {Collection.<T>|Array.<T>} old
   * @param {boolean} ordered
   * @param {function(T,T): boolean} compareFunction
   * @return {boolean}
   */
  checkChanges (old, ordered = true, compareFunction = null) {
    if (compareFunction == null) {
      compareFunction = function (a, b) {
        return a === b
      }
    }
    if (old != null) {
      old = this.copy(old.slice())
    } else {
      old = []
    }
    return this.count() !== old.length || (ordered ? this.some(function (val, i) {
      return !compareFunction(old.get(i), val)
    }) : this.some(function (a) {
      return !old.pluck(function (b) {
        return compareFunction(a, b)
      })
    }))
  }

  /**
   * @param {number} i
   * @return {T}
   */
  get (i) {
    return this._array[i]
  }

  /**
   * @return {T}
   */
  getRandom () {
    return this._array[Math.floor(Math.random() * this._array.length)]
  }

  /**
   * @param {number} i
   * @param {T} val
   * @return {T}
   */
  set (i, val) {
    var old
    if (this._array[i] !== val) {
      old = this.toArray()
      this._array[i] = val
      this.changed(old)
    }
    return val
  }

  /**
   * @param {T} val
   */
  add (val) {
    if (!this._array.includes(val)) {
      return this.push(val)
    }
    return this
  }

  /**
   * @param {T} val
   */
  remove (val) {
    var index, old
    index = this._array.indexOf(val)
    if (index !== -1) {
      old = this.toArray()
      this._array.splice(index, 1)
      this.changed(old)
    }
    return this
  }

  /**
   * @param {function(T): boolean} fn
   * @return {T}
   */
  pluck (fn) {
    var found, index, old
    index = this._array.findIndex(fn)
    if (index > -1) {
      old = this.toArray()
      found = this._array[index]
      this._array.splice(index, 1)
      this.changed(old)
      return found
    } else {
      return null
    }
  }

  /**
   * @return {Array.<T>}
   */
  toArray () {
    return this._array.slice()
  }

  /**
   * @return {number}
   */
  count () {
    return this._array.length
  }

  /**
   * @template ItemType
   * @param {Object} toAppend
   * @param {Collection.<ItemType>|Array.<ItemType>|ItemType} [arr]
   * @return {Collection.<ItemType>}
   */
  static newSubClass (toAppend, arr) {
    var SubClass
    if (typeof toAppend === 'object') {
      SubClass = class extends this {}
      Object.assign(SubClass.prototype, toAppend)
      return new SubClass(arr)
    } else {
      return new this(arr)
    }
  }

  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   * @return {Collection.<T>}
   */
  copy (arr) {
    var coll
    if (arr == null) {
      arr = this.toArray()
    }
    coll = new this.constructor(arr)
    return coll
  }

  /**
   * @param {*} arr
   * @return {boolean}
   */
  equals (arr) {
    return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function (val, i) {
      return arr[i] === val
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getAddedFrom (arr) {
    return this._array.filter(function (item) {
      return !arr.includes(item)
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getRemovedFrom (arr) {
    return arr.filter((item) => {
      return !this.includes(item)
    })
  }
};

Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString']

Collection.readListFunctions = ['concat', 'filter', 'slice']

Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift']

Collection.readFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this._array[funct](...arg)
  }
})

Collection.readListFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this.copy(this._array[funct](...arg))
  }
})

Collection.writefunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    var old, res
    old = this.toArray()
    res = this._array[funct](...arg)
    this.changed(old)
    return res
  }
})

Object.defineProperty(Collection.prototype, 'length', {
  get: function () {
    return this.count()
  }
})

if (typeof Symbol !== 'undefined' && Symbol !== null ? Symbol.iterator : 0) {
  Collection.prototype[Symbol.iterator] = function () {
    return this._array[Symbol.iterator]()
  }
}

module.exports = Collection

},{}],158:[function(require,module,exports){
module.exports = {
  Invalidator: require('./src/Invalidator'),
  PropertiesManager: require('./src/PropertiesManager'),
  Property: require('./src/Property'),
  getters: {
    BaseGetter: require('./src/getters/BaseGetter'),
    CalculatedGetter: require('./src/getters/CalculatedGetter'),
    CompositeGetter: require('./src/getters/CompositeGetter'),
    InvalidatedGetter: require('./src/getters/InvalidatedGetter'),
    ManualGetter: require('./src/getters/ManualGetter'),
    SimpleGetter: require('./src/getters/SimpleGetter')
  },
  setters: {
    BaseSetter: require('./src/setters/BaseSetter'),
    BaseValueSetter: require('./src/setters/BaseValueSetter'),
    CollectionSetter: require('./src/setters/CollectionSetter'),
    ManualSetter: require('./src/setters/ManualSetter'),
    SimpleSetter: require('./src/setters/SimpleSetter')
  },
  watchers: {
    CollectionPropertyWatcher: require('./src/watchers/CollectionPropertyWatcher'),
    PropertyWatcher: require('./src/watchers/PropertyWatcher')
  }
}

},{"./src/Invalidator":161,"./src/PropertiesManager":162,"./src/Property":163,"./src/getters/BaseGetter":164,"./src/getters/CalculatedGetter":165,"./src/getters/CompositeGetter":166,"./src/getters/InvalidatedGetter":167,"./src/getters/ManualGetter":168,"./src/getters/SimpleGetter":169,"./src/setters/BaseSetter":170,"./src/setters/BaseValueSetter":171,"./src/setters/CollectionSetter":172,"./src/setters/ManualSetter":173,"./src/setters/SimpleSetter":174,"./src/watchers/CollectionPropertyWatcher":175,"./src/watchers/PropertyWatcher":176}],159:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"./src/Collection":160,"dup":156}],160:[function(require,module,exports){
/**
 * @template T
 */
class Collection {
  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   */
  constructor (arr) {
    if (arr != null) {
      if (typeof arr.toArray === 'function') {
        this._array = arr.toArray()
      } else if (Array.isArray(arr)) {
        this._array = arr
      } else {
        this._array = [arr]
      }
    } else {
      this._array = []
    }
  }

  changed () {}

  /**
   * @param {Collection.<T>|Array.<T>} old
   * @param {boolean} ordered
   * @param {function(T,T): boolean} compareFunction
   * @return {boolean}
   */
  checkChanges (old, ordered = true, compareFunction = null) {
    if (compareFunction == null) {
      compareFunction = function (a, b) {
        return a === b
      }
    }
    if (old != null) {
      old = this.copy(old.slice())
    } else {
      old = []
    }
    return this.count() !== old.length || (ordered ? this.some(function (val, i) {
      return !compareFunction(old.get(i), val)
    }) : this.some(function (a) {
      return !old.pluck(function (b) {
        return compareFunction(a, b)
      })
    }))
  }

  /**
   * @param {number} i
   * @return {T}
   */
  get (i) {
    return this._array[i]
  }

  /**
   * @return {T}
   */
  getRandom () {
    return this._array[Math.floor(Math.random() * this._array.length)]
  }

  /**
   * @param {number} i
   * @param {T} val
   * @return {T}
   */
  set (i, val) {
    var old
    if (this._array[i] !== val) {
      old = this.toArray()
      this._array[i] = val
      this.changed(old)
    }
    return val
  }

  /**
   * @param {T} val
   */
  add (val) {
    if (!this._array.includes(val)) {
      return this.push(val)
    }
    return this
  }

  /**
   * @param {T} val
   */
  remove (val) {
    var index, old
    index = this._array.indexOf(val)
    if (index !== -1) {
      old = this.toArray()
      this._array.splice(index, 1)
      this.changed(old)
    }
    return this
  }

  /**
   * @param {function(T): boolean} fn
   * @return {T}
   */
  pluck (fn) {
    var found, index, old
    index = this._array.findIndex(fn)
    if (index > -1) {
      old = this.toArray()
      found = this._array[index]
      this._array.splice(index, 1)
      this.changed(old)
      return found
    } else {
      return null
    }
  }

  /**
   * @param {Array.<Collection.<T>>|Array.<Array.<T>>|Array.<T>} arr
   * @return {Collection.<T>}
   */
  concat (...arr) {
    return this.copy(this._array.concat(...arr.map((a) => a.toArray == null ? a : a.toArray())))
  }

  /**
   * @return {Array.<T>}
   */
  toArray () {
    return this._array.slice()
  }

  /**
   * @return {number}
   */
  count () {
    return this._array.length
  }

  /**
   * @template ItemType
   * @param {Object} toAppend
   * @param {Collection.<ItemType>|Array.<ItemType>|ItemType} [arr]
   * @return {Collection.<ItemType>}
   */
  static newSubClass (toAppend, arr) {
    var SubClass
    if (typeof toAppend === 'object') {
      SubClass = class extends this {}
      Object.assign(SubClass.prototype, toAppend)
      return new SubClass(arr)
    } else {
      return new this(arr)
    }
  }

  /**
   * @param {Collection.<T>|Array.<T>|T} [arr]
   * @return {Collection.<T>}
   */
  copy (arr) {
    var coll
    if (arr == null) {
      arr = this.toArray()
    }
    coll = new this.constructor(arr)
    return coll
  }

  /**
   * @param {*} arr
   * @return {boolean}
   */
  equals (arr) {
    return (this.count() === (typeof arr.count === 'function' ? arr.count() : arr.length)) && this.every(function (val, i) {
      return arr[i] === val
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getAddedFrom (arr) {
    return this._array.filter(function (item) {
      return !arr.includes(item)
    })
  }

  /**
   * @param {Collection.<T>|Array.<T>} arr
   * @return {Array.<T>}
   */
  getRemovedFrom (arr) {
    return arr.filter((item) => {
      return !this.includes(item)
    })
  }
};

Collection.readFunctions = ['every', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'reduce', 'reduceRight', 'some', 'toString']

Collection.readListFunctions = ['filter', 'slice']

Collection.writefunctions = ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift']

Collection.readFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this._array[funct](...arg)
  }
})

Collection.readListFunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    return this.copy(this._array[funct](...arg))
  }
})

Collection.writefunctions.forEach(function (funct) {
  Collection.prototype[funct] = function (...arg) {
    var old, res
    old = this.toArray()
    res = this._array[funct](...arg)
    this.changed(old)
    return res
  }
})

Object.defineProperty(Collection.prototype, 'length', {
  get: function () {
    return this.count()
  }
})

if (typeof Symbol !== 'undefined' && Symbol !== null ? Symbol.iterator : 0) {
  Collection.prototype[Symbol.iterator] = function () {
    return this._array[Symbol.iterator]()
  }
}

module.exports = Collection

},{}],161:[function(require,module,exports){
const Binder = require('spark-binding').Binder
const EventBind = require('spark-binding').EventBind

const pluck = function (arr, fn) {
  var found, index
  index = arr.findIndex(fn)
  if (index > -1) {
    found = arr[index]
    arr.splice(index, 1)
    return found
  } else {
    return null
  }
}

class Invalidator extends Binder {
  constructor (invalidated, scope = null) {
    super()
    this.invalidated = invalidated
    this.scope = scope
    this.invalidationEvents = []
    this.recycled = []
    this.unknowns = []
    this.strict = this.constructor.strict
    this.invalid = false
    this.invalidateCallback = () => {
      this.invalidate()
    }
    this.invalidateCallback.owner = this
    this.changedCallback = (old, context) => {
      this.invalidate(context)
    }
    this.changedCallback.owner = this
  }

  invalidate (context) {
    var functName
    this.invalid = true
    if (typeof this.invalidated === 'function') {
      this.invalidated(context)
    } else if (typeof this.callback === 'function') {
      this.callback(context)
    } else if ((this.invalidated != null) && typeof this.invalidated.invalidate === 'function') {
      this.invalidated.invalidate(context)
    } else if (typeof this.invalidated === 'string') {
      functName = 'invalidate' + this.invalidated.charAt(0).toUpperCase() + this.invalidated.slice(1)
      if (typeof this.scope[functName] === 'function') {
        this.scope[functName](context)
      } else {
        this.scope[this.invalidated] = null
      }
    }
    return this
  }

  unknown (context) {
    if (this.invalidated != null && typeof this.invalidated.unknown === 'function') {
      return this.invalidated.unknown(context)
    } else {
      return this.invalidate(context)
    }
  }

  addEventBind (event, target, callback) {
    return this.addBinder(new EventBind(event, target, callback))
  }

  addBinder (binder) {
    if (binder.callback == null) {
      binder.callback = this.invalidateCallback
    }
    if (!this.invalidationEvents.some(function (eventBind) {
      return eventBind.equals(binder)
    })) {
      return this.invalidationEvents.push(pluck(this.recycled, function (eventBind) {
        return eventBind.equals(binder)
      }) || binder)
    }
  }

  getUnknownCallback (prop) {
    var callback
    callback = (context) => {
      return this.addUnknown(function () {
        return prop.get()
      }, prop, context)
    }
    callback.prop = prop
    callback.owner = this
    return callback
  }

  addUnknown (fn, prop, context) {
    if (!this.findUnknown(prop)) {
      fn.prop = prop
      fn.owner = this
      this.unknowns.push(fn)
      return this.unknown(context)
    }
  }

  findUnknown (prop) {
    if (prop != null) {
      return this.unknowns.find(function (unknown) {
        return unknown.prop === prop
      })
    }
  }

  event (event, target = this.scope) {
    if (this.checkEmitter(target)) {
      return this.addEventBind(event, target)
    }
  }

  value (val, event, target = this.scope) {
    this.event(event, target)
    return val
  }

  /**
   * @template T
   * @param {Property<T>} prop
   * @return {T}
   */
  prop (prop) {
    if (prop != null) {
      this.addEventBind('invalidated', prop.events, this.getUnknownCallback(prop))
      this.addEventBind('updated', prop.events, this.changedCallback)
      return prop.get()
    }
  }

  propByName (prop, target = this.scope) {
    if (target.propertiesManager != null) {
      const property = target.propertiesManager.getProperty(prop)
      if (property) {
        return this.prop(property)
      }
    }
    if (target[prop + 'Property'] != null) {
      return this.prop(target[prop + 'Property'])
    }
    return target[prop]
  }

  propPath (path, target = this.scope) {
    var prop, val
    path = path.split('.')
    val = target
    while ((val != null) && path.length > 0) {
      prop = path.shift()
      val = this.propByName(prop, val)
    }
    return val
  }

  funct (funct) {
    var invalidator, res
    invalidator = new Invalidator(() => {
      return this.addUnknown(() => {
        var res2
        res2 = funct(invalidator)
        if (res !== res2) {
          return this.invalidate()
        }
      }, invalidator)
    })
    res = funct(invalidator)
    this.invalidationEvents.push(invalidator)
    return res
  }

  validateUnknowns () {
    this.unknowns.slice().forEach(function (unknown) {
      unknown()
    })
    this.unknowns = []
    return this
  }

  isEmpty () {
    return this.invalidationEvents.length === 0
  }

  bind () {
    this.invalid = false
    this.invalidationEvents.forEach(function (eventBind) {
      eventBind.bind()
    })
    return this
  }

  recycle (fn) {
    var done, res
    this.recycled = this.invalidationEvents
    this.invalidationEvents = []
    done = this.endRecycle.bind(this)
    if (typeof fn === 'function') {
      if (fn.length > 1) {
        return fn(this, done)
      } else {
        res = fn(this)
        done()
        return res
      }
    } else {
      return done
    }
  }

  endRecycle () {
    this.recycled.forEach(function (eventBind) {
      return eventBind.unbind()
    })
    this.recycled = []
    return this
  }

  checkEmitter (emitter) {
    return EventBind.checkEmitter(emitter, this.strict)
  }

  checkPropInstance (prop) {
    return typeof prop.get === 'function' && this.checkEmitter(prop.events)
  }

  unbind () {
    this.invalidationEvents.forEach(function (eventBind) {
      eventBind.unbind()
    })
    return this
  }
};

Invalidator.strict = true

module.exports = Invalidator

},{"spark-binding":152}],162:[function(require,module,exports){
const Property = require('./Property')

class PropertiesManager {
  constructor (properties = {}, options = {}) {
    /**
     * @type {Array.<Property>}
     */
    this.properties = []
    this.globalOptions = Object.assign({ initWatchers: false }, options)
    this.propertiesOptions = Object.assign({}, properties)
  }

  /**
   * @param {*} properties
   * @param {*} options
   * @return {PropertiesManager}
   */
  copyWith (properties = {}, options = {}) {
    return new this.constructor(this.mergePropertiesOptions(this.propertiesOptions, properties), Object.assign({}, this.globalOptions, options))
  }

  withProperty (prop, options) {
    const properties = {}
    properties[prop] = options
    return this.copyWith(properties)
  }

  useScope (scope) {
    return this.copyWith({}, { scope: scope })
  }

  mergePropertiesOptions (...arg) {
    return arg.reduce((res, opt) => {
      Object.keys(opt).forEach((name) => {
        res[name] = this.mergePropertyOptions(res[name] || {}, opt[name])
      })
      return res
    }, {})
  }

  mergePropertyOptions (...arg) {
    const notMergable = ['default', 'scope']
    return arg.reduce((res, opt) => {
      Object.keys(opt).forEach((name) => {
        if (typeof res[name] === 'function' && typeof opt[name] === 'function' && !notMergable.includes(name)) {
          res[name] = this.mergeCallback(res[name], opt[name])
        } else {
          res[name] = opt[name]
        }
      })
      return res
    }, {})
  }

  mergeCallback (oldFunct, newFunct) {
    const fn = function (...arg) {
      return newFunct.call(this, ...arg, oldFunct.bind(this))
    }
    fn.components = (oldFunct.components || [oldFunct]).concat((oldFunct.newFunct || [newFunct]))
    fn.nbParams = newFunct.nbParams || newFunct.length
    return fn
  }

  initProperties () {
    this.addProperties(this.propertiesOptions)
    return this
  }

  createScopeGetterSetters () {
    this.properties.forEach((prop) => prop.createScopeGetterSetters())
    return this
  }

  initWatchers () {
    this.properties.forEach((prop) => prop.initWatchers())
    return this
  }

  initScope () {
    this.initProperties()
    this.createScopeGetterSetters()
    this.initWatchers()
    return this
  }

  /**
   * @template T
   * @param {string} name
   * @param {Object} options
   * @returns {Property<T>}
   */
  addProperty (name, options) {
    const prop = new Property(Object.assign({ name: name }, this.globalOptions, options))
    this.properties.push(prop)
    return prop
  }

  addProperties (options) {
    Object.keys(options).forEach((name) => this.addProperty(name, options[name]))
    return this
  }

  /**
   * @param {string} name
   * @returns {Property}
   */
  getProperty (name) {
    return this.properties.find((prop) => prop.options.name === name)
  }

  setPropertiesData (data, options = {}) {
    Object.keys(data).forEach((key) => {
      if (((options.whitelist == null) || options.whitelist.indexOf(key) !== -1) && ((options.blacklist == null) || options.blacklist.indexOf(key) === -1)) {
        const prop = this.getProperty(key)
        if (prop) {
          prop.set(data[key])
        }
      }
    })
    return this
  }

  getManualDataProperties () {
    return this.properties.reduce((res, prop) => {
      if (prop.getter.calculated && prop.manual) {
        res[prop.options.name] = prop.get()
      }
      return res
    }, {})
  }

  destroy () {
    this.properties.forEach((prop) => prop.destroy())
  }
}

module.exports = PropertiesManager

},{"./Property":163}],163:[function(require,module,exports){
const EventEmitter = require('events').EventEmitter

const SimpleGetter = require('./getters/SimpleGetter')
const CalculatedGetter = require('./getters/CalculatedGetter')
const InvalidatedGetter = require('./getters/InvalidatedGetter')
const ManualGetter = require('./getters/ManualGetter')
const CompositeGetter = require('./getters/CompositeGetter')

const ManualSetter = require('./setters/ManualSetter')
const SimpleSetter = require('./setters/SimpleSetter')
const BaseValueSetter = require('./setters/BaseValueSetter')
const CollectionSetter = require('./setters/CollectionSetter')

/**
 * @template T
 */
class Property {
  /**
   * @typedef {Object} PropertyOptions
   * @property {T} [default]
   * @property {function(import("./Invalidator")): T} [calcul]
   * @property {function(): T} [get]
   * @property {function(T)} [set]
   * @property {function(T,T)|import("./PropertyWatcher")<T>} [change]
   * @property {boolean|string|function(T,T):T} [composed]
   * @property {boolean|Object} [collection]
   * @property {*} [scope]
   *
   * @param {PropertyOptions} options
   */
  constructor (options = {}) {
    this.options = Object.assign({}, Property.defaultOptions, options)
    this.init()
  }

  init () {
    /**
     * @type {EventEmitter}
     */
    this.events = new this.options.EventEmitterClass()
    this.makeSetter()
    this.makeGetter()
    this.setter.init()
    this.getter.init()
    if (this.options.initWatchers) {
      this.initWatchers()
    }
  }

  /**
   * @returns {string}
   */
  getQualifiedName () {
    if (this.options.name) {
      let name = this.options.name
      if (this.options.scope && this.options.scope.constructor) {
        name = this.options.scope.constructor.name + '.' + name
      }
      return name
    }
  }

  /**
   * @returns {string}
   */
  toString () {
    const name = this.getQualifiedName()
    if (name) {
      return `[Property ${name}]`
    }
    return '[Property]'
  }

  initWatchers () {
    this.setter.loadInternalWatcher()
  }

  makeGetter () {
    if (typeof this.options.get === 'function') {
      this.getter = new ManualGetter(this)
    } else if (this.options.composed != null && this.options.composed !== false) {
      this.getter = new CompositeGetter(this)
    } else if (typeof this.options.calcul === 'function') {
      if ((this.options.calcul.nbParams || this.options.calcul.length) === 0) {
        this.getter = new CalculatedGetter(this)
      } else {
        this.getter = new InvalidatedGetter(this)
      }
    } else {
      this.getter = new SimpleGetter(this)
    }
  }

  makeSetter () {
    if (typeof this.options.set === 'function') {
      this.setter = new ManualSetter(this)
    } else if (this.options.collection != null && this.options.collection !== false) {
      this.setter = new CollectionSetter(this)
    } else if (this.options.composed != null && this.options.composed !== false) {
      this.setter = new BaseValueSetter(this)
    } else {
      this.setter = new SimpleSetter(this)
    }
  }

  /**
   * @param {*} options
   * @returns {Property<T>}
   */
  copyWith (options) {
    return new this.constructor(Object.assign({}, this.options, options))
  }

  /**
   * @returns {T}
   */
  get () {
    return this.getter.get()
  }

  invalidate (context) {
    this.getter.invalidate(context)
    return this
  }

  unknown (context) {
    this.getter.unknown(context)
    return this
  }

  set (val) {
    return this.setter.set(val)
  }

  createScopeGetterSetters () {
    if (this.options.scope) {
      const prop = this
      let opt = {}
      opt[this.options.name + 'Property'] = {
        get: function () {
          return prop
        }
      }
      opt = this.getter.getScopeGetterSetters(opt)
      opt = this.setter.getScopeGetterSetters(opt)
      Object.defineProperties(this.options.scope, opt)
    }
    return this
  }

  destroy () {
    if (this.options.destroy === true && this.value != null && this.value.destroy != null) {
      this.value.destroy()
    }
    if (typeof this.options.destroy === 'function') {
      this.callOptionFunct('destroy', this.value)
    }
    this.getter.destroy()
    this.value = null
  }

  callOptionFunct (funct, ...args) {
    if (typeof funct === 'string') {
      funct = this.options[funct]
    }
    return funct.apply(this.options.scope || this, args)
  }
}

Property.defaultOptions = {
  EventEmitterClass: EventEmitter,
  initWatchers: true
}
module.exports = Property

},{"./getters/CalculatedGetter":165,"./getters/CompositeGetter":166,"./getters/InvalidatedGetter":167,"./getters/ManualGetter":168,"./getters/SimpleGetter":169,"./setters/BaseValueSetter":171,"./setters/CollectionSetter":172,"./setters/ManualSetter":173,"./setters/SimpleSetter":174,"events":24}],164:[function(require,module,exports){

class BaseGetter {
  constructor (prop) {
    this.prop = prop
  }

  init () {
    this.calculated = false
    this.initiated = false
    this.invalidated = false
  }

  get () {
    throw new Error('Not implemented')
  }

  output () {
    if (typeof this.prop.options.output === 'function') {
      return this.prop.callOptionFunct('output', this.prop.value)
    } else {
      return this.prop.value
    }
  }

  revalidated () {
    this.calculated = true
    this.initiated = true
    this.invalidated = false
    return this
  }

  unknown (context) {
    if (!this.invalidated) {
      this.invalidated = true
      this.invalidateNotice(context)
    }
    return this
  }

  invalidate (context) {
    this.calculated = false
    if (!this.invalidated) {
      this.invalidated = true
      this.invalidateNotice(context)
    }
    return this
  }

  invalidateNotice (context) {
    context = context || { origin: this.prop }
    this.prop.events.emit('invalidated', context)
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    const prop = this.prop
    opt[this.prop.options.name] = opt[this.prop.options.name] || {}
    opt[this.prop.options.name].get = function () {
      return prop.get()
    }
    opt[this.prop.options.name].enumerable = true
    opt[this.prop.options.name].configurable = true
    return opt
  }

  destroy () {
  }
}

module.exports = BaseGetter

},{}],165:[function(require,module,exports){

const BaseGetter = require('./BaseGetter')

class CalculatedGetter extends BaseGetter {
  get () {
    if (!this.calculated) {
      const old = this.prop.value
      const initiated = this.initiated
      this.calcul()
      if (!initiated) {
        this.prop.events.emit('updated', old)
      } else if (this.prop.setter.checkChanges(this.prop.value, old)) {
        this.prop.setter.changed(old)
      }
    }
    this.invalidated = false
    return this.output()
  }

  calcul () {
    this.prop.setter.setRawValue(this.prop.callOptionFunct('calcul'))
    this.prop.manual = false
    this.revalidated()
    return this.prop.value
  }
}

module.exports = CalculatedGetter

},{"./BaseGetter":164}],166:[function(require,module,exports){
const InvalidatedGetter = require('./InvalidatedGetter')
const Collection = require('spark-collection')
const Invalidator = require('../Invalidator')
const Reference = require('spark-binding').Reference

class CompositeGetter extends InvalidatedGetter {
  init () {
    super.init()
    if (this.prop.options.default != null) {
      this.baseValue = this.prop.options.default
    } else {
      this.prop.setter.setRawValue(null)
      this.baseValue = null
    }
    this.members = new CompositeGetter.Members(this.prop.options.members)
    if (this.prop.options.calcul != null) {
      this.members.unshift((prev, invalidator) => {
        return this.prop.options.calcul.bind(this.prop.options.scope)(invalidator)
      })
    }
    this.members.changed = (old) => {
      return this.invalidate()
    }
    this.prop.members = this.members
    this.join = this.guessJoinFunction()
  }

  guessJoinFunction () {
    if (typeof this.prop.options.composed === 'function') {
      return this.prop.options.composed
    } else if (typeof this.prop.options.composed === 'string' && CompositeGetter.joinFunctions[this.prop.options.composed] != null) {
      return CompositeGetter.joinFunctions[this.prop.options.composed]
    } else if (this.prop.options.collection != null && this.prop.options.collection !== false) {
      return CompositeGetter.joinFunctions.concat
    } else if (this.prop.options.default === false) {
      return CompositeGetter.joinFunctions.or
    } else if (this.prop.options.default === true) {
      return CompositeGetter.joinFunctions.and
    } else {
      return CompositeGetter.joinFunctions.last
    }
  }

  calcul () {
    if (this.members.length) {
      if (!this.invalidator) {
        this.invalidator = new Invalidator(this.prop, this.prop.options.scope)
      }
      this.invalidator.recycle((invalidator, done) => {
        this.prop.setter.setRawValue(this.members.reduce((prev, member) => {
          var val
          val = typeof member === 'function' ? member(prev, this.invalidator) : member
          return this.join(prev, val)
        }, this.baseValue))
        done()
        if (invalidator.isEmpty()) {
          this.invalidator = null
        } else {
          invalidator.bind()
        }
      })
    } else {
      this.prop.setter.setRawValue(this.baseValue)
    }
    this.revalidated()
    return this.prop.value
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    opt = super.getScopeGetterSetters(opt)
    const members = this.members
    opt[this.prop.options.name + 'Members'] = {
      get: function () {
        return members
      }
    }
    return opt
  }
}

CompositeGetter.joinFunctions = {
  and: function (a, b) {
    return a && b
  },
  or: function (a, b) {
    return a || b
  },
  last: function (a, b) {
    return b
  },
  sum: function (a, b) {
    return a + b
  },
  concat: function (a, b) {
    if (a == null) {
      a = []
    } else {
      if (a.toArray != null) {
        a = a.toArray()
      }
      if (a.concat == null) {
        a = [a]
      }
    }
    if (b == null) {
      b = []
    } else {
      if (b.toArray != null) {
        b = b.toArray()
      }
      if (b.concat == null) {
        b = [b]
      }
    }
    return a.concat(b)
  }
}

CompositeGetter.Members = class Members extends Collection {
  addProperty (prop) {
    if (this.findRefIndex(null, prop) === -1) {
      this.push(Reference.makeReferred(function (prev, invalidator) {
        return invalidator.prop(prop)
      }, {
        prop: prop
      }))
    }
    return this
  }

  addPropertyPath (name, obj) {
    if (this.findRefIndex(name, obj) === -1) {
      this.push(Reference.makeReferred(function (prev, invalidator) {
        return invalidator.propPath(name, obj)
      }, {
        name: name,
        obj: obj
      }))
    }
    return this
  }

  removeProperty (prop) {
    this.removeRef({ prop: prop })
    return this
  }

  addValueRef (val, data) {
    if (this.findRefIndex(data) === -1) {
      const fn = Reference.makeReferred(function (prev, invalidator) {
        return val
      }, data)
      fn.val = val
      this.push(fn)
    }
    return this
  }

  setValueRef (val, data) {
    const i = this.findRefIndex(data)
    if (i === -1) {
      this.addValueRef(val, data)
    } else if (this.get(i).val !== val) {
      const fn = Reference.makeReferred(function (prev, invalidator) {
        return val
      }, data)
      fn.val = val
      this.set(i, fn)
    }
    return this
  }

  getValueRef (data) {
    return this.findByRef(data).val
  }

  addFunctionRef (fn, data) {
    if (this.findRefIndex(data) === -1) {
      fn = Reference.makeReferred(fn, data)
      this.push(fn)
    }
    return this
  }

  findByRef (data) {
    return this._array[this.findRefIndex(data)]
  }

  findRefIndex (data) {
    return this._array.findIndex(function (member) {
      return (member.ref != null) && member.ref.compareData(data)
    })
  }

  removeRef (data) {
    var index, old
    index = this.findRefIndex(data)
    if (index !== -1) {
      old = this.toArray()
      this._array.splice(index, 1)
      this.changed(old)
    }
    return this
  }
}

module.exports = CompositeGetter

},{"../Invalidator":161,"./InvalidatedGetter":167,"spark-binding":152,"spark-collection":159}],167:[function(require,module,exports){
const Invalidator = require('../Invalidator')
const CalculatedGetter = require('./CalculatedGetter')

class InvalidatedGetter extends CalculatedGetter {
  get () {
    if (this.invalidator) {
      this.invalidator.validateUnknowns()
    }
    return super.get()
  }

  calcul () {
    if (!this.invalidator) {
      this.invalidator = new Invalidator(this.prop, this.prop.options.scope)
    }
    this.invalidator.recycle((invalidator, done) => {
      this.prop.setter.setRawValue(this.prop.callOptionFunct('calcul', invalidator))
      this.prop.manual = false
      done()
      if (invalidator.isEmpty()) {
        this.invalidator = null
      } else {
        invalidator.bind()
      }
    })
    this.revalidated()
    return this.output()
  }

  invalidate (context) {
    super.invalidate(context)
    if (!this.calculated && this.invalidator != null) {
      this.invalidator.unbind()
    }
    return this
  }

  destroy () {
    if (this.invalidator != null) {
      return this.invalidator.unbind()
    }
  }
}

module.exports = InvalidatedGetter

},{"../Invalidator":161,"./CalculatedGetter":165}],168:[function(require,module,exports){
const BaseGetter = require('./BaseGetter')

class ManualGetter extends BaseGetter {
  get () {
    this.prop.setter.setRawValue(this.prop.callOptionFunct('get'))
    this.calculated = true
    this.initiated = true
    return this.output()
  }
}

module.exports = ManualGetter

},{"./BaseGetter":164}],169:[function(require,module,exports){
const BaseGetter = require('./BaseGetter')

class SimpleGetter extends BaseGetter {
  get () {
    this.calculated = true
    if (!this.initiated) {
      this.initiated = true
      this.prop.events.emit('updated')
    }
    return this.output()
  }
}

module.exports = SimpleGetter

},{"./BaseGetter":164}],170:[function(require,module,exports){

const PropertyWatcher = require('../watchers/PropertyWatcher')

class BaseSetter {
  constructor (prop) {
    this.prop = prop
  }

  init () {
    this.setDefaultValue()
  }

  setDefaultValue () {
    this.setRawValue(this.ingest(this.prop.options.default))
  }

  loadInternalWatcher () {
    const changeOpt = this.prop.options.change
    if (typeof changeOpt === 'function') {
      this.watcher = new PropertyWatcher({
        property: this.prop,
        callback: changeOpt,
        scope: this.prop.options.scope,
        autoBind: true
      })
    } else if (changeOpt != null && typeof changeOpt.copyWith === 'function') {
      this.watcher = changeOpt.copyWith({
        property: this.prop,
        scope: this.prop.options.scope,
        autoBind: true
      })
    }
    return this.watcher
  }

  set (val) {
    throw new Error('Not implemented')
  }

  setRawValue (val) {
    this.prop.value = val
    return this.prop.value
  }

  ingest (val) {
    if (typeof this.prop.options.ingest === 'function') {
      val = this.prop.callOptionFunct('ingest', val)
    }
    return val
  }

  checkChanges (val, old) {
    return val !== old
  }

  changed (old) {
    const context = { origin: this.prop }
    this.prop.events.emit('updated', old, context)
    this.prop.events.emit('changed', old, context)
    return this
  }

  /**
   * @param {PropertyDescriptorMap} opt
   * @return {PropertyDescriptorMap}
   */
  getScopeGetterSetters (opt) {
    const prop = this.prop
    opt[this.prop.options.name] = opt[this.prop.options.name] || {}
    opt[this.prop.options.name].set = function (val) {
      return prop.set(val)
    }
    return opt
  }
}

module.exports = BaseSetter

},{"../watchers/PropertyWatcher":176}],171:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class BaseValueSetter extends BaseSetter {
  set (val) {
    val = this.ingest(val)
    if (this.prop.getter.baseValue !== val) {
      this.prop.getter.baseValue = val
      this.prop.invalidate()
    }
    return this
  }
}

module.exports = BaseValueSetter

},{"./BaseSetter":170}],172:[function(require,module,exports){
const SimpleSetter = require('./SimpleSetter')
const Collection = require('spark-collection')
const CollectionPropertyWatcher = require('../watchers/CollectionPropertyWatcher')

class CollectionSetter extends SimpleSetter {
  init () {
    this.options = Object.assign(
      {},
      CollectionSetter.defaultOptions,
      typeof this.prop.options.collection === 'object' ? this.prop.options.collection : {}
    )
    super.init()
  }

  loadInternalWatcher () {
    if (
      typeof this.prop.options.change === 'function' ||
      typeof this.prop.options.itemAdded === 'function' ||
      typeof this.prop.options.itemRemoved === 'function'
    ) {
      return new CollectionPropertyWatcher({
        property: this.prop,
        callback: this.prop.options.change,
        onAdded: this.prop.options.itemAdded,
        onRemoved: this.prop.options.itemRemoved,
        scope: this.prop.options.scope,
        autoBind: true
      })
    } else {
      super.loadInternalWatcher()
    }
  }

  setRawValue (val) {
    this.prop.value = this.makeCollection(val)
    return this.prop.value
  }

  makeCollection (val) {
    val = this.valToArray(val)
    const prop = this.prop
    const col = Collection.newSubClass(this.options, val)
    col.changed = function (old) {
      prop.setter.changed(old)
    }
    return col
  }

  valToArray (val) {
    if (val == null) {
      return []
    } else if (typeof val.toArray === 'function') {
      return val.toArray()
    } else if (Array.isArray(val)) {
      return val.slice()
    } else {
      return [val]
    }
  }

  checkChanges (val, old) {
    var compareFunction
    if (typeof this.options.compare === 'function') {
      compareFunction = this.options.compare
    }
    return (new Collection(val)).checkChanges(old, this.options.ordered, compareFunction)
  }
}

CollectionSetter.defaultOptions = {
  compare: false,
  ordered: true
}

module.exports = CollectionSetter

},{"../watchers/CollectionPropertyWatcher":175,"./SimpleSetter":174,"spark-collection":159}],173:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class ManualSetter extends BaseSetter {
  set (val) {
    this.prop.callOptionFunct('set', val)
  }
}

module.exports = ManualSetter

},{"./BaseSetter":170}],174:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class SimpleSetter extends BaseSetter {
  set (val) {
    var old
    val = this.ingest(val)
    this.prop.getter.revalidated()
    if (this.checkChanges(val, this.prop.value)) {
      old = this.prop.value
      this.setRawValue(val)
      this.prop.manual = true
      this.changed(old)
    }
    return this
  }
}

module.exports = SimpleSetter

},{"./BaseSetter":170}],175:[function(require,module,exports){

const PropertyWatcher = require('./PropertyWatcher')

class CollectionPropertyWatcher extends PropertyWatcher {
  loadOptions (options) {
    super.loadOptions(options)
    this.onAdded = options.onAdded
    this.onRemoved = options.onRemoved
  }

  handleChange (value, old) {
    old = value.copy(old || [])
    if (typeof this.callback === 'function') {
      this.callback.call(this.scope, value, old)
    }
    if (typeof this.onAdded === 'function') {
      value.forEach((item, i) => {
        if (!old.includes(item)) {
          return this.onAdded.call(this.scope, item)
        }
      })
    }
    if (typeof this.onRemoved === 'function') {
      return old.forEach((item, i) => {
        if (!value.includes(item)) {
          return this.onRemoved.call(this.scope, item)
        }
      })
    }
  }
}

module.exports = CollectionPropertyWatcher

},{"./PropertyWatcher":176}],176:[function(require,module,exports){

const Binder = require('spark-binding').Binder
const Reference = require('spark-binding').Reference

/**
 * @template T
 */
class PropertyWatcher extends Binder {
  /**
   * @typedef {Object} PropertyWatcherOptions
   * @property {import("./Property")<T>|string} property
   * @property {function(T,T)} callback
   * @property {boolean} [autoBind]
   * @property {*} [scope]
   *
   * @param {PropertyWatcherOptions} options
   */
  constructor (options) {
    super()
    this.options = options
    this.invalidateCallback = (context) => {
      if (this.validContext(context)) {
        this.invalidate()
      }
    }
    this.updateCallback = (old, context) => {
      if (this.validContext(context)) {
        this.update(old)
      }
    }
    if (this.options != null) {
      this.loadOptions(this.options)
    }
    this.init()
  }

  loadOptions (options) {
    this.scope = options.scope
    this.property = options.property
    this.callback = options.callback
    this.autoBind = options.autoBind
    return this
  }

  copyWith (options) {
    return new this.constructor(Object.assign({}, this.options, options))
  }

  init () {
    if (this.autoBind) {
      return this.checkBind()
    }
  }

  getProperty () {
    if (typeof this.property === 'string') {
      return this.getPropByName(this.property)
    }
    return this.property
  }

  getPropByName (prop, target = this.scope) {
    if (target.propertiesManager != null) {
      return target.propertiesManager.getProperty(prop)
    } else if (target[prop + 'Property'] != null) {
      return target[prop + 'Property']
    } else {
      throw new Error(`Could not find the property ${prop}`)
    }
  }

  checkBind () {
    return this.toggleBind(this.shouldBind())
  }

  shouldBind () {
    return true
  }

  canBind () {
    return this.getProperty() != null
  }

  doBind () {
    this.update()
    this.getProperty().events.addListener('invalidated', this.invalidateCallback)
    return this.getProperty().events.addListener('updated', this.updateCallback)
  }

  doUnbind () {
    this.getProperty().events.removeListener('invalidated', this.invalidateCallback)
    return this.getProperty().events.removeListener('updated', this.updateCallback)
  }

  equals (watcher) {
    return watcher.constructor === this.constructor &&
      watcher != null &&
      watcher.event === this.event &&
      watcher.getProperty() === this.getProperty() &&
      Reference.compareVal(watcher.callback, this.callback)
  }

  validContext (context) {
    return context == null || !context.preventImmediate
  }

  invalidate () {
    return this.getProperty().get()
  }

  update (old) {
    var value
    value = this.getProperty().get()
    return this.handleChange(value, old)
  }

  handleChange (value, old) {
    return this.callback.call(this.scope, value, old)
  }
};

module.exports = PropertyWatcher

},{"spark-binding":152}],177:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./Mixable":181,"dup":100,"spark-properties":158}],178:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101,"spark-properties":158}],179:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102,"spark-properties":158}],180:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"./Overrider":182,"dup":103}],181:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],182:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"dup":105}],183:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"spark-binding":152}],184:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"./Element":177,"./Invalidated/ActivablePropertyWatcher":178,"./Invalidated/Invalidated":179,"./Loader":180,"./Mixable":181,"./Overrider":182,"./Updater":183,"dup":107}],185:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"./libs":184,"dup":108,"spark-binding":152,"spark-collection":156,"spark-properties":158}],186:[function(require,module,exports){
arguments[4][100][0].apply(exports,arguments)
},{"./Mixable":190,"dup":100,"spark-properties":201}],187:[function(require,module,exports){
arguments[4][101][0].apply(exports,arguments)
},{"dup":101,"spark-properties":201}],188:[function(require,module,exports){
arguments[4][102][0].apply(exports,arguments)
},{"dup":102,"spark-properties":201}],189:[function(require,module,exports){
arguments[4][103][0].apply(exports,arguments)
},{"./Overrider":191,"dup":103}],190:[function(require,module,exports){
arguments[4][104][0].apply(exports,arguments)
},{"dup":104}],191:[function(require,module,exports){
arguments[4][105][0].apply(exports,arguments)
},{"dup":105}],192:[function(require,module,exports){
arguments[4][106][0].apply(exports,arguments)
},{"dup":106,"spark-binding":195}],193:[function(require,module,exports){
arguments[4][107][0].apply(exports,arguments)
},{"./Element":186,"./Invalidated/ActivablePropertyWatcher":187,"./Invalidated/Invalidated":188,"./Loader":189,"./Mixable":190,"./Overrider":191,"./Updater":192,"dup":107}],194:[function(require,module,exports){
arguments[4][108][0].apply(exports,arguments)
},{"./libs":193,"dup":108,"spark-binding":195,"spark-collection":199,"spark-properties":201}],195:[function(require,module,exports){
arguments[4][152][0].apply(exports,arguments)
},{"./src/Binder":196,"./src/EventBind":197,"./src/Reference":198,"dup":152}],196:[function(require,module,exports){
arguments[4][153][0].apply(exports,arguments)
},{"dup":153}],197:[function(require,module,exports){
arguments[4][154][0].apply(exports,arguments)
},{"./Binder":196,"./Reference":198,"dup":154}],198:[function(require,module,exports){
arguments[4][155][0].apply(exports,arguments)
},{"dup":155}],199:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"./src/Collection":200,"dup":156}],200:[function(require,module,exports){
arguments[4][157][0].apply(exports,arguments)
},{"dup":157}],201:[function(require,module,exports){
arguments[4][158][0].apply(exports,arguments)
},{"./src/Invalidator":204,"./src/PropertiesManager":205,"./src/Property":206,"./src/getters/BaseGetter":207,"./src/getters/CalculatedGetter":208,"./src/getters/CompositeGetter":209,"./src/getters/InvalidatedGetter":210,"./src/getters/ManualGetter":211,"./src/getters/SimpleGetter":212,"./src/setters/BaseSetter":213,"./src/setters/BaseValueSetter":214,"./src/setters/CollectionSetter":215,"./src/setters/ManualSetter":216,"./src/setters/SimpleSetter":217,"./src/watchers/CollectionPropertyWatcher":218,"./src/watchers/PropertyWatcher":219,"dup":158}],202:[function(require,module,exports){
arguments[4][156][0].apply(exports,arguments)
},{"./src/Collection":203,"dup":156}],203:[function(require,module,exports){
arguments[4][160][0].apply(exports,arguments)
},{"dup":160}],204:[function(require,module,exports){
arguments[4][161][0].apply(exports,arguments)
},{"dup":161,"spark-binding":195}],205:[function(require,module,exports){
arguments[4][162][0].apply(exports,arguments)
},{"./Property":206,"dup":162}],206:[function(require,module,exports){
arguments[4][163][0].apply(exports,arguments)
},{"./getters/CalculatedGetter":208,"./getters/CompositeGetter":209,"./getters/InvalidatedGetter":210,"./getters/ManualGetter":211,"./getters/SimpleGetter":212,"./setters/BaseValueSetter":214,"./setters/CollectionSetter":215,"./setters/ManualSetter":216,"./setters/SimpleSetter":217,"dup":163,"events":24}],207:[function(require,module,exports){
arguments[4][164][0].apply(exports,arguments)
},{"dup":164}],208:[function(require,module,exports){
arguments[4][165][0].apply(exports,arguments)
},{"./BaseGetter":207,"dup":165}],209:[function(require,module,exports){
arguments[4][166][0].apply(exports,arguments)
},{"../Invalidator":204,"./InvalidatedGetter":210,"dup":166,"spark-binding":195,"spark-collection":202}],210:[function(require,module,exports){
arguments[4][167][0].apply(exports,arguments)
},{"../Invalidator":204,"./CalculatedGetter":208,"dup":167}],211:[function(require,module,exports){
arguments[4][168][0].apply(exports,arguments)
},{"./BaseGetter":207,"dup":168}],212:[function(require,module,exports){
arguments[4][169][0].apply(exports,arguments)
},{"./BaseGetter":207,"dup":169}],213:[function(require,module,exports){
arguments[4][170][0].apply(exports,arguments)
},{"../watchers/PropertyWatcher":219,"dup":170}],214:[function(require,module,exports){
arguments[4][171][0].apply(exports,arguments)
},{"./BaseSetter":213,"dup":171}],215:[function(require,module,exports){
arguments[4][172][0].apply(exports,arguments)
},{"../watchers/CollectionPropertyWatcher":218,"./SimpleSetter":217,"dup":172,"spark-collection":202}],216:[function(require,module,exports){
arguments[4][173][0].apply(exports,arguments)
},{"./BaseSetter":213,"dup":173}],217:[function(require,module,exports){
arguments[4][174][0].apply(exports,arguments)
},{"./BaseSetter":213,"dup":174}],218:[function(require,module,exports){
arguments[4][175][0].apply(exports,arguments)
},{"./PropertyWatcher":219,"dup":175}],219:[function(require,module,exports){
arguments[4][176][0].apply(exports,arguments)
},{"dup":176,"spark-binding":195}]},{},[23])(23)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQXV0b21hdGljRG9vci5qcyIsImxpYi9DaGFyYWN0ZXIuanMiLCJsaWIvRGFtYWdlYWJsZS5qcyIsImxpYi9EaXNwbGF5LmpzIiwibGliL0RvbVVwZGF0ZXIuanMiLCJsaWIvRG9vci5qcyIsImxpYi9HYW1lLmpzIiwibGliL01hcC5qcyIsImxpYi9QbGF5ZXJDb250cm9sbGVyLmpzIiwibGliL1BsYXllclNlbGVjdGlvbkluZm8uanMiLCJsaWIvUHJvamVjdGlsZS5qcyIsImxpYi9TaGlwLmpzIiwibGliL1NoaXBJbnRlcmlvci5qcyIsImxpYi9TaGlwV2VhcG9uLmpzIiwibGliL1N0YXJNYXBHZW5lcmF0b3IuanMiLCJsaWIvU3RhclN5c3RlbS5qcyIsImxpYi9UaWxlLmpzIiwibGliL1RpbGVkLmpzIiwibGliL1VwZGF0ZXIuanMiLCJsaWIvVmlldy5qcyIsImxpYi9XaXJlLmpzIiwibGliL2xpYnMuanMiLCJsaWIvcGFyYWxsZWxpby1kb20uanMiLCJub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0FpcmxvY2suanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9BcHByb2FjaC5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0F1dG9tYXRpY0Rvb3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9DaGFyYWN0ZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9DaGFyYWN0ZXJBSS5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0NvbmZyb250YXRpb24uanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9EYW1hZ2VQcm9wYWdhdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0RhbWFnZWFibGUuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9Eb29yLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvRWxlbWVudC5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0VuY291bnRlck1hbmFnZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9GbG9vci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL0dhbWUuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9JbnZlbnRvcnkuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9MaW5lT2ZTaWdodC5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL01hcC5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL09ic3RhY2xlLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvUGF0aFdhbGsuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9QZXJzb25hbFdlYXBvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1BsYXllci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1Byb2plY3RpbGUuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9SZXNzb3VyY2UuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9SZXNzb3VyY2VUeXBlLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvU2hpcC5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1NoaXBJbnRlcmlvci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1NoaXBXZWFwb24uanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9TdGFyU3lzdGVtLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvVHJhdmVsLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvVmlldy5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL1Zpc2lvbkNhbGN1bGF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQWN0aW9uUHJvdmlkZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0F0dGFja0FjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrTW92ZUFjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvU2ltcGxlQWN0aW9uUHJvdmlkZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1RhcmdldEFjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGlsZWRBY3Rpb25Qcm92aWRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVHJhdmVsQWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvYWN0aW9ucy9XYWxrQWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvZ2VuZXJhdG9ycy9BaXJsb2NrR2VuZXJhdG9yLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvZ2VuZXJhdG9ycy9Sb29tR2VuZXJhdG9yLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvZ2VuZXJhdG9ycy9TaGlwSW50ZXJpb3JHZW5lcmF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9nZW5lcmF0b3JzL1N0YXJNYXBHZW5lcmF0b3IuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9saWJzLmpzIiwiLi4vcGFyYWxsZWxpby9saWIvcGFyYWxsZWxpby5qcyIsIi4uL3BhcmFsbGVsaW8vbGliL3NhdmVFbmdpbmVzL0xvYWRlckNvbGxlY3Rpb24uanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9zYXZlRW5naW5lcy9TaW1wbGVMb2FkZXIuanMiLCIuLi9wYXJhbGxlbGlvL2xpYi9zYXZlRW5naW5lcy9TaW1wbGVTYXZhYmxlLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9saWIvR3JpZC5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRDZWxsLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9saWIvR3JpZFJvdy5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL2dyaWRzLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvQmluZGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvQ29sbGVjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0VsZW1lbnQuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9FdmVudEJpbmQuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9FdmVudEVtaXR0ZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9JbnZhbGlkYXRvci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL01peGFibGUuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9PdmVycmlkZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5T3duZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0FjdGl2YWJsZVByb3BlcnR5LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9CYXNpY1Byb3BlcnR5LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9DYWxjdWxhdGVkUHJvcGVydHkuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9Qcm9wZXJ0eVR5cGVzL0NvbGxlY3Rpb25Qcm9wZXJ0eS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5VHlwZXMvQ29tcG9zZWRQcm9wZXJ0eS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1Byb3BlcnR5VHlwZXMvRHluYW1pY1Byb3BlcnR5LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9JbnZhbGlkYXRlZFByb3BlcnR5LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvUHJvcGVydHlUeXBlcy9VcGRhdGVkUHJvcGVydHkuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9VcGRhdGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvc3Bhcmstc3RhcnRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tcGF0aGZpbmRlci9kaXN0L3BhdGhmaW5kZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXBhdGhmaW5kZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0VsZW1lbnQuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXBhdGhmaW5kZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0ludmFsaWRhdGVkL0FjdGl2YWJsZVByb3BlcnR5V2F0Y2hlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tcGF0aGZpbmRlci9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXBhdGhmaW5kZXIvbm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL0xvYWRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tcGF0aGZpbmRlci9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvTWl4YWJsZS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tcGF0aGZpbmRlci9ub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvT3ZlcnJpZGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1wYXRoZmluZGVyL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9VcGRhdGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1wYXRoZmluZGVyL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9saWJzLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1wYXRoZmluZGVyL25vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9zcGFyay1zdGFydGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby1zdHJpbmdzL3N0cmluZ3MuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy9ncmVla0FscGhhYmV0Lmpzb24iLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy9zdGFyTmFtZXMuanNvbiIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL0Nvb3JkSGVscGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvRGlyZWN0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGVDb250YWluZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXRpbGVzL2xpYi9UaWxlUmVmZXJlbmNlLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZWQuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXRpbGVzL2xpYi90aWxlcy5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGltaW5nL2Rpc3QvdGltaW5nLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL0Nvbm5lY3RlZC5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9TaWduYWwuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvU2lnbmFsT3BlcmF0aW9uLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL1NpZ25hbFNvdXJjZS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9Td2l0Y2guanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvV2lyZS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi93aXJpbmcuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1iaW5kaW5nL2luZGV4LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstYmluZGluZy9zcmMvQmluZGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstYmluZGluZy9zcmMvRXZlbnRCaW5kLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstYmluZGluZy9zcmMvUmVmZXJlbmNlLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstY29sbGVjdGlvbi9pbmRleC5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLWNvbGxlY3Rpb24vc3JjL0NvbGxlY3Rpb24uanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL2luZGV4LmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9ub2RlX21vZHVsZXMvc3BhcmstY29sbGVjdGlvbi9zcmMvQ29sbGVjdGlvbi5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL0ludmFsaWRhdG9yLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvUHJvcGVydGllc01hbmFnZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9Qcm9wZXJ0eS5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQmFzZUdldHRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQ2FsY3VsYXRlZEdldHRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQ29tcG9zaXRlR2V0dGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvZ2V0dGVycy9JbnZhbGlkYXRlZEdldHRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvTWFudWFsR2V0dGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvZ2V0dGVycy9TaW1wbGVHZXR0ZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0Jhc2VTZXR0ZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL3NldHRlcnMvQ29sbGVjdGlvblNldHRlci5qcyIsIi4uL3BhcmFsbGVsaW8vbm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL3NldHRlcnMvTWFudWFsU2V0dGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvc2V0dGVycy9TaW1wbGVTZXR0ZXIuanMiLCIuLi9wYXJhbGxlbGlvL25vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy93YXRjaGVycy9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyLmpzIiwiLi4vcGFyYWxsZWxpby9ub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvd2F0Y2hlcnMvUHJvcGVydHlXYXRjaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM2dCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOU5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsInZhciBBdXRvbWF0aWNEb29yLCBCYXNlQXV0b21hdGljRG9vciwgRG9vcjtcblxuRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpO1xuXG5CYXNlQXV0b21hdGljRG9vciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5BdXRvbWF0aWNEb29yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dG9tYXRpY0Rvb3IgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEF1dG9tYXRpY0Rvb3IgZXh0ZW5kcyBCYXNlQXV0b21hdGljRG9vciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdkb29yJztcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgQXV0b21hdGljRG9vci5leHRlbmQoRG9vcik7XG5cbiAgcmV0dXJuIEF1dG9tYXRpY0Rvb3I7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQXV0b21hdGljRG9vci5qcy5tYXBcbiIsInZhciBCYXNlQ2hhcmFjdGVyLCBDaGFyYWN0ZXIsIERvbVVwZGF0ZXIsIEVsZW1lbnQsIFRpbGVkO1xuXG5UaWxlZCA9IHJlcXVpcmUoJy4vVGlsZWQnKTtcblxuQmFzZUNoYXJhY3RlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5DaGFyYWN0ZXI7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJhY3RlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgQmFzZUNoYXJhY3RlciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdjaGFyYWN0ZXInO1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBDaGFyYWN0ZXIuZXh0ZW5kKFRpbGVkKTtcblxuICBDaGFyYWN0ZXIucHJvcGVydGllcyh7XG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCB0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDaGFyYWN0ZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQ2hhcmFjdGVyLmpzLm1hcFxuIiwidmFyIEJhc2VEYW1hZ2VhYmxlLCBEYW1hZ2VhYmxlLCBEaXNwbGF5LCBEb21VcGRhdGVyO1xuXG5CYXNlRGFtYWdlYWJsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5EYW1hZ2VhYmxlO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYW1hZ2VhYmxlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEYW1hZ2VhYmxlIGV4dGVuZHMgQmFzZURhbWFnZWFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaGVhbHRoQ2xzKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgRGFtYWdlYWJsZS5leHRlbmQoRGlzcGxheSk7XG5cbiAgRGFtYWdlYWJsZS5wcm9wZXJ0aWVzKHtcbiAgICBoZWFsdGhDbHNTdGVwczoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGhlYWx0aENsczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gJ2hlYWx0aC0nICsgKE1hdGguY2VpbChpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdoZWFsdGgnKSAvIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ21heEhlYWx0aCcpICogaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnaGVhbHRoQ2xzU3RlcHMnKSkpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuaGVhbHRoQ2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5oZWFsdGhDbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBEYW1hZ2VhYmxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RhbWFnZWFibGUuanMubWFwXG4iLCJ2YXIgRGlzcGxheSwgRG9tVXBkYXRlciwgRWxlbWVudDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5FbGVtZW50O1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRGlzcGxheSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGluaXREaXNwbGF5KCkge31cblxuICAgIGRlc3Ryb3lEaXNwbGF5KCkge1xuICAgICAgaWYgKHRoaXMuZGlzcGxheVByb3BlcnR5LnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBEaXNwbGF5LnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hcHBlbmRUbyh0aGlzLmRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNsczoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmNscyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3BsYXksIG5ld0RpdjtcbiAgICAgICAgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGlzcGxheSA9IGpRdWVyeShuZXdEaXYpLmFkZENsYXNzKHRoaXMuYmFzZUNscyk7XG4gICAgICAgIGRpc3BsYXkuZ2V0KDApLl9wYXJhbGxlbGlvX29iaiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5jc3Moe1xuICAgICAgICAgICAgbGVmdDogdGhpcy5kaXNwbGF5WFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5jc3Moe1xuICAgICAgICAgICAgdG9wOiB0aGlzLmRpc3BsYXlZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRGlzcGxheTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9EaXNwbGF5LmpzLm1hcFxuIiwidmFyIERvbVVwZGF0ZXIsIFByb3BlcnR5V2F0Y2hlcjtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNwYXJrLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBEb21VcGRhdGVyID0gY2xhc3MgRG9tVXBkYXRlciBleHRlbmRzIFByb3BlcnR5V2F0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVEb21DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHN1cGVyLmluaXQoKTtcbiAgfVxuXG4gIHJlcXVlc3RGcmFtZSgpIHtcbiAgICBpZiAoIXRoaXMuZnJhbWViaW5kZWQpIHtcbiAgICAgIHRoaXMuZnJhbWViaW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEb21DYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRDb250ZXh0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW52YWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZURvbShvbGQpIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmdldFByb3BlcnR5KCkuZ2V0KCk7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLm9sZCkge1xuICAgICAgdGhpcy5vbGQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlLCBvbGQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mcmFtZWJpbmRlZCA9IGZhbHNlO1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRG9tVXBkYXRlci5qcy5tYXBcbiIsInZhciBCYXNlRG9vciwgRG9tVXBkYXRlciwgRG9vciwgRWxlbWVudCwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgnLi9UaWxlZCcpO1xuXG5CYXNlRG9vciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5Eb29yO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBEb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEb29yIGV4dGVuZHMgQmFzZURvb3Ige1xuICAgIGluaXQoKSB7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnZG9vcic7XG4gICAgICBzdXBlci5pbml0KCk7XG4gICAgICByZXR1cm4gdGhpcy5pbml0RGlzcGxheSgpO1xuICAgIH1cblxuICB9O1xuXG4gIERvb3IuZXh0ZW5kKFRpbGVkKTtcblxuICBEb29yLnByb3BlcnRpZXMoe1xuICAgIGRpcmVjdGlvbjoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgb3Blbjoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXkudG9nZ2xlQ2xhc3MoJ2Nsb3NlJywgIXRoaXMub3Blbik7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS50b2dnbGVDbGFzcygnb3BlbicsIHRoaXMub3Blbik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Eb29yLmpzLm1hcFxuIiwidmFyIEJhc2VHYW1lLCBHYW1lLCBQbGF5ZXJDb250cm9sbGVyLCBWaWV3O1xuXG5CYXNlR2FtZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5HYW1lO1xuXG5WaWV3ID0gcmVxdWlyZSgnLi9WaWV3Jyk7XG5cblBsYXllckNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL1BsYXllckNvbnRyb2xsZXInKTtcblxuLy8gVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdhbWUgZXh0ZW5kcyBCYXNlR2FtZSB7fTtcblxuICBHYW1lLnByb3BlcnRpZXMoe1xuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRpbWluZztcbiAgICAgICAgdGltaW5nID0gb3JpZ2luYWwoKTtcbiAgICAgICAgLy8gdGltaW5nLnVwZGF0ZXIgPSBVcGRhdGVyLmluc3RhbmNlXG4gICAgICAgIHJldHVybiB0aW1pbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWluVUk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXY7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidWlcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRWaWV3Q2xhc3MgPSBWaWV3O1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRQbGF5ZXJDb250cm9sbGVyQ2xhc3MgPSBQbGF5ZXJDb250cm9sbGVyO1xuXG4gIHJldHVybiBHYW1lO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0dhbWUuanMubWFwXG4iLCJ2YXIgQmFzZU1hcCwgTWFwO1xuXG5CYXNlTWFwID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLk1hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE1hcCBleHRlbmRzIEJhc2VNYXAge1xuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblZpZXcuY29udGVudERpc3BsYXk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoY2FudmFzKSB7XG4gICAgICB2YXIgY29udGV4dDtcbiAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGxvY2F0aW9uLmRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IGxvY2F0aW9uLmRyYXcodGhpcywgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBNYXAucHJvcGVydGllcyh7XG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmRpc3BsYXlDb250YWluZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Q29udGFpbmVyLmFwcGVuZCh0aGlzLmJhY2tncm91bmRDYW52YXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnYW1lOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKHZhbCwgb2xkKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFyTWFyZ2luOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgYmFja2dyb3VuZENhbnZhczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbnZhcztcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5ib3VuZGFyaWVzLnJpZ2h0IC0gdGhpcy5ib3VuZGFyaWVzLmxlZnQgKyB0aGlzLnN0YXJNYXJnaW4gKiAyO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5ib3VuZGFyaWVzLmJvdHRvbSAtIHRoaXMuYm91bmRhcmllcy50b3AgKyB0aGlzLnN0YXJNYXJnaW4gKiAyO1xuICAgICAgICBjYW52YXMuY2xhc3NMaXN0LmFkZChcIm1hcEJhY2tncm91bmRcIik7XG4gICAgICAgIGNhbnZhcy5zdHlsZS50b3AgPSB0aGlzLmJvdW5kYXJpZXMudG9wIC0gdGhpcy5zdGFyTWFyZ2luICsgXCJweFwiO1xuICAgICAgICBjYW52YXMuc3R5bGUubGVmdCA9IHRoaXMuYm91bmRhcmllcy5sZWZ0IC0gdGhpcy5zdGFyTWFyZ2luICsgXCJweFwiO1xuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKGNhbnZhcyk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTWFwO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL01hcC5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBQbGF5ZXJDb250cm9sbGVyO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIEVsZW1lbnQge1xuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKCF0aGlzLmdhbWVEaXNwbGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVEaXNwbGF5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvY3VzKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWJibGVVcChlLnRhcmdldCwgKHRhcmdldCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY2FuRm9jdXNPbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuZm9jdXNlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tUYXJnZXRPclNlbGVjdGFibGUoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsZVVwKGUudGFyZ2V0LCAodGFyZ2V0KSA9PiB7XG4gICAgICAgIHZhciBhY3Rpb247XG4gICAgICAgIGlmIChhY3Rpb24gPSB0aGlzLnBsYXllci5jYW5UYXJnZXRBY3Rpb25Pbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0QWN0aW9uVGFyZ2V0KHRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIuY2FuU2VsZWN0KHRhcmdldCkpIHtcbiAgICAgICAgICB0aGlzLnBsYXllci5zZWxlY3RlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2J1YmJsZVVwKHRhcmdldCwgc3RvcENhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqICE9IG51bGwgPyB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqIDogdGFyZ2V0LnBhcmVudE5vZGUgIT0gbnVsbCA/IHRhcmdldC5wYXJlbnROb2RlIDogc3RvcENhbGxiYWNrKHRhcmdldCkgPyBudWxsIDogdGFyZ2V0LnRpbGUgIT0gbnVsbCA/IHRhcmdldC50aWxlIDogKChyZWYgPSB0YXJnZXQuZGlzcGxheSkgIT0gbnVsbCA/IHJlZi5nZXQoMCkucGFyZW50Tm9kZSA6IHZvaWQgMCkgIT0gbnVsbCA/IHRhcmdldC5kaXNwbGF5LmdldCgwKS5wYXJlbnROb2RlIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICB9O1xuXG4gIFBsYXllckNvbnRyb2xsZXIucHJvcGVydGllcyh7XG4gICAgcGxheWVyOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnYW1lRGlzcGxheToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURpc3BsYXkpIHtcbiAgICAgICAgICAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdjbGljaycsIHRoaXMuY2FsbGJhY2soJ2NoZWNrVGFyZ2V0T3JTZWxlY3RhYmxlJykpO1xuICAgICAgICAgIHJldHVybiAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdtb3VzZW92ZXInLCB0aGlzLmNhbGxiYWNrKCdjaGVja0ZvY3VzJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUGxheWVyQ29udHJvbGxlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9QbGF5ZXJDb250cm9sbGVyLmpzLm1hcFxuIiwidmFyIERpc3BsYXksIERvbVVwZGF0ZXIsIFBsYXllclNlbGVjdGlvbkluZm87XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNlbGVjdGlvbkluZm8gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBsYXllclNlbGVjdGlvbkluZm8gZXh0ZW5kcyBEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnc2VsZWN0aW9uSW5mbyc7XG4gICAgICB0aGlzLm5hbWU7XG4gICAgICB0aGlzLmdhbWU7XG4gICAgICB0aGlzLmFjdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBpZiAoIXRoaXMuZGlzcGxheUNvbnRhaW5lciAmJiB0aGlzLmdhbWUubWFpblVJKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRhaW5lciA9IHRoaXMuZ2FtZS5tYWluVUk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucGxheWVyICYmIHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllciA9IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBsYXllclNlbGVjdGlvbkluZm8ucHJvcGVydGllcyh7XG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3ZlcnJpZGVkKSB7XG4gICAgICAgIHZhciBkaXY7XG4gICAgICAgIGRpdiA9IG92ZXJyaWRlZCgpO1xuICAgICAgICBkaXYuaHRtbCgnPGRpdiBjbGFzcz1cIm5hbWVcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj5BY3Rpb25zIDo8L3NwYW4+PHVsPjwvdWw+PC9kaXY+Jyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9XG4gICAgfSxcbiAgICBwbGF5ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHNlbGVjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuc2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBzZWw7XG4gICAgICAgIHNlbCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5zZWxlY3Rpb25Qcm9wZXJ0eSk7XG4gICAgICAgIGlmIChzZWwgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHNlbC5uYW1lUHJvcGVydHkpIHx8IHNlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmZpbmQoXCIubmFtZVwiKS50ZXh0KHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuYXZhaWxhYmxlQWN0aW9uc1wiKSB8fCBbXTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIHZhciBsaXN0O1xuICAgICAgICAgIGxpc3QgPSB0aGlzLmRpc3BsYXkuZmluZChcIi5hY3Rpb25zIHVsXCIpO1xuICAgICAgICAgIGxpc3QuZW1wdHkoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgdmFyIGRpc3BsYXksIG5hbWU7XG4gICAgICAgICAgICBuYW1lID0gYWN0aW9uLm5hbWUgfHwgYWN0aW9uLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICBkaXNwbGF5ID0gJCgnPGxpPicgKyBuYW1lICsgJzwvbGk+Jyk7XG4gICAgICAgICAgICBkaXNwbGF5Lm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuc2VsZWN0QWN0aW9uKGFjdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmFwcGVuZChkaXNwbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQbGF5ZXJTZWxlY3Rpb25JbmZvO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BsYXllclNlbGVjdGlvbkluZm8uanMubWFwXG4iLCJ2YXIgQmFzZVByb2plY3RpbGUsIERpc3BsYXksIFByb2plY3RpbGUsIFVwZGF0ZXI7XG5cbkJhc2VQcm9qZWN0aWxlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlByb2plY3RpbGU7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBCYXNlUHJvamVjdGlsZSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdwcm9qZWN0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lEaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgUHJvamVjdGlsZS5leHRlbmQoRGlzcGxheSk7XG5cbiAgUHJvamVjdGlsZS5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2NvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3RpbGVEaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZURpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdkaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnZGlzcGxheScsIGNvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ29yaWdpblRpbGUnKS5kaXNwbGF5Q29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpblRpbGUudGlsZVRvRGlzcGxheVgoaW52YWxpZGF0ZS5wcm9wQnlOYW1lKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5UaWxlLnRpbGVUb0Rpc3BsYXlZKGludmFsaWRhdGUucHJvcEJ5TmFtZSgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQcm9qZWN0aWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb2plY3RpbGUuanMubWFwXG4iLCJ2YXIgQmFzZVNoaXAsIERpc3BsYXksIERvbVVwZGF0ZXIsIFNoaXA7XG5cbkJhc2VTaGlwID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXA7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNoaXAgZXh0ZW5kcyBCYXNlU2hpcCB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdzaGlwJztcbiAgICAgIHJldHVybiBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcC5leHRlbmQoRGlzcGxheSk7XG5cbiAgU2hpcC5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnbG9jYXRpb24uZGlzcGxheUNvbnRhaW5lcicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi54Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ2xvY2F0aW9uLnknKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yYml0aW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0cmF2ZWwnKSA9PT0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmICh0aGlzLm9yYml0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKFwib3JiaXRpbmdcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3MoXCJvcmJpdGluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwLmpzLm1hcFxuIiwidmFyIERlZmF1bHRHZW5lcmF0b3IsIERvb3IsIFNoaXBJbnRlcmlvciwgVGlsZSwgVGlsZUNvbnRhaW5lcjtcblxuVGlsZSA9IHJlcXVpcmUoJy4vVGlsZScpO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLnRpbGVzLlRpbGVDb250YWluZXI7XG5cbkRlZmF1bHRHZW5lcmF0b3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuZ2VuZXJhdG9ycy5Sb29tR2VuZXJhdG9yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9BdXRvbWF0aWNEb29yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcEludGVyaW9yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwSW50ZXJpb3IgZXh0ZW5kcyBUaWxlQ29udGFpbmVyIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblZpZXcuY29udGVudERpc3BsYXk7XG4gICAgICB9XG4gICAgICBpZiAoISh0aGlzLnRpbGVzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShnZW5lcmF0b3IpIHtcbiAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvciB8fCAobmV3IFNoaXBJbnRlcmlvci5HZW5lcmF0b3IoKSkudGFwKGZ1bmN0aW9uKCkge30pO1xuICAgICAgcmV0dXJuIGdlbmVyYXRvci5nZXRUaWxlcygpLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGlsZSh0aWxlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIFNoaXBJbnRlcmlvci5wcm9wZXJ0aWVzKHtcbiAgICBjb250YWluZXI6IHt9LFxuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnY29udGFpbmVyJyk7XG4gICAgICAgIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnY29udGVudERpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuY29udGVudERpc3BsYXk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ2Rpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYXBwZW5kVG8odGhpcy5kaXNwbGF5Q29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIGRpc3BsYXkgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmFkZENsYXNzKCdzaGlwJyk7XG4gICAgICAgIGRpc3BsYXkuZ2V0KDApLl9wYXJhbGxlbGlvX29iaiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNoaXBJbnRlcmlvcjtcblxufSkuY2FsbCh0aGlzKTtcblxuU2hpcEludGVyaW9yLkdlbmVyYXRvciA9IGNsYXNzIEdlbmVyYXRvciBleHRlbmRzIERlZmF1bHRHZW5lcmF0b3Ige1xuICB3YWxsRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBUaWxlKG9wdC54LCBvcHQueSkpLnRhcChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2xzID0gJ3dhbGwnO1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa2FibGUgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZsb29yRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gbmV3IFRpbGUuRmxvb3Iob3B0LngsIG9wdC55KTtcbiAgfVxuXG4gIGRvb3JGYWN0b3J5KG9wdCkge1xuICAgIHJldHVybiAobmV3IFRpbGUuRmxvb3Iob3B0LngsIG9wdC55KSkudGFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGQobmV3IERvb3Ioe1xuICAgICAgICBkaXJlY3Rpb246IG9wdC5kaXJlY3Rpb25cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBJbnRlcmlvci5qcy5tYXBcbiIsInZhciBCYXNlV2VhcG9uLCBEYW1hZ2VhYmxlLCBEb21VcGRhdGVyLCBQcm9qZWN0aWxlLCBTaGlwV2VhcG9uLCBUaWxlZDtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cblByb2plY3RpbGUgPSByZXF1aXJlKCcuL1Byb2plY3RpbGUnKTtcblxuRGFtYWdlYWJsZSA9IHJlcXVpcmUoJy4vRGFtYWdlYWJsZScpO1xuXG5CYXNlV2VhcG9uID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXBXZWFwb247XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwV2VhcG9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwV2VhcG9uIGV4dGVuZHMgQmFzZVdlYXBvbiB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uKSB7XG4gICAgICBzdXBlcihkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dlYXBvbic7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcFdlYXBvbi5leHRlbmQoVGlsZWQpO1xuXG4gIFNoaXBXZWFwb24uZXh0ZW5kKERhbWFnZWFibGUpO1xuXG4gIFNoaXBXZWFwb24ucHJvcGVydGllcyh7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZC5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uLm5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmRpcmVjdGlvbi5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcm9qZWN0aWxlQ2xhc3M6IHtcbiAgICAgIGRlZmF1bHQ6IFByb2plY3RpbGVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwV2VhcG9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBXZWFwb24uanMubWFwXG4iLCJ2YXIgQmFzZVN0YXJNYXBHZW5lcmF0b3IsIE1hcCwgU3Rhck1hcEdlbmVyYXRvciwgU3RhclN5c3RlbTtcblxuQmFzZVN0YXJNYXBHZW5lcmF0b3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuZ2VuZXJhdG9ycy5TdGFyTWFwR2VuZXJhdG9yO1xuXG5NYXAgPSByZXF1aXJlKCcuL01hcCcpO1xuXG5TdGFyU3lzdGVtID0gcmVxdWlyZSgnLi9TdGFyU3lzdGVtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3Rhck1hcEdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3Rhck1hcEdlbmVyYXRvciBleHRlbmRzIEJhc2VTdGFyTWFwR2VuZXJhdG9yIHt9O1xuXG4gIFN0YXJNYXBHZW5lcmF0b3IucHJvdG90eXBlLmRlZk9wdCA9IE9iamVjdC5hc3NpZ24oe30sIEJhc2VTdGFyTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5kZWZPcHQsIHtcbiAgICBtYXBDbGFzczogTWFwLFxuICAgIHN0YXJDbGFzczogU3RhclN5c3RlbSxcbiAgICBsaW5rQ2xhc3M6IFN0YXJTeXN0ZW0uTGlua1xuICB9KTtcblxuICByZXR1cm4gU3Rhck1hcEdlbmVyYXRvcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TdGFyTWFwR2VuZXJhdG9yLmpzLm1hcFxuIiwidmFyIEJhc2VTdGFyU3lzdGVtLCBEaXNwbGF5LCBTdGFyU3lzdGVtO1xuXG5CYXNlU3RhclN5c3RlbSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TdGFyU3lzdGVtO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhclN5c3RlbSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3RhclN5c3RlbSBleHRlbmRzIEJhc2VTdGFyU3lzdGVtIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3N0YXInO1xuICAgICAgcmV0dXJuIHN1cGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICBkcmF3KG1hcCwgY29udGV4dCkge1xuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gMS41O1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzMzNlwiO1xuICAgICAgY29udGV4dC5hcmModGhpcy54IC0gbWFwLmJvdW5kYXJpZXMubGVmdCArIG1hcC5zdGFyTWFyZ2luLCB0aGlzLnkgLSBtYXAuYm91bmRhcmllcy50b3AgKyBtYXAuc3Rhck1hcmdpbiwgbWFwLnN0YXJNYXJnaW4sIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICByZXR1cm4gdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgIGlmIChsaW5rLnN0YXIxID09PSB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBsaW5rLmRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IGxpbmsuZHJhdyhtYXAsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBTdGFyU3lzdGVtLmV4dGVuZChEaXNwbGF5KTtcblxuICBTdGFyU3lzdGVtLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlYOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd4Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgneScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFN0YXJTeXN0ZW07XG5cbn0pLmNhbGwodGhpcyk7XG5cblN0YXJTeXN0ZW0uTGluayA9IGNsYXNzIExpbmsgZXh0ZW5kcyBCYXNlU3RhclN5c3RlbS5MaW5rIHtcbiAgZHJhdyhtYXAsIGNvbnRleHQpIHtcbiAgICB2YXIgZGlzdCwgeDEsIHgyLCB4RGlzdCwgeTEsIHkyLCB5RGlzdDtcbiAgICB4RGlzdCA9IHRoaXMuc3RhcjIueCAtIHRoaXMuc3RhcjEueDtcbiAgICB5RGlzdCA9IHRoaXMuc3RhcjIueSAtIHRoaXMuc3RhcjEueTtcbiAgICBkaXN0ID0gTWF0aC5zcXJ0KCh4RGlzdCAqIHhEaXN0KSArICh5RGlzdCAqIHlEaXN0KSk7XG4gICAgeDEgPSB0aGlzLnN0YXIxLnggKyBtYXAuc3Rhck1hcmdpbiAqIHhEaXN0IC8gZGlzdCAtIG1hcC5ib3VuZGFyaWVzLmxlZnQgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICB5MSA9IHRoaXMuc3RhcjEueSArIG1hcC5zdGFyTWFyZ2luICogeURpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMudG9wICsgbWFwLnN0YXJNYXJnaW47XG4gICAgeDIgPSB0aGlzLnN0YXIyLnggLSBtYXAuc3Rhck1hcmdpbiAqIHhEaXN0IC8gZGlzdCAtIG1hcC5ib3VuZGFyaWVzLmxlZnQgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICB5MiA9IHRoaXMuc3RhcjIueSAtIG1hcC5zdGFyTWFyZ2luICogeURpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMudG9wICsgbWFwLnN0YXJNYXJnaW47XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDE7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzMzNlwiO1xuICAgIGNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICByZXR1cm4gY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1N0YXJTeXN0ZW0uanMubWFwXG4iLCJ2YXIgQmFzZUZsb29yLCBCYXNlVGlsZSwgRGlzcGxheSwgVGlsZTtcblxuQmFzZVRpbGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykudGlsZXMuVGlsZTtcblxuQmFzZUZsb29yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkZsb29yO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZSBleHRlbmRzIEJhc2VUaWxlIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3RpbGUnO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WCh4KSB7XG4gICAgICByZXR1cm4geCAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WSh5KSB7XG4gICAgICByZXR1cm4geSAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlLmV4dGVuZChEaXNwbGF5KTtcblxuICBUaWxlLnNpemUgPSAyMDtcblxuICBUaWxlLnByb3BlcnRpZXMoe1xuICAgIGNvbnRhaW5lcjoge30sXG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdjb250YWluZXInKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCd0aWxlRGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3RpbGVEaXNwbGF5JywgY29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnZGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2Rpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlVG9EaXNwbGF5WChpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZVRvRGlzcGxheVkoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5UaWxlLkZsb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBGbG9vciBleHRlbmRzIEJhc2VGbG9vciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICd0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmNscyA9ICdmbG9vcic7XG4gICAgfVxuXG4gIH07XG5cbiAgRmxvb3IuZXh0ZW5kKFRpbGUpO1xuXG4gIHJldHVybiBGbG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9UaWxlLmpzLm1hcFxuIiwidmFyIEJhc2VUaWxlZCwgRGlzcGxheSwgVGlsZWQ7XG5cbkJhc2VUaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS50aWxlcy5UaWxlZDtcblxuRGlzcGxheSA9IHJlcXVpcmUoJy4vRGlzcGxheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaWxlZCBleHRlbmRzIERpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlZC5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICB0aWxlID0gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZScpO1xuICAgICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2Rpc3BsYXlDb250YWluZXInLCB0aWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIHRpbGUgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0aWxlJyk7XG4gICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS5kaXNwbGF5WCArIHRpbGUudGlsZVRvRGlzcGxheVgoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnb2Zmc2V0WCcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIHRpbGUgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0aWxlJyk7XG4gICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS5kaXNwbGF5WSArIHRpbGUudGlsZVRvRGlzcGxheVkoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnb2Zmc2V0WScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1RpbGVkLmpzLm1hcFxuIiwidmFyIEJhc2VVcGRhdGVyLCBVcGRhdGVyO1xuXG5CYXNlVXBkYXRlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TcGFyay5VcGRhdGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIGV4dGVuZHMgQmFzZVVwZGF0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXBkYXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuICAgIHRoaXMuYmluZGVkID0gZmFsc2U7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgc3VwZXIudXBkYXRlKCk7XG4gICAgdGhpcy5iaW5kZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jYWxsYmFja3MubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEZyYW1lKCk7XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdEZyYW1lKCkge1xuICAgIGlmICghdGhpcy5iaW5kZWQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgc3VwZXIuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RGcmFtZSgpO1xuICB9XG5cbn07XG5cblVwZGF0ZXIuaW5zdGFuY2UgPSBuZXcgVXBkYXRlcigpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1VwZGF0ZXIuanMubWFwXG4iLCJ2YXIgQmFzZVZpZXcsIERpc3BsYXksIERvbVVwZGF0ZXIsIFZpZXc7XG5cbkJhc2VWaWV3ID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlZpZXc7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxuRGlzcGxheSA9IHJlcXVpcmUoJy4vRGlzcGxheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXcgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gICAgY29uc3RydWN0b3IoZGlzcGxheSA9IG51bGwpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICBpZiAoZGlzcGxheSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICB9XG4gICAgICB0aGlzLmhvdmVyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMua2V5c0ludGVydmFsID0ge307XG4gICAgICB0aGlzLmJhc2VDbHMgPSAndmlldyc7XG4gICAgICB0aGlzLmJvdW5kc1N0eWxlcztcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIHN1cGVyLnNldERlZmF1bHRzKCk7XG4gICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lciA9ICQoJ2JvZHknKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5ob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICQoJ2JvZHknKS5rZXlkb3duKHRoaXMuY2FsbGJhY2soJ2tleURvd24nKSk7XG4gICAgICByZXR1cm4gJCgnYm9keScpLmtleXVwKHRoaXMuY2FsbGJhY2soJ2tleVVwJykpO1xuICAgIH1cblxuICAgIG1vdXNlTGVhdmUoKSB7XG4gICAgICB2YXIgY29kZSwgaW50ZXJ2YWwsIHJlZiwgcmVzdWx0cztcbiAgICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xuICAgICAgJCgnYm9keScpLm9mZigna2V5ZG93bicsIHRoaXMuY2FsbGJhY2soJ2tleURvd24nKSk7XG4gICAgICAkKCdib2R5Jykub2ZmKCdrZXl1cCcsIHRoaXMuY2FsbGJhY2soJ2tleVVwJykpO1xuICAgICAgcmVmID0gdGhpcy5rZXlzSW50ZXJ2YWw7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGNvZGUgaW4gcmVmKSB7XG4gICAgICAgIGludGVydmFsID0gcmVmW2NvZGVdO1xuICAgICAgICByZXN1bHRzLnB1c2goY2xlYXJJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAga2V5RG93bihlKSB7XG4gICAgICB2YXIga2V5O1xuICAgICAgaWYgKFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXSAhPSBudWxsKSB7XG4gICAgICAgIGtleSA9IFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXTtcbiAgICAgICAgaWYgKHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy54ICs9IGtleS54ICogMjtcbiAgICAgICAgICByZXR1cm4gdGhpcy55ICs9IGtleS55ICogMjtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGtleVVwKGUpIHtcbiAgICAgIHZhciBrZXk7XG4gICAgICBpZiAoVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdICE9IG51bGwpIHtcbiAgICAgICAga2V5ID0gVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdO1xuICAgICAgICBpZiAodGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzcGxheVBvcygpIHtcbiAgICAgIHJldHVybiAkKCcudmlld0NvbnRlbnQnLCB0aGlzLmRpc3BsYXkpLmNzcyh7XG4gICAgICAgIGxlZnQ6IHRoaXMueCArICdweCcsXG4gICAgICAgIHRvcDogdGhpcy55ICsgJ3B4J1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udGFpbnNQb2ludCh4LCB5KSB7XG4gICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgY29udGFpbmVyID0gdGhpcy5kaXNwbGF5WzBdO1xuICAgICAgd2hpbGUgKGNvbnRhaW5lcikge1xuICAgICAgICB4IC09IGNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuICAgICAgICB5IC09IGNvbnRhaW5lci5vZmZzZXRUb3A7XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5vZmZzZXRQYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gKDAgPD0geCAmJiB4IDw9IHRoaXMuZGlzcGxheS53aWR0aCgpKSAmJiAoMCA8PSB5ICYmIHkgPD0gdGhpcy5kaXNwbGF5LmhlaWdodCgpKTtcbiAgICB9XG5cbiAgfTtcblxuICBWaWV3LmV4dGVuZChEaXNwbGF5KTtcblxuICBWaWV3LmRpcmVjdGlvbmtleXMgPSB7XG4gICAgMzg6IHtcbiAgICAgIG5hbWU6ICd0b3AnLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDFcbiAgICB9LFxuICAgIDM5OiB7XG4gICAgICBuYW1lOiAncmlnaHQnLFxuICAgICAgeDogLTEsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICA0MDoge1xuICAgICAgbmFtZTogJ2JvdHRvbScsXG4gICAgICB4OiAwLFxuICAgICAgeTogLTFcbiAgICB9LFxuICAgIDM3OiB7XG4gICAgICBuYW1lOiAnbGVmdCcsXG4gICAgICB4OiAxLFxuICAgICAgeTogMFxuICAgIH1cbiAgfTtcblxuICBWaWV3LnByb3BlcnRpZXMoe1xuICAgIHg6IHtcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEaXNwbGF5UG9zKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB5OiB7XG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGlzcGxheVBvcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIGRpc3BsYXkgPSBvcmlnaW5hbCgpO1xuICAgICAgICBpZiAoJCgnLnZpZXdDb250ZW50JywgZGlzcGxheSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJChkaXNwbGF5KS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ2aWV3Q29udGVudFwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICAgICQoZGlzcGxheSkubW91c2VlbnRlcih0aGlzLmNhbGxiYWNrKCdtb3VzZUVudGVyJykpO1xuICAgICAgICByZXR1cm4gJChkaXNwbGF5KS5tb3VzZWxlYXZlKHRoaXMuY2FsbGJhY2soJ21vdXNlTGVhdmUnKSk7XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGlzcGxheVBvcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudERpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkKCcudmlld0NvbnRlbnQnLCB0aGlzLmRpc3BsYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYm91bmRzU3R5bGVzOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9wOiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLnRvcCcpICogMTAwICsgJyUnLFxuICAgICAgICAgIGxlZnQ6IGludmFsaWRhdG9yLnByb3BQYXRoKCdib3VuZHMubGVmdCcpICogMTAwICsgJyUnLFxuICAgICAgICAgIGJvdHRvbTogKDEgLSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLmJvdHRvbScpKSAqIDEwMCArICclJyxcbiAgICAgICAgICByaWdodDogKDEgLSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLnJpZ2h0JykpICogMTAwICsgJyUnXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmNzcyh0aGlzLmJvdW5kc1N0eWxlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVmlldztcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9WaWV3LmpzLm1hcFxuIiwidmFyIEJhc2VXaXJlLCBEb21VcGRhdGVyLCBUaWxlZCwgV2lyZTtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cbkJhc2VXaXJlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLndpcmluZy5XaXJlO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2lyZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgV2lyZSBleHRlbmRzIEJhc2VXaXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aXJlVHlwZSkge1xuICAgICAgc3VwZXIod2lyZVR5cGUpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dpcmUnO1xuICAgICAgdGhpcy5jb25uZWN0ZWREaXJlY3Rpb25zO1xuICAgIH1cblxuICAgIGdldENsYXNzRnJvbURpcmVjdGlvbihkKSB7XG4gICAgICByZXR1cm4gJ2Nvbm4nICsgZC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZC5uYW1lLnNsaWNlKDEpO1xuICAgIH1cblxuICB9O1xuXG4gIFdpcmUuZXh0ZW5kKFRpbGVkKTtcblxuICBXaXJlLnByb3BlcnRpZXMoe1xuICAgIGNvbm5lY3RlZERpcmVjdGlvbnM6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCkge1xuICAgICAgICAgICAgb2xkLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyh0aGlzLmdldENsYXNzRnJvbURpcmVjdGlvbihkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGVkRGlyZWN0aW9ucy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMuZ2V0Q2xhc3NGcm9tRGlyZWN0aW9uKGQpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHdpcmVUeXBlOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMud2lyZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFdpcmU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvV2lyZS5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkF1dG9tYXRpY0Rvb3JcIjogcmVxdWlyZShcIi4vQXV0b21hdGljRG9vclwiKSxcbiAgXCJDaGFyYWN0ZXJcIjogcmVxdWlyZShcIi4vQ2hhcmFjdGVyXCIpLFxuICBcIkRhbWFnZWFibGVcIjogcmVxdWlyZShcIi4vRGFtYWdlYWJsZVwiKSxcbiAgXCJEaXNwbGF5XCI6IHJlcXVpcmUoXCIuL0Rpc3BsYXlcIiksXG4gIFwiRG9tVXBkYXRlclwiOiByZXF1aXJlKFwiLi9Eb21VcGRhdGVyXCIpLFxuICBcIkRvb3JcIjogcmVxdWlyZShcIi4vRG9vclwiKSxcbiAgXCJHYW1lXCI6IHJlcXVpcmUoXCIuL0dhbWVcIiksXG4gIFwiTWFwXCI6IHJlcXVpcmUoXCIuL01hcFwiKSxcbiAgXCJQbGF5ZXJDb250cm9sbGVyXCI6IHJlcXVpcmUoXCIuL1BsYXllckNvbnRyb2xsZXJcIiksXG4gIFwiUGxheWVyU2VsZWN0aW9uSW5mb1wiOiByZXF1aXJlKFwiLi9QbGF5ZXJTZWxlY3Rpb25JbmZvXCIpLFxuICBcIlByb2plY3RpbGVcIjogcmVxdWlyZShcIi4vUHJvamVjdGlsZVwiKSxcbiAgXCJTaGlwXCI6IHJlcXVpcmUoXCIuL1NoaXBcIiksXG4gIFwiU2hpcEludGVyaW9yXCI6IHJlcXVpcmUoXCIuL1NoaXBJbnRlcmlvclwiKSxcbiAgXCJTaGlwV2VhcG9uXCI6IHJlcXVpcmUoXCIuL1NoaXBXZWFwb25cIiksXG4gIFwiU3Rhck1hcEdlbmVyYXRvclwiOiByZXF1aXJlKFwiLi9TdGFyTWFwR2VuZXJhdG9yXCIpLFxuICBcIlN0YXJTeXN0ZW1cIjogcmVxdWlyZShcIi4vU3RhclN5c3RlbVwiKSxcbiAgXCJUaWxlXCI6IHJlcXVpcmUoXCIuL1RpbGVcIiksXG4gIFwiVGlsZWRcIjogcmVxdWlyZShcIi4vVGlsZWRcIiksXG4gIFwiVXBkYXRlclwiOiByZXF1aXJlKFwiLi9VcGRhdGVyXCIpLFxuICBcIlZpZXdcIjogcmVxdWlyZShcIi4vVmlld1wiKSxcbiAgXCJXaXJlXCI6IHJlcXVpcmUoXCIuL1dpcmVcIiksXG59IiwidmFyIFBhcmFsbGVsaW8sIGxpYnM7XG5cbmxpYnMgPSByZXF1aXJlKCcuL2xpYnMnKTtcblxuUGFyYWxsZWxpbyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBQYXJhbGxlbGlvLCB7XG4gIERPTTogbGlic1xufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvcGFyYWxsZWxpby1kb20uanMubWFwXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgb2JqZWN0Q3JlYXRlUG9seWZpbGxcbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgb2JqZWN0S2V5c1BvbHlmaWxsXG52YXIgYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGZ1bmN0aW9uQmluZFBvbHlmaWxsXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX2V2ZW50cycpKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbnZhciBoYXNEZWZpbmVQcm9wZXJ0eTtcbnRyeSB7XG4gIHZhciBvID0ge307XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAneCcsIHsgdmFsdWU6IDAgfSk7XG4gIGhhc0RlZmluZVByb3BlcnR5ID0gby54ID09PSAwO1xufSBjYXRjaCAoZXJyKSB7IGhhc0RlZmluZVByb3BlcnR5ID0gZmFsc2UgfVxuaWYgKGhhc0RlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIGlucHV0IGlzIGEgcG9zaXRpdmUgbnVtYmVyICh3aG9zZSB2YWx1ZSBpcyB6ZXJvIG9yXG4gICAgICAvLyBncmVhdGVyIGFuZCBub3QgYSBOYU4pLlxuICAgICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgYXJnICE9PSBhcmcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZGVmYXVsdE1heExpc3RlbmVyc1wiIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gZGVmYXVsdE1heExpc3RlbmVycztcbn1cblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcIm5cIiBhcmd1bWVudCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbi8vIFRoZXNlIHN0YW5kYWxvbmUgZW1pdCogZnVuY3Rpb25zIGFyZSB1c2VkIHRvIG9wdGltaXplIGNhbGxpbmcgb2YgZXZlbnRcbi8vIGhhbmRsZXJzIGZvciBmYXN0IGNhc2VzIGJlY2F1c2UgZW1pdCgpIGl0c2VsZiBvZnRlbiBoYXMgYSB2YXJpYWJsZSBudW1iZXIgb2Zcbi8vIGFyZ3VtZW50cyBhbmQgY2FuIGJlIGRlb3B0aW1pemVkIGJlY2F1c2Ugb2YgdGhhdC4gVGhlc2UgZnVuY3Rpb25zIGFsd2F5cyBoYXZlXG4vLyB0aGUgc2FtZSBudW1iZXIgb2YgYXJndW1lbnRzIGFuZCB0aHVzIGRvIG5vdCBnZXQgZGVvcHRpbWl6ZWQsIHNvIHRoZSBjb2RlXG4vLyBpbnNpZGUgdGhlbSBjYW4gZXhlY3V0ZSBmYXN0ZXIuXG5mdW5jdGlvbiBlbWl0Tm9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUd28oaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJnMSwgYXJnMikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmLCBhcmcxLCBhcmcyKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdFRocmVlKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJncykge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgZXZlbnRzO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PSBudWxsKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoIWhhbmRsZXIpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBpc0ZuID0gdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbic7XG4gIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgY2FzZSAxOlxuICAgICAgZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgdGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgZGVmYXVsdDpcbiAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmICghZXZlbnRzKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lcikge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBpZiAoIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICAgIGlmIChtICYmIG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0pIHtcbiAgICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnIFwiJyArIFN0cmluZyh0eXBlKSArICdcIiBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0LicpO1xuICAgICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybignJXM6ICVzJywgdy5uYW1lLCB3Lm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0LCBhcmd1bWVudHNbMF0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0LCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgYXJndW1lbnRzWzJdKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpXG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJncyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IGJpbmQuY2FsbChvbmNlV3JhcHBlciwgc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKCFldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKCFldmVudHMpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoIWV2bGlzdGVuZXIpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKS5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpXG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb2JqZWN0Q3JlYXRlUG9seWZpbGwocHJvdG8pIHtcbiAgdmFyIEYgPSBmdW5jdGlvbigpIHt9O1xuICBGLnByb3RvdHlwZSA9IHByb3RvO1xuICByZXR1cm4gbmV3IEY7XG59XG5mdW5jdGlvbiBvYmplY3RLZXlzUG9seWZpbGwob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGsgaW4gb2JqKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaykpIHtcbiAgICBrZXlzLnB1c2goayk7XG4gIH1cbiAgcmV0dXJuIGs7XG59XG5mdW5jdGlvbiBmdW5jdGlvbkJpbmRQb2x5ZmlsbChjb250ZXh0KSB7XG4gIHZhciBmbiA9IHRoaXM7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlXG5cbmNsYXNzIEFpcmxvY2sgZXh0ZW5kcyBUaWxlIHtcbiAgYXR0YWNoVG8gKGFpcmxvY2spIHtcbiAgICB0aGlzLmF0dGFjaGVkVG8gPSBhaXJsb2NrXG4gIH1cblxuICBjb3B5QW5kUm90YXRlIChhbmdsZSwgb3JpZ2luKSB7XG4gICAgY29uc3QgY29weSA9IHN1cGVyLmNvcHlBbmRSb3RhdGUoYW5nbGUsIG9yaWdpbilcbiAgICBjb3B5LmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLnJvdGF0ZShhbmdsZSlcbiAgICByZXR1cm4gY29weVxuICB9XG59XG5cbkFpcmxvY2sucHJvcGVydGllcyh7XG4gIGRpcmVjdGlvbjoge30sXG4gIGF0dGFjaGVkVG86IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFpcmxvY2tcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuXG5jbGFzcyBBcHByb2FjaCBleHRlbmRzIEVsZW1lbnQge1xuICBzdGFydCAoKSB7XG4gICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zdWJqZWN0LnhNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgnY3VycmVudFBvcy54JywgdGhpcylcbiAgICAgIHRoaXMuc3ViamVjdC55TWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ2N1cnJlbnRQb3MueCcsIHRoaXMpXG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9uZSgpXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGRvbmUgKCkge1xuICAgIHRoaXMuc3ViamVjdC54TWVtYmVycy5yZW1vdmVSZWYoe1xuICAgICAgbmFtZTogJ2N1cnJlbnRQb3MueCcsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMuc3ViamVjdC55TWVtYmVycy5yZW1vdmVSZWYoe1xuICAgICAgbmFtZTogJ2N1cnJlbnRQb3MueCcsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMuc3ViamVjdC54ID0gdGhpcy50YXJnZXRQb3MueFxuICAgIHRoaXMuc3ViamVjdC55ID0gdGhpcy50YXJnZXRQb3MueFxuICAgIHRoaXMuc3ViamVjdEFpcmxvY2suYXR0YWNoVG8odGhpcy50YXJnZXRBaXJsb2NrKVxuICAgIHRoaXMubW92aW5nID0gZmFsc2VcbiAgICB0aGlzLmNvbXBsZXRlID0gdHJ1ZVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgdGhpcy50aW1lb3V0LmRlc3Ryb3koKVxuICAgIH1cbiAgfVxufTtcblxuQXBwcm9hY2gucHJvcGVydGllcyh7XG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfSxcbiAgaW5pdGlhbERpc3Q6IHtcbiAgICBkZWZhdWx0OiA1MDBcbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfSxcbiAgYW5nbGU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJuZyAqIE1hdGguUEkgKiAyXG4gICAgfVxuICB9LFxuICBzdGFydGluZ1Bvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy5zdGFydGluZ1Bvcy54ICsgdGhpcy5pbml0aWFsRGlzdCAqIE1hdGguY29zKHRoaXMuYW5nbGUpLFxuICAgICAgICB5OiB0aGlzLnN0YXJ0aW5nUG9zLnkgKyB0aGlzLmluaXRpYWxEaXN0ICogTWF0aC5zaW4odGhpcy5hbmdsZSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRhcmdldFBvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy50YXJnZXRBaXJsb2NrLnggLSB0aGlzLnN1YmplY3RBaXJsb2NrLngsXG4gICAgICAgIHk6IHRoaXMudGFyZ2V0QWlybG9jay55IC0gdGhpcy5zdWJqZWN0QWlybG9jay55XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzdWJqZWN0OiB7fSxcbiAgdGFyZ2V0OiB7fSxcbiAgdmFsaWQ6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0aGlzLnRhcmdldCAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuc3ViamVjdC5haXJsb2Nrcy5sZW5ndGggPiAwICYmXG4gICAgICAgIHRoaXMudGFyZ2V0LmFpcmxvY2tzLmxlbmd0aCA+IDBcbiAgICB9XG4gIH0sXG4gIHN1YmplY3RBaXJsb2NrOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYWlybG9ja3NcbiAgICAgIGFpcmxvY2tzID0gdGhpcy5zdWJqZWN0LmFpcmxvY2tzLnNsaWNlKClcbiAgICAgIGFpcmxvY2tzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgdmFyIHZhbEEsIHZhbEJcbiAgICAgICAgdmFsQSA9IE1hdGguYWJzKGEuZGlyZWN0aW9uLnggLSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSkgKyBNYXRoLmFicyhhLmRpcmVjdGlvbi55IC0gTWF0aC5zaW4odGhpcy5hbmdsZSkpXG4gICAgICAgIHZhbEIgPSBNYXRoLmFicyhiLmRpcmVjdGlvbi54IC0gTWF0aC5jb3ModGhpcy5hbmdsZSkpICsgTWF0aC5hYnMoYi5kaXJlY3Rpb24ueSAtIE1hdGguc2luKHRoaXMuYW5nbGUpKVxuICAgICAgICByZXR1cm4gdmFsQSAtIHZhbEJcbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWlybG9ja3MuZ2V0KDApXG4gICAgfVxuICB9LFxuICB0YXJnZXRBaXJsb2NrOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWlybG9ja3MuZmluZCgodGFyZ2V0KSA9PiB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuZGlyZWN0aW9uLmdldEludmVyc2UoKSA9PT0gdGhpcy5zdWJqZWN0QWlybG9jay5kaXJlY3Rpb25cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtb3Zpbmc6IHtcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9LFxuICBjb21wbGV0ZToge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGN1cnJlbnRQb3M6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgdmFyIGVuZCwgcHJjLCBzdGFydFxuICAgICAgc3RhcnQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuc3RhcnRpbmdQb3NQcm9wZXJ0eSlcbiAgICAgIGVuZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy50YXJnZXRQb3NQcm9wZXJ0eSlcbiAgICAgIHByYyA9IGludmFsaWRhdG9yLnByb3BQYXRoKCd0aW1lb3V0LnByYycpIHx8IDBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChlbmQueCAtIHN0YXJ0LngpICogcHJjICsgc3RhcnQueCxcbiAgICAgICAgeTogKGVuZC55IC0gc3RhcnQueSkgKiBwcmMgKyBzdGFydC55XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkdXJhdGlvbjoge1xuICAgIGRlZmF1bHQ6IDEwMDAwXG4gIH0sXG4gIHRpbWVvdXQ6IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcHJvYWNoXG4iLCJjb25zdCBEb29yID0gcmVxdWlyZSgnLi9Eb29yJylcbmNvbnN0IENoYXJhY3RlciA9IHJlcXVpcmUoJy4vQ2hhcmFjdGVyJylcblxuY2xhc3MgQXV0b21hdGljRG9vciBleHRlbmRzIERvb3Ige1xuICB1cGRhdGVUaWxlTWVtYmVycyAob2xkKSB7XG4gICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmM1xuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgaWYgKChyZWYgPSBvbGQud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZi5yZW1vdmVQcm9wZXJ0eSh0aGlzLnVubG9ja2VkUHJvcGVydHkpXG4gICAgICB9XG4gICAgICBpZiAoKHJlZjEgPSBvbGQudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZjEucmVtb3ZlUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgIGlmICgocmVmMiA9IHRoaXMudGlsZS53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgcmVmMi5hZGRQcm9wZXJ0eSh0aGlzLnVubG9ja2VkUHJvcGVydHkpXG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZjMgPSB0aGlzLnRpbGUudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsID8gcmVmMy5hZGRQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSkgOiBudWxsXG4gICAgfVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgc3VwZXIuaW5pdCgpXG4gICAgcmV0dXJuIHRoaXMub3BlblxuICB9XG5cbiAgaXNBY3RpdmF0b3JQcmVzZW50IChpbnZhbGlkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVhY3RpdmVUaWxlcyhpbnZhbGlkYXRlKS5zb21lKCh0aWxlKSA9PiB7XG4gICAgICB2YXIgY2hpbGRyZW5cbiAgICAgIGNoaWxkcmVuID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aWxlLmNoaWxkcmVuUHJvcGVydHkpIDogdGlsZS5jaGlsZHJlblxuICAgICAgcmV0dXJuIGNoaWxkcmVuLnNvbWUoKGNoaWxkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkJlQWN0aXZhdGVkQnkoY2hpbGQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjYW5CZUFjdGl2YXRlZEJ5IChlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0gaW5zdGFuY2VvZiBDaGFyYWN0ZXJcbiAgfVxuXG4gIGdldFJlYWN0aXZlVGlsZXMgKGludmFsaWRhdGUpIHtcbiAgICB2YXIgZGlyZWN0aW9uLCB0aWxlXG4gICAgdGlsZSA9IGludmFsaWRhdGUgPyBpbnZhbGlkYXRlLnByb3AodGhpcy50aWxlUHJvcGVydHkpIDogdGhpcy50aWxlXG4gICAgaWYgKCF0aWxlKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgZGlyZWN0aW9uID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aGlzLmRpcmVjdGlvblByb3BlcnR5KSA6IHRoaXMuZGlyZWN0aW9uXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRG9vci5kaXJlY3Rpb25zLmhvcml6b250YWwpIHtcbiAgICAgIHJldHVybiBbdGlsZSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoMCwgMSksIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKDAsIC0xKV0uZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICE9IG51bGxcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdGlsZSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoMSwgMCksIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKC0xLCAwKV0uZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICE9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59O1xuXG5BdXRvbWF0aWNEb29yLnByb3BlcnRpZXMoe1xuICBvcGVuOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgcmV0dXJuICFpbnZhbGlkYXRlLnByb3AodGhpcy5sb2NrZWRQcm9wZXJ0eSkgJiYgdGhpcy5pc0FjdGl2YXRvclByZXNlbnQoaW52YWxpZGF0ZSlcbiAgICB9XG4gIH0sXG4gIGxvY2tlZDoge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIHVubG9ja2VkOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgcmV0dXJuICFpbnZhbGlkYXRlLnByb3AodGhpcy5sb2NrZWRQcm9wZXJ0eSlcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b21hdGljRG9vclxuIiwiY29uc3QgVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWRcbmNvbnN0IERhbWFnZWFibGUgPSByZXF1aXJlKCcuL0RhbWFnZWFibGUnKVxuY29uc3QgV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9XYWxrQWN0aW9uJylcbmNvbnN0IEFjdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyJylcblxuY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgVGlsZWQge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG9wdGlvbnMgPSB7IG5hbWU6IG9wdGlvbnMgfVxuICAgIH1cbiAgICBzdXBlcihvcHRpb25zKVxuICB9XG5cbiAgc2V0RGVmYXVsdHMgKCkge1xuICAgIGlmICghdGhpcy50aWxlICYmICh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIgIT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1dE9uUmFuZG9tVGlsZSh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIudGlsZXMpXG4gICAgfVxuICB9XG5cbiAgY2FuR29PblRpbGUgKHRpbGUpIHtcbiAgICByZXR1cm4gKHRpbGUgIT0gbnVsbCA/IHRpbGUud2Fsa2FibGUgOiBudWxsKSAhPT0gZmFsc2VcbiAgfVxuXG4gIHdhbGtUbyAodGlsZSkge1xuICAgIHZhciBhY3Rpb25cbiAgICBhY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICBhY3RvcjogdGhpcyxcbiAgICAgIHRhcmdldDogdGlsZVxuICAgIH0pXG4gICAgYWN0aW9uLnN0YXJ0KClcbiAgICByZXR1cm4gYWN0aW9uXG4gIH1cblxuICBpc1NlbGVjdGFibGVCeSAocGxheWVyKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxufTtcblxuQ2hhcmFjdGVyLmV4dGVuZChEYW1hZ2VhYmxlKVxuXG5DaGFyYWN0ZXIucHJvcGVydGllcyh7XG4gIG5hbWU6IHt9LFxuICBnYW1lOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgb2Zmc2V0WDoge1xuICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IDAuNVxuICB9LFxuICBvZmZzZXRZOiB7XG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgZGVmYXVsdDogMC41XG4gIH0sXG4gIHRpbGU6IHtcbiAgICBjb21wb3NlZDogdHJ1ZVxuICB9LFxuICBkZWZhdWx0QWN0aW9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICBhY3RvcjogdGhpc1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGFjdGlvblByb3ZpZGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEFjdGlvblByb3ZpZGVyKHtcbiAgICAgICAgb3duZXI6IHRoaXNcbiAgICAgIH0pXG4gICAgICBwcm92aWRlci5hY3Rpb25zTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ293bmVyLnRpbGUuYWN0aW9uUHJvdmlkZXIuYWN0aW9ucycpXG4gICAgICByZXR1cm4gcHJvdmlkZXJcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyXG4iLCJjb25zdCBUaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXJcbmNvbnN0IFZpc2lvbkNhbGN1bGF0b3IgPSByZXF1aXJlKCcuL1Zpc2lvbkNhbGN1bGF0b3InKVxuY29uc3QgRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpXG5jb25zdCBXYWxrQWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb25zL1dhbGtBY3Rpb24nKVxuY29uc3QgQXR0YWNrTW92ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uJylcbmNvbnN0IFByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXJcblxuY2xhc3MgQ2hhcmFjdGVyQUkge1xuICBjb25zdHJ1Y3RvciAoY2hhcmFjdGVyKSB7XG4gICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJcbiAgICB0aGlzLm5leHRBY3Rpb25DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5leHRBY3Rpb24oKVxuICAgIH1cbiAgICB0aGlzLnZpc2lvbk1lbW9yeSA9IG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICB0aGlzLnRpbGVXYXRjaGVyID0gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVWaXNpb25NZW1vcnkoKVxuICAgICAgfSxcbiAgICAgIHByb3BlcnR5OiB0aGlzLmNoYXJhY3Rlci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgndGlsZScpXG4gICAgfSlcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLnRpbGVXYXRjaGVyLmJpbmQoKVxuICAgIHJldHVybiB0aGlzLm5leHRBY3Rpb24oKVxuICB9XG5cbiAgbmV4dEFjdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVWaXNpb25NZW1vcnkoKVxuICAgIGNvbnN0IGVuZW15ID0gdGhpcy5nZXRDbG9zZXN0RW5lbXkoKVxuICAgIGlmIChlbmVteSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrTW92ZVRvKGVuZW15KS5vbignZW5kJywgdGhpcy5uZXh0QWN0aW9uQ2FsbGJhY2spXG4gICAgfVxuICAgIGNvbnN0IHVuZXhwbG9yZWQgPSB0aGlzLmdldENsb3Nlc3RVbmV4cGxvcmVkKClcbiAgICBpZiAodW5leHBsb3JlZCkge1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa1RvKHVuZXhwbG9yZWQpLm9uKCdlbmQnLCB0aGlzLm5leHRBY3Rpb25DYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFZpc2lvbk1lbW9yeSgpXG4gICAgICByZXR1cm4gdGhpcy53YWxrVG8odGhpcy5nZXRDbG9zZXN0VW5leHBsb3JlZCgpKS5vbignZW5kJywgdGhpcy5uZXh0QWN0aW9uQ2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlzaW9uTWVtb3J5ICgpIHtcbiAgICB2YXIgY2FsY3VsYXRvclxuICAgIGNhbGN1bGF0b3IgPSBuZXcgVmlzaW9uQ2FsY3VsYXRvcih0aGlzLmNoYXJhY3Rlci50aWxlKVxuICAgIGNhbGN1bGF0b3IuY2FsY3VsKClcbiAgICB0aGlzLnZpc2lvbk1lbW9yeSA9IGNhbGN1bGF0b3IudG9Db250YWluZXIoKS5tZXJnZSh0aGlzLnZpc2lvbk1lbW9yeSwgKGEsIGIpID0+IHtcbiAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgYSA9IHRoaXMuYW5hbHl6ZVRpbGUoYSlcbiAgICAgIH1cbiAgICAgIGlmICgoYSAhPSBudWxsKSAmJiAoYiAhPSBudWxsKSkge1xuICAgICAgICBhLnZpc2liaWxpdHkgPSBNYXRoLm1heChhLnZpc2liaWxpdHksIGIudmlzaWJpbGl0eSlcbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhIHx8IGJcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYW5hbHl6ZVRpbGUgKHRpbGUpIHtcbiAgICB2YXIgcmVmXG4gICAgdGlsZS5lbm5lbXlTcG90dGVkID0gKHJlZiA9IHRpbGUuZ2V0RmluYWxUaWxlKCkuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaXNFbm5lbXkoYylcbiAgICB9KSA6IG51bGxcbiAgICB0aWxlLmV4cGxvcmFibGUgPSB0aGlzLmlzRXhwbG9yYWJsZSh0aWxlKVxuICAgIHJldHVybiB0aWxlXG4gIH1cblxuICBpc0VubmVteSAoZWxlbSkge1xuICAgIHZhciByZWZcbiAgICByZXR1cm4gKHJlZiA9IHRoaXMuY2hhcmFjdGVyLm93bmVyKSAhPSBudWxsID8gdHlwZW9mIHJlZi5pc0VuZW15ID09PSAnZnVuY3Rpb24nID8gcmVmLmlzRW5lbXkoZWxlbSkgOiBudWxsIDogbnVsbFxuICB9XG5cbiAgZ2V0Q2xvc2VzdEVuZW15ICgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpb25NZW1vcnkuY2xvc2VzdCh0aGlzLmNoYXJhY3Rlci50aWxlLCAodCkgPT4ge1xuICAgICAgcmV0dXJuIHQuZW5uZW15U3BvdHRlZFxuICAgIH0pXG4gIH1cblxuICBnZXRDbG9zZXN0VW5leHBsb3JlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaW9uTWVtb3J5LmNsb3Nlc3QodGhpcy5jaGFyYWN0ZXIudGlsZSwgKHQpID0+IHtcbiAgICAgIHJldHVybiB0LnZpc2liaWxpdHkgPCAxICYmIHQuZXhwbG9yYWJsZVxuICAgIH0pXG4gIH1cblxuICBpc0V4cGxvcmFibGUgKHRpbGUpIHtcbiAgICB2YXIgcmVmXG4gICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKClcbiAgICByZXR1cm4gdGlsZS53YWxrYWJsZSB8fCAoKHJlZiA9IHRpbGUuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIGMgaW5zdGFuY2VvZiBEb29yXG4gICAgfSkgOiBudWxsKVxuICB9XG5cbiAgYXR0YWNrTW92ZVRvICh0aWxlKSB7XG4gICAgdmFyIGFjdGlvblxuICAgIHRpbGUgPSB0aWxlLmdldEZpbmFsVGlsZSgpXG4gICAgYWN0aW9uID0gbmV3IEF0dGFja01vdmVBY3Rpb24oe1xuICAgICAgYWN0b3I6IHRoaXMuY2hhcmFjdGVyLFxuICAgICAgdGFyZ2V0OiB0aWxlXG4gICAgfSlcbiAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgYWN0aW9uLnN0YXJ0KClcbiAgICAgIHJldHVybiBhY3Rpb25cbiAgICB9XG4gIH1cblxuICB3YWxrVG8gKHRpbGUpIHtcbiAgICB2YXIgYWN0aW9uXG4gICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKClcbiAgICBhY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICBhY3RvcjogdGhpcy5jaGFyYWN0ZXIsXG4gICAgICB0YXJnZXQ6IHRpbGVcbiAgICB9KVxuICAgIGlmIChhY3Rpb24uaXNSZWFkeSgpKSB7XG4gICAgICBhY3Rpb24uc3RhcnQoKVxuICAgICAgcmV0dXJuIGFjdGlvblxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENoYXJhY3RlckFJXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFZpZXcgPSByZXF1aXJlKCcuL1ZpZXcnKVxuY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vU2hpcCcpXG5jb25zdCBBcHByb2FjaCA9IHJlcXVpcmUoJy4vQXBwcm9hY2gnKVxuXG5jbGFzcyBDb25mcm9udGF0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLnN1YmplY3QuZW5jb3VudGVyID0gdGhpc1xuICAgIHRoaXMuZ2FtZS5tYWluVmlldyA9IHRoaXMudmlld1xuICAgIHRoaXMuZ2FtZS5hZGQodGhpcy5zdWJqZWN0LmludGVycmlvcilcbiAgICB0aGlzLnN1YmplY3QuaW50ZXJyaW9yLmNvbnRhaW5lciA9IHRoaXMudmlld1xuICAgIHRoaXMuZ2FtZS5hZGQodGhpcy5vcHBvbmVudC5pbnRlcnJpb3IpXG4gICAgdGhpcy5vcHBvbmVudC5pbnRlcnJpb3IuY29udGFpbmVyID0gdGhpcy52aWV3XG4gICAgdGhpcy5hcHByb2FjaC5zdGFydCgpXG4gIH1cbn07XG5cbkNvbmZyb250YXRpb24ucHJvcGVydGllcyh7XG4gIGdhbWU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHN1YmplY3Q6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHZpZXc6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgVmlldygpXG4gICAgfVxuICB9LFxuICBvcHBvbmVudDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBTaGlwKClcbiAgICB9XG4gIH0sXG4gIGFwcHJvYWNoOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEFwcHJvYWNoKHtcbiAgICAgICAgc3ViamVjdDogdGhpcy5vcHBvbmVudC5pbnRlcnJpb3IsXG4gICAgICAgIHRhcmdldDogdGhpcy5zdWJqZWN0LmludGVycmlvclxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQ29uZnJvbnRhdGlvblxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBMaW5lT2ZTaWdodCA9IHJlcXVpcmUoJy4vTGluZU9mU2lnaHQnKVxuY29uc3QgRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvblxuXG5jbGFzcyBEYW1hZ2VQcm9wYWdhdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICBnZXRUaWxlQ29udGFpbmVyICgpIHtcbiAgICByZXR1cm4gdGhpcy50aWxlLmNvbnRhaW5lclxuICB9XG5cbiAgYXBwbHkgKCkge1xuICAgIHRoaXMuZ2V0RGFtYWdlZCgpLmZvckVhY2goKGRhbWFnZSkgPT4ge1xuICAgICAgZGFtYWdlLnRhcmdldC5kYW1hZ2UoZGFtYWdlLmRhbWFnZSlcbiAgICB9KVxuICB9XG5cbiAgZ2V0SW5pdGlhbFRpbGVzICgpIHtcbiAgICB2YXIgY3RuXG4gICAgY3RuID0gdGhpcy5nZXRUaWxlQ29udGFpbmVyKClcbiAgICByZXR1cm4gY3RuLmluUmFuZ2UodGhpcy50aWxlLCB0aGlzLnJhbmdlKVxuICB9XG5cbiAgZ2V0SW5pdGlhbERhbWFnZXMgKCkge1xuICAgIGNvbnN0IHRpbGVzID0gdGhpcy5nZXRJbml0aWFsVGlsZXMoKVxuICAgIHJldHVybiB0aWxlcy5yZWR1Y2UoKGRhbWFnZXMsIHRpbGUpID0+IHtcbiAgICAgIGlmICh0aWxlLmRhbWFnZWFibGUpIHtcbiAgICAgICAgY29uc3QgZG1nID0gdGhpcy5pbml0aWFsRGFtYWdlKHRpbGUsIHRpbGVzLmxlbmd0aClcbiAgICAgICAgaWYgKGRtZykge1xuICAgICAgICAgIGRhbWFnZXMucHVzaChkbWcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBkYW1hZ2VzXG4gICAgfSwgW10pXG4gIH1cblxuICBnZXREYW1hZ2VkICgpIHtcbiAgICB2YXIgYWRkZWRcbiAgICBpZiAodGhpcy5fZGFtYWdlZCA9PSBudWxsKSB7XG4gICAgICBhZGRlZCA9IG51bGxcbiAgICAgIGRvIHtcbiAgICAgICAgYWRkZWQgPSB0aGlzLnN0ZXAoYWRkZWQpXG4gICAgICB9IHdoaWxlIChhZGRlZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX2RhbWFnZWRcbiAgfVxuXG4gIHN0ZXAgKGFkZGVkKSB7XG4gICAgaWYgKGFkZGVkICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmV4dGVuZGVkRGFtYWdlICE9IG51bGwpIHtcbiAgICAgICAgYWRkZWQgPSB0aGlzLmV4dGVuZChhZGRlZClcbiAgICAgICAgdGhpcy5fZGFtYWdlZCA9IGFkZGVkLmNvbmNhdCh0aGlzLl9kYW1hZ2VkKVxuICAgICAgICByZXR1cm4gYWRkZWQubGVuZ3RoID4gMCAmJiBhZGRlZFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYW1hZ2VkID0gdGhpcy5nZXRJbml0aWFsRGFtYWdlcygpXG4gICAgICByZXR1cm4gdGhpcy5fZGFtYWdlZFxuICAgIH1cbiAgfVxuXG4gIGluRGFtYWdlZCAodGFyZ2V0LCBkYW1hZ2VkKSB7XG4gICAgY29uc3QgcG9zID0gZGFtYWdlZC5maW5kSW5kZXgoKGRhbWFnZSkgPT4gZGFtYWdlLnRhcmdldCA9PT0gdGFyZ2V0KVxuICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgZXh0ZW5kIChkYW1hZ2VkKSB7XG4gICAgY29uc3QgY3RuID0gdGhpcy5nZXRUaWxlQ29udGFpbmVyKClcbiAgICByZXR1cm4gZGFtYWdlZC5yZWR1Y2UoKGFkZGVkLCBkYW1hZ2UpID0+IHtcbiAgICAgIGlmIChkYW1hZ2UudGFyZ2V0LnggPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gYWRkZWRcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxvY2FsID0gRGlyZWN0aW9uLmFkamFjZW50cy5yZWR1Y2UoKGxvY2FsLCBkaXIpID0+IHtcbiAgICAgICAgY29uc3QgdGlsZSA9IGN0bi5nZXRUaWxlKGRhbWFnZS50YXJnZXQueCArIGRpci54LCBkYW1hZ2UudGFyZ2V0LnkgKyBkaXIueSlcbiAgICAgICAgaWYgKCh0aWxlICE9IG51bGwpICYmIHRpbGUuZGFtYWdlYWJsZSAmJiB0aGlzLmluRGFtYWdlZCh0aWxlLCB0aGlzLl9kYW1hZ2VkKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBsb2NhbC5wdXNoKHRpbGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxvY2FsXG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiBsb2NhbC5yZWR1Y2UoKGFkZGVkLCB0YXJnZXQpID0+IHtcbiAgICAgICAgY29uc3QgZG1nID0gdGhpcy5leHRlbmRlZERhbWFnZSh0YXJnZXQsIGRhbWFnZSwgbG9jYWwubGVuZ3RoKVxuICAgICAgICBpZiAoZG1nKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLmluRGFtYWdlZCh0YXJnZXQsIGFkZGVkKVxuICAgICAgICAgIGlmIChleGlzdGluZyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGFkZGVkLnB1c2goZG1nKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZGRlZFtleGlzdGluZ10gPSB0aGlzLm1lcmdlRGFtYWdlKGFkZGVkW2V4aXN0aW5nXSwgZG1nKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRkZWRcbiAgICAgIH0sIGFkZGVkKVxuICAgIH0sIFtdKVxuICB9XG5cbiAgbWVyZ2VEYW1hZ2UgKGQxLCBkMikge1xuICAgIHJldHVybiB7XG4gICAgICB0YXJnZXQ6IGQxLnRhcmdldCxcbiAgICAgIHBvd2VyOiBkMS5wb3dlciArIGQyLnBvd2VyLFxuICAgICAgZGFtYWdlOiBkMS5kYW1hZ2UgKyBkMi5kYW1hZ2VcbiAgICB9XG4gIH1cblxuICBtb2RpZnlEYW1hZ2UgKHRhcmdldCwgcG93ZXIpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldC5tb2RpZnlEYW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRhcmdldC5tb2RpZnlEYW1hZ2UocG93ZXIsIHRoaXMudHlwZSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHBvd2VyKVxuICAgIH1cbiAgfVxufTtcblxuRGFtYWdlUHJvcGFnYXRpb24ucHJvcGVydGllcyh7XG4gIHRpbGU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHBvd2VyOiB7XG4gICAgZGVmYXVsdDogMTBcbiAgfSxcbiAgcmFuZ2U6IHtcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG4gIHR5cGU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH1cbn0pXG5cbkRhbWFnZVByb3BhZ2F0aW9uLk5vcm1hbCA9IGNsYXNzIE5vcm1hbCBleHRlbmRzIERhbWFnZVByb3BhZ2F0aW9uIHtcbiAgaW5pdGlhbERhbWFnZSAodGFyZ2V0LCBuYikge1xuICAgIHZhciBkbWdcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHRoaXMucG93ZXIpXG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRGFtYWdlUHJvcGFnYXRpb24uVGhlcm1pYyA9IGNsYXNzIFRoZXJtaWMgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGV4dGVuZGVkRGFtYWdlICh0YXJnZXQsIGxhc3QsIG5iKSB7XG4gICAgdmFyIGRtZywgcG93ZXJcbiAgICBwb3dlciA9IChsYXN0LmRhbWFnZSAtIDEpIC8gMiAvIG5iICogTWF0aC5taW4oMSwgbGFzdC50YXJnZXQuaGVhbHRoIC8gbGFzdC50YXJnZXQubWF4SGVhbHRoICogNSlcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHBvd2VyKVxuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxEYW1hZ2UgKHRhcmdldCwgbmIpIHtcbiAgICB2YXIgZG1nLCBwb3dlclxuICAgIHBvd2VyID0gdGhpcy5wb3dlciAvIG5iXG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBwb3dlcilcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuRGFtYWdlUHJvcGFnYXRpb24uS2luZXRpYyA9IGNsYXNzIEtpbmV0aWMgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGV4dGVuZGVkRGFtYWdlICh0YXJnZXQsIGxhc3QsIG5iKSB7XG4gICAgdmFyIGRtZywgcG93ZXJcbiAgICBwb3dlciA9IChsYXN0LnBvd2VyIC0gbGFzdC5kYW1hZ2UpICogTWF0aC5taW4oMSwgbGFzdC50YXJnZXQuaGVhbHRoIC8gbGFzdC50YXJnZXQubWF4SGVhbHRoICogMikgLSAxXG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBwb3dlcilcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWFsRGFtYWdlICh0YXJnZXQsIG5iKSB7XG4gICAgdmFyIGRtZ1xuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgdGhpcy5wb3dlcilcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiB0aGlzLnBvd2VyLFxuICAgICAgICBkYW1hZ2U6IGRtZ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG1vZGlmeURhbWFnZSAodGFyZ2V0LCBwb3dlcikge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0Lm1vZGlmeURhbWFnZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGFyZ2V0Lm1vZGlmeURhbWFnZShwb3dlciwgdGhpcy50eXBlKSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IocG93ZXIgKiAwLjI1KVxuICAgIH1cbiAgfVxuXG4gIG1lcmdlRGFtYWdlIChkMSwgZDIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFyZ2V0OiBkMS50YXJnZXQsXG4gICAgICBwb3dlcjogTWF0aC5mbG9vcigoZDEucG93ZXIgKyBkMi5wb3dlcikgLyAyKSxcbiAgICAgIGRhbWFnZTogTWF0aC5mbG9vcigoZDEuZGFtYWdlICsgZDIuZGFtYWdlKSAvIDIpXG4gICAgfVxuICB9XG59XG5cbkRhbWFnZVByb3BhZ2F0aW9uLkV4cGxvc2l2ZSA9IChmdW5jdGlvbiAoKSB7XG4gIGNsYXNzIEV4cGxvc2l2ZSBleHRlbmRzIERhbWFnZVByb3BhZ2F0aW9uIHtcbiAgICBnZXREYW1hZ2VkICgpIHtcbiAgICAgIHZhciBhbmdsZSwgaW5zaWRlLCBzaGFyZFBvd2VyLCB0YXJnZXRcbiAgICAgIHRoaXMuX2RhbWFnZWQgPSBbXVxuICAgICAgY29uc3Qgc2hhcmRzID0gTWF0aC5wb3codGhpcy5yYW5nZSArIDEsIDIpXG4gICAgICBzaGFyZFBvd2VyID0gdGhpcy5wb3dlciAvIHNoYXJkc1xuICAgICAgaW5zaWRlID0gdGhpcy50aWxlLmhlYWx0aCA8PSB0aGlzLm1vZGlmeURhbWFnZSh0aGlzLnRpbGUsIHNoYXJkUG93ZXIpXG4gICAgICBpZiAoaW5zaWRlKSB7XG4gICAgICAgIHNoYXJkUG93ZXIgKj0gNFxuICAgICAgfVxuICAgICAgdGhpcy5fZGFtYWdlZCA9IEFycmF5KC4uLkFycmF5KHNoYXJkcyArIDEpKS5yZWR1Y2UoKGRhbWFnZWQpID0+IHtcbiAgICAgICAgYW5nbGUgPSB0aGlzLnJuZygpICogTWF0aC5QSSAqIDJcbiAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRUaWxlSGl0QnlTaGFyZChpbnNpZGUsIGFuZ2xlKVxuICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgICBkYW1hZ2VkLnB1c2goe1xuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBwb3dlcjogc2hhcmRQb3dlcixcbiAgICAgICAgICAgIGRhbWFnZTogdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBzaGFyZFBvd2VyKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhbWFnZWRcbiAgICAgIH0sIFtdKVxuICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZWRcbiAgICB9XG5cbiAgICBnZXRUaWxlSGl0QnlTaGFyZCAoaW5zaWRlLCBhbmdsZSkge1xuICAgICAgdmFyIGN0biwgZGlzdCwgdGFyZ2V0LCB2ZXJ0ZXhcbiAgICAgIGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpXG4gICAgICBkaXN0ID0gdGhpcy5yYW5nZSAqIHRoaXMucm5nKClcbiAgICAgIHRhcmdldCA9IHtcbiAgICAgICAgeDogdGhpcy50aWxlLnggKyAwLjUgKyBkaXN0ICogTWF0aC5jb3MoYW5nbGUpLFxuICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNSArIGRpc3QgKiBNYXRoLnNpbihhbmdsZSlcbiAgICAgIH1cbiAgICAgIGlmIChpbnNpZGUpIHtcbiAgICAgICAgdmVydGV4ID0gbmV3IExpbmVPZlNpZ2h0KGN0biwgdGhpcy50aWxlLnggKyAwLjUsIHRoaXMudGlsZS55ICsgMC41LCB0YXJnZXQueCwgdGFyZ2V0LnkpXG4gICAgICAgIHZlcnRleC50cmF2ZXJzYWJsZUNhbGxiYWNrID0gKHRpbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gIWluc2lkZSB8fCAoKHRpbGUgIT0gbnVsbCkgJiYgdGhpcy50cmF2ZXJzYWJsZUNhbGxiYWNrKHRpbGUpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2ZXJ0ZXguZ2V0RW5kUG9pbnQoKS50aWxlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3RuLmdldFRpbGUoTWF0aC5mbG9vcih0YXJnZXQueCksIE1hdGguZmxvb3IodGFyZ2V0LnkpKVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBFeHBsb3NpdmUucHJvcGVydGllcyh7XG4gICAgcm5nOiB7XG4gICAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICAgIH0sXG4gICAgdHJhdmVyc2FibGVDYWxsYmFjazoge1xuICAgICAgZGVmYXVsdDogZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgcmV0dXJuICEodHlwZW9mIHRpbGUuZ2V0U29saWQgPT09ICdmdW5jdGlvbicgJiYgdGlsZS5nZXRTb2xpZCgpKVxuICAgICAgfVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gRXhwbG9zaXZlXG59LmNhbGwodGhpcykpXG5cbm1vZHVsZS5leHBvcnRzID0gRGFtYWdlUHJvcGFnYXRpb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuXG5jbGFzcyBEYW1hZ2VhYmxlIGV4dGVuZHMgRWxlbWVudCB7XG4gIGRhbWFnZSAodmFsKSB7XG4gICAgdGhpcy5oZWFsdGggPSBNYXRoLm1heCgwLCB0aGlzLmhlYWx0aCAtIHZhbClcbiAgfVxuXG4gIHdoZW5Ob0hlYWx0aCAoKSB7fVxufTtcblxuRGFtYWdlYWJsZS5wcm9wZXJ0aWVzKHtcbiAgZGFtYWdlYWJsZToge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgbWF4SGVhbHRoOiB7XG4gICAgZGVmYXVsdDogMTAwMFxuICB9LFxuICBoZWFsdGg6IHtcbiAgICBkZWZhdWx0OiAxMDAwLFxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuaGVhbHRoIDw9IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2hlbk5vSGVhbHRoKClcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gRGFtYWdlYWJsZVxuIiwiY29uc3QgVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWRcblxuY29uc3QgZGlyZWN0aW9ucyA9IHtcbiAgaG9yaXpvbnRhbDogJ2hvcml6b250YWwnLFxuICB2ZXJ0aWNhbDogJ3ZlcnRpY2FsJ1xufVxuXG5jbGFzcyBEb29yIGV4dGVuZHMgVGlsZWQge1xuICB1cGRhdGVUaWxlTWVtYmVycyAob2xkKSB7XG4gICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmM1xuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgaWYgKChyZWYgPSBvbGQud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZi5yZW1vdmVQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSlcbiAgICAgIH1cbiAgICAgIGlmICgocmVmMSA9IG9sZC50cmFuc3BhcmVudE1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgcmVmMS5yZW1vdmVQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMudGlsZSkge1xuICAgICAgaWYgKChyZWYyID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICByZWYyLmFkZFByb3BlcnR5KHRoaXMub3BlblByb3BlcnR5KVxuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYzID0gdGhpcy50aWxlLnRyYW5zcGFyZW50TWVtYmVycykgIT0gbnVsbCA/IHJlZjMuYWRkUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpIDogbnVsbFxuICAgIH1cbiAgfVxufTtcblxuRG9vci5wcm9wZXJ0aWVzKHtcbiAgdGlsZToge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKHZhbCwgb2xkKSB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGVUaWxlTWVtYmVycyhvbGQpXG4gICAgfVxuICB9LFxuICBvcGVuOiB7XG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfSxcbiAgZGlyZWN0aW9uOiB7XG4gICAgZGVmYXVsdDogZGlyZWN0aW9ucy5ob3Jpem9udGFsXG4gIH1cbn0pXG5cbkRvb3IuZGlyZWN0aW9ucyA9IGRpcmVjdGlvbnNcblxubW9kdWxlLmV4cG9ydHMgPSBEb29yXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXJcbmNvbnN0IENvbmZyb250YXRpb24gPSByZXF1aXJlKCcuL0NvbmZyb250YXRpb24nKVxuXG5jbGFzcyBFbmNvdW50ZXJNYW5hZ2VyIGV4dGVuZHMgRWxlbWVudCB7XG4gIGluaXQgKCkge1xuICAgIHJldHVybiB0aGlzLmxvY2F0aW9uV2F0Y2hlci5iaW5kKClcbiAgfVxuXG4gIHRlc3RFbmNvdW50ZXIgKCkge1xuICAgIGlmICh0aGlzLnJuZygpIDw9IHRoaXMuYmFzZVByb2JhYmlsaXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFydEVuY291bnRlcigpXG4gICAgfVxuICB9XG5cbiAgc3RhcnRFbmNvdW50ZXIgKCkge1xuICAgIHZhciBlbmNvdW50ZXJcbiAgICBlbmNvdW50ZXIgPSBuZXcgQ29uZnJvbnRhdGlvbih7XG4gICAgICBzdWJqZWN0OiB0aGlzLnN1YmplY3QsXG4gICAgICBnYW1lOiB0aGlzLmdhbWVcbiAgICB9KVxuICAgIHJldHVybiBlbmNvdW50ZXIuc3RhcnQoKVxuICB9XG59O1xuXG5FbmNvdW50ZXJNYW5hZ2VyLnByb3BlcnRpZXMoe1xuICBzdWJqZWN0OiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBnYW1lOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBiYXNlUHJvYmFiaWxpdHk6IHtcbiAgICBkZWZhdWx0OiAwLjJcbiAgfSxcbiAgbG9jYXRpb25XYXRjaGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGVzdEVuY291bnRlcigpXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnR5OiB0aGlzLnN1YmplY3QucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ2xvY2F0aW9uJylcbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBybmc6IHtcbiAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVuY291bnRlck1hbmFnZXJcbiIsImNvbnN0IFRpbGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZVxuXG5jbGFzcyBGbG9vciBleHRlbmRzIFRpbGUge307XG5cbkZsb29yLnByb3BlcnRpZXMoe1xuICB3YWxrYWJsZToge1xuICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgdHJhbnNwYXJlbnQ6IHtcbiAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gRmxvb3JcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuY29uc3QgVmlldyA9IHJlcXVpcmUoJy4vVmlldycpXG5jb25zdCBQbGF5ZXIgPSByZXF1aXJlKCcuL1BsYXllcicpXG5jb25zdCBMb2FkZXJDb2xsZWN0aW9uID0gcmVxdWlyZSgnLi9zYXZlRW5naW5lcy9Mb2FkZXJDb2xsZWN0aW9uJylcblxuY2xhc3MgR2FtZSBleHRlbmRzIEVsZW1lbnQge1xuICBzdGFydCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFBsYXllclxuICB9XG5cbiAgYWRkIChlbGVtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbSkpIHtcbiAgICAgIHJldHVybiBlbGVtLm1hcCgoZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQoZSlcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsZW0uZ2FtZSA9IHRoaXNcbiAgICByZXR1cm4gZWxlbVxuICB9XG5cbiAgbG9hZCAoc2xvdCkge1xuICAgIGlmICghdGhpcy5zYXZlRW5naW5lKSB7XG4gICAgICB0aHJvdyAobmV3IEVycm9yKCdObyBTYXZlIGVuZ2luZSBlbmFibGVkJykpXG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnNhdmVFbmdpbmUubG9hZChzbG90KVxuICAgIGNvbnN0IGxvYWRlZCA9IHRoaXMubG9hZGVycy5sb2FkKGRhdGEpXG4gICAgdGhpcy5hZGQobG9hZGVkKVxuICB9XG5cbiAgc2F2ZSAoc2xvdCkge1xuICAgIGlmICghdGhpcy5zYXZlRW5naW5lKSB7XG4gICAgICB0aHJvdyAobmV3IEVycm9yKCdObyBTYXZlIGVuZ2luZSBlbmFibGVkJykpXG4gICAgfVxuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnNhdmFibGVzLm1hcCgoZWxlbSkgPT4ge1xuICAgICAgcmV0dXJuIGVsZW0uZ2V0U2F2ZURhdGEoKVxuICAgIH0pXG4gICAgdGhpcy5zYXZlRW5naW5lLnNhdmUoZGF0YSwgc2xvdClcbiAgfVxufTtcblxuR2FtZS5wcm9wZXJ0aWVzKHtcbiAgdGltaW5nOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRpbWluZygpXG4gICAgfVxuICB9LFxuICBtYWluVmlldzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMudmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3cy5nZXQoMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IFZpZXdDbGFzcyA9IHRoaXMuZGVmYXVsdFZpZXdDbGFzc1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IFZpZXdDbGFzcygpKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdmlld3M6IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlXG4gIH0sXG4gIGN1cnJlbnRQbGF5ZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJzLmdldCgwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgUGxheWVyQ2xhc3MgPSB0aGlzLmRlZmF1bHRQbGF5ZXJDbGFzc1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IFBsYXllckNsYXNzKCkpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbGF5ZXJzOiB7XG4gICAgY29sbGVjdGlvbjogdHJ1ZVxuICB9LFxuICBzYXZhYmxlczoge1xuICAgIGNvbGxlY3Rpb246IHRydWVcbiAgfSxcbiAgbG9hZGVyczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBMb2FkZXJDb2xsZWN0aW9uKClcbiAgICB9XG4gIH1cbn0pXG5cbkdhbWUucHJvdG90eXBlLmRlZmF1bHRWaWV3Q2xhc3MgPSBWaWV3XG5cbkdhbWUucHJvdG90eXBlLmRlZmF1bHRQbGF5ZXJDbGFzcyA9IFBsYXllclxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVcbiIsImNvbnN0IENvbGxlY3Rpb24gPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuQ29sbGVjdGlvblxuXG5jbGFzcyBJbnZlbnRvcnkgZXh0ZW5kcyBDb2xsZWN0aW9uIHtcbiAgZ2V0QnlUeXBlICh0eXBlKSB7XG4gICAgdmFyIHJlc1xuICAgIHJlcyA9IHRoaXMuZmlsdGVyKGZ1bmN0aW9uIChyKSB7XG4gICAgICByZXR1cm4gci50eXBlID09PSB0eXBlXG4gICAgfSlcbiAgICBpZiAocmVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHJlc1swXVxuICAgIH1cbiAgfVxuXG4gIGFkZEJ5VHlwZSAodHlwZSwgcXRlLCBwYXJ0aWFsID0gZmFsc2UpIHtcbiAgICB2YXIgcmVzc291cmNlXG4gICAgcmVzc291cmNlID0gdGhpcy5nZXRCeVR5cGUodHlwZSlcbiAgICBpZiAoIXJlc3NvdXJjZSkge1xuICAgICAgcmVzc291cmNlID0gdGhpcy5pbml0UmVzc291cmNlKHR5cGUpXG4gICAgfVxuICAgIGlmIChwYXJ0aWFsKSB7XG4gICAgICByZXNzb3VyY2UucGFydGlhbENoYW5nZShyZXNzb3VyY2UucXRlICsgcXRlKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNzb3VyY2UucXRlICs9IHF0ZVxuICAgIH1cbiAgfVxuXG4gIGluaXRSZXNzb3VyY2UgKHR5cGUsIG9wdCkge1xuICAgIHJldHVybiB0eXBlLmluaXRSZXNzb3VyY2Uob3B0KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gSW52ZW50b3J5XG4iLCJjbGFzcyBMaW5lT2ZTaWdodCB7XG4gIGNvbnN0cnVjdG9yICh0aWxlcywgeDEgPSAwLCB5MSA9IDAsIHgyID0gMCwgeTIgPSAwKSB7XG4gICAgdGhpcy50aWxlcyA9IHRpbGVzXG4gICAgdGhpcy54MSA9IHgxXG4gICAgdGhpcy55MSA9IHkxXG4gICAgdGhpcy54MiA9IHgyXG4gICAgdGhpcy55MiA9IHkyXG4gIH1cblxuICBzZXRYMSAodmFsKSB7XG4gICAgdGhpcy54MSA9IHZhbFxuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKVxuICB9XG5cbiAgc2V0WTEgKHZhbCkge1xuICAgIHRoaXMueTEgPSB2YWxcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYWRlKClcbiAgfVxuXG4gIHNldFgyICh2YWwpIHtcbiAgICB0aGlzLngyID0gdmFsXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGFkZSgpXG4gIH1cblxuICBzZXRZMiAodmFsKSB7XG4gICAgdGhpcy55MiA9IHZhbFxuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKVxuICB9XG5cbiAgaW52YWxpZGFkZSAoKSB7XG4gICAgdGhpcy5lbmRQb2ludCA9IG51bGxcbiAgICB0aGlzLnN1Y2Nlc3MgPSBudWxsXG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgfVxuXG4gIHRlc3RUaWxlICh0aWxlLCBlbnRyeVgsIGVudHJ5WSkge1xuICAgIGlmICh0aGlzLnRyYXZlcnNhYmxlQ2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMudHJhdmVyc2FibGVDYWxsYmFjayh0aWxlLCBlbnRyeVgsIGVudHJ5WSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuICh0aWxlICE9IG51bGwpICYmICh0eXBlb2YgdGlsZS5nZXRUcmFuc3BhcmVudCA9PT0gJ2Z1bmN0aW9uJyA/IHRpbGUuZ2V0VHJhbnNwYXJlbnQoKSA6IHRpbGUudHJhbnNwYXJlbnQgIT0gbnVsbCA/IHRpbGUudHJhbnNwYXJlbnQgOiB0cnVlKVxuICAgIH1cbiAgfVxuXG4gIHRlc3RUaWxlQXQgKHgsIHksIGVudHJ5WCwgZW50cnlZKSB7XG4gICAgcmV0dXJuIHRoaXMudGVzdFRpbGUodGhpcy50aWxlcy5nZXRUaWxlKE1hdGguZmxvb3IoeCksIE1hdGguZmxvb3IoeSkpLCBlbnRyeVgsIGVudHJ5WSlcbiAgfVxuXG4gIHJldmVyc2VUcmFjaW5nICgpIHtcbiAgICB2YXIgdG1wWCwgdG1wWVxuICAgIHRtcFggPSB0aGlzLngxXG4gICAgdG1wWSA9IHRoaXMueTFcbiAgICB0aGlzLngxID0gdGhpcy54MlxuICAgIHRoaXMueTEgPSB0aGlzLnkyXG4gICAgdGhpcy54MiA9IHRtcFhcbiAgICB0aGlzLnkyID0gdG1wWVxuICAgIHRoaXMucmV2ZXJzZWQgPSAhdGhpcy5yZXZlcnNlZFxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICB2YXIgbmV4dFgsIG5leHRZLCBwb3NpdGl2ZVgsIHBvc2l0aXZlWSwgcmF0aW8sIHRpbGVYLCB0aWxlWSwgdG90YWwsIHgsIHlcbiAgICByYXRpbyA9ICh0aGlzLngyIC0gdGhpcy54MSkgLyAodGhpcy55MiAtIHRoaXMueTEpXG4gICAgdG90YWwgPSBNYXRoLmFicyh0aGlzLngyIC0gdGhpcy54MSkgKyBNYXRoLmFicyh0aGlzLnkyIC0gdGhpcy55MSlcbiAgICBwb3NpdGl2ZVggPSAodGhpcy54MiAtIHRoaXMueDEpID49IDBcbiAgICBwb3NpdGl2ZVkgPSAodGhpcy55MiAtIHRoaXMueTEpID49IDBcbiAgICB0aWxlWCA9IHggPSB0aGlzLngxXG4gICAgdGlsZVkgPSB5ID0gdGhpcy55MVxuICAgIGlmICh0aGlzLnJldmVyc2VkKSB7XG4gICAgICB0aWxlWCA9IHBvc2l0aXZlWCA/IHggOiBNYXRoLmNlaWwoeCkgLSAxXG4gICAgICB0aWxlWSA9IHBvc2l0aXZlWSA/IHkgOiBNYXRoLmNlaWwoeSkgLSAxXG4gICAgfVxuICAgIHdoaWxlICh0b3RhbCA+IE1hdGguYWJzKHggLSB0aGlzLngxKSArIE1hdGguYWJzKHkgLSB0aGlzLnkxKSAmJiB0aGlzLnRlc3RUaWxlQXQodGlsZVgsIHRpbGVZLCB4LCB5KSkge1xuICAgICAgbmV4dFggPSBwb3NpdGl2ZVggPyBNYXRoLmZsb29yKHgpICsgMSA6IE1hdGguY2VpbCh4KSAtIDFcbiAgICAgIG5leHRZID0gcG9zaXRpdmVZID8gTWF0aC5mbG9vcih5KSArIDEgOiBNYXRoLmNlaWwoeSkgLSAxXG4gICAgICBpZiAodGhpcy54MiAtIHRoaXMueDEgPT09IDApIHtcbiAgICAgICAgeSA9IG5leHRZXG4gICAgICB9IGVsc2UgaWYgKHRoaXMueTIgLSB0aGlzLnkxID09PSAwKSB7XG4gICAgICAgIHggPSBuZXh0WFxuICAgICAgfSBlbHNlIGlmIChNYXRoLmFicygobmV4dFggLSB4KSAvICh0aGlzLngyIC0gdGhpcy54MSkpIDwgTWF0aC5hYnMoKG5leHRZIC0geSkgLyAodGhpcy55MiAtIHRoaXMueTEpKSkge1xuICAgICAgICB4ID0gbmV4dFhcbiAgICAgICAgeSA9IChuZXh0WCAtIHRoaXMueDEpIC8gcmF0aW8gKyB0aGlzLnkxXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB4ID0gKG5leHRZIC0gdGhpcy55MSkgKiByYXRpbyArIHRoaXMueDFcbiAgICAgICAgeSA9IG5leHRZXG4gICAgICB9XG4gICAgICB0aWxlWCA9IHBvc2l0aXZlWCA/IHggOiBNYXRoLmNlaWwoeCkgLSAxXG4gICAgICB0aWxlWSA9IHBvc2l0aXZlWSA/IHkgOiBNYXRoLmNlaWwoeSkgLSAxXG4gICAgfVxuICAgIGlmICh0b3RhbCA8PSBNYXRoLmFicyh4IC0gdGhpcy54MSkgKyBNYXRoLmFicyh5IC0gdGhpcy55MSkpIHtcbiAgICAgIHRoaXMuZW5kUG9pbnQgPSB7XG4gICAgICAgIHg6IHRoaXMueDIsXG4gICAgICAgIHk6IHRoaXMueTIsXG4gICAgICAgIHRpbGU6IHRoaXMudGlsZXMuZ2V0VGlsZShNYXRoLmZsb29yKHRoaXMueDIpLCBNYXRoLmZsb29yKHRoaXMueTIpKVxuICAgICAgfVxuICAgICAgdGhpcy5zdWNjZXNzID0gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVuZFBvaW50ID0ge1xuICAgICAgICB4OiB4LFxuICAgICAgICB5OiB5LFxuICAgICAgICB0aWxlOiB0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih0aWxlWCksIE1hdGguZmxvb3IodGlsZVkpKVxuICAgICAgfVxuICAgICAgdGhpcy5zdWNjZXNzID0gZmFsc2VcbiAgICB9XG4gIH1cblxuICBmb3JjZVN1Y2Nlc3MgKCkge1xuICAgIHRoaXMuZW5kUG9pbnQgPSB7XG4gICAgICB4OiB0aGlzLngyLFxuICAgICAgeTogdGhpcy55MixcbiAgICAgIHRpbGU6IHRoaXMudGlsZXMuZ2V0VGlsZShNYXRoLmZsb29yKHRoaXMueDIpLCBNYXRoLmZsb29yKHRoaXMueTIpKVxuICAgIH1cbiAgICB0aGlzLnN1Y2Nlc3MgPSB0cnVlXG4gICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBnZXRTdWNjZXNzICgpIHtcbiAgICBpZiAoIXRoaXMuY2FsY3VsYXRlZCkge1xuICAgICAgdGhpcy5jYWxjdWwoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdWNjZXNzXG4gIH1cblxuICBnZXRFbmRQb2ludCAoKSB7XG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZW5kUG9pbnRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IExpbmVPZlNpZ2h0XG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcblxuY2xhc3MgTWFwIGV4dGVuZHMgRWxlbWVudCB7XG4gIF9hZGRUb0JvbmRhcmllcyAobG9jYXRpb24sIGJvdW5kYXJpZXMpIHtcbiAgICBpZiAoKGJvdW5kYXJpZXMudG9wID09IG51bGwpIHx8IGxvY2F0aW9uLnkgPCBib3VuZGFyaWVzLnRvcCkge1xuICAgICAgYm91bmRhcmllcy50b3AgPSBsb2NhdGlvbi55XG4gICAgfVxuICAgIGlmICgoYm91bmRhcmllcy5sZWZ0ID09IG51bGwpIHx8IGxvY2F0aW9uLnggPCBib3VuZGFyaWVzLmxlZnQpIHtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCA9IGxvY2F0aW9uLnhcbiAgICB9XG4gICAgaWYgKChib3VuZGFyaWVzLmJvdHRvbSA9PSBudWxsKSB8fCBsb2NhdGlvbi55ID4gYm91bmRhcmllcy5ib3R0b20pIHtcbiAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0gbG9jYXRpb24ueVxuICAgIH1cbiAgICBpZiAoKGJvdW5kYXJpZXMucmlnaHQgPT0gbnVsbCkgfHwgbG9jYXRpb24ueCA+IGJvdW5kYXJpZXMucmlnaHQpIHtcbiAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSBsb2NhdGlvbi54XG4gICAgfVxuICB9XG59O1xuXG5NYXAucHJvcGVydGllcyh7XG4gIGxvY2F0aW9uczoge1xuICAgIGNvbGxlY3Rpb246IHtcbiAgICAgIGNsb3Nlc3Q6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBtaW4sIG1pbkRpc3RcbiAgICAgICAgbWluID0gbnVsbFxuICAgICAgICBtaW5EaXN0ID0gbnVsbFxuICAgICAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgICAgdmFyIGRpc3RcbiAgICAgICAgICBkaXN0ID0gbG9jYXRpb24uZGlzdCh4LCB5KVxuICAgICAgICAgIGlmICgobWluID09IG51bGwpIHx8IG1pbkRpc3QgPiBkaXN0KSB7XG4gICAgICAgICAgICBtaW4gPSBsb2NhdGlvblxuICAgICAgICAgICAgbWluRGlzdCA9IGRpc3RcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBtaW5cbiAgICAgIH0sXG4gICAgICBjbG9zZXN0czogZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIGRpc3RzXG4gICAgICAgIGRpc3RzID0gdGhpcy5tYXAoZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRpc3Q6IGxvY2F0aW9uLmRpc3QoeCwgeSksXG4gICAgICAgICAgICBsb2NhdGlvbjogbG9jYXRpb25cbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGRpc3RzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICByZXR1cm4gYS5kaXN0IC0gYi5kaXN0XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB0aGlzLmNvcHkoZGlzdHMubWFwKGZ1bmN0aW9uIChkaXN0KSB7XG4gICAgICAgICAgcmV0dXJuIGRpc3QubG9jYXRpb25cbiAgICAgICAgfSkpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBib3VuZGFyaWVzOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYm91bmRhcmllc1xuICAgICAgYm91bmRhcmllcyA9IHtcbiAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICBsZWZ0OiBudWxsLFxuICAgICAgICBib3R0b206IG51bGwsXG4gICAgICAgIHJpZ2h0OiBudWxsXG4gICAgICB9XG4gICAgICB0aGlzLmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWRkVG9Cb25kYXJpZXMobG9jYXRpb24sIGJvdW5kYXJpZXMpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGJvdW5kYXJpZXNcbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbClcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gTWFwXG4iLCJjb25zdCBUaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlZFxuXG5jbGFzcyBPYnN0YWNsZSBleHRlbmRzIFRpbGVkIHtcbiAgdXBkYXRlV2Fsa2FibGVzIChvbGQpIHtcbiAgICB2YXIgcmVmLCByZWYxXG4gICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICBpZiAoKHJlZiA9IG9sZC53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgcmVmLnJlbW92ZVJlZih7XG4gICAgICAgICAgbmFtZTogJ3dhbGthYmxlJyxcbiAgICAgICAgICBvYmo6IHRoaXNcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMudGlsZSkge1xuICAgICAgcmV0dXJuIChyZWYxID0gdGhpcy50aWxlLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCA/IHJlZjEuc2V0VmFsdWVSZWYoZmFsc2UsICd3YWxrYWJsZScsIHRoaXMpIDogbnVsbFxuICAgIH1cbiAgfVxufTtcblxuT2JzdGFjbGUucHJvcGVydGllcyh7XG4gIHRpbGU6IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICh2YWwsIG9sZCwgb3ZlcnJpZGVkKSB7XG4gICAgICBvdmVycmlkZWQob2xkKVxuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlV2Fsa2FibGVzKG9sZClcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gT2JzdGFjbGVcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY2xhc3MgUGF0aFdhbGsgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKHdhbGtlciwgcGF0aCwgb3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy53YWxrZXIgPSB3YWxrZXJcbiAgICB0aGlzLnBhdGggPSBwYXRoXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgaWYgKCF0aGlzLnBhdGguc29sdXRpb24pIHtcbiAgICAgIHRoaXMucGF0aC5jYWxjdWwoKVxuICAgIH1cbiAgICBpZiAodGhpcy5wYXRoLnNvbHV0aW9uKSB7XG4gICAgICB0aGlzLnBhdGhUaW1lb3V0ID0gdGhpcy50aW1pbmcuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmlzaCgpXG4gICAgICB9LCB0aGlzLnRvdGFsVGltZSlcbiAgICAgIHRoaXMud2Fsa2VyLnRpbGVNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgncG9zaXRpb24udGlsZScsIHRoaXMpXG4gICAgICB0aGlzLndhbGtlci5vZmZzZXRYTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ3Bvc2l0aW9uLm9mZnNldFgnLCB0aGlzKVxuICAgICAgcmV0dXJuIHRoaXMud2Fsa2VyLm9mZnNldFlNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgncG9zaXRpb24ub2Zmc2V0WScsIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgc3RvcCAoKSB7XG4gICAgcmV0dXJuIHRoaXMucGF0aFRpbWVvdXQucGF1c2UoKVxuICB9XG5cbiAgZmluaXNoICgpIHtcbiAgICB0aGlzLndhbGtlci50aWxlID0gdGhpcy5wb3NpdGlvbi50aWxlXG4gICAgdGhpcy53YWxrZXIub2Zmc2V0WCA9IHRoaXMucG9zaXRpb24ub2Zmc2V0WFxuICAgIHRoaXMud2Fsa2VyLm9mZnNldFkgPSB0aGlzLnBvc2l0aW9uLm9mZnNldFlcbiAgICB0aGlzLmVtaXQoJ2ZpbmlzaGVkJylcbiAgICByZXR1cm4gdGhpcy5lbmQoKVxuICB9XG5cbiAgaW50ZXJydXB0ICgpIHtcbiAgICB0aGlzLmVtaXQoJ2ludGVycnVwdGVkJylcbiAgICByZXR1cm4gdGhpcy5lbmQoKVxuICB9XG5cbiAgZW5kICgpIHtcbiAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgcmV0dXJuIHRoaXMuZGVzdHJveSgpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy53YWxrZXIud2FsayA9PT0gdGhpcykge1xuICAgICAgdGhpcy53YWxrZXIud2FsayA9IG51bGxcbiAgICB9XG4gICAgdGhpcy53YWxrZXIudGlsZU1lbWJlcnMucmVtb3ZlUmVmKHtcbiAgICAgIG5hbWU6ICdwb3NpdGlvbi50aWxlJyxcbiAgICAgIG9iajogdGhpc1xuICAgIH0pXG4gICAgdGhpcy53YWxrZXIub2Zmc2V0WE1lbWJlcnMucmVtb3ZlUmVmKHtcbiAgICAgIG5hbWU6ICdwb3NpdGlvbi5vZmZzZXRYJyxcbiAgICAgIG9iajogdGhpc1xuICAgIH0pXG4gICAgdGhpcy53YWxrZXIub2Zmc2V0WU1lbWJlcnMucmVtb3ZlUmVmKHtcbiAgICAgIG5hbWU6ICdwb3NpdGlvbi5vZmZzZXRZJyxcbiAgICAgIG9iajogdGhpc1xuICAgIH0pXG4gICAgdGhpcy5wYXRoVGltZW91dC5kZXN0cm95KClcbiAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmRlc3Ryb3koKVxuICAgIHJldHVybiB0aGlzLnJlbW92ZUFsbExpc3RlbmVycygpXG4gIH1cbn07XG5cblBhdGhXYWxrLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcblxuUGF0aFdhbGsucHJvcGVydGllcyh7XG4gIHNwZWVkOiB7XG4gICAgZGVmYXVsdDogNVxuICB9LFxuICB0aW1pbmc6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWZcbiAgICAgIGlmICgocmVmID0gdGhpcy53YWxrZXIuZ2FtZSkgIT0gbnVsbCA/IHJlZi50aW1pbmcgOiBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndhbGtlci5nYW1lLnRpbWluZ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcGF0aExlbmd0aDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aC5zb2x1dGlvbi5nZXRUb3RhbExlbmd0aCgpXG4gICAgfVxuICB9LFxuICB0b3RhbFRpbWU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGhMZW5ndGggLyB0aGlzLnNwZWVkICogMTAwMFxuICAgIH1cbiAgfSxcbiAgcG9zaXRpb246IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIHRoaXMucGF0aC5nZXRQb3NBdFByYyhpbnZhbGlkYXRvci5wcm9wUGF0aCgncGF0aFRpbWVvdXQucHJjJykgfHwgMClcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUGF0aFdhbGtcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0JylcbmNvbnN0IFRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJylcblxuY2xhc3MgUGVyc29uYWxXZWFwb24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgY2FuQmVVc2VkICgpIHtcbiAgICByZXR1cm4gdGhpcy5jaGFyZ2VkXG4gIH1cblxuICBjYW5Vc2VPbiAodGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRoaXMuY2FuVXNlRnJvbSh0aGlzLnVzZXIudGlsZSwgdGFyZ2V0KVxuICB9XG5cbiAgY2FuVXNlRnJvbSAodGlsZSwgdGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMucmFuZ2UgPT09IDEpIHtcbiAgICAgIHJldHVybiB0aGlzLmluTWVsZWVSYW5nZSh0aWxlLCB0YXJnZXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmluUmFuZ2UodGlsZSwgdGFyZ2V0KSAmJiB0aGlzLmhhc0xpbmVPZlNpZ2h0KHRpbGUsIHRhcmdldClcbiAgICB9XG4gIH1cblxuICBpblJhbmdlICh0aWxlLCB0YXJnZXQpIHtcbiAgICB2YXIgcmVmLCB0YXJnZXRUaWxlXG4gICAgdGFyZ2V0VGlsZSA9IHRhcmdldC50aWxlIHx8IHRhcmdldFxuICAgIHJldHVybiAoKHJlZiA9IHRpbGUuZGlzdCh0YXJnZXRUaWxlKSkgIT0gbnVsbCA/IHJlZi5sZW5ndGggOiBudWxsKSA8PSB0aGlzLnJhbmdlXG4gIH1cblxuICBpbk1lbGVlUmFuZ2UgKHRpbGUsIHRhcmdldCkge1xuICAgIHZhciB0YXJnZXRUaWxlXG4gICAgdGFyZ2V0VGlsZSA9IHRhcmdldC50aWxlIHx8IHRhcmdldFxuICAgIHJldHVybiBNYXRoLmFicyh0YXJnZXRUaWxlLnggLSB0aWxlLngpICsgTWF0aC5hYnModGFyZ2V0VGlsZS55IC0gdGlsZS55KSA9PT0gMVxuICB9XG5cbiAgaGFzTGluZU9mU2lnaHQgKHRpbGUsIHRhcmdldCkge1xuICAgIHZhciBsb3MsIHRhcmdldFRpbGVcbiAgICB0YXJnZXRUaWxlID0gdGFyZ2V0LnRpbGUgfHwgdGFyZ2V0XG4gICAgbG9zID0gbmV3IExpbmVPZlNpZ2h0KHRhcmdldFRpbGUuY29udGFpbmVyLCB0aWxlLnggKyAwLjUsIHRpbGUueSArIDAuNSwgdGFyZ2V0VGlsZS54ICsgMC41LCB0YXJnZXRUaWxlLnkgKyAwLjUpXG4gICAgbG9zLnRyYXZlcnNhYmxlQ2FsbGJhY2sgPSBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgcmV0dXJuIHRpbGUud2Fsa2FibGVcbiAgICB9XG4gICAgcmV0dXJuIGxvcy5nZXRTdWNjZXNzKClcbiAgfVxuXG4gIHVzZU9uICh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy5jYW5CZVVzZWQoKSkge1xuICAgICAgdGFyZ2V0LmRhbWFnZSh0aGlzLnBvd2VyKVxuICAgICAgdGhpcy5jaGFyZ2VkID0gZmFsc2VcbiAgICAgIHJldHVybiB0aGlzLnJlY2hhcmdlKClcbiAgICB9XG4gIH1cblxuICByZWNoYXJnZSAoKSB7XG4gICAgdGhpcy5jaGFyZ2luZyA9IHRydWVcbiAgICB0aGlzLmNoYXJnZVRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hhcmdpbmcgPSBmYWxzZVxuICAgICAgcmV0dXJuIHRoaXMucmVjaGFyZ2VkKClcbiAgICB9LCB0aGlzLnJlY2hhcmdlVGltZSlcbiAgfVxuXG4gIHJlY2hhcmdlZCAoKSB7XG4gICAgdGhpcy5jaGFyZ2VkID0gdHJ1ZVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMuY2hhcmdlVGltZW91dCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hhcmdlVGltZW91dC5kZXN0cm95KClcbiAgICB9XG4gIH1cbn07XG5cblBlcnNvbmFsV2VhcG9uLnByb3BlcnRpZXMoe1xuICByZWNoYXJnZVRpbWU6IHtcbiAgICBkZWZhdWx0OiAxMDAwXG4gIH0sXG4gIGNoYXJnZWQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIGNoYXJnaW5nOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBwb3dlcjoge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIGRwczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLnBvd2VyUHJvcGVydHkpIC8gaW52YWxpZGF0b3IucHJvcCh0aGlzLnJlY2hhcmdlVGltZVByb3BlcnR5KSAqIDEwMDBcbiAgICB9XG4gIH0sXG4gIHJhbmdlOiB7XG4gICAgZGVmYXVsdDogMTBcbiAgfSxcbiAgdXNlcjoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgdGltaW5nOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRpbWluZygpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBlcnNvbmFsV2VhcG9uXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgRWxlbWVudCB7XG4gIHNldERlZmF1bHRzICgpIHtcbiAgICB2YXIgZmlyc3RcbiAgICBmaXJzdCA9IHRoaXMuZ2FtZS5wbGF5ZXJzLmxlbmd0aCA9PT0gMFxuICAgIHRoaXMuZ2FtZS5wbGF5ZXJzLmFkZCh0aGlzKVxuICAgIGlmIChmaXJzdCAmJiAhdGhpcy5jb250cm9sbGVyICYmIHRoaXMuZ2FtZS5kZWZhdWx0UGxheWVyQ29udHJvbGxlckNsYXNzKSB7XG4gICAgICBjb25zdCBQbGF5ZXJDb250cm9sbGVyQ2xhc3MgPSB0aGlzLmdhbWUuZGVmYXVsdFBsYXllckNvbnRyb2xsZXJDbGFzc1xuICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3IFBsYXllckNvbnRyb2xsZXJDbGFzcygpXG4gICAgfVxuICB9XG5cbiAgY2FuVGFyZ2V0QWN0aW9uT24gKGVsZW0pIHtcbiAgICB2YXIgYWN0aW9uLCByZWZcbiAgICBhY3Rpb24gPSB0aGlzLnNlbGVjdGVkQWN0aW9uIHx8ICgocmVmID0gdGhpcy5zZWxlY3RlZCkgIT0gbnVsbCA/IHJlZi5kZWZhdWx0QWN0aW9uIDogbnVsbClcbiAgICByZXR1cm4gKGFjdGlvbiAhPSBudWxsKSAmJiB0eXBlb2YgYWN0aW9uLmNhblRhcmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiBhY3Rpb24uY2FuVGFyZ2V0KGVsZW0pXG4gIH1cblxuICBndWVzc0FjdGlvblRhcmdldCAoYWN0aW9uKSB7XG4gICAgdmFyIHNlbGVjdGVkXG4gICAgc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24uY2FuVGFyZ2V0ID09PSAnZnVuY3Rpb24nICYmIChhY3Rpb24udGFyZ2V0ID09IG51bGwpICYmIGFjdGlvbi5hY3RvciAhPT0gc2VsZWN0ZWQgJiYgYWN0aW9uLmNhblRhcmdldChzZWxlY3RlZCkpIHtcbiAgICAgIHJldHVybiBhY3Rpb24ud2l0aFRhcmdldChzZWxlY3RlZClcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFjdGlvblxuICAgIH1cbiAgfVxuXG4gIGNhblNlbGVjdCAoZWxlbSkge1xuICAgIHJldHVybiB0eXBlb2YgZWxlbS5pc1NlbGVjdGFibGVCeSA9PT0gJ2Z1bmN0aW9uJyAmJiBlbGVtLmlzU2VsZWN0YWJsZUJ5KHRoaXMpXG4gIH1cblxuICBjYW5Gb2N1c09uIChlbGVtKSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtLklzRm9jdXNhYmxlQnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBlbGVtLklzRm9jdXNhYmxlQnkodGhpcylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtLklzU2VsZWN0YWJsZUJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZWxlbS5Jc1NlbGVjdGFibGVCeSh0aGlzKVxuICAgIH1cbiAgfVxuXG4gIHNlbGVjdEFjdGlvbiAoYWN0aW9uKSB7XG4gICAgaWYgKGFjdGlvbi5pc1JlYWR5KCkpIHtcbiAgICAgIGFjdGlvbi5zdGFydCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb25cbiAgICB9XG4gIH1cblxuICBzZXRBY3Rpb25UYXJnZXQgKGVsZW0pIHtcbiAgICB2YXIgYWN0aW9uXG4gICAgYWN0aW9uID0gdGhpcy5zZWxlY3RlZEFjdGlvbiB8fCAodGhpcy5zZWxlY3RlZCAhPSBudWxsID8gdGhpcy5zZWxlY3RlZC5kZWZhdWx0QWN0aW9uIDogbnVsbClcbiAgICBhY3Rpb24gPSBhY3Rpb24ud2l0aFRhcmdldChlbGVtKVxuICAgIGlmIChhY3Rpb24uaXNSZWFkeSgpKSB7XG4gICAgICBhY3Rpb24uc3RhcnQoKVxuICAgICAgdGhpcy5zZWxlY3RlZEFjdGlvbiA9IG51bGxcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZWxlY3RlZEFjdGlvbiA9IGFjdGlvblxuICAgIH1cbiAgfVxufTtcblxuUGxheWVyLnByb3BlcnRpZXMoe1xuICBuYW1lOiB7XG4gICAgZGVmYXVsdDogJ1BsYXllcidcbiAgfSxcbiAgZm9jdXNlZDoge30sXG4gIHNlbGVjdGVkOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmIChvbGQgIT0gbnVsbCAmJiBvbGQucHJvcGVydGllc01hbmFnZXIgIT0gbnVsbCAmJiBvbGQucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgb2xkLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiB2YWwucHJvcGVydGllc01hbmFnZXIgIT0gbnVsbCAmJiB2YWwucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgdmFsLnNlbGVjdGVkID0gdGhpc1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZ2xvYmFsQWN0aW9uUHJvdmlkZXJzOiB7XG4gICAgY29sbGVjdGlvbjogdHJ1ZVxuICB9LFxuICBhY3Rpb25Qcm92aWRlcnM6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgdmFyIHJlcywgc2VsZWN0ZWRcbiAgICAgIHJlcyA9IGludmFsaWRhdG9yLnByb3AodGhpcy5nbG9iYWxBY3Rpb25Qcm92aWRlcnNQcm9wZXJ0eSkudG9BcnJheSgpXG4gICAgICBzZWxlY3RlZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5zZWxlY3RlZFByb3BlcnR5KVxuICAgICAgaWYgKHNlbGVjdGVkICYmIHNlbGVjdGVkLmFjdGlvblByb3ZpZGVyKSB7XG4gICAgICAgIHJlcy5wdXNoKHNlbGVjdGVkLmFjdGlvblByb3ZpZGVyKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfSxcbiAgYXZhaWxhYmxlQWN0aW9uczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLmFjdGlvblByb3ZpZGVyc1Byb3BlcnR5KS5yZWR1Y2UoKHJlcywgcHJvdmlkZXIpID0+IHtcbiAgICAgICAgdmFyIGFjdGlvbnMsIHNlbGVjdGVkXG4gICAgICAgIGFjdGlvbnMgPSBpbnZhbGlkYXRvci5wcm9wKHByb3ZpZGVyLmFjdGlvbnNQcm9wZXJ0eSkudG9BcnJheSgpXG4gICAgICAgIHNlbGVjdGVkID0gaW52YWxpZGF0b3IucHJvcCh0aGlzLnNlbGVjdGVkUHJvcGVydHkpXG4gICAgICAgIGlmIChzZWxlY3RlZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWN0aW9ucyA9IGFjdGlvbnMubWFwKChhY3Rpb24pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmd1ZXNzQWN0aW9uVGFyZ2V0KGFjdGlvbilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5jb25jYXQoYWN0aW9ucylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVzXG4gICAgICAgIH1cbiAgICAgIH0sIFtdKVxuICAgIH1cbiAgfSxcbiAgc2VsZWN0ZWRBY3Rpb246IHt9LFxuICBjb250cm9sbGVyOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh0aGlzLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyLnBsYXllciA9IHRoaXNcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGdhbWU6IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICh2YWwsIG9sZCkge1xuICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBUaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpXG5cbmNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHt9XG5cbiAgbGF1bmNoICgpIHtcbiAgICB0aGlzLm1vdmluZyA9IHRydWVcbiAgICB0aGlzLnBhdGhUaW1lb3V0ID0gdGhpcy50aW1pbmcuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmRlbGl2ZXJQYXlsb2FkKClcbiAgICAgIHRoaXMubW92aW5nID0gZmFsc2VcbiAgICB9LCB0aGlzLnBhdGhMZW5ndGggLyB0aGlzLnNwZWVkICogMTAwMClcbiAgfVxuXG4gIGRlbGl2ZXJQYXlsb2FkICgpIHtcbiAgICBjb25zdCBQcm9wYWdhdGlvblR5cGUgPSB0aGlzLnByb3BhZ2F0aW9uVHlwZVxuICAgIGNvbnN0IHBheWxvYWQgPSBuZXcgUHJvcGFnYXRpb25UeXBlKHtcbiAgICAgIHRpbGU6IHRoaXMudGFyZ2V0LnRpbGUgfHwgdGhpcy50YXJnZXQsXG4gICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgIHJhbmdlOiB0aGlzLmJsYXN0UmFuZ2VcbiAgICB9KVxuICAgIHBheWxvYWQuYXBwbHkoKVxuICAgIHRoaXMucGF5bG9hZERlbGl2ZXJlZCgpXG4gICAgcmV0dXJuIHBheWxvYWRcbiAgfVxuXG4gIHBheWxvYWREZWxpdmVyZWQgKCkge1xuICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllc01hbmFnZXIuZGVzdHJveSgpXG4gIH1cbn07XG5cblByb2plY3RpbGUucHJvcGVydGllcyh7XG4gIG9yaWdpbjoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgdGFyZ2V0OiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBwb3dlcjoge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIGJsYXN0UmFuZ2U6IHtcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG4gIHByb3BhZ2F0aW9uVHlwZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgc3BlZWQ6IHtcbiAgICBkZWZhdWx0OiAxMFxuICB9LFxuICBwYXRoTGVuZ3RoOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgZGlzdFxuICAgICAgaWYgKCh0aGlzLm9yaWdpblRpbGUgIT0gbnVsbCkgJiYgKHRoaXMudGFyZ2V0VGlsZSAhPSBudWxsKSkge1xuICAgICAgICBkaXN0ID0gdGhpcy5vcmlnaW5UaWxlLmRpc3QodGhpcy50YXJnZXRUaWxlKVxuICAgICAgICBpZiAoZGlzdCkge1xuICAgICAgICAgIHJldHVybiBkaXN0Lmxlbmd0aFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gMTAwXG4gICAgfVxuICB9LFxuICBvcmlnaW5UaWxlOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciBvcmlnaW5cbiAgICAgIG9yaWdpbiA9IGludmFsaWRhdG9yLnByb3AodGhpcy5vcmlnaW5Qcm9wZXJ0eSlcbiAgICAgIGlmIChvcmlnaW4gIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb3JpZ2luLnRpbGUgfHwgb3JpZ2luXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0YXJnZXRUaWxlOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciB0YXJnZXRcbiAgICAgIHRhcmdldCA9IGludmFsaWRhdG9yLnByb3AodGhpcy50YXJnZXRQcm9wZXJ0eSlcbiAgICAgIGlmICh0YXJnZXQgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0LnRpbGUgfHwgdGFyZ2V0XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBjb250YWluZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRlKSB7XG4gICAgICB2YXIgb3JpZ2luVGlsZSwgdGFyZ2V0VGlsZVxuICAgICAgb3JpZ2luVGlsZSA9IGludmFsaWRhdGUucHJvcCh0aGlzLm9yaWdpblRpbGVQcm9wZXJ0eSlcbiAgICAgIHRhcmdldFRpbGUgPSBpbnZhbGlkYXRlLnByb3AodGhpcy50YXJnZXRUaWxlUHJvcGVydHkpXG4gICAgICBpZiAob3JpZ2luVGlsZS5jb250YWluZXIgPT09IHRhcmdldFRpbGUuY29udGFpbmVyKSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5UaWxlLmNvbnRhaW5lclxuICAgICAgfSBlbHNlIGlmIChpbnZhbGlkYXRlLnByb3AodGhpcy5wcmNQYXRoUHJvcGVydHkpID4gMC41KSB7XG4gICAgICAgIHJldHVybiB0YXJnZXRUaWxlLmNvbnRhaW5lclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpblRpbGUuY29udGFpbmVyXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB4OiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgdmFyIHN0YXJ0UG9zXG4gICAgICBzdGFydFBvcyA9IGludmFsaWRhdGUucHJvcCh0aGlzLnN0YXJ0UG9zUHJvcGVydHkpXG4gICAgICByZXR1cm4gKGludmFsaWRhdGUucHJvcCh0aGlzLnRhcmdldFBvc1Byb3BlcnR5KS54IC0gc3RhcnRQb3MueCkgKiBpbnZhbGlkYXRlLnByb3AodGhpcy5wcmNQYXRoUHJvcGVydHkpICsgc3RhcnRQb3MueFxuICAgIH1cbiAgfSxcbiAgeToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBzdGFydFBvc1xuICAgICAgc3RhcnRQb3MgPSBpbnZhbGlkYXRlLnByb3AodGhpcy5zdGFydFBvc1Byb3BlcnR5KVxuICAgICAgcmV0dXJuIChpbnZhbGlkYXRlLnByb3AodGhpcy50YXJnZXRQb3NQcm9wZXJ0eSkueSAtIHN0YXJ0UG9zLnkpICogaW52YWxpZGF0ZS5wcm9wKHRoaXMucHJjUGF0aFByb3BlcnR5KSArIHN0YXJ0UG9zLnlcbiAgICB9XG4gIH0sXG4gIHN0YXJ0UG9zOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgdmFyIGNvbnRhaW5lciwgZGlzdCwgb2Zmc2V0LCBvcmlnaW5UaWxlXG4gICAgICBvcmlnaW5UaWxlID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMub3JpZ2luVGlsZVByb3BlcnR5KVxuICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMuY29udGFpbmVyUHJvcGVydHkpXG4gICAgICBvZmZzZXQgPSB0aGlzLnN0YXJ0T2Zmc2V0XG4gICAgICBpZiAob3JpZ2luVGlsZS5jb250YWluZXIgIT09IGNvbnRhaW5lcikge1xuICAgICAgICBkaXN0ID0gY29udGFpbmVyLmRpc3Qob3JpZ2luVGlsZS5jb250YWluZXIpXG4gICAgICAgIG9mZnNldC54ICs9IGRpc3QueFxuICAgICAgICBvZmZzZXQueSArPSBkaXN0LnlcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IG9yaWdpblRpbGUueCArIG9mZnNldC54LFxuICAgICAgICB5OiBvcmlnaW5UaWxlLnkgKyBvZmZzZXQueVxuICAgICAgfVxuICAgIH0sXG4gICAgb3V0cHV0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKVxuICAgIH1cbiAgfSxcbiAgdGFyZ2V0UG9zOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgdmFyIGNvbnRhaW5lciwgZGlzdCwgb2Zmc2V0LCB0YXJnZXRUaWxlXG4gICAgICB0YXJnZXRUaWxlID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMudGFyZ2V0VGlsZVByb3BlcnR5KVxuICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMuY29udGFpbmVyUHJvcGVydHkpXG4gICAgICBvZmZzZXQgPSB0aGlzLnRhcmdldE9mZnNldFxuICAgICAgaWYgKHRhcmdldFRpbGUuY29udGFpbmVyICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgZGlzdCA9IGNvbnRhaW5lci5kaXN0KHRhcmdldFRpbGUuY29udGFpbmVyKVxuICAgICAgICBvZmZzZXQueCArPSBkaXN0LnhcbiAgICAgICAgb2Zmc2V0LnkgKz0gZGlzdC55XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiB0YXJnZXRUaWxlLnggKyBvZmZzZXQueCxcbiAgICAgICAgeTogdGFyZ2V0VGlsZS55ICsgb2Zmc2V0LnlcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbClcbiAgICB9XG4gIH0sXG4gIHN0YXJ0T2Zmc2V0OiB7XG4gICAgZGVmYXVsdDoge1xuICAgICAgeDogMC41LFxuICAgICAgeTogMC41XG4gICAgfSxcbiAgICBvdXRwdXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpXG4gICAgfVxuICB9LFxuICB0YXJnZXRPZmZzZXQ6IHtcbiAgICBkZWZhdWx0OiB7XG4gICAgICB4OiAwLjUsXG4gICAgICB5OiAwLjVcbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbClcbiAgICB9XG4gIH0sXG4gIHByY1BhdGg6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWZcbiAgICAgIHJldHVybiAoKHJlZiA9IHRoaXMucGF0aFRpbWVvdXQpICE9IG51bGwgPyByZWYucHJjIDogbnVsbCkgfHwgMFxuICAgIH1cbiAgfSxcbiAgdGltaW5nOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRpbWluZygpXG4gICAgfVxuICB9LFxuICBtb3Zpbmc6IHtcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGVcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuXG5jbGFzcyBSZXNzb3VyY2UgZXh0ZW5kcyBFbGVtZW50IHtcbiAgcGFydGlhbENoYW5nZSAocXRlKSB7XG4gICAgdmFyIGFjY2VwdGFibGVcbiAgICBhY2NlcHRhYmxlID0gTWF0aC5tYXgodGhpcy5taW5RdGUsIE1hdGgubWluKHRoaXMubWF4UXRlLCBxdGUpKVxuICAgIHRoaXMucXRlID0gYWNjZXB0YWJsZVxuICAgIHJldHVybiBxdGUgLSBhY2NlcHRhYmxlXG4gIH1cbn07XG5cblJlc3NvdXJjZS5wcm9wZXJ0aWVzKHtcbiAgdHlwZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgcXRlOiB7XG4gICAgZGVmYXVsdDogMCxcbiAgICBpbmdlc3Q6IGZ1bmN0aW9uIChxdGUpIHtcbiAgICAgIGlmICh0aGlzLm1heFF0ZSAhPT0gbnVsbCAmJiBxdGUgPiB0aGlzLm1heFF0ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbnQgaGF2ZSBtb3JlIHRoYW4gJyArIHRoaXMubWF4UXRlICsgJyBvZiAnICsgdGhpcy50eXBlLm5hbWUpXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5taW5RdGUgIT09IG51bGwgJiYgcXRlIDwgdGhpcy5taW5RdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGhhdmUgbGVzcyB0aGFuICcgKyB0aGlzLm1pblF0ZSArICcgb2YgJyArIHRoaXMudHlwZS5uYW1lKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHF0ZVxuICAgIH1cbiAgfSxcbiAgbWF4UXRlOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBtaW5RdGU6IHtcbiAgICBkZWZhdWx0OiAwXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzc291cmNlXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFJlc3NvdXJjZSA9IHJlcXVpcmUoJy4vUmVzc291cmNlJylcblxuY2xhc3MgUmVzc291cmNlVHlwZSBleHRlbmRzIEVsZW1lbnQge1xuICBpbml0UmVzc291cmNlIChvcHQpIHtcbiAgICBpZiAodHlwZW9mIG9wdCAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdCA9IHtcbiAgICAgICAgcXRlOiBvcHRcbiAgICAgIH1cbiAgICB9XG4gICAgb3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0T3B0aW9ucywgb3B0KVxuICAgIGNvbnN0IFJlc3NvdXJjZUNsYXNzID0gdGhpcy5yZXNzb3VyY2VDbGFzc1xuICAgIHJldHVybiBuZXcgUmVzc291cmNlQ2xhc3Mob3B0KVxuICB9XG59O1xuXG5SZXNzb3VyY2VUeXBlLnByb3BlcnRpZXMoe1xuICBuYW1lOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICByZXNzb3VyY2VDbGFzczoge1xuICAgIGRlZmF1bHQ6IFJlc3NvdXJjZVxuICB9LFxuICBkZWZhdWx0T3B0aW9uczoge1xuICAgIGRlZmF1bHQ6IHt9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzc291cmNlVHlwZVxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBUcmF2ZWwgPSByZXF1aXJlKCcuL1RyYXZlbCcpXG5jb25zdCBUcmF2ZWxBY3Rpb24gPSByZXF1aXJlKCcuL2FjdGlvbnMvVHJhdmVsQWN0aW9uJylcbmNvbnN0IEFjdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyJylcbmNvbnN0IFNoaXBJbnRlcmlvciA9IHJlcXVpcmUoJy4vU2hpcEludGVyaW9yJylcblxuY2xhc3MgU2hpcCBleHRlbmRzIEVsZW1lbnQge1xuICB0cmF2ZWxUbyAobG9jYXRpb24pIHtcbiAgICB2YXIgdHJhdmVsXG4gICAgdHJhdmVsID0gbmV3IFRyYXZlbCh7XG4gICAgICB0cmF2ZWxsZXI6IHRoaXMsXG4gICAgICBzdGFydExvY2F0aW9uOiB0aGlzLmxvY2F0aW9uLFxuICAgICAgdGFyZ2V0TG9jYXRpb246IGxvY2F0aW9uXG4gICAgfSlcbiAgICBpZiAodHJhdmVsLnZhbGlkKSB7XG4gICAgICB0cmF2ZWwuc3RhcnQoKVxuICAgICAgdGhpcy50cmF2ZWwgPSB0cmF2ZWxcbiAgICB9XG4gIH1cbn07XG5cblNoaXAucHJvcGVydGllcyh7XG4gIGxvY2F0aW9uOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICB0cmF2ZWw6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGludGVycmlvcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBTaGlwSW50ZXJpb3IoeyBzaGlwOiB0aGlzIH0pXG4gICAgfVxuICB9LFxuICBhY3Rpb25Qcm92aWRlcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgcHJvdmlkZXIgPSBuZXcgQWN0aW9uUHJvdmlkZXIoe1xuICAgICAgICBvd25lcjogdGhpc1xuICAgICAgfSlcbiAgICAgIHByb3ZpZGVyLmFjdGlvbnNNZW1iZXJzLmFkZChuZXcgVHJhdmVsQWN0aW9uKHtcbiAgICAgICAgYWN0b3I6IHRoaXNcbiAgICAgIH0pKVxuICAgICAgcmV0dXJuIHByb3ZpZGVyXG4gICAgfVxuICB9LFxuICBzcGFjZUNvb2RpbmF0ZToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICBpZiAoaW52YWxpZGF0b3IucHJvcCh0aGlzLnRyYXZlbFByb3BlcnR5KSkge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3RyYXZlbC5zcGFjZUNvb2RpbmF0ZScpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHg6IGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi54JyksXG4gICAgICAgICAgeTogaW52YWxpZGF0b3IucHJvcFBhdGgoJ2xvY2F0aW9uLnknKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXBcbiIsImNvbnN0IFRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lclxuY29uc3QgU2hpcEludGVyaW9yR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9nZW5lcmF0b3JzL1NoaXBJbnRlcmlvckdlbmVyYXRvcicpXG5cbmNsYXNzIFNoaXBJbnRlcmlvciBleHRlbmRzIFRpbGVDb250YWluZXIge1xuICBzZXREZWZhdWx0cyAoKSB7XG4gICAgaWYgKCEodGhpcy50aWxlcy5sZW5ndGggPiAwKSkge1xuICAgICAgdGhpcy5nZW5lcmF0ZSgpXG4gICAgfVxuICAgIGlmICh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgdGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID0gdGhpc1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlIChnZW5lcmF0b3IpIHtcbiAgICBnZW5lcmF0b3IgPSBnZW5lcmF0b3IgfHwgbmV3IFNoaXBJbnRlcmlvckdlbmVyYXRvcigpXG4gICAgZ2VuZXJhdG9yLnNoaXBJbnRlcmlvciA9IHRoaXNcbiAgICBnZW5lcmF0b3IuZ2VuZXJhdGUoKVxuICB9XG59XG5cblNoaXBJbnRlcmlvci5wcm9wZXJ0aWVzKHtcbiAgeDoge1xuICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgeToge1xuICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgY29udGFpbmVyOiB7fSxcbiAgc2hpcDoge30sXG4gIGdhbWU6IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICh2YWwsIG9sZCkge1xuICAgICAgaWYgKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBhaXJsb2Nrczoge1xuICAgIGNvbGxlY3Rpb246IHRydWUsXG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5hbGxUaWxlcygpLmZpbHRlcigodCkgPT4gdHlwZW9mIHQuYXR0YWNoVG8gPT09ICdmdW5jdGlvbicpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXBJbnRlcmlvclxuIiwiY29uc3QgVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWRcbmNvbnN0IFRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJylcbmNvbnN0IERhbWFnZWFibGUgPSByZXF1aXJlKCcuL0RhbWFnZWFibGUnKVxuY29uc3QgUHJvamVjdGlsZSA9IHJlcXVpcmUoJy4vUHJvamVjdGlsZScpXG5cbmNsYXNzIFNoaXBXZWFwb24gZXh0ZW5kcyBUaWxlZCB7XG4gIGZpcmUgKCkge1xuICAgIHZhciBwcm9qZWN0aWxlXG4gICAgaWYgKHRoaXMuY2FuRmlyZSkge1xuICAgICAgY29uc3QgUHJvamVjdGlsZUNsYXNzID0gdGhpcy5wcm9qZWN0aWxlQ2xhc3NcbiAgICAgIHByb2plY3RpbGUgPSBuZXcgUHJvamVjdGlsZUNsYXNzKHtcbiAgICAgICAgb3JpZ2luOiB0aGlzLFxuICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgYmxhc3RSYW5nZTogdGhpcy5ibGFzdFJhbmdlLFxuICAgICAgICBwcm9wYWdhdGlvblR5cGU6IHRoaXMucHJvcGFnYXRpb25UeXBlLFxuICAgICAgICBzcGVlZDogdGhpcy5wcm9qZWN0aWxlU3BlZWQsXG4gICAgICAgIHRpbWluZzogdGhpcy50aW1pbmdcbiAgICAgIH0pXG4gICAgICBwcm9qZWN0aWxlLmxhdW5jaCgpXG4gICAgICB0aGlzLmNoYXJnZWQgPSBmYWxzZVxuICAgICAgdGhpcy5yZWNoYXJnZSgpXG4gICAgICByZXR1cm4gcHJvamVjdGlsZVxuICAgIH1cbiAgfVxuXG4gIHJlY2hhcmdlICgpIHtcbiAgICB0aGlzLmNoYXJnaW5nID0gdHJ1ZVxuICAgIHRoaXMuY2hhcmdlVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFyZ2luZyA9IGZhbHNlXG4gICAgICByZXR1cm4gdGhpcy5yZWNoYXJnZWQoKVxuICAgIH0sIHRoaXMucmVjaGFyZ2VUaW1lKVxuICB9XG5cbiAgcmVjaGFyZ2VkICgpIHtcbiAgICB0aGlzLmNoYXJnZWQgPSB0cnVlXG4gICAgaWYgKHRoaXMuYXV0b0ZpcmUpIHtcbiAgICAgIHJldHVybiB0aGlzLmZpcmUoKVxuICAgIH1cbiAgfVxufTtcblxuU2hpcFdlYXBvbi5leHRlbmQoRGFtYWdlYWJsZSlcblxuU2hpcFdlYXBvbi5wcm9wZXJ0aWVzKHtcbiAgcmVjaGFyZ2VUaW1lOiB7XG4gICAgZGVmYXVsdDogMTAwMFxuICB9LFxuICBwb3dlcjoge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIGJsYXN0UmFuZ2U6IHtcbiAgICBkZWZhdWx0OiAxXG4gIH0sXG4gIHByb3BhZ2F0aW9uVHlwZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgcHJvamVjdGlsZVNwZWVkOiB7XG4gICAgZGVmYXVsdDogMTBcbiAgfSxcbiAgdGFyZ2V0OiB7XG4gICAgZGVmYXVsdDogbnVsbCxcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmF1dG9GaXJlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpcmUoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hhcmdlZDoge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgY2hhcmdpbmc6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIGVuYWJsZWQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIGF1dG9GaXJlOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBjcml0aWNhbEhlYWx0aDoge1xuICAgIGRlZmF1bHQ6IDAuM1xuICB9LFxuICBjYW5GaXJlOiB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQgJiYgdGhpcy5lbmFibGVkICYmIHRoaXMuY2hhcmdlZCAmJiB0aGlzLmhlYWx0aCAvIHRoaXMubWF4SGVhbHRoID49IHRoaXMuY3JpdGljYWxIZWFsdGhcbiAgICB9XG4gIH0sXG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfSxcbiAgcHJvamVjdGlsZUNsYXNzOiB7XG4gICAgZGVmYXVsdDogUHJvamVjdGlsZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXBXZWFwb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuXG5jbGFzcyBTdGFyU3lzdGVtIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgc3VwZXIoZGF0YSlcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCAoKSB7fVxuXG4gIGxpbmtUbyAoc3Rhcikge1xuICAgIGlmICghdGhpcy5saW5rcy5maW5kU3RhcihzdGFyKSkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkTGluayhuZXcgdGhpcy5jb25zdHJ1Y3Rvci5MaW5rKHRoaXMsIHN0YXIpKVxuICAgIH1cbiAgfVxuXG4gIGFkZExpbmsgKGxpbmspIHtcbiAgICB0aGlzLmxpbmtzLmFkZChsaW5rKVxuICAgIGxpbmsub3RoZXJTdGFyKHRoaXMpLmxpbmtzLmFkZChsaW5rKVxuICAgIHJldHVybiBsaW5rXG4gIH1cblxuICBkaXN0ICh4LCB5KSB7XG4gICAgdmFyIHhEaXN0LCB5RGlzdFxuICAgIHhEaXN0ID0gdGhpcy54IC0geFxuICAgIHlEaXN0ID0gdGhpcy55IC0geVxuICAgIHJldHVybiBNYXRoLnNxcnQoKHhEaXN0ICogeERpc3QpICsgKHlEaXN0ICogeURpc3QpKVxuICB9XG5cbiAgaXNTZWxlY3RhYmxlQnkgKHBsYXllcikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbn07XG5cblN0YXJTeXN0ZW0ucHJvcGVydGllcyh7XG4gIHg6IHt9LFxuICB5OiB7fSxcbiAgbmFtZToge30sXG4gIGxpbmtzOiB7XG4gICAgY29sbGVjdGlvbjoge1xuICAgICAgZmluZFN0YXI6IGZ1bmN0aW9uIChzdGFyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmQoZnVuY3Rpb24gKGxpbmspIHtcbiAgICAgICAgICByZXR1cm4gbGluay5zdGFyMiA9PT0gc3RhciB8fCBsaW5rLnN0YXIxID09PSBzdGFyXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5TdGFyU3lzdGVtLmNvbGxlbmN0aW9uRm4gPSB7XG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIG1pbiwgbWluRGlzdFxuICAgIG1pbiA9IG51bGxcbiAgICBtaW5EaXN0ID0gbnVsbFxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiAoc3Rhcikge1xuICAgICAgdmFyIGRpc3RcbiAgICAgIGRpc3QgPSBzdGFyLmRpc3QoeCwgeSlcbiAgICAgIGlmICgobWluID09IG51bGwpIHx8IG1pbkRpc3QgPiBkaXN0KSB7XG4gICAgICAgIG1pbiA9IHN0YXJcbiAgICAgICAgbWluRGlzdCA9IGRpc3RcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBtaW5cbiAgfSxcbiAgY2xvc2VzdHM6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgdmFyIGRpc3RzXG4gICAgZGlzdHMgPSB0aGlzLm1hcChmdW5jdGlvbiAoc3Rhcikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGlzdDogc3Rhci5kaXN0KHgsIHkpLFxuICAgICAgICBzdGFyOiBzdGFyXG4gICAgICB9XG4gICAgfSlcbiAgICBkaXN0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYS5kaXN0IC0gYi5kaXN0XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5jb3B5KGRpc3RzLm1hcChmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgcmV0dXJuIGRpc3Quc3RhclxuICAgIH0pKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhclN5c3RlbVxuXG5TdGFyU3lzdGVtLkxpbmsgPSBjbGFzcyBMaW5rIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChzdGFyMSwgc3RhcjIpIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5zdGFyMSA9IHN0YXIxXG4gICAgdGhpcy5zdGFyMiA9IHN0YXIyXG4gIH1cblxuICByZW1vdmUgKCkge1xuICAgIHRoaXMuc3RhcjEubGlua3MucmVtb3ZlKHRoaXMpXG4gICAgcmV0dXJuIHRoaXMuc3RhcjIubGlua3MucmVtb3ZlKHRoaXMpXG4gIH1cblxuICBvdGhlclN0YXIgKHN0YXIpIHtcbiAgICBpZiAoc3RhciA9PT0gdGhpcy5zdGFyMSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcjJcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcjFcbiAgICB9XG4gIH1cblxuICBnZXRMZW5ndGggKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXIxLmRpc3QodGhpcy5zdGFyMi54LCB0aGlzLnN0YXIyLnkpXG4gIH1cblxuICBpbkJvdW5kYXJ5Qm94ICh4LCB5LCBwYWRkaW5nID0gMCkge1xuICAgIHZhciB4MSwgeDIsIHkxLCB5MlxuICAgIHgxID0gTWF0aC5taW4odGhpcy5zdGFyMS54LCB0aGlzLnN0YXIyLngpIC0gcGFkZGluZ1xuICAgIHkxID0gTWF0aC5taW4odGhpcy5zdGFyMS55LCB0aGlzLnN0YXIyLnkpIC0gcGFkZGluZ1xuICAgIHgyID0gTWF0aC5tYXgodGhpcy5zdGFyMS54LCB0aGlzLnN0YXIyLngpICsgcGFkZGluZ1xuICAgIHkyID0gTWF0aC5tYXgodGhpcy5zdGFyMS55LCB0aGlzLnN0YXIyLnkpICsgcGFkZGluZ1xuICAgIHJldHVybiB4ID49IHgxICYmIHggPD0geDIgJiYgeSA+PSB5MSAmJiB5IDw9IHkyXG4gIH1cblxuICBjbG9zZVRvUG9pbnQgKHgsIHksIG1pbkRpc3QpIHtcbiAgICB2YXIgYSwgYWJjQW5nbGUsIGFieEFuZ2xlLCBhY0Rpc3QsIGFjeEFuZ2xlLCBiLCBjLCBjZERpc3QsIHhBYkRpc3QsIHhBY0Rpc3QsIHlBYkRpc3QsIHlBY0Rpc3RcbiAgICBpZiAoIXRoaXMuaW5Cb3VuZGFyeUJveCh4LCB5LCBtaW5EaXN0KSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGEgPSB0aGlzLnN0YXIxXG4gICAgYiA9IHRoaXMuc3RhcjJcbiAgICBjID0ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHlcbiAgICB9XG4gICAgeEFiRGlzdCA9IGIueCAtIGEueFxuICAgIHlBYkRpc3QgPSBiLnkgLSBhLnlcbiAgICBhYnhBbmdsZSA9IE1hdGguYXRhbih5QWJEaXN0IC8geEFiRGlzdClcbiAgICB4QWNEaXN0ID0gYy54IC0gYS54XG4gICAgeUFjRGlzdCA9IGMueSAtIGEueVxuICAgIGFjRGlzdCA9IE1hdGguc3FydCgoeEFjRGlzdCAqIHhBY0Rpc3QpICsgKHlBY0Rpc3QgKiB5QWNEaXN0KSlcbiAgICBhY3hBbmdsZSA9IE1hdGguYXRhbih5QWNEaXN0IC8geEFjRGlzdClcbiAgICBhYmNBbmdsZSA9IGFieEFuZ2xlIC0gYWN4QW5nbGVcbiAgICBjZERpc3QgPSBNYXRoLmFicyhNYXRoLnNpbihhYmNBbmdsZSkgKiBhY0Rpc3QpXG4gICAgcmV0dXJuIGNkRGlzdCA8PSBtaW5EaXN0XG4gIH1cblxuICBpbnRlcnNlY3RMaW5rIChsaW5rKSB7XG4gICAgdmFyIHMsIHMxeCwgczF5LCBzMngsIHMyeSwgdCwgeDEsIHgyLCB4MywgeDQsIHkxLCB5MiwgeTMsIHk0XG4gICAgeDEgPSB0aGlzLnN0YXIxLnhcbiAgICB5MSA9IHRoaXMuc3RhcjEueVxuICAgIHgyID0gdGhpcy5zdGFyMi54XG4gICAgeTIgPSB0aGlzLnN0YXIyLnlcbiAgICB4MyA9IGxpbmsuc3RhcjEueFxuICAgIHkzID0gbGluay5zdGFyMS55XG4gICAgeDQgPSBsaW5rLnN0YXIyLnhcbiAgICB5NCA9IGxpbmsuc3RhcjIueVxuICAgIHMxeCA9IHgyIC0geDFcbiAgICBzMXkgPSB5MiAtIHkxXG4gICAgczJ4ID0geDQgLSB4M1xuICAgIHMyeSA9IHk0IC0geTNcbiAgICBzID0gKC1zMXkgKiAoeDEgLSB4MykgKyBzMXggKiAoeTEgLSB5MykpIC8gKC1zMnggKiBzMXkgKyBzMXggKiBzMnkpXG4gICAgdCA9IChzMnggKiAoeTEgLSB5MykgLSBzMnkgKiAoeDEgLSB4MykpIC8gKC1zMnggKiBzMXkgKyBzMXggKiBzMnkpXG4gICAgcmV0dXJuIHMgPiAwICYmIHMgPCAxICYmIHQgPiAwICYmIHQgPCAxXG4gIH1cbn1cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuXG5jbGFzcyBUcmF2ZWwgZXh0ZW5kcyBFbGVtZW50IHtcbiAgc3RhcnQgKGxvY2F0aW9uKSB7XG4gICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy50cmF2ZWxsZXIudHJhdmVsID0gdGhpc1xuICAgICAgdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnRyYXZlbGxlci5sb2NhdGlvbiA9IHRoaXMudGFyZ2V0TG9jYXRpb25cbiAgICAgICAgdGhpcy50cmF2ZWxsZXIudHJhdmVsID0gbnVsbFxuICAgICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKVxuICAgIH1cbiAgfVxufTtcblxuVHJhdmVsLnByb3BlcnRpZXMoe1xuICB0cmF2ZWxsZXI6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHN0YXJ0TG9jYXRpb246IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHRhcmdldExvY2F0aW9uOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBjdXJyZW50U2VjdGlvbjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRMb2NhdGlvbi5saW5rcy5maW5kU3Rhcih0aGlzLnRhcmdldExvY2F0aW9uKVxuICAgIH1cbiAgfSxcbiAgZHVyYXRpb246IHtcbiAgICBkZWZhdWx0OiAxMDAwXG4gIH0sXG4gIG1vdmluZzoge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIHZhbGlkOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVmLCByZWYxXG4gICAgICBpZiAodGhpcy50YXJnZXRMb2NhdGlvbiA9PT0gdGhpcy5zdGFydExvY2F0aW9uKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKCgoKHJlZiA9IHRoaXMudGFyZ2V0TG9jYXRpb24pICE9IG51bGwgPyByZWYubGlua3MgOiBudWxsKSAhPSBudWxsKSAmJiAoKChyZWYxID0gdGhpcy5zdGFydExvY2F0aW9uKSAhPSBudWxsID8gcmVmMS5saW5rcyA6IG51bGwpICE9IG51bGwpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRTZWN0aW9uICE9IG51bGxcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfSxcbiAgc3BhY2VDb29kaW5hdGU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgdmFyIGVuZFgsIGVuZFksIHByYywgc3RhcnRYLCBzdGFydFlcbiAgICAgIHN0YXJ0WCA9IGludmFsaWRhdG9yLnByb3BQYXRoKCdzdGFydExvY2F0aW9uLngnKVxuICAgICAgc3RhcnRZID0gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3N0YXJ0TG9jYXRpb24ueScpXG4gICAgICBlbmRYID0gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3RhcmdldExvY2F0aW9uLngnKVxuICAgICAgZW5kWSA9IGludmFsaWRhdG9yLnByb3BQYXRoKCd0YXJnZXRMb2NhdGlvbi55JylcbiAgICAgIHByYyA9IGludmFsaWRhdG9yLnByb3BQYXRoKCdwYXRoVGltZW91dC5wcmMnKVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogKHN0YXJ0WCAtIGVuZFgpICogcHJjICsgZW5kWCxcbiAgICAgICAgeTogKHN0YXJ0WSAtIGVuZFkpICogcHJjICsgZW5kWVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUcmF2ZWxcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgR3JpZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tZ3JpZHMnKS5HcmlkXG5cbmNsYXNzIFZpZXcgZXh0ZW5kcyBFbGVtZW50IHtcbiAgc2V0RGVmYXVsdHMgKCkge1xuICAgIHZhciByZWZcbiAgICBpZiAoIXRoaXMuYm91bmRzKSB7XG4gICAgICB0aGlzLmdyaWQgPSB0aGlzLmdyaWQgfHwgKChyZWYgPSB0aGlzLmdhbWUubWFpblZpZXdQcm9wZXJ0eS52YWx1ZSkgIT0gbnVsbCA/IHJlZi5ncmlkIDogbnVsbCkgfHwgbmV3IEdyaWQoKVxuICAgICAgdGhpcy5ib3VuZHMgPSB0aGlzLmdyaWQuYWRkQ2VsbCgpXG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5nYW1lID0gbnVsbFxuICB9XG59O1xuXG5WaWV3LnByb3BlcnRpZXMoe1xuICBnYW1lOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lLnZpZXdzLmFkZCh0aGlzKVxuICAgICAgICB0aGlzLnNldERlZmF1bHRzKClcbiAgICAgIH1cbiAgICAgIGlmIChvbGQpIHtcbiAgICAgICAgcmV0dXJuIG9sZC52aWV3cy5yZW1vdmUodGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHg6IHtcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG4gIHk6IHtcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG4gIGdyaWQ6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIGJvdW5kczoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBWaWV3XG4iLCJjb25zdCBMaW5lT2ZTaWdodCA9IHJlcXVpcmUoJy4vTGluZU9mU2lnaHQnKVxuY29uc3QgRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvblxuY29uc3QgVGlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlQ29udGFpbmVyXG5jb25zdCBUaWxlUmVmZXJlbmNlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVSZWZlcmVuY2VcblxuY2xhc3MgVmlzaW9uQ2FsY3VsYXRvciB7XG4gIGNvbnN0cnVjdG9yIChvcmlnaW5UaWxlLCBvZmZzZXQgPSB7XG4gICAgeDogMC41LFxuICAgIHk6IDAuNVxuICB9KSB7XG4gICAgdGhpcy5vcmlnaW5UaWxlID0gb3JpZ2luVGlsZVxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0XG4gICAgdGhpcy5wdHMgPSB7fVxuICAgIHRoaXMudmlzaWJpbGl0eSA9IHt9XG4gICAgdGhpcy5zdGFjayA9IFtdXG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgdGhpcy5pbml0KClcbiAgICB3aGlsZSAodGhpcy5zdGFjay5sZW5ndGgpIHtcbiAgICAgIHRoaXMuc3RlcCgpXG4gICAgfVxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHZhciBmaXJzdEJhdGNoLCBpbml0aWFsUHRzXG4gICAgdGhpcy5wdHMgPSB7fVxuICAgIHRoaXMudmlzaWJpbGl0eSA9IHt9XG4gICAgaW5pdGlhbFB0cyA9IFt7IHg6IDAsIHk6IDAgfSwgeyB4OiAxLCB5OiAwIH0sIHsgeDogMCwgeTogMSB9LCB7IHg6IDEsIHk6IDEgfV1cbiAgICBpbml0aWFsUHRzLmZvckVhY2goKHB0KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRQdCh0aGlzLm9yaWdpblRpbGUueCArIHB0LngsIHRoaXMub3JpZ2luVGlsZS55ICsgcHQueSwgdHJ1ZSlcbiAgICB9KVxuICAgIGZpcnN0QmF0Y2ggPSBbXG4gICAgICB7IHg6IC0xLCB5OiAtMSB9LCB7IHg6IC0xLCB5OiAwIH0sIHsgeDogLTEsIHk6IDEgfSwgeyB4OiAtMSwgeTogMiB9LFxuICAgICAgeyB4OiAyLCB5OiAtMSB9LCB7IHg6IDIsIHk6IDAgfSwgeyB4OiAyLCB5OiAxIH0sIHsgeDogMiwgeTogMiB9LFxuICAgICAgeyB4OiAwLCB5OiAtMSB9LCB7IHg6IDEsIHk6IC0xIH0sXG4gICAgICB7IHg6IDAsIHk6IDIgfSwgeyB4OiAxLCB5OiAyIH1cbiAgICBdXG4gICAgdGhpcy5zdGFjayA9IGZpcnN0QmF0Y2gubWFwKChwdCkgPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy5vcmlnaW5UaWxlLnggKyBwdC54LFxuICAgICAgICB5OiB0aGlzLm9yaWdpblRpbGUueSArIHB0LnlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc2V0UHQgKHgsIHksIHZhbCkge1xuICAgIHZhciBhZGphbmNlbnRcbiAgICB0aGlzLnB0c1t4ICsgJzonICsgeV0gPSB2YWxcbiAgICBhZGphbmNlbnQgPSBbXG4gICAgICB7XG4gICAgICAgIHg6IDAsXG4gICAgICAgIHk6IDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IC0xLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAtMVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogLTEsXG4gICAgICAgIHk6IC0xXG4gICAgICB9XG4gICAgXVxuICAgIHJldHVybiBhZGphbmNlbnQuZm9yRWFjaCgocHQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFZpc2liaWxpdHkoeCArIHB0LngsIHkgKyBwdC55LCB2YWwgPyAxIC8gYWRqYW5jZW50Lmxlbmd0aCA6IDApXG4gICAgfSlcbiAgfVxuXG4gIGdldFB0ICh4LCB5KSB7XG4gICAgcmV0dXJuIHRoaXMucHRzW3ggKyAnOicgKyB5XVxuICB9XG5cbiAgYWRkVmlzaWJpbGl0eSAoeCwgeSwgdmFsKSB7XG4gICAgaWYgKHRoaXMudmlzaWJpbGl0eVt4XSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnZpc2liaWxpdHlbeF0gPSB7fVxuICAgIH1cbiAgICBpZiAodGhpcy52aXNpYmlsaXR5W3hdW3ldICE9IG51bGwpIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eVt4XVt5XSArPSB2YWxcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy52aXNpYmlsaXR5W3hdW3ldID0gdmFsXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBnZXRWaXNpYmlsaXR5ICh4LCB5KSB7XG4gICAgaWYgKCh0aGlzLnZpc2liaWxpdHlbeF0gPT0gbnVsbCkgfHwgKHRoaXMudmlzaWJpbGl0eVt4XVt5XSA9PSBudWxsKSkge1xuICAgICAgcmV0dXJuIDBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMudmlzaWJpbGl0eVt4XVt5XVxuICAgIH1cbiAgfVxuXG4gIGNhblByb2Nlc3MgKHgsIHkpIHtcbiAgICByZXR1cm4gIXRoaXMuc3RhY2suc29tZSgocHQpID0+IHtcbiAgICAgIHJldHVybiBwdC54ID09PSB4ICYmIHB0LnkgPT09IHlcbiAgICB9KSAmJiAodGhpcy5nZXRQdCh4LCB5KSA9PSBudWxsKVxuICB9XG5cbiAgc3RlcCAoKSB7XG4gICAgdmFyIGxvcywgcHRcbiAgICBwdCA9IHRoaXMuc3RhY2suc2hpZnQoKVxuICAgIGxvcyA9IG5ldyBMaW5lT2ZTaWdodCh0aGlzLm9yaWdpblRpbGUuY29udGFpbmVyLCB0aGlzLm9yaWdpblRpbGUueCArIHRoaXMub2Zmc2V0LngsIHRoaXMub3JpZ2luVGlsZS55ICsgdGhpcy5vZmZzZXQueSwgcHQueCwgcHQueSlcbiAgICBsb3MucmV2ZXJzZVRyYWNpbmcoKVxuICAgIGxvcy50cmF2ZXJzYWJsZUNhbGxiYWNrID0gKHRpbGUsIGVudHJ5WCwgZW50cnlZKSA9PiB7XG4gICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgIGlmICh0aGlzLmdldFZpc2liaWxpdHkodGlsZS54LCB0aWxlLnkpID09PSAxKSB7XG4gICAgICAgICAgcmV0dXJuIGxvcy5mb3JjZVN1Y2Nlc3MoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aWxlLnRyYW5zcGFyZW50XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zZXRQdChwdC54LCBwdC55LCBsb3MuZ2V0U3VjY2VzcygpKVxuICAgIGlmIChsb3MuZ2V0U3VjY2VzcygpKSB7XG4gICAgICByZXR1cm4gRGlyZWN0aW9uLmFsbC5mb3JFYWNoKChkaXJlY3Rpb24pID0+IHtcbiAgICAgICAgdmFyIG5leHRQdFxuICAgICAgICBuZXh0UHQgPSB7XG4gICAgICAgICAgeDogcHQueCArIGRpcmVjdGlvbi54LFxuICAgICAgICAgIHk6IHB0LnkgKyBkaXJlY3Rpb24ueVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmNhblByb2Nlc3MobmV4dFB0LngsIG5leHRQdC55KSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0YWNrLnB1c2gobmV4dFB0KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGdldEJvdW5kcyAoKSB7XG4gICAgdmFyIGJvdW5kYXJpZXMsIGNvbCwgcmVmLCB4LCB5XG4gICAgYm91bmRhcmllcyA9IHtcbiAgICAgIHRvcDogbnVsbCxcbiAgICAgIGxlZnQ6IG51bGwsXG4gICAgICBib3R0b206IG51bGwsXG4gICAgICByaWdodDogbnVsbFxuICAgIH1cbiAgICByZWYgPSB0aGlzLnZpc2liaWxpdHlcbiAgICBmb3IgKHggaW4gcmVmKSB7XG4gICAgICBjb2wgPSByZWZbeF1cbiAgICAgIGZvciAoeSBpbiBjb2wpIHtcbiAgICAgICAgaWYgKChib3VuZGFyaWVzLnRvcCA9PSBudWxsKSB8fCB5IDwgYm91bmRhcmllcy50b3ApIHtcbiAgICAgICAgICBib3VuZGFyaWVzLnRvcCA9IHlcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGJvdW5kYXJpZXMubGVmdCA9PSBudWxsKSB8fCB4IDwgYm91bmRhcmllcy5sZWZ0KSB7XG4gICAgICAgICAgYm91bmRhcmllcy5sZWZ0ID0geFxuICAgICAgICB9XG4gICAgICAgIGlmICgoYm91bmRhcmllcy5ib3R0b20gPT0gbnVsbCkgfHwgeSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICAgICAgYm91bmRhcmllcy5ib3R0b20gPSB5XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChib3VuZGFyaWVzLnJpZ2h0ID09IG51bGwpIHx8IHggPiBib3VuZGFyaWVzLnJpZ2h0KSB7XG4gICAgICAgICAgYm91bmRhcmllcy5yaWdodCA9IHhcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYm91bmRhcmllc1xuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtUaWxlQ29udGFpbmVyfVxuICAgKi9cbiAgdG9Db250YWluZXIgKCkge1xuICAgIHZhciBjb2wsIHJlZiwgdGlsZSwgdmFsLCB4LCB5XG4gICAgY29uc3QgcmVzID0gbmV3IFRpbGVDb250YWluZXIoKVxuICAgIHJlcy5vd25lciA9IGZhbHNlXG4gICAgcmVmID0gdGhpcy52aXNpYmlsaXR5XG4gICAgZm9yICh4IGluIHJlZikge1xuICAgICAgY29sID0gcmVmW3hdXG4gICAgICBmb3IgKHkgaW4gY29sKSB7XG4gICAgICAgIHZhbCA9IGNvbFt5XVxuICAgICAgICB0aWxlID0gdGhpcy5vcmlnaW5UaWxlLmNvbnRhaW5lci5nZXRUaWxlKHgsIHkpXG4gICAgICAgIGlmICh2YWwgIT09IDAgJiYgKHRpbGUgIT0gbnVsbCkpIHtcbiAgICAgICAgICB0aWxlID0gbmV3IFRpbGVSZWZlcmVuY2UodGlsZSlcbiAgICAgICAgICB0aWxlLnZpc2liaWxpdHkgPSB2YWxcbiAgICAgICAgICByZXMuYWRkVGlsZSh0aWxlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIHRvTWFwICgpIHtcbiAgICB2YXIgaSwgaiwgcmVmLCByZWYxLCByZWYyLCByZWYzLCByZXMsIHgsIHlcbiAgICByZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgIG1hcDogW11cbiAgICB9LCB0aGlzLmdldEJvdW5kcygpKVxuICAgIGZvciAoeSA9IGkgPSByZWYgPSByZXMudG9wLCByZWYxID0gcmVzLmJvdHRvbSAtIDE7IChyZWYgPD0gcmVmMSA/IGkgPD0gcmVmMSA6IGkgPj0gcmVmMSk7IHkgPSByZWYgPD0gcmVmMSA/ICsraSA6IC0taSkge1xuICAgICAgcmVzLm1hcFt5IC0gcmVzLnRvcF0gPSBbXVxuICAgICAgZm9yICh4ID0gaiA9IHJlZjIgPSByZXMubGVmdCwgcmVmMyA9IHJlcy5yaWdodCAtIDE7IChyZWYyIDw9IHJlZjMgPyBqIDw9IHJlZjMgOiBqID49IHJlZjMpOyB4ID0gcmVmMiA8PSByZWYzID8gKytqIDogLS1qKSB7XG4gICAgICAgIHJlcy5tYXBbeSAtIHJlcy50b3BdW3ggLSByZXMubGVmdF0gPSB0aGlzLmdldFZpc2liaWxpdHkoeCwgeSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVmlzaW9uQ2FsY3VsYXRvclxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudHMnKVxuXG5jbGFzcyBBY3Rpb24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgd2l0aEFjdG9yIChhY3Rvcikge1xuICAgIGlmICh0aGlzLmFjdG9yICE9PSBhY3Rvcikge1xuICAgICAgcmV0dXJuIHRoaXMuY29weVdpdGgoe1xuICAgICAgICBhY3RvcjogYWN0b3JcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgY29weVdpdGggKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IoT2JqZWN0LmFzc2lnbih7XG4gICAgICBiYXNlOiB0aGlzLmJhc2VPclRoaXMoKVxuICAgIH0sIHRoaXMucHJvcGVydGllc01hbmFnZXIuZ2V0TWFudWFsRGF0YVByb3BlcnRpZXMoKSwgb3B0aW9ucykpXG4gIH1cblxuICBiYXNlT3JUaGlzICgpIHtcbiAgICByZXR1cm4gdGhpcy5iYXNlIHx8IHRoaXNcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLmFjdG9yLmN1cnJlbnRBY3Rpb24gPSB0aGlzXG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgpXG4gIH1cblxuICB2YWxpZEFjdG9yICgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RvciAhPSBudWxsXG4gIH1cblxuICBpc1JlYWR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZEFjdG9yKClcbiAgfVxuXG4gIGZpbmlzaCAoKSB7XG4gICAgdGhpcy5lbWl0KCdmaW5pc2hlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGludGVycnVwdCAoKSB7XG4gICAgdGhpcy5lbWl0KCdpbnRlcnJ1cHRlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGVuZCAoKSB7XG4gICAgaWYgKHRoaXMuYWN0b3IuY3VycmVudEFjdGlvbiA9PT0gdGhpcykge1xuICAgICAgdGhpcy5hY3Rvci5jdXJyZW50QWN0aW9uID0gbnVsbFxuICAgIH1cbiAgICB0aGlzLmVtaXQoJ2VuZCcpXG4gICAgcmV0dXJuIHRoaXMuZGVzdHJveSgpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KClcbiAgfVxufTtcblxuQWN0aW9uLmluY2x1ZGUoRXZlbnRFbWl0dGVyLnByb3RvdHlwZSlcblxuQWN0aW9uLnByb3BlcnRpZXMoe1xuICBhY3Rvcjoge30sXG4gIGJhc2U6IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFjdGlvblxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5cbmNsYXNzIEFjdGlvblByb3ZpZGVyIGV4dGVuZHMgRWxlbWVudCB7fTtcblxuQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gIGFjdGlvbnM6IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgIGNvbXBvc2VkOiB0cnVlXG4gIH0sXG4gIG93bmVyOiB7fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb25Qcm92aWRlclxuIiwiY29uc3QgV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vV2Fsa0FjdGlvbicpXG5jb25zdCBUYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpXG5jb25zdCBFdmVudEJpbmQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRCaW5kXG5jb25zdCBQcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykud2F0Y2hlcnMuUHJvcGVydHlXYXRjaGVyXG5cbmNsYXNzIEF0dGFja0FjdGlvbiBleHRlbmRzIFRhcmdldEFjdGlvbiB7XG4gIHZhbGlkVGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXRJc0F0dGFja2FibGUoKSAmJiAodGhpcy5jYW5Vc2VXZWFwb24oKSB8fCB0aGlzLmNhbldhbGtUb1RhcmdldCgpKVxuICB9XG5cbiAgdGFyZ2V0SXNBdHRhY2thYmxlICgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQuZGFtYWdlYWJsZSAmJiB0aGlzLnRhcmdldC5oZWFsdGggPiAwXG4gIH1cblxuICBjYW5NZWxlZSAoKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHRoaXMudGFyZ2V0LnRpbGUueCAtIHRoaXMuYWN0b3IudGlsZS54KSArIE1hdGguYWJzKHRoaXMudGFyZ2V0LnRpbGUueSAtIHRoaXMuYWN0b3IudGlsZS55KSA9PT0gMVxuICB9XG5cbiAgY2FuVXNlV2VhcG9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5iZXN0VXNhYmxlV2VhcG9uICE9IG51bGxcbiAgfVxuXG4gIGNhblVzZVdlYXBvbkF0ICh0aWxlKSB7XG4gICAgdmFyIHJlZlxuICAgIHJldHVybiAoKHJlZiA9IHRoaXMuYWN0b3Iud2VhcG9ucykgIT0gbnVsbCA/IHJlZi5sZW5ndGggOiBudWxsKSAmJiB0aGlzLmFjdG9yLndlYXBvbnMuZmluZCgod2VhcG9uKSA9PiB7XG4gICAgICByZXR1cm4gd2VhcG9uLmNhblVzZUZyb20odGlsZSwgdGhpcy50YXJnZXQpXG4gICAgfSlcbiAgfVxuXG4gIGNhbldhbGtUb1RhcmdldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi5pc1JlYWR5KClcbiAgfVxuXG4gIHVzZVdlYXBvbiAoKSB7XG4gICAgdGhpcy5iZXN0VXNhYmxlV2VhcG9uLnVzZU9uKHRoaXMudGFyZ2V0KVxuICAgIHJldHVybiB0aGlzLmZpbmlzaCgpXG4gIH1cblxuICBleGVjdXRlICgpIHtcbiAgICBpZiAodGhpcy5hY3Rvci53YWxrICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYWN0b3Iud2Fsay5pbnRlcnJ1cHQoKVxuICAgIH1cbiAgICBpZiAodGhpcy5iZXN0VXNhYmxlV2VhcG9uICE9IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLmJlc3RVc2FibGVXZWFwb24uY2hhcmdlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy51c2VXZWFwb24oKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2VhcG9uQ2hhcmdlV2F0Y2hlci5iaW5kKClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53YWxrQWN0aW9uLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIudW5iaW5kKClcbiAgICAgICAgdGhpcy53YWxrQWN0aW9uLmRlc3Ryb3koKVxuICAgICAgICB0aGlzLndhbGtBY3Rpb25Qcm9wZXJ0eS5pbnZhbGlkYXRlKClcbiAgICAgICAgaWYgKHRoaXMuaXNSZWFkeSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgdGhpcy5pbnRlcnJ1cHRCaW5kZXIuYmluZFRvKHRoaXMud2Fsa0FjdGlvbilcbiAgICAgIHJldHVybiB0aGlzLndhbGtBY3Rpb24uZXhlY3V0ZSgpXG4gICAgfVxuICB9XG59O1xuXG5BdHRhY2tBY3Rpb24ucHJvcGVydGllcyh7XG4gIHdhbGtBY3Rpb246IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB3YWxrQWN0aW9uXG4gICAgICB3YWxrQWN0aW9uID0gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICBhY3RvcjogdGhpcy5hY3RvcixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldC50aWxlLFxuICAgICAgICBwYXJlbnQ6IHRoaXMucGFyZW50XG4gICAgICB9KVxuICAgICAgd2Fsa0FjdGlvbi5wYXRoRmluZGVyLmFycml2ZWRDYWxsYmFjayA9IChzdGVwKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblVzZVdlYXBvbkF0KHN0ZXAudGlsZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YWxrQWN0aW9uXG4gICAgfVxuICB9LFxuICBiZXN0VXNhYmxlV2VhcG9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciByZWYsIHVzYWJsZVdlYXBvbnNcbiAgICAgIGludmFsaWRhdG9yLnByb3BQYXRoKCdhY3Rvci50aWxlJylcbiAgICAgIGlmICgocmVmID0gdGhpcy5hY3Rvci53ZWFwb25zKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IG51bGwpIHtcbiAgICAgICAgdXNhYmxlV2VhcG9ucyA9IHRoaXMuYWN0b3Iud2VhcG9ucy5maWx0ZXIoKHdlYXBvbikgPT4ge1xuICAgICAgICAgIHJldHVybiB3ZWFwb24uY2FuVXNlT24odGhpcy50YXJnZXQpXG4gICAgICAgIH0pXG4gICAgICAgIHVzYWJsZVdlYXBvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIHJldHVybiBiLmRwcyAtIGEuZHBzXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB1c2FibGVXZWFwb25zWzBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaW50ZXJydXB0QmluZGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50QmluZCgnaW50ZXJydXB0ZWQnLCBudWxsLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVycnVwdCgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveTogdHJ1ZVxuICB9LFxuICB3ZWFwb25DaGFyZ2VXYXRjaGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VXZWFwb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHk6IHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnY2hhcmdlZCcpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveTogdHJ1ZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dGFja0FjdGlvblxuIiwiY29uc3QgV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vV2Fsa0FjdGlvbicpXG5jb25zdCBBdHRhY2tBY3Rpb24gPSByZXF1aXJlKCcuL0F0dGFja0FjdGlvbicpXG5jb25zdCBUYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpXG5jb25zdCBQYXRoRmluZGVyID0gcmVxdWlyZSgncGFyYWxsZWxpby1wYXRoZmluZGVyJylcbmNvbnN0IExpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi4vTGluZU9mU2lnaHQnKVxuY29uc3QgUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlclxuY29uc3QgRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZFxuXG5jbGFzcyBBdHRhY2tNb3ZlQWN0aW9uIGV4dGVuZHMgVGFyZ2V0QWN0aW9uIHtcbiAgaXNFbmVteSAoZWxlbSkge1xuICAgIHZhciByZWZcbiAgICByZXR1cm4gKHJlZiA9IHRoaXMuYWN0b3Iub3duZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmlzRW5lbXkgPT09ICdmdW5jdGlvbicgPyByZWYuaXNFbmVteShlbGVtKSA6IG51bGwgOiBudWxsXG4gIH1cblxuICB2YWxpZFRhcmdldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi52YWxpZFRhcmdldCgpXG4gIH1cblxuICB0ZXN0RW5lbXlTcG90dGVkICgpIHtcbiAgICB0aGlzLmVuZW15U3BvdHRlZFByb3BlcnR5LmludmFsaWRhdGUoKVxuICAgIGlmICh0aGlzLmVuZW15U3BvdHRlZCkge1xuICAgICAgdGhpcy5hdHRhY2tBY3Rpb24gPSBuZXcgQXR0YWNrQWN0aW9uKHtcbiAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgIHRhcmdldDogdGhpcy5lbmVteVNwb3R0ZWRcbiAgICAgIH0pXG4gICAgICBpZiAoIXRoaXMuYXR0YWNrQWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgICAgdGhpcy5hdHRhY2tBY3Rpb24ub24oJ2ZpbmlzaGVkJywgKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc1JlYWR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5leGVjdXRlKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuaW50ZXJydXB0QmluZGVyLmJpbmRUbyh0aGlzLmF0dGFja0FjdGlvbilcbiAgICAgIHRoaXMud2Fsa0FjdGlvbi5pbnRlcnJ1cHQoKVxuICAgICAgdGhpcy53YWxrQWN0aW9uUHJvcGVydHkuaW52YWxpZGF0ZSgpXG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2tBY3Rpb24uZXhlY3V0ZSgpXG4gICAgfVxuICB9XG5cbiAgZXhlY3V0ZSAoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RFbmVteVNwb3R0ZWQoKSkge1xuICAgICAgdGhpcy53YWxrQWN0aW9uLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluaXNoKClcbiAgICAgIH0pXG4gICAgICB0aGlzLmludGVycnVwdEJpbmRlci5iaW5kVG8odGhpcy53YWxrQWN0aW9uKVxuICAgICAgdGhpcy50aWxlV2F0Y2hlci5iaW5kKClcbiAgICAgIHJldHVybiB0aGlzLndhbGtBY3Rpb24uZXhlY3V0ZSgpXG4gICAgfVxuICB9XG59O1xuXG5BdHRhY2tNb3ZlQWN0aW9uLnByb3BlcnRpZXMoe1xuICB3YWxrQWN0aW9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgd2Fsa0FjdGlvblxuICAgICAgd2Fsa0FjdGlvbiA9IG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXG4gICAgICAgIHBhcmVudDogdGhpcy5wYXJlbnRcbiAgICAgIH0pXG4gICAgICByZXR1cm4gd2Fsa0FjdGlvblxuICAgIH1cbiAgfSxcbiAgZW5lbXlTcG90dGVkOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVmXG4gICAgICB0aGlzLnBhdGggPSBuZXcgUGF0aEZpbmRlcih0aGlzLmFjdG9yLnRpbGUuY29udGFpbmVyLCB0aGlzLmFjdG9yLnRpbGUsIGZhbHNlLCB7XG4gICAgICAgIHZhbGlkVGlsZTogKHRpbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGlsZS50cmFuc3BhcmVudCAmJiAobmV3IExpbmVPZlNpZ2h0KHRoaXMuYWN0b3IudGlsZS5jb250YWluZXIsIHRoaXMuYWN0b3IudGlsZS54LCB0aGlzLmFjdG9yLnRpbGUueSwgdGlsZS54LCB0aWxlLnkpKS5nZXRTdWNjZXNzKClcbiAgICAgICAgfSxcbiAgICAgICAgYXJyaXZlZDogKHN0ZXApID0+IHtcbiAgICAgICAgICBzdGVwLmVuZW15ID0gc3RlcC50aWxlLmNoaWxkcmVuLmZpbmQoKGMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzRW5lbXkoYylcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBzdGVwLmVuZW15XG4gICAgICAgIH0sXG4gICAgICAgIGVmZmljaWVuY3k6ICh0aWxlKSA9PiB7fVxuICAgICAgfSlcbiAgICAgIHRoaXMucGF0aC5jYWxjdWwoKVxuICAgICAgcmV0dXJuIChyZWYgPSB0aGlzLnBhdGguc29sdXRpb24pICE9IG51bGwgPyByZWYuZW5lbXkgOiBudWxsXG4gICAgfVxuICB9LFxuICB0aWxlV2F0Y2hlcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRlc3RFbmVteVNwb3R0ZWQoKVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0eTogdGhpcy5hY3Rvci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgndGlsZScpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveTogdHJ1ZVxuICB9LFxuICBpbnRlcnJ1cHRCaW5kZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRCaW5kKCdpbnRlcnJ1cHRlZCcsIG51bGwsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW50ZXJydXB0KClcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95OiB0cnVlXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQXR0YWNrTW92ZUFjdGlvblxuIiwiY29uc3QgQWN0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuL0FjdGlvblByb3ZpZGVyJylcblxuY2xhc3MgU2ltcGxlQWN0aW9uUHJvdmlkZXIgZXh0ZW5kcyBBY3Rpb25Qcm92aWRlciB7fTtcblxuU2ltcGxlQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gIGFjdGlvbnM6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhY3Rpb25zXG4gICAgICBhY3Rpb25zID0gdGhpcy5hY3Rpb25PcHRpb25zIHx8IHRoaXMuY29uc3RydWN0b3IuYWN0aW9ucyB8fCBbXVxuICAgICAgaWYgKHR5cGVvZiBhY3Rpb25zID09PSAnb2JqZWN0Jykge1xuICAgICAgICBhY3Rpb25zID0gT2JqZWN0LmtleXMoYWN0aW9ucykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uc1trZXldXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXR1cm4gYWN0aW9ucy5tYXAoKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbi53aXRoVGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvbi53aXRoVGFyZ2V0KHRoaXMpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNvbnN0IEFjdGlvbkNsYXNzID0gYWN0aW9uXG4gICAgICAgICAgcmV0dXJuIG5ldyBBY3Rpb25DbGFzcyh7XG4gICAgICAgICAgICB0YXJnZXQ6IHRoaXNcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhY3Rpb25cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU2ltcGxlQWN0aW9uUHJvdmlkZXJcbiIsImNvbnN0IEFjdGlvbiA9IHJlcXVpcmUoJy4vQWN0aW9uJylcblxuY2xhc3MgVGFyZ2V0QWN0aW9uIGV4dGVuZHMgQWN0aW9uIHtcbiAgd2l0aFRhcmdldCAodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMudGFyZ2V0ICE9PSB0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXRcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuICB9XG5cbiAgY2FuVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICB2YXIgaW5zdGFuY2VcbiAgICBpbnN0YW5jZSA9IHRoaXMud2l0aFRhcmdldCh0YXJnZXQpXG4gICAgaWYgKGluc3RhbmNlLnZhbGlkVGFyZ2V0KCkpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZVxuICAgIH1cbiAgfVxuXG4gIHZhbGlkVGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy50YXJnZXQgIT0gbnVsbFxuICB9XG5cbiAgaXNSZWFkeSAoKSB7XG4gICAgcmV0dXJuIHN1cGVyLmlzUmVhZHkoKSAmJiB0aGlzLnZhbGlkVGFyZ2V0KClcbiAgfVxufTtcblxuVGFyZ2V0QWN0aW9uLnByb3BlcnRpZXMoe1xuICB0YXJnZXQ6IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRhcmdldEFjdGlvblxuIiwiY29uc3QgQWN0aW9uUHJvdmlkZXIgPSByZXF1aXJlKCcuL0FjdGlvblByb3ZpZGVyJylcblxuY2xhc3MgVGlsZWRBY3Rpb25Qcm92aWRlciBleHRlbmRzIEFjdGlvblByb3ZpZGVyIHtcbiAgdmFsaWRBY3Rpb25UaWxlICh0aWxlKSB7XG4gICAgcmV0dXJuIHRpbGUgIT0gbnVsbFxuICB9XG5cbiAgcHJlcGFyZUFjdGlvblRpbGUgKHRpbGUpIHtcbiAgICBpZiAoIXRpbGUuYWN0aW9uUHJvdmlkZXIpIHtcbiAgICAgIHRpbGUuYWN0aW9uUHJvdmlkZXIgPSBuZXcgQWN0aW9uUHJvdmlkZXIoe1xuICAgICAgICBvd25lcjogdGlsZVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn07XG5cblRpbGVkQWN0aW9uUHJvdmlkZXIucHJvcGVydGllcyh7XG4gIG9yaWdpblRpbGU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKCdvd25lci50aWxlJylcbiAgICB9XG4gIH0sXG4gIGFjdGlvblRpbGVzOiB7XG4gICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgdmFyIG15VGlsZVxuICAgICAgbXlUaWxlID0gaW52YWxpZGF0b3IucHJvcCh0aGlzLm9yaWdpblRpbGVQcm9wZXJ0eSlcbiAgICAgIGlmIChteVRpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWN0aW9uVGlsZXNDb29yZC5tYXAoKGNvb3JkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG15VGlsZS5nZXRSZWxhdGl2ZVRpbGUoY29vcmQueCwgY29vcmQueSlcbiAgICAgICAgfSkuZmlsdGVyKCh0aWxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRBY3Rpb25UaWxlKHRpbGUpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW11cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1BZGRlZDogZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgIHRoaXMucHJlcGFyZUFjdGlvblRpbGUodGlsZSlcbiAgICAgIHJldHVybiB0aWxlLmFjdGlvblByb3ZpZGVyLmFjdGlvbnNNZW1iZXJzLmFkZFByb3BlcnR5KHRoaXMuYWN0aW9uc1Byb3BlcnR5KVxuICAgIH0sXG4gICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICByZXR1cm4gdGlsZS5hY3Rpb25Qcm92aWRlci5hY3Rpb25zTWVtYmVycy5yZW1vdmVQcm9wZXJ0eSh0aGlzLmFjdGlvbnNQcm9wZXJ0eSlcbiAgICB9XG4gIH1cbn0pXG5cblRpbGVkQWN0aW9uUHJvdmlkZXIucHJvdG90eXBlLmFjdGlvblRpbGVzQ29vcmQgPSBbXG4gIHtcbiAgICB4OiAwLFxuICAgIHk6IC0xXG4gIH0sXG4gIHtcbiAgICB4OiAtMSxcbiAgICB5OiAwXG4gIH0sXG4gIHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfSxcbiAge1xuICAgIHg6ICsxLFxuICAgIHk6IDBcbiAgfSxcbiAge1xuICAgIHg6IDAsXG4gICAgeTogKzFcbiAgfVxuXVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVkQWN0aW9uUHJvdmlkZXJcbiIsImNvbnN0IFRhcmdldEFjdGlvbiA9IHJlcXVpcmUoJy4vVGFyZ2V0QWN0aW9uJylcbmNvbnN0IFRyYXZlbCA9IHJlcXVpcmUoJy4uL1RyYXZlbCcpXG5cbmNsYXNzIFRyYXZlbEFjdGlvbiBleHRlbmRzIFRhcmdldEFjdGlvbiB7XG4gIHZhbGlkVGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy50cmF2ZWwudmFsaWRcbiAgfVxuXG4gIGV4ZWN1dGUgKCkge1xuICAgIHJldHVybiB0aGlzLnRyYXZlbC5zdGFydCgpXG4gIH1cbn07XG5cblRyYXZlbEFjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgdHJhdmVsOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRyYXZlbCh7XG4gICAgICAgIHRyYXZlbGxlcjogdGhpcy5hY3RvcixcbiAgICAgICAgc3RhcnRMb2NhdGlvbjogdGhpcy5hY3Rvci5sb2NhdGlvbixcbiAgICAgICAgdGFyZ2V0TG9jYXRpb246IHRoaXMudGFyZ2V0XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUcmF2ZWxBY3Rpb25cbiIsImNvbnN0IFBhdGhGaW5kZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXBhdGhmaW5kZXInKVxuY29uc3QgUGF0aFdhbGsgPSByZXF1aXJlKCcuLi9QYXRoV2FsaycpXG5jb25zdCBUYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpXG5cbmNsYXNzIFdhbGtBY3Rpb24gZXh0ZW5kcyBUYXJnZXRBY3Rpb24ge1xuICBleGVjdXRlICgpIHtcbiAgICBpZiAodGhpcy5hY3Rvci53YWxrICE9IG51bGwpIHtcbiAgICAgIHRoaXMuYWN0b3Iud2Fsay5pbnRlcnJ1cHQoKVxuICAgIH1cbiAgICB0aGlzLndhbGsgPSB0aGlzLmFjdG9yLndhbGsgPSBuZXcgUGF0aFdhbGsodGhpcy5hY3RvciwgdGhpcy5wYXRoRmluZGVyKVxuICAgIHRoaXMuYWN0b3Iud2Fsay5vbignZmluaXNoZWQnLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5maW5pc2goKVxuICAgIH0pXG4gICAgdGhpcy5hY3Rvci53YWxrLm9uKCdpbnRlcnJ1cHRlZCcsICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmludGVycnVwdCgpXG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5hY3Rvci53YWxrLnN0YXJ0KClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHN1cGVyLmRlc3Ryb3koKVxuICAgIGlmICh0aGlzLndhbGspIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsuZGVzdHJveSgpXG4gICAgfVxuICB9XG5cbiAgdmFsaWRUYXJnZXQgKCkge1xuICAgIGlmICghdGhpcy50YXJnZXQpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnBhdGhGaW5kZXIuY2FsY3VsKClcbiAgICByZXR1cm4gdGhpcy5wYXRoRmluZGVyLnNvbHV0aW9uICE9IG51bGxcbiAgfVxufTtcblxuV2Fsa0FjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgcGF0aEZpbmRlcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBQYXRoRmluZGVyKHRoaXMuYWN0b3IudGlsZS5jb250YWluZXIsIHRoaXMuYWN0b3IudGlsZSwgdGhpcy50YXJnZXQsIHtcbiAgICAgICAgdmFsaWRUaWxlOiAodGlsZSkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5hY3Rvci5jYW5Hb09uVGlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWN0b3IuY2FuR29PblRpbGUodGlsZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRpbGUud2Fsa2FibGVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdhbGtBY3Rpb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGlsZUNvbnRhaW5lciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlQ29udGFpbmVyXG5jb25zdCBUaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVcbmNvbnN0IERpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb25cbmNvbnN0IEFpcmxvY2sgPSByZXF1aXJlKCcuLi9BaXJsb2NrJylcbmNvbnN0IEZsb29yID0gcmVxdWlyZSgnLi4vRmxvb3InKVxuXG5jbGFzcyBBaXJsb2NrR2VuZXJhdG9yIGV4dGVuZHMgRWxlbWVudCB7XG4gIGdlbmVyYXRlICgpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvcygpXG4gICAgdGhpcy5zdHJ1Y3R1cmUuYWxsVGlsZXMoKS5tYXAoKHRpbGUpID0+IHtcbiAgICAgIHRpbGUgPSB0aWxlLmNvcHlBbmRSb3RhdGUodGhpcy5kaXJlY3Rpb24uYW5nbGUpXG4gICAgICB0aWxlLnggKz0gcG9zLnhcbiAgICAgIHRpbGUueSArPSBwb3MueVxuICAgICAgdGhpcy50aWxlQ29udGFpbmVyLnJlbW92ZVRpbGVBdCh0aWxlLngsIHRpbGUueSlcbiAgICAgIHRoaXMudGlsZUNvbnRhaW5lci5hZGRUaWxlKHRpbGUpXG4gICAgfSlcbiAgfVxuXG4gIGdldFBvcyAoKSB7XG4gICAgY29uc3QgZGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb25cbiAgICBjb25zdCBib3VuZGFyaWVzID0gdGhpcy50aWxlQ29udGFpbmVyLmJvdW5kYXJpZXNcbiAgICBsZXQgaSA9IDBcbiAgICB3aGlsZSAoaSA8IDIwKSB7XG4gICAgICBjb25zdCB4ID0gdGhpcy5nZXRBeGlzUG9zKGRpcmVjdGlvbi54LCBib3VuZGFyaWVzLmxlZnQsIGJvdW5kYXJpZXMucmlnaHQpXG4gICAgICBjb25zdCB5ID0gdGhpcy5nZXRBeGlzUG9zKGRpcmVjdGlvbi55LCBib3VuZGFyaWVzLnRvcCwgYm91bmRhcmllcy5ib3R0b20pXG4gICAgICBjb25zdCB0aWxlVG9UZXN0ID0gdGhpcy50aWxlQ29udGFpbmVyLmdldFRpbGUoeCArIGRpcmVjdGlvbi5nZXRJbnZlcnNlKCkueCwgeSArIGRpcmVjdGlvbi5nZXRJbnZlcnNlKCkueSlcbiAgICAgIGlmICh0aWxlVG9UZXN0ICYmIHRpbGVUb1Rlc3Qud2Fsa2FibGUpIHtcbiAgICAgICAgcmV0dXJuIHsgeDogeCwgeTogeSB9XG4gICAgICB9XG4gICAgICBpKytcbiAgICB9XG4gIH1cblxuICBnZXRBeGlzUG9zIChtb2RlLCBtaW4sIG1heCkge1xuICAgIGlmIChtb2RlID09PSAwKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLnJuZygpICogKG1heCAtIG1pbikpICsgbWluXG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAxKSB7XG4gICAgICByZXR1cm4gbWF4XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBtaW5cbiAgICB9XG4gIH1cblxuICBhaXJsb2NrRmFjdG9yeSAob3B0KSB7XG4gICAgb3B0LmRpcmVjdGlvbiA9IERpcmVjdGlvbi51cFxuICAgIHJldHVybiBuZXcgQWlybG9jayhvcHQpXG4gIH1cbn1cblxuQWlybG9ja0dlbmVyYXRvci5wcm9wZXJ0aWVzKHtcbiAgdGlsZUNvbnRhaW5lcjoge30sXG4gIGRpcmVjdGlvbjoge1xuICAgIGRlZmF1bHQ6IERpcmVjdGlvbi51cFxuICB9LFxuICBybmc6IHtcbiAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICB9LFxuICB3YWxsRmFjdG9yeToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQud2FsbEZhY3RvcnkgOiBmdW5jdGlvbiAob3B0KSB7XG4gICAgICAgIHJldHVybiBuZXcgVGlsZShvcHQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBmbG9vckZhY3Rvcnk6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LndhbGxGYWN0b3J5IDogZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICByZXR1cm4gbmV3IEZsb29yKG9wdClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHN0cnVjdHVyZToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGlsZXMgPSBuZXcgVGlsZUNvbnRhaW5lcigpXG4gICAgICBjb25zdCB3ID0gdGhpcy53YWxsRmFjdG9yeVxuICAgICAgY29uc3QgZiA9IHRoaXMuZmxvb3JGYWN0b3J5XG4gICAgICBjb25zdCBhID0gdGhpcy5haXJsb2NrRmFjdG9yeS5iaW5kKHRoaXMpXG4gICAgICB0aWxlcy5sb2FkTWF0cml4KFtcbiAgICAgICAgW3csIGEsIHddLFxuICAgICAgICBbdywgZiwgd11cbiAgICAgIF0sIHsgeDogLTEsIHk6IC0xIH0pXG4gICAgICByZXR1cm4gdGlsZXNcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQWlybG9ja0dlbmVyYXRvclxuIiwidmFyIGluZGV4T2YgPSBbXS5pbmRleE9mXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lclxuY29uc3QgVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlXG5jb25zdCBEaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uXG5jb25zdCBEb29yID0gcmVxdWlyZSgnLi4vRG9vcicpXG5cbmNsYXNzIFJvb21HZW5lcmF0b3IgZXh0ZW5kcyBFbGVtZW50IHtcbiAgaW5pdFRpbGVzICgpIHtcbiAgICB0aGlzLmZpbmFsVGlsZXMgPSBudWxsXG4gICAgdGhpcy5yb29tcyA9IFtdXG4gICAgdGhpcy5mcmVlID0gdGhpcy5wbGFuLmFsbFRpbGVzKCkuZmlsdGVyKCh0aWxlKSA9PiB7XG4gICAgICByZXR1cm4gIURpcmVjdGlvbi5hbGwuc29tZSgoZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYW4uZ2V0VGlsZSh0aWxlLnggKyBkaXJlY3Rpb24ueCwgdGlsZS55ICsgZGlyZWN0aW9uLnkpID09IG51bGxcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxuXG4gIGdlbmVyYXRlICgpIHtcbiAgICB0aGlzLmdldFRpbGVzKCkuZm9yRWFjaCgodGlsZSkgPT4ge1xuICAgICAgdGhpcy50aWxlQ29udGFpbmVyLmFkZFRpbGUodGlsZSlcbiAgICB9KVxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICB0aGlzLmluaXRUaWxlcygpXG4gICAgd2hpbGUgKHRoaXMuc3RlcCgpIHx8IHRoaXMubmV3Um9vbSgpKSB7fVxuICAgIHRoaXMuY3JlYXRlRG9vcnMoKVxuICAgIHRoaXMubWFrZUZpbmFsVGlsZXMoKVxuICB9XG5cbiAgZmxvb3JGYWN0b3J5IChvcHQpIHtcbiAgICByZXR1cm4gbmV3IFRpbGUob3B0LngsIG9wdC55KVxuICB9XG5cbiAgZG9vckZhY3RvcnkgKG9wdCkge1xuICAgIHJldHVybiB0aGlzLmZsb29yRmFjdG9yeShvcHQpXG4gIH1cblxuICBtYWtlRmluYWxUaWxlcyAoKSB7XG4gICAgdGhpcy5maW5hbFRpbGVzID0gdGhpcy5wbGFuLmFsbFRpbGVzKCkubWFwKCh0aWxlKSA9PiB7XG4gICAgICB2YXIgb3B0XG4gICAgICBpZiAodGlsZS5mYWN0b3J5ICE9IG51bGwpIHtcbiAgICAgICAgb3B0ID0ge1xuICAgICAgICAgIHg6IHRpbGUueCxcbiAgICAgICAgICB5OiB0aWxlLnlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGlsZS5mYWN0b3J5T3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgb3B0ID0gT2JqZWN0LmFzc2lnbihvcHQsIHRpbGUuZmFjdG9yeU9wdGlvbnMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGUuZmFjdG9yeShvcHQpXG4gICAgICB9XG4gICAgfSkuZmlsdGVyKCh0aWxlKSA9PiB7XG4gICAgICByZXR1cm4gdGlsZSAhPSBudWxsXG4gICAgfSlcbiAgfVxuXG4gIGdldFRpbGVzICgpIHtcbiAgICBpZiAodGhpcy5maW5hbFRpbGVzID09IG51bGwpIHtcbiAgICAgIHRoaXMuY2FsY3VsKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZmluYWxUaWxlc1xuICB9XG5cbiAgbmV3Um9vbSAoKSB7XG4gICAgaWYgKHRoaXMuZnJlZS5sZW5ndGgpIHtcbiAgICAgIHRoaXMudm9sdW1lID0gTWF0aC5mbG9vcih0aGlzLnJuZygpICogKHRoaXMubWF4Vm9sdW1lIC0gdGhpcy5taW5Wb2x1bWUpKSArIHRoaXMubWluVm9sdW1lXG4gICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbUdlbmVyYXRvci5Sb29tKClcbiAgICAgIHJldHVybiB0aGlzLnJvb21cbiAgICB9XG4gIH1cblxuICByYW5kb21EaXJlY3Rpb25zICgpIHtcbiAgICB2YXIgaSwgaiwgbywgeFxuICAgIG8gPSBEaXJlY3Rpb24uYWRqYWNlbnRzLnNsaWNlKClcbiAgICBqID0gbnVsbFxuICAgIHggPSBudWxsXG4gICAgaSA9IG8ubGVuZ3RoXG4gICAgd2hpbGUgKGkpIHtcbiAgICAgIGogPSBNYXRoLmZsb29yKHRoaXMucm5nKCkgKiBpKVxuICAgICAgeCA9IG9bLS1pXVxuICAgICAgb1tpXSA9IG9bal1cbiAgICAgIG9bal0gPSB4XG4gICAgfVxuICAgIHJldHVybiBvXG4gIH1cblxuICBzdGVwICgpIHtcbiAgICB2YXIgc3VjY2VzcywgdHJpZXNcbiAgICBpZiAodGhpcy5yb29tKSB7XG4gICAgICBpZiAodGhpcy5mcmVlLmxlbmd0aCAmJiB0aGlzLnJvb20udGlsZXMubGVuZ3RoIDwgdGhpcy52b2x1bWUgLSAxKSB7XG4gICAgICAgIGlmICh0aGlzLnJvb20udGlsZXMubGVuZ3RoKSB7XG4gICAgICAgICAgdHJpZXMgPSB0aGlzLnJhbmRvbURpcmVjdGlvbnMoKVxuICAgICAgICAgIHN1Y2Nlc3MgPSBmYWxzZVxuICAgICAgICAgIHdoaWxlICh0cmllcy5sZW5ndGggJiYgIXN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHN1Y2Nlc3MgPSB0aGlzLmV4cGFuZCh0aGlzLnJvb20sIHRyaWVzLnBvcCgpLCB0aGlzLnZvbHVtZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnJvb21Eb25lKClcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHN1Y2Nlc3NcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZSh0aGlzLnJhbmRvbUZyZWVUaWxlKCksIHRoaXMucm9vbSlcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvb21Eb25lKClcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcm9vbURvbmUgKCkge1xuICAgIHRoaXMucm9vbXMucHVzaCh0aGlzLnJvb20pXG4gICAgdGhpcy5hbGxvY2F0ZVdhbGxzKHRoaXMucm9vbSlcbiAgICB0aGlzLnJvb20gPSBudWxsXG4gIH1cblxuICBleHBhbmQgKHJvb20sIGRpcmVjdGlvbiwgbWF4ID0gMCkge1xuICAgIHJldHVybiByb29tLnRpbGVzLnNsaWNlKCkucmVkdWNlKChzdWNjZXNzLCB0aWxlKSA9PiB7XG4gICAgICBpZiAobWF4ID09PSAwIHx8IHJvb20udGlsZXMubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uKVxuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgIHRoaXMuYWxsb2NhdGVUaWxlKG5leHQsIHJvb20pXG4gICAgICAgICAgc3VjY2VzcyA9IHRydWVcbiAgICAgICAgICBjb25zdCBzZWNvbmQgPSB0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uLCAyKVxuICAgICAgICAgIGlmIChzZWNvbmQgJiYgIXRoaXMudGlsZU9mZnNldElzRnJlZSh0aWxlLCBkaXJlY3Rpb24sIDMpKSB7XG4gICAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZShzZWNvbmQsIHJvb20pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3VjY2Vzc1xuICAgIH0sIGZhbHNlKVxuICB9XG5cbiAgYWxsb2NhdGVXYWxscyAocm9vbSkge1xuICAgIHZhciBkaXJlY3Rpb24sIGssIGxlbiwgbmV4dCwgbmV4dFJvb20sIG90aGVyU2lkZSwgcmVmLCByZXN1bHRzLCB0aWxlXG4gICAgcmVmID0gcm9vbS50aWxlc1xuICAgIHJlc3VsdHMgPSBbXVxuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgdGlsZSA9IHJlZltrXVxuICAgICAgcmVzdWx0cy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGwsIGxlbjEsIHJlZjEsIHJlc3VsdHMxXG4gICAgICAgIHJlZjEgPSBEaXJlY3Rpb24uYWxsXG4gICAgICAgIHJlc3VsdHMxID0gW11cbiAgICAgICAgZm9yIChsID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBsIDwgbGVuMTsgbCsrKSB7XG4gICAgICAgICAgZGlyZWN0aW9uID0gcmVmMVtsXVxuICAgICAgICAgIG5leHQgPSB0aGlzLnBsYW4uZ2V0VGlsZSh0aWxlLnggKyBkaXJlY3Rpb24ueCwgdGlsZS55ICsgZGlyZWN0aW9uLnkpXG4gICAgICAgICAgaWYgKChuZXh0ICE9IG51bGwpICYmIG5leHQucm9vbSAhPT0gcm9vbSkge1xuICAgICAgICAgICAgaWYgKGluZGV4T2YuY2FsbChEaXJlY3Rpb24uY29ybmVycywgZGlyZWN0aW9uKSA8IDApIHtcbiAgICAgICAgICAgICAgb3RoZXJTaWRlID0gdGhpcy5wbGFuLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLnggKiAyLCB0aWxlLnkgKyBkaXJlY3Rpb24ueSAqIDIpXG4gICAgICAgICAgICAgIG5leHRSb29tID0gKG90aGVyU2lkZSAhPSBudWxsID8gb3RoZXJTaWRlLnJvb20gOiBudWxsKSAhPSBudWxsID8gb3RoZXJTaWRlLnJvb20gOiBudWxsXG4gICAgICAgICAgICAgIHJvb20uYWRkV2FsbChuZXh0LCBuZXh0Um9vbSlcbiAgICAgICAgICAgICAgaWYgKG5leHRSb29tICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBuZXh0Um9vbS5hZGRXYWxsKG5leHQsIHJvb20pXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLndhbGxGYWN0b3J5KSB7XG4gICAgICAgICAgICAgIG5leHQuZmFjdG9yeSA9IChvcHQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53YWxsRmFjdG9yeShvcHQpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV4dC5mYWN0b3J5LmJhc2UgPSB0aGlzLndhbGxGYWN0b3J5XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKHRoaXMuYWxsb2NhdGVUaWxlKG5leHQpKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzMVxuICAgICAgfS5jYWxsKHRoaXMpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0c1xuICB9XG5cbiAgY3JlYXRlRG9vcnMgKCkge1xuICAgIHZhciBhZGphY2VudCwgZG9vciwgaywgbGVuLCByZWYsIHJlc3VsdHMsIHJvb20sIHdhbGxzXG4gICAgcmVmID0gdGhpcy5yb29tc1xuICAgIHJlc3VsdHMgPSBbXVxuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgcm9vbSA9IHJlZltrXVxuICAgICAgcmVzdWx0cy5wdXNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGwsIGxlbjEsIHJlZjEsIHJlc3VsdHMxXG4gICAgICAgIHJlZjEgPSByb29tLndhbGxzQnlSb29tcygpXG4gICAgICAgIHJlc3VsdHMxID0gW11cbiAgICAgICAgZm9yIChsID0gMCwgbGVuMSA9IHJlZjEubGVuZ3RoOyBsIDwgbGVuMTsgbCsrKSB7XG4gICAgICAgICAgd2FsbHMgPSByZWYxW2xdXG4gICAgICAgICAgaWYgKCh3YWxscy5yb29tICE9IG51bGwpICYmIHJvb20uZG9vcnNGb3JSb29tKHdhbGxzLnJvb20pIDwgMSkge1xuICAgICAgICAgICAgZG9vciA9IHdhbGxzLnRpbGVzW01hdGguZmxvb3IodGhpcy5ybmcoKSAqIHdhbGxzLnRpbGVzLmxlbmd0aCldXG4gICAgICAgICAgICBkb29yLmZhY3RvcnkgPSAob3B0KSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmRvb3JGYWN0b3J5KG9wdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvb3IuZmFjdG9yeS5iYXNlID0gdGhpcy5kb29yRmFjdG9yeVxuICAgICAgICAgICAgYWRqYWNlbnQgPSB0aGlzLnBsYW4uZ2V0VGlsZShkb29yLnggKyAxLCBkb29yLnkpXG4gICAgICAgICAgICBkb29yLmZhY3RvcnlPcHRpb25zID0ge1xuICAgICAgICAgICAgICBkaXJlY3Rpb246IGFkamFjZW50LmZhY3RvcnkgJiYgYWRqYWNlbnQuZmFjdG9yeS5iYXNlID09PSB0aGlzLmZsb29yRmFjdG9yeSA/IERvb3IuZGlyZWN0aW9ucy52ZXJ0aWNhbCA6IERvb3IuZGlyZWN0aW9ucy5ob3Jpem9udGFsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb29tLmFkZERvb3IoZG9vciwgd2FsbHMucm9vbSlcbiAgICAgICAgICAgIHJlc3VsdHMxLnB1c2god2FsbHMucm9vbS5hZGREb29yKGRvb3IsIHJvb20pKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzMVxuICAgICAgfS5jYWxsKHRoaXMpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0c1xuICB9XG5cbiAgYWxsb2NhdGVUaWxlICh0aWxlLCByb29tID0gbnVsbCkge1xuICAgIHZhciBpbmRleFxuICAgIGlmIChyb29tICE9IG51bGwpIHtcbiAgICAgIHJvb20uYWRkVGlsZSh0aWxlKVxuICAgICAgdGlsZS5mYWN0b3J5ID0gKG9wdCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5mbG9vckZhY3Rvcnkob3B0KVxuICAgICAgfVxuICAgICAgdGlsZS5mYWN0b3J5LmJhc2UgPSB0aGlzLmZsb29yRmFjdG9yeVxuICAgIH1cbiAgICBpbmRleCA9IHRoaXMuZnJlZS5pbmRleE9mKHRpbGUpXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHJldHVybiB0aGlzLmZyZWUuc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgfVxuXG4gIHRpbGVPZmZzZXRJc0ZyZWUgKHRpbGUsIGRpcmVjdGlvbiwgbXVsdGlwbHkgPSAxKSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZUlzRnJlZSh0aWxlLnggKyBkaXJlY3Rpb24ueCAqIG11bHRpcGx5LCB0aWxlLnkgKyBkaXJlY3Rpb24ueSAqIG11bHRpcGx5KVxuICB9XG5cbiAgdGlsZUlzRnJlZSAoeCwgeSkge1xuICAgIHZhciB0aWxlXG4gICAgdGlsZSA9IHRoaXMucGxhbi5nZXRUaWxlKHgsIHkpXG4gICAgaWYgKCh0aWxlICE9IG51bGwpICYmIGluZGV4T2YuY2FsbCh0aGlzLmZyZWUsIHRpbGUpID49IDApIHtcbiAgICAgIHJldHVybiB0aWxlXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuXG4gIHJhbmRvbUZyZWVUaWxlICgpIHtcbiAgICByZXR1cm4gdGhpcy5mcmVlW01hdGguZmxvb3IodGhpcy5ybmcoKSAqIHRoaXMuZnJlZS5sZW5ndGgpXVxuICB9XG59O1xuXG5Sb29tR2VuZXJhdG9yLnByb3BlcnRpZXMoe1xuICB0aWxlQ29udGFpbmVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRpbGVDb250YWluZXIoKVxuICAgIH1cbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfSxcbiAgbWF4Vm9sdW1lOiB7XG4gICAgZGVmYXVsdDogMjVcbiAgfSxcbiAgbWluVm9sdW1lOiB7XG4gICAgZGVmYXVsdDogNTBcbiAgfSxcbiAgd2lkdGg6IHtcbiAgICBkZWZhdWx0OiAzMFxuICB9LFxuICBoZWlnaHQ6IHtcbiAgICBkZWZhdWx0OiAxNVxuICB9LFxuICBwbGFuOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCB0aWxlcyA9IG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgIHRpbGVzLmFkZFRpbGUobmV3IFRpbGUoeCwgeSkpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aWxlc1xuICAgIH1cbiAgfVxufSlcblxuUm9vbUdlbmVyYXRvci5Sb29tID0gY2xhc3MgUm9vbSB7XG4gIGNvbnN0cnVjdG9yICgpIHtcbiAgICB0aGlzLnRpbGVzID0gW11cbiAgICB0aGlzLndhbGxzID0gW11cbiAgICB0aGlzLmRvb3JzID0gW11cbiAgfVxuXG4gIGFkZFRpbGUgKHRpbGUpIHtcbiAgICB0aGlzLnRpbGVzLnB1c2godGlsZSlcbiAgICB0aWxlLnJvb20gPSB0aGlzXG4gIH1cblxuICBjb250YWluc1dhbGwgKHRpbGUpIHtcbiAgICB2YXIgaywgbGVuLCByZWYsIHdhbGxcbiAgICByZWYgPSB0aGlzLndhbGxzXG4gICAgZm9yIChrID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgayA8IGxlbjsgaysrKSB7XG4gICAgICB3YWxsID0gcmVmW2tdXG4gICAgICBpZiAod2FsbC50aWxlID09PSB0aWxlKSB7XG4gICAgICAgIHJldHVybiB3YWxsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgYWRkV2FsbCAodGlsZSwgbmV4dFJvb20pIHtcbiAgICB2YXIgZXhpc3RpbmdcbiAgICBleGlzdGluZyA9IHRoaXMuY29udGFpbnNXYWxsKHRpbGUpXG4gICAgaWYgKGV4aXN0aW5nKSB7XG4gICAgICBleGlzdGluZy5uZXh0Um9vbSA9IG5leHRSb29tXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMud2FsbHMucHVzaCh7XG4gICAgICAgIHRpbGU6IHRpbGUsXG4gICAgICAgIG5leHRSb29tOiBuZXh0Um9vbVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICB3YWxsc0J5Um9vbXMgKCkge1xuICAgIHZhciBrLCBsZW4sIHBvcywgcmVmLCByZXMsIHJvb21zLCB3YWxsXG4gICAgcm9vbXMgPSBbXVxuICAgIHJlcyA9IFtdXG4gICAgcmVmID0gdGhpcy53YWxsc1xuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgd2FsbCA9IHJlZltrXVxuICAgICAgcG9zID0gcm9vbXMuaW5kZXhPZih3YWxsLm5leHRSb29tKVxuICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgcG9zID0gcm9vbXMubGVuZ3RoXG4gICAgICAgIHJvb21zLnB1c2god2FsbC5uZXh0Um9vbSlcbiAgICAgICAgcmVzLnB1c2goe1xuICAgICAgICAgIHJvb206IHdhbGwubmV4dFJvb20sXG4gICAgICAgICAgdGlsZXM6IFtdXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICByZXNbcG9zXS50aWxlcy5wdXNoKHdhbGwudGlsZSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc1xuICB9XG5cbiAgYWRkRG9vciAodGlsZSwgbmV4dFJvb20pIHtcbiAgICByZXR1cm4gdGhpcy5kb29ycy5wdXNoKHtcbiAgICAgIHRpbGU6IHRpbGUsXG4gICAgICBuZXh0Um9vbTogbmV4dFJvb21cbiAgICB9KVxuICB9XG5cbiAgZG9vcnNGb3JSb29tIChyb29tKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9vcnNcbiAgICAgIC5maWx0ZXIoKGRvb3IpID0+IGRvb3IubmV4dFJvb20gPT09IHJvb20pXG4gICAgICAubWFwKChkb29yKSA9PiBkb29yLnRpbGUpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSb29tR2VuZXJhdG9yXG4iLCJjb25zdCBUaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVcbmNvbnN0IFJvb21HZW5lcmF0b3IgPSByZXF1aXJlKCcuL1Jvb21HZW5lcmF0b3InKVxuY29uc3QgQWlybG9ja0dlbmVyYXRvciA9IHJlcXVpcmUoJy4vQWlybG9ja0dlbmVyYXRvcicpXG5jb25zdCBGbG9vciA9IHJlcXVpcmUoJy4uL0Zsb29yJylcbmNvbnN0IERvb3IgPSByZXF1aXJlKCcuLi9BdXRvbWF0aWNEb29yJylcbmNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvblxuXG5jbGFzcyBTaGlwSW50ZXJpb3JHZW5lcmF0b3IgZXh0ZW5kcyBFbGVtZW50IHtcbiAgZ2VuZXJhdGUgKCkge1xuICAgIHRoaXMucm9vbUdlbmVyYXRvci5nZW5lcmF0ZSgpXG5cbiAgICB0aGlzLmFpcmxvY2tHZW5lcmF0b3JzLmZvckVhY2goKGFpcmxvY2tHZW4pID0+IHtcbiAgICAgIGFpcmxvY2tHZW4uZ2VuZXJhdGUoKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGhpcy5zaGlwSW50ZXJpb3JcbiAgfVxuXG4gIHdhbGxGYWN0b3J5IChvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBUaWxlKG9wdC54LCBvcHQueSkpLnRhcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLndhbGthYmxlID0gZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgZmxvb3JGYWN0b3J5IChvcHQpIHtcbiAgICByZXR1cm4gbmV3IEZsb29yKG9wdC54LCBvcHQueSlcbiAgfVxuXG4gIGRvb3JGYWN0b3J5IChvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBGbG9vcihvcHQueCwgb3B0LnkpKS50YXAoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5hZGRDaGlsZChuZXcgRG9vcih7XG4gICAgICAgIGRpcmVjdGlvbjogb3B0LmRpcmVjdGlvblxuICAgICAgfSkpXG4gICAgfSlcbiAgfVxufVxuXG5TaGlwSW50ZXJpb3JHZW5lcmF0b3IucHJvcGVydGllcyh7XG4gIHNoaXBJbnRlcmlvcjoge1xuICB9LFxuICBybmc6IHtcbiAgICBkZWZhdWx0OiBNYXRoLnJhbmRvbVxuICB9LFxuICByb29tR2VuZXJhdG9yOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCByb29tR2VuID0gbmV3IFJvb21HZW5lcmF0b3Ioe1xuICAgICAgICB0aWxlQ29udGFpbmVyOiB0aGlzLnNoaXBJbnRlcmlvcixcbiAgICAgICAgcm5nOiB0aGlzLnJuZ1xuICAgICAgfSlcbiAgICAgIHJvb21HZW4ud2FsbEZhY3RvcnkgPSB0aGlzLndhbGxGYWN0b3J5XG4gICAgICByb29tR2VuLmZsb29yRmFjdG9yeSA9IHRoaXMuZmxvb3JGYWN0b3J5XG4gICAgICByb29tR2VuLmRvb3JGYWN0b3J5ID0gdGhpcy5kb29yRmFjdG9yeVxuICAgICAgcmV0dXJuIHJvb21HZW5cbiAgICB9XG4gIH0sXG4gIGFpcmxvY2tHZW5lcmF0b3JzOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICBuZXcgQWlybG9ja0dlbmVyYXRvcih7XG4gICAgICAgICAgdGlsZUNvbnRhaW5lcjogdGhpcy5zaGlwSW50ZXJpb3IsXG4gICAgICAgICAgcm5nOiB0aGlzLnJuZyxcbiAgICAgICAgICBkaXJlY3Rpb246IERpcmVjdGlvbi51cFxuICAgICAgICB9KSxcbiAgICAgICAgbmV3IEFpcmxvY2tHZW5lcmF0b3Ioe1xuICAgICAgICAgIHRpbGVDb250YWluZXI6IHRoaXMuc2hpcEludGVyaW9yLFxuICAgICAgICAgIHJuZzogdGhpcy5ybmcsXG4gICAgICAgICAgZGlyZWN0aW9uOiBEaXJlY3Rpb24uZG93blxuICAgICAgICB9KVxuICAgICAgXVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwSW50ZXJpb3JHZW5lcmF0b3JcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgTWFwID0gcmVxdWlyZSgnLi4vTWFwJylcbmNvbnN0IFN0YXJTeXN0ZW0gPSByZXF1aXJlKCcuLi9TdGFyU3lzdGVtJylcbmNvbnN0IHN0YXJOYW1lcyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tc3RyaW5ncycpLnN0YXJOYW1lc1xuXG5jbGFzcyBTdGFyTWFwR2VuZXJhdG9yIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMub3B0ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZPcHQsIG9wdGlvbnMpXG4gIH1cblxuICBnZW5lcmF0ZSAoKSB7XG4gICAgY29uc3QgTWFwQ2xhc3MgPSB0aGlzLm9wdC5tYXBDbGFzc1xuICAgIHRoaXMubWFwID0gbmV3IE1hcENsYXNzKClcbiAgICB0aGlzLnN0YXJzID0gdGhpcy5tYXAubG9jYXRpb25zLmNvcHkoKVxuICAgIHRoaXMubGlua3MgPSBbXVxuICAgIHRoaXMuY3JlYXRlU3RhcnModGhpcy5vcHQubmJTdGFycylcbiAgICB0aGlzLm1ha2VMaW5rcygpXG4gICAgcmV0dXJuIHRoaXMubWFwXG4gIH1cblxuICBjcmVhdGVTdGFycyAobmIpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShBcnJheShuYiksICgpID0+IHRoaXMuY3JlYXRlU3RhcigpKVxuICB9XG5cbiAgY3JlYXRlU3RhciAob3B0ID0ge30pIHtcbiAgICB2YXIgbmFtZSwgcG9zLCBzdGFyXG4gICAgaWYgKCEob3B0LnggJiYgb3B0LnkpKSB7XG4gICAgICBwb3MgPSB0aGlzLnJhbmRvbVN0YXJQb3MoKVxuICAgICAgaWYgKHBvcyAhPSBudWxsKSB7XG4gICAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdCwge1xuICAgICAgICAgIHg6IHBvcy54LFxuICAgICAgICAgIHk6IHBvcy55XG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW9wdC5uYW1lKSB7XG4gICAgICBuYW1lID0gdGhpcy5yYW5kb21TdGFyTmFtZSgpXG4gICAgICBpZiAobmFtZSAhPSBudWxsKSB7XG4gICAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIG9wdCwge1xuICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFN0YXJDbGFzcyA9IHRoaXMub3B0LnN0YXJDbGFzc1xuICAgIHN0YXIgPSBuZXcgU3RhckNsYXNzKG9wdClcbiAgICB0aGlzLm1hcC5sb2NhdGlvbnMucHVzaChzdGFyKVxuICAgIHRoaXMuc3RhcnMucHVzaChzdGFyKVxuICAgIHJldHVybiBzdGFyXG4gIH1cblxuICByYW5kb21TdGFyUG9zICgpIHtcbiAgICB2YXIgaiwgcG9zXG4gICAgaiA9IDBcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgcG9zID0ge1xuICAgICAgICB4OiBNYXRoLmZsb29yKHRoaXMub3B0LnJuZygpICogKHRoaXMub3B0Lm1heFggLSB0aGlzLm9wdC5taW5YKSArIHRoaXMub3B0Lm1pblgpLFxuICAgICAgICB5OiBNYXRoLmZsb29yKHRoaXMub3B0LnJuZygpICogKHRoaXMub3B0Lm1heFkgLSB0aGlzLm9wdC5taW5ZKSArIHRoaXMub3B0Lm1pblkpXG4gICAgICB9XG4gICAgICBpZiAoIShqIDwgMTAgJiYgdGhpcy5zdGFycy5maW5kKChzdGFyKSA9PiB7XG4gICAgICAgIHJldHVybiBzdGFyLmRpc3QocG9zLngsIHBvcy55KSA8PSB0aGlzLm9wdC5taW5TdGFyRGlzdFxuICAgICAgfSkpKSB7XG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgICBqKytcbiAgICB9XG4gICAgaWYgKCEoaiA+PSAxMCkpIHtcbiAgICAgIHJldHVybiBwb3NcbiAgICB9XG4gIH1cblxuICByYW5kb21TdGFyTmFtZSAoKSB7XG4gICAgdmFyIG5hbWUsIHBvcywgcmVmXG4gICAgaWYgKChyZWYgPSB0aGlzLm9wdC5zdGFyTmFtZXMpICE9IG51bGwgPyByZWYubGVuZ3RoIDogbnVsbCkge1xuICAgICAgcG9zID0gTWF0aC5mbG9vcih0aGlzLm9wdC5ybmcoKSAqIHRoaXMub3B0LnN0YXJOYW1lcy5sZW5ndGgpXG4gICAgICBuYW1lID0gdGhpcy5vcHQuc3Rhck5hbWVzW3Bvc11cbiAgICAgIHRoaXMub3B0LnN0YXJOYW1lcy5zcGxpY2UocG9zLCAxKVxuICAgICAgcmV0dXJuIG5hbWVcbiAgICB9XG4gIH1cblxuICBtYWtlTGlua3MgKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJzLmZvckVhY2goKHN0YXIpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm1ha2VMaW5rc0Zyb20oc3RhcilcbiAgICB9KVxuICB9XG5cbiAgbWFrZUxpbmtzRnJvbSAoc3Rhcikge1xuICAgIHZhciBjbG9zZSwgY2xvc2VzdHMsIGxpbmssIG5lZWRlZCwgcmVzdWx0cywgdHJpZXNcbiAgICB0cmllcyA9IHRoaXMub3B0LmxpbmtUcmllc1xuICAgIG5lZWRlZCA9IHRoaXMub3B0LmxpbmtzQnlTdGFycyAtIHN0YXIubGlua3MuY291bnQoKVxuICAgIGlmIChuZWVkZWQgPiAwKSB7XG4gICAgICBjbG9zZXN0cyA9IHRoaXMuc3RhcnMuZmlsdGVyKChzdGFyMikgPT4ge1xuICAgICAgICByZXR1cm4gc3RhcjIgIT09IHN0YXIgJiYgIXN0YXIubGlua3MuZmluZFN0YXIoc3RhcjIpXG4gICAgICB9KS5jbG9zZXN0cyhzdGFyLngsIHN0YXIueSlcbiAgICAgIGlmIChjbG9zZXN0cy5jb3VudCgpID4gMCkge1xuICAgICAgICByZXN1bHRzID0gW11cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICBjbG9zZSA9IGNsb3Nlc3RzLnNoaWZ0KClcbiAgICAgICAgICBsaW5rID0gdGhpcy5jcmVhdGVMaW5rKHN0YXIsIGNsb3NlKVxuICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlTGluayhsaW5rKSkge1xuICAgICAgICAgICAgdGhpcy5saW5rcy5wdXNoKGxpbmspXG4gICAgICAgICAgICBzdGFyLmFkZExpbmsobGluaylcbiAgICAgICAgICAgIG5lZWRlZCAtPSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyaWVzIC09IDFcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEobmVlZGVkID4gMCAmJiB0cmllcyA+IDAgJiYgY2xvc2VzdHMuY291bnQoKSA+IDApKSB7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHRzLnB1c2gobnVsbClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHNcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjcmVhdGVMaW5rIChzdGFyMSwgc3RhcjIpIHtcbiAgICBjb25zdCBMaW5rQ2xhc3MgPSB0aGlzLm9wdC5saW5rQ2xhc3NcbiAgICByZXR1cm4gbmV3IExpbmtDbGFzcyhzdGFyMSwgc3RhcjIpXG4gIH1cblxuICB2YWxpZGF0ZUxpbmsgKGxpbmspIHtcbiAgICByZXR1cm4gIXRoaXMuc3RhcnMuZmluZCgoc3RhcikgPT4ge1xuICAgICAgcmV0dXJuIHN0YXIgIT09IGxpbmsuc3RhcjEgJiYgc3RhciAhPT0gbGluay5zdGFyMiAmJiBsaW5rLmNsb3NlVG9Qb2ludChzdGFyLngsIHN0YXIueSwgdGhpcy5vcHQubWluTGlua0Rpc3QpXG4gICAgfSkgJiYgIXRoaXMubGlua3MuZmluZCgobGluazIpID0+IHtcbiAgICAgIHJldHVybiBsaW5rMi5pbnRlcnNlY3RMaW5rKGxpbmspXG4gICAgfSlcbiAgfVxufTtcblxuU3Rhck1hcEdlbmVyYXRvci5wcm90b3R5cGUuZGVmT3B0ID0ge1xuICBuYlN0YXJzOiAyMCxcbiAgbWluWDogMCxcbiAgbWF4WDogNTAwLFxuICBtaW5ZOiAwLFxuICBtYXhZOiA1MDAsXG4gIG1pblN0YXJEaXN0OiAyMCxcbiAgbWluTGlua0Rpc3Q6IDIwLFxuICBsaW5rc0J5U3RhcnM6IDMsXG4gIGxpbmtUcmllczogMyxcbiAgbWFwQ2xhc3M6IE1hcCxcbiAgc3RhckNsYXNzOiBTdGFyU3lzdGVtLFxuICBsaW5rQ2xhc3M6IFN0YXJTeXN0ZW0uTGluayxcbiAgcm5nOiBNYXRoLnJhbmRvbSxcbiAgc3Rhck5hbWVzOiBzdGFyTmFtZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTdGFyTWFwR2VuZXJhdG9yXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJBaXJsb2NrXCI6IHJlcXVpcmUoXCIuL0FpcmxvY2tcIiksXG4gIFwiQXBwcm9hY2hcIjogcmVxdWlyZShcIi4vQXBwcm9hY2hcIiksXG4gIFwiQXV0b21hdGljRG9vclwiOiByZXF1aXJlKFwiLi9BdXRvbWF0aWNEb29yXCIpLFxuICBcIkNoYXJhY3RlclwiOiByZXF1aXJlKFwiLi9DaGFyYWN0ZXJcIiksXG4gIFwiQ2hhcmFjdGVyQUlcIjogcmVxdWlyZShcIi4vQ2hhcmFjdGVyQUlcIiksXG4gIFwiQ29uZnJvbnRhdGlvblwiOiByZXF1aXJlKFwiLi9Db25mcm9udGF0aW9uXCIpLFxuICBcIkRhbWFnZWFibGVcIjogcmVxdWlyZShcIi4vRGFtYWdlYWJsZVwiKSxcbiAgXCJEYW1hZ2VQcm9wYWdhdGlvblwiOiByZXF1aXJlKFwiLi9EYW1hZ2VQcm9wYWdhdGlvblwiKSxcbiAgXCJEb29yXCI6IHJlcXVpcmUoXCIuL0Rvb3JcIiksXG4gIFwiRWxlbWVudFwiOiByZXF1aXJlKFwiLi9FbGVtZW50XCIpLFxuICBcIkVuY291bnRlck1hbmFnZXJcIjogcmVxdWlyZShcIi4vRW5jb3VudGVyTWFuYWdlclwiKSxcbiAgXCJGbG9vclwiOiByZXF1aXJlKFwiLi9GbG9vclwiKSxcbiAgXCJHYW1lXCI6IHJlcXVpcmUoXCIuL0dhbWVcIiksXG4gIFwiSW52ZW50b3J5XCI6IHJlcXVpcmUoXCIuL0ludmVudG9yeVwiKSxcbiAgXCJMaW5lT2ZTaWdodFwiOiByZXF1aXJlKFwiLi9MaW5lT2ZTaWdodFwiKSxcbiAgXCJNYXBcIjogcmVxdWlyZShcIi4vTWFwXCIpLFxuICBcIk9ic3RhY2xlXCI6IHJlcXVpcmUoXCIuL09ic3RhY2xlXCIpLFxuICBcIlBhdGhXYWxrXCI6IHJlcXVpcmUoXCIuL1BhdGhXYWxrXCIpLFxuICBcIlBlcnNvbmFsV2VhcG9uXCI6IHJlcXVpcmUoXCIuL1BlcnNvbmFsV2VhcG9uXCIpLFxuICBcIlBsYXllclwiOiByZXF1aXJlKFwiLi9QbGF5ZXJcIiksXG4gIFwiUHJvamVjdGlsZVwiOiByZXF1aXJlKFwiLi9Qcm9qZWN0aWxlXCIpLFxuICBcIlJlc3NvdXJjZVwiOiByZXF1aXJlKFwiLi9SZXNzb3VyY2VcIiksXG4gIFwiUmVzc291cmNlVHlwZVwiOiByZXF1aXJlKFwiLi9SZXNzb3VyY2VUeXBlXCIpLFxuICBcIlNoaXBcIjogcmVxdWlyZShcIi4vU2hpcFwiKSxcbiAgXCJTaGlwSW50ZXJpb3JcIjogcmVxdWlyZShcIi4vU2hpcEludGVyaW9yXCIpLFxuICBcIlNoaXBXZWFwb25cIjogcmVxdWlyZShcIi4vU2hpcFdlYXBvblwiKSxcbiAgXCJTdGFyU3lzdGVtXCI6IHJlcXVpcmUoXCIuL1N0YXJTeXN0ZW1cIiksXG4gIFwiVHJhdmVsXCI6IHJlcXVpcmUoXCIuL1RyYXZlbFwiKSxcbiAgXCJWaWV3XCI6IHJlcXVpcmUoXCIuL1ZpZXdcIiksXG4gIFwiVmlzaW9uQ2FsY3VsYXRvclwiOiByZXF1aXJlKFwiLi9WaXNpb25DYWxjdWxhdG9yXCIpLFxuICBcImFjdGlvbnNcIjoge1xuICAgIFwiQWN0aW9uXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvQWN0aW9uXCIpLFxuICAgIFwiQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9BY3Rpb25Qcm92aWRlclwiKSxcbiAgICBcIkF0dGFja0FjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL0F0dGFja0FjdGlvblwiKSxcbiAgICBcIkF0dGFja01vdmVBY3Rpb25cIjogcmVxdWlyZShcIi4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uXCIpLFxuICAgIFwiU2ltcGxlQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9TaW1wbGVBY3Rpb25Qcm92aWRlclwiKSxcbiAgICBcIlRhcmdldEFjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL1RhcmdldEFjdGlvblwiKSxcbiAgICBcIlRpbGVkQWN0aW9uUHJvdmlkZXJcIjogcmVxdWlyZShcIi4vYWN0aW9ucy9UaWxlZEFjdGlvblByb3ZpZGVyXCIpLFxuICAgIFwiVHJhdmVsQWN0aW9uXCI6IHJlcXVpcmUoXCIuL2FjdGlvbnMvVHJhdmVsQWN0aW9uXCIpLFxuICAgIFwiV2Fsa0FjdGlvblwiOiByZXF1aXJlKFwiLi9hY3Rpb25zL1dhbGtBY3Rpb25cIiksXG4gIH0sXG4gIFwiZ2VuZXJhdG9yc1wiOiB7XG4gICAgXCJBaXJsb2NrR2VuZXJhdG9yXCI6IHJlcXVpcmUoXCIuL2dlbmVyYXRvcnMvQWlybG9ja0dlbmVyYXRvclwiKSxcbiAgICBcIlJvb21HZW5lcmF0b3JcIjogcmVxdWlyZShcIi4vZ2VuZXJhdG9ycy9Sb29tR2VuZXJhdG9yXCIpLFxuICAgIFwiU2hpcEludGVyaW9yR2VuZXJhdG9yXCI6IHJlcXVpcmUoXCIuL2dlbmVyYXRvcnMvU2hpcEludGVyaW9yR2VuZXJhdG9yXCIpLFxuICAgIFwiU3Rhck1hcEdlbmVyYXRvclwiOiByZXF1aXJlKFwiLi9nZW5lcmF0b3JzL1N0YXJNYXBHZW5lcmF0b3JcIiksXG4gIH0sXG4gIFwic2F2ZUVuZ2luZXNcIjoge1xuICAgIFwiTG9hZGVyQ29sbGVjdGlvblwiOiByZXF1aXJlKFwiLi9zYXZlRW5naW5lcy9Mb2FkZXJDb2xsZWN0aW9uXCIpLFxuICAgIFwiU2ltcGxlTG9hZGVyXCI6IHJlcXVpcmUoXCIuL3NhdmVFbmdpbmVzL1NpbXBsZUxvYWRlclwiKSxcbiAgICBcIlNpbXBsZVNhdmFibGVcIjogcmVxdWlyZShcIi4vc2F2ZUVuZ2luZXMvU2ltcGxlU2F2YWJsZVwiKSxcbiAgfSxcbn0iLCJjb25zdCBsaWJzID0gcmVxdWlyZSgnLi9saWJzJylcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBsaWJzLCB7XG4gIGdyaWRzOiByZXF1aXJlKCdwYXJhbGxlbGlvLWdyaWRzJyksXG4gIFBhdGhGaW5kZXI6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tcGF0aGZpbmRlcicpLFxuICBzdHJpbmdzOiByZXF1aXJlKCdwYXJhbGxlbGlvLXN0cmluZ3MnKSxcbiAgdGlsZXM6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKSxcbiAgVGltaW5nOiByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpLFxuICB3aXJpbmc6IHJlcXVpcmUoJ3BhcmFsbGVsaW8td2lyaW5nJyksXG4gIFNwYXJrOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJylcbn0pXG4iLCJjb25zdCBDb2xsZWN0aW9uID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkNvbGxlY3Rpb25cclxuXHJcbmNsYXNzIExvYWRlckNvbGxlY3Rpb24gZXh0ZW5kcyBDb2xsZWN0aW9uIHtcclxuICBsb2FkIChkYXRhKSB7XHJcbiAgICByZXR1cm4gZGF0YS5tYXAoZWxlbSA9PiB7XHJcbiAgICAgIGNvbnN0IGxvYWRlciA9IHRoaXMubG9hZGVycy5maW5kKGwgPT4gbC5tYXRjaChlbGVtKSlcclxuICAgICAgaWYgKGxvYWRlcikge1xyXG4gICAgICAgIGxvYWRlci5sb2FkKGVsZW0pXHJcbiAgICAgIH1cclxuICAgIH0pXHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlckNvbGxlY3Rpb25cclxuIiwiXG5jbGFzcyBTaW1wbGVMb2FkZXIge1xuICBjb25zdHJ1Y3RvciAoY29uc3RydWN0LCBhbGlhcyA9IG51bGwpIHtcbiAgICB0aGlzLmNvbnN0cnVjdCA9IGNvbnN0cnVjdFxuICAgIHRoaXMuYWxpYXMgPSBhbGlhcyB8fCBjb25zdHJ1Y3QubmFtZVxuICB9XG5cbiAgcmVnaXN0ZXIgKGdhbWUpIHtcbiAgICBnYW1lLmxvYWRlcnMuYWRkKHRoaXMpXG4gIH1cblxuICBtYXRjaCAoZGF0YSkge1xuICAgIHJldHVybiBkYXRhLnR5cGVBbGlhcyA9PT0gdGhpcy5hbGlhc1xuICB9XG5cbiAgbG9hZCAoZGF0YSkge1xuICAgIGNvbnN0IENvbnN0cnVjdCA9IHRoaXMuY29uc3RydWN0XG4gICAgcmV0dXJuIG5ldyBDb25zdHJ1Y3QoZGF0YSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZUxvYWRlclxuIiwiXG5jb25zdCBTaW1wbGVMb2FkZXIgPSByZXF1aXJlKCcuL1NpbXBsZUxvYWRlcicpXG5cbmNsYXNzIFNpbXBsZVNhdmFibGUge1xuICBjb25zdHJ1Y3RvciAob2JqLCBhbGlhcyA9IG51bGwsIGxvYWRlciA9IG51bGwpIHtcbiAgICB0aGlzLm9iaiA9IG9ialxuICAgIHRoaXMuYWxpYXMgPSBhbGlhcyB8fCBvYmouY29uc3RydWN0b3IubmFtZVxuICAgIHRoaXMubG9hZGVyID0gbG9hZGVyXG4gIH1cblxuICBtYWtlRGVmYXVsdExvYWRlciAoKSB7XG4gICAgaWYgKCF0aGlzLm9iai5jb25zdHJ1Y3Rvci5sb2FkZXIpIHtcbiAgICAgIHRoaXMub2JqLmNvbnN0cnVjdG9yLmxvYWRlciA9IG5ldyBTaW1wbGVMb2FkZXIodGhpcy5vYmouY29uc3RydWN0b3IsIHRoaXMuYWxpYXMpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm9iai5jb25zdHJ1Y3Rvci5sb2FkZXJcbiAgfVxuXG4gIHJlZ2lzdGVyIChnYW1lKSB7XG4gICAgaWYgKCF0aGlzLmxvYWRlcikge1xuICAgICAgdGhpcy5sb2FkZXIgPSB0aGlzLm1ha2VEZWZhdWx0TG9hZGVyKClcbiAgICB9XG4gICAgdGhpcy5sb2FkZXIucmVnaXN0ZXIoZ2FtZSlcbiAgICBnYW1lLnNhdmFibGVzLmFkZCh0aGlzKVxuICB9XG5cbiAgZ2V0UmF3RGF0YSAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9iai5nZXRTYXZlRGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMub2JqLmdldFNhdmVEYXRhKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMub2JqLnByb3BlcnRpZXNNYW5hZ2VyLmdldE1hbnVhbERhdGFQcm9wZXJ0aWVzKClcbiAgfVxuXG4gIGdldFNhdmVEYXRhICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICAgIHsgdHlwZUFsaWFzOiB0aGlzLmFsaWFzIH0sXG4gICAgICB0aGlzLmdldFJhd0RhdGEoKVxuICAgIClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZVNhdmFibGVcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgR3JpZD1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7R3JpZC5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUdyaWQ7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5HcmlkPUdyaWQ7fWVsc2V7aWYodGhpcy5QYXJhbGxlbGlvPT1udWxsKXt0aGlzLlBhcmFsbGVsaW89e307fXRoaXMuUGFyYWxsZWxpby5HcmlkPUdyaWQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgRXZlbnRFbWl0dGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRXZlbnRFbWl0dGVyXCIpID8gZGVwZW5kZW5jaWVzLkV2ZW50RW1pdHRlciA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FdmVudEVtaXR0ZXI7XG52YXIgR3JpZENlbGwgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJHcmlkQ2VsbFwiKSA/IGRlcGVuZGVuY2llcy5HcmlkQ2VsbCA6IHJlcXVpcmUoJy4vR3JpZENlbGwnKTtcbnZhciBHcmlkUm93ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiR3JpZFJvd1wiKSA/IGRlcGVuZGVuY2llcy5HcmlkUm93IDogcmVxdWlyZSgnLi9HcmlkUm93Jyk7XG52YXIgR3JpZDtcbkdyaWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBhZGRDZWxsKGNlbGwgPSBudWxsKSB7XG4gICAgICB2YXIgcm93LCBzcG90O1xuICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgIGNlbGwgPSBuZXcgR3JpZENlbGwoKTtcbiAgICAgIH1cbiAgICAgIHNwb3QgPSB0aGlzLmdldEZyZWVTcG90KCk7XG4gICAgICByb3cgPSB0aGlzLnJvd3MuZ2V0KHNwb3Qucm93KTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIHJvdyA9IHRoaXMuYWRkUm93KCk7XG4gICAgICB9XG4gICAgICByb3cuYWRkQ2VsbChjZWxsKTtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICAgIGFkZFJvdyhyb3cgPSBudWxsKSB7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByb3cgPSBuZXcgR3JpZFJvdygpO1xuICAgICAgfVxuICAgICAgdGhpcy5yb3dzLnB1c2gocm93KTtcbiAgICAgIHJldHVybiByb3c7XG4gICAgfVxuXG4gICAgZ2V0RnJlZVNwb3QoKSB7XG4gICAgICB2YXIgc3BvdDtcbiAgICAgIHNwb3QgPSBudWxsO1xuICAgICAgdGhpcy5yb3dzLnNvbWUoKHJvdykgPT4ge1xuICAgICAgICBpZiAocm93LmNlbGxzLmxlbmd0aCA8IHRoaXMubWF4Q29sdW1ucykge1xuICAgICAgICAgIHJldHVybiBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiByb3cucm93UG9zaXRpb24sXG4gICAgICAgICAgICBjb2x1bW46IHJvdy5jZWxscy5sZW5ndGhcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICghc3BvdCkge1xuICAgICAgICBpZiAodGhpcy5tYXhDb2x1bW5zID4gdGhpcy5yb3dzLmxlbmd0aCkge1xuICAgICAgICAgIHNwb3QgPSB7XG4gICAgICAgICAgICByb3c6IHRoaXMucm93cy5sZW5ndGgsXG4gICAgICAgICAgICBjb2x1bW46IDBcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNwb3QgPSB7XG4gICAgICAgICAgICByb3c6IDAsXG4gICAgICAgICAgICBjb2x1bW46IHRoaXMubWF4Q29sdW1ucyArIDFcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc3BvdDtcbiAgICB9XG5cbiAgfTtcblxuICBHcmlkLmV4dGVuZChFdmVudEVtaXR0ZXIpO1xuXG4gIEdyaWQucHJvcGVydGllcyh7XG4gICAgcm93czoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICAgIGl0ZW1BZGRlZDogZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIHJldHVybiByb3cuZ3JpZCA9IHRoaXM7XG4gICAgICB9LFxuICAgICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uKHJvdykge1xuICAgICAgICBpZiAocm93LmdyaWQgPT09IHRoaXMpIHtcbiAgICAgICAgICByZXR1cm4gcm93LmdyaWQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBtYXhDb2x1bW5zOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciByb3dzO1xuICAgICAgICByb3dzID0gaW52YWxpZGF0b3IucHJvcCgncm93cycpO1xuICAgICAgICByZXR1cm4gcm93cy5yZWR1Y2UoZnVuY3Rpb24obWF4LCByb3cpIHtcbiAgICAgICAgICByZXR1cm4gTWF0aC5tYXgobWF4LCBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIHJvdykubGVuZ3RoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gR3JpZDtcblxufSkuY2FsbCh0aGlzKTtcblxucmV0dXJuKEdyaWQpO30pOyIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgR3JpZENlbGw9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO0dyaWRDZWxsLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9R3JpZENlbGw7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5HcmlkQ2VsbD1HcmlkQ2VsbDt9ZWxzZXtpZih0aGlzLlBhcmFsbGVsaW89PW51bGwpe3RoaXMuUGFyYWxsZWxpbz17fTt9dGhpcy5QYXJhbGxlbGlvLkdyaWRDZWxsPUdyaWRDZWxsO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIEV2ZW50RW1pdHRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkV2ZW50RW1pdHRlclwiKSA/IGRlcGVuZGVuY2llcy5FdmVudEVtaXR0ZXIgOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xudmFyIEdyaWRDZWxsO1xuR3JpZENlbGwgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWRDZWxsIGV4dGVuZHMgRWxlbWVudCB7fTtcblxuICBHcmlkQ2VsbC5leHRlbmQoRXZlbnRFbWl0dGVyKTtcblxuICBHcmlkQ2VsbC5wcm9wZXJ0aWVzKHtcbiAgICBncmlkOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdncmlkJywgaW52YWxpZGF0b3IucHJvcCgncm93JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcm93OiB7fSxcbiAgICBjb2x1bW5Qb3NpdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgcm93O1xuICAgICAgICByb3cgPSBpbnZhbGlkYXRvci5wcm9wKCdyb3cnKTtcbiAgICAgICAgaWYgKHJvdykge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIHJvdykuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wKCdjZWxscycsIGludmFsaWRhdG9yLnByb3AoJ3JvdycpKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd3aWR0aCcpICogaW52YWxpZGF0b3IucHJvcCgnY29sdW1uUG9zaXRpb24nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd3aWR0aCcpICogKGludmFsaWRhdG9yLnByb3AoJ2NvbHVtblBvc2l0aW9uJykgKyAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCgnaGVpZ2h0JywgaW52YWxpZGF0b3IucHJvcCgncm93JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9wOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKCd0b3AnLCBpbnZhbGlkYXRvci5wcm9wKCdyb3cnKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2JvdHRvbScsIGludmFsaWRhdG9yLnByb3AoJ3JvdycpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBHcmlkQ2VsbDtcblxufSkuY2FsbCh0aGlzKTtcblxucmV0dXJuKEdyaWRDZWxsKTt9KTsiLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEdyaWRSb3c9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO0dyaWRSb3cuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1HcmlkUm93O31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uR3JpZFJvdz1HcmlkUm93O31lbHNle2lmKHRoaXMuUGFyYWxsZWxpbz09bnVsbCl7dGhpcy5QYXJhbGxlbGlvPXt9O310aGlzLlBhcmFsbGVsaW8uR3JpZFJvdz1HcmlkUm93O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIEV2ZW50RW1pdHRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkV2ZW50RW1pdHRlclwiKSA/IGRlcGVuZGVuY2llcy5FdmVudEVtaXR0ZXIgOiByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRXZlbnRFbWl0dGVyO1xudmFyIEdyaWRDZWxsID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiR3JpZENlbGxcIikgPyBkZXBlbmRlbmNpZXMuR3JpZENlbGwgOiByZXF1aXJlKCcuL0dyaWRDZWxsJyk7XG52YXIgR3JpZFJvdztcbkdyaWRSb3cgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdyaWRSb3cgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBhZGRDZWxsKGNlbGwgPSBudWxsKSB7XG4gICAgICBpZiAoIWNlbGwpIHtcbiAgICAgICAgY2VsbCA9IG5ldyBHcmlkQ2VsbCgpO1xuICAgICAgfVxuICAgICAgdGhpcy5jZWxscy5wdXNoKGNlbGwpO1xuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuXG4gIH07XG5cbiAgR3JpZFJvdy5leHRlbmQoRXZlbnRFbWl0dGVyKTtcblxuICBHcmlkUm93LnByb3BlcnRpZXMoe1xuICAgIGdyaWQ6IHt9LFxuICAgIGNlbGxzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgaXRlbUFkZGVkOiBmdW5jdGlvbihjZWxsKSB7XG4gICAgICAgIHJldHVybiBjZWxsLnJvdyA9IHRoaXM7XG4gICAgICB9LFxuICAgICAgaXRlbVJlbW92ZWQ6IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgaWYgKGNlbGwucm93ID09PSB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIGNlbGwucm93ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgcm93UG9zaXRpb246IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGdyaWQ7XG4gICAgICAgIGdyaWQgPSBpbnZhbGlkYXRvci5wcm9wKCdncmlkJyk7XG4gICAgICAgIGlmIChncmlkKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ3Jvd3MnLCBncmlkKS5pbmRleE9mKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wKCdyb3dzJywgaW52YWxpZGF0b3IucHJvcCgnZ3JpZCcpKS5sZW5ndGg7XG4gICAgICB9XG4gICAgfSxcbiAgICB0b3A6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AoJ2hlaWdodCcpICogaW52YWxpZGF0b3IucHJvcCgncm93UG9zaXRpb24nKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCgnaGVpZ2h0JykgKiAoaW52YWxpZGF0b3IucHJvcCgncm93UG9zaXRpb24nKSArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEdyaWRSb3c7XG5cbn0pLmNhbGwodGhpcyk7XG5cbnJldHVybihHcmlkUm93KTt9KTsiLCJpZihtb2R1bGUpe1xuICBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBHcmlkOiByZXF1aXJlKCcuL0dyaWQuanMnKSxcbiAgICBHcmlkQ2VsbDogcmVxdWlyZSgnLi9HcmlkQ2VsbC5qcycpLFxuICAgIEdyaWRSb3c6IHJlcXVpcmUoJy4vR3JpZFJvdy5qcycpXG4gIH07XG59IiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBCaW5kZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0JpbmRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUJpbmRlcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkJpbmRlcj1CaW5kZXI7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5CaW5kZXI9QmluZGVyO319fSkoZnVuY3Rpb24oKXtcclxudmFyIEJpbmRlcjtcclxuQmluZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIEJpbmRlciB7XHJcbiAgICBiaW5kKCkge1xyXG4gICAgICBpZiAoIXRoaXMuYmluZGVkICYmICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKSkge1xyXG4gICAgICAgIHRoaXMuZG9CaW5kKCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuYmluZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGRvQmluZCgpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKTtcclxuICAgIH1cclxuICAgIHVuYmluZCgpIHtcclxuICAgICAgaWYgKHRoaXMuYmluZGVkICYmICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKSkge1xyXG4gICAgICAgIHRoaXMuZG9VbmJpbmQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5iaW5kZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGRvVW5iaW5kKCkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpO1xyXG4gICAgfVxyXG4gICAgZXF1YWxzKGJpbmRlcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5jb21wYXJlUmVmZXJlZChiaW5kZXIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgZ2V0UmVmKCkge31cclxuICAgIHN0YXRpYyBjb21wYXJlUmVmZXJlZChvYmoxLCBvYmoyKSB7XHJcbiAgICAgIHJldHVybiBvYmoxID09PSBvYmoyIHx8ICgob2JqMSAhPSBudWxsKSAmJiAob2JqMiAhPSBudWxsKSAmJiBvYmoxLmNvbnN0cnVjdG9yID09PSBvYmoyLmNvbnN0cnVjdG9yICYmIHRoaXMuY29tcGFyZVJlZihvYmoxLnJlZiwgb2JqMi5yZWYpKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBjb21wYXJlUmVmKHJlZjEsIHJlZjIpIHtcclxuICAgICAgcmV0dXJuIChyZWYxICE9IG51bGwpICYmIChyZWYyICE9IG51bGwpICYmIChyZWYxID09PSByZWYyIHx8IChBcnJheS5pc0FycmF5KHJlZjEpICYmIEFycmF5LmlzQXJyYXkocmVmMSkgJiYgcmVmMS5ldmVyeSgodmFsLCBpKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGFyZVJlZmVyZWQocmVmMVtpXSwgcmVmMltpXSk7XHJcbiAgICAgIH0pKSB8fCAodHlwZW9mIHJlZjEgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIHJlZjIgPT09IFwib2JqZWN0XCIgJiYgT2JqZWN0LmtleXMocmVmMSkuam9pbigpID09PSBPYmplY3Qua2V5cyhyZWYyKS5qb2luKCkgJiYgT2JqZWN0LmtleXMocmVmMSkuZXZlcnkoKGtleSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBhcmVSZWZlcmVkKHJlZjFba2V5XSwgcmVmMltrZXldKTtcclxuICAgICAgfSkpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCaW5kZXIucHJvdG90eXBlLCAncmVmJywge1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVmKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIEJpbmRlcjtcclxufSkuY2FsbCh0aGlzKTtcclxucmV0dXJuKEJpbmRlcik7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQmluZGVyLmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIENvbGxlY3Rpb249ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0NvbGxlY3Rpb24uZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1Db2xsZWN0aW9uO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuQ29sbGVjdGlvbj1Db2xsZWN0aW9uO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuQ29sbGVjdGlvbj1Db2xsZWN0aW9uO319fSkoZnVuY3Rpb24oKXtcclxudmFyIENvbGxlY3Rpb247XHJcbkNvbGxlY3Rpb24gPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgQ29sbGVjdGlvbiB7XHJcbiAgICBjb25zdHJ1Y3RvcihhcnIpIHtcclxuICAgICAgaWYgKGFyciAhPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgdGhpcy5fYXJyYXkgPSBhcnIudG9BcnJheSgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XHJcbiAgICAgICAgICB0aGlzLl9hcnJheSA9IGFycjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fYXJyYXkgPSBbYXJyXTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBbXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgY2hhbmdlZCgpIHt9XHJcbiAgICBjaGVja0NoYW5nZXMob2xkLCBvcmRlcmVkID0gdHJ1ZSwgY29tcGFyZUZ1bmN0aW9uID0gbnVsbCkge1xyXG4gICAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcclxuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgICAgICByZXR1cm4gYSA9PT0gYjtcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIG9sZCA9IHRoaXMuY29weShvbGQuc2xpY2UoKSk7XHJcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgIT09IG9sZC5sZW5ndGggfHwgKG9yZGVyZWQgPyB0aGlzLnNvbWUoZnVuY3Rpb24odmFsLCBpKSB7XHJcbiAgICAgICAgcmV0dXJuICFjb21wYXJlRnVuY3Rpb24ob2xkLmdldChpKSwgdmFsKTtcclxuICAgICAgfSkgOiB0aGlzLnNvbWUoZnVuY3Rpb24oYSkge1xyXG4gICAgICAgIHJldHVybiAhb2xkLnBsdWNrKGZ1bmN0aW9uKGIpIHtcclxuICAgICAgICAgIHJldHVybiBjb21wYXJlRnVuY3Rpb24oYSwgYik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIGdldChpKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheVtpXTtcclxuICAgIH1cclxuICAgIHNldChpLCB2YWwpIHtcclxuICAgICAgdmFyIG9sZDtcclxuICAgICAgaWYgKHRoaXMuX2FycmF5W2ldICE9PSB2YWwpIHtcclxuICAgICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKTtcclxuICAgICAgICB0aGlzLl9hcnJheVtpXSA9IHZhbDtcclxuICAgICAgICB0aGlzLmNoYW5nZWQob2xkKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgYWRkKHZhbCkge1xyXG4gICAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHZhbCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbW92ZSh2YWwpIHtcclxuICAgICAgdmFyIGluZGV4LCBvbGQ7XHJcbiAgICAgIGluZGV4ID0gdGhpcy5fYXJyYXkuaW5kZXhPZih2YWwpO1xyXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHBsdWNrKGZuKSB7XHJcbiAgICAgIHZhciBmb3VuZCwgaW5kZXgsIG9sZDtcclxuICAgICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pO1xyXG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xyXG4gICAgICAgIGZvdW5kID0gdGhpcy5fYXJyYXlbaW5kZXhdO1xyXG4gICAgICAgIHRoaXMuX2FycmF5LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgICAgcmV0dXJuIGZvdW5kO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB0b0FycmF5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKTtcclxuICAgIH1cclxuICAgIGNvdW50KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIG5ld1N1YkNsYXNzKGZuLCBhcnIpIHtcclxuICAgICAgdmFyIFN1YkNsYXNzO1xyXG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9O1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oU3ViQ2xhc3MucHJvdG90eXBlLCBmbik7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJDbGFzcyhhcnIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcyhhcnIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBjb3B5KGFycikge1xyXG4gICAgICB2YXIgY29sbDtcclxuICAgICAgaWYgKGFyciA9PSBudWxsKSB7XHJcbiAgICAgICAgYXJyID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgIH1cclxuICAgICAgY29sbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGFycik7XHJcbiAgICAgIHJldHVybiBjb2xsO1xyXG4gICAgfVxyXG4gICAgZXF1YWxzKGFycikge1xyXG4gICAgICByZXR1cm4gKHRoaXMuY291bnQoKSA9PT0gKHR5cGVvZiBhcnIuY291bnQgPT09ICdmdW5jdGlvbicgPyBhcnIuY291bnQoKSA6IGFyci5sZW5ndGgpKSAmJiB0aGlzLmV2ZXJ5KGZ1bmN0aW9uKHZhbCwgaSkge1xyXG4gICAgICAgIHJldHVybiBhcnJbaV0gPT09IHZhbDtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBnZXRBZGRlZEZyb20oYXJyKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9hcnJheS5maWx0ZXIoZnVuY3Rpb24oaXRlbSkge1xyXG4gICAgICAgIHJldHVybiAhYXJyLmluY2x1ZGVzKGl0ZW0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFJlbW92ZWRGcm9tKGFycikge1xyXG4gICAgICByZXR1cm4gYXJyLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5pbmNsdWRlcyhpdGVtKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBDb2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMgPSBbJ2V2ZXJ5JywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZvckVhY2gnLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdqb2luJywgJ2xhc3RJbmRleE9mJywgJ21hcCcsICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAnc29tZScsICd0b1N0cmluZyddO1xyXG4gIENvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMgPSBbJ2NvbmNhdCcsICdmaWx0ZXInLCAnc2xpY2UnXTtcclxuICBDb2xsZWN0aW9uLndyaXRlZnVuY3Rpb25zID0gWydwb3AnLCAncHVzaCcsICdyZXZlcnNlJywgJ3NoaWZ0JywgJ3NvcnQnLCAnc3BsaWNlJywgJ3Vuc2hpZnQnXTtcclxuICBDb2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbihmdW5jdCkge1xyXG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZyk7XHJcbiAgICB9O1xyXG4gIH0pO1xyXG4gIENvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbihmdW5jdCkge1xyXG4gICAgcmV0dXJuIENvbGxlY3Rpb24ucHJvdG90eXBlW2Z1bmN0XSA9IGZ1bmN0aW9uKC4uLmFyZykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jb3B5KHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpKTtcclxuICAgIH07XHJcbiAgfSk7XHJcbiAgQ29sbGVjdGlvbi53cml0ZWZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGZ1bmN0KSB7XHJcbiAgICByZXR1cm4gQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24oLi4uYXJnKSB7XHJcbiAgICAgIHZhciBvbGQsIHJlcztcclxuICAgICAgb2xkID0gdGhpcy50b0FycmF5KCk7XHJcbiAgICAgIHJlcyA9IHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpO1xyXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKTtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH07XHJcbiAgfSk7XHJcbiAgcmV0dXJuIENvbGxlY3Rpb247XHJcbn0pLmNhbGwodGhpcyk7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb2xsZWN0aW9uLnByb3RvdHlwZSwgJ2xlbmd0aCcsIHtcclxuICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY291bnQoKTtcclxuICB9XHJcbn0pO1xyXG5pZiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiB2b2lkIDApIHtcclxuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpO1xyXG4gIH07XHJcbn1cclxucmV0dXJuKENvbGxlY3Rpb24pO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0NvbGxlY3Rpb24uanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRWxlbWVudD1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7RWxlbWVudC5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUVsZW1lbnQ7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5FbGVtZW50PUVsZW1lbnQ7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5FbGVtZW50PUVsZW1lbnQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5Jyk7XHJcbnZhciBNaXhhYmxlID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiTWl4YWJsZVwiKSA/IGRlcGVuZGVuY2llcy5NaXhhYmxlIDogcmVxdWlyZSgnLi9NaXhhYmxlJyk7XHJcbnZhciBFbGVtZW50O1xyXG5FbGVtZW50ID0gY2xhc3MgRWxlbWVudCBleHRlbmRzIE1peGFibGUge1xyXG4gIHRhcChuYW1lKSB7XHJcbiAgICB2YXIgYXJncztcclxuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xyXG4gICAgaWYgKHR5cGVvZiBuYW1lID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIG5hbWUuYXBwbHkodGhpcywgYXJncy5zbGljZSgxKSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjYWxsYmFjayhuYW1lKSB7XHJcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fY2FsbGJhY2tzW25hbWVdID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fY2FsbGJhY2tzW25hbWVdID0gKC4uLmFyZ3MpID0+IHtcclxuICAgICAgICB0aGlzW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9O1xyXG4gICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0ub3duZXIgPSB0aGlzO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tuYW1lXTtcclxuICB9XHJcblxyXG4gIGdldEZpbmFsUHJvcGVydGllcygpIHtcclxuICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzICE9IG51bGwpIHtcclxuICAgICAgcmV0dXJuIFsnX3Byb3BlcnRpZXMnXS5jb25jYXQodGhpcy5fcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLm5hbWU7XHJcbiAgICAgIH0pKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBbXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgdmFyIGksIGxlbiwgb3B0aW9ucywgcHJvcGVydHksIHJlZiwgcmVzdWx0cztcclxuICAgIGlmICh0aGlzLl9wcm9wZXJ0aWVzICE9IG51bGwpIHtcclxuICAgICAgcmVmID0gdGhpcy5fcHJvcGVydGllcztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICBwcm9wZXJ0eSA9IHJlZltpXTtcclxuICAgICAgICBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgcHJvcGVydHkub3B0aW9ucyk7XHJcbiAgICAgICAgcmVzdWx0cy5wdXNoKChuZXcgUHJvcGVydHkocHJvcGVydHkubmFtZSwgb3B0aW9ucykpLmJpbmQodGFyZ2V0KSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgcHJvcGVydHkocHJvcCwgZGVzYykge1xyXG4gICAgcmV0dXJuIChuZXcgUHJvcGVydHkocHJvcCwgZGVzYykpLmJpbmQodGhpcy5wcm90b3R5cGUpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIHByb3BlcnRpZXMocHJvcGVydGllcykge1xyXG4gICAgdmFyIGRlc2MsIHByb3AsIHJlc3VsdHM7XHJcbiAgICByZXN1bHRzID0gW107XHJcbiAgICBmb3IgKHByb3AgaW4gcHJvcGVydGllcykge1xyXG4gICAgICBkZXNjID0gcHJvcGVydGllc1twcm9wXTtcclxuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMucHJvcGVydHkocHJvcCwgZGVzYykpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihFbGVtZW50KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEV2ZW50QmluZD1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7RXZlbnRCaW5kLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9RXZlbnRCaW5kO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuRXZlbnRCaW5kPUV2ZW50QmluZDt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkV2ZW50QmluZD1FdmVudEJpbmQ7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIEJpbmRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkJpbmRlclwiKSA/IGRlcGVuZGVuY2llcy5CaW5kZXIgOiByZXF1aXJlKCcuL0JpbmRlcicpO1xyXG52YXIgRXZlbnRCaW5kO1xyXG5FdmVudEJpbmQgPSBjbGFzcyBFdmVudEJpbmQgZXh0ZW5kcyBCaW5kZXIge1xyXG4gIGNvbnN0cnVjdG9yKGV2ZW50MSwgdGFyZ2V0MSwgY2FsbGJhY2spIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICB0aGlzLmV2ZW50ID0gZXZlbnQxO1xyXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXQxO1xyXG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xyXG4gIH1cclxuXHJcbiAgZ2V0UmVmKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgZXZlbnQ6IHRoaXMuZXZlbnQsXHJcbiAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgIGNhbGxiYWNrOiB0aGlzLmNhbGxiYWNrXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgZG9CaW5kKCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQub24gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9uKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZG9VbmJpbmQoKSB7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjayk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjayk7XHJcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vZmYgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9mZih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZnVuY3Rpb24gdG8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyB3YXMgZm91bmQnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVxdWFscyhldmVudEJpbmQpIHtcclxuICAgIHJldHVybiBzdXBlci5lcXVhbHMoZXZlbnRCaW5kKSAmJiBldmVudEJpbmQuZXZlbnQgPT09IHRoaXMuZXZlbnQ7XHJcbiAgfVxyXG5cclxuICBtYXRjaChldmVudCwgdGFyZ2V0KSB7XHJcbiAgICByZXR1cm4gZXZlbnQgPT09IHRoaXMuZXZlbnQgJiYgdGFyZ2V0ID09PSB0aGlzLnRhcmdldDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjaGVja0VtaXR0ZXIoZW1pdHRlciwgZmF0YWwgPSB0cnVlKSB7XHJcbiAgICBpZiAodHlwZW9mIGVtaXR0ZXIuYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5hZGRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgZW1pdHRlci5vbiA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAoZmF0YWwpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5yZXR1cm4oRXZlbnRCaW5kKTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FdmVudEJpbmQuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRXZlbnRFbWl0dGVyPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtFdmVudEVtaXR0ZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1FdmVudEVtaXR0ZXI7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5FdmVudEVtaXR0ZXI9RXZlbnRFbWl0dGVyO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuRXZlbnRFbWl0dGVyPUV2ZW50RW1pdHRlcjt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBFdmVudEVtaXR0ZXI7XHJcbkV2ZW50RW1pdHRlciA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBFdmVudEVtaXR0ZXIge1xyXG4gICAgZ2V0QWxsRXZlbnRzKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XHJcbiAgICB9XHJcbiAgICBnZXRMaXN0ZW5lcnMoZSkge1xyXG4gICAgICB2YXIgZXZlbnRzO1xyXG4gICAgICBldmVudHMgPSB0aGlzLmdldEFsbEV2ZW50cygpO1xyXG4gICAgICByZXR1cm4gZXZlbnRzW2VdIHx8IChldmVudHNbZV0gPSBbXSk7XHJcbiAgICB9XHJcbiAgICBoYXNMaXN0ZW5lcihlLCBsaXN0ZW5lcikge1xyXG4gICAgICByZXR1cm4gdGhpcy5nZXRMaXN0ZW5lcnMoZSkuaW5jbHVkZXMobGlzdGVuZXIpO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIoZSwgbGlzdGVuZXIpIHtcclxuICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVyKGUsIGxpc3RlbmVyKSkge1xyXG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGUpLnB1c2gobGlzdGVuZXIpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyQWRkZWQoZSwgbGlzdGVuZXIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBsaXN0ZW5lckFkZGVkKGUsIGxpc3RlbmVyKSB7fVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIoZSwgbGlzdGVuZXIpIHtcclxuICAgICAgdmFyIGluZGV4LCBsaXN0ZW5lcnM7XHJcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGUpO1xyXG4gICAgICBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKTtcclxuICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyUmVtb3ZlZChlLCBsaXN0ZW5lcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGxpc3RlbmVyUmVtb3ZlZChlLCBsaXN0ZW5lcikge31cclxuICAgIGVtaXRFdmVudChlLCAuLi5hcmdzKSB7XHJcbiAgICAgIHZhciBsaXN0ZW5lcnM7XHJcbiAgICAgIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGUpLnNsaWNlKCk7XHJcbiAgICAgIHJldHVybiBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbihsaXN0ZW5lcikge1xyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lciguLi5hcmdzKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXRFdmVudDtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnRyaWdnZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXRFdmVudDtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcclxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XHJcbiAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcclxufSkuY2FsbCh0aGlzKTtcclxucmV0dXJuKEV2ZW50RW1pdHRlcik7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRXZlbnRFbWl0dGVyLmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIEludmFsaWRhdG9yPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtJbnZhbGlkYXRvci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUludmFsaWRhdG9yO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuSW52YWxpZGF0b3I9SW52YWxpZGF0b3I7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5JbnZhbGlkYXRvcj1JbnZhbGlkYXRvcjt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgQmluZGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQmluZGVyXCIpID8gZGVwZW5kZW5jaWVzLkJpbmRlciA6IHJlcXVpcmUoJy4vQmluZGVyJyk7XHJcbnZhciBFdmVudEJpbmQgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJFdmVudEJpbmRcIikgPyBkZXBlbmRlbmNpZXMuRXZlbnRCaW5kIDogcmVxdWlyZSgnLi9FdmVudEJpbmQnKTtcclxudmFyIEludmFsaWRhdG9yLCBwbHVjaztcclxucGx1Y2sgPSBmdW5jdGlvbihhcnIsIGZuKSB7XHJcbiAgdmFyIGZvdW5kLCBpbmRleDtcclxuICBpbmRleCA9IGFyci5maW5kSW5kZXgoZm4pO1xyXG4gIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICBmb3VuZCA9IGFycltpbmRleF07XHJcbiAgICBhcnIuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIHJldHVybiBmb3VuZDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59O1xyXG5cclxuSW52YWxpZGF0b3IgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgSW52YWxpZGF0b3IgZXh0ZW5kcyBCaW5kZXIge1xyXG4gICAgY29uc3RydWN0b3IocHJvcGVydHksIG9iaiA9IG51bGwpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5O1xyXG4gICAgICB0aGlzLm9iaiA9IG9iajtcclxuICAgICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMgPSBbXTtcclxuICAgICAgdGhpcy5yZWN5Y2xlZCA9IFtdO1xyXG4gICAgICB0aGlzLnVua25vd25zID0gW107XHJcbiAgICAgIHRoaXMuc3RyaWN0ID0gdGhpcy5jb25zdHJ1Y3Rvci5zdHJpY3Q7XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5pbnZhbGlkYXRlQ2FsbGJhY2sgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH07XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBpbnZhbGlkYXRlKCkge1xyXG4gICAgICB2YXIgZnVuY3ROYW1lO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGVkID0gdHJ1ZTtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5ID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eSgpO1xyXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWxsYmFjaygpO1xyXG4gICAgICB9IGVsc2UgaWYgKCh0aGlzLnByb3BlcnR5ICE9IG51bGwpICYmIHR5cGVvZiB0aGlzLnByb3BlcnR5LmludmFsaWRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BlcnR5LmludmFsaWRhdGUoKTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgIGZ1bmN0TmFtZSA9ICdpbnZhbGlkYXRlJyArIHRoaXMucHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLnByb3BlcnR5LnNsaWNlKDEpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vYmpbZnVuY3ROYW1lXSA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmpbZnVuY3ROYW1lXSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5vYmpbdGhpcy5wcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVua25vd24oKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS51bmtub3duID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eS51bmtub3duKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0ZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkZEJpbmRlcihuZXcgRXZlbnRCaW5kKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkQmluZGVyKGJpbmRlcikge1xyXG4gICAgICBpZiAoYmluZGVyLmNhbGxiYWNrID09IG51bGwpIHtcclxuICAgICAgICBiaW5kZXIuY2FsbGJhY2sgPSB0aGlzLmludmFsaWRhdGVDYWxsYmFjaztcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLnNvbWUoZnVuY3Rpb24oZXZlbnRCaW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKTtcclxuICAgICAgfSkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMucHVzaChwbHVjayh0aGlzLnJlY3ljbGVkLCBmdW5jdGlvbihldmVudEJpbmQpIHtcclxuICAgICAgICAgIHJldHVybiBldmVudEJpbmQuZXF1YWxzKGJpbmRlcik7XHJcbiAgICAgICAgfSkgfHwgYmluZGVyKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFVua25vd25DYWxsYmFjayhwcm9wLCB0YXJnZXQpIHtcclxuICAgICAgdmFyIGNhbGxiYWNrO1xyXG4gICAgICBjYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRVbmtub3duKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgcmV0dXJuIHRhcmdldFtwcm9wXTtcclxuICAgICAgICB9LCBwcm9wLCB0YXJnZXQpO1xyXG4gICAgICB9O1xyXG4gICAgICBjYWxsYmFjay5yZWYgPSB7XHJcbiAgICAgICAgcHJvcDogcHJvcCxcclxuICAgICAgICB0YXJnZXQ6IHRhcmdldFxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gY2FsbGJhY2s7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkVW5rbm93bihmbiwgcHJvcCwgdGFyZ2V0KSB7XHJcbiAgICAgIGlmICghdGhpcy5maW5kVW5rbm93bihwcm9wLCB0YXJnZXQpKSB7XHJcbiAgICAgICAgZm4ucmVmID0ge1xyXG4gICAgICAgICAgXCJwcm9wXCI6IHByb3AsXHJcbiAgICAgICAgICBcInRhcmdldFwiOiB0YXJnZXRcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudW5rbm93bnMucHVzaChmbik7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5rbm93bigpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZmluZFVua25vd24ocHJvcCwgdGFyZ2V0KSB7XHJcbiAgICAgIGlmICgocHJvcCAhPSBudWxsKSB8fCAodGFyZ2V0ICE9IG51bGwpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudW5rbm93bnMuZmluZChmdW5jdGlvbih1bmtub3duKSB7XHJcbiAgICAgICAgICByZXR1cm4gdW5rbm93bi5yZWYucHJvcCA9PT0gcHJvcCAmJiB1bmtub3duLnJlZi50YXJnZXQgPT09IHRhcmdldDtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGV2ZW50KGV2ZW50LCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZEV2ZW50QmluZChldmVudCwgdGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhbHVlKHZhbCwgZXZlbnQsIHRhcmdldCA9IHRoaXMub2JqKSB7XHJcbiAgICAgIHRoaXMuZXZlbnQoZXZlbnQsIHRhcmdldCk7XHJcbiAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcChwcm9wLCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICBpZiAodHlwZW9mIHByb3AgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9wZXJ0eSBuYW1lIG11c3QgYmUgYSBzdHJpbmcnKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jaGVja0VtaXR0ZXIodGFyZ2V0KSkge1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRCaW5kKHByb3AgKyAnSW52YWxpZGF0ZWQnLCB0YXJnZXQsIHRoaXMuZ2V0VW5rbm93bkNhbGxiYWNrKHByb3AsIHRhcmdldCkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlKHRhcmdldFtwcm9wXSwgcHJvcCArICdVcGRhdGVkJywgdGFyZ2V0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvcEluaXRpYXRlZChwcm9wLCB0YXJnZXQgPSB0aGlzLm9iaikge1xyXG4gICAgICB2YXIgaW5pdGlhdGVkO1xyXG4gICAgICBpbml0aWF0ZWQgPSB0YXJnZXQuZ2V0UHJvcGVydHlJbnN0YW5jZShwcm9wKS5pbml0aWF0ZWQ7XHJcbiAgICAgIGlmICghaW5pdGlhdGVkICYmIHRoaXMuY2hlY2tFbWl0dGVyKHRhcmdldCkpIHtcclxuICAgICAgICB0aGlzLmV2ZW50KHByb3AgKyAnVXBkYXRlZCcsIHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIGluaXRpYXRlZDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdChmdW5jdCkge1xyXG4gICAgICB2YXIgaW52YWxpZGF0b3IsIHJlcztcclxuICAgICAgaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IoKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oKCkgPT4ge1xyXG4gICAgICAgICAgdmFyIHJlczI7XHJcbiAgICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpO1xyXG4gICAgICAgICAgaWYgKHJlcyAhPT0gcmVzMikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSwgaW52YWxpZGF0b3IpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmVzID0gZnVuY3QoaW52YWxpZGF0b3IpO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKGludmFsaWRhdG9yKTtcclxuICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuXHJcbiAgICB2YWxpZGF0ZVVua25vd25zKHByb3AsIHRhcmdldCA9IHRoaXMub2JqKSB7XHJcbiAgICAgIHZhciB1bmtub3ducztcclxuICAgICAgdW5rbm93bnMgPSB0aGlzLnVua25vd25zO1xyXG4gICAgICB0aGlzLnVua25vd25zID0gW107XHJcbiAgICAgIHJldHVybiB1bmtub3ducy5mb3JFYWNoKGZ1bmN0aW9uKHVua25vd24pIHtcclxuICAgICAgICByZXR1cm4gdW5rbm93bigpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpc0VtcHR5KCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMubGVuZ3RoID09PSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmQoKSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZTtcclxuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLmZvckVhY2goZnVuY3Rpb24oZXZlbnRCaW5kKSB7XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5iaW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlY3ljbGUoY2FsbGJhY2spIHtcclxuICAgICAgdmFyIGRvbmUsIHJlcztcclxuICAgICAgdGhpcy5yZWN5Y2xlZCA9IHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzO1xyXG4gICAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cyA9IFtdO1xyXG4gICAgICBkb25lID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMucmVjeWNsZWQuZm9yRWFjaChmdW5jdGlvbihldmVudEJpbmQpIHtcclxuICAgICAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVjeWNsZWQgPSBbXTtcclxuICAgICAgfTtcclxuICAgICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgIHJldHVybiBjYWxsYmFjayh0aGlzLCBkb25lKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzID0gY2FsbGJhY2sodGhpcyk7XHJcbiAgICAgICAgICBkb25lKCk7XHJcbiAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZG9uZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoZWNrRW1pdHRlcihlbWl0dGVyKSB7XHJcbiAgICAgIHJldHVybiBFdmVudEJpbmQuY2hlY2tFbWl0dGVyKGVtaXR0ZXIsIHRoaXMuc3RyaWN0KTtcclxuICAgIH1cclxuXHJcbiAgICB1bmJpbmQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2ZW50QmluZCkge1xyXG4gICAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBJbnZhbGlkYXRvci5zdHJpY3QgPSB0cnVlO1xyXG5cclxuICByZXR1cm4gSW52YWxpZGF0b3I7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKEludmFsaWRhdG9yKTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9JbnZhbGlkYXRvci5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBNaXhhYmxlPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtNaXhhYmxlLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9TWl4YWJsZTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLk1peGFibGU9TWl4YWJsZTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLk1peGFibGU9TWl4YWJsZTt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBNaXhhYmxlLFxyXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xyXG5NaXhhYmxlID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIE1peGFibGUge1xyXG4gICAgc3RhdGljIGV4dGVuZChvYmopIHtcclxuICAgICAgdGhpcy5FeHRlbnNpb24ubWFrZShvYmosIHRoaXMpO1xyXG4gICAgICBpZiAob2JqLnByb3RvdHlwZSAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLnByb3RvdHlwZSwgdGhpcy5wcm90b3R5cGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5jbHVkZShvYmopIHtcclxuICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzLnByb3RvdHlwZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBNaXhhYmxlLkV4dGVuc2lvbiA9IHtcclxuICAgIG1ha2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XHJcbiAgICAgIHZhciBpLCBsZW4sIHByb3AsIHJlZjtcclxuICAgICAgcmVmID0gdGhpcy5nZXRFeHRlbnNpb25Qcm9wZXJ0aWVzKHNvdXJjZSwgdGFyZ2V0KTtcclxuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgcHJvcCA9IHJlZltpXTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLm5hbWUsIHByb3ApO1xyXG4gICAgICB9XHJcbiAgICAgIHRhcmdldC5leHRlbnNpb25zID0gKHRhcmdldC5leHRlbnNpb25zIHx8IFtdKS5jb25jYXQoW3NvdXJjZV0pO1xyXG4gICAgICBpZiAodHlwZW9mIHNvdXJjZS5leHRlbmRlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHJldHVybiBzb3VyY2UuZXh0ZW5kZWQodGFyZ2V0KTtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGFsd2F5c0ZpbmFsOiBbJ2V4dGVuZGVkJywgJ2V4dGVuc2lvbnMnLCAnX19zdXBlcl9fJywgJ2NvbnN0cnVjdG9yJ10sXHJcbiAgICBnZXRFeHRlbnNpb25Qcm9wZXJ0aWVzOiBmdW5jdGlvbihzb3VyY2UsIHRhcmdldCkge1xyXG4gICAgICB2YXIgYWx3YXlzRmluYWwsIHByb3BzLCB0YXJnZXRDaGFpbjtcclxuICAgICAgYWx3YXlzRmluYWwgPSB0aGlzLmFsd2F5c0ZpbmFsO1xyXG4gICAgICB0YXJnZXRDaGFpbiA9IHRoaXMuZ2V0UHJvdG90eXBlQ2hhaW4odGFyZ2V0KTtcclxuICAgICAgcHJvcHMgPSBbXTtcclxuICAgICAgdGhpcy5nZXRQcm90b3R5cGVDaGFpbihzb3VyY2UpLmV2ZXJ5KGZ1bmN0aW9uKG9iaikge1xyXG4gICAgICAgIHZhciBleGNsdWRlO1xyXG4gICAgICAgIGlmICghdGFyZ2V0Q2hhaW4uaW5jbHVkZXMob2JqKSkge1xyXG4gICAgICAgICAgZXhjbHVkZSA9IGFsd2F5c0ZpbmFsO1xyXG4gICAgICAgICAgaWYgKHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBleGNsdWRlID0gZXhjbHVkZS5jb25jYXQoc291cmNlLmdldEZpbmFsUHJvcGVydGllcygpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChbXCJsZW5ndGhcIiwgXCJwcm90b3R5cGVcIiwgXCJuYW1lXCJdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKChrZXkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuICF0YXJnZXQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBrZXkuc3Vic3RyKDAsIDIpICE9PSBcIl9fXCIgJiYgaW5kZXhPZi5jYWxsKGV4Y2x1ZGUsIGtleSkgPCAwICYmICFwcm9wcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgICAgICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBrZXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICB2YXIgcHJvcDtcclxuICAgICAgICAgICAgcHJvcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xyXG4gICAgICAgICAgICBwcm9wLm5hbWUgPSBrZXk7XHJcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHByb3BzO1xyXG4gICAgfSxcclxuICAgIGdldFByb3RvdHlwZUNoYWluOiBmdW5jdGlvbihvYmopIHtcclxuICAgICAgdmFyIGJhc2VQcm90b3R5cGUsIGNoYWluO1xyXG4gICAgICBjaGFpbiA9IFtdO1xyXG4gICAgICBiYXNlUHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKE9iamVjdCk7XHJcbiAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgY2hhaW4ucHVzaChvYmopO1xyXG4gICAgICAgIGlmICghKChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqKSkgJiYgb2JqICE9PSBPYmplY3QgJiYgb2JqICE9PSBiYXNlUHJvdG90eXBlKSkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjaGFpbjtcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBNaXhhYmxlO1xyXG59KS5jYWxsKHRoaXMpO1xyXG5yZXR1cm4oTWl4YWJsZSk7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvTWl4YWJsZS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBPdmVycmlkZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO092ZXJyaWRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPU92ZXJyaWRlcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLk92ZXJyaWRlcj1PdmVycmlkZXI7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5PdmVycmlkZXI9T3ZlcnJpZGVyO319fSkoZnVuY3Rpb24oKXtcclxudmFyIE92ZXJyaWRlcjtcclxuT3ZlcnJpZGVyID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIE92ZXJyaWRlciB7XHJcbiAgICBzdGF0aWMgb3ZlcnJpZGVzKG92ZXJyaWRlcykge1xyXG4gICAgICByZXR1cm4gdGhpcy5PdmVycmlkZS5hcHBseU1hbnkodGhpcy5wcm90b3R5cGUsIHRoaXMubmFtZSwgb3ZlcnJpZGVzKTtcclxuICAgIH1cclxuICAgIGdldEZpbmFsUHJvcGVydGllcygpIHtcclxuICAgICAgaWYgKHRoaXMuX292ZXJyaWRlcyAhPSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIFsnX292ZXJyaWRlcyddLmNvbmNhdChPYmplY3Qua2V5cyh0aGlzLl9vdmVycmlkZXMpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gW107XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcclxuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLk92ZXJyaWRlLmFwcGx5TWFueSh0YXJnZXQsIHRoaXMuY29uc3RydWN0b3IubmFtZSwgdGhpcy5fb3ZlcnJpZGVzKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gT3ZlcnJpZGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldC5leHRlbmRlZCA9IHRoaXMuZXh0ZW5kZWQ7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIE92ZXJyaWRlci5PdmVycmlkZSA9IHtcclxuICAgIG1ha2VNYW55OiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGVzKSB7XHJcbiAgICAgIHZhciBmbiwga2V5LCBvdmVycmlkZSwgcmVzdWx0cztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcclxuICAgICAgICBmbiA9IG92ZXJyaWRlc1trZXldO1xyXG4gICAgICAgIHJlc3VsdHMucHVzaChvdmVycmlkZSA9IHRoaXMubWFrZSh0YXJnZXQsIG5hbWVzcGFjZSwga2V5LCBmbikpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgfSxcclxuICAgIGFwcGx5TWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xyXG4gICAgICB2YXIga2V5LCBvdmVycmlkZSwgcmVzdWx0cztcclxuICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcclxuICAgICAgICBvdmVycmlkZSA9IG92ZXJyaWRlc1trZXldO1xyXG4gICAgICAgIGlmICh0eXBlb2Ygb3ZlcnJpZGUgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgICAgb3ZlcnJpZGUgPSB0aGlzLm1ha2UodGFyZ2V0LCBuYW1lc3BhY2UsIGtleSwgb3ZlcnJpZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hcHBseSh0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGUpKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgIH0sXHJcbiAgICBtYWtlOiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgZm5OYW1lLCBmbikge1xyXG4gICAgICB2YXIgb3ZlcnJpZGU7XHJcbiAgICAgIG92ZXJyaWRlID0ge1xyXG4gICAgICAgIGZuOiB7XHJcbiAgICAgICAgICBjdXJyZW50OiBmblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbmFtZTogZm5OYW1lXHJcbiAgICAgIH07XHJcbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRoJyArIG5hbWVzcGFjZV0gPSBmbjtcclxuICAgICAgcmV0dXJuIG92ZXJyaWRlO1xyXG4gICAgfSxcclxuICAgIGVtcHR5Rm46IGZ1bmN0aW9uKCkge30sXHJcbiAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XHJcbiAgICAgIHZhciBmbk5hbWUsIG92ZXJyaWRlcywgcmVmLCByZWYxLCB3aXRob3V0O1xyXG4gICAgICBmbk5hbWUgPSBvdmVycmlkZS5uYW1lO1xyXG4gICAgICBvdmVycmlkZXMgPSB0YXJnZXQuX292ZXJyaWRlcyAhPSBudWxsID8gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0Ll9vdmVycmlkZXMpIDoge307XHJcbiAgICAgIHdpdGhvdXQgPSAoKHJlZiA9IHRhcmdldC5fb3ZlcnJpZGVzKSAhPSBudWxsID8gKHJlZjEgPSByZWZbZm5OYW1lXSkgIT0gbnVsbCA/IHJlZjEuZm4uY3VycmVudCA6IHZvaWQgMCA6IHZvaWQgMCkgfHwgdGFyZ2V0W2ZuTmFtZV07XHJcbiAgICAgIG92ZXJyaWRlID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGUpO1xyXG4gICAgICBpZiAob3ZlcnJpZGVzW2ZuTmFtZV0gIT0gbnVsbCkge1xyXG4gICAgICAgIG92ZXJyaWRlLmZuID0gT2JqZWN0LmFzc2lnbih7fSwgb3ZlcnJpZGVzW2ZuTmFtZV0uZm4sIG92ZXJyaWRlLmZuKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlLmZuKTtcclxuICAgICAgfVxyXG4gICAgICBvdmVycmlkZS5mblsnd2l0aG91dCcgKyBuYW1lc3BhY2VdID0gd2l0aG91dCB8fCB0aGlzLmVtcHR5Rm47XHJcbiAgICAgIGlmICh3aXRob3V0ID09IG51bGwpIHtcclxuICAgICAgICBvdmVycmlkZS5taXNzaW5nV2l0aG91dCA9ICd3aXRob3V0JyArIG5hbWVzcGFjZTtcclxuICAgICAgfSBlbHNlIGlmIChvdmVycmlkZS5taXNzaW5nV2l0aG91dCkge1xyXG4gICAgICAgIG92ZXJyaWRlLmZuW292ZXJyaWRlLm1pc3NpbmdXaXRob3V0XSA9IHdpdGhvdXQ7XHJcbiAgICAgIH1cclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZm5OYW1lLCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICB2YXIgZmluYWxGbiwgZm4sIGtleSwgcmVmMjtcclxuICAgICAgICAgIGZpbmFsRm4gPSBvdmVycmlkZS5mbi5jdXJyZW50LmJpbmQodGhpcyk7XHJcbiAgICAgICAgICByZWYyID0gb3ZlcnJpZGUuZm47XHJcbiAgICAgICAgICBmb3IgKGtleSBpbiByZWYyKSB7XHJcbiAgICAgICAgICAgIGZuID0gcmVmMltrZXldO1xyXG4gICAgICAgICAgICBmaW5hbEZuW2tleV0gPSBmbi5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlICE9PSB0aGlzKSB7XHJcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBmbk5hbWUsIHtcclxuICAgICAgICAgICAgICB2YWx1ZTogZmluYWxGblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBmaW5hbEZuO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICAgIG92ZXJyaWRlc1tmbk5hbWVdID0gb3ZlcnJpZGU7XHJcbiAgICAgIHJldHVybiB0YXJnZXQuX292ZXJyaWRlcyA9IG92ZXJyaWRlcztcclxuICAgIH1cclxuICB9O1xyXG4gIHJldHVybiBPdmVycmlkZXI7XHJcbn0pLmNhbGwodGhpcyk7XHJcbnJldHVybihPdmVycmlkZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL092ZXJyaWRlci5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBQcm9wZXJ0eT1kZWZpbml0aW9uKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCI/U3Bhcms6dGhpcy5TcGFyayk7UHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1Qcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlByb3BlcnR5PVByb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuUHJvcGVydHk9UHJvcGVydHk7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cclxudmFyIEJhc2ljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCYXNpY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkJhc2ljUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eScpO1xyXG52YXIgQ29sbGVjdGlvblByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQ29sbGVjdGlvblByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb25Qcm9wZXJ0eSA6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHknKTtcclxudmFyIENvbXBvc2VkUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb21wb3NlZFByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNvbXBvc2VkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ29tcG9zZWRQcm9wZXJ0eScpO1xyXG52YXIgRHluYW1pY1Byb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRHluYW1pY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkR5bmFtaWNQcm9wZXJ0eSA6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIENhbGN1bGF0ZWRQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkNhbGN1bGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5DYWxjdWxhdGVkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBJbnZhbGlkYXRlZFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiSW52YWxpZGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRlZFByb3BlcnR5IDogcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0ludmFsaWRhdGVkUHJvcGVydHknKTtcclxudmFyIEFjdGl2YWJsZVByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQWN0aXZhYmxlUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuQWN0aXZhYmxlUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQWN0aXZhYmxlUHJvcGVydHknKTtcclxudmFyIFVwZGF0ZWRQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIlVwZGF0ZWRQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5VcGRhdGVkUHJvcGVydHkgOiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvVXBkYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBQcm9wZXJ0eU93bmVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiUHJvcGVydHlPd25lclwiKSA/IGRlcGVuZGVuY2llcy5Qcm9wZXJ0eU93bmVyIDogcmVxdWlyZSgnLi9Qcm9wZXJ0eU93bmVyJyk7XHJcbnZhciBNaXhhYmxlID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiTWl4YWJsZVwiKSA/IGRlcGVuZGVuY2llcy5NaXhhYmxlIDogcmVxdWlyZSgnLi9NaXhhYmxlJyk7XHJcbnZhciBQcm9wZXJ0eTtcclxuUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgUHJvcGVydHkge1xyXG4gICAgY29uc3RydWN0b3IobmFtZSwgb3B0aW9ucyA9IHt9KSB7XHJcbiAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZCh0YXJnZXQpIHtcclxuICAgICAgdmFyIHBhcmVudCwgcHJvcDtcclxuICAgICAgcHJvcCA9IHRoaXM7XHJcbiAgICAgIGlmICghKHR5cGVvZiB0YXJnZXQuZ2V0UHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgdGFyZ2V0LmdldFByb3BlcnR5KHRoaXMubmFtZSkgPT09IHRoaXMpKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQuZ2V0UHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgKChwYXJlbnQgPSB0YXJnZXQuZ2V0UHJvcGVydHkodGhpcy5uYW1lKSkgIT0gbnVsbCkpIHtcclxuICAgICAgICAgIHRoaXMub3ZlcnJpZGUocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZVR5cGUoKS5iaW5kKHRhcmdldCwgcHJvcCk7XHJcbiAgICAgICAgdGFyZ2V0Ll9wcm9wZXJ0aWVzID0gKHRhcmdldC5fcHJvcGVydGllcyB8fCBbXSkuY29uY2F0KFtwcm9wXSk7XHJcbiAgICAgICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgICAgICB0YXJnZXQuX3Byb3BlcnRpZXMgPSB0YXJnZXQuX3Byb3BlcnRpZXMuZmlsdGVyKGZ1bmN0aW9uKGV4aXN0aW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBleGlzdGluZyAhPT0gcGFyZW50O1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubWFrZU93bmVyKHRhcmdldCk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHByb3A7XHJcbiAgICB9XHJcblxyXG4gICAgb3ZlcnJpZGUocGFyZW50KSB7XHJcbiAgICAgIHZhciBrZXksIHJlZiwgcmVzdWx0cywgdmFsdWU7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMucGFyZW50ID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMucGFyZW50ID0gcGFyZW50Lm9wdGlvbnM7XHJcbiAgICAgICAgcmVmID0gcGFyZW50Lm9wdGlvbnM7XHJcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgIGZvciAoa2V5IGluIHJlZikge1xyXG4gICAgICAgICAgdmFsdWUgPSByZWZba2V5XTtcclxuICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zW2tleV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLm9wdGlvbnNba2V5XS5vdmVycmlkZWQgPSB2YWx1ZSk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHRoaXMub3B0aW9uc1trZXldID0gdmFsdWUpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHZvaWQgMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWFrZU93bmVyKHRhcmdldCkge1xyXG4gICAgICB2YXIgcmVmO1xyXG4gICAgICBpZiAoISgocmVmID0gdGFyZ2V0LmV4dGVuc2lvbnMpICE9IG51bGwgPyByZWYuaW5jbHVkZXMoUHJvcGVydHlPd25lci5wcm90b3R5cGUpIDogdm9pZCAwKSkge1xyXG4gICAgICAgIHJldHVybiBNaXhhYmxlLkV4dGVuc2lvbi5tYWtlKFByb3BlcnR5T3duZXIucHJvdG90eXBlLCB0YXJnZXQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SW5zdGFuY2VWYXJOYW1lKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vcHRpb25zLmluc3RhbmNlVmFyTmFtZSB8fCAnXycgKyB0aGlzLm5hbWU7XHJcbiAgICB9XHJcblxyXG4gICAgaXNJbnN0YW50aWF0ZWQob2JqKSB7XHJcbiAgICAgIHJldHVybiBvYmpbdGhpcy5nZXRJbnN0YW5jZVZhck5hbWUoKV0gIT0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnN0YW5jZShvYmopIHtcclxuICAgICAgdmFyIFR5cGUsIHZhck5hbWU7XHJcbiAgICAgIHZhck5hbWUgPSB0aGlzLmdldEluc3RhbmNlVmFyTmFtZSgpO1xyXG4gICAgICBpZiAoIXRoaXMuaXNJbnN0YW50aWF0ZWQob2JqKSkge1xyXG4gICAgICAgIFR5cGUgPSB0aGlzLmdldEluc3RhbmNlVHlwZSgpO1xyXG4gICAgICAgIG9ialt2YXJOYW1lXSA9IG5ldyBUeXBlKHRoaXMsIG9iaik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG9ialt2YXJOYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRJbnN0YW5jZVR5cGUoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnN0YW5jZVR5cGUpIHtcclxuICAgICAgICB0aGlzLmNvbXBvc2Vycy5mb3JFYWNoKChjb21wb3NlcikgPT4ge1xyXG4gICAgICAgICAgcmV0dXJuIGNvbXBvc2VyLmNvbXBvc2UodGhpcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2VUeXBlO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBQcm9wZXJ0eS5wcm90b3R5cGUuY29tcG9zZXJzID0gW0NvbXBvc2VkUHJvcGVydHksIENvbGxlY3Rpb25Qcm9wZXJ0eSwgRHluYW1pY1Byb3BlcnR5LCBCYXNpY1Byb3BlcnR5LCBVcGRhdGVkUHJvcGVydHksIENhbGN1bGF0ZWRQcm9wZXJ0eSwgSW52YWxpZGF0ZWRQcm9wZXJ0eSwgQWN0aXZhYmxlUHJvcGVydHldO1xyXG5cclxuICByZXR1cm4gUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Qcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBQcm9wZXJ0eU93bmVyPWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtQcm9wZXJ0eU93bmVyLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9UHJvcGVydHlPd25lcjt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlByb3BlcnR5T3duZXI9UHJvcGVydHlPd25lcjt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLlByb3BlcnR5T3duZXI9UHJvcGVydHlPd25lcjt9fX0pKGZ1bmN0aW9uKCl7XHJcbnZhciBQcm9wZXJ0eU93bmVyO1xyXG5Qcm9wZXJ0eU93bmVyID0gY2xhc3MgUHJvcGVydHlPd25lciB7XHJcbiAgZ2V0UHJvcGVydHkobmFtZSkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMgJiYgdGhpcy5fcHJvcGVydGllcy5maW5kKGZ1bmN0aW9uKHByb3ApIHtcclxuICAgICAgcmV0dXJuIHByb3AubmFtZSA9PT0gbmFtZTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBnZXRQcm9wZXJ0eUluc3RhbmNlKG5hbWUpIHtcclxuICAgIHZhciByZXM7XHJcbiAgICByZXMgPSB0aGlzLmdldFByb3BlcnR5KG5hbWUpO1xyXG4gICAgaWYgKHJlcykge1xyXG4gICAgICByZXR1cm4gcmVzLmdldEluc3RhbmNlKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxuICBnZXRQcm9wZXJ0aWVzKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Byb3BlcnRpZXMuc2xpY2UoKTtcclxuICB9XHJcbiAgZ2V0UHJvcGVydHlJbnN0YW5jZXMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcHJvcGVydGllcy5tYXAoKHByb3ApID0+IHtcclxuICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcyk7XHJcbiAgICB9KTtcclxuICB9XHJcbiAgZ2V0SW5zdGFudGlhdGVkUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLmZpbHRlcigocHJvcCkgPT4ge1xyXG4gICAgICByZXR1cm4gcHJvcC5pc0luc3RhbnRpYXRlZCh0aGlzKTtcclxuICAgIH0pLm1hcCgocHJvcCkgPT4ge1xyXG4gICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKTtcclxuICAgIH0pO1xyXG4gIH1cclxuICBnZXRNYW51YWxEYXRhUHJvcGVydGllcygpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLnJlZHVjZSgocmVzLCBwcm9wKSA9PiB7XHJcbiAgICAgIHZhciBpbnN0YW5jZTtcclxuICAgICAgaWYgKHByb3AuaXNJbnN0YW50aWF0ZWQodGhpcykpIHtcclxuICAgICAgICBpbnN0YW5jZSA9IHByb3AuZ2V0SW5zdGFuY2UodGhpcyk7XHJcbiAgICAgICAgaWYgKGluc3RhbmNlLmNhbGN1bGF0ZWQgJiYgaW5zdGFuY2UubWFudWFsKSB7XHJcbiAgICAgICAgICByZXNbcHJvcC5uYW1lXSA9IGluc3RhbmNlLnZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSwge30pO1xyXG4gIH1cclxuICBzZXRQcm9wZXJ0aWVzKGRhdGEsIG9wdGlvbnMgPSB7fSkge1xyXG4gICAgdmFyIGtleSwgcHJvcCwgdmFsO1xyXG4gICAgZm9yIChrZXkgaW4gZGF0YSkge1xyXG4gICAgICB2YWwgPSBkYXRhW2tleV07XHJcbiAgICAgIGlmICgoKG9wdGlvbnMud2hpdGVsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMud2hpdGVsaXN0LmluZGV4T2Yoa2V5KSAhPT0gLTEpICYmICgob3B0aW9ucy5ibGFja2xpc3QgPT0gbnVsbCkgfHwgb3B0aW9ucy5ibGFja2xpc3QuaW5kZXhPZihrZXkpID09PSAtMSkpIHtcclxuICAgICAgICBwcm9wID0gdGhpcy5nZXRQcm9wZXJ0eUluc3RhbmNlKGtleSk7XHJcbiAgICAgICAgaWYgKHByb3AgIT0gbnVsbCkge1xyXG4gICAgICAgICAgcHJvcC5zZXQodmFsKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICBkZXN0cm95UHJvcGVydGllcygpIHtcclxuICAgIHRoaXMuZ2V0SW5zdGFudGlhdGVkUHJvcGVydGllcygpLmZvckVhY2goKHByb3ApID0+IHtcclxuICAgICAgcmV0dXJuIHByb3AuZGVzdHJveSgpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLl9wcm9wZXJ0aWVzID0gW107XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgbGlzdGVuZXJBZGRlZChldmVudCwgbGlzdGVuZXIpIHtcclxuICAgIHJldHVybiB0aGlzLl9wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHtcclxuICAgICAgaWYgKHByb3AuZ2V0SW5zdGFuY2VUeXBlKCkucHJvdG90eXBlLmNoYW5nZUV2ZW50TmFtZSA9PT0gZXZlbnQpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5nZXQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGV4dGVuZGVkKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIHRhcmdldC5saXN0ZW5lckFkZGVkID0gdGhpcy5saXN0ZW5lckFkZGVkO1xyXG4gIH1cclxufTtcclxucmV0dXJuKFByb3BlcnR5T3duZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb3BlcnR5T3duZXIuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgQWN0aXZhYmxlUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0FjdGl2YWJsZVByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9QWN0aXZhYmxlUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5BY3RpdmFibGVQcm9wZXJ0eT1BY3RpdmFibGVQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkFjdGl2YWJsZVByb3BlcnR5PUFjdGl2YWJsZVByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIEJhc2ljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCYXNpY1Byb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkJhc2ljUHJvcGVydHkgOiByZXF1aXJlKCcuL0Jhc2ljUHJvcGVydHknKTtcclxudmFyIE92ZXJyaWRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk92ZXJyaWRlclwiKSA/IGRlcGVuZGVuY2llcy5PdmVycmlkZXIgOiByZXF1aXJlKCcuLi9PdmVycmlkZXInKTtcclxudmFyIEFjdGl2YWJsZVByb3BlcnR5O1xyXG5BY3RpdmFibGVQcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBBY3RpdmFibGVQcm9wZXJ0eSBleHRlbmRzIEJhc2ljUHJvcGVydHkge1xyXG4gICAgaXNBY3RpdmUoKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG1hbnVhbEFjdGl2ZSgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWN0aXZlO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbGxiYWNrQWN0aXZlKCkge1xyXG4gICAgICB2YXIgaW52YWxpZGF0b3I7XHJcbiAgICAgIGludmFsaWRhdG9yID0gdGhpcy5hY3RpdmVJbnZhbGlkYXRvciB8fCBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICBpbnZhbGlkYXRvci5yZWN5Y2xlKChpbnZhbGlkYXRvciwgZG9uZSkgPT4ge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlID0gdGhpcy5jYWxsT3B0aW9uRnVuY3QodGhpcy5hY3RpdmVGdW5jdCwgaW52YWxpZGF0b3IpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgICAgICBpZiAodGhpcy5hY3RpdmUgfHwgaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICBpbnZhbGlkYXRvci51bmJpbmQoKTtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmFjdGl2ZUludmFsaWRhdG9yID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IGludmFsaWRhdG9yO1xyXG4gICAgICAgICAgdGhpcy5hY3RpdmVJbnZhbGlkYXRvciA9IGludmFsaWRhdG9yO1xyXG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLmJpbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gdGhpcy5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAodHlwZW9mIHByb3Aub3B0aW9ucy5hY3RpdmUgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBwcm9wLmluc3RhbmNlVHlwZS5leHRlbmQoQWN0aXZhYmxlUHJvcGVydHkpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmFjdGl2ZSA9PT0gXCJib29sZWFuXCIpIHtcclxuICAgICAgICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5hY3RpdmUgPSBwcm9wLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IHRoaXMucHJvdG90eXBlLm1hbnVhbEFjdGl2ZTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9wLm9wdGlvbnMuYWN0aXZlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuYWN0aXZlRnVuY3QgPSBwcm9wLm9wdGlvbnMuYWN0aXZlO1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pc0FjdGl2ZSA9IHRoaXMucHJvdG90eXBlLmNhbGxiYWNrQWN0aXZlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBBY3RpdmFibGVQcm9wZXJ0eS5leHRlbmQoT3ZlcnJpZGVyKTtcclxuXHJcbiAgQWN0aXZhYmxlUHJvcGVydHkub3ZlcnJpZGVzKHtcclxuICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBvdXQ7XHJcbiAgICAgIGlmICh0aGlzLmlzQWN0aXZlKCkpIHtcclxuICAgICAgICBvdXQgPSB0aGlzLmdldC53aXRob3V0QWN0aXZhYmxlUHJvcGVydHkoKTtcclxuICAgICAgICBpZiAodGhpcy5wZW5kaW5nQ2hhbmdlcykge1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VkKHRoaXMucGVuZGluZ09sZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvdXQ7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiB2b2lkIDA7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBjaGFuZ2VkOiBmdW5jdGlvbihvbGQpIHtcclxuICAgICAgaWYgKHRoaXMuaXNBY3RpdmUoKSkge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdPbGQgPSB2b2lkIDA7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkLndpdGhvdXRBY3RpdmFibGVQcm9wZXJ0eShvbGQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wZW5kaW5nT2xkID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgdGhpcy5wZW5kaW5nT2xkID0gb2xkO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIEFjdGl2YWJsZVByb3BlcnR5O1xyXG5cclxufSkuY2FsbCh0aGlzKTtcclxuXHJcbnJldHVybihBY3RpdmFibGVQcm9wZXJ0eSk7fSk7XHJcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvUHJvcGVydHlUeXBlcy9BY3RpdmFibGVQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBCYXNpY1Byb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtCYXNpY1Byb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9QmFzaWNQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkJhc2ljUHJvcGVydHk9QmFzaWNQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkJhc2ljUHJvcGVydHk9QmFzaWNQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgTWl4YWJsZSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk1peGFibGVcIikgPyBkZXBlbmRlbmNpZXMuTWl4YWJsZSA6IHJlcXVpcmUoJy4uL01peGFibGUnKTtcclxudmFyIEJhc2ljUHJvcGVydHk7XHJcbkJhc2ljUHJvcGVydHkgPSBjbGFzcyBCYXNpY1Byb3BlcnR5IGV4dGVuZHMgTWl4YWJsZSB7XHJcbiAgY29uc3RydWN0b3IocHJvcGVydHksIG9iaikge1xyXG4gICAgc3VwZXIoKTtcclxuICAgIHRoaXMucHJvcGVydHkgPSBwcm9wZXJ0eTtcclxuICAgIHRoaXMub2JqID0gb2JqO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgdGhpcy52YWx1ZSA9IHRoaXMuaW5nZXN0KHRoaXMuZGVmYXVsdCk7XHJcbiAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQoKSB7XHJcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlO1xyXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KCk7XHJcbiAgfVxyXG5cclxuICBzZXQodmFsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zZXRBbmRDaGVja0NoYW5nZXModmFsKTtcclxuICB9XHJcblxyXG4gIGNhbGxiYWNrU2V0KHZhbCkge1xyXG4gICAgdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJzZXRcIiwgdmFsKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgc2V0QW5kQ2hlY2tDaGFuZ2VzKHZhbCkge1xyXG4gICAgdmFyIG9sZDtcclxuICAgIHZhbCA9IHRoaXMuaW5nZXN0KHZhbCk7XHJcbiAgICB0aGlzLnJldmFsaWRhdGVkKCk7XHJcbiAgICBpZiAodGhpcy5jaGVja0NoYW5nZXModmFsLCB0aGlzLnZhbHVlKSkge1xyXG4gICAgICBvbGQgPSB0aGlzLnZhbHVlO1xyXG4gICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICB0aGlzLm1hbnVhbCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBjaGVja0NoYW5nZXModmFsLCBvbGQpIHtcclxuICAgIHJldHVybiB2YWwgIT09IG9sZDtcclxuICB9XHJcblxyXG4gIGRlc3Ryb3koKSB7fVxyXG5cclxuICBjYWxsT3B0aW9uRnVuY3QoZnVuY3QsIC4uLmFyZ3MpIHtcclxuICAgIGlmICh0eXBlb2YgZnVuY3QgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGZ1bmN0ID0gdGhpcy5wcm9wZXJ0eS5vcHRpb25zW2Z1bmN0XTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgZnVuY3Qub3ZlcnJpZGVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIGFyZ3MucHVzaCgoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNhbGxPcHRpb25GdW5jdChmdW5jdC5vdmVycmlkZWQsIC4uLmFyZ3MpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdC5hcHBseSh0aGlzLm9iaiwgYXJncyk7XHJcbiAgfVxyXG5cclxuICByZXZhbGlkYXRlZCgpIHtcclxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWU7XHJcbiAgICByZXR1cm4gdGhpcy5pbml0aWF0ZWQgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgaW5nZXN0KHZhbCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaW5nZXN0ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB2YWwgPSB0aGlzLmNhbGxPcHRpb25GdW5jdChcImluZ2VzdFwiLCB2YWwpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG91dHB1dCgpIHtcclxuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLm91dHB1dCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJvdXRwdXRcIiwgdGhpcy52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoYW5nZWQob2xkKSB7XHJcbiAgICB0aGlzLmNhbGxDaGFuZ2VkRnVuY3Rpb25zKG9sZCk7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMub2JqLmVtaXRFdmVudCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICB0aGlzLm9iai5lbWl0RXZlbnQodGhpcy51cGRhdGVFdmVudE5hbWUsIFtvbGRdKTtcclxuICAgICAgdGhpcy5vYmouZW1pdEV2ZW50KHRoaXMuY2hhbmdlRXZlbnROYW1lLCBbb2xkXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGNhbGxDaGFuZ2VkRnVuY3Rpb25zKG9sZCkge1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuY2hhbmdlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmNhbGxPcHRpb25GdW5jdChcImNoYW5nZVwiLCBvbGQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaGFzQ2hhbmdlZEZ1bmN0aW9ucygpIHtcclxuICAgIHJldHVybiB0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNoYW5nZSA9PT0gJ2Z1bmN0aW9uJztcclxuICB9XHJcblxyXG4gIGhhc0NoYW5nZWRFdmVudHMoKSB7XHJcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMub2JqLmdldExpc3RlbmVycyA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLm9iai5nZXRMaXN0ZW5lcnModGhpcy5jaGFuZ2VFdmVudE5hbWUpLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICBpZiAocHJvcC5pbnN0YW5jZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZSA9IGNsYXNzIGV4dGVuZHMgQmFzaWNQcm9wZXJ0eSB7fTtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLnNldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuc2V0ID0gdGhpcy5wcm90b3R5cGUuY2FsbGJhY2tTZXQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuc2V0ID0gdGhpcy5wcm90b3R5cGUuc2V0QW5kQ2hlY2tDaGFuZ2VzO1xyXG4gICAgfVxyXG4gICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmRlZmF1bHQgPSBwcm9wLm9wdGlvbnMuZGVmYXVsdDtcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5pbml0aWF0ZWQgPSB0eXBlb2YgcHJvcC5vcHRpb25zLmRlZmF1bHQgIT09ICd1bmRlZmluZWQnO1xyXG4gICAgcmV0dXJuIHRoaXMuc2V0RXZlbnROYW1lcyhwcm9wKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBzZXRFdmVudE5hbWVzKHByb3ApIHtcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5jaGFuZ2VFdmVudE5hbWUgPSBwcm9wLm9wdGlvbnMuY2hhbmdlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdDaGFuZ2VkJztcclxuICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS51cGRhdGVFdmVudE5hbWUgPSBwcm9wLm9wdGlvbnMudXBkYXRlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdVcGRhdGVkJztcclxuICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5wcm90b3R5cGUuaW52YWxpZGF0ZUV2ZW50TmFtZSA9IHByb3Aub3B0aW9ucy5pbnZhbGlkYXRlRXZlbnROYW1lIHx8IHByb3AubmFtZSArICdJbnZhbGlkYXRlZCc7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgYmluZCh0YXJnZXQsIHByb3ApIHtcclxuICAgIHZhciBtYWosIG9wdDtcclxuICAgIG1haiA9IHByb3AubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3AubmFtZS5zbGljZSgxKTtcclxuICAgIG9wdCA9IHtcclxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmdldEluc3RhbmNlKHRoaXMpLmdldCgpO1xyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gICAgaWYgKHByb3Aub3B0aW9ucy5zZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgIG9wdC5zZXQgPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5zZXQodmFsKTtcclxuICAgICAgfTtcclxuICAgIH1cclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AubmFtZSwgb3B0KTtcclxuICAgIHRhcmdldFsnZ2V0JyArIG1hal0gPSBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuZ2V0KCk7XHJcbiAgICB9O1xyXG4gICAgaWYgKHByb3Aub3B0aW9ucy5zZXQgIT09IGZhbHNlKSB7XHJcbiAgICAgIHRhcmdldFsnc2V0JyArIG1hal0gPSBmdW5jdGlvbih2YWwpIHtcclxuICAgICAgICBwcm9wLmdldEluc3RhbmNlKHRoaXMpLnNldCh2YWwpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRhcmdldFsnaW52YWxpZGF0ZScgKyBtYWpdID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIHByb3AuZ2V0SW5zdGFuY2UodGhpcykuaW52YWxpZGF0ZSgpO1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH07XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihCYXNpY1Byb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0Jhc2ljUHJvcGVydHkuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgQ2FsY3VsYXRlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtDYWxjdWxhdGVkUHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1DYWxjdWxhdGVkUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5DYWxjdWxhdGVkUHJvcGVydHk9Q2FsY3VsYXRlZFByb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuQ2FsY3VsYXRlZFByb3BlcnR5PUNhbGN1bGF0ZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBEeW5hbWljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJEeW5hbWljUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuRHluYW1pY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIE92ZXJyaWRlciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIk92ZXJyaWRlclwiKSA/IGRlcGVuZGVuY2llcy5PdmVycmlkZXIgOiByZXF1aXJlKCcuLi9PdmVycmlkZXInKTtcclxudmFyIENhbGN1bGF0ZWRQcm9wZXJ0eTtcclxuQ2FsY3VsYXRlZFByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIENhbGN1bGF0ZWRQcm9wZXJ0eSBleHRlbmRzIER5bmFtaWNQcm9wZXJ0eSB7XHJcbiAgICBjYWxjdWwoKSB7XHJcbiAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNhbGxPcHRpb25GdW5jdCh0aGlzLmNhbGN1bEZ1bmN0KTtcclxuICAgICAgdGhpcy5tYW51YWwgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlLnByb3RvdHlwZS5jYWxjdWxGdW5jdCA9IHByb3Aub3B0aW9ucy5jYWxjdWw7XHJcbiAgICAgICAgaWYgKCEocHJvcC5vcHRpb25zLmNhbGN1bC5sZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHByb3AuaW5zdGFuY2VUeXBlLmV4dGVuZChDYWxjdWxhdGVkUHJvcGVydHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBDYWxjdWxhdGVkUHJvcGVydHkuZXh0ZW5kKE92ZXJyaWRlcik7XHJcblxyXG4gIENhbGN1bGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xyXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIGluaXRpYXRlZCwgb2xkO1xyXG4gICAgICBpZiAodGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IudmFsaWRhdGVVbmtub3ducygpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XHJcbiAgICAgICAgb2xkID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpbml0aWF0ZWQgPSB0aGlzLmluaXRpYXRlZDtcclxuICAgICAgICB0aGlzLmNhbGN1bCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrQ2hhbmdlcyh0aGlzLnZhbHVlLCBvbGQpKSB7XHJcbiAgICAgICAgICBpZiAoaW5pdGlhdGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlZChvbGQpO1xyXG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5vYmouZW1pdEV2ZW50ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRoaXMub2JqLmVtaXRFdmVudCh0aGlzLnVwZGF0ZUV2ZW50TmFtZSwgW29sZF0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXQoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIENhbGN1bGF0ZWRQcm9wZXJ0eTtcclxuXHJcbn0pLmNhbGwodGhpcyk7XHJcblxyXG5yZXR1cm4oQ2FsY3VsYXRlZFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NhbGN1bGF0ZWRQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBDb2xsZWN0aW9uUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO0NvbGxlY3Rpb25Qcm9wZXJ0eS5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPUNvbGxlY3Rpb25Qcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkNvbGxlY3Rpb25Qcm9wZXJ0eT1Db2xsZWN0aW9uUHJvcGVydHk7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5Db2xsZWN0aW9uUHJvcGVydHk9Q29sbGVjdGlvblByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBEeW5hbWljUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJEeW5hbWljUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuRHluYW1pY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9EeW5hbWljUHJvcGVydHknKTtcclxudmFyIENvbGxlY3Rpb24gPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb2xsZWN0aW9uXCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb24gOiByZXF1aXJlKCcuLi9Db2xsZWN0aW9uJyk7XHJcbnZhciBDb2xsZWN0aW9uUHJvcGVydHk7XHJcbkNvbGxlY3Rpb25Qcm9wZXJ0eSA9IChmdW5jdGlvbigpIHtcclxuICBjbGFzcyBDb2xsZWN0aW9uUHJvcGVydHkgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHkge1xyXG4gICAgaW5nZXN0KHZhbCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcGVydHkub3B0aW9ucy5pbmdlc3QgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB2YWwgPSB0aGlzLmNhbGxPcHRpb25GdW5jdChcImluZ2VzdFwiLCB2YWwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBbXTtcclxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICByZXR1cm4gdmFsLnRvQXJyYXkoKTtcclxuICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcclxuICAgICAgICByZXR1cm4gdmFsLnNsaWNlKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIFt2YWxdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hlY2tDaGFuZ2VkSXRlbXModmFsLCBvbGQpIHtcclxuICAgICAgdmFyIGNvbXBhcmVGdW5jdGlvbjtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbXBhcmUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb21wYXJlRnVuY3Rpb24gPSB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLmNvbXBhcmU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIChuZXcgQ29sbGVjdGlvbih2YWwpKS5jaGVja0NoYW5nZXMob2xkLCB0aGlzLmNvbGxlY3Rpb25PcHRpb25zLm9yZGVyZWQsIGNvbXBhcmVGdW5jdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgb3V0cHV0KCkge1xyXG4gICAgICB2YXIgY29sLCBwcm9wLCB2YWx1ZTtcclxuICAgICAgdmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMucHJvcGVydHkub3B0aW9ucy5vdXRwdXQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwib3V0cHV0XCIsIHRoaXMudmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHByb3AgPSB0aGlzO1xyXG4gICAgICBjb2wgPSBDb2xsZWN0aW9uLm5ld1N1YkNsYXNzKHRoaXMuY29sbGVjdGlvbk9wdGlvbnMsIHZhbHVlKTtcclxuICAgICAgY29sLmNoYW5nZWQgPSBmdW5jdGlvbihvbGQpIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5jaGFuZ2VkKG9sZCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiBjb2w7XHJcbiAgICB9XHJcblxyXG4gICAgY2FsbENoYW5nZWRGdW5jdGlvbnMob2xkKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLml0ZW1BZGRlZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIHRoaXMudmFsdWUuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xyXG4gICAgICAgICAgaWYgKCFvbGQuaW5jbHVkZXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaXRlbUFkZGVkXCIsIGl0ZW0sIGkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLml0ZW1SZW1vdmVkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgb2xkLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcclxuICAgICAgICAgIGlmICghdGhpcy52YWx1ZS5pbmNsdWRlcyhpdGVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxsT3B0aW9uRnVuY3QoXCJpdGVtUmVtb3ZlZFwiLCBpdGVtLCBpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gc3VwZXIuY2FsbENoYW5nZWRGdW5jdGlvbnMob2xkKTtcclxuICAgIH1cclxuXHJcbiAgICBoYXNDaGFuZ2VkRnVuY3Rpb25zKCkge1xyXG4gICAgICByZXR1cm4gc3VwZXIuaGFzQ2hhbmdlZEZ1bmN0aW9ucygpIHx8IHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaXRlbUFkZGVkID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiB0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaXRlbVJlbW92ZWQgPT09ICdmdW5jdGlvbic7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAocHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gIT0gbnVsbCkge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlID0gY2xhc3MgZXh0ZW5kcyBDb2xsZWN0aW9uUHJvcGVydHkge307XHJcbiAgICAgICAgcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmNvbGxlY3Rpb25PcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5kZWZhdWx0Q29sbGVjdGlvbk9wdGlvbnMsIHR5cGVvZiBwcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA9PT0gJ29iamVjdCcgPyBwcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA6IHt9KTtcclxuICAgICAgICBpZiAocHJvcC5vcHRpb25zLmNvbGxlY3Rpb24uY29tcGFyZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmNoZWNrQ2hhbmdlcyA9IHRoaXMucHJvdG90eXBlLmNoZWNrQ2hhbmdlZEl0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBDb2xsZWN0aW9uUHJvcGVydHkuZGVmYXVsdENvbGxlY3Rpb25PcHRpb25zID0ge1xyXG4gICAgY29tcGFyZTogZmFsc2UsXHJcbiAgICBvcmRlcmVkOiB0cnVlXHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIENvbGxlY3Rpb25Qcm9wZXJ0eTtcclxuXHJcbn0pLmNhbGwodGhpcyk7XHJcblxyXG5yZXR1cm4oQ29sbGVjdGlvblByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NvbGxlY3Rpb25Qcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBDb21wb3NlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtDb21wb3NlZFByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9Q29tcG9zZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkNvbXBvc2VkUHJvcGVydHk9Q29tcG9zZWRQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkNvbXBvc2VkUHJvcGVydHk9Q29tcG9zZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgQ2FsY3VsYXRlZFByb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQ2FsY3VsYXRlZFByb3BlcnR5XCIpID8gZGVwZW5kZW5jaWVzLkNhbGN1bGF0ZWRQcm9wZXJ0eSA6IHJlcXVpcmUoJy4vQ2FsY3VsYXRlZFByb3BlcnR5Jyk7XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIENvbGxlY3Rpb24gPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDb2xsZWN0aW9uXCIpID8gZGVwZW5kZW5jaWVzLkNvbGxlY3Rpb24gOiByZXF1aXJlKCcuLi9Db2xsZWN0aW9uJyk7XHJcbnZhciBDb21wb3NlZFByb3BlcnR5O1xyXG5Db21wb3NlZFByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xyXG4gIGNsYXNzIENvbXBvc2VkUHJvcGVydHkgZXh0ZW5kcyBDYWxjdWxhdGVkUHJvcGVydHkge1xyXG4gICAgaW5pdCgpIHtcclxuICAgICAgc3VwZXIuaW5pdCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy5pbml0Q29tcG9zZWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0Q29tcG9zZWQoKSB7XHJcbiAgICAgIGlmICh0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaGFzT3duUHJvcGVydHkoJ2RlZmF1bHQnKSkge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMucHJvcGVydHkub3B0aW9ucy5kZWZhdWx0O1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZGVmYXVsdCA9IHRoaXMudmFsdWUgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMubWVtYmVycyA9IG5ldyBDb21wb3NlZFByb3BlcnR5Lk1lbWJlcnModGhpcy5wcm9wZXJ0eS5vcHRpb25zLm1lbWJlcnMpO1xyXG4gICAgICB0aGlzLm1lbWJlcnMuY2hhbmdlZCA9IChvbGQpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKCk7XHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB0aGlzLmpvaW4gPSB0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNvbXBvc2VkID09PSAnZnVuY3Rpb24nID8gdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmNvbXBvc2VkIDogdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmRlZmF1bHQgPT09IGZhbHNlID8gQ29tcG9zZWRQcm9wZXJ0eS5qb2luRnVuY3Rpb25zLm9yIDogQ29tcG9zZWRQcm9wZXJ0eS5qb2luRnVuY3Rpb25zLmFuZDtcclxuICAgIH1cclxuXHJcbiAgICBjYWxjdWwoKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5tZW1iZXJzLnJlZHVjZSgocHJldiwgbWVtYmVyKSA9PiB7XHJcbiAgICAgICAgICB2YXIgdmFsO1xyXG4gICAgICAgICAgdmFsID0gdHlwZW9mIG1lbWJlciA9PT0gJ2Z1bmN0aW9uJyA/IG1lbWJlcih0aGlzLmludmFsaWRhdG9yKSA6IG1lbWJlcjtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4ocHJldiwgdmFsKTtcclxuICAgICAgICB9LCB0aGlzLmRlZmF1bHQpO1xyXG4gICAgICAgIGRvbmUoKTtcclxuICAgICAgICBpZiAoaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XHJcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRvciA9IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5iaW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgICByZXR1cm4gdGhpcy52YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmIChwcm9wLm9wdGlvbnMuY29tcG9zZWQgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZSA9IGNsYXNzIGV4dGVuZHMgQ29tcG9zZWRQcm9wZXJ0eSB7fTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBiaW5kKHRhcmdldCwgcHJvcCkge1xyXG4gICAgICBDYWxjdWxhdGVkUHJvcGVydHkuYmluZCh0YXJnZXQsIHByb3ApO1xyXG4gICAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcC5uYW1lICsgJ01lbWJlcnMnLCB7XHJcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgICAgIGdldDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICByZXR1cm4gcHJvcC5nZXRJbnN0YW5jZSh0aGlzKS5tZW1iZXJzO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIENvbXBvc2VkUHJvcGVydHkuam9pbkZ1bmN0aW9ucyA9IHtcclxuICAgIGFuZDogZnVuY3Rpb24oYSwgYikge1xyXG4gICAgICByZXR1cm4gYSAmJiBiO1xyXG4gICAgfSxcclxuICAgIG9yOiBmdW5jdGlvbihhLCBiKSB7XHJcbiAgICAgIHJldHVybiBhIHx8IGI7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuIENvbXBvc2VkUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxuQ29tcG9zZWRQcm9wZXJ0eS5NZW1iZXJzID0gY2xhc3MgTWVtYmVycyBleHRlbmRzIENvbGxlY3Rpb24ge1xyXG4gIGFkZFByb3BlcnR5UmVmKG5hbWUsIG9iaikge1xyXG4gICAgdmFyIGZuO1xyXG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaikgPT09IC0xKSB7XHJcbiAgICAgIGZuID0gZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcclxuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcChuYW1lLCBvYmopO1xyXG4gICAgICB9O1xyXG4gICAgICBmbi5yZWYgPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBvYmo6IG9ialxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFkZFZhbHVlUmVmKHZhbCwgbmFtZSwgb2JqKSB7XHJcbiAgICB2YXIgZm47XHJcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKSA9PT0gLTEpIHtcclxuICAgICAgZm4gPSBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH07XHJcbiAgICAgIGZuLnJlZiA9IHtcclxuICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgIG9iajogb2JqLFxyXG4gICAgICAgIHZhbDogdmFsXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiB0aGlzLnB1c2goZm4pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0VmFsdWVSZWYodmFsLCBuYW1lLCBvYmopIHtcclxuICAgIHZhciBmbiwgaSwgcmVmO1xyXG4gICAgaSA9IHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaik7XHJcbiAgICBpZiAoaSA9PT0gLTEpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuYWRkVmFsdWVSZWYodmFsLCBuYW1lLCBvYmopO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmdldChpKS5yZWYudmFsICE9PSB2YWwpIHtcclxuICAgICAgcmVmID0ge1xyXG4gICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgb2JqOiBvYmosXHJcbiAgICAgICAgdmFsOiB2YWxcclxuICAgICAgfTtcclxuICAgICAgZm4gPSBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgIH07XHJcbiAgICAgIGZuLnJlZiA9IHJlZjtcclxuICAgICAgcmV0dXJuIHRoaXMuc2V0KGksIGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldFZhbHVlUmVmKG5hbWUsIG9iaikge1xyXG4gICAgcmV0dXJuIHRoaXMuZmluZEJ5UmVmKG5hbWUsIG9iaikucmVmLnZhbDtcclxuICB9XHJcblxyXG4gIGFkZEZ1bmN0aW9uUmVmKGZuLCBuYW1lLCBvYmopIHtcclxuICAgIGlmICh0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopID09PSAtMSkge1xyXG4gICAgICBmbi5yZWYgPSB7XHJcbiAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICBvYmo6IG9ialxyXG4gICAgICB9O1xyXG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGZuKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZpbmRCeVJlZihuYW1lLCBvYmopIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheVt0aGlzLmZpbmRSZWZJbmRleChuYW1lLCBvYmopXTtcclxuICB9XHJcblxyXG4gIGZpbmRSZWZJbmRleChuYW1lLCBvYmopIHtcclxuICAgIHJldHVybiB0aGlzLl9hcnJheS5maW5kSW5kZXgoZnVuY3Rpb24obWVtYmVyKSB7XHJcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLm9iaiA9PT0gb2JqICYmIG1lbWJlci5yZWYubmFtZSA9PT0gbmFtZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVtb3ZlUmVmKG5hbWUsIG9iaikge1xyXG4gICAgdmFyIGluZGV4LCBvbGQ7XHJcbiAgICBpbmRleCA9IHRoaXMuZmluZFJlZkluZGV4KG5hbWUsIG9iaik7XHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpO1xyXG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICByZXR1cm4gdGhpcy5jaGFuZ2VkKG9sZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnJldHVybihDb21wb3NlZFByb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0NvbXBvc2VkUHJvcGVydHkuanMubWFwXHJcbiIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgRHluYW1pY1Byb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtEeW5hbWljUHJvcGVydHkuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1EeW5hbWljUHJvcGVydHk7fWVsc2V7aWYodHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIiYmU3BhcmshPT1udWxsKXtTcGFyay5EeW5hbWljUHJvcGVydHk9RHluYW1pY1Byb3BlcnR5O31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuRHluYW1pY1Byb3BlcnR5PUR5bmFtaWNQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBCYXNpY1Byb3BlcnR5ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiQmFzaWNQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5CYXNpY1Byb3BlcnR5IDogcmVxdWlyZSgnLi9CYXNpY1Byb3BlcnR5Jyk7XHJcbnZhciBEeW5hbWljUHJvcGVydHk7XHJcbkR5bmFtaWNQcm9wZXJ0eSA9IGNsYXNzIER5bmFtaWNQcm9wZXJ0eSBleHRlbmRzIEJhc2ljUHJvcGVydHkge1xyXG4gIGNhbGxiYWNrR2V0KCkge1xyXG4gICAgdmFyIHJlcztcclxuICAgIHJlcyA9IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiZ2V0XCIpO1xyXG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpO1xyXG4gICAgcmV0dXJuIHJlcztcclxuICB9XHJcblxyXG4gIGludmFsaWRhdGUoKSB7XHJcbiAgICBpZiAodGhpcy5jYWxjdWxhdGVkIHx8IHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmNhbGN1bGF0ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5faW52YWxpZGF0ZU5vdGljZSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBfaW52YWxpZGF0ZU5vdGljZSgpIHtcclxuICAgIGlmICh0aGlzLmlzSW1tZWRpYXRlKCkpIHtcclxuICAgICAgdGhpcy5nZXQoKTtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLm9iai5lbWl0RXZlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLm9iai5lbWl0RXZlbnQodGhpcy5pbnZhbGlkYXRlRXZlbnROYW1lKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzSW1tZWRpYXRlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJvcGVydHkub3B0aW9ucy5pbW1lZGlhdGUgIT09IGZhbHNlICYmICh0aGlzLnByb3BlcnR5Lm9wdGlvbnMuaW1tZWRpYXRlID09PSB0cnVlIHx8ICh0eXBlb2YgdGhpcy5wcm9wZXJ0eS5vcHRpb25zLmltbWVkaWF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IHRoaXMuY2FsbE9wdGlvbkZ1bmN0KFwiaW1tZWRpYXRlXCIpIDogdGhpcy5oYXNDaGFuZ2VkRXZlbnRzKCkgfHwgdGhpcy5oYXNDaGFuZ2VkRnVuY3Rpb25zKCkpKTtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBjb21wb3NlKHByb3ApIHtcclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmdldCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcHJvcC5vcHRpb25zLmFjdGl2ZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICBpZiAocHJvcC5pbnN0YW5jZVR5cGUgPT0gbnVsbCkge1xyXG4gICAgICAgIHByb3AuaW5zdGFuY2VUeXBlID0gY2xhc3MgZXh0ZW5kcyBEeW5hbWljUHJvcGVydHkge307XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmdldCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUucHJvdG90eXBlLmdldCA9IHRoaXMucHJvdG90eXBlLmNhbGxiYWNrR2V0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn07XHJcblxyXG5yZXR1cm4oRHluYW1pY1Byb3BlcnR5KTt9KTtcclxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Li4vbWFwcy9Qcm9wZXJ0eVR5cGVzL0R5bmFtaWNQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBJbnZhbGlkYXRlZFByb3BlcnR5PWRlZmluaXRpb24odHlwZW9mIFNwYXJrIT09XCJ1bmRlZmluZWRcIj9TcGFyazp0aGlzLlNwYXJrKTtJbnZhbGlkYXRlZFByb3BlcnR5LmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLkludmFsaWRhdGVkUHJvcGVydHk9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0aGlzLlNwYXJrPT1udWxsKXt0aGlzLlNwYXJrPXt9O310aGlzLlNwYXJrLkludmFsaWRhdGVkUHJvcGVydHk9SW52YWxpZGF0ZWRQcm9wZXJ0eTt9fX0pKGZ1bmN0aW9uKGRlcGVuZGVuY2llcyl7aWYoZGVwZW5kZW5jaWVzPT1udWxsKXtkZXBlbmRlbmNpZXM9e307fVxyXG52YXIgSW52YWxpZGF0b3IgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJJbnZhbGlkYXRvclwiKSA/IGRlcGVuZGVuY2llcy5JbnZhbGlkYXRvciA6IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJyk7XHJcbnZhciBDYWxjdWxhdGVkUHJvcGVydHkgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJDYWxjdWxhdGVkUHJvcGVydHlcIikgPyBkZXBlbmRlbmNpZXMuQ2FsY3VsYXRlZFByb3BlcnR5IDogcmVxdWlyZSgnLi9DYWxjdWxhdGVkUHJvcGVydHknKTtcclxudmFyIEludmFsaWRhdGVkUHJvcGVydHk7XHJcbkludmFsaWRhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgSW52YWxpZGF0ZWRQcm9wZXJ0eSBleHRlbmRzIENhbGN1bGF0ZWRQcm9wZXJ0eSB7XHJcbiAgICB1bmtub3duKCkge1xyXG4gICAgICBpZiAodGhpcy5jYWxjdWxhdGVkIHx8IHRoaXMuYWN0aXZlID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGVOb3RpY2UoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgY29tcG9zZShwcm9wKSB7XHJcbiAgICAgIGlmICh0eXBlb2YgcHJvcC5vcHRpb25zLmNhbGN1bCA9PT0gJ2Z1bmN0aW9uJyAmJiBwcm9wLm9wdGlvbnMuY2FsY3VsLmxlbmd0aCA+IDApIHtcclxuICAgICAgICByZXR1cm4gcHJvcC5pbnN0YW5jZVR5cGUuZXh0ZW5kKEludmFsaWRhdGVkUHJvcGVydHkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIH07XHJcblxyXG4gIEludmFsaWRhdGVkUHJvcGVydHkub3ZlcnJpZGVzKHtcclxuICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICghdGhpcy5pbnZhbGlkYXRvcikge1xyXG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5vYmopO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jYWxsT3B0aW9uRnVuY3QodGhpcy5jYWxjdWxGdW5jdCwgaW52YWxpZGF0b3IpO1xyXG4gICAgICAgIHRoaXMubWFudWFsID0gZmFsc2U7XHJcbiAgICAgICAgZG9uZSgpO1xyXG4gICAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yID0gbnVsbDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLmJpbmQoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLnJldmFsaWRhdGVkKCk7XHJcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xyXG4gICAgfSxcclxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB0aGlzLmRlc3Ryb3kud2l0aG91dEludmFsaWRhdGVkUHJvcGVydHkoKTtcclxuICAgICAgaWYgKHRoaXMuaW52YWxpZGF0b3IgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgaW52YWxpZGF0ZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgIGlmICh0aGlzLmNhbGN1bGF0ZWQgfHwgdGhpcy5hY3RpdmUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuX2ludmFsaWRhdGVOb3RpY2UoKSAmJiAhdGhpcy5jYWxjdWxhdGVkICYmICh0aGlzLmludmFsaWRhdG9yICE9IG51bGwpKSB7XHJcbiAgICAgICAgICB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIEludmFsaWRhdGVkUHJvcGVydHk7XHJcblxyXG59KS5jYWxsKHRoaXMpO1xyXG5cclxucmV0dXJuKEludmFsaWRhdGVkUHJvcGVydHkpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvSW52YWxpZGF0ZWRQcm9wZXJ0eS5qcy5tYXBcclxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBVcGRhdGVkUHJvcGVydHk9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO1VwZGF0ZWRQcm9wZXJ0eS5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPVVwZGF0ZWRQcm9wZXJ0eTt9ZWxzZXtpZih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiJiZTcGFyayE9PW51bGwpe1NwYXJrLlVwZGF0ZWRQcm9wZXJ0eT1VcGRhdGVkUHJvcGVydHk7fWVsc2V7aWYodGhpcy5TcGFyaz09bnVsbCl7dGhpcy5TcGFyaz17fTt9dGhpcy5TcGFyay5VcGRhdGVkUHJvcGVydHk9VXBkYXRlZFByb3BlcnR5O319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBJbnZhbGlkYXRvciA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkludmFsaWRhdG9yXCIpID8gZGVwZW5kZW5jaWVzLkludmFsaWRhdG9yIDogcmVxdWlyZSgnLi4vSW52YWxpZGF0b3InKTtcclxudmFyIER5bmFtaWNQcm9wZXJ0eSA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkR5bmFtaWNQcm9wZXJ0eVwiKSA/IGRlcGVuZGVuY2llcy5EeW5hbWljUHJvcGVydHkgOiByZXF1aXJlKCcuL0R5bmFtaWNQcm9wZXJ0eScpO1xyXG52YXIgT3ZlcnJpZGVyID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiT3ZlcnJpZGVyXCIpID8gZGVwZW5kZW5jaWVzLk92ZXJyaWRlciA6IHJlcXVpcmUoJy4uL092ZXJyaWRlcicpO1xyXG52YXIgVXBkYXRlZFByb3BlcnR5O1xyXG5VcGRhdGVkUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XHJcbiAgY2xhc3MgVXBkYXRlZFByb3BlcnR5IGV4dGVuZHMgRHluYW1pY1Byb3BlcnR5IHtcclxuICAgIGluaXRSZXZhbGlkYXRlKCkge1xyXG4gICAgICB0aGlzLnJldmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnVwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmdldCgpO1xyXG4gICAgICAgIHRoaXMuZ2V0VXBkYXRlcigpLnVuYmluZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdDaGFuZ2VzKSB7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZWQodGhpcy5wZW5kaW5nT2xkKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcclxuICAgICAgfTtcclxuICAgICAgcmV0dXJuIHRoaXMucmV2YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRVcGRhdGVyKCkge1xyXG4gICAgICBpZiAodHlwZW9mIHRoaXMudXBkYXRlciA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wZXJ0eS5vcHRpb25zLnVwZGF0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy51cGRhdGVyID0gdGhpcy5wcm9wZXJ0eS5vcHRpb25zLnVwZGF0ZXI7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudXBkYXRlci5nZXRCaW5kZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVyID0gdGhpcy51cGRhdGVyLmdldEJpbmRlcigpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnVwZGF0ZXIuYmluZCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgdGhpcy51cGRhdGVyLnVuYmluZCAhPT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZXIgPSBudWxsO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVyLmNhbGxiYWNrID0gdGhpcy5yZXZhbGlkYXRlQ2FsbGJhY2s7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMudXBkYXRlciA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZXI7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGNvbXBvc2UocHJvcCkge1xyXG4gICAgICBpZiAocHJvcC5vcHRpb25zLnVwZGF0ZXIgIT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBwcm9wLmluc3RhbmNlVHlwZS5leHRlbmQoVXBkYXRlZFByb3BlcnR5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICBVcGRhdGVkUHJvcGVydHkuZXh0ZW5kKE92ZXJyaWRlcik7XHJcblxyXG4gIFVwZGF0ZWRQcm9wZXJ0eS5vdmVycmlkZXMoe1xyXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuaW5pdC53aXRob3V0VXBkYXRlZFByb3BlcnR5KCk7XHJcbiAgICAgIHJldHVybiB0aGlzLmluaXRSZXZhbGlkYXRlKCk7XHJcbiAgICB9LFxyXG4gICAgX2ludmFsaWRhdGVOb3RpY2U6IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgcmVzO1xyXG4gICAgICByZXMgPSB0aGlzLl9pbnZhbGlkYXRlTm90aWNlLndpdGhvdXRVcGRhdGVkUHJvcGVydHkoKTtcclxuICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgIHRoaXMuZ2V0VXBkYXRlcigpLmJpbmQoKTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gcmVzO1xyXG4gICAgfSxcclxuICAgIGlzSW1tZWRpYXRlOiBmdW5jdGlvbigpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSxcclxuICAgIGNoYW5nZWQ6IGZ1bmN0aW9uKG9sZCkge1xyXG4gICAgICBpZiAodGhpcy51cGRhdGluZykge1xyXG4gICAgICAgIHRoaXMucGVuZGluZ0NoYW5nZXMgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnBlbmRpbmdPbGQgPSB2b2lkIDA7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VkLndpdGhvdXRVcGRhdGVkUHJvcGVydHkob2xkKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnBlbmRpbmdDaGFuZ2VzID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMucGVuZGluZ09sZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgIHRoaXMucGVuZGluZ09sZCA9IG9sZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRVcGRhdGVyKCkuYmluZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gVXBkYXRlZFByb3BlcnR5O1xyXG5cclxufSkuY2FsbCh0aGlzKTtcclxuXHJcbnJldHVybihVcGRhdGVkUHJvcGVydHkpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL1Byb3BlcnR5VHlwZXMvVXBkYXRlZFByb3BlcnR5LmpzLm1hcFxyXG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFVwZGF0ZXI9ZGVmaW5pdGlvbih0eXBlb2YgU3BhcmshPT1cInVuZGVmaW5lZFwiP1NwYXJrOnRoaXMuU3BhcmspO1VwZGF0ZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1VcGRhdGVyO31lbHNle2lmKHR5cGVvZiBTcGFyayE9PVwidW5kZWZpbmVkXCImJlNwYXJrIT09bnVsbCl7U3BhcmsuVXBkYXRlcj1VcGRhdGVyO31lbHNle2lmKHRoaXMuU3Bhcms9PW51bGwpe3RoaXMuU3Bhcms9e307fXRoaXMuU3BhcmsuVXBkYXRlcj1VcGRhdGVyO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XHJcbnZhciBCaW5kZXIgPSBkZXBlbmRlbmNpZXMuaGFzT3duUHJvcGVydHkoXCJCaW5kZXJcIikgPyBkZXBlbmRlbmNpZXMuQmluZGVyIDogcmVxdWlyZSgnLi9CaW5kZXInKTtcclxudmFyIFVwZGF0ZXI7XHJcblVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XHJcbiAgICB0aGlzLm5leHQgPSBbXTtcclxuICAgIHRoaXMudXBkYXRpbmcgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpIHtcclxuICAgIHZhciBjYWxsYmFjaztcclxuICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgdGhpcy5uZXh0ID0gdGhpcy5jYWxsYmFja3Muc2xpY2UoKTtcclxuICAgIHdoaWxlICh0aGlzLmNhbGxiYWNrcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3Muc2hpZnQoKTtcclxuICAgICAgY2FsbGJhY2soKTtcclxuICAgIH1cclxuICAgIHRoaXMuY2FsbGJhY2tzID0gdGhpcy5uZXh0O1xyXG4gICAgdGhpcy51cGRhdGluZyA9IGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRDYWxsYmFjayhjYWxsYmFjaykge1xyXG4gICAgaWYgKCF0aGlzLmNhbGxiYWNrcy5pbmNsdWRlcyhjYWxsYmFjaykpIHtcclxuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy51cGRhdGluZyAmJiAhdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmV4dFRpY2soY2FsbGJhY2spIHtcclxuICAgIGlmICh0aGlzLnVwZGF0aW5nKSB7XHJcbiAgICAgIGlmICghdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5leHQucHVzaChjYWxsYmFjayk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmFkZENhbGxiYWNrKGNhbGxiYWNrKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlbW92ZUNhbGxiYWNrKGNhbGxiYWNrKSB7XHJcbiAgICB2YXIgaW5kZXg7XHJcbiAgICBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoY2FsbGJhY2spO1xyXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG4gICAgaW5kZXggPSB0aGlzLm5leHQuaW5kZXhPZihjYWxsYmFjayk7XHJcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLm5leHQuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldEJpbmRlcigpIHtcclxuICAgIHJldHVybiBuZXcgVXBkYXRlci5CaW5kZXIodGhpcyk7XHJcbiAgfVxyXG5cclxuICBkZXN0cm95KCkge1xyXG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcclxuICAgIHJldHVybiB0aGlzLm5leHQgPSBbXTtcclxuICB9XHJcblxyXG59O1xyXG5cclxuVXBkYXRlci5CaW5kZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xyXG4gIGNsYXNzIEJpbmRlciBleHRlbmRzIHN1cGVyQ2xhc3Mge1xyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBjYWxsYmFjazEpIHtcclxuICAgICAgc3VwZXIoKTtcclxuICAgICAgdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjazE7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmVmKCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQsXHJcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBkb0JpbmQoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5hZGRDYWxsYmFjayh0aGlzLmNhbGxiYWNrKTtcclxuICAgIH1cclxuXHJcbiAgICBkb1VuYmluZCgpIHtcclxuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xyXG4gICAgfVxyXG5cclxuICB9O1xyXG5cclxuICByZXR1cm4gQmluZGVyO1xyXG5cclxufSkuY2FsbCh0aGlzLCBCaW5kZXIpO1xyXG5cclxucmV0dXJuKFVwZGF0ZXIpO30pO1xyXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1VwZGF0ZXIuanMubWFwXHJcbiIsImlmKG1vZHVsZSl7XHJcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBCaW5kZXI6IHJlcXVpcmUoJy4vQmluZGVyLmpzJyksXHJcbiAgICBDb2xsZWN0aW9uOiByZXF1aXJlKCcuL0NvbGxlY3Rpb24uanMnKSxcclxuICAgIEVsZW1lbnQ6IHJlcXVpcmUoJy4vRWxlbWVudC5qcycpLFxyXG4gICAgRXZlbnRCaW5kOiByZXF1aXJlKCcuL0V2ZW50QmluZC5qcycpLFxyXG4gICAgRXZlbnRFbWl0dGVyOiByZXF1aXJlKCcuL0V2ZW50RW1pdHRlci5qcycpLFxyXG4gICAgSW52YWxpZGF0b3I6IHJlcXVpcmUoJy4vSW52YWxpZGF0b3IuanMnKSxcclxuICAgIE1peGFibGU6IHJlcXVpcmUoJy4vTWl4YWJsZS5qcycpLFxyXG4gICAgT3ZlcnJpZGVyOiByZXF1aXJlKCcuL092ZXJyaWRlci5qcycpLFxyXG4gICAgUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHkuanMnKSxcclxuICAgIFByb3BlcnR5T3duZXI6IHJlcXVpcmUoJy4vUHJvcGVydHlPd25lci5qcycpLFxyXG4gICAgVXBkYXRlcjogcmVxdWlyZSgnLi9VcGRhdGVyLmpzJyksXHJcbiAgICBBY3RpdmFibGVQcm9wZXJ0eTogcmVxdWlyZSgnLi9Qcm9wZXJ0eVR5cGVzL0FjdGl2YWJsZVByb3BlcnR5LmpzJyksXHJcbiAgICBCYXNpY1Byb3BlcnR5OiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQmFzaWNQcm9wZXJ0eS5qcycpLFxyXG4gICAgQ2FsY3VsYXRlZFByb3BlcnR5OiByZXF1aXJlKCcuL1Byb3BlcnR5VHlwZXMvQ2FsY3VsYXRlZFByb3BlcnR5LmpzJyksXHJcbiAgICBDb2xsZWN0aW9uUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db2xsZWN0aW9uUHJvcGVydHkuanMnKSxcclxuICAgIENvbXBvc2VkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9Db21wb3NlZFByb3BlcnR5LmpzJyksXHJcbiAgICBEeW5hbWljUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9EeW5hbWljUHJvcGVydHkuanMnKSxcclxuICAgIEludmFsaWRhdGVkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9JbnZhbGlkYXRlZFByb3BlcnR5LmpzJyksXHJcbiAgICBVcGRhdGVkUHJvcGVydHk6IHJlcXVpcmUoJy4vUHJvcGVydHlUeXBlcy9VcGRhdGVkUHJvcGVydHkuanMnKVxyXG4gIH07XHJcbn0iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFBhdGhGaW5kZXI9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO1BhdGhGaW5kZXIuZGVmaW5pdGlvbj1kZWZpbml0aW9uO2lmKHR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiJiZtb2R1bGUhPT1udWxsKXttb2R1bGUuZXhwb3J0cz1QYXRoRmluZGVyO31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uUGF0aEZpbmRlcj1QYXRoRmluZGVyO31lbHNle2lmKHRoaXMuUGFyYWxsZWxpbz09bnVsbCl7dGhpcy5QYXJhbGxlbGlvPXt9O310aGlzLlBhcmFsbGVsaW8uUGF0aEZpbmRlcj1QYXRoRmluZGVyO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIFBhdGhGaW5kZXI7XG5QYXRoRmluZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBQYXRoRmluZGVyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodGlsZXNDb250YWluZXIsIGZyb20xLCB0bzEsIG9wdGlvbnMgPSB7fSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMudGlsZXNDb250YWluZXIgPSB0aWxlc0NvbnRhaW5lcjtcbiAgICAgIHRoaXMuZnJvbSA9IGZyb20xO1xuICAgICAgdGhpcy50byA9IHRvMTtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgIGlmIChvcHRpb25zLnZhbGlkVGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsaWRUaWxlQ2FsbGJhY2sgPSBvcHRpb25zLnZhbGlkVGlsZTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmFycml2ZWQgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmFycml2ZWRDYWxsYmFjayA9IG9wdGlvbnMuYXJyaXZlZDtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb25zLmVmZmljaWVuY3kgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3lDYWxsYmFjayA9IG9wdGlvbnMuZWZmaWNpZW5jeTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHRoaXMucGF0aHMgPSB7fTtcbiAgICAgIHRoaXMuc29sdXRpb24gPSBudWxsO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNhbGN1bCgpIHtcbiAgICAgIHdoaWxlICghdGhpcy5zb2x1dGlvbiAmJiAoIXRoaXMuc3RhcnRlZCB8fCB0aGlzLnF1ZXVlLmxlbmd0aCkpIHtcbiAgICAgICAgdGhpcy5zdGVwKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5nZXRQYXRoKCk7XG4gICAgfVxuXG4gICAgc3RlcCgpIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgIG5leHQgPSB0aGlzLnF1ZXVlLnBvcCgpO1xuICAgICAgICB0aGlzLmFkZE5leHRTdGVwcyhuZXh0KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLnN0YXJ0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgIHRoaXMuc3RhcnRlZCA9IHRydWU7XG4gICAgICBpZiAodGhpcy50byA9PT0gZmFsc2UgfHwgdGhpcy50aWxlSXNWYWxpZCh0aGlzLnRvKSkge1xuICAgICAgICB0aGlzLmFkZE5leHRTdGVwcygpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYXRoKCkge1xuICAgICAgdmFyIHJlcywgc3RlcDtcbiAgICAgIGlmICh0aGlzLnNvbHV0aW9uKSB7XG4gICAgICAgIHJlcyA9IFt0aGlzLnNvbHV0aW9uXTtcbiAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgIHdoaWxlIChzdGVwLnByZXYgIT0gbnVsbCkge1xuICAgICAgICAgIHJlcy51bnNoaWZ0KHN0ZXAucHJldik7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFBvc0F0UHJjKHByYykge1xuICAgICAgaWYgKGlzTmFOKHByYykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG51bWJlcicpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UG9zQXRUaW1lKHRoaXMuc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKSAqIHByYyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zQXRUaW1lKHRpbWUpIHtcbiAgICAgIHZhciBwcmMsIHN0ZXA7XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICBpZiAodGltZSA+PSB0aGlzLnNvbHV0aW9uLmdldFRvdGFsTGVuZ3RoKCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zb2x1dGlvbi5wb3NUb1RpbGVPZmZzZXQodGhpcy5zb2x1dGlvbi5nZXRFeGl0KCkueCwgdGhpcy5zb2x1dGlvbi5nZXRFeGl0KCkueSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgICAgd2hpbGUgKHN0ZXAuZ2V0U3RhcnRMZW5ndGgoKSA+IHRpbWUgJiYgKHN0ZXAucHJldiAhPSBudWxsKSkge1xuICAgICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcHJjID0gKHRpbWUgLSBzdGVwLmdldFN0YXJ0TGVuZ3RoKCkpIC8gc3RlcC5nZXRMZW5ndGgoKTtcbiAgICAgICAgICByZXR1cm4gc3RlcC5wb3NUb1RpbGVPZmZzZXQoc3RlcC5nZXRFbnRyeSgpLnggKyAoc3RlcC5nZXRFeGl0KCkueCAtIHN0ZXAuZ2V0RW50cnkoKS54KSAqIHByYywgc3RlcC5nZXRFbnRyeSgpLnkgKyAoc3RlcC5nZXRFeGl0KCkueSAtIHN0ZXAuZ2V0RW50cnkoKS55KSAqIHByYyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTb2x1dGlvblRpbGVMaXN0KCkge1xuICAgICAgdmFyIHN0ZXAsIHRpbGVsaXN0O1xuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgc3RlcCA9IHRoaXMuc29sdXRpb247XG4gICAgICAgIHRpbGVsaXN0ID0gW3N0ZXAudGlsZV07XG4gICAgICAgIHdoaWxlIChzdGVwLnByZXYgIT0gbnVsbCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwLnByZXY7XG4gICAgICAgICAgdGlsZWxpc3QudW5zaGlmdChzdGVwLnRpbGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aWxlbGlzdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWxlSXNWYWxpZCh0aWxlKSB7XG4gICAgICBpZiAodGhpcy52YWxpZFRpbGVDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbGlkVGlsZUNhbGxiYWNrKHRpbGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICh0aWxlICE9IG51bGwpICYmICghdGlsZS5lbXVsYXRlZCB8fCAodGlsZS50aWxlICE9PSAwICYmIHRpbGUudGlsZSAhPT0gZmFsc2UpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRUaWxlKHgsIHkpIHtcbiAgICAgIHZhciByZWYxO1xuICAgICAgaWYgKHRoaXMudGlsZXNDb250YWluZXIuZ2V0VGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVzQ29udGFpbmVyLmdldFRpbGUoeCwgeSk7XG4gICAgICB9IGVsc2UgaWYgKCgocmVmMSA9IHRoaXMudGlsZXNDb250YWluZXJbeV0pICE9IG51bGwgPyByZWYxW3hdIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgeDogeCxcbiAgICAgICAgICB5OiB5LFxuICAgICAgICAgIHRpbGU6IHRoaXMudGlsZXNDb250YWluZXJbeV1beF0sXG4gICAgICAgICAgZW11bGF0ZWQ6IHRydWVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb25uZWN0ZWRUb1RpbGUodGlsZSkge1xuICAgICAgdmFyIGNvbm5lY3RlZCwgdDtcbiAgICAgIGlmICh0aWxlLmdldENvbm5lY3RlZCAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aWxlLmdldENvbm5lY3RlZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29ubmVjdGVkID0gW107XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCArIDEsIHRpbGUueSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA9IHRoaXMuZ2V0VGlsZSh0aWxlLnggLSAxLCB0aWxlLnkpKSB7XG4gICAgICAgICAgY29ubmVjdGVkLnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54LCB0aWxlLnkgKyAxKSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCwgdGlsZS55IC0gMSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFkZE5leHRTdGVwcyhzdGVwID0gbnVsbCkge1xuICAgICAgdmFyIGksIGxlbiwgbmV4dCwgcmVmMSwgcmVzdWx0cywgdGlsZTtcbiAgICAgIHRpbGUgPSBzdGVwICE9IG51bGwgPyBzdGVwLm5leHRUaWxlIDogdGhpcy5mcm9tO1xuICAgICAgcmVmMSA9IHRoaXMuZ2V0Q29ubmVjdGVkVG9UaWxlKHRpbGUpO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmMS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBuZXh0ID0gcmVmMVtpXTtcbiAgICAgICAgaWYgKHRoaXMudGlsZUlzVmFsaWQobmV4dCkpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2godGhpcy5hZGRTdGVwKG5ldyBQYXRoRmluZGVyLlN0ZXAodGhpcywgKHN0ZXAgIT0gbnVsbCA/IHN0ZXAgOiBudWxsKSwgdGlsZSwgbmV4dCkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2godm9pZCAwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAgdGlsZUVxdWFsKHRpbGVBLCB0aWxlQikge1xuICAgICAgcmV0dXJuIHRpbGVBID09PSB0aWxlQiB8fCAoKHRpbGVBLmVtdWxhdGVkIHx8IHRpbGVCLmVtdWxhdGVkKSAmJiB0aWxlQS54ID09PSB0aWxlQi54ICYmIHRpbGVBLnkgPT09IHRpbGVCLnkpO1xuICAgIH1cblxuICAgIGFycml2ZWRBdERlc3RpbmF0aW9uKHN0ZXApIHtcbiAgICAgIGlmICh0aGlzLmFycml2ZWRDYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFycml2ZWRDYWxsYmFjayhzdGVwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbGVFcXVhbChzdGVwLnRpbGUsIHRoaXMudG8pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0ZXAoc3RlcCkge1xuICAgICAgdmFyIHNvbHV0aW9uQ2FuZGlkYXRlO1xuICAgICAgaWYgKHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdID0ge307XG4gICAgICB9XG4gICAgICBpZiAoISgodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSAhPSBudWxsKSAmJiB0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldLmdldFRvdGFsTGVuZ3RoKCkgPD0gc3RlcC5nZXRUb3RhbExlbmd0aCgpKSkge1xuICAgICAgICBpZiAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5yZW1vdmVTdGVwKHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0gPSBzdGVwO1xuICAgICAgICB0aGlzLnF1ZXVlLnNwbGljZSh0aGlzLmdldFN0ZXBSYW5rKHN0ZXApLCAwLCBzdGVwKTtcbiAgICAgICAgc29sdXRpb25DYW5kaWRhdGUgPSBuZXcgUGF0aEZpbmRlci5TdGVwKHRoaXMsIHN0ZXAsIHN0ZXAubmV4dFRpbGUsIG51bGwpO1xuICAgICAgICBpZiAodGhpcy5hcnJpdmVkQXREZXN0aW5hdGlvbihzb2x1dGlvbkNhbmRpZGF0ZSkgJiYgISgodGhpcy5zb2x1dGlvbiAhPSBudWxsKSAmJiB0aGlzLnNvbHV0aW9uLnByZXYuZ2V0VG90YWxMZW5ndGgoKSA8PSBzdGVwLmdldFRvdGFsTGVuZ3RoKCkpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc29sdXRpb24gPSBzb2x1dGlvbkNhbmRpZGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJlbW92ZVN0ZXAoc3RlcCkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgaW5kZXggPSB0aGlzLnF1ZXVlLmluZGV4T2Yoc3RlcCk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGJlc3QoKSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZVt0aGlzLnF1ZXVlLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIGdldFN0ZXBSYW5rKHN0ZXApIHtcbiAgICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTdGVwUmFuayhzdGVwLmdldEVmZmljaWVuY3koKSwgMCwgdGhpcy5xdWV1ZS5sZW5ndGggLSAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBfZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgbWluLCBtYXgpIHtcbiAgICAgIHZhciByZWYsIHJlZlBvcztcbiAgICAgIHJlZlBvcyA9IE1hdGguZmxvb3IoKG1heCAtIG1pbikgLyAyKSArIG1pbjtcbiAgICAgIHJlZiA9IHRoaXMucXVldWVbcmVmUG9zXS5nZXRFZmZpY2llbmN5KCk7XG4gICAgICBpZiAocmVmID09PSBlZmZpY2llbmN5KSB7XG4gICAgICAgIHJldHVybiByZWZQb3M7XG4gICAgICB9IGVsc2UgaWYgKHJlZiA+IGVmZmljaWVuY3kpIHtcbiAgICAgICAgaWYgKHJlZlBvcyA9PT0gbWluKSB7XG4gICAgICAgICAgcmV0dXJuIG1pbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgbWluLCByZWZQb3MgLSAxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHJlZlBvcyA9PT0gbWF4KSB7XG4gICAgICAgICAgcmV0dXJuIG1heCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0ZXBSYW5rKGVmZmljaWVuY3ksIHJlZlBvcyArIDEsIG1heCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBQYXRoRmluZGVyLnByb3BlcnRpZXMoe1xuICAgIHZhbGlkVGlsZUNhbGxiYWNrOiB7fVxuICB9KTtcblxuICByZXR1cm4gUGF0aEZpbmRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuUGF0aEZpbmRlci5TdGVwID0gY2xhc3MgU3RlcCB7XG4gIGNvbnN0cnVjdG9yKHBhdGhGaW5kZXIsIHByZXYsIHRpbGUxLCBuZXh0VGlsZSkge1xuICAgIHRoaXMucGF0aEZpbmRlciA9IHBhdGhGaW5kZXI7XG4gICAgdGhpcy5wcmV2ID0gcHJldjtcbiAgICB0aGlzLnRpbGUgPSB0aWxlMTtcbiAgICB0aGlzLm5leHRUaWxlID0gbmV4dFRpbGU7XG4gIH1cblxuICBwb3NUb1RpbGVPZmZzZXQoeCwgeSkge1xuICAgIHZhciB0aWxlO1xuICAgIHRpbGUgPSBNYXRoLmZsb29yKHgpID09PSB0aGlzLnRpbGUueCAmJiBNYXRoLmZsb29yKHkpID09PSB0aGlzLnRpbGUueSA/IHRoaXMudGlsZSA6ICh0aGlzLm5leHRUaWxlICE9IG51bGwpICYmIE1hdGguZmxvb3IoeCkgPT09IHRoaXMubmV4dFRpbGUueCAmJiBNYXRoLmZsb29yKHkpID09PSB0aGlzLm5leHRUaWxlLnkgPyB0aGlzLm5leHRUaWxlIDogKHRoaXMucHJldiAhPSBudWxsKSAmJiBNYXRoLmZsb29yKHgpID09PSB0aGlzLnByZXYudGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMucHJldi50aWxlLnkgPyB0aGlzLnByZXYudGlsZSA6IGNvbnNvbGUubG9nKCdNYXRoLmZsb29yKCcgKyB4ICsgJykgPT0gJyArIHRoaXMudGlsZS54LCAnTWF0aC5mbG9vcignICsgeSArICcpID09ICcgKyB0aGlzLnRpbGUueSwgdGhpcyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5LFxuICAgICAgdGlsZTogdGlsZSxcbiAgICAgIG9mZnNldFg6IHggLSB0aWxlLngsXG4gICAgICBvZmZzZXRZOiB5IC0gdGlsZS55XG4gICAgfTtcbiAgfVxuXG4gIGdldEV4aXQoKSB7XG4gICAgaWYgKHRoaXMuZXhpdCA9PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5uZXh0VGlsZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IHtcbiAgICAgICAgICB4OiAodGhpcy50aWxlLnggKyB0aGlzLm5leHRUaWxlLnggKyAxKSAvIDIsXG4gICAgICAgICAgeTogKHRoaXMudGlsZS55ICsgdGhpcy5uZXh0VGlsZS55ICsgMSkgLyAyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmV4aXQgPSB7XG4gICAgICAgICAgeDogdGhpcy50aWxlLnggKyAwLjUsXG4gICAgICAgICAgeTogdGhpcy50aWxlLnkgKyAwLjVcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZXhpdDtcbiAgfVxuXG4gIGdldEVudHJ5KCkge1xuICAgIGlmICh0aGlzLmVudHJ5ID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLnByZXYgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmVudHJ5ID0ge1xuICAgICAgICAgIHg6ICh0aGlzLnRpbGUueCArIHRoaXMucHJldi50aWxlLnggKyAxKSAvIDIsXG4gICAgICAgICAgeTogKHRoaXMudGlsZS55ICsgdGhpcy5wcmV2LnRpbGUueSArIDEpIC8gMlxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbnRyeSA9IHtcbiAgICAgICAgICB4OiB0aGlzLnRpbGUueCArIDAuNSxcbiAgICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5lbnRyeTtcbiAgfVxuXG4gIGdldExlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy5sZW5ndGggPSAodGhpcy5uZXh0VGlsZSA9PSBudWxsKSB8fCAodGhpcy5wcmV2ID09IG51bGwpID8gMC41IDogdGhpcy5wcmV2LnRpbGUueCA9PT0gdGhpcy5uZXh0VGlsZS54IHx8IHRoaXMucHJldi50aWxlLnkgPT09IHRoaXMubmV4dFRpbGUueSA/IDEgOiBNYXRoLnNxcnQoMC41KTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0U3RhcnRMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMuc3RhcnRMZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy5zdGFydExlbmd0aCA9IHRoaXMucHJldiAhPSBudWxsID8gdGhpcy5wcmV2LmdldFRvdGFsTGVuZ3RoKCkgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zdGFydExlbmd0aDtcbiAgfVxuXG4gIGdldFRvdGFsTGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLnRvdGFsTGVuZ3RoID09IG51bGwpIHtcbiAgICAgIHRoaXMudG90YWxMZW5ndGggPSB0aGlzLmdldFN0YXJ0TGVuZ3RoKCkgKyB0aGlzLmdldExlbmd0aCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy50b3RhbExlbmd0aDtcbiAgfVxuXG4gIGdldEVmZmljaWVuY3koKSB7XG4gICAgaWYgKHRoaXMuZWZmaWNpZW5jeSA9PSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMucGF0aEZpbmRlci5lZmZpY2llbmN5Q2FsbGJhY2sgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3kgPSB0aGlzLnBhdGhGaW5kZXIuZWZmaWNpZW5jeUNhbGxiYWNrKHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lZmZpY2llbmN5ID0gLXRoaXMuZ2V0UmVtYWluaW5nKCkgKiAxLjEgLSB0aGlzLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVmZmljaWVuY3k7XG4gIH1cblxuICBnZXRSZW1haW5pbmcoKSB7XG4gICAgdmFyIGZyb20sIHRvLCB4LCB5O1xuICAgIGlmICh0aGlzLnJlbWFpbmluZyA9PSBudWxsKSB7XG4gICAgICBmcm9tID0gdGhpcy5nZXRFeGl0KCk7XG4gICAgICB0byA9IHtcbiAgICAgICAgeDogdGhpcy5wYXRoRmluZGVyLnRvLnggKyAwLjUsXG4gICAgICAgIHk6IHRoaXMucGF0aEZpbmRlci50by55ICsgMC41XG4gICAgICB9O1xuICAgICAgeCA9IHRvLnggLSBmcm9tLng7XG4gICAgICB5ID0gdG8ueSAtIGZyb20ueTtcbiAgICAgIHRoaXMucmVtYWluaW5nID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmc7XG4gIH1cblxufTtcblxucmV0dXJuKFBhdGhGaW5kZXIpO30pOyIsInZhciBFbGVtZW50LCBNaXhhYmxlLCBQcm9wZXJ0aWVzTWFuYWdlcjtcblxuUHJvcGVydGllc01hbmFnZXIgPSByZXF1aXJlKCdzcGFyay1wcm9wZXJ0aWVzJykuUHJvcGVydGllc01hbmFnZXI7XG5cbk1peGFibGUgPSByZXF1aXJlKCcuL01peGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBFbGVtZW50IGV4dGVuZHMgTWl4YWJsZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdFByb3BlcnRpZXNNYW5hZ2VyKGRhdGEpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmluaXRXYXRjaGVycygpO1xuICAgIH1cblxuICAgIGluaXRQcm9wZXJ0aWVzTWFuYWdlcihkYXRhKSB7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci51c2VTY29wZSh0aGlzKTtcbiAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuaW5pdFByb3BlcnRpZXMoKTtcbiAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzKCk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5zZXRQcm9wZXJ0aWVzRGF0YShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0YXAobmFtZSkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBuYW1lLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzLl9jYWxsYmFja3MgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jYWxsYmFja3NbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXS5vd25lciA9IHRoaXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW25hbWVdO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIFsncHJvcGVydGllc01hbmFnZXInXTtcbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQucHJvcGVydGllc01hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlciA9IHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlci5jb3B5V2l0aCh0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLnByb3BlcnRpZXNPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQucHJvcGVydGllc01hbmFnZXIgPSB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wZXJ0eShwcm9wLCBkZXNjKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIgPSB0aGlzLnByb3RvdHlwZS5wcm9wZXJ0aWVzTWFuYWdlci53aXRoUHJvcGVydHkocHJvcCwgZGVzYyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvdG90eXBlLnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIuY29weVdpdGgocHJvcGVydGllcyk7XG4gICAgfVxuXG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIgPSBuZXcgUHJvcGVydGllc01hbmFnZXIoKTtcblxuICByZXR1cm4gRWxlbWVudDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxuIiwidmFyIEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciwgSW52YWxpZGF0b3IsIFByb3BlcnR5V2F0Y2hlcjtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxuSW52YWxpZGF0b3IgPSByZXF1aXJlKCdzcGFyay1wcm9wZXJ0aWVzJykuSW52YWxpZGF0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyID0gY2xhc3MgQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyIGV4dGVuZHMgUHJvcGVydHlXYXRjaGVyIHtcbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHN1cGVyLmxvYWRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA9IG9wdGlvbnMuYWN0aXZlO1xuICB9XG5cbiAgc2hvdWxkQmluZCgpIHtcbiAgICB2YXIgYWN0aXZlO1xuICAgIGlmICh0aGlzLmFjdGl2ZSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5pbnZhbGlkYXRvciA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5zY29wZSk7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IuY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tCaW5kKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnJlY3ljbGUoKTtcbiAgICAgIGFjdGl2ZSA9IHRoaXMuYWN0aXZlKHRoaXMuaW52YWxpZGF0b3IpO1xuICAgICAgdGhpcy5pbnZhbGlkYXRvci5lbmRSZWN5Y2xlKCk7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLmJpbmQoKTtcbiAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL0ludmFsaWRhdGVkL0FjdGl2YWJsZVByb3BlcnR5V2F0Y2hlci5qcy5tYXBcbiIsInZhciBJbnZhbGlkYXRlZCwgSW52YWxpZGF0b3I7XG5cbkludmFsaWRhdG9yID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLkludmFsaWRhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdGVkID0gY2xhc3MgSW52YWxpZGF0ZWQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKCEoKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuaW5pdEJ5TG9hZGVyIDogdm9pZCAwKSAmJiAob3B0aW9ucy5sb2FkZXIgIT0gbnVsbCkpKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gIH1cblxuICBsb2FkT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5zY29wZSA9IG9wdGlvbnMuc2NvcGU7XG4gICAgaWYgKG9wdGlvbnMubG9hZGVyQXNTY29wZSAmJiAob3B0aW9ucy5sb2FkZXIgIT0gbnVsbCkpIHtcbiAgICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLmxvYWRlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVua25vd24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0b3IudmFsaWRhdGVVbmtub3ducygpO1xuICB9XG5cbiAgaW52YWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvciA9PSBudWxsKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMsIHRoaXMuc2NvcGUpO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWRhdG9yLnJlY3ljbGUoKTtcbiAgICB0aGlzLmhhbmRsZVVwZGF0ZSh0aGlzLmludmFsaWRhdG9yKTtcbiAgICB0aGlzLmludmFsaWRhdG9yLmVuZFJlY3ljbGUoKTtcbiAgICB0aGlzLmludmFsaWRhdG9yLmJpbmQoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGhhbmRsZVVwZGF0ZShpbnZhbGlkYXRvcikge1xuICAgIGlmICh0aGlzLnNjb3BlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgaW52YWxpZGF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhpbnZhbGlkYXRvcik7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0b3IudW5iaW5kKCk7XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMubWFwXG4iLCJ2YXIgTG9hZGVyLCBPdmVycmlkZXI7XG5cbk92ZXJyaWRlciA9IHJlcXVpcmUoJy4vT3ZlcnJpZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBPdmVycmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdFByZWxvYWRlZCgpO1xuICAgIH1cblxuICAgIGluaXRQcmVsb2FkZWQoKSB7XG4gICAgICB2YXIgZGVmTGlzdDtcbiAgICAgIGRlZkxpc3QgPSB0aGlzLnByZWxvYWRlZDtcbiAgICAgIHRoaXMucHJlbG9hZGVkID0gW107XG4gICAgICByZXR1cm4gdGhpcy5sb2FkKGRlZkxpc3QpO1xuICAgIH1cblxuICAgIGxvYWQoZGVmTGlzdCkge1xuICAgICAgdmFyIGxvYWRlZCwgdG9Mb2FkO1xuICAgICAgdG9Mb2FkID0gW107XG4gICAgICBsb2FkZWQgPSBkZWZMaXN0Lm1hcCgoZGVmKSA9PiB7XG4gICAgICAgIHZhciBpbnN0YW5jZTtcbiAgICAgICAgaWYgKGRlZi5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVmID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBsb2FkZXI6IHRoaXNcbiAgICAgICAgICB9LCBkZWYpO1xuICAgICAgICAgIGluc3RhbmNlID0gTG9hZGVyLmxvYWQoZGVmKTtcbiAgICAgICAgICBkZWYgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgIH0sIGRlZik7XG4gICAgICAgICAgaWYgKGRlZi5pbml0QnlMb2FkZXIgJiYgKGluc3RhbmNlLmluaXQgIT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRvTG9hZC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcmVsb2FkZWQgPSB0aGlzLnByZWxvYWRlZC5jb25jYXQobG9hZGVkKTtcbiAgICAgIHJldHVybiB0b0xvYWQuZm9yRWFjaChmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJlbG9hZChkZWYpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShkZWYpKSB7XG4gICAgICAgIGRlZiA9IFtkZWZdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucHJlbG9hZGVkID0gKHRoaXMucHJlbG9hZGVkIHx8IFtdKS5jb25jYXQoZGVmKTtcbiAgICB9XG5cbiAgICBkZXN0cm95TG9hZGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJlbG9hZGVkLmZvckVhY2goZnVuY3Rpb24oZGVmKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHJldHVybiAocmVmID0gZGVmLmluc3RhbmNlKSAhPSBudWxsID8gdHlwZW9mIHJlZi5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIgPyByZWYuZGVzdHJveSgpIDogdm9pZCAwIDogdm9pZCAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIHN1cGVyLmdldEZpbmFsUHJvcGVydGllcygpLmNvbmNhdChbJ3ByZWxvYWRlZCddKTtcbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIHN1cGVyLmV4dGVuZGVkKHRhcmdldCk7XG4gICAgICBpZiAodGhpcy5wcmVsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5wcmVsb2FkZWQgPSAodGFyZ2V0LnByZWxvYWRlZCB8fCBbXSkuY29uY2F0KHRoaXMucHJlbG9hZGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZE1hbnkoZGVmKSB7XG4gICAgICByZXR1cm4gZGVmLm1hcCgoZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWQoZGVmKSB7XG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlLmNvcHlXaXRoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGRlZi50eXBlLmNvcHlXaXRoKGRlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IGRlZi50eXBlKGRlZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHByZWxvYWQoZGVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm90b3R5cGUucHJlbG9hZChkZWYpO1xuICAgIH1cblxuICB9O1xuXG4gIExvYWRlci5wcm90b3R5cGUucHJlbG9hZGVkID0gW107XG5cbiAgTG9hZGVyLm92ZXJyaWRlcyh7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXQud2l0aG91dExvYWRlcigpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByZWxvYWRlZCgpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRlc3Ryb3kud2l0aG91dExvYWRlcigpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveUxvYWRlZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIExvYWRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Mb2FkZXIuanMubWFwXG4iLCJ2YXIgTWl4YWJsZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4YWJsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgTWl4YWJsZSB7XG4gICAgc3RhdGljIGV4dGVuZChvYmopIHtcbiAgICAgIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzKTtcbiAgICAgIGlmIChvYmoucHJvdG90eXBlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLnByb3RvdHlwZSwgdGhpcy5wcm90b3R5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpbmNsdWRlKG9iaikge1xuICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gIH07XG5cbiAgTWl4YWJsZS5FeHRlbnNpb24gPSB7XG4gICAgbWFrZU9uY2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCEoKHJlZiA9IHRhcmdldC5leHRlbnNpb25zKSAhPSBudWxsID8gcmVmLmluY2x1ZGVzKHNvdXJjZSkgOiB2b2lkIDApKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2Uoc291cmNlLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFrZTogZnVuY3Rpb24oc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBpLCBsZW4sIG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzLCBwcm9wLCByZWY7XG4gICAgICByZWYgPSB0aGlzLmdldEV4dGVuc2lvblByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQpO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHByb3AgPSByZWZbaV07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AubmFtZSwgcHJvcCk7XG4gICAgICB9XG4gICAgICBpZiAoc291cmNlLmdldEZpbmFsUHJvcGVydGllcyAmJiB0YXJnZXQuZ2V0RmluYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzID0gdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcztcbiAgICAgICAgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzKCkuY29uY2F0KG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzLmNhbGwodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcyA9IHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgfHwgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcztcbiAgICAgIH1cbiAgICAgIHRhcmdldC5leHRlbnNpb25zID0gKHRhcmdldC5leHRlbnNpb25zIHx8IFtdKS5jb25jYXQoW3NvdXJjZV0pO1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UuZXh0ZW5kZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5leHRlbmRlZCh0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWx3YXlzRmluYWw6IFsnZXh0ZW5kZWQnLCAnZXh0ZW5zaW9ucycsICdfX3N1cGVyX18nLCAnY29uc3RydWN0b3InLCAnZ2V0RmluYWxQcm9wZXJ0aWVzJ10sXG4gICAgZ2V0RXh0ZW5zaW9uUHJvcGVydGllczogZnVuY3Rpb24oc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBhbHdheXNGaW5hbCwgcHJvcHMsIHRhcmdldENoYWluO1xuICAgICAgYWx3YXlzRmluYWwgPSB0aGlzLmFsd2F5c0ZpbmFsO1xuICAgICAgdGFyZ2V0Q2hhaW4gPSB0aGlzLmdldFByb3RvdHlwZUNoYWluKHRhcmdldCk7XG4gICAgICBwcm9wcyA9IFtdO1xuICAgICAgdGhpcy5nZXRQcm90b3R5cGVDaGFpbihzb3VyY2UpLmV2ZXJ5KGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgZXhjbHVkZTtcbiAgICAgICAgaWYgKCF0YXJnZXRDaGFpbi5pbmNsdWRlcyhvYmopKSB7XG4gICAgICAgICAgZXhjbHVkZSA9IGFsd2F5c0ZpbmFsO1xuICAgICAgICAgIGlmIChzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXhjbHVkZSA9IGV4Y2x1ZGUuY29uY2F0KFtcImxlbmd0aFwiLCBcInByb3RvdHlwZVwiLCBcIm5hbWVcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcigoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIiAmJiBpbmRleE9mLmNhbGwoZXhjbHVkZSwga2V5KSA8IDAgJiYgIXByb3BzLmZpbmQoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBrZXk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgICAgIHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgICAgIHByb3AubmFtZSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRQcm90b3R5cGVDaGFpbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgYmFzZVByb3RvdHlwZSwgY2hhaW47XG4gICAgICBjaGFpbiA9IFtdO1xuICAgICAgYmFzZVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QpO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY2hhaW4ucHVzaChvYmopO1xuICAgICAgICBpZiAoISgob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpICYmIG9iaiAhPT0gT2JqZWN0ICYmIG9iaiAhPT0gYmFzZVByb3RvdHlwZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYWluO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTWl4YWJsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9NaXhhYmxlLmpzLm1hcFxuIiwiLy8gdG9kbyA6IFxuLy8gIHNpbXBsaWZpZWQgZm9ybSA6IEB3aXRob3V0TmFtZSBtZXRob2RcbnZhciBPdmVycmlkZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcnJpZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBPdmVycmlkZXIge1xuICAgIHN0YXRpYyBvdmVycmlkZXMob3ZlcnJpZGVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5PdmVycmlkZS5hcHBseU1hbnkodGhpcy5wcm90b3R5cGUsIHRoaXMubmFtZSwgb3ZlcnJpZGVzKTtcbiAgICB9XG5cbiAgICBnZXRGaW5hbFByb3BlcnRpZXMoKSB7XG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFsnX292ZXJyaWRlcyddLmNvbmNhdChPYmplY3Qua2V5cyh0aGlzLl9vdmVycmlkZXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLl9vdmVycmlkZXMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLk92ZXJyaWRlLmFwcGx5TWFueSh0YXJnZXQsIHRoaXMuY29uc3RydWN0b3IubmFtZSwgdGhpcy5fb3ZlcnJpZGVzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yID09PSBPdmVycmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5leHRlbmRlZCA9IHRoaXMuZXh0ZW5kZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgT3ZlcnJpZGVyLk92ZXJyaWRlID0ge1xuICAgIG1ha2VNYW55OiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGVzKSB7XG4gICAgICB2YXIgZm4sIGtleSwgb3ZlcnJpZGUsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgZm4gPSBvdmVycmlkZXNba2V5XTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG92ZXJyaWRlID0gdGhpcy5tYWtlKHRhcmdldCwgbmFtZXNwYWNlLCBrZXksIGZuKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LFxuICAgIGFwcGx5TWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xuICAgICAgdmFyIGtleSwgb3ZlcnJpZGUsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgb3ZlcnJpZGUgPSBvdmVycmlkZXNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBvdmVycmlkZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb3ZlcnJpZGUgPSB0aGlzLm1ha2UodGFyZ2V0LCBuYW1lc3BhY2UsIGtleSwgb3ZlcnJpZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmFwcGx5KHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgICBtYWtlOiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgZm5OYW1lLCBmbikge1xuICAgICAgdmFyIG92ZXJyaWRlO1xuICAgICAgb3ZlcnJpZGUgPSB7XG4gICAgICAgIGZuOiB7XG4gICAgICAgICAgY3VycmVudDogZm5cbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogZm5OYW1lXG4gICAgICB9O1xuICAgICAgb3ZlcnJpZGUuZm5bJ3dpdGgnICsgbmFtZXNwYWNlXSA9IGZuO1xuICAgICAgcmV0dXJuIG92ZXJyaWRlO1xuICAgIH0sXG4gICAgZW1wdHlGbjogZnVuY3Rpb24oKSB7fSxcbiAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XG4gICAgICB2YXIgZm5OYW1lLCBvdmVycmlkZXMsIHJlZiwgcmVmMSwgd2l0aG91dDtcbiAgICAgIGZuTmFtZSA9IG92ZXJyaWRlLm5hbWU7XG4gICAgICBvdmVycmlkZXMgPSB0YXJnZXQuX292ZXJyaWRlcyAhPSBudWxsID8gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0Ll9vdmVycmlkZXMpIDoge307XG4gICAgICB3aXRob3V0ID0gKChyZWYgPSB0YXJnZXQuX292ZXJyaWRlcykgIT0gbnVsbCA/IChyZWYxID0gcmVmW2ZuTmFtZV0pICE9IG51bGwgPyByZWYxLmZuLmN1cnJlbnQgOiB2b2lkIDAgOiB2b2lkIDApIHx8IHRhcmdldFtmbk5hbWVdO1xuICAgICAgb3ZlcnJpZGUgPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZSk7XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZuTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlc1tmbk5hbWVdLmZuLCBvdmVycmlkZS5mbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlLmZuKTtcbiAgICAgIH1cbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRob3V0JyArIG5hbWVzcGFjZV0gPSB3aXRob3V0IHx8IHRoaXMuZW1wdHlGbjtcbiAgICAgIGlmICh3aXRob3V0ID09IG51bGwpIHtcbiAgICAgICAgb3ZlcnJpZGUubWlzc2luZ1dpdGhvdXQgPSAnd2l0aG91dCcgKyBuYW1lc3BhY2U7XG4gICAgICB9IGVsc2UgaWYgKG92ZXJyaWRlLm1pc3NpbmdXaXRob3V0KSB7XG4gICAgICAgIG92ZXJyaWRlLmZuW292ZXJyaWRlLm1pc3NpbmdXaXRob3V0XSA9IHdpdGhvdXQ7XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBmbk5hbWUsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBmaW5hbEZuLCBmbiwga2V5LCByZWYyO1xuICAgICAgICAgIGZpbmFsRm4gPSBvdmVycmlkZS5mbi5jdXJyZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgcmVmMiA9IG92ZXJyaWRlLmZuO1xuICAgICAgICAgIGZvciAoa2V5IGluIHJlZjIpIHtcbiAgICAgICAgICAgIGZuID0gcmVmMltrZXldO1xuICAgICAgICAgICAgZmluYWxGbltrZXldID0gZm4uYmluZCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgZm5OYW1lLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiBmaW5hbEZuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbmFsRm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3ZlcnJpZGVzW2ZuTmFtZV0gPSBvdmVycmlkZTtcbiAgICAgIHJldHVybiB0YXJnZXQuX292ZXJyaWRlcyA9IG92ZXJyaWRlcztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIE92ZXJyaWRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9PdmVycmlkZXIuanMubWFwXG4iLCJ2YXIgQmluZGVyLCBVcGRhdGVyO1xuXG5CaW5kZXIgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuQmluZGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHZhciByZWY7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLm5leHQgPSBbXTtcbiAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgaWYgKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmNhbGxiYWNrIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFkZENhbGxiYWNrKG9wdGlvbnMuY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnMgIT0gbnVsbCA/IChyZWYgPSBvcHRpb25zLmNhbGxiYWNrcykgIT0gbnVsbCA/IHJlZi5mb3JFYWNoIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdmFyIGNhbGxiYWNrO1xuICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMubmV4dCA9IHRoaXMuY2FsbGJhY2tzLnNsaWNlKCk7XG4gICAgd2hpbGUgKHRoaXMuY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3Muc2hpZnQoKTtcbiAgICAgIHRoaXMucnVuQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMubmV4dDtcbiAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBydW5DYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG5cbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuY2FsbGJhY2tzLmluY2x1ZGVzKGNhbGxiYWNrKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIGlmICh0aGlzLnVwZGF0aW5nICYmICF0aGlzLm5leHQuaW5jbHVkZXMoY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIG5leHRUaWNrKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgIGlmICghdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpbmRleCA9IHRoaXMubmV4dC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmluZGVyKCkge1xuICAgIHJldHVybiBuZXcgVXBkYXRlci5CaW5kZXIodGhpcyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgcmV0dXJuIHRoaXMubmV4dCA9IFtdO1xuICB9XG5cbn07XG5cblVwZGF0ZXIuQmluZGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgY2xhc3MgQmluZGVyIGV4dGVuZHMgc3VwZXJDbGFzcyB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBjYWxsYmFjazEpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjazE7XG4gICAgfVxuXG4gICAgZ2V0UmVmKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZG9CaW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZENhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGRvVW5iaW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xuICAgIH1cblxuICB9O1xuXG4gIHJldHVybiBCaW5kZXI7XG5cbn0pLmNhbGwodGhpcywgQmluZGVyKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9VcGRhdGVyLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiRWxlbWVudFwiOiByZXF1aXJlKFwiLi9FbGVtZW50XCIpLFxuICBcIkxvYWRlclwiOiByZXF1aXJlKFwiLi9Mb2FkZXJcIiksXG4gIFwiTWl4YWJsZVwiOiByZXF1aXJlKFwiLi9NaXhhYmxlXCIpLFxuICBcIk92ZXJyaWRlclwiOiByZXF1aXJlKFwiLi9PdmVycmlkZXJcIiksXG4gIFwiVXBkYXRlclwiOiByZXF1aXJlKFwiLi9VcGRhdGVyXCIpLFxuICBcIkludmFsaWRhdGVkXCI6IHtcbiAgICBcIkFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlclwiOiByZXF1aXJlKFwiLi9JbnZhbGlkYXRlZC9BY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXJcIiksXG4gICAgXCJJbnZhbGlkYXRlZFwiOiByZXF1aXJlKFwiLi9JbnZhbGlkYXRlZC9JbnZhbGlkYXRlZFwiKSxcbiAgfSxcbn0iLCJ2YXIgbGlicztcblxubGlicyA9IHJlcXVpcmUoJy4vbGlicycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAnQ29sbGVjdGlvbic6IHJlcXVpcmUoJ3NwYXJrLWNvbGxlY3Rpb24nKVxufSwgbGlicywgcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLCByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL3NwYXJrLXN0YXJ0ZXIuanMubWFwXG4iLCJpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgICBncmVla0FscGhhYmV0OiByZXF1aXJlKCcuL3N0cmluZ3MvZ3JlZWtBbHBoYWJldCcpLFxuICAgICAgc3Rhck5hbWVzOiByZXF1aXJlKCcuL3N0cmluZ3Mvc3Rhck5hbWVzJylcbiAgfTtcbn0iLCJtb2R1bGUuZXhwb3J0cz1bXG5cImFscGhhXCIsICAgXCJiZXRhXCIsICAgIFwiZ2FtbWFcIiwgICBcImRlbHRhXCIsXG5cImVwc2lsb25cIiwgXCJ6ZXRhXCIsICAgIFwiZXRhXCIsICAgICBcInRoZXRhXCIsXG5cImlvdGFcIiwgICAgXCJrYXBwYVwiLCAgIFwibGFtYmRhXCIsICBcIm11XCIsXG5cIm51XCIsICAgICAgXCJ4aVwiLCAgICAgIFwib21pY3JvblwiLCBcInBpXCIsXHRcblwicmhvXCIsICAgICBcInNpZ21hXCIsICAgXCJ0YXVcIiwgICAgIFwidXBzaWxvblwiLFxuXCJwaGlcIiwgICAgIFwiY2hpXCIsICAgICBcInBzaVwiLCAgICAgXCJvbWVnYVwiXG5dIiwibW9kdWxlLmV4cG9ydHM9W1xuXCJBY2hlcm5hclwiLCAgICAgXCJNYWlhXCIsICAgICAgICBcIkF0bGFzXCIsICAgICAgICBcIlNhbG1cIiwgICAgICAgXCJBbG5pbGFtXCIsICAgICAgXCJOZWtrYXJcIiwgICAgICBcIkVsbmF0aFwiLCAgICAgICBcIlRodWJhblwiLFxuXCJBY2hpcmRcIiwgICAgICAgXCJNYXJmaWtcIiwgICAgICBcIkF1dmFcIiwgICAgICAgICBcIlNhcmdhc1wiLCAgICAgXCJBbG5pdGFrXCIsICAgICAgXCJOaWhhbFwiLCAgICAgICBcIkVuaWZcIiwgICAgICAgICBcIlRvcmN1bGFyaXNcIixcblwiQWNydXhcIiwgICAgICAgIFwiTWFya2FiXCIsICAgICAgXCJBdmlvclwiLCAgICAgICAgXCJTYXJpblwiLCAgICAgIFwiQWxwaGFyZFwiLCAgICAgIFwiTnVua2lcIiwgICAgICAgXCJFdGFtaW5cIiwgICAgICAgXCJUdXJhaXNcIixcblwiQWN1YmVuc1wiLCAgICAgIFwiTWF0YXJcIiwgICAgICAgXCJBemVsZmFmYWdlXCIsICAgXCJTY2VwdHJ1bVwiLCAgIFwiQWxwaGVra2FcIiwgICAgIFwiTnVzYWthblwiLCAgICAgXCJGb21hbGhhdXRcIiwgICAgXCJUeWxcIixcblwiQWRhcmFcIiwgICAgICAgIFwiTWVic3V0YVwiLCAgICAgXCJBemhhXCIsICAgICAgICAgXCJTY2hlYXRcIiwgICAgIFwiQWxwaGVyYXR6XCIsICAgIFwiUGVhY29ja1wiLCAgICAgXCJGb3JuYWNpc1wiLCAgICAgXCJVbnVrYWxoYWlcIixcblwiQWRoYWZlcmFcIiwgICAgIFwiTWVncmV6XCIsICAgICAgXCJBem1pZGlza2VcIiwgICAgXCJTZWdpblwiLCAgICAgIFwiQWxyYWlcIiwgICAgICAgIFwiUGhhZFwiLCAgICAgICAgXCJGdXJ1ZFwiLCAgICAgICAgXCJWZWdhXCIsXG5cIkFkaGlsXCIsICAgICAgICBcIk1laXNzYVwiLCAgICAgIFwiQmFoYW1cIiwgICAgICAgIFwiU2VnaW51c1wiLCAgICBcIkFscmlzaGFcIiwgICAgICBcIlBoYWV0XCIsICAgICAgIFwiR2FjcnV4XCIsICAgICAgIFwiVmluZGVtaWF0cml4XCIsXG5cIkFnZW5hXCIsICAgICAgICBcIk1la2J1ZGFcIiwgICAgIFwiQmVjcnV4XCIsICAgICAgIFwiU2hhbVwiLCAgICAgICBcIkFsc2FmaVwiLCAgICAgICBcIlBoZXJrYWRcIiwgICAgIFwiR2lhbmZhclwiLCAgICAgIFwiV2FzYXRcIixcblwiQWxhZGZhclwiLCAgICAgIFwiTWVua2FsaW5hblwiLCAgXCJCZWlkXCIsICAgICAgICAgXCJTaGFyYXRhblwiLCAgIFwiQWxzY2lhdWthdFwiLCAgIFwiUGxlaW9uZVwiLCAgICAgXCJHb21laXNhXCIsICAgICAgXCJXZXplblwiLFxuXCJBbGF0aGZhclwiLCAgICAgXCJNZW5rYXJcIiwgICAgICBcIkJlbGxhdHJpeFwiLCAgICBcIlNoYXVsYVwiLCAgICAgXCJBbHNoYWluXCIsICAgICAgXCJQb2xhcmlzXCIsICAgICBcIkdyYWZmaWFzXCIsICAgICBcIldlem5cIixcblwiQWxiYWxkYWhcIiwgICAgIFwiTWVua2VudFwiLCAgICAgXCJCZXRlbGdldXNlXCIsICAgXCJTaGVkaXJcIiwgICAgIFwiQWxzaGF0XCIsICAgICAgIFwiUG9sbHV4XCIsICAgICAgXCJHcmFmaWFzXCIsICAgICAgXCJZZWRcIixcblwiQWxiYWxpXCIsICAgICAgIFwiTWVua2liXCIsICAgICAgXCJCb3RlaW5cIiwgICAgICAgXCJTaGVsaWFrXCIsICAgIFwiQWxzdWhhaWxcIiwgICAgIFwiUG9ycmltYVwiLCAgICAgXCJHcnVtaXVtXCIsICAgICAgXCJZaWxkdW5cIixcblwiQWxiaXJlb1wiLCAgICAgIFwiTWVyYWtcIiwgICAgICAgXCJCcmFjaGl1bVwiLCAgICAgXCJTaXJpdXNcIiwgICAgIFwiQWx0YWlyXCIsICAgICAgIFwiUHJhZWNpcHVhXCIsICAgXCJIYWRhclwiLCAgICAgICAgXCJaYW5pYWhcIixcblwiQWxjaGliYVwiLCAgICAgIFwiTWVyZ2FcIiwgICAgICAgXCJDYW5vcHVzXCIsICAgICAgXCJTaXR1bGFcIiwgICAgIFwiQWx0YXJmXCIsICAgICAgIFwiUHJvY3lvblwiLCAgICAgXCJIYWVkaVwiLCAgICAgICAgXCJaYXVyYWtcIixcblwiQWxjb3JcIiwgICAgICAgIFwiTWVyb3BlXCIsICAgICAgXCJDYXBlbGxhXCIsICAgICAgXCJTa2F0XCIsICAgICAgIFwiQWx0ZXJmXCIsICAgICAgIFwiUHJvcHVzXCIsICAgICAgXCJIYW1hbFwiLCAgICAgICAgXCJaYXZpamFoXCIsXG5cIkFsY3lvbmVcIiwgICAgICBcIk1lc2FydGhpbVwiLCAgIFwiQ2FwaFwiLCAgICAgICAgIFwiU3BpY2FcIiwgICAgICBcIkFsdWRyYVwiLCAgICAgICBcIlJhbmFcIiwgICAgICAgIFwiSGFzc2FsZWhcIiwgICAgIFwiWmliYWxcIixcblwiQWxkZXJhbWluXCIsICAgIFwiTWV0YWxsYWhcIiwgICAgXCJDYXN0b3JcIiwgICAgICAgXCJTdGVyb3BlXCIsICAgIFwiQWx1bGFcIiwgICAgICAgIFwiUmFzXCIsICAgICAgICAgXCJIZXplXCIsICAgICAgICAgXCJab3NtYVwiLFxuXCJBbGRoaWJhaFwiLCAgICAgXCJNaWFwbGFjaWR1c1wiLCBcIkNlYmFscmFpXCIsICAgICBcIlN1YWxvY2luXCIsICAgXCJBbHlhXCIsICAgICAgICAgXCJSYXNhbGdldGhpXCIsICBcIkhvZWR1c1wiLCAgICAgICBcIkFxdWFyaXVzXCIsXG5cIkFsZmlya1wiLCAgICAgICBcIk1pbmthclwiLCAgICAgIFwiQ2VsYWVub1wiLCAgICAgIFwiU3VicmFcIiwgICAgICBcIkFsemlyclwiLCAgICAgICBcIlJhc2FsaGFndWVcIiwgIFwiSG9tYW1cIiwgICAgICAgIFwiQXJpZXNcIixcblwiQWxnZW5pYlwiLCAgICAgIFwiTWludGFrYVwiLCAgICAgXCJDaGFyYVwiLCAgICAgICAgXCJTdWhhaWxcIiwgICAgIFwiQW5jaGFcIiwgICAgICAgIFwiUmFzdGFiYW5cIiwgICAgXCJIeWFkdW1cIiwgICAgICAgXCJDZXBoZXVzXCIsXG5cIkFsZ2llYmFcIiwgICAgICBcIk1pcmFcIiwgICAgICAgIFwiQ2hvcnRcIiwgICAgICAgIFwiU3VsYWZhdFwiLCAgICBcIkFuZ2V0ZW5hclwiLCAgICBcIlJlZ3VsdXNcIiwgICAgIFwiSXphclwiLCAgICAgICAgIFwiQ2V0dXNcIixcblwiQWxnb2xcIiwgICAgICAgIFwiTWlyYWNoXCIsICAgICAgXCJDdXJzYVwiLCAgICAgICAgXCJTeXJtYVwiLCAgICAgIFwiQW5rYWFcIiwgICAgICAgIFwiUmlnZWxcIiwgICAgICAgXCJKYWJiYWhcIiwgICAgICAgXCJDb2x1bWJhXCIsXG5cIkFsZ29yYWJcIiwgICAgICBcIk1pcmFtXCIsICAgICAgIFwiRGFiaWhcIiwgICAgICAgIFwiVGFiaXRcIiwgICAgICBcIkFuc2VyXCIsICAgICAgICBcIlJvdGFuZXZcIiwgICAgIFwiS2FqYW1cIiwgICAgICAgIFwiQ29tYVwiLFxuXCJBbGhlbmFcIiwgICAgICAgXCJNaXJwaGFrXCIsICAgICBcIkRlbmViXCIsICAgICAgICBcIlRhbGl0aGFcIiwgICAgXCJBbnRhcmVzXCIsICAgICAgXCJSdWNoYmFcIiwgICAgICBcIkthdXNcIiwgICAgICAgICBcIkNvcm9uYVwiLFxuXCJBbGlvdGhcIiwgICAgICAgXCJNaXphclwiLCAgICAgICBcIkRlbmVib2xhXCIsICAgICBcIlRhbmlhXCIsICAgICAgXCJBcmN0dXJ1c1wiLCAgICAgXCJSdWNoYmFoXCIsICAgICBcIktlaWRcIiwgICAgICAgICBcIkNydXhcIixcblwiQWxrYWlkXCIsICAgICAgIFwiTXVmcmlkXCIsICAgICAgXCJEaGVuZWJcIiwgICAgICAgXCJUYXJhemVkXCIsICAgIFwiQXJrYWJcIiwgICAgICAgIFwiUnVrYmF0XCIsICAgICAgXCJLaXRhbHBoYVwiLCAgICAgXCJEcmFjb1wiLFxuXCJBbGthbHVyb3BzXCIsICAgXCJNdWxpcGhlblwiLCAgICBcIkRpYWRlbVwiLCAgICAgICBcIlRheWdldGFcIiwgICAgXCJBcm5lYlwiLCAgICAgICAgXCJTYWJpa1wiLCAgICAgICBcIktvY2FiXCIsICAgICAgICBcIkdydXNcIixcblwiQWxrZXNcIiwgICAgICAgIFwiTXVyemltXCIsICAgICAgXCJEaXBoZGFcIiwgICAgICAgXCJUZWdtZW5cIiwgICAgIFwiQXJyYWtpc1wiLCAgICAgIFwiU2FkYWxhY2hiaWFcIiwgXCJLb3JuZXBob3Jvc1wiLCAgXCJIeWRyYVwiLFxuXCJBbGt1cmhhaFwiLCAgICAgXCJNdXNjaWRhXCIsICAgICBcIkRzY2h1YmJhXCIsICAgICBcIlRlamF0XCIsICAgICAgXCJBc2NlbGxhXCIsICAgICAgXCJTYWRhbG1lbGlrXCIsICBcIktyYXpcIiwgICAgICAgICBcIkxhY2VydGFcIixcblwiQWxtYWFrXCIsICAgICAgIFwiTmFvc1wiLCAgICAgICAgXCJEc2liYW5cIiwgICAgICAgXCJUZXJlYmVsbHVtXCIsIFwiQXNlbGx1c1wiLCAgICAgIFwiU2FkYWxzdXVkXCIsICAgXCJLdW1hXCIsICAgICAgICAgXCJNZW5zYVwiLFxuXCJBbG5haXJcIiwgICAgICAgXCJOYXNoXCIsICAgICAgICBcIkR1YmhlXCIsICAgICAgICBcIlRoYWJpdFwiLCAgICAgXCJBc3Rlcm9wZVwiLCAgICAgXCJTYWRyXCIsICAgICAgICBcIkxlc2F0aFwiLCAgICAgICBcIk1hYXN5bVwiLFxuXCJBbG5hdGhcIiwgICAgICAgXCJOYXNoaXJhXCIsICAgICBcIkVsZWN0cmFcIiwgICAgICBcIlRoZWVtaW1cIiwgICAgXCJBdGlrXCIsICAgICAgICAgXCJTYWlwaFwiLCAgICAgICBcIlBob2VuaXhcIiwgICAgICBcIk5vcm1hXCJcbl0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gY29vcmRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gb3JpZ2luXG4gICAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICAgKi9cbiAgcm90YXRlOiBmdW5jdGlvbiAoY29vcmQsIGFuZ2xlLCBvcmlnaW4gPSB7IHg6IDAsIHk6IDAgfSkge1xuICAgIGNvbnN0IHJlY2VudGVyWCA9IGNvb3JkLnggLSBvcmlnaW4ueFxuICAgIGNvbnN0IHJlY2VudGVyWSA9IGNvb3JkLnkgLSBvcmlnaW4ueVxuICAgIHJldHVybiB7XG4gICAgICB4OiBNYXRoLnJvdW5kKE1hdGguY29zKGFuZ2xlKSAqIHJlY2VudGVyWCAtIE1hdGguc2luKGFuZ2xlKSAqIHJlY2VudGVyWSkgKyBvcmlnaW4ueCArIDAsXG4gICAgICB5OiBNYXRoLnJvdW5kKE1hdGguc2luKGFuZ2xlKSAqIHJlY2VudGVyWCArIE1hdGguY29zKGFuZ2xlKSAqIHJlY2VudGVyWSkgKyBvcmlnaW4ueSArIDBcbiAgICB9XG4gIH1cbn1cbiIsIlxuY29uc3QgQ29vcmRIZWxwZXIgPSByZXF1aXJlKCcuL0Nvb3JkSGVscGVyJylcblxuY2xhc3MgRGlyZWN0aW9uIHtcbiAgY29uc3RydWN0b3IgKG5hbWUsIHgsIHksIGFuZ2xlLCBpbnZlcnNlTmFtZSkge1xuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB0aGlzLnggPSB4XG4gICAgdGhpcy55ID0geVxuICAgIHRoaXMuYW5nbGUgPSBhbmdsZVxuICAgIHRoaXMuaW52ZXJzZU5hbWUgPSBpbnZlcnNlTmFtZVxuICB9XG5cbiAgZ2V0SW52ZXJzZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3JbdGhpcy5pbnZlcnNlTmFtZV1cbiAgfVxuXG4gIHJvdGF0ZSAoYW5nbGUpIHtcbiAgICBjb25zdCBjb29yZCA9IENvb3JkSGVscGVyLnJvdGF0ZSh0aGlzLCBhbmdsZSlcbiAgICByZXR1cm4gRGlyZWN0aW9uLmFsbC5maW5kKChkKSA9PiB7XG4gICAgICByZXR1cm4gZC54ID09PSBjb29yZC54ICYmIGQueSA9PT0gY29vcmQueVxuICAgIH0pXG4gIH1cbn1cblxuRGlyZWN0aW9uLnVwID0gbmV3IERpcmVjdGlvbigndXAnLCAwLCAtMSwgMCwgJ2Rvd24nKVxuXG5EaXJlY3Rpb24uZG93biA9IG5ldyBEaXJlY3Rpb24oJ2Rvd24nLCAwLCAxLCBNYXRoLlBJLCAndXAnKVxuXG5EaXJlY3Rpb24ubGVmdCA9IG5ldyBEaXJlY3Rpb24oJ2xlZnQnLCAtMSwgMCwgTWF0aC5QSSAvIDIgKiAzLCAncmlnaHQnKVxuXG5EaXJlY3Rpb24ucmlnaHQgPSBuZXcgRGlyZWN0aW9uKCdyaWdodCcsIDEsIDAsIE1hdGguUEkgLyAyLCAnbGVmdCcpXG5cbkRpcmVjdGlvbi5hZGphY2VudHMgPSBbRGlyZWN0aW9uLnVwLCBEaXJlY3Rpb24uZG93biwgRGlyZWN0aW9uLmxlZnQsIERpcmVjdGlvbi5yaWdodF1cblxuRGlyZWN0aW9uLnRvcExlZnQgPSBuZXcgRGlyZWN0aW9uKCd0b3BMZWZ0JywgLTEsIC0xLCBNYXRoLlBJIC8gNCAqIDcsICdib3R0b21SaWdodCcpXG5cbkRpcmVjdGlvbi50b3BSaWdodCA9IG5ldyBEaXJlY3Rpb24oJ3RvcFJpZ2h0JywgMSwgLTEsIE1hdGguUEkgLyA0LCAnYm90dG9tTGVmdCcpXG5cbkRpcmVjdGlvbi5ib3R0b21SaWdodCA9IG5ldyBEaXJlY3Rpb24oJ2JvdHRvbVJpZ2h0JywgMSwgMSwgTWF0aC5QSSAvIDQgKiAzLCAndG9wTGVmdCcpXG5cbkRpcmVjdGlvbi5ib3R0b21MZWZ0ID0gbmV3IERpcmVjdGlvbignYm90dG9tTGVmdCcsIC0xLCAxLCBNYXRoLlBJIC8gNCAqIDUsICd0b3BSaWdodCcpXG5cbkRpcmVjdGlvbi5jb3JuZXJzID0gW0RpcmVjdGlvbi50b3BMZWZ0LCBEaXJlY3Rpb24udG9wUmlnaHQsIERpcmVjdGlvbi5ib3R0b21SaWdodCwgRGlyZWN0aW9uLmJvdHRvbUxlZnRdXG5cbkRpcmVjdGlvbi5hbGwgPSBbRGlyZWN0aW9uLnVwLCBEaXJlY3Rpb24uZG93biwgRGlyZWN0aW9uLmxlZnQsIERpcmVjdGlvbi5yaWdodCwgRGlyZWN0aW9uLnRvcExlZnQsIERpcmVjdGlvbi50b3BSaWdodCwgRGlyZWN0aW9uLmJvdHRvbVJpZ2h0LCBEaXJlY3Rpb24uYm90dG9tTGVmdF1cblxubW9kdWxlLmV4cG9ydHMgPSBEaXJlY3Rpb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgRGlyZWN0aW9uID0gcmVxdWlyZSgnLi9EaXJlY3Rpb24nKVxuY29uc3QgQ29vcmRIZWxwZXIgPSByZXF1aXJlKCcuL0Nvb3JkSGVscGVyJylcblxuY2xhc3MgVGlsZSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoeE9yT3B0aW9ucywgeSA9IDApIHtcbiAgICBsZXQgb3B0ID0geE9yT3B0aW9uc1xuICAgIGlmICh0eXBlb2YgeE9yT3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICAgIG9wdCA9IHsgeDogeE9yT3B0aW9ucywgeTogeSB9XG4gICAgfVxuICAgIHN1cGVyKG9wdClcbiAgICB0aGlzLnggPSBvcHQueFxuICAgIHRoaXMueSA9IG9wdC55XG4gIH1cblxuICBnZXRSZWxhdGl2ZVRpbGUgKHgsIHkpIHtcbiAgICBpZiAoeCA9PT0gMCAmJiB5ID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgICBpZiAodGhpcy5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29udGFpbmVyLmdldFRpbGUodGhpcy54ICsgeCwgdGhpcy55ICsgeSlcbiAgICB9XG4gIH1cblxuICBmaW5kRGlyZWN0aW9uT2YgKHRpbGUpIHtcbiAgICBpZiAodGlsZS50aWxlKSB7XG4gICAgICB0aWxlID0gdGlsZS50aWxlXG4gICAgfVxuICAgIGlmICgodGlsZS54ICE9IG51bGwpICYmICh0aWxlLnkgIT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiBEaXJlY3Rpb24uYWxsLmZpbmQoKGQpID0+IHtcbiAgICAgICAgcmV0dXJuIGQueCA9PT0gdGlsZS54IC0gdGhpcy54ICYmIGQueSA9PT0gdGlsZS55IC0gdGhpcy55XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGFkZENoaWxkIChjaGlsZCwgY2hlY2tSZWYgPSB0cnVlKSB7XG4gICAgdmFyIGluZGV4XG4gICAgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpXG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKVxuICAgIH1cbiAgICBpZiAoY2hlY2tSZWYpIHtcbiAgICAgIGNoaWxkLnRpbGUgPSB0aGlzXG4gICAgfVxuICAgIHJldHVybiBjaGlsZFxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQgKGNoaWxkLCBjaGVja1JlZiA9IHRydWUpIHtcbiAgICB2YXIgaW5kZXhcbiAgICBpbmRleCA9IHRoaXMuY2hpbGRyZW4uaW5kZXhPZihjaGlsZClcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsIDEpXG4gICAgfVxuICAgIGlmIChjaGVja1JlZiAmJiBjaGlsZC50aWxlID09PSB0aGlzKSB7XG4gICAgICBjaGlsZC50aWxlID0gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGRpc3QgKHRpbGUpIHtcbiAgICB2YXIgY3RuRGlzdCwgcmVmLCB4LCB5XG4gICAgaWYgKCh0aWxlICE9IG51bGwgPyB0aWxlLmdldEZpbmFsVGlsZSA6IG51bGwpICE9IG51bGwpIHtcbiAgICAgIHRpbGUgPSB0aWxlLmdldEZpbmFsVGlsZSgpXG4gICAgfVxuICAgIGlmICgoKHRpbGUgIT0gbnVsbCA/IHRpbGUueCA6IG51bGwpICE9IG51bGwpICYmICh0aWxlLnkgIT0gbnVsbCkgJiYgKHRoaXMueCAhPSBudWxsKSAmJiAodGhpcy55ICE9IG51bGwpICYmICh0aGlzLmNvbnRhaW5lciA9PT0gdGlsZS5jb250YWluZXIgfHwgKGN0bkRpc3QgPSAocmVmID0gdGhpcy5jb250YWluZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmRpc3QgPT09ICdmdW5jdGlvbicgPyByZWYuZGlzdCh0aWxlLmNvbnRhaW5lcikgOiBudWxsIDogbnVsbCkpKSB7XG4gICAgICB4ID0gdGlsZS54IC0gdGhpcy54XG4gICAgICB5ID0gdGlsZS55IC0gdGhpcy55XG4gICAgICBpZiAoY3RuRGlzdCkge1xuICAgICAgICB4ICs9IGN0bkRpc3QueFxuICAgICAgICB5ICs9IGN0bkRpc3QueVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgbGVuZ3RoOiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4gICAqIEBwYXJhbSB7e3g6IG51bWJlciwgeTogbnVtYmVyfX0gb3JpZ2luXG4gICAqIEByZXR1cm5zIHt0aGlzfVxuICAgKi9cbiAgY29weUFuZFJvdGF0ZSAoYW5nbGUsIG9yaWdpbiA9IHsgeDogMCwgeTogMCB9KSB7XG4gICAgY29uc3QgVGlsZUNsYXNzID0gdGhpcy5jb25zdHJ1Y3RvclxuICAgIGNvbnN0IGRhdGEgPSBPYmplY3QuYXNzaWduKFxuICAgICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5nZXRNYW51YWxEYXRhUHJvcGVydGllcygpLFxuICAgICAgQ29vcmRIZWxwZXIucm90YXRlKHRoaXMsIGFuZ2xlLCBvcmlnaW4pXG4gICAgKVxuICAgIHJldHVybiBuZXcgVGlsZUNsYXNzKGRhdGEpXG4gIH1cblxuICBnZXRGaW5hbFRpbGUgKCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBnZXRDb29yZCAoKSB7XG4gICAgcmV0dXJuIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfVxuICB9XG59O1xuXG5UaWxlLnByb3BlcnRpZXMoe1xuICBjaGlsZHJlbjoge1xuICAgIGNvbGxlY3Rpb246IHRydWVcbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5jb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGphY2VudFRpbGVzLmZvckVhY2goZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS5hZGphY2VudFRpbGVzUHJvcGVydHkuaW52YWxpZGF0ZSgpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBhZGphY2VudFRpbGVzOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0aW9uKSB7XG4gICAgICBpZiAoaW52YWxpZGF0aW9uLnByb3AodGhpcy5jb250YWluZXJQcm9wZXJ0eSkpIHtcbiAgICAgICAgcmV0dXJuIERpcmVjdGlvbi5hZGphY2VudHMubWFwKChkKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVsYXRpdmVUaWxlKGQueCwgZC55KVxuICAgICAgICB9KS5maWx0ZXIoKHQpID0+IHtcbiAgICAgICAgICByZXR1cm4gdCAhPSBudWxsXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSxcbiAgICBjb2xsZWN0aW9uOiB0cnVlXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZVxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBUaWxlUmVmZXJlbmNlID0gcmVxdWlyZSgnLi9UaWxlUmVmZXJlbmNlJylcblxuY2xhc3MgVGlsZUNvbnRhaW5lciBleHRlbmRzIEVsZW1lbnQge1xuICBfYWRkVG9Cb25kYXJpZXMgKHRpbGUsIGJvdW5kYXJpZXMpIHtcbiAgICBpZiAoKGJvdW5kYXJpZXMudG9wID09IG51bGwpIHx8IHRpbGUueSA8IGJvdW5kYXJpZXMudG9wKSB7XG4gICAgICBib3VuZGFyaWVzLnRvcCA9IHRpbGUueVxuICAgIH1cbiAgICBpZiAoKGJvdW5kYXJpZXMubGVmdCA9PSBudWxsKSB8fCB0aWxlLnggPCBib3VuZGFyaWVzLmxlZnQpIHtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCA9IHRpbGUueFxuICAgIH1cbiAgICBpZiAoKGJvdW5kYXJpZXMuYm90dG9tID09IG51bGwpIHx8IHRpbGUueSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICBib3VuZGFyaWVzLmJvdHRvbSA9IHRpbGUueVxuICAgIH1cbiAgICBpZiAoKGJvdW5kYXJpZXMucmlnaHQgPT0gbnVsbCkgfHwgdGlsZS54ID4gYm91bmRhcmllcy5yaWdodCkge1xuICAgICAgYm91bmRhcmllcy5yaWdodCA9IHRpbGUueFxuICAgIH1cbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMuY29vcmRzID0ge31cbiAgICB0aGlzLnRpbGVzID0gW11cbiAgfVxuXG4gIGFkZFRpbGUgKHRpbGUpIHtcbiAgICBpZiAoIXRoaXMudGlsZXMuaW5jbHVkZXModGlsZSkpIHtcbiAgICAgIHRoaXMudGlsZXMucHVzaCh0aWxlKVxuICAgICAgaWYgKHRoaXMuY29vcmRzW3RpbGUueF0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvb3Jkc1t0aWxlLnhdID0ge31cbiAgICAgIH1cbiAgICAgIHRoaXMuY29vcmRzW3RpbGUueF1bdGlsZS55XSA9IHRpbGVcbiAgICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICAgIHRpbGUuY29udGFpbmVyID0gdGhpc1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYm91bmRhcmllc1Byb3BlcnR5LmdldHRlci5jYWxjdWxhdGVkKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvQm9uZGFyaWVzKHRpbGUsIHRoaXMuYm91bmRhcmllc1Byb3BlcnR5LnZhbHVlKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVtb3ZlVGlsZSAodGlsZSkge1xuICAgIHZhciBpbmRleFxuICAgIGluZGV4ID0gdGhpcy50aWxlcy5pbmRleE9mKHRpbGUpXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMudGlsZXMuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgZGVsZXRlIHRoaXMuY29vcmRzW3RpbGUueF1bdGlsZS55XVxuICAgICAgaWYgKHRoaXMub3duZXIpIHtcbiAgICAgICAgdGlsZS5jb250YWluZXIgPSBudWxsXG4gICAgICB9XG4gICAgICBpZiAodGhpcy5ib3VuZGFyaWVzUHJvcGVydHkuZ2V0dGVyLmNhbGN1bGF0ZWQpIHtcbiAgICAgICAgaWYgKHRoaXMuYm91bmRhcmllcy50b3AgPT09IHRpbGUueSB8fCB0aGlzLmJvdW5kYXJpZXMuYm90dG9tID09PSB0aWxlLnkgfHwgdGhpcy5ib3VuZGFyaWVzLmxlZnQgPT09IHRpbGUueCB8fCB0aGlzLmJvdW5kYXJpZXMucmlnaHQgPT09IHRpbGUueCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS5pbnZhbGlkYXRlKClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVRpbGVBdCAoeCwgeSkge1xuICAgIGNvbnN0IHRpbGUgPSB0aGlzLmdldFRpbGUoeCwgeSlcbiAgICBpZiAodGlsZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlVGlsZSh0aWxlKVxuICAgIH1cbiAgfVxuXG4gIGdldFRpbGUgKHgsIHkpIHtcbiAgICB2YXIgcmVmXG4gICAgaWYgKCgocmVmID0gdGhpcy5jb29yZHNbeF0pICE9IG51bGwgPyByZWZbeV0gOiBudWxsKSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb29yZHNbeF1beV1cbiAgICB9XG4gIH1cblxuICBsb2FkTWF0cml4IChtYXRyaXgsIG9mZnNldCA9IHsgeDogMCwgeTogMCB9KSB7XG4gICAgdmFyIG9wdGlvbnMsIHJvdywgdGlsZSwgeCwgeVxuICAgIGZvciAoeSBpbiBtYXRyaXgpIHtcbiAgICAgIHJvdyA9IG1hdHJpeFt5XVxuICAgICAgZm9yICh4IGluIHJvdykge1xuICAgICAgICB0aWxlID0gcm93W3hdXG4gICAgICAgIG9wdGlvbnMgPSB7XG4gICAgICAgICAgeDogcGFyc2VJbnQoeCkgKyBvZmZzZXQueCxcbiAgICAgICAgICB5OiBwYXJzZUludCh5KSArIG9mZnNldC55XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0aWxlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhpcy5hZGRUaWxlKHRpbGUob3B0aW9ucykpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGlsZS54ID0gb3B0aW9ucy54XG4gICAgICAgICAgdGlsZS55ID0gb3B0aW9ucy55XG4gICAgICAgICAgdGhpcy5hZGRUaWxlKHRpbGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlZHVjZU1hdHJpeCAobWF0cml4LCBpbml0YWxWYWx1ZSA9IG51bGwsIG9mZnNldCA9IHsgeDogMCwgeTogMCB9KSB7XG4gICAgbGV0IHZhbHVlID0gaW5pdGFsVmFsdWVcbiAgICBmb3IgKGNvbnN0IHkgaW4gbWF0cml4KSB7XG4gICAgICBjb25zdCByb3cgPSBtYXRyaXhbeV1cbiAgICAgIGZvciAoY29uc3QgeCBpbiByb3cpIHtcbiAgICAgICAgY29uc3QgZm4gPSByb3dbeF1cbiAgICAgICAgY29uc3QgcG9zID0ge1xuICAgICAgICAgIHg6IHBhcnNlSW50KHgpICsgb2Zmc2V0LngsXG4gICAgICAgICAgeTogcGFyc2VJbnQoeSkgKyBvZmZzZXQueVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gZm4odmFsdWUsIHRoaXMuZ2V0VGlsZShwb3MueCwgcG9zLnkpLCBwb3MpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgaW5SYW5nZSAodGlsZSwgcmFuZ2UpIHtcbiAgICB2YXIgZm91bmQsIGksIGosIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgdGlsZXMsIHgsIHlcbiAgICB0aWxlcyA9IFtdXG4gICAgcmFuZ2UtLVxuICAgIGZvciAoeCA9IGkgPSByZWYgPSB0aWxlLnggLSByYW5nZSwgcmVmMSA9IHRpbGUueCArIHJhbmdlOyAocmVmIDw9IHJlZjEgPyBpIDw9IHJlZjEgOiBpID49IHJlZjEpOyB4ID0gcmVmIDw9IHJlZjEgPyArK2kgOiAtLWkpIHtcbiAgICAgIGZvciAoeSA9IGogPSByZWYyID0gdGlsZS55IC0gcmFuZ2UsIHJlZjMgPSB0aWxlLnkgKyByYW5nZTsgKHJlZjIgPD0gcmVmMyA/IGogPD0gcmVmMyA6IGogPj0gcmVmMyk7IHkgPSByZWYyIDw9IHJlZjMgPyArK2ogOiAtLWopIHtcbiAgICAgICAgaWYgKE1hdGguc3FydCgoeCAtIHRpbGUueCkgKiAoeCAtIHRpbGUueCkgKyAoeSAtIHRpbGUueSkgKiAoeSAtIHRpbGUueSkpIDw9IHJhbmdlICYmICgoZm91bmQgPSB0aGlzLmdldFRpbGUoeCwgeSkpICE9IG51bGwpKSB7XG4gICAgICAgICAgdGlsZXMucHVzaChmb3VuZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGlsZXNcbiAgfVxuXG4gIGFsbFRpbGVzICgpIHtcbiAgICByZXR1cm4gdGhpcy50aWxlcy5zbGljZSgpXG4gIH1cblxuICBjbGVhckFsbCAoKSB7XG4gICAgdmFyIGksIGxlbiwgcmVmLCB0aWxlXG4gICAgaWYgKHRoaXMub3duZXIpIHtcbiAgICAgIHJlZiA9IHRoaXMudGlsZXNcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB0aWxlID0gcmVmW2ldXG4gICAgICAgIHRpbGUuY29udGFpbmVyID0gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmNvb3JkcyA9IHt9XG4gICAgdGhpcy50aWxlcyA9IFtdXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNsb3Nlc3QgKG9yaWdpblRpbGUsIGZpbHRlcikge1xuICAgIHZhciBjYW5kaWRhdGVzLCBnZXRTY29yZVxuICAgIGdldFNjb3JlID0gZnVuY3Rpb24gKGNhbmRpZGF0ZSkge1xuICAgICAgaWYgKGNhbmRpZGF0ZS5zY29yZSA9PSBudWxsKSB7XG4gICAgICAgIGNhbmRpZGF0ZS5zY29yZSA9IGNhbmRpZGF0ZS5nZXRGaW5hbFRpbGUoKS5kaXN0KG9yaWdpblRpbGUpLmxlbmd0aFxuICAgICAgfVxuICAgICAgcmV0dXJuIGNhbmRpZGF0ZS5zY29yZVxuICAgIH1cbiAgICBjYW5kaWRhdGVzID0gdGhpcy50aWxlcy5maWx0ZXIoZmlsdGVyKS5tYXAoKHQpID0+IHtcbiAgICAgIHJldHVybiBuZXcgVGlsZVJlZmVyZW5jZSh0KVxuICAgIH0pXG4gICAgY2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gZ2V0U2NvcmUoYSkgLSBnZXRTY29yZShiKVxuICAgIH0pXG4gICAgaWYgKGNhbmRpZGF0ZXMubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIGNhbmRpZGF0ZXNbMF0udGlsZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIGNvcHkgKCkge1xuICAgIHZhciBvdXRcbiAgICBvdXQgPSBuZXcgVGlsZUNvbnRhaW5lcigpXG4gICAgb3V0LmNvb3JkcyA9IHRoaXMuY29vcmRzXG4gICAgb3V0LnRpbGVzID0gdGhpcy50aWxlc1xuICAgIG91dC5vd25lciA9IGZhbHNlXG4gICAgcmV0dXJuIG91dFxuICB9XG5cbiAgbWVyZ2UgKGN0biwgbWVyZ2VGbiwgYXNPd25lciA9IGZhbHNlKSB7XG4gICAgdmFyIG91dCwgdG1wXG4gICAgb3V0ID0gbmV3IFRpbGVDb250YWluZXIoKVxuICAgIG91dC5vd25lciA9IGFzT3duZXJcbiAgICB0bXAgPSBjdG4uY29weSgpXG4gICAgdGhpcy50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlQSkge1xuICAgICAgdmFyIG1lcmdlZFRpbGUsIHRpbGVCXG4gICAgICB0aWxlQiA9IHRtcC5nZXRUaWxlKHRpbGVBLngsIHRpbGVBLnkpXG4gICAgICBpZiAodGlsZUIpIHtcbiAgICAgICAgdG1wLnJlbW92ZVRpbGUodGlsZUIpXG4gICAgICB9XG4gICAgICBtZXJnZWRUaWxlID0gbWVyZ2VGbih0aWxlQSwgdGlsZUIpXG4gICAgICBpZiAobWVyZ2VkVGlsZSkge1xuICAgICAgICByZXR1cm4gb3V0LmFkZFRpbGUobWVyZ2VkVGlsZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHRtcC50aWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlQikge1xuICAgICAgdmFyIG1lcmdlZFRpbGVcbiAgICAgIG1lcmdlZFRpbGUgPSBtZXJnZUZuKG51bGwsIHRpbGVCKVxuICAgICAgaWYgKG1lcmdlZFRpbGUpIHtcbiAgICAgICAgcmV0dXJuIG91dC5hZGRUaWxlKG1lcmdlZFRpbGUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gb3V0XG4gIH1cbn07XG5cblRpbGVDb250YWluZXIucHJvcGVydGllcyh7XG4gIG93bmVyOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBib3VuZGFyaWVzOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYm91bmRhcmllc1xuICAgICAgYm91bmRhcmllcyA9IHtcbiAgICAgICAgdG9wOiBudWxsLFxuICAgICAgICBsZWZ0OiBudWxsLFxuICAgICAgICBib3R0b206IG51bGwsXG4gICAgICAgIHJpZ2h0OiBudWxsXG4gICAgICB9XG4gICAgICB0aGlzLnRpbGVzLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZFRvQm9uZGFyaWVzKHRpbGUsIGJvdW5kYXJpZXMpXG4gICAgICB9KVxuICAgICAgcmV0dXJuIGJvdW5kYXJpZXNcbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbClcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZUNvbnRhaW5lclxuIiwiY2xhc3MgVGlsZVJlZmVyZW5jZSB7XG4gIGNvbnN0cnVjdG9yICh0aWxlKSB7XG4gICAgdGhpcy50aWxlID0gdGlsZVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIHg6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmluYWxUaWxlKCkueFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgeToge1xuICAgICAgICBnZXQ6ICgpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGaW5hbFRpbGUoKS55XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2V0RmluYWxUaWxlICgpIHtcbiAgICByZXR1cm4gdGhpcy50aWxlLmdldEZpbmFsVGlsZSgpXG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gVGlsZVJlZmVyZW5jZVxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5cbmNsYXNzIFRpbGVkIGV4dGVuZHMgRWxlbWVudCB7XG4gIHB1dE9uUmFuZG9tVGlsZSAodGlsZXMpIHtcbiAgICB2YXIgZm91bmRcbiAgICBmb3VuZCA9IHRoaXMuZ2V0UmFuZG9tVmFsaWRUaWxlKHRpbGVzKVxuICAgIGlmIChmb3VuZCkge1xuICAgICAgdGhpcy50aWxlID0gZm91bmRcbiAgICB9XG4gIH1cblxuICBnZXRSYW5kb21WYWxpZFRpbGUgKHRpbGVzLCB2YWxpZGF0b3IgPSB0aGlzLmNhbkdvT25UaWxlLmJpbmQodGhpcykpIHtcbiAgICB2YXIgY2FuZGlkYXRlLCBwb3MsIHJlbWFpbmluZ1xuICAgIHJlbWFpbmluZyA9IHRpbGVzLnNsaWNlKClcbiAgICB3aGlsZSAocmVtYWluaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgIHBvcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHJlbWFpbmluZy5sZW5ndGgpXG4gICAgICBjYW5kaWRhdGUgPSByZW1haW5pbmcuc3BsaWNlKHBvcywgMSlbMF1cbiAgICAgIGlmICh2YWxpZGF0b3IoY2FuZGlkYXRlKSkge1xuICAgICAgICByZXR1cm4gY2FuZGlkYXRlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH1cblxuICBjYW5Hb09uVGlsZSAodGlsZSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBnZXRGaW5hbFRpbGUgKCkge1xuICAgIHJldHVybiB0aGlzLnRpbGUuZ2V0RmluYWxUaWxlKClcbiAgfVxufTtcblxuVGlsZWQucHJvcGVydGllcyh7XG4gIHRpbGU6IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICh2YWwsIG9sZCkge1xuICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgIG9sZC5yZW1vdmVDaGlsZCh0aGlzKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMudGlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlLmFkZENoaWxkKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBvZmZzZXRYOiB7XG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBvZmZzZXRZOiB7XG4gICAgZGVmYXVsdDogMFxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVkXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQ29vcmRIZWxwZXI6IHJlcXVpcmUoJy4vQ29vcmRIZWxwZXInKSxcbiAgRGlyZWN0aW9uOiByZXF1aXJlKCcuL0RpcmVjdGlvbicpLFxuICBUaWxlOiByZXF1aXJlKCcuL1RpbGUnKSxcbiAgVGlsZUNvbnRhaW5lcjogcmVxdWlyZSgnLi9UaWxlQ29udGFpbmVyJyksXG4gIFRpbGVSZWZlcmVuY2U6IHJlcXVpcmUoJy4vVGlsZVJlZmVyZW5jZScpLFxuICBUaWxlZDogcmVxdWlyZSgnLi9UaWxlZCcpXG59XG4iLCIoZnVuY3Rpb24oZGVmaW5pdGlvbil7dmFyIFRpbWluZz1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7VGltaW5nLmRlZmluaXRpb249ZGVmaW5pdGlvbjtpZih0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIiYmbW9kdWxlIT09bnVsbCl7bW9kdWxlLmV4cG9ydHM9VGltaW5nO31lbHNle2lmKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIiYmUGFyYWxsZWxpbyE9PW51bGwpe1BhcmFsbGVsaW8uVGltaW5nPVRpbWluZzt9ZWxzZXtpZih0aGlzLlBhcmFsbGVsaW89PW51bGwpe3RoaXMuUGFyYWxsZWxpbz17fTt9dGhpcy5QYXJhbGxlbGlvLlRpbWluZz1UaW1pbmc7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgVGltaW5nO1xuVGltaW5nID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaW1pbmcgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICB0b2dnbGUodmFsKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICB2YWwgPSAhdGhpcy5ydW5uaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucnVubmluZyA9IHZhbDtcbiAgICB9XG5cbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCB0aW1lKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuVGltZXIoe1xuICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIHRpbWluZzogdGhpc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0SW50ZXJ2YWwoY2FsbGJhY2ssIHRpbWUpIHtcbiAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5UaW1lcih7XG4gICAgICAgIHRpbWU6IHRpbWUsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgcmVwZWF0OiB0cnVlLFxuICAgICAgICB0aW1pbmc6IHRoaXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9XG5cbiAgICB1bnBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKHRydWUpO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbWluZy5wcm9wZXJ0aWVzKHtcbiAgICBydW5uaW5nOiB7XG4gICAgICBkZWZhdWx0OiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVGltaW5nO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5UaW1pbmcuVGltZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFRpbWVyIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgdG9nZ2xlKHZhbCkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFsID0gIXRoaXMucGF1c2VkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucGF1c2VkID0gdmFsO1xuICAgIH1cblxuICAgIGltbWVkaWF0ZUludmFsaWRhdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZFRpbWVQcm9wZXJ0eS5pbnZhbGlkYXRlKHtcbiAgICAgICAgICBwcmV2ZW50SW1tZWRpYXRlOiB0cnVlLFxuICAgICAgICAgIG9yaWdpbjogdGhpc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICB9XG5cbiAgICB1bnBhdXNlKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgIHRoaXMuc3RhcnRUaW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5ub3coKTtcbiAgICAgIGlmICh0aGlzLnJlcGVhdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZCA9IHNldEludGVydmFsKHRoaXMudGljay5iaW5kKHRoaXMpLCB0aGlzLnJlbWFpbmluZ1RpbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgPSBzZXRUaW1lb3V0KHRoaXMudGljay5iaW5kKHRoaXMpLCB0aGlzLnJlbWFpbmluZ1RpbWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWUgLSAodGhpcy5jb25zdHJ1Y3Rvci5ub3coKSAtIHRoaXMuc3RhcnRUaW1lKTtcbiAgICAgIGlmICh0aGlzLnJlcGVhdCkge1xuICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aGlzLmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQodGhpcy5pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIG5vdygpIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93ICE9PSBudWxsID8gKHJlZiA9IHdpbmRvdy5wZXJmb3JtYW5jZSkgIT0gbnVsbCA/IHJlZi5ub3cgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgIH0gZWxzZSBpZiAoKHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MgIT09IG51bGwgPyBwcm9jZXNzLnVwdGltZSA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gcHJvY2Vzcy51cHRpbWUoKSAqIDEwMDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgdGhpcy5yZXBldGl0aW9uICs9IDE7XG4gICAgICBpZiAodGhpcy5jYWxsYmFjayAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuY2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnJlcGVhdCkge1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY29uc3RydWN0b3Iubm93KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtYWluaW5nVGltZSA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIGlmICh0aGlzLnJlcGVhdCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaWQpO1xuICAgICAgfVxuICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgVGltZXIucHJvcGVydGllcyh7XG4gICAgdGltZToge1xuICAgICAgZGVmYXVsdDogMTAwMFxuICAgIH0sXG4gICAgcGF1c2VkOiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgcnVubmluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gIWludmFsaWRhdG9yLnByb3AodGhpcy5wYXVzZWRQcm9wZXJ0eSkgJiYgaW52YWxpZGF0b3IucHJvcFBhdGgoJ3RpbWluZy5ydW5uaW5nJykgIT09IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB0aW1pbmc6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIGVsYXBzZWRUaW1lOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIGlmIChpbnZhbGlkYXRvci5wcm9wKHRoaXMucnVubmluZ1Byb3BlcnR5KSkge1xuICAgICAgICAgIHNldEltbWVkaWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbW1lZGlhdGVJbnZhbGlkYXRpb24oKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5ub3coKSAtIHRoaXMuc3RhcnRUaW1lICsgdGhpcy50aW1lIC0gdGhpcy5yZW1haW5pbmdUaW1lO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRpbWUgLSB0aGlzLnJlbWFpbmluZ1RpbWU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICAgICAgdGhpcy5zdG9wKCk7XG4gICAgICAgICAgdGhpcy5yZW1haW5pbmdUaW1lID0gdGhpcy50aW1lIC0gdmFsO1xuICAgICAgICAgIGlmICh0aGlzLnJlbWFpbmluZ1RpbWUgPD0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGljaygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnJlbWFpbmluZ1RpbWUgPSB0aGlzLnRpbWUgLSB2YWw7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZWxhcHNlZFRpbWVQcm9wZXJ0eS5pbnZhbGlkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHByYzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLmVsYXBzZWRUaW1lUHJvcGVydHkpIC8gdGhpcy50aW1lO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWRUaW1lID0gdGhpcy50aW1lICogdmFsO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVtYWluaW5nVGltZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy50aW1lO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVwZWF0OiB7XG4gICAgICBkZWZhdWx0OiBmYWxzZVxuICAgIH0sXG4gICAgcmVwZXRpdGlvbjoge1xuICAgICAgZGVmYXVsdDogMFxuICAgIH0sXG4gICAgY2FsbGJhY2s6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaW1lcjtcblxufSkuY2FsbCh0aGlzKTtcblxucmV0dXJuKFRpbWluZyk7fSk7IiwidmFyIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIsIENvbm5lY3RlZCwgRWxlbWVudCwgU2lnbmFsT3BlcmF0aW9uO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cblNpZ25hbE9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vU2lnbmFsT3BlcmF0aW9uJyk7XG5cbkNvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykud2F0Y2hlcnMuQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBDb25uZWN0ZWQgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIENvbm5lY3RlZCBleHRlbmRzIEVsZW1lbnQge1xuICAgIGNhbkNvbm5lY3RUbyh0YXJnZXQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGFyZ2V0LmFkZFNpZ25hbCA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH1cblxuICAgIGFjY2VwdFNpZ25hbChzaWduYWwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIG9uQWRkQ29ubmVjdGlvbihjb25uKSB7fVxuXG4gICAgb25SZW1vdmVDb25uZWN0aW9uKGNvbm4pIHt9XG5cbiAgICBvbk5ld1NpZ25hbFR5cGUoc2lnbmFsKSB7fVxuXG4gICAgb25BZGRTaWduYWwoc2lnbmFsLCBvcCkge31cblxuICAgIG9uUmVtb3ZlU2lnbmFsKHNpZ25hbCwgb3ApIHt9XG5cbiAgICBvblJlbW92ZVNpZ25hbFR5cGUoc2lnbmFsLCBvcCkge31cblxuICAgIG9uUmVwbGFjZVNpZ25hbChvbGRTaWduYWwsIG5ld1NpZ25hbCwgb3ApIHt9XG5cbiAgICBjb250YWluc1NpZ25hbChzaWduYWwsIGNoZWNrTGFzdCA9IGZhbHNlLCBjaGVja09yaWdpbikge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmFscy5maW5kKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgcmV0dXJuIGMubWF0Y2goc2lnbmFsLCBjaGVja0xhc3QsIGNoZWNrT3JpZ2luKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgYXV0b1N0YXJ0O1xuICAgICAgaWYgKCEob3AgIT0gbnVsbCA/IG9wLmZpbmRMaW1pdGVyKHRoaXMpIDogdm9pZCAwKSkge1xuICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgb3AgPSBuZXcgU2lnbmFsT3BlcmF0aW9uKCk7XG4gICAgICAgICAgYXV0b1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvcC5hZGRPcGVyYXRpb24oKCkgPT4ge1xuICAgICAgICAgIHZhciBzaW1pbGFyO1xuICAgICAgICAgIGlmICghdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwsIHRydWUpICYmIHRoaXMuYWNjZXB0U2lnbmFsKHNpZ25hbCkpIHtcbiAgICAgICAgICAgIHNpbWlsYXIgPSB0aGlzLmNvbnRhaW5zU2lnbmFsKHNpZ25hbCk7XG4gICAgICAgICAgICB0aGlzLnNpZ25hbHMucHVzaChzaWduYWwpO1xuICAgICAgICAgICAgdGhpcy5vbkFkZFNpZ25hbChzaWduYWwsIG9wKTtcbiAgICAgICAgICAgIGlmICghc2ltaWxhcikge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbk5ld1NpZ25hbFR5cGUoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGF1dG9TdGFydCkge1xuICAgICAgICAgIG9wLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzaWduYWw7XG4gICAgfVxuXG4gICAgcmVtb3ZlU2lnbmFsKHNpZ25hbCwgb3ApIHtcbiAgICAgIHZhciBhdXRvU3RhcnQ7XG4gICAgICBpZiAoIShvcCAhPSBudWxsID8gb3AuZmluZExpbWl0ZXIodGhpcykgOiB2b2lkIDApKSB7XG4gICAgICAgIGlmICghb3ApIHtcbiAgICAgICAgICBvcCA9IG5ldyBTaWduYWxPcGVyYXRpb247XG4gICAgICAgICAgYXV0b1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBvcC5hZGRPcGVyYXRpb24oKCkgPT4ge1xuICAgICAgICAgIHZhciBleGlzdGluZztcbiAgICAgICAgICBpZiAoKGV4aXN0aW5nID0gdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwsIHRydWUpKSAmJiB0aGlzLmFjY2VwdFNpZ25hbChzaWduYWwpKSB7XG4gICAgICAgICAgICB0aGlzLnNpZ25hbHMuc3BsaWNlKHRoaXMuc2lnbmFscy5pbmRleE9mKGV4aXN0aW5nKSwgMSk7XG4gICAgICAgICAgICB0aGlzLm9uUmVtb3ZlU2lnbmFsKHNpZ25hbCwgb3ApO1xuICAgICAgICAgICAgb3AuYWRkT3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICAgICAgdmFyIHNpbWlsYXI7XG4gICAgICAgICAgICAgIHNpbWlsYXIgPSB0aGlzLmNvbnRhaW5zU2lnbmFsKHNpZ25hbCk7XG4gICAgICAgICAgICAgIGlmIChzaW1pbGFyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25SZXBsYWNlU2lnbmFsKHNpZ25hbCwgc2ltaWxhciwgb3ApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uUmVtb3ZlU2lnbmFsVHlwZShzaWduYWwsIG9wKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzdGVwQnlTdGVwKSB7XG4gICAgICAgICAgICByZXR1cm4gb3Auc3RlcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdXRvU3RhcnQpIHtcbiAgICAgICAgICByZXR1cm4gb3Auc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKSB7XG4gICAgICBpZiAoc2lnbmFsLmxhc3QgPT09IHRoaXMpIHtcbiAgICAgICAgcmV0dXJuIHNpZ25hbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBzaWduYWwud2l0aExhc3QodGhpcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tGb3J3YXJkV2F0Y2hlcigpIHtcbiAgICAgIGlmICghdGhpcy5mb3J3YXJkV2F0Y2hlcikge1xuICAgICAgICB0aGlzLmZvcndhcmRXYXRjaGVyID0gbmV3IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICAgIHNjb3BlOiB0aGlzLFxuICAgICAgICAgIHByb3BlcnR5OiAnb3V0cHV0cycsXG4gICAgICAgICAgb25BZGRlZDogZnVuY3Rpb24ob3V0cHV0LCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkZWRTaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkU2lnbmFsVG8oc2lnbmFsLCBvdXRwdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblJlbW92ZWQ6IGZ1bmN0aW9uKG91dHB1dCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RvcEZvcndhcmRlZFNpZ25hbFRvKHNpZ25hbCwgb3V0cHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRXYXRjaGVyLmJpbmQoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3J3YXJkU2lnbmFsKHNpZ25hbCwgb3ApIHtcbiAgICAgIHZhciBuZXh0O1xuICAgICAgdGhpcy5mb3J3YXJkZWRTaWduYWxzLmFkZChzaWduYWwpO1xuICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgdGhpcy5vdXRwdXRzLmZvckVhY2goZnVuY3Rpb24oY29ubikge1xuICAgICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgICByZXR1cm4gY29ubi5hZGRTaWduYWwobmV4dCwgb3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aGlzLmNoZWNrRm9yd2FyZFdhdGNoZXIoKTtcbiAgICB9XG5cbiAgICBmb3J3YXJkQWxsU2lnbmFsc1RvKGNvbm4sIG9wKSB7XG4gICAgICByZXR1cm4gdGhpcy5zaWduYWxzLmZvckVhY2goKHNpZ25hbCkgPT4ge1xuICAgICAgICB2YXIgbmV4dDtcbiAgICAgICAgbmV4dCA9IHRoaXMucHJlcEZvcndhcmRlZFNpZ25hbChzaWduYWwpO1xuICAgICAgICByZXR1cm4gY29ubi5hZGRTaWduYWwobmV4dCwgb3ApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcEZvcndhcmRlZFNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgbmV4dDtcbiAgICAgIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5yZW1vdmUoc2lnbmFsKTtcbiAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgIHJldHVybiB0aGlzLm91dHB1dHMuZm9yRWFjaChmdW5jdGlvbihjb25uKSB7XG4gICAgICAgIGlmIChzaWduYWwubGFzdCAhPT0gY29ubikge1xuICAgICAgICAgIHJldHVybiBjb25uLnJlbW92ZVNpZ25hbChuZXh0LCBvcCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BBbGxGb3J3YXJkZWRTaWduYWxUbyhjb25uLCBvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgICAgcmV0dXJuIGNvbm4ucmVtb3ZlU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZvcndhcmRTaWduYWxUbyhzaWduYWwsIGNvbm4sIG9wKSB7XG4gICAgICB2YXIgbmV4dDtcbiAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgIGlmIChzaWduYWwubGFzdCAhPT0gY29ubikge1xuICAgICAgICByZXR1cm4gY29ubi5hZGRTaWduYWwobmV4dCwgb3ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0b3BGb3J3YXJkZWRTaWduYWxUbyhzaWduYWwsIGNvbm4sIG9wKSB7XG4gICAgICB2YXIgbmV4dDtcbiAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgIGlmIChzaWduYWwubGFzdCAhPT0gY29ubikge1xuICAgICAgICByZXR1cm4gY29ubi5yZW1vdmVTaWduYWwobmV4dCwgb3ApO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIENvbm5lY3RlZC5wcm9wZXJ0aWVzKHtcbiAgICBzaWduYWxzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBpbnB1dHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIG91dHB1dHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9LFxuICAgIGZvcndhcmRlZFNpZ25hbHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDb25uZWN0ZWQ7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJ2YXIgRWxlbWVudCwgU2lnbmFsO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFsID0gY2xhc3MgU2lnbmFsIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKG9yaWdpbiwgdHlwZSA9ICdzaWduYWwnLCBleGNsdXNpdmUgPSBmYWxzZSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5vcmlnaW4gPSBvcmlnaW47XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmV4Y2x1c2l2ZSA9IGV4Y2x1c2l2ZTtcbiAgICB0aGlzLmxhc3QgPSB0aGlzLm9yaWdpbjtcbiAgfVxuXG4gIHdpdGhMYXN0KGxhc3QpIHtcbiAgICB2YXIgc2lnbmFsO1xuICAgIHNpZ25hbCA9IG5ldyB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvcih0aGlzLm9yaWdpbiwgdGhpcy50eXBlLCB0aGlzLmV4Y2x1c2l2ZSk7XG4gICAgc2lnbmFsLmxhc3QgPSBsYXN0O1xuICAgIHJldHVybiBzaWduYWw7XG4gIH1cblxuICBjb3B5KCkge1xuICAgIHZhciBzaWduYWw7XG4gICAgc2lnbmFsID0gbmV3IHRoaXMuX19wcm90b19fLmNvbnN0cnVjdG9yKHRoaXMub3JpZ2luLCB0aGlzLnR5cGUsIHRoaXMuZXhjbHVzaXZlKTtcbiAgICBzaWduYWwubGFzdCA9IHRoaXMubGFzdDtcbiAgICByZXR1cm4gc2lnbmFsO1xuICB9XG5cbiAgbWF0Y2goc2lnbmFsLCBjaGVja0xhc3QgPSBmYWxzZSwgY2hlY2tPcmlnaW4gPSB0aGlzLmV4Y2x1c2l2ZSkge1xuICAgIHJldHVybiAoIWNoZWNrTGFzdCB8fCBzaWduYWwubGFzdCA9PT0gdGhpcy5sYXN0KSAmJiAoY2hlY2tPcmlnaW4gfHwgc2lnbmFsLm9yaWdpbiA9PT0gdGhpcy5vcmlnaW4pICYmIHNpZ25hbC50eXBlID09PSB0aGlzLnR5cGU7XG4gIH1cblxufTtcbiIsInZhciBFbGVtZW50LCBTaWduYWxPcGVyYXRpb247XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYWxPcGVyYXRpb24gPSBjbGFzcyBTaWduYWxPcGVyYXRpb24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgdGhpcy5saW1pdGVycyA9IFtdO1xuICB9XG5cbiAgYWRkT3BlcmF0aW9uKGZ1bmN0LCBwcmlvcml0eSA9IDEpIHtcbiAgICBpZiAocHJpb3JpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnVuc2hpZnQoZnVuY3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5wdXNoKGZ1bmN0KTtcbiAgICB9XG4gIH1cblxuICBhZGRMaW1pdGVyKGNvbm5lY3RlZCkge1xuICAgIGlmICghdGhpcy5maW5kTGltaXRlcihjb25uZWN0ZWQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5saW1pdGVycy5wdXNoKGNvbm5lY3RlZCk7XG4gICAgfVxuICB9XG5cbiAgZmluZExpbWl0ZXIoY29ubmVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMubGltaXRlcnMuaW5kZXhPZihjb25uZWN0ZWQpID4gLTE7XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICB2YXIgcmVzdWx0cztcbiAgICByZXN1bHRzID0gW107XG4gICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICByZXN1bHRzLnB1c2godGhpcy5zdGVwKCkpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxuXG4gIHN0ZXAoKSB7XG4gICAgdmFyIGZ1bmN0O1xuICAgIGlmICh0aGlzLnF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXMuZG9uZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBmdW5jdCA9IHRoaXMucXVldWUuc2hpZnQoZnVuY3QpO1xuICAgICAgcmV0dXJuIGZ1bmN0KHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGRvbmUoKSB7fVxuXG59O1xuIiwidmFyIENvbm5lY3RlZCwgU2lnbmFsLCBTaWduYWxPcGVyYXRpb24sIFNpZ25hbFNvdXJjZTtcblxuQ29ubmVjdGVkID0gcmVxdWlyZSgnLi9Db25uZWN0ZWQnKTtcblxuU2lnbmFsID0gcmVxdWlyZSgnLi9TaWduYWwnKTtcblxuU2lnbmFsT3BlcmF0aW9uID0gcmVxdWlyZSgnLi9TaWduYWxPcGVyYXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaWduYWxTb3VyY2UgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNpZ25hbFNvdXJjZSBleHRlbmRzIENvbm5lY3RlZCB7fTtcblxuICBTaWduYWxTb3VyY2UucHJvcGVydGllcyh7XG4gICAgYWN0aXZhdGVkOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3A7XG4gICAgICAgIG9wID0gbmV3IFNpZ25hbE9wZXJhdGlvbigpO1xuICAgICAgICBpZiAodGhpcy5hY3RpdmF0ZWQpIHtcbiAgICAgICAgICB0aGlzLmZvcndhcmRTaWduYWwodGhpcy5zaWduYWwsIG9wKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnN0b3BGb3J3YXJkZWRTaWduYWwodGhpcy5zaWduYWwsIG9wKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3Auc3RhcnQoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNpZ25hbDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTaWduYWwodGhpcywgJ3Bvd2VyJywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2lnbmFsU291cmNlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIENvbm5lY3RlZCwgU3dpdGNoO1xuXG5Db25uZWN0ZWQgPSByZXF1aXJlKCcuL0Nvbm5lY3RlZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN3aXRjaCA9IGNsYXNzIFN3aXRjaCBleHRlbmRzIENvbm5lY3RlZCB7fTtcbiIsInZhciBDb25uZWN0ZWQsIERpcmVjdGlvbiwgVGlsZWQsIFdpcmUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG5UaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlZDtcblxuRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvbjtcblxuQ29ubmVjdGVkID0gcmVxdWlyZSgnLi9Db25uZWN0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXaXJlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBXaXJlIGV4dGVuZHMgVGlsZWQge1xuICAgIGNvbnN0cnVjdG9yKHdpcmVUeXBlID0gJ3JlZCcpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLndpcmVUeXBlID0gd2lyZVR5cGU7XG4gICAgfVxuXG4gICAgZmluZERpcmVjdGlvbnNUbyhjb25uKSB7XG4gICAgICB2YXIgZGlyZWN0aW9ucztcbiAgICAgIGRpcmVjdGlvbnMgPSBjb25uLnRpbGVzICE9IG51bGwgPyBjb25uLnRpbGVzLm1hcCgodGlsZSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlLmZpbmREaXJlY3Rpb25PZih0aWxlKTtcbiAgICAgIH0pIDogW3RoaXMudGlsZS5maW5kRGlyZWN0aW9uT2YoY29ubildO1xuICAgICAgcmV0dXJuIGRpcmVjdGlvbnMuZmlsdGVyKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQgIT0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbkNvbm5lY3RUbyh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBDb25uZWN0ZWQucHJvdG90eXBlLmNhbkNvbm5lY3RUby5jYWxsKHRoaXMsIHRhcmdldCkgJiYgKCh0YXJnZXQud2lyZVR5cGUgPT0gbnVsbCkgfHwgdGFyZ2V0LndpcmVUeXBlID09PSB0aGlzLndpcmVUeXBlKTtcbiAgICB9XG5cbiAgICBvbk5ld1NpZ25hbFR5cGUoc2lnbmFsLCBvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZFNpZ25hbChzaWduYWwsIG9wKTtcbiAgICB9XG5cbiAgfTtcblxuICBXaXJlLmV4dGVuZChDb25uZWN0ZWQpO1xuXG4gIFdpcmUucHJvcGVydGllcyh7XG4gICAgb3V0cHV0czoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRpb24pIHtcbiAgICAgICAgdmFyIHBhcmVudDtcbiAgICAgICAgcGFyZW50ID0gaW52YWxpZGF0aW9uLnByb3AodGhpcy50aWxlUHJvcGVydHkpO1xuICAgICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdGlvbi5wcm9wKHBhcmVudC5hZGphY2VudFRpbGVzUHJvcGVydHkpLnJlZHVjZSgocmVzLCB0aWxlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmNvbmNhdChpbnZhbGlkYXRpb24ucHJvcCh0aWxlLmNoaWxkcmVuUHJvcGVydHkpLmZpbHRlcigoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FuQ29ubmVjdFRvKGNoaWxkKTtcbiAgICAgICAgICAgIH0pLnRvQXJyYXkoKSk7XG4gICAgICAgICAgfSwgW10pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgY29ubmVjdGVkRGlyZWN0aW9uczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdGlvbi5wcm9wKHRoaXMub3V0cHV0c1Byb3BlcnR5KS5yZWR1Y2UoKG91dCwgY29ubikgPT4ge1xuICAgICAgICAgIHRoaXMuZmluZERpcmVjdGlvbnNUbyhjb25uKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIGlmIChpbmRleE9mLmNhbGwob3V0LCBkKSA8IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG91dC5wdXNoKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBvdXQ7XG4gICAgICAgIH0sIFtdKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBXaXJlO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiQ29ubmVjdGVkXCI6IHJlcXVpcmUoXCIuL0Nvbm5lY3RlZFwiKSxcbiAgXCJTaWduYWxcIjogcmVxdWlyZShcIi4vU2lnbmFsXCIpLFxuICBcIlNpZ25hbE9wZXJhdGlvblwiOiByZXF1aXJlKFwiLi9TaWduYWxPcGVyYXRpb25cIiksXG4gIFwiU2lnbmFsU291cmNlXCI6IHJlcXVpcmUoXCIuL1NpZ25hbFNvdXJjZVwiKSxcbiAgXCJTd2l0Y2hcIjogcmVxdWlyZShcIi4vU3dpdGNoXCIpLFxuICBcIldpcmVcIjogcmVxdWlyZShcIi4vV2lyZVwiKSxcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmluZGVyOiByZXF1aXJlKCcuL3NyYy9CaW5kZXInKSxcbiAgRXZlbnRCaW5kOiByZXF1aXJlKCcuL3NyYy9FdmVudEJpbmQnKSxcbiAgUmVmZXJlbmNlOiByZXF1aXJlKCcuL3NyYy9SZWZlcmVuY2UnKVxufVxuIiwiY2xhc3MgQmluZGVyIHtcbiAgdG9nZ2xlQmluZCAodmFsID0gIXRoaXMuYmluZGVkKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmluZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnVuYmluZCgpXG4gICAgfVxuICB9XG5cbiAgYmluZCAoKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZCAmJiB0aGlzLmNhbkJpbmQoKSkge1xuICAgICAgdGhpcy5kb0JpbmQoKVxuICAgIH1cbiAgICB0aGlzLmJpbmRlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGRvQmluZCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKVxuICB9XG5cbiAgdW5iaW5kICgpIHtcbiAgICBpZiAodGhpcy5iaW5kZWQgJiYgdGhpcy5jYW5CaW5kKCkpIHtcbiAgICAgIHRoaXMuZG9VbmJpbmQoKVxuICAgIH1cbiAgICB0aGlzLmJpbmRlZCA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnVuYmluZCgpXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmluZGVyXG4iLCJcbmNvbnN0IEJpbmRlciA9IHJlcXVpcmUoJy4vQmluZGVyJylcbmNvbnN0IFJlZmVyZW5jZSA9IHJlcXVpcmUoJy4vUmVmZXJlbmNlJylcblxuY2xhc3MgRXZlbnRCaW5kIGV4dGVuZHMgQmluZGVyIHtcbiAgY29uc3RydWN0b3IgKGV2ZW50MSwgdGFyZ2V0MSwgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50MVxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0MVxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKVxuICB9XG5cbiAgYmluZFRvICh0YXJnZXQpIHtcbiAgICB0aGlzLnVuYmluZCgpXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXRcbiAgICByZXR1cm4gdGhpcy5iaW5kKClcbiAgfVxuXG4gIGRvQmluZCAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWRkTGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9uKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZnVuY3Rpb24gdG8gYWRkIGV2ZW50IGxpc3RlbmVycyB3YXMgZm91bmQnKVxuICAgIH1cbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9mZih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGZ1bmN0aW9uIHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgd2FzIGZvdW5kJylcbiAgICB9XG4gIH1cblxuICBlcXVhbHMgKGV2ZW50QmluZCkge1xuICAgIHJldHVybiBldmVudEJpbmQgIT0gbnVsbCAmJlxuICAgICAgZXZlbnRCaW5kLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmXG4gICAgICBldmVudEJpbmQuZXZlbnQgPT09IHRoaXMuZXZlbnQgJiZcbiAgICAgIFJlZmVyZW5jZS5jb21wYXJlVmFsKGV2ZW50QmluZC50YXJnZXQsIHRoaXMudGFyZ2V0KSAmJlxuICAgICAgUmVmZXJlbmNlLmNvbXBhcmVWYWwoZXZlbnRCaW5kLmNhbGxiYWNrLCB0aGlzLmNhbGxiYWNrKVxuICB9XG5cbiAgc3RhdGljIGNoZWNrRW1pdHRlciAoZW1pdHRlciwgZmF0YWwgPSB0cnVlKSB7XG4gICAgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVtaXR0ZXIuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChmYXRhbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEJpbmRcbiIsImNsYXNzIFJlZmVyZW5jZSB7XG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICB9XG5cbiAgZXF1YWxzIChyZWYpIHtcbiAgICByZXR1cm4gcmVmICE9IG51bGwgJiYgcmVmLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmIHRoaXMuY29tcGFyZURhdGEocmVmLmRhdGEpXG4gIH1cblxuICBjb21wYXJlRGF0YSAoZGF0YSkge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcXVhbHMoZGF0YSlcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSA9PT0gZGF0YSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSA9PSBudWxsIHx8IGRhdGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5kYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoICYmIE9iamVjdC5rZXlzKGRhdGEpLmV2ZXJ5KChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIFJlZmVyZW5jZS5jb21wYXJlVmFsKHRoaXMuZGF0YVtrZXldLCBkYXRhW2tleV0pXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gUmVmZXJlbmNlLmNvbXBhcmVWYWwodGhpcy5kYXRhLCBkYXRhKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gdmFsMVxuICAgKiBAcGFyYW0geyp9IHZhbDJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBjb21wYXJlVmFsICh2YWwxLCB2YWwyKSB7XG4gICAgaWYgKHZhbDEgPT09IHZhbDIpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh2YWwxID09IG51bGwgfHwgdmFsMiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWwxLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHZhbDEuZXF1YWxzKHZhbDIpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsMi5lcXVhbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWwyLmVxdWFscyh2YWwxKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwxKSAmJiBBcnJheS5pc0FycmF5KHZhbDIpKSB7XG4gICAgICByZXR1cm4gdmFsMS5sZW5ndGggPT09IHZhbDIubGVuZ3RoICYmIHZhbDEuZXZlcnkoKHZhbCwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlVmFsKHZhbCwgdmFsMltpXSlcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGlmICh0eXBlb2YgdmFsMSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbDIgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gICByZXR1cm4gT2JqZWN0LmtleXModmFsMSkubGVuZ3RoID09PSBPYmplY3Qua2V5cyh2YWwyKS5sZW5ndGggJiYgT2JqZWN0LmtleXModmFsMSkuZXZlcnkoKGtleSkgPT4ge1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5jb21wYXJlVmFsKHZhbDFba2V5XSwgdmFsMltrZXldKVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzdGF0aWMgbWFrZVJlZmVycmVkIChvYmosIGRhdGEpIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xuICAgICAgb2JqLnJlZiA9IGRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLnJlZiA9IG5ldyBSZWZlcmVuY2UoZGF0YSlcbiAgICB9XG4gICAgb2JqLmVxdWFscyA9IGZ1bmN0aW9uIChvYmoyKSB7XG4gICAgICByZXR1cm4gb2JqMiAhPSBudWxsICYmIHRoaXMucmVmLmVxdWFscyhvYmoyLnJlZilcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmVyZW5jZVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9Db2xsZWN0aW9uJylcbiIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGFycikge1xuICAgIGlmIChhcnIgIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9hcnJheSA9IGFyci50b0FycmF5KClcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hcnJheSA9IFthcnJdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FycmF5ID0gW11cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VkICgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBvbGRcbiAgICogQHBhcmFtIHtib29sZWFufSBvcmRlcmVkXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oVCxUKTogYm9vbGVhbn0gY29tcGFyZUZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja0NoYW5nZXMgKG9sZCwgb3JkZXJlZCA9IHRydWUsIGNvbXBhcmVGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgb2xkID0gdGhpcy5jb3B5KG9sZC5zbGljZSgpKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbGQgPSBbXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb3VudCgpICE9PSBvbGQubGVuZ3RoIHx8IChvcmRlcmVkID8gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgIHJldHVybiAhY29tcGFyZUZ1bmN0aW9uKG9sZC5nZXQoaSksIHZhbClcbiAgICB9KSA6IHRoaXMuc29tZShmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFvbGQucGx1Y2soZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaVxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgZ2V0IChpKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2ldXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIGdldFJhbmRvbSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FycmF5Lmxlbmd0aCldXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlcbiAgICogQHBhcmFtIHtUfSB2YWxcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHNldCAoaSwgdmFsKSB7XG4gICAgdmFyIG9sZFxuICAgIGlmICh0aGlzLl9hcnJheVtpXSAhPT0gdmFsKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXlbaV0gPSB2YWxcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1R9IHZhbFxuICAgKi9cbiAgYWRkICh2YWwpIHtcbiAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2godmFsKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VH0gdmFsXG4gICAqL1xuICByZW1vdmUgKHZhbCkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5pbmRleE9mKHZhbClcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQpOiBib29sZWFufSBmblxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgcGx1Y2sgKGZuKSB7XG4gICAgdmFyIGZvdW5kLCBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICBmb3VuZCA9IHRoaXMuX2FycmF5W2luZGV4XVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICAgIHJldHVybiBmb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtBcnJheS48VD59XG4gICAqL1xuICB0b0FycmF5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGNvdW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogQHRlbXBsYXRlIEl0ZW1UeXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b0FwcGVuZFxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPEl0ZW1UeXBlPnxBcnJheS48SXRlbVR5cGU+fEl0ZW1UeXBlfSBbYXJyXVxuICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9uLjxJdGVtVHlwZT59XG4gICAqL1xuICBzdGF0aWMgbmV3U3ViQ2xhc3MgKHRvQXBwZW5kLCBhcnIpIHtcbiAgICB2YXIgU3ViQ2xhc3NcbiAgICBpZiAodHlwZW9mIHRvQXBwZW5kID09PSAnb2JqZWN0Jykge1xuICAgICAgU3ViQ2xhc3MgPSBjbGFzcyBleHRlbmRzIHRoaXMge31cbiAgICAgIE9iamVjdC5hc3NpZ24oU3ViQ2xhc3MucHJvdG90eXBlLCB0b0FwcGVuZClcbiAgICAgIHJldHVybiBuZXcgU3ViQ2xhc3MoYXJyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoYXJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9uLjxUPn1cbiAgICovXG4gIGNvcHkgKGFycikge1xuICAgIHZhciBjb2xsXG4gICAgaWYgKGFyciA9PSBudWxsKSB7XG4gICAgICBhcnIgPSB0aGlzLnRvQXJyYXkoKVxuICAgIH1cbiAgICBjb2xsID0gbmV3IHRoaXMuY29uc3RydWN0b3IoYXJyKVxuICAgIHJldHVybiBjb2xsXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBhcnJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGVxdWFscyAoYXJyKSB7XG4gICAgcmV0dXJuICh0aGlzLmNvdW50KCkgPT09ICh0eXBlb2YgYXJyLmNvdW50ID09PSAnZnVuY3Rpb24nID8gYXJyLmNvdW50KCkgOiBhcnIubGVuZ3RoKSkgJiYgdGhpcy5ldmVyeShmdW5jdGlvbiAodmFsLCBpKSB7XG4gICAgICByZXR1cm4gYXJyW2ldID09PSB2YWxcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZ2V0QWRkZWRGcm9tIChhcnIpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gIWFyci5pbmNsdWRlcyhpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD59IGFyclxuICAgKiBAcmV0dXJuIHtBcnJheS48VD59XG4gICAqL1xuICBnZXRSZW1vdmVkRnJvbSAoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5pbmNsdWRlcyhpdGVtKVxuICAgIH0pXG4gIH1cbn07XG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucyA9IFsnZXZlcnknLCAnZmluZCcsICdmaW5kSW5kZXgnLCAnZm9yRWFjaCcsICdpbmNsdWRlcycsICdpbmRleE9mJywgJ2pvaW4nLCAnbGFzdEluZGV4T2YnLCAnbWFwJywgJ3JlZHVjZScsICdyZWR1Y2VSaWdodCcsICdzb21lJywgJ3RvU3RyaW5nJ11cblxuQ29sbGVjdGlvbi5yZWFkTGlzdEZ1bmN0aW9ucyA9IFsnY29uY2F0JywgJ2ZpbHRlcicsICdzbGljZSddXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMgPSBbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddXG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jdCkge1xuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtmdW5jdF0gPSBmdW5jdGlvbiAoLi4uYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZykpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHZhciBvbGQsIHJlc1xuICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgcmVzID0gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZylcbiAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIHJldHVybiByZXNcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbGxlY3Rpb24ucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCgpXG4gIH1cbn0pXG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiAwKSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W1N5bWJvbC5pdGVyYXRvcl0oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEludmFsaWRhdG9yOiByZXF1aXJlKCcuL3NyYy9JbnZhbGlkYXRvcicpLFxuICBQcm9wZXJ0aWVzTWFuYWdlcjogcmVxdWlyZSgnLi9zcmMvUHJvcGVydGllc01hbmFnZXInKSxcbiAgUHJvcGVydHk6IHJlcXVpcmUoJy4vc3JjL1Byb3BlcnR5JyksXG4gIGdldHRlcnM6IHtcbiAgICBCYXNlR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0Jhc2VHZXR0ZXInKSxcbiAgICBDYWxjdWxhdGVkR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0NhbGN1bGF0ZWRHZXR0ZXInKSxcbiAgICBDb21wb3NpdGVHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvQ29tcG9zaXRlR2V0dGVyJyksXG4gICAgSW52YWxpZGF0ZWRHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvSW52YWxpZGF0ZWRHZXR0ZXInKSxcbiAgICBNYW51YWxHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvTWFudWFsR2V0dGVyJyksXG4gICAgU2ltcGxlR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL1NpbXBsZUdldHRlcicpXG4gIH0sXG4gIHNldHRlcnM6IHtcbiAgICBCYXNlU2V0dGVyOiByZXF1aXJlKCcuL3NyYy9zZXR0ZXJzL0Jhc2VTZXR0ZXInKSxcbiAgICBCYXNlVmFsdWVTZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL3NldHRlcnMvQmFzZVZhbHVlU2V0dGVyJyksXG4gICAgQ29sbGVjdGlvblNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9Db2xsZWN0aW9uU2V0dGVyJyksXG4gICAgTWFudWFsU2V0dGVyOiByZXF1aXJlKCcuL3NyYy9zZXR0ZXJzL01hbnVhbFNldHRlcicpLFxuICAgIFNpbXBsZVNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9TaW1wbGVTZXR0ZXInKVxuICB9LFxuICB3YXRjaGVyczoge1xuICAgIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXI6IHJlcXVpcmUoJy4vc3JjL3dhdGNoZXJzL0NvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXInKSxcbiAgICBQcm9wZXJ0eVdhdGNoZXI6IHJlcXVpcmUoJy4vc3JjL3dhdGNoZXJzL1Byb3BlcnR5V2F0Y2hlcicpXG4gIH1cbn1cbiIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGFycikge1xuICAgIGlmIChhcnIgIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9hcnJheSA9IGFyci50b0FycmF5KClcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hcnJheSA9IFthcnJdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FycmF5ID0gW11cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VkICgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBvbGRcbiAgICogQHBhcmFtIHtib29sZWFufSBvcmRlcmVkXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oVCxUKTogYm9vbGVhbn0gY29tcGFyZUZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja0NoYW5nZXMgKG9sZCwgb3JkZXJlZCA9IHRydWUsIGNvbXBhcmVGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgb2xkID0gdGhpcy5jb3B5KG9sZC5zbGljZSgpKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbGQgPSBbXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb3VudCgpICE9PSBvbGQubGVuZ3RoIHx8IChvcmRlcmVkID8gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgIHJldHVybiAhY29tcGFyZUZ1bmN0aW9uKG9sZC5nZXQoaSksIHZhbClcbiAgICB9KSA6IHRoaXMuc29tZShmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFvbGQucGx1Y2soZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaVxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgZ2V0IChpKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2ldXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIGdldFJhbmRvbSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FycmF5Lmxlbmd0aCldXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlcbiAgICogQHBhcmFtIHtUfSB2YWxcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHNldCAoaSwgdmFsKSB7XG4gICAgdmFyIG9sZFxuICAgIGlmICh0aGlzLl9hcnJheVtpXSAhPT0gdmFsKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXlbaV0gPSB2YWxcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1R9IHZhbFxuICAgKi9cbiAgYWRkICh2YWwpIHtcbiAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2godmFsKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VH0gdmFsXG4gICAqL1xuICByZW1vdmUgKHZhbCkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5pbmRleE9mKHZhbClcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQpOiBib29sZWFufSBmblxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgcGx1Y2sgKGZuKSB7XG4gICAgdmFyIGZvdW5kLCBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICBmb3VuZCA9IHRoaXMuX2FycmF5W2luZGV4XVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICAgIHJldHVybiBmb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5LjxDb2xsZWN0aW9uLjxUPj58QXJyYXkuPEFycmF5LjxUPj58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48VD59XG4gICAqL1xuICBjb25jYXQgKC4uLmFycikge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXkuY29uY2F0KC4uLmFyci5tYXAoKGEpID0+IGEudG9BcnJheSA9PSBudWxsID8gYSA6IGEudG9BcnJheSgpKSkpXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgdG9BcnJheSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LnNsaWNlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5Lmxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIEB0ZW1wbGF0ZSBJdGVtVHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9BcHBlbmRcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxJdGVtVHlwZT58QXJyYXkuPEl0ZW1UeXBlPnxJdGVtVHlwZX0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48SXRlbVR5cGU+fVxuICAgKi9cbiAgc3RhdGljIG5ld1N1YkNsYXNzICh0b0FwcGVuZCwgYXJyKSB7XG4gICAgdmFyIFN1YkNsYXNzXG4gICAgaWYgKHR5cGVvZiB0b0FwcGVuZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gICAgICBPYmplY3QuYXNzaWduKFN1YkNsYXNzLnByb3RvdHlwZSwgdG9BcHBlbmQpXG4gICAgICByZXR1cm4gbmV3IFN1YkNsYXNzKGFycilcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKGFycilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD58VH0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48VD59XG4gICAqL1xuICBjb3B5IChhcnIpIHtcbiAgICB2YXIgY29sbFxuICAgIGlmIChhcnIgPT0gbnVsbCkge1xuICAgICAgYXJyID0gdGhpcy50b0FycmF5KClcbiAgICB9XG4gICAgY29sbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGFycilcbiAgICByZXR1cm4gY29sbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gYXJyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMgKGFycikge1xuICAgIHJldHVybiAodGhpcy5jb3VudCgpID09PSAodHlwZW9mIGFyci5jb3VudCA9PT0gJ2Z1bmN0aW9uJyA/IGFyci5jb3VudCgpIDogYXJyLmxlbmd0aCkpICYmIHRoaXMuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgcmV0dXJuIGFycltpXSA9PT0gdmFsXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPn0gYXJyXG4gICAqIEByZXR1cm4ge0FycmF5LjxUPn1cbiAgICovXG4gIGdldEFkZGVkRnJvbSAoYXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuICFhcnIuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZ2V0UmVtb3ZlZEZyb20gKGFycikge1xuICAgIHJldHVybiBhcnIuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG59O1xuXG5Db2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMgPSBbJ2V2ZXJ5JywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZvckVhY2gnLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdqb2luJywgJ2xhc3RJbmRleE9mJywgJ21hcCcsICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAnc29tZScsICd0b1N0cmluZyddXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMgPSBbJ2ZpbHRlcicsICdzbGljZSddXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMgPSBbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddXG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jdCkge1xuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtmdW5jdF0gPSBmdW5jdGlvbiAoLi4uYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZykpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHZhciBvbGQsIHJlc1xuICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgcmVzID0gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZylcbiAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIHJldHVybiByZXNcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbGxlY3Rpb24ucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCgpXG4gIH1cbn0pXG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiAwKSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W1N5bWJvbC5pdGVyYXRvcl0oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblxuIiwiY29uc3QgQmluZGVyID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkJpbmRlclxuY29uc3QgRXZlbnRCaW5kID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkV2ZW50QmluZFxuXG5jb25zdCBwbHVjayA9IGZ1bmN0aW9uIChhcnIsIGZuKSB7XG4gIHZhciBmb3VuZCwgaW5kZXhcbiAgaW5kZXggPSBhcnIuZmluZEluZGV4KGZuKVxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGZvdW5kID0gYXJyW2luZGV4XVxuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgcmV0dXJuIGZvdW5kXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkYXRvciBleHRlbmRzIEJpbmRlciB7XG4gIGNvbnN0cnVjdG9yIChpbnZhbGlkYXRlZCwgc2NvcGUgPSBudWxsKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBpbnZhbGlkYXRlZFxuICAgIHRoaXMuc2NvcGUgPSBzY29wZVxuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzID0gW11cbiAgICB0aGlzLnJlY3ljbGVkID0gW11cbiAgICB0aGlzLnVua25vd25zID0gW11cbiAgICB0aGlzLnN0cmljdCA9IHRoaXMuY29uc3RydWN0b3Iuc3RyaWN0XG4gICAgdGhpcy5pbnZhbGlkID0gZmFsc2VcbiAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZSgpXG4gICAgfVxuICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpc1xuICAgIHRoaXMuY2hhbmdlZENhbGxiYWNrID0gKG9sZCwgY29udGV4dCkgPT4ge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlZENhbGxiYWNrLm93bmVyID0gdGhpc1xuICB9XG5cbiAgaW52YWxpZGF0ZSAoY29udGV4dCkge1xuICAgIHZhciBmdW5jdE5hbWVcbiAgICB0aGlzLmludmFsaWQgPSB0cnVlXG4gICAgaWYgKHR5cGVvZiB0aGlzLmludmFsaWRhdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVkKGNvbnRleHQpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsYmFjayhjb250ZXh0KVxuICAgIH0gZWxzZSBpZiAoKHRoaXMuaW52YWxpZGF0ZWQgIT0gbnVsbCkgJiYgdHlwZW9mIHRoaXMuaW52YWxpZGF0ZWQuaW52YWxpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlZC5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZ1bmN0TmFtZSA9ICdpbnZhbGlkYXRlJyArIHRoaXMuaW52YWxpZGF0ZWQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmludmFsaWRhdGVkLnNsaWNlKDEpXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2NvcGVbZnVuY3ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNjb3BlW2Z1bmN0TmFtZV0oY29udGV4dClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NvcGVbdGhpcy5pbnZhbGlkYXRlZF0gPSBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmtub3duIChjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0ZWQgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZC51bmtub3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlZC51bmtub3duKGNvbnRleHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoY29udGV4dClcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudEJpbmQgKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkQmluZGVyKG5ldyBFdmVudEJpbmQoZXZlbnQsIHRhcmdldCwgY2FsbGJhY2spKVxuICB9XG5cbiAgYWRkQmluZGVyIChiaW5kZXIpIHtcbiAgICBpZiAoYmluZGVyLmNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgIGJpbmRlci5jYWxsYmFjayA9IHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrXG4gICAgfVxuICAgIGlmICghdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuc29tZShmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICByZXR1cm4gZXZlbnRCaW5kLmVxdWFscyhiaW5kZXIpXG4gICAgfSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKHBsdWNrKHRoaXMucmVjeWNsZWQsIGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKVxuICAgICAgfSkgfHwgYmluZGVyKVxuICAgIH1cbiAgfVxuXG4gIGdldFVua25vd25DYWxsYmFjayAocHJvcCkge1xuICAgIHZhciBjYWxsYmFja1xuICAgIGNhbGxiYWNrID0gKGNvbnRleHQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgICAgfSwgcHJvcCwgY29udGV4dClcbiAgICB9XG4gICAgY2FsbGJhY2sucHJvcCA9IHByb3BcbiAgICBjYWxsYmFjay5vd25lciA9IHRoaXNcbiAgICByZXR1cm4gY2FsbGJhY2tcbiAgfVxuXG4gIGFkZFVua25vd24gKGZuLCBwcm9wLCBjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLmZpbmRVbmtub3duKHByb3ApKSB7XG4gICAgICBmbi5wcm9wID0gcHJvcFxuICAgICAgZm4ub3duZXIgPSB0aGlzXG4gICAgICB0aGlzLnVua25vd25zLnB1c2goZm4pXG4gICAgICByZXR1cm4gdGhpcy51bmtub3duKGNvbnRleHQpXG4gICAgfVxuICB9XG5cbiAgZmluZFVua25vd24gKHByb3ApIHtcbiAgICBpZiAocHJvcCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy51bmtub3ducy5maW5kKGZ1bmN0aW9uICh1bmtub3duKSB7XG4gICAgICAgIHJldHVybiB1bmtub3duLnByb3AgPT09IHByb3BcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZXZlbnQgKGV2ZW50LCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tFbWl0dGVyKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZEV2ZW50QmluZChldmVudCwgdGFyZ2V0KVxuICAgIH1cbiAgfVxuXG4gIHZhbHVlICh2YWwsIGV2ZW50LCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgdGhpcy5ldmVudChldmVudCwgdGFyZ2V0KVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAdGVtcGxhdGUgVFxuICAgKiBAcGFyYW0ge1Byb3BlcnR5PFQ+fSBwcm9wXG4gICAqIEByZXR1cm4ge1R9XG4gICAqL1xuICBwcm9wIChwcm9wKSB7XG4gICAgaWYgKHByb3AgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRFdmVudEJpbmQoJ2ludmFsaWRhdGVkJywgcHJvcC5ldmVudHMsIHRoaXMuZ2V0VW5rbm93bkNhbGxiYWNrKHByb3ApKVxuICAgICAgdGhpcy5hZGRFdmVudEJpbmQoJ3VwZGF0ZWQnLCBwcm9wLmV2ZW50cywgdGhpcy5jaGFuZ2VkQ2FsbGJhY2spXG4gICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgIH1cbiAgfVxuXG4gIHByb3BCeU5hbWUgKHByb3AsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICBpZiAodGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KHByb3ApXG4gICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcChwcm9wZXJ0eSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRhcmdldFtwcm9wICsgJ1Byb3BlcnR5J10gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcCh0YXJnZXRbcHJvcCArICdQcm9wZXJ0eSddKVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0W3Byb3BdXG4gIH1cblxuICBwcm9wUGF0aCAocGF0aCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgIHZhciBwcm9wLCB2YWxcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpXG4gICAgdmFsID0gdGFyZ2V0XG4gICAgd2hpbGUgKCh2YWwgIT0gbnVsbCkgJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9wID0gcGF0aC5zaGlmdCgpXG4gICAgICB2YWwgPSB0aGlzLnByb3BCeU5hbWUocHJvcCwgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBmdW5jdCAoZnVuY3QpIHtcbiAgICB2YXIgaW52YWxpZGF0b3IsIHJlc1xuICAgIGludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oKCkgPT4ge1xuICAgICAgICB2YXIgcmVzMlxuICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpXG4gICAgICAgIGlmIChyZXMgIT09IHJlczIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSwgaW52YWxpZGF0b3IpXG4gICAgfSlcbiAgICByZXMgPSBmdW5jdChpbnZhbGlkYXRvcilcbiAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKGludmFsaWRhdG9yKVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIHZhbGlkYXRlVW5rbm93bnMgKCkge1xuICAgIHRoaXMudW5rbm93bnMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uICh1bmtub3duKSB7XG4gICAgICB1bmtub3duKClcbiAgICB9KVxuICAgIHRoaXMudW5rbm93bnMgPSBbXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpc0VtcHR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMubGVuZ3RoID09PSAwXG4gIH1cblxuICBiaW5kICgpIHtcbiAgICB0aGlzLmludmFsaWQgPSBmYWxzZVxuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50QmluZCkge1xuICAgICAgZXZlbnRCaW5kLmJpbmQoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlY3ljbGUgKGZuKSB7XG4gICAgdmFyIGRvbmUsIHJlc1xuICAgIHRoaXMucmVjeWNsZWQgPSB0aGlzLmludmFsaWRhdGlvbkV2ZW50c1xuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzID0gW11cbiAgICBkb25lID0gdGhpcy5lbmRSZWN5Y2xlLmJpbmQodGhpcylcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZm4ubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gZm4odGhpcywgZG9uZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyA9IGZuKHRoaXMpXG4gICAgICAgIGRvbmUoKVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuICB9XG5cbiAgZW5kUmVjeWNsZSAoKSB7XG4gICAgdGhpcy5yZWN5Y2xlZC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKClcbiAgICB9KVxuICAgIHRoaXMucmVjeWNsZWQgPSBbXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjaGVja0VtaXR0ZXIgKGVtaXR0ZXIpIHtcbiAgICByZXR1cm4gRXZlbnRCaW5kLmNoZWNrRW1pdHRlcihlbWl0dGVyLCB0aGlzLnN0cmljdClcbiAgfVxuXG4gIGNoZWNrUHJvcEluc3RhbmNlIChwcm9wKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm9wLmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLmNoZWNrRW1pdHRlcihwcm9wLmV2ZW50cylcbiAgfVxuXG4gIHVuYmluZCAoKSB7XG4gICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICBldmVudEJpbmQudW5iaW5kKClcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn07XG5cbkludmFsaWRhdG9yLnN0cmljdCA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkYXRvclxuIiwiY29uc3QgUHJvcGVydHkgPSByZXF1aXJlKCcuL1Byb3BlcnR5JylcblxuY2xhc3MgUHJvcGVydGllc01hbmFnZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcGVydGllcyA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPFByb3BlcnR5Pn1cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXVxuICAgIHRoaXMuZ2xvYmFsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBpbml0V2F0Y2hlcnM6IGZhbHNlIH0sIG9wdGlvbnMpXG4gICAgdGhpcy5wcm9wZXJ0aWVzT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BlcnRpZXMpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9wZXJ0aWVzTWFuYWdlcn1cbiAgICovXG4gIGNvcHlXaXRoIChwcm9wZXJ0aWVzID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLm1lcmdlUHJvcGVydGllc09wdGlvbnModGhpcy5wcm9wZXJ0aWVzT3B0aW9ucywgcHJvcGVydGllcyksIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2xvYmFsT3B0aW9ucywgb3B0aW9ucykpXG4gIH1cblxuICB3aXRoUHJvcGVydHkgKHByb3AsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge31cbiAgICBwcm9wZXJ0aWVzW3Byb3BdID0gb3B0aW9uc1xuICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHByb3BlcnRpZXMpXG4gIH1cblxuICB1c2VTY29wZSAoc2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5V2l0aCh7fSwgeyBzY29wZTogc2NvcGUgfSlcbiAgfVxuXG4gIG1lcmdlUHJvcGVydGllc09wdGlvbnMgKC4uLmFyZykge1xuICAgIHJldHVybiBhcmcucmVkdWNlKChyZXMsIG9wdCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMob3B0KS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHJlc1tuYW1lXSA9IHRoaXMubWVyZ2VQcm9wZXJ0eU9wdGlvbnMocmVzW25hbWVdIHx8IHt9LCBvcHRbbmFtZV0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sIHt9KVxuICB9XG5cbiAgbWVyZ2VQcm9wZXJ0eU9wdGlvbnMgKC4uLmFyZykge1xuICAgIGNvbnN0IG5vdE1lcmdhYmxlID0gWydkZWZhdWx0JywgJ3Njb3BlJ11cbiAgICByZXR1cm4gYXJnLnJlZHVjZSgocmVzLCBvcHQpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb3B0W25hbWVdID09PSAnZnVuY3Rpb24nICYmICFub3RNZXJnYWJsZS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IHRoaXMubWVyZ2VDYWxsYmFjayhyZXNbbmFtZV0sIG9wdFtuYW1lXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbbmFtZV0gPSBvcHRbbmFtZV1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiByZXNcbiAgICB9LCB7fSlcbiAgfVxuXG4gIG1lcmdlQ2FsbGJhY2sgKG9sZEZ1bmN0LCBuZXdGdW5jdCkge1xuICAgIGNvbnN0IGZuID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgICAgcmV0dXJuIG5ld0Z1bmN0LmNhbGwodGhpcywgLi4uYXJnLCBvbGRGdW5jdC5iaW5kKHRoaXMpKVxuICAgIH1cbiAgICBmbi5jb21wb25lbnRzID0gKG9sZEZ1bmN0LmNvbXBvbmVudHMgfHwgW29sZEZ1bmN0XSkuY29uY2F0KChvbGRGdW5jdC5uZXdGdW5jdCB8fCBbbmV3RnVuY3RdKSlcbiAgICBmbi5uYlBhcmFtcyA9IG5ld0Z1bmN0Lm5iUGFyYW1zIHx8IG5ld0Z1bmN0Lmxlbmd0aFxuICAgIHJldHVybiBmblxuICB9XG5cbiAgaW5pdFByb3BlcnRpZXMgKCkge1xuICAgIHRoaXMuYWRkUHJvcGVydGllcyh0aGlzLnByb3BlcnRpZXNPcHRpb25zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjcmVhdGVTY29wZUdldHRlclNldHRlcnMgKCkge1xuICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiBwcm9wLmNyZWF0ZVNjb3BlR2V0dGVyU2V0dGVycygpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbml0V2F0Y2hlcnMgKCkge1xuICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiBwcm9wLmluaXRXYXRjaGVycygpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbml0U2NvcGUgKCkge1xuICAgIHRoaXMuaW5pdFByb3BlcnRpZXMoKVxuICAgIHRoaXMuY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzKClcbiAgICB0aGlzLmluaXRXYXRjaGVycygpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAdGVtcGxhdGUgVFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvcGVydHk8VD59XG4gICAqL1xuICBhZGRQcm9wZXJ0eSAobmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHByb3AgPSBuZXcgUHJvcGVydHkoT2JqZWN0LmFzc2lnbih7IG5hbWU6IG5hbWUgfSwgdGhpcy5nbG9iYWxPcHRpb25zLCBvcHRpb25zKSlcbiAgICB0aGlzLnByb3BlcnRpZXMucHVzaChwcm9wKVxuICAgIHJldHVybiBwcm9wXG4gIH1cblxuICBhZGRQcm9wZXJ0aWVzIChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgobmFtZSkgPT4gdGhpcy5hZGRQcm9wZXJ0eShuYW1lLCBvcHRpb25zW25hbWVdKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm5zIHtQcm9wZXJ0eX1cbiAgICovXG4gIGdldFByb3BlcnR5IChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5maW5kKChwcm9wKSA9PiBwcm9wLm9wdGlvbnMubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIHNldFByb3BlcnRpZXNEYXRhIChkYXRhLCBvcHRpb25zID0ge30pIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoKG9wdGlvbnMud2hpdGVsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMud2hpdGVsaXN0LmluZGV4T2Yoa2V5KSAhPT0gLTEpICYmICgob3B0aW9ucy5ibGFja2xpc3QgPT0gbnVsbCkgfHwgb3B0aW9ucy5ibGFja2xpc3QuaW5kZXhPZihrZXkpID09PSAtMSkpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5KVxuICAgICAgICBpZiAocHJvcCkge1xuICAgICAgICAgIHByb3Auc2V0KGRhdGFba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGdldE1hbnVhbERhdGFQcm9wZXJ0aWVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZSgocmVzLCBwcm9wKSA9PiB7XG4gICAgICBpZiAocHJvcC5nZXR0ZXIuY2FsY3VsYXRlZCAmJiBwcm9wLm1hbnVhbCkge1xuICAgICAgICByZXNbcHJvcC5vcHRpb25zLm5hbWVdID0gcHJvcC5nZXQoKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sIHt9KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHByb3AuZGVzdHJveSgpKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvcGVydGllc01hbmFnZXJcbiIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuXG5jb25zdCBTaW1wbGVHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvU2ltcGxlR2V0dGVyJylcbmNvbnN0IENhbGN1bGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvQ2FsY3VsYXRlZEdldHRlcicpXG5jb25zdCBJbnZhbGlkYXRlZEdldHRlciA9IHJlcXVpcmUoJy4vZ2V0dGVycy9JbnZhbGlkYXRlZEdldHRlcicpXG5jb25zdCBNYW51YWxHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvTWFudWFsR2V0dGVyJylcbmNvbnN0IENvbXBvc2l0ZUdldHRlciA9IHJlcXVpcmUoJy4vZ2V0dGVycy9Db21wb3NpdGVHZXR0ZXInKVxuXG5jb25zdCBNYW51YWxTZXR0ZXIgPSByZXF1aXJlKCcuL3NldHRlcnMvTWFudWFsU2V0dGVyJylcbmNvbnN0IFNpbXBsZVNldHRlciA9IHJlcXVpcmUoJy4vc2V0dGVycy9TaW1wbGVTZXR0ZXInKVxuY29uc3QgQmFzZVZhbHVlU2V0dGVyID0gcmVxdWlyZSgnLi9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlcicpXG5jb25zdCBDb2xsZWN0aW9uU2V0dGVyID0gcmVxdWlyZSgnLi9zZXR0ZXJzL0NvbGxlY3Rpb25TZXR0ZXInKVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNsYXNzIFByb3BlcnR5IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BlcnR5T3B0aW9uc1xuICAgKiBAcHJvcGVydHkge1R9IFtkZWZhdWx0XVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKGltcG9ydChcIi4vSW52YWxpZGF0b3JcIikpOiBUfSBbY2FsY3VsXVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IFR9IFtnZXRdXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCl9IFtzZXRdXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCxUKXxpbXBvcnQoXCIuL1Byb3BlcnR5V2F0Y2hlclwiKTxUPn0gW2NoYW5nZV1cbiAgICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ3xmdW5jdGlvbihULFQpOlR9IFtjb21wb3NlZF1cbiAgICogQHByb3BlcnR5IHtib29sZWFufE9iamVjdH0gW2NvbGxlY3Rpb25dXG4gICAqIEBwcm9wZXJ0eSB7Kn0gW3Njb3BlXVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIFByb3BlcnR5LmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IHRoaXMub3B0aW9ucy5FdmVudEVtaXR0ZXJDbGFzcygpXG4gICAgdGhpcy5tYWtlU2V0dGVyKClcbiAgICB0aGlzLm1ha2VHZXR0ZXIoKVxuICAgIHRoaXMuc2V0dGVyLmluaXQoKVxuICAgIHRoaXMuZ2V0dGVyLmluaXQoKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5pdFdhdGNoZXJzKSB7XG4gICAgICB0aGlzLmluaXRXYXRjaGVycygpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXRRdWFsaWZpZWROYW1lICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWUpIHtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5vcHRpb25zLm5hbWVcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2NvcGUgJiYgdGhpcy5vcHRpb25zLnNjb3BlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIG5hbWUgPSB0aGlzLm9wdGlvbnMuc2NvcGUuY29uc3RydWN0b3IubmFtZSArICcuJyArIG5hbWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYW1lXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0UXVhbGlmaWVkTmFtZSgpXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiBgW1Byb3BlcnR5ICR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gJ1tQcm9wZXJ0eV0nXG4gIH1cblxuICBpbml0V2F0Y2hlcnMgKCkge1xuICAgIHRoaXMuc2V0dGVyLmxvYWRJbnRlcm5hbFdhdGNoZXIoKVxuICB9XG5cbiAgbWFrZUdldHRlciAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmdldHRlciA9IG5ldyBNYW51YWxHZXR0ZXIodGhpcylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPSBudWxsICYmIHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gbmV3IENvbXBvc2l0ZUdldHRlcih0aGlzKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jYWxjdWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICgodGhpcy5vcHRpb25zLmNhbGN1bC5uYlBhcmFtcyB8fCB0aGlzLm9wdGlvbnMuY2FsY3VsLmxlbmd0aCkgPT09IDApIHtcbiAgICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgQ2FsY3VsYXRlZEdldHRlcih0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgSW52YWxpZGF0ZWRHZXR0ZXIodGhpcylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgU2ltcGxlR2V0dGVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgbWFrZVNldHRlciAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBNYW51YWxTZXR0ZXIodGhpcylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb2xsZWN0aW9uICE9IG51bGwgJiYgdGhpcy5vcHRpb25zLmNvbGxlY3Rpb24gIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBDb2xsZWN0aW9uU2V0dGVyKHRoaXMpXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY29tcG9zZWQgIT0gbnVsbCAmJiB0aGlzLm9wdGlvbnMuY29tcG9zZWQgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBCYXNlVmFsdWVTZXR0ZXIodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0ZXIgPSBuZXcgU2ltcGxlU2V0dGVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvcGVydHk8VD59XG4gICAqL1xuICBjb3B5V2l0aCAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpKVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtUfVxuICAgKi9cbiAgZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXR0ZXIuZ2V0KClcbiAgfVxuXG4gIGludmFsaWRhdGUgKGNvbnRleHQpIHtcbiAgICB0aGlzLmdldHRlci5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVua25vd24gKGNvbnRleHQpIHtcbiAgICB0aGlzLmdldHRlci51bmtub3duKGNvbnRleHQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldCAodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGVyLnNldCh2YWwpXG4gIH1cblxuICBjcmVhdGVTY29wZUdldHRlclNldHRlcnMgKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2NvcGUpIHtcbiAgICAgIGNvbnN0IHByb3AgPSB0aGlzXG4gICAgICBsZXQgb3B0ID0ge31cbiAgICAgIG9wdFt0aGlzLm9wdGlvbnMubmFtZSArICdQcm9wZXJ0eSddID0ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcHQgPSB0aGlzLmdldHRlci5nZXRTY29wZUdldHRlclNldHRlcnMob3B0KVxuICAgICAgb3B0ID0gdGhpcy5zZXR0ZXIuZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzKG9wdClcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMub3B0aW9ucy5zY29wZSwgb3B0KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZXN0cm95ID09PSB0cnVlICYmIHRoaXMudmFsdWUgIT0gbnVsbCAmJiB0aGlzLnZhbHVlLmRlc3Ryb3kgIT0gbnVsbCkge1xuICAgICAgdGhpcy52YWx1ZS5kZXN0cm95KClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsT3B0aW9uRnVuY3QoJ2Rlc3Ryb3knLCB0aGlzLnZhbHVlKVxuICAgIH1cbiAgICB0aGlzLmdldHRlci5kZXN0cm95KClcbiAgICB0aGlzLnZhbHVlID0gbnVsbFxuICB9XG5cbiAgY2FsbE9wdGlvbkZ1bmN0IChmdW5jdCwgLi4uYXJncykge1xuICAgIGlmICh0eXBlb2YgZnVuY3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmdW5jdCA9IHRoaXMub3B0aW9uc1tmdW5jdF1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0LmFwcGx5KHRoaXMub3B0aW9ucy5zY29wZSB8fCB0aGlzLCBhcmdzKVxuICB9XG59XG5cblByb3BlcnR5LmRlZmF1bHRPcHRpb25zID0ge1xuICBFdmVudEVtaXR0ZXJDbGFzczogRXZlbnRFbWl0dGVyLFxuICBpbml0V2F0Y2hlcnM6IHRydWVcbn1cbm1vZHVsZS5leHBvcnRzID0gUHJvcGVydHlcbiIsIlxuY2xhc3MgQmFzZUdldHRlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wKSB7XG4gICAgdGhpcy5wcm9wID0gcHJvcFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlXG4gICAgdGhpcy5pbnZhbGlkYXRlZCA9IGZhbHNlXG4gIH1cblxuICBnZXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJylcbiAgfVxuXG4gIG91dHB1dCAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5vdXRwdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdvdXRwdXQnLCB0aGlzLnByb3AudmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgICB9XG4gIH1cblxuICByZXZhbGlkYXRlZCAoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZVxuICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZVxuICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmtub3duIChjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLmludmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVkID0gdHJ1ZVxuICAgICAgdGhpcy5pbnZhbGlkYXRlTm90aWNlKGNvbnRleHQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbnZhbGlkYXRlIChjb250ZXh0KSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgICBpZiAoIXRoaXMuaW52YWxpZGF0ZWQpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICB0aGlzLmludmFsaWRhdGVOb3RpY2UoY29udGV4dClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGludmFsaWRhdGVOb3RpY2UgKGNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCB7IG9yaWdpbjogdGhpcy5wcm9wIH1cbiAgICB0aGlzLnByb3AuZXZlbnRzLmVtaXQoJ2ludmFsaWRhdGVkJywgY29udGV4dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5RGVzY3JpcHRvck1hcH0gb3B0XG4gICAqIEByZXR1cm4ge1Byb3BlcnR5RGVzY3JpcHRvck1hcH1cbiAgICovXG4gIGdldFNjb3BlR2V0dGVyU2V0dGVycyAob3B0KSB7XG4gICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcFxuICAgIG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXSA9IG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXSB8fCB7fVxuICAgIG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgIH1cbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uZW51bWVyYWJsZSA9IHRydWVcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uY29uZmlndXJhYmxlID0gdHJ1ZVxuICAgIHJldHVybiBvcHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUdldHRlclxuIiwiXG5jb25zdCBCYXNlR2V0dGVyID0gcmVxdWlyZSgnLi9CYXNlR2V0dGVyJylcblxuY2xhc3MgQ2FsY3VsYXRlZEdldHRlciBleHRlbmRzIEJhc2VHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICBjb25zdCBvbGQgPSB0aGlzLnByb3AudmFsdWVcbiAgICAgIGNvbnN0IGluaXRpYXRlZCA9IHRoaXMuaW5pdGlhdGVkXG4gICAgICB0aGlzLmNhbGN1bCgpXG4gICAgICBpZiAoIWluaXRpYXRlZCkge1xuICAgICAgICB0aGlzLnByb3AuZXZlbnRzLmVtaXQoJ3VwZGF0ZWQnLCBvbGQpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcC5zZXR0ZXIuY2hlY2tDaGFuZ2VzKHRoaXMucHJvcC52YWx1ZSwgb2xkKSkge1xuICAgICAgICB0aGlzLnByb3Auc2V0dGVyLmNoYW5nZWQob2xkKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmludmFsaWRhdGVkID0gZmFsc2VcbiAgICByZXR1cm4gdGhpcy5vdXRwdXQoKVxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICB0aGlzLnByb3Auc2V0dGVyLnNldFJhd1ZhbHVlKHRoaXMucHJvcC5jYWxsT3B0aW9uRnVuY3QoJ2NhbGN1bCcpKVxuICAgIHRoaXMucHJvcC5tYW51YWwgPSBmYWxzZVxuICAgIHRoaXMucmV2YWxpZGF0ZWQoKVxuICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGN1bGF0ZWRHZXR0ZXJcbiIsImNvbnN0IEludmFsaWRhdGVkR2V0dGVyID0gcmVxdWlyZSgnLi9JbnZhbGlkYXRlZEdldHRlcicpXG5jb25zdCBDb2xsZWN0aW9uID0gcmVxdWlyZSgnc3BhcmstY29sbGVjdGlvbicpXG5jb25zdCBJbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJylcbmNvbnN0IFJlZmVyZW5jZSA9IHJlcXVpcmUoJ3NwYXJrLWJpbmRpbmcnKS5SZWZlcmVuY2VcblxuY2xhc3MgQ29tcG9zaXRlR2V0dGVyIGV4dGVuZHMgSW52YWxpZGF0ZWRHZXR0ZXIge1xuICBpbml0ICgpIHtcbiAgICBzdXBlci5pbml0KClcbiAgICBpZiAodGhpcy5wcm9wLm9wdGlvbnMuZGVmYXVsdCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmJhc2VWYWx1ZSA9IHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZShudWxsKVxuICAgICAgdGhpcy5iYXNlVmFsdWUgPSBudWxsXG4gICAgfVxuICAgIHRoaXMubWVtYmVycyA9IG5ldyBDb21wb3NpdGVHZXR0ZXIuTWVtYmVycyh0aGlzLnByb3Aub3B0aW9ucy5tZW1iZXJzKVxuICAgIGlmICh0aGlzLnByb3Aub3B0aW9ucy5jYWxjdWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tZW1iZXJzLnVuc2hpZnQoKHByZXYsIGludmFsaWRhdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3Aub3B0aW9ucy5jYWxjdWwuYmluZCh0aGlzLnByb3Aub3B0aW9ucy5zY29wZSkoaW52YWxpZGF0b3IpXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLm1lbWJlcnMuY2hhbmdlZCA9IChvbGQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoKVxuICAgIH1cbiAgICB0aGlzLnByb3AubWVtYmVycyA9IHRoaXMubWVtYmVyc1xuICAgIHRoaXMuam9pbiA9IHRoaXMuZ3Vlc3NKb2luRnVuY3Rpb24oKVxuICB9XG5cbiAgZ3Vlc3NKb2luRnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29tcG9zZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3Aub3B0aW9ucy5jb21wb3NlZFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkID09PSAnc3RyaW5nJyAmJiBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9uc1t0aGlzLnByb3Aub3B0aW9ucy5jb21wb3NlZF0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zW3RoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkXVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wLm9wdGlvbnMuY29sbGVjdGlvbiAhPSBudWxsICYmIHRoaXMucHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gIT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMuY29uY2F0XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3Aub3B0aW9ucy5kZWZhdWx0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zLm9yXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3Aub3B0aW9ucy5kZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMuYW5kXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9ucy5sYXN0XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICBpZiAodGhpcy5tZW1iZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcy5wcm9wLCB0aGlzLnByb3Aub3B0aW9ucy5zY29wZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLm1lbWJlcnMucmVkdWNlKChwcmV2LCBtZW1iZXIpID0+IHtcbiAgICAgICAgICB2YXIgdmFsXG4gICAgICAgICAgdmFsID0gdHlwZW9mIG1lbWJlciA9PT0gJ2Z1bmN0aW9uJyA/IG1lbWJlcihwcmV2LCB0aGlzLmludmFsaWRhdG9yKSA6IG1lbWJlclxuICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4ocHJldiwgdmFsKVxuICAgICAgICB9LCB0aGlzLmJhc2VWYWx1ZSkpXG4gICAgICAgIGRvbmUoKVxuICAgICAgICBpZiAoaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG51bGxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnZhbGlkYXRvci5iaW5kKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLmJhc2VWYWx1ZSlcbiAgICB9XG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfSBvcHRcbiAgICogQHJldHVybiB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfVxuICAgKi9cbiAgZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzIChvcHQpIHtcbiAgICBvcHQgPSBzdXBlci5nZXRTY29wZUdldHRlclNldHRlcnMob3B0KVxuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLm1lbWJlcnNcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZSArICdNZW1iZXJzJ10gPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lbWJlcnNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdFxuICB9XG59XG5cbkNvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zID0ge1xuICBhbmQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYlxuICB9LFxuICBvcjogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYSB8fCBiXG4gIH0sXG4gIGxhc3Q6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGJcbiAgfSxcbiAgc3VtOiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhICsgYlxuICB9LFxuICBjb25jYXQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgYSA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhLnRvQXJyYXkgIT0gbnVsbCkge1xuICAgICAgICBhID0gYS50b0FycmF5KClcbiAgICAgIH1cbiAgICAgIGlmIChhLmNvbmNhdCA9PSBudWxsKSB7XG4gICAgICAgIGEgPSBbYV1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgYiA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiLnRvQXJyYXkgIT0gbnVsbCkge1xuICAgICAgICBiID0gYi50b0FycmF5KClcbiAgICAgIH1cbiAgICAgIGlmIChiLmNvbmNhdCA9PSBudWxsKSB7XG4gICAgICAgIGIgPSBbYl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpXG4gIH1cbn1cblxuQ29tcG9zaXRlR2V0dGVyLk1lbWJlcnMgPSBjbGFzcyBNZW1iZXJzIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZFByb3BlcnR5IChwcm9wKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG51bGwsIHByb3ApID09PSAtMSkge1xuICAgICAgdGhpcy5wdXNoKFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHByb3ApXG4gICAgICB9LCB7XG4gICAgICAgIHByb3A6IHByb3BcbiAgICAgIH0pKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUHJvcGVydHlQYXRoIChuYW1lLCBvYmopIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHVzaChSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgobmFtZSwgb2JqKVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9ialxuICAgICAgfSkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVQcm9wZXJ0eSAocHJvcCkge1xuICAgIHRoaXMucmVtb3ZlUmVmKHsgcHJvcDogcHJvcCB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KGRhdGEpID09PSAtMSkge1xuICAgICAgY29uc3QgZm4gPSBSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9LCBkYXRhKVxuICAgICAgZm4udmFsID0gdmFsXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZmluZFJlZkluZGV4KGRhdGEpXG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlUmVmKHZhbCwgZGF0YSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0KGkpLnZhbCAhPT0gdmFsKSB7XG4gICAgICBjb25zdCBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH0sIGRhdGEpXG4gICAgICBmbi52YWwgPSB2YWxcbiAgICAgIHRoaXMuc2V0KGksIGZuKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0VmFsdWVSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQnlSZWYoZGF0YSkudmFsXG4gIH1cblxuICBhZGRGdW5jdGlvblJlZiAoZm4sIGRhdGEpIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgoZGF0YSkgPT09IC0xKSB7XG4gICAgICBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZm4sIGRhdGEpXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmaW5kQnlSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5maW5kUmVmSW5kZXgoZGF0YSldXG4gIH1cblxuICBmaW5kUmVmSW5kZXggKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuZmluZEluZGV4KGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLmNvbXBhcmVEYXRhKGRhdGEpXG4gICAgfSlcbiAgfVxuXG4gIHJlbW92ZVJlZiAoZGF0YSkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLmZpbmRSZWZJbmRleChkYXRhKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlR2V0dGVyXG4iLCJjb25zdCBJbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJylcbmNvbnN0IENhbGN1bGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL0NhbGN1bGF0ZWRHZXR0ZXInKVxuXG5jbGFzcyBJbnZhbGlkYXRlZEdldHRlciBleHRlbmRzIENhbGN1bGF0ZWRHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIGlmICh0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZ2V0KClcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgaWYgKCF0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMucHJvcCwgdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUpXG4gICAgfVxuICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgIHRoaXMucHJvcC5zZXR0ZXIuc2V0UmF3VmFsdWUodGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnY2FsY3VsJywgaW52YWxpZGF0b3IpKVxuICAgICAgdGhpcy5wcm9wLm1hbnVhbCA9IGZhbHNlXG4gICAgICBkb25lKClcbiAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmFsaWRhdG9yLmJpbmQoKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxuXG4gIGludmFsaWRhdGUgKGNvbnRleHQpIHtcbiAgICBzdXBlci5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQgJiYgdGhpcy5pbnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRvci51bmJpbmQoKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdGVkR2V0dGVyXG4iLCJjb25zdCBCYXNlR2V0dGVyID0gcmVxdWlyZSgnLi9CYXNlR2V0dGVyJylcblxuY2xhc3MgTWFudWFsR2V0dGVyIGV4dGVuZHMgQmFzZUdldHRlciB7XG4gIGdldCAoKSB7XG4gICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdnZXQnKSlcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlXG4gICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbnVhbEdldHRlclxuIiwiY29uc3QgQmFzZUdldHRlciA9IHJlcXVpcmUoJy4vQmFzZUdldHRlcicpXG5cbmNsYXNzIFNpbXBsZUdldHRlciBleHRlbmRzIEJhc2VHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgICBpZiAoIXRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWVcbiAgICAgIHRoaXMucHJvcC5ldmVudHMuZW1pdCgndXBkYXRlZCcpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm91dHB1dCgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVHZXR0ZXJcbiIsIlxuY29uc3QgUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnLi4vd2F0Y2hlcnMvUHJvcGVydHlXYXRjaGVyJylcblxuY2xhc3MgQmFzZVNldHRlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wKSB7XG4gICAgdGhpcy5wcm9wID0gcHJvcFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5zZXREZWZhdWx0VmFsdWUoKVxuICB9XG5cbiAgc2V0RGVmYXVsdFZhbHVlICgpIHtcbiAgICB0aGlzLnNldFJhd1ZhbHVlKHRoaXMuaW5nZXN0KHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHQpKVxuICB9XG5cbiAgbG9hZEludGVybmFsV2F0Y2hlciAoKSB7XG4gICAgY29uc3QgY2hhbmdlT3B0ID0gdGhpcy5wcm9wLm9wdGlvbnMuY2hhbmdlXG4gICAgaWYgKHR5cGVvZiBjaGFuZ2VPcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5wcm9wLFxuICAgICAgICBjYWxsYmFjazogY2hhbmdlT3B0LFxuICAgICAgICBzY29wZTogdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUsXG4gICAgICAgIGF1dG9CaW5kOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoY2hhbmdlT3B0ICE9IG51bGwgJiYgdHlwZW9mIGNoYW5nZU9wdC5jb3B5V2l0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy53YXRjaGVyID0gY2hhbmdlT3B0LmNvcHlXaXRoKHtcbiAgICAgICAgcHJvcGVydHk6IHRoaXMucHJvcCxcbiAgICAgICAgc2NvcGU6IHRoaXMucHJvcC5vcHRpb25zLnNjb3BlLFxuICAgICAgICBhdXRvQmluZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2F0Y2hlclxuICB9XG5cbiAgc2V0ICh2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBzZXRSYXdWYWx1ZSAodmFsKSB7XG4gICAgdGhpcy5wcm9wLnZhbHVlID0gdmFsXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgaW5nZXN0ICh2YWwpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcC5vcHRpb25zLmluZ2VzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsID0gdGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnaW5nZXN0JywgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBjaGVja0NoYW5nZXMgKHZhbCwgb2xkKSB7XG4gICAgcmV0dXJuIHZhbCAhPT0gb2xkXG4gIH1cblxuICBjaGFuZ2VkIChvbGQpIHtcbiAgICBjb25zdCBjb250ZXh0ID0geyBvcmlnaW46IHRoaXMucHJvcCB9XG4gICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCd1cGRhdGVkJywgb2xkLCBjb250ZXh0KVxuICAgIHRoaXMucHJvcC5ldmVudHMuZW1pdCgnY2hhbmdlZCcsIG9sZCwgY29udGV4dClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfSBvcHRcbiAgICogQHJldHVybiB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfVxuICAgKi9cbiAgZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzIChvcHQpIHtcbiAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wXG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdID0gb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdIHx8IHt9XG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdLnNldCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBwcm9wLnNldCh2YWwpXG4gICAgfVxuICAgIHJldHVybiBvcHRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VTZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBCYXNlVmFsdWVTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB2YWwgPSB0aGlzLmluZ2VzdCh2YWwpXG4gICAgaWYgKHRoaXMucHJvcC5nZXR0ZXIuYmFzZVZhbHVlICE9PSB2YWwpIHtcbiAgICAgIHRoaXMucHJvcC5nZXR0ZXIuYmFzZVZhbHVlID0gdmFsXG4gICAgICB0aGlzLnByb3AuaW52YWxpZGF0ZSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmFsdWVTZXR0ZXJcbiIsImNvbnN0IFNpbXBsZVNldHRlciA9IHJlcXVpcmUoJy4vU2ltcGxlU2V0dGVyJylcbmNvbnN0IENvbGxlY3Rpb24gPSByZXF1aXJlKCdzcGFyay1jb2xsZWN0aW9uJylcbmNvbnN0IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuLi93YXRjaGVycy9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyJylcblxuY2xhc3MgQ29sbGVjdGlvblNldHRlciBleHRlbmRzIFNpbXBsZVNldHRlciB7XG4gIGluaXQgKCkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIENvbGxlY3Rpb25TZXR0ZXIuZGVmYXVsdE9wdGlvbnMsXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA9PT0gJ29iamVjdCcgPyB0aGlzLnByb3Aub3B0aW9ucy5jb2xsZWN0aW9uIDoge31cbiAgICApXG4gICAgc3VwZXIuaW5pdCgpXG4gIH1cblxuICBsb2FkSW50ZXJuYWxXYXRjaGVyICgpIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY2hhbmdlID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuaXRlbUFkZGVkID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuaXRlbVJlbW92ZWQgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXcgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIHByb3BlcnR5OiB0aGlzLnByb3AsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnByb3Aub3B0aW9ucy5jaGFuZ2UsXG4gICAgICAgIG9uQWRkZWQ6IHRoaXMucHJvcC5vcHRpb25zLml0ZW1BZGRlZCxcbiAgICAgICAgb25SZW1vdmVkOiB0aGlzLnByb3Aub3B0aW9ucy5pdGVtUmVtb3ZlZCxcbiAgICAgICAgc2NvcGU6IHRoaXMucHJvcC5vcHRpb25zLnNjb3BlLFxuICAgICAgICBhdXRvQmluZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIubG9hZEludGVybmFsV2F0Y2hlcigpXG4gICAgfVxuICB9XG5cbiAgc2V0UmF3VmFsdWUgKHZhbCkge1xuICAgIHRoaXMucHJvcC52YWx1ZSA9IHRoaXMubWFrZUNvbGxlY3Rpb24odmFsKVxuICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgfVxuXG4gIG1ha2VDb2xsZWN0aW9uICh2YWwpIHtcbiAgICB2YWwgPSB0aGlzLnZhbFRvQXJyYXkodmFsKVxuICAgIGNvbnN0IHByb3AgPSB0aGlzLnByb3BcbiAgICBjb25zdCBjb2wgPSBDb2xsZWN0aW9uLm5ld1N1YkNsYXNzKHRoaXMub3B0aW9ucywgdmFsKVxuICAgIGNvbC5jaGFuZ2VkID0gZnVuY3Rpb24gKG9sZCkge1xuICAgICAgcHJvcC5zZXR0ZXIuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiBjb2xcbiAgfVxuXG4gIHZhbFRvQXJyYXkgKHZhbCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWwudG9BcnJheSgpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiB2YWwuc2xpY2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3ZhbF1cbiAgICB9XG4gIH1cblxuICBjaGVja0NoYW5nZXMgKHZhbCwgb2xkKSB7XG4gICAgdmFyIGNvbXBhcmVGdW5jdGlvblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbXBhcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IHRoaXMub3B0aW9ucy5jb21wYXJlXG4gICAgfVxuICAgIHJldHVybiAobmV3IENvbGxlY3Rpb24odmFsKSkuY2hlY2tDaGFuZ2VzKG9sZCwgdGhpcy5vcHRpb25zLm9yZGVyZWQsIGNvbXBhcmVGdW5jdGlvbilcbiAgfVxufVxuXG5Db2xsZWN0aW9uU2V0dGVyLmRlZmF1bHRPcHRpb25zID0ge1xuICBjb21wYXJlOiBmYWxzZSxcbiAgb3JkZXJlZDogdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25TZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBNYW51YWxTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdzZXQnLCB2YWwpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYW51YWxTZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBTaW1wbGVTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB2YXIgb2xkXG4gICAgdmFsID0gdGhpcy5pbmdlc3QodmFsKVxuICAgIHRoaXMucHJvcC5nZXR0ZXIucmV2YWxpZGF0ZWQoKVxuICAgIGlmICh0aGlzLmNoZWNrQ2hhbmdlcyh2YWwsIHRoaXMucHJvcC52YWx1ZSkpIHtcbiAgICAgIG9sZCA9IHRoaXMucHJvcC52YWx1ZVxuICAgICAgdGhpcy5zZXRSYXdWYWx1ZSh2YWwpXG4gICAgICB0aGlzLnByb3AubWFudWFsID0gdHJ1ZVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZVNldHRlclxuIiwiXG5jb25zdCBQcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuL1Byb3BlcnR5V2F0Y2hlcicpXG5cbmNsYXNzIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgZXh0ZW5kcyBQcm9wZXJ0eVdhdGNoZXIge1xuICBsb2FkT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHN1cGVyLmxvYWRPcHRpb25zKG9wdGlvbnMpXG4gICAgdGhpcy5vbkFkZGVkID0gb3B0aW9ucy5vbkFkZGVkXG4gICAgdGhpcy5vblJlbW92ZWQgPSBvcHRpb25zLm9uUmVtb3ZlZFxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlICh2YWx1ZSwgb2xkKSB7XG4gICAgb2xkID0gdmFsdWUuY29weShvbGQgfHwgW10pXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgdmFsdWUsIG9sZClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaWYgKCFvbGQuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkFkZGVkLmNhbGwodGhpcy5zY29wZSwgaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG9sZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vblJlbW92ZWQuY2FsbCh0aGlzLnNjb3BlLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXJcbiIsIlxuY29uc3QgQmluZGVyID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkJpbmRlclxuY29uc3QgUmVmZXJlbmNlID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLlJlZmVyZW5jZVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNsYXNzIFByb3BlcnR5V2F0Y2hlciBleHRlbmRzIEJpbmRlciB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wZXJ0eVdhdGNoZXJPcHRpb25zXG4gICAqIEBwcm9wZXJ0eSB7aW1wb3J0KFwiLi9Qcm9wZXJ0eVwiKTxUPnxzdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCxUKX0gY2FsbGJhY2tcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBbYXV0b0JpbmRdXG4gICAqIEBwcm9wZXJ0eSB7Kn0gW3Njb3BlXVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5V2F0Y2hlck9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9IChjb250ZXh0KSA9PiB7XG4gICAgICBpZiAodGhpcy52YWxpZENvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVDYWxsYmFjayA9IChvbGQsIGNvbnRleHQpID0+IHtcbiAgICAgIGlmICh0aGlzLnZhbGlkQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICB0aGlzLnVwZGF0ZShvbGQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkT3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgfVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBsb2FkT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLnNjb3BlXG4gICAgdGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHlcbiAgICB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFja1xuICAgIHRoaXMuYXV0b0JpbmQgPSBvcHRpb25zLmF1dG9CaW5kXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNvcHlXaXRoIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucykpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICBpZiAodGhpcy5hdXRvQmluZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tCaW5kKClcbiAgICB9XG4gIH1cblxuICBnZXRQcm9wZXJ0eSAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcEJ5TmFtZSh0aGlzLnByb3BlcnR5KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVxuICB9XG5cbiAgZ2V0UHJvcEJ5TmFtZSAocHJvcCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgIGlmICh0YXJnZXQucHJvcGVydGllc01hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eShwcm9wKVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3AgKyAnUHJvcGVydHknXSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W3Byb3AgKyAnUHJvcGVydHknXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHRoZSBwcm9wZXJ0eSAke3Byb3B9YClcbiAgICB9XG4gIH1cblxuICBjaGVja0JpbmQgKCkge1xuICAgIHJldHVybiB0aGlzLnRvZ2dsZUJpbmQodGhpcy5zaG91bGRCaW5kKCkpXG4gIH1cblxuICBzaG91bGRCaW5kICgpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkoKSAhPSBudWxsXG4gIH1cblxuICBkb0JpbmQgKCkge1xuICAgIHRoaXMudXBkYXRlKClcbiAgICB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLmFkZExpc3RlbmVyKCdpbnZhbGlkYXRlZCcsIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLmFkZExpc3RlbmVyKCd1cGRhdGVkJywgdGhpcy51cGRhdGVDYWxsYmFjaylcbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLnJlbW92ZUxpc3RlbmVyKCdpbnZhbGlkYXRlZCcsIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLnJlbW92ZUxpc3RlbmVyKCd1cGRhdGVkJywgdGhpcy51cGRhdGVDYWxsYmFjaylcbiAgfVxuXG4gIGVxdWFscyAod2F0Y2hlcikge1xuICAgIHJldHVybiB3YXRjaGVyLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmXG4gICAgICB3YXRjaGVyICE9IG51bGwgJiZcbiAgICAgIHdhdGNoZXIuZXZlbnQgPT09IHRoaXMuZXZlbnQgJiZcbiAgICAgIHdhdGNoZXIuZ2V0UHJvcGVydHkoKSA9PT0gdGhpcy5nZXRQcm9wZXJ0eSgpICYmXG4gICAgICBSZWZlcmVuY2UuY29tcGFyZVZhbCh3YXRjaGVyLmNhbGxiYWNrLCB0aGlzLmNhbGxiYWNrKVxuICB9XG5cbiAgdmFsaWRDb250ZXh0IChjb250ZXh0KSB7XG4gICAgcmV0dXJuIGNvbnRleHQgPT0gbnVsbCB8fCAhY29udGV4dC5wcmV2ZW50SW1tZWRpYXRlXG4gIH1cblxuICBpbnZhbGlkYXRlICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eSgpLmdldCgpXG4gIH1cblxuICB1cGRhdGUgKG9sZCkge1xuICAgIHZhciB2YWx1ZVxuICAgIHZhbHVlID0gdGhpcy5nZXRQcm9wZXJ0eSgpLmdldCgpXG4gICAgcmV0dXJuIHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlLCBvbGQpXG4gIH1cblxuICBoYW5kbGVDaGFuZ2UgKHZhbHVlLCBvbGQpIHtcbiAgICByZXR1cm4gdGhpcy5jYWxsYmFjay5jYWxsKHRoaXMuc2NvcGUsIHZhbHVlLCBvbGQpXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvcGVydHlXYXRjaGVyXG4iXX0=
