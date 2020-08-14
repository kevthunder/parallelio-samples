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



},{"./Door":6,"parallelio":92}],2:[function(require,module,exports){
var BaseCharacter, Character, DomUpdater, Element, Tiled;

Tiled = require('./Tiled');

BaseCharacter = require('parallelio').Character;

DomUpdater = require('./DomUpdater');

Element = require('spark-starter').Element;

module.exports = Character = (function() {
  class Character extends BaseCharacter {
    constructor() {
      super();
      this.initDisplay();
      this.baseCls = 'character';
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



},{"./DomUpdater":5,"./Tiled":18,"parallelio":92,"spark-starter":127}],3:[function(require,module,exports){
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



},{"./Display":4,"./DomUpdater":5,"parallelio":92}],4:[function(require,module,exports){
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



},{"./DomUpdater":5,"parallelio":92}],5:[function(require,module,exports){
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



},{"parallelio":92}],6:[function(require,module,exports){
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



},{"./DomUpdater":5,"./Tiled":18,"parallelio":92,"spark-starter":127}],7:[function(require,module,exports){
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



},{"./PlayerController":9,"./View":20,"parallelio":92}],8:[function(require,module,exports){
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



},{"parallelio":92}],9:[function(require,module,exports){
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



},{"spark-starter":127}],10:[function(require,module,exports){
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



},{"./Display":4,"./Updater":19,"parallelio":92}],12:[function(require,module,exports){
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



},{"./Display":4,"./DomUpdater":5,"parallelio":92}],13:[function(require,module,exports){
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



},{"./AutomaticDoor":1,"./Tile":17,"parallelio":92}],14:[function(require,module,exports){
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



},{"./Damageable":3,"./DomUpdater":5,"./Projectile":11,"./Tiled":18,"parallelio":92}],15:[function(require,module,exports){
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



},{"./Map":8,"./StarSystem":16,"parallelio":92}],16:[function(require,module,exports){
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



},{"./Display":4,"parallelio":92}],17:[function(require,module,exports){
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



},{"./Display":4,"parallelio":92}],18:[function(require,module,exports){
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



},{"./Display":4,"parallelio":92}],19:[function(require,module,exports){
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



},{"parallelio":92}],20:[function(require,module,exports){
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



},{"./Display":4,"./DomUpdater":5,"parallelio":92}],21:[function(require,module,exports){
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



},{"./DomUpdater":5,"./Tiled":18,"parallelio":92}],22:[function(require,module,exports){
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



},{"./libs":22,"parallelio":92}],24:[function(require,module,exports){
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
var Element, Grid, GridCell, GridRow;

Element = require('spark-starter').Element;

GridCell = require('./GridCell');

GridRow = require('./GridRow');

module.exports = Grid = (function() {
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
        rows = invalidator.prop(this.rowsProperty);
        return rows.reduce(function(max, row) {
          return Math.max(max, invalidator.prop(row.cellsProperty).length);
        }, 0);
      }
    }
  });

  return Grid;

}).call(this);

},{"./GridCell":26,"./GridRow":27,"spark-starter":127}],26:[function(require,module,exports){
var Element, GridCell;

Element = require('spark-starter').Element;

module.exports = GridCell = (function() {
  class GridCell extends Element {};

  GridCell.properties({
    grid: {
      calcul: function(invalidator) {
        return invalidator.propPath('grid.row');
      }
    },
    row: {},
    columnPosition: {
      calcul: function(invalidator) {
        var row;
        row = invalidator.prop(this.rowProperty);
        if (row) {
          return invalidator.prop(row.cellsProperty).indexOf(this);
        }
      }
    },
    width: {
      calcul: function(invalidator) {
        return 1 / invalidator.propPath('row.cells').length;
      }
    },
    left: {
      calcul: function(invalidator) {
        return invalidator.prop(this.widthProperty) * invalidator.prop(this.columnPositionProperty);
      }
    },
    right: {
      calcul: function(invalidator) {
        return invalidator.prop(this.widthProperty) * (invalidator.prop(this.columnPositionProperty) + 1);
      }
    },
    height: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.height');
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.top');
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.propPath('row.bottom');
      }
    }
  });

  return GridCell;

}).call(this);

},{"spark-starter":127}],27:[function(require,module,exports){
var Element, GridCell, GridRow;

Element = require('spark-starter').Element;

GridCell = require('./GridCell');

module.exports = GridRow = (function() {
  class GridRow extends Element {
    addCell(cell = null) {
      if (!cell) {
        cell = new GridCell();
      }
      this.cells.push(cell);
      return cell;
    }

  };

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
        grid = invalidator.prop(this.gridProperty);
        if (grid) {
          return invalidator.prop(grid.rowsProperty).indexOf(this);
        }
      }
    },
    height: {
      calcul: function(invalidator) {
        return 1 / invalidator.propPath('grid.rows').length;
      }
    },
    top: {
      calcul: function(invalidator) {
        return invalidator.prop(this.heightProperty) * invalidator.prop(this.rowPositionProperty);
      }
    },
    bottom: {
      calcul: function(invalidator) {
        return invalidator.prop(this.heightProperty) * (invalidator.prop(this.rowPositionProperty) + 1);
      }
    }
  });

  return GridRow;

}).call(this);

},{"./GridCell":26,"spark-starter":127}],28:[function(require,module,exports){
module.exports = {
  "Grid": require("./Grid"),
  "GridCell": require("./GridCell"),
  "GridRow": require("./GridRow"),
}
},{"./Grid":25,"./GridCell":26,"./GridRow":27}],29:[function(require,module,exports){
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
},{"spark-starter":127}],30:[function(require,module,exports){
if (typeof module !== "undefined" && module !== null) {
  module.exports = {
      greekAlphabet: require('./strings/greekAlphabet'),
      starNames: require('./strings/starNames')
  };
}
},{"./strings/greekAlphabet":31,"./strings/starNames":32}],31:[function(require,module,exports){
module.exports=[
"alpha",   "beta",    "gamma",   "delta",
"epsilon", "zeta",    "eta",     "theta",
"iota",    "kappa",   "lambda",  "mu",
"nu",      "xi",      "omicron", "pi",	
"rho",     "sigma",   "tau",     "upsilon",
"phi",     "chi",     "psi",     "omega"
]
},{}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){

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

},{"./CoordHelper":33}],35:[function(require,module,exports){
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

},{"./CoordHelper":33,"./Direction":34,"spark-starter":127}],36:[function(require,module,exports){
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

},{"./TileReference":37,"spark-starter":127}],37:[function(require,module,exports){
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

},{}],38:[function(require,module,exports){
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

},{"spark-starter":127}],39:[function(require,module,exports){
module.exports = {
  CoordHelper: require('./CoordHelper'),
  Direction: require('./Direction'),
  Tile: require('./Tile'),
  TileContainer: require('./TileContainer'),
  TileReference: require('./TileReference'),
  Tiled: require('./Tiled')
}

},{"./CoordHelper":33,"./Direction":34,"./Tile":35,"./TileContainer":36,"./TileReference":37,"./Tiled":38}],40:[function(require,module,exports){
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

},{"_process":93,"spark-starter":127,"timers":128}],41:[function(require,module,exports){
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

},{"./SignalOperation":43,"spark-starter":127}],42:[function(require,module,exports){
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

},{"spark-starter":127}],43:[function(require,module,exports){
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

},{"spark-starter":127}],44:[function(require,module,exports){
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

},{"./Connected":41,"./Signal":42,"./SignalOperation":43}],45:[function(require,module,exports){
var Connected, Switch;

Connected = require('./Connected');

module.exports = Switch = class Switch extends Connected {};

},{"./Connected":41}],46:[function(require,module,exports){
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

},{"./Connected":41,"parallelio-tiles":39}],47:[function(require,module,exports){
module.exports = {
  "Connected": require("./Connected"),
  "Signal": require("./Signal"),
  "SignalOperation": require("./SignalOperation"),
  "SignalSource": require("./SignalSource"),
  "Switch": require("./Switch"),
  "Wire": require("./Wire"),
}
},{"./Connected":41,"./Signal":42,"./SignalOperation":43,"./SignalSource":44,"./Switch":45,"./Wire":46}],48:[function(require,module,exports){
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

},{"parallelio-tiles":39}],49:[function(require,module,exports){
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

},{"parallelio-timing":40,"spark-starter":127}],50:[function(require,module,exports){
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

},{"./Character":51,"./Door":56}],51:[function(require,module,exports){
const Tiled = require('parallelio-tiles').Tiled
const Damageable = require('./Damageable')
const WalkAction = require('./actions/WalkAction')
const ActionProvider = require('./actions/ActionProvider')

class Character extends Tiled {
  constructor (name) {
    super()
    this.name = name
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
    action.execute()
    return action
  }

  isSelectableBy (player) {
    return true
  }
};

Character.extend(Damageable)

Character.properties({
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

},{"./Damageable":55,"./actions/ActionProvider":79,"./actions/WalkAction":86,"parallelio-tiles":39}],52:[function(require,module,exports){
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
      action.execute()
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
      action.execute()
      return action
    }
  }
}

module.exports = CharacterAI

},{"./Door":56,"./VisionCalculator":77,"./actions/AttackMoveAction":81,"./actions/WalkAction":86,"parallelio-tiles":39,"spark-starter":127}],53:[function(require,module,exports){
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

},{"./Approach":49,"./Ship":71,"./View":76,"spark-starter":127}],54:[function(require,module,exports){
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

},{"./LineOfSight":62,"parallelio-tiles":39,"spark-starter":127}],55:[function(require,module,exports){
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

},{"spark-starter":127}],56:[function(require,module,exports){
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

},{"parallelio-tiles":39}],57:[function(require,module,exports){
module.exports = require('spark-starter').Element

},{"spark-starter":127}],58:[function(require,module,exports){
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

},{"./Confrontation":53,"spark-starter":127}],59:[function(require,module,exports){
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

},{"parallelio-tiles":39}],60:[function(require,module,exports){
const Element = require('spark-starter').Element
const Timing = require('parallelio-timing')
const View = require('./View')
const Player = require('./Player')

class Game extends Element {
  start () {
    return this.currentPlayer
  }

  add (elem) {
    elem.game = this
    return elem
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
  }
})

Game.prototype.defaultViewClass = View

Game.prototype.defaultPlayerClass = Player

module.exports = Game

},{"./Player":67,"./View":76,"parallelio-timing":40,"spark-starter":127}],61:[function(require,module,exports){
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

},{"spark-starter":127}],62:[function(require,module,exports){
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

},{}],63:[function(require,module,exports){
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

},{"spark-starter":127}],64:[function(require,module,exports){
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

},{"parallelio-tiles":39}],65:[function(require,module,exports){
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

},{"events":24,"parallelio-timing":40,"spark-starter":127}],66:[function(require,module,exports){
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

},{"./LineOfSight":62,"parallelio-timing":40,"spark-starter":127}],67:[function(require,module,exports){
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

},{"spark-starter":127}],68:[function(require,module,exports){
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

},{"parallelio-timing":40,"spark-starter":127}],69:[function(require,module,exports){
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

},{"spark-starter":127}],70:[function(require,module,exports){
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

},{"./Ressource":69,"spark-starter":127}],71:[function(require,module,exports){
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

},{"./ShipInterior":72,"./Travel":75,"./actions/ActionProvider":79,"./actions/TravelAction":85,"spark-starter":127}],72:[function(require,module,exports){
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

},{"./generators/ShipInteriorGenerator":89,"parallelio-tiles":39}],73:[function(require,module,exports){
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

},{"./Damageable":55,"./Projectile":68,"parallelio-tiles":39,"parallelio-timing":40}],74:[function(require,module,exports){
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

},{"spark-starter":127}],75:[function(require,module,exports){
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

},{"parallelio-timing":40,"spark-starter":127}],76:[function(require,module,exports){
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

},{"parallelio-grids":28,"spark-starter":127}],77:[function(require,module,exports){
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

},{"./LineOfSight":62,"parallelio-tiles":39}],78:[function(require,module,exports){
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

},{"events":24,"spark-starter":127}],79:[function(require,module,exports){
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

},{"spark-starter":127}],80:[function(require,module,exports){
const WalkAction = require('./WalkAction')
const TargetAction = require('./TargetAction')
const EventBind = require('spark-starter').EventBind
const PropertyWatcher = require('spark-starter').watchers.PropertyWatcher

class AttackAction extends TargetAction {
  validTarget () {
    return this.targetIsAttackable() && (this.canUseWeapon() || this.canWalkToTarget())
  }

  targetIsAttackable () {
    return this.target.damageable && this.target.health >= 0
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
        target: this.target,
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

},{"./TargetAction":83,"./WalkAction":86,"spark-starter":127}],81:[function(require,module,exports){
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
      this.attackAction.on('finished', () => {
        if (this.isReady()) {
          return this.start()
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
        return this.finished()
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

},{"../LineOfSight":62,"./AttackAction":80,"./TargetAction":83,"./WalkAction":86,"parallelio-pathfinder":29,"spark-starter":127}],82:[function(require,module,exports){
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

},{"./ActionProvider":79}],83:[function(require,module,exports){
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

},{"./Action":78}],84:[function(require,module,exports){
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

},{"./ActionProvider":79}],85:[function(require,module,exports){
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

},{"../Travel":75,"./TargetAction":83}],86:[function(require,module,exports){
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

},{"../PathWalk":65,"./TargetAction":83,"parallelio-pathfinder":29}],87:[function(require,module,exports){
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

},{"../Airlock":48,"../Floor":59,"parallelio-tiles":39,"spark-starter":127}],88:[function(require,module,exports){
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

},{"../Door":56,"parallelio-tiles":39,"spark-starter":127}],89:[function(require,module,exports){
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

},{"../AutomaticDoor":50,"../Floor":59,"./AirlockGenerator":87,"./RoomGenerator":88,"parallelio-tiles":39,"spark-starter":127}],90:[function(require,module,exports){
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

},{"../Map":63,"../StarSystem":74,"parallelio-strings":30,"spark-starter":127}],91:[function(require,module,exports){
module.exports = {
  Airlock: require('./Airlock'),
  Approach: require('./Approach'),
  AutomaticDoor: require('./AutomaticDoor'),
  Character: require('./Character'),
  CharacterAI: require('./CharacterAI'),
  Confrontation: require('./Confrontation'),
  DamagePropagation: require('./DamagePropagation'),
  Damageable: require('./Damageable'),
  Door: require('./Door'),
  Element: require('./Element'),
  EncounterManager: require('./EncounterManager'),
  Floor: require('./Floor'),
  Game: require('./Game'),
  Inventory: require('./Inventory'),
  LineOfSight: require('./LineOfSight'),
  Map: require('./Map'),
  Obstacle: require('./Obstacle'),
  PathWalk: require('./PathWalk'),
  PersonalWeapon: require('./PersonalWeapon'),
  Player: require('./Player'),
  Projectile: require('./Projectile'),
  Ressource: require('./Ressource'),
  RessourceType: require('./RessourceType'),
  Ship: require('./Ship'),
  ShipInterior: require('./ShipInterior'),
  ShipWeapon: require('./ShipWeapon'),
  StarSystem: require('./StarSystem'),
  Travel: require('./Travel'),
  View: require('./View'),
  VisionCalculator: require('./VisionCalculator'),
  generators: {
    AirlockGenerator: require('./generators/AirlockGenerator'),
    RoomGenerator: require('./generators/RoomGenerator'),
    ShipInteriorGenerator: require('./generators/ShipInteriorGenerator'),
    StarMapGenerator: require('./generators/StarMapGenerator')
  },
  actions: {
    Action: require('./actions/Action'),
    ActionProvider: require('./actions/ActionProvider'),
    AttackAction: require('./actions/AttackAction'),
    AttackMoveAction: require('./actions/AttackMoveAction'),
    SimpleActionProvider: require('./actions/SimpleActionProvider'),
    TargetAction: require('./actions/TargetAction'),
    TiledActionProvider: require('./actions/TiledActionProvider'),
    TravelAction: require('./actions/TravelAction'),
    WalkAction: require('./actions/WalkAction')
  }
}

},{"./Airlock":48,"./Approach":49,"./AutomaticDoor":50,"./Character":51,"./CharacterAI":52,"./Confrontation":53,"./DamagePropagation":54,"./Damageable":55,"./Door":56,"./Element":57,"./EncounterManager":58,"./Floor":59,"./Game":60,"./Inventory":61,"./LineOfSight":62,"./Map":63,"./Obstacle":64,"./PathWalk":65,"./PersonalWeapon":66,"./Player":67,"./Projectile":68,"./Ressource":69,"./RessourceType":70,"./Ship":71,"./ShipInterior":72,"./ShipWeapon":73,"./StarSystem":74,"./Travel":75,"./View":76,"./VisionCalculator":77,"./actions/Action":78,"./actions/ActionProvider":79,"./actions/AttackAction":80,"./actions/AttackMoveAction":81,"./actions/SimpleActionProvider":82,"./actions/TargetAction":83,"./actions/TiledActionProvider":84,"./actions/TravelAction":85,"./actions/WalkAction":86,"./generators/AirlockGenerator":87,"./generators/RoomGenerator":88,"./generators/ShipInteriorGenerator":89,"./generators/StarMapGenerator":90}],92:[function(require,module,exports){
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

},{"./libs":91,"parallelio-grids":28,"parallelio-pathfinder":29,"parallelio-strings":30,"parallelio-tiles":39,"parallelio-timing":40,"parallelio-wiring":47,"spark-starter":127}],93:[function(require,module,exports){
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

},{}],94:[function(require,module,exports){
module.exports = {
  Binder: require('./src/Binder'),
  EventBind: require('./src/EventBind'),
  Reference: require('./src/Reference')
}

},{"./src/Binder":95,"./src/EventBind":96,"./src/Reference":97}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){

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

},{"./Binder":95,"./Reference":97}],97:[function(require,module,exports){
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

},{}],98:[function(require,module,exports){
module.exports = require('./src/Collection')

},{"./src/Collection":99}],99:[function(require,module,exports){
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

},{}],100:[function(require,module,exports){
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

},{"./src/Invalidator":103,"./src/PropertiesManager":104,"./src/Property":105,"./src/getters/BaseGetter":106,"./src/getters/CalculatedGetter":107,"./src/getters/CompositeGetter":108,"./src/getters/InvalidatedGetter":109,"./src/getters/ManualGetter":110,"./src/getters/SimpleGetter":111,"./src/setters/BaseSetter":112,"./src/setters/BaseValueSetter":113,"./src/setters/CollectionSetter":114,"./src/setters/ManualSetter":115,"./src/setters/SimpleSetter":116,"./src/watchers/CollectionPropertyWatcher":117,"./src/watchers/PropertyWatcher":118}],101:[function(require,module,exports){
arguments[4][98][0].apply(exports,arguments)
},{"./src/Collection":102,"dup":98}],102:[function(require,module,exports){
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

},{}],103:[function(require,module,exports){
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

},{"spark-binding":94}],104:[function(require,module,exports){
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

},{"./Property":105}],105:[function(require,module,exports){
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

},{"./getters/CalculatedGetter":107,"./getters/CompositeGetter":108,"./getters/InvalidatedGetter":109,"./getters/ManualGetter":110,"./getters/SimpleGetter":111,"./setters/BaseValueSetter":113,"./setters/CollectionSetter":114,"./setters/ManualSetter":115,"./setters/SimpleSetter":116,"events":24}],106:[function(require,module,exports){

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

},{}],107:[function(require,module,exports){

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

},{"./BaseGetter":106}],108:[function(require,module,exports){
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

},{"../Invalidator":103,"./InvalidatedGetter":109,"spark-binding":94,"spark-collection":101}],109:[function(require,module,exports){
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

},{"../Invalidator":103,"./CalculatedGetter":107}],110:[function(require,module,exports){
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

},{"./BaseGetter":106}],111:[function(require,module,exports){
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

},{"./BaseGetter":106}],112:[function(require,module,exports){

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

},{"../watchers/PropertyWatcher":118}],113:[function(require,module,exports){
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

},{"./BaseSetter":112}],114:[function(require,module,exports){
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

},{"../watchers/CollectionPropertyWatcher":117,"./SimpleSetter":116,"spark-collection":101}],115:[function(require,module,exports){
const BaseSetter = require('./BaseSetter')

class ManualSetter extends BaseSetter {
  set (val) {
    this.prop.callOptionFunct('set', val)
  }
}

module.exports = ManualSetter

},{"./BaseSetter":112}],116:[function(require,module,exports){
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

},{"./BaseSetter":112}],117:[function(require,module,exports){

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

},{"./PropertyWatcher":118}],118:[function(require,module,exports){

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
    this.getProperty().events.on('invalidated', this.invalidateCallback)
    return this.getProperty().events.on('updated', this.updateCallback)
  }

  doUnbind () {
    this.getProperty().events.off('invalidated', this.invalidateCallback)
    return this.getProperty().events.off('updated', this.updateCallback)
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

},{"spark-binding":94}],119:[function(require,module,exports){
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



},{"./Mixable":123,"spark-properties":100}],120:[function(require,module,exports){
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



},{"spark-properties":100}],121:[function(require,module,exports){
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



},{"spark-properties":100}],122:[function(require,module,exports){
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



},{"./Overrider":124}],123:[function(require,module,exports){
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



},{}],124:[function(require,module,exports){
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



},{}],125:[function(require,module,exports){
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



},{"spark-binding":94}],126:[function(require,module,exports){
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
},{"./Element":119,"./Invalidated/ActivablePropertyWatcher":120,"./Invalidated/Invalidated":121,"./Loader":122,"./Mixable":123,"./Overrider":124,"./Updater":125}],127:[function(require,module,exports){
var libs;

libs = require('./libs');

module.exports = Object.assign({
  'Collection': require('spark-collection')
}, libs, require('spark-properties'), require('spark-binding'));



},{"./libs":126,"spark-binding":94,"spark-collection":98,"spark-properties":100}],128:[function(require,module,exports){
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

},{"process/browser.js":93,"timers":128}]},{},[23])(23)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvQXV0b21hdGljRG9vci5qcyIsImxpYi9DaGFyYWN0ZXIuanMiLCJsaWIvRGFtYWdlYWJsZS5qcyIsImxpYi9EaXNwbGF5LmpzIiwibGliL0RvbVVwZGF0ZXIuanMiLCJsaWIvRG9vci5qcyIsImxpYi9HYW1lLmpzIiwibGliL01hcC5qcyIsImxpYi9QbGF5ZXJDb250cm9sbGVyLmpzIiwibGliL1BsYXllclNlbGVjdGlvbkluZm8uanMiLCJsaWIvUHJvamVjdGlsZS5qcyIsImxpYi9TaGlwLmpzIiwibGliL1NoaXBJbnRlcmlvci5qcyIsImxpYi9TaGlwV2VhcG9uLmpzIiwibGliL1N0YXJNYXBHZW5lcmF0b3IuanMiLCJsaWIvU3RhclN5c3RlbS5qcyIsImxpYi9UaWxlLmpzIiwibGliL1RpbGVkLmpzIiwibGliL1VwZGF0ZXIuanMiLCJsaWIvVmlldy5qcyIsImxpYi9XaXJlLmpzIiwibGliL2xpYnMuanMiLCJsaWIvcGFyYWxsZWxpby1kb20uanMiLCJub2RlX21vZHVsZXMvZXZlbnRzL2V2ZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLWdyaWRzL2xpYi9HcmlkLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRDZWxsLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tZ3JpZHMvbGliL0dyaWRSb3cuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1ncmlkcy9saWIvZ3JpZHMuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1wYXRoZmluZGVyL2Rpc3QvcGF0aGZpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXN0cmluZ3Mvc3RyaW5ncy9ncmVla0FscGhhYmV0Lmpzb24iLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby1zdHJpbmdzL3N0cmluZ3Mvc3Rhck5hbWVzLmpzb24iLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvQ29vcmRIZWxwZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvRGlyZWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGUuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby10aWxlcy9saWIvVGlsZUNvbnRhaW5lci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXRpbGVzL2xpYi9UaWxlUmVmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL1RpbGVkLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGlsZXMvbGliL3RpbGVzLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8tdGltaW5nL2Rpc3QvdGltaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9Db25uZWN0ZWQuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL1NpZ25hbC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvU2lnbmFsT3BlcmF0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8td2lyaW5nL2xpYi9TaWduYWxTb3VyY2UuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby13aXJpbmcvbGliL1N3aXRjaC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvV2lyZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvLXdpcmluZy9saWIvd2lyaW5nLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0FpcmxvY2suanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvQXBwcm9hY2guanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvQXV0b21hdGljRG9vci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9DaGFyYWN0ZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvQ2hhcmFjdGVyQUkuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvQ29uZnJvbnRhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9EYW1hZ2VQcm9wYWdhdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9EYW1hZ2VhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0Rvb3IuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvRWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9FbmNvdW50ZXJNYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0Zsb29yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0dhbWUuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvSW52ZW50b3J5LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL0xpbmVPZlNpZ2h0LmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL01hcC5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9PYnN0YWNsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QYXRoV2Fsay5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QZXJzb25hbFdlYXBvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9QbGF5ZXIuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvUHJvamVjdGlsZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9SZXNzb3VyY2UuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvUmVzc291cmNlVHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9TaGlwLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1NoaXBJbnRlcmlvci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9TaGlwV2VhcG9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1N0YXJTeXN0ZW0uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvVHJhdmVsLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL1ZpZXcuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvVmlzaW9uQ2FsY3VsYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrQWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvQXR0YWNrTW92ZUFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1NpbXBsZUFjdGlvblByb3ZpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGFyZ2V0QWN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2FjdGlvbnMvVGlsZWRBY3Rpb25Qcm92aWRlci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1RyYXZlbEFjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9hY3Rpb25zL1dhbGtBY3Rpb24uanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvZ2VuZXJhdG9ycy9BaXJsb2NrR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL3BhcmFsbGVsaW8vbGliL2dlbmVyYXRvcnMvUm9vbUdlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9nZW5lcmF0b3JzL1NoaXBJbnRlcmlvckdlbmVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9nZW5lcmF0b3JzL1N0YXJNYXBHZW5lcmF0b3IuanMiLCJub2RlX21vZHVsZXMvcGFyYWxsZWxpby9saWIvbGlicy5qcyIsIm5vZGVfbW9kdWxlcy9wYXJhbGxlbGlvL2xpYi9wYXJhbGxlbGlvLmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1iaW5kaW5nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLWJpbmRpbmcvc3JjL0JpbmRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1iaW5kaW5nL3NyYy9FdmVudEJpbmQuanMiLCJub2RlX21vZHVsZXMvc3BhcmstYmluZGluZy9zcmMvUmVmZXJlbmNlLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLWNvbGxlY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3BhcmstY29sbGVjdGlvbi9zcmMvQ29sbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvbm9kZV9tb2R1bGVzL3NwYXJrLWNvbGxlY3Rpb24vc3JjL0NvbGxlY3Rpb24uanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvSW52YWxpZGF0b3IuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvUHJvcGVydGllc01hbmFnZXIuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvZ2V0dGVycy9CYXNlR2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvQ2FsY3VsYXRlZEdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9nZXR0ZXJzL0NvbXBvc2l0ZUdldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9nZXR0ZXJzL0ludmFsaWRhdGVkR2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvTWFudWFsR2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL2dldHRlcnMvU2ltcGxlR2V0dGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXByb3BlcnRpZXMvc3JjL3NldHRlcnMvQmFzZVNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy9zZXR0ZXJzL0NvbGxlY3Rpb25TZXR0ZXIuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvc2V0dGVycy9NYW51YWxTZXR0ZXIuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvc2V0dGVycy9TaW1wbGVTZXR0ZXIuanMiLCJub2RlX21vZHVsZXMvc3BhcmstcHJvcGVydGllcy9zcmMvd2F0Y2hlcnMvQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlci5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1wcm9wZXJ0aWVzL3NyYy93YXRjaGVycy9Qcm9wZXJ0eVdhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvRWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9JbnZhbGlkYXRlZC9BY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvTG9hZGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL01peGFibGUuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvT3ZlcnJpZGVyLmpzIiwibm9kZV9tb2R1bGVzL3NwYXJrLXN0YXJ0ZXIvbGliL1VwZGF0ZXIuanMiLCJub2RlX21vZHVsZXMvc3Bhcmstc3RhcnRlci9saWIvbGlicy5qcyIsIm5vZGVfbW9kdWxlcy9zcGFyay1zdGFydGVyL2xpYi9zcGFyay1zdGFydGVyLmpzIiwibm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwidmFyIEF1dG9tYXRpY0Rvb3IsIEJhc2VBdXRvbWF0aWNEb29yLCBEb29yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9Eb29yJyk7XG5cbkJhc2VBdXRvbWF0aWNEb29yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkF1dG9tYXRpY0Rvb3I7XG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b21hdGljRG9vciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgQXV0b21hdGljRG9vciBleHRlbmRzIEJhc2VBdXRvbWF0aWNEb29yIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ2Rvb3InO1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBBdXRvbWF0aWNEb29yLmV4dGVuZChEb29yKTtcblxuICByZXR1cm4gQXV0b21hdGljRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9BdXRvbWF0aWNEb29yLmpzLm1hcFxuIiwidmFyIEJhc2VDaGFyYWN0ZXIsIENoYXJhY3RlciwgRG9tVXBkYXRlciwgRWxlbWVudCwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgnLi9UaWxlZCcpO1xuXG5CYXNlQ2hhcmFjdGVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkNoYXJhY3RlcjtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDaGFyYWN0ZXIgZXh0ZW5kcyBCYXNlQ2hhcmFjdGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnY2hhcmFjdGVyJztcbiAgICB9XG5cbiAgfTtcblxuICBDaGFyYWN0ZXIuZXh0ZW5kKFRpbGVkKTtcblxuICBDaGFyYWN0ZXIucHJvcGVydGllcyh7XG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS50b2dnbGVDbGFzcygnc2VsZWN0ZWQnLCB0aGlzLnNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBDaGFyYWN0ZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvQ2hhcmFjdGVyLmpzLm1hcFxuIiwidmFyIEJhc2VEYW1hZ2VhYmxlLCBEYW1hZ2VhYmxlLCBEaXNwbGF5LCBEb21VcGRhdGVyO1xuXG5CYXNlRGFtYWdlYWJsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5EYW1hZ2VhYmxlO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBEYW1hZ2VhYmxlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEYW1hZ2VhYmxlIGV4dGVuZHMgQmFzZURhbWFnZWFibGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaGVhbHRoQ2xzKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgRGFtYWdlYWJsZS5leHRlbmQoRGlzcGxheSk7XG5cbiAgRGFtYWdlYWJsZS5wcm9wZXJ0aWVzKHtcbiAgICBoZWFsdGhDbHNTdGVwczoge1xuICAgICAgZGVmYXVsdDogMTBcbiAgICB9LFxuICAgIGhlYWx0aENsczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gJ2hlYWx0aC0nICsgKE1hdGguY2VpbChpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdoZWFsdGgnKSAvIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ21heEhlYWx0aCcpICogaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnaGVhbHRoQ2xzU3RlcHMnKSkpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3Mob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuaGVhbHRoQ2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYWRkQ2xhc3ModGhpcy5oZWFsdGhDbHMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBEYW1hZ2VhYmxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0RhbWFnZWFibGUuanMubWFwXG4iLCJ2YXIgRGlzcGxheSwgRG9tVXBkYXRlciwgRWxlbWVudDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5FbGVtZW50O1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gRGlzcGxheSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgRGlzcGxheSBleHRlbmRzIEVsZW1lbnQge1xuICAgIGluaXREaXNwbGF5KCkge31cblxuICAgIGRlc3Ryb3lEaXNwbGF5KCkge1xuICAgICAgaWYgKHRoaXMuZGlzcGxheVByb3BlcnR5LnZhbHVlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBEaXNwbGF5LnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hcHBlbmRUbyh0aGlzLmRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNsczoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5jbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmNscyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3BsYXksIG5ld0RpdjtcbiAgICAgICAgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZGlzcGxheSA9IGpRdWVyeShuZXdEaXYpLmFkZENsYXNzKHRoaXMuYmFzZUNscyk7XG4gICAgICAgIGRpc3BsYXkuZ2V0KDApLl9wYXJhbGxlbGlvX29iaiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5jc3Moe1xuICAgICAgICAgICAgbGVmdDogdGhpcy5kaXNwbGF5WFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5jc3Moe1xuICAgICAgICAgICAgdG9wOiB0aGlzLmRpc3BsYXlZXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRGlzcGxheTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9EaXNwbGF5LmpzLm1hcFxuIiwidmFyIERvbVVwZGF0ZXIsIFByb3BlcnR5V2F0Y2hlcjtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNwYXJrLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBEb21VcGRhdGVyID0gY2xhc3MgRG9tVXBkYXRlciBleHRlbmRzIFByb3BlcnR5V2F0Y2hlciB7XG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVEb21DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZURvbSgpO1xuICAgIH07XG4gICAgcmV0dXJuIHN1cGVyLmluaXQoKTtcbiAgfVxuXG4gIHJlcXVlc3RGcmFtZSgpIHtcbiAgICBpZiAoIXRoaXMuZnJhbWViaW5kZWQpIHtcbiAgICAgIHRoaXMuZnJhbWViaW5kZWQgPSB0cnVlO1xuICAgICAgcmV0dXJuIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVEb21DYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRDb250ZXh0KCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaW52YWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0RnJhbWUoKTtcbiAgfVxuXG4gIHVwZGF0ZURvbShvbGQpIHtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFsdWUgPSB0aGlzLmdldFByb3BlcnR5KCkuZ2V0KCk7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLm9sZCkge1xuICAgICAgdGhpcy5vbGQgPSB2YWx1ZTtcbiAgICAgIHRoaXMuaGFuZGxlQ2hhbmdlKHZhbHVlLCBvbGQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5mcmFtZWJpbmRlZCA9IGZhbHNlO1xuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvRG9tVXBkYXRlci5qcy5tYXBcbiIsInZhciBCYXNlRG9vciwgRG9tVXBkYXRlciwgRG9vciwgRWxlbWVudCwgVGlsZWQ7XG5cblRpbGVkID0gcmVxdWlyZSgnLi9UaWxlZCcpO1xuXG5CYXNlRG9vciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5Eb29yO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxubW9kdWxlLmV4cG9ydHMgPSBEb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBEb29yIGV4dGVuZHMgQmFzZURvb3Ige1xuICAgIGluaXQoKSB7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnZG9vcic7XG4gICAgICBzdXBlci5pbml0KCk7XG4gICAgICByZXR1cm4gdGhpcy5pbml0RGlzcGxheSgpO1xuICAgIH1cblxuICB9O1xuXG4gIERvb3IuZXh0ZW5kKFRpbGVkKTtcblxuICBEb29yLnByb3BlcnRpZXMoe1xuICAgIGRpcmVjdGlvbjoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmRpcmVjdGlvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgb3Blbjoge1xuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICB0aGlzLmRpc3BsYXkudG9nZ2xlQ2xhc3MoJ2Nsb3NlJywgIXRoaXMub3Blbik7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS50b2dnbGVDbGFzcygnb3BlbicsIHRoaXMub3Blbik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gRG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Eb29yLmpzLm1hcFxuIiwidmFyIEJhc2VHYW1lLCBHYW1lLCBQbGF5ZXJDb250cm9sbGVyLCBWaWV3O1xuXG5CYXNlR2FtZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5HYW1lO1xuXG5WaWV3ID0gcmVxdWlyZSgnLi9WaWV3Jyk7XG5cblBsYXllckNvbnRyb2xsZXIgPSByZXF1aXJlKCcuL1BsYXllckNvbnRyb2xsZXInKTtcblxuLy8gVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIEdhbWUgZXh0ZW5kcyBCYXNlR2FtZSB7fTtcblxuICBHYW1lLnByb3BlcnRpZXMoe1xuICAgIHRpbWluZzoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIHRpbWluZztcbiAgICAgICAgdGltaW5nID0gb3JpZ2luYWwoKTtcbiAgICAgICAgLy8gdGltaW5nLnVwZGF0ZXIgPSBVcGRhdGVyLmluc3RhbmNlXG4gICAgICAgIHJldHVybiB0aW1pbmc7XG4gICAgICB9XG4gICAgfSxcbiAgICBtYWluVUk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBkaXY7XG4gICAgICAgIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKFwidWlcIik7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgcmV0dXJuIGRpdjtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRWaWV3Q2xhc3MgPSBWaWV3O1xuXG4gIEdhbWUucHJvdG90eXBlLmRlZmF1bHRQbGF5ZXJDb250cm9sbGVyQ2xhc3MgPSBQbGF5ZXJDb250cm9sbGVyO1xuXG4gIHJldHVybiBHYW1lO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL0dhbWUuanMubWFwXG4iLCJ2YXIgQmFzZU1hcCwgTWFwO1xuXG5CYXNlTWFwID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLk1hcDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIE1hcCBleHRlbmRzIEJhc2VNYXAge1xuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKHRoaXMuZGlzcGxheUNvbnRhaW5lciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblZpZXcuY29udGVudERpc3BsYXk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZHJhd0JhY2tncm91bmQoY2FudmFzKSB7XG4gICAgICB2YXIgY29udGV4dDtcbiAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHJldHVybiB0aGlzLmxvY2F0aW9ucy5mb3JFYWNoKChsb2NhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGxvY2F0aW9uLmRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IGxvY2F0aW9uLmRyYXcodGhpcywgY29udGV4dCkgOiB2b2lkIDA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBNYXAucHJvcGVydGllcyh7XG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgZGVmYXVsdDogbnVsbCxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMubG9jYXRpb25zLmZvckVhY2goKGxvY2F0aW9uKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGxvY2F0aW9uLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmRpc3BsYXlDb250YWluZXI7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5Q29udGFpbmVyLmFwcGVuZCh0aGlzLmJhY2tncm91bmRDYW52YXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnYW1lOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKHZhbCwgb2xkKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFyTWFyZ2luOiB7XG4gICAgICBkZWZhdWx0OiAxMFxuICAgIH0sXG4gICAgYmFja2dyb3VuZENhbnZhczoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbnZhcztcbiAgICAgICAgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gdGhpcy5ib3VuZGFyaWVzLnJpZ2h0IC0gdGhpcy5ib3VuZGFyaWVzLmxlZnQgKyB0aGlzLnN0YXJNYXJnaW4gKiAyO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5ib3VuZGFyaWVzLmJvdHRvbSAtIHRoaXMuYm91bmRhcmllcy50b3AgKyB0aGlzLnN0YXJNYXJnaW4gKiAyO1xuICAgICAgICBjYW52YXMuY2xhc3NMaXN0LmFkZChcIm1hcEJhY2tncm91bmRcIik7XG4gICAgICAgIGNhbnZhcy5zdHlsZS50b3AgPSB0aGlzLmJvdW5kYXJpZXMudG9wIC0gdGhpcy5zdGFyTWFyZ2luICsgXCJweFwiO1xuICAgICAgICBjYW52YXMuc3R5bGUubGVmdCA9IHRoaXMuYm91bmRhcmllcy5sZWZ0IC0gdGhpcy5zdGFyTWFyZ2luICsgXCJweFwiO1xuICAgICAgICB0aGlzLmRyYXdCYWNrZ3JvdW5kKGNhbnZhcyk7XG4gICAgICAgIHJldHVybiBjYW52YXM7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gTWFwO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL01hcC5qcy5tYXBcbiIsInZhciBFbGVtZW50LCBQbGF5ZXJDb250cm9sbGVyO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxheWVyQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgUGxheWVyQ29udHJvbGxlciBleHRlbmRzIEVsZW1lbnQge1xuICAgIHNldERlZmF1bHRzKCkge1xuICAgICAgaWYgKCF0aGlzLmdhbWVEaXNwbGF5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdhbWVEaXNwbGF5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZvY3VzKGUpIHtcbiAgICAgIHJldHVybiB0aGlzLl9idWJibGVVcChlLnRhcmdldCwgKHRhcmdldCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY2FuRm9jdXNPbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuZm9jdXNlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2hlY2tUYXJnZXRPclNlbGVjdGFibGUoZSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2J1YmJsZVVwKGUudGFyZ2V0LCAodGFyZ2V0KSA9PiB7XG4gICAgICAgIHZhciBhY3Rpb247XG4gICAgICAgIGlmIChhY3Rpb24gPSB0aGlzLnBsYXllci5jYW5UYXJnZXRBY3Rpb25Pbih0YXJnZXQpKSB7XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0QWN0aW9uVGFyZ2V0KHRhcmdldCk7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wbGF5ZXIuY2FuU2VsZWN0KHRhcmdldCkpIHtcbiAgICAgICAgICB0aGlzLnBsYXllci5zZWxlY3RlZCA9IHRhcmdldDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2J1YmJsZVVwKHRhcmdldCwgc3RvcENhbGxiYWNrKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgd2hpbGUgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQgPSB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqICE9IG51bGwgPyB0YXJnZXQuX3BhcmFsbGVsaW9fb2JqIDogdGFyZ2V0LnBhcmVudE5vZGUgIT0gbnVsbCA/IHRhcmdldC5wYXJlbnROb2RlIDogc3RvcENhbGxiYWNrKHRhcmdldCkgPyBudWxsIDogdGFyZ2V0LnRpbGUgIT0gbnVsbCA/IHRhcmdldC50aWxlIDogKChyZWYgPSB0YXJnZXQuZGlzcGxheSkgIT0gbnVsbCA/IHJlZi5nZXQoMCkucGFyZW50Tm9kZSA6IHZvaWQgMCkgIT0gbnVsbCA/IHRhcmdldC5kaXNwbGF5LmdldCgwKS5wYXJlbnROb2RlIDogbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICB9O1xuXG4gIFBsYXllckNvbnRyb2xsZXIucHJvcGVydGllcyh7XG4gICAgcGxheWVyOiB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXREZWZhdWx0cygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBnYW1lRGlzcGxheToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZURpc3BsYXkpIHtcbiAgICAgICAgICAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdjbGljaycsIHRoaXMuY2FsbGJhY2soJ2NoZWNrVGFyZ2V0T3JTZWxlY3RhYmxlJykpO1xuICAgICAgICAgIHJldHVybiAkKHRoaXMuZ2FtZURpc3BsYXkpLm9uKCdtb3VzZW92ZXInLCB0aGlzLmNhbGxiYWNrKCdjaGVja0ZvY3VzJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gUGxheWVyQ29udHJvbGxlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9QbGF5ZXJDb250cm9sbGVyLmpzLm1hcFxuIiwidmFyIERpc3BsYXksIERvbVVwZGF0ZXIsIFBsYXllclNlbGVjdGlvbkluZm87XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBsYXllclNlbGVjdGlvbkluZm8gPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBsYXllclNlbGVjdGlvbkluZm8gZXh0ZW5kcyBEaXNwbGF5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgICB0aGlzLmJhc2VDbHMgPSAnc2VsZWN0aW9uSW5mbyc7XG4gICAgICB0aGlzLm5hbWU7XG4gICAgICB0aGlzLmdhbWU7XG4gICAgICB0aGlzLmFjdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0RGVmYXVsdHMoKSB7XG4gICAgICBpZiAoIXRoaXMuZGlzcGxheUNvbnRhaW5lciAmJiB0aGlzLmdhbWUubWFpblVJKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheUNvbnRhaW5lciA9IHRoaXMuZ2FtZS5tYWluVUk7XG4gICAgICB9XG4gICAgICBpZiAoIXRoaXMucGxheWVyICYmIHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllciA9IHRoaXMuZ2FtZS5jdXJyZW50UGxheWVyO1xuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBsYXllclNlbGVjdGlvbkluZm8ucHJvcGVydGllcyh7XG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3ZlcnJpZGVkKSB7XG4gICAgICAgIHZhciBkaXY7XG4gICAgICAgIGRpdiA9IG92ZXJyaWRlZCgpO1xuICAgICAgICBkaXYuaHRtbCgnPGRpdiBjbGFzcz1cIm5hbWVcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYWN0aW9uc1wiPjxzcGFuIGNsYXNzPVwidGl0bGVcIj5BY3Rpb25zIDo8L3NwYW4+PHVsPjwvdWw+PC9kaXY+Jyk7XG4gICAgICAgIHJldHVybiBkaXY7XG4gICAgICB9XG4gICAgfSxcbiAgICBwbGF5ZXI6IHtcbiAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICB9LFxuICAgIHNlbGVjdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuc2VsZWN0ZWRcIik7XG4gICAgICB9XG4gICAgfSxcbiAgICBuYW1lOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBzZWw7XG4gICAgICAgIHNlbCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5zZWxlY3Rpb25Qcm9wZXJ0eSk7XG4gICAgICAgIGlmIChzZWwgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHNlbC5uYW1lUHJvcGVydHkpIHx8IHNlbC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmZpbmQoXCIubmFtZVwiKS50ZXh0KHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBhY3Rpb25zOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoXCJwbGF5ZXIuYXZhaWxhYmxlQWN0aW9uc1wiKSB8fCBbXTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIHZhciBsaXN0O1xuICAgICAgICAgIGxpc3QgPSB0aGlzLmRpc3BsYXkuZmluZChcIi5hY3Rpb25zIHVsXCIpO1xuICAgICAgICAgIGxpc3QuZW1wdHkoKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICAgICAgdmFyIGRpc3BsYXksIG5hbWU7XG4gICAgICAgICAgICBuYW1lID0gYWN0aW9uLm5hbWUgfHwgYWN0aW9uLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgICAgICAgICBkaXNwbGF5ID0gJCgnPGxpPicgKyBuYW1lICsgJzwvbGk+Jyk7XG4gICAgICAgICAgICBkaXNwbGF5Lm9uKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXIuc2VsZWN0QWN0aW9uKGFjdGlvbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmFwcGVuZChkaXNwbGF5KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIGdhbWU6IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24odmFsLCBvbGQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNldERlZmF1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQbGF5ZXJTZWxlY3Rpb25JbmZvO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1BsYXllclNlbGVjdGlvbkluZm8uanMubWFwXG4iLCJ2YXIgQmFzZVByb2plY3RpbGUsIERpc3BsYXksIFByb2plY3RpbGUsIFVwZGF0ZXI7XG5cbkJhc2VQcm9qZWN0aWxlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlByb2plY3RpbGU7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuVXBkYXRlciA9IHJlcXVpcmUoJy4vVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2plY3RpbGUgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFByb2plY3RpbGUgZXh0ZW5kcyBCYXNlUHJvamVjdGlsZSB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdwcm9qZWN0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmluaXREaXNwbGF5KCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmRlc3Ryb3lEaXNwbGF5KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgUHJvamVjdGlsZS5leHRlbmQoRGlzcGxheSk7XG5cbiAgUHJvamVjdGlsZS5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciBjb250YWluZXI7XG4gICAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2NvbnRhaW5lcicpO1xuICAgICAgICBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ3RpbGVEaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZURpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdkaXNwbGF5JykgOiB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnZGlzcGxheScsIGNvbnRhaW5lcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ29yaWdpblRpbGUnKS5kaXNwbGF5Q29udGFpbmVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9yaWdpblRpbGUudGlsZVRvRGlzcGxheVgoaW52YWxpZGF0ZS5wcm9wQnlOYW1lKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5vcmlnaW5UaWxlLnRpbGVUb0Rpc3BsYXlZKGludmFsaWRhdGUucHJvcEJ5TmFtZSgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBQcm9qZWN0aWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1Byb2plY3RpbGUuanMubWFwXG4iLCJ2YXIgQmFzZVNoaXAsIERpc3BsYXksIERvbVVwZGF0ZXIsIFNoaXA7XG5cbkJhc2VTaGlwID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXA7XG5cbkRpc3BsYXkgPSByZXF1aXJlKCcuL0Rpc3BsYXknKTtcblxuRG9tVXBkYXRlciA9IHJlcXVpcmUoJy4vRG9tVXBkYXRlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXAgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFNoaXAgZXh0ZW5kcyBCYXNlU2hpcCB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICdzaGlwJztcbiAgICAgIHJldHVybiBzdXBlci5pbml0KCk7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcC5leHRlbmQoRGlzcGxheSk7XG5cbiAgU2hpcC5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnbG9jYXRpb24uZGlzcGxheUNvbnRhaW5lcicpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi54Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ2xvY2F0aW9uLnknKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG9yYml0aW5nOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0cmF2ZWwnKSA9PT0gbnVsbDtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmICh0aGlzLm9yYml0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKFwib3JiaXRpbmdcIik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkucmVtb3ZlQ2xhc3MoXCJvcmJpdGluZ1wiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gU2hpcDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TaGlwLmpzLm1hcFxuIiwidmFyIERlZmF1bHRHZW5lcmF0b3IsIERvb3IsIFNoaXBJbnRlcmlvciwgVGlsZSwgVGlsZUNvbnRhaW5lcjtcblxuVGlsZSA9IHJlcXVpcmUoJy4vVGlsZScpO1xuXG5UaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLnRpbGVzLlRpbGVDb250YWluZXI7XG5cbkRlZmF1bHRHZW5lcmF0b3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuZ2VuZXJhdG9ycy5Sb29tR2VuZXJhdG9yO1xuXG5Eb29yID0gcmVxdWlyZSgnLi9BdXRvbWF0aWNEb29yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcEludGVyaW9yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwSW50ZXJpb3IgZXh0ZW5kcyBUaWxlQ29udGFpbmVyIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLmRpc3BsYXlDb250YWluZXIgPSB0aGlzLmdhbWUubWFpblZpZXcuY29udGVudERpc3BsYXk7XG4gICAgICB9XG4gICAgICBpZiAoISh0aGlzLnRpbGVzLmxlbmd0aCA+IDApKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmdhbWUubWFpblRpbGVDb250YWluZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID0gdGhpcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZShnZW5lcmF0b3IpIHtcbiAgICAgIGdlbmVyYXRvciA9IGdlbmVyYXRvciB8fCAobmV3IFNoaXBJbnRlcmlvci5HZW5lcmF0b3IoKSkudGFwKGZ1bmN0aW9uKCkge30pO1xuICAgICAgcmV0dXJuIGdlbmVyYXRvci5nZXRUaWxlcygpLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRkVGlsZSh0aWxlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICB9O1xuXG4gIFNoaXBJbnRlcmlvci5wcm9wZXJ0aWVzKHtcbiAgICBjb250YWluZXI6IHt9LFxuICAgIGRpc3BsYXlDb250YWluZXI6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIGNvbnRhaW5lcjtcbiAgICAgICAgY29udGFpbmVyID0gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnY29udGFpbmVyJyk7XG4gICAgICAgIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnY29udGVudERpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuY29udGVudERpc3BsYXk7XG4gICAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyICE9IG51bGwgPyBjb250YWluZXIucHJvcGVydGllc01hbmFnZXIuZ2V0UHJvcGVydHkoJ2Rpc3BsYXknKSA6IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiBjb250YWluZXIuZGlzcGxheTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLmRpc3BsYXlDb250YWluZXIgIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkuYXBwZW5kVG8odGhpcy5kaXNwbGF5Q29udGFpbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIGRpc3BsYXkgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmFkZENsYXNzKCdzaGlwJyk7XG4gICAgICAgIGRpc3BsYXkuZ2V0KDApLl9wYXJhbGxlbGlvX29iaiA9IHRoaXM7XG4gICAgICAgIHJldHVybiBkaXNwbGF5O1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2FtZToge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbih2YWwsIG9sZCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNoaXBJbnRlcmlvcjtcblxufSkuY2FsbCh0aGlzKTtcblxuU2hpcEludGVyaW9yLkdlbmVyYXRvciA9IGNsYXNzIEdlbmVyYXRvciBleHRlbmRzIERlZmF1bHRHZW5lcmF0b3Ige1xuICB3YWxsRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gKG5ldyBUaWxlKG9wdC54LCBvcHQueSkpLnRhcChmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuY2xzID0gJ3dhbGwnO1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa2FibGUgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZsb29yRmFjdG9yeShvcHQpIHtcbiAgICByZXR1cm4gbmV3IFRpbGUuRmxvb3Iob3B0LngsIG9wdC55KTtcbiAgfVxuXG4gIGRvb3JGYWN0b3J5KG9wdCkge1xuICAgIHJldHVybiAobmV3IFRpbGUuRmxvb3Iob3B0LngsIG9wdC55KSkudGFwKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWRkQ2hpbGQobmV3IERvb3Ioe1xuICAgICAgICBkaXJlY3Rpb246IG9wdC5kaXJlY3Rpb25cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBJbnRlcmlvci5qcy5tYXBcbiIsInZhciBCYXNlV2VhcG9uLCBEYW1hZ2VhYmxlLCBEb21VcGRhdGVyLCBQcm9qZWN0aWxlLCBTaGlwV2VhcG9uLCBUaWxlZDtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cblByb2plY3RpbGUgPSByZXF1aXJlKCcuL1Byb2plY3RpbGUnKTtcblxuRGFtYWdlYWJsZSA9IHJlcXVpcmUoJy4vRGFtYWdlYWJsZScpO1xuXG5CYXNlV2VhcG9uID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlNoaXBXZWFwb247XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwV2VhcG9uID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaGlwV2VhcG9uIGV4dGVuZHMgQmFzZVdlYXBvbiB7XG4gICAgY29uc3RydWN0b3IoZGlyZWN0aW9uKSB7XG4gICAgICBzdXBlcihkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dlYXBvbic7XG4gICAgfVxuXG4gIH07XG5cbiAgU2hpcFdlYXBvbi5leHRlbmQoVGlsZWQpO1xuXG4gIFNoaXBXZWFwb24uZXh0ZW5kKERhbWFnZWFibGUpO1xuXG4gIFNoaXBXZWFwb24ucHJvcGVydGllcyh7XG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5LnJlbW92ZUNsYXNzKG9sZC5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uLm5hbWUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5hZGRDbGFzcyh0aGlzLmRpcmVjdGlvbi5uYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBwcm9qZWN0aWxlQ2xhc3M6IHtcbiAgICAgIGRlZmF1bHQ6IFByb2plY3RpbGVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBTaGlwV2VhcG9uO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1NoaXBXZWFwb24uanMubWFwXG4iLCJ2YXIgQmFzZVN0YXJNYXBHZW5lcmF0b3IsIE1hcCwgU3Rhck1hcEdlbmVyYXRvciwgU3RhclN5c3RlbTtcblxuQmFzZVN0YXJNYXBHZW5lcmF0b3IgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykuZ2VuZXJhdG9ycy5TdGFyTWFwR2VuZXJhdG9yO1xuXG5NYXAgPSByZXF1aXJlKCcuL01hcCcpO1xuXG5TdGFyU3lzdGVtID0gcmVxdWlyZSgnLi9TdGFyU3lzdGVtJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3Rhck1hcEdlbmVyYXRvciA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3Rhck1hcEdlbmVyYXRvciBleHRlbmRzIEJhc2VTdGFyTWFwR2VuZXJhdG9yIHt9O1xuXG4gIFN0YXJNYXBHZW5lcmF0b3IucHJvdG90eXBlLmRlZk9wdCA9IE9iamVjdC5hc3NpZ24oe30sIEJhc2VTdGFyTWFwR2VuZXJhdG9yLnByb3RvdHlwZS5kZWZPcHQsIHtcbiAgICBtYXBDbGFzczogTWFwLFxuICAgIHN0YXJDbGFzczogU3RhclN5c3RlbSxcbiAgICBsaW5rQ2xhc3M6IFN0YXJTeXN0ZW0uTGlua1xuICB9KTtcblxuICByZXR1cm4gU3Rhck1hcEdlbmVyYXRvcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9TdGFyTWFwR2VuZXJhdG9yLmpzLm1hcFxuIiwidmFyIEJhc2VTdGFyU3lzdGVtLCBEaXNwbGF5LCBTdGFyU3lzdGVtO1xuXG5CYXNlU3RhclN5c3RlbSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TdGFyU3lzdGVtO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3RhclN5c3RlbSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgU3RhclN5c3RlbSBleHRlbmRzIEJhc2VTdGFyU3lzdGVtIHtcbiAgICBpbml0KCkge1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3N0YXInO1xuICAgICAgcmV0dXJuIHN1cGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICBkcmF3KG1hcCwgY29udGV4dCkge1xuICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIGNvbnRleHQubGluZVdpZHRoID0gMS41O1xuICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzMzNlwiO1xuICAgICAgY29udGV4dC5hcmModGhpcy54IC0gbWFwLmJvdW5kYXJpZXMubGVmdCArIG1hcC5zdGFyTWFyZ2luLCB0aGlzLnkgLSBtYXAuYm91bmRhcmllcy50b3AgKyBtYXAuc3Rhck1hcmdpbiwgbWFwLnN0YXJNYXJnaW4sIDAsIDIgKiBNYXRoLlBJKTtcbiAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICByZXR1cm4gdGhpcy5saW5rcy5mb3JFYWNoKChsaW5rKSA9PiB7XG4gICAgICAgIGlmIChsaW5rLnN0YXIxID09PSB0aGlzKSB7XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBsaW5rLmRyYXcgPT09IFwiZnVuY3Rpb25cIiA/IGxpbmsuZHJhdyhtYXAsIGNvbnRleHQpIDogdm9pZCAwO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgfTtcblxuICBTdGFyU3lzdGVtLmV4dGVuZChEaXNwbGF5KTtcblxuICBTdGFyU3lzdGVtLnByb3BlcnRpZXMoe1xuICAgIGRpc3BsYXlYOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd4Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgneScpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFN0YXJTeXN0ZW07XG5cbn0pLmNhbGwodGhpcyk7XG5cblN0YXJTeXN0ZW0uTGluayA9IGNsYXNzIExpbmsgZXh0ZW5kcyBCYXNlU3RhclN5c3RlbS5MaW5rIHtcbiAgZHJhdyhtYXAsIGNvbnRleHQpIHtcbiAgICB2YXIgZGlzdCwgeDEsIHgyLCB4RGlzdCwgeTEsIHkyLCB5RGlzdDtcbiAgICB4RGlzdCA9IHRoaXMuc3RhcjIueCAtIHRoaXMuc3RhcjEueDtcbiAgICB5RGlzdCA9IHRoaXMuc3RhcjIueSAtIHRoaXMuc3RhcjEueTtcbiAgICBkaXN0ID0gTWF0aC5zcXJ0KCh4RGlzdCAqIHhEaXN0KSArICh5RGlzdCAqIHlEaXN0KSk7XG4gICAgeDEgPSB0aGlzLnN0YXIxLnggKyBtYXAuc3Rhck1hcmdpbiAqIHhEaXN0IC8gZGlzdCAtIG1hcC5ib3VuZGFyaWVzLmxlZnQgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICB5MSA9IHRoaXMuc3RhcjEueSArIG1hcC5zdGFyTWFyZ2luICogeURpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMudG9wICsgbWFwLnN0YXJNYXJnaW47XG4gICAgeDIgPSB0aGlzLnN0YXIyLnggLSBtYXAuc3Rhck1hcmdpbiAqIHhEaXN0IC8gZGlzdCAtIG1hcC5ib3VuZGFyaWVzLmxlZnQgKyBtYXAuc3Rhck1hcmdpbjtcbiAgICB5MiA9IHRoaXMuc3RhcjIueSAtIG1hcC5zdGFyTWFyZ2luICogeURpc3QgLyBkaXN0IC0gbWFwLmJvdW5kYXJpZXMudG9wICsgbWFwLnN0YXJNYXJnaW47XG4gICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICBjb250ZXh0LmxpbmVXaWR0aCA9IDE7XG4gICAgY29udGV4dC5zdHJva2VTdHlsZSA9IFwiIzMzNlwiO1xuICAgIGNvbnRleHQubW92ZVRvKHgxLCB5MSk7XG4gICAgY29udGV4dC5saW5lVG8oeDIsIHkyKTtcbiAgICByZXR1cm4gY29udGV4dC5zdHJva2UoKTtcbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1N0YXJTeXN0ZW0uanMubWFwXG4iLCJ2YXIgQmFzZUZsb29yLCBCYXNlVGlsZSwgRGlzcGxheSwgVGlsZTtcblxuQmFzZVRpbGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvJykudGlsZXMuVGlsZTtcblxuQmFzZUZsb29yID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLkZsb29yO1xuXG5EaXNwbGF5ID0gcmVxdWlyZSgnLi9EaXNwbGF5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGlsZSBleHRlbmRzIEJhc2VUaWxlIHtcbiAgICBpbml0KCkge1xuICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3RpbGUnO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WCh4KSB7XG4gICAgICByZXR1cm4geCAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgICB0aWxlVG9EaXNwbGF5WSh5KSB7XG4gICAgICByZXR1cm4geSAqIFRpbGUuc2l6ZTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlLmV4dGVuZChEaXNwbGF5KTtcblxuICBUaWxlLnNpemUgPSAyMDtcblxuICBUaWxlLnByb3BlcnRpZXMoe1xuICAgIGNvbnRhaW5lcjoge30sXG4gICAgZGlzcGxheUNvbnRhaW5lcjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgICBjb250YWluZXIgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCdjb250YWluZXInKTtcbiAgICAgICAgaWYgKGNvbnRhaW5lciAhPSBudWxsID8gY29udGFpbmVyLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCd0aWxlRGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ3RpbGVEaXNwbGF5JywgY29udGFpbmVyKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgIT0gbnVsbCA/IGNvbnRhaW5lci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnZGlzcGxheScpIDogdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2Rpc3BsYXknLCBjb250YWluZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkaXNwbGF5WDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdGhpcy50aWxlVG9EaXNwbGF5WChpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd4JykpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZVRvRGlzcGxheVkoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgneScpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBUaWxlO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5UaWxlLkZsb29yID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBGbG9vciBleHRlbmRzIEJhc2VGbG9vciB7XG4gICAgaW5pdCgpIHtcbiAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgIHRoaXMuYmFzZUNscyA9ICd0aWxlJztcbiAgICAgIHJldHVybiB0aGlzLmNscyA9ICdmbG9vcic7XG4gICAgfVxuXG4gIH07XG5cbiAgRmxvb3IuZXh0ZW5kKFRpbGUpO1xuXG4gIHJldHVybiBGbG9vcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9UaWxlLmpzLm1hcFxuIiwidmFyIEJhc2VUaWxlZCwgRGlzcGxheSwgVGlsZWQ7XG5cbkJhc2VUaWxlZCA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS50aWxlcy5UaWxlZDtcblxuRGlzcGxheSA9IHJlcXVpcmUoJy4vRGlzcGxheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaWxlZCBleHRlbmRzIERpc3BsYXkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdERpc3BsYXkoKTtcbiAgICB9XG5cbiAgfTtcblxuICBUaWxlZC5wcm9wZXJ0aWVzKHtcbiAgICBkaXNwbGF5Q29udGFpbmVyOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciB0aWxlO1xuICAgICAgICB0aWxlID0gaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgndGlsZScpO1xuICAgICAgICBpZiAodGlsZSAhPSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BCeU5hbWUoJ2Rpc3BsYXlDb250YWluZXInLCB0aWxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIHRpbGUgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0aWxlJyk7XG4gICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS5kaXNwbGF5WCArIHRpbGUudGlsZVRvRGlzcGxheVgoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnb2Zmc2V0WCcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheVk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHRpbGU7XG4gICAgICAgIHRpbGUgPSBpbnZhbGlkYXRvci5wcm9wQnlOYW1lKCd0aWxlJyk7XG4gICAgICAgIGlmICh0aWxlICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS5kaXNwbGF5WSArIHRpbGUudGlsZVRvRGlzcGxheVkoaW52YWxpZGF0b3IucHJvcEJ5TmFtZSgnb2Zmc2V0WScpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1RpbGVkLmpzLm1hcFxuIiwidmFyIEJhc2VVcGRhdGVyLCBVcGRhdGVyO1xuXG5CYXNlVXBkYXRlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKS5TcGFyay5VcGRhdGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIGV4dGVuZHMgQmFzZVVwZGF0ZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMudXBkYXRlQ2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgICB9O1xuICAgIHRoaXMuYmluZGVkID0gZmFsc2U7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgc3VwZXIudXBkYXRlKCk7XG4gICAgdGhpcy5iaW5kZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5jYWxsYmFja3MubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRoaXMucmVxdWVzdEZyYW1lKCk7XG4gICAgfVxuICB9XG5cbiAgcmVxdWVzdEZyYW1lKCkge1xuICAgIGlmICghdGhpcy5iaW5kZWQpIHtcbiAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy51cGRhdGVDYWxsYmFjayk7XG4gICAgICByZXR1cm4gdGhpcy5iaW5kZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFkZENhbGxiYWNrKGNhbGxiYWNrKSB7XG4gICAgc3VwZXIuYWRkQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3RGcmFtZSgpO1xuICB9XG5cbn07XG5cblVwZGF0ZXIuaW5zdGFuY2UgPSBuZXcgVXBkYXRlcigpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL1VwZGF0ZXIuanMubWFwXG4iLCJ2YXIgQmFzZVZpZXcsIERpc3BsYXksIERvbVVwZGF0ZXIsIFZpZXc7XG5cbkJhc2VWaWV3ID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLlZpZXc7XG5cbkRvbVVwZGF0ZXIgPSByZXF1aXJlKCcuL0RvbVVwZGF0ZXInKTtcblxuRGlzcGxheSA9IHJlcXVpcmUoJy4vRGlzcGxheScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFZpZXcgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFZpZXcgZXh0ZW5kcyBCYXNlVmlldyB7XG4gICAgY29uc3RydWN0b3IoZGlzcGxheSA9IG51bGwpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICBpZiAoZGlzcGxheSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICB9XG4gICAgICB0aGlzLmhvdmVyZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMua2V5c0ludGVydmFsID0ge307XG4gICAgICB0aGlzLmJhc2VDbHMgPSAndmlldyc7XG4gICAgICB0aGlzLmJvdW5kc1N0eWxlcztcbiAgICB9XG5cbiAgICBzZXREZWZhdWx0cygpIHtcbiAgICAgIHN1cGVyLnNldERlZmF1bHRzKCk7XG4gICAgICBpZiAodGhpcy5kaXNwbGF5Q29udGFpbmVyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheUNvbnRhaW5lciA9ICQoJ2JvZHknKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtb3VzZUVudGVyKCkge1xuICAgICAgdGhpcy5ob3ZlcmVkID0gdHJ1ZTtcbiAgICAgICQoJ2JvZHknKS5rZXlkb3duKHRoaXMuY2FsbGJhY2soJ2tleURvd24nKSk7XG4gICAgICByZXR1cm4gJCgnYm9keScpLmtleXVwKHRoaXMuY2FsbGJhY2soJ2tleVVwJykpO1xuICAgIH1cblxuICAgIG1vdXNlTGVhdmUoKSB7XG4gICAgICB2YXIgY29kZSwgaW50ZXJ2YWwsIHJlZiwgcmVzdWx0cztcbiAgICAgIHRoaXMuaG92ZXJlZCA9IGZhbHNlO1xuICAgICAgJCgnYm9keScpLm9mZigna2V5ZG93bicsIHRoaXMuY2FsbGJhY2soJ2tleURvd24nKSk7XG4gICAgICAkKCdib2R5Jykub2ZmKCdrZXl1cCcsIHRoaXMuY2FsbGJhY2soJ2tleVVwJykpO1xuICAgICAgcmVmID0gdGhpcy5rZXlzSW50ZXJ2YWw7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGNvZGUgaW4gcmVmKSB7XG4gICAgICAgIGludGVydmFsID0gcmVmW2NvZGVdO1xuICAgICAgICByZXN1bHRzLnB1c2goY2xlYXJJbnRlcnZhbChpbnRlcnZhbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfVxuXG4gICAga2V5RG93bihlKSB7XG4gICAgICB2YXIga2V5O1xuICAgICAgaWYgKFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXSAhPSBudWxsKSB7XG4gICAgICAgIGtleSA9IFZpZXcuZGlyZWN0aW9ua2V5c1tlLndoaWNoXTtcbiAgICAgICAgaWYgKHRoaXMua2V5c0ludGVydmFsW2tleS5uYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0gPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy54ICs9IGtleS54ICogMjtcbiAgICAgICAgICByZXR1cm4gdGhpcy55ICs9IGtleS55ICogMjtcbiAgICAgICAgfSwgMTApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGtleVVwKGUpIHtcbiAgICAgIHZhciBrZXk7XG4gICAgICBpZiAoVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdICE9IG51bGwpIHtcbiAgICAgICAga2V5ID0gVmlldy5kaXJlY3Rpb25rZXlzW2Uud2hpY2hdO1xuICAgICAgICBpZiAodGhpcy5rZXlzSW50ZXJ2YWxba2V5Lm5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gY2xlYXJJbnRlcnZhbCh0aGlzLmtleXNJbnRlcnZhbFtrZXkubmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzcGxheVBvcygpIHtcbiAgICAgIHJldHVybiAkKCcudmlld0NvbnRlbnQnLCB0aGlzLmRpc3BsYXkpLmNzcyh7XG4gICAgICAgIGxlZnQ6IHRoaXMueCArICdweCcsXG4gICAgICAgIHRvcDogdGhpcy55ICsgJ3B4J1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29udGFpbnNQb2ludCh4LCB5KSB7XG4gICAgICB2YXIgY29udGFpbmVyO1xuICAgICAgY29udGFpbmVyID0gdGhpcy5kaXNwbGF5WzBdO1xuICAgICAgd2hpbGUgKGNvbnRhaW5lcikge1xuICAgICAgICB4IC09IGNvbnRhaW5lci5vZmZzZXRMZWZ0O1xuICAgICAgICB5IC09IGNvbnRhaW5lci5vZmZzZXRUb3A7XG4gICAgICAgIGNvbnRhaW5lciA9IGNvbnRhaW5lci5vZmZzZXRQYXJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gKDAgPD0geCAmJiB4IDw9IHRoaXMuZGlzcGxheS53aWR0aCgpKSAmJiAoMCA8PSB5ICYmIHkgPD0gdGhpcy5kaXNwbGF5LmhlaWdodCgpKTtcbiAgICB9XG5cbiAgfTtcblxuICBWaWV3LmV4dGVuZChEaXNwbGF5KTtcblxuICBWaWV3LmRpcmVjdGlvbmtleXMgPSB7XG4gICAgMzg6IHtcbiAgICAgIG5hbWU6ICd0b3AnLFxuICAgICAgeDogMCxcbiAgICAgIHk6IDFcbiAgICB9LFxuICAgIDM5OiB7XG4gICAgICBuYW1lOiAncmlnaHQnLFxuICAgICAgeDogLTEsXG4gICAgICB5OiAwXG4gICAgfSxcbiAgICA0MDoge1xuICAgICAgbmFtZTogJ2JvdHRvbScsXG4gICAgICB4OiAwLFxuICAgICAgeTogLTFcbiAgICB9LFxuICAgIDM3OiB7XG4gICAgICBuYW1lOiAnbGVmdCcsXG4gICAgICB4OiAxLFxuICAgICAgeTogMFxuICAgIH1cbiAgfTtcblxuICBWaWV3LnByb3BlcnRpZXMoe1xuICAgIHg6IHtcbiAgICAgIGRlZmF1bHQ6IDAsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVEaXNwbGF5UG9zKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICB5OiB7XG4gICAgICBkZWZhdWx0OiAwLFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGlzcGxheVBvcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGxheToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvciwgb3JpZ2luYWwpIHtcbiAgICAgICAgdmFyIGRpc3BsYXk7XG4gICAgICAgIGRpc3BsYXkgPSBvcmlnaW5hbCgpO1xuICAgICAgICBpZiAoJCgnLnZpZXdDb250ZW50JywgZGlzcGxheSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgJChkaXNwbGF5KS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJ2aWV3Q29udGVudFwiPjwvZGl2PicpO1xuICAgICAgICB9XG4gICAgICAgICQoZGlzcGxheSkubW91c2VlbnRlcih0aGlzLmNhbGxiYWNrKCdtb3VzZUVudGVyJykpO1xuICAgICAgICByZXR1cm4gJChkaXNwbGF5KS5tb3VzZWxlYXZlKHRoaXMuY2FsbGJhY2soJ21vdXNlTGVhdmUnKSk7XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlRGlzcGxheVBvcygpO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGVudERpc3BsYXk6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAkKCcudmlld0NvbnRlbnQnLCB0aGlzLmRpc3BsYXkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYm91bmRzU3R5bGVzOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdG9wOiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLnRvcCcpICogMTAwICsgJyUnLFxuICAgICAgICAgIGxlZnQ6IGludmFsaWRhdG9yLnByb3BQYXRoKCdib3VuZHMubGVmdCcpICogMTAwICsgJyUnLFxuICAgICAgICAgIGJvdHRvbTogKDEgLSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLmJvdHRvbScpKSAqIDEwMCArICclJyxcbiAgICAgICAgICByaWdodDogKDEgLSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnYm91bmRzLnJpZ2h0JykpICogMTAwICsgJyUnXG4gICAgICAgIH07XG4gICAgICB9LFxuICAgICAgY2hhbmdlOiBuZXcgRG9tVXBkYXRlcih7XG4gICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbihvbGQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmNzcyh0aGlzLmJvdW5kc1N0eWxlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVmlldztcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9WaWV3LmpzLm1hcFxuIiwidmFyIEJhc2VXaXJlLCBEb21VcGRhdGVyLCBUaWxlZCwgV2lyZTtcblxuVGlsZWQgPSByZXF1aXJlKCcuL1RpbGVkJyk7XG5cbkJhc2VXaXJlID0gcmVxdWlyZSgncGFyYWxsZWxpbycpLndpcmluZy5XaXJlO1xuXG5Eb21VcGRhdGVyID0gcmVxdWlyZSgnLi9Eb21VcGRhdGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2lyZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgV2lyZSBleHRlbmRzIEJhc2VXaXJlIHtcbiAgICBjb25zdHJ1Y3Rvcih3aXJlVHlwZSkge1xuICAgICAgc3VwZXIod2lyZVR5cGUpO1xuICAgICAgdGhpcy5iYXNlQ2xzID0gJ3dpcmUnO1xuICAgICAgdGhpcy5jb25uZWN0ZWREaXJlY3Rpb25zO1xuICAgIH1cblxuICAgIGdldENsYXNzRnJvbURpcmVjdGlvbihkKSB7XG4gICAgICByZXR1cm4gJ2Nvbm4nICsgZC5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgZC5uYW1lLnNsaWNlKDEpO1xuICAgIH1cblxuICB9O1xuXG4gIFdpcmUuZXh0ZW5kKFRpbGVkKTtcblxuICBXaXJlLnByb3BlcnRpZXMoe1xuICAgIGNvbm5lY3RlZERpcmVjdGlvbnM6IHtcbiAgICAgIGNoYW5nZTogbmV3IERvbVVwZGF0ZXIoe1xuICAgICAgICBjYWxsYmFjazogZnVuY3Rpb24ob2xkKSB7XG4gICAgICAgICAgaWYgKG9sZCkge1xuICAgICAgICAgICAgb2xkLmZvckVhY2goKGQpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyh0aGlzLmdldENsYXNzRnJvbURpcmVjdGlvbihkKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdGVkRGlyZWN0aW9ucy5mb3JFYWNoKChkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMuZ2V0Q2xhc3NGcm9tRGlyZWN0aW9uKGQpKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHdpcmVUeXBlOiB7XG4gICAgICBjaGFuZ2U6IG5ldyBEb21VcGRhdGVyKHtcbiAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKG9sZCkge1xuICAgICAgICAgIGlmIChvbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheS5yZW1vdmVDbGFzcyhvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5LmFkZENsYXNzKHRoaXMud2lyZVR5cGUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFdpcmU7XG5cbn0pLmNhbGwodGhpcyk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvV2lyZS5qcy5tYXBcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkF1dG9tYXRpY0Rvb3JcIjogcmVxdWlyZShcIi4vQXV0b21hdGljRG9vclwiKSxcbiAgXCJDaGFyYWN0ZXJcIjogcmVxdWlyZShcIi4vQ2hhcmFjdGVyXCIpLFxuICBcIkRhbWFnZWFibGVcIjogcmVxdWlyZShcIi4vRGFtYWdlYWJsZVwiKSxcbiAgXCJEaXNwbGF5XCI6IHJlcXVpcmUoXCIuL0Rpc3BsYXlcIiksXG4gIFwiRG9tVXBkYXRlclwiOiByZXF1aXJlKFwiLi9Eb21VcGRhdGVyXCIpLFxuICBcIkRvb3JcIjogcmVxdWlyZShcIi4vRG9vclwiKSxcbiAgXCJHYW1lXCI6IHJlcXVpcmUoXCIuL0dhbWVcIiksXG4gIFwiTWFwXCI6IHJlcXVpcmUoXCIuL01hcFwiKSxcbiAgXCJQbGF5ZXJDb250cm9sbGVyXCI6IHJlcXVpcmUoXCIuL1BsYXllckNvbnRyb2xsZXJcIiksXG4gIFwiUGxheWVyU2VsZWN0aW9uSW5mb1wiOiByZXF1aXJlKFwiLi9QbGF5ZXJTZWxlY3Rpb25JbmZvXCIpLFxuICBcIlByb2plY3RpbGVcIjogcmVxdWlyZShcIi4vUHJvamVjdGlsZVwiKSxcbiAgXCJTaGlwXCI6IHJlcXVpcmUoXCIuL1NoaXBcIiksXG4gIFwiU2hpcEludGVyaW9yXCI6IHJlcXVpcmUoXCIuL1NoaXBJbnRlcmlvclwiKSxcbiAgXCJTaGlwV2VhcG9uXCI6IHJlcXVpcmUoXCIuL1NoaXBXZWFwb25cIiksXG4gIFwiU3Rhck1hcEdlbmVyYXRvclwiOiByZXF1aXJlKFwiLi9TdGFyTWFwR2VuZXJhdG9yXCIpLFxuICBcIlN0YXJTeXN0ZW1cIjogcmVxdWlyZShcIi4vU3RhclN5c3RlbVwiKSxcbiAgXCJUaWxlXCI6IHJlcXVpcmUoXCIuL1RpbGVcIiksXG4gIFwiVGlsZWRcIjogcmVxdWlyZShcIi4vVGlsZWRcIiksXG4gIFwiVXBkYXRlclwiOiByZXF1aXJlKFwiLi9VcGRhdGVyXCIpLFxuICBcIlZpZXdcIjogcmVxdWlyZShcIi4vVmlld1wiKSxcbiAgXCJXaXJlXCI6IHJlcXVpcmUoXCIuL1dpcmVcIiksXG59IiwidmFyIFBhcmFsbGVsaW8sIGxpYnM7XG5cbmxpYnMgPSByZXF1aXJlKCcuL2xpYnMnKTtcblxuUGFyYWxsZWxpbyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduKHt9LCBQYXJhbGxlbGlvLCB7XG4gIERPTTogbGlic1xufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvcGFyYWxsZWxpby1kb20uanMubWFwXG4iLCIvLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgb2JqZWN0Q3JlYXRlUG9seWZpbGxcbnZhciBvYmplY3RLZXlzID0gT2JqZWN0LmtleXMgfHwgb2JqZWN0S2V5c1BvbHlmaWxsXG52YXIgYmluZCA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGZ1bmN0aW9uQmluZFBvbHlmaWxsXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLCAnX2V2ZW50cycpKSB7XG4gICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgfVxuXG4gIHRoaXMuX21heExpc3RlbmVycyA9IHRoaXMuX21heExpc3RlbmVycyB8fCB1bmRlZmluZWQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuLy8gQmFja3dhcmRzLWNvbXBhdCB3aXRoIG5vZGUgMC4xMC54XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9tYXhMaXN0ZW5lcnMgPSB1bmRlZmluZWQ7XG5cbi8vIEJ5IGRlZmF1bHQgRXZlbnRFbWl0dGVycyB3aWxsIHByaW50IGEgd2FybmluZyBpZiBtb3JlIHRoYW4gMTAgbGlzdGVuZXJzIGFyZVxuLy8gYWRkZWQgdG8gaXQuIFRoaXMgaXMgYSB1c2VmdWwgZGVmYXVsdCB3aGljaCBoZWxwcyBmaW5kaW5nIG1lbW9yeSBsZWFrcy5cbnZhciBkZWZhdWx0TWF4TGlzdGVuZXJzID0gMTA7XG5cbnZhciBoYXNEZWZpbmVQcm9wZXJ0eTtcbnRyeSB7XG4gIHZhciBvID0ge307XG4gIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAneCcsIHsgdmFsdWU6IDAgfSk7XG4gIGhhc0RlZmluZVByb3BlcnR5ID0gby54ID09PSAwO1xufSBjYXRjaCAoZXJyKSB7IGhhc0RlZmluZVByb3BlcnR5ID0gZmFsc2UgfVxuaWYgKGhhc0RlZmluZVByb3BlcnR5KSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudEVtaXR0ZXIsICdkZWZhdWx0TWF4TGlzdGVuZXJzJywge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbihhcmcpIHtcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIGlucHV0IGlzIGEgcG9zaXRpdmUgbnVtYmVyICh3aG9zZSB2YWx1ZSBpcyB6ZXJvIG9yXG4gICAgICAvLyBncmVhdGVyIGFuZCBub3QgYSBOYU4pLlxuICAgICAgaWYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInIHx8IGFyZyA8IDAgfHwgYXJnICE9PSBhcmcpXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZGVmYXVsdE1heExpc3RlbmVyc1wiIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgICAgIGRlZmF1bHRNYXhMaXN0ZW5lcnMgPSBhcmc7XG4gICAgfVxuICB9KTtcbn0gZWxzZSB7XG4gIEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzID0gZGVmYXVsdE1heExpc3RlbmVycztcbn1cblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKG4pIHtcbiAgaWYgKHR5cGVvZiBuICE9PSAnbnVtYmVyJyB8fCBuIDwgMCB8fCBpc05hTihuKSlcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcIm5cIiBhcmd1bWVudCBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuZnVuY3Rpb24gJGdldE1heExpc3RlbmVycyh0aGF0KSB7XG4gIGlmICh0aGF0Ll9tYXhMaXN0ZW5lcnMgPT09IHVuZGVmaW5lZClcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gIHJldHVybiB0aGF0Ll9tYXhMaXN0ZW5lcnM7XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZ2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gZ2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gJGdldE1heExpc3RlbmVycyh0aGlzKTtcbn07XG5cbi8vIFRoZXNlIHN0YW5kYWxvbmUgZW1pdCogZnVuY3Rpb25zIGFyZSB1c2VkIHRvIG9wdGltaXplIGNhbGxpbmcgb2YgZXZlbnRcbi8vIGhhbmRsZXJzIGZvciBmYXN0IGNhc2VzIGJlY2F1c2UgZW1pdCgpIGl0c2VsZiBvZnRlbiBoYXMgYSB2YXJpYWJsZSBudW1iZXIgb2Zcbi8vIGFyZ3VtZW50cyBhbmQgY2FuIGJlIGRlb3B0aW1pemVkIGJlY2F1c2Ugb2YgdGhhdC4gVGhlc2UgZnVuY3Rpb25zIGFsd2F5cyBoYXZlXG4vLyB0aGUgc2FtZSBudW1iZXIgb2YgYXJndW1lbnRzIGFuZCB0aHVzIGRvIG5vdCBnZXQgZGVvcHRpbWl6ZWQsIHNvIHRoZSBjb2RlXG4vLyBpbnNpZGUgdGhlbSBjYW4gZXhlY3V0ZSBmYXN0ZXIuXG5mdW5jdGlvbiBlbWl0Tm9uZShoYW5kbGVyLCBpc0ZuLCBzZWxmKSB7XG4gIGlmIChpc0ZuKVxuICAgIGhhbmRsZXIuY2FsbChzZWxmKTtcbiAgZWxzZSB7XG4gICAgdmFyIGxlbiA9IGhhbmRsZXIubGVuZ3RoO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBhcnJheUNsb25lKGhhbmRsZXIsIGxlbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSlcbiAgICAgIGxpc3RlbmVyc1tpXS5jYWxsKHNlbGYpO1xuICB9XG59XG5mdW5jdGlvbiBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSk7XG4gIH1cbn1cbmZ1bmN0aW9uIGVtaXRUd28oaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJnMSwgYXJnMikge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmNhbGwoc2VsZiwgYXJnMSwgYXJnMik7XG4gIGVsc2Uge1xuICAgIHZhciBsZW4gPSBoYW5kbGVyLmxlbmd0aDtcbiAgICB2YXIgbGlzdGVuZXJzID0gYXJyYXlDbG9uZShoYW5kbGVyLCBsZW4pO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpXG4gICAgICBsaXN0ZW5lcnNbaV0uY2FsbChzZWxmLCBhcmcxLCBhcmcyKTtcbiAgfVxufVxuZnVuY3Rpb24gZW1pdFRocmVlKGhhbmRsZXIsIGlzRm4sIHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgaWYgKGlzRm4pXG4gICAgaGFuZGxlci5jYWxsKHNlbGYsIGFyZzEsIGFyZzIsIGFyZzMpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmNhbGwoc2VsZiwgYXJnMSwgYXJnMiwgYXJnMyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgc2VsZiwgYXJncykge1xuICBpZiAoaXNGbilcbiAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICBlbHNlIHtcbiAgICB2YXIgbGVuID0gaGFuZGxlci5sZW5ndGg7XG4gICAgdmFyIGxpc3RlbmVycyA9IGFycmF5Q2xvbmUoaGFuZGxlciwgbGVuKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICB9XG59XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQodHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgZXZlbnRzO1xuICB2YXIgZG9FcnJvciA9ICh0eXBlID09PSAnZXJyb3InKTtcblxuICBldmVudHMgPSB0aGlzLl9ldmVudHM7XG4gIGlmIChldmVudHMpXG4gICAgZG9FcnJvciA9IChkb0Vycm9yICYmIGV2ZW50cy5lcnJvciA9PSBudWxsKTtcbiAgZWxzZSBpZiAoIWRvRXJyb3IpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKGRvRXJyb3IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICBlciA9IGFyZ3VtZW50c1sxXTtcbiAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuaGFuZGxlZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgZXJyLmNvbnRleHQgPSBlcjtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGFuZGxlciA9IGV2ZW50c1t0eXBlXTtcblxuICBpZiAoIWhhbmRsZXIpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBpc0ZuID0gdHlwZW9mIGhhbmRsZXIgPT09ICdmdW5jdGlvbic7XG4gIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gIHN3aXRjaCAobGVuKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgY2FzZSAxOlxuICAgICAgZW1pdE5vbmUoaGFuZGxlciwgaXNGbiwgdGhpcyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDI6XG4gICAgICBlbWl0T25lKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM6XG4gICAgICBlbWl0VHdvKGhhbmRsZXIsIGlzRm4sIHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgNDpcbiAgICAgIGVtaXRUaHJlZShoYW5kbGVyLCBpc0ZuLCB0aGlzLCBhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdKTtcbiAgICAgIGJyZWFrO1xuICAgICAgLy8gc2xvd2VyXG4gICAgZGVmYXVsdDpcbiAgICAgIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0gMSk7XG4gICAgICBmb3IgKGkgPSAxOyBpIDwgbGVuOyBpKyspXG4gICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgZW1pdE1hbnkoaGFuZGxlciwgaXNGbiwgdGhpcywgYXJncyk7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbmZ1bmN0aW9uIF9hZGRMaXN0ZW5lcih0YXJnZXQsIHR5cGUsIGxpc3RlbmVyLCBwcmVwZW5kKSB7XG4gIHZhciBtO1xuICB2YXIgZXZlbnRzO1xuICB2YXIgZXhpc3Rpbmc7XG5cbiAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG4gIGlmICghZXZlbnRzKSB7XG4gICAgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgdGFyZ2V0Ll9ldmVudHNDb3VudCA9IDA7XG4gIH0gZWxzZSB7XG4gICAgLy8gVG8gYXZvaWQgcmVjdXJzaW9uIGluIHRoZSBjYXNlIHRoYXQgdHlwZSA9PT0gXCJuZXdMaXN0ZW5lclwiISBCZWZvcmVcbiAgICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gICAgaWYgKGV2ZW50cy5uZXdMaXN0ZW5lcikge1xuICAgICAgdGFyZ2V0LmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA/IGxpc3RlbmVyLmxpc3RlbmVyIDogbGlzdGVuZXIpO1xuXG4gICAgICAvLyBSZS1hc3NpZ24gYGV2ZW50c2AgYmVjYXVzZSBhIG5ld0xpc3RlbmVyIGhhbmRsZXIgY291bGQgaGF2ZSBjYXVzZWQgdGhlXG4gICAgICAvLyB0aGlzLl9ldmVudHMgdG8gYmUgYXNzaWduZWQgdG8gYSBuZXcgb2JqZWN0XG4gICAgICBldmVudHMgPSB0YXJnZXQuX2V2ZW50cztcbiAgICB9XG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV07XG4gIH1cblxuICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgZXhpc3RpbmcgPSBldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgICArK3RhcmdldC5fZXZlbnRzQ291bnQ7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBleGlzdGluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgICBleGlzdGluZyA9IGV2ZW50c1t0eXBlXSA9XG4gICAgICAgICAgcHJlcGVuZCA/IFtsaXN0ZW5lciwgZXhpc3RpbmddIDogW2V4aXN0aW5nLCBsaXN0ZW5lcl07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgZ290IGFuIGFycmF5LCBqdXN0IGFwcGVuZC5cbiAgICAgIGlmIChwcmVwZW5kKSB7XG4gICAgICAgIGV4aXN0aW5nLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXhpc3RpbmcucHVzaChsaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGxpc3RlbmVyIGxlYWtcbiAgICBpZiAoIWV4aXN0aW5nLndhcm5lZCkge1xuICAgICAgbSA9ICRnZXRNYXhMaXN0ZW5lcnModGFyZ2V0KTtcbiAgICAgIGlmIChtICYmIG0gPiAwICYmIGV4aXN0aW5nLmxlbmd0aCA+IG0pIHtcbiAgICAgICAgZXhpc3Rpbmcud2FybmVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHcgPSBuZXcgRXJyb3IoJ1Bvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJyArXG4gICAgICAgICAgICBleGlzdGluZy5sZW5ndGggKyAnIFwiJyArIFN0cmluZyh0eXBlKSArICdcIiBsaXN0ZW5lcnMgJyArXG4gICAgICAgICAgICAnYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvICcgK1xuICAgICAgICAgICAgJ2luY3JlYXNlIGxpbWl0LicpO1xuICAgICAgICB3Lm5hbWUgPSAnTWF4TGlzdGVuZXJzRXhjZWVkZWRXYXJuaW5nJztcbiAgICAgICAgdy5lbWl0dGVyID0gdGFyZ2V0O1xuICAgICAgICB3LnR5cGUgPSB0eXBlO1xuICAgICAgICB3LmNvdW50ID0gZXhpc3RpbmcubGVuZ3RoO1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgPT09ICdvYmplY3QnICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybignJXM6ICVzJywgdy5uYW1lLCB3Lm1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn1cblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHJldHVybiBfYWRkTGlzdGVuZXIodGhpcywgdHlwZSwgbGlzdGVuZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyO1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnByZXBlbmRMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICByZXR1cm4gX2FkZExpc3RlbmVyKHRoaXMsIHR5cGUsIGxpc3RlbmVyLCB0cnVlKTtcbiAgICB9O1xuXG5mdW5jdGlvbiBvbmNlV3JhcHBlcigpIHtcbiAgaWYgKCF0aGlzLmZpcmVkKSB7XG4gICAgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIodGhpcy50eXBlLCB0aGlzLndyYXBGbik7XG4gICAgdGhpcy5maXJlZCA9IHRydWU7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQpO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0LCBhcmd1bWVudHNbMF0pO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gdGhpcy5saXN0ZW5lci5jYWxsKHRoaXMudGFyZ2V0LCBhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSk7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiB0aGlzLmxpc3RlbmVyLmNhbGwodGhpcy50YXJnZXQsIGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLFxuICAgICAgICAgICAgYXJndW1lbnRzWzJdKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpXG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgdGhpcy5saXN0ZW5lci5hcHBseSh0aGlzLnRhcmdldCwgYXJncyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9vbmNlV3JhcCh0YXJnZXQsIHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBzdGF0ZSA9IHsgZmlyZWQ6IGZhbHNlLCB3cmFwRm46IHVuZGVmaW5lZCwgdGFyZ2V0OiB0YXJnZXQsIHR5cGU6IHR5cGUsIGxpc3RlbmVyOiBsaXN0ZW5lciB9O1xuICB2YXIgd3JhcHBlZCA9IGJpbmQuY2FsbChvbmNlV3JhcHBlciwgc3RhdGUpO1xuICB3cmFwcGVkLmxpc3RlbmVyID0gbGlzdGVuZXI7XG4gIHN0YXRlLndyYXBGbiA9IHdyYXBwZWQ7XG4gIHJldHVybiB3cmFwcGVkO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICh0eXBlb2YgbGlzdGVuZXIgIT09ICdmdW5jdGlvbicpXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB0aGlzLm9uKHR5cGUsIF9vbmNlV3JhcCh0aGlzLCB0eXBlLCBsaXN0ZW5lcikpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucHJlcGVuZE9uY2VMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcHJlcGVuZE9uY2VMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0ZW5lclwiIGFyZ3VtZW50IG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICAgICAgdGhpcy5wcmVwZW5kTGlzdGVuZXIodHlwZSwgX29uY2VXcmFwKHRoaXMsIHR5cGUsIGxpc3RlbmVyKSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4vLyBFbWl0cyBhICdyZW1vdmVMaXN0ZW5lcicgZXZlbnQgaWYgYW5kIG9ubHkgaWYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG4gICAgZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgIHZhciBsaXN0LCBldmVudHMsIHBvc2l0aW9uLCBpLCBvcmlnaW5hbExpc3RlbmVyO1xuXG4gICAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKVxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RlbmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgbGlzdCA9IGV2ZW50c1t0eXBlXTtcbiAgICAgIGlmICghbGlzdClcbiAgICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICAgIGlmIChsaXN0ID09PSBsaXN0ZW5lciB8fCBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoLS10aGlzLl9ldmVudHNDb3VudCA9PT0gMClcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgICAgaWYgKGV2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0Lmxpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbGlzdCAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBwb3NpdGlvbiA9IC0xO1xuXG4gICAgICAgIGZvciAoaSA9IGxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHwgbGlzdFtpXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIG9yaWdpbmFsTGlzdGVuZXIgPSBsaXN0W2ldLmxpc3RlbmVyO1xuICAgICAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uIDwgMClcbiAgICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgICBpZiAocG9zaXRpb24gPT09IDApXG4gICAgICAgICAgbGlzdC5zaGlmdCgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgc3BsaWNlT25lKGxpc3QsIHBvc2l0aW9uKTtcblxuICAgICAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpXG4gICAgICAgICAgZXZlbnRzW3R5cGVdID0gbGlzdFswXTtcblxuICAgICAgICBpZiAoZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBvcmlnaW5hbExpc3RlbmVyIHx8IGxpc3RlbmVyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuICAgIGZ1bmN0aW9uIHJlbW92ZUFsbExpc3RlbmVycyh0eXBlKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzLCBldmVudHMsIGk7XG5cbiAgICAgIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcbiAgICAgIGlmICghZXZlbnRzKVxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgICAgLy8gbm90IGxpc3RlbmluZyBmb3IgcmVtb3ZlTGlzdGVuZXIsIG5vIG5lZWQgdG8gZW1pdFxuICAgICAgaWYgKCFldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzQ291bnQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50c1t0eXBlXSkge1xuICAgICAgICAgIGlmICgtLXRoaXMuX2V2ZW50c0NvdW50ID09PSAwKVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRzID0gb2JqZWN0Q3JlYXRlKG51bGwpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbdHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGVtaXQgcmVtb3ZlTGlzdGVuZXIgZm9yIGFsbCBsaXN0ZW5lcnMgb24gYWxsIGV2ZW50c1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFyIGtleXMgPSBvYmplY3RLZXlzKGV2ZW50cyk7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUFsbExpc3RlbmVycyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgICAgICB0aGlzLl9ldmVudHMgPSBvYmplY3RDcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2V2ZW50c0NvdW50ID0gMDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIGxpc3RlbmVycyA9IGV2ZW50c1t0eXBlXTtcblxuICAgICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnMpO1xuICAgICAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAgICAgLy8gTElGTyBvcmRlclxuICAgICAgICBmb3IgKGkgPSBsaXN0ZW5lcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuZnVuY3Rpb24gX2xpc3RlbmVycyh0YXJnZXQsIHR5cGUsIHVud3JhcCkge1xuICB2YXIgZXZlbnRzID0gdGFyZ2V0Ll9ldmVudHM7XG5cbiAgaWYgKCFldmVudHMpXG4gICAgcmV0dXJuIFtdO1xuXG4gIHZhciBldmxpc3RlbmVyID0gZXZlbnRzW3R5cGVdO1xuICBpZiAoIWV2bGlzdGVuZXIpXG4gICAgcmV0dXJuIFtdO1xuXG4gIGlmICh0eXBlb2YgZXZsaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJylcbiAgICByZXR1cm4gdW53cmFwID8gW2V2bGlzdGVuZXIubGlzdGVuZXIgfHwgZXZsaXN0ZW5lcl0gOiBbZXZsaXN0ZW5lcl07XG5cbiAgcmV0dXJuIHVud3JhcCA/IHVud3JhcExpc3RlbmVycyhldmxpc3RlbmVyKSA6IGFycmF5Q2xvbmUoZXZsaXN0ZW5lciwgZXZsaXN0ZW5lci5sZW5ndGgpO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIGxpc3RlbmVycyh0eXBlKSB7XG4gIHJldHVybiBfbGlzdGVuZXJzKHRoaXMsIHR5cGUsIHRydWUpO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yYXdMaXN0ZW5lcnMgPSBmdW5jdGlvbiByYXdMaXN0ZW5lcnModHlwZSkge1xuICByZXR1cm4gX2xpc3RlbmVycyh0aGlzLCB0eXBlLCBmYWxzZSk7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgaWYgKHR5cGVvZiBlbWl0dGVyLmxpc3RlbmVyQ291bnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBsaXN0ZW5lckNvdW50LmNhbGwoZW1pdHRlciwgdHlwZSk7XG4gIH1cbn07XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJDb3VudCA9IGxpc3RlbmVyQ291bnQ7XG5mdW5jdGlvbiBsaXN0ZW5lckNvdW50KHR5cGUpIHtcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cztcblxuICBpZiAoZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSBldmVudHNbdHlwZV07XG5cbiAgICBpZiAodHlwZW9mIGV2bGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH0gZWxzZSBpZiAoZXZsaXN0ZW5lcikge1xuICAgICAgcmV0dXJuIGV2bGlzdGVuZXIubGVuZ3RoO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwO1xufVxuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmV2ZW50TmFtZXMgPSBmdW5jdGlvbiBldmVudE5hbWVzKCkge1xuICByZXR1cm4gdGhpcy5fZXZlbnRzQ291bnQgPiAwID8gUmVmbGVjdC5vd25LZXlzKHRoaXMuX2V2ZW50cykgOiBbXTtcbn07XG5cbi8vIEFib3V0IDEuNXggZmFzdGVyIHRoYW4gdGhlIHR3by1hcmcgdmVyc2lvbiBvZiBBcnJheSNzcGxpY2UoKS5cbmZ1bmN0aW9uIHNwbGljZU9uZShsaXN0LCBpbmRleCkge1xuICBmb3IgKHZhciBpID0gaW5kZXgsIGsgPSBpICsgMSwgbiA9IGxpc3QubGVuZ3RoOyBrIDwgbjsgaSArPSAxLCBrICs9IDEpXG4gICAgbGlzdFtpXSA9IGxpc3Rba107XG4gIGxpc3QucG9wKCk7XG59XG5cbmZ1bmN0aW9uIGFycmF5Q2xvbmUoYXJyLCBuKSB7XG4gIHZhciBjb3B5ID0gbmV3IEFycmF5KG4pO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IG47ICsraSlcbiAgICBjb3B5W2ldID0gYXJyW2ldO1xuICByZXR1cm4gY29weTtcbn1cblxuZnVuY3Rpb24gdW53cmFwTGlzdGVuZXJzKGFycikge1xuICB2YXIgcmV0ID0gbmV3IEFycmF5KGFyci5sZW5ndGgpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJldC5sZW5ndGg7ICsraSkge1xuICAgIHJldFtpXSA9IGFycltpXS5saXN0ZW5lciB8fCBhcnJbaV07XG4gIH1cbiAgcmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gb2JqZWN0Q3JlYXRlUG9seWZpbGwocHJvdG8pIHtcbiAgdmFyIEYgPSBmdW5jdGlvbigpIHt9O1xuICBGLnByb3RvdHlwZSA9IHByb3RvO1xuICByZXR1cm4gbmV3IEY7XG59XG5mdW5jdGlvbiBvYmplY3RLZXlzUG9seWZpbGwob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGsgaW4gb2JqKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaykpIHtcbiAgICBrZXlzLnB1c2goayk7XG4gIH1cbiAgcmV0dXJuIGs7XG59XG5mdW5jdGlvbiBmdW5jdGlvbkJpbmRQb2x5ZmlsbChjb250ZXh0KSB7XG4gIHZhciBmbiA9IHRoaXM7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4iLCJ2YXIgRWxlbWVudCwgR3JpZCwgR3JpZENlbGwsIEdyaWRSb3c7XG5cbkVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudDtcblxuR3JpZENlbGwgPSByZXF1aXJlKCcuL0dyaWRDZWxsJyk7XG5cbkdyaWRSb3cgPSByZXF1aXJlKCcuL0dyaWRSb3cnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgYWRkQ2VsbChjZWxsID0gbnVsbCkge1xuICAgICAgdmFyIHJvdywgc3BvdDtcbiAgICAgIGlmICghY2VsbCkge1xuICAgICAgICBjZWxsID0gbmV3IEdyaWRDZWxsKCk7XG4gICAgICB9XG4gICAgICBzcG90ID0gdGhpcy5nZXRGcmVlU3BvdCgpO1xuICAgICAgcm93ID0gdGhpcy5yb3dzLmdldChzcG90LnJvdyk7XG4gICAgICBpZiAoIXJvdykge1xuICAgICAgICByb3cgPSB0aGlzLmFkZFJvdygpO1xuICAgICAgfVxuICAgICAgcm93LmFkZENlbGwoY2VsbCk7XG4gICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG5cbiAgICBhZGRSb3cocm93ID0gbnVsbCkge1xuICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgcm93ID0gbmV3IEdyaWRSb3coKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucm93cy5wdXNoKHJvdyk7XG4gICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAgIGdldEZyZWVTcG90KCkge1xuICAgICAgdmFyIHNwb3Q7XG4gICAgICBzcG90ID0gbnVsbDtcbiAgICAgIHRoaXMucm93cy5zb21lKChyb3cpID0+IHtcbiAgICAgICAgaWYgKHJvdy5jZWxscy5sZW5ndGggPCB0aGlzLm1heENvbHVtbnMpIHtcbiAgICAgICAgICByZXR1cm4gc3BvdCA9IHtcbiAgICAgICAgICAgIHJvdzogcm93LnJvd1Bvc2l0aW9uLFxuICAgICAgICAgICAgY29sdW1uOiByb3cuY2VsbHMubGVuZ3RoXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoIXNwb3QpIHtcbiAgICAgICAgaWYgKHRoaXMubWF4Q29sdW1ucyA+IHRoaXMucm93cy5sZW5ndGgpIHtcbiAgICAgICAgICBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiB0aGlzLnJvd3MubGVuZ3RoLFxuICAgICAgICAgICAgY29sdW1uOiAwXG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzcG90ID0ge1xuICAgICAgICAgICAgcm93OiAwLFxuICAgICAgICAgICAgY29sdW1uOiB0aGlzLm1heENvbHVtbnMgKyAxXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNwb3Q7XG4gICAgfVxuXG4gIH07XG5cbiAgR3JpZC5wcm9wZXJ0aWVzKHtcbiAgICByb3dzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgICAgaXRlbUFkZGVkOiBmdW5jdGlvbihyb3cpIHtcbiAgICAgICAgcmV0dXJuIHJvdy5ncmlkID0gdGhpcztcbiAgICAgIH0sXG4gICAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24ocm93KSB7XG4gICAgICAgIGlmIChyb3cuZ3JpZCA9PT0gdGhpcykge1xuICAgICAgICAgIHJldHVybiByb3cuZ3JpZCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG1heENvbHVtbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgdmFyIHJvd3M7XG4gICAgICAgIHJvd3MgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMucm93c1Byb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIHJvd3MucmVkdWNlKGZ1bmN0aW9uKG1heCwgcm93KSB7XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1heCwgaW52YWxpZGF0b3IucHJvcChyb3cuY2VsbHNQcm9wZXJ0eSkubGVuZ3RoKTtcbiAgICAgICAgfSwgMCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gR3JpZDtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBFbGVtZW50LCBHcmlkQ2VsbDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEdyaWRDZWxsID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkQ2VsbCBleHRlbmRzIEVsZW1lbnQge307XG5cbiAgR3JpZENlbGwucHJvcGVydGllcyh7XG4gICAgZ3JpZDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ2dyaWQucm93Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICByb3c6IHt9LFxuICAgIGNvbHVtblBvc2l0aW9uOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHZhciByb3c7XG4gICAgICAgIHJvdyA9IGludmFsaWRhdG9yLnByb3AodGhpcy5yb3dQcm9wZXJ0eSk7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcChyb3cuY2VsbHNQcm9wZXJ0eSkuaW5kZXhPZih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgd2lkdGg6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wUGF0aCgncm93LmNlbGxzJykubGVuZ3RoO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcCh0aGlzLndpZHRoUHJvcGVydHkpICogaW52YWxpZGF0b3IucHJvcCh0aGlzLmNvbHVtblBvc2l0aW9uUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy53aWR0aFByb3BlcnR5KSAqIChpbnZhbGlkYXRvci5wcm9wKHRoaXMuY29sdW1uUG9zaXRpb25Qcm9wZXJ0eSkgKyAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhlaWdodDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy5oZWlnaHQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHRvcDoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy50b3AnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGJvdHRvbToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ3Jvdy5ib3R0b20nKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBHcmlkQ2VsbDtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBFbGVtZW50LCBHcmlkQ2VsbCwgR3JpZFJvdztcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5HcmlkQ2VsbCA9IHJlcXVpcmUoJy4vR3JpZENlbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBHcmlkUm93ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBHcmlkUm93IGV4dGVuZHMgRWxlbWVudCB7XG4gICAgYWRkQ2VsbChjZWxsID0gbnVsbCkge1xuICAgICAgaWYgKCFjZWxsKSB7XG4gICAgICAgIGNlbGwgPSBuZXcgR3JpZENlbGwoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2VsbHMucHVzaChjZWxsKTtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cblxuICB9O1xuXG4gIEdyaWRSb3cucHJvcGVydGllcyh7XG4gICAgZ3JpZDoge30sXG4gICAgY2VsbHM6IHtcbiAgICAgIGNvbGxlY3Rpb246IHRydWUsXG4gICAgICBpdGVtQWRkZWQ6IGZ1bmN0aW9uKGNlbGwpIHtcbiAgICAgICAgcmV0dXJuIGNlbGwucm93ID0gdGhpcztcbiAgICAgIH0sXG4gICAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24oY2VsbCkge1xuICAgICAgICBpZiAoY2VsbC5yb3cgPT09IHRoaXMpIHtcbiAgICAgICAgICByZXR1cm4gY2VsbC5yb3cgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByb3dQb3NpdGlvbjoge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICB2YXIgZ3JpZDtcbiAgICAgICAgZ3JpZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5ncmlkUHJvcGVydHkpO1xuICAgICAgICBpZiAoZ3JpZCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKGdyaWQucm93c1Byb3BlcnR5KS5pbmRleE9mKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBoZWlnaHQ6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIDEgLyBpbnZhbGlkYXRvci5wcm9wUGF0aCgnZ3JpZC5yb3dzJykubGVuZ3RoO1xuICAgICAgfVxuICAgIH0sXG4gICAgdG9wOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHRoaXMuaGVpZ2h0UHJvcGVydHkpICogaW52YWxpZGF0b3IucHJvcCh0aGlzLnJvd1Bvc2l0aW9uUHJvcGVydHkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICBjYWxjdWw6IGZ1bmN0aW9uKGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHRoaXMuaGVpZ2h0UHJvcGVydHkpICogKGludmFsaWRhdG9yLnByb3AodGhpcy5yb3dQb3NpdGlvblByb3BlcnR5KSArIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIEdyaWRSb3c7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgXCJHcmlkXCI6IHJlcXVpcmUoXCIuL0dyaWRcIiksXG4gIFwiR3JpZENlbGxcIjogcmVxdWlyZShcIi4vR3JpZENlbGxcIiksXG4gIFwiR3JpZFJvd1wiOiByZXF1aXJlKFwiLi9HcmlkUm93XCIpLFxufSIsIihmdW5jdGlvbihkZWZpbml0aW9uKXt2YXIgUGF0aEZpbmRlcj1kZWZpbml0aW9uKHR5cGVvZiBQYXJhbGxlbGlvIT09XCJ1bmRlZmluZWRcIj9QYXJhbGxlbGlvOnRoaXMuUGFyYWxsZWxpbyk7UGF0aEZpbmRlci5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPVBhdGhGaW5kZXI7fWVsc2V7aWYodHlwZW9mIFBhcmFsbGVsaW8hPT1cInVuZGVmaW5lZFwiJiZQYXJhbGxlbGlvIT09bnVsbCl7UGFyYWxsZWxpby5QYXRoRmluZGVyPVBhdGhGaW5kZXI7fWVsc2V7aWYodGhpcy5QYXJhbGxlbGlvPT1udWxsKXt0aGlzLlBhcmFsbGVsaW89e307fXRoaXMuUGFyYWxsZWxpby5QYXRoRmluZGVyPVBhdGhGaW5kZXI7fX19KShmdW5jdGlvbihkZXBlbmRlbmNpZXMpe2lmKGRlcGVuZGVuY2llcz09bnVsbCl7ZGVwZW5kZW5jaWVzPXt9O31cbnZhciBFbGVtZW50ID0gZGVwZW5kZW5jaWVzLmhhc093blByb3BlcnR5KFwiRWxlbWVudFwiKSA/IGRlcGVuZGVuY2llcy5FbGVtZW50IDogcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG52YXIgUGF0aEZpbmRlcjtcblBhdGhGaW5kZXIgPSAoZnVuY3Rpb24oKSB7XG4gIGNsYXNzIFBhdGhGaW5kZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0aWxlc0NvbnRhaW5lciwgZnJvbTEsIHRvMSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy50aWxlc0NvbnRhaW5lciA9IHRpbGVzQ29udGFpbmVyO1xuICAgICAgdGhpcy5mcm9tID0gZnJvbTE7XG4gICAgICB0aGlzLnRvID0gdG8xO1xuICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgaWYgKG9wdGlvbnMudmFsaWRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy52YWxpZFRpbGVDYWxsYmFjayA9IG9wdGlvbnMudmFsaWRUaWxlO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuYXJyaXZlZCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuYXJyaXZlZENhbGxiYWNrID0gb3B0aW9ucy5hcnJpdmVkO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbnMuZWZmaWNpZW5jeSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZWZmaWNpZW5jeUNhbGxiYWNrID0gb3B0aW9ucy5lZmZpY2llbmN5O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgdGhpcy5wYXRocyA9IHt9O1xuICAgICAgdGhpcy5zb2x1dGlvbiA9IG51bGw7XG4gICAgICByZXR1cm4gdGhpcy5zdGFydGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2FsY3VsKCkge1xuICAgICAgd2hpbGUgKCF0aGlzLnNvbHV0aW9uICYmICghdGhpcy5zdGFydGVkIHx8IHRoaXMucXVldWUubGVuZ3RoKSkge1xuICAgICAgICB0aGlzLnN0ZXAoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoKTtcbiAgICB9XG5cbiAgICBzdGVwKCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgbmV4dCA9IHRoaXMucXVldWUucG9wKCk7XG4gICAgICAgIHRoaXMuYWRkTmV4dFN0ZXBzKG5leHQpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuc3RhcnRlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgdGhpcy5zdGFydGVkID0gdHJ1ZTtcbiAgICAgIGlmICh0aGlzLnRvID09PSBmYWxzZSB8fCB0aGlzLnRpbGVJc1ZhbGlkKHRoaXMudG8pKSB7XG4gICAgICAgIHRoaXMuYWRkTmV4dFN0ZXBzKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhdGgoKSB7XG4gICAgICB2YXIgcmVzLCBzdGVwO1xuICAgICAgaWYgKHRoaXMuc29sdXRpb24pIHtcbiAgICAgICAgcmVzID0gW3RoaXMuc29sdXRpb25dO1xuICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgd2hpbGUgKHN0ZXAucHJldiAhPSBudWxsKSB7XG4gICAgICAgICAgcmVzLnVuc2hpZnQoc3RlcC5wcmV2KTtcbiAgICAgICAgICBzdGVwID0gc3RlcC5wcmV2O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0UG9zQXRQcmMocHJjKSB7XG4gICAgICBpZiAoaXNOYU4ocHJjKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbnVtYmVyJyk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQb3NBdFRpbWUodGhpcy5zb2x1dGlvbi5nZXRUb3RhbExlbmd0aCgpICogcHJjKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQb3NBdFRpbWUodGltZSkge1xuICAgICAgdmFyIHByYywgc3RlcDtcbiAgICAgIGlmICh0aGlzLnNvbHV0aW9uKSB7XG4gICAgICAgIGlmICh0aW1lID49IHRoaXMuc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnNvbHV0aW9uLnBvc1RvVGlsZU9mZnNldCh0aGlzLnNvbHV0aW9uLmdldEV4aXQoKS54LCB0aGlzLnNvbHV0aW9uLmdldEV4aXQoKS55KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgICB3aGlsZSAoc3RlcC5nZXRTdGFydExlbmd0aCgpID4gdGltZSAmJiAoc3RlcC5wcmV2ICE9IG51bGwpKSB7XG4gICAgICAgICAgICBzdGVwID0gc3RlcC5wcmV2O1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcmMgPSAodGltZSAtIHN0ZXAuZ2V0U3RhcnRMZW5ndGgoKSkgLyBzdGVwLmdldExlbmd0aCgpO1xuICAgICAgICAgIHJldHVybiBzdGVwLnBvc1RvVGlsZU9mZnNldChzdGVwLmdldEVudHJ5KCkueCArIChzdGVwLmdldEV4aXQoKS54IC0gc3RlcC5nZXRFbnRyeSgpLngpICogcHJjLCBzdGVwLmdldEVudHJ5KCkueSArIChzdGVwLmdldEV4aXQoKS55IC0gc3RlcC5nZXRFbnRyeSgpLnkpICogcHJjKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvbHV0aW9uVGlsZUxpc3QoKSB7XG4gICAgICB2YXIgc3RlcCwgdGlsZWxpc3Q7XG4gICAgICBpZiAodGhpcy5zb2x1dGlvbikge1xuICAgICAgICBzdGVwID0gdGhpcy5zb2x1dGlvbjtcbiAgICAgICAgdGlsZWxpc3QgPSBbc3RlcC50aWxlXTtcbiAgICAgICAgd2hpbGUgKHN0ZXAucHJldiAhPSBudWxsKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAucHJldjtcbiAgICAgICAgICB0aWxlbGlzdC51bnNoaWZ0KHN0ZXAudGlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbGVsaXN0O1xuICAgICAgfVxuICAgIH1cblxuICAgIHRpbGVJc1ZhbGlkKHRpbGUpIHtcbiAgICAgIGlmICh0aGlzLnZhbGlkVGlsZUNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRUaWxlQ2FsbGJhY2sodGlsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKHRpbGUgIT0gbnVsbCkgJiYgKCF0aWxlLmVtdWxhdGVkIHx8ICh0aWxlLnRpbGUgIT09IDAgJiYgdGlsZS50aWxlICE9PSBmYWxzZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldFRpbGUoeCwgeSkge1xuICAgICAgdmFyIHJlZjE7XG4gICAgICBpZiAodGhpcy50aWxlc0NvbnRhaW5lci5nZXRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZXNDb250YWluZXIuZ2V0VGlsZSh4LCB5KTtcbiAgICAgIH0gZWxzZSBpZiAoKChyZWYxID0gdGhpcy50aWxlc0NvbnRhaW5lclt5XSkgIT0gbnVsbCA/IHJlZjFbeF0gOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiB4LFxuICAgICAgICAgIHk6IHksXG4gICAgICAgICAgdGlsZTogdGhpcy50aWxlc0NvbnRhaW5lclt5XVt4XSxcbiAgICAgICAgICBlbXVsYXRlZDogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbm5lY3RlZFRvVGlsZSh0aWxlKSB7XG4gICAgICB2YXIgY29ubmVjdGVkLCB0O1xuICAgICAgaWYgKHRpbGUuZ2V0Q29ubmVjdGVkICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRpbGUuZ2V0Q29ubmVjdGVkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25uZWN0ZWQgPSBbXTtcbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54ICsgMSwgdGlsZS55KSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0ID0gdGhpcy5nZXRUaWxlKHRpbGUueCAtIDEsIHRpbGUueSkpIHtcbiAgICAgICAgICBjb25uZWN0ZWQucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA9IHRoaXMuZ2V0VGlsZSh0aWxlLngsIHRpbGUueSArIDEpKSB7XG4gICAgICAgICAgY29ubmVjdGVkLnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPSB0aGlzLmdldFRpbGUodGlsZS54LCB0aWxlLnkgLSAxKSkge1xuICAgICAgICAgIGNvbm5lY3RlZC5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0ZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkTmV4dFN0ZXBzKHN0ZXAgPSBudWxsKSB7XG4gICAgICB2YXIgaSwgbGVuLCBuZXh0LCByZWYxLCByZXN1bHRzLCB0aWxlO1xuICAgICAgdGlsZSA9IHN0ZXAgIT0gbnVsbCA/IHN0ZXAubmV4dFRpbGUgOiB0aGlzLmZyb207XG4gICAgICByZWYxID0gdGhpcy5nZXRDb25uZWN0ZWRUb1RpbGUodGlsZSk7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYxLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG5leHQgPSByZWYxW2ldO1xuICAgICAgICBpZiAodGhpcy50aWxlSXNWYWxpZChuZXh0KSkge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmFkZFN0ZXAobmV3IFBhdGhGaW5kZXIuU3RlcCh0aGlzLCAoc3RlcCAhPSBudWxsID8gc3RlcCA6IG51bGwpLCB0aWxlLCBuZXh0KSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdHMucHVzaCh2b2lkIDApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9XG5cbiAgICB0aWxlRXF1YWwodGlsZUEsIHRpbGVCKSB7XG4gICAgICByZXR1cm4gdGlsZUEgPT09IHRpbGVCIHx8ICgodGlsZUEuZW11bGF0ZWQgfHwgdGlsZUIuZW11bGF0ZWQpICYmIHRpbGVBLnggPT09IHRpbGVCLnggJiYgdGlsZUEueSA9PT0gdGlsZUIueSk7XG4gICAgfVxuXG4gICAgYXJyaXZlZEF0RGVzdGluYXRpb24oc3RlcCkge1xuICAgICAgaWYgKHRoaXMuYXJyaXZlZENhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXJyaXZlZENhbGxiYWNrKHN0ZXApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZUVxdWFsKHN0ZXAudGlsZSwgdGhpcy50byk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3RlcChzdGVwKSB7XG4gICAgICB2YXIgc29sdXRpb25DYW5kaWRhdGU7XG4gICAgICBpZiAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XSA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF0gPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICghKCh0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldICE9IG51bGwpICYmIHRoaXMucGF0aHNbc3RlcC5nZXRFeGl0KCkueF1bc3RlcC5nZXRFeGl0KCkueV0uZ2V0VG90YWxMZW5ndGgoKSA8PSBzdGVwLmdldFRvdGFsTGVuZ3RoKCkpKSB7XG4gICAgICAgIGlmICh0aGlzLnBhdGhzW3N0ZXAuZ2V0RXhpdCgpLnhdW3N0ZXAuZ2V0RXhpdCgpLnldICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLnJlbW92ZVN0ZXAodGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYXRoc1tzdGVwLmdldEV4aXQoKS54XVtzdGVwLmdldEV4aXQoKS55XSA9IHN0ZXA7XG4gICAgICAgIHRoaXMucXVldWUuc3BsaWNlKHRoaXMuZ2V0U3RlcFJhbmsoc3RlcCksIDAsIHN0ZXApO1xuICAgICAgICBzb2x1dGlvbkNhbmRpZGF0ZSA9IG5ldyBQYXRoRmluZGVyLlN0ZXAodGhpcywgc3RlcCwgc3RlcC5uZXh0VGlsZSwgbnVsbCk7XG4gICAgICAgIGlmICh0aGlzLmFycml2ZWRBdERlc3RpbmF0aW9uKHNvbHV0aW9uQ2FuZGlkYXRlKSAmJiAhKCh0aGlzLnNvbHV0aW9uICE9IG51bGwpICYmIHRoaXMuc29sdXRpb24ucHJldi5nZXRUb3RhbExlbmd0aCgpIDw9IHN0ZXAuZ2V0VG90YWxMZW5ndGgoKSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zb2x1dGlvbiA9IHNvbHV0aW9uQ2FuZGlkYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlU3RlcChzdGVwKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICBpbmRleCA9IHRoaXMucXVldWUuaW5kZXhPZihzdGVwKTtcbiAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYmVzdCgpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlW3RoaXMucXVldWUubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgZ2V0U3RlcFJhbmsoc3RlcCkge1xuICAgICAgaWYgKHRoaXMucXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFN0ZXBSYW5rKHN0ZXAuZ2V0RWZmaWNpZW5jeSgpLCAwLCB0aGlzLnF1ZXVlLmxlbmd0aCAtIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9nZXRTdGVwUmFuayhlZmZpY2llbmN5LCBtaW4sIG1heCkge1xuICAgICAgdmFyIHJlZiwgcmVmUG9zO1xuICAgICAgcmVmUG9zID0gTWF0aC5mbG9vcigobWF4IC0gbWluKSAvIDIpICsgbWluO1xuICAgICAgcmVmID0gdGhpcy5xdWV1ZVtyZWZQb3NdLmdldEVmZmljaWVuY3koKTtcbiAgICAgIGlmIChyZWYgPT09IGVmZmljaWVuY3kpIHtcbiAgICAgICAgcmV0dXJuIHJlZlBvcztcbiAgICAgIH0gZWxzZSBpZiAocmVmID4gZWZmaWNpZW5jeSkge1xuICAgICAgICBpZiAocmVmUG9zID09PSBtaW4pIHtcbiAgICAgICAgICByZXR1cm4gbWluO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTdGVwUmFuayhlZmZpY2llbmN5LCBtaW4sIHJlZlBvcyAtIDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmVmUG9zID09PSBtYXgpIHtcbiAgICAgICAgICByZXR1cm4gbWF4ICsgMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U3RlcFJhbmsoZWZmaWNpZW5jeSwgcmVmUG9zICsgMSwgbWF4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICB9O1xuXG4gIFBhdGhGaW5kZXIucHJvcGVydGllcyh7XG4gICAgdmFsaWRUaWxlQ2FsbGJhY2s6IHt9XG4gIH0pO1xuXG4gIHJldHVybiBQYXRoRmluZGVyO1xuXG59KS5jYWxsKHRoaXMpO1xuXG5QYXRoRmluZGVyLlN0ZXAgPSBjbGFzcyBTdGVwIHtcbiAgY29uc3RydWN0b3IocGF0aEZpbmRlciwgcHJldiwgdGlsZTEsIG5leHRUaWxlKSB7XG4gICAgdGhpcy5wYXRoRmluZGVyID0gcGF0aEZpbmRlcjtcbiAgICB0aGlzLnByZXYgPSBwcmV2O1xuICAgIHRoaXMudGlsZSA9IHRpbGUxO1xuICAgIHRoaXMubmV4dFRpbGUgPSBuZXh0VGlsZTtcbiAgfVxuXG4gIHBvc1RvVGlsZU9mZnNldCh4LCB5KSB7XG4gICAgdmFyIHRpbGU7XG4gICAgdGlsZSA9IE1hdGguZmxvb3IoeCkgPT09IHRoaXMudGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMudGlsZS55ID8gdGhpcy50aWxlIDogKHRoaXMubmV4dFRpbGUgIT0gbnVsbCkgJiYgTWF0aC5mbG9vcih4KSA9PT0gdGhpcy5uZXh0VGlsZS54ICYmIE1hdGguZmxvb3IoeSkgPT09IHRoaXMubmV4dFRpbGUueSA/IHRoaXMubmV4dFRpbGUgOiAodGhpcy5wcmV2ICE9IG51bGwpICYmIE1hdGguZmxvb3IoeCkgPT09IHRoaXMucHJldi50aWxlLnggJiYgTWF0aC5mbG9vcih5KSA9PT0gdGhpcy5wcmV2LnRpbGUueSA/IHRoaXMucHJldi50aWxlIDogY29uc29sZS5sb2coJ01hdGguZmxvb3IoJyArIHggKyAnKSA9PSAnICsgdGhpcy50aWxlLngsICdNYXRoLmZsb29yKCcgKyB5ICsgJykgPT0gJyArIHRoaXMudGlsZS55LCB0aGlzKTtcbiAgICByZXR1cm4ge1xuICAgICAgeDogeCxcbiAgICAgIHk6IHksXG4gICAgICB0aWxlOiB0aWxlLFxuICAgICAgb2Zmc2V0WDogeCAtIHRpbGUueCxcbiAgICAgIG9mZnNldFk6IHkgLSB0aWxlLnlcbiAgICB9O1xuICB9XG5cbiAgZ2V0RXhpdCgpIHtcbiAgICBpZiAodGhpcy5leGl0ID09IG51bGwpIHtcbiAgICAgIGlmICh0aGlzLm5leHRUaWxlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5leGl0ID0ge1xuICAgICAgICAgIHg6ICh0aGlzLnRpbGUueCArIHRoaXMubmV4dFRpbGUueCArIDEpIC8gMixcbiAgICAgICAgICB5OiAodGhpcy50aWxlLnkgKyB0aGlzLm5leHRUaWxlLnkgKyAxKSAvIDJcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZXhpdCA9IHtcbiAgICAgICAgICB4OiB0aGlzLnRpbGUueCArIDAuNSxcbiAgICAgICAgICB5OiB0aGlzLnRpbGUueSArIDAuNVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5leGl0O1xuICB9XG5cbiAgZ2V0RW50cnkoKSB7XG4gICAgaWYgKHRoaXMuZW50cnkgPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMucHJldiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuZW50cnkgPSB7XG4gICAgICAgICAgeDogKHRoaXMudGlsZS54ICsgdGhpcy5wcmV2LnRpbGUueCArIDEpIC8gMixcbiAgICAgICAgICB5OiAodGhpcy50aWxlLnkgKyB0aGlzLnByZXYudGlsZS55ICsgMSkgLyAyXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVudHJ5ID0ge1xuICAgICAgICAgIHg6IHRoaXMudGlsZS54ICsgMC41LFxuICAgICAgICAgIHk6IHRoaXMudGlsZS55ICsgMC41XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVudHJ5O1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA9PSBudWxsKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9ICh0aGlzLm5leHRUaWxlID09IG51bGwpIHx8ICh0aGlzLnByZXYgPT0gbnVsbCkgPyAwLjUgOiB0aGlzLnByZXYudGlsZS54ID09PSB0aGlzLm5leHRUaWxlLnggfHwgdGhpcy5wcmV2LnRpbGUueSA9PT0gdGhpcy5uZXh0VGlsZS55ID8gMSA6IE1hdGguc3FydCgwLjUpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gIH1cblxuICBnZXRTdGFydExlbmd0aCgpIHtcbiAgICBpZiAodGhpcy5zdGFydExlbmd0aCA9PSBudWxsKSB7XG4gICAgICB0aGlzLnN0YXJ0TGVuZ3RoID0gdGhpcy5wcmV2ICE9IG51bGwgPyB0aGlzLnByZXYuZ2V0VG90YWxMZW5ndGgoKSA6IDA7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnN0YXJ0TGVuZ3RoO1xuICB9XG5cbiAgZ2V0VG90YWxMZW5ndGgoKSB7XG4gICAgaWYgKHRoaXMudG90YWxMZW5ndGggPT0gbnVsbCkge1xuICAgICAgdGhpcy50b3RhbExlbmd0aCA9IHRoaXMuZ2V0U3RhcnRMZW5ndGgoKSArIHRoaXMuZ2V0TGVuZ3RoKCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnRvdGFsTGVuZ3RoO1xuICB9XG5cbiAgZ2V0RWZmaWNpZW5jeSgpIHtcbiAgICBpZiAodGhpcy5lZmZpY2llbmN5ID09IG51bGwpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5wYXRoRmluZGVyLmVmZmljaWVuY3lDYWxsYmFjayA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHRoaXMuZWZmaWNpZW5jeSA9IHRoaXMucGF0aEZpbmRlci5lZmZpY2llbmN5Q2FsbGJhY2sodGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmVmZmljaWVuY3kgPSAtdGhpcy5nZXRSZW1haW5pbmcoKSAqIDEuMSAtIHRoaXMuZ2V0VG90YWxMZW5ndGgoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZWZmaWNpZW5jeTtcbiAgfVxuXG4gIGdldFJlbWFpbmluZygpIHtcbiAgICB2YXIgZnJvbSwgdG8sIHgsIHk7XG4gICAgaWYgKHRoaXMucmVtYWluaW5nID09IG51bGwpIHtcbiAgICAgIGZyb20gPSB0aGlzLmdldEV4aXQoKTtcbiAgICAgIHRvID0ge1xuICAgICAgICB4OiB0aGlzLnBhdGhGaW5kZXIudG8ueCArIDAuNSxcbiAgICAgICAgeTogdGhpcy5wYXRoRmluZGVyLnRvLnkgKyAwLjVcbiAgICAgIH07XG4gICAgICB4ID0gdG8ueCAtIGZyb20ueDtcbiAgICAgIHkgPSB0by55IC0gZnJvbS55O1xuICAgICAgdGhpcy5yZW1haW5pbmcgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZztcbiAgfVxuXG59O1xuXG5yZXR1cm4oUGF0aEZpbmRlcik7fSk7IiwiaWYgKHR5cGVvZiBtb2R1bGUgIT09IFwidW5kZWZpbmVkXCIgJiYgbW9kdWxlICE9PSBudWxsKSB7XG4gIG1vZHVsZS5leHBvcnRzID0ge1xuICAgICAgZ3JlZWtBbHBoYWJldDogcmVxdWlyZSgnLi9zdHJpbmdzL2dyZWVrQWxwaGFiZXQnKSxcbiAgICAgIHN0YXJOYW1lczogcmVxdWlyZSgnLi9zdHJpbmdzL3N0YXJOYW1lcycpXG4gIH07XG59IiwibW9kdWxlLmV4cG9ydHM9W1xuXCJhbHBoYVwiLCAgIFwiYmV0YVwiLCAgICBcImdhbW1hXCIsICAgXCJkZWx0YVwiLFxuXCJlcHNpbG9uXCIsIFwiemV0YVwiLCAgICBcImV0YVwiLCAgICAgXCJ0aGV0YVwiLFxuXCJpb3RhXCIsICAgIFwia2FwcGFcIiwgICBcImxhbWJkYVwiLCAgXCJtdVwiLFxuXCJudVwiLCAgICAgIFwieGlcIiwgICAgICBcIm9taWNyb25cIiwgXCJwaVwiLFx0XG5cInJob1wiLCAgICAgXCJzaWdtYVwiLCAgIFwidGF1XCIsICAgICBcInVwc2lsb25cIixcblwicGhpXCIsICAgICBcImNoaVwiLCAgICAgXCJwc2lcIiwgICAgIFwib21lZ2FcIlxuXSIsIm1vZHVsZS5leHBvcnRzPVtcblwiQWNoZXJuYXJcIiwgICAgIFwiTWFpYVwiLCAgICAgICAgXCJBdGxhc1wiLCAgICAgICAgXCJTYWxtXCIsICAgICAgIFwiQWxuaWxhbVwiLCAgICAgIFwiTmVra2FyXCIsICAgICAgXCJFbG5hdGhcIiwgICAgICAgXCJUaHViYW5cIixcblwiQWNoaXJkXCIsICAgICAgIFwiTWFyZmlrXCIsICAgICAgXCJBdXZhXCIsICAgICAgICAgXCJTYXJnYXNcIiwgICAgIFwiQWxuaXRha1wiLCAgICAgIFwiTmloYWxcIiwgICAgICAgXCJFbmlmXCIsICAgICAgICAgXCJUb3JjdWxhcmlzXCIsXG5cIkFjcnV4XCIsICAgICAgICBcIk1hcmthYlwiLCAgICAgIFwiQXZpb3JcIiwgICAgICAgIFwiU2FyaW5cIiwgICAgICBcIkFscGhhcmRcIiwgICAgICBcIk51bmtpXCIsICAgICAgIFwiRXRhbWluXCIsICAgICAgIFwiVHVyYWlzXCIsXG5cIkFjdWJlbnNcIiwgICAgICBcIk1hdGFyXCIsICAgICAgIFwiQXplbGZhZmFnZVwiLCAgIFwiU2NlcHRydW1cIiwgICBcIkFscGhla2thXCIsICAgICBcIk51c2FrYW5cIiwgICAgIFwiRm9tYWxoYXV0XCIsICAgIFwiVHlsXCIsXG5cIkFkYXJhXCIsICAgICAgICBcIk1lYnN1dGFcIiwgICAgIFwiQXpoYVwiLCAgICAgICAgIFwiU2NoZWF0XCIsICAgICBcIkFscGhlcmF0elwiLCAgICBcIlBlYWNvY2tcIiwgICAgIFwiRm9ybmFjaXNcIiwgICAgIFwiVW51a2FsaGFpXCIsXG5cIkFkaGFmZXJhXCIsICAgICBcIk1lZ3JlelwiLCAgICAgIFwiQXptaWRpc2tlXCIsICAgIFwiU2VnaW5cIiwgICAgICBcIkFscmFpXCIsICAgICAgICBcIlBoYWRcIiwgICAgICAgIFwiRnVydWRcIiwgICAgICAgIFwiVmVnYVwiLFxuXCJBZGhpbFwiLCAgICAgICAgXCJNZWlzc2FcIiwgICAgICBcIkJhaGFtXCIsICAgICAgICBcIlNlZ2ludXNcIiwgICAgXCJBbHJpc2hhXCIsICAgICAgXCJQaGFldFwiLCAgICAgICBcIkdhY3J1eFwiLCAgICAgICBcIlZpbmRlbWlhdHJpeFwiLFxuXCJBZ2VuYVwiLCAgICAgICAgXCJNZWtidWRhXCIsICAgICBcIkJlY3J1eFwiLCAgICAgICBcIlNoYW1cIiwgICAgICAgXCJBbHNhZmlcIiwgICAgICAgXCJQaGVya2FkXCIsICAgICBcIkdpYW5mYXJcIiwgICAgICBcIldhc2F0XCIsXG5cIkFsYWRmYXJcIiwgICAgICBcIk1lbmthbGluYW5cIiwgIFwiQmVpZFwiLCAgICAgICAgIFwiU2hhcmF0YW5cIiwgICBcIkFsc2NpYXVrYXRcIiwgICBcIlBsZWlvbmVcIiwgICAgIFwiR29tZWlzYVwiLCAgICAgIFwiV2V6ZW5cIixcblwiQWxhdGhmYXJcIiwgICAgIFwiTWVua2FyXCIsICAgICAgXCJCZWxsYXRyaXhcIiwgICAgXCJTaGF1bGFcIiwgICAgIFwiQWxzaGFpblwiLCAgICAgIFwiUG9sYXJpc1wiLCAgICAgXCJHcmFmZmlhc1wiLCAgICAgXCJXZXpuXCIsXG5cIkFsYmFsZGFoXCIsICAgICBcIk1lbmtlbnRcIiwgICAgIFwiQmV0ZWxnZXVzZVwiLCAgIFwiU2hlZGlyXCIsICAgICBcIkFsc2hhdFwiLCAgICAgICBcIlBvbGx1eFwiLCAgICAgIFwiR3JhZmlhc1wiLCAgICAgIFwiWWVkXCIsXG5cIkFsYmFsaVwiLCAgICAgICBcIk1lbmtpYlwiLCAgICAgIFwiQm90ZWluXCIsICAgICAgIFwiU2hlbGlha1wiLCAgICBcIkFsc3VoYWlsXCIsICAgICBcIlBvcnJpbWFcIiwgICAgIFwiR3J1bWl1bVwiLCAgICAgIFwiWWlsZHVuXCIsXG5cIkFsYmlyZW9cIiwgICAgICBcIk1lcmFrXCIsICAgICAgIFwiQnJhY2hpdW1cIiwgICAgIFwiU2lyaXVzXCIsICAgICBcIkFsdGFpclwiLCAgICAgICBcIlByYWVjaXB1YVwiLCAgIFwiSGFkYXJcIiwgICAgICAgIFwiWmFuaWFoXCIsXG5cIkFsY2hpYmFcIiwgICAgICBcIk1lcmdhXCIsICAgICAgIFwiQ2Fub3B1c1wiLCAgICAgIFwiU2l0dWxhXCIsICAgICBcIkFsdGFyZlwiLCAgICAgICBcIlByb2N5b25cIiwgICAgIFwiSGFlZGlcIiwgICAgICAgIFwiWmF1cmFrXCIsXG5cIkFsY29yXCIsICAgICAgICBcIk1lcm9wZVwiLCAgICAgIFwiQ2FwZWxsYVwiLCAgICAgIFwiU2thdFwiLCAgICAgICBcIkFsdGVyZlwiLCAgICAgICBcIlByb3B1c1wiLCAgICAgIFwiSGFtYWxcIiwgICAgICAgIFwiWmF2aWphaFwiLFxuXCJBbGN5b25lXCIsICAgICAgXCJNZXNhcnRoaW1cIiwgICBcIkNhcGhcIiwgICAgICAgICBcIlNwaWNhXCIsICAgICAgXCJBbHVkcmFcIiwgICAgICAgXCJSYW5hXCIsICAgICAgICBcIkhhc3NhbGVoXCIsICAgICBcIlppYmFsXCIsXG5cIkFsZGVyYW1pblwiLCAgICBcIk1ldGFsbGFoXCIsICAgIFwiQ2FzdG9yXCIsICAgICAgIFwiU3Rlcm9wZVwiLCAgICBcIkFsdWxhXCIsICAgICAgICBcIlJhc1wiLCAgICAgICAgIFwiSGV6ZVwiLCAgICAgICAgIFwiWm9zbWFcIixcblwiQWxkaGliYWhcIiwgICAgIFwiTWlhcGxhY2lkdXNcIiwgXCJDZWJhbHJhaVwiLCAgICAgXCJTdWFsb2NpblwiLCAgIFwiQWx5YVwiLCAgICAgICAgIFwiUmFzYWxnZXRoaVwiLCAgXCJIb2VkdXNcIiwgICAgICAgXCJBcXVhcml1c1wiLFxuXCJBbGZpcmtcIiwgICAgICAgXCJNaW5rYXJcIiwgICAgICBcIkNlbGFlbm9cIiwgICAgICBcIlN1YnJhXCIsICAgICAgXCJBbHppcnJcIiwgICAgICAgXCJSYXNhbGhhZ3VlXCIsICBcIkhvbWFtXCIsICAgICAgICBcIkFyaWVzXCIsXG5cIkFsZ2VuaWJcIiwgICAgICBcIk1pbnRha2FcIiwgICAgIFwiQ2hhcmFcIiwgICAgICAgIFwiU3VoYWlsXCIsICAgICBcIkFuY2hhXCIsICAgICAgICBcIlJhc3RhYmFuXCIsICAgIFwiSHlhZHVtXCIsICAgICAgIFwiQ2VwaGV1c1wiLFxuXCJBbGdpZWJhXCIsICAgICAgXCJNaXJhXCIsICAgICAgICBcIkNob3J0XCIsICAgICAgICBcIlN1bGFmYXRcIiwgICAgXCJBbmdldGVuYXJcIiwgICAgXCJSZWd1bHVzXCIsICAgICBcIkl6YXJcIiwgICAgICAgICBcIkNldHVzXCIsXG5cIkFsZ29sXCIsICAgICAgICBcIk1pcmFjaFwiLCAgICAgIFwiQ3Vyc2FcIiwgICAgICAgIFwiU3lybWFcIiwgICAgICBcIkFua2FhXCIsICAgICAgICBcIlJpZ2VsXCIsICAgICAgIFwiSmFiYmFoXCIsICAgICAgIFwiQ29sdW1iYVwiLFxuXCJBbGdvcmFiXCIsICAgICAgXCJNaXJhbVwiLCAgICAgICBcIkRhYmloXCIsICAgICAgICBcIlRhYml0XCIsICAgICAgXCJBbnNlclwiLCAgICAgICAgXCJSb3RhbmV2XCIsICAgICBcIkthamFtXCIsICAgICAgICBcIkNvbWFcIixcblwiQWxoZW5hXCIsICAgICAgIFwiTWlycGhha1wiLCAgICAgXCJEZW5lYlwiLCAgICAgICAgXCJUYWxpdGhhXCIsICAgIFwiQW50YXJlc1wiLCAgICAgIFwiUnVjaGJhXCIsICAgICAgXCJLYXVzXCIsICAgICAgICAgXCJDb3JvbmFcIixcblwiQWxpb3RoXCIsICAgICAgIFwiTWl6YXJcIiwgICAgICAgXCJEZW5lYm9sYVwiLCAgICAgXCJUYW5pYVwiLCAgICAgIFwiQXJjdHVydXNcIiwgICAgIFwiUnVjaGJhaFwiLCAgICAgXCJLZWlkXCIsICAgICAgICAgXCJDcnV4XCIsXG5cIkFsa2FpZFwiLCAgICAgICBcIk11ZnJpZFwiLCAgICAgIFwiRGhlbmViXCIsICAgICAgIFwiVGFyYXplZFwiLCAgICBcIkFya2FiXCIsICAgICAgICBcIlJ1a2JhdFwiLCAgICAgIFwiS2l0YWxwaGFcIiwgICAgIFwiRHJhY29cIixcblwiQWxrYWx1cm9wc1wiLCAgIFwiTXVsaXBoZW5cIiwgICAgXCJEaWFkZW1cIiwgICAgICAgXCJUYXlnZXRhXCIsICAgIFwiQXJuZWJcIiwgICAgICAgIFwiU2FiaWtcIiwgICAgICAgXCJLb2NhYlwiLCAgICAgICAgXCJHcnVzXCIsXG5cIkFsa2VzXCIsICAgICAgICBcIk11cnppbVwiLCAgICAgIFwiRGlwaGRhXCIsICAgICAgIFwiVGVnbWVuXCIsICAgICBcIkFycmFraXNcIiwgICAgICBcIlNhZGFsYWNoYmlhXCIsIFwiS29ybmVwaG9yb3NcIiwgIFwiSHlkcmFcIixcblwiQWxrdXJoYWhcIiwgICAgIFwiTXVzY2lkYVwiLCAgICAgXCJEc2NodWJiYVwiLCAgICAgXCJUZWphdFwiLCAgICAgIFwiQXNjZWxsYVwiLCAgICAgIFwiU2FkYWxtZWxpa1wiLCAgXCJLcmF6XCIsICAgICAgICAgXCJMYWNlcnRhXCIsXG5cIkFsbWFha1wiLCAgICAgICBcIk5hb3NcIiwgICAgICAgIFwiRHNpYmFuXCIsICAgICAgIFwiVGVyZWJlbGx1bVwiLCBcIkFzZWxsdXNcIiwgICAgICBcIlNhZGFsc3V1ZFwiLCAgIFwiS3VtYVwiLCAgICAgICAgIFwiTWVuc2FcIixcblwiQWxuYWlyXCIsICAgICAgIFwiTmFzaFwiLCAgICAgICAgXCJEdWJoZVwiLCAgICAgICAgXCJUaGFiaXRcIiwgICAgIFwiQXN0ZXJvcGVcIiwgICAgIFwiU2FkclwiLCAgICAgICAgXCJMZXNhdGhcIiwgICAgICAgXCJNYWFzeW1cIixcblwiQWxuYXRoXCIsICAgICAgIFwiTmFzaGlyYVwiLCAgICAgXCJFbGVjdHJhXCIsICAgICAgXCJUaGVlbWltXCIsICAgIFwiQXRpa1wiLCAgICAgICAgIFwiU2FpcGhcIiwgICAgICAgXCJQaG9lbml4XCIsICAgICAgXCJOb3JtYVwiXG5dIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IGNvb3JkXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IG9yaWdpblxuICAgKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAgICovXG4gIHJvdGF0ZTogZnVuY3Rpb24gKGNvb3JkLCBhbmdsZSwgb3JpZ2luID0geyB4OiAwLCB5OiAwIH0pIHtcbiAgICBjb25zdCByZWNlbnRlclggPSBjb29yZC54IC0gb3JpZ2luLnhcbiAgICBjb25zdCByZWNlbnRlclkgPSBjb29yZC55IC0gb3JpZ2luLnlcbiAgICByZXR1cm4ge1xuICAgICAgeDogTWF0aC5yb3VuZChNYXRoLmNvcyhhbmdsZSkgKiByZWNlbnRlclggLSBNYXRoLnNpbihhbmdsZSkgKiByZWNlbnRlclkpICsgb3JpZ2luLnggKyAwLFxuICAgICAgeTogTWF0aC5yb3VuZChNYXRoLnNpbihhbmdsZSkgKiByZWNlbnRlclggKyBNYXRoLmNvcyhhbmdsZSkgKiByZWNlbnRlclkpICsgb3JpZ2luLnkgKyAwXG4gICAgfVxuICB9XG59XG4iLCJcbmNvbnN0IENvb3JkSGVscGVyID0gcmVxdWlyZSgnLi9Db29yZEhlbHBlcicpXG5cbmNsYXNzIERpcmVjdGlvbiB7XG4gIGNvbnN0cnVjdG9yIChuYW1lLCB4LCB5LCBhbmdsZSwgaW52ZXJzZU5hbWUpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gICAgdGhpcy54ID0geFxuICAgIHRoaXMueSA9IHlcbiAgICB0aGlzLmFuZ2xlID0gYW5nbGVcbiAgICB0aGlzLmludmVyc2VOYW1lID0gaW52ZXJzZU5hbWVcbiAgfVxuXG4gIGdldEludmVyc2UgKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yW3RoaXMuaW52ZXJzZU5hbWVdXG4gIH1cblxuICByb3RhdGUgKGFuZ2xlKSB7XG4gICAgY29uc3QgY29vcmQgPSBDb29yZEhlbHBlci5yb3RhdGUodGhpcywgYW5nbGUpXG4gICAgcmV0dXJuIERpcmVjdGlvbi5hbGwuZmluZCgoZCkgPT4ge1xuICAgICAgcmV0dXJuIGQueCA9PT0gY29vcmQueCAmJiBkLnkgPT09IGNvb3JkLnlcbiAgICB9KVxuICB9XG59XG5cbkRpcmVjdGlvbi51cCA9IG5ldyBEaXJlY3Rpb24oJ3VwJywgMCwgLTEsIDAsICdkb3duJylcblxuRGlyZWN0aW9uLmRvd24gPSBuZXcgRGlyZWN0aW9uKCdkb3duJywgMCwgMSwgTWF0aC5QSSwgJ3VwJylcblxuRGlyZWN0aW9uLmxlZnQgPSBuZXcgRGlyZWN0aW9uKCdsZWZ0JywgLTEsIDAsIE1hdGguUEkgLyAyICogMywgJ3JpZ2h0JylcblxuRGlyZWN0aW9uLnJpZ2h0ID0gbmV3IERpcmVjdGlvbigncmlnaHQnLCAxLCAwLCBNYXRoLlBJIC8gMiwgJ2xlZnQnKVxuXG5EaXJlY3Rpb24uYWRqYWNlbnRzID0gW0RpcmVjdGlvbi51cCwgRGlyZWN0aW9uLmRvd24sIERpcmVjdGlvbi5sZWZ0LCBEaXJlY3Rpb24ucmlnaHRdXG5cbkRpcmVjdGlvbi50b3BMZWZ0ID0gbmV3IERpcmVjdGlvbigndG9wTGVmdCcsIC0xLCAtMSwgTWF0aC5QSSAvIDQgKiA3LCAnYm90dG9tUmlnaHQnKVxuXG5EaXJlY3Rpb24udG9wUmlnaHQgPSBuZXcgRGlyZWN0aW9uKCd0b3BSaWdodCcsIDEsIC0xLCBNYXRoLlBJIC8gNCwgJ2JvdHRvbUxlZnQnKVxuXG5EaXJlY3Rpb24uYm90dG9tUmlnaHQgPSBuZXcgRGlyZWN0aW9uKCdib3R0b21SaWdodCcsIDEsIDEsIE1hdGguUEkgLyA0ICogMywgJ3RvcExlZnQnKVxuXG5EaXJlY3Rpb24uYm90dG9tTGVmdCA9IG5ldyBEaXJlY3Rpb24oJ2JvdHRvbUxlZnQnLCAtMSwgMSwgTWF0aC5QSSAvIDQgKiA1LCAndG9wUmlnaHQnKVxuXG5EaXJlY3Rpb24uY29ybmVycyA9IFtEaXJlY3Rpb24udG9wTGVmdCwgRGlyZWN0aW9uLnRvcFJpZ2h0LCBEaXJlY3Rpb24uYm90dG9tUmlnaHQsIERpcmVjdGlvbi5ib3R0b21MZWZ0XVxuXG5EaXJlY3Rpb24uYWxsID0gW0RpcmVjdGlvbi51cCwgRGlyZWN0aW9uLmRvd24sIERpcmVjdGlvbi5sZWZ0LCBEaXJlY3Rpb24ucmlnaHQsIERpcmVjdGlvbi50b3BMZWZ0LCBEaXJlY3Rpb24udG9wUmlnaHQsIERpcmVjdGlvbi5ib3R0b21SaWdodCwgRGlyZWN0aW9uLmJvdHRvbUxlZnRdXG5cbm1vZHVsZS5leHBvcnRzID0gRGlyZWN0aW9uXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IERpcmVjdGlvbiA9IHJlcXVpcmUoJy4vRGlyZWN0aW9uJylcbmNvbnN0IENvb3JkSGVscGVyID0gcmVxdWlyZSgnLi9Db29yZEhlbHBlcicpXG5cbmNsYXNzIFRpbGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgY29uc3RydWN0b3IgKHhPck9wdGlvbnMsIHkgPSAwKSB7XG4gICAgbGV0IG9wdCA9IHhPck9wdGlvbnNcbiAgICBpZiAodHlwZW9mIHhPck9wdGlvbnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHQgPSB7IHg6IHhPck9wdGlvbnMsIHk6IHkgfVxuICAgIH1cbiAgICBzdXBlcihvcHQpXG4gICAgdGhpcy54ID0gb3B0LnhcbiAgICB0aGlzLnkgPSBvcHQueVxuICB9XG5cbiAgZ2V0UmVsYXRpdmVUaWxlICh4LCB5KSB7XG4gICAgaWYgKHggPT09IDAgJiYgeSA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gICAgaWYgKHRoaXMuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbnRhaW5lci5nZXRUaWxlKHRoaXMueCArIHgsIHRoaXMueSArIHkpXG4gICAgfVxuICB9XG5cbiAgZmluZERpcmVjdGlvbk9mICh0aWxlKSB7XG4gICAgaWYgKHRpbGUudGlsZSkge1xuICAgICAgdGlsZSA9IHRpbGUudGlsZVxuICAgIH1cbiAgICBpZiAoKHRpbGUueCAhPSBudWxsKSAmJiAodGlsZS55ICE9IG51bGwpKSB7XG4gICAgICByZXR1cm4gRGlyZWN0aW9uLmFsbC5maW5kKChkKSA9PiB7XG4gICAgICAgIHJldHVybiBkLnggPT09IHRpbGUueCAtIHRoaXMueCAmJiBkLnkgPT09IHRpbGUueSAtIHRoaXMueVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBhZGRDaGlsZCAoY2hpbGQsIGNoZWNrUmVmID0gdHJ1ZSkge1xuICAgIHZhciBpbmRleFxuICAgIGluZGV4ID0gdGhpcy5jaGlsZHJlbi5pbmRleE9mKGNoaWxkKVxuICAgIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChjaGlsZClcbiAgICB9XG4gICAgaWYgKGNoZWNrUmVmKSB7XG4gICAgICBjaGlsZC50aWxlID0gdGhpc1xuICAgIH1cbiAgICByZXR1cm4gY2hpbGRcbiAgfVxuXG4gIHJlbW92ZUNoaWxkIChjaGlsZCwgY2hlY2tSZWYgPSB0cnVlKSB7XG4gICAgdmFyIGluZGV4XG4gICAgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmluZGV4T2YoY2hpbGQpXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKGluZGV4LCAxKVxuICAgIH1cbiAgICBpZiAoY2hlY2tSZWYgJiYgY2hpbGQudGlsZSA9PT0gdGhpcykge1xuICAgICAgY2hpbGQudGlsZSA9IG51bGxcbiAgICB9XG4gIH1cblxuICBkaXN0ICh0aWxlKSB7XG4gICAgdmFyIGN0bkRpc3QsIHJlZiwgeCwgeVxuICAgIGlmICgodGlsZSAhPSBudWxsID8gdGlsZS5nZXRGaW5hbFRpbGUgOiBudWxsKSAhPSBudWxsKSB7XG4gICAgICB0aWxlID0gdGlsZS5nZXRGaW5hbFRpbGUoKVxuICAgIH1cbiAgICBpZiAoKCh0aWxlICE9IG51bGwgPyB0aWxlLnggOiBudWxsKSAhPSBudWxsKSAmJiAodGlsZS55ICE9IG51bGwpICYmICh0aGlzLnggIT0gbnVsbCkgJiYgKHRoaXMueSAhPSBudWxsKSAmJiAodGhpcy5jb250YWluZXIgPT09IHRpbGUuY29udGFpbmVyIHx8IChjdG5EaXN0ID0gKHJlZiA9IHRoaXMuY29udGFpbmVyKSAhPSBudWxsID8gdHlwZW9mIHJlZi5kaXN0ID09PSAnZnVuY3Rpb24nID8gcmVmLmRpc3QodGlsZS5jb250YWluZXIpIDogbnVsbCA6IG51bGwpKSkge1xuICAgICAgeCA9IHRpbGUueCAtIHRoaXMueFxuICAgICAgeSA9IHRpbGUueSAtIHRoaXMueVxuICAgICAgaWYgKGN0bkRpc3QpIHtcbiAgICAgICAgeCArPSBjdG5EaXN0LnhcbiAgICAgICAgeSArPSBjdG5EaXN0LnlcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHgsXG4gICAgICAgIHk6IHksXG4gICAgICAgIGxlbmd0aDogTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZVxuICAgKiBAcGFyYW0ge3t4OiBudW1iZXIsIHk6IG51bWJlcn19IG9yaWdpblxuICAgKiBAcmV0dXJucyB7dGhpc31cbiAgICovXG4gIGNvcHlBbmRSb3RhdGUgKGFuZ2xlLCBvcmlnaW4gPSB7IHg6IDAsIHk6IDAgfSkge1xuICAgIGNvbnN0IFRpbGVDbGFzcyA9IHRoaXMuY29uc3RydWN0b3JcbiAgICBjb25zdCBkYXRhID0gT2JqZWN0LmFzc2lnbihcbiAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuZ2V0TWFudWFsRGF0YVByb3BlcnRpZXMoKSxcbiAgICAgIENvb3JkSGVscGVyLnJvdGF0ZSh0aGlzLCBhbmdsZSwgb3JpZ2luKVxuICAgIClcbiAgICByZXR1cm4gbmV3IFRpbGVDbGFzcyhkYXRhKVxuICB9XG5cbiAgZ2V0RmluYWxUaWxlICgpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0Q29vcmQgKCkge1xuICAgIHJldHVybiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH1cbiAgfVxufTtcblxuVGlsZS5wcm9wZXJ0aWVzKHtcbiAgY2hpbGRyZW46IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuY29udGFpbmVyICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYWRqYWNlbnRUaWxlcy5mb3JFYWNoKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbGUuYWRqYWNlbnRUaWxlc1Byb3BlcnR5LmludmFsaWRhdGUoKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYWRqYWNlbnRUaWxlczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdGlvbikge1xuICAgICAgaWYgKGludmFsaWRhdGlvbi5wcm9wKHRoaXMuY29udGFpbmVyUHJvcGVydHkpKSB7XG4gICAgICAgIHJldHVybiBEaXJlY3Rpb24uYWRqYWNlbnRzLm1hcCgoZCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFJlbGF0aXZlVGlsZShkLngsIGQueSlcbiAgICAgICAgfSkuZmlsdGVyKCh0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHQgIT0gbnVsbFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgY29sbGVjdGlvbjogdHJ1ZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGlsZVJlZmVyZW5jZSA9IHJlcXVpcmUoJy4vVGlsZVJlZmVyZW5jZScpXG5cbmNsYXNzIFRpbGVDb250YWluZXIgZXh0ZW5kcyBFbGVtZW50IHtcbiAgX2FkZFRvQm9uZGFyaWVzICh0aWxlLCBib3VuZGFyaWVzKSB7XG4gICAgaWYgKChib3VuZGFyaWVzLnRvcCA9PSBudWxsKSB8fCB0aWxlLnkgPCBib3VuZGFyaWVzLnRvcCkge1xuICAgICAgYm91bmRhcmllcy50b3AgPSB0aWxlLnlcbiAgICB9XG4gICAgaWYgKChib3VuZGFyaWVzLmxlZnQgPT0gbnVsbCkgfHwgdGlsZS54IDwgYm91bmRhcmllcy5sZWZ0KSB7XG4gICAgICBib3VuZGFyaWVzLmxlZnQgPSB0aWxlLnhcbiAgICB9XG4gICAgaWYgKChib3VuZGFyaWVzLmJvdHRvbSA9PSBudWxsKSB8fCB0aWxlLnkgPiBib3VuZGFyaWVzLmJvdHRvbSkge1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSB0aWxlLnlcbiAgICB9XG4gICAgaWYgKChib3VuZGFyaWVzLnJpZ2h0ID09IG51bGwpIHx8IHRpbGUueCA+IGJvdW5kYXJpZXMucmlnaHQpIHtcbiAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSB0aWxlLnhcbiAgICB9XG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB0aGlzLmNvb3JkcyA9IHt9XG4gICAgdGhpcy50aWxlcyA9IFtdXG4gIH1cblxuICBhZGRUaWxlICh0aWxlKSB7XG4gICAgaWYgKCF0aGlzLnRpbGVzLmluY2x1ZGVzKHRpbGUpKSB7XG4gICAgICB0aGlzLnRpbGVzLnB1c2godGlsZSlcbiAgICAgIGlmICh0aGlzLmNvb3Jkc1t0aWxlLnhdID09IG51bGwpIHtcbiAgICAgICAgdGhpcy5jb29yZHNbdGlsZS54XSA9IHt9XG4gICAgICB9XG4gICAgICB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV0gPSB0aWxlXG4gICAgICBpZiAodGhpcy5vd25lcikge1xuICAgICAgICB0aWxlLmNvbnRhaW5lciA9IHRoaXNcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS5nZXR0ZXIuY2FsY3VsYXRlZCkge1xuICAgICAgICB0aGlzLl9hZGRUb0JvbmRhcmllcyh0aWxlLCB0aGlzLmJvdW5kYXJpZXNQcm9wZXJ0eS52YWx1ZSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlbW92ZVRpbGUgKHRpbGUpIHtcbiAgICB2YXIgaW5kZXhcbiAgICBpbmRleCA9IHRoaXMudGlsZXMuaW5kZXhPZih0aWxlKVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLnRpbGVzLnNwbGljZShpbmRleCwgMSlcbiAgICAgIGRlbGV0ZSB0aGlzLmNvb3Jkc1t0aWxlLnhdW3RpbGUueV1cbiAgICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICAgIHRpbGUuY29udGFpbmVyID0gbnVsbFxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYm91bmRhcmllc1Byb3BlcnR5LmdldHRlci5jYWxjdWxhdGVkKSB7XG4gICAgICAgIGlmICh0aGlzLmJvdW5kYXJpZXMudG9wID09PSB0aWxlLnkgfHwgdGhpcy5ib3VuZGFyaWVzLmJvdHRvbSA9PT0gdGlsZS55IHx8IHRoaXMuYm91bmRhcmllcy5sZWZ0ID09PSB0aWxlLnggfHwgdGhpcy5ib3VuZGFyaWVzLnJpZ2h0ID09PSB0aWxlLngpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ib3VuZGFyaWVzUHJvcGVydHkuaW52YWxpZGF0ZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZW1vdmVUaWxlQXQgKHgsIHkpIHtcbiAgICBjb25zdCB0aWxlID0gdGhpcy5nZXRUaWxlKHgsIHkpXG4gICAgaWYgKHRpbGUpIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbW92ZVRpbGUodGlsZSlcbiAgICB9XG4gIH1cblxuICBnZXRUaWxlICh4LCB5KSB7XG4gICAgdmFyIHJlZlxuICAgIGlmICgoKHJlZiA9IHRoaXMuY29vcmRzW3hdKSAhPSBudWxsID8gcmVmW3ldIDogbnVsbCkgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29vcmRzW3hdW3ldXG4gICAgfVxuICB9XG5cbiAgbG9hZE1hdHJpeCAobWF0cml4LCBvZmZzZXQgPSB7IHg6IDAsIHk6IDAgfSkge1xuICAgIHZhciBvcHRpb25zLCByb3csIHRpbGUsIHgsIHlcbiAgICBmb3IgKHkgaW4gbWF0cml4KSB7XG4gICAgICByb3cgPSBtYXRyaXhbeV1cbiAgICAgIGZvciAoeCBpbiByb3cpIHtcbiAgICAgICAgdGlsZSA9IHJvd1t4XVxuICAgICAgICBvcHRpb25zID0ge1xuICAgICAgICAgIHg6IHBhcnNlSW50KHgpICsgb2Zmc2V0LngsXG4gICAgICAgICAgeTogcGFyc2VJbnQoeSkgKyBvZmZzZXQueVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgdGlsZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRoaXMuYWRkVGlsZSh0aWxlKG9wdGlvbnMpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRpbGUueCA9IG9wdGlvbnMueFxuICAgICAgICAgIHRpbGUueSA9IG9wdGlvbnMueVxuICAgICAgICAgIHRoaXMuYWRkVGlsZSh0aWxlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZWR1Y2VNYXRyaXggKG1hdHJpeCwgaW5pdGFsVmFsdWUgPSBudWxsLCBvZmZzZXQgPSB7IHg6IDAsIHk6IDAgfSkge1xuICAgIGxldCB2YWx1ZSA9IGluaXRhbFZhbHVlXG4gICAgZm9yIChjb25zdCB5IGluIG1hdHJpeCkge1xuICAgICAgY29uc3Qgcm93ID0gbWF0cml4W3ldXG4gICAgICBmb3IgKGNvbnN0IHggaW4gcm93KSB7XG4gICAgICAgIGNvbnN0IGZuID0gcm93W3hdXG4gICAgICAgIGNvbnN0IHBvcyA9IHtcbiAgICAgICAgICB4OiBwYXJzZUludCh4KSArIG9mZnNldC54LFxuICAgICAgICAgIHk6IHBhcnNlSW50KHkpICsgb2Zmc2V0LnlcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IGZuKHZhbHVlLCB0aGlzLmdldFRpbGUocG9zLngsIHBvcy55KSwgcG9zKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGluUmFuZ2UgKHRpbGUsIHJhbmdlKSB7XG4gICAgdmFyIGZvdW5kLCBpLCBqLCByZWYsIHJlZjEsIHJlZjIsIHJlZjMsIHRpbGVzLCB4LCB5XG4gICAgdGlsZXMgPSBbXVxuICAgIHJhbmdlLS1cbiAgICBmb3IgKHggPSBpID0gcmVmID0gdGlsZS54IC0gcmFuZ2UsIHJlZjEgPSB0aWxlLnggKyByYW5nZTsgKHJlZiA8PSByZWYxID8gaSA8PSByZWYxIDogaSA+PSByZWYxKTsgeCA9IHJlZiA8PSByZWYxID8gKytpIDogLS1pKSB7XG4gICAgICBmb3IgKHkgPSBqID0gcmVmMiA9IHRpbGUueSAtIHJhbmdlLCByZWYzID0gdGlsZS55ICsgcmFuZ2U7IChyZWYyIDw9IHJlZjMgPyBqIDw9IHJlZjMgOiBqID49IHJlZjMpOyB5ID0gcmVmMiA8PSByZWYzID8gKytqIDogLS1qKSB7XG4gICAgICAgIGlmIChNYXRoLnNxcnQoKHggLSB0aWxlLngpICogKHggLSB0aWxlLngpICsgKHkgLSB0aWxlLnkpICogKHkgLSB0aWxlLnkpKSA8PSByYW5nZSAmJiAoKGZvdW5kID0gdGhpcy5nZXRUaWxlKHgsIHkpKSAhPSBudWxsKSkge1xuICAgICAgICAgIHRpbGVzLnB1c2goZm91bmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRpbGVzXG4gIH1cblxuICBhbGxUaWxlcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZXMuc2xpY2UoKVxuICB9XG5cbiAgY2xlYXJBbGwgKCkge1xuICAgIHZhciBpLCBsZW4sIHJlZiwgdGlsZVxuICAgIGlmICh0aGlzLm93bmVyKSB7XG4gICAgICByZWYgPSB0aGlzLnRpbGVzXG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdGlsZSA9IHJlZltpXVxuICAgICAgICB0aWxlLmNvbnRhaW5lciA9IG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5jb29yZHMgPSB7fVxuICAgIHRoaXMudGlsZXMgPSBbXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjbG9zZXN0IChvcmlnaW5UaWxlLCBmaWx0ZXIpIHtcbiAgICB2YXIgY2FuZGlkYXRlcywgZ2V0U2NvcmVcbiAgICBnZXRTY29yZSA9IGZ1bmN0aW9uIChjYW5kaWRhdGUpIHtcbiAgICAgIGlmIChjYW5kaWRhdGUuc2NvcmUgPT0gbnVsbCkge1xuICAgICAgICBjYW5kaWRhdGUuc2NvcmUgPSBjYW5kaWRhdGUuZ2V0RmluYWxUaWxlKCkuZGlzdChvcmlnaW5UaWxlKS5sZW5ndGhcbiAgICAgIH1cbiAgICAgIHJldHVybiBjYW5kaWRhdGUuc2NvcmVcbiAgICB9XG4gICAgY2FuZGlkYXRlcyA9IHRoaXMudGlsZXMuZmlsdGVyKGZpbHRlcikubWFwKCh0KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFRpbGVSZWZlcmVuY2UodClcbiAgICB9KVxuICAgIGNhbmRpZGF0ZXMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgcmV0dXJuIGdldFNjb3JlKGEpIC0gZ2V0U2NvcmUoYilcbiAgICB9KVxuICAgIGlmIChjYW5kaWRhdGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBjYW5kaWRhdGVzWzBdLnRpbGVcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cblxuICBjb3B5ICgpIHtcbiAgICB2YXIgb3V0XG4gICAgb3V0ID0gbmV3IFRpbGVDb250YWluZXIoKVxuICAgIG91dC5jb29yZHMgPSB0aGlzLmNvb3Jkc1xuICAgIG91dC50aWxlcyA9IHRoaXMudGlsZXNcbiAgICBvdXQub3duZXIgPSBmYWxzZVxuICAgIHJldHVybiBvdXRcbiAgfVxuXG4gIG1lcmdlIChjdG4sIG1lcmdlRm4sIGFzT3duZXIgPSBmYWxzZSkge1xuICAgIHZhciBvdXQsIHRtcFxuICAgIG91dCA9IG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICBvdXQub3duZXIgPSBhc093bmVyXG4gICAgdG1wID0gY3RuLmNvcHkoKVxuICAgIHRoaXMudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZUEpIHtcbiAgICAgIHZhciBtZXJnZWRUaWxlLCB0aWxlQlxuICAgICAgdGlsZUIgPSB0bXAuZ2V0VGlsZSh0aWxlQS54LCB0aWxlQS55KVxuICAgICAgaWYgKHRpbGVCKSB7XG4gICAgICAgIHRtcC5yZW1vdmVUaWxlKHRpbGVCKVxuICAgICAgfVxuICAgICAgbWVyZ2VkVGlsZSA9IG1lcmdlRm4odGlsZUEsIHRpbGVCKVxuICAgICAgaWYgKG1lcmdlZFRpbGUpIHtcbiAgICAgICAgcmV0dXJuIG91dC5hZGRUaWxlKG1lcmdlZFRpbGUpXG4gICAgICB9XG4gICAgfSlcbiAgICB0bXAudGlsZXMuZm9yRWFjaChmdW5jdGlvbiAodGlsZUIpIHtcbiAgICAgIHZhciBtZXJnZWRUaWxlXG4gICAgICBtZXJnZWRUaWxlID0gbWVyZ2VGbihudWxsLCB0aWxlQilcbiAgICAgIGlmIChtZXJnZWRUaWxlKSB7XG4gICAgICAgIHJldHVybiBvdXQuYWRkVGlsZShtZXJnZWRUaWxlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG91dFxuICB9XG59O1xuXG5UaWxlQ29udGFpbmVyLnByb3BlcnRpZXMoe1xuICBvd25lcjoge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgYm91bmRhcmllczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJvdW5kYXJpZXNcbiAgICAgIGJvdW5kYXJpZXMgPSB7XG4gICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgbGVmdDogbnVsbCxcbiAgICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgICByaWdodDogbnVsbFxuICAgICAgfVxuICAgICAgdGhpcy50aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hZGRUb0JvbmRhcmllcyh0aWxlLCBib3VuZGFyaWVzKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBib3VuZGFyaWVzXG4gICAgfSxcbiAgICBvdXRwdXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVDb250YWluZXJcbiIsImNsYXNzIFRpbGVSZWZlcmVuY2Uge1xuICBjb25zdHJ1Y3RvciAodGlsZSkge1xuICAgIHRoaXMudGlsZSA9IHRpbGVcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICB4OiB7XG4gICAgICAgIGdldDogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldEZpbmFsVGlsZSgpLnhcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHk6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RmluYWxUaWxlKCkueVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGdldEZpbmFsVGlsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZS5nZXRGaW5hbFRpbGUoKVxuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IFRpbGVSZWZlcmVuY2VcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuXG5jbGFzcyBUaWxlZCBleHRlbmRzIEVsZW1lbnQge1xuICBwdXRPblJhbmRvbVRpbGUgKHRpbGVzKSB7XG4gICAgdmFyIGZvdW5kXG4gICAgZm91bmQgPSB0aGlzLmdldFJhbmRvbVZhbGlkVGlsZSh0aWxlcylcbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIHRoaXMudGlsZSA9IGZvdW5kXG4gICAgfVxuICB9XG5cbiAgZ2V0UmFuZG9tVmFsaWRUaWxlICh0aWxlcywgdmFsaWRhdG9yID0gdGhpcy5jYW5Hb09uVGlsZS5iaW5kKHRoaXMpKSB7XG4gICAgdmFyIGNhbmRpZGF0ZSwgcG9zLCByZW1haW5pbmdcbiAgICByZW1haW5pbmcgPSB0aWxlcy5zbGljZSgpXG4gICAgd2hpbGUgKHJlbWFpbmluZy5sZW5ndGggPiAwKSB7XG4gICAgICBwb3MgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZW1haW5pbmcubGVuZ3RoKVxuICAgICAgY2FuZGlkYXRlID0gcmVtYWluaW5nLnNwbGljZShwb3MsIDEpWzBdXG4gICAgICBpZiAodmFsaWRhdG9yKGNhbmRpZGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNhbmRpZGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9XG5cbiAgY2FuR29PblRpbGUgKHRpbGUpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZ2V0RmluYWxUaWxlICgpIHtcbiAgICByZXR1cm4gdGhpcy50aWxlLmdldEZpbmFsVGlsZSgpXG4gIH1cbn07XG5cblRpbGVkLnByb3BlcnRpZXMoe1xuICB0aWxlOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgICBvbGQucmVtb3ZlQ2hpbGQodGhpcylcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZS5hZGRDaGlsZCh0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgb2Zmc2V0WDoge1xuICAgIGRlZmF1bHQ6IDBcbiAgfSxcbiAgb2Zmc2V0WToge1xuICAgIGRlZmF1bHQ6IDBcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBUaWxlZFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIENvb3JkSGVscGVyOiByZXF1aXJlKCcuL0Nvb3JkSGVscGVyJyksXG4gIERpcmVjdGlvbjogcmVxdWlyZSgnLi9EaXJlY3Rpb24nKSxcbiAgVGlsZTogcmVxdWlyZSgnLi9UaWxlJyksXG4gIFRpbGVDb250YWluZXI6IHJlcXVpcmUoJy4vVGlsZUNvbnRhaW5lcicpLFxuICBUaWxlUmVmZXJlbmNlOiByZXF1aXJlKCcuL1RpbGVSZWZlcmVuY2UnKSxcbiAgVGlsZWQ6IHJlcXVpcmUoJy4vVGlsZWQnKVxufVxuIiwiKGZ1bmN0aW9uKGRlZmluaXRpb24pe3ZhciBUaW1pbmc9ZGVmaW5pdGlvbih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCI/UGFyYWxsZWxpbzp0aGlzLlBhcmFsbGVsaW8pO1RpbWluZy5kZWZpbml0aW9uPWRlZmluaXRpb247aWYodHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCImJm1vZHVsZSE9PW51bGwpe21vZHVsZS5leHBvcnRzPVRpbWluZzt9ZWxzZXtpZih0eXBlb2YgUGFyYWxsZWxpbyE9PVwidW5kZWZpbmVkXCImJlBhcmFsbGVsaW8hPT1udWxsKXtQYXJhbGxlbGlvLlRpbWluZz1UaW1pbmc7fWVsc2V7aWYodGhpcy5QYXJhbGxlbGlvPT1udWxsKXt0aGlzLlBhcmFsbGVsaW89e307fXRoaXMuUGFyYWxsZWxpby5UaW1pbmc9VGltaW5nO319fSkoZnVuY3Rpb24oZGVwZW5kZW5jaWVzKXtpZihkZXBlbmRlbmNpZXM9PW51bGwpe2RlcGVuZGVuY2llcz17fTt9XG52YXIgRWxlbWVudCA9IGRlcGVuZGVuY2llcy5oYXNPd25Qcm9wZXJ0eShcIkVsZW1lbnRcIikgPyBkZXBlbmRlbmNpZXMuRWxlbWVudCA6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xudmFyIFRpbWluZztcblRpbWluZyA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgVGltaW5nIGV4dGVuZHMgRWxlbWVudCB7XG4gICAgdG9nZ2xlKHZhbCkge1xuICAgICAgaWYgKHR5cGVvZiB2YWwgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFsID0gIXRoaXMucnVubmluZztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnJ1bm5pbmcgPSB2YWw7XG4gICAgfVxuXG4gICAgc2V0VGltZW91dChjYWxsYmFjaywgdGltZSkge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlRpbWVyKHtcbiAgICAgICAgdGltZTogdGltZSxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxuICAgICAgICB0aW1pbmc6IHRoaXNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEludGVydmFsKGNhbGxiYWNrLCB0aW1lKSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuVGltZXIoe1xuICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2ssXG4gICAgICAgIHJlcGVhdDogdHJ1ZSxcbiAgICAgICAgdGltaW5nOiB0aGlzXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBwYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgdW5wYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZSh0cnVlKTtcbiAgICB9XG5cbiAgfTtcblxuICBUaW1pbmcucHJvcGVydGllcyh7XG4gICAgcnVubmluZzoge1xuICAgICAgZGVmYXVsdDogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFRpbWluZztcblxufSkuY2FsbCh0aGlzKTtcblxuVGltaW5nLlRpbWVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBUaW1lciBleHRlbmRzIEVsZW1lbnQge1xuICAgIHRvZ2dsZSh2YWwpIHtcbiAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhbCA9ICF0aGlzLnBhdXNlZDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnBhdXNlZCA9IHZhbDtcbiAgICB9XG5cbiAgICBpbW1lZGlhdGVJbnZhbGlkYXRpb24oKSB7XG4gICAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWRUaW1lUHJvcGVydHkuaW52YWxpZGF0ZSh7XG4gICAgICAgICAgcHJldmVudEltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICBvcmlnaW46IHRoaXNcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2UoKSB7XG4gICAgICByZXR1cm4gdGhpcy50b2dnbGUodHJ1ZSk7XG4gICAgfVxuXG4gICAgdW5wYXVzZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLnRvZ2dsZShmYWxzZSk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY29uc3RydWN0b3Iubm93KCk7XG4gICAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWQgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgdGhpcy5yZW1haW5pbmdUaW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLmlkID0gc2V0VGltZW91dCh0aGlzLnRpY2suYmluZCh0aGlzKSwgdGhpcy5yZW1haW5pbmdUaW1lKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgdGhpcy5yZW1haW5pbmdUaW1lID0gdGhpcy50aW1lIC0gKHRoaXMuY29uc3RydWN0b3Iubm93KCkgLSB0aGlzLnN0YXJ0VGltZSk7XG4gICAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwodGhpcy5pZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KHRoaXMuaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBub3coKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdyAhPT0gbnVsbCA/IChyZWYgPSB3aW5kb3cucGVyZm9ybWFuY2UpICE9IG51bGwgPyByZWYubm93IDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICB9IGVsc2UgaWYgKCh0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzICE9PSBudWxsID8gcHJvY2Vzcy51cHRpbWUgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHByb2Nlc3MudXB0aW1lKCkgKiAxMDAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERhdGUubm93KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgIHRoaXMucmVwZXRpdGlvbiArPSAxO1xuICAgICAgaWYgKHRoaXMuY2FsbGJhY2sgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNhbGxiYWNrKCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5vdygpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdUaW1lID0gdGhpcy50aW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1RpbWUgPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICBpZiAodGhpcy5yZXBlYXQpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmlkKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmlkKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHRoaXMucHJvcGVydGllc01hbmFnZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICB9O1xuXG4gIFRpbWVyLnByb3BlcnRpZXMoe1xuICAgIHRpbWU6IHtcbiAgICAgIGRlZmF1bHQ6IDEwMDBcbiAgICB9LFxuICAgIHBhdXNlZDoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHJ1bm5pbmc6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuICFpbnZhbGlkYXRvci5wcm9wKHRoaXMucGF1c2VkUHJvcGVydHkpICYmIGludmFsaWRhdG9yLnByb3BQYXRoKCd0aW1pbmcucnVubmluZycpICE9PSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKHZhbCwgb2xkKSB7XG4gICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpO1xuICAgICAgICB9IGVsc2UgaWYgKG9sZCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdGltaW5nOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfSxcbiAgICBlbGFwc2VkVGltZToge1xuICAgICAgY2FsY3VsOiBmdW5jdGlvbihpbnZhbGlkYXRvcikge1xuICAgICAgICBpZiAoaW52YWxpZGF0b3IucHJvcCh0aGlzLnJ1bm5pbmdQcm9wZXJ0eSkpIHtcbiAgICAgICAgICBzZXRJbW1lZGlhdGUoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW1tZWRpYXRlSW52YWxpZGF0aW9uKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3Iubm93KCkgLSB0aGlzLnN0YXJ0VGltZSArIHRoaXMudGltZSAtIHRoaXMucmVtYWluaW5nVGltZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50aW1lIC0gdGhpcy5yZW1haW5pbmdUaW1lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgIHRoaXMucmVtYWluaW5nVGltZSA9IHRoaXMudGltZSAtIHZhbDtcbiAgICAgICAgICBpZiAodGhpcy5yZW1haW5pbmdUaW1lIDw9IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRpY2soKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5yZW1haW5pbmdUaW1lID0gdGhpcy50aW1lIC0gdmFsO1xuICAgICAgICAgIHJldHVybiB0aGlzLmVsYXBzZWRUaW1lUHJvcGVydHkuaW52YWxpZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBwcmM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy5lbGFwc2VkVGltZVByb3BlcnR5KSAvIHRoaXMudGltZTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGFwc2VkVGltZSA9IHRoaXMudGltZSAqIHZhbDtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlbWFpbmluZ1RpbWU6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHJlcGVhdDoge1xuICAgICAgZGVmYXVsdDogZmFsc2VcbiAgICB9LFxuICAgIHJlcGV0aXRpb246IHtcbiAgICAgIGRlZmF1bHQ6IDBcbiAgICB9LFxuICAgIGNhbGxiYWNrOiB7XG4gICAgICBkZWZhdWx0OiBudWxsXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gVGltZXI7XG5cbn0pLmNhbGwodGhpcyk7XG5cbnJldHVybihUaW1pbmcpO30pOyIsInZhciBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyLCBDb25uZWN0ZWQsIEVsZW1lbnQsIFNpZ25hbE9wZXJhdGlvbjtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5TaWduYWxPcGVyYXRpb24gPSByZXF1aXJlKCcuL1NpZ25hbE9wZXJhdGlvbicpO1xuXG5Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLkNvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gQ29ubmVjdGVkID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBDb25uZWN0ZWQgZXh0ZW5kcyBFbGVtZW50IHtcbiAgICBjYW5Db25uZWN0VG8odGFyZ2V0KSB7XG4gICAgICByZXR1cm4gdHlwZW9mIHRhcmdldC5hZGRTaWduYWwgPT09IFwiZnVuY3Rpb25cIjtcbiAgICB9XG5cbiAgICBhY2NlcHRTaWduYWwoc2lnbmFsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkFkZENvbm5lY3Rpb24oY29ubikge31cblxuICAgIG9uUmVtb3ZlQ29ubmVjdGlvbihjb25uKSB7fVxuXG4gICAgb25OZXdTaWduYWxUeXBlKHNpZ25hbCkge31cblxuICAgIG9uQWRkU2lnbmFsKHNpZ25hbCwgb3ApIHt9XG5cbiAgICBvblJlbW92ZVNpZ25hbChzaWduYWwsIG9wKSB7fVxuXG4gICAgb25SZW1vdmVTaWduYWxUeXBlKHNpZ25hbCwgb3ApIHt9XG5cbiAgICBvblJlcGxhY2VTaWduYWwob2xkU2lnbmFsLCBuZXdTaWduYWwsIG9wKSB7fVxuXG4gICAgY29udGFpbnNTaWduYWwoc2lnbmFsLCBjaGVja0xhc3QgPSBmYWxzZSwgY2hlY2tPcmlnaW4pIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hbHMuZmluZChmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBjLm1hdGNoKHNpZ25hbCwgY2hlY2tMYXN0LCBjaGVja09yaWdpbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIGF1dG9TdGFydDtcbiAgICAgIGlmICghKG9wICE9IG51bGwgPyBvcC5maW5kTGltaXRlcih0aGlzKSA6IHZvaWQgMCkpIHtcbiAgICAgICAgaWYgKCFvcCkge1xuICAgICAgICAgIG9wID0gbmV3IFNpZ25hbE9wZXJhdGlvbigpO1xuICAgICAgICAgIGF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgb3AuYWRkT3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICB2YXIgc2ltaWxhcjtcbiAgICAgICAgICBpZiAoIXRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsLCB0cnVlKSAmJiB0aGlzLmFjY2VwdFNpZ25hbChzaWduYWwpKSB7XG4gICAgICAgICAgICBzaW1pbGFyID0gdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwpO1xuICAgICAgICAgICAgdGhpcy5zaWduYWxzLnB1c2goc2lnbmFsKTtcbiAgICAgICAgICAgIHRoaXMub25BZGRTaWduYWwoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICBpZiAoIXNpbWlsYXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25OZXdTaWduYWxUeXBlKHNpZ25hbCwgb3ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChhdXRvU3RhcnQpIHtcbiAgICAgICAgICBvcC5zdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2lnbmFsO1xuICAgIH1cblxuICAgIHJlbW92ZVNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgYXV0b1N0YXJ0O1xuICAgICAgaWYgKCEob3AgIT0gbnVsbCA/IG9wLmZpbmRMaW1pdGVyKHRoaXMpIDogdm9pZCAwKSkge1xuICAgICAgICBpZiAoIW9wKSB7XG4gICAgICAgICAgb3AgPSBuZXcgU2lnbmFsT3BlcmF0aW9uO1xuICAgICAgICAgIGF1dG9TdGFydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgb3AuYWRkT3BlcmF0aW9uKCgpID0+IHtcbiAgICAgICAgICB2YXIgZXhpc3Rpbmc7XG4gICAgICAgICAgaWYgKChleGlzdGluZyA9IHRoaXMuY29udGFpbnNTaWduYWwoc2lnbmFsLCB0cnVlKSkgJiYgdGhpcy5hY2NlcHRTaWduYWwoc2lnbmFsKSkge1xuICAgICAgICAgICAgdGhpcy5zaWduYWxzLnNwbGljZSh0aGlzLnNpZ25hbHMuaW5kZXhPZihleGlzdGluZyksIDEpO1xuICAgICAgICAgICAgdGhpcy5vblJlbW92ZVNpZ25hbChzaWduYWwsIG9wKTtcbiAgICAgICAgICAgIG9wLmFkZE9wZXJhdGlvbigoKSA9PiB7XG4gICAgICAgICAgICAgIHZhciBzaW1pbGFyO1xuICAgICAgICAgICAgICBzaW1pbGFyID0gdGhpcy5jb250YWluc1NpZ25hbChzaWduYWwpO1xuICAgICAgICAgICAgICBpZiAoc2ltaWxhcikge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uUmVwbGFjZVNpZ25hbChzaWduYWwsIHNpbWlsYXIsIG9wKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vblJlbW92ZVNpZ25hbFR5cGUoc2lnbmFsLCBvcCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc3RlcEJ5U3RlcCkge1xuICAgICAgICAgICAgcmV0dXJuIG9wLnN0ZXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXV0b1N0YXJ0KSB7XG4gICAgICAgICAgcmV0dXJuIG9wLnN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBwcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCkge1xuICAgICAgaWYgKHNpZ25hbC5sYXN0ID09PSB0aGlzKSB7XG4gICAgICAgIHJldHVybiBzaWduYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2lnbmFsLndpdGhMYXN0KHRoaXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrRm9yd2FyZFdhdGNoZXIoKSB7XG4gICAgICBpZiAoIXRoaXMuZm9yd2FyZFdhdGNoZXIpIHtcbiAgICAgICAgdGhpcy5mb3J3YXJkV2F0Y2hlciA9IG5ldyBDb2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyKHtcbiAgICAgICAgICBzY29wZTogdGhpcyxcbiAgICAgICAgICBwcm9wZXJ0eTogJ291dHB1dHMnLFxuICAgICAgICAgIG9uQWRkZWQ6IGZ1bmN0aW9uKG91dHB1dCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9yd2FyZFNpZ25hbFRvKHNpZ25hbCwgb3V0cHV0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25SZW1vdmVkOiBmdW5jdGlvbihvdXRwdXQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvcndhcmRlZFNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0b3BGb3J3YXJkZWRTaWduYWxUbyhzaWduYWwsIG91dHB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcy5mb3J3YXJkV2F0Y2hlci5iaW5kKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yd2FyZFNpZ25hbChzaWduYWwsIG9wKSB7XG4gICAgICB2YXIgbmV4dDtcbiAgICAgIHRoaXMuZm9yd2FyZGVkU2lnbmFscy5hZGQoc2lnbmFsKTtcbiAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgIHRoaXMub3V0cHV0cy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm4pIHtcbiAgICAgICAgaWYgKHNpZ25hbC5sYXN0ICE9PSBjb25uKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpcy5jaGVja0ZvcndhcmRXYXRjaGVyKCk7XG4gICAgfVxuXG4gICAgZm9yd2FyZEFsbFNpZ25hbHNUbyhjb25uLCBvcCkge1xuICAgICAgcmV0dXJuIHRoaXMuc2lnbmFscy5mb3JFYWNoKChzaWduYWwpID0+IHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIG5leHQgPSB0aGlzLnByZXBGb3J3YXJkZWRTaWduYWwoc2lnbmFsKTtcbiAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BGb3J3YXJkZWRTaWduYWwoc2lnbmFsLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICB0aGlzLmZvcndhcmRlZFNpZ25hbHMucmVtb3ZlKHNpZ25hbCk7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICByZXR1cm4gdGhpcy5vdXRwdXRzLmZvckVhY2goZnVuY3Rpb24oY29ubikge1xuICAgICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgICByZXR1cm4gY29ubi5yZW1vdmVTaWduYWwobmV4dCwgb3ApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wQWxsRm9yd2FyZGVkU2lnbmFsVG8oY29ubiwgb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLnNpZ25hbHMuZm9yRWFjaCgoc2lnbmFsKSA9PiB7XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICAgIHJldHVybiBjb25uLnJlbW92ZVNpZ25hbChuZXh0LCBvcCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3J3YXJkU2lnbmFsVG8oc2lnbmFsLCBjb25uLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbm4uYWRkU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdG9wRm9yd2FyZGVkU2lnbmFsVG8oc2lnbmFsLCBjb25uLCBvcCkge1xuICAgICAgdmFyIG5leHQ7XG4gICAgICBuZXh0ID0gdGhpcy5wcmVwRm9yd2FyZGVkU2lnbmFsKHNpZ25hbCk7XG4gICAgICBpZiAoc2lnbmFsLmxhc3QgIT09IGNvbm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbm4ucmVtb3ZlU2lnbmFsKG5leHQsIG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfTtcblxuICBDb25uZWN0ZWQucHJvcGVydGllcyh7XG4gICAgc2lnbmFsczoge1xuICAgICAgY29sbGVjdGlvbjogdHJ1ZVxuICAgIH0sXG4gICAgaW5wdXRzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBvdXRwdXRzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfSxcbiAgICBmb3J3YXJkZWRTaWduYWxzOiB7XG4gICAgICBjb2xsZWN0aW9uOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gQ29ubmVjdGVkO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIEVsZW1lbnQsIFNpZ25hbDtcblxuRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNpZ25hbCA9IGNsYXNzIFNpZ25hbCBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcihvcmlnaW4sIHR5cGUgPSAnc2lnbmFsJywgZXhjbHVzaXZlID0gZmFsc2UpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMub3JpZ2luID0gb3JpZ2luO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgdGhpcy5leGNsdXNpdmUgPSBleGNsdXNpdmU7XG4gICAgdGhpcy5sYXN0ID0gdGhpcy5vcmlnaW47XG4gIH1cblxuICB3aXRoTGFzdChsYXN0KSB7XG4gICAgdmFyIHNpZ25hbDtcbiAgICBzaWduYWwgPSBuZXcgdGhpcy5fX3Byb3RvX18uY29uc3RydWN0b3IodGhpcy5vcmlnaW4sIHRoaXMudHlwZSwgdGhpcy5leGNsdXNpdmUpO1xuICAgIHNpZ25hbC5sYXN0ID0gbGFzdDtcbiAgICByZXR1cm4gc2lnbmFsO1xuICB9XG5cbiAgY29weSgpIHtcbiAgICB2YXIgc2lnbmFsO1xuICAgIHNpZ25hbCA9IG5ldyB0aGlzLl9fcHJvdG9fXy5jb25zdHJ1Y3Rvcih0aGlzLm9yaWdpbiwgdGhpcy50eXBlLCB0aGlzLmV4Y2x1c2l2ZSk7XG4gICAgc2lnbmFsLmxhc3QgPSB0aGlzLmxhc3Q7XG4gICAgcmV0dXJuIHNpZ25hbDtcbiAgfVxuXG4gIG1hdGNoKHNpZ25hbCwgY2hlY2tMYXN0ID0gZmFsc2UsIGNoZWNrT3JpZ2luID0gdGhpcy5leGNsdXNpdmUpIHtcbiAgICByZXR1cm4gKCFjaGVja0xhc3QgfHwgc2lnbmFsLmxhc3QgPT09IHRoaXMubGFzdCkgJiYgKGNoZWNrT3JpZ2luIHx8IHNpZ25hbC5vcmlnaW4gPT09IHRoaXMub3JpZ2luKSAmJiBzaWduYWwudHlwZSA9PT0gdGhpcy50eXBlO1xuICB9XG5cbn07XG4iLCJ2YXIgRWxlbWVudCwgU2lnbmFsT3BlcmF0aW9uO1xuXG5FbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnQ7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFsT3BlcmF0aW9uID0gY2xhc3MgU2lnbmFsT3BlcmF0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIHRoaXMubGltaXRlcnMgPSBbXTtcbiAgfVxuXG4gIGFkZE9wZXJhdGlvbihmdW5jdCwgcHJpb3JpdHkgPSAxKSB7XG4gICAgaWYgKHByaW9yaXR5KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS51bnNoaWZ0KGZ1bmN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaChmdW5jdCk7XG4gICAgfVxuICB9XG5cbiAgYWRkTGltaXRlcihjb25uZWN0ZWQpIHtcbiAgICBpZiAoIXRoaXMuZmluZExpbWl0ZXIoY29ubmVjdGVkKSkge1xuICAgICAgcmV0dXJuIHRoaXMubGltaXRlcnMucHVzaChjb25uZWN0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmRMaW1pdGVyKGNvbm5lY3RlZCkge1xuICAgIHJldHVybiB0aGlzLmxpbWl0ZXJzLmluZGV4T2YoY29ubmVjdGVkKSA+IC0xO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdmFyIHJlc3VsdHM7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIHdoaWxlICh0aGlzLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuc3RlcCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH1cblxuICBzdGVwKCkge1xuICAgIHZhciBmdW5jdDtcbiAgICBpZiAodGhpcy5xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGlzLmRvbmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZnVuY3QgPSB0aGlzLnF1ZXVlLnNoaWZ0KGZ1bmN0KTtcbiAgICAgIHJldHVybiBmdW5jdCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBkb25lKCkge31cblxufTtcbiIsInZhciBDb25uZWN0ZWQsIFNpZ25hbCwgU2lnbmFsT3BlcmF0aW9uLCBTaWduYWxTb3VyY2U7XG5cbkNvbm5lY3RlZCA9IHJlcXVpcmUoJy4vQ29ubmVjdGVkJyk7XG5cblNpZ25hbCA9IHJlcXVpcmUoJy4vU2lnbmFsJyk7XG5cblNpZ25hbE9wZXJhdGlvbiA9IHJlcXVpcmUoJy4vU2lnbmFsT3BlcmF0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gU2lnbmFsU291cmNlID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBTaWduYWxTb3VyY2UgZXh0ZW5kcyBDb25uZWN0ZWQge307XG5cbiAgU2lnbmFsU291cmNlLnByb3BlcnRpZXMoe1xuICAgIGFjdGl2YXRlZDoge1xuICAgICAgY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wO1xuICAgICAgICBvcCA9IG5ldyBTaWduYWxPcGVyYXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVkKSB7XG4gICAgICAgICAgdGhpcy5mb3J3YXJkU2lnbmFsKHRoaXMuc2lnbmFsLCBvcCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdG9wRm9yd2FyZGVkU2lnbmFsKHRoaXMuc2lnbmFsLCBvcCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9wLnN0YXJ0KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzaWduYWw6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2lnbmFsKHRoaXMsICdwb3dlcicsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIFNpZ25hbFNvdXJjZTtcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBDb25uZWN0ZWQsIFN3aXRjaDtcblxuQ29ubmVjdGVkID0gcmVxdWlyZSgnLi9Db25uZWN0ZWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTd2l0Y2ggPSBjbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDb25uZWN0ZWQge307XG4iLCJ2YXIgQ29ubmVjdGVkLCBEaXJlY3Rpb24sIFRpbGVkLCBXaXJlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZjtcblxuVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWQ7XG5cbkRpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb247XG5cbkNvbm5lY3RlZCA9IHJlcXVpcmUoJy4vQ29ubmVjdGVkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gV2lyZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgV2lyZSBleHRlbmRzIFRpbGVkIHtcbiAgICBjb25zdHJ1Y3Rvcih3aXJlVHlwZSA9ICdyZWQnKSB7XG4gICAgICBzdXBlcigpO1xuICAgICAgdGhpcy53aXJlVHlwZSA9IHdpcmVUeXBlO1xuICAgIH1cblxuICAgIGZpbmREaXJlY3Rpb25zVG8oY29ubikge1xuICAgICAgdmFyIGRpcmVjdGlvbnM7XG4gICAgICBkaXJlY3Rpb25zID0gY29ubi50aWxlcyAhPSBudWxsID8gY29ubi50aWxlcy5tYXAoKHRpbGUpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGlsZS5maW5kRGlyZWN0aW9uT2YodGlsZSk7XG4gICAgICB9KSA6IFt0aGlzLnRpbGUuZmluZERpcmVjdGlvbk9mKGNvbm4pXTtcbiAgICAgIHJldHVybiBkaXJlY3Rpb25zLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBkICE9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjYW5Db25uZWN0VG8odGFyZ2V0KSB7XG4gICAgICByZXR1cm4gQ29ubmVjdGVkLnByb3RvdHlwZS5jYW5Db25uZWN0VG8uY2FsbCh0aGlzLCB0YXJnZXQpICYmICgodGFyZ2V0LndpcmVUeXBlID09IG51bGwpIHx8IHRhcmdldC53aXJlVHlwZSA9PT0gdGhpcy53aXJlVHlwZSk7XG4gICAgfVxuXG4gICAgb25OZXdTaWduYWxUeXBlKHNpZ25hbCwgb3ApIHtcbiAgICAgIHJldHVybiB0aGlzLmZvcndhcmRTaWduYWwoc2lnbmFsLCBvcCk7XG4gICAgfVxuXG4gIH07XG5cbiAgV2lyZS5leHRlbmQoQ29ubmVjdGVkKTtcblxuICBXaXJlLnByb3BlcnRpZXMoe1xuICAgIG91dHB1dHM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0aW9uKSB7XG4gICAgICAgIHZhciBwYXJlbnQ7XG4gICAgICAgIHBhcmVudCA9IGludmFsaWRhdGlvbi5wcm9wKHRoaXMudGlsZVByb3BlcnR5KTtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIHJldHVybiBpbnZhbGlkYXRpb24ucHJvcChwYXJlbnQuYWRqYWNlbnRUaWxlc1Byb3BlcnR5KS5yZWR1Y2UoKHJlcywgdGlsZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHJlcy5jb25jYXQoaW52YWxpZGF0aW9uLnByb3AodGlsZS5jaGlsZHJlblByb3BlcnR5KS5maWx0ZXIoKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbkNvbm5lY3RUbyhjaGlsZCk7XG4gICAgICAgICAgICB9KS50b0FycmF5KCkpO1xuICAgICAgICAgIH0sIFtdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbm5lY3RlZERpcmVjdGlvbnM6IHtcbiAgICAgIGNhbGN1bDogZnVuY3Rpb24oaW52YWxpZGF0aW9uKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRpb24ucHJvcCh0aGlzLm91dHB1dHNQcm9wZXJ0eSkucmVkdWNlKChvdXQsIGNvbm4pID0+IHtcbiAgICAgICAgICB0aGlzLmZpbmREaXJlY3Rpb25zVG8oY29ubikuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXhPZi5jYWxsKG91dCwgZCkgPCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBvdXQucHVzaChkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gb3V0O1xuICAgICAgICB9LCBbXSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gV2lyZTtcblxufSkuY2FsbCh0aGlzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBcIkNvbm5lY3RlZFwiOiByZXF1aXJlKFwiLi9Db25uZWN0ZWRcIiksXG4gIFwiU2lnbmFsXCI6IHJlcXVpcmUoXCIuL1NpZ25hbFwiKSxcbiAgXCJTaWduYWxPcGVyYXRpb25cIjogcmVxdWlyZShcIi4vU2lnbmFsT3BlcmF0aW9uXCIpLFxuICBcIlNpZ25hbFNvdXJjZVwiOiByZXF1aXJlKFwiLi9TaWduYWxTb3VyY2VcIiksXG4gIFwiU3dpdGNoXCI6IHJlcXVpcmUoXCIuL1N3aXRjaFwiKSxcbiAgXCJXaXJlXCI6IHJlcXVpcmUoXCIuL1dpcmVcIiksXG59IiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlXG5cbmNsYXNzIEFpcmxvY2sgZXh0ZW5kcyBUaWxlIHtcbiAgYXR0YWNoVG8gKGFpcmxvY2spIHtcbiAgICB0aGlzLmF0dGFjaGVkVG8gPSBhaXJsb2NrXG4gIH1cblxuICBjb3B5QW5kUm90YXRlIChhbmdsZSwgb3JpZ2luKSB7XG4gICAgY29uc3QgY29weSA9IHN1cGVyLmNvcHlBbmRSb3RhdGUoYW5nbGUsIG9yaWdpbilcbiAgICBjb3B5LmRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uLnJvdGF0ZShhbmdsZSlcbiAgICByZXR1cm4gY29weVxuICB9XG59XG5cbkFpcmxvY2sucHJvcGVydGllcyh7XG4gIGRpcmVjdGlvbjoge30sXG4gIGF0dGFjaGVkVG86IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFpcmxvY2tcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuXG5jbGFzcyBBcHByb2FjaCBleHRlbmRzIEVsZW1lbnQge1xuICBzdGFydCAoKSB7XG4gICAgaWYgKHRoaXMudmFsaWQpIHtcbiAgICAgIHRoaXMubW92aW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zdWJqZWN0LnhNZW1iZXJzLmFkZFByb3BlcnR5UGF0aCgnY3VycmVudFBvcy54JywgdGhpcylcbiAgICAgIHRoaXMuc3ViamVjdC55TWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ2N1cnJlbnRQb3MueCcsIHRoaXMpXG4gICAgICB0aGlzLnRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9uZSgpXG4gICAgICB9LCB0aGlzLmR1cmF0aW9uKVxuICAgIH1cbiAgfVxuXG4gIGRvbmUgKCkge1xuICAgIHRoaXMuc3ViamVjdC54TWVtYmVycy5yZW1vdmVSZWYoe1xuICAgICAgbmFtZTogJ2N1cnJlbnRQb3MueCcsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMuc3ViamVjdC55TWVtYmVycy5yZW1vdmVSZWYoe1xuICAgICAgbmFtZTogJ2N1cnJlbnRQb3MueCcsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMuc3ViamVjdC54ID0gdGhpcy50YXJnZXRQb3MueFxuICAgIHRoaXMuc3ViamVjdC55ID0gdGhpcy50YXJnZXRQb3MueFxuICAgIHRoaXMuc3ViamVjdEFpcmxvY2suYXR0YWNoVG8odGhpcy50YXJnZXRBaXJsb2NrKVxuICAgIHRoaXMubW92aW5nID0gZmFsc2VcbiAgICB0aGlzLmNvbXBsZXRlID0gdHJ1ZVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMudGltZW91dCkge1xuICAgICAgdGhpcy50aW1lb3V0LmRlc3Ryb3koKVxuICAgIH1cbiAgfVxufTtcblxuQXBwcm9hY2gucHJvcGVydGllcyh7XG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfSxcbiAgaW5pdGlhbERpc3Q6IHtcbiAgICBkZWZhdWx0OiA1MDBcbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfSxcbiAgYW5nbGU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnJuZyAqIE1hdGguUEkgKiAyXG4gICAgfVxuICB9LFxuICBzdGFydGluZ1Bvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy5zdGFydGluZ1Bvcy54ICsgdGhpcy5pbml0aWFsRGlzdCAqIE1hdGguY29zKHRoaXMuYW5nbGUpLFxuICAgICAgICB5OiB0aGlzLnN0YXJ0aW5nUG9zLnkgKyB0aGlzLmluaXRpYWxEaXN0ICogTWF0aC5zaW4odGhpcy5hbmdsZSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHRhcmdldFBvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGhpcy50YXJnZXRBaXJsb2NrLnggLSB0aGlzLnN1YmplY3RBaXJsb2NrLngsXG4gICAgICAgIHk6IHRoaXMudGFyZ2V0QWlybG9jay55IC0gdGhpcy5zdWJqZWN0QWlybG9jay55XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzdWJqZWN0OiB7fSxcbiAgdGFyZ2V0OiB7fSxcbiAgdmFsaWQ6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YmplY3QgIT0gbnVsbCAmJlxuICAgICAgICB0aGlzLnRhcmdldCAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuc3ViamVjdC5haXJsb2Nrcy5sZW5ndGggPiAwICYmXG4gICAgICAgIHRoaXMudGFyZ2V0LmFpcmxvY2tzLmxlbmd0aCA+IDBcbiAgICB9XG4gIH0sXG4gIHN1YmplY3RBaXJsb2NrOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgYWlybG9ja3NcbiAgICAgIGFpcmxvY2tzID0gdGhpcy5zdWJqZWN0LmFpcmxvY2tzLnNsaWNlKClcbiAgICAgIGFpcmxvY2tzLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgdmFyIHZhbEEsIHZhbEJcbiAgICAgICAgdmFsQSA9IE1hdGguYWJzKGEuZGlyZWN0aW9uLnggLSBNYXRoLmNvcyh0aGlzLmFuZ2xlKSkgKyBNYXRoLmFicyhhLmRpcmVjdGlvbi55IC0gTWF0aC5zaW4odGhpcy5hbmdsZSkpXG4gICAgICAgIHZhbEIgPSBNYXRoLmFicyhiLmRpcmVjdGlvbi54IC0gTWF0aC5jb3ModGhpcy5hbmdsZSkpICsgTWF0aC5hYnMoYi5kaXJlY3Rpb24ueSAtIE1hdGguc2luKHRoaXMuYW5nbGUpKVxuICAgICAgICByZXR1cm4gdmFsQSAtIHZhbEJcbiAgICAgIH0pXG4gICAgICByZXR1cm4gYWlybG9ja3MuZ2V0KDApXG4gICAgfVxuICB9LFxuICB0YXJnZXRBaXJsb2NrOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWlybG9ja3MuZmluZCgodGFyZ2V0KSA9PiB7XG4gICAgICAgIHJldHVybiB0YXJnZXQuZGlyZWN0aW9uLmdldEludmVyc2UoKSA9PT0gdGhpcy5zdWJqZWN0QWlybG9jay5kaXJlY3Rpb25cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuICBtb3Zpbmc6IHtcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9LFxuICBjb21wbGV0ZToge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGN1cnJlbnRQb3M6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgdmFyIGVuZCwgcHJjLCBzdGFydFxuICAgICAgc3RhcnQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuc3RhcnRpbmdQb3NQcm9wZXJ0eSlcbiAgICAgIGVuZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy50YXJnZXRQb3NQcm9wZXJ0eSlcbiAgICAgIHByYyA9IGludmFsaWRhdG9yLnByb3BQYXRoKCd0aW1lb3V0LnByYycpIHx8IDBcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChlbmQueCAtIHN0YXJ0LngpICogcHJjICsgc3RhcnQueCxcbiAgICAgICAgeTogKGVuZC55IC0gc3RhcnQueSkgKiBwcmMgKyBzdGFydC55XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBkdXJhdGlvbjoge1xuICAgIGRlZmF1bHQ6IDEwMDAwXG4gIH0sXG4gIHRpbWVvdXQ6IHt9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcHJvYWNoXG4iLCJjb25zdCBEb29yID0gcmVxdWlyZSgnLi9Eb29yJylcbmNvbnN0IENoYXJhY3RlciA9IHJlcXVpcmUoJy4vQ2hhcmFjdGVyJylcblxuY2xhc3MgQXV0b21hdGljRG9vciBleHRlbmRzIERvb3Ige1xuICB1cGRhdGVUaWxlTWVtYmVycyAob2xkKSB7XG4gICAgdmFyIHJlZiwgcmVmMSwgcmVmMiwgcmVmM1xuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgaWYgKChyZWYgPSBvbGQud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZi5yZW1vdmVQcm9wZXJ0eSh0aGlzLnVubG9ja2VkUHJvcGVydHkpXG4gICAgICB9XG4gICAgICBpZiAoKHJlZjEgPSBvbGQudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZjEucmVtb3ZlUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgIGlmICgocmVmMiA9IHRoaXMudGlsZS53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgcmVmMi5hZGRQcm9wZXJ0eSh0aGlzLnVubG9ja2VkUHJvcGVydHkpXG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZjMgPSB0aGlzLnRpbGUudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsID8gcmVmMy5hZGRQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSkgOiBudWxsXG4gICAgfVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgc3VwZXIuaW5pdCgpXG4gICAgcmV0dXJuIHRoaXMub3BlblxuICB9XG5cbiAgaXNBY3RpdmF0b3JQcmVzZW50IChpbnZhbGlkYXRlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UmVhY3RpdmVUaWxlcyhpbnZhbGlkYXRlKS5zb21lKCh0aWxlKSA9PiB7XG4gICAgICB2YXIgY2hpbGRyZW5cbiAgICAgIGNoaWxkcmVuID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aWxlLmNoaWxkcmVuUHJvcGVydHkpIDogdGlsZS5jaGlsZHJlblxuICAgICAgcmV0dXJuIGNoaWxkcmVuLnNvbWUoKGNoaWxkKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbkJlQWN0aXZhdGVkQnkoY2hpbGQpXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBjYW5CZUFjdGl2YXRlZEJ5IChlbGVtKSB7XG4gICAgcmV0dXJuIGVsZW0gaW5zdGFuY2VvZiBDaGFyYWN0ZXJcbiAgfVxuXG4gIGdldFJlYWN0aXZlVGlsZXMgKGludmFsaWRhdGUpIHtcbiAgICB2YXIgZGlyZWN0aW9uLCB0aWxlXG4gICAgdGlsZSA9IGludmFsaWRhdGUgPyBpbnZhbGlkYXRlLnByb3AodGhpcy50aWxlUHJvcGVydHkpIDogdGhpcy50aWxlXG4gICAgaWYgKCF0aWxlKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgZGlyZWN0aW9uID0gaW52YWxpZGF0ZSA/IGludmFsaWRhdGUucHJvcCh0aGlzLmRpcmVjdGlvblByb3BlcnR5KSA6IHRoaXMuZGlyZWN0aW9uXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gRG9vci5kaXJlY3Rpb25zLmhvcml6b250YWwpIHtcbiAgICAgIHJldHVybiBbdGlsZSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoMCwgMSksIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKDAsIC0xKV0uZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICE9IG51bGxcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbdGlsZSwgdGlsZS5nZXRSZWxhdGl2ZVRpbGUoMSwgMCksIHRpbGUuZ2V0UmVsYXRpdmVUaWxlKC0xLCAwKV0uZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIHJldHVybiB0ICE9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuICB9XG59O1xuXG5BdXRvbWF0aWNEb29yLnByb3BlcnRpZXMoe1xuICBvcGVuOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgcmV0dXJuICFpbnZhbGlkYXRlLnByb3AodGhpcy5sb2NrZWRQcm9wZXJ0eSkgJiYgdGhpcy5pc0FjdGl2YXRvclByZXNlbnQoaW52YWxpZGF0ZSlcbiAgICB9XG4gIH0sXG4gIGxvY2tlZDoge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIHVubG9ja2VkOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgcmV0dXJuICFpbnZhbGlkYXRlLnByb3AodGhpcy5sb2NrZWRQcm9wZXJ0eSlcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQXV0b21hdGljRG9vclxuIiwiY29uc3QgVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWRcbmNvbnN0IERhbWFnZWFibGUgPSByZXF1aXJlKCcuL0RhbWFnZWFibGUnKVxuY29uc3QgV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9XYWxrQWN0aW9uJylcbmNvbnN0IEFjdGlvblByb3ZpZGVyID0gcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyJylcblxuY2xhc3MgQ2hhcmFjdGVyIGV4dGVuZHMgVGlsZWQge1xuICBjb25zdHJ1Y3RvciAobmFtZSkge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm5hbWUgPSBuYW1lXG4gIH1cblxuICBzZXREZWZhdWx0cyAoKSB7XG4gICAgaWYgKCF0aGlzLnRpbGUgJiYgKHRoaXMuZ2FtZS5tYWluVGlsZUNvbnRhaW5lciAhPSBudWxsKSkge1xuICAgICAgcmV0dXJuIHRoaXMucHV0T25SYW5kb21UaWxlKHRoaXMuZ2FtZS5tYWluVGlsZUNvbnRhaW5lci50aWxlcylcbiAgICB9XG4gIH1cblxuICBjYW5Hb09uVGlsZSAodGlsZSkge1xuICAgIHJldHVybiAodGlsZSAhPSBudWxsID8gdGlsZS53YWxrYWJsZSA6IG51bGwpICE9PSBmYWxzZVxuICB9XG5cbiAgd2Fsa1RvICh0aWxlKSB7XG4gICAgdmFyIGFjdGlvblxuICAgIGFjdGlvbiA9IG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgIGFjdG9yOiB0aGlzLFxuICAgICAgdGFyZ2V0OiB0aWxlXG4gICAgfSlcbiAgICBhY3Rpb24uZXhlY3V0ZSgpXG4gICAgcmV0dXJuIGFjdGlvblxuICB9XG5cbiAgaXNTZWxlY3RhYmxlQnkgKHBsYXllcikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbn07XG5cbkNoYXJhY3Rlci5leHRlbmQoRGFtYWdlYWJsZSlcblxuQ2hhcmFjdGVyLnByb3BlcnRpZXMoe1xuICBnYW1lOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgb2Zmc2V0WDoge1xuICAgIGNvbXBvc2VkOiB0cnVlLFxuICAgIGRlZmF1bHQ6IDAuNVxuICB9LFxuICBvZmZzZXRZOiB7XG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgZGVmYXVsdDogMC41XG4gIH0sXG4gIHRpbGU6IHtcbiAgICBjb21wb3NlZDogdHJ1ZVxuICB9LFxuICBkZWZhdWx0QWN0aW9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICBhY3RvcjogdGhpc1xuICAgICAgfSlcbiAgICB9XG4gIH0sXG4gIGFjdGlvblByb3ZpZGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEFjdGlvblByb3ZpZGVyKHtcbiAgICAgICAgb3duZXI6IHRoaXNcbiAgICAgIH0pXG4gICAgICBwcm92aWRlci5hY3Rpb25zTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ293bmVyLnRpbGUuYWN0aW9uUHJvdmlkZXIuYWN0aW9ucycpXG4gICAgICByZXR1cm4gcHJvdmlkZXJcbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQ2hhcmFjdGVyXG4iLCJjb25zdCBUaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXJcbmNvbnN0IFZpc2lvbkNhbGN1bGF0b3IgPSByZXF1aXJlKCcuL1Zpc2lvbkNhbGN1bGF0b3InKVxuY29uc3QgRG9vciA9IHJlcXVpcmUoJy4vRG9vcicpXG5jb25zdCBXYWxrQWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb25zL1dhbGtBY3Rpb24nKVxuY29uc3QgQXR0YWNrTW92ZUFjdGlvbiA9IHJlcXVpcmUoJy4vYWN0aW9ucy9BdHRhY2tNb3ZlQWN0aW9uJylcbmNvbnN0IFByb3BlcnR5V2F0Y2hlciA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS53YXRjaGVycy5Qcm9wZXJ0eVdhdGNoZXJcblxuY2xhc3MgQ2hhcmFjdGVyQUkge1xuICBjb25zdHJ1Y3RvciAoY2hhcmFjdGVyKSB7XG4gICAgdGhpcy5jaGFyYWN0ZXIgPSBjaGFyYWN0ZXJcbiAgICB0aGlzLm5leHRBY3Rpb25DYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLm5leHRBY3Rpb24oKVxuICAgIH1cbiAgICB0aGlzLnZpc2lvbk1lbW9yeSA9IG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICB0aGlzLnRpbGVXYXRjaGVyID0gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVWaXNpb25NZW1vcnkoKVxuICAgICAgfSxcbiAgICAgIHByb3BlcnR5OiB0aGlzLmNoYXJhY3Rlci5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgndGlsZScpXG4gICAgfSlcbiAgfVxuXG4gIHN0YXJ0ICgpIHtcbiAgICB0aGlzLnRpbGVXYXRjaGVyLmJpbmQoKVxuICAgIHJldHVybiB0aGlzLm5leHRBY3Rpb24oKVxuICB9XG5cbiAgbmV4dEFjdGlvbiAoKSB7XG4gICAgdGhpcy51cGRhdGVWaXNpb25NZW1vcnkoKVxuICAgIGNvbnN0IGVuZW15ID0gdGhpcy5nZXRDbG9zZXN0RW5lbXkoKVxuICAgIGlmIChlbmVteSkge1xuICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrTW92ZVRvKGVuZW15KS5vbignZW5kJywgdGhpcy5uZXh0QWN0aW9uQ2FsbGJhY2spXG4gICAgfVxuICAgIGNvbnN0IHVuZXhwbG9yZWQgPSB0aGlzLmdldENsb3Nlc3RVbmV4cGxvcmVkKClcbiAgICBpZiAodW5leHBsb3JlZCkge1xuICAgICAgcmV0dXJuIHRoaXMud2Fsa1RvKHVuZXhwbG9yZWQpLm9uKCdlbmQnLCB0aGlzLm5leHRBY3Rpb25DYWxsYmFjaylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXNldFZpc2lvbk1lbW9yeSgpXG4gICAgICByZXR1cm4gdGhpcy53YWxrVG8odGhpcy5nZXRDbG9zZXN0VW5leHBsb3JlZCgpKS5vbignZW5kJywgdGhpcy5uZXh0QWN0aW9uQ2FsbGJhY2spXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlzaW9uTWVtb3J5ICgpIHtcbiAgICB2YXIgY2FsY3VsYXRvclxuICAgIGNhbGN1bGF0b3IgPSBuZXcgVmlzaW9uQ2FsY3VsYXRvcih0aGlzLmNoYXJhY3Rlci50aWxlKVxuICAgIGNhbGN1bGF0b3IuY2FsY3VsKClcbiAgICB0aGlzLnZpc2lvbk1lbW9yeSA9IGNhbGN1bGF0b3IudG9Db250YWluZXIoKS5tZXJnZSh0aGlzLnZpc2lvbk1lbW9yeSwgKGEsIGIpID0+IHtcbiAgICAgIGlmIChhICE9IG51bGwpIHtcbiAgICAgICAgYSA9IHRoaXMuYW5hbHl6ZVRpbGUoYSlcbiAgICAgIH1cbiAgICAgIGlmICgoYSAhPSBudWxsKSAmJiAoYiAhPSBudWxsKSkge1xuICAgICAgICBhLnZpc2liaWxpdHkgPSBNYXRoLm1heChhLnZpc2liaWxpdHksIGIudmlzaWJpbGl0eSlcbiAgICAgICAgcmV0dXJuIGFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhIHx8IGJcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgYW5hbHl6ZVRpbGUgKHRpbGUpIHtcbiAgICB2YXIgcmVmXG4gICAgdGlsZS5lbm5lbXlTcG90dGVkID0gKHJlZiA9IHRpbGUuZ2V0RmluYWxUaWxlKCkuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaXNFbm5lbXkoYylcbiAgICB9KSA6IG51bGxcbiAgICB0aWxlLmV4cGxvcmFibGUgPSB0aGlzLmlzRXhwbG9yYWJsZSh0aWxlKVxuICAgIHJldHVybiB0aWxlXG4gIH1cblxuICBpc0VubmVteSAoZWxlbSkge1xuICAgIHZhciByZWZcbiAgICByZXR1cm4gKHJlZiA9IHRoaXMuY2hhcmFjdGVyLm93bmVyKSAhPSBudWxsID8gdHlwZW9mIHJlZi5pc0VuZW15ID09PSAnZnVuY3Rpb24nID8gcmVmLmlzRW5lbXkoZWxlbSkgOiBudWxsIDogbnVsbFxuICB9XG5cbiAgZ2V0Q2xvc2VzdEVuZW15ICgpIHtcbiAgICByZXR1cm4gdGhpcy52aXNpb25NZW1vcnkuY2xvc2VzdCh0aGlzLmNoYXJhY3Rlci50aWxlLCAodCkgPT4ge1xuICAgICAgcmV0dXJuIHQuZW5uZW15U3BvdHRlZFxuICAgIH0pXG4gIH1cblxuICBnZXRDbG9zZXN0VW5leHBsb3JlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlzaW9uTWVtb3J5LmNsb3Nlc3QodGhpcy5jaGFyYWN0ZXIudGlsZSwgKHQpID0+IHtcbiAgICAgIHJldHVybiB0LnZpc2liaWxpdHkgPCAxICYmIHQuZXhwbG9yYWJsZVxuICAgIH0pXG4gIH1cblxuICBpc0V4cGxvcmFibGUgKHRpbGUpIHtcbiAgICB2YXIgcmVmXG4gICAgdGlsZSA9IHRpbGUuZ2V0RmluYWxUaWxlKClcbiAgICByZXR1cm4gdGlsZS53YWxrYWJsZSB8fCAoKHJlZiA9IHRpbGUuY2hpbGRyZW4pICE9IG51bGwgPyByZWYuZmluZCgoYykgPT4ge1xuICAgICAgcmV0dXJuIGMgaW5zdGFuY2VvZiBEb29yXG4gICAgfSkgOiBudWxsKVxuICB9XG5cbiAgYXR0YWNrTW92ZVRvICh0aWxlKSB7XG4gICAgdmFyIGFjdGlvblxuICAgIHRpbGUgPSB0aWxlLmdldEZpbmFsVGlsZSgpXG4gICAgYWN0aW9uID0gbmV3IEF0dGFja01vdmVBY3Rpb24oe1xuICAgICAgYWN0b3I6IHRoaXMuY2hhcmFjdGVyLFxuICAgICAgdGFyZ2V0OiB0aWxlXG4gICAgfSlcbiAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgYWN0aW9uLmV4ZWN1dGUoKVxuICAgICAgcmV0dXJuIGFjdGlvblxuICAgIH1cbiAgfVxuXG4gIHdhbGtUbyAodGlsZSkge1xuICAgIHZhciBhY3Rpb25cbiAgICB0aWxlID0gdGlsZS5nZXRGaW5hbFRpbGUoKVxuICAgIGFjdGlvbiA9IG5ldyBXYWxrQWN0aW9uKHtcbiAgICAgIGFjdG9yOiB0aGlzLmNoYXJhY3RlcixcbiAgICAgIHRhcmdldDogdGlsZVxuICAgIH0pXG4gICAgaWYgKGFjdGlvbi5pc1JlYWR5KCkpIHtcbiAgICAgIGFjdGlvbi5leGVjdXRlKClcbiAgICAgIHJldHVybiBhY3Rpb25cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDaGFyYWN0ZXJBSVxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBWaWV3ID0gcmVxdWlyZSgnLi9WaWV3JylcbmNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL1NoaXAnKVxuY29uc3QgQXBwcm9hY2ggPSByZXF1aXJlKCcuL0FwcHJvYWNoJylcblxuY2xhc3MgQ29uZnJvbnRhdGlvbiBleHRlbmRzIEVsZW1lbnQge1xuICBzdGFydCAoKSB7XG4gICAgdGhpcy5zdWJqZWN0LmVuY291bnRlciA9IHRoaXNcbiAgICB0aGlzLmdhbWUubWFpblZpZXcgPSB0aGlzLnZpZXdcbiAgICB0aGlzLmdhbWUuYWRkKHRoaXMuc3ViamVjdC5pbnRlcnJpb3IpXG4gICAgdGhpcy5zdWJqZWN0LmludGVycmlvci5jb250YWluZXIgPSB0aGlzLnZpZXdcbiAgICB0aGlzLmdhbWUuYWRkKHRoaXMub3Bwb25lbnQuaW50ZXJyaW9yKVxuICAgIHRoaXMub3Bwb25lbnQuaW50ZXJyaW9yLmNvbnRhaW5lciA9IHRoaXMudmlld1xuICAgIHRoaXMuYXBwcm9hY2guc3RhcnQoKVxuICB9XG59O1xuXG5Db25mcm9udGF0aW9uLnByb3BlcnRpZXMoe1xuICBnYW1lOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBzdWJqZWN0OiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICB2aWV3OiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFZpZXcoKVxuICAgIH1cbiAgfSxcbiAgb3Bwb25lbnQ6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgU2hpcCgpXG4gICAgfVxuICB9LFxuICBhcHByb2FjaDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBBcHByb2FjaCh7XG4gICAgICAgIHN1YmplY3Q6IHRoaXMub3Bwb25lbnQuaW50ZXJyaW9yLFxuICAgICAgICB0YXJnZXQ6IHRoaXMuc3ViamVjdC5pbnRlcnJpb3JcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbmZyb250YXRpb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0JylcbmNvbnN0IERpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb25cblxuY2xhc3MgRGFtYWdlUHJvcGFnYXRpb24gZXh0ZW5kcyBFbGVtZW50IHtcbiAgZ2V0VGlsZUNvbnRhaW5lciAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGlsZS5jb250YWluZXJcbiAgfVxuXG4gIGFwcGx5ICgpIHtcbiAgICB0aGlzLmdldERhbWFnZWQoKS5mb3JFYWNoKChkYW1hZ2UpID0+IHtcbiAgICAgIGRhbWFnZS50YXJnZXQuZGFtYWdlKGRhbWFnZS5kYW1hZ2UpXG4gICAgfSlcbiAgfVxuXG4gIGdldEluaXRpYWxUaWxlcyAoKSB7XG4gICAgdmFyIGN0blxuICAgIGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpXG4gICAgcmV0dXJuIGN0bi5pblJhbmdlKHRoaXMudGlsZSwgdGhpcy5yYW5nZSlcbiAgfVxuXG4gIGdldEluaXRpYWxEYW1hZ2VzICgpIHtcbiAgICBjb25zdCB0aWxlcyA9IHRoaXMuZ2V0SW5pdGlhbFRpbGVzKClcbiAgICByZXR1cm4gdGlsZXMucmVkdWNlKChkYW1hZ2VzLCB0aWxlKSA9PiB7XG4gICAgICBpZiAodGlsZS5kYW1hZ2VhYmxlKSB7XG4gICAgICAgIGNvbnN0IGRtZyA9IHRoaXMuaW5pdGlhbERhbWFnZSh0aWxlLCB0aWxlcy5sZW5ndGgpXG4gICAgICAgIGlmIChkbWcpIHtcbiAgICAgICAgICBkYW1hZ2VzLnB1c2goZG1nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZGFtYWdlc1xuICAgIH0sIFtdKVxuICB9XG5cbiAgZ2V0RGFtYWdlZCAoKSB7XG4gICAgdmFyIGFkZGVkXG4gICAgaWYgKHRoaXMuX2RhbWFnZWQgPT0gbnVsbCkge1xuICAgICAgYWRkZWQgPSBudWxsXG4gICAgICBkbyB7XG4gICAgICAgIGFkZGVkID0gdGhpcy5zdGVwKGFkZGVkKVxuICAgICAgfSB3aGlsZSAoYWRkZWQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9kYW1hZ2VkXG4gIH1cblxuICBzdGVwIChhZGRlZCkge1xuICAgIGlmIChhZGRlZCAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5leHRlbmRlZERhbWFnZSAhPSBudWxsKSB7XG4gICAgICAgIGFkZGVkID0gdGhpcy5leHRlbmQoYWRkZWQpXG4gICAgICAgIHRoaXMuX2RhbWFnZWQgPSBhZGRlZC5jb25jYXQodGhpcy5fZGFtYWdlZClcbiAgICAgICAgcmV0dXJuIGFkZGVkLmxlbmd0aCA+IDAgJiYgYWRkZWRcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGFtYWdlZCA9IHRoaXMuZ2V0SW5pdGlhbERhbWFnZXMoKVxuICAgICAgcmV0dXJuIHRoaXMuX2RhbWFnZWRcbiAgICB9XG4gIH1cblxuICBpbkRhbWFnZWQgKHRhcmdldCwgZGFtYWdlZCkge1xuICAgIGNvbnN0IHBvcyA9IGRhbWFnZWQuZmluZEluZGV4KChkYW1hZ2UpID0+IGRhbWFnZS50YXJnZXQgPT09IHRhcmdldClcbiAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiBwb3NcbiAgfVxuXG4gIGV4dGVuZCAoZGFtYWdlZCkge1xuICAgIGNvbnN0IGN0biA9IHRoaXMuZ2V0VGlsZUNvbnRhaW5lcigpXG4gICAgcmV0dXJuIGRhbWFnZWQucmVkdWNlKChhZGRlZCwgZGFtYWdlKSA9PiB7XG4gICAgICBpZiAoZGFtYWdlLnRhcmdldC54ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFkZGVkXG4gICAgICB9XG4gICAgICBjb25zdCBsb2NhbCA9IERpcmVjdGlvbi5hZGphY2VudHMucmVkdWNlKChsb2NhbCwgZGlyKSA9PiB7XG4gICAgICAgIGNvbnN0IHRpbGUgPSBjdG4uZ2V0VGlsZShkYW1hZ2UudGFyZ2V0LnggKyBkaXIueCwgZGFtYWdlLnRhcmdldC55ICsgZGlyLnkpXG4gICAgICAgIGlmICgodGlsZSAhPSBudWxsKSAmJiB0aWxlLmRhbWFnZWFibGUgJiYgdGhpcy5pbkRhbWFnZWQodGlsZSwgdGhpcy5fZGFtYWdlZCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgbG9jYWwucHVzaCh0aWxlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb2NhbFxuICAgICAgfSwgW10pXG4gICAgICByZXR1cm4gbG9jYWwucmVkdWNlKChhZGRlZCwgdGFyZ2V0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRtZyA9IHRoaXMuZXh0ZW5kZWREYW1hZ2UodGFyZ2V0LCBkYW1hZ2UsIGxvY2FsLmxlbmd0aClcbiAgICAgICAgaWYgKGRtZykge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gdGhpcy5pbkRhbWFnZWQodGFyZ2V0LCBhZGRlZClcbiAgICAgICAgICBpZiAoZXhpc3RpbmcgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhZGRlZC5wdXNoKGRtZylcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkZWRbZXhpc3RpbmddID0gdGhpcy5tZXJnZURhbWFnZShhZGRlZFtleGlzdGluZ10sIGRtZylcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGVkXG4gICAgICB9LCBhZGRlZClcbiAgICB9LCBbXSlcbiAgfVxuXG4gIG1lcmdlRGFtYWdlIChkMSwgZDIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFyZ2V0OiBkMS50YXJnZXQsXG4gICAgICBwb3dlcjogZDEucG93ZXIgKyBkMi5wb3dlcixcbiAgICAgIGRhbWFnZTogZDEuZGFtYWdlICsgZDIuZGFtYWdlXG4gICAgfVxuICB9XG5cbiAgbW9kaWZ5RGFtYWdlICh0YXJnZXQsIHBvd2VyKSB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXQubW9kaWZ5RGFtYWdlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcih0YXJnZXQubW9kaWZ5RGFtYWdlKHBvd2VyLCB0aGlzLnR5cGUpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gTWF0aC5mbG9vcihwb3dlcilcbiAgICB9XG4gIH1cbn07XG5cbkRhbWFnZVByb3BhZ2F0aW9uLnByb3BlcnRpZXMoe1xuICB0aWxlOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBwb3dlcjoge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIHJhbmdlOiB7XG4gICAgZGVmYXVsdDogMVxuICB9LFxuICB0eXBlOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9XG59KVxuXG5EYW1hZ2VQcm9wYWdhdGlvbi5Ob3JtYWwgPSBjbGFzcyBOb3JtYWwgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gIGluaXRpYWxEYW1hZ2UgKHRhcmdldCwgbmIpIHtcbiAgICB2YXIgZG1nXG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCB0aGlzLnBvd2VyKVxuICAgIGlmIChkbWcgPiAwKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICAgIGRhbWFnZTogZG1nXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkRhbWFnZVByb3BhZ2F0aW9uLlRoZXJtaWMgPSBjbGFzcyBUaGVybWljIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICBleHRlbmRlZERhbWFnZSAodGFyZ2V0LCBsYXN0LCBuYikge1xuICAgIHZhciBkbWcsIHBvd2VyXG4gICAgcG93ZXIgPSAobGFzdC5kYW1hZ2UgLSAxKSAvIDIgLyBuYiAqIE1hdGgubWluKDEsIGxhc3QudGFyZ2V0LmhlYWx0aCAvIGxhc3QudGFyZ2V0Lm1heEhlYWx0aCAqIDUpXG4gICAgZG1nID0gdGhpcy5tb2RpZnlEYW1hZ2UodGFyZ2V0LCBwb3dlcilcbiAgICBpZiAoZG1nID4gMCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgIHBvd2VyOiBwb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpbml0aWFsRGFtYWdlICh0YXJnZXQsIG5iKSB7XG4gICAgdmFyIGRtZywgcG93ZXJcbiAgICBwb3dlciA9IHRoaXMucG93ZXIgLyBuYlxuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpXG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGRhbWFnZTogZG1nXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbkRhbWFnZVByb3BhZ2F0aW9uLktpbmV0aWMgPSBjbGFzcyBLaW5ldGljIGV4dGVuZHMgRGFtYWdlUHJvcGFnYXRpb24ge1xuICBleHRlbmRlZERhbWFnZSAodGFyZ2V0LCBsYXN0LCBuYikge1xuICAgIHZhciBkbWcsIHBvd2VyXG4gICAgcG93ZXIgPSAobGFzdC5wb3dlciAtIGxhc3QuZGFtYWdlKSAqIE1hdGgubWluKDEsIGxhc3QudGFyZ2V0LmhlYWx0aCAvIGxhc3QudGFyZ2V0Lm1heEhlYWx0aCAqIDIpIC0gMVxuICAgIGRtZyA9IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgcG93ZXIpXG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogcG93ZXIsXG4gICAgICAgIGRhbWFnZTogZG1nXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbERhbWFnZSAodGFyZ2V0LCBuYikge1xuICAgIHZhciBkbWdcbiAgICBkbWcgPSB0aGlzLm1vZGlmeURhbWFnZSh0YXJnZXQsIHRoaXMucG93ZXIpXG4gICAgaWYgKGRtZyA+IDApIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICBwb3dlcjogdGhpcy5wb3dlcixcbiAgICAgICAgZGFtYWdlOiBkbWdcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBtb2RpZnlEYW1hZ2UgKHRhcmdldCwgcG93ZXIpIHtcbiAgICBpZiAodHlwZW9mIHRhcmdldC5tb2RpZnlEYW1hZ2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHRhcmdldC5tb2RpZnlEYW1hZ2UocG93ZXIsIHRoaXMudHlwZSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHBvd2VyICogMC4yNSlcbiAgICB9XG4gIH1cblxuICBtZXJnZURhbWFnZSAoZDEsIGQyKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRhcmdldDogZDEudGFyZ2V0LFxuICAgICAgcG93ZXI6IE1hdGguZmxvb3IoKGQxLnBvd2VyICsgZDIucG93ZXIpIC8gMiksXG4gICAgICBkYW1hZ2U6IE1hdGguZmxvb3IoKGQxLmRhbWFnZSArIGQyLmRhbWFnZSkgLyAyKVxuICAgIH1cbiAgfVxufVxuXG5EYW1hZ2VQcm9wYWdhdGlvbi5FeHBsb3NpdmUgPSAoZnVuY3Rpb24gKCkge1xuICBjbGFzcyBFeHBsb3NpdmUgZXh0ZW5kcyBEYW1hZ2VQcm9wYWdhdGlvbiB7XG4gICAgZ2V0RGFtYWdlZCAoKSB7XG4gICAgICB2YXIgYW5nbGUsIGluc2lkZSwgc2hhcmRQb3dlciwgdGFyZ2V0XG4gICAgICB0aGlzLl9kYW1hZ2VkID0gW11cbiAgICAgIGNvbnN0IHNoYXJkcyA9IE1hdGgucG93KHRoaXMucmFuZ2UgKyAxLCAyKVxuICAgICAgc2hhcmRQb3dlciA9IHRoaXMucG93ZXIgLyBzaGFyZHNcbiAgICAgIGluc2lkZSA9IHRoaXMudGlsZS5oZWFsdGggPD0gdGhpcy5tb2RpZnlEYW1hZ2UodGhpcy50aWxlLCBzaGFyZFBvd2VyKVxuICAgICAgaWYgKGluc2lkZSkge1xuICAgICAgICBzaGFyZFBvd2VyICo9IDRcbiAgICAgIH1cbiAgICAgIHRoaXMuX2RhbWFnZWQgPSBBcnJheSguLi5BcnJheShzaGFyZHMgKyAxKSkucmVkdWNlKChkYW1hZ2VkKSA9PiB7XG4gICAgICAgIGFuZ2xlID0gdGhpcy5ybmcoKSAqIE1hdGguUEkgKiAyXG4gICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0VGlsZUhpdEJ5U2hhcmQoaW5zaWRlLCBhbmdsZSlcbiAgICAgICAgaWYgKHRhcmdldCAhPSBudWxsKSB7XG4gICAgICAgICAgZGFtYWdlZC5wdXNoKHtcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgcG93ZXI6IHNoYXJkUG93ZXIsXG4gICAgICAgICAgICBkYW1hZ2U6IHRoaXMubW9kaWZ5RGFtYWdlKHRhcmdldCwgc2hhcmRQb3dlcilcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYW1hZ2VkXG4gICAgICB9LCBbXSlcbiAgICAgIHJldHVybiB0aGlzLl9kYW1hZ2VkXG4gICAgfVxuXG4gICAgZ2V0VGlsZUhpdEJ5U2hhcmQgKGluc2lkZSwgYW5nbGUpIHtcbiAgICAgIHZhciBjdG4sIGRpc3QsIHRhcmdldCwgdmVydGV4XG4gICAgICBjdG4gPSB0aGlzLmdldFRpbGVDb250YWluZXIoKVxuICAgICAgZGlzdCA9IHRoaXMucmFuZ2UgKiB0aGlzLnJuZygpXG4gICAgICB0YXJnZXQgPSB7XG4gICAgICAgIHg6IHRoaXMudGlsZS54ICsgMC41ICsgZGlzdCAqIE1hdGguY29zKGFuZ2xlKSxcbiAgICAgICAgeTogdGhpcy50aWxlLnkgKyAwLjUgKyBkaXN0ICogTWF0aC5zaW4oYW5nbGUpXG4gICAgICB9XG4gICAgICBpZiAoaW5zaWRlKSB7XG4gICAgICAgIHZlcnRleCA9IG5ldyBMaW5lT2ZTaWdodChjdG4sIHRoaXMudGlsZS54ICsgMC41LCB0aGlzLnRpbGUueSArIDAuNSwgdGFyZ2V0LngsIHRhcmdldC55KVxuICAgICAgICB2ZXJ0ZXgudHJhdmVyc2FibGVDYWxsYmFjayA9ICh0aWxlKSA9PiB7XG4gICAgICAgICAgcmV0dXJuICFpbnNpZGUgfHwgKCh0aWxlICE9IG51bGwpICYmIHRoaXMudHJhdmVyc2FibGVDYWxsYmFjayh0aWxlKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmVydGV4LmdldEVuZFBvaW50KCkudGlsZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN0bi5nZXRUaWxlKE1hdGguZmxvb3IodGFyZ2V0LngpLCBNYXRoLmZsb29yKHRhcmdldC55KSlcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgRXhwbG9zaXZlLnByb3BlcnRpZXMoe1xuICAgIHJuZzoge1xuICAgICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgICB9LFxuICAgIHRyYXZlcnNhYmxlQ2FsbGJhY2s6IHtcbiAgICAgIGRlZmF1bHQ6IGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgIHJldHVybiAhKHR5cGVvZiB0aWxlLmdldFNvbGlkID09PSAnZnVuY3Rpb24nICYmIHRpbGUuZ2V0U29saWQoKSlcbiAgICAgIH1cbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIEV4cGxvc2l2ZVxufS5jYWxsKHRoaXMpKVxuXG5tb2R1bGUuZXhwb3J0cyA9IERhbWFnZVByb3BhZ2F0aW9uXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcblxuY2xhc3MgRGFtYWdlYWJsZSBleHRlbmRzIEVsZW1lbnQge1xuICBkYW1hZ2UgKHZhbCkge1xuICAgIHRoaXMuaGVhbHRoID0gTWF0aC5tYXgoMCwgdGhpcy5oZWFsdGggLSB2YWwpXG4gIH1cblxuICB3aGVuTm9IZWFsdGggKCkge31cbn07XG5cbkRhbWFnZWFibGUucHJvcGVydGllcyh7XG4gIGRhbWFnZWFibGU6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIG1heEhlYWx0aDoge1xuICAgIGRlZmF1bHQ6IDEwMDBcbiAgfSxcbiAgaGVhbHRoOiB7XG4gICAgZGVmYXVsdDogMTAwMCxcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLmhlYWx0aCA8PSAwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndoZW5Ob0hlYWx0aCgpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IERhbWFnZWFibGVcbiIsImNvbnN0IFRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkXG5cbmNvbnN0IGRpcmVjdGlvbnMgPSB7XG4gIGhvcml6b250YWw6ICdob3Jpem9udGFsJyxcbiAgdmVydGljYWw6ICd2ZXJ0aWNhbCdcbn1cblxuY2xhc3MgRG9vciBleHRlbmRzIFRpbGVkIHtcbiAgdXBkYXRlVGlsZU1lbWJlcnMgKG9sZCkge1xuICAgIHZhciByZWYsIHJlZjEsIHJlZjIsIHJlZjNcbiAgICBpZiAob2xkICE9IG51bGwpIHtcbiAgICAgIGlmICgocmVmID0gb2xkLndhbGthYmxlTWVtYmVycykgIT0gbnVsbCkge1xuICAgICAgICByZWYucmVtb3ZlUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpXG4gICAgICB9XG4gICAgICBpZiAoKHJlZjEgPSBvbGQudHJhbnNwYXJlbnRNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZjEucmVtb3ZlUHJvcGVydHkodGhpcy5vcGVuUHJvcGVydHkpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgIGlmICgocmVmMiA9IHRoaXMudGlsZS53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwpIHtcbiAgICAgICAgcmVmMi5hZGRQcm9wZXJ0eSh0aGlzLm9wZW5Qcm9wZXJ0eSlcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmMyA9IHRoaXMudGlsZS50cmFuc3BhcmVudE1lbWJlcnMpICE9IG51bGwgPyByZWYzLmFkZFByb3BlcnR5KHRoaXMub3BlblByb3BlcnR5KSA6IG51bGxcbiAgICB9XG4gIH1cbn07XG5cbkRvb3IucHJvcGVydGllcyh7XG4gIHRpbGU6IHtcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICh2YWwsIG9sZCkge1xuICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVGlsZU1lbWJlcnMob2xkKVxuICAgIH1cbiAgfSxcbiAgb3Blbjoge1xuICAgIGRlZmF1bHQ6IGZhbHNlXG4gIH0sXG4gIGRpcmVjdGlvbjoge1xuICAgIGRlZmF1bHQ6IGRpcmVjdGlvbnMuaG9yaXpvbnRhbFxuICB9XG59KVxuXG5Eb29yLmRpcmVjdGlvbnMgPSBkaXJlY3Rpb25zXG5cbm1vZHVsZS5leHBvcnRzID0gRG9vclxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBQcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykud2F0Y2hlcnMuUHJvcGVydHlXYXRjaGVyXG5jb25zdCBDb25mcm9udGF0aW9uID0gcmVxdWlyZSgnLi9Db25mcm9udGF0aW9uJylcblxuY2xhc3MgRW5jb3VudGVyTWFuYWdlciBleHRlbmRzIEVsZW1lbnQge1xuICBpbml0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5sb2NhdGlvbldhdGNoZXIuYmluZCgpXG4gIH1cblxuICB0ZXN0RW5jb3VudGVyICgpIHtcbiAgICBpZiAodGhpcy5ybmcoKSA8PSB0aGlzLmJhc2VQcm9iYWJpbGl0eSkge1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRFbmNvdW50ZXIoKVxuICAgIH1cbiAgfVxuXG4gIHN0YXJ0RW5jb3VudGVyICgpIHtcbiAgICB2YXIgZW5jb3VudGVyXG4gICAgZW5jb3VudGVyID0gbmV3IENvbmZyb250YXRpb24oe1xuICAgICAgc3ViamVjdDogdGhpcy5zdWJqZWN0LFxuICAgICAgZ2FtZTogdGhpcy5nYW1lXG4gICAgfSlcbiAgICByZXR1cm4gZW5jb3VudGVyLnN0YXJ0KClcbiAgfVxufTtcblxuRW5jb3VudGVyTWFuYWdlci5wcm9wZXJ0aWVzKHtcbiAgc3ViamVjdDoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgZ2FtZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgYmFzZVByb2JhYmlsaXR5OiB7XG4gICAgZGVmYXVsdDogMC4yXG4gIH0sXG4gIGxvY2F0aW9uV2F0Y2hlcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICBjYWxsYmFjazogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLnRlc3RFbmNvdW50ZXIoKVxuICAgICAgICB9LFxuICAgICAgICBwcm9wZXJ0eTogdGhpcy5zdWJqZWN0LnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdsb2NhdGlvbicpXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBFbmNvdW50ZXJNYW5hZ2VyXG4iLCJjb25zdCBUaWxlID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVcblxuY2xhc3MgRmxvb3IgZXh0ZW5kcyBUaWxlIHt9O1xuXG5GbG9vci5wcm9wZXJ0aWVzKHtcbiAgd2Fsa2FibGU6IHtcbiAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIHRyYW5zcGFyZW50OiB7XG4gICAgY29tcG9zZWQ6IHRydWUsXG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEZsb29yXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJylcbmNvbnN0IFZpZXcgPSByZXF1aXJlKCcuL1ZpZXcnKVxuY29uc3QgUGxheWVyID0gcmVxdWlyZSgnLi9QbGF5ZXInKVxuXG5jbGFzcyBHYW1lIGV4dGVuZHMgRWxlbWVudCB7XG4gIHN0YXJ0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50UGxheWVyXG4gIH1cblxuICBhZGQgKGVsZW0pIHtcbiAgICBlbGVtLmdhbWUgPSB0aGlzXG4gICAgcmV0dXJuIGVsZW1cbiAgfVxufTtcblxuR2FtZS5wcm9wZXJ0aWVzKHtcbiAgdGltaW5nOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFRpbWluZygpXG4gICAgfVxuICB9LFxuICBtYWluVmlldzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMudmlld3MubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy52aWV3cy5nZXQoMClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IFZpZXdDbGFzcyA9IHRoaXMuZGVmYXVsdFZpZXdDbGFzc1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IFZpZXdDbGFzcygpKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdmlld3M6IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlXG4gIH0sXG4gIGN1cnJlbnRQbGF5ZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnBsYXllcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJzLmdldCgwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgUGxheWVyQ2xhc3MgPSB0aGlzLmRlZmF1bHRQbGF5ZXJDbGFzc1xuICAgICAgICByZXR1cm4gdGhpcy5hZGQobmV3IFBsYXllckNsYXNzKCkpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBwbGF5ZXJzOiB7XG4gICAgY29sbGVjdGlvbjogdHJ1ZVxuICB9XG59KVxuXG5HYW1lLnByb3RvdHlwZS5kZWZhdWx0Vmlld0NsYXNzID0gVmlld1xuXG5HYW1lLnByb3RvdHlwZS5kZWZhdWx0UGxheWVyQ2xhc3MgPSBQbGF5ZXJcblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lXG4iLCJjb25zdCBDb2xsZWN0aW9uID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkNvbGxlY3Rpb25cblxuY2xhc3MgSW52ZW50b3J5IGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGdldEJ5VHlwZSAodHlwZSkge1xuICAgIHZhciByZXNcbiAgICByZXMgPSB0aGlzLmZpbHRlcihmdW5jdGlvbiAocikge1xuICAgICAgcmV0dXJuIHIudHlwZSA9PT0gdHlwZVxuICAgIH0pXG4gICAgaWYgKHJlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiByZXNbMF1cbiAgICB9XG4gIH1cblxuICBhZGRCeVR5cGUgKHR5cGUsIHF0ZSwgcGFydGlhbCA9IGZhbHNlKSB7XG4gICAgdmFyIHJlc3NvdXJjZVxuICAgIHJlc3NvdXJjZSA9IHRoaXMuZ2V0QnlUeXBlKHR5cGUpXG4gICAgaWYgKCFyZXNzb3VyY2UpIHtcbiAgICAgIHJlc3NvdXJjZSA9IHRoaXMuaW5pdFJlc3NvdXJjZSh0eXBlKVxuICAgIH1cbiAgICBpZiAocGFydGlhbCkge1xuICAgICAgcmVzc291cmNlLnBhcnRpYWxDaGFuZ2UocmVzc291cmNlLnF0ZSArIHF0ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzc291cmNlLnF0ZSArPSBxdGVcbiAgICB9XG4gIH1cblxuICBpbml0UmVzc291cmNlICh0eXBlLCBvcHQpIHtcbiAgICByZXR1cm4gdHlwZS5pbml0UmVzc291cmNlKG9wdClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmVudG9yeVxuIiwiY2xhc3MgTGluZU9mU2lnaHQge1xuICBjb25zdHJ1Y3RvciAodGlsZXMsIHgxID0gMCwgeTEgPSAwLCB4MiA9IDAsIHkyID0gMCkge1xuICAgIHRoaXMudGlsZXMgPSB0aWxlc1xuICAgIHRoaXMueDEgPSB4MVxuICAgIHRoaXMueTEgPSB5MVxuICAgIHRoaXMueDIgPSB4MlxuICAgIHRoaXMueTIgPSB5MlxuICB9XG5cbiAgc2V0WDEgKHZhbCkge1xuICAgIHRoaXMueDEgPSB2YWxcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYWRlKClcbiAgfVxuXG4gIHNldFkxICh2YWwpIHtcbiAgICB0aGlzLnkxID0gdmFsXG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGFkZSgpXG4gIH1cblxuICBzZXRYMiAodmFsKSB7XG4gICAgdGhpcy54MiA9IHZhbFxuICAgIHJldHVybiB0aGlzLmludmFsaWRhZGUoKVxuICB9XG5cbiAgc2V0WTIgKHZhbCkge1xuICAgIHRoaXMueTIgPSB2YWxcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYWRlKClcbiAgfVxuXG4gIGludmFsaWRhZGUgKCkge1xuICAgIHRoaXMuZW5kUG9pbnQgPSBudWxsXG4gICAgdGhpcy5zdWNjZXNzID0gbnVsbFxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlXG4gIH1cblxuICB0ZXN0VGlsZSAodGlsZSwgZW50cnlYLCBlbnRyeVkpIHtcbiAgICBpZiAodGhpcy50cmF2ZXJzYWJsZUNhbGxiYWNrICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLnRyYXZlcnNhYmxlQ2FsbGJhY2sodGlsZSwgZW50cnlYLCBlbnRyeVkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAodGlsZSAhPSBudWxsKSAmJiAodHlwZW9mIHRpbGUuZ2V0VHJhbnNwYXJlbnQgPT09ICdmdW5jdGlvbicgPyB0aWxlLmdldFRyYW5zcGFyZW50KCkgOiB0aWxlLnRyYW5zcGFyZW50ICE9IG51bGwgPyB0aWxlLnRyYW5zcGFyZW50IDogdHJ1ZSlcbiAgICB9XG4gIH1cblxuICB0ZXN0VGlsZUF0ICh4LCB5LCBlbnRyeVgsIGVudHJ5WSkge1xuICAgIHJldHVybiB0aGlzLnRlc3RUaWxlKHRoaXMudGlsZXMuZ2V0VGlsZShNYXRoLmZsb29yKHgpLCBNYXRoLmZsb29yKHkpKSwgZW50cnlYLCBlbnRyeVkpXG4gIH1cblxuICByZXZlcnNlVHJhY2luZyAoKSB7XG4gICAgdmFyIHRtcFgsIHRtcFlcbiAgICB0bXBYID0gdGhpcy54MVxuICAgIHRtcFkgPSB0aGlzLnkxXG4gICAgdGhpcy54MSA9IHRoaXMueDJcbiAgICB0aGlzLnkxID0gdGhpcy55MlxuICAgIHRoaXMueDIgPSB0bXBYXG4gICAgdGhpcy55MiA9IHRtcFlcbiAgICB0aGlzLnJldmVyc2VkID0gIXRoaXMucmV2ZXJzZWRcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgdmFyIG5leHRYLCBuZXh0WSwgcG9zaXRpdmVYLCBwb3NpdGl2ZVksIHJhdGlvLCB0aWxlWCwgdGlsZVksIHRvdGFsLCB4LCB5XG4gICAgcmF0aW8gPSAodGhpcy54MiAtIHRoaXMueDEpIC8gKHRoaXMueTIgLSB0aGlzLnkxKVxuICAgIHRvdGFsID0gTWF0aC5hYnModGhpcy54MiAtIHRoaXMueDEpICsgTWF0aC5hYnModGhpcy55MiAtIHRoaXMueTEpXG4gICAgcG9zaXRpdmVYID0gKHRoaXMueDIgLSB0aGlzLngxKSA+PSAwXG4gICAgcG9zaXRpdmVZID0gKHRoaXMueTIgLSB0aGlzLnkxKSA+PSAwXG4gICAgdGlsZVggPSB4ID0gdGhpcy54MVxuICAgIHRpbGVZID0geSA9IHRoaXMueTFcbiAgICBpZiAodGhpcy5yZXZlcnNlZCkge1xuICAgICAgdGlsZVggPSBwb3NpdGl2ZVggPyB4IDogTWF0aC5jZWlsKHgpIC0gMVxuICAgICAgdGlsZVkgPSBwb3NpdGl2ZVkgPyB5IDogTWF0aC5jZWlsKHkpIC0gMVxuICAgIH1cbiAgICB3aGlsZSAodG90YWwgPiBNYXRoLmFicyh4IC0gdGhpcy54MSkgKyBNYXRoLmFicyh5IC0gdGhpcy55MSkgJiYgdGhpcy50ZXN0VGlsZUF0KHRpbGVYLCB0aWxlWSwgeCwgeSkpIHtcbiAgICAgIG5leHRYID0gcG9zaXRpdmVYID8gTWF0aC5mbG9vcih4KSArIDEgOiBNYXRoLmNlaWwoeCkgLSAxXG4gICAgICBuZXh0WSA9IHBvc2l0aXZlWSA/IE1hdGguZmxvb3IoeSkgKyAxIDogTWF0aC5jZWlsKHkpIC0gMVxuICAgICAgaWYgKHRoaXMueDIgLSB0aGlzLngxID09PSAwKSB7XG4gICAgICAgIHkgPSBuZXh0WVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnkyIC0gdGhpcy55MSA9PT0gMCkge1xuICAgICAgICB4ID0gbmV4dFhcbiAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMoKG5leHRYIC0geCkgLyAodGhpcy54MiAtIHRoaXMueDEpKSA8IE1hdGguYWJzKChuZXh0WSAtIHkpIC8gKHRoaXMueTIgLSB0aGlzLnkxKSkpIHtcbiAgICAgICAgeCA9IG5leHRYXG4gICAgICAgIHkgPSAobmV4dFggLSB0aGlzLngxKSAvIHJhdGlvICsgdGhpcy55MVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9IChuZXh0WSAtIHRoaXMueTEpICogcmF0aW8gKyB0aGlzLngxXG4gICAgICAgIHkgPSBuZXh0WVxuICAgICAgfVxuICAgICAgdGlsZVggPSBwb3NpdGl2ZVggPyB4IDogTWF0aC5jZWlsKHgpIC0gMVxuICAgICAgdGlsZVkgPSBwb3NpdGl2ZVkgPyB5IDogTWF0aC5jZWlsKHkpIC0gMVxuICAgIH1cbiAgICBpZiAodG90YWwgPD0gTWF0aC5hYnMoeCAtIHRoaXMueDEpICsgTWF0aC5hYnMoeSAtIHRoaXMueTEpKSB7XG4gICAgICB0aGlzLmVuZFBvaW50ID0ge1xuICAgICAgICB4OiB0aGlzLngyLFxuICAgICAgICB5OiB0aGlzLnkyLFxuICAgICAgICB0aWxlOiB0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih0aGlzLngyKSwgTWF0aC5mbG9vcih0aGlzLnkyKSlcbiAgICAgIH1cbiAgICAgIHRoaXMuc3VjY2VzcyA9IHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5lbmRQb2ludCA9IHtcbiAgICAgICAgeDogeCxcbiAgICAgICAgeTogeSxcbiAgICAgICAgdGlsZTogdGhpcy50aWxlcy5nZXRUaWxlKE1hdGguZmxvb3IodGlsZVgpLCBNYXRoLmZsb29yKHRpbGVZKSlcbiAgICAgIH1cbiAgICAgIHRoaXMuc3VjY2VzcyA9IGZhbHNlXG4gICAgfVxuICB9XG5cbiAgZm9yY2VTdWNjZXNzICgpIHtcbiAgICB0aGlzLmVuZFBvaW50ID0ge1xuICAgICAgeDogdGhpcy54MixcbiAgICAgIHk6IHRoaXMueTIsXG4gICAgICB0aWxlOiB0aGlzLnRpbGVzLmdldFRpbGUoTWF0aC5mbG9vcih0aGlzLngyKSwgTWF0aC5mbG9vcih0aGlzLnkyKSlcbiAgICB9XG4gICAgdGhpcy5zdWNjZXNzID0gdHJ1ZVxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgZ2V0U3VjY2VzcyAoKSB7XG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQpIHtcbiAgICAgIHRoaXMuY2FsY3VsKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuc3VjY2Vzc1xuICB9XG5cbiAgZ2V0RW5kUG9pbnQgKCkge1xuICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICB0aGlzLmNhbGN1bCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmVuZFBvaW50XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBMaW5lT2ZTaWdodFxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5cbmNsYXNzIE1hcCBleHRlbmRzIEVsZW1lbnQge1xuICBfYWRkVG9Cb25kYXJpZXMgKGxvY2F0aW9uLCBib3VuZGFyaWVzKSB7XG4gICAgaWYgKChib3VuZGFyaWVzLnRvcCA9PSBudWxsKSB8fCBsb2NhdGlvbi55IDwgYm91bmRhcmllcy50b3ApIHtcbiAgICAgIGJvdW5kYXJpZXMudG9wID0gbG9jYXRpb24ueVxuICAgIH1cbiAgICBpZiAoKGJvdW5kYXJpZXMubGVmdCA9PSBudWxsKSB8fCBsb2NhdGlvbi54IDwgYm91bmRhcmllcy5sZWZ0KSB7XG4gICAgICBib3VuZGFyaWVzLmxlZnQgPSBsb2NhdGlvbi54XG4gICAgfVxuICAgIGlmICgoYm91bmRhcmllcy5ib3R0b20gPT0gbnVsbCkgfHwgbG9jYXRpb24ueSA+IGJvdW5kYXJpZXMuYm90dG9tKSB7XG4gICAgICBib3VuZGFyaWVzLmJvdHRvbSA9IGxvY2F0aW9uLnlcbiAgICB9XG4gICAgaWYgKChib3VuZGFyaWVzLnJpZ2h0ID09IG51bGwpIHx8IGxvY2F0aW9uLnggPiBib3VuZGFyaWVzLnJpZ2h0KSB7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gbG9jYXRpb24ueFxuICAgIH1cbiAgfVxufTtcblxuTWFwLnByb3BlcnRpZXMoe1xuICBsb2NhdGlvbnM6IHtcbiAgICBjb2xsZWN0aW9uOiB7XG4gICAgICBjbG9zZXN0OiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIgbWluLCBtaW5EaXN0XG4gICAgICAgIG1pbiA9IG51bGxcbiAgICAgICAgbWluRGlzdCA9IG51bGxcbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICAgIHZhciBkaXN0XG4gICAgICAgICAgZGlzdCA9IGxvY2F0aW9uLmRpc3QoeCwgeSlcbiAgICAgICAgICBpZiAoKG1pbiA9PSBudWxsKSB8fCBtaW5EaXN0ID4gZGlzdCkge1xuICAgICAgICAgICAgbWluID0gbG9jYXRpb25cbiAgICAgICAgICAgIG1pbkRpc3QgPSBkaXN0XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gbWluXG4gICAgICB9LFxuICAgICAgY2xvc2VzdHM6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBkaXN0c1xuICAgICAgICBkaXN0cyA9IHRoaXMubWFwKGZ1bmN0aW9uIChsb2NhdGlvbikge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXN0OiBsb2NhdGlvbi5kaXN0KHgsIHkpLFxuICAgICAgICAgICAgbG9jYXRpb246IGxvY2F0aW9uXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBkaXN0cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgcmV0dXJuIGEuZGlzdCAtIGIuZGlzdFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gdGhpcy5jb3B5KGRpc3RzLm1hcChmdW5jdGlvbiAoZGlzdCkge1xuICAgICAgICAgIHJldHVybiBkaXN0LmxvY2F0aW9uXG4gICAgICAgIH0pKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYm91bmRhcmllczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGJvdW5kYXJpZXNcbiAgICAgIGJvdW5kYXJpZXMgPSB7XG4gICAgICAgIHRvcDogbnVsbCxcbiAgICAgICAgbGVmdDogbnVsbCxcbiAgICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgICByaWdodDogbnVsbFxuICAgICAgfVxuICAgICAgdGhpcy5sb2NhdGlvbnMuZm9yRWFjaCgobG9jYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZFRvQm9uZGFyaWVzKGxvY2F0aW9uLCBib3VuZGFyaWVzKVxuICAgICAgfSlcbiAgICAgIHJldHVybiBib3VuZGFyaWVzXG4gICAgfSxcbiAgICBvdXRwdXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hcFxuIiwiY29uc3QgVGlsZWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZWRcblxuY2xhc3MgT2JzdGFjbGUgZXh0ZW5kcyBUaWxlZCB7XG4gIHVwZGF0ZVdhbGthYmxlcyAob2xkKSB7XG4gICAgdmFyIHJlZiwgcmVmMVxuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgaWYgKChyZWYgPSBvbGQud2Fsa2FibGVNZW1iZXJzKSAhPSBudWxsKSB7XG4gICAgICAgIHJlZi5yZW1vdmVSZWYoe1xuICAgICAgICAgIG5hbWU6ICd3YWxrYWJsZScsXG4gICAgICAgICAgb2JqOiB0aGlzXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnRpbGUpIHtcbiAgICAgIHJldHVybiAocmVmMSA9IHRoaXMudGlsZS53YWxrYWJsZU1lbWJlcnMpICE9IG51bGwgPyByZWYxLnNldFZhbHVlUmVmKGZhbHNlLCAnd2Fsa2FibGUnLCB0aGlzKSA6IG51bGxcbiAgICB9XG4gIH1cbn07XG5cbk9ic3RhY2xlLnByb3BlcnRpZXMoe1xuICB0aWxlOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQsIG92ZXJyaWRlZCkge1xuICAgICAgb3ZlcnJpZGVkKG9sZClcbiAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVdhbGthYmxlcyhvbGQpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9ic3RhY2xlXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJylcbmNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpXG5cbmNsYXNzIFBhdGhXYWxrIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yICh3YWxrZXIsIHBhdGgsIG9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKVxuICAgIHRoaXMud2Fsa2VyID0gd2Fsa2VyXG4gICAgdGhpcy5wYXRoID0gcGF0aFxuICB9XG5cbiAgc3RhcnQgKCkge1xuICAgIGlmICghdGhpcy5wYXRoLnNvbHV0aW9uKSB7XG4gICAgICB0aGlzLnBhdGguY2FsY3VsKClcbiAgICB9XG4gICAgaWYgKHRoaXMucGF0aC5zb2x1dGlvbikge1xuICAgICAgdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5pc2goKVxuICAgICAgfSwgdGhpcy50b3RhbFRpbWUpXG4gICAgICB0aGlzLndhbGtlci50aWxlTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ3Bvc2l0aW9uLnRpbGUnLCB0aGlzKVxuICAgICAgdGhpcy53YWxrZXIub2Zmc2V0WE1lbWJlcnMuYWRkUHJvcGVydHlQYXRoKCdwb3NpdGlvbi5vZmZzZXRYJywgdGhpcylcbiAgICAgIHJldHVybiB0aGlzLndhbGtlci5vZmZzZXRZTWVtYmVycy5hZGRQcm9wZXJ0eVBhdGgoJ3Bvc2l0aW9uLm9mZnNldFknLCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIHN0b3AgKCkge1xuICAgIHJldHVybiB0aGlzLnBhdGhUaW1lb3V0LnBhdXNlKClcbiAgfVxuXG4gIGZpbmlzaCAoKSB7XG4gICAgdGhpcy53YWxrZXIudGlsZSA9IHRoaXMucG9zaXRpb24udGlsZVxuICAgIHRoaXMud2Fsa2VyLm9mZnNldFggPSB0aGlzLnBvc2l0aW9uLm9mZnNldFhcbiAgICB0aGlzLndhbGtlci5vZmZzZXRZID0gdGhpcy5wb3NpdGlvbi5vZmZzZXRZXG4gICAgdGhpcy5lbWl0KCdmaW5pc2hlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGludGVycnVwdCAoKSB7XG4gICAgdGhpcy5lbWl0KCdpbnRlcnJ1cHRlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGVuZCAoKSB7XG4gICAgdGhpcy5lbWl0KCdlbmQnKVxuICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMud2Fsa2VyLndhbGsgPT09IHRoaXMpIHtcbiAgICAgIHRoaXMud2Fsa2VyLndhbGsgPSBudWxsXG4gICAgfVxuICAgIHRoaXMud2Fsa2VyLnRpbGVNZW1iZXJzLnJlbW92ZVJlZih7XG4gICAgICBuYW1lOiAncG9zaXRpb24udGlsZScsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMud2Fsa2VyLm9mZnNldFhNZW1iZXJzLnJlbW92ZVJlZih7XG4gICAgICBuYW1lOiAncG9zaXRpb24ub2Zmc2V0WCcsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMud2Fsa2VyLm9mZnNldFlNZW1iZXJzLnJlbW92ZVJlZih7XG4gICAgICBuYW1lOiAncG9zaXRpb24ub2Zmc2V0WScsXG4gICAgICBvYmo6IHRoaXNcbiAgICB9KVxuICAgIHRoaXMucGF0aFRpbWVvdXQuZGVzdHJveSgpXG4gICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KClcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoKVxuICB9XG59O1xuXG5QYXRoV2Fsay5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5cblBhdGhXYWxrLnByb3BlcnRpZXMoe1xuICBzcGVlZDoge1xuICAgIGRlZmF1bHQ6IDVcbiAgfSxcbiAgdGltaW5nOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVmXG4gICAgICBpZiAoKHJlZiA9IHRoaXMud2Fsa2VyLmdhbWUpICE9IG51bGwgPyByZWYudGltaW5nIDogbnVsbCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrZXIuZ2FtZS50aW1pbmdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgVGltaW5nKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHBhdGhMZW5ndGg6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGguc29sdXRpb24uZ2V0VG90YWxMZW5ndGgoKVxuICAgIH1cbiAgfSxcbiAgdG90YWxUaW1lOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXRoTGVuZ3RoIC8gdGhpcy5zcGVlZCAqIDEwMDBcbiAgICB9XG4gIH0sXG4gIHBvc2l0aW9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhdGguZ2V0UG9zQXRQcmMoaW52YWxpZGF0b3IucHJvcFBhdGgoJ3BhdGhUaW1lb3V0LnByYycpIHx8IDApXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhdGhXYWxrXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IExpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi9MaW5lT2ZTaWdodCcpXG5jb25zdCBUaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpXG5cbmNsYXNzIFBlcnNvbmFsV2VhcG9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNhbkJlVXNlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY2hhcmdlZFxuICB9XG5cbiAgY2FuVXNlT24gKHRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmNhblVzZUZyb20odGhpcy51c2VyLnRpbGUsIHRhcmdldClcbiAgfVxuXG4gIGNhblVzZUZyb20gKHRpbGUsIHRhcmdldCkge1xuICAgIGlmICh0aGlzLnJhbmdlID09PSAxKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbk1lbGVlUmFuZ2UodGlsZSwgdGFyZ2V0KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5pblJhbmdlKHRpbGUsIHRhcmdldCkgJiYgdGhpcy5oYXNMaW5lT2ZTaWdodCh0aWxlLCB0YXJnZXQpXG4gICAgfVxuICB9XG5cbiAgaW5SYW5nZSAodGlsZSwgdGFyZ2V0KSB7XG4gICAgdmFyIHJlZiwgdGFyZ2V0VGlsZVxuICAgIHRhcmdldFRpbGUgPSB0YXJnZXQudGlsZSB8fCB0YXJnZXRcbiAgICByZXR1cm4gKChyZWYgPSB0aWxlLmRpc3QodGFyZ2V0VGlsZSkpICE9IG51bGwgPyByZWYubGVuZ3RoIDogbnVsbCkgPD0gdGhpcy5yYW5nZVxuICB9XG5cbiAgaW5NZWxlZVJhbmdlICh0aWxlLCB0YXJnZXQpIHtcbiAgICB2YXIgdGFyZ2V0VGlsZVxuICAgIHRhcmdldFRpbGUgPSB0YXJnZXQudGlsZSB8fCB0YXJnZXRcbiAgICByZXR1cm4gTWF0aC5hYnModGFyZ2V0VGlsZS54IC0gdGlsZS54KSArIE1hdGguYWJzKHRhcmdldFRpbGUueSAtIHRpbGUueSkgPT09IDFcbiAgfVxuXG4gIGhhc0xpbmVPZlNpZ2h0ICh0aWxlLCB0YXJnZXQpIHtcbiAgICB2YXIgbG9zLCB0YXJnZXRUaWxlXG4gICAgdGFyZ2V0VGlsZSA9IHRhcmdldC50aWxlIHx8IHRhcmdldFxuICAgIGxvcyA9IG5ldyBMaW5lT2ZTaWdodCh0YXJnZXRUaWxlLmNvbnRhaW5lciwgdGlsZS54ICsgMC41LCB0aWxlLnkgKyAwLjUsIHRhcmdldFRpbGUueCArIDAuNSwgdGFyZ2V0VGlsZS55ICsgMC41KVxuICAgIGxvcy50cmF2ZXJzYWJsZUNhbGxiYWNrID0gZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgIHJldHVybiB0aWxlLndhbGthYmxlXG4gICAgfVxuICAgIHJldHVybiBsb3MuZ2V0U3VjY2VzcygpXG4gIH1cblxuICB1c2VPbiAodGFyZ2V0KSB7XG4gICAgaWYgKHRoaXMuY2FuQmVVc2VkKCkpIHtcbiAgICAgIHRhcmdldC5kYW1hZ2UodGhpcy5wb3dlcilcbiAgICAgIHRoaXMuY2hhcmdlZCA9IGZhbHNlXG4gICAgICByZXR1cm4gdGhpcy5yZWNoYXJnZSgpXG4gICAgfVxuICB9XG5cbiAgcmVjaGFyZ2UgKCkge1xuICAgIHRoaXMuY2hhcmdpbmcgPSB0cnVlXG4gICAgdGhpcy5jaGFyZ2VUaW1lb3V0ID0gdGhpcy50aW1pbmcuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmNoYXJnaW5nID0gZmFsc2VcbiAgICAgIHJldHVybiB0aGlzLnJlY2hhcmdlZCgpXG4gICAgfSwgdGhpcy5yZWNoYXJnZVRpbWUpXG4gIH1cblxuICByZWNoYXJnZWQgKCkge1xuICAgIHRoaXMuY2hhcmdlZCA9IHRydWVcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIGlmICh0aGlzLmNoYXJnZVRpbWVvdXQpIHtcbiAgICAgIHJldHVybiB0aGlzLmNoYXJnZVRpbWVvdXQuZGVzdHJveSgpXG4gICAgfVxuICB9XG59O1xuXG5QZXJzb25hbFdlYXBvbi5wcm9wZXJ0aWVzKHtcbiAgcmVjaGFyZ2VUaW1lOiB7XG4gICAgZGVmYXVsdDogMTAwMFxuICB9LFxuICBjaGFyZ2VkOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBjaGFyZ2luZzoge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICBkZWZhdWx0OiAxMFxuICB9LFxuICBkcHM6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy5wb3dlclByb3BlcnR5KSAvIGludmFsaWRhdG9yLnByb3AodGhpcy5yZWNoYXJnZVRpbWVQcm9wZXJ0eSkgKiAxMDAwXG4gICAgfVxuICB9LFxuICByYW5nZToge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIHVzZXI6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBQZXJzb25hbFdlYXBvblxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEVsZW1lbnQge1xuICBzZXREZWZhdWx0cyAoKSB7XG4gICAgdmFyIGZpcnN0XG4gICAgZmlyc3QgPSB0aGlzLmdhbWUucGxheWVycy5sZW5ndGggPT09IDBcbiAgICB0aGlzLmdhbWUucGxheWVycy5hZGQodGhpcylcbiAgICBpZiAoZmlyc3QgJiYgIXRoaXMuY29udHJvbGxlciAmJiB0aGlzLmdhbWUuZGVmYXVsdFBsYXllckNvbnRyb2xsZXJDbGFzcykge1xuICAgICAgY29uc3QgUGxheWVyQ29udHJvbGxlckNsYXNzID0gdGhpcy5nYW1lLmRlZmF1bHRQbGF5ZXJDb250cm9sbGVyQ2xhc3NcbiAgICAgIHRoaXMuY29udHJvbGxlciA9IG5ldyBQbGF5ZXJDb250cm9sbGVyQ2xhc3MoKVxuICAgIH1cbiAgfVxuXG4gIGNhblRhcmdldEFjdGlvbk9uIChlbGVtKSB7XG4gICAgdmFyIGFjdGlvbiwgcmVmXG4gICAgYWN0aW9uID0gdGhpcy5zZWxlY3RlZEFjdGlvbiB8fCAoKHJlZiA9IHRoaXMuc2VsZWN0ZWQpICE9IG51bGwgPyByZWYuZGVmYXVsdEFjdGlvbiA6IG51bGwpXG4gICAgcmV0dXJuIChhY3Rpb24gIT0gbnVsbCkgJiYgdHlwZW9mIGFjdGlvbi5jYW5UYXJnZXQgPT09ICdmdW5jdGlvbicgJiYgYWN0aW9uLmNhblRhcmdldChlbGVtKVxuICB9XG5cbiAgZ3Vlc3NBY3Rpb25UYXJnZXQgKGFjdGlvbikge1xuICAgIHZhciBzZWxlY3RlZFxuICAgIHNlbGVjdGVkID0gdGhpcy5zZWxlY3RlZFxuICAgIGlmICh0eXBlb2YgYWN0aW9uLmNhblRhcmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiAoYWN0aW9uLnRhcmdldCA9PSBudWxsKSAmJiBhY3Rpb24uYWN0b3IgIT09IHNlbGVjdGVkICYmIGFjdGlvbi5jYW5UYXJnZXQoc2VsZWN0ZWQpKSB7XG4gICAgICByZXR1cm4gYWN0aW9uLndpdGhUYXJnZXQoc2VsZWN0ZWQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBhY3Rpb25cbiAgICB9XG4gIH1cblxuICBjYW5TZWxlY3QgKGVsZW0pIHtcbiAgICByZXR1cm4gdHlwZW9mIGVsZW0uaXNTZWxlY3RhYmxlQnkgPT09ICdmdW5jdGlvbicgJiYgZWxlbS5pc1NlbGVjdGFibGVCeSh0aGlzKVxuICB9XG5cbiAgY2FuRm9jdXNPbiAoZWxlbSkge1xuICAgIGlmICh0eXBlb2YgZWxlbS5Jc0ZvY3VzYWJsZUJ5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gZWxlbS5Jc0ZvY3VzYWJsZUJ5KHRoaXMpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbS5Jc1NlbGVjdGFibGVCeSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIGVsZW0uSXNTZWxlY3RhYmxlQnkodGhpcylcbiAgICB9XG4gIH1cblxuICBzZWxlY3RBY3Rpb24gKGFjdGlvbikge1xuICAgIGlmIChhY3Rpb24uaXNSZWFkeSgpKSB7XG4gICAgICBhY3Rpb24uc3RhcnQoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdGVkQWN0aW9uID0gYWN0aW9uXG4gICAgfVxuICB9XG5cbiAgc2V0QWN0aW9uVGFyZ2V0IChlbGVtKSB7XG4gICAgdmFyIGFjdGlvblxuICAgIGFjdGlvbiA9IHRoaXMuc2VsZWN0ZWRBY3Rpb24gfHwgKHRoaXMuc2VsZWN0ZWQgIT0gbnVsbCA/IHRoaXMuc2VsZWN0ZWQuZGVmYXVsdEFjdGlvbiA6IG51bGwpXG4gICAgYWN0aW9uID0gYWN0aW9uLndpdGhUYXJnZXQoZWxlbSlcbiAgICBpZiAoYWN0aW9uLmlzUmVhZHkoKSkge1xuICAgICAgYWN0aW9uLnN0YXJ0KClcbiAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpb24gPSBudWxsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBY3Rpb24gPSBhY3Rpb25cbiAgICB9XG4gIH1cbn07XG5cblBsYXllci5wcm9wZXJ0aWVzKHtcbiAgbmFtZToge1xuICAgIGRlZmF1bHQ6ICdQbGF5ZXInXG4gIH0sXG4gIGZvY3VzZWQ6IHt9LFxuICBzZWxlY3RlZDoge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKHZhbCwgb2xkKSB7XG4gICAgICBpZiAob2xkICE9IG51bGwgJiYgb2xkLnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwgJiYgb2xkLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpKSB7XG4gICAgICAgIG9sZC5zZWxlY3RlZCA9IGZhbHNlXG4gICAgICB9XG4gICAgICBpZiAodmFsICE9IG51bGwgJiYgdmFsLnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwgJiYgdmFsLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCdzZWxlY3RlZCcpKSB7XG4gICAgICAgIHZhbC5zZWxlY3RlZCA9IHRoaXNcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGdsb2JhbEFjdGlvblByb3ZpZGVyczoge1xuICAgIGNvbGxlY3Rpb246IHRydWVcbiAgfSxcbiAgYWN0aW9uUHJvdmlkZXJzOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciByZXMsIHNlbGVjdGVkXG4gICAgICByZXMgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuZ2xvYmFsQWN0aW9uUHJvdmlkZXJzUHJvcGVydHkpLnRvQXJyYXkoKVxuICAgICAgc2VsZWN0ZWQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMuc2VsZWN0ZWRQcm9wZXJ0eSlcbiAgICAgIGlmIChzZWxlY3RlZCAmJiBzZWxlY3RlZC5hY3Rpb25Qcm92aWRlcikge1xuICAgICAgICByZXMucHVzaChzZWxlY3RlZC5hY3Rpb25Qcm92aWRlcilcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9XG4gIH0sXG4gIGF2YWlsYWJsZUFjdGlvbnM6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3AodGhpcy5hY3Rpb25Qcm92aWRlcnNQcm9wZXJ0eSkucmVkdWNlKChyZXMsIHByb3ZpZGVyKSA9PiB7XG4gICAgICAgIHZhciBhY3Rpb25zLCBzZWxlY3RlZFxuICAgICAgICBhY3Rpb25zID0gaW52YWxpZGF0b3IucHJvcChwcm92aWRlci5hY3Rpb25zUHJvcGVydHkpLnRvQXJyYXkoKVxuICAgICAgICBzZWxlY3RlZCA9IGludmFsaWRhdG9yLnByb3AodGhpcy5zZWxlY3RlZFByb3BlcnR5KVxuICAgICAgICBpZiAoc2VsZWN0ZWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFjdGlvbnMgPSBhY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ndWVzc0FjdGlvblRhcmdldChhY3Rpb24pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9ucykge1xuICAgICAgICAgIHJldHVybiByZXMuY29uY2F0KGFjdGlvbnMpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHJlc1xuICAgICAgICB9XG4gICAgICB9LCBbXSlcbiAgICB9XG4gIH0sXG4gIHNlbGVjdGVkQWN0aW9uOiB7fSxcbiAgY29udHJvbGxlcjoge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKHZhbCwgb2xkKSB7XG4gICAgICBpZiAodGhpcy5jb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlci5wbGF5ZXIgPSB0aGlzXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBnYW1lOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh0aGlzLmdhbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBQbGF5ZXJcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVGltaW5nID0gcmVxdWlyZSgncGFyYWxsZWxpby10aW1pbmcnKVxuXG5jbGFzcyBQcm9qZWN0aWxlIGV4dGVuZHMgRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgc3VwZXIob3B0aW9ucylcbiAgICB0aGlzLmluaXQoKVxuICB9XG5cbiAgaW5pdCAoKSB7fVxuXG4gIGxhdW5jaCAoKSB7XG4gICAgdGhpcy5tb3ZpbmcgPSB0cnVlXG4gICAgdGhpcy5wYXRoVGltZW91dCA9IHRoaXMudGltaW5nLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5kZWxpdmVyUGF5bG9hZCgpXG4gICAgICB0aGlzLm1vdmluZyA9IGZhbHNlXG4gICAgfSwgdGhpcy5wYXRoTGVuZ3RoIC8gdGhpcy5zcGVlZCAqIDEwMDApXG4gIH1cblxuICBkZWxpdmVyUGF5bG9hZCAoKSB7XG4gICAgY29uc3QgUHJvcGFnYXRpb25UeXBlID0gdGhpcy5wcm9wYWdhdGlvblR5cGVcbiAgICBjb25zdCBwYXlsb2FkID0gbmV3IFByb3BhZ2F0aW9uVHlwZSh7XG4gICAgICB0aWxlOiB0aGlzLnRhcmdldC50aWxlIHx8IHRoaXMudGFyZ2V0LFxuICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICByYW5nZTogdGhpcy5ibGFzdFJhbmdlXG4gICAgfSlcbiAgICBwYXlsb2FkLmFwcGx5KClcbiAgICB0aGlzLnBheWxvYWREZWxpdmVyZWQoKVxuICAgIHJldHVybiBwYXlsb2FkXG4gIH1cblxuICBwYXlsb2FkRGVsaXZlcmVkICgpIHtcbiAgICByZXR1cm4gdGhpcy5kZXN0cm95KClcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmRlc3Ryb3koKVxuICB9XG59O1xuXG5Qcm9qZWN0aWxlLnByb3BlcnRpZXMoe1xuICBvcmlnaW46IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHRhcmdldDoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICBkZWZhdWx0OiAxMFxuICB9LFxuICBibGFzdFJhbmdlOiB7XG4gICAgZGVmYXVsdDogMVxuICB9LFxuICBwcm9wYWdhdGlvblR5cGU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHNwZWVkOiB7XG4gICAgZGVmYXVsdDogMTBcbiAgfSxcbiAgcGF0aExlbmd0aDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGRpc3RcbiAgICAgIGlmICgodGhpcy5vcmlnaW5UaWxlICE9IG51bGwpICYmICh0aGlzLnRhcmdldFRpbGUgIT0gbnVsbCkpIHtcbiAgICAgICAgZGlzdCA9IHRoaXMub3JpZ2luVGlsZS5kaXN0KHRoaXMudGFyZ2V0VGlsZSlcbiAgICAgICAgaWYgKGRpc3QpIHtcbiAgICAgICAgICByZXR1cm4gZGlzdC5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIDEwMFxuICAgIH1cbiAgfSxcbiAgb3JpZ2luVGlsZToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICB2YXIgb3JpZ2luXG4gICAgICBvcmlnaW4gPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMub3JpZ2luUHJvcGVydHkpXG4gICAgICBpZiAob3JpZ2luICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbi50aWxlIHx8IG9yaWdpblxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgdGFyZ2V0VGlsZToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICB2YXIgdGFyZ2V0XG4gICAgICB0YXJnZXQgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMudGFyZ2V0UHJvcGVydHkpXG4gICAgICBpZiAodGFyZ2V0ICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC50aWxlIHx8IHRhcmdldFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29udGFpbmVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0ZSkge1xuICAgICAgdmFyIG9yaWdpblRpbGUsIHRhcmdldFRpbGVcbiAgICAgIG9yaWdpblRpbGUgPSBpbnZhbGlkYXRlLnByb3AodGhpcy5vcmlnaW5UaWxlUHJvcGVydHkpXG4gICAgICB0YXJnZXRUaWxlID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMudGFyZ2V0VGlsZVByb3BlcnR5KVxuICAgICAgaWYgKG9yaWdpblRpbGUuY29udGFpbmVyID09PSB0YXJnZXRUaWxlLmNvbnRhaW5lcikge1xuICAgICAgICByZXR1cm4gb3JpZ2luVGlsZS5jb250YWluZXJcbiAgICAgIH0gZWxzZSBpZiAoaW52YWxpZGF0ZS5wcm9wKHRoaXMucHJjUGF0aFByb3BlcnR5KSA+IDAuNSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0VGlsZS5jb250YWluZXJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5UaWxlLmNvbnRhaW5lclxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgeDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBzdGFydFBvc1xuICAgICAgc3RhcnRQb3MgPSBpbnZhbGlkYXRlLnByb3AodGhpcy5zdGFydFBvc1Byb3BlcnR5KVxuICAgICAgcmV0dXJuIChpbnZhbGlkYXRlLnByb3AodGhpcy50YXJnZXRQb3NQcm9wZXJ0eSkueCAtIHN0YXJ0UG9zLngpICogaW52YWxpZGF0ZS5wcm9wKHRoaXMucHJjUGF0aFByb3BlcnR5KSArIHN0YXJ0UG9zLnhcbiAgICB9XG4gIH0sXG4gIHk6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRlKSB7XG4gICAgICB2YXIgc3RhcnRQb3NcbiAgICAgIHN0YXJ0UG9zID0gaW52YWxpZGF0ZS5wcm9wKHRoaXMuc3RhcnRQb3NQcm9wZXJ0eSlcbiAgICAgIHJldHVybiAoaW52YWxpZGF0ZS5wcm9wKHRoaXMudGFyZ2V0UG9zUHJvcGVydHkpLnkgLSBzdGFydFBvcy55KSAqIGludmFsaWRhdGUucHJvcCh0aGlzLnByY1BhdGhQcm9wZXJ0eSkgKyBzdGFydFBvcy55XG4gICAgfVxuICB9LFxuICBzdGFydFBvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBjb250YWluZXIsIGRpc3QsIG9mZnNldCwgb3JpZ2luVGlsZVxuICAgICAgb3JpZ2luVGlsZSA9IGludmFsaWRhdGUucHJvcCh0aGlzLm9yaWdpblRpbGVQcm9wZXJ0eSlcbiAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdGUucHJvcCh0aGlzLmNvbnRhaW5lclByb3BlcnR5KVxuICAgICAgb2Zmc2V0ID0gdGhpcy5zdGFydE9mZnNldFxuICAgICAgaWYgKG9yaWdpblRpbGUuY29udGFpbmVyICE9PSBjb250YWluZXIpIHtcbiAgICAgICAgZGlzdCA9IGNvbnRhaW5lci5kaXN0KG9yaWdpblRpbGUuY29udGFpbmVyKVxuICAgICAgICBvZmZzZXQueCArPSBkaXN0LnhcbiAgICAgICAgb2Zmc2V0LnkgKz0gZGlzdC55XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBvcmlnaW5UaWxlLnggKyBvZmZzZXQueCxcbiAgICAgICAgeTogb3JpZ2luVGlsZS55ICsgb2Zmc2V0LnlcbiAgICAgIH1cbiAgICB9LFxuICAgIG91dHB1dDogZnVuY3Rpb24gKHZhbCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHZhbClcbiAgICB9XG4gIH0sXG4gIHRhcmdldFBvczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdGUpIHtcbiAgICAgIHZhciBjb250YWluZXIsIGRpc3QsIG9mZnNldCwgdGFyZ2V0VGlsZVxuICAgICAgdGFyZ2V0VGlsZSA9IGludmFsaWRhdGUucHJvcCh0aGlzLnRhcmdldFRpbGVQcm9wZXJ0eSlcbiAgICAgIGNvbnRhaW5lciA9IGludmFsaWRhdGUucHJvcCh0aGlzLmNvbnRhaW5lclByb3BlcnR5KVxuICAgICAgb2Zmc2V0ID0gdGhpcy50YXJnZXRPZmZzZXRcbiAgICAgIGlmICh0YXJnZXRUaWxlLmNvbnRhaW5lciAhPT0gY29udGFpbmVyKSB7XG4gICAgICAgIGRpc3QgPSBjb250YWluZXIuZGlzdCh0YXJnZXRUaWxlLmNvbnRhaW5lcilcbiAgICAgICAgb2Zmc2V0LnggKz0gZGlzdC54XG4gICAgICAgIG9mZnNldC55ICs9IGRpc3QueVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogdGFyZ2V0VGlsZS54ICsgb2Zmc2V0LngsXG4gICAgICAgIHk6IHRhcmdldFRpbGUueSArIG9mZnNldC55XG4gICAgICB9XG4gICAgfSxcbiAgICBvdXRwdXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpXG4gICAgfVxuICB9LFxuICBzdGFydE9mZnNldDoge1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHg6IDAuNSxcbiAgICAgIHk6IDAuNVxuICAgIH0sXG4gICAgb3V0cHV0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdmFsKVxuICAgIH1cbiAgfSxcbiAgdGFyZ2V0T2Zmc2V0OiB7XG4gICAgZGVmYXVsdDoge1xuICAgICAgeDogMC41LFxuICAgICAgeTogMC41XG4gICAgfSxcbiAgICBvdXRwdXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB2YWwpXG4gICAgfVxuICB9LFxuICBwcmNQYXRoOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgcmVmXG4gICAgICByZXR1cm4gKChyZWYgPSB0aGlzLnBhdGhUaW1lb3V0KSAhPSBudWxsID8gcmVmLnByYyA6IG51bGwpIHx8IDBcbiAgICB9XG4gIH0sXG4gIHRpbWluZzoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaW1pbmcoKVxuICAgIH1cbiAgfSxcbiAgbW92aW5nOiB7XG4gICAgZGVmYXVsdDogZmFsc2VcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9qZWN0aWxlXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcblxuY2xhc3MgUmVzc291cmNlIGV4dGVuZHMgRWxlbWVudCB7XG4gIHBhcnRpYWxDaGFuZ2UgKHF0ZSkge1xuICAgIHZhciBhY2NlcHRhYmxlXG4gICAgYWNjZXB0YWJsZSA9IE1hdGgubWF4KHRoaXMubWluUXRlLCBNYXRoLm1pbih0aGlzLm1heFF0ZSwgcXRlKSlcbiAgICB0aGlzLnF0ZSA9IGFjY2VwdGFibGVcbiAgICByZXR1cm4gcXRlIC0gYWNjZXB0YWJsZVxuICB9XG59O1xuXG5SZXNzb3VyY2UucHJvcGVydGllcyh7XG4gIHR5cGU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHF0ZToge1xuICAgIGRlZmF1bHQ6IDAsXG4gICAgaW5nZXN0OiBmdW5jdGlvbiAocXRlKSB7XG4gICAgICBpZiAodGhpcy5tYXhRdGUgIT09IG51bGwgJiYgcXRlID4gdGhpcy5tYXhRdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW50IGhhdmUgbW9yZSB0aGFuICcgKyB0aGlzLm1heFF0ZSArICcgb2YgJyArIHRoaXMudHlwZS5uYW1lKVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMubWluUXRlICE9PSBudWxsICYmIHF0ZSA8IHRoaXMubWluUXRlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FudCBoYXZlIGxlc3MgdGhhbiAnICsgdGhpcy5taW5RdGUgKyAnIG9mICcgKyB0aGlzLnR5cGUubmFtZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBxdGVcbiAgICB9XG4gIH0sXG4gIG1heFF0ZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgbWluUXRlOiB7XG4gICAgZGVmYXVsdDogMFxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3NvdXJjZVxuIiwiY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBSZXNzb3VyY2UgPSByZXF1aXJlKCcuL1Jlc3NvdXJjZScpXG5cbmNsYXNzIFJlc3NvdXJjZVR5cGUgZXh0ZW5kcyBFbGVtZW50IHtcbiAgaW5pdFJlc3NvdXJjZSAob3B0KSB7XG4gICAgaWYgKHR5cGVvZiBvcHQgIT09ICdvYmplY3QnKSB7XG4gICAgICBvcHQgPSB7XG4gICAgICAgIHF0ZTogb3B0XG4gICAgICB9XG4gICAgfVxuICAgIG9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmYXVsdE9wdGlvbnMsIG9wdClcbiAgICBjb25zdCBSZXNzb3VyY2VDbGFzcyA9IHRoaXMucmVzc291cmNlQ2xhc3NcbiAgICByZXR1cm4gbmV3IFJlc3NvdXJjZUNsYXNzKG9wdClcbiAgfVxufTtcblxuUmVzc291cmNlVHlwZS5wcm9wZXJ0aWVzKHtcbiAgbmFtZToge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgcmVzc291cmNlQ2xhc3M6IHtcbiAgICBkZWZhdWx0OiBSZXNzb3VyY2VcbiAgfSxcbiAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICBkZWZhdWx0OiB7fVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3NvdXJjZVR5cGVcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgVHJhdmVsID0gcmVxdWlyZSgnLi9UcmF2ZWwnKVxuY29uc3QgVHJhdmVsQWN0aW9uID0gcmVxdWlyZSgnLi9hY3Rpb25zL1RyYXZlbEFjdGlvbicpXG5jb25zdCBBY3Rpb25Qcm92aWRlciA9IHJlcXVpcmUoJy4vYWN0aW9ucy9BY3Rpb25Qcm92aWRlcicpXG5jb25zdCBTaGlwSW50ZXJpb3IgPSByZXF1aXJlKCcuL1NoaXBJbnRlcmlvcicpXG5cbmNsYXNzIFNoaXAgZXh0ZW5kcyBFbGVtZW50IHtcbiAgdHJhdmVsVG8gKGxvY2F0aW9uKSB7XG4gICAgdmFyIHRyYXZlbFxuICAgIHRyYXZlbCA9IG5ldyBUcmF2ZWwoe1xuICAgICAgdHJhdmVsbGVyOiB0aGlzLFxuICAgICAgc3RhcnRMb2NhdGlvbjogdGhpcy5sb2NhdGlvbixcbiAgICAgIHRhcmdldExvY2F0aW9uOiBsb2NhdGlvblxuICAgIH0pXG4gICAgaWYgKHRyYXZlbC52YWxpZCkge1xuICAgICAgdHJhdmVsLnN0YXJ0KClcbiAgICAgIHRoaXMudHJhdmVsID0gdHJhdmVsXG4gICAgfVxuICB9XG59O1xuXG5TaGlwLnByb3BlcnRpZXMoe1xuICBsb2NhdGlvbjoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgdHJhdmVsOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBpbnRlcnJpb3I6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgU2hpcEludGVyaW9yKHsgc2hpcDogdGhpcyB9KVxuICAgIH1cbiAgfSxcbiAgYWN0aW9uUHJvdmlkZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHByb3ZpZGVyID0gbmV3IEFjdGlvblByb3ZpZGVyKHtcbiAgICAgICAgb3duZXI6IHRoaXNcbiAgICAgIH0pXG4gICAgICBwcm92aWRlci5hY3Rpb25zTWVtYmVycy5hZGQobmV3IFRyYXZlbEFjdGlvbih7XG4gICAgICAgIGFjdG9yOiB0aGlzXG4gICAgICB9KSlcbiAgICAgIHJldHVybiBwcm92aWRlclxuICAgIH1cbiAgfSxcbiAgc3BhY2VDb29kaW5hdGU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uIChpbnZhbGlkYXRvcikge1xuICAgICAgaWYgKGludmFsaWRhdG9yLnByb3AodGhpcy50cmF2ZWxQcm9wZXJ0eSkpIHtcbiAgICAgICAgcmV0dXJuIGludmFsaWRhdG9yLnByb3BQYXRoKCd0cmF2ZWwuc3BhY2VDb29kaW5hdGUnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB4OiBpbnZhbGlkYXRvci5wcm9wUGF0aCgnbG9jYXRpb24ueCcpLFxuICAgICAgICAgIHk6IGludmFsaWRhdG9yLnByb3BQYXRoKCdsb2NhdGlvbi55JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwXG4iLCJjb25zdCBUaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXJcbmNvbnN0IFNoaXBJbnRlcmlvckdlbmVyYXRvciA9IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9TaGlwSW50ZXJpb3JHZW5lcmF0b3InKVxuXG5jbGFzcyBTaGlwSW50ZXJpb3IgZXh0ZW5kcyBUaWxlQ29udGFpbmVyIHtcbiAgc2V0RGVmYXVsdHMgKCkge1xuICAgIGlmICghKHRoaXMudGlsZXMubGVuZ3RoID4gMCkpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGUoKVxuICAgIH1cbiAgICBpZiAodGhpcy5nYW1lLm1haW5UaWxlQ29udGFpbmVyID09IG51bGwpIHtcbiAgICAgIHRoaXMuZ2FtZS5tYWluVGlsZUNvbnRhaW5lciA9IHRoaXNcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZSAoZ2VuZXJhdG9yKSB7XG4gICAgZ2VuZXJhdG9yID0gZ2VuZXJhdG9yIHx8IG5ldyBTaGlwSW50ZXJpb3JHZW5lcmF0b3IoKVxuICAgIGdlbmVyYXRvci5zaGlwSW50ZXJpb3IgPSB0aGlzXG4gICAgZ2VuZXJhdG9yLmdlbmVyYXRlKClcbiAgfVxufVxuXG5TaGlwSW50ZXJpb3IucHJvcGVydGllcyh7XG4gIHg6IHtcbiAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG4gIHk6IHtcbiAgICBjb21wb3NlZDogdHJ1ZSxcbiAgICBkZWZhdWx0OiAwXG4gIH0sXG4gIGNvbnRhaW5lcjoge30sXG4gIHNoaXA6IHt9LFxuICBnYW1lOiB7XG4gICAgY2hhbmdlOiBmdW5jdGlvbiAodmFsLCBvbGQpIHtcbiAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0RGVmYXVsdHMoKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYWlybG9ja3M6IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuYWxsVGlsZXMoKS5maWx0ZXIoKHQpID0+IHR5cGVvZiB0LmF0dGFjaFRvID09PSAnZnVuY3Rpb24nKVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwSW50ZXJpb3JcbiIsImNvbnN0IFRpbGVkID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVkXG5jb25zdCBUaW1pbmcgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbWluZycpXG5jb25zdCBEYW1hZ2VhYmxlID0gcmVxdWlyZSgnLi9EYW1hZ2VhYmxlJylcbmNvbnN0IFByb2plY3RpbGUgPSByZXF1aXJlKCcuL1Byb2plY3RpbGUnKVxuXG5jbGFzcyBTaGlwV2VhcG9uIGV4dGVuZHMgVGlsZWQge1xuICBmaXJlICgpIHtcbiAgICB2YXIgcHJvamVjdGlsZVxuICAgIGlmICh0aGlzLmNhbkZpcmUpIHtcbiAgICAgIGNvbnN0IFByb2plY3RpbGVDbGFzcyA9IHRoaXMucHJvamVjdGlsZUNsYXNzXG4gICAgICBwcm9qZWN0aWxlID0gbmV3IFByb2plY3RpbGVDbGFzcyh7XG4gICAgICAgIG9yaWdpbjogdGhpcyxcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgcG93ZXI6IHRoaXMucG93ZXIsXG4gICAgICAgIGJsYXN0UmFuZ2U6IHRoaXMuYmxhc3RSYW5nZSxcbiAgICAgICAgcHJvcGFnYXRpb25UeXBlOiB0aGlzLnByb3BhZ2F0aW9uVHlwZSxcbiAgICAgICAgc3BlZWQ6IHRoaXMucHJvamVjdGlsZVNwZWVkLFxuICAgICAgICB0aW1pbmc6IHRoaXMudGltaW5nXG4gICAgICB9KVxuICAgICAgcHJvamVjdGlsZS5sYXVuY2goKVxuICAgICAgdGhpcy5jaGFyZ2VkID0gZmFsc2VcbiAgICAgIHRoaXMucmVjaGFyZ2UoKVxuICAgICAgcmV0dXJuIHByb2plY3RpbGVcbiAgICB9XG4gIH1cblxuICByZWNoYXJnZSAoKSB7XG4gICAgdGhpcy5jaGFyZ2luZyA9IHRydWVcbiAgICB0aGlzLmNoYXJnZVRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuY2hhcmdpbmcgPSBmYWxzZVxuICAgICAgcmV0dXJuIHRoaXMucmVjaGFyZ2VkKClcbiAgICB9LCB0aGlzLnJlY2hhcmdlVGltZSlcbiAgfVxuXG4gIHJlY2hhcmdlZCAoKSB7XG4gICAgdGhpcy5jaGFyZ2VkID0gdHJ1ZVxuICAgIGlmICh0aGlzLmF1dG9GaXJlKSB7XG4gICAgICByZXR1cm4gdGhpcy5maXJlKClcbiAgICB9XG4gIH1cbn07XG5cblNoaXBXZWFwb24uZXh0ZW5kKERhbWFnZWFibGUpXG5cblNoaXBXZWFwb24ucHJvcGVydGllcyh7XG4gIHJlY2hhcmdlVGltZToge1xuICAgIGRlZmF1bHQ6IDEwMDBcbiAgfSxcbiAgcG93ZXI6IHtcbiAgICBkZWZhdWx0OiAxMFxuICB9LFxuICBibGFzdFJhbmdlOiB7XG4gICAgZGVmYXVsdDogMVxuICB9LFxuICBwcm9wYWdhdGlvblR5cGU6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH0sXG4gIHByb2plY3RpbGVTcGVlZDoge1xuICAgIGRlZmF1bHQ6IDEwXG4gIH0sXG4gIHRhcmdldDoge1xuICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5hdXRvRmlyZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5maXJlKClcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNoYXJnZWQ6IHtcbiAgICBkZWZhdWx0OiB0cnVlXG4gIH0sXG4gIGNoYXJnaW5nOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBlbmFibGVkOiB7XG4gICAgZGVmYXVsdDogdHJ1ZVxuICB9LFxuICBhdXRvRmlyZToge1xuICAgIGRlZmF1bHQ6IHRydWVcbiAgfSxcbiAgY3JpdGljYWxIZWFsdGg6IHtcbiAgICBkZWZhdWx0OiAwLjNcbiAgfSxcbiAgY2FuRmlyZToge1xuICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0ICYmIHRoaXMuZW5hYmxlZCAmJiB0aGlzLmNoYXJnZWQgJiYgdGhpcy5oZWFsdGggLyB0aGlzLm1heEhlYWx0aCA+PSB0aGlzLmNyaXRpY2FsSGVhbHRoXG4gICAgfVxuICB9LFxuICB0aW1pbmc6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgVGltaW5nKClcbiAgICB9XG4gIH0sXG4gIHByb2plY3RpbGVDbGFzczoge1xuICAgIGRlZmF1bHQ6IFByb2plY3RpbGVcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaGlwV2VhcG9uXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcblxuY2xhc3MgU3RhclN5c3RlbSBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpXG4gICAgdGhpcy5pbml0KClcbiAgfVxuXG4gIGluaXQgKCkge31cblxuICBsaW5rVG8gKHN0YXIpIHtcbiAgICBpZiAoIXRoaXMubGlua3MuZmluZFN0YXIoc3RhcikpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZExpbmsobmV3IHRoaXMuY29uc3RydWN0b3IuTGluayh0aGlzLCBzdGFyKSlcbiAgICB9XG4gIH1cblxuICBhZGRMaW5rIChsaW5rKSB7XG4gICAgdGhpcy5saW5rcy5hZGQobGluaylcbiAgICBsaW5rLm90aGVyU3Rhcih0aGlzKS5saW5rcy5hZGQobGluaylcbiAgICByZXR1cm4gbGlua1xuICB9XG5cbiAgZGlzdCAoeCwgeSkge1xuICAgIHZhciB4RGlzdCwgeURpc3RcbiAgICB4RGlzdCA9IHRoaXMueCAtIHhcbiAgICB5RGlzdCA9IHRoaXMueSAtIHlcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh4RGlzdCAqIHhEaXN0KSArICh5RGlzdCAqIHlEaXN0KSlcbiAgfVxuXG4gIGlzU2VsZWN0YWJsZUJ5IChwbGF5ZXIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG59O1xuXG5TdGFyU3lzdGVtLnByb3BlcnRpZXMoe1xuICB4OiB7fSxcbiAgeToge30sXG4gIG5hbWU6IHt9LFxuICBsaW5rczoge1xuICAgIGNvbGxlY3Rpb246IHtcbiAgICAgIGZpbmRTdGFyOiBmdW5jdGlvbiAoc3Rhcikge1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kKGZ1bmN0aW9uIChsaW5rKSB7XG4gICAgICAgICAgcmV0dXJuIGxpbmsuc3RhcjIgPT09IHN0YXIgfHwgbGluay5zdGFyMSA9PT0gc3RhclxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcblxuU3RhclN5c3RlbS5jb2xsZW5jdGlvbkZuID0ge1xuICBjbG9zZXN0OiBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBtaW4sIG1pbkRpc3RcbiAgICBtaW4gPSBudWxsXG4gICAgbWluRGlzdCA9IG51bGxcbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24gKHN0YXIpIHtcbiAgICAgIHZhciBkaXN0XG4gICAgICBkaXN0ID0gc3Rhci5kaXN0KHgsIHkpXG4gICAgICBpZiAoKG1pbiA9PSBudWxsKSB8fCBtaW5EaXN0ID4gZGlzdCkge1xuICAgICAgICBtaW4gPSBzdGFyXG4gICAgICAgIG1pbkRpc3QgPSBkaXN0XG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbWluXG4gIH0sXG4gIGNsb3Nlc3RzOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgIHZhciBkaXN0c1xuICAgIGRpc3RzID0gdGhpcy5tYXAoZnVuY3Rpb24gKHN0YXIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRpc3Q6IHN0YXIuZGlzdCh4LCB5KSxcbiAgICAgICAgc3Rhcjogc3RhclxuICAgICAgfVxuICAgIH0pXG4gICAgZGlzdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEuZGlzdCAtIGIuZGlzdFxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXMuY29weShkaXN0cy5tYXAoZnVuY3Rpb24gKGRpc3QpIHtcbiAgICAgIHJldHVybiBkaXN0LnN0YXJcbiAgICB9KSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YXJTeXN0ZW1cblxuU3RhclN5c3RlbS5MaW5rID0gY2xhc3MgTGluayBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAoc3RhcjEsIHN0YXIyKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuc3RhcjEgPSBzdGFyMVxuICAgIHRoaXMuc3RhcjIgPSBzdGFyMlxuICB9XG5cbiAgcmVtb3ZlICgpIHtcbiAgICB0aGlzLnN0YXIxLmxpbmtzLnJlbW92ZSh0aGlzKVxuICAgIHJldHVybiB0aGlzLnN0YXIyLmxpbmtzLnJlbW92ZSh0aGlzKVxuICB9XG5cbiAgb3RoZXJTdGFyIChzdGFyKSB7XG4gICAgaWYgKHN0YXIgPT09IHRoaXMuc3RhcjEpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXIyXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXIxXG4gICAgfVxuICB9XG5cbiAgZ2V0TGVuZ3RoICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFyMS5kaXN0KHRoaXMuc3RhcjIueCwgdGhpcy5zdGFyMi55KVxuICB9XG5cbiAgaW5Cb3VuZGFyeUJveCAoeCwgeSwgcGFkZGluZyA9IDApIHtcbiAgICB2YXIgeDEsIHgyLCB5MSwgeTJcbiAgICB4MSA9IE1hdGgubWluKHRoaXMuc3RhcjEueCwgdGhpcy5zdGFyMi54KSAtIHBhZGRpbmdcbiAgICB5MSA9IE1hdGgubWluKHRoaXMuc3RhcjEueSwgdGhpcy5zdGFyMi55KSAtIHBhZGRpbmdcbiAgICB4MiA9IE1hdGgubWF4KHRoaXMuc3RhcjEueCwgdGhpcy5zdGFyMi54KSArIHBhZGRpbmdcbiAgICB5MiA9IE1hdGgubWF4KHRoaXMuc3RhcjEueSwgdGhpcy5zdGFyMi55KSArIHBhZGRpbmdcbiAgICByZXR1cm4geCA+PSB4MSAmJiB4IDw9IHgyICYmIHkgPj0geTEgJiYgeSA8PSB5MlxuICB9XG5cbiAgY2xvc2VUb1BvaW50ICh4LCB5LCBtaW5EaXN0KSB7XG4gICAgdmFyIGEsIGFiY0FuZ2xlLCBhYnhBbmdsZSwgYWNEaXN0LCBhY3hBbmdsZSwgYiwgYywgY2REaXN0LCB4QWJEaXN0LCB4QWNEaXN0LCB5QWJEaXN0LCB5QWNEaXN0XG4gICAgaWYgKCF0aGlzLmluQm91bmRhcnlCb3goeCwgeSwgbWluRGlzdCkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBhID0gdGhpcy5zdGFyMVxuICAgIGIgPSB0aGlzLnN0YXIyXG4gICAgYyA9IHtcbiAgICAgIHg6IHgsXG4gICAgICB5OiB5XG4gICAgfVxuICAgIHhBYkRpc3QgPSBiLnggLSBhLnhcbiAgICB5QWJEaXN0ID0gYi55IC0gYS55XG4gICAgYWJ4QW5nbGUgPSBNYXRoLmF0YW4oeUFiRGlzdCAvIHhBYkRpc3QpXG4gICAgeEFjRGlzdCA9IGMueCAtIGEueFxuICAgIHlBY0Rpc3QgPSBjLnkgLSBhLnlcbiAgICBhY0Rpc3QgPSBNYXRoLnNxcnQoKHhBY0Rpc3QgKiB4QWNEaXN0KSArICh5QWNEaXN0ICogeUFjRGlzdCkpXG4gICAgYWN4QW5nbGUgPSBNYXRoLmF0YW4oeUFjRGlzdCAvIHhBY0Rpc3QpXG4gICAgYWJjQW5nbGUgPSBhYnhBbmdsZSAtIGFjeEFuZ2xlXG4gICAgY2REaXN0ID0gTWF0aC5hYnMoTWF0aC5zaW4oYWJjQW5nbGUpICogYWNEaXN0KVxuICAgIHJldHVybiBjZERpc3QgPD0gbWluRGlzdFxuICB9XG5cbiAgaW50ZXJzZWN0TGluayAobGluaykge1xuICAgIHZhciBzLCBzMXgsIHMxeSwgczJ4LCBzMnksIHQsIHgxLCB4MiwgeDMsIHg0LCB5MSwgeTIsIHkzLCB5NFxuICAgIHgxID0gdGhpcy5zdGFyMS54XG4gICAgeTEgPSB0aGlzLnN0YXIxLnlcbiAgICB4MiA9IHRoaXMuc3RhcjIueFxuICAgIHkyID0gdGhpcy5zdGFyMi55XG4gICAgeDMgPSBsaW5rLnN0YXIxLnhcbiAgICB5MyA9IGxpbmsuc3RhcjEueVxuICAgIHg0ID0gbGluay5zdGFyMi54XG4gICAgeTQgPSBsaW5rLnN0YXIyLnlcbiAgICBzMXggPSB4MiAtIHgxXG4gICAgczF5ID0geTIgLSB5MVxuICAgIHMyeCA9IHg0IC0geDNcbiAgICBzMnkgPSB5NCAtIHkzXG4gICAgcyA9ICgtczF5ICogKHgxIC0geDMpICsgczF4ICogKHkxIC0geTMpKSAvICgtczJ4ICogczF5ICsgczF4ICogczJ5KVxuICAgIHQgPSAoczJ4ICogKHkxIC0geTMpIC0gczJ5ICogKHgxIC0geDMpKSAvICgtczJ4ICogczF5ICsgczF4ICogczJ5KVxuICAgIHJldHVybiBzID4gMCAmJiBzIDwgMSAmJiB0ID4gMCAmJiB0IDwgMVxuICB9XG59XG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFRpbWluZyA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJylcblxuY2xhc3MgVHJhdmVsIGV4dGVuZHMgRWxlbWVudCB7XG4gIHN0YXJ0IChsb2NhdGlvbikge1xuICAgIGlmICh0aGlzLnZhbGlkKSB7XG4gICAgICB0aGlzLm1vdmluZyA9IHRydWVcbiAgICAgIHRoaXMudHJhdmVsbGVyLnRyYXZlbCA9IHRoaXNcbiAgICAgIHRoaXMucGF0aFRpbWVvdXQgPSB0aGlzLnRpbWluZy5zZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy50cmF2ZWxsZXIubG9jYXRpb24gPSB0aGlzLnRhcmdldExvY2F0aW9uXG4gICAgICAgIHRoaXMudHJhdmVsbGVyLnRyYXZlbCA9IG51bGxcbiAgICAgICAgdGhpcy5tb3ZpbmcgPSBmYWxzZVxuICAgICAgfSwgdGhpcy5kdXJhdGlvbilcbiAgICB9XG4gIH1cbn07XG5cblRyYXZlbC5wcm9wZXJ0aWVzKHtcbiAgdHJhdmVsbGVyOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBzdGFydExvY2F0aW9uOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICB0YXJnZXRMb2NhdGlvbjoge1xuICAgIGRlZmF1bHQ6IG51bGxcbiAgfSxcbiAgY3VycmVudFNlY3Rpb246IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0YXJ0TG9jYXRpb24ubGlua3MuZmluZFN0YXIodGhpcy50YXJnZXRMb2NhdGlvbilcbiAgICB9XG4gIH0sXG4gIGR1cmF0aW9uOiB7XG4gICAgZGVmYXVsdDogMTAwMFxuICB9LFxuICBtb3Zpbmc6IHtcbiAgICBkZWZhdWx0OiBmYWxzZVxuICB9LFxuICB2YWxpZDoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHJlZiwgcmVmMVxuICAgICAgaWYgKHRoaXMudGFyZ2V0TG9jYXRpb24gPT09IHRoaXMuc3RhcnRMb2NhdGlvbikge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICAgIGlmICgoKChyZWYgPSB0aGlzLnRhcmdldExvY2F0aW9uKSAhPSBudWxsID8gcmVmLmxpbmtzIDogbnVsbCkgIT0gbnVsbCkgJiYgKCgocmVmMSA9IHRoaXMuc3RhcnRMb2NhdGlvbikgIT0gbnVsbCA/IHJlZjEubGlua3MgOiBudWxsKSAhPSBudWxsKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50U2VjdGlvbiAhPSBudWxsXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB0aW1pbmc6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgVGltaW5nKClcbiAgICB9XG4gIH0sXG4gIHNwYWNlQ29vZGluYXRlOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciBlbmRYLCBlbmRZLCBwcmMsIHN0YXJ0WCwgc3RhcnRZXG4gICAgICBzdGFydFggPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgnc3RhcnRMb2NhdGlvbi54JylcbiAgICAgIHN0YXJ0WSA9IGludmFsaWRhdG9yLnByb3BQYXRoKCdzdGFydExvY2F0aW9uLnknKVxuICAgICAgZW5kWCA9IGludmFsaWRhdG9yLnByb3BQYXRoKCd0YXJnZXRMb2NhdGlvbi54JylcbiAgICAgIGVuZFkgPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgndGFyZ2V0TG9jYXRpb24ueScpXG4gICAgICBwcmMgPSBpbnZhbGlkYXRvci5wcm9wUGF0aCgncGF0aFRpbWVvdXQucHJjJylcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IChzdGFydFggLSBlbmRYKSAqIHByYyArIGVuZFgsXG4gICAgICAgIHk6IChzdGFydFkgLSBlbmRZKSAqIHByYyArIGVuZFlcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVHJhdmVsXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IEdyaWQgPSByZXF1aXJlKCdwYXJhbGxlbGlvLWdyaWRzJykuR3JpZFxuXG5jbGFzcyBWaWV3IGV4dGVuZHMgRWxlbWVudCB7XG4gIHNldERlZmF1bHRzICgpIHtcbiAgICB2YXIgcmVmXG4gICAgaWYgKCF0aGlzLmJvdW5kcykge1xuICAgICAgdGhpcy5ncmlkID0gdGhpcy5ncmlkIHx8ICgocmVmID0gdGhpcy5nYW1lLm1haW5WaWV3UHJvcGVydHkudmFsdWUpICE9IG51bGwgPyByZWYuZ3JpZCA6IG51bGwpIHx8IG5ldyBHcmlkKClcbiAgICAgIHRoaXMuYm91bmRzID0gdGhpcy5ncmlkLmFkZENlbGwoKVxuICAgIH1cbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICAgIHRoaXMuZ2FtZSA9IG51bGxcbiAgfVxufTtcblxuVmlldy5wcm9wZXJ0aWVzKHtcbiAgZ2FtZToge1xuICAgIGNoYW5nZTogZnVuY3Rpb24gKHZhbCwgb2xkKSB7XG4gICAgICBpZiAodGhpcy5nYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZS52aWV3cy5hZGQodGhpcylcbiAgICAgICAgdGhpcy5zZXREZWZhdWx0cygpXG4gICAgICB9XG4gICAgICBpZiAob2xkKSB7XG4gICAgICAgIHJldHVybiBvbGQudmlld3MucmVtb3ZlKHRoaXMpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICB4OiB7XG4gICAgZGVmYXVsdDogMFxuICB9LFxuICB5OiB7XG4gICAgZGVmYXVsdDogMFxuICB9LFxuICBncmlkOiB7XG4gICAgZGVmYXVsdDogbnVsbFxuICB9LFxuICBib3VuZHM6IHtcbiAgICBkZWZhdWx0OiBudWxsXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVmlld1xuIiwiY29uc3QgTGluZU9mU2lnaHQgPSByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0JylcbmNvbnN0IERpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb25cbmNvbnN0IFRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lclxuY29uc3QgVGlsZVJlZmVyZW5jZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlUmVmZXJlbmNlXG5cbmNsYXNzIFZpc2lvbkNhbGN1bGF0b3Ige1xuICBjb25zdHJ1Y3RvciAob3JpZ2luVGlsZSwgb2Zmc2V0ID0ge1xuICAgIHg6IDAuNSxcbiAgICB5OiAwLjVcbiAgfSkge1xuICAgIHRoaXMub3JpZ2luVGlsZSA9IG9yaWdpblRpbGVcbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldFxuICAgIHRoaXMucHRzID0ge31cbiAgICB0aGlzLnZpc2liaWxpdHkgPSB7fVxuICAgIHRoaXMuc3RhY2sgPSBbXVxuICAgIHRoaXMuY2FsY3VsYXRlZCA9IGZhbHNlXG4gIH1cblxuICBjYWxjdWwgKCkge1xuICAgIHRoaXMuaW5pdCgpXG4gICAgd2hpbGUgKHRoaXMuc3RhY2subGVuZ3RoKSB7XG4gICAgICB0aGlzLnN0ZXAoKVxuICAgIH1cbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICB2YXIgZmlyc3RCYXRjaCwgaW5pdGlhbFB0c1xuICAgIHRoaXMucHRzID0ge31cbiAgICB0aGlzLnZpc2liaWxpdHkgPSB7fVxuICAgIGluaXRpYWxQdHMgPSBbeyB4OiAwLCB5OiAwIH0sIHsgeDogMSwgeTogMCB9LCB7IHg6IDAsIHk6IDEgfSwgeyB4OiAxLCB5OiAxIH1dXG4gICAgaW5pdGlhbFB0cy5mb3JFYWNoKChwdCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0UHQodGhpcy5vcmlnaW5UaWxlLnggKyBwdC54LCB0aGlzLm9yaWdpblRpbGUueSArIHB0LnksIHRydWUpXG4gICAgfSlcbiAgICBmaXJzdEJhdGNoID0gW1xuICAgICAgeyB4OiAtMSwgeTogLTEgfSwgeyB4OiAtMSwgeTogMCB9LCB7IHg6IC0xLCB5OiAxIH0sIHsgeDogLTEsIHk6IDIgfSxcbiAgICAgIHsgeDogMiwgeTogLTEgfSwgeyB4OiAyLCB5OiAwIH0sIHsgeDogMiwgeTogMSB9LCB7IHg6IDIsIHk6IDIgfSxcbiAgICAgIHsgeDogMCwgeTogLTEgfSwgeyB4OiAxLCB5OiAtMSB9LFxuICAgICAgeyB4OiAwLCB5OiAyIH0sIHsgeDogMSwgeTogMiB9XG4gICAgXVxuICAgIHRoaXMuc3RhY2sgPSBmaXJzdEJhdGNoLm1hcCgocHQpID0+IHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHRoaXMub3JpZ2luVGlsZS54ICsgcHQueCxcbiAgICAgICAgeTogdGhpcy5vcmlnaW5UaWxlLnkgKyBwdC55XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHNldFB0ICh4LCB5LCB2YWwpIHtcbiAgICB2YXIgYWRqYW5jZW50XG4gICAgdGhpcy5wdHNbeCArICc6JyArIHldID0gdmFsXG4gICAgYWRqYW5jZW50ID0gW1xuICAgICAge1xuICAgICAgICB4OiAwLFxuICAgICAgICB5OiAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB4OiAtMSxcbiAgICAgICAgeTogMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgeDogMCxcbiAgICAgICAgeTogLTFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHg6IC0xLFxuICAgICAgICB5OiAtMVxuICAgICAgfVxuICAgIF1cbiAgICByZXR1cm4gYWRqYW5jZW50LmZvckVhY2goKHB0KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRWaXNpYmlsaXR5KHggKyBwdC54LCB5ICsgcHQueSwgdmFsID8gMSAvIGFkamFuY2VudC5sZW5ndGggOiAwKVxuICAgIH0pXG4gIH1cblxuICBnZXRQdCAoeCwgeSkge1xuICAgIHJldHVybiB0aGlzLnB0c1t4ICsgJzonICsgeV1cbiAgfVxuXG4gIGFkZFZpc2liaWxpdHkgKHgsIHksIHZhbCkge1xuICAgIGlmICh0aGlzLnZpc2liaWxpdHlbeF0gPT0gbnVsbCkge1xuICAgICAgdGhpcy52aXNpYmlsaXR5W3hdID0ge31cbiAgICB9XG4gICAgaWYgKHRoaXMudmlzaWJpbGl0eVt4XVt5XSAhPSBudWxsKSB7XG4gICAgICB0aGlzLnZpc2liaWxpdHlbeF1beV0gKz0gdmFsXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudmlzaWJpbGl0eVt4XVt5XSA9IHZhbFxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0VmlzaWJpbGl0eSAoeCwgeSkge1xuICAgIGlmICgodGhpcy52aXNpYmlsaXR5W3hdID09IG51bGwpIHx8ICh0aGlzLnZpc2liaWxpdHlbeF1beV0gPT0gbnVsbCkpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnZpc2liaWxpdHlbeF1beV1cbiAgICB9XG4gIH1cblxuICBjYW5Qcm9jZXNzICh4LCB5KSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YWNrLnNvbWUoKHB0KSA9PiB7XG4gICAgICByZXR1cm4gcHQueCA9PT0geCAmJiBwdC55ID09PSB5XG4gICAgfSkgJiYgKHRoaXMuZ2V0UHQoeCwgeSkgPT0gbnVsbClcbiAgfVxuXG4gIHN0ZXAgKCkge1xuICAgIHZhciBsb3MsIHB0XG4gICAgcHQgPSB0aGlzLnN0YWNrLnNoaWZ0KClcbiAgICBsb3MgPSBuZXcgTGluZU9mU2lnaHQodGhpcy5vcmlnaW5UaWxlLmNvbnRhaW5lciwgdGhpcy5vcmlnaW5UaWxlLnggKyB0aGlzLm9mZnNldC54LCB0aGlzLm9yaWdpblRpbGUueSArIHRoaXMub2Zmc2V0LnksIHB0LngsIHB0LnkpXG4gICAgbG9zLnJldmVyc2VUcmFjaW5nKClcbiAgICBsb3MudHJhdmVyc2FibGVDYWxsYmFjayA9ICh0aWxlLCBlbnRyeVgsIGVudHJ5WSkgPT4ge1xuICAgICAgaWYgKHRpbGUgIT0gbnVsbCkge1xuICAgICAgICBpZiAodGhpcy5nZXRWaXNpYmlsaXR5KHRpbGUueCwgdGlsZS55KSA9PT0gMSkge1xuICAgICAgICAgIHJldHVybiBsb3MuZm9yY2VTdWNjZXNzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGlsZS50cmFuc3BhcmVudFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc2V0UHQocHQueCwgcHQueSwgbG9zLmdldFN1Y2Nlc3MoKSlcbiAgICBpZiAobG9zLmdldFN1Y2Nlc3MoKSkge1xuICAgICAgcmV0dXJuIERpcmVjdGlvbi5hbGwuZm9yRWFjaCgoZGlyZWN0aW9uKSA9PiB7XG4gICAgICAgIHZhciBuZXh0UHRcbiAgICAgICAgbmV4dFB0ID0ge1xuICAgICAgICAgIHg6IHB0LnggKyBkaXJlY3Rpb24ueCxcbiAgICAgICAgICB5OiBwdC55ICsgZGlyZWN0aW9uLnlcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jYW5Qcm9jZXNzKG5leHRQdC54LCBuZXh0UHQueSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGFjay5wdXNoKG5leHRQdClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBnZXRCb3VuZHMgKCkge1xuICAgIHZhciBib3VuZGFyaWVzLCBjb2wsIHJlZiwgeCwgeVxuICAgIGJvdW5kYXJpZXMgPSB7XG4gICAgICB0b3A6IG51bGwsXG4gICAgICBsZWZ0OiBudWxsLFxuICAgICAgYm90dG9tOiBudWxsLFxuICAgICAgcmlnaHQ6IG51bGxcbiAgICB9XG4gICAgcmVmID0gdGhpcy52aXNpYmlsaXR5XG4gICAgZm9yICh4IGluIHJlZikge1xuICAgICAgY29sID0gcmVmW3hdXG4gICAgICBmb3IgKHkgaW4gY29sKSB7XG4gICAgICAgIGlmICgoYm91bmRhcmllcy50b3AgPT0gbnVsbCkgfHwgeSA8IGJvdW5kYXJpZXMudG9wKSB7XG4gICAgICAgICAgYm91bmRhcmllcy50b3AgPSB5XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChib3VuZGFyaWVzLmxlZnQgPT0gbnVsbCkgfHwgeCA8IGJvdW5kYXJpZXMubGVmdCkge1xuICAgICAgICAgIGJvdW5kYXJpZXMubGVmdCA9IHhcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGJvdW5kYXJpZXMuYm90dG9tID09IG51bGwpIHx8IHkgPiBib3VuZGFyaWVzLmJvdHRvbSkge1xuICAgICAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0geVxuICAgICAgICB9XG4gICAgICAgIGlmICgoYm91bmRhcmllcy5yaWdodCA9PSBudWxsKSB8fCB4ID4gYm91bmRhcmllcy5yaWdodCkge1xuICAgICAgICAgIGJvdW5kYXJpZXMucmlnaHQgPSB4XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kYXJpZXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJucyB7VGlsZUNvbnRhaW5lcn1cbiAgICovXG4gIHRvQ29udGFpbmVyICgpIHtcbiAgICB2YXIgY29sLCByZWYsIHRpbGUsIHZhbCwgeCwgeVxuICAgIGNvbnN0IHJlcyA9IG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICByZXMub3duZXIgPSBmYWxzZVxuICAgIHJlZiA9IHRoaXMudmlzaWJpbGl0eVxuICAgIGZvciAoeCBpbiByZWYpIHtcbiAgICAgIGNvbCA9IHJlZlt4XVxuICAgICAgZm9yICh5IGluIGNvbCkge1xuICAgICAgICB2YWwgPSBjb2xbeV1cbiAgICAgICAgdGlsZSA9IHRoaXMub3JpZ2luVGlsZS5jb250YWluZXIuZ2V0VGlsZSh4LCB5KVxuICAgICAgICBpZiAodmFsICE9PSAwICYmICh0aWxlICE9IG51bGwpKSB7XG4gICAgICAgICAgdGlsZSA9IG5ldyBUaWxlUmVmZXJlbmNlKHRpbGUpXG4gICAgICAgICAgdGlsZS52aXNpYmlsaXR5ID0gdmFsXG4gICAgICAgICAgcmVzLmFkZFRpbGUodGlsZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzXG4gIH1cblxuICB0b01hcCAoKSB7XG4gICAgdmFyIGksIGosIHJlZiwgcmVmMSwgcmVmMiwgcmVmMywgcmVzLCB4LCB5XG4gICAgcmVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBtYXA6IFtdXG4gICAgfSwgdGhpcy5nZXRCb3VuZHMoKSlcbiAgICBmb3IgKHkgPSBpID0gcmVmID0gcmVzLnRvcCwgcmVmMSA9IHJlcy5ib3R0b20gLSAxOyAocmVmIDw9IHJlZjEgPyBpIDw9IHJlZjEgOiBpID49IHJlZjEpOyB5ID0gcmVmIDw9IHJlZjEgPyArK2kgOiAtLWkpIHtcbiAgICAgIHJlcy5tYXBbeSAtIHJlcy50b3BdID0gW11cbiAgICAgIGZvciAoeCA9IGogPSByZWYyID0gcmVzLmxlZnQsIHJlZjMgPSByZXMucmlnaHQgLSAxOyAocmVmMiA8PSByZWYzID8gaiA8PSByZWYzIDogaiA+PSByZWYzKTsgeCA9IHJlZjIgPD0gcmVmMyA/ICsraiA6IC0taikge1xuICAgICAgICByZXMubWFwW3kgLSByZXMudG9wXVt4IC0gcmVzLmxlZnRdID0gdGhpcy5nZXRWaXNpYmlsaXR5KHgsIHkpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFZpc2lvbkNhbGN1bGF0b3JcbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuY29uc3QgRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRzJylcblxuY2xhc3MgQWN0aW9uIGV4dGVuZHMgRWxlbWVudCB7XG4gIHdpdGhBY3RvciAoYWN0b3IpIHtcbiAgICBpZiAodGhpcy5hY3RvciAhPT0gYWN0b3IpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHtcbiAgICAgICAgYWN0b3I6IGFjdG9yXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpc1xuICAgIH1cbiAgfVxuXG4gIGNvcHlXaXRoIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKE9iamVjdC5hc3NpZ24oe1xuICAgICAgYmFzZTogdGhpcy5iYXNlT3JUaGlzKClcbiAgICB9LCB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmdldE1hbnVhbERhdGFQcm9wZXJ0aWVzKCksIG9wdGlvbnMpKVxuICB9XG5cbiAgYmFzZU9yVGhpcyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYmFzZSB8fCB0aGlzXG4gIH1cblxuICBzdGFydCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXhlY3V0ZSgpXG4gIH1cblxuICB2YWxpZEFjdG9yICgpIHtcbiAgICByZXR1cm4gdGhpcy5hY3RvciAhPSBudWxsXG4gIH1cblxuICBpc1JlYWR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy52YWxpZEFjdG9yKClcbiAgfVxuXG4gIGZpbmlzaCAoKSB7XG4gICAgdGhpcy5lbWl0KCdmaW5pc2hlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGludGVycnVwdCAoKSB7XG4gICAgdGhpcy5lbWl0KCdpbnRlcnJ1cHRlZCcpXG4gICAgcmV0dXJuIHRoaXMuZW5kKClcbiAgfVxuXG4gIGVuZCAoKSB7XG4gICAgdGhpcy5lbWl0KCdlbmQnKVxuICAgIHJldHVybiB0aGlzLmRlc3Ryb3koKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllc01hbmFnZXIuZGVzdHJveSgpXG4gIH1cbn07XG5cbkFjdGlvbi5pbmNsdWRlKEV2ZW50RW1pdHRlci5wcm90b3R5cGUpXG5cbkFjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgYWN0b3I6IHt9LFxuICBiYXNlOiB7fVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBBY3Rpb25cbiIsImNvbnN0IEVsZW1lbnQgPSByZXF1aXJlKCdzcGFyay1zdGFydGVyJykuRWxlbWVudFxuXG5jbGFzcyBBY3Rpb25Qcm92aWRlciBleHRlbmRzIEVsZW1lbnQge307XG5cbkFjdGlvblByb3ZpZGVyLnByb3BlcnRpZXMoe1xuICBhY3Rpb25zOiB7XG4gICAgY29sbGVjdGlvbjogdHJ1ZSxcbiAgICBjb21wb3NlZDogdHJ1ZVxuICB9LFxuICBvd25lcjoge31cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aW9uUHJvdmlkZXJcbiIsImNvbnN0IFdhbGtBY3Rpb24gPSByZXF1aXJlKCcuL1dhbGtBY3Rpb24nKVxuY29uc3QgVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKVxuY29uc3QgRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZFxuY29uc3QgUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlclxuXG5jbGFzcyBBdHRhY2tBY3Rpb24gZXh0ZW5kcyBUYXJnZXRBY3Rpb24ge1xuICB2YWxpZFRhcmdldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0SXNBdHRhY2thYmxlKCkgJiYgKHRoaXMuY2FuVXNlV2VhcG9uKCkgfHwgdGhpcy5jYW5XYWxrVG9UYXJnZXQoKSlcbiAgfVxuXG4gIHRhcmdldElzQXR0YWNrYWJsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudGFyZ2V0LmRhbWFnZWFibGUgJiYgdGhpcy50YXJnZXQuaGVhbHRoID49IDBcbiAgfVxuXG4gIGNhbk1lbGVlICgpIHtcbiAgICByZXR1cm4gTWF0aC5hYnModGhpcy50YXJnZXQudGlsZS54IC0gdGhpcy5hY3Rvci50aWxlLngpICsgTWF0aC5hYnModGhpcy50YXJnZXQudGlsZS55IC0gdGhpcy5hY3Rvci50aWxlLnkpID09PSAxXG4gIH1cblxuICBjYW5Vc2VXZWFwb24gKCkge1xuICAgIHJldHVybiB0aGlzLmJlc3RVc2FibGVXZWFwb24gIT0gbnVsbFxuICB9XG5cbiAgY2FuVXNlV2VhcG9uQXQgKHRpbGUpIHtcbiAgICB2YXIgcmVmXG4gICAgcmV0dXJuICgocmVmID0gdGhpcy5hY3Rvci53ZWFwb25zKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IG51bGwpICYmIHRoaXMuYWN0b3Iud2VhcG9ucy5maW5kKCh3ZWFwb24pID0+IHtcbiAgICAgIHJldHVybiB3ZWFwb24uY2FuVXNlRnJvbSh0aWxlLCB0aGlzLnRhcmdldClcbiAgICB9KVxuICB9XG5cbiAgY2FuV2Fsa1RvVGFyZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy53YWxrQWN0aW9uLmlzUmVhZHkoKVxuICB9XG5cbiAgdXNlV2VhcG9uICgpIHtcbiAgICB0aGlzLmJlc3RVc2FibGVXZWFwb24udXNlT24odGhpcy50YXJnZXQpXG4gICAgcmV0dXJuIHRoaXMuZmluaXNoKClcbiAgfVxuXG4gIGV4ZWN1dGUgKCkge1xuICAgIGlmICh0aGlzLmFjdG9yLndhbGsgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3Rvci53YWxrLmludGVycnVwdCgpXG4gICAgfVxuICAgIGlmICh0aGlzLmJlc3RVc2FibGVXZWFwb24gIT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnVzZVdlYXBvbigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy53ZWFwb25DaGFyZ2VXYXRjaGVyLmJpbmQoKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhbGtBY3Rpb24ub24oJ2ZpbmlzaGVkJywgKCkgPT4ge1xuICAgICAgICB0aGlzLmludGVycnVwdEJpbmRlci51bmJpbmQoKVxuICAgICAgICB0aGlzLndhbGtBY3Rpb24uZGVzdHJveSgpXG4gICAgICAgIHRoaXMud2Fsa0FjdGlvblByb3BlcnR5LmludmFsaWRhdGUoKVxuICAgICAgICBpZiAodGhpcy5pc1JlYWR5KCkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydCgpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICB0aGlzLmludGVycnVwdEJpbmRlci5iaW5kVG8odGhpcy53YWxrQWN0aW9uKVxuICAgICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi5leGVjdXRlKClcbiAgICB9XG4gIH1cbn07XG5cbkF0dGFja0FjdGlvbi5wcm9wZXJ0aWVzKHtcbiAgd2Fsa0FjdGlvbjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHdhbGtBY3Rpb25cbiAgICAgIHdhbGtBY3Rpb24gPSBuZXcgV2Fsa0FjdGlvbih7XG4gICAgICAgIGFjdG9yOiB0aGlzLmFjdG9yLFxuICAgICAgICB0YXJnZXQ6IHRoaXMudGFyZ2V0LFxuICAgICAgICBwYXJlbnQ6IHRoaXMucGFyZW50XG4gICAgICB9KVxuICAgICAgd2Fsa0FjdGlvbi5wYXRoRmluZGVyLmFycml2ZWRDYWxsYmFjayA9IChzdGVwKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhblVzZVdlYXBvbkF0KHN0ZXAudGlsZSlcbiAgICAgIH1cbiAgICAgIHJldHVybiB3YWxrQWN0aW9uXG4gICAgfVxuICB9LFxuICBiZXN0VXNhYmxlV2VhcG9uOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoaW52YWxpZGF0b3IpIHtcbiAgICAgIHZhciByZWYsIHVzYWJsZVdlYXBvbnNcbiAgICAgIGludmFsaWRhdG9yLnByb3BQYXRoKCdhY3Rvci50aWxlJylcbiAgICAgIGlmICgocmVmID0gdGhpcy5hY3Rvci53ZWFwb25zKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IG51bGwpIHtcbiAgICAgICAgdXNhYmxlV2VhcG9ucyA9IHRoaXMuYWN0b3Iud2VhcG9ucy5maWx0ZXIoKHdlYXBvbikgPT4ge1xuICAgICAgICAgIHJldHVybiB3ZWFwb24uY2FuVXNlT24odGhpcy50YXJnZXQpXG4gICAgICAgIH0pXG4gICAgICAgIHVzYWJsZVdlYXBvbnMuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgIHJldHVybiBiLmRwcyAtIGEuZHBzXG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiB1c2FibGVXZWFwb25zWzBdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaW50ZXJydXB0QmluZGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50QmluZCgnaW50ZXJydXB0ZWQnLCBudWxsLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmludGVycnVwdCgpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveTogdHJ1ZVxuICB9LFxuICB3ZWFwb25DaGFyZ2VXYXRjaGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5jaGFyZ2VkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VXZWFwb24oKVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcHJvcGVydHk6IHRoaXMuYmVzdFVzYWJsZVdlYXBvbi5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eSgnY2hhcmdlZCcpXG4gICAgICB9KVxuICAgIH0sXG4gICAgZGVzdHJveTogdHJ1ZVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEF0dGFja0FjdGlvblxuIiwiY29uc3QgV2Fsa0FjdGlvbiA9IHJlcXVpcmUoJy4vV2Fsa0FjdGlvbicpXG5jb25zdCBBdHRhY2tBY3Rpb24gPSByZXF1aXJlKCcuL0F0dGFja0FjdGlvbicpXG5jb25zdCBUYXJnZXRBY3Rpb24gPSByZXF1aXJlKCcuL1RhcmdldEFjdGlvbicpXG5jb25zdCBQYXRoRmluZGVyID0gcmVxdWlyZSgncGFyYWxsZWxpby1wYXRoZmluZGVyJylcbmNvbnN0IExpbmVPZlNpZ2h0ID0gcmVxdWlyZSgnLi4vTGluZU9mU2lnaHQnKVxuY29uc3QgUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlclxuY29uc3QgRXZlbnRCaW5kID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkV2ZW50QmluZFxuXG5jbGFzcyBBdHRhY2tNb3ZlQWN0aW9uIGV4dGVuZHMgVGFyZ2V0QWN0aW9uIHtcbiAgaXNFbmVteSAoZWxlbSkge1xuICAgIHZhciByZWZcbiAgICByZXR1cm4gKHJlZiA9IHRoaXMuYWN0b3Iub3duZXIpICE9IG51bGwgPyB0eXBlb2YgcmVmLmlzRW5lbXkgPT09ICdmdW5jdGlvbicgPyByZWYuaXNFbmVteShlbGVtKSA6IG51bGwgOiBudWxsXG4gIH1cblxuICB2YWxpZFRhcmdldCAoKSB7XG4gICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi52YWxpZFRhcmdldCgpXG4gIH1cblxuICB0ZXN0RW5lbXlTcG90dGVkICgpIHtcbiAgICB0aGlzLmVuZW15U3BvdHRlZFByb3BlcnR5LmludmFsaWRhdGUoKVxuICAgIGlmICh0aGlzLmVuZW15U3BvdHRlZCkge1xuICAgICAgdGhpcy5hdHRhY2tBY3Rpb24gPSBuZXcgQXR0YWNrQWN0aW9uKHtcbiAgICAgICAgYWN0b3I6IHRoaXMuYWN0b3IsXG4gICAgICAgIHRhcmdldDogdGhpcy5lbmVteVNwb3R0ZWRcbiAgICAgIH0pXG4gICAgICB0aGlzLmF0dGFja0FjdGlvbi5vbignZmluaXNoZWQnLCAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmlzUmVhZHkoKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHRoaXMuaW50ZXJydXB0QmluZGVyLmJpbmRUbyh0aGlzLmF0dGFja0FjdGlvbilcbiAgICAgIHRoaXMud2Fsa0FjdGlvbi5pbnRlcnJ1cHQoKVxuICAgICAgdGhpcy53YWxrQWN0aW9uUHJvcGVydHkuaW52YWxpZGF0ZSgpXG4gICAgICByZXR1cm4gdGhpcy5hdHRhY2tBY3Rpb24uZXhlY3V0ZSgpXG4gICAgfVxuICB9XG5cbiAgZXhlY3V0ZSAoKSB7XG4gICAgaWYgKCF0aGlzLnRlc3RFbmVteVNwb3R0ZWQoKSkge1xuICAgICAgdGhpcy53YWxrQWN0aW9uLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmluaXNoZWQoKVxuICAgICAgfSlcbiAgICAgIHRoaXMuaW50ZXJydXB0QmluZGVyLmJpbmRUbyh0aGlzLndhbGtBY3Rpb24pXG4gICAgICB0aGlzLnRpbGVXYXRjaGVyLmJpbmQoKVxuICAgICAgcmV0dXJuIHRoaXMud2Fsa0FjdGlvbi5leGVjdXRlKClcbiAgICB9XG4gIH1cbn07XG5cbkF0dGFja01vdmVBY3Rpb24ucHJvcGVydGllcyh7XG4gIHdhbGtBY3Rpb246IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB3YWxrQWN0aW9uXG4gICAgICB3YWxrQWN0aW9uID0gbmV3IFdhbGtBY3Rpb24oe1xuICAgICAgICBhY3RvcjogdGhpcy5hY3RvcixcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgcGFyZW50OiB0aGlzLnBhcmVudFxuICAgICAgfSlcbiAgICAgIHJldHVybiB3YWxrQWN0aW9uXG4gICAgfVxuICB9LFxuICBlbmVteVNwb3R0ZWQ6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciByZWZcbiAgICAgIHRoaXMucGF0aCA9IG5ldyBQYXRoRmluZGVyKHRoaXMuYWN0b3IudGlsZS5jb250YWluZXIsIHRoaXMuYWN0b3IudGlsZSwgZmFsc2UsIHtcbiAgICAgICAgdmFsaWRUaWxlOiAodGlsZSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aWxlLnRyYW5zcGFyZW50ICYmIChuZXcgTGluZU9mU2lnaHQodGhpcy5hY3Rvci50aWxlLmNvbnRhaW5lciwgdGhpcy5hY3Rvci50aWxlLngsIHRoaXMuYWN0b3IudGlsZS55LCB0aWxlLngsIHRpbGUueSkpLmdldFN1Y2Nlc3MoKVxuICAgICAgICB9LFxuICAgICAgICBhcnJpdmVkOiAoc3RlcCkgPT4ge1xuICAgICAgICAgIHN0ZXAuZW5lbXkgPSBzdGVwLnRpbGUuY2hpbGRyZW4uZmluZCgoYykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNFbmVteShjKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIHN0ZXAuZW5lbXlcbiAgICAgICAgfSxcbiAgICAgICAgZWZmaWNpZW5jeTogKHRpbGUpID0+IHt9XG4gICAgICB9KVxuICAgICAgdGhpcy5wYXRoLmNhbGN1bCgpXG4gICAgICByZXR1cm4gKHJlZiA9IHRoaXMucGF0aC5zb2x1dGlvbikgIT0gbnVsbCA/IHJlZi5lbmVteSA6IG51bGxcbiAgICB9XG4gIH0sXG4gIHRpbGVXYXRjaGVyOiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIGNhbGxiYWNrOiAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMudGVzdEVuZW15U3BvdHRlZCgpXG4gICAgICAgIH0sXG4gICAgICAgIHByb3BlcnR5OiB0aGlzLmFjdG9yLnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KCd0aWxlJylcbiAgICAgIH0pXG4gICAgfSxcbiAgICBkZXN0cm95OiB0cnVlXG4gIH0sXG4gIGludGVycnVwdEJpbmRlcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudEJpbmQoJ2ludGVycnVwdGVkJywgbnVsbCwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5pbnRlcnJ1cHQoKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGRlc3Ryb3k6IHRydWVcbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBBdHRhY2tNb3ZlQWN0aW9uXG4iLCJjb25zdCBBY3Rpb25Qcm92aWRlciA9IHJlcXVpcmUoJy4vQWN0aW9uUHJvdmlkZXInKVxuXG5jbGFzcyBTaW1wbGVBY3Rpb25Qcm92aWRlciBleHRlbmRzIEFjdGlvblByb3ZpZGVyIHt9O1xuXG5TaW1wbGVBY3Rpb25Qcm92aWRlci5wcm9wZXJ0aWVzKHtcbiAgYWN0aW9uczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFjdGlvbnNcbiAgICAgIGFjdGlvbnMgPSB0aGlzLmFjdGlvbk9wdGlvbnMgfHwgdGhpcy5jb25zdHJ1Y3Rvci5hY3Rpb25zIHx8IFtdXG4gICAgICBpZiAodHlwZW9mIGFjdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGFjdGlvbnMgPSBPYmplY3Qua2V5cyhhY3Rpb25zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBhY3Rpb25zW2tleV1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBhY3Rpb25zLm1hcCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uLndpdGhUYXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uLndpdGhUYXJnZXQodGhpcylcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgY29uc3QgQWN0aW9uQ2xhc3MgPSBhY3Rpb25cbiAgICAgICAgICByZXR1cm4gbmV3IEFjdGlvbkNsYXNzKHtcbiAgICAgICAgICAgIHRhcmdldDogdGhpc1xuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFjdGlvblxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVBY3Rpb25Qcm92aWRlclxuIiwiY29uc3QgQWN0aW9uID0gcmVxdWlyZSgnLi9BY3Rpb24nKVxuXG5jbGFzcyBUYXJnZXRBY3Rpb24gZXh0ZW5kcyBBY3Rpb24ge1xuICB3aXRoVGFyZ2V0ICh0YXJnZXQpIHtcbiAgICBpZiAodGhpcy50YXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29weVdpdGgoe1xuICAgICAgICB0YXJnZXQ6IHRhcmdldFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG4gIH1cblxuICBjYW5UYXJnZXQgKHRhcmdldCkge1xuICAgIHZhciBpbnN0YW5jZVxuICAgIGluc3RhbmNlID0gdGhpcy53aXRoVGFyZ2V0KHRhcmdldClcbiAgICBpZiAoaW5zdGFuY2UudmFsaWRUYXJnZXQoKSkge1xuICAgICAgcmV0dXJuIGluc3RhbmNlXG4gICAgfVxuICB9XG5cbiAgdmFsaWRUYXJnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLnRhcmdldCAhPSBudWxsXG4gIH1cblxuICBpc1JlYWR5ICgpIHtcbiAgICByZXR1cm4gc3VwZXIuaXNSZWFkeSgpICYmIHRoaXMudmFsaWRUYXJnZXQoKVxuICB9XG59O1xuXG5UYXJnZXRBY3Rpb24ucHJvcGVydGllcyh7XG4gIHRhcmdldDoge31cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVGFyZ2V0QWN0aW9uXG4iLCJjb25zdCBBY3Rpb25Qcm92aWRlciA9IHJlcXVpcmUoJy4vQWN0aW9uUHJvdmlkZXInKVxuXG5jbGFzcyBUaWxlZEFjdGlvblByb3ZpZGVyIGV4dGVuZHMgQWN0aW9uUHJvdmlkZXIge1xuICB2YWxpZEFjdGlvblRpbGUgKHRpbGUpIHtcbiAgICByZXR1cm4gdGlsZSAhPSBudWxsXG4gIH1cblxuICBwcmVwYXJlQWN0aW9uVGlsZSAodGlsZSkge1xuICAgIGlmICghdGlsZS5hY3Rpb25Qcm92aWRlcikge1xuICAgICAgdGlsZS5hY3Rpb25Qcm92aWRlciA9IG5ldyBBY3Rpb25Qcm92aWRlcih7XG4gICAgICAgIG93bmVyOiB0aWxlXG4gICAgICB9KVxuICAgIH1cbiAgfVxufTtcblxuVGlsZWRBY3Rpb25Qcm92aWRlci5wcm9wZXJ0aWVzKHtcbiAgb3JpZ2luVGlsZToge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgoJ293bmVyLnRpbGUnKVxuICAgIH1cbiAgfSxcbiAgYWN0aW9uVGlsZXM6IHtcbiAgICBjb2xsZWN0aW9uOiB0cnVlLFxuICAgIGNhbGN1bDogZnVuY3Rpb24gKGludmFsaWRhdG9yKSB7XG4gICAgICB2YXIgbXlUaWxlXG4gICAgICBteVRpbGUgPSBpbnZhbGlkYXRvci5wcm9wKHRoaXMub3JpZ2luVGlsZVByb3BlcnR5KVxuICAgICAgaWYgKG15VGlsZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5hY3Rpb25UaWxlc0Nvb3JkLm1hcCgoY29vcmQpID0+IHtcbiAgICAgICAgICByZXR1cm4gbXlUaWxlLmdldFJlbGF0aXZlVGlsZShjb29yZC54LCBjb29yZC55KVxuICAgICAgICB9KS5maWx0ZXIoKHRpbGUpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZEFjdGlvblRpbGUodGlsZSlcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbUFkZGVkOiBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgdGhpcy5wcmVwYXJlQWN0aW9uVGlsZSh0aWxlKVxuICAgICAgcmV0dXJuIHRpbGUuYWN0aW9uUHJvdmlkZXIuYWN0aW9uc01lbWJlcnMuYWRkUHJvcGVydHkodGhpcy5hY3Rpb25zUHJvcGVydHkpXG4gICAgfSxcbiAgICBpdGVtUmVtb3ZlZDogZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgIHJldHVybiB0aWxlLmFjdGlvblByb3ZpZGVyLmFjdGlvbnNNZW1iZXJzLnJlbW92ZVByb3BlcnR5KHRoaXMuYWN0aW9uc1Byb3BlcnR5KVxuICAgIH1cbiAgfVxufSlcblxuVGlsZWRBY3Rpb25Qcm92aWRlci5wcm90b3R5cGUuYWN0aW9uVGlsZXNDb29yZCA9IFtcbiAge1xuICAgIHg6IDAsXG4gICAgeTogLTFcbiAgfSxcbiAge1xuICAgIHg6IC0xLFxuICAgIHk6IDBcbiAgfSxcbiAge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9LFxuICB7XG4gICAgeDogKzEsXG4gICAgeTogMFxuICB9LFxuICB7XG4gICAgeDogMCxcbiAgICB5OiArMVxuICB9XG5dXG5cbm1vZHVsZS5leHBvcnRzID0gVGlsZWRBY3Rpb25Qcm92aWRlclxuIiwiY29uc3QgVGFyZ2V0QWN0aW9uID0gcmVxdWlyZSgnLi9UYXJnZXRBY3Rpb24nKVxuY29uc3QgVHJhdmVsID0gcmVxdWlyZSgnLi4vVHJhdmVsJylcblxuY2xhc3MgVHJhdmVsQWN0aW9uIGV4dGVuZHMgVGFyZ2V0QWN0aW9uIHtcbiAgdmFsaWRUYXJnZXQgKCkge1xuICAgIHJldHVybiB0aGlzLnRyYXZlbC52YWxpZFxuICB9XG5cbiAgZXhlY3V0ZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMudHJhdmVsLnN0YXJ0KClcbiAgfVxufTtcblxuVHJhdmVsQWN0aW9uLnByb3BlcnRpZXMoe1xuICB0cmF2ZWw6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgVHJhdmVsKHtcbiAgICAgICAgdHJhdmVsbGVyOiB0aGlzLmFjdG9yLFxuICAgICAgICBzdGFydExvY2F0aW9uOiB0aGlzLmFjdG9yLmxvY2F0aW9uLFxuICAgICAgICB0YXJnZXRMb2NhdGlvbjogdGhpcy50YXJnZXRcbiAgICAgIH0pXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYXZlbEFjdGlvblxuIiwiY29uc3QgUGF0aEZpbmRlciA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tcGF0aGZpbmRlcicpXG5jb25zdCBQYXRoV2FsayA9IHJlcXVpcmUoJy4uL1BhdGhXYWxrJylcbmNvbnN0IFRhcmdldEFjdGlvbiA9IHJlcXVpcmUoJy4vVGFyZ2V0QWN0aW9uJylcblxuY2xhc3MgV2Fsa0FjdGlvbiBleHRlbmRzIFRhcmdldEFjdGlvbiB7XG4gIGV4ZWN1dGUgKCkge1xuICAgIGlmICh0aGlzLmFjdG9yLndhbGsgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hY3Rvci53YWxrLmludGVycnVwdCgpXG4gICAgfVxuICAgIHRoaXMud2FsayA9IHRoaXMuYWN0b3Iud2FsayA9IG5ldyBQYXRoV2Fsayh0aGlzLmFjdG9yLCB0aGlzLnBhdGhGaW5kZXIpXG4gICAgdGhpcy5hY3Rvci53YWxrLm9uKCdmaW5pc2hlZCcsICgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmZpbmlzaCgpXG4gICAgfSlcbiAgICB0aGlzLmFjdG9yLndhbGsub24oJ2ludGVycnVwdGVkJywgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuaW50ZXJydXB0KClcbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmFjdG9yLndhbGsuc3RhcnQoKVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgc3VwZXIuZGVzdHJveSgpXG4gICAgaWYgKHRoaXMud2Fsaykge1xuICAgICAgcmV0dXJuIHRoaXMud2Fsay5kZXN0cm95KClcbiAgICB9XG4gIH1cblxuICB2YWxpZFRhcmdldCAoKSB7XG4gICAgdGhpcy5wYXRoRmluZGVyLmNhbGN1bCgpXG4gICAgcmV0dXJuIHRoaXMucGF0aEZpbmRlci5zb2x1dGlvbiAhPSBudWxsXG4gIH1cbn07XG5cbldhbGtBY3Rpb24ucHJvcGVydGllcyh7XG4gIHBhdGhGaW5kZXI6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBuZXcgUGF0aEZpbmRlcih0aGlzLmFjdG9yLnRpbGUuY29udGFpbmVyLCB0aGlzLmFjdG9yLnRpbGUsIHRoaXMudGFyZ2V0LCB7XG4gICAgICAgIHZhbGlkVGlsZTogKHRpbGUpID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuYWN0b3IuY2FuR29PblRpbGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmFjdG9yLmNhbkdvT25UaWxlKHRpbGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLndhbGthYmxlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBXYWxrQWN0aW9uXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IFRpbGVDb250YWluZXIgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZUNvbnRhaW5lclxuY29uc3QgVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlXG5jb25zdCBEaXJlY3Rpb24gPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuRGlyZWN0aW9uXG5jb25zdCBBaXJsb2NrID0gcmVxdWlyZSgnLi4vQWlybG9jaycpXG5jb25zdCBGbG9vciA9IHJlcXVpcmUoJy4uL0Zsb29yJylcblxuY2xhc3MgQWlybG9ja0dlbmVyYXRvciBleHRlbmRzIEVsZW1lbnQge1xuICBnZW5lcmF0ZSAoKSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3MoKVxuICAgIHRoaXMuc3RydWN0dXJlLmFsbFRpbGVzKCkubWFwKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlID0gdGlsZS5jb3B5QW5kUm90YXRlKHRoaXMuZGlyZWN0aW9uLmFuZ2xlKVxuICAgICAgdGlsZS54ICs9IHBvcy54XG4gICAgICB0aWxlLnkgKz0gcG9zLnlcbiAgICAgIHRoaXMudGlsZUNvbnRhaW5lci5yZW1vdmVUaWxlQXQodGlsZS54LCB0aWxlLnkpXG4gICAgICB0aGlzLnRpbGVDb250YWluZXIuYWRkVGlsZSh0aWxlKVxuICAgIH0pXG4gIH1cblxuICBnZXRQb3MgKCkge1xuICAgIGNvbnN0IGRpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uXG4gICAgY29uc3QgYm91bmRhcmllcyA9IHRoaXMudGlsZUNvbnRhaW5lci5ib3VuZGFyaWVzXG4gICAgbGV0IGkgPSAwXG4gICAgd2hpbGUgKGkgPCAyMCkge1xuICAgICAgY29uc3QgeCA9IHRoaXMuZ2V0QXhpc1BvcyhkaXJlY3Rpb24ueCwgYm91bmRhcmllcy5sZWZ0LCBib3VuZGFyaWVzLnJpZ2h0KVxuICAgICAgY29uc3QgeSA9IHRoaXMuZ2V0QXhpc1BvcyhkaXJlY3Rpb24ueSwgYm91bmRhcmllcy50b3AsIGJvdW5kYXJpZXMuYm90dG9tKVxuICAgICAgY29uc3QgdGlsZVRvVGVzdCA9IHRoaXMudGlsZUNvbnRhaW5lci5nZXRUaWxlKHggKyBkaXJlY3Rpb24uZ2V0SW52ZXJzZSgpLngsIHkgKyBkaXJlY3Rpb24uZ2V0SW52ZXJzZSgpLnkpXG4gICAgICBpZiAodGlsZVRvVGVzdCAmJiB0aWxlVG9UZXN0LndhbGthYmxlKSB7XG4gICAgICAgIHJldHVybiB7IHg6IHgsIHk6IHkgfVxuICAgICAgfVxuICAgICAgaSsrXG4gICAgfVxuICB9XG5cbiAgZ2V0QXhpc1BvcyAobW9kZSwgbWluLCBtYXgpIHtcbiAgICBpZiAobW9kZSA9PT0gMCkge1xuICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5ybmcoKSAqIChtYXggLSBtaW4pKSArIG1pblxuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIG1heFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbWluXG4gICAgfVxuICB9XG5cbiAgYWlybG9ja0ZhY3RvcnkgKG9wdCkge1xuICAgIG9wdC5kaXJlY3Rpb24gPSBEaXJlY3Rpb24udXBcbiAgICByZXR1cm4gbmV3IEFpcmxvY2sob3B0KVxuICB9XG59XG5cbkFpcmxvY2tHZW5lcmF0b3IucHJvcGVydGllcyh7XG4gIHRpbGVDb250YWluZXI6IHt9LFxuICBkaXJlY3Rpb246IHtcbiAgICBkZWZhdWx0OiBEaXJlY3Rpb24udXBcbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfSxcbiAgd2FsbEZhY3Rvcnk6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LndhbGxGYWN0b3J5IDogZnVuY3Rpb24gKG9wdCkge1xuICAgICAgICByZXR1cm4gbmV3IFRpbGUob3B0KVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgZmxvb3JGYWN0b3J5OiB7XG4gICAgY2FsY3VsOiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC53YWxsRmFjdG9yeSA6IGZ1bmN0aW9uIChvcHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBGbG9vcihvcHQpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBzdHJ1Y3R1cmU6IHtcbiAgICBjYWxjdWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnN0IHRpbGVzID0gbmV3IFRpbGVDb250YWluZXIoKVxuICAgICAgY29uc3QgdyA9IHRoaXMud2FsbEZhY3RvcnlcbiAgICAgIGNvbnN0IGYgPSB0aGlzLmZsb29yRmFjdG9yeVxuICAgICAgY29uc3QgYSA9IHRoaXMuYWlybG9ja0ZhY3RvcnkuYmluZCh0aGlzKVxuICAgICAgdGlsZXMubG9hZE1hdHJpeChbXG4gICAgICAgIFt3LCBhLCB3XSxcbiAgICAgICAgW3csIGYsIHddXG4gICAgICBdLCB7IHg6IC0xLCB5OiAtMSB9KVxuICAgICAgcmV0dXJuIHRpbGVzXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFpcmxvY2tHZW5lcmF0b3JcbiIsInZhciBpbmRleE9mID0gW10uaW5kZXhPZlxuY29uc3QgRWxlbWVudCA9IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKS5FbGVtZW50XG5jb25zdCBUaWxlQ29udGFpbmVyID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLlRpbGVDb250YWluZXJcbmNvbnN0IFRpbGUgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXRpbGVzJykuVGlsZVxuY29uc3QgRGlyZWN0aW9uID0gcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLkRpcmVjdGlvblxuY29uc3QgRG9vciA9IHJlcXVpcmUoJy4uL0Rvb3InKVxuXG5jbGFzcyBSb29tR2VuZXJhdG9yIGV4dGVuZHMgRWxlbWVudCB7XG4gIGluaXRUaWxlcyAoKSB7XG4gICAgdGhpcy5maW5hbFRpbGVzID0gbnVsbFxuICAgIHRoaXMucm9vbXMgPSBbXVxuICAgIHRoaXMuZnJlZSA9IHRoaXMucGxhbi5hbGxUaWxlcygpLmZpbHRlcigodGlsZSkgPT4ge1xuICAgICAgcmV0dXJuICFEaXJlY3Rpb24uYWxsLnNvbWUoKGRpcmVjdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGFuLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLngsIHRpbGUueSArIGRpcmVjdGlvbi55KSA9PSBudWxsXG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBnZW5lcmF0ZSAoKSB7XG4gICAgdGhpcy5nZXRUaWxlcygpLmZvckVhY2goKHRpbGUpID0+IHtcbiAgICAgIHRoaXMudGlsZUNvbnRhaW5lci5hZGRUaWxlKHRpbGUpXG4gICAgfSlcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgdGhpcy5pbml0VGlsZXMoKVxuICAgIHdoaWxlICh0aGlzLnN0ZXAoKSB8fCB0aGlzLm5ld1Jvb20oKSkge31cbiAgICB0aGlzLmNyZWF0ZURvb3JzKClcbiAgICB0aGlzLm1ha2VGaW5hbFRpbGVzKClcbiAgfVxuXG4gIGZsb29yRmFjdG9yeSAob3B0KSB7XG4gICAgcmV0dXJuIG5ldyBUaWxlKG9wdC54LCBvcHQueSlcbiAgfVxuXG4gIGRvb3JGYWN0b3J5IChvcHQpIHtcbiAgICByZXR1cm4gdGhpcy5mbG9vckZhY3Rvcnkob3B0KVxuICB9XG5cbiAgbWFrZUZpbmFsVGlsZXMgKCkge1xuICAgIHRoaXMuZmluYWxUaWxlcyA9IHRoaXMucGxhbi5hbGxUaWxlcygpLm1hcCgodGlsZSkgPT4ge1xuICAgICAgdmFyIG9wdFxuICAgICAgaWYgKHRpbGUuZmFjdG9yeSAhPSBudWxsKSB7XG4gICAgICAgIG9wdCA9IHtcbiAgICAgICAgICB4OiB0aWxlLngsXG4gICAgICAgICAgeTogdGlsZS55XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpbGUuZmFjdG9yeU9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIG9wdCA9IE9iamVjdC5hc3NpZ24ob3B0LCB0aWxlLmZhY3RvcnlPcHRpb25zKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aWxlLmZhY3Rvcnkob3B0KVxuICAgICAgfVxuICAgIH0pLmZpbHRlcigodGlsZSkgPT4ge1xuICAgICAgcmV0dXJuIHRpbGUgIT0gbnVsbFxuICAgIH0pXG4gIH1cblxuICBnZXRUaWxlcyAoKSB7XG4gICAgaWYgKHRoaXMuZmluYWxUaWxlcyA9PSBudWxsKSB7XG4gICAgICB0aGlzLmNhbGN1bCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmZpbmFsVGlsZXNcbiAgfVxuXG4gIG5ld1Jvb20gKCkge1xuICAgIGlmICh0aGlzLmZyZWUubGVuZ3RoKSB7XG4gICAgICB0aGlzLnZvbHVtZSA9IE1hdGguZmxvb3IodGhpcy5ybmcoKSAqICh0aGlzLm1heFZvbHVtZSAtIHRoaXMubWluVm9sdW1lKSkgKyB0aGlzLm1pblZvbHVtZVxuICAgICAgdGhpcy5yb29tID0gbmV3IFJvb21HZW5lcmF0b3IuUm9vbSgpXG4gICAgICByZXR1cm4gdGhpcy5yb29tXG4gICAgfVxuICB9XG5cbiAgcmFuZG9tRGlyZWN0aW9ucyAoKSB7XG4gICAgdmFyIGksIGosIG8sIHhcbiAgICBvID0gRGlyZWN0aW9uLmFkamFjZW50cy5zbGljZSgpXG4gICAgaiA9IG51bGxcbiAgICB4ID0gbnVsbFxuICAgIGkgPSBvLmxlbmd0aFxuICAgIHdoaWxlIChpKSB7XG4gICAgICBqID0gTWF0aC5mbG9vcih0aGlzLnJuZygpICogaSlcbiAgICAgIHggPSBvWy0taV1cbiAgICAgIG9baV0gPSBvW2pdXG4gICAgICBvW2pdID0geFxuICAgIH1cbiAgICByZXR1cm4gb1xuICB9XG5cbiAgc3RlcCAoKSB7XG4gICAgdmFyIHN1Y2Nlc3MsIHRyaWVzXG4gICAgaWYgKHRoaXMucm9vbSkge1xuICAgICAgaWYgKHRoaXMuZnJlZS5sZW5ndGggJiYgdGhpcy5yb29tLnRpbGVzLmxlbmd0aCA8IHRoaXMudm9sdW1lIC0gMSkge1xuICAgICAgICBpZiAodGhpcy5yb29tLnRpbGVzLmxlbmd0aCkge1xuICAgICAgICAgIHRyaWVzID0gdGhpcy5yYW5kb21EaXJlY3Rpb25zKClcbiAgICAgICAgICBzdWNjZXNzID0gZmFsc2VcbiAgICAgICAgICB3aGlsZSAodHJpZXMubGVuZ3RoICYmICFzdWNjZXNzKSB7XG4gICAgICAgICAgICBzdWNjZXNzID0gdGhpcy5leHBhbmQodGhpcy5yb29tLCB0cmllcy5wb3AoKSwgdGhpcy52b2x1bWUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc3VjY2Vzcykge1xuICAgICAgICAgICAgdGhpcy5yb29tRG9uZSgpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzdWNjZXNzXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5hbGxvY2F0ZVRpbGUodGhpcy5yYW5kb21GcmVlVGlsZSgpLCB0aGlzLnJvb20pXG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yb29tRG9uZSgpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJvb21Eb25lICgpIHtcbiAgICB0aGlzLnJvb21zLnB1c2godGhpcy5yb29tKVxuICAgIHRoaXMuYWxsb2NhdGVXYWxscyh0aGlzLnJvb20pXG4gICAgdGhpcy5yb29tID0gbnVsbFxuICB9XG5cbiAgZXhwYW5kIChyb29tLCBkaXJlY3Rpb24sIG1heCA9IDApIHtcbiAgICByZXR1cm4gcm9vbS50aWxlcy5zbGljZSgpLnJlZHVjZSgoc3VjY2VzcywgdGlsZSkgPT4ge1xuICAgICAgaWYgKG1heCA9PT0gMCB8fCByb29tLnRpbGVzLmxlbmd0aCA8IG1heCkge1xuICAgICAgICBjb25zdCBuZXh0ID0gdGhpcy50aWxlT2Zmc2V0SXNGcmVlKHRpbGUsIGRpcmVjdGlvbilcbiAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICB0aGlzLmFsbG9jYXRlVGlsZShuZXh0LCByb29tKVxuICAgICAgICAgIHN1Y2Nlc3MgPSB0cnVlXG4gICAgICAgICAgY29uc3Qgc2Vjb25kID0gdGhpcy50aWxlT2Zmc2V0SXNGcmVlKHRpbGUsIGRpcmVjdGlvbiwgMilcbiAgICAgICAgICBpZiAoc2Vjb25kICYmICF0aGlzLnRpbGVPZmZzZXRJc0ZyZWUodGlsZSwgZGlyZWN0aW9uLCAzKSkge1xuICAgICAgICAgICAgdGhpcy5hbGxvY2F0ZVRpbGUoc2Vjb25kLCByb29tKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHN1Y2Nlc3NcbiAgICB9LCBmYWxzZSlcbiAgfVxuXG4gIGFsbG9jYXRlV2FsbHMgKHJvb20pIHtcbiAgICB2YXIgZGlyZWN0aW9uLCBrLCBsZW4sIG5leHQsIG5leHRSb29tLCBvdGhlclNpZGUsIHJlZiwgcmVzdWx0cywgdGlsZVxuICAgIHJlZiA9IHJvb20udGlsZXNcbiAgICByZXN1bHRzID0gW11cbiAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIHRpbGUgPSByZWZba11cbiAgICAgIHJlc3VsdHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsLCBsZW4xLCByZWYxLCByZXN1bHRzMVxuICAgICAgICByZWYxID0gRGlyZWN0aW9uLmFsbFxuICAgICAgICByZXN1bHRzMSA9IFtdXG4gICAgICAgIGZvciAobCA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgbCA8IGxlbjE7IGwrKykge1xuICAgICAgICAgIGRpcmVjdGlvbiA9IHJlZjFbbF1cbiAgICAgICAgICBuZXh0ID0gdGhpcy5wbGFuLmdldFRpbGUodGlsZS54ICsgZGlyZWN0aW9uLngsIHRpbGUueSArIGRpcmVjdGlvbi55KVxuICAgICAgICAgIGlmICgobmV4dCAhPSBudWxsKSAmJiBuZXh0LnJvb20gIT09IHJvb20pIHtcbiAgICAgICAgICAgIGlmIChpbmRleE9mLmNhbGwoRGlyZWN0aW9uLmNvcm5lcnMsIGRpcmVjdGlvbikgPCAwKSB7XG4gICAgICAgICAgICAgIG90aGVyU2lkZSA9IHRoaXMucGxhbi5nZXRUaWxlKHRpbGUueCArIGRpcmVjdGlvbi54ICogMiwgdGlsZS55ICsgZGlyZWN0aW9uLnkgKiAyKVxuICAgICAgICAgICAgICBuZXh0Um9vbSA9IChvdGhlclNpZGUgIT0gbnVsbCA/IG90aGVyU2lkZS5yb29tIDogbnVsbCkgIT0gbnVsbCA/IG90aGVyU2lkZS5yb29tIDogbnVsbFxuICAgICAgICAgICAgICByb29tLmFkZFdhbGwobmV4dCwgbmV4dFJvb20pXG4gICAgICAgICAgICAgIGlmIChuZXh0Um9vbSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgbmV4dFJvb20uYWRkV2FsbChuZXh0LCByb29tKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy53YWxsRmFjdG9yeSkge1xuICAgICAgICAgICAgICBuZXh0LmZhY3RvcnkgPSAob3B0KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FsbEZhY3Rvcnkob3B0KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5leHQuZmFjdG9yeS5iYXNlID0gdGhpcy53YWxsRmFjdG9yeVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0czEucHVzaCh0aGlzLmFsbG9jYXRlVGlsZShuZXh0KSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0czEucHVzaChudWxsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0czFcbiAgICAgIH0uY2FsbCh0aGlzKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHNcbiAgfVxuXG4gIGNyZWF0ZURvb3JzICgpIHtcbiAgICB2YXIgYWRqYWNlbnQsIGRvb3IsIGssIGxlbiwgcmVmLCByZXN1bHRzLCByb29tLCB3YWxsc1xuICAgIHJlZiA9IHRoaXMucm9vbXNcbiAgICByZXN1bHRzID0gW11cbiAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIHJvb20gPSByZWZba11cbiAgICAgIHJlc3VsdHMucHVzaChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsLCBsZW4xLCByZWYxLCByZXN1bHRzMVxuICAgICAgICByZWYxID0gcm9vbS53YWxsc0J5Um9vbXMoKVxuICAgICAgICByZXN1bHRzMSA9IFtdXG4gICAgICAgIGZvciAobCA9IDAsIGxlbjEgPSByZWYxLmxlbmd0aDsgbCA8IGxlbjE7IGwrKykge1xuICAgICAgICAgIHdhbGxzID0gcmVmMVtsXVxuICAgICAgICAgIGlmICgod2FsbHMucm9vbSAhPSBudWxsKSAmJiByb29tLmRvb3JzRm9yUm9vbSh3YWxscy5yb29tKSA8IDEpIHtcbiAgICAgICAgICAgIGRvb3IgPSB3YWxscy50aWxlc1tNYXRoLmZsb29yKHRoaXMucm5nKCkgKiB3YWxscy50aWxlcy5sZW5ndGgpXVxuICAgICAgICAgICAgZG9vci5mYWN0b3J5ID0gKG9wdCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb29yRmFjdG9yeShvcHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb29yLmZhY3RvcnkuYmFzZSA9IHRoaXMuZG9vckZhY3RvcnlcbiAgICAgICAgICAgIGFkamFjZW50ID0gdGhpcy5wbGFuLmdldFRpbGUoZG9vci54ICsgMSwgZG9vci55KVxuICAgICAgICAgICAgZG9vci5mYWN0b3J5T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgZGlyZWN0aW9uOiBhZGphY2VudC5mYWN0b3J5ICYmIGFkamFjZW50LmZhY3RvcnkuYmFzZSA9PT0gdGhpcy5mbG9vckZhY3RvcnkgPyBEb29yLmRpcmVjdGlvbnMudmVydGljYWwgOiBEb29yLmRpcmVjdGlvbnMuaG9yaXpvbnRhbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm9vbS5hZGREb29yKGRvb3IsIHdhbGxzLnJvb20pXG4gICAgICAgICAgICByZXN1bHRzMS5wdXNoKHdhbGxzLnJvb20uYWRkRG9vcihkb29yLCByb29tKSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0czEucHVzaChudWxsKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0czFcbiAgICAgIH0uY2FsbCh0aGlzKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHNcbiAgfVxuXG4gIGFsbG9jYXRlVGlsZSAodGlsZSwgcm9vbSA9IG51bGwpIHtcbiAgICB2YXIgaW5kZXhcbiAgICBpZiAocm9vbSAhPSBudWxsKSB7XG4gICAgICByb29tLmFkZFRpbGUodGlsZSlcbiAgICAgIHRpbGUuZmFjdG9yeSA9IChvcHQpID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmxvb3JGYWN0b3J5KG9wdClcbiAgICAgIH1cbiAgICAgIHRpbGUuZmFjdG9yeS5iYXNlID0gdGhpcy5mbG9vckZhY3RvcnlcbiAgICB9XG4gICAgaW5kZXggPSB0aGlzLmZyZWUuaW5kZXhPZih0aWxlKVxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5mcmVlLnNwbGljZShpbmRleCwgMSlcbiAgICB9XG4gIH1cblxuICB0aWxlT2Zmc2V0SXNGcmVlICh0aWxlLCBkaXJlY3Rpb24sIG11bHRpcGx5ID0gMSkge1xuICAgIHJldHVybiB0aGlzLnRpbGVJc0ZyZWUodGlsZS54ICsgZGlyZWN0aW9uLnggKiBtdWx0aXBseSwgdGlsZS55ICsgZGlyZWN0aW9uLnkgKiBtdWx0aXBseSlcbiAgfVxuXG4gIHRpbGVJc0ZyZWUgKHgsIHkpIHtcbiAgICB2YXIgdGlsZVxuICAgIHRpbGUgPSB0aGlzLnBsYW4uZ2V0VGlsZSh4LCB5KVxuICAgIGlmICgodGlsZSAhPSBudWxsKSAmJiBpbmRleE9mLmNhbGwodGhpcy5mcmVlLCB0aWxlKSA+PSAwKSB7XG4gICAgICByZXR1cm4gdGlsZVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cblxuICByYW5kb21GcmVlVGlsZSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZnJlZVtNYXRoLmZsb29yKHRoaXMucm5nKCkgKiB0aGlzLmZyZWUubGVuZ3RoKV1cbiAgfVxufTtcblxuUm9vbUdlbmVyYXRvci5wcm9wZXJ0aWVzKHtcbiAgdGlsZUNvbnRhaW5lcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5ldyBUaWxlQ29udGFpbmVyKClcbiAgICB9XG4gIH0sXG4gIHJuZzoge1xuICAgIGRlZmF1bHQ6IE1hdGgucmFuZG9tXG4gIH0sXG4gIG1heFZvbHVtZToge1xuICAgIGRlZmF1bHQ6IDI1XG4gIH0sXG4gIG1pblZvbHVtZToge1xuICAgIGRlZmF1bHQ6IDUwXG4gIH0sXG4gIHdpZHRoOiB7XG4gICAgZGVmYXVsdDogMzBcbiAgfSxcbiAgaGVpZ2h0OiB7XG4gICAgZGVmYXVsdDogMTVcbiAgfSxcbiAgcGxhbjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgdGlsZXMgPSBuZXcgVGlsZUNvbnRhaW5lcigpXG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICB0aWxlcy5hZGRUaWxlKG5ldyBUaWxlKHgsIHkpKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGlsZXNcbiAgICB9XG4gIH1cbn0pXG5cblJvb21HZW5lcmF0b3IuUm9vbSA9IGNsYXNzIFJvb20ge1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy50aWxlcyA9IFtdXG4gICAgdGhpcy53YWxscyA9IFtdXG4gICAgdGhpcy5kb29ycyA9IFtdXG4gIH1cblxuICBhZGRUaWxlICh0aWxlKSB7XG4gICAgdGhpcy50aWxlcy5wdXNoKHRpbGUpXG4gICAgdGlsZS5yb29tID0gdGhpc1xuICB9XG5cbiAgY29udGFpbnNXYWxsICh0aWxlKSB7XG4gICAgdmFyIGssIGxlbiwgcmVmLCB3YWxsXG4gICAgcmVmID0gdGhpcy53YWxsc1xuICAgIGZvciAoayA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGsgPCBsZW47IGsrKykge1xuICAgICAgd2FsbCA9IHJlZltrXVxuICAgICAgaWYgKHdhbGwudGlsZSA9PT0gdGlsZSkge1xuICAgICAgICByZXR1cm4gd2FsbFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGFkZFdhbGwgKHRpbGUsIG5leHRSb29tKSB7XG4gICAgdmFyIGV4aXN0aW5nXG4gICAgZXhpc3RpbmcgPSB0aGlzLmNvbnRhaW5zV2FsbCh0aWxlKVxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgZXhpc3RpbmcubmV4dFJvb20gPSBuZXh0Um9vbVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLndhbGxzLnB1c2goe1xuICAgICAgICB0aWxlOiB0aWxlLFxuICAgICAgICBuZXh0Um9vbTogbmV4dFJvb21cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgd2FsbHNCeVJvb21zICgpIHtcbiAgICB2YXIgaywgbGVuLCBwb3MsIHJlZiwgcmVzLCByb29tcywgd2FsbFxuICAgIHJvb21zID0gW11cbiAgICByZXMgPSBbXVxuICAgIHJlZiA9IHRoaXMud2FsbHNcbiAgICBmb3IgKGsgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBrIDwgbGVuOyBrKyspIHtcbiAgICAgIHdhbGwgPSByZWZba11cbiAgICAgIHBvcyA9IHJvb21zLmluZGV4T2Yod2FsbC5uZXh0Um9vbSlcbiAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgIHBvcyA9IHJvb21zLmxlbmd0aFxuICAgICAgICByb29tcy5wdXNoKHdhbGwubmV4dFJvb20pXG4gICAgICAgIHJlcy5wdXNoKHtcbiAgICAgICAgICByb29tOiB3YWxsLm5leHRSb29tLFxuICAgICAgICAgIHRpbGVzOiBbXVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgcmVzW3Bvc10udGlsZXMucHVzaCh3YWxsLnRpbGUpXG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIGFkZERvb3IgKHRpbGUsIG5leHRSb29tKSB7XG4gICAgcmV0dXJuIHRoaXMuZG9vcnMucHVzaCh7XG4gICAgICB0aWxlOiB0aWxlLFxuICAgICAgbmV4dFJvb206IG5leHRSb29tXG4gICAgfSlcbiAgfVxuXG4gIGRvb3JzRm9yUm9vbSAocm9vbSkge1xuICAgIHJldHVybiB0aGlzLmRvb3JzXG4gICAgICAuZmlsdGVyKChkb29yKSA9PiBkb29yLm5leHRSb29tID09PSByb29tKVxuICAgICAgLm1hcCgoZG9vcikgPT4gZG9vci50aWxlKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUm9vbUdlbmVyYXRvclxuIiwiY29uc3QgVGlsZSA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5UaWxlXG5jb25zdCBSb29tR2VuZXJhdG9yID0gcmVxdWlyZSgnLi9Sb29tR2VuZXJhdG9yJylcbmNvbnN0IEFpcmxvY2tHZW5lcmF0b3IgPSByZXF1aXJlKCcuL0FpcmxvY2tHZW5lcmF0b3InKVxuY29uc3QgRmxvb3IgPSByZXF1aXJlKCcuLi9GbG9vcicpXG5jb25zdCBEb29yID0gcmVxdWlyZSgnLi4vQXV0b21hdGljRG9vcicpXG5jb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IERpcmVjdGlvbiA9IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGlsZXMnKS5EaXJlY3Rpb25cblxuY2xhc3MgU2hpcEludGVyaW9yR2VuZXJhdG9yIGV4dGVuZHMgRWxlbWVudCB7XG4gIGdlbmVyYXRlICgpIHtcbiAgICB0aGlzLnJvb21HZW5lcmF0b3IuZ2VuZXJhdGUoKVxuXG4gICAgdGhpcy5haXJsb2NrR2VuZXJhdG9ycy5mb3JFYWNoKChhaXJsb2NrR2VuKSA9PiB7XG4gICAgICBhaXJsb2NrR2VuLmdlbmVyYXRlKClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXMuc2hpcEludGVyaW9yXG4gIH1cblxuICB3YWxsRmFjdG9yeSAob3B0KSB7XG4gICAgcmV0dXJuIChuZXcgVGlsZShvcHQueCwgb3B0LnkpKS50YXAoZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy53YWxrYWJsZSA9IGZhbHNlXG4gICAgfSlcbiAgfVxuXG4gIGZsb29yRmFjdG9yeSAob3B0KSB7XG4gICAgcmV0dXJuIG5ldyBGbG9vcihvcHQueCwgb3B0LnkpXG4gIH1cblxuICBkb29yRmFjdG9yeSAob3B0KSB7XG4gICAgcmV0dXJuIChuZXcgRmxvb3Iob3B0LngsIG9wdC55KSkudGFwKGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMuYWRkQ2hpbGQobmV3IERvb3Ioe1xuICAgICAgICBkaXJlY3Rpb246IG9wdC5kaXJlY3Rpb25cbiAgICAgIH0pKVxuICAgIH0pXG4gIH1cbn1cblxuU2hpcEludGVyaW9yR2VuZXJhdG9yLnByb3BlcnRpZXMoe1xuICBzaGlwSW50ZXJpb3I6IHtcbiAgfSxcbiAgcm5nOiB7XG4gICAgZGVmYXVsdDogTWF0aC5yYW5kb21cbiAgfSxcbiAgcm9vbUdlbmVyYXRvcjoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3Qgcm9vbUdlbiA9IG5ldyBSb29tR2VuZXJhdG9yKHtcbiAgICAgICAgdGlsZUNvbnRhaW5lcjogdGhpcy5zaGlwSW50ZXJpb3IsXG4gICAgICAgIHJuZzogdGhpcy5ybmdcbiAgICAgIH0pXG4gICAgICByb29tR2VuLndhbGxGYWN0b3J5ID0gdGhpcy53YWxsRmFjdG9yeVxuICAgICAgcm9vbUdlbi5mbG9vckZhY3RvcnkgPSB0aGlzLmZsb29yRmFjdG9yeVxuICAgICAgcm9vbUdlbi5kb29yRmFjdG9yeSA9IHRoaXMuZG9vckZhY3RvcnlcbiAgICAgIHJldHVybiByb29tR2VuXG4gICAgfVxuICB9LFxuICBhaXJsb2NrR2VuZXJhdG9yczoge1xuICAgIGNhbGN1bDogZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIFtcbiAgICAgICAgbmV3IEFpcmxvY2tHZW5lcmF0b3Ioe1xuICAgICAgICAgIHRpbGVDb250YWluZXI6IHRoaXMuc2hpcEludGVyaW9yLFxuICAgICAgICAgIHJuZzogdGhpcy5ybmcsXG4gICAgICAgICAgZGlyZWN0aW9uOiBEaXJlY3Rpb24udXBcbiAgICAgICAgfSksXG4gICAgICAgIG5ldyBBaXJsb2NrR2VuZXJhdG9yKHtcbiAgICAgICAgICB0aWxlQ29udGFpbmVyOiB0aGlzLnNoaXBJbnRlcmlvcixcbiAgICAgICAgICBybmc6IHRoaXMucm5nLFxuICAgICAgICAgIGRpcmVjdGlvbjogRGlyZWN0aW9uLmRvd25cbiAgICAgICAgfSlcbiAgICAgIF1cbiAgICB9XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gU2hpcEludGVyaW9yR2VuZXJhdG9yXG4iLCJjb25zdCBFbGVtZW50ID0gcmVxdWlyZSgnc3Bhcmstc3RhcnRlcicpLkVsZW1lbnRcbmNvbnN0IE1hcCA9IHJlcXVpcmUoJy4uL01hcCcpXG5jb25zdCBTdGFyU3lzdGVtID0gcmVxdWlyZSgnLi4vU3RhclN5c3RlbScpXG5jb25zdCBzdGFyTmFtZXMgPSByZXF1aXJlKCdwYXJhbGxlbGlvLXN0cmluZ3MnKS5zdGFyTmFtZXNcblxuY2xhc3MgU3Rhck1hcEdlbmVyYXRvciBleHRlbmRzIEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvciAob3B0aW9ucykge1xuICAgIHN1cGVyKClcbiAgICB0aGlzLm9wdCA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZGVmT3B0LCBvcHRpb25zKVxuICB9XG5cbiAgZ2VuZXJhdGUgKCkge1xuICAgIGNvbnN0IE1hcENsYXNzID0gdGhpcy5vcHQubWFwQ2xhc3NcbiAgICB0aGlzLm1hcCA9IG5ldyBNYXBDbGFzcygpXG4gICAgdGhpcy5zdGFycyA9IHRoaXMubWFwLmxvY2F0aW9ucy5jb3B5KClcbiAgICB0aGlzLmxpbmtzID0gW11cbiAgICB0aGlzLmNyZWF0ZVN0YXJzKHRoaXMub3B0Lm5iU3RhcnMpXG4gICAgdGhpcy5tYWtlTGlua3MoKVxuICAgIHJldHVybiB0aGlzLm1hcFxuICB9XG5cbiAgY3JlYXRlU3RhcnMgKG5iKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oQXJyYXkobmIpLCAoKSA9PiB0aGlzLmNyZWF0ZVN0YXIoKSlcbiAgfVxuXG4gIGNyZWF0ZVN0YXIgKG9wdCA9IHt9KSB7XG4gICAgdmFyIG5hbWUsIHBvcywgc3RhclxuICAgIGlmICghKG9wdC54ICYmIG9wdC55KSkge1xuICAgICAgcG9zID0gdGhpcy5yYW5kb21TdGFyUG9zKClcbiAgICAgIGlmIChwb3MgIT0gbnVsbCkge1xuICAgICAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHQsIHtcbiAgICAgICAgICB4OiBwb3MueCxcbiAgICAgICAgICB5OiBwb3MueVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCFvcHQubmFtZSkge1xuICAgICAgbmFtZSA9IHRoaXMucmFuZG9tU3Rhck5hbWUoKVxuICAgICAgaWYgKG5hbWUgIT0gbnVsbCkge1xuICAgICAgICBvcHQgPSBPYmplY3QuYXNzaWduKHt9LCBvcHQsIHtcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBTdGFyQ2xhc3MgPSB0aGlzLm9wdC5zdGFyQ2xhc3NcbiAgICBzdGFyID0gbmV3IFN0YXJDbGFzcyhvcHQpXG4gICAgdGhpcy5tYXAubG9jYXRpb25zLnB1c2goc3RhcilcbiAgICB0aGlzLnN0YXJzLnB1c2goc3RhcilcbiAgICByZXR1cm4gc3RhclxuICB9XG5cbiAgcmFuZG9tU3RhclBvcyAoKSB7XG4gICAgdmFyIGosIHBvc1xuICAgIGogPSAwXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIHBvcyA9IHtcbiAgICAgICAgeDogTWF0aC5mbG9vcih0aGlzLm9wdC5ybmcoKSAqICh0aGlzLm9wdC5tYXhYIC0gdGhpcy5vcHQubWluWCkgKyB0aGlzLm9wdC5taW5YKSxcbiAgICAgICAgeTogTWF0aC5mbG9vcih0aGlzLm9wdC5ybmcoKSAqICh0aGlzLm9wdC5tYXhZIC0gdGhpcy5vcHQubWluWSkgKyB0aGlzLm9wdC5taW5ZKVxuICAgICAgfVxuICAgICAgaWYgKCEoaiA8IDEwICYmIHRoaXMuc3RhcnMuZmluZCgoc3RhcikgPT4ge1xuICAgICAgICByZXR1cm4gc3Rhci5kaXN0KHBvcy54LCBwb3MueSkgPD0gdGhpcy5vcHQubWluU3RhckRpc3RcbiAgICAgIH0pKSkge1xuICAgICAgICBicmVha1xuICAgICAgfVxuICAgICAgaisrXG4gICAgfVxuICAgIGlmICghKGogPj0gMTApKSB7XG4gICAgICByZXR1cm4gcG9zXG4gICAgfVxuICB9XG5cbiAgcmFuZG9tU3Rhck5hbWUgKCkge1xuICAgIHZhciBuYW1lLCBwb3MsIHJlZlxuICAgIGlmICgocmVmID0gdGhpcy5vcHQuc3Rhck5hbWVzKSAhPSBudWxsID8gcmVmLmxlbmd0aCA6IG51bGwpIHtcbiAgICAgIHBvcyA9IE1hdGguZmxvb3IodGhpcy5vcHQucm5nKCkgKiB0aGlzLm9wdC5zdGFyTmFtZXMubGVuZ3RoKVxuICAgICAgbmFtZSA9IHRoaXMub3B0LnN0YXJOYW1lc1twb3NdXG4gICAgICB0aGlzLm9wdC5zdGFyTmFtZXMuc3BsaWNlKHBvcywgMSlcbiAgICAgIHJldHVybiBuYW1lXG4gICAgfVxuICB9XG5cbiAgbWFrZUxpbmtzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFycy5mb3JFYWNoKChzdGFyKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5tYWtlTGlua3NGcm9tKHN0YXIpXG4gICAgfSlcbiAgfVxuXG4gIG1ha2VMaW5rc0Zyb20gKHN0YXIpIHtcbiAgICB2YXIgY2xvc2UsIGNsb3Nlc3RzLCBsaW5rLCBuZWVkZWQsIHJlc3VsdHMsIHRyaWVzXG4gICAgdHJpZXMgPSB0aGlzLm9wdC5saW5rVHJpZXNcbiAgICBuZWVkZWQgPSB0aGlzLm9wdC5saW5rc0J5U3RhcnMgLSBzdGFyLmxpbmtzLmNvdW50KClcbiAgICBpZiAobmVlZGVkID4gMCkge1xuICAgICAgY2xvc2VzdHMgPSB0aGlzLnN0YXJzLmZpbHRlcigoc3RhcjIpID0+IHtcbiAgICAgICAgcmV0dXJuIHN0YXIyICE9PSBzdGFyICYmICFzdGFyLmxpbmtzLmZpbmRTdGFyKHN0YXIyKVxuICAgICAgfSkuY2xvc2VzdHMoc3Rhci54LCBzdGFyLnkpXG4gICAgICBpZiAoY2xvc2VzdHMuY291bnQoKSA+IDApIHtcbiAgICAgICAgcmVzdWx0cyA9IFtdXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgY2xvc2UgPSBjbG9zZXN0cy5zaGlmdCgpXG4gICAgICAgICAgbGluayA9IHRoaXMuY3JlYXRlTGluayhzdGFyLCBjbG9zZSlcbiAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZUxpbmsobGluaykpIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MucHVzaChsaW5rKVxuICAgICAgICAgICAgc3Rhci5hZGRMaW5rKGxpbmspXG4gICAgICAgICAgICBuZWVkZWQgLT0gMVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmllcyAtPSAxXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKG5lZWRlZCA+IDAgJiYgdHJpZXMgPiAwICYmIGNsb3Nlc3RzLmNvdW50KCkgPiAwKSkge1xuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKG51bGwpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlTGluayAoc3RhcjEsIHN0YXIyKSB7XG4gICAgY29uc3QgTGlua0NsYXNzID0gdGhpcy5vcHQubGlua0NsYXNzXG4gICAgcmV0dXJuIG5ldyBMaW5rQ2xhc3Moc3RhcjEsIHN0YXIyKVxuICB9XG5cbiAgdmFsaWRhdGVMaW5rIChsaW5rKSB7XG4gICAgcmV0dXJuICF0aGlzLnN0YXJzLmZpbmQoKHN0YXIpID0+IHtcbiAgICAgIHJldHVybiBzdGFyICE9PSBsaW5rLnN0YXIxICYmIHN0YXIgIT09IGxpbmsuc3RhcjIgJiYgbGluay5jbG9zZVRvUG9pbnQoc3Rhci54LCBzdGFyLnksIHRoaXMub3B0Lm1pbkxpbmtEaXN0KVxuICAgIH0pICYmICF0aGlzLmxpbmtzLmZpbmQoKGxpbmsyKSA9PiB7XG4gICAgICByZXR1cm4gbGluazIuaW50ZXJzZWN0TGluayhsaW5rKVxuICAgIH0pXG4gIH1cbn07XG5cblN0YXJNYXBHZW5lcmF0b3IucHJvdG90eXBlLmRlZk9wdCA9IHtcbiAgbmJTdGFyczogMjAsXG4gIG1pblg6IDAsXG4gIG1heFg6IDUwMCxcbiAgbWluWTogMCxcbiAgbWF4WTogNTAwLFxuICBtaW5TdGFyRGlzdDogMjAsXG4gIG1pbkxpbmtEaXN0OiAyMCxcbiAgbGlua3NCeVN0YXJzOiAzLFxuICBsaW5rVHJpZXM6IDMsXG4gIG1hcENsYXNzOiBNYXAsXG4gIHN0YXJDbGFzczogU3RhclN5c3RlbSxcbiAgbGlua0NsYXNzOiBTdGFyU3lzdGVtLkxpbmssXG4gIHJuZzogTWF0aC5yYW5kb20sXG4gIHN0YXJOYW1lczogc3Rhck5hbWVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU3Rhck1hcEdlbmVyYXRvclxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEFpcmxvY2s6IHJlcXVpcmUoJy4vQWlybG9jaycpLFxuICBBcHByb2FjaDogcmVxdWlyZSgnLi9BcHByb2FjaCcpLFxuICBBdXRvbWF0aWNEb29yOiByZXF1aXJlKCcuL0F1dG9tYXRpY0Rvb3InKSxcbiAgQ2hhcmFjdGVyOiByZXF1aXJlKCcuL0NoYXJhY3RlcicpLFxuICBDaGFyYWN0ZXJBSTogcmVxdWlyZSgnLi9DaGFyYWN0ZXJBSScpLFxuICBDb25mcm9udGF0aW9uOiByZXF1aXJlKCcuL0NvbmZyb250YXRpb24nKSxcbiAgRGFtYWdlUHJvcGFnYXRpb246IHJlcXVpcmUoJy4vRGFtYWdlUHJvcGFnYXRpb24nKSxcbiAgRGFtYWdlYWJsZTogcmVxdWlyZSgnLi9EYW1hZ2VhYmxlJyksXG4gIERvb3I6IHJlcXVpcmUoJy4vRG9vcicpLFxuICBFbGVtZW50OiByZXF1aXJlKCcuL0VsZW1lbnQnKSxcbiAgRW5jb3VudGVyTWFuYWdlcjogcmVxdWlyZSgnLi9FbmNvdW50ZXJNYW5hZ2VyJyksXG4gIEZsb29yOiByZXF1aXJlKCcuL0Zsb29yJyksXG4gIEdhbWU6IHJlcXVpcmUoJy4vR2FtZScpLFxuICBJbnZlbnRvcnk6IHJlcXVpcmUoJy4vSW52ZW50b3J5JyksXG4gIExpbmVPZlNpZ2h0OiByZXF1aXJlKCcuL0xpbmVPZlNpZ2h0JyksXG4gIE1hcDogcmVxdWlyZSgnLi9NYXAnKSxcbiAgT2JzdGFjbGU6IHJlcXVpcmUoJy4vT2JzdGFjbGUnKSxcbiAgUGF0aFdhbGs6IHJlcXVpcmUoJy4vUGF0aFdhbGsnKSxcbiAgUGVyc29uYWxXZWFwb246IHJlcXVpcmUoJy4vUGVyc29uYWxXZWFwb24nKSxcbiAgUGxheWVyOiByZXF1aXJlKCcuL1BsYXllcicpLFxuICBQcm9qZWN0aWxlOiByZXF1aXJlKCcuL1Byb2plY3RpbGUnKSxcbiAgUmVzc291cmNlOiByZXF1aXJlKCcuL1Jlc3NvdXJjZScpLFxuICBSZXNzb3VyY2VUeXBlOiByZXF1aXJlKCcuL1Jlc3NvdXJjZVR5cGUnKSxcbiAgU2hpcDogcmVxdWlyZSgnLi9TaGlwJyksXG4gIFNoaXBJbnRlcmlvcjogcmVxdWlyZSgnLi9TaGlwSW50ZXJpb3InKSxcbiAgU2hpcFdlYXBvbjogcmVxdWlyZSgnLi9TaGlwV2VhcG9uJyksXG4gIFN0YXJTeXN0ZW06IHJlcXVpcmUoJy4vU3RhclN5c3RlbScpLFxuICBUcmF2ZWw6IHJlcXVpcmUoJy4vVHJhdmVsJyksXG4gIFZpZXc6IHJlcXVpcmUoJy4vVmlldycpLFxuICBWaXNpb25DYWxjdWxhdG9yOiByZXF1aXJlKCcuL1Zpc2lvbkNhbGN1bGF0b3InKSxcbiAgZ2VuZXJhdG9yczoge1xuICAgIEFpcmxvY2tHZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9BaXJsb2NrR2VuZXJhdG9yJyksXG4gICAgUm9vbUdlbmVyYXRvcjogcmVxdWlyZSgnLi9nZW5lcmF0b3JzL1Jvb21HZW5lcmF0b3InKSxcbiAgICBTaGlwSW50ZXJpb3JHZW5lcmF0b3I6IHJlcXVpcmUoJy4vZ2VuZXJhdG9ycy9TaGlwSW50ZXJpb3JHZW5lcmF0b3InKSxcbiAgICBTdGFyTWFwR2VuZXJhdG9yOiByZXF1aXJlKCcuL2dlbmVyYXRvcnMvU3Rhck1hcEdlbmVyYXRvcicpXG4gIH0sXG4gIGFjdGlvbnM6IHtcbiAgICBBY3Rpb246IHJlcXVpcmUoJy4vYWN0aW9ucy9BY3Rpb24nKSxcbiAgICBBY3Rpb25Qcm92aWRlcjogcmVxdWlyZSgnLi9hY3Rpb25zL0FjdGlvblByb3ZpZGVyJyksXG4gICAgQXR0YWNrQWN0aW9uOiByZXF1aXJlKCcuL2FjdGlvbnMvQXR0YWNrQWN0aW9uJyksXG4gICAgQXR0YWNrTW92ZUFjdGlvbjogcmVxdWlyZSgnLi9hY3Rpb25zL0F0dGFja01vdmVBY3Rpb24nKSxcbiAgICBTaW1wbGVBY3Rpb25Qcm92aWRlcjogcmVxdWlyZSgnLi9hY3Rpb25zL1NpbXBsZUFjdGlvblByb3ZpZGVyJyksXG4gICAgVGFyZ2V0QWN0aW9uOiByZXF1aXJlKCcuL2FjdGlvbnMvVGFyZ2V0QWN0aW9uJyksXG4gICAgVGlsZWRBY3Rpb25Qcm92aWRlcjogcmVxdWlyZSgnLi9hY3Rpb25zL1RpbGVkQWN0aW9uUHJvdmlkZXInKSxcbiAgICBUcmF2ZWxBY3Rpb246IHJlcXVpcmUoJy4vYWN0aW9ucy9UcmF2ZWxBY3Rpb24nKSxcbiAgICBXYWxrQWN0aW9uOiByZXF1aXJlKCcuL2FjdGlvbnMvV2Fsa0FjdGlvbicpXG4gIH1cbn1cbiIsImNvbnN0IGxpYnMgPSByZXF1aXJlKCcuL2xpYnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe30sIGxpYnMsIHtcbiAgZ3JpZHM6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tZ3JpZHMnKSxcbiAgUGF0aEZpbmRlcjogcmVxdWlyZSgncGFyYWxsZWxpby1wYXRoZmluZGVyJyksXG4gIHN0cmluZ3M6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tc3RyaW5ncycpLFxuICB0aWxlczogcmVxdWlyZSgncGFyYWxsZWxpby10aWxlcycpLFxuICBUaW1pbmc6IHJlcXVpcmUoJ3BhcmFsbGVsaW8tdGltaW5nJyksXG4gIHdpcmluZzogcmVxdWlyZSgncGFyYWxsZWxpby13aXJpbmcnKSxcbiAgU3Bhcms6IHJlcXVpcmUoJ3NwYXJrLXN0YXJ0ZXInKVxufSlcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgQmluZGVyOiByZXF1aXJlKCcuL3NyYy9CaW5kZXInKSxcbiAgRXZlbnRCaW5kOiByZXF1aXJlKCcuL3NyYy9FdmVudEJpbmQnKSxcbiAgUmVmZXJlbmNlOiByZXF1aXJlKCcuL3NyYy9SZWZlcmVuY2UnKVxufVxuIiwiY2xhc3MgQmluZGVyIHtcbiAgdG9nZ2xlQmluZCAodmFsID0gIXRoaXMuYmluZGVkKSB7XG4gICAgaWYgKHZhbCkge1xuICAgICAgcmV0dXJuIHRoaXMuYmluZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnVuYmluZCgpXG4gICAgfVxuICB9XG5cbiAgYmluZCAoKSB7XG4gICAgaWYgKCF0aGlzLmJpbmRlZCAmJiB0aGlzLmNhbkJpbmQoKSkge1xuICAgICAgdGhpcy5kb0JpbmQoKVxuICAgIH1cbiAgICB0aGlzLmJpbmRlZCA9IHRydWVcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGRvQmluZCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdOb3QgaW1wbGVtZW50ZWQnKVxuICB9XG5cbiAgdW5iaW5kICgpIHtcbiAgICBpZiAodGhpcy5iaW5kZWQgJiYgdGhpcy5jYW5CaW5kKCkpIHtcbiAgICAgIHRoaXMuZG9VbmJpbmQoKVxuICAgIH1cbiAgICB0aGlzLmJpbmRlZCA9IGZhbHNlXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICB0aGlzLnVuYmluZCgpXG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmluZGVyXG4iLCJcbmNvbnN0IEJpbmRlciA9IHJlcXVpcmUoJy4vQmluZGVyJylcbmNvbnN0IFJlZmVyZW5jZSA9IHJlcXVpcmUoJy4vUmVmZXJlbmNlJylcblxuY2xhc3MgRXZlbnRCaW5kIGV4dGVuZHMgQmluZGVyIHtcbiAgY29uc3RydWN0b3IgKGV2ZW50MSwgdGFyZ2V0MSwgY2FsbGJhY2spIHtcbiAgICBzdXBlcigpXG4gICAgdGhpcy5ldmVudCA9IGV2ZW50MVxuICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0MVxuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuICh0aGlzLmNhbGxiYWNrICE9IG51bGwpICYmICh0aGlzLnRhcmdldCAhPSBudWxsKVxuICB9XG5cbiAgYmluZFRvICh0YXJnZXQpIHtcbiAgICB0aGlzLnVuYmluZCgpXG4gICAgdGhpcy50YXJnZXQgPSB0YXJnZXRcbiAgICByZXR1cm4gdGhpcy5iaW5kKClcbiAgfVxuXG4gIGRvQmluZCAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5hZGRFdmVudExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LmFkZExpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy50YXJnZXQuYWRkTGlzdGVuZXIodGhpcy5ldmVudCwgdGhpcy5jYWxsYmFjaylcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRhcmdldC5vbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9uKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gZnVuY3Rpb24gdG8gYWRkIGV2ZW50IGxpc3RlbmVycyB3YXMgZm91bmQnKVxuICAgIH1cbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnQsIHRoaXMuY2FsbGJhY2spXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy50YXJnZXQucmVtb3ZlTGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnRhcmdldC5yZW1vdmVMaXN0ZW5lcih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudGFyZ2V0Lm9mZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0Lm9mZih0aGlzLmV2ZW50LCB0aGlzLmNhbGxiYWNrKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGZ1bmN0aW9uIHRvIHJlbW92ZSBldmVudCBsaXN0ZW5lcnMgd2FzIGZvdW5kJylcbiAgICB9XG4gIH1cblxuICBlcXVhbHMgKGV2ZW50QmluZCkge1xuICAgIHJldHVybiBldmVudEJpbmQgIT0gbnVsbCAmJlxuICAgICAgZXZlbnRCaW5kLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmXG4gICAgICBldmVudEJpbmQuZXZlbnQgPT09IHRoaXMuZXZlbnQgJiZcbiAgICAgIFJlZmVyZW5jZS5jb21wYXJlVmFsKGV2ZW50QmluZC50YXJnZXQsIHRoaXMudGFyZ2V0KSAmJlxuICAgICAgUmVmZXJlbmNlLmNvbXBhcmVWYWwoZXZlbnRCaW5kLmNhbGxiYWNrLCB0aGlzLmNhbGxiYWNrKVxuICB9XG5cbiAgc3RhdGljIGNoZWNrRW1pdHRlciAoZW1pdHRlciwgZmF0YWwgPSB0cnVlKSB7XG4gICAgaWYgKHR5cGVvZiBlbWl0dGVyLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVtaXR0ZXIuYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGVtaXR0ZXIub24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIGlmIChmYXRhbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBmdW5jdGlvbiB0byBhZGQgZXZlbnQgbGlzdGVuZXJzIHdhcyBmb3VuZCcpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEJpbmRcbiIsImNsYXNzIFJlZmVyZW5jZSB7XG4gIGNvbnN0cnVjdG9yIChkYXRhKSB7XG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICB9XG5cbiAgZXF1YWxzIChyZWYpIHtcbiAgICByZXR1cm4gcmVmICE9IG51bGwgJiYgcmVmLmNvbnN0cnVjdG9yID09PSB0aGlzLmNvbnN0cnVjdG9yICYmIHRoaXMuY29tcGFyZURhdGEocmVmLmRhdGEpXG4gIH1cblxuICBjb21wYXJlRGF0YSAoZGF0YSkge1xuICAgIGlmIChkYXRhIGluc3RhbmNlb2YgUmVmZXJlbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcXVhbHMoZGF0YSlcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSA9PT0gZGF0YSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgaWYgKHRoaXMuZGF0YSA9PSBudWxsIHx8IGRhdGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5kYXRhID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgZGF0YSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRhdGEpLmxlbmd0aCA9PT0gT2JqZWN0LmtleXMoZGF0YSkubGVuZ3RoICYmIE9iamVjdC5rZXlzKGRhdGEpLmV2ZXJ5KChrZXkpID0+IHtcbiAgICAgICAgcmV0dXJuIFJlZmVyZW5jZS5jb21wYXJlVmFsKHRoaXMuZGF0YVtrZXldLCBkYXRhW2tleV0pXG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gUmVmZXJlbmNlLmNvbXBhcmVWYWwodGhpcy5kYXRhLCBkYXRhKVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gdmFsMVxuICAgKiBAcGFyYW0geyp9IHZhbDJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIHN0YXRpYyBjb21wYXJlVmFsICh2YWwxLCB2YWwyKSB7XG4gICAgaWYgKHZhbDEgPT09IHZhbDIpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh2YWwxID09IG51bGwgfHwgdmFsMiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWwxLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHZhbDEuZXF1YWxzKHZhbDIpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsMi5lcXVhbHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWwyLmVxdWFscyh2YWwxKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwxKSAmJiBBcnJheS5pc0FycmF5KHZhbDIpKSB7XG4gICAgICByZXR1cm4gdmFsMS5sZW5ndGggPT09IHZhbDIubGVuZ3RoICYmIHZhbDEuZXZlcnkoKHZhbCwgaSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlVmFsKHZhbCwgdmFsMltpXSlcbiAgICAgIH0pXG4gICAgfVxuICAgIC8vIGlmICh0eXBlb2YgdmFsMSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbDIgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gICByZXR1cm4gT2JqZWN0LmtleXModmFsMSkubGVuZ3RoID09PSBPYmplY3Qua2V5cyh2YWwyKS5sZW5ndGggJiYgT2JqZWN0LmtleXModmFsMSkuZXZlcnkoKGtleSkgPT4ge1xuICAgIC8vICAgICByZXR1cm4gdGhpcy5jb21wYXJlVmFsKHZhbDFba2V5XSwgdmFsMltrZXldKVxuICAgIC8vICAgfSlcbiAgICAvLyB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzdGF0aWMgbWFrZVJlZmVycmVkIChvYmosIGRhdGEpIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFJlZmVyZW5jZSkge1xuICAgICAgb2JqLnJlZiA9IGRhdGFcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqLnJlZiA9IG5ldyBSZWZlcmVuY2UoZGF0YSlcbiAgICB9XG4gICAgb2JqLmVxdWFscyA9IGZ1bmN0aW9uIChvYmoyKSB7XG4gICAgICByZXR1cm4gb2JqMiAhPSBudWxsICYmIHRoaXMucmVmLmVxdWFscyhvYmoyLnJlZilcbiAgICB9XG4gICAgcmV0dXJuIG9ialxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZmVyZW5jZVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9Db2xsZWN0aW9uJylcbiIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGFycikge1xuICAgIGlmIChhcnIgIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9hcnJheSA9IGFyci50b0FycmF5KClcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hcnJheSA9IFthcnJdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FycmF5ID0gW11cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VkICgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBvbGRcbiAgICogQHBhcmFtIHtib29sZWFufSBvcmRlcmVkXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oVCxUKTogYm9vbGVhbn0gY29tcGFyZUZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja0NoYW5nZXMgKG9sZCwgb3JkZXJlZCA9IHRydWUsIGNvbXBhcmVGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgb2xkID0gdGhpcy5jb3B5KG9sZC5zbGljZSgpKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbGQgPSBbXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb3VudCgpICE9PSBvbGQubGVuZ3RoIHx8IChvcmRlcmVkID8gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgIHJldHVybiAhY29tcGFyZUZ1bmN0aW9uKG9sZC5nZXQoaSksIHZhbClcbiAgICB9KSA6IHRoaXMuc29tZShmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFvbGQucGx1Y2soZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaVxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgZ2V0IChpKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2ldXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIGdldFJhbmRvbSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FycmF5Lmxlbmd0aCldXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlcbiAgICogQHBhcmFtIHtUfSB2YWxcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHNldCAoaSwgdmFsKSB7XG4gICAgdmFyIG9sZFxuICAgIGlmICh0aGlzLl9hcnJheVtpXSAhPT0gdmFsKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXlbaV0gPSB2YWxcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1R9IHZhbFxuICAgKi9cbiAgYWRkICh2YWwpIHtcbiAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2godmFsKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VH0gdmFsXG4gICAqL1xuICByZW1vdmUgKHZhbCkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5pbmRleE9mKHZhbClcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQpOiBib29sZWFufSBmblxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgcGx1Y2sgKGZuKSB7XG4gICAgdmFyIGZvdW5kLCBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICBmb3VuZCA9IHRoaXMuX2FycmF5W2luZGV4XVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICAgIHJldHVybiBmb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtBcnJheS48VD59XG4gICAqL1xuICB0b0FycmF5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuc2xpY2UoKVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge251bWJlcn1cbiAgICovXG4gIGNvdW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoXG4gIH1cblxuICAvKipcbiAgICogQHRlbXBsYXRlIEl0ZW1UeXBlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b0FwcGVuZFxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPEl0ZW1UeXBlPnxBcnJheS48SXRlbVR5cGU+fEl0ZW1UeXBlfSBbYXJyXVxuICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9uLjxJdGVtVHlwZT59XG4gICAqL1xuICBzdGF0aWMgbmV3U3ViQ2xhc3MgKHRvQXBwZW5kLCBhcnIpIHtcbiAgICB2YXIgU3ViQ2xhc3NcbiAgICBpZiAodHlwZW9mIHRvQXBwZW5kID09PSAnb2JqZWN0Jykge1xuICAgICAgU3ViQ2xhc3MgPSBjbGFzcyBleHRlbmRzIHRoaXMge31cbiAgICAgIE9iamVjdC5hc3NpZ24oU3ViQ2xhc3MucHJvdG90eXBlLCB0b0FwcGVuZClcbiAgICAgIHJldHVybiBuZXcgU3ViQ2xhc3MoYXJyKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IHRoaXMoYXJyKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKiBAcmV0dXJuIHtDb2xsZWN0aW9uLjxUPn1cbiAgICovXG4gIGNvcHkgKGFycikge1xuICAgIHZhciBjb2xsXG4gICAgaWYgKGFyciA9PSBudWxsKSB7XG4gICAgICBhcnIgPSB0aGlzLnRvQXJyYXkoKVxuICAgIH1cbiAgICBjb2xsID0gbmV3IHRoaXMuY29uc3RydWN0b3IoYXJyKVxuICAgIHJldHVybiBjb2xsXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBhcnJcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG4gIGVxdWFscyAoYXJyKSB7XG4gICAgcmV0dXJuICh0aGlzLmNvdW50KCkgPT09ICh0eXBlb2YgYXJyLmNvdW50ID09PSAnZnVuY3Rpb24nID8gYXJyLmNvdW50KCkgOiBhcnIubGVuZ3RoKSkgJiYgdGhpcy5ldmVyeShmdW5jdGlvbiAodmFsLCBpKSB7XG4gICAgICByZXR1cm4gYXJyW2ldID09PSB2YWxcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZ2V0QWRkZWRGcm9tIChhcnIpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuZmlsdGVyKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICByZXR1cm4gIWFyci5pbmNsdWRlcyhpdGVtKVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD59IGFyclxuICAgKiBAcmV0dXJuIHtBcnJheS48VD59XG4gICAqL1xuICBnZXRSZW1vdmVkRnJvbSAoYXJyKSB7XG4gICAgcmV0dXJuIGFyci5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiAhdGhpcy5pbmNsdWRlcyhpdGVtKVxuICAgIH0pXG4gIH1cbn07XG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucyA9IFsnZXZlcnknLCAnZmluZCcsICdmaW5kSW5kZXgnLCAnZm9yRWFjaCcsICdpbmNsdWRlcycsICdpbmRleE9mJywgJ2pvaW4nLCAnbGFzdEluZGV4T2YnLCAnbWFwJywgJ3JlZHVjZScsICdyZWR1Y2VSaWdodCcsICdzb21lJywgJ3RvU3RyaW5nJ11cblxuQ29sbGVjdGlvbi5yZWFkTGlzdEZ1bmN0aW9ucyA9IFsnY29uY2F0JywgJ2ZpbHRlcicsICdzbGljZSddXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMgPSBbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddXG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jdCkge1xuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtmdW5jdF0gPSBmdW5jdGlvbiAoLi4uYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZykpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHZhciBvbGQsIHJlc1xuICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgcmVzID0gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZylcbiAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIHJldHVybiByZXNcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbGxlY3Rpb24ucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCgpXG4gIH1cbn0pXG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiAwKSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W1N5bWJvbC5pdGVyYXRvcl0oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIEludmFsaWRhdG9yOiByZXF1aXJlKCcuL3NyYy9JbnZhbGlkYXRvcicpLFxuICBQcm9wZXJ0aWVzTWFuYWdlcjogcmVxdWlyZSgnLi9zcmMvUHJvcGVydGllc01hbmFnZXInKSxcbiAgUHJvcGVydHk6IHJlcXVpcmUoJy4vc3JjL1Byb3BlcnR5JyksXG4gIGdldHRlcnM6IHtcbiAgICBCYXNlR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0Jhc2VHZXR0ZXInKSxcbiAgICBDYWxjdWxhdGVkR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL0NhbGN1bGF0ZWRHZXR0ZXInKSxcbiAgICBDb21wb3NpdGVHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvQ29tcG9zaXRlR2V0dGVyJyksXG4gICAgSW52YWxpZGF0ZWRHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvSW52YWxpZGF0ZWRHZXR0ZXInKSxcbiAgICBNYW51YWxHZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL2dldHRlcnMvTWFudWFsR2V0dGVyJyksXG4gICAgU2ltcGxlR2V0dGVyOiByZXF1aXJlKCcuL3NyYy9nZXR0ZXJzL1NpbXBsZUdldHRlcicpXG4gIH0sXG4gIHNldHRlcnM6IHtcbiAgICBCYXNlU2V0dGVyOiByZXF1aXJlKCcuL3NyYy9zZXR0ZXJzL0Jhc2VTZXR0ZXInKSxcbiAgICBCYXNlVmFsdWVTZXR0ZXI6IHJlcXVpcmUoJy4vc3JjL3NldHRlcnMvQmFzZVZhbHVlU2V0dGVyJyksXG4gICAgQ29sbGVjdGlvblNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9Db2xsZWN0aW9uU2V0dGVyJyksXG4gICAgTWFudWFsU2V0dGVyOiByZXF1aXJlKCcuL3NyYy9zZXR0ZXJzL01hbnVhbFNldHRlcicpLFxuICAgIFNpbXBsZVNldHRlcjogcmVxdWlyZSgnLi9zcmMvc2V0dGVycy9TaW1wbGVTZXR0ZXInKVxuICB9LFxuICB3YXRjaGVyczoge1xuICAgIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXI6IHJlcXVpcmUoJy4vc3JjL3dhdGNoZXJzL0NvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXInKSxcbiAgICBQcm9wZXJ0eVdhdGNoZXI6IHJlcXVpcmUoJy4vc3JjL3dhdGNoZXJzL1Byb3BlcnR5V2F0Y2hlcicpXG4gIH1cbn1cbiIsIi8qKlxuICogQHRlbXBsYXRlIFRcbiAqL1xuY2xhc3MgQ29sbGVjdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPnxUfSBbYXJyXVxuICAgKi9cbiAgY29uc3RydWN0b3IgKGFycikge1xuICAgIGlmIChhcnIgIT0gbnVsbCkge1xuICAgICAgaWYgKHR5cGVvZiBhcnIudG9BcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9hcnJheSA9IGFyci50b0FycmF5KClcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9hcnJheSA9IFthcnJdXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2FycmF5ID0gW11cbiAgICB9XG4gIH1cblxuICBjaGFuZ2VkICgpIHt9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBvbGRcbiAgICogQHBhcmFtIHtib29sZWFufSBvcmRlcmVkXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oVCxUKTogYm9vbGVhbn0gY29tcGFyZUZ1bmN0aW9uXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBjaGVja0NoYW5nZXMgKG9sZCwgb3JkZXJlZCA9IHRydWUsIGNvbXBhcmVGdW5jdGlvbiA9IG51bGwpIHtcbiAgICBpZiAoY29tcGFyZUZ1bmN0aW9uID09IG51bGwpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgIHJldHVybiBhID09PSBiXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChvbGQgIT0gbnVsbCkge1xuICAgICAgb2xkID0gdGhpcy5jb3B5KG9sZC5zbGljZSgpKVxuICAgIH0gZWxzZSB7XG4gICAgICBvbGQgPSBbXVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5jb3VudCgpICE9PSBvbGQubGVuZ3RoIHx8IChvcmRlcmVkID8gdGhpcy5zb21lKGZ1bmN0aW9uICh2YWwsIGkpIHtcbiAgICAgIHJldHVybiAhY29tcGFyZUZ1bmN0aW9uKG9sZC5nZXQoaSksIHZhbClcbiAgICB9KSA6IHRoaXMuc29tZShmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuICFvbGQucGx1Y2soZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgcmV0dXJuIGNvbXBhcmVGdW5jdGlvbihhLCBiKVxuICAgICAgfSlcbiAgICB9KSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge251bWJlcn0gaVxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgZ2V0IChpKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2ldXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIGdldFJhbmRvbSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FycmF5Lmxlbmd0aCldXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtudW1iZXJ9IGlcbiAgICogQHBhcmFtIHtUfSB2YWxcbiAgICogQHJldHVybiB7VH1cbiAgICovXG4gIHNldCAoaSwgdmFsKSB7XG4gICAgdmFyIG9sZFxuICAgIGlmICh0aGlzLl9hcnJheVtpXSAhPT0gdmFsKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXlbaV0gPSB2YWxcbiAgICAgIHRoaXMuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1R9IHZhbFxuICAgKi9cbiAgYWRkICh2YWwpIHtcbiAgICBpZiAoIXRoaXMuX2FycmF5LmluY2x1ZGVzKHZhbCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnB1c2godmFsKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7VH0gdmFsXG4gICAqL1xuICByZW1vdmUgKHZhbCkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5pbmRleE9mKHZhbClcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICBvbGQgPSB0aGlzLnRvQXJyYXkoKVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9uKFQpOiBib29sZWFufSBmblxuICAgKiBAcmV0dXJuIHtUfVxuICAgKi9cbiAgcGx1Y2sgKGZuKSB7XG4gICAgdmFyIGZvdW5kLCBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLl9hcnJheS5maW5kSW5kZXgoZm4pXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICBmb3VuZCA9IHRoaXMuX2FycmF5W2luZGV4XVxuICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKGluZGV4LCAxKVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICAgIHJldHVybiBmb3VuZFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0FycmF5LjxDb2xsZWN0aW9uLjxUPj58QXJyYXkuPEFycmF5LjxUPj58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48VD59XG4gICAqL1xuICBjb25jYXQgKC4uLmFycikge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXkuY29uY2F0KC4uLmFyci5tYXAoKGEpID0+IGEudG9BcnJheSA9PSBudWxsID8gYSA6IGEudG9BcnJheSgpKSkpXG4gIH1cblxuICAvKipcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgdG9BcnJheSAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LnNsaWNlKClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9XG4gICAqL1xuICBjb3VudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5Lmxlbmd0aFxuICB9XG5cbiAgLyoqXG4gICAqIEB0ZW1wbGF0ZSBJdGVtVHlwZVxuICAgKiBAcGFyYW0ge09iamVjdH0gdG9BcHBlbmRcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxJdGVtVHlwZT58QXJyYXkuPEl0ZW1UeXBlPnxJdGVtVHlwZX0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48SXRlbVR5cGU+fVxuICAgKi9cbiAgc3RhdGljIG5ld1N1YkNsYXNzICh0b0FwcGVuZCwgYXJyKSB7XG4gICAgdmFyIFN1YkNsYXNzXG4gICAgaWYgKHR5cGVvZiB0b0FwcGVuZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIFN1YkNsYXNzID0gY2xhc3MgZXh0ZW5kcyB0aGlzIHt9XG4gICAgICBPYmplY3QuYXNzaWduKFN1YkNsYXNzLnByb3RvdHlwZSwgdG9BcHBlbmQpXG4gICAgICByZXR1cm4gbmV3IFN1YkNsYXNzKGFycilcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyB0aGlzKGFycilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtDb2xsZWN0aW9uLjxUPnxBcnJheS48VD58VH0gW2Fycl1cbiAgICogQHJldHVybiB7Q29sbGVjdGlvbi48VD59XG4gICAqL1xuICBjb3B5IChhcnIpIHtcbiAgICB2YXIgY29sbFxuICAgIGlmIChhcnIgPT0gbnVsbCkge1xuICAgICAgYXJyID0gdGhpcy50b0FycmF5KClcbiAgICB9XG4gICAgY29sbCA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKGFycilcbiAgICByZXR1cm4gY29sbFxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gYXJyXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuICBlcXVhbHMgKGFycikge1xuICAgIHJldHVybiAodGhpcy5jb3VudCgpID09PSAodHlwZW9mIGFyci5jb3VudCA9PT0gJ2Z1bmN0aW9uJyA/IGFyci5jb3VudCgpIDogYXJyLmxlbmd0aCkpICYmIHRoaXMuZXZlcnkoZnVuY3Rpb24gKHZhbCwgaSkge1xuICAgICAgcmV0dXJuIGFycltpXSA9PT0gdmFsXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge0NvbGxlY3Rpb24uPFQ+fEFycmF5LjxUPn0gYXJyXG4gICAqIEByZXR1cm4ge0FycmF5LjxUPn1cbiAgICovXG4gIGdldEFkZGVkRnJvbSAoYXJyKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5LmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgcmV0dXJuICFhcnIuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Q29sbGVjdGlvbi48VD58QXJyYXkuPFQ+fSBhcnJcbiAgICogQHJldHVybiB7QXJyYXkuPFQ+fVxuICAgKi9cbiAgZ2V0UmVtb3ZlZEZyb20gKGFycikge1xuICAgIHJldHVybiBhcnIuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICByZXR1cm4gIXRoaXMuaW5jbHVkZXMoaXRlbSlcbiAgICB9KVxuICB9XG59O1xuXG5Db2xsZWN0aW9uLnJlYWRGdW5jdGlvbnMgPSBbJ2V2ZXJ5JywgJ2ZpbmQnLCAnZmluZEluZGV4JywgJ2ZvckVhY2gnLCAnaW5jbHVkZXMnLCAnaW5kZXhPZicsICdqb2luJywgJ2xhc3RJbmRleE9mJywgJ21hcCcsICdyZWR1Y2UnLCAncmVkdWNlUmlnaHQnLCAnc29tZScsICd0b1N0cmluZyddXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMgPSBbJ2ZpbHRlcicsICdzbGljZSddXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMgPSBbJ3BvcCcsICdwdXNoJywgJ3JldmVyc2UnLCAnc2hpZnQnLCAnc29ydCcsICdzcGxpY2UnLCAndW5zaGlmdCddXG5cbkNvbGxlY3Rpb24ucmVhZEZ1bmN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jdCkge1xuICBDb2xsZWN0aW9uLnByb3RvdHlwZVtmdW5jdF0gPSBmdW5jdGlvbiAoLi4uYXJnKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W2Z1bmN0XSguLi5hcmcpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ucmVhZExpc3RGdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHJldHVybiB0aGlzLmNvcHkodGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZykpXG4gIH1cbn0pXG5cbkNvbGxlY3Rpb24ud3JpdGVmdW5jdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAoZnVuY3QpIHtcbiAgQ29sbGVjdGlvbi5wcm90b3R5cGVbZnVuY3RdID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgIHZhciBvbGQsIHJlc1xuICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgcmVzID0gdGhpcy5fYXJyYXlbZnVuY3RdKC4uLmFyZylcbiAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIHJldHVybiByZXNcbiAgfVxufSlcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbGxlY3Rpb24ucHJvdG90eXBlLCAnbGVuZ3RoJywge1xuICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCgpXG4gIH1cbn0pXG5cbmlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wgIT09IG51bGwgPyBTeW1ib2wuaXRlcmF0b3IgOiAwKSB7XG4gIENvbGxlY3Rpb24ucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FycmF5W1N5bWJvbC5pdGVyYXRvcl0oKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29sbGVjdGlvblxuIiwiY29uc3QgQmluZGVyID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkJpbmRlclxuY29uc3QgRXZlbnRCaW5kID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkV2ZW50QmluZFxuXG5jb25zdCBwbHVjayA9IGZ1bmN0aW9uIChhcnIsIGZuKSB7XG4gIHZhciBmb3VuZCwgaW5kZXhcbiAgaW5kZXggPSBhcnIuZmluZEluZGV4KGZuKVxuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIGZvdW5kID0gYXJyW2luZGV4XVxuICAgIGFyci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgcmV0dXJuIGZvdW5kXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxufVxuXG5jbGFzcyBJbnZhbGlkYXRvciBleHRlbmRzIEJpbmRlciB7XG4gIGNvbnN0cnVjdG9yIChpbnZhbGlkYXRlZCwgc2NvcGUgPSBudWxsKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBpbnZhbGlkYXRlZFxuICAgIHRoaXMuc2NvcGUgPSBzY29wZVxuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzID0gW11cbiAgICB0aGlzLnJlY3ljbGVkID0gW11cbiAgICB0aGlzLnVua25vd25zID0gW11cbiAgICB0aGlzLnN0cmljdCA9IHRoaXMuY29uc3RydWN0b3Iuc3RyaWN0XG4gICAgdGhpcy5pbnZhbGlkID0gZmFsc2VcbiAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9ICgpID0+IHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZSgpXG4gICAgfVxuICAgIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrLm93bmVyID0gdGhpc1xuICAgIHRoaXMuY2hhbmdlZENhbGxiYWNrID0gKG9sZCwgY29udGV4dCkgPT4ge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgfVxuICAgIHRoaXMuY2hhbmdlZENhbGxiYWNrLm93bmVyID0gdGhpc1xuICB9XG5cbiAgaW52YWxpZGF0ZSAoY29udGV4dCkge1xuICAgIHZhciBmdW5jdE5hbWVcbiAgICB0aGlzLmludmFsaWQgPSB0cnVlXG4gICAgaWYgKHR5cGVvZiB0aGlzLmludmFsaWRhdGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVkKGNvbnRleHQpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5jYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsYmFjayhjb250ZXh0KVxuICAgIH0gZWxzZSBpZiAoKHRoaXMuaW52YWxpZGF0ZWQgIT0gbnVsbCkgJiYgdHlwZW9mIHRoaXMuaW52YWxpZGF0ZWQuaW52YWxpZGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5pbnZhbGlkYXRlZC5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGZ1bmN0TmFtZSA9ICdpbnZhbGlkYXRlJyArIHRoaXMuaW52YWxpZGF0ZWQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyB0aGlzLmludmFsaWRhdGVkLnNsaWNlKDEpXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc2NvcGVbZnVuY3ROYW1lXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLnNjb3BlW2Z1bmN0TmFtZV0oY29udGV4dClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2NvcGVbdGhpcy5pbnZhbGlkYXRlZF0gPSBudWxsXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmtub3duIChjb250ZXh0KSB7XG4gICAgaWYgKHRoaXMuaW52YWxpZGF0ZWQgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5pbnZhbGlkYXRlZC51bmtub3duID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlZC51bmtub3duKGNvbnRleHQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoY29udGV4dClcbiAgICB9XG4gIH1cblxuICBhZGRFdmVudEJpbmQgKGV2ZW50LCB0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkQmluZGVyKG5ldyBFdmVudEJpbmQoZXZlbnQsIHRhcmdldCwgY2FsbGJhY2spKVxuICB9XG5cbiAgYWRkQmluZGVyIChiaW5kZXIpIHtcbiAgICBpZiAoYmluZGVyLmNhbGxiYWNrID09IG51bGwpIHtcbiAgICAgIGJpbmRlci5jYWxsYmFjayA9IHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrXG4gICAgfVxuICAgIGlmICghdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuc29tZShmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICByZXR1cm4gZXZlbnRCaW5kLmVxdWFscyhiaW5kZXIpXG4gICAgfSkpIHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKHBsdWNrKHRoaXMucmVjeWNsZWQsIGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgICAgcmV0dXJuIGV2ZW50QmluZC5lcXVhbHMoYmluZGVyKVxuICAgICAgfSkgfHwgYmluZGVyKVxuICAgIH1cbiAgfVxuXG4gIGdldFVua25vd25DYWxsYmFjayAocHJvcCkge1xuICAgIHZhciBjYWxsYmFja1xuICAgIGNhbGxiYWNrID0gKGNvbnRleHQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgICAgfSwgcHJvcCwgY29udGV4dClcbiAgICB9XG4gICAgY2FsbGJhY2sucHJvcCA9IHByb3BcbiAgICBjYWxsYmFjay5vd25lciA9IHRoaXNcbiAgICByZXR1cm4gY2FsbGJhY2tcbiAgfVxuXG4gIGFkZFVua25vd24gKGZuLCBwcm9wLCBjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLmZpbmRVbmtub3duKHByb3ApKSB7XG4gICAgICBmbi5wcm9wID0gcHJvcFxuICAgICAgZm4ub3duZXIgPSB0aGlzXG4gICAgICB0aGlzLnVua25vd25zLnB1c2goZm4pXG4gICAgICByZXR1cm4gdGhpcy51bmtub3duKGNvbnRleHQpXG4gICAgfVxuICB9XG5cbiAgZmluZFVua25vd24gKHByb3ApIHtcbiAgICBpZiAocHJvcCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy51bmtub3ducy5maW5kKGZ1bmN0aW9uICh1bmtub3duKSB7XG4gICAgICAgIHJldHVybiB1bmtub3duLnByb3AgPT09IHByb3BcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZXZlbnQgKGV2ZW50LCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgaWYgKHRoaXMuY2hlY2tFbWl0dGVyKHRhcmdldCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmFkZEV2ZW50QmluZChldmVudCwgdGFyZ2V0KVxuICAgIH1cbiAgfVxuXG4gIHZhbHVlICh2YWwsIGV2ZW50LCB0YXJnZXQgPSB0aGlzLnNjb3BlKSB7XG4gICAgdGhpcy5ldmVudChldmVudCwgdGFyZ2V0KVxuICAgIHJldHVybiB2YWxcbiAgfVxuXG4gIC8qKlxuICAgKiBAdGVtcGxhdGUgVFxuICAgKiBAcGFyYW0ge1Byb3BlcnR5PFQ+fSBwcm9wXG4gICAqIEByZXR1cm4ge1R9XG4gICAqL1xuICBwcm9wIChwcm9wKSB7XG4gICAgaWYgKHByb3AgIT0gbnVsbCkge1xuICAgICAgdGhpcy5hZGRFdmVudEJpbmQoJ2ludmFsaWRhdGVkJywgcHJvcC5ldmVudHMsIHRoaXMuZ2V0VW5rbm93bkNhbGxiYWNrKHByb3ApKVxuICAgICAgdGhpcy5hZGRFdmVudEJpbmQoJ3VwZGF0ZWQnLCBwcm9wLmV2ZW50cywgdGhpcy5jaGFuZ2VkQ2FsbGJhY2spXG4gICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgIH1cbiAgfVxuXG4gIHByb3BCeU5hbWUgKHByb3AsIHRhcmdldCA9IHRoaXMuc2NvcGUpIHtcbiAgICBpZiAodGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHByb3BlcnR5ID0gdGFyZ2V0LnByb3BlcnRpZXNNYW5hZ2VyLmdldFByb3BlcnR5KHByb3ApXG4gICAgICBpZiAocHJvcGVydHkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcChwcm9wZXJ0eSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRhcmdldFtwcm9wICsgJ1Byb3BlcnR5J10gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcCh0YXJnZXRbcHJvcCArICdQcm9wZXJ0eSddKVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0W3Byb3BdXG4gIH1cblxuICBwcm9wUGF0aCAocGF0aCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgIHZhciBwcm9wLCB2YWxcbiAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpXG4gICAgdmFsID0gdGFyZ2V0XG4gICAgd2hpbGUgKCh2YWwgIT0gbnVsbCkgJiYgcGF0aC5sZW5ndGggPiAwKSB7XG4gICAgICBwcm9wID0gcGF0aC5zaGlmdCgpXG4gICAgICB2YWwgPSB0aGlzLnByb3BCeU5hbWUocHJvcCwgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBmdW5jdCAoZnVuY3QpIHtcbiAgICB2YXIgaW52YWxpZGF0b3IsIHJlc1xuICAgIGludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKCgpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmFkZFVua25vd24oKCkgPT4ge1xuICAgICAgICB2YXIgcmVzMlxuICAgICAgICByZXMyID0gZnVuY3QoaW52YWxpZGF0b3IpXG4gICAgICAgIGlmIChyZXMgIT09IHJlczIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRlKClcbiAgICAgICAgfVxuICAgICAgfSwgaW52YWxpZGF0b3IpXG4gICAgfSlcbiAgICByZXMgPSBmdW5jdChpbnZhbGlkYXRvcilcbiAgICB0aGlzLmludmFsaWRhdGlvbkV2ZW50cy5wdXNoKGludmFsaWRhdG9yKVxuICAgIHJldHVybiByZXNcbiAgfVxuXG4gIHZhbGlkYXRlVW5rbm93bnMgKCkge1xuICAgIHRoaXMudW5rbm93bnMuc2xpY2UoKS5mb3JFYWNoKGZ1bmN0aW9uICh1bmtub3duKSB7XG4gICAgICB1bmtub3duKClcbiAgICB9KVxuICAgIHRoaXMudW5rbm93bnMgPSBbXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpc0VtcHR5ICgpIHtcbiAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRpb25FdmVudHMubGVuZ3RoID09PSAwXG4gIH1cblxuICBiaW5kICgpIHtcbiAgICB0aGlzLmludmFsaWQgPSBmYWxzZVxuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50QmluZCkge1xuICAgICAgZXZlbnRCaW5kLmJpbmQoKVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHJlY3ljbGUgKGZuKSB7XG4gICAgdmFyIGRvbmUsIHJlc1xuICAgIHRoaXMucmVjeWNsZWQgPSB0aGlzLmludmFsaWRhdGlvbkV2ZW50c1xuICAgIHRoaXMuaW52YWxpZGF0aW9uRXZlbnRzID0gW11cbiAgICBkb25lID0gdGhpcy5lbmRSZWN5Y2xlLmJpbmQodGhpcylcbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZm4ubGVuZ3RoID4gMSkge1xuICAgICAgICByZXR1cm4gZm4odGhpcywgZG9uZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlcyA9IGZuKHRoaXMpXG4gICAgICAgIGRvbmUoKVxuICAgICAgICByZXR1cm4gcmVzXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBkb25lXG4gICAgfVxuICB9XG5cbiAgZW5kUmVjeWNsZSAoKSB7XG4gICAgdGhpcy5yZWN5Y2xlZC5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEJpbmQpIHtcbiAgICAgIHJldHVybiBldmVudEJpbmQudW5iaW5kKClcbiAgICB9KVxuICAgIHRoaXMucmVjeWNsZWQgPSBbXVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjaGVja0VtaXR0ZXIgKGVtaXR0ZXIpIHtcbiAgICByZXR1cm4gRXZlbnRCaW5kLmNoZWNrRW1pdHRlcihlbWl0dGVyLCB0aGlzLnN0cmljdClcbiAgfVxuXG4gIGNoZWNrUHJvcEluc3RhbmNlIChwcm9wKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBwcm9wLmdldCA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLmNoZWNrRW1pdHRlcihwcm9wLmV2ZW50cylcbiAgfVxuXG4gIHVuYmluZCAoKSB7XG4gICAgdGhpcy5pbnZhbGlkYXRpb25FdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRCaW5kKSB7XG4gICAgICBldmVudEJpbmQudW5iaW5kKClcbiAgICB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn07XG5cbkludmFsaWRhdG9yLnN0cmljdCA9IHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBJbnZhbGlkYXRvclxuIiwiY29uc3QgUHJvcGVydHkgPSByZXF1aXJlKCcuL1Byb3BlcnR5JylcblxuY2xhc3MgUHJvcGVydGllc01hbmFnZXIge1xuICBjb25zdHJ1Y3RvciAocHJvcGVydGllcyA9IHt9LCBvcHRpb25zID0ge30pIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7QXJyYXkuPFByb3BlcnR5Pn1cbiAgICAgKi9cbiAgICB0aGlzLnByb3BlcnRpZXMgPSBbXVxuICAgIHRoaXMuZ2xvYmFsT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oeyBpbml0V2F0Y2hlcnM6IGZhbHNlIH0sIG9wdGlvbnMpXG4gICAgdGhpcy5wcm9wZXJ0aWVzT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIHByb3BlcnRpZXMpXG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHsqfSBwcm9wZXJ0aWVzXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAcmV0dXJuIHtQcm9wZXJ0aWVzTWFuYWdlcn1cbiAgICovXG4gIGNvcHlXaXRoIChwcm9wZXJ0aWVzID0ge30sIG9wdGlvbnMgPSB7fSkge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLm1lcmdlUHJvcGVydGllc09wdGlvbnModGhpcy5wcm9wZXJ0aWVzT3B0aW9ucywgcHJvcGVydGllcyksIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZ2xvYmFsT3B0aW9ucywgb3B0aW9ucykpXG4gIH1cblxuICB3aXRoUHJvcGVydHkgKHByb3AsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBwcm9wZXJ0aWVzID0ge31cbiAgICBwcm9wZXJ0aWVzW3Byb3BdID0gb3B0aW9uc1xuICAgIHJldHVybiB0aGlzLmNvcHlXaXRoKHByb3BlcnRpZXMpXG4gIH1cblxuICB1c2VTY29wZSAoc2NvcGUpIHtcbiAgICByZXR1cm4gdGhpcy5jb3B5V2l0aCh7fSwgeyBzY29wZTogc2NvcGUgfSlcbiAgfVxuXG4gIG1lcmdlUHJvcGVydGllc09wdGlvbnMgKC4uLmFyZykge1xuICAgIHJldHVybiBhcmcucmVkdWNlKChyZXMsIG9wdCkgPT4ge1xuICAgICAgT2JqZWN0LmtleXMob3B0KS5mb3JFYWNoKChuYW1lKSA9PiB7XG4gICAgICAgIHJlc1tuYW1lXSA9IHRoaXMubWVyZ2VQcm9wZXJ0eU9wdGlvbnMocmVzW25hbWVdIHx8IHt9LCBvcHRbbmFtZV0pXG4gICAgICB9KVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sIHt9KVxuICB9XG5cbiAgbWVyZ2VQcm9wZXJ0eU9wdGlvbnMgKC4uLmFyZykge1xuICAgIGNvbnN0IG5vdE1lcmdhYmxlID0gWydkZWZhdWx0JywgJ3Njb3BlJ11cbiAgICByZXR1cm4gYXJnLnJlZHVjZSgocmVzLCBvcHQpID0+IHtcbiAgICAgIE9iamVjdC5rZXlzKG9wdCkuZm9yRWFjaCgobmFtZSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb3B0W25hbWVdID09PSAnZnVuY3Rpb24nICYmICFub3RNZXJnYWJsZS5pbmNsdWRlcyhuYW1lKSkge1xuICAgICAgICAgIHJlc1tuYW1lXSA9IHRoaXMubWVyZ2VDYWxsYmFjayhyZXNbbmFtZV0sIG9wdFtuYW1lXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNbbmFtZV0gPSBvcHRbbmFtZV1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIHJldHVybiByZXNcbiAgICB9LCB7fSlcbiAgfVxuXG4gIG1lcmdlQ2FsbGJhY2sgKG9sZEZ1bmN0LCBuZXdGdW5jdCkge1xuICAgIGNvbnN0IGZuID0gZnVuY3Rpb24gKC4uLmFyZykge1xuICAgICAgcmV0dXJuIG5ld0Z1bmN0LmNhbGwodGhpcywgLi4uYXJnLCBvbGRGdW5jdC5iaW5kKHRoaXMpKVxuICAgIH1cbiAgICBmbi5jb21wb25lbnRzID0gKG9sZEZ1bmN0LmNvbXBvbmVudHMgfHwgW29sZEZ1bmN0XSkuY29uY2F0KChvbGRGdW5jdC5uZXdGdW5jdCB8fCBbbmV3RnVuY3RdKSlcbiAgICBmbi5uYlBhcmFtcyA9IG5ld0Z1bmN0Lm5iUGFyYW1zIHx8IG5ld0Z1bmN0Lmxlbmd0aFxuICAgIHJldHVybiBmblxuICB9XG5cbiAgaW5pdFByb3BlcnRpZXMgKCkge1xuICAgIHRoaXMuYWRkUHJvcGVydGllcyh0aGlzLnByb3BlcnRpZXNPcHRpb25zKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBjcmVhdGVTY29wZUdldHRlclNldHRlcnMgKCkge1xuICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiBwcm9wLmNyZWF0ZVNjb3BlR2V0dGVyU2V0dGVycygpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbml0V2F0Y2hlcnMgKCkge1xuICAgIHRoaXMucHJvcGVydGllcy5mb3JFYWNoKChwcm9wKSA9PiBwcm9wLmluaXRXYXRjaGVycygpKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbml0U2NvcGUgKCkge1xuICAgIHRoaXMuaW5pdFByb3BlcnRpZXMoKVxuICAgIHRoaXMuY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzKClcbiAgICB0aGlzLmluaXRXYXRjaGVycygpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBAdGVtcGxhdGUgVFxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvcGVydHk8VD59XG4gICAqL1xuICBhZGRQcm9wZXJ0eSAobmFtZSwgb3B0aW9ucykge1xuICAgIGNvbnN0IHByb3AgPSBuZXcgUHJvcGVydHkoT2JqZWN0LmFzc2lnbih7IG5hbWU6IG5hbWUgfSwgdGhpcy5nbG9iYWxPcHRpb25zLCBvcHRpb25zKSlcbiAgICB0aGlzLnByb3BlcnRpZXMucHVzaChwcm9wKVxuICAgIHJldHVybiBwcm9wXG4gIH1cblxuICBhZGRQcm9wZXJ0aWVzIChvcHRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMob3B0aW9ucykuZm9yRWFjaCgobmFtZSkgPT4gdGhpcy5hZGRQcm9wZXJ0eShuYW1lLCBvcHRpb25zW25hbWVdKSlcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAqIEByZXR1cm5zIHtQcm9wZXJ0eX1cbiAgICovXG4gIGdldFByb3BlcnR5IChuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5maW5kKChwcm9wKSA9PiBwcm9wLm9wdGlvbnMubmFtZSA9PT0gbmFtZSlcbiAgfVxuXG4gIHNldFByb3BlcnRpZXNEYXRhIChkYXRhLCBvcHRpb25zID0ge30pIHtcbiAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmICgoKG9wdGlvbnMud2hpdGVsaXN0ID09IG51bGwpIHx8IG9wdGlvbnMud2hpdGVsaXN0LmluZGV4T2Yoa2V5KSAhPT0gLTEpICYmICgob3B0aW9ucy5ibGFja2xpc3QgPT0gbnVsbCkgfHwgb3B0aW9ucy5ibGFja2xpc3QuaW5kZXhPZihrZXkpID09PSAtMSkpIHtcbiAgICAgICAgY29uc3QgcHJvcCA9IHRoaXMuZ2V0UHJvcGVydHkoa2V5KVxuICAgICAgICBpZiAocHJvcCkge1xuICAgICAgICAgIHByb3Auc2V0KGRhdGFba2V5XSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGdldE1hbnVhbERhdGFQcm9wZXJ0aWVzICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZSgocmVzLCBwcm9wKSA9PiB7XG4gICAgICBpZiAocHJvcC5nZXR0ZXIuY2FsY3VsYXRlZCAmJiBwcm9wLm1hbnVhbCkge1xuICAgICAgICByZXNbcHJvcC5vcHRpb25zLm5hbWVdID0gcHJvcC5nZXQoKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH0sIHt9KVxuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzLmZvckVhY2goKHByb3ApID0+IHByb3AuZGVzdHJveSgpKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUHJvcGVydGllc01hbmFnZXJcbiIsImNvbnN0IEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoJ2V2ZW50cycpLkV2ZW50RW1pdHRlclxuXG5jb25zdCBTaW1wbGVHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvU2ltcGxlR2V0dGVyJylcbmNvbnN0IENhbGN1bGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvQ2FsY3VsYXRlZEdldHRlcicpXG5jb25zdCBJbnZhbGlkYXRlZEdldHRlciA9IHJlcXVpcmUoJy4vZ2V0dGVycy9JbnZhbGlkYXRlZEdldHRlcicpXG5jb25zdCBNYW51YWxHZXR0ZXIgPSByZXF1aXJlKCcuL2dldHRlcnMvTWFudWFsR2V0dGVyJylcbmNvbnN0IENvbXBvc2l0ZUdldHRlciA9IHJlcXVpcmUoJy4vZ2V0dGVycy9Db21wb3NpdGVHZXR0ZXInKVxuXG5jb25zdCBNYW51YWxTZXR0ZXIgPSByZXF1aXJlKCcuL3NldHRlcnMvTWFudWFsU2V0dGVyJylcbmNvbnN0IFNpbXBsZVNldHRlciA9IHJlcXVpcmUoJy4vc2V0dGVycy9TaW1wbGVTZXR0ZXInKVxuY29uc3QgQmFzZVZhbHVlU2V0dGVyID0gcmVxdWlyZSgnLi9zZXR0ZXJzL0Jhc2VWYWx1ZVNldHRlcicpXG5jb25zdCBDb2xsZWN0aW9uU2V0dGVyID0gcmVxdWlyZSgnLi9zZXR0ZXJzL0NvbGxlY3Rpb25TZXR0ZXInKVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNsYXNzIFByb3BlcnR5IHtcbiAgLyoqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IFByb3BlcnR5T3B0aW9uc1xuICAgKiBAcHJvcGVydHkge1R9IFtkZWZhdWx0XVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKGltcG9ydChcIi4vSW52YWxpZGF0b3JcIikpOiBUfSBbY2FsY3VsXVxuICAgKiBAcHJvcGVydHkge2Z1bmN0aW9uKCk6IFR9IFtnZXRdXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCl9IFtzZXRdXG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCxUKXxpbXBvcnQoXCIuL1Byb3BlcnR5V2F0Y2hlclwiKTxUPn0gW2NoYW5nZV1cbiAgICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ3xmdW5jdGlvbihULFQpOlR9IFtjb21wb3NlZF1cbiAgICogQHByb3BlcnR5IHtib29sZWFufE9iamVjdH0gW2NvbGxlY3Rpb25dXG4gICAqIEBwcm9wZXJ0eSB7Kn0gW3Njb3BlXVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5T3B0aW9uc30gb3B0aW9uc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKG9wdGlvbnMgPSB7fSkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIFByb3BlcnR5LmRlZmF1bHRPcHRpb25zLCBvcHRpb25zKVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICAvKipcbiAgICAgKiBAdHlwZSB7RXZlbnRFbWl0dGVyfVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnRzID0gbmV3IHRoaXMub3B0aW9ucy5FdmVudEVtaXR0ZXJDbGFzcygpXG4gICAgdGhpcy5tYWtlU2V0dGVyKClcbiAgICB0aGlzLm1ha2VHZXR0ZXIoKVxuICAgIHRoaXMuc2V0dGVyLmluaXQoKVxuICAgIHRoaXMuZ2V0dGVyLmluaXQoKVxuICAgIGlmICh0aGlzLm9wdGlvbnMuaW5pdFdhdGNoZXJzKSB7XG4gICAgICB0aGlzLmluaXRXYXRjaGVycygpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICBnZXRRdWFsaWZpZWROYW1lICgpIHtcbiAgICBpZiAodGhpcy5vcHRpb25zLm5hbWUpIHtcbiAgICAgIGxldCBuYW1lID0gdGhpcy5vcHRpb25zLm5hbWVcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2NvcGUgJiYgdGhpcy5vcHRpb25zLnNjb3BlLmNvbnN0cnVjdG9yKSB7XG4gICAgICAgIG5hbWUgPSB0aGlzLm9wdGlvbnMuc2NvcGUuY29uc3RydWN0b3IubmFtZSArICcuJyArIG5hbWVcbiAgICAgIH1cbiAgICAgIHJldHVybiBuYW1lXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgY29uc3QgbmFtZSA9IHRoaXMuZ2V0UXVhbGlmaWVkTmFtZSgpXG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiBgW1Byb3BlcnR5ICR7bmFtZX1dYFxuICAgIH1cbiAgICByZXR1cm4gJ1tQcm9wZXJ0eV0nXG4gIH1cblxuICBpbml0V2F0Y2hlcnMgKCkge1xuICAgIHRoaXMuc2V0dGVyLmxvYWRJbnRlcm5hbFdhdGNoZXIoKVxuICB9XG5cbiAgbWFrZUdldHRlciAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmdldHRlciA9IG5ldyBNYW51YWxHZXR0ZXIodGhpcylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPSBudWxsICYmIHRoaXMub3B0aW9ucy5jb21wb3NlZCAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZ2V0dGVyID0gbmV3IENvbXBvc2l0ZUdldHRlcih0aGlzKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy5jYWxjdWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmICgodGhpcy5vcHRpb25zLmNhbGN1bC5uYlBhcmFtcyB8fCB0aGlzLm9wdGlvbnMuY2FsY3VsLmxlbmd0aCkgPT09IDApIHtcbiAgICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgQ2FsY3VsYXRlZEdldHRlcih0aGlzKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgSW52YWxpZGF0ZWRHZXR0ZXIodGhpcylcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZXR0ZXIgPSBuZXcgU2ltcGxlR2V0dGVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgbWFrZVNldHRlciAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBNYW51YWxTZXR0ZXIodGhpcylcbiAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy5jb2xsZWN0aW9uICE9IG51bGwgJiYgdGhpcy5vcHRpb25zLmNvbGxlY3Rpb24gIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBDb2xsZWN0aW9uU2V0dGVyKHRoaXMpXG4gICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMuY29tcG9zZWQgIT0gbnVsbCAmJiB0aGlzLm9wdGlvbnMuY29tcG9zZWQgIT09IGZhbHNlKSB7XG4gICAgICB0aGlzLnNldHRlciA9IG5ldyBCYXNlVmFsdWVTZXR0ZXIodGhpcylcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXR0ZXIgPSBuZXcgU2ltcGxlU2V0dGVyKHRoaXMpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7Kn0gb3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvcGVydHk8VD59XG4gICAqL1xuICBjb3B5V2l0aCAob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihPYmplY3QuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnMsIG9wdGlvbnMpKVxuICB9XG5cbiAgLyoqXG4gICAqIEByZXR1cm5zIHtUfVxuICAgKi9cbiAgZ2V0ICgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXR0ZXIuZ2V0KClcbiAgfVxuXG4gIGludmFsaWRhdGUgKGNvbnRleHQpIHtcbiAgICB0aGlzLmdldHRlci5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHVua25vd24gKGNvbnRleHQpIHtcbiAgICB0aGlzLmdldHRlci51bmtub3duKGNvbnRleHQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHNldCAodmFsKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0dGVyLnNldCh2YWwpXG4gIH1cblxuICBjcmVhdGVTY29wZUdldHRlclNldHRlcnMgKCkge1xuICAgIGlmICh0aGlzLm9wdGlvbnMuc2NvcGUpIHtcbiAgICAgIGNvbnN0IHByb3AgPSB0aGlzXG4gICAgICBsZXQgb3B0ID0ge31cbiAgICAgIG9wdFt0aGlzLm9wdGlvbnMubmFtZSArICdQcm9wZXJ0eSddID0ge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICByZXR1cm4gcHJvcFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBvcHQgPSB0aGlzLmdldHRlci5nZXRTY29wZUdldHRlclNldHRlcnMob3B0KVxuICAgICAgb3B0ID0gdGhpcy5zZXR0ZXIuZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzKG9wdClcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMub3B0aW9ucy5zY29wZSwgb3B0KVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZGVzdHJveSAoKSB7XG4gICAgaWYgKHRoaXMub3B0aW9ucy5kZXN0cm95ID09PSB0cnVlICYmIHRoaXMudmFsdWUgIT0gbnVsbCAmJiB0aGlzLnZhbHVlLmRlc3Ryb3kgIT0gbnVsbCkge1xuICAgICAgdGhpcy52YWx1ZS5kZXN0cm95KClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy5jYWxsT3B0aW9uRnVuY3QoJ2Rlc3Ryb3knLCB0aGlzLnZhbHVlKVxuICAgIH1cbiAgICB0aGlzLmdldHRlci5kZXN0cm95KClcbiAgICB0aGlzLnZhbHVlID0gbnVsbFxuICB9XG5cbiAgY2FsbE9wdGlvbkZ1bmN0IChmdW5jdCwgLi4uYXJncykge1xuICAgIGlmICh0eXBlb2YgZnVuY3QgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmdW5jdCA9IHRoaXMub3B0aW9uc1tmdW5jdF1cbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0LmFwcGx5KHRoaXMub3B0aW9ucy5zY29wZSB8fCB0aGlzLCBhcmdzKVxuICB9XG59XG5cblByb3BlcnR5LmRlZmF1bHRPcHRpb25zID0ge1xuICBFdmVudEVtaXR0ZXJDbGFzczogRXZlbnRFbWl0dGVyLFxuICBpbml0V2F0Y2hlcnM6IHRydWVcbn1cbm1vZHVsZS5leHBvcnRzID0gUHJvcGVydHlcbiIsIlxuY2xhc3MgQmFzZUdldHRlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wKSB7XG4gICAgdGhpcy5wcm9wID0gcHJvcFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgICB0aGlzLmluaXRpYXRlZCA9IGZhbHNlXG4gICAgdGhpcy5pbnZhbGlkYXRlZCA9IGZhbHNlXG4gIH1cblxuICBnZXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJylcbiAgfVxuXG4gIG91dHB1dCAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3Aub3B0aW9ucy5vdXRwdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdvdXRwdXQnLCB0aGlzLnByb3AudmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgICB9XG4gIH1cblxuICByZXZhbGlkYXRlZCAoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gdHJ1ZVxuICAgIHRoaXMuaW5pdGlhdGVkID0gdHJ1ZVxuICAgIHRoaXMuaW52YWxpZGF0ZWQgPSBmYWxzZVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB1bmtub3duIChjb250ZXh0KSB7XG4gICAgaWYgKCF0aGlzLmludmFsaWRhdGVkKSB7XG4gICAgICB0aGlzLmludmFsaWRhdGVkID0gdHJ1ZVxuICAgICAgdGhpcy5pbnZhbGlkYXRlTm90aWNlKGNvbnRleHQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBpbnZhbGlkYXRlIChjb250ZXh0KSB7XG4gICAgdGhpcy5jYWxjdWxhdGVkID0gZmFsc2VcbiAgICBpZiAoIXRoaXMuaW52YWxpZGF0ZWQpIHtcbiAgICAgIHRoaXMuaW52YWxpZGF0ZWQgPSB0cnVlXG4gICAgICB0aGlzLmludmFsaWRhdGVOb3RpY2UoY29udGV4dClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGludmFsaWRhdGVOb3RpY2UgKGNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gY29udGV4dCB8fCB7IG9yaWdpbjogdGhpcy5wcm9wIH1cbiAgICB0aGlzLnByb3AuZXZlbnRzLmVtaXQoJ2ludmFsaWRhdGVkJywgY29udGV4dClcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5RGVzY3JpcHRvck1hcH0gb3B0XG4gICAqIEByZXR1cm4ge1Byb3BlcnR5RGVzY3JpcHRvck1hcH1cbiAgICovXG4gIGdldFNjb3BlR2V0dGVyU2V0dGVycyAob3B0KSB7XG4gICAgY29uc3QgcHJvcCA9IHRoaXMucHJvcFxuICAgIG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXSA9IG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXSB8fCB7fVxuICAgIG9wdFt0aGlzLnByb3Aub3B0aW9ucy5uYW1lXS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcHJvcC5nZXQoKVxuICAgIH1cbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uZW51bWVyYWJsZSA9IHRydWVcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZV0uY29uZmlndXJhYmxlID0gdHJ1ZVxuICAgIHJldHVybiBvcHRcbiAgfVxuXG4gIGRlc3Ryb3kgKCkge1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZUdldHRlclxuIiwiXG5jb25zdCBCYXNlR2V0dGVyID0gcmVxdWlyZSgnLi9CYXNlR2V0dGVyJylcblxuY2xhc3MgQ2FsY3VsYXRlZEdldHRlciBleHRlbmRzIEJhc2VHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIGlmICghdGhpcy5jYWxjdWxhdGVkKSB7XG4gICAgICBjb25zdCBvbGQgPSB0aGlzLnByb3AudmFsdWVcbiAgICAgIGNvbnN0IGluaXRpYXRlZCA9IHRoaXMuaW5pdGlhdGVkXG4gICAgICB0aGlzLmNhbGN1bCgpXG4gICAgICBpZiAoIWluaXRpYXRlZCkge1xuICAgICAgICB0aGlzLnByb3AuZXZlbnRzLmVtaXQoJ3VwZGF0ZWQnLCBvbGQpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcC5zZXR0ZXIuY2hlY2tDaGFuZ2VzKHRoaXMucHJvcC52YWx1ZSwgb2xkKSkge1xuICAgICAgICB0aGlzLnByb3Auc2V0dGVyLmNoYW5nZWQob2xkKVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmludmFsaWRhdGVkID0gZmFsc2VcbiAgICByZXR1cm4gdGhpcy5vdXRwdXQoKVxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICB0aGlzLnByb3Auc2V0dGVyLnNldFJhd1ZhbHVlKHRoaXMucHJvcC5jYWxsT3B0aW9uRnVuY3QoJ2NhbGN1bCcpKVxuICAgIHRoaXMucHJvcC5tYW51YWwgPSBmYWxzZVxuICAgIHRoaXMucmV2YWxpZGF0ZWQoKVxuICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENhbGN1bGF0ZWRHZXR0ZXJcbiIsImNvbnN0IEludmFsaWRhdGVkR2V0dGVyID0gcmVxdWlyZSgnLi9JbnZhbGlkYXRlZEdldHRlcicpXG5jb25zdCBDb2xsZWN0aW9uID0gcmVxdWlyZSgnc3BhcmstY29sbGVjdGlvbicpXG5jb25zdCBJbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJylcbmNvbnN0IFJlZmVyZW5jZSA9IHJlcXVpcmUoJ3NwYXJrLWJpbmRpbmcnKS5SZWZlcmVuY2VcblxuY2xhc3MgQ29tcG9zaXRlR2V0dGVyIGV4dGVuZHMgSW52YWxpZGF0ZWRHZXR0ZXIge1xuICBpbml0ICgpIHtcbiAgICBzdXBlci5pbml0KClcbiAgICBpZiAodGhpcy5wcm9wLm9wdGlvbnMuZGVmYXVsdCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmJhc2VWYWx1ZSA9IHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHRcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZShudWxsKVxuICAgICAgdGhpcy5iYXNlVmFsdWUgPSBudWxsXG4gICAgfVxuICAgIHRoaXMubWVtYmVycyA9IG5ldyBDb21wb3NpdGVHZXR0ZXIuTWVtYmVycyh0aGlzLnByb3Aub3B0aW9ucy5tZW1iZXJzKVxuICAgIGlmICh0aGlzLnByb3Aub3B0aW9ucy5jYWxjdWwgIT0gbnVsbCkge1xuICAgICAgdGhpcy5tZW1iZXJzLnVuc2hpZnQoKHByZXYsIGludmFsaWRhdG9yKSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3Aub3B0aW9ucy5jYWxjdWwuYmluZCh0aGlzLnByb3Aub3B0aW9ucy5zY29wZSkoaW52YWxpZGF0b3IpXG4gICAgICB9KVxuICAgIH1cbiAgICB0aGlzLm1lbWJlcnMuY2hhbmdlZCA9IChvbGQpID0+IHtcbiAgICAgIHJldHVybiB0aGlzLmludmFsaWRhdGUoKVxuICAgIH1cbiAgICB0aGlzLnByb3AubWVtYmVycyA9IHRoaXMubWVtYmVyc1xuICAgIHRoaXMuam9pbiA9IHRoaXMuZ3Vlc3NKb2luRnVuY3Rpb24oKVxuICB9XG5cbiAgZ3Vlc3NKb2luRnVuY3Rpb24gKCkge1xuICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29tcG9zZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3Aub3B0aW9ucy5jb21wb3NlZFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkID09PSAnc3RyaW5nJyAmJiBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9uc1t0aGlzLnByb3Aub3B0aW9ucy5jb21wb3NlZF0gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zW3RoaXMucHJvcC5vcHRpb25zLmNvbXBvc2VkXVxuICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wLm9wdGlvbnMuY29sbGVjdGlvbiAhPSBudWxsICYmIHRoaXMucHJvcC5vcHRpb25zLmNvbGxlY3Rpb24gIT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMuY29uY2F0XG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3Aub3B0aW9ucy5kZWZhdWx0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIENvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zLm9yXG4gICAgfSBlbHNlIGlmICh0aGlzLnByb3Aub3B0aW9ucy5kZWZhdWx0ID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gQ29tcG9zaXRlR2V0dGVyLmpvaW5GdW5jdGlvbnMuYW5kXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBDb21wb3NpdGVHZXR0ZXIuam9pbkZ1bmN0aW9ucy5sYXN0XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsICgpIHtcbiAgICBpZiAodGhpcy5tZW1iZXJzLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcy5wcm9wLCB0aGlzLnByb3Aub3B0aW9ucy5zY29wZSlcbiAgICAgIH1cbiAgICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLm1lbWJlcnMucmVkdWNlKChwcmV2LCBtZW1iZXIpID0+IHtcbiAgICAgICAgICB2YXIgdmFsXG4gICAgICAgICAgdmFsID0gdHlwZW9mIG1lbWJlciA9PT0gJ2Z1bmN0aW9uJyA/IG1lbWJlcihwcmV2LCB0aGlzLmludmFsaWRhdG9yKSA6IG1lbWJlclxuICAgICAgICAgIHJldHVybiB0aGlzLmpvaW4ocHJldiwgdmFsKVxuICAgICAgICB9LCB0aGlzLmJhc2VWYWx1ZSkpXG4gICAgICAgIGRvbmUoKVxuICAgICAgICBpZiAoaW52YWxpZGF0b3IuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG51bGxcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnZhbGlkYXRvci5iaW5kKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLmJhc2VWYWx1ZSlcbiAgICB9XG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfSBvcHRcbiAgICogQHJldHVybiB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfVxuICAgKi9cbiAgZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzIChvcHQpIHtcbiAgICBvcHQgPSBzdXBlci5nZXRTY29wZUdldHRlclNldHRlcnMob3B0KVxuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLm1lbWJlcnNcbiAgICBvcHRbdGhpcy5wcm9wLm9wdGlvbnMubmFtZSArICdNZW1iZXJzJ10gPSB7XG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1lbWJlcnNcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9wdFxuICB9XG59XG5cbkNvbXBvc2l0ZUdldHRlci5qb2luRnVuY3Rpb25zID0ge1xuICBhbmQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEgJiYgYlxuICB9LFxuICBvcjogZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYSB8fCBiXG4gIH0sXG4gIGxhc3Q6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGJcbiAgfSxcbiAgc3VtOiBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBhICsgYlxuICB9LFxuICBjb25jYXQ6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgYSA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhLnRvQXJyYXkgIT0gbnVsbCkge1xuICAgICAgICBhID0gYS50b0FycmF5KClcbiAgICAgIH1cbiAgICAgIGlmIChhLmNvbmNhdCA9PSBudWxsKSB7XG4gICAgICAgIGEgPSBbYV1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGIgPT0gbnVsbCkge1xuICAgICAgYiA9IFtdXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChiLnRvQXJyYXkgIT0gbnVsbCkge1xuICAgICAgICBiID0gYi50b0FycmF5KClcbiAgICAgIH1cbiAgICAgIGlmIChiLmNvbmNhdCA9PSBudWxsKSB7XG4gICAgICAgIGIgPSBbYl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGEuY29uY2F0KGIpXG4gIH1cbn1cblxuQ29tcG9zaXRlR2V0dGVyLk1lbWJlcnMgPSBjbGFzcyBNZW1iZXJzIGV4dGVuZHMgQ29sbGVjdGlvbiB7XG4gIGFkZFByb3BlcnR5IChwcm9wKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KG51bGwsIHByb3ApID09PSAtMSkge1xuICAgICAgdGhpcy5wdXNoKFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiBpbnZhbGlkYXRvci5wcm9wKHByb3ApXG4gICAgICB9LCB7XG4gICAgICAgIHByb3A6IHByb3BcbiAgICAgIH0pKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgYWRkUHJvcGVydHlQYXRoIChuYW1lLCBvYmopIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgobmFtZSwgb2JqKSA9PT0gLTEpIHtcbiAgICAgIHRoaXMucHVzaChSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gaW52YWxpZGF0b3IucHJvcFBhdGgobmFtZSwgb2JqKVxuICAgICAgfSwge1xuICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICBvYmo6IG9ialxuICAgICAgfSkpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICByZW1vdmVQcm9wZXJ0eSAocHJvcCkge1xuICAgIHRoaXMucmVtb3ZlUmVmKHsgcHJvcDogcHJvcCB9KVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBhZGRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgaWYgKHRoaXMuZmluZFJlZkluZGV4KGRhdGEpID09PSAtMSkge1xuICAgICAgY29uc3QgZm4gPSBSZWZlcmVuY2UubWFrZVJlZmVycmVkKGZ1bmN0aW9uIChwcmV2LCBpbnZhbGlkYXRvcikge1xuICAgICAgICByZXR1cm4gdmFsXG4gICAgICB9LCBkYXRhKVxuICAgICAgZm4udmFsID0gdmFsXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzZXRWYWx1ZVJlZiAodmFsLCBkYXRhKSB7XG4gICAgY29uc3QgaSA9IHRoaXMuZmluZFJlZkluZGV4KGRhdGEpXG4gICAgaWYgKGkgPT09IC0xKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlUmVmKHZhbCwgZGF0YSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuZ2V0KGkpLnZhbCAhPT0gdmFsKSB7XG4gICAgICBjb25zdCBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZnVuY3Rpb24gKHByZXYsIGludmFsaWRhdG9yKSB7XG4gICAgICAgIHJldHVybiB2YWxcbiAgICAgIH0sIGRhdGEpXG4gICAgICBmbi52YWwgPSB2YWxcbiAgICAgIHRoaXMuc2V0KGksIGZuKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgZ2V0VmFsdWVSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5maW5kQnlSZWYoZGF0YSkudmFsXG4gIH1cblxuICBhZGRGdW5jdGlvblJlZiAoZm4sIGRhdGEpIHtcbiAgICBpZiAodGhpcy5maW5kUmVmSW5kZXgoZGF0YSkgPT09IC0xKSB7XG4gICAgICBmbiA9IFJlZmVyZW5jZS5tYWtlUmVmZXJyZWQoZm4sIGRhdGEpXG4gICAgICB0aGlzLnB1c2goZm4pXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBmaW5kQnlSZWYgKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXlbdGhpcy5maW5kUmVmSW5kZXgoZGF0YSldXG4gIH1cblxuICBmaW5kUmVmSW5kZXggKGRhdGEpIHtcbiAgICByZXR1cm4gdGhpcy5fYXJyYXkuZmluZEluZGV4KGZ1bmN0aW9uIChtZW1iZXIpIHtcbiAgICAgIHJldHVybiAobWVtYmVyLnJlZiAhPSBudWxsKSAmJiBtZW1iZXIucmVmLmNvbXBhcmVEYXRhKGRhdGEpXG4gICAgfSlcbiAgfVxuXG4gIHJlbW92ZVJlZiAoZGF0YSkge1xuICAgIHZhciBpbmRleCwgb2xkXG4gICAgaW5kZXggPSB0aGlzLmZpbmRSZWZJbmRleChkYXRhKVxuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgIG9sZCA9IHRoaXMudG9BcnJheSgpXG4gICAgICB0aGlzLl9hcnJheS5zcGxpY2UoaW5kZXgsIDEpXG4gICAgICB0aGlzLmNoYW5nZWQob2xkKVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9zaXRlR2V0dGVyXG4iLCJjb25zdCBJbnZhbGlkYXRvciA9IHJlcXVpcmUoJy4uL0ludmFsaWRhdG9yJylcbmNvbnN0IENhbGN1bGF0ZWRHZXR0ZXIgPSByZXF1aXJlKCcuL0NhbGN1bGF0ZWRHZXR0ZXInKVxuXG5jbGFzcyBJbnZhbGlkYXRlZEdldHRlciBleHRlbmRzIENhbGN1bGF0ZWRHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIGlmICh0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnZhbGlkYXRlVW5rbm93bnMoKVxuICAgIH1cbiAgICByZXR1cm4gc3VwZXIuZ2V0KClcbiAgfVxuXG4gIGNhbGN1bCAoKSB7XG4gICAgaWYgKCF0aGlzLmludmFsaWRhdG9yKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMucHJvcCwgdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUpXG4gICAgfVxuICAgIHRoaXMuaW52YWxpZGF0b3IucmVjeWNsZSgoaW52YWxpZGF0b3IsIGRvbmUpID0+IHtcbiAgICAgIHRoaXMucHJvcC5zZXR0ZXIuc2V0UmF3VmFsdWUodGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnY2FsY3VsJywgaW52YWxpZGF0b3IpKVxuICAgICAgdGhpcy5wcm9wLm1hbnVhbCA9IGZhbHNlXG4gICAgICBkb25lKClcbiAgICAgIGlmIChpbnZhbGlkYXRvci5pc0VtcHR5KCkpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRvciA9IG51bGxcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGludmFsaWRhdG9yLmJpbmQoKVxuICAgICAgfVxuICAgIH0pXG4gICAgdGhpcy5yZXZhbGlkYXRlZCgpXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxuXG4gIGludmFsaWRhdGUgKGNvbnRleHQpIHtcbiAgICBzdXBlci5pbnZhbGlkYXRlKGNvbnRleHQpXG4gICAgaWYgKCF0aGlzLmNhbGN1bGF0ZWQgJiYgdGhpcy5pbnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnVuYmluZCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBkZXN0cm95ICgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvciAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnZhbGlkYXRvci51bmJpbmQoKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdGVkR2V0dGVyXG4iLCJjb25zdCBCYXNlR2V0dGVyID0gcmVxdWlyZSgnLi9CYXNlR2V0dGVyJylcblxuY2xhc3MgTWFudWFsR2V0dGVyIGV4dGVuZHMgQmFzZUdldHRlciB7XG4gIGdldCAoKSB7XG4gICAgdGhpcy5wcm9wLnNldHRlci5zZXRSYXdWYWx1ZSh0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdnZXQnKSlcbiAgICB0aGlzLmNhbGN1bGF0ZWQgPSB0cnVlXG4gICAgdGhpcy5pbml0aWF0ZWQgPSB0cnVlXG4gICAgcmV0dXJuIHRoaXMub3V0cHV0KClcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1hbnVhbEdldHRlclxuIiwiY29uc3QgQmFzZUdldHRlciA9IHJlcXVpcmUoJy4vQmFzZUdldHRlcicpXG5cbmNsYXNzIFNpbXBsZUdldHRlciBleHRlbmRzIEJhc2VHZXR0ZXIge1xuICBnZXQgKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlZCA9IHRydWVcbiAgICBpZiAoIXRoaXMuaW5pdGlhdGVkKSB7XG4gICAgICB0aGlzLmluaXRpYXRlZCA9IHRydWVcbiAgICAgIHRoaXMucHJvcC5ldmVudHMuZW1pdCgndXBkYXRlZCcpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm91dHB1dCgpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaW1wbGVHZXR0ZXJcbiIsIlxuY29uc3QgUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnLi4vd2F0Y2hlcnMvUHJvcGVydHlXYXRjaGVyJylcblxuY2xhc3MgQmFzZVNldHRlciB7XG4gIGNvbnN0cnVjdG9yIChwcm9wKSB7XG4gICAgdGhpcy5wcm9wID0gcHJvcFxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgdGhpcy5zZXREZWZhdWx0VmFsdWUoKVxuICB9XG5cbiAgc2V0RGVmYXVsdFZhbHVlICgpIHtcbiAgICB0aGlzLnNldFJhd1ZhbHVlKHRoaXMuaW5nZXN0KHRoaXMucHJvcC5vcHRpb25zLmRlZmF1bHQpKVxuICB9XG5cbiAgbG9hZEludGVybmFsV2F0Y2hlciAoKSB7XG4gICAgY29uc3QgY2hhbmdlT3B0ID0gdGhpcy5wcm9wLm9wdGlvbnMuY2hhbmdlXG4gICAgaWYgKHR5cGVvZiBjaGFuZ2VPcHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRoaXMud2F0Y2hlciA9IG5ldyBQcm9wZXJ0eVdhdGNoZXIoe1xuICAgICAgICBwcm9wZXJ0eTogdGhpcy5wcm9wLFxuICAgICAgICBjYWxsYmFjazogY2hhbmdlT3B0LFxuICAgICAgICBzY29wZTogdGhpcy5wcm9wLm9wdGlvbnMuc2NvcGUsXG4gICAgICAgIGF1dG9CaW5kOiB0cnVlXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoY2hhbmdlT3B0ICE9IG51bGwgJiYgdHlwZW9mIGNoYW5nZU9wdC5jb3B5V2l0aCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhpcy53YXRjaGVyID0gY2hhbmdlT3B0LmNvcHlXaXRoKHtcbiAgICAgICAgcHJvcGVydHk6IHRoaXMucHJvcCxcbiAgICAgICAgc2NvcGU6IHRoaXMucHJvcC5vcHRpb25zLnNjb3BlLFxuICAgICAgICBhdXRvQmluZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMud2F0Y2hlclxuICB9XG5cbiAgc2V0ICh2YWwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbXBsZW1lbnRlZCcpXG4gIH1cblxuICBzZXRSYXdWYWx1ZSAodmFsKSB7XG4gICAgdGhpcy5wcm9wLnZhbHVlID0gdmFsXG4gICAgcmV0dXJuIHRoaXMucHJvcC52YWx1ZVxuICB9XG5cbiAgaW5nZXN0ICh2YWwpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMucHJvcC5vcHRpb25zLmluZ2VzdCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFsID0gdGhpcy5wcm9wLmNhbGxPcHRpb25GdW5jdCgnaW5nZXN0JywgdmFsKVxuICAgIH1cbiAgICByZXR1cm4gdmFsXG4gIH1cblxuICBjaGVja0NoYW5nZXMgKHZhbCwgb2xkKSB7XG4gICAgcmV0dXJuIHZhbCAhPT0gb2xkXG4gIH1cblxuICBjaGFuZ2VkIChvbGQpIHtcbiAgICBjb25zdCBjb250ZXh0ID0geyBvcmlnaW46IHRoaXMucHJvcCB9XG4gICAgdGhpcy5wcm9wLmV2ZW50cy5lbWl0KCd1cGRhdGVkJywgb2xkLCBjb250ZXh0KVxuICAgIHRoaXMucHJvcC5ldmVudHMuZW1pdCgnY2hhbmdlZCcsIG9sZCwgY29udGV4dClcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfSBvcHRcbiAgICogQHJldHVybiB7UHJvcGVydHlEZXNjcmlwdG9yTWFwfVxuICAgKi9cbiAgZ2V0U2NvcGVHZXR0ZXJTZXR0ZXJzIChvcHQpIHtcbiAgICBjb25zdCBwcm9wID0gdGhpcy5wcm9wXG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdID0gb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdIHx8IHt9XG4gICAgb3B0W3RoaXMucHJvcC5vcHRpb25zLm5hbWVdLnNldCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiBwcm9wLnNldCh2YWwpXG4gICAgfVxuICAgIHJldHVybiBvcHRcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhc2VTZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBCYXNlVmFsdWVTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB2YWwgPSB0aGlzLmluZ2VzdCh2YWwpXG4gICAgaWYgKHRoaXMucHJvcC5nZXR0ZXIuYmFzZVZhbHVlICE9PSB2YWwpIHtcbiAgICAgIHRoaXMucHJvcC5nZXR0ZXIuYmFzZVZhbHVlID0gdmFsXG4gICAgICB0aGlzLnByb3AuaW52YWxpZGF0ZSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlVmFsdWVTZXR0ZXJcbiIsImNvbnN0IFNpbXBsZVNldHRlciA9IHJlcXVpcmUoJy4vU2ltcGxlU2V0dGVyJylcbmNvbnN0IENvbGxlY3Rpb24gPSByZXF1aXJlKCdzcGFyay1jb2xsZWN0aW9uJylcbmNvbnN0IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuLi93YXRjaGVycy9Db2xsZWN0aW9uUHJvcGVydHlXYXRjaGVyJylcblxuY2xhc3MgQ29sbGVjdGlvblNldHRlciBleHRlbmRzIFNpbXBsZVNldHRlciB7XG4gIGluaXQgKCkge1xuICAgIHRoaXMub3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSxcbiAgICAgIENvbGxlY3Rpb25TZXR0ZXIuZGVmYXVsdE9wdGlvbnMsXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY29sbGVjdGlvbiA9PT0gJ29iamVjdCcgPyB0aGlzLnByb3Aub3B0aW9ucy5jb2xsZWN0aW9uIDoge31cbiAgICApXG4gICAgc3VwZXIuaW5pdCgpXG4gIH1cblxuICBsb2FkSW50ZXJuYWxXYXRjaGVyICgpIHtcbiAgICBpZiAoXG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuY2hhbmdlID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuaXRlbUFkZGVkID09PSAnZnVuY3Rpb24nIHx8XG4gICAgICB0eXBlb2YgdGhpcy5wcm9wLm9wdGlvbnMuaXRlbVJlbW92ZWQgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIHJldHVybiBuZXcgQ29sbGVjdGlvblByb3BlcnR5V2F0Y2hlcih7XG4gICAgICAgIHByb3BlcnR5OiB0aGlzLnByb3AsXG4gICAgICAgIGNhbGxiYWNrOiB0aGlzLnByb3Aub3B0aW9ucy5jaGFuZ2UsXG4gICAgICAgIG9uQWRkZWQ6IHRoaXMucHJvcC5vcHRpb25zLml0ZW1BZGRlZCxcbiAgICAgICAgb25SZW1vdmVkOiB0aGlzLnByb3Aub3B0aW9ucy5pdGVtUmVtb3ZlZCxcbiAgICAgICAgc2NvcGU6IHRoaXMucHJvcC5vcHRpb25zLnNjb3BlLFxuICAgICAgICBhdXRvQmluZDogdHJ1ZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgc3VwZXIubG9hZEludGVybmFsV2F0Y2hlcigpXG4gICAgfVxuICB9XG5cbiAgc2V0UmF3VmFsdWUgKHZhbCkge1xuICAgIHRoaXMucHJvcC52YWx1ZSA9IHRoaXMubWFrZUNvbGxlY3Rpb24odmFsKVxuICAgIHJldHVybiB0aGlzLnByb3AudmFsdWVcbiAgfVxuXG4gIG1ha2VDb2xsZWN0aW9uICh2YWwpIHtcbiAgICB2YWwgPSB0aGlzLnZhbFRvQXJyYXkodmFsKVxuICAgIGNvbnN0IHByb3AgPSB0aGlzLnByb3BcbiAgICBjb25zdCBjb2wgPSBDb2xsZWN0aW9uLm5ld1N1YkNsYXNzKHRoaXMub3B0aW9ucywgdmFsKVxuICAgIGNvbC5jaGFuZ2VkID0gZnVuY3Rpb24gKG9sZCkge1xuICAgICAgcHJvcC5zZXR0ZXIuY2hhbmdlZChvbGQpXG4gICAgfVxuICAgIHJldHVybiBjb2xcbiAgfVxuXG4gIHZhbFRvQXJyYXkgKHZhbCkge1xuICAgIGlmICh2YWwgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtdXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsLnRvQXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWwudG9BcnJheSgpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICAgIHJldHVybiB2YWwuc2xpY2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW3ZhbF1cbiAgICB9XG4gIH1cblxuICBjaGVja0NoYW5nZXMgKHZhbCwgb2xkKSB7XG4gICAgdmFyIGNvbXBhcmVGdW5jdGlvblxuICAgIGlmICh0eXBlb2YgdGhpcy5vcHRpb25zLmNvbXBhcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbXBhcmVGdW5jdGlvbiA9IHRoaXMub3B0aW9ucy5jb21wYXJlXG4gICAgfVxuICAgIHJldHVybiAobmV3IENvbGxlY3Rpb24odmFsKSkuY2hlY2tDaGFuZ2VzKG9sZCwgdGhpcy5vcHRpb25zLm9yZGVyZWQsIGNvbXBhcmVGdW5jdGlvbilcbiAgfVxufVxuXG5Db2xsZWN0aW9uU2V0dGVyLmRlZmF1bHRPcHRpb25zID0ge1xuICBjb21wYXJlOiBmYWxzZSxcbiAgb3JkZXJlZDogdHJ1ZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25TZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBNYW51YWxTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB0aGlzLnByb3AuY2FsbE9wdGlvbkZ1bmN0KCdzZXQnLCB2YWwpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNYW51YWxTZXR0ZXJcbiIsImNvbnN0IEJhc2VTZXR0ZXIgPSByZXF1aXJlKCcuL0Jhc2VTZXR0ZXInKVxuXG5jbGFzcyBTaW1wbGVTZXR0ZXIgZXh0ZW5kcyBCYXNlU2V0dGVyIHtcbiAgc2V0ICh2YWwpIHtcbiAgICB2YXIgb2xkXG4gICAgdmFsID0gdGhpcy5pbmdlc3QodmFsKVxuICAgIHRoaXMucHJvcC5nZXR0ZXIucmV2YWxpZGF0ZWQoKVxuICAgIGlmICh0aGlzLmNoZWNrQ2hhbmdlcyh2YWwsIHRoaXMucHJvcC52YWx1ZSkpIHtcbiAgICAgIG9sZCA9IHRoaXMucHJvcC52YWx1ZVxuICAgICAgdGhpcy5zZXRSYXdWYWx1ZSh2YWwpXG4gICAgICB0aGlzLnByb3AubWFudWFsID0gdHJ1ZVxuICAgICAgdGhpcy5jaGFuZ2VkKG9sZClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNpbXBsZVNldHRlclxuIiwiXG5jb25zdCBQcm9wZXJ0eVdhdGNoZXIgPSByZXF1aXJlKCcuL1Byb3BlcnR5V2F0Y2hlcicpXG5cbmNsYXNzIENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXIgZXh0ZW5kcyBQcm9wZXJ0eVdhdGNoZXIge1xuICBsb2FkT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHN1cGVyLmxvYWRPcHRpb25zKG9wdGlvbnMpXG4gICAgdGhpcy5vbkFkZGVkID0gb3B0aW9ucy5vbkFkZGVkXG4gICAgdGhpcy5vblJlbW92ZWQgPSBvcHRpb25zLm9uUmVtb3ZlZFxuICB9XG5cbiAgaGFuZGxlQ2hhbmdlICh2YWx1ZSwgb2xkKSB7XG4gICAgb2xkID0gdmFsdWUuY29weShvbGQgfHwgW10pXG4gICAgaWYgKHR5cGVvZiB0aGlzLmNhbGxiYWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgdmFsdWUsIG9sZClcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uQWRkZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHZhbHVlLmZvckVhY2goKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaWYgKCFvbGQuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vbkFkZGVkLmNhbGwodGhpcy5zY29wZSwgaXRlbSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLm9uUmVtb3ZlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG9sZC5mb3JFYWNoKChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGlmICghdmFsdWUuaW5jbHVkZXMoaXRlbSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5vblJlbW92ZWQuY2FsbCh0aGlzLnNjb3BlLCBpdGVtKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbGxlY3Rpb25Qcm9wZXJ0eVdhdGNoZXJcbiIsIlxuY29uc3QgQmluZGVyID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLkJpbmRlclxuY29uc3QgUmVmZXJlbmNlID0gcmVxdWlyZSgnc3BhcmstYmluZGluZycpLlJlZmVyZW5jZVxuXG4vKipcbiAqIEB0ZW1wbGF0ZSBUXG4gKi9cbmNsYXNzIFByb3BlcnR5V2F0Y2hlciBleHRlbmRzIEJpbmRlciB7XG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBQcm9wZXJ0eVdhdGNoZXJPcHRpb25zXG4gICAqIEBwcm9wZXJ0eSB7aW1wb3J0KFwiLi9Qcm9wZXJ0eVwiKTxUPnxzdHJpbmd9IHByb3BlcnR5XG4gICAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb24oVCxUKX0gY2FsbGJhY2tcbiAgICogQHByb3BlcnR5IHtib29sZWFufSBbYXV0b0JpbmRdXG4gICAqIEBwcm9wZXJ0eSB7Kn0gW3Njb3BlXVxuICAgKlxuICAgKiBAcGFyYW0ge1Byb3BlcnR5V2F0Y2hlck9wdGlvbnN9IG9wdGlvbnNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChvcHRpb25zKSB7XG4gICAgc3VwZXIoKVxuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnNcbiAgICB0aGlzLmludmFsaWRhdGVDYWxsYmFjayA9IChjb250ZXh0KSA9PiB7XG4gICAgICBpZiAodGhpcy52YWxpZENvbnRleHQoY29udGV4dCkpIHtcbiAgICAgICAgdGhpcy5pbnZhbGlkYXRlKClcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy51cGRhdGVDYWxsYmFjayA9IChvbGQsIGNvbnRleHQpID0+IHtcbiAgICAgIGlmICh0aGlzLnZhbGlkQ29udGV4dChjb250ZXh0KSkge1xuICAgICAgICB0aGlzLnVwZGF0ZShvbGQpXG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkT3B0aW9ucyh0aGlzLm9wdGlvbnMpXG4gICAgfVxuICAgIHRoaXMuaW5pdCgpXG4gIH1cblxuICBsb2FkT3B0aW9ucyAob3B0aW9ucykge1xuICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLnNjb3BlXG4gICAgdGhpcy5wcm9wZXJ0eSA9IG9wdGlvbnMucHJvcGVydHlcbiAgICB0aGlzLmNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFja1xuICAgIHRoaXMuYXV0b0JpbmQgPSBvcHRpb25zLmF1dG9CaW5kXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGNvcHlXaXRoIChvcHRpb25zKSB7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0aW9ucywgb3B0aW9ucykpXG4gIH1cblxuICBpbml0ICgpIHtcbiAgICBpZiAodGhpcy5hdXRvQmluZCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2hlY2tCaW5kKClcbiAgICB9XG4gIH1cblxuICBnZXRQcm9wZXJ0eSAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnByb3BlcnR5ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcEJ5TmFtZSh0aGlzLnByb3BlcnR5KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0eVxuICB9XG5cbiAgZ2V0UHJvcEJ5TmFtZSAocHJvcCwgdGFyZ2V0ID0gdGhpcy5zY29wZSkge1xuICAgIGlmICh0YXJnZXQucHJvcGVydGllc01hbmFnZXIgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlci5nZXRQcm9wZXJ0eShwcm9wKVxuICAgIH0gZWxzZSBpZiAodGFyZ2V0W3Byb3AgKyAnUHJvcGVydHknXSAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gdGFyZ2V0W3Byb3AgKyAnUHJvcGVydHknXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYENvdWxkIG5vdCBmaW5kIHRoZSBwcm9wZXJ0eSAke3Byb3B9YClcbiAgICB9XG4gIH1cblxuICBjaGVja0JpbmQgKCkge1xuICAgIHJldHVybiB0aGlzLnRvZ2dsZUJpbmQodGhpcy5zaG91bGRCaW5kKCkpXG4gIH1cblxuICBzaG91bGRCaW5kICgpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgY2FuQmluZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHkoKSAhPSBudWxsXG4gIH1cblxuICBkb0JpbmQgKCkge1xuICAgIHRoaXMudXBkYXRlKClcbiAgICB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLm9uKCdpbnZhbGlkYXRlZCcsIHRoaXMuaW52YWxpZGF0ZUNhbGxiYWNrKVxuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLm9uKCd1cGRhdGVkJywgdGhpcy51cGRhdGVDYWxsYmFjaylcbiAgfVxuXG4gIGRvVW5iaW5kICgpIHtcbiAgICB0aGlzLmdldFByb3BlcnR5KCkuZXZlbnRzLm9mZignaW52YWxpZGF0ZWQnLCB0aGlzLmludmFsaWRhdGVDYWxsYmFjaylcbiAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eSgpLmV2ZW50cy5vZmYoJ3VwZGF0ZWQnLCB0aGlzLnVwZGF0ZUNhbGxiYWNrKVxuICB9XG5cbiAgZXF1YWxzICh3YXRjaGVyKSB7XG4gICAgcmV0dXJuIHdhdGNoZXIuY29uc3RydWN0b3IgPT09IHRoaXMuY29uc3RydWN0b3IgJiZcbiAgICAgIHdhdGNoZXIgIT0gbnVsbCAmJlxuICAgICAgd2F0Y2hlci5ldmVudCA9PT0gdGhpcy5ldmVudCAmJlxuICAgICAgd2F0Y2hlci5nZXRQcm9wZXJ0eSgpID09PSB0aGlzLmdldFByb3BlcnR5KCkgJiZcbiAgICAgIFJlZmVyZW5jZS5jb21wYXJlVmFsKHdhdGNoZXIuY2FsbGJhY2ssIHRoaXMuY2FsbGJhY2spXG4gIH1cblxuICB2YWxpZENvbnRleHQgKGNvbnRleHQpIHtcbiAgICByZXR1cm4gY29udGV4dCA9PSBudWxsIHx8ICFjb250ZXh0LnByZXZlbnRJbW1lZGlhdGVcbiAgfVxuXG4gIGludmFsaWRhdGUgKCkge1xuICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5KCkuZ2V0KClcbiAgfVxuXG4gIHVwZGF0ZSAob2xkKSB7XG4gICAgdmFyIHZhbHVlXG4gICAgdmFsdWUgPSB0aGlzLmdldFByb3BlcnR5KCkuZ2V0KClcbiAgICByZXR1cm4gdGhpcy5oYW5kbGVDaGFuZ2UodmFsdWUsIG9sZClcbiAgfVxuXG4gIGhhbmRsZUNoYW5nZSAodmFsdWUsIG9sZCkge1xuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgdmFsdWUsIG9sZClcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9wZXJ0eVdhdGNoZXJcbiIsInZhciBFbGVtZW50LCBNaXhhYmxlLCBQcm9wZXJ0aWVzTWFuYWdlcjtcblxuUHJvcGVydGllc01hbmFnZXIgPSByZXF1aXJlKCdzcGFyay1wcm9wZXJ0aWVzJykuUHJvcGVydGllc01hbmFnZXI7XG5cbk1peGFibGUgPSByZXF1aXJlKCcuL01peGFibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBFbGVtZW50ID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBFbGVtZW50IGV4dGVuZHMgTWl4YWJsZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdFByb3BlcnRpZXNNYW5hZ2VyKGRhdGEpO1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLmluaXRXYXRjaGVycygpO1xuICAgIH1cblxuICAgIGluaXRQcm9wZXJ0aWVzTWFuYWdlcihkYXRhKSB7XG4gICAgICB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci51c2VTY29wZSh0aGlzKTtcbiAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuaW5pdFByb3BlcnRpZXMoKTtcbiAgICAgIHRoaXMucHJvcGVydGllc01hbmFnZXIuY3JlYXRlU2NvcGVHZXR0ZXJTZXR0ZXJzKCk7XG4gICAgICBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5zZXRQcm9wZXJ0aWVzRGF0YShkYXRhKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0YXAobmFtZSkge1xuICAgICAgdmFyIGFyZ3M7XG4gICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBuYW1lLmFwcGx5KHRoaXMsIGFyZ3Muc2xpY2UoMSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpc1tuYW1lXS5hcHBseSh0aGlzLCBhcmdzLnNsaWNlKDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNhbGxiYWNrKG5hbWUpIHtcbiAgICAgIGlmICh0aGlzLl9jYWxsYmFja3MgPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLl9jYWxsYmFja3NbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jYWxsYmFja3NbbmFtZV0gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2NhbGxiYWNrc1tuYW1lXS5vd25lciA9IHRoaXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW25hbWVdO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzTWFuYWdlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIFsncHJvcGVydGllc01hbmFnZXInXTtcbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIGlmICh0YXJnZXQucHJvcGVydGllc01hbmFnZXIpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlciA9IHRhcmdldC5wcm9wZXJ0aWVzTWFuYWdlci5jb3B5V2l0aCh0aGlzLnByb3BlcnRpZXNNYW5hZ2VyLnByb3BlcnRpZXNPcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQucHJvcGVydGllc01hbmFnZXIgPSB0aGlzLnByb3BlcnRpZXNNYW5hZ2VyO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBwcm9wZXJ0eShwcm9wLCBkZXNjKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIgPSB0aGlzLnByb3RvdHlwZS5wcm9wZXJ0aWVzTWFuYWdlci53aXRoUHJvcGVydHkocHJvcCwgZGVzYyk7XG4gICAgfVxuXG4gICAgc3RhdGljIHByb3BlcnRpZXMocHJvcGVydGllcykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvdG90eXBlLnByb3BlcnRpZXNNYW5hZ2VyID0gdGhpcy5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIuY29weVdpdGgocHJvcGVydGllcyk7XG4gICAgfVxuXG4gIH07XG5cbiAgRWxlbWVudC5wcm90b3R5cGUucHJvcGVydGllc01hbmFnZXIgPSBuZXcgUHJvcGVydGllc01hbmFnZXIoKTtcblxuICByZXR1cm4gRWxlbWVudDtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9FbGVtZW50LmpzLm1hcFxuIiwidmFyIEFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlciwgSW52YWxpZGF0b3IsIFByb3BlcnR5V2F0Y2hlcjtcblxuUHJvcGVydHlXYXRjaGVyID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLndhdGNoZXJzLlByb3BlcnR5V2F0Y2hlcjtcblxuSW52YWxpZGF0b3IgPSByZXF1aXJlKCdzcGFyay1wcm9wZXJ0aWVzJykuSW52YWxpZGF0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyID0gY2xhc3MgQWN0aXZhYmxlUHJvcGVydHlXYXRjaGVyIGV4dGVuZHMgUHJvcGVydHlXYXRjaGVyIHtcbiAgbG9hZE9wdGlvbnMob3B0aW9ucykge1xuICAgIHN1cGVyLmxvYWRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZSA9IG9wdGlvbnMuYWN0aXZlO1xuICB9XG5cbiAgc2hvdWxkQmluZCgpIHtcbiAgICB2YXIgYWN0aXZlO1xuICAgIGlmICh0aGlzLmFjdGl2ZSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5pbnZhbGlkYXRvciA9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IgPSBuZXcgSW52YWxpZGF0b3IodGhpcywgdGhpcy5zY29wZSk7XG4gICAgICAgIHRoaXMuaW52YWxpZGF0b3IuY2FsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY2hlY2tCaW5kKCk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICB0aGlzLmludmFsaWRhdG9yLnJlY3ljbGUoKTtcbiAgICAgIGFjdGl2ZSA9IHRoaXMuYWN0aXZlKHRoaXMuaW52YWxpZGF0b3IpO1xuICAgICAgdGhpcy5pbnZhbGlkYXRvci5lbmRSZWN5Y2xlKCk7XG4gICAgICB0aGlzLmludmFsaWRhdG9yLmJpbmQoKTtcbiAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG59O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD0uLi9tYXBzL0ludmFsaWRhdGVkL0FjdGl2YWJsZVByb3BlcnR5V2F0Y2hlci5qcy5tYXBcbiIsInZhciBJbnZhbGlkYXRlZCwgSW52YWxpZGF0b3I7XG5cbkludmFsaWRhdG9yID0gcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLkludmFsaWRhdG9yO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludmFsaWRhdGVkID0gY2xhc3MgSW52YWxpZGF0ZWQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5sb2FkT3B0aW9ucyhvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKCEoKG9wdGlvbnMgIT0gbnVsbCA/IG9wdGlvbnMuaW5pdEJ5TG9hZGVyIDogdm9pZCAwKSAmJiAob3B0aW9ucy5sb2FkZXIgIT0gbnVsbCkpKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gIH1cblxuICBsb2FkT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgdGhpcy5zY29wZSA9IG9wdGlvbnMuc2NvcGU7XG4gICAgaWYgKG9wdGlvbnMubG9hZGVyQXNTY29wZSAmJiAob3B0aW9ucy5sb2FkZXIgIT0gbnVsbCkpIHtcbiAgICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLmxvYWRlcjtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2sgPSBvcHRpb25zLmNhbGxiYWNrO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVua25vd24oKSB7XG4gICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0b3IudmFsaWRhdGVVbmtub3ducygpO1xuICB9XG5cbiAgaW52YWxpZGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvciA9PSBudWxsKSB7XG4gICAgICB0aGlzLmludmFsaWRhdG9yID0gbmV3IEludmFsaWRhdG9yKHRoaXMsIHRoaXMuc2NvcGUpO1xuICAgIH1cbiAgICB0aGlzLmludmFsaWRhdG9yLnJlY3ljbGUoKTtcbiAgICB0aGlzLmhhbmRsZVVwZGF0ZSh0aGlzLmludmFsaWRhdG9yKTtcbiAgICB0aGlzLmludmFsaWRhdG9yLmVuZFJlY3ljbGUoKTtcbiAgICB0aGlzLmludmFsaWRhdG9yLmJpbmQoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGhhbmRsZVVwZGF0ZShpbnZhbGlkYXRvcikge1xuICAgIGlmICh0aGlzLnNjb3BlICE9IG51bGwpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhbGxiYWNrLmNhbGwodGhpcy5zY29wZSwgaW52YWxpZGF0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5jYWxsYmFjayhpbnZhbGlkYXRvcik7XG4gICAgfVxuICB9XG5cbiAgZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5pbnZhbGlkYXRvcikge1xuICAgICAgcmV0dXJuIHRoaXMuaW52YWxpZGF0b3IudW5iaW5kKCk7XG4gICAgfVxuICB9XG5cbn07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPS4uL21hcHMvSW52YWxpZGF0ZWQvSW52YWxpZGF0ZWQuanMubWFwXG4iLCJ2YXIgTG9hZGVyLCBPdmVycmlkZXI7XG5cbk92ZXJyaWRlciA9IHJlcXVpcmUoJy4vT3ZlcnJpZGVyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBPdmVycmlkZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcbiAgICAgIHRoaXMuaW5pdFByZWxvYWRlZCgpO1xuICAgIH1cblxuICAgIGluaXRQcmVsb2FkZWQoKSB7XG4gICAgICB2YXIgZGVmTGlzdDtcbiAgICAgIGRlZkxpc3QgPSB0aGlzLnByZWxvYWRlZDtcbiAgICAgIHRoaXMucHJlbG9hZGVkID0gW107XG4gICAgICByZXR1cm4gdGhpcy5sb2FkKGRlZkxpc3QpO1xuICAgIH1cblxuICAgIGxvYWQoZGVmTGlzdCkge1xuICAgICAgdmFyIGxvYWRlZCwgdG9Mb2FkO1xuICAgICAgdG9Mb2FkID0gW107XG4gICAgICBsb2FkZWQgPSBkZWZMaXN0Lm1hcCgoZGVmKSA9PiB7XG4gICAgICAgIHZhciBpbnN0YW5jZTtcbiAgICAgICAgaWYgKGRlZi5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVmID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICBsb2FkZXI6IHRoaXNcbiAgICAgICAgICB9LCBkZWYpO1xuICAgICAgICAgIGluc3RhbmNlID0gTG9hZGVyLmxvYWQoZGVmKTtcbiAgICAgICAgICBkZWYgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIGluc3RhbmNlOiBpbnN0YW5jZVxuICAgICAgICAgIH0sIGRlZik7XG4gICAgICAgICAgaWYgKGRlZi5pbml0QnlMb2FkZXIgJiYgKGluc3RhbmNlLmluaXQgIT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRvTG9hZC5wdXNoKGluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRlZjtcbiAgICAgIH0pO1xuICAgICAgdGhpcy5wcmVsb2FkZWQgPSB0aGlzLnByZWxvYWRlZC5jb25jYXQobG9hZGVkKTtcbiAgICAgIHJldHVybiB0b0xvYWQuZm9yRWFjaChmdW5jdGlvbihpbnN0YW5jZSkge1xuICAgICAgICByZXR1cm4gaW5zdGFuY2UuaW5pdCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJlbG9hZChkZWYpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShkZWYpKSB7XG4gICAgICAgIGRlZiA9IFtkZWZdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucHJlbG9hZGVkID0gKHRoaXMucHJlbG9hZGVkIHx8IFtdKS5jb25jYXQoZGVmKTtcbiAgICB9XG5cbiAgICBkZXN0cm95TG9hZGVkKCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJlbG9hZGVkLmZvckVhY2goZnVuY3Rpb24oZGVmKSB7XG4gICAgICAgIHZhciByZWY7XG4gICAgICAgIHJldHVybiAocmVmID0gZGVmLmluc3RhbmNlKSAhPSBudWxsID8gdHlwZW9mIHJlZi5kZXN0cm95ID09PSBcImZ1bmN0aW9uXCIgPyByZWYuZGVzdHJveSgpIDogdm9pZCAwIDogdm9pZCAwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RmluYWxQcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIHN1cGVyLmdldEZpbmFsUHJvcGVydGllcygpLmNvbmNhdChbJ3ByZWxvYWRlZCddKTtcbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIHN1cGVyLmV4dGVuZGVkKHRhcmdldCk7XG4gICAgICBpZiAodGhpcy5wcmVsb2FkZWQpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5wcmVsb2FkZWQgPSAodGFyZ2V0LnByZWxvYWRlZCB8fCBbXSkuY29uY2F0KHRoaXMucHJlbG9hZGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZE1hbnkoZGVmKSB7XG4gICAgICByZXR1cm4gZGVmLm1hcCgoZCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sb2FkKGQpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWQoZGVmKSB7XG4gICAgICBpZiAodHlwZW9mIGRlZi50eXBlLmNvcHlXaXRoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGRlZi50eXBlLmNvcHlXaXRoKGRlZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IGRlZi50eXBlKGRlZik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIHByZWxvYWQoZGVmKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm90b3R5cGUucHJlbG9hZChkZWYpO1xuICAgIH1cblxuICB9O1xuXG4gIExvYWRlci5wcm90b3R5cGUucHJlbG9hZGVkID0gW107XG5cbiAgTG9hZGVyLm92ZXJyaWRlcyh7XG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXQud2l0aG91dExvYWRlcigpO1xuICAgICAgcmV0dXJuIHRoaXMuaW5pdFByZWxvYWRlZCgpO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRlc3Ryb3kud2l0aG91dExvYWRlcigpO1xuICAgICAgcmV0dXJuIHRoaXMuZGVzdHJveUxvYWRlZCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIExvYWRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9Mb2FkZXIuanMubWFwXG4iLCJ2YXIgTWl4YWJsZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gTWl4YWJsZSA9IChmdW5jdGlvbigpIHtcbiAgY2xhc3MgTWl4YWJsZSB7XG4gICAgc3RhdGljIGV4dGVuZChvYmopIHtcbiAgICAgIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzKTtcbiAgICAgIGlmIChvYmoucHJvdG90eXBlICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLnByb3RvdHlwZSwgdGhpcy5wcm90b3R5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBpbmNsdWRlKG9iaikge1xuICAgICAgcmV0dXJuIHRoaXMuRXh0ZW5zaW9uLm1ha2Uob2JqLCB0aGlzLnByb3RvdHlwZSk7XG4gICAgfVxuXG4gIH07XG5cbiAgTWl4YWJsZS5FeHRlbnNpb24gPSB7XG4gICAgbWFrZU9uY2U6IGZ1bmN0aW9uKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCEoKHJlZiA9IHRhcmdldC5leHRlbnNpb25zKSAhPSBudWxsID8gcmVmLmluY2x1ZGVzKHNvdXJjZSkgOiB2b2lkIDApKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1ha2Uoc291cmNlLCB0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgbWFrZTogZnVuY3Rpb24oc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBpLCBsZW4sIG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzLCBwcm9wLCByZWY7XG4gICAgICByZWYgPSB0aGlzLmdldEV4dGVuc2lvblByb3BlcnRpZXMoc291cmNlLCB0YXJnZXQpO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHByb3AgPSByZWZbaV07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AubmFtZSwgcHJvcCk7XG4gICAgICB9XG4gICAgICBpZiAoc291cmNlLmdldEZpbmFsUHJvcGVydGllcyAmJiB0YXJnZXQuZ2V0RmluYWxQcm9wZXJ0aWVzKSB7XG4gICAgICAgIG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzID0gdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcztcbiAgICAgICAgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzKCkuY29uY2F0KG9yaWdpbmFsRmluYWxQcm9wZXJ0aWVzLmNhbGwodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcyA9IHNvdXJjZS5nZXRGaW5hbFByb3BlcnRpZXMgfHwgdGFyZ2V0LmdldEZpbmFsUHJvcGVydGllcztcbiAgICAgIH1cbiAgICAgIHRhcmdldC5leHRlbnNpb25zID0gKHRhcmdldC5leHRlbnNpb25zIHx8IFtdKS5jb25jYXQoW3NvdXJjZV0pO1xuICAgICAgaWYgKHR5cGVvZiBzb3VyY2UuZXh0ZW5kZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5leHRlbmRlZCh0YXJnZXQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWx3YXlzRmluYWw6IFsnZXh0ZW5kZWQnLCAnZXh0ZW5zaW9ucycsICdfX3N1cGVyX18nLCAnY29uc3RydWN0b3InLCAnZ2V0RmluYWxQcm9wZXJ0aWVzJ10sXG4gICAgZ2V0RXh0ZW5zaW9uUHJvcGVydGllczogZnVuY3Rpb24oc291cmNlLCB0YXJnZXQpIHtcbiAgICAgIHZhciBhbHdheXNGaW5hbCwgcHJvcHMsIHRhcmdldENoYWluO1xuICAgICAgYWx3YXlzRmluYWwgPSB0aGlzLmFsd2F5c0ZpbmFsO1xuICAgICAgdGFyZ2V0Q2hhaW4gPSB0aGlzLmdldFByb3RvdHlwZUNoYWluKHRhcmdldCk7XG4gICAgICBwcm9wcyA9IFtdO1xuICAgICAgdGhpcy5nZXRQcm90b3R5cGVDaGFpbihzb3VyY2UpLmV2ZXJ5KGZ1bmN0aW9uKG9iaikge1xuICAgICAgICB2YXIgZXhjbHVkZTtcbiAgICAgICAgaWYgKCF0YXJnZXRDaGFpbi5pbmNsdWRlcyhvYmopKSB7XG4gICAgICAgICAgZXhjbHVkZSA9IGFsd2F5c0ZpbmFsO1xuICAgICAgICAgIGlmIChzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzICE9IG51bGwpIHtcbiAgICAgICAgICAgIGV4Y2x1ZGUgPSBleGNsdWRlLmNvbmNhdChzb3VyY2UuZ2V0RmluYWxQcm9wZXJ0aWVzKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgZXhjbHVkZSA9IGV4Y2x1ZGUuY29uY2F0KFtcImxlbmd0aFwiLCBcInByb3RvdHlwZVwiLCBcIm5hbWVcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcigoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleS5zdWJzdHIoMCwgMikgIT09IFwiX19cIiAmJiBpbmRleE9mLmNhbGwoZXhjbHVkZSwga2V5KSA8IDAgJiYgIXByb3BzLmZpbmQoZnVuY3Rpb24ocHJvcCkge1xuICAgICAgICAgICAgICByZXR1cm4gcHJvcC5uYW1lID09PSBrZXk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJvcDtcbiAgICAgICAgICAgIHByb3AgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgICAgICAgICAgIHByb3AubmFtZSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiBwcm9wO1xuICAgICAgICAgIH0pKTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcHJvcHM7XG4gICAgfSxcbiAgICBnZXRQcm90b3R5cGVDaGFpbjogZnVuY3Rpb24ob2JqKSB7XG4gICAgICB2YXIgYmFzZVByb3RvdHlwZSwgY2hhaW47XG4gICAgICBjaGFpbiA9IFtdO1xuICAgICAgYmFzZVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihPYmplY3QpO1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY2hhaW4ucHVzaChvYmopO1xuICAgICAgICBpZiAoISgob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaikpICYmIG9iaiAhPT0gT2JqZWN0ICYmIG9iaiAhPT0gYmFzZVByb3RvdHlwZSkpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNoYWluO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gTWl4YWJsZTtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9NaXhhYmxlLmpzLm1hcFxuIiwiLy8gdG9kbyA6IFxuLy8gIHNpbXBsaWZpZWQgZm9ybSA6IEB3aXRob3V0TmFtZSBtZXRob2RcbnZhciBPdmVycmlkZXI7XG5cbm1vZHVsZS5leHBvcnRzID0gT3ZlcnJpZGVyID0gKGZ1bmN0aW9uKCkge1xuICBjbGFzcyBPdmVycmlkZXIge1xuICAgIHN0YXRpYyBvdmVycmlkZXMob3ZlcnJpZGVzKSB7XG4gICAgICByZXR1cm4gdGhpcy5PdmVycmlkZS5hcHBseU1hbnkodGhpcy5wcm90b3R5cGUsIHRoaXMubmFtZSwgb3ZlcnJpZGVzKTtcbiAgICB9XG5cbiAgICBnZXRGaW5hbFByb3BlcnRpZXMoKSB7XG4gICAgICBpZiAodGhpcy5fb3ZlcnJpZGVzICE9IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFsnX292ZXJyaWRlcyddLmNvbmNhdChPYmplY3Qua2V5cyh0aGlzLl9vdmVycmlkZXMpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBleHRlbmRlZCh0YXJnZXQpIHtcbiAgICAgIGlmICh0aGlzLl9vdmVycmlkZXMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmNvbnN0cnVjdG9yLk92ZXJyaWRlLmFwcGx5TWFueSh0YXJnZXQsIHRoaXMuY29uc3RydWN0b3IubmFtZSwgdGhpcy5fb3ZlcnJpZGVzKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yID09PSBPdmVycmlkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldC5leHRlbmRlZCA9IHRoaXMuZXh0ZW5kZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gIH07XG5cbiAgT3ZlcnJpZGVyLk92ZXJyaWRlID0ge1xuICAgIG1ha2VNYW55OiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgb3ZlcnJpZGVzKSB7XG4gICAgICB2YXIgZm4sIGtleSwgb3ZlcnJpZGUsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgZm4gPSBvdmVycmlkZXNba2V5XTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKG92ZXJyaWRlID0gdGhpcy5tYWtlKHRhcmdldCwgbmFtZXNwYWNlLCBrZXksIGZuKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9LFxuICAgIGFwcGx5TWFueTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlcykge1xuICAgICAgdmFyIGtleSwgb3ZlcnJpZGUsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGtleSBpbiBvdmVycmlkZXMpIHtcbiAgICAgICAgb3ZlcnJpZGUgPSBvdmVycmlkZXNba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiBvdmVycmlkZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgb3ZlcnJpZGUgPSB0aGlzLm1ha2UodGFyZ2V0LCBuYW1lc3BhY2UsIGtleSwgb3ZlcnJpZGUpO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmFwcGx5KHRhcmdldCwgbmFtZXNwYWNlLCBvdmVycmlkZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgICBtYWtlOiBmdW5jdGlvbih0YXJnZXQsIG5hbWVzcGFjZSwgZm5OYW1lLCBmbikge1xuICAgICAgdmFyIG92ZXJyaWRlO1xuICAgICAgb3ZlcnJpZGUgPSB7XG4gICAgICAgIGZuOiB7XG4gICAgICAgICAgY3VycmVudDogZm5cbiAgICAgICAgfSxcbiAgICAgICAgbmFtZTogZm5OYW1lXG4gICAgICB9O1xuICAgICAgb3ZlcnJpZGUuZm5bJ3dpdGgnICsgbmFtZXNwYWNlXSA9IGZuO1xuICAgICAgcmV0dXJuIG92ZXJyaWRlO1xuICAgIH0sXG4gICAgZW1wdHlGbjogZnVuY3Rpb24oKSB7fSxcbiAgICBhcHBseTogZnVuY3Rpb24odGFyZ2V0LCBuYW1lc3BhY2UsIG92ZXJyaWRlKSB7XG4gICAgICB2YXIgZm5OYW1lLCBvdmVycmlkZXMsIHJlZiwgcmVmMSwgd2l0aG91dDtcbiAgICAgIGZuTmFtZSA9IG92ZXJyaWRlLm5hbWU7XG4gICAgICBvdmVycmlkZXMgPSB0YXJnZXQuX292ZXJyaWRlcyAhPSBudWxsID8gT2JqZWN0LmFzc2lnbih7fSwgdGFyZ2V0Ll9vdmVycmlkZXMpIDoge307XG4gICAgICB3aXRob3V0ID0gKChyZWYgPSB0YXJnZXQuX292ZXJyaWRlcykgIT0gbnVsbCA/IChyZWYxID0gcmVmW2ZuTmFtZV0pICE9IG51bGwgPyByZWYxLmZuLmN1cnJlbnQgOiB2b2lkIDAgOiB2b2lkIDApIHx8IHRhcmdldFtmbk5hbWVdO1xuICAgICAgb3ZlcnJpZGUgPSBPYmplY3QuYXNzaWduKHt9LCBvdmVycmlkZSk7XG4gICAgICBpZiAob3ZlcnJpZGVzW2ZuTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlc1tmbk5hbWVdLmZuLCBvdmVycmlkZS5mbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdmVycmlkZS5mbiA9IE9iamVjdC5hc3NpZ24oe30sIG92ZXJyaWRlLmZuKTtcbiAgICAgIH1cbiAgICAgIG92ZXJyaWRlLmZuWyd3aXRob3V0JyArIG5hbWVzcGFjZV0gPSB3aXRob3V0IHx8IHRoaXMuZW1wdHlGbjtcbiAgICAgIGlmICh3aXRob3V0ID09IG51bGwpIHtcbiAgICAgICAgb3ZlcnJpZGUubWlzc2luZ1dpdGhvdXQgPSAnd2l0aG91dCcgKyBuYW1lc3BhY2U7XG4gICAgICB9IGVsc2UgaWYgKG92ZXJyaWRlLm1pc3NpbmdXaXRob3V0KSB7XG4gICAgICAgIG92ZXJyaWRlLmZuW292ZXJyaWRlLm1pc3NpbmdXaXRob3V0XSA9IHdpdGhvdXQ7XG4gICAgICB9XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBmbk5hbWUsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBmaW5hbEZuLCBmbiwga2V5LCByZWYyO1xuICAgICAgICAgIGZpbmFsRm4gPSBvdmVycmlkZS5mbi5jdXJyZW50LmJpbmQodGhpcyk7XG4gICAgICAgICAgcmVmMiA9IG92ZXJyaWRlLmZuO1xuICAgICAgICAgIGZvciAoa2V5IGluIHJlZjIpIHtcbiAgICAgICAgICAgIGZuID0gcmVmMltrZXldO1xuICAgICAgICAgICAgZmluYWxGbltrZXldID0gZm4uYmluZCh0aGlzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IucHJvdG90eXBlICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgZm5OYW1lLCB7XG4gICAgICAgICAgICAgIHZhbHVlOiBmaW5hbEZuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbmFsRm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb3ZlcnJpZGVzW2ZuTmFtZV0gPSBvdmVycmlkZTtcbiAgICAgIHJldHVybiB0YXJnZXQuX292ZXJyaWRlcyA9IG92ZXJyaWRlcztcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIE92ZXJyaWRlcjtcblxufSkuY2FsbCh0aGlzKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9PdmVycmlkZXIuanMubWFwXG4iLCJ2YXIgQmluZGVyLCBVcGRhdGVyO1xuXG5CaW5kZXIgPSByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykuQmluZGVyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVwZGF0ZXIgPSBjbGFzcyBVcGRhdGVyIHtcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgIHZhciByZWY7XG4gICAgdGhpcy5jYWxsYmFja3MgPSBbXTtcbiAgICB0aGlzLm5leHQgPSBbXTtcbiAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgaWYgKChvcHRpb25zICE9IG51bGwgPyBvcHRpb25zLmNhbGxiYWNrIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICB0aGlzLmFkZENhbGxiYWNrKG9wdGlvbnMuY2FsbGJhY2spO1xuICAgIH1cbiAgICBpZiAoKG9wdGlvbnMgIT0gbnVsbCA/IChyZWYgPSBvcHRpb25zLmNhbGxiYWNrcykgIT0gbnVsbCA/IHJlZi5mb3JFYWNoIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgICBvcHRpb25zLmNhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdmFyIGNhbGxiYWNrO1xuICAgIHRoaXMudXBkYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMubmV4dCA9IHRoaXMuY2FsbGJhY2tzLnNsaWNlKCk7XG4gICAgd2hpbGUgKHRoaXMuY2FsbGJhY2tzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNhbGxiYWNrID0gdGhpcy5jYWxsYmFja3Muc2hpZnQoKTtcbiAgICAgIHRoaXMucnVuQ2FsbGJhY2soY2FsbGJhY2spO1xuICAgIH1cbiAgICB0aGlzLmNhbGxiYWNrcyA9IHRoaXMubmV4dDtcbiAgICB0aGlzLnVwZGF0aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBydW5DYWxsYmFjayhjYWxsYmFjaykge1xuICAgIHJldHVybiBjYWxsYmFjaygpO1xuICB9XG5cbiAgYWRkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICBpZiAoIXRoaXMuY2FsbGJhY2tzLmluY2x1ZGVzKGNhbGxiYWNrKSkge1xuICAgICAgdGhpcy5jYWxsYmFja3MucHVzaChjYWxsYmFjayk7XG4gICAgfVxuICAgIGlmICh0aGlzLnVwZGF0aW5nICYmICF0aGlzLm5leHQuaW5jbHVkZXMoY2FsbGJhY2spKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xuICAgIH1cbiAgfVxuXG4gIG5leHRUaWNrKGNhbGxiYWNrKSB7XG4gICAgaWYgKHRoaXMudXBkYXRpbmcpIHtcbiAgICAgIGlmICghdGhpcy5uZXh0LmluY2x1ZGVzKGNhbGxiYWNrKSkge1xuICAgICAgICByZXR1cm4gdGhpcy5uZXh0LnB1c2goY2FsbGJhY2spO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGRDYWxsYmFjayhjYWxsYmFjayk7XG4gICAgfVxuICB9XG5cbiAgcmVtb3ZlQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSB0aGlzLmNhbGxiYWNrcy5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICBpbmRleCA9IHRoaXMubmV4dC5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5uZXh0LnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QmluZGVyKCkge1xuICAgIHJldHVybiBuZXcgVXBkYXRlci5CaW5kZXIodGhpcyk7XG4gIH1cblxuICBkZXN0cm95KCkge1xuICAgIHRoaXMuY2FsbGJhY2tzID0gW107XG4gICAgcmV0dXJuIHRoaXMubmV4dCA9IFtdO1xuICB9XG5cbn07XG5cblVwZGF0ZXIuQmluZGVyID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgY2xhc3MgQmluZGVyIGV4dGVuZHMgc3VwZXJDbGFzcyB7XG4gICAgY29uc3RydWN0b3IodGFyZ2V0LCBjYWxsYmFjazEpIHtcbiAgICAgIHN1cGVyKCk7XG4gICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjazE7XG4gICAgfVxuXG4gICAgZ2V0UmVmKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGFyZ2V0OiB0aGlzLnRhcmdldCxcbiAgICAgICAgY2FsbGJhY2s6IHRoaXMuY2FsbGJhY2tcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZG9CaW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LmFkZENhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGRvVW5iaW5kKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0LnJlbW92ZUNhbGxiYWNrKHRoaXMuY2FsbGJhY2spO1xuICAgIH1cblxuICB9O1xuXG4gIHJldHVybiBCaW5kZXI7XG5cbn0pLmNhbGwodGhpcywgQmluZGVyKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bWFwcy9VcGRhdGVyLmpzLm1hcFxuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwiRWxlbWVudFwiOiByZXF1aXJlKFwiLi9FbGVtZW50XCIpLFxuICBcIkxvYWRlclwiOiByZXF1aXJlKFwiLi9Mb2FkZXJcIiksXG4gIFwiTWl4YWJsZVwiOiByZXF1aXJlKFwiLi9NaXhhYmxlXCIpLFxuICBcIk92ZXJyaWRlclwiOiByZXF1aXJlKFwiLi9PdmVycmlkZXJcIiksXG4gIFwiVXBkYXRlclwiOiByZXF1aXJlKFwiLi9VcGRhdGVyXCIpLFxuICBcIkludmFsaWRhdGVkXCI6IHtcbiAgICBcIkFjdGl2YWJsZVByb3BlcnR5V2F0Y2hlclwiOiByZXF1aXJlKFwiLi9JbnZhbGlkYXRlZC9BY3RpdmFibGVQcm9wZXJ0eVdhdGNoZXJcIiksXG4gICAgXCJJbnZhbGlkYXRlZFwiOiByZXF1aXJlKFwiLi9JbnZhbGlkYXRlZC9JbnZhbGlkYXRlZFwiKSxcbiAgfSxcbn0iLCJ2YXIgbGlicztcblxubGlicyA9IHJlcXVpcmUoJy4vbGlicycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAnQ29sbGVjdGlvbic6IHJlcXVpcmUoJ3NwYXJrLWNvbGxlY3Rpb24nKVxufSwgbGlicywgcmVxdWlyZSgnc3BhcmstcHJvcGVydGllcycpLCByZXF1aXJlKCdzcGFyay1iaW5kaW5nJykpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1tYXBzL3NwYXJrLXN0YXJ0ZXIuanMubWFwXG4iLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTsiXX0=
