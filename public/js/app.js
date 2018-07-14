/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.16
 * (c) 2014-2018 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it... e.g.
 * PhantomJS 1.x. Technically we don't need this anymore since native bind is
 * now more performant in most browsers, but removing it would be breaking for
 * code that was able to run in PhantomJS 1.x, so this must be kept for
 * backwards compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
})

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  if (!getter && arguments.length === 2) {
    val = obj[key];
  }
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ("development" !== 'production' &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both microtasks and (macro) tasks.
// In < 2.4 we used microtasks everywhere, but there are some scenarios where
// microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using (macro) tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use microtask by default, but expose a way to force (macro) task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a microtask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$1 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$1; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    hooks[key] = componentVNodeHooks[key];
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    // reset _rendered flag on slots for duplicate slot check
    if (true) {
      for (var key in vm.$slots) {
        // $flow-disable-line
        vm.$slots[key]._rendered = false;
      }
    }

    if (_parentVnode) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ("development" !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ("development" !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
}

var builtInComponents = {
  KeepAlive: KeepAlive
}

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.5.16';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setStyleScope (node, scopeId) {
  node.setAttribute(scopeId, '');
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setStyleScope: setStyleScope
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
}

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!isDef(key)) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;

  function createElm (
    vnode,
    insertedVnodeQueue,
    parentElm,
    refElm,
    nested,
    ownerArray,
    index
  ) {
    if (isDef(vnode.elm) && isDef(ownerArray)) {
      // This vnode was used in a previous render!
      // now it's used as a new node, overwriting its elm would cause
      // potential patch errors down the road when it's used as an insertion
      // reference node. Instead, we clone the node on-demand before creating
      // associated DOM element for it.
      vnode = ownerArray[index] = cloneVNode(vnode);
    }

    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }

      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (true) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setStyleScope(vnode.elm, i);
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setStyleScope(vnode.elm, i);
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setStyleScope(vnode.elm, i);
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (true) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
}

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
]

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (el.tagName.indexOf('-') > -1) {
    baseSetAttr(el, key, value);
  } else if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    baseSetAttr(el, key, value);
  }
}

function baseSetAttr (el, key, value) {
  if (isFalsyAttrValue(value)) {
    el.removeAttribute(key);
  } else {
    // #7138: IE10 & 11 fires input event when setting placeholder on
    // <textarea>... block the first input event and remove the blocker
    // immediately.
    /* istanbul ignore if */
    if (
      isIE && !isIE9 &&
      el.tagName === 'TEXTAREA' &&
      key === 'placeholder' && !el.__ieph
    ) {
      var blocker = function (e) {
        e.stopImmediatePropagation();
        el.removeEventListener('input', blocker);
      };
      el.addEventListener('input', blocker);
      // $flow-disable-line
      el.__ieph = true; /* IE placeholder patched */
    }
    el.setAttribute(key, value);
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
}

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
}

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + (args !== ')' ? ',' + args : args))
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
  el.plain = false;
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
  el.plain = false;
}

// add a raw attr (use this in preTransforms)
function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
  el.plain = false;
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = {
    value: value.trim()
  };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }

  el.plain = false;
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
      "? " + baseValueExpression + ".trim()" +
      ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  // Fix https://github.com/vuejs/vue/pull/7730
  // allow v-model="obj.val " (trailing whitespace)
  val = val.trim();
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
    "?_i(" + value + "," + valueBinding + ")>-1" + (
      trueValueBinding === 'true'
        ? (":(" + value + ")")
        : (":_q(" + value + "," + trueValueBinding + ")")
    )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + (genAssignmentCode(value, '$$a.concat([$$v])')) + ")}" +
      "else{$$i>-1&&(" + (genAssignmentCode(value, '$$a.slice(0,$$i).concat($$a.slice($$i+1))')) + ")}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  // except for inputs with v-bind:type
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    var typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
    if (value$1 && !typeBinding) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
}

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
}

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      removeTransitionClass(el, startClass);
      if (!cb.cancelled) {
        addTransitionClass(el, toClass);
        if (!userWantsControl) {
          if (isValidDuration(explicitEnterDuration)) {
            setTimeout(cb, explicitEnterDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled) {
          addTransitionClass(el, leaveToClass);
          if (!userWantsControl) {
            if (isValidDuration(explicitLeaveDuration)) {
              setTimeout(cb, explicitLeaveDuration);
            } else {
              whenTransitionEnds(el, type, cb);
            }
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {}

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
]

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        el.addEventListener('compositionstart', onCompositionStart);
        el.addEventListener('compositionend', onCompositionEnd);
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (!value === !oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
}

var platformDirectives = {
  model: directive,
  show: show
}

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
}

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
}

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
}

/*  */

// install platform specific utils
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(function () {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue);
      } else if (
        "development" !== 'production' &&
        "development" !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        );
      }
    }
    if ("development" !== 'production' &&
      "development" !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        "You are running Vue in development mode.\n" +
        "Make sure to turn on production mode when deploying for production.\n" +
        "See more tips at https://vuejs.org/guide/deployment.html"
      );
    }
  }, 0);
}

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});



function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var rawTokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index, tokenValue;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      rawTokens.push(tokenValue = text.slice(lastIndex, index));
      tokens.push(JSON.stringify(tokenValue));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    rawTokens.push({ '@binding': exp });
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex));
    tokens.push(JSON.stringify(tokenValue));
  }
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var res = parseText(staticClass, options.delimiters);
    if (res) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
}

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var res = parseText(staticStyle, options.delimiters);
      if (res) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
}

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
}

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
// #7298: escape - to avoid being pased as HTML comment when inlined in page
var comment = /^<!\--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!\--([\s\S]*?)-->/g, '$1') // #7298
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /([^]*?)\s+(?:in|of)\s+([^]*)/;
var forIteratorRE = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function closeElement (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
    // apply post-transforms
    for (var i = 0; i < postTransforms.length; i++) {
      postTransforms[i](element, options);
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        closeElement(element);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      closeElement(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var res;
        if (!inVPre && text !== ' ' && (res = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: res.expression,
            tokens: res.tokens,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var res = parseFor(exp);
    if (res) {
      extend(el, res);
    } else if (true) {
      warn$2(
        ("Invalid v-for expression: " + exp)
      );
    }
  }
}



function parseFor (exp) {
  var inMatch = exp.match(forAliasRE);
  if (!inMatch) { return }
  var res = {};
  res.for = inMatch[2].trim();
  var alias = inMatch[1].trim().replace(stripParensRE, '');
  var iteratorMatch = alias.match(forIteratorRE);
  if (iteratorMatch) {
    res.alias = alias.replace(forIteratorRE, '');
    res.iterator1 = iteratorMatch[1].trim();
    if (iteratorMatch[2]) {
      res.iterator2 = iteratorMatch[2].trim();
    }
  } else {
    res.alias = alias;
  }
  return res
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var res = parseText(value, delimiters);
        if (res) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (!map['v-model']) {
      return
    }

    var typeBinding;
    if (map[':type'] || map['v-bind:type']) {
      typeBinding = getBindingAttr(el, 'type');
    }
    if (!map.type && !typeBinding && map['v-bind']) {
      typeBinding = "(" + (map['v-bind']) + ").type";
    }

    if (typeBinding) {
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

var model$2 = {
  preTransformNode: preTransformNode
}

var modules$1 = [
  klass$1,
  style$1,
  model$2
]

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
}

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/;

// KeyboardEvent.keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// KeyboardEvent.key aliases
var keyNames = {
  esc: 'Escape',
  tab: 'Tab',
  enter: 'Enter',
  space: ' ',
  // #7806: IE11 uses key names without `Arrow` prefix for arrow keys.
  up: ['Up', 'ArrowUp'],
  left: ['Left', 'ArrowLeft'],
  right: ['Right', 'ArrowRight'],
  down: ['Down', 'ArrowDown'],
  'delete': ['Backspace', 'Delete']
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    if (isMethodPath || isFunctionExpression) {
      return handler.value
    }
    /* istanbul ignore if */
    return ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? ("return " + (handler.value) + "($event)")
      : isFunctionExpression
        ? ("return (" + (handler.value) + ")($event)")
        : handler.value;
    /* istanbul ignore if */
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var keyCode = keyCodes[key];
  var keyName = keyNames[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(keyCode)) + "," +
    "$event.key," +
    "" + (JSON.stringify(keyName)) +
    ")"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
}

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    /* istanbul ignore if */
    {
      res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
    }
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives || null),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  if (options.optimize !== false) {
    optimize(ast, options);
  }
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue.prototype.$mount;
Vue.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue.compile = compileToFunctions;

module.exports = Vue;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(5).setImmediate))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
module.exports = __webpack_require__(16);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__router__ = __webpack_require__(10);





new __WEBPACK_IMPORTED_MODULE_0_vue___default.a({
	el: '#app',
	router: __WEBPACK_IMPORTED_MODULE_2__router__["a" /* default */],
	render: function render(h) {
		return h(__WEBPACK_IMPORTED_MODULE_1__components_App___default.a);
	}
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
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

// setimmediate attaches itself to the global object
__webpack_require__(6);
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(7)))

/***/ }),
/* 7 */
/***/ (function(module, exports) {

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(9)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8142f38c", Component.options)
  } else {
    hotAPI.reload("data-v-8142f38c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("router-view")
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-8142f38c", module.exports)
  }
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_login_login___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__pages_login_login__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_register_register__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_register_register___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__pages_register_register__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__pages_home_home__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_users_users__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_users_users___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__pages_users_users__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_account_account__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_account_account___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__pages_account_account__);



__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);







var routes = [{
	path: '/login',
	name: 'app.login',
	component: __WEBPACK_IMPORTED_MODULE_2__pages_login_login___default.a
}, {
	path: '/register',
	name: 'app.register',
	component: __WEBPACK_IMPORTED_MODULE_3__pages_register_register___default.a
}, {
	path: '/',
	name: 'app.home',
	component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home___default.a
}, {
	path: '/users',
	name: 'app.users',
	component: __WEBPACK_IMPORTED_MODULE_5__pages_users_users___default.a
}, {
	path: '/account',
	name: 'app.account',
	component: __WEBPACK_IMPORTED_MODULE_6__pages_account_account___default.a
}];

var router = new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	mode: 'history',
	routes: routes
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (true) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(27)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(32)
/* template */
var __vue_template__ = __webpack_require__(31)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-ad49e094"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/login/login.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ad49e094", Component.options)
  } else {
    hotAPI.reload("data-v-ad49e094", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(15)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/home/home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1bdd3742", Component.options)
  } else {
    hotAPI.reload("data-v-1bdd3742", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", [_vm._v("home")])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1bdd3742", module.exports)
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(22)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/register/register.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d0c35e7c", Component.options)
  } else {
    hotAPI.reload("data-v-d0c35e7c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", [_vm._v("register")])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d0c35e7c", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(24)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/users/users.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25fb6ab4", Component.options)
  } else {
    hotAPI.reload("data-v-25fb6ab4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", [_vm._v("users")])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-25fb6ab4", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(26)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/pages/account/account.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7757493e", Component.options)
  } else {
    hotAPI.reload("data-v-7757493e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("p", [_vm._v("account")])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7757493e", module.exports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(29)("0151299a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad49e094\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-ad49e094\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/sass-loader/lib/loader.js!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./login.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(18)(false);
// imports


// module
exports.push([module.i, "\n.list-reset[data-v-ad49e094] {\n  list-style: none;\n  padding: 0;\n}\n.appearance-none[data-v-ad49e094] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n}\n.bg-fixed[data-v-ad49e094] {\n  background-attachment: fixed;\n}\n.bg-local[data-v-ad49e094] {\n  background-attachment: local;\n}\n.bg-scroll[data-v-ad49e094] {\n  background-attachment: scroll;\n}\n.bg-transparent[data-v-ad49e094] {\n  background-color: transparent;\n}\n.bg-black[data-v-ad49e094] {\n  background-color: #22292f;\n}\n.bg-grey-darkest[data-v-ad49e094] {\n  background-color: #3d4852;\n}\n.bg-grey-darker[data-v-ad49e094] {\n  background-color: #606f7b;\n}\n.bg-grey-dark[data-v-ad49e094] {\n  background-color: #8795a1;\n}\n.bg-grey[data-v-ad49e094] {\n  background-color: #b8c2cc;\n}\n.bg-grey-light[data-v-ad49e094] {\n  background-color: #dae1e7;\n}\n.bg-grey-lighter[data-v-ad49e094] {\n  background-color: #f1f5f8;\n}\n.bg-grey-lightest[data-v-ad49e094] {\n  background-color: #f8fafc;\n}\n.bg-white[data-v-ad49e094] {\n  background-color: #fff;\n}\n.bg-red-darkest[data-v-ad49e094] {\n  background-color: #3b0d0c;\n}\n.bg-red-darker[data-v-ad49e094] {\n  background-color: #621b18;\n}\n.bg-red-dark[data-v-ad49e094] {\n  background-color: #cc1f1a;\n}\n.bg-red[data-v-ad49e094] {\n  background-color: #e3342f;\n}\n.bg-red-light[data-v-ad49e094] {\n  background-color: #ef5753;\n}\n.bg-red-lighter[data-v-ad49e094] {\n  background-color: #f9acaa;\n}\n.bg-red-lightest[data-v-ad49e094] {\n  background-color: #fcebea;\n}\n.bg-orange-darkest[data-v-ad49e094] {\n  background-color: #462a16;\n}\n.bg-orange-darker[data-v-ad49e094] {\n  background-color: #613b1f;\n}\n.bg-orange-dark[data-v-ad49e094] {\n  background-color: #de751f;\n}\n.bg-orange[data-v-ad49e094] {\n  background-color: #f6993f;\n}\n.bg-orange-light[data-v-ad49e094] {\n  background-color: #faad63;\n}\n.bg-orange-lighter[data-v-ad49e094] {\n  background-color: #fcd9b6;\n}\n.bg-orange-lightest[data-v-ad49e094] {\n  background-color: #fff5eb;\n}\n.bg-yellow-darkest[data-v-ad49e094] {\n  background-color: #453411;\n}\n.bg-yellow-darker[data-v-ad49e094] {\n  background-color: #684f1d;\n}\n.bg-yellow-dark[data-v-ad49e094] {\n  background-color: #f2d024;\n}\n.bg-yellow[data-v-ad49e094] {\n  background-color: #ffed4a;\n}\n.bg-yellow-light[data-v-ad49e094] {\n  background-color: #fff382;\n}\n.bg-yellow-lighter[data-v-ad49e094] {\n  background-color: #fff9c2;\n}\n.bg-yellow-lightest[data-v-ad49e094] {\n  background-color: #fcfbeb;\n}\n.bg-green-darkest[data-v-ad49e094] {\n  background-color: #0f2f21;\n}\n.bg-green-darker[data-v-ad49e094] {\n  background-color: #1a4731;\n}\n.bg-green-dark[data-v-ad49e094] {\n  background-color: #1f9d55;\n}\n.bg-green[data-v-ad49e094] {\n  background-color: #38c172;\n}\n.bg-green-light[data-v-ad49e094] {\n  background-color: #51d88a;\n}\n.bg-green-lighter[data-v-ad49e094] {\n  background-color: #a2f5bf;\n}\n.bg-green-lightest[data-v-ad49e094] {\n  background-color: #e3fcec;\n}\n.bg-teal-darkest[data-v-ad49e094] {\n  background-color: #0d3331;\n}\n.bg-teal-darker[data-v-ad49e094] {\n  background-color: #20504f;\n}\n.bg-teal-dark[data-v-ad49e094] {\n  background-color: #38a89d;\n}\n.bg-teal[data-v-ad49e094] {\n  background-color: #4dc0b5;\n}\n.bg-teal-light[data-v-ad49e094] {\n  background-color: #64d5ca;\n}\n.bg-teal-lighter[data-v-ad49e094] {\n  background-color: #a0f0ed;\n}\n.bg-teal-lightest[data-v-ad49e094] {\n  background-color: #e8fffe;\n}\n.bg-blue-darkest[data-v-ad49e094] {\n  background-color: #12283a;\n}\n.bg-blue-darker[data-v-ad49e094] {\n  background-color: #1c3d5a;\n}\n.bg-blue-dark[data-v-ad49e094] {\n  background-color: #2779bd;\n}\n.bg-blue[data-v-ad49e094] {\n  background-color: #3490dc;\n}\n.bg-blue-light[data-v-ad49e094] {\n  background-color: #6cb2eb;\n}\n.bg-blue-lighter[data-v-ad49e094] {\n  background-color: #bcdefa;\n}\n.bg-blue-lightest[data-v-ad49e094] {\n  background-color: #eff8ff;\n}\n.bg-indigo-darkest[data-v-ad49e094] {\n  background-color: #191e38;\n}\n.bg-indigo-darker[data-v-ad49e094] {\n  background-color: #2f365f;\n}\n.bg-indigo-dark[data-v-ad49e094] {\n  background-color: #5661b3;\n}\n.bg-indigo[data-v-ad49e094] {\n  background-color: #6574cd;\n}\n.bg-indigo-light[data-v-ad49e094] {\n  background-color: #7886d7;\n}\n.bg-indigo-lighter[data-v-ad49e094] {\n  background-color: #b2b7ff;\n}\n.bg-indigo-lightest[data-v-ad49e094] {\n  background-color: #e6e8ff;\n}\n.bg-purple-darkest[data-v-ad49e094] {\n  background-color: #21183c;\n}\n.bg-purple-darker[data-v-ad49e094] {\n  background-color: #382b5f;\n}\n.bg-purple-dark[data-v-ad49e094] {\n  background-color: #794acf;\n}\n.bg-purple[data-v-ad49e094] {\n  background-color: #9561e2;\n}\n.bg-purple-light[data-v-ad49e094] {\n  background-color: #a779e9;\n}\n.bg-purple-lighter[data-v-ad49e094] {\n  background-color: #d6bbfc;\n}\n.bg-purple-lightest[data-v-ad49e094] {\n  background-color: #f3ebff;\n}\n.bg-pink-darkest[data-v-ad49e094] {\n  background-color: #451225;\n}\n.bg-pink-darker[data-v-ad49e094] {\n  background-color: #6f213f;\n}\n.bg-pink-dark[data-v-ad49e094] {\n  background-color: #eb5286;\n}\n.bg-pink[data-v-ad49e094] {\n  background-color: #f66d9b;\n}\n.bg-pink-light[data-v-ad49e094] {\n  background-color: #fa7ea8;\n}\n.bg-pink-lighter[data-v-ad49e094] {\n  background-color: #ffbbca;\n}\n.bg-pink-lightest[data-v-ad49e094] {\n  background-color: #ffebef;\n}\n.hover\\:bg-transparent[data-v-ad49e094]:hover {\n  background-color: transparent;\n}\n.hover\\:bg-black[data-v-ad49e094]:hover {\n  background-color: #22292f;\n}\n.hover\\:bg-grey-darkest[data-v-ad49e094]:hover {\n  background-color: #3d4852;\n}\n.hover\\:bg-grey-darker[data-v-ad49e094]:hover {\n  background-color: #606f7b;\n}\n.hover\\:bg-grey-dark[data-v-ad49e094]:hover {\n  background-color: #8795a1;\n}\n.hover\\:bg-grey[data-v-ad49e094]:hover {\n  background-color: #b8c2cc;\n}\n.hover\\:bg-grey-light[data-v-ad49e094]:hover {\n  background-color: #dae1e7;\n}\n.hover\\:bg-grey-lighter[data-v-ad49e094]:hover {\n  background-color: #f1f5f8;\n}\n.hover\\:bg-grey-lightest[data-v-ad49e094]:hover {\n  background-color: #f8fafc;\n}\n.hover\\:bg-white[data-v-ad49e094]:hover {\n  background-color: #fff;\n}\n.hover\\:bg-red-darkest[data-v-ad49e094]:hover {\n  background-color: #3b0d0c;\n}\n.hover\\:bg-red-darker[data-v-ad49e094]:hover {\n  background-color: #621b18;\n}\n.hover\\:bg-red-dark[data-v-ad49e094]:hover {\n  background-color: #cc1f1a;\n}\n.hover\\:bg-red[data-v-ad49e094]:hover {\n  background-color: #e3342f;\n}\n.hover\\:bg-red-light[data-v-ad49e094]:hover {\n  background-color: #ef5753;\n}\n.hover\\:bg-red-lighter[data-v-ad49e094]:hover {\n  background-color: #f9acaa;\n}\n.hover\\:bg-red-lightest[data-v-ad49e094]:hover {\n  background-color: #fcebea;\n}\n.hover\\:bg-orange-darkest[data-v-ad49e094]:hover {\n  background-color: #462a16;\n}\n.hover\\:bg-orange-darker[data-v-ad49e094]:hover {\n  background-color: #613b1f;\n}\n.hover\\:bg-orange-dark[data-v-ad49e094]:hover {\n  background-color: #de751f;\n}\n.hover\\:bg-orange[data-v-ad49e094]:hover {\n  background-color: #f6993f;\n}\n.hover\\:bg-orange-light[data-v-ad49e094]:hover {\n  background-color: #faad63;\n}\n.hover\\:bg-orange-lighter[data-v-ad49e094]:hover {\n  background-color: #fcd9b6;\n}\n.hover\\:bg-orange-lightest[data-v-ad49e094]:hover {\n  background-color: #fff5eb;\n}\n.hover\\:bg-yellow-darkest[data-v-ad49e094]:hover {\n  background-color: #453411;\n}\n.hover\\:bg-yellow-darker[data-v-ad49e094]:hover {\n  background-color: #684f1d;\n}\n.hover\\:bg-yellow-dark[data-v-ad49e094]:hover {\n  background-color: #f2d024;\n}\n.hover\\:bg-yellow[data-v-ad49e094]:hover {\n  background-color: #ffed4a;\n}\n.hover\\:bg-yellow-light[data-v-ad49e094]:hover {\n  background-color: #fff382;\n}\n.hover\\:bg-yellow-lighter[data-v-ad49e094]:hover {\n  background-color: #fff9c2;\n}\n.hover\\:bg-yellow-lightest[data-v-ad49e094]:hover {\n  background-color: #fcfbeb;\n}\n.hover\\:bg-green-darkest[data-v-ad49e094]:hover {\n  background-color: #0f2f21;\n}\n.hover\\:bg-green-darker[data-v-ad49e094]:hover {\n  background-color: #1a4731;\n}\n.hover\\:bg-green-dark[data-v-ad49e094]:hover {\n  background-color: #1f9d55;\n}\n.hover\\:bg-green[data-v-ad49e094]:hover {\n  background-color: #38c172;\n}\n.hover\\:bg-green-light[data-v-ad49e094]:hover {\n  background-color: #51d88a;\n}\n.hover\\:bg-green-lighter[data-v-ad49e094]:hover {\n  background-color: #a2f5bf;\n}\n.hover\\:bg-green-lightest[data-v-ad49e094]:hover {\n  background-color: #e3fcec;\n}\n.hover\\:bg-teal-darkest[data-v-ad49e094]:hover {\n  background-color: #0d3331;\n}\n.hover\\:bg-teal-darker[data-v-ad49e094]:hover {\n  background-color: #20504f;\n}\n.hover\\:bg-teal-dark[data-v-ad49e094]:hover {\n  background-color: #38a89d;\n}\n.hover\\:bg-teal[data-v-ad49e094]:hover {\n  background-color: #4dc0b5;\n}\n.hover\\:bg-teal-light[data-v-ad49e094]:hover {\n  background-color: #64d5ca;\n}\n.hover\\:bg-teal-lighter[data-v-ad49e094]:hover {\n  background-color: #a0f0ed;\n}\n.hover\\:bg-teal-lightest[data-v-ad49e094]:hover {\n  background-color: #e8fffe;\n}\n.hover\\:bg-blue-darkest[data-v-ad49e094]:hover {\n  background-color: #12283a;\n}\n.hover\\:bg-blue-darker[data-v-ad49e094]:hover {\n  background-color: #1c3d5a;\n}\n.hover\\:bg-blue-dark[data-v-ad49e094]:hover {\n  background-color: #2779bd;\n}\n.hover\\:bg-blue[data-v-ad49e094]:hover {\n  background-color: #3490dc;\n}\n.hover\\:bg-blue-light[data-v-ad49e094]:hover {\n  background-color: #6cb2eb;\n}\n.hover\\:bg-blue-lighter[data-v-ad49e094]:hover {\n  background-color: #bcdefa;\n}\n.hover\\:bg-blue-lightest[data-v-ad49e094]:hover {\n  background-color: #eff8ff;\n}\n.hover\\:bg-indigo-darkest[data-v-ad49e094]:hover {\n  background-color: #191e38;\n}\n.hover\\:bg-indigo-darker[data-v-ad49e094]:hover {\n  background-color: #2f365f;\n}\n.hover\\:bg-indigo-dark[data-v-ad49e094]:hover {\n  background-color: #5661b3;\n}\n.hover\\:bg-indigo[data-v-ad49e094]:hover {\n  background-color: #6574cd;\n}\n.hover\\:bg-indigo-light[data-v-ad49e094]:hover {\n  background-color: #7886d7;\n}\n.hover\\:bg-indigo-lighter[data-v-ad49e094]:hover {\n  background-color: #b2b7ff;\n}\n.hover\\:bg-indigo-lightest[data-v-ad49e094]:hover {\n  background-color: #e6e8ff;\n}\n.hover\\:bg-purple-darkest[data-v-ad49e094]:hover {\n  background-color: #21183c;\n}\n.hover\\:bg-purple-darker[data-v-ad49e094]:hover {\n  background-color: #382b5f;\n}\n.hover\\:bg-purple-dark[data-v-ad49e094]:hover {\n  background-color: #794acf;\n}\n.hover\\:bg-purple[data-v-ad49e094]:hover {\n  background-color: #9561e2;\n}\n.hover\\:bg-purple-light[data-v-ad49e094]:hover {\n  background-color: #a779e9;\n}\n.hover\\:bg-purple-lighter[data-v-ad49e094]:hover {\n  background-color: #d6bbfc;\n}\n.hover\\:bg-purple-lightest[data-v-ad49e094]:hover {\n  background-color: #f3ebff;\n}\n.hover\\:bg-pink-darkest[data-v-ad49e094]:hover {\n  background-color: #451225;\n}\n.hover\\:bg-pink-darker[data-v-ad49e094]:hover {\n  background-color: #6f213f;\n}\n.hover\\:bg-pink-dark[data-v-ad49e094]:hover {\n  background-color: #eb5286;\n}\n.hover\\:bg-pink[data-v-ad49e094]:hover {\n  background-color: #f66d9b;\n}\n.hover\\:bg-pink-light[data-v-ad49e094]:hover {\n  background-color: #fa7ea8;\n}\n.hover\\:bg-pink-lighter[data-v-ad49e094]:hover {\n  background-color: #ffbbca;\n}\n.hover\\:bg-pink-lightest[data-v-ad49e094]:hover {\n  background-color: #ffebef;\n}\n.focus\\:bg-transparent[data-v-ad49e094]:focus {\n  background-color: transparent;\n}\n.focus\\:bg-black[data-v-ad49e094]:focus {\n  background-color: #22292f;\n}\n.focus\\:bg-grey-darkest[data-v-ad49e094]:focus {\n  background-color: #3d4852;\n}\n.focus\\:bg-grey-darker[data-v-ad49e094]:focus {\n  background-color: #606f7b;\n}\n.focus\\:bg-grey-dark[data-v-ad49e094]:focus {\n  background-color: #8795a1;\n}\n.focus\\:bg-grey[data-v-ad49e094]:focus {\n  background-color: #b8c2cc;\n}\n.focus\\:bg-grey-light[data-v-ad49e094]:focus {\n  background-color: #dae1e7;\n}\n.focus\\:bg-grey-lighter[data-v-ad49e094]:focus {\n  background-color: #f1f5f8;\n}\n.focus\\:bg-grey-lightest[data-v-ad49e094]:focus {\n  background-color: #f8fafc;\n}\n.focus\\:bg-white[data-v-ad49e094]:focus {\n  background-color: #fff;\n}\n.focus\\:bg-red-darkest[data-v-ad49e094]:focus {\n  background-color: #3b0d0c;\n}\n.focus\\:bg-red-darker[data-v-ad49e094]:focus {\n  background-color: #621b18;\n}\n.focus\\:bg-red-dark[data-v-ad49e094]:focus {\n  background-color: #cc1f1a;\n}\n.focus\\:bg-red[data-v-ad49e094]:focus {\n  background-color: #e3342f;\n}\n.focus\\:bg-red-light[data-v-ad49e094]:focus {\n  background-color: #ef5753;\n}\n.focus\\:bg-red-lighter[data-v-ad49e094]:focus {\n  background-color: #f9acaa;\n}\n.focus\\:bg-red-lightest[data-v-ad49e094]:focus {\n  background-color: #fcebea;\n}\n.focus\\:bg-orange-darkest[data-v-ad49e094]:focus {\n  background-color: #462a16;\n}\n.focus\\:bg-orange-darker[data-v-ad49e094]:focus {\n  background-color: #613b1f;\n}\n.focus\\:bg-orange-dark[data-v-ad49e094]:focus {\n  background-color: #de751f;\n}\n.focus\\:bg-orange[data-v-ad49e094]:focus {\n  background-color: #f6993f;\n}\n.focus\\:bg-orange-light[data-v-ad49e094]:focus {\n  background-color: #faad63;\n}\n.focus\\:bg-orange-lighter[data-v-ad49e094]:focus {\n  background-color: #fcd9b6;\n}\n.focus\\:bg-orange-lightest[data-v-ad49e094]:focus {\n  background-color: #fff5eb;\n}\n.focus\\:bg-yellow-darkest[data-v-ad49e094]:focus {\n  background-color: #453411;\n}\n.focus\\:bg-yellow-darker[data-v-ad49e094]:focus {\n  background-color: #684f1d;\n}\n.focus\\:bg-yellow-dark[data-v-ad49e094]:focus {\n  background-color: #f2d024;\n}\n.focus\\:bg-yellow[data-v-ad49e094]:focus {\n  background-color: #ffed4a;\n}\n.focus\\:bg-yellow-light[data-v-ad49e094]:focus {\n  background-color: #fff382;\n}\n.focus\\:bg-yellow-lighter[data-v-ad49e094]:focus {\n  background-color: #fff9c2;\n}\n.focus\\:bg-yellow-lightest[data-v-ad49e094]:focus {\n  background-color: #fcfbeb;\n}\n.focus\\:bg-green-darkest[data-v-ad49e094]:focus {\n  background-color: #0f2f21;\n}\n.focus\\:bg-green-darker[data-v-ad49e094]:focus {\n  background-color: #1a4731;\n}\n.focus\\:bg-green-dark[data-v-ad49e094]:focus {\n  background-color: #1f9d55;\n}\n.focus\\:bg-green[data-v-ad49e094]:focus {\n  background-color: #38c172;\n}\n.focus\\:bg-green-light[data-v-ad49e094]:focus {\n  background-color: #51d88a;\n}\n.focus\\:bg-green-lighter[data-v-ad49e094]:focus {\n  background-color: #a2f5bf;\n}\n.focus\\:bg-green-lightest[data-v-ad49e094]:focus {\n  background-color: #e3fcec;\n}\n.focus\\:bg-teal-darkest[data-v-ad49e094]:focus {\n  background-color: #0d3331;\n}\n.focus\\:bg-teal-darker[data-v-ad49e094]:focus {\n  background-color: #20504f;\n}\n.focus\\:bg-teal-dark[data-v-ad49e094]:focus {\n  background-color: #38a89d;\n}\n.focus\\:bg-teal[data-v-ad49e094]:focus {\n  background-color: #4dc0b5;\n}\n.focus\\:bg-teal-light[data-v-ad49e094]:focus {\n  background-color: #64d5ca;\n}\n.focus\\:bg-teal-lighter[data-v-ad49e094]:focus {\n  background-color: #a0f0ed;\n}\n.focus\\:bg-teal-lightest[data-v-ad49e094]:focus {\n  background-color: #e8fffe;\n}\n.focus\\:bg-blue-darkest[data-v-ad49e094]:focus {\n  background-color: #12283a;\n}\n.focus\\:bg-blue-darker[data-v-ad49e094]:focus {\n  background-color: #1c3d5a;\n}\n.focus\\:bg-blue-dark[data-v-ad49e094]:focus {\n  background-color: #2779bd;\n}\n.focus\\:bg-blue[data-v-ad49e094]:focus {\n  background-color: #3490dc;\n}\n.focus\\:bg-blue-light[data-v-ad49e094]:focus {\n  background-color: #6cb2eb;\n}\n.focus\\:bg-blue-lighter[data-v-ad49e094]:focus {\n  background-color: #bcdefa;\n}\n.focus\\:bg-blue-lightest[data-v-ad49e094]:focus {\n  background-color: #eff8ff;\n}\n.focus\\:bg-indigo-darkest[data-v-ad49e094]:focus {\n  background-color: #191e38;\n}\n.focus\\:bg-indigo-darker[data-v-ad49e094]:focus {\n  background-color: #2f365f;\n}\n.focus\\:bg-indigo-dark[data-v-ad49e094]:focus {\n  background-color: #5661b3;\n}\n.focus\\:bg-indigo[data-v-ad49e094]:focus {\n  background-color: #6574cd;\n}\n.focus\\:bg-indigo-light[data-v-ad49e094]:focus {\n  background-color: #7886d7;\n}\n.focus\\:bg-indigo-lighter[data-v-ad49e094]:focus {\n  background-color: #b2b7ff;\n}\n.focus\\:bg-indigo-lightest[data-v-ad49e094]:focus {\n  background-color: #e6e8ff;\n}\n.focus\\:bg-purple-darkest[data-v-ad49e094]:focus {\n  background-color: #21183c;\n}\n.focus\\:bg-purple-darker[data-v-ad49e094]:focus {\n  background-color: #382b5f;\n}\n.focus\\:bg-purple-dark[data-v-ad49e094]:focus {\n  background-color: #794acf;\n}\n.focus\\:bg-purple[data-v-ad49e094]:focus {\n  background-color: #9561e2;\n}\n.focus\\:bg-purple-light[data-v-ad49e094]:focus {\n  background-color: #a779e9;\n}\n.focus\\:bg-purple-lighter[data-v-ad49e094]:focus {\n  background-color: #d6bbfc;\n}\n.focus\\:bg-purple-lightest[data-v-ad49e094]:focus {\n  background-color: #f3ebff;\n}\n.focus\\:bg-pink-darkest[data-v-ad49e094]:focus {\n  background-color: #451225;\n}\n.focus\\:bg-pink-darker[data-v-ad49e094]:focus {\n  background-color: #6f213f;\n}\n.focus\\:bg-pink-dark[data-v-ad49e094]:focus {\n  background-color: #eb5286;\n}\n.focus\\:bg-pink[data-v-ad49e094]:focus {\n  background-color: #f66d9b;\n}\n.focus\\:bg-pink-light[data-v-ad49e094]:focus {\n  background-color: #fa7ea8;\n}\n.focus\\:bg-pink-lighter[data-v-ad49e094]:focus {\n  background-color: #ffbbca;\n}\n.focus\\:bg-pink-lightest[data-v-ad49e094]:focus {\n  background-color: #ffebef;\n}\n.bg-bottom[data-v-ad49e094] {\n  background-position: bottom;\n}\n.bg-center[data-v-ad49e094] {\n  background-position: center;\n}\n.bg-left[data-v-ad49e094] {\n  background-position: left;\n}\n.bg-left-bottom[data-v-ad49e094] {\n  background-position: left bottom;\n}\n.bg-left-top[data-v-ad49e094] {\n  background-position: left top;\n}\n.bg-right[data-v-ad49e094] {\n  background-position: right;\n}\n.bg-right-bottom[data-v-ad49e094] {\n  background-position: right bottom;\n}\n.bg-right-top[data-v-ad49e094] {\n  background-position: right top;\n}\n.bg-top[data-v-ad49e094] {\n  background-position: top;\n}\n.bg-repeat[data-v-ad49e094] {\n  background-repeat: repeat;\n}\n.bg-no-repeat[data-v-ad49e094] {\n  background-repeat: no-repeat;\n}\n.bg-repeat-x[data-v-ad49e094] {\n  background-repeat: repeat-x;\n}\n.bg-repeat-y[data-v-ad49e094] {\n  background-repeat: repeat-y;\n}\n.bg-auto[data-v-ad49e094] {\n  background-size: auto;\n}\n.bg-cover[data-v-ad49e094] {\n  background-size: cover;\n}\n.bg-contain[data-v-ad49e094] {\n  background-size: contain;\n}\n.border-collapse[data-v-ad49e094] {\n  border-collapse: collapse;\n}\n.border-separate[data-v-ad49e094] {\n  border-collapse: separate;\n}\n.border-transparent[data-v-ad49e094] {\n  border-color: transparent;\n}\n.border-black[data-v-ad49e094] {\n  border-color: #22292f;\n}\n.border-grey-darkest[data-v-ad49e094] {\n  border-color: #3d4852;\n}\n.border-grey-darker[data-v-ad49e094] {\n  border-color: #606f7b;\n}\n.border-grey-dark[data-v-ad49e094] {\n  border-color: #8795a1;\n}\n.border-grey[data-v-ad49e094] {\n  border-color: #b8c2cc;\n}\n.border-grey-light[data-v-ad49e094] {\n  border-color: #dae1e7;\n}\n.border-grey-lighter[data-v-ad49e094] {\n  border-color: #f1f5f8;\n}\n.border-grey-lightest[data-v-ad49e094] {\n  border-color: #f8fafc;\n}\n.border-white[data-v-ad49e094] {\n  border-color: #fff;\n}\n.border-red-darkest[data-v-ad49e094] {\n  border-color: #3b0d0c;\n}\n.border-red-darker[data-v-ad49e094] {\n  border-color: #621b18;\n}\n.border-red-dark[data-v-ad49e094] {\n  border-color: #cc1f1a;\n}\n.border-red[data-v-ad49e094] {\n  border-color: #e3342f;\n}\n.border-red-light[data-v-ad49e094] {\n  border-color: #ef5753;\n}\n.border-red-lighter[data-v-ad49e094] {\n  border-color: #f9acaa;\n}\n.border-red-lightest[data-v-ad49e094] {\n  border-color: #fcebea;\n}\n.border-orange-darkest[data-v-ad49e094] {\n  border-color: #462a16;\n}\n.border-orange-darker[data-v-ad49e094] {\n  border-color: #613b1f;\n}\n.border-orange-dark[data-v-ad49e094] {\n  border-color: #de751f;\n}\n.border-orange[data-v-ad49e094] {\n  border-color: #f6993f;\n}\n.border-orange-light[data-v-ad49e094] {\n  border-color: #faad63;\n}\n.border-orange-lighter[data-v-ad49e094] {\n  border-color: #fcd9b6;\n}\n.border-orange-lightest[data-v-ad49e094] {\n  border-color: #fff5eb;\n}\n.border-yellow-darkest[data-v-ad49e094] {\n  border-color: #453411;\n}\n.border-yellow-darker[data-v-ad49e094] {\n  border-color: #684f1d;\n}\n.border-yellow-dark[data-v-ad49e094] {\n  border-color: #f2d024;\n}\n.border-yellow[data-v-ad49e094] {\n  border-color: #ffed4a;\n}\n.border-yellow-light[data-v-ad49e094] {\n  border-color: #fff382;\n}\n.border-yellow-lighter[data-v-ad49e094] {\n  border-color: #fff9c2;\n}\n.border-yellow-lightest[data-v-ad49e094] {\n  border-color: #fcfbeb;\n}\n.border-green-darkest[data-v-ad49e094] {\n  border-color: #0f2f21;\n}\n.border-green-darker[data-v-ad49e094] {\n  border-color: #1a4731;\n}\n.border-green-dark[data-v-ad49e094] {\n  border-color: #1f9d55;\n}\n.border-green[data-v-ad49e094] {\n  border-color: #38c172;\n}\n.border-green-light[data-v-ad49e094] {\n  border-color: #51d88a;\n}\n.border-green-lighter[data-v-ad49e094] {\n  border-color: #a2f5bf;\n}\n.border-green-lightest[data-v-ad49e094] {\n  border-color: #e3fcec;\n}\n.border-teal-darkest[data-v-ad49e094] {\n  border-color: #0d3331;\n}\n.border-teal-darker[data-v-ad49e094] {\n  border-color: #20504f;\n}\n.border-teal-dark[data-v-ad49e094] {\n  border-color: #38a89d;\n}\n.border-teal[data-v-ad49e094] {\n  border-color: #4dc0b5;\n}\n.border-teal-light[data-v-ad49e094] {\n  border-color: #64d5ca;\n}\n.border-teal-lighter[data-v-ad49e094] {\n  border-color: #a0f0ed;\n}\n.border-teal-lightest[data-v-ad49e094] {\n  border-color: #e8fffe;\n}\n.border-blue-darkest[data-v-ad49e094] {\n  border-color: #12283a;\n}\n.border-blue-darker[data-v-ad49e094] {\n  border-color: #1c3d5a;\n}\n.border-blue-dark[data-v-ad49e094] {\n  border-color: #2779bd;\n}\n.border-blue[data-v-ad49e094] {\n  border-color: #3490dc;\n}\n.border-blue-light[data-v-ad49e094] {\n  border-color: #6cb2eb;\n}\n.border-blue-lighter[data-v-ad49e094] {\n  border-color: #bcdefa;\n}\n.border-blue-lightest[data-v-ad49e094] {\n  border-color: #eff8ff;\n}\n.border-indigo-darkest[data-v-ad49e094] {\n  border-color: #191e38;\n}\n.border-indigo-darker[data-v-ad49e094] {\n  border-color: #2f365f;\n}\n.border-indigo-dark[data-v-ad49e094] {\n  border-color: #5661b3;\n}\n.border-indigo[data-v-ad49e094] {\n  border-color: #6574cd;\n}\n.border-indigo-light[data-v-ad49e094] {\n  border-color: #7886d7;\n}\n.border-indigo-lighter[data-v-ad49e094] {\n  border-color: #b2b7ff;\n}\n.border-indigo-lightest[data-v-ad49e094] {\n  border-color: #e6e8ff;\n}\n.border-purple-darkest[data-v-ad49e094] {\n  border-color: #21183c;\n}\n.border-purple-darker[data-v-ad49e094] {\n  border-color: #382b5f;\n}\n.border-purple-dark[data-v-ad49e094] {\n  border-color: #794acf;\n}\n.border-purple[data-v-ad49e094] {\n  border-color: #9561e2;\n}\n.border-purple-light[data-v-ad49e094] {\n  border-color: #a779e9;\n}\n.border-purple-lighter[data-v-ad49e094] {\n  border-color: #d6bbfc;\n}\n.border-purple-lightest[data-v-ad49e094] {\n  border-color: #f3ebff;\n}\n.border-pink-darkest[data-v-ad49e094] {\n  border-color: #451225;\n}\n.border-pink-darker[data-v-ad49e094] {\n  border-color: #6f213f;\n}\n.border-pink-dark[data-v-ad49e094] {\n  border-color: #eb5286;\n}\n.border-pink[data-v-ad49e094] {\n  border-color: #f66d9b;\n}\n.border-pink-light[data-v-ad49e094] {\n  border-color: #fa7ea8;\n}\n.border-pink-lighter[data-v-ad49e094] {\n  border-color: #ffbbca;\n}\n.border-pink-lightest[data-v-ad49e094] {\n  border-color: #ffebef;\n}\n.hover\\:border-transparent[data-v-ad49e094]:hover {\n  border-color: transparent;\n}\n.hover\\:border-black[data-v-ad49e094]:hover {\n  border-color: #22292f;\n}\n.hover\\:border-grey-darkest[data-v-ad49e094]:hover {\n  border-color: #3d4852;\n}\n.hover\\:border-grey-darker[data-v-ad49e094]:hover {\n  border-color: #606f7b;\n}\n.hover\\:border-grey-dark[data-v-ad49e094]:hover {\n  border-color: #8795a1;\n}\n.hover\\:border-grey[data-v-ad49e094]:hover {\n  border-color: #b8c2cc;\n}\n.hover\\:border-grey-light[data-v-ad49e094]:hover {\n  border-color: #dae1e7;\n}\n.hover\\:border-grey-lighter[data-v-ad49e094]:hover {\n  border-color: #f1f5f8;\n}\n.hover\\:border-grey-lightest[data-v-ad49e094]:hover {\n  border-color: #f8fafc;\n}\n.hover\\:border-white[data-v-ad49e094]:hover {\n  border-color: #fff;\n}\n.hover\\:border-red-darkest[data-v-ad49e094]:hover {\n  border-color: #3b0d0c;\n}\n.hover\\:border-red-darker[data-v-ad49e094]:hover {\n  border-color: #621b18;\n}\n.hover\\:border-red-dark[data-v-ad49e094]:hover {\n  border-color: #cc1f1a;\n}\n.hover\\:border-red[data-v-ad49e094]:hover {\n  border-color: #e3342f;\n}\n.hover\\:border-red-light[data-v-ad49e094]:hover {\n  border-color: #ef5753;\n}\n.hover\\:border-red-lighter[data-v-ad49e094]:hover {\n  border-color: #f9acaa;\n}\n.hover\\:border-red-lightest[data-v-ad49e094]:hover {\n  border-color: #fcebea;\n}\n.hover\\:border-orange-darkest[data-v-ad49e094]:hover {\n  border-color: #462a16;\n}\n.hover\\:border-orange-darker[data-v-ad49e094]:hover {\n  border-color: #613b1f;\n}\n.hover\\:border-orange-dark[data-v-ad49e094]:hover {\n  border-color: #de751f;\n}\n.hover\\:border-orange[data-v-ad49e094]:hover {\n  border-color: #f6993f;\n}\n.hover\\:border-orange-light[data-v-ad49e094]:hover {\n  border-color: #faad63;\n}\n.hover\\:border-orange-lighter[data-v-ad49e094]:hover {\n  border-color: #fcd9b6;\n}\n.hover\\:border-orange-lightest[data-v-ad49e094]:hover {\n  border-color: #fff5eb;\n}\n.hover\\:border-yellow-darkest[data-v-ad49e094]:hover {\n  border-color: #453411;\n}\n.hover\\:border-yellow-darker[data-v-ad49e094]:hover {\n  border-color: #684f1d;\n}\n.hover\\:border-yellow-dark[data-v-ad49e094]:hover {\n  border-color: #f2d024;\n}\n.hover\\:border-yellow[data-v-ad49e094]:hover {\n  border-color: #ffed4a;\n}\n.hover\\:border-yellow-light[data-v-ad49e094]:hover {\n  border-color: #fff382;\n}\n.hover\\:border-yellow-lighter[data-v-ad49e094]:hover {\n  border-color: #fff9c2;\n}\n.hover\\:border-yellow-lightest[data-v-ad49e094]:hover {\n  border-color: #fcfbeb;\n}\n.hover\\:border-green-darkest[data-v-ad49e094]:hover {\n  border-color: #0f2f21;\n}\n.hover\\:border-green-darker[data-v-ad49e094]:hover {\n  border-color: #1a4731;\n}\n.hover\\:border-green-dark[data-v-ad49e094]:hover {\n  border-color: #1f9d55;\n}\n.hover\\:border-green[data-v-ad49e094]:hover {\n  border-color: #38c172;\n}\n.hover\\:border-green-light[data-v-ad49e094]:hover {\n  border-color: #51d88a;\n}\n.hover\\:border-green-lighter[data-v-ad49e094]:hover {\n  border-color: #a2f5bf;\n}\n.hover\\:border-green-lightest[data-v-ad49e094]:hover {\n  border-color: #e3fcec;\n}\n.hover\\:border-teal-darkest[data-v-ad49e094]:hover {\n  border-color: #0d3331;\n}\n.hover\\:border-teal-darker[data-v-ad49e094]:hover {\n  border-color: #20504f;\n}\n.hover\\:border-teal-dark[data-v-ad49e094]:hover {\n  border-color: #38a89d;\n}\n.hover\\:border-teal[data-v-ad49e094]:hover {\n  border-color: #4dc0b5;\n}\n.hover\\:border-teal-light[data-v-ad49e094]:hover {\n  border-color: #64d5ca;\n}\n.hover\\:border-teal-lighter[data-v-ad49e094]:hover {\n  border-color: #a0f0ed;\n}\n.hover\\:border-teal-lightest[data-v-ad49e094]:hover {\n  border-color: #e8fffe;\n}\n.hover\\:border-blue-darkest[data-v-ad49e094]:hover {\n  border-color: #12283a;\n}\n.hover\\:border-blue-darker[data-v-ad49e094]:hover {\n  border-color: #1c3d5a;\n}\n.hover\\:border-blue-dark[data-v-ad49e094]:hover {\n  border-color: #2779bd;\n}\n.hover\\:border-blue[data-v-ad49e094]:hover {\n  border-color: #3490dc;\n}\n.hover\\:border-blue-light[data-v-ad49e094]:hover {\n  border-color: #6cb2eb;\n}\n.hover\\:border-blue-lighter[data-v-ad49e094]:hover {\n  border-color: #bcdefa;\n}\n.hover\\:border-blue-lightest[data-v-ad49e094]:hover {\n  border-color: #eff8ff;\n}\n.hover\\:border-indigo-darkest[data-v-ad49e094]:hover {\n  border-color: #191e38;\n}\n.hover\\:border-indigo-darker[data-v-ad49e094]:hover {\n  border-color: #2f365f;\n}\n.hover\\:border-indigo-dark[data-v-ad49e094]:hover {\n  border-color: #5661b3;\n}\n.hover\\:border-indigo[data-v-ad49e094]:hover {\n  border-color: #6574cd;\n}\n.hover\\:border-indigo-light[data-v-ad49e094]:hover {\n  border-color: #7886d7;\n}\n.hover\\:border-indigo-lighter[data-v-ad49e094]:hover {\n  border-color: #b2b7ff;\n}\n.hover\\:border-indigo-lightest[data-v-ad49e094]:hover {\n  border-color: #e6e8ff;\n}\n.hover\\:border-purple-darkest[data-v-ad49e094]:hover {\n  border-color: #21183c;\n}\n.hover\\:border-purple-darker[data-v-ad49e094]:hover {\n  border-color: #382b5f;\n}\n.hover\\:border-purple-dark[data-v-ad49e094]:hover {\n  border-color: #794acf;\n}\n.hover\\:border-purple[data-v-ad49e094]:hover {\n  border-color: #9561e2;\n}\n.hover\\:border-purple-light[data-v-ad49e094]:hover {\n  border-color: #a779e9;\n}\n.hover\\:border-purple-lighter[data-v-ad49e094]:hover {\n  border-color: #d6bbfc;\n}\n.hover\\:border-purple-lightest[data-v-ad49e094]:hover {\n  border-color: #f3ebff;\n}\n.hover\\:border-pink-darkest[data-v-ad49e094]:hover {\n  border-color: #451225;\n}\n.hover\\:border-pink-darker[data-v-ad49e094]:hover {\n  border-color: #6f213f;\n}\n.hover\\:border-pink-dark[data-v-ad49e094]:hover {\n  border-color: #eb5286;\n}\n.hover\\:border-pink[data-v-ad49e094]:hover {\n  border-color: #f66d9b;\n}\n.hover\\:border-pink-light[data-v-ad49e094]:hover {\n  border-color: #fa7ea8;\n}\n.hover\\:border-pink-lighter[data-v-ad49e094]:hover {\n  border-color: #ffbbca;\n}\n.hover\\:border-pink-lightest[data-v-ad49e094]:hover {\n  border-color: #ffebef;\n}\n.focus\\:border-transparent[data-v-ad49e094]:focus {\n  border-color: transparent;\n}\n.focus\\:border-black[data-v-ad49e094]:focus {\n  border-color: #22292f;\n}\n.focus\\:border-grey-darkest[data-v-ad49e094]:focus {\n  border-color: #3d4852;\n}\n.focus\\:border-grey-darker[data-v-ad49e094]:focus {\n  border-color: #606f7b;\n}\n.focus\\:border-grey-dark[data-v-ad49e094]:focus {\n  border-color: #8795a1;\n}\n.focus\\:border-grey[data-v-ad49e094]:focus {\n  border-color: #b8c2cc;\n}\n.focus\\:border-grey-light[data-v-ad49e094]:focus {\n  border-color: #dae1e7;\n}\n.focus\\:border-grey-lighter[data-v-ad49e094]:focus {\n  border-color: #f1f5f8;\n}\n.focus\\:border-grey-lightest[data-v-ad49e094]:focus {\n  border-color: #f8fafc;\n}\n.focus\\:border-white[data-v-ad49e094]:focus {\n  border-color: #fff;\n}\n.focus\\:border-red-darkest[data-v-ad49e094]:focus {\n  border-color: #3b0d0c;\n}\n.focus\\:border-red-darker[data-v-ad49e094]:focus {\n  border-color: #621b18;\n}\n.focus\\:border-red-dark[data-v-ad49e094]:focus {\n  border-color: #cc1f1a;\n}\n.focus\\:border-red[data-v-ad49e094]:focus {\n  border-color: #e3342f;\n}\n.focus\\:border-red-light[data-v-ad49e094]:focus {\n  border-color: #ef5753;\n}\n.focus\\:border-red-lighter[data-v-ad49e094]:focus {\n  border-color: #f9acaa;\n}\n.focus\\:border-red-lightest[data-v-ad49e094]:focus {\n  border-color: #fcebea;\n}\n.focus\\:border-orange-darkest[data-v-ad49e094]:focus {\n  border-color: #462a16;\n}\n.focus\\:border-orange-darker[data-v-ad49e094]:focus {\n  border-color: #613b1f;\n}\n.focus\\:border-orange-dark[data-v-ad49e094]:focus {\n  border-color: #de751f;\n}\n.focus\\:border-orange[data-v-ad49e094]:focus {\n  border-color: #f6993f;\n}\n.focus\\:border-orange-light[data-v-ad49e094]:focus {\n  border-color: #faad63;\n}\n.focus\\:border-orange-lighter[data-v-ad49e094]:focus {\n  border-color: #fcd9b6;\n}\n.focus\\:border-orange-lightest[data-v-ad49e094]:focus {\n  border-color: #fff5eb;\n}\n.focus\\:border-yellow-darkest[data-v-ad49e094]:focus {\n  border-color: #453411;\n}\n.focus\\:border-yellow-darker[data-v-ad49e094]:focus {\n  border-color: #684f1d;\n}\n.focus\\:border-yellow-dark[data-v-ad49e094]:focus {\n  border-color: #f2d024;\n}\n.focus\\:border-yellow[data-v-ad49e094]:focus {\n  border-color: #ffed4a;\n}\n.focus\\:border-yellow-light[data-v-ad49e094]:focus {\n  border-color: #fff382;\n}\n.focus\\:border-yellow-lighter[data-v-ad49e094]:focus {\n  border-color: #fff9c2;\n}\n.focus\\:border-yellow-lightest[data-v-ad49e094]:focus {\n  border-color: #fcfbeb;\n}\n.focus\\:border-green-darkest[data-v-ad49e094]:focus {\n  border-color: #0f2f21;\n}\n.focus\\:border-green-darker[data-v-ad49e094]:focus {\n  border-color: #1a4731;\n}\n.focus\\:border-green-dark[data-v-ad49e094]:focus {\n  border-color: #1f9d55;\n}\n.focus\\:border-green[data-v-ad49e094]:focus {\n  border-color: #38c172;\n}\n.focus\\:border-green-light[data-v-ad49e094]:focus {\n  border-color: #51d88a;\n}\n.focus\\:border-green-lighter[data-v-ad49e094]:focus {\n  border-color: #a2f5bf;\n}\n.focus\\:border-green-lightest[data-v-ad49e094]:focus {\n  border-color: #e3fcec;\n}\n.focus\\:border-teal-darkest[data-v-ad49e094]:focus {\n  border-color: #0d3331;\n}\n.focus\\:border-teal-darker[data-v-ad49e094]:focus {\n  border-color: #20504f;\n}\n.focus\\:border-teal-dark[data-v-ad49e094]:focus {\n  border-color: #38a89d;\n}\n.focus\\:border-teal[data-v-ad49e094]:focus {\n  border-color: #4dc0b5;\n}\n.focus\\:border-teal-light[data-v-ad49e094]:focus {\n  border-color: #64d5ca;\n}\n.focus\\:border-teal-lighter[data-v-ad49e094]:focus {\n  border-color: #a0f0ed;\n}\n.focus\\:border-teal-lightest[data-v-ad49e094]:focus {\n  border-color: #e8fffe;\n}\n.focus\\:border-blue-darkest[data-v-ad49e094]:focus {\n  border-color: #12283a;\n}\n.focus\\:border-blue-darker[data-v-ad49e094]:focus {\n  border-color: #1c3d5a;\n}\n.focus\\:border-blue-dark[data-v-ad49e094]:focus {\n  border-color: #2779bd;\n}\n.focus\\:border-blue[data-v-ad49e094]:focus {\n  border-color: #3490dc;\n}\n.focus\\:border-blue-light[data-v-ad49e094]:focus {\n  border-color: #6cb2eb;\n}\n.focus\\:border-blue-lighter[data-v-ad49e094]:focus {\n  border-color: #bcdefa;\n}\n.focus\\:border-blue-lightest[data-v-ad49e094]:focus {\n  border-color: #eff8ff;\n}\n.focus\\:border-indigo-darkest[data-v-ad49e094]:focus {\n  border-color: #191e38;\n}\n.focus\\:border-indigo-darker[data-v-ad49e094]:focus {\n  border-color: #2f365f;\n}\n.focus\\:border-indigo-dark[data-v-ad49e094]:focus {\n  border-color: #5661b3;\n}\n.focus\\:border-indigo[data-v-ad49e094]:focus {\n  border-color: #6574cd;\n}\n.focus\\:border-indigo-light[data-v-ad49e094]:focus {\n  border-color: #7886d7;\n}\n.focus\\:border-indigo-lighter[data-v-ad49e094]:focus {\n  border-color: #b2b7ff;\n}\n.focus\\:border-indigo-lightest[data-v-ad49e094]:focus {\n  border-color: #e6e8ff;\n}\n.focus\\:border-purple-darkest[data-v-ad49e094]:focus {\n  border-color: #21183c;\n}\n.focus\\:border-purple-darker[data-v-ad49e094]:focus {\n  border-color: #382b5f;\n}\n.focus\\:border-purple-dark[data-v-ad49e094]:focus {\n  border-color: #794acf;\n}\n.focus\\:border-purple[data-v-ad49e094]:focus {\n  border-color: #9561e2;\n}\n.focus\\:border-purple-light[data-v-ad49e094]:focus {\n  border-color: #a779e9;\n}\n.focus\\:border-purple-lighter[data-v-ad49e094]:focus {\n  border-color: #d6bbfc;\n}\n.focus\\:border-purple-lightest[data-v-ad49e094]:focus {\n  border-color: #f3ebff;\n}\n.focus\\:border-pink-darkest[data-v-ad49e094]:focus {\n  border-color: #451225;\n}\n.focus\\:border-pink-darker[data-v-ad49e094]:focus {\n  border-color: #6f213f;\n}\n.focus\\:border-pink-dark[data-v-ad49e094]:focus {\n  border-color: #eb5286;\n}\n.focus\\:border-pink[data-v-ad49e094]:focus {\n  border-color: #f66d9b;\n}\n.focus\\:border-pink-light[data-v-ad49e094]:focus {\n  border-color: #fa7ea8;\n}\n.focus\\:border-pink-lighter[data-v-ad49e094]:focus {\n  border-color: #ffbbca;\n}\n.focus\\:border-pink-lightest[data-v-ad49e094]:focus {\n  border-color: #ffebef;\n}\n.rounded-none[data-v-ad49e094] {\n  border-radius: 0;\n}\n.rounded-sm[data-v-ad49e094] {\n  border-radius: .125rem;\n}\n.rounded[data-v-ad49e094] {\n  border-radius: .25rem;\n}\n.rounded-lg[data-v-ad49e094] {\n  border-radius: .5rem;\n}\n.rounded-full[data-v-ad49e094] {\n  border-radius: 9999px;\n}\n.rounded-t-none[data-v-ad49e094] {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.rounded-r-none[data-v-ad49e094] {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.rounded-b-none[data-v-ad49e094] {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rounded-l-none[data-v-ad49e094] {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.rounded-t-sm[data-v-ad49e094] {\n  border-top-left-radius: .125rem;\n  border-top-right-radius: .125rem;\n}\n.rounded-r-sm[data-v-ad49e094] {\n  border-top-right-radius: .125rem;\n  border-bottom-right-radius: .125rem;\n}\n.rounded-b-sm[data-v-ad49e094] {\n  border-bottom-right-radius: .125rem;\n  border-bottom-left-radius: .125rem;\n}\n.rounded-l-sm[data-v-ad49e094] {\n  border-top-left-radius: .125rem;\n  border-bottom-left-radius: .125rem;\n}\n.rounded-t[data-v-ad49e094] {\n  border-top-left-radius: .25rem;\n  border-top-right-radius: .25rem;\n}\n.rounded-r[data-v-ad49e094] {\n  border-top-right-radius: .25rem;\n  border-bottom-right-radius: .25rem;\n}\n.rounded-b[data-v-ad49e094] {\n  border-bottom-right-radius: .25rem;\n  border-bottom-left-radius: .25rem;\n}\n.rounded-l[data-v-ad49e094] {\n  border-top-left-radius: .25rem;\n  border-bottom-left-radius: .25rem;\n}\n.rounded-t-lg[data-v-ad49e094] {\n  border-top-left-radius: .5rem;\n  border-top-right-radius: .5rem;\n}\n.rounded-r-lg[data-v-ad49e094] {\n  border-top-right-radius: .5rem;\n  border-bottom-right-radius: .5rem;\n}\n.rounded-b-lg[data-v-ad49e094] {\n  border-bottom-right-radius: .5rem;\n  border-bottom-left-radius: .5rem;\n}\n.rounded-l-lg[data-v-ad49e094] {\n  border-top-left-radius: .5rem;\n  border-bottom-left-radius: .5rem;\n}\n.rounded-t-full[data-v-ad49e094] {\n  border-top-left-radius: 9999px;\n  border-top-right-radius: 9999px;\n}\n.rounded-r-full[data-v-ad49e094] {\n  border-top-right-radius: 9999px;\n  border-bottom-right-radius: 9999px;\n}\n.rounded-b-full[data-v-ad49e094] {\n  border-bottom-right-radius: 9999px;\n  border-bottom-left-radius: 9999px;\n}\n.rounded-l-full[data-v-ad49e094] {\n  border-top-left-radius: 9999px;\n  border-bottom-left-radius: 9999px;\n}\n.rounded-tl-none[data-v-ad49e094] {\n  border-top-left-radius: 0;\n}\n.rounded-tr-none[data-v-ad49e094] {\n  border-top-right-radius: 0;\n}\n.rounded-br-none[data-v-ad49e094] {\n  border-bottom-right-radius: 0;\n}\n.rounded-bl-none[data-v-ad49e094] {\n  border-bottom-left-radius: 0;\n}\n.rounded-tl-sm[data-v-ad49e094] {\n  border-top-left-radius: .125rem;\n}\n.rounded-tr-sm[data-v-ad49e094] {\n  border-top-right-radius: .125rem;\n}\n.rounded-br-sm[data-v-ad49e094] {\n  border-bottom-right-radius: .125rem;\n}\n.rounded-bl-sm[data-v-ad49e094] {\n  border-bottom-left-radius: .125rem;\n}\n.rounded-tl[data-v-ad49e094] {\n  border-top-left-radius: .25rem;\n}\n.rounded-tr[data-v-ad49e094] {\n  border-top-right-radius: .25rem;\n}\n.rounded-br[data-v-ad49e094] {\n  border-bottom-right-radius: .25rem;\n}\n.rounded-bl[data-v-ad49e094] {\n  border-bottom-left-radius: .25rem;\n}\n.rounded-tl-lg[data-v-ad49e094] {\n  border-top-left-radius: .5rem;\n}\n.rounded-tr-lg[data-v-ad49e094] {\n  border-top-right-radius: .5rem;\n}\n.rounded-br-lg[data-v-ad49e094] {\n  border-bottom-right-radius: .5rem;\n}\n.rounded-bl-lg[data-v-ad49e094] {\n  border-bottom-left-radius: .5rem;\n}\n.rounded-tl-full[data-v-ad49e094] {\n  border-top-left-radius: 9999px;\n}\n.rounded-tr-full[data-v-ad49e094] {\n  border-top-right-radius: 9999px;\n}\n.rounded-br-full[data-v-ad49e094] {\n  border-bottom-right-radius: 9999px;\n}\n.rounded-bl-full[data-v-ad49e094] {\n  border-bottom-left-radius: 9999px;\n}\n.border-solid[data-v-ad49e094] {\n  border-style: solid;\n}\n.border-dashed[data-v-ad49e094] {\n  border-style: dashed;\n}\n.border-dotted[data-v-ad49e094] {\n  border-style: dotted;\n}\n.border-none[data-v-ad49e094] {\n  border-style: none;\n}\n.border-0[data-v-ad49e094] {\n  border-width: 0;\n}\n.border-2[data-v-ad49e094] {\n  border-width: 2px;\n}\n.border-4[data-v-ad49e094] {\n  border-width: 4px;\n}\n.border-8[data-v-ad49e094] {\n  border-width: 8px;\n}\n.border[data-v-ad49e094] {\n  border-width: 1px;\n}\n.border-t-0[data-v-ad49e094] {\n  border-top-width: 0;\n}\n.border-r-0[data-v-ad49e094] {\n  border-right-width: 0;\n}\n.border-b-0[data-v-ad49e094] {\n  border-bottom-width: 0;\n}\n.border-l-0[data-v-ad49e094] {\n  border-left-width: 0;\n}\n.border-t-2[data-v-ad49e094] {\n  border-top-width: 2px;\n}\n.border-r-2[data-v-ad49e094] {\n  border-right-width: 2px;\n}\n.border-b-2[data-v-ad49e094] {\n  border-bottom-width: 2px;\n}\n.border-l-2[data-v-ad49e094] {\n  border-left-width: 2px;\n}\n.border-t-4[data-v-ad49e094] {\n  border-top-width: 4px;\n}\n.border-r-4[data-v-ad49e094] {\n  border-right-width: 4px;\n}\n.border-b-4[data-v-ad49e094] {\n  border-bottom-width: 4px;\n}\n.border-l-4[data-v-ad49e094] {\n  border-left-width: 4px;\n}\n.border-t-8[data-v-ad49e094] {\n  border-top-width: 8px;\n}\n.border-r-8[data-v-ad49e094] {\n  border-right-width: 8px;\n}\n.border-b-8[data-v-ad49e094] {\n  border-bottom-width: 8px;\n}\n.border-l-8[data-v-ad49e094] {\n  border-left-width: 8px;\n}\n.border-t[data-v-ad49e094] {\n  border-top-width: 1px;\n}\n.border-r[data-v-ad49e094] {\n  border-right-width: 1px;\n}\n.border-b[data-v-ad49e094] {\n  border-bottom-width: 1px;\n}\n.border-l[data-v-ad49e094] {\n  border-left-width: 1px;\n}\n.cursor-auto[data-v-ad49e094] {\n  cursor: auto;\n}\n.cursor-default[data-v-ad49e094] {\n  cursor: default;\n}\n.cursor-pointer[data-v-ad49e094] {\n  cursor: pointer;\n}\n.cursor-wait[data-v-ad49e094] {\n  cursor: wait;\n}\n.cursor-move[data-v-ad49e094] {\n  cursor: move;\n}\n.cursor-not-allowed[data-v-ad49e094] {\n  cursor: not-allowed;\n}\n.block[data-v-ad49e094] {\n  display: block;\n}\n.inline-block[data-v-ad49e094] {\n  display: inline-block;\n}\n.inline[data-v-ad49e094] {\n  display: inline;\n}\n.table[data-v-ad49e094] {\n  display: table;\n}\n.table-row[data-v-ad49e094] {\n  display: table-row;\n}\n.table-cell[data-v-ad49e094] {\n  display: table-cell;\n}\n.hidden[data-v-ad49e094] {\n  display: none;\n}\n.flex[data-v-ad49e094] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.inline-flex[data-v-ad49e094] {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n}\n.flex-row[data-v-ad49e094] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n.flex-row-reverse[data-v-ad49e094] {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: row-reverse;\n          flex-direction: row-reverse;\n}\n.flex-col[data-v-ad49e094] {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n.flex-col-reverse[data-v-ad49e094] {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: reverse;\n      -ms-flex-direction: column-reverse;\n          flex-direction: column-reverse;\n}\n.flex-wrap[data-v-ad49e094] {\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n}\n.flex-wrap-reverse[data-v-ad49e094] {\n  -ms-flex-wrap: wrap-reverse;\n      flex-wrap: wrap-reverse;\n}\n.flex-no-wrap[data-v-ad49e094] {\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n}\n.items-start[data-v-ad49e094] {\n  -webkit-box-align: start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n.items-end[data-v-ad49e094] {\n  -webkit-box-align: end;\n      -ms-flex-align: end;\n          align-items: flex-end;\n}\n.items-center[data-v-ad49e094] {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.items-baseline[data-v-ad49e094] {\n  -webkit-box-align: baseline;\n      -ms-flex-align: baseline;\n          align-items: baseline;\n}\n.items-stretch[data-v-ad49e094] {\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n}\n.self-auto[data-v-ad49e094] {\n  -ms-flex-item-align: auto;\n      align-self: auto;\n}\n.self-start[data-v-ad49e094] {\n  -ms-flex-item-align: start;\n      align-self: flex-start;\n}\n.self-end[data-v-ad49e094] {\n  -ms-flex-item-align: end;\n      align-self: flex-end;\n}\n.self-center[data-v-ad49e094] {\n  -ms-flex-item-align: center;\n      align-self: center;\n}\n.self-stretch[data-v-ad49e094] {\n  -ms-flex-item-align: stretch;\n      align-self: stretch;\n}\n.justify-start[data-v-ad49e094] {\n  -webkit-box-pack: start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n.justify-end[data-v-ad49e094] {\n  -webkit-box-pack: end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n}\n.justify-center[data-v-ad49e094] {\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n.justify-between[data-v-ad49e094] {\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n}\n.justify-around[data-v-ad49e094] {\n  -ms-flex-pack: distribute;\n      justify-content: space-around;\n}\n.content-center[data-v-ad49e094] {\n  -ms-flex-line-pack: center;\n      align-content: center;\n}\n.content-start[data-v-ad49e094] {\n  -ms-flex-line-pack: start;\n      align-content: flex-start;\n}\n.content-end[data-v-ad49e094] {\n  -ms-flex-line-pack: end;\n      align-content: flex-end;\n}\n.content-between[data-v-ad49e094] {\n  -ms-flex-line-pack: justify;\n      align-content: space-between;\n}\n.content-around[data-v-ad49e094] {\n  -ms-flex-line-pack: distribute;\n      align-content: space-around;\n}\n.flex-1[data-v-ad49e094] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.flex-auto[data-v-ad49e094] {\n  -webkit-box-flex: 1;\n      -ms-flex: auto;\n          flex: auto;\n}\n.flex-initial[data-v-ad49e094] {\n  -webkit-box-flex: initial;\n      -ms-flex: initial;\n          flex: initial;\n}\n.flex-none[data-v-ad49e094] {\n  -webkit-box-flex: 0;\n      -ms-flex: none;\n          flex: none;\n}\n.flex-grow[data-v-ad49e094] {\n  -webkit-box-flex: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n}\n.flex-shrink[data-v-ad49e094] {\n  -ms-flex-negative: 1;\n      flex-shrink: 1;\n}\n.flex-no-grow[data-v-ad49e094] {\n  -webkit-box-flex: 0;\n      -ms-flex-positive: 0;\n          flex-grow: 0;\n}\n.flex-no-shrink[data-v-ad49e094] {\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.float-right[data-v-ad49e094] {\n  float: right;\n}\n.float-left[data-v-ad49e094] {\n  float: left;\n}\n.float-none[data-v-ad49e094] {\n  float: none;\n}\n.clearfix[data-v-ad49e094]:after {\n  content: \"\";\n  display: table;\n  clear: both;\n}\n.font-sans[data-v-ad49e094] {\n  font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n.font-serif[data-v-ad49e094] {\n  font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n.font-mono[data-v-ad49e094] {\n  font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n.font-hairline[data-v-ad49e094] {\n  font-weight: 100;\n}\n.font-thin[data-v-ad49e094] {\n  font-weight: 200;\n}\n.font-light[data-v-ad49e094] {\n  font-weight: 300;\n}\n.font-normal[data-v-ad49e094] {\n  font-weight: 400;\n}\n.font-medium[data-v-ad49e094] {\n  font-weight: 500;\n}\n.font-semibold[data-v-ad49e094] {\n  font-weight: 600;\n}\n.font-bold[data-v-ad49e094] {\n  font-weight: 700;\n}\n.font-extrabold[data-v-ad49e094] {\n  font-weight: 800;\n}\n.font-black[data-v-ad49e094] {\n  font-weight: 900;\n}\n.hover\\:font-hairline[data-v-ad49e094]:hover {\n  font-weight: 100;\n}\n.hover\\:font-thin[data-v-ad49e094]:hover {\n  font-weight: 200;\n}\n.hover\\:font-light[data-v-ad49e094]:hover {\n  font-weight: 300;\n}\n.hover\\:font-normal[data-v-ad49e094]:hover {\n  font-weight: 400;\n}\n.hover\\:font-medium[data-v-ad49e094]:hover {\n  font-weight: 500;\n}\n.hover\\:font-semibold[data-v-ad49e094]:hover {\n  font-weight: 600;\n}\n.hover\\:font-bold[data-v-ad49e094]:hover {\n  font-weight: 700;\n}\n.hover\\:font-extrabold[data-v-ad49e094]:hover {\n  font-weight: 800;\n}\n.hover\\:font-black[data-v-ad49e094]:hover {\n  font-weight: 900;\n}\n.focus\\:font-hairline[data-v-ad49e094]:focus {\n  font-weight: 100;\n}\n.focus\\:font-thin[data-v-ad49e094]:focus {\n  font-weight: 200;\n}\n.focus\\:font-light[data-v-ad49e094]:focus {\n  font-weight: 300;\n}\n.focus\\:font-normal[data-v-ad49e094]:focus {\n  font-weight: 400;\n}\n.focus\\:font-medium[data-v-ad49e094]:focus {\n  font-weight: 500;\n}\n.focus\\:font-semibold[data-v-ad49e094]:focus {\n  font-weight: 600;\n}\n.focus\\:font-bold[data-v-ad49e094]:focus {\n  font-weight: 700;\n}\n.focus\\:font-extrabold[data-v-ad49e094]:focus {\n  font-weight: 800;\n}\n.focus\\:font-black[data-v-ad49e094]:focus {\n  font-weight: 900;\n}\n.h-1[data-v-ad49e094] {\n  height: .25rem;\n}\n.h-2[data-v-ad49e094] {\n  height: .5rem;\n}\n.h-3[data-v-ad49e094] {\n  height: .75rem;\n}\n.h-4[data-v-ad49e094] {\n  height: 1rem;\n}\n.h-5[data-v-ad49e094] {\n  height: 1.25rem;\n}\n.h-6[data-v-ad49e094] {\n  height: 1.5rem;\n}\n.h-8[data-v-ad49e094] {\n  height: 2rem;\n}\n.h-10[data-v-ad49e094] {\n  height: 2.5rem;\n}\n.h-12[data-v-ad49e094] {\n  height: 3rem;\n}\n.h-16[data-v-ad49e094] {\n  height: 4rem;\n}\n.h-24[data-v-ad49e094] {\n  height: 6rem;\n}\n.h-32[data-v-ad49e094] {\n  height: 8rem;\n}\n.h-48[data-v-ad49e094] {\n  height: 12rem;\n}\n.h-64[data-v-ad49e094] {\n  height: 16rem;\n}\n.h-auto[data-v-ad49e094] {\n  height: auto;\n}\n.h-px[data-v-ad49e094] {\n  height: 1px;\n}\n.h-full[data-v-ad49e094] {\n  height: 100%;\n}\n.h-screen[data-v-ad49e094] {\n  height: 100vh;\n}\n.leading-none[data-v-ad49e094] {\n  line-height: 1;\n}\n.leading-tight[data-v-ad49e094] {\n  line-height: 1.25;\n}\n.leading-normal[data-v-ad49e094] {\n  line-height: 1.5;\n}\n.leading-loose[data-v-ad49e094] {\n  line-height: 2;\n}\n.m-0[data-v-ad49e094] {\n  margin: 0;\n}\n.m-1[data-v-ad49e094] {\n  margin: .25rem;\n}\n.m-2[data-v-ad49e094] {\n  margin: .5rem;\n}\n.m-3[data-v-ad49e094] {\n  margin: .75rem;\n}\n.m-4[data-v-ad49e094] {\n  margin: 1rem;\n}\n.m-5[data-v-ad49e094] {\n  margin: 1.25rem;\n}\n.m-6[data-v-ad49e094] {\n  margin: 1.5rem;\n}\n.m-8[data-v-ad49e094] {\n  margin: 2rem;\n}\n.m-10[data-v-ad49e094] {\n  margin: 2.5rem;\n}\n.m-12[data-v-ad49e094] {\n  margin: 3rem;\n}\n.m-16[data-v-ad49e094] {\n  margin: 4rem;\n}\n.m-20[data-v-ad49e094] {\n  margin: 5rem;\n}\n.m-24[data-v-ad49e094] {\n  margin: 6rem;\n}\n.m-32[data-v-ad49e094] {\n  margin: 8rem;\n}\n.m-auto[data-v-ad49e094] {\n  margin: auto;\n}\n.m-px[data-v-ad49e094] {\n  margin: 1px;\n}\n.my-0[data-v-ad49e094] {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.mx-0[data-v-ad49e094] {\n  margin-left: 0;\n  margin-right: 0;\n}\n.my-1[data-v-ad49e094] {\n  margin-top: .25rem;\n  margin-bottom: .25rem;\n}\n.mx-1[data-v-ad49e094] {\n  margin-left: .25rem;\n  margin-right: .25rem;\n}\n.my-2[data-v-ad49e094] {\n  margin-top: .5rem;\n  margin-bottom: .5rem;\n}\n.mx-2[data-v-ad49e094] {\n  margin-left: .5rem;\n  margin-right: .5rem;\n}\n.my-3[data-v-ad49e094] {\n  margin-top: .75rem;\n  margin-bottom: .75rem;\n}\n.mx-3[data-v-ad49e094] {\n  margin-left: .75rem;\n  margin-right: .75rem;\n}\n.my-4[data-v-ad49e094] {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.mx-4[data-v-ad49e094] {\n  margin-left: 1rem;\n  margin-right: 1rem;\n}\n.my-5[data-v-ad49e094] {\n  margin-top: 1.25rem;\n  margin-bottom: 1.25rem;\n}\n.mx-5[data-v-ad49e094] {\n  margin-left: 1.25rem;\n  margin-right: 1.25rem;\n}\n.my-6[data-v-ad49e094] {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.mx-6[data-v-ad49e094] {\n  margin-left: 1.5rem;\n  margin-right: 1.5rem;\n}\n.my-8[data-v-ad49e094] {\n  margin-top: 2rem;\n  margin-bottom: 2rem;\n}\n.mx-8[data-v-ad49e094] {\n  margin-left: 2rem;\n  margin-right: 2rem;\n}\n.my-10[data-v-ad49e094] {\n  margin-top: 2.5rem;\n  margin-bottom: 2.5rem;\n}\n.mx-10[data-v-ad49e094] {\n  margin-left: 2.5rem;\n  margin-right: 2.5rem;\n}\n.my-12[data-v-ad49e094] {\n  margin-top: 3rem;\n  margin-bottom: 3rem;\n}\n.mx-12[data-v-ad49e094] {\n  margin-left: 3rem;\n  margin-right: 3rem;\n}\n.my-16[data-v-ad49e094] {\n  margin-top: 4rem;\n  margin-bottom: 4rem;\n}\n.mx-16[data-v-ad49e094] {\n  margin-left: 4rem;\n  margin-right: 4rem;\n}\n.my-20[data-v-ad49e094] {\n  margin-top: 5rem;\n  margin-bottom: 5rem;\n}\n.mx-20[data-v-ad49e094] {\n  margin-left: 5rem;\n  margin-right: 5rem;\n}\n.my-24[data-v-ad49e094] {\n  margin-top: 6rem;\n  margin-bottom: 6rem;\n}\n.mx-24[data-v-ad49e094] {\n  margin-left: 6rem;\n  margin-right: 6rem;\n}\n.my-32[data-v-ad49e094] {\n  margin-top: 8rem;\n  margin-bottom: 8rem;\n}\n.mx-32[data-v-ad49e094] {\n  margin-left: 8rem;\n  margin-right: 8rem;\n}\n.my-auto[data-v-ad49e094] {\n  margin-top: auto;\n  margin-bottom: auto;\n}\n.mx-auto[data-v-ad49e094] {\n  margin-left: auto;\n  margin-right: auto;\n}\n.my-px[data-v-ad49e094] {\n  margin-top: 1px;\n  margin-bottom: 1px;\n}\n.mx-px[data-v-ad49e094] {\n  margin-left: 1px;\n  margin-right: 1px;\n}\n.mt-0[data-v-ad49e094] {\n  margin-top: 0;\n}\n.mr-0[data-v-ad49e094] {\n  margin-right: 0;\n}\n.mb-0[data-v-ad49e094] {\n  margin-bottom: 0;\n}\n.ml-0[data-v-ad49e094] {\n  margin-left: 0;\n}\n.mt-1[data-v-ad49e094] {\n  margin-top: .25rem;\n}\n.mr-1[data-v-ad49e094] {\n  margin-right: .25rem;\n}\n.mb-1[data-v-ad49e094] {\n  margin-bottom: .25rem;\n}\n.ml-1[data-v-ad49e094] {\n  margin-left: .25rem;\n}\n.mt-2[data-v-ad49e094] {\n  margin-top: .5rem;\n}\n.mr-2[data-v-ad49e094] {\n  margin-right: .5rem;\n}\n.mb-2[data-v-ad49e094] {\n  margin-bottom: .5rem;\n}\n.ml-2[data-v-ad49e094] {\n  margin-left: .5rem;\n}\n.mt-3[data-v-ad49e094] {\n  margin-top: .75rem;\n}\n.mr-3[data-v-ad49e094] {\n  margin-right: .75rem;\n}\n.mb-3[data-v-ad49e094] {\n  margin-bottom: .75rem;\n}\n.ml-3[data-v-ad49e094] {\n  margin-left: .75rem;\n}\n.mt-4[data-v-ad49e094] {\n  margin-top: 1rem;\n}\n.mr-4[data-v-ad49e094] {\n  margin-right: 1rem;\n}\n.mb-4[data-v-ad49e094] {\n  margin-bottom: 1rem;\n}\n.ml-4[data-v-ad49e094] {\n  margin-left: 1rem;\n}\n.mt-5[data-v-ad49e094] {\n  margin-top: 1.25rem;\n}\n.mr-5[data-v-ad49e094] {\n  margin-right: 1.25rem;\n}\n.mb-5[data-v-ad49e094] {\n  margin-bottom: 1.25rem;\n}\n.ml-5[data-v-ad49e094] {\n  margin-left: 1.25rem;\n}\n.mt-6[data-v-ad49e094] {\n  margin-top: 1.5rem;\n}\n.mr-6[data-v-ad49e094] {\n  margin-right: 1.5rem;\n}\n.mb-6[data-v-ad49e094] {\n  margin-bottom: 1.5rem;\n}\n.ml-6[data-v-ad49e094] {\n  margin-left: 1.5rem;\n}\n.mt-8[data-v-ad49e094] {\n  margin-top: 2rem;\n}\n.mr-8[data-v-ad49e094] {\n  margin-right: 2rem;\n}\n.mb-8[data-v-ad49e094] {\n  margin-bottom: 2rem;\n}\n.ml-8[data-v-ad49e094] {\n  margin-left: 2rem;\n}\n.mt-10[data-v-ad49e094] {\n  margin-top: 2.5rem;\n}\n.mr-10[data-v-ad49e094] {\n  margin-right: 2.5rem;\n}\n.mb-10[data-v-ad49e094] {\n  margin-bottom: 2.5rem;\n}\n.ml-10[data-v-ad49e094] {\n  margin-left: 2.5rem;\n}\n.mt-12[data-v-ad49e094] {\n  margin-top: 3rem;\n}\n.mr-12[data-v-ad49e094] {\n  margin-right: 3rem;\n}\n.mb-12[data-v-ad49e094] {\n  margin-bottom: 3rem;\n}\n.ml-12[data-v-ad49e094] {\n  margin-left: 3rem;\n}\n.mt-16[data-v-ad49e094] {\n  margin-top: 4rem;\n}\n.mr-16[data-v-ad49e094] {\n  margin-right: 4rem;\n}\n.mb-16[data-v-ad49e094] {\n  margin-bottom: 4rem;\n}\n.ml-16[data-v-ad49e094] {\n  margin-left: 4rem;\n}\n.mt-20[data-v-ad49e094] {\n  margin-top: 5rem;\n}\n.mr-20[data-v-ad49e094] {\n  margin-right: 5rem;\n}\n.mb-20[data-v-ad49e094] {\n  margin-bottom: 5rem;\n}\n.ml-20[data-v-ad49e094] {\n  margin-left: 5rem;\n}\n.mt-24[data-v-ad49e094] {\n  margin-top: 6rem;\n}\n.mr-24[data-v-ad49e094] {\n  margin-right: 6rem;\n}\n.mb-24[data-v-ad49e094] {\n  margin-bottom: 6rem;\n}\n.ml-24[data-v-ad49e094] {\n  margin-left: 6rem;\n}\n.mt-32[data-v-ad49e094] {\n  margin-top: 8rem;\n}\n.mr-32[data-v-ad49e094] {\n  margin-right: 8rem;\n}\n.mb-32[data-v-ad49e094] {\n  margin-bottom: 8rem;\n}\n.ml-32[data-v-ad49e094] {\n  margin-left: 8rem;\n}\n.mt-auto[data-v-ad49e094] {\n  margin-top: auto;\n}\n.mr-auto[data-v-ad49e094] {\n  margin-right: auto;\n}\n.mb-auto[data-v-ad49e094] {\n  margin-bottom: auto;\n}\n.ml-auto[data-v-ad49e094] {\n  margin-left: auto;\n}\n.mt-px[data-v-ad49e094] {\n  margin-top: 1px;\n}\n.mr-px[data-v-ad49e094] {\n  margin-right: 1px;\n}\n.mb-px[data-v-ad49e094] {\n  margin-bottom: 1px;\n}\n.ml-px[data-v-ad49e094] {\n  margin-left: 1px;\n}\n.max-h-full[data-v-ad49e094] {\n  max-height: 100%;\n}\n.max-h-screen[data-v-ad49e094] {\n  max-height: 100vh;\n}\n.max-w-xs[data-v-ad49e094] {\n  max-width: 20rem;\n}\n.max-w-sm[data-v-ad49e094] {\n  max-width: 30rem;\n}\n.max-w-md[data-v-ad49e094] {\n  max-width: 40rem;\n}\n.max-w-lg[data-v-ad49e094] {\n  max-width: 50rem;\n}\n.max-w-xl[data-v-ad49e094] {\n  max-width: 60rem;\n}\n.max-w-2xl[data-v-ad49e094] {\n  max-width: 70rem;\n}\n.max-w-3xl[data-v-ad49e094] {\n  max-width: 80rem;\n}\n.max-w-4xl[data-v-ad49e094] {\n  max-width: 90rem;\n}\n.max-w-5xl[data-v-ad49e094] {\n  max-width: 100rem;\n}\n.max-w-full[data-v-ad49e094] {\n  max-width: 100%;\n}\n.min-h-0[data-v-ad49e094] {\n  min-height: 0;\n}\n.min-h-full[data-v-ad49e094] {\n  min-height: 100%;\n}\n.min-h-screen[data-v-ad49e094] {\n  min-height: 100vh;\n}\n.min-w-0[data-v-ad49e094] {\n  min-width: 0;\n}\n.min-w-full[data-v-ad49e094] {\n  min-width: 100%;\n}\n.-m-0[data-v-ad49e094] {\n  margin: 0;\n}\n.-m-1[data-v-ad49e094] {\n  margin: -0.25rem;\n}\n.-m-2[data-v-ad49e094] {\n  margin: -0.5rem;\n}\n.-m-3[data-v-ad49e094] {\n  margin: -0.75rem;\n}\n.-m-4[data-v-ad49e094] {\n  margin: -1rem;\n}\n.-m-5[data-v-ad49e094] {\n  margin: -1.25rem;\n}\n.-m-6[data-v-ad49e094] {\n  margin: -1.5rem;\n}\n.-m-8[data-v-ad49e094] {\n  margin: -2rem;\n}\n.-m-10[data-v-ad49e094] {\n  margin: -2.5rem;\n}\n.-m-12[data-v-ad49e094] {\n  margin: -3rem;\n}\n.-m-16[data-v-ad49e094] {\n  margin: -4rem;\n}\n.-m-20[data-v-ad49e094] {\n  margin: -5rem;\n}\n.-m-24[data-v-ad49e094] {\n  margin: -6rem;\n}\n.-m-32[data-v-ad49e094] {\n  margin: -8rem;\n}\n.-m-px[data-v-ad49e094] {\n  margin: -1px;\n}\n.-my-0[data-v-ad49e094] {\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.-mx-0[data-v-ad49e094] {\n  margin-left: 0;\n  margin-right: 0;\n}\n.-my-1[data-v-ad49e094] {\n  margin-top: -0.25rem;\n  margin-bottom: -0.25rem;\n}\n.-mx-1[data-v-ad49e094] {\n  margin-left: -0.25rem;\n  margin-right: -0.25rem;\n}\n.-my-2[data-v-ad49e094] {\n  margin-top: -0.5rem;\n  margin-bottom: -0.5rem;\n}\n.-mx-2[data-v-ad49e094] {\n  margin-left: -0.5rem;\n  margin-right: -0.5rem;\n}\n.-my-3[data-v-ad49e094] {\n  margin-top: -0.75rem;\n  margin-bottom: -0.75rem;\n}\n.-mx-3[data-v-ad49e094] {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem;\n}\n.-my-4[data-v-ad49e094] {\n  margin-top: -1rem;\n  margin-bottom: -1rem;\n}\n.-mx-4[data-v-ad49e094] {\n  margin-left: -1rem;\n  margin-right: -1rem;\n}\n.-my-5[data-v-ad49e094] {\n  margin-top: -1.25rem;\n  margin-bottom: -1.25rem;\n}\n.-mx-5[data-v-ad49e094] {\n  margin-left: -1.25rem;\n  margin-right: -1.25rem;\n}\n.-my-6[data-v-ad49e094] {\n  margin-top: -1.5rem;\n  margin-bottom: -1.5rem;\n}\n.-mx-6[data-v-ad49e094] {\n  margin-left: -1.5rem;\n  margin-right: -1.5rem;\n}\n.-my-8[data-v-ad49e094] {\n  margin-top: -2rem;\n  margin-bottom: -2rem;\n}\n.-mx-8[data-v-ad49e094] {\n  margin-left: -2rem;\n  margin-right: -2rem;\n}\n.-my-10[data-v-ad49e094] {\n  margin-top: -2.5rem;\n  margin-bottom: -2.5rem;\n}\n.-mx-10[data-v-ad49e094] {\n  margin-left: -2.5rem;\n  margin-right: -2.5rem;\n}\n.-my-12[data-v-ad49e094] {\n  margin-top: -3rem;\n  margin-bottom: -3rem;\n}\n.-mx-12[data-v-ad49e094] {\n  margin-left: -3rem;\n  margin-right: -3rem;\n}\n.-my-16[data-v-ad49e094] {\n  margin-top: -4rem;\n  margin-bottom: -4rem;\n}\n.-mx-16[data-v-ad49e094] {\n  margin-left: -4rem;\n  margin-right: -4rem;\n}\n.-my-20[data-v-ad49e094] {\n  margin-top: -5rem;\n  margin-bottom: -5rem;\n}\n.-mx-20[data-v-ad49e094] {\n  margin-left: -5rem;\n  margin-right: -5rem;\n}\n.-my-24[data-v-ad49e094] {\n  margin-top: -6rem;\n  margin-bottom: -6rem;\n}\n.-mx-24[data-v-ad49e094] {\n  margin-left: -6rem;\n  margin-right: -6rem;\n}\n.-my-32[data-v-ad49e094] {\n  margin-top: -8rem;\n  margin-bottom: -8rem;\n}\n.-mx-32[data-v-ad49e094] {\n  margin-left: -8rem;\n  margin-right: -8rem;\n}\n.-my-px[data-v-ad49e094] {\n  margin-top: -1px;\n  margin-bottom: -1px;\n}\n.-mx-px[data-v-ad49e094] {\n  margin-left: -1px;\n  margin-right: -1px;\n}\n.-mt-0[data-v-ad49e094] {\n  margin-top: 0;\n}\n.-mr-0[data-v-ad49e094] {\n  margin-right: 0;\n}\n.-mb-0[data-v-ad49e094] {\n  margin-bottom: 0;\n}\n.-ml-0[data-v-ad49e094] {\n  margin-left: 0;\n}\n.-mt-1[data-v-ad49e094] {\n  margin-top: -0.25rem;\n}\n.-mr-1[data-v-ad49e094] {\n  margin-right: -0.25rem;\n}\n.-mb-1[data-v-ad49e094] {\n  margin-bottom: -0.25rem;\n}\n.-ml-1[data-v-ad49e094] {\n  margin-left: -0.25rem;\n}\n.-mt-2[data-v-ad49e094] {\n  margin-top: -0.5rem;\n}\n.-mr-2[data-v-ad49e094] {\n  margin-right: -0.5rem;\n}\n.-mb-2[data-v-ad49e094] {\n  margin-bottom: -0.5rem;\n}\n.-ml-2[data-v-ad49e094] {\n  margin-left: -0.5rem;\n}\n.-mt-3[data-v-ad49e094] {\n  margin-top: -0.75rem;\n}\n.-mr-3[data-v-ad49e094] {\n  margin-right: -0.75rem;\n}\n.-mb-3[data-v-ad49e094] {\n  margin-bottom: -0.75rem;\n}\n.-ml-3[data-v-ad49e094] {\n  margin-left: -0.75rem;\n}\n.-mt-4[data-v-ad49e094] {\n  margin-top: -1rem;\n}\n.-mr-4[data-v-ad49e094] {\n  margin-right: -1rem;\n}\n.-mb-4[data-v-ad49e094] {\n  margin-bottom: -1rem;\n}\n.-ml-4[data-v-ad49e094] {\n  margin-left: -1rem;\n}\n.-mt-5[data-v-ad49e094] {\n  margin-top: -1.25rem;\n}\n.-mr-5[data-v-ad49e094] {\n  margin-right: -1.25rem;\n}\n.-mb-5[data-v-ad49e094] {\n  margin-bottom: -1.25rem;\n}\n.-ml-5[data-v-ad49e094] {\n  margin-left: -1.25rem;\n}\n.-mt-6[data-v-ad49e094] {\n  margin-top: -1.5rem;\n}\n.-mr-6[data-v-ad49e094] {\n  margin-right: -1.5rem;\n}\n.-mb-6[data-v-ad49e094] {\n  margin-bottom: -1.5rem;\n}\n.-ml-6[data-v-ad49e094] {\n  margin-left: -1.5rem;\n}\n.-mt-8[data-v-ad49e094] {\n  margin-top: -2rem;\n}\n.-mr-8[data-v-ad49e094] {\n  margin-right: -2rem;\n}\n.-mb-8[data-v-ad49e094] {\n  margin-bottom: -2rem;\n}\n.-ml-8[data-v-ad49e094] {\n  margin-left: -2rem;\n}\n.-mt-10[data-v-ad49e094] {\n  margin-top: -2.5rem;\n}\n.-mr-10[data-v-ad49e094] {\n  margin-right: -2.5rem;\n}\n.-mb-10[data-v-ad49e094] {\n  margin-bottom: -2.5rem;\n}\n.-ml-10[data-v-ad49e094] {\n  margin-left: -2.5rem;\n}\n.-mt-12[data-v-ad49e094] {\n  margin-top: -3rem;\n}\n.-mr-12[data-v-ad49e094] {\n  margin-right: -3rem;\n}\n.-mb-12[data-v-ad49e094] {\n  margin-bottom: -3rem;\n}\n.-ml-12[data-v-ad49e094] {\n  margin-left: -3rem;\n}\n.-mt-16[data-v-ad49e094] {\n  margin-top: -4rem;\n}\n.-mr-16[data-v-ad49e094] {\n  margin-right: -4rem;\n}\n.-mb-16[data-v-ad49e094] {\n  margin-bottom: -4rem;\n}\n.-ml-16[data-v-ad49e094] {\n  margin-left: -4rem;\n}\n.-mt-20[data-v-ad49e094] {\n  margin-top: -5rem;\n}\n.-mr-20[data-v-ad49e094] {\n  margin-right: -5rem;\n}\n.-mb-20[data-v-ad49e094] {\n  margin-bottom: -5rem;\n}\n.-ml-20[data-v-ad49e094] {\n  margin-left: -5rem;\n}\n.-mt-24[data-v-ad49e094] {\n  margin-top: -6rem;\n}\n.-mr-24[data-v-ad49e094] {\n  margin-right: -6rem;\n}\n.-mb-24[data-v-ad49e094] {\n  margin-bottom: -6rem;\n}\n.-ml-24[data-v-ad49e094] {\n  margin-left: -6rem;\n}\n.-mt-32[data-v-ad49e094] {\n  margin-top: -8rem;\n}\n.-mr-32[data-v-ad49e094] {\n  margin-right: -8rem;\n}\n.-mb-32[data-v-ad49e094] {\n  margin-bottom: -8rem;\n}\n.-ml-32[data-v-ad49e094] {\n  margin-left: -8rem;\n}\n.-mt-px[data-v-ad49e094] {\n  margin-top: -1px;\n}\n.-mr-px[data-v-ad49e094] {\n  margin-right: -1px;\n}\n.-mb-px[data-v-ad49e094] {\n  margin-bottom: -1px;\n}\n.-ml-px[data-v-ad49e094] {\n  margin-left: -1px;\n}\n.opacity-0[data-v-ad49e094] {\n  opacity: 0;\n}\n.opacity-25[data-v-ad49e094] {\n  opacity: .25;\n}\n.opacity-50[data-v-ad49e094] {\n  opacity: .5;\n}\n.opacity-75[data-v-ad49e094] {\n  opacity: .75;\n}\n.opacity-100[data-v-ad49e094] {\n  opacity: 1;\n}\n.outline-none[data-v-ad49e094] {\n  outline: 0;\n}\n.focus\\:outline-none[data-v-ad49e094]:focus {\n  outline: 0;\n}\n.overflow-auto[data-v-ad49e094] {\n  overflow: auto;\n}\n.overflow-hidden[data-v-ad49e094] {\n  overflow: hidden;\n}\n.overflow-visible[data-v-ad49e094] {\n  overflow: visible;\n}\n.overflow-scroll[data-v-ad49e094] {\n  overflow: scroll;\n}\n.overflow-x-auto[data-v-ad49e094] {\n  overflow-x: auto;\n}\n.overflow-y-auto[data-v-ad49e094] {\n  overflow-y: auto;\n}\n.overflow-x-hidden[data-v-ad49e094] {\n  overflow-x: hidden;\n}\n.overflow-y-hidden[data-v-ad49e094] {\n  overflow-y: hidden;\n}\n.overflow-x-visible[data-v-ad49e094] {\n  overflow-x: visible;\n}\n.overflow-y-visible[data-v-ad49e094] {\n  overflow-y: visible;\n}\n.overflow-x-scroll[data-v-ad49e094] {\n  overflow-x: scroll;\n}\n.overflow-y-scroll[data-v-ad49e094] {\n  overflow-y: scroll;\n}\n.scrolling-touch[data-v-ad49e094] {\n  -webkit-overflow-scrolling: touch;\n}\n.scrolling-auto[data-v-ad49e094] {\n  -webkit-overflow-scrolling: auto;\n}\n.p-0[data-v-ad49e094] {\n  padding: 0;\n}\n.p-1[data-v-ad49e094] {\n  padding: .25rem;\n}\n.p-2[data-v-ad49e094] {\n  padding: .5rem;\n}\n.p-3[data-v-ad49e094] {\n  padding: .75rem;\n}\n.p-4[data-v-ad49e094] {\n  padding: 1rem;\n}\n.p-5[data-v-ad49e094] {\n  padding: 1.25rem;\n}\n.p-6[data-v-ad49e094] {\n  padding: 1.5rem;\n}\n.p-8[data-v-ad49e094] {\n  padding: 2rem;\n}\n.p-10[data-v-ad49e094] {\n  padding: 2.5rem;\n}\n.p-12[data-v-ad49e094] {\n  padding: 3rem;\n}\n.p-16[data-v-ad49e094] {\n  padding: 4rem;\n}\n.p-20[data-v-ad49e094] {\n  padding: 5rem;\n}\n.p-24[data-v-ad49e094] {\n  padding: 6rem;\n}\n.p-32[data-v-ad49e094] {\n  padding: 8rem;\n}\n.p-px[data-v-ad49e094] {\n  padding: 1px;\n}\n.py-0[data-v-ad49e094] {\n  padding-top: 0;\n  padding-bottom: 0;\n}\n.px-0[data-v-ad49e094] {\n  padding-left: 0;\n  padding-right: 0;\n}\n.py-1[data-v-ad49e094] {\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n}\n.px-1[data-v-ad49e094] {\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n.py-2[data-v-ad49e094] {\n  padding-top: .5rem;\n  padding-bottom: .5rem;\n}\n.px-2[data-v-ad49e094] {\n  padding-left: .5rem;\n  padding-right: .5rem;\n}\n.py-3[data-v-ad49e094] {\n  padding-top: .75rem;\n  padding-bottom: .75rem;\n}\n.px-3[data-v-ad49e094] {\n  padding-left: .75rem;\n  padding-right: .75rem;\n}\n.py-4[data-v-ad49e094] {\n  padding-top: 1rem;\n  padding-bottom: 1rem;\n}\n.px-4[data-v-ad49e094] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.py-5[data-v-ad49e094] {\n  padding-top: 1.25rem;\n  padding-bottom: 1.25rem;\n}\n.px-5[data-v-ad49e094] {\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.py-6[data-v-ad49e094] {\n  padding-top: 1.5rem;\n  padding-bottom: 1.5rem;\n}\n.px-6[data-v-ad49e094] {\n  padding-left: 1.5rem;\n  padding-right: 1.5rem;\n}\n.py-8[data-v-ad49e094] {\n  padding-top: 2rem;\n  padding-bottom: 2rem;\n}\n.px-8[data-v-ad49e094] {\n  padding-left: 2rem;\n  padding-right: 2rem;\n}\n.py-10[data-v-ad49e094] {\n  padding-top: 2.5rem;\n  padding-bottom: 2.5rem;\n}\n.px-10[data-v-ad49e094] {\n  padding-left: 2.5rem;\n  padding-right: 2.5rem;\n}\n.py-12[data-v-ad49e094] {\n  padding-top: 3rem;\n  padding-bottom: 3rem;\n}\n.px-12[data-v-ad49e094] {\n  padding-left: 3rem;\n  padding-right: 3rem;\n}\n.py-16[data-v-ad49e094] {\n  padding-top: 4rem;\n  padding-bottom: 4rem;\n}\n.px-16[data-v-ad49e094] {\n  padding-left: 4rem;\n  padding-right: 4rem;\n}\n.py-20[data-v-ad49e094] {\n  padding-top: 5rem;\n  padding-bottom: 5rem;\n}\n.px-20[data-v-ad49e094] {\n  padding-left: 5rem;\n  padding-right: 5rem;\n}\n.py-24[data-v-ad49e094] {\n  padding-top: 6rem;\n  padding-bottom: 6rem;\n}\n.px-24[data-v-ad49e094] {\n  padding-left: 6rem;\n  padding-right: 6rem;\n}\n.py-32[data-v-ad49e094] {\n  padding-top: 8rem;\n  padding-bottom: 8rem;\n}\n.px-32[data-v-ad49e094] {\n  padding-left: 8rem;\n  padding-right: 8rem;\n}\n.py-px[data-v-ad49e094] {\n  padding-top: 1px;\n  padding-bottom: 1px;\n}\n.px-px[data-v-ad49e094] {\n  padding-left: 1px;\n  padding-right: 1px;\n}\n.pt-0[data-v-ad49e094] {\n  padding-top: 0;\n}\n.pr-0[data-v-ad49e094] {\n  padding-right: 0;\n}\n.pb-0[data-v-ad49e094] {\n  padding-bottom: 0;\n}\n.pl-0[data-v-ad49e094] {\n  padding-left: 0;\n}\n.pt-1[data-v-ad49e094] {\n  padding-top: .25rem;\n}\n.pr-1[data-v-ad49e094] {\n  padding-right: .25rem;\n}\n.pb-1[data-v-ad49e094] {\n  padding-bottom: .25rem;\n}\n.pl-1[data-v-ad49e094] {\n  padding-left: .25rem;\n}\n.pt-2[data-v-ad49e094] {\n  padding-top: .5rem;\n}\n.pr-2[data-v-ad49e094] {\n  padding-right: .5rem;\n}\n.pb-2[data-v-ad49e094] {\n  padding-bottom: .5rem;\n}\n.pl-2[data-v-ad49e094] {\n  padding-left: .5rem;\n}\n.pt-3[data-v-ad49e094] {\n  padding-top: .75rem;\n}\n.pr-3[data-v-ad49e094] {\n  padding-right: .75rem;\n}\n.pb-3[data-v-ad49e094] {\n  padding-bottom: .75rem;\n}\n.pl-3[data-v-ad49e094] {\n  padding-left: .75rem;\n}\n.pt-4[data-v-ad49e094] {\n  padding-top: 1rem;\n}\n.pr-4[data-v-ad49e094] {\n  padding-right: 1rem;\n}\n.pb-4[data-v-ad49e094] {\n  padding-bottom: 1rem;\n}\n.pl-4[data-v-ad49e094] {\n  padding-left: 1rem;\n}\n.pt-5[data-v-ad49e094] {\n  padding-top: 1.25rem;\n}\n.pr-5[data-v-ad49e094] {\n  padding-right: 1.25rem;\n}\n.pb-5[data-v-ad49e094] {\n  padding-bottom: 1.25rem;\n}\n.pl-5[data-v-ad49e094] {\n  padding-left: 1.25rem;\n}\n.pt-6[data-v-ad49e094] {\n  padding-top: 1.5rem;\n}\n.pr-6[data-v-ad49e094] {\n  padding-right: 1.5rem;\n}\n.pb-6[data-v-ad49e094] {\n  padding-bottom: 1.5rem;\n}\n.pl-6[data-v-ad49e094] {\n  padding-left: 1.5rem;\n}\n.pt-8[data-v-ad49e094] {\n  padding-top: 2rem;\n}\n.pr-8[data-v-ad49e094] {\n  padding-right: 2rem;\n}\n.pb-8[data-v-ad49e094] {\n  padding-bottom: 2rem;\n}\n.pl-8[data-v-ad49e094] {\n  padding-left: 2rem;\n}\n.pt-10[data-v-ad49e094] {\n  padding-top: 2.5rem;\n}\n.pr-10[data-v-ad49e094] {\n  padding-right: 2.5rem;\n}\n.pb-10[data-v-ad49e094] {\n  padding-bottom: 2.5rem;\n}\n.pl-10[data-v-ad49e094] {\n  padding-left: 2.5rem;\n}\n.pt-12[data-v-ad49e094] {\n  padding-top: 3rem;\n}\n.pr-12[data-v-ad49e094] {\n  padding-right: 3rem;\n}\n.pb-12[data-v-ad49e094] {\n  padding-bottom: 3rem;\n}\n.pl-12[data-v-ad49e094] {\n  padding-left: 3rem;\n}\n.pt-16[data-v-ad49e094] {\n  padding-top: 4rem;\n}\n.pr-16[data-v-ad49e094] {\n  padding-right: 4rem;\n}\n.pb-16[data-v-ad49e094] {\n  padding-bottom: 4rem;\n}\n.pl-16[data-v-ad49e094] {\n  padding-left: 4rem;\n}\n.pt-20[data-v-ad49e094] {\n  padding-top: 5rem;\n}\n.pr-20[data-v-ad49e094] {\n  padding-right: 5rem;\n}\n.pb-20[data-v-ad49e094] {\n  padding-bottom: 5rem;\n}\n.pl-20[data-v-ad49e094] {\n  padding-left: 5rem;\n}\n.pt-24[data-v-ad49e094] {\n  padding-top: 6rem;\n}\n.pr-24[data-v-ad49e094] {\n  padding-right: 6rem;\n}\n.pb-24[data-v-ad49e094] {\n  padding-bottom: 6rem;\n}\n.pl-24[data-v-ad49e094] {\n  padding-left: 6rem;\n}\n.pt-32[data-v-ad49e094] {\n  padding-top: 8rem;\n}\n.pr-32[data-v-ad49e094] {\n  padding-right: 8rem;\n}\n.pb-32[data-v-ad49e094] {\n  padding-bottom: 8rem;\n}\n.pl-32[data-v-ad49e094] {\n  padding-left: 8rem;\n}\n.pt-px[data-v-ad49e094] {\n  padding-top: 1px;\n}\n.pr-px[data-v-ad49e094] {\n  padding-right: 1px;\n}\n.pb-px[data-v-ad49e094] {\n  padding-bottom: 1px;\n}\n.pl-px[data-v-ad49e094] {\n  padding-left: 1px;\n}\n.pointer-events-none[data-v-ad49e094] {\n  pointer-events: none;\n}\n.pointer-events-auto[data-v-ad49e094] {\n  pointer-events: auto;\n}\n.static[data-v-ad49e094] {\n  position: static;\n}\n.fixed[data-v-ad49e094] {\n  position: fixed;\n}\n.absolute[data-v-ad49e094] {\n  position: absolute;\n}\n.relative[data-v-ad49e094] {\n  position: relative;\n}\n.sticky[data-v-ad49e094] {\n  position: -webkit-sticky;\n  position: sticky;\n}\n.pin-none[data-v-ad49e094] {\n  top: auto;\n  right: auto;\n  bottom: auto;\n  left: auto;\n}\n.pin[data-v-ad49e094] {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.pin-y[data-v-ad49e094] {\n  top: 0;\n  bottom: 0;\n}\n.pin-x[data-v-ad49e094] {\n  right: 0;\n  left: 0;\n}\n.pin-t[data-v-ad49e094] {\n  top: 0;\n}\n.pin-r[data-v-ad49e094] {\n  right: 0;\n}\n.pin-b[data-v-ad49e094] {\n  bottom: 0;\n}\n.pin-l[data-v-ad49e094] {\n  left: 0;\n}\n.resize-none[data-v-ad49e094] {\n  resize: none;\n}\n.resize-y[data-v-ad49e094] {\n  resize: vertical;\n}\n.resize-x[data-v-ad49e094] {\n  resize: horizontal;\n}\n.resize[data-v-ad49e094] {\n  resize: both;\n}\n.shadow[data-v-ad49e094] {\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.shadow-md[data-v-ad49e094] {\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.shadow-lg[data-v-ad49e094] {\n  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.shadow-inner[data-v-ad49e094] {\n  -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.shadow-outline[data-v-ad49e094] {\n  -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n          box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.shadow-none[data-v-ad49e094] {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.hover\\:shadow[data-v-ad49e094]:hover {\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.hover\\:shadow-md[data-v-ad49e094]:hover {\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.hover\\:shadow-lg[data-v-ad49e094]:hover {\n  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.hover\\:shadow-inner[data-v-ad49e094]:hover {\n  -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.hover\\:shadow-outline[data-v-ad49e094]:hover {\n  -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n          box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.hover\\:shadow-none[data-v-ad49e094]:hover {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.focus\\:shadow[data-v-ad49e094]:focus {\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.focus\\:shadow-md[data-v-ad49e094]:focus {\n  -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.focus\\:shadow-lg[data-v-ad49e094]:focus {\n  -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n          box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.focus\\:shadow-inner[data-v-ad49e094]:focus {\n  -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n          box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.focus\\:shadow-outline[data-v-ad49e094]:focus {\n  -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n          box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.focus\\:shadow-none[data-v-ad49e094]:focus {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.fill-current[data-v-ad49e094] {\n  fill: currentColor;\n}\n.stroke-current[data-v-ad49e094] {\n  stroke: currentColor;\n}\n.table-auto[data-v-ad49e094] {\n  table-layout: auto;\n}\n.table-fixed[data-v-ad49e094] {\n  table-layout: fixed;\n}\n.text-left[data-v-ad49e094] {\n  text-align: left;\n}\n.text-center[data-v-ad49e094] {\n  text-align: center;\n}\n.text-right[data-v-ad49e094] {\n  text-align: right;\n}\n.text-justify[data-v-ad49e094] {\n  text-align: justify;\n}\n.text-transparent[data-v-ad49e094] {\n  color: transparent;\n}\n.text-black[data-v-ad49e094] {\n  color: #22292f;\n}\n.text-grey-darkest[data-v-ad49e094] {\n  color: #3d4852;\n}\n.text-grey-darker[data-v-ad49e094] {\n  color: #606f7b;\n}\n.text-grey-dark[data-v-ad49e094] {\n  color: #8795a1;\n}\n.text-grey[data-v-ad49e094] {\n  color: #b8c2cc;\n}\n.text-grey-light[data-v-ad49e094] {\n  color: #dae1e7;\n}\n.text-grey-lighter[data-v-ad49e094] {\n  color: #f1f5f8;\n}\n.text-grey-lightest[data-v-ad49e094] {\n  color: #f8fafc;\n}\n.text-white[data-v-ad49e094] {\n  color: #fff;\n}\n.text-red-darkest[data-v-ad49e094] {\n  color: #3b0d0c;\n}\n.text-red-darker[data-v-ad49e094] {\n  color: #621b18;\n}\n.text-red-dark[data-v-ad49e094] {\n  color: #cc1f1a;\n}\n.text-red[data-v-ad49e094] {\n  color: #e3342f;\n}\n.text-red-light[data-v-ad49e094] {\n  color: #ef5753;\n}\n.text-red-lighter[data-v-ad49e094] {\n  color: #f9acaa;\n}\n.text-red-lightest[data-v-ad49e094] {\n  color: #fcebea;\n}\n.text-orange-darkest[data-v-ad49e094] {\n  color: #462a16;\n}\n.text-orange-darker[data-v-ad49e094] {\n  color: #613b1f;\n}\n.text-orange-dark[data-v-ad49e094] {\n  color: #de751f;\n}\n.text-orange[data-v-ad49e094] {\n  color: #f6993f;\n}\n.text-orange-light[data-v-ad49e094] {\n  color: #faad63;\n}\n.text-orange-lighter[data-v-ad49e094] {\n  color: #fcd9b6;\n}\n.text-orange-lightest[data-v-ad49e094] {\n  color: #fff5eb;\n}\n.text-yellow-darkest[data-v-ad49e094] {\n  color: #453411;\n}\n.text-yellow-darker[data-v-ad49e094] {\n  color: #684f1d;\n}\n.text-yellow-dark[data-v-ad49e094] {\n  color: #f2d024;\n}\n.text-yellow[data-v-ad49e094] {\n  color: #ffed4a;\n}\n.text-yellow-light[data-v-ad49e094] {\n  color: #fff382;\n}\n.text-yellow-lighter[data-v-ad49e094] {\n  color: #fff9c2;\n}\n.text-yellow-lightest[data-v-ad49e094] {\n  color: #fcfbeb;\n}\n.text-green-darkest[data-v-ad49e094] {\n  color: #0f2f21;\n}\n.text-green-darker[data-v-ad49e094] {\n  color: #1a4731;\n}\n.text-green-dark[data-v-ad49e094] {\n  color: #1f9d55;\n}\n.text-green[data-v-ad49e094] {\n  color: #38c172;\n}\n.text-green-light[data-v-ad49e094] {\n  color: #51d88a;\n}\n.text-green-lighter[data-v-ad49e094] {\n  color: #a2f5bf;\n}\n.text-green-lightest[data-v-ad49e094] {\n  color: #e3fcec;\n}\n.text-teal-darkest[data-v-ad49e094] {\n  color: #0d3331;\n}\n.text-teal-darker[data-v-ad49e094] {\n  color: #20504f;\n}\n.text-teal-dark[data-v-ad49e094] {\n  color: #38a89d;\n}\n.text-teal[data-v-ad49e094] {\n  color: #4dc0b5;\n}\n.text-teal-light[data-v-ad49e094] {\n  color: #64d5ca;\n}\n.text-teal-lighter[data-v-ad49e094] {\n  color: #a0f0ed;\n}\n.text-teal-lightest[data-v-ad49e094] {\n  color: #e8fffe;\n}\n.text-blue-darkest[data-v-ad49e094] {\n  color: #12283a;\n}\n.text-blue-darker[data-v-ad49e094] {\n  color: #1c3d5a;\n}\n.text-blue-dark[data-v-ad49e094] {\n  color: #2779bd;\n}\n.text-blue[data-v-ad49e094] {\n  color: #3490dc;\n}\n.text-blue-light[data-v-ad49e094] {\n  color: #6cb2eb;\n}\n.text-blue-lighter[data-v-ad49e094] {\n  color: #bcdefa;\n}\n.text-blue-lightest[data-v-ad49e094] {\n  color: #eff8ff;\n}\n.text-indigo-darkest[data-v-ad49e094] {\n  color: #191e38;\n}\n.text-indigo-darker[data-v-ad49e094] {\n  color: #2f365f;\n}\n.text-indigo-dark[data-v-ad49e094] {\n  color: #5661b3;\n}\n.text-indigo[data-v-ad49e094] {\n  color: #6574cd;\n}\n.text-indigo-light[data-v-ad49e094] {\n  color: #7886d7;\n}\n.text-indigo-lighter[data-v-ad49e094] {\n  color: #b2b7ff;\n}\n.text-indigo-lightest[data-v-ad49e094] {\n  color: #e6e8ff;\n}\n.text-purple-darkest[data-v-ad49e094] {\n  color: #21183c;\n}\n.text-purple-darker[data-v-ad49e094] {\n  color: #382b5f;\n}\n.text-purple-dark[data-v-ad49e094] {\n  color: #794acf;\n}\n.text-purple[data-v-ad49e094] {\n  color: #9561e2;\n}\n.text-purple-light[data-v-ad49e094] {\n  color: #a779e9;\n}\n.text-purple-lighter[data-v-ad49e094] {\n  color: #d6bbfc;\n}\n.text-purple-lightest[data-v-ad49e094] {\n  color: #f3ebff;\n}\n.text-pink-darkest[data-v-ad49e094] {\n  color: #451225;\n}\n.text-pink-darker[data-v-ad49e094] {\n  color: #6f213f;\n}\n.text-pink-dark[data-v-ad49e094] {\n  color: #eb5286;\n}\n.text-pink[data-v-ad49e094] {\n  color: #f66d9b;\n}\n.text-pink-light[data-v-ad49e094] {\n  color: #fa7ea8;\n}\n.text-pink-lighter[data-v-ad49e094] {\n  color: #ffbbca;\n}\n.text-pink-lightest[data-v-ad49e094] {\n  color: #ffebef;\n}\n.hover\\:text-transparent[data-v-ad49e094]:hover {\n  color: transparent;\n}\n.hover\\:text-black[data-v-ad49e094]:hover {\n  color: #22292f;\n}\n.hover\\:text-grey-darkest[data-v-ad49e094]:hover {\n  color: #3d4852;\n}\n.hover\\:text-grey-darker[data-v-ad49e094]:hover {\n  color: #606f7b;\n}\n.hover\\:text-grey-dark[data-v-ad49e094]:hover {\n  color: #8795a1;\n}\n.hover\\:text-grey[data-v-ad49e094]:hover {\n  color: #b8c2cc;\n}\n.hover\\:text-grey-light[data-v-ad49e094]:hover {\n  color: #dae1e7;\n}\n.hover\\:text-grey-lighter[data-v-ad49e094]:hover {\n  color: #f1f5f8;\n}\n.hover\\:text-grey-lightest[data-v-ad49e094]:hover {\n  color: #f8fafc;\n}\n.hover\\:text-white[data-v-ad49e094]:hover {\n  color: #fff;\n}\n.hover\\:text-red-darkest[data-v-ad49e094]:hover {\n  color: #3b0d0c;\n}\n.hover\\:text-red-darker[data-v-ad49e094]:hover {\n  color: #621b18;\n}\n.hover\\:text-red-dark[data-v-ad49e094]:hover {\n  color: #cc1f1a;\n}\n.hover\\:text-red[data-v-ad49e094]:hover {\n  color: #e3342f;\n}\n.hover\\:text-red-light[data-v-ad49e094]:hover {\n  color: #ef5753;\n}\n.hover\\:text-red-lighter[data-v-ad49e094]:hover {\n  color: #f9acaa;\n}\n.hover\\:text-red-lightest[data-v-ad49e094]:hover {\n  color: #fcebea;\n}\n.hover\\:text-orange-darkest[data-v-ad49e094]:hover {\n  color: #462a16;\n}\n.hover\\:text-orange-darker[data-v-ad49e094]:hover {\n  color: #613b1f;\n}\n.hover\\:text-orange-dark[data-v-ad49e094]:hover {\n  color: #de751f;\n}\n.hover\\:text-orange[data-v-ad49e094]:hover {\n  color: #f6993f;\n}\n.hover\\:text-orange-light[data-v-ad49e094]:hover {\n  color: #faad63;\n}\n.hover\\:text-orange-lighter[data-v-ad49e094]:hover {\n  color: #fcd9b6;\n}\n.hover\\:text-orange-lightest[data-v-ad49e094]:hover {\n  color: #fff5eb;\n}\n.hover\\:text-yellow-darkest[data-v-ad49e094]:hover {\n  color: #453411;\n}\n.hover\\:text-yellow-darker[data-v-ad49e094]:hover {\n  color: #684f1d;\n}\n.hover\\:text-yellow-dark[data-v-ad49e094]:hover {\n  color: #f2d024;\n}\n.hover\\:text-yellow[data-v-ad49e094]:hover {\n  color: #ffed4a;\n}\n.hover\\:text-yellow-light[data-v-ad49e094]:hover {\n  color: #fff382;\n}\n.hover\\:text-yellow-lighter[data-v-ad49e094]:hover {\n  color: #fff9c2;\n}\n.hover\\:text-yellow-lightest[data-v-ad49e094]:hover {\n  color: #fcfbeb;\n}\n.hover\\:text-green-darkest[data-v-ad49e094]:hover {\n  color: #0f2f21;\n}\n.hover\\:text-green-darker[data-v-ad49e094]:hover {\n  color: #1a4731;\n}\n.hover\\:text-green-dark[data-v-ad49e094]:hover {\n  color: #1f9d55;\n}\n.hover\\:text-green[data-v-ad49e094]:hover {\n  color: #38c172;\n}\n.hover\\:text-green-light[data-v-ad49e094]:hover {\n  color: #51d88a;\n}\n.hover\\:text-green-lighter[data-v-ad49e094]:hover {\n  color: #a2f5bf;\n}\n.hover\\:text-green-lightest[data-v-ad49e094]:hover {\n  color: #e3fcec;\n}\n.hover\\:text-teal-darkest[data-v-ad49e094]:hover {\n  color: #0d3331;\n}\n.hover\\:text-teal-darker[data-v-ad49e094]:hover {\n  color: #20504f;\n}\n.hover\\:text-teal-dark[data-v-ad49e094]:hover {\n  color: #38a89d;\n}\n.hover\\:text-teal[data-v-ad49e094]:hover {\n  color: #4dc0b5;\n}\n.hover\\:text-teal-light[data-v-ad49e094]:hover {\n  color: #64d5ca;\n}\n.hover\\:text-teal-lighter[data-v-ad49e094]:hover {\n  color: #a0f0ed;\n}\n.hover\\:text-teal-lightest[data-v-ad49e094]:hover {\n  color: #e8fffe;\n}\n.hover\\:text-blue-darkest[data-v-ad49e094]:hover {\n  color: #12283a;\n}\n.hover\\:text-blue-darker[data-v-ad49e094]:hover {\n  color: #1c3d5a;\n}\n.hover\\:text-blue-dark[data-v-ad49e094]:hover {\n  color: #2779bd;\n}\n.hover\\:text-blue[data-v-ad49e094]:hover {\n  color: #3490dc;\n}\n.hover\\:text-blue-light[data-v-ad49e094]:hover {\n  color: #6cb2eb;\n}\n.hover\\:text-blue-lighter[data-v-ad49e094]:hover {\n  color: #bcdefa;\n}\n.hover\\:text-blue-lightest[data-v-ad49e094]:hover {\n  color: #eff8ff;\n}\n.hover\\:text-indigo-darkest[data-v-ad49e094]:hover {\n  color: #191e38;\n}\n.hover\\:text-indigo-darker[data-v-ad49e094]:hover {\n  color: #2f365f;\n}\n.hover\\:text-indigo-dark[data-v-ad49e094]:hover {\n  color: #5661b3;\n}\n.hover\\:text-indigo[data-v-ad49e094]:hover {\n  color: #6574cd;\n}\n.hover\\:text-indigo-light[data-v-ad49e094]:hover {\n  color: #7886d7;\n}\n.hover\\:text-indigo-lighter[data-v-ad49e094]:hover {\n  color: #b2b7ff;\n}\n.hover\\:text-indigo-lightest[data-v-ad49e094]:hover {\n  color: #e6e8ff;\n}\n.hover\\:text-purple-darkest[data-v-ad49e094]:hover {\n  color: #21183c;\n}\n.hover\\:text-purple-darker[data-v-ad49e094]:hover {\n  color: #382b5f;\n}\n.hover\\:text-purple-dark[data-v-ad49e094]:hover {\n  color: #794acf;\n}\n.hover\\:text-purple[data-v-ad49e094]:hover {\n  color: #9561e2;\n}\n.hover\\:text-purple-light[data-v-ad49e094]:hover {\n  color: #a779e9;\n}\n.hover\\:text-purple-lighter[data-v-ad49e094]:hover {\n  color: #d6bbfc;\n}\n.hover\\:text-purple-lightest[data-v-ad49e094]:hover {\n  color: #f3ebff;\n}\n.hover\\:text-pink-darkest[data-v-ad49e094]:hover {\n  color: #451225;\n}\n.hover\\:text-pink-darker[data-v-ad49e094]:hover {\n  color: #6f213f;\n}\n.hover\\:text-pink-dark[data-v-ad49e094]:hover {\n  color: #eb5286;\n}\n.hover\\:text-pink[data-v-ad49e094]:hover {\n  color: #f66d9b;\n}\n.hover\\:text-pink-light[data-v-ad49e094]:hover {\n  color: #fa7ea8;\n}\n.hover\\:text-pink-lighter[data-v-ad49e094]:hover {\n  color: #ffbbca;\n}\n.hover\\:text-pink-lightest[data-v-ad49e094]:hover {\n  color: #ffebef;\n}\n.focus\\:text-transparent[data-v-ad49e094]:focus {\n  color: transparent;\n}\n.focus\\:text-black[data-v-ad49e094]:focus {\n  color: #22292f;\n}\n.focus\\:text-grey-darkest[data-v-ad49e094]:focus {\n  color: #3d4852;\n}\n.focus\\:text-grey-darker[data-v-ad49e094]:focus {\n  color: #606f7b;\n}\n.focus\\:text-grey-dark[data-v-ad49e094]:focus {\n  color: #8795a1;\n}\n.focus\\:text-grey[data-v-ad49e094]:focus {\n  color: #b8c2cc;\n}\n.focus\\:text-grey-light[data-v-ad49e094]:focus {\n  color: #dae1e7;\n}\n.focus\\:text-grey-lighter[data-v-ad49e094]:focus {\n  color: #f1f5f8;\n}\n.focus\\:text-grey-lightest[data-v-ad49e094]:focus {\n  color: #f8fafc;\n}\n.focus\\:text-white[data-v-ad49e094]:focus {\n  color: #fff;\n}\n.focus\\:text-red-darkest[data-v-ad49e094]:focus {\n  color: #3b0d0c;\n}\n.focus\\:text-red-darker[data-v-ad49e094]:focus {\n  color: #621b18;\n}\n.focus\\:text-red-dark[data-v-ad49e094]:focus {\n  color: #cc1f1a;\n}\n.focus\\:text-red[data-v-ad49e094]:focus {\n  color: #e3342f;\n}\n.focus\\:text-red-light[data-v-ad49e094]:focus {\n  color: #ef5753;\n}\n.focus\\:text-red-lighter[data-v-ad49e094]:focus {\n  color: #f9acaa;\n}\n.focus\\:text-red-lightest[data-v-ad49e094]:focus {\n  color: #fcebea;\n}\n.focus\\:text-orange-darkest[data-v-ad49e094]:focus {\n  color: #462a16;\n}\n.focus\\:text-orange-darker[data-v-ad49e094]:focus {\n  color: #613b1f;\n}\n.focus\\:text-orange-dark[data-v-ad49e094]:focus {\n  color: #de751f;\n}\n.focus\\:text-orange[data-v-ad49e094]:focus {\n  color: #f6993f;\n}\n.focus\\:text-orange-light[data-v-ad49e094]:focus {\n  color: #faad63;\n}\n.focus\\:text-orange-lighter[data-v-ad49e094]:focus {\n  color: #fcd9b6;\n}\n.focus\\:text-orange-lightest[data-v-ad49e094]:focus {\n  color: #fff5eb;\n}\n.focus\\:text-yellow-darkest[data-v-ad49e094]:focus {\n  color: #453411;\n}\n.focus\\:text-yellow-darker[data-v-ad49e094]:focus {\n  color: #684f1d;\n}\n.focus\\:text-yellow-dark[data-v-ad49e094]:focus {\n  color: #f2d024;\n}\n.focus\\:text-yellow[data-v-ad49e094]:focus {\n  color: #ffed4a;\n}\n.focus\\:text-yellow-light[data-v-ad49e094]:focus {\n  color: #fff382;\n}\n.focus\\:text-yellow-lighter[data-v-ad49e094]:focus {\n  color: #fff9c2;\n}\n.focus\\:text-yellow-lightest[data-v-ad49e094]:focus {\n  color: #fcfbeb;\n}\n.focus\\:text-green-darkest[data-v-ad49e094]:focus {\n  color: #0f2f21;\n}\n.focus\\:text-green-darker[data-v-ad49e094]:focus {\n  color: #1a4731;\n}\n.focus\\:text-green-dark[data-v-ad49e094]:focus {\n  color: #1f9d55;\n}\n.focus\\:text-green[data-v-ad49e094]:focus {\n  color: #38c172;\n}\n.focus\\:text-green-light[data-v-ad49e094]:focus {\n  color: #51d88a;\n}\n.focus\\:text-green-lighter[data-v-ad49e094]:focus {\n  color: #a2f5bf;\n}\n.focus\\:text-green-lightest[data-v-ad49e094]:focus {\n  color: #e3fcec;\n}\n.focus\\:text-teal-darkest[data-v-ad49e094]:focus {\n  color: #0d3331;\n}\n.focus\\:text-teal-darker[data-v-ad49e094]:focus {\n  color: #20504f;\n}\n.focus\\:text-teal-dark[data-v-ad49e094]:focus {\n  color: #38a89d;\n}\n.focus\\:text-teal[data-v-ad49e094]:focus {\n  color: #4dc0b5;\n}\n.focus\\:text-teal-light[data-v-ad49e094]:focus {\n  color: #64d5ca;\n}\n.focus\\:text-teal-lighter[data-v-ad49e094]:focus {\n  color: #a0f0ed;\n}\n.focus\\:text-teal-lightest[data-v-ad49e094]:focus {\n  color: #e8fffe;\n}\n.focus\\:text-blue-darkest[data-v-ad49e094]:focus {\n  color: #12283a;\n}\n.focus\\:text-blue-darker[data-v-ad49e094]:focus {\n  color: #1c3d5a;\n}\n.focus\\:text-blue-dark[data-v-ad49e094]:focus {\n  color: #2779bd;\n}\n.focus\\:text-blue[data-v-ad49e094]:focus {\n  color: #3490dc;\n}\n.focus\\:text-blue-light[data-v-ad49e094]:focus {\n  color: #6cb2eb;\n}\n.focus\\:text-blue-lighter[data-v-ad49e094]:focus {\n  color: #bcdefa;\n}\n.focus\\:text-blue-lightest[data-v-ad49e094]:focus {\n  color: #eff8ff;\n}\n.focus\\:text-indigo-darkest[data-v-ad49e094]:focus {\n  color: #191e38;\n}\n.focus\\:text-indigo-darker[data-v-ad49e094]:focus {\n  color: #2f365f;\n}\n.focus\\:text-indigo-dark[data-v-ad49e094]:focus {\n  color: #5661b3;\n}\n.focus\\:text-indigo[data-v-ad49e094]:focus {\n  color: #6574cd;\n}\n.focus\\:text-indigo-light[data-v-ad49e094]:focus {\n  color: #7886d7;\n}\n.focus\\:text-indigo-lighter[data-v-ad49e094]:focus {\n  color: #b2b7ff;\n}\n.focus\\:text-indigo-lightest[data-v-ad49e094]:focus {\n  color: #e6e8ff;\n}\n.focus\\:text-purple-darkest[data-v-ad49e094]:focus {\n  color: #21183c;\n}\n.focus\\:text-purple-darker[data-v-ad49e094]:focus {\n  color: #382b5f;\n}\n.focus\\:text-purple-dark[data-v-ad49e094]:focus {\n  color: #794acf;\n}\n.focus\\:text-purple[data-v-ad49e094]:focus {\n  color: #9561e2;\n}\n.focus\\:text-purple-light[data-v-ad49e094]:focus {\n  color: #a779e9;\n}\n.focus\\:text-purple-lighter[data-v-ad49e094]:focus {\n  color: #d6bbfc;\n}\n.focus\\:text-purple-lightest[data-v-ad49e094]:focus {\n  color: #f3ebff;\n}\n.focus\\:text-pink-darkest[data-v-ad49e094]:focus {\n  color: #451225;\n}\n.focus\\:text-pink-darker[data-v-ad49e094]:focus {\n  color: #6f213f;\n}\n.focus\\:text-pink-dark[data-v-ad49e094]:focus {\n  color: #eb5286;\n}\n.focus\\:text-pink[data-v-ad49e094]:focus {\n  color: #f66d9b;\n}\n.focus\\:text-pink-light[data-v-ad49e094]:focus {\n  color: #fa7ea8;\n}\n.focus\\:text-pink-lighter[data-v-ad49e094]:focus {\n  color: #ffbbca;\n}\n.focus\\:text-pink-lightest[data-v-ad49e094]:focus {\n  color: #ffebef;\n}\n.text-xs[data-v-ad49e094] {\n  font-size: .75rem;\n}\n.text-sm[data-v-ad49e094] {\n  font-size: .875rem;\n}\n.text-base[data-v-ad49e094] {\n  font-size: 1rem;\n}\n.text-lg[data-v-ad49e094] {\n  font-size: 1.125rem;\n}\n.text-xl[data-v-ad49e094] {\n  font-size: 1.25rem;\n}\n.text-2xl[data-v-ad49e094] {\n  font-size: 1.5rem;\n}\n.text-3xl[data-v-ad49e094] {\n  font-size: 1.875rem;\n}\n.text-4xl[data-v-ad49e094] {\n  font-size: 2.25rem;\n}\n.text-5xl[data-v-ad49e094] {\n  font-size: 3rem;\n}\n.italic[data-v-ad49e094] {\n  font-style: italic;\n}\n.roman[data-v-ad49e094] {\n  font-style: normal;\n}\n.uppercase[data-v-ad49e094] {\n  text-transform: uppercase;\n}\n.lowercase[data-v-ad49e094] {\n  text-transform: lowercase;\n}\n.capitalize[data-v-ad49e094] {\n  text-transform: capitalize;\n}\n.normal-case[data-v-ad49e094] {\n  text-transform: none;\n}\n.underline[data-v-ad49e094] {\n  text-decoration: underline;\n}\n.line-through[data-v-ad49e094] {\n  text-decoration: line-through;\n}\n.no-underline[data-v-ad49e094] {\n  text-decoration: none;\n}\n.antialiased[data-v-ad49e094] {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.subpixel-antialiased[data-v-ad49e094] {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n.hover\\:italic[data-v-ad49e094]:hover {\n  font-style: italic;\n}\n.hover\\:roman[data-v-ad49e094]:hover {\n  font-style: normal;\n}\n.hover\\:uppercase[data-v-ad49e094]:hover {\n  text-transform: uppercase;\n}\n.hover\\:lowercase[data-v-ad49e094]:hover {\n  text-transform: lowercase;\n}\n.hover\\:capitalize[data-v-ad49e094]:hover {\n  text-transform: capitalize;\n}\n.hover\\:normal-case[data-v-ad49e094]:hover {\n  text-transform: none;\n}\n.hover\\:underline[data-v-ad49e094]:hover {\n  text-decoration: underline;\n}\n.hover\\:line-through[data-v-ad49e094]:hover {\n  text-decoration: line-through;\n}\n.hover\\:no-underline[data-v-ad49e094]:hover {\n  text-decoration: none;\n}\n.hover\\:antialiased[data-v-ad49e094]:hover {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.hover\\:subpixel-antialiased[data-v-ad49e094]:hover {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n.focus\\:italic[data-v-ad49e094]:focus {\n  font-style: italic;\n}\n.focus\\:roman[data-v-ad49e094]:focus {\n  font-style: normal;\n}\n.focus\\:uppercase[data-v-ad49e094]:focus {\n  text-transform: uppercase;\n}\n.focus\\:lowercase[data-v-ad49e094]:focus {\n  text-transform: lowercase;\n}\n.focus\\:capitalize[data-v-ad49e094]:focus {\n  text-transform: capitalize;\n}\n.focus\\:normal-case[data-v-ad49e094]:focus {\n  text-transform: none;\n}\n.focus\\:underline[data-v-ad49e094]:focus {\n  text-decoration: underline;\n}\n.focus\\:line-through[data-v-ad49e094]:focus {\n  text-decoration: line-through;\n}\n.focus\\:no-underline[data-v-ad49e094]:focus {\n  text-decoration: none;\n}\n.focus\\:antialiased[data-v-ad49e094]:focus {\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.focus\\:subpixel-antialiased[data-v-ad49e094]:focus {\n  -webkit-font-smoothing: auto;\n  -moz-osx-font-smoothing: auto;\n}\n.tracking-tight[data-v-ad49e094] {\n  letter-spacing: -0.05em;\n}\n.tracking-normal[data-v-ad49e094] {\n  letter-spacing: 0;\n}\n.tracking-wide[data-v-ad49e094] {\n  letter-spacing: .05em;\n}\n.select-none[data-v-ad49e094] {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.select-text[data-v-ad49e094] {\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n.align-baseline[data-v-ad49e094] {\n  vertical-align: baseline;\n}\n.align-top[data-v-ad49e094] {\n  vertical-align: top;\n}\n.align-middle[data-v-ad49e094] {\n  vertical-align: middle;\n}\n.align-bottom[data-v-ad49e094] {\n  vertical-align: bottom;\n}\n.align-text-top[data-v-ad49e094] {\n  vertical-align: text-top;\n}\n.align-text-bottom[data-v-ad49e094] {\n  vertical-align: text-bottom;\n}\n.visible[data-v-ad49e094] {\n  visibility: visible;\n}\n.invisible[data-v-ad49e094] {\n  visibility: hidden;\n}\n.whitespace-normal[data-v-ad49e094] {\n  white-space: normal;\n}\n.whitespace-no-wrap[data-v-ad49e094] {\n  white-space: nowrap;\n}\n.whitespace-pre[data-v-ad49e094] {\n  white-space: pre;\n}\n.whitespace-pre-line[data-v-ad49e094] {\n  white-space: pre-line;\n}\n.whitespace-pre-wrap[data-v-ad49e094] {\n  white-space: pre-wrap;\n}\n.break-words[data-v-ad49e094] {\n  word-wrap: break-word;\n}\n.break-normal[data-v-ad49e094] {\n  word-wrap: normal;\n}\n.truncate[data-v-ad49e094] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.w-1[data-v-ad49e094] {\n  width: .25rem;\n}\n.w-2[data-v-ad49e094] {\n  width: .5rem;\n}\n.w-3[data-v-ad49e094] {\n  width: .75rem;\n}\n.w-4[data-v-ad49e094] {\n  width: 1rem;\n}\n.w-5[data-v-ad49e094] {\n  width: 1.25rem;\n}\n.w-6[data-v-ad49e094] {\n  width: 1.5rem;\n}\n.w-8[data-v-ad49e094] {\n  width: 2rem;\n}\n.w-10[data-v-ad49e094] {\n  width: 2.5rem;\n}\n.w-12[data-v-ad49e094] {\n  width: 3rem;\n}\n.w-16[data-v-ad49e094] {\n  width: 4rem;\n}\n.w-24[data-v-ad49e094] {\n  width: 6rem;\n}\n.w-32[data-v-ad49e094] {\n  width: 8rem;\n}\n.w-48[data-v-ad49e094] {\n  width: 12rem;\n}\n.w-64[data-v-ad49e094] {\n  width: 16rem;\n}\n.w-auto[data-v-ad49e094] {\n  width: auto;\n}\n.w-px[data-v-ad49e094] {\n  width: 1px;\n}\n.w-1\\/2[data-v-ad49e094] {\n  width: 50%;\n}\n.w-1\\/3[data-v-ad49e094] {\n  width: 33.33333%;\n}\n.w-2\\/3[data-v-ad49e094] {\n  width: 66.66667%;\n}\n.w-1\\/4[data-v-ad49e094] {\n  width: 25%;\n}\n.w-3\\/4[data-v-ad49e094] {\n  width: 75%;\n}\n.w-1\\/5[data-v-ad49e094] {\n  width: 20%;\n}\n.w-2\\/5[data-v-ad49e094] {\n  width: 40%;\n}\n.w-3\\/5[data-v-ad49e094] {\n  width: 60%;\n}\n.w-4\\/5[data-v-ad49e094] {\n  width: 80%;\n}\n.w-1\\/6[data-v-ad49e094] {\n  width: 16.66667%;\n}\n.w-5\\/6[data-v-ad49e094] {\n  width: 83.33333%;\n}\n.w-full[data-v-ad49e094] {\n  width: 100%;\n}\n.w-screen[data-v-ad49e094] {\n  width: 100vw;\n}\n.z-0[data-v-ad49e094] {\n  z-index: 0;\n}\n.z-10[data-v-ad49e094] {\n  z-index: 10;\n}\n.z-20[data-v-ad49e094] {\n  z-index: 20;\n}\n.z-30[data-v-ad49e094] {\n  z-index: 30;\n}\n.z-40[data-v-ad49e094] {\n  z-index: 40;\n}\n.z-50[data-v-ad49e094] {\n  z-index: 50;\n}\n.z-auto[data-v-ad49e094] {\n  z-index: auto;\n}\n.login[data-v-ad49e094] {\n  width: 100vw;\n  height: 100vh;\n  background-color: #dae1e7;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n.login .form[data-v-ad49e094] {\n  max-width: 400px;\n  width: 25%;\n  background-color: #fff;\n  padding: 1.25rem;\n  border-radius: .5rem;\n  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n@media (min-width: 576px) {\n.sm\\:list-reset[data-v-ad49e094] {\n    list-style: none;\n    padding: 0;\n}\n.sm\\:appearance-none[data-v-ad49e094] {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n}\n.sm\\:bg-fixed[data-v-ad49e094] {\n    background-attachment: fixed;\n}\n.sm\\:bg-local[data-v-ad49e094] {\n    background-attachment: local;\n}\n.sm\\:bg-scroll[data-v-ad49e094] {\n    background-attachment: scroll;\n}\n.sm\\:bg-transparent[data-v-ad49e094] {\n    background-color: transparent;\n}\n.sm\\:bg-black[data-v-ad49e094] {\n    background-color: #22292f;\n}\n.sm\\:bg-grey-darkest[data-v-ad49e094] {\n    background-color: #3d4852;\n}\n.sm\\:bg-grey-darker[data-v-ad49e094] {\n    background-color: #606f7b;\n}\n.sm\\:bg-grey-dark[data-v-ad49e094] {\n    background-color: #8795a1;\n}\n.sm\\:bg-grey[data-v-ad49e094] {\n    background-color: #b8c2cc;\n}\n.sm\\:bg-grey-light[data-v-ad49e094] {\n    background-color: #dae1e7;\n}\n.sm\\:bg-grey-lighter[data-v-ad49e094] {\n    background-color: #f1f5f8;\n}\n.sm\\:bg-grey-lightest[data-v-ad49e094] {\n    background-color: #f8fafc;\n}\n.sm\\:bg-white[data-v-ad49e094] {\n    background-color: #fff;\n}\n.sm\\:bg-red-darkest[data-v-ad49e094] {\n    background-color: #3b0d0c;\n}\n.sm\\:bg-red-darker[data-v-ad49e094] {\n    background-color: #621b18;\n}\n.sm\\:bg-red-dark[data-v-ad49e094] {\n    background-color: #cc1f1a;\n}\n.sm\\:bg-red[data-v-ad49e094] {\n    background-color: #e3342f;\n}\n.sm\\:bg-red-light[data-v-ad49e094] {\n    background-color: #ef5753;\n}\n.sm\\:bg-red-lighter[data-v-ad49e094] {\n    background-color: #f9acaa;\n}\n.sm\\:bg-red-lightest[data-v-ad49e094] {\n    background-color: #fcebea;\n}\n.sm\\:bg-orange-darkest[data-v-ad49e094] {\n    background-color: #462a16;\n}\n.sm\\:bg-orange-darker[data-v-ad49e094] {\n    background-color: #613b1f;\n}\n.sm\\:bg-orange-dark[data-v-ad49e094] {\n    background-color: #de751f;\n}\n.sm\\:bg-orange[data-v-ad49e094] {\n    background-color: #f6993f;\n}\n.sm\\:bg-orange-light[data-v-ad49e094] {\n    background-color: #faad63;\n}\n.sm\\:bg-orange-lighter[data-v-ad49e094] {\n    background-color: #fcd9b6;\n}\n.sm\\:bg-orange-lightest[data-v-ad49e094] {\n    background-color: #fff5eb;\n}\n.sm\\:bg-yellow-darkest[data-v-ad49e094] {\n    background-color: #453411;\n}\n.sm\\:bg-yellow-darker[data-v-ad49e094] {\n    background-color: #684f1d;\n}\n.sm\\:bg-yellow-dark[data-v-ad49e094] {\n    background-color: #f2d024;\n}\n.sm\\:bg-yellow[data-v-ad49e094] {\n    background-color: #ffed4a;\n}\n.sm\\:bg-yellow-light[data-v-ad49e094] {\n    background-color: #fff382;\n}\n.sm\\:bg-yellow-lighter[data-v-ad49e094] {\n    background-color: #fff9c2;\n}\n.sm\\:bg-yellow-lightest[data-v-ad49e094] {\n    background-color: #fcfbeb;\n}\n.sm\\:bg-green-darkest[data-v-ad49e094] {\n    background-color: #0f2f21;\n}\n.sm\\:bg-green-darker[data-v-ad49e094] {\n    background-color: #1a4731;\n}\n.sm\\:bg-green-dark[data-v-ad49e094] {\n    background-color: #1f9d55;\n}\n.sm\\:bg-green[data-v-ad49e094] {\n    background-color: #38c172;\n}\n.sm\\:bg-green-light[data-v-ad49e094] {\n    background-color: #51d88a;\n}\n.sm\\:bg-green-lighter[data-v-ad49e094] {\n    background-color: #a2f5bf;\n}\n.sm\\:bg-green-lightest[data-v-ad49e094] {\n    background-color: #e3fcec;\n}\n.sm\\:bg-teal-darkest[data-v-ad49e094] {\n    background-color: #0d3331;\n}\n.sm\\:bg-teal-darker[data-v-ad49e094] {\n    background-color: #20504f;\n}\n.sm\\:bg-teal-dark[data-v-ad49e094] {\n    background-color: #38a89d;\n}\n.sm\\:bg-teal[data-v-ad49e094] {\n    background-color: #4dc0b5;\n}\n.sm\\:bg-teal-light[data-v-ad49e094] {\n    background-color: #64d5ca;\n}\n.sm\\:bg-teal-lighter[data-v-ad49e094] {\n    background-color: #a0f0ed;\n}\n.sm\\:bg-teal-lightest[data-v-ad49e094] {\n    background-color: #e8fffe;\n}\n.sm\\:bg-blue-darkest[data-v-ad49e094] {\n    background-color: #12283a;\n}\n.sm\\:bg-blue-darker[data-v-ad49e094] {\n    background-color: #1c3d5a;\n}\n.sm\\:bg-blue-dark[data-v-ad49e094] {\n    background-color: #2779bd;\n}\n.sm\\:bg-blue[data-v-ad49e094] {\n    background-color: #3490dc;\n}\n.sm\\:bg-blue-light[data-v-ad49e094] {\n    background-color: #6cb2eb;\n}\n.sm\\:bg-blue-lighter[data-v-ad49e094] {\n    background-color: #bcdefa;\n}\n.sm\\:bg-blue-lightest[data-v-ad49e094] {\n    background-color: #eff8ff;\n}\n.sm\\:bg-indigo-darkest[data-v-ad49e094] {\n    background-color: #191e38;\n}\n.sm\\:bg-indigo-darker[data-v-ad49e094] {\n    background-color: #2f365f;\n}\n.sm\\:bg-indigo-dark[data-v-ad49e094] {\n    background-color: #5661b3;\n}\n.sm\\:bg-indigo[data-v-ad49e094] {\n    background-color: #6574cd;\n}\n.sm\\:bg-indigo-light[data-v-ad49e094] {\n    background-color: #7886d7;\n}\n.sm\\:bg-indigo-lighter[data-v-ad49e094] {\n    background-color: #b2b7ff;\n}\n.sm\\:bg-indigo-lightest[data-v-ad49e094] {\n    background-color: #e6e8ff;\n}\n.sm\\:bg-purple-darkest[data-v-ad49e094] {\n    background-color: #21183c;\n}\n.sm\\:bg-purple-darker[data-v-ad49e094] {\n    background-color: #382b5f;\n}\n.sm\\:bg-purple-dark[data-v-ad49e094] {\n    background-color: #794acf;\n}\n.sm\\:bg-purple[data-v-ad49e094] {\n    background-color: #9561e2;\n}\n.sm\\:bg-purple-light[data-v-ad49e094] {\n    background-color: #a779e9;\n}\n.sm\\:bg-purple-lighter[data-v-ad49e094] {\n    background-color: #d6bbfc;\n}\n.sm\\:bg-purple-lightest[data-v-ad49e094] {\n    background-color: #f3ebff;\n}\n.sm\\:bg-pink-darkest[data-v-ad49e094] {\n    background-color: #451225;\n}\n.sm\\:bg-pink-darker[data-v-ad49e094] {\n    background-color: #6f213f;\n}\n.sm\\:bg-pink-dark[data-v-ad49e094] {\n    background-color: #eb5286;\n}\n.sm\\:bg-pink[data-v-ad49e094] {\n    background-color: #f66d9b;\n}\n.sm\\:bg-pink-light[data-v-ad49e094] {\n    background-color: #fa7ea8;\n}\n.sm\\:bg-pink-lighter[data-v-ad49e094] {\n    background-color: #ffbbca;\n}\n.sm\\:bg-pink-lightest[data-v-ad49e094] {\n    background-color: #ffebef;\n}\n.sm\\:hover\\:bg-transparent[data-v-ad49e094]:hover {\n    background-color: transparent;\n}\n.sm\\:hover\\:bg-black[data-v-ad49e094]:hover {\n    background-color: #22292f;\n}\n.sm\\:hover\\:bg-grey-darkest[data-v-ad49e094]:hover {\n    background-color: #3d4852;\n}\n.sm\\:hover\\:bg-grey-darker[data-v-ad49e094]:hover {\n    background-color: #606f7b;\n}\n.sm\\:hover\\:bg-grey-dark[data-v-ad49e094]:hover {\n    background-color: #8795a1;\n}\n.sm\\:hover\\:bg-grey[data-v-ad49e094]:hover {\n    background-color: #b8c2cc;\n}\n.sm\\:hover\\:bg-grey-light[data-v-ad49e094]:hover {\n    background-color: #dae1e7;\n}\n.sm\\:hover\\:bg-grey-lighter[data-v-ad49e094]:hover {\n    background-color: #f1f5f8;\n}\n.sm\\:hover\\:bg-grey-lightest[data-v-ad49e094]:hover {\n    background-color: #f8fafc;\n}\n.sm\\:hover\\:bg-white[data-v-ad49e094]:hover {\n    background-color: #fff;\n}\n.sm\\:hover\\:bg-red-darkest[data-v-ad49e094]:hover {\n    background-color: #3b0d0c;\n}\n.sm\\:hover\\:bg-red-darker[data-v-ad49e094]:hover {\n    background-color: #621b18;\n}\n.sm\\:hover\\:bg-red-dark[data-v-ad49e094]:hover {\n    background-color: #cc1f1a;\n}\n.sm\\:hover\\:bg-red[data-v-ad49e094]:hover {\n    background-color: #e3342f;\n}\n.sm\\:hover\\:bg-red-light[data-v-ad49e094]:hover {\n    background-color: #ef5753;\n}\n.sm\\:hover\\:bg-red-lighter[data-v-ad49e094]:hover {\n    background-color: #f9acaa;\n}\n.sm\\:hover\\:bg-red-lightest[data-v-ad49e094]:hover {\n    background-color: #fcebea;\n}\n.sm\\:hover\\:bg-orange-darkest[data-v-ad49e094]:hover {\n    background-color: #462a16;\n}\n.sm\\:hover\\:bg-orange-darker[data-v-ad49e094]:hover {\n    background-color: #613b1f;\n}\n.sm\\:hover\\:bg-orange-dark[data-v-ad49e094]:hover {\n    background-color: #de751f;\n}\n.sm\\:hover\\:bg-orange[data-v-ad49e094]:hover {\n    background-color: #f6993f;\n}\n.sm\\:hover\\:bg-orange-light[data-v-ad49e094]:hover {\n    background-color: #faad63;\n}\n.sm\\:hover\\:bg-orange-lighter[data-v-ad49e094]:hover {\n    background-color: #fcd9b6;\n}\n.sm\\:hover\\:bg-orange-lightest[data-v-ad49e094]:hover {\n    background-color: #fff5eb;\n}\n.sm\\:hover\\:bg-yellow-darkest[data-v-ad49e094]:hover {\n    background-color: #453411;\n}\n.sm\\:hover\\:bg-yellow-darker[data-v-ad49e094]:hover {\n    background-color: #684f1d;\n}\n.sm\\:hover\\:bg-yellow-dark[data-v-ad49e094]:hover {\n    background-color: #f2d024;\n}\n.sm\\:hover\\:bg-yellow[data-v-ad49e094]:hover {\n    background-color: #ffed4a;\n}\n.sm\\:hover\\:bg-yellow-light[data-v-ad49e094]:hover {\n    background-color: #fff382;\n}\n.sm\\:hover\\:bg-yellow-lighter[data-v-ad49e094]:hover {\n    background-color: #fff9c2;\n}\n.sm\\:hover\\:bg-yellow-lightest[data-v-ad49e094]:hover {\n    background-color: #fcfbeb;\n}\n.sm\\:hover\\:bg-green-darkest[data-v-ad49e094]:hover {\n    background-color: #0f2f21;\n}\n.sm\\:hover\\:bg-green-darker[data-v-ad49e094]:hover {\n    background-color: #1a4731;\n}\n.sm\\:hover\\:bg-green-dark[data-v-ad49e094]:hover {\n    background-color: #1f9d55;\n}\n.sm\\:hover\\:bg-green[data-v-ad49e094]:hover {\n    background-color: #38c172;\n}\n.sm\\:hover\\:bg-green-light[data-v-ad49e094]:hover {\n    background-color: #51d88a;\n}\n.sm\\:hover\\:bg-green-lighter[data-v-ad49e094]:hover {\n    background-color: #a2f5bf;\n}\n.sm\\:hover\\:bg-green-lightest[data-v-ad49e094]:hover {\n    background-color: #e3fcec;\n}\n.sm\\:hover\\:bg-teal-darkest[data-v-ad49e094]:hover {\n    background-color: #0d3331;\n}\n.sm\\:hover\\:bg-teal-darker[data-v-ad49e094]:hover {\n    background-color: #20504f;\n}\n.sm\\:hover\\:bg-teal-dark[data-v-ad49e094]:hover {\n    background-color: #38a89d;\n}\n.sm\\:hover\\:bg-teal[data-v-ad49e094]:hover {\n    background-color: #4dc0b5;\n}\n.sm\\:hover\\:bg-teal-light[data-v-ad49e094]:hover {\n    background-color: #64d5ca;\n}\n.sm\\:hover\\:bg-teal-lighter[data-v-ad49e094]:hover {\n    background-color: #a0f0ed;\n}\n.sm\\:hover\\:bg-teal-lightest[data-v-ad49e094]:hover {\n    background-color: #e8fffe;\n}\n.sm\\:hover\\:bg-blue-darkest[data-v-ad49e094]:hover {\n    background-color: #12283a;\n}\n.sm\\:hover\\:bg-blue-darker[data-v-ad49e094]:hover {\n    background-color: #1c3d5a;\n}\n.sm\\:hover\\:bg-blue-dark[data-v-ad49e094]:hover {\n    background-color: #2779bd;\n}\n.sm\\:hover\\:bg-blue[data-v-ad49e094]:hover {\n    background-color: #3490dc;\n}\n.sm\\:hover\\:bg-blue-light[data-v-ad49e094]:hover {\n    background-color: #6cb2eb;\n}\n.sm\\:hover\\:bg-blue-lighter[data-v-ad49e094]:hover {\n    background-color: #bcdefa;\n}\n.sm\\:hover\\:bg-blue-lightest[data-v-ad49e094]:hover {\n    background-color: #eff8ff;\n}\n.sm\\:hover\\:bg-indigo-darkest[data-v-ad49e094]:hover {\n    background-color: #191e38;\n}\n.sm\\:hover\\:bg-indigo-darker[data-v-ad49e094]:hover {\n    background-color: #2f365f;\n}\n.sm\\:hover\\:bg-indigo-dark[data-v-ad49e094]:hover {\n    background-color: #5661b3;\n}\n.sm\\:hover\\:bg-indigo[data-v-ad49e094]:hover {\n    background-color: #6574cd;\n}\n.sm\\:hover\\:bg-indigo-light[data-v-ad49e094]:hover {\n    background-color: #7886d7;\n}\n.sm\\:hover\\:bg-indigo-lighter[data-v-ad49e094]:hover {\n    background-color: #b2b7ff;\n}\n.sm\\:hover\\:bg-indigo-lightest[data-v-ad49e094]:hover {\n    background-color: #e6e8ff;\n}\n.sm\\:hover\\:bg-purple-darkest[data-v-ad49e094]:hover {\n    background-color: #21183c;\n}\n.sm\\:hover\\:bg-purple-darker[data-v-ad49e094]:hover {\n    background-color: #382b5f;\n}\n.sm\\:hover\\:bg-purple-dark[data-v-ad49e094]:hover {\n    background-color: #794acf;\n}\n.sm\\:hover\\:bg-purple[data-v-ad49e094]:hover {\n    background-color: #9561e2;\n}\n.sm\\:hover\\:bg-purple-light[data-v-ad49e094]:hover {\n    background-color: #a779e9;\n}\n.sm\\:hover\\:bg-purple-lighter[data-v-ad49e094]:hover {\n    background-color: #d6bbfc;\n}\n.sm\\:hover\\:bg-purple-lightest[data-v-ad49e094]:hover {\n    background-color: #f3ebff;\n}\n.sm\\:hover\\:bg-pink-darkest[data-v-ad49e094]:hover {\n    background-color: #451225;\n}\n.sm\\:hover\\:bg-pink-darker[data-v-ad49e094]:hover {\n    background-color: #6f213f;\n}\n.sm\\:hover\\:bg-pink-dark[data-v-ad49e094]:hover {\n    background-color: #eb5286;\n}\n.sm\\:hover\\:bg-pink[data-v-ad49e094]:hover {\n    background-color: #f66d9b;\n}\n.sm\\:hover\\:bg-pink-light[data-v-ad49e094]:hover {\n    background-color: #fa7ea8;\n}\n.sm\\:hover\\:bg-pink-lighter[data-v-ad49e094]:hover {\n    background-color: #ffbbca;\n}\n.sm\\:hover\\:bg-pink-lightest[data-v-ad49e094]:hover {\n    background-color: #ffebef;\n}\n.sm\\:focus\\:bg-transparent[data-v-ad49e094]:focus {\n    background-color: transparent;\n}\n.sm\\:focus\\:bg-black[data-v-ad49e094]:focus {\n    background-color: #22292f;\n}\n.sm\\:focus\\:bg-grey-darkest[data-v-ad49e094]:focus {\n    background-color: #3d4852;\n}\n.sm\\:focus\\:bg-grey-darker[data-v-ad49e094]:focus {\n    background-color: #606f7b;\n}\n.sm\\:focus\\:bg-grey-dark[data-v-ad49e094]:focus {\n    background-color: #8795a1;\n}\n.sm\\:focus\\:bg-grey[data-v-ad49e094]:focus {\n    background-color: #b8c2cc;\n}\n.sm\\:focus\\:bg-grey-light[data-v-ad49e094]:focus {\n    background-color: #dae1e7;\n}\n.sm\\:focus\\:bg-grey-lighter[data-v-ad49e094]:focus {\n    background-color: #f1f5f8;\n}\n.sm\\:focus\\:bg-grey-lightest[data-v-ad49e094]:focus {\n    background-color: #f8fafc;\n}\n.sm\\:focus\\:bg-white[data-v-ad49e094]:focus {\n    background-color: #fff;\n}\n.sm\\:focus\\:bg-red-darkest[data-v-ad49e094]:focus {\n    background-color: #3b0d0c;\n}\n.sm\\:focus\\:bg-red-darker[data-v-ad49e094]:focus {\n    background-color: #621b18;\n}\n.sm\\:focus\\:bg-red-dark[data-v-ad49e094]:focus {\n    background-color: #cc1f1a;\n}\n.sm\\:focus\\:bg-red[data-v-ad49e094]:focus {\n    background-color: #e3342f;\n}\n.sm\\:focus\\:bg-red-light[data-v-ad49e094]:focus {\n    background-color: #ef5753;\n}\n.sm\\:focus\\:bg-red-lighter[data-v-ad49e094]:focus {\n    background-color: #f9acaa;\n}\n.sm\\:focus\\:bg-red-lightest[data-v-ad49e094]:focus {\n    background-color: #fcebea;\n}\n.sm\\:focus\\:bg-orange-darkest[data-v-ad49e094]:focus {\n    background-color: #462a16;\n}\n.sm\\:focus\\:bg-orange-darker[data-v-ad49e094]:focus {\n    background-color: #613b1f;\n}\n.sm\\:focus\\:bg-orange-dark[data-v-ad49e094]:focus {\n    background-color: #de751f;\n}\n.sm\\:focus\\:bg-orange[data-v-ad49e094]:focus {\n    background-color: #f6993f;\n}\n.sm\\:focus\\:bg-orange-light[data-v-ad49e094]:focus {\n    background-color: #faad63;\n}\n.sm\\:focus\\:bg-orange-lighter[data-v-ad49e094]:focus {\n    background-color: #fcd9b6;\n}\n.sm\\:focus\\:bg-orange-lightest[data-v-ad49e094]:focus {\n    background-color: #fff5eb;\n}\n.sm\\:focus\\:bg-yellow-darkest[data-v-ad49e094]:focus {\n    background-color: #453411;\n}\n.sm\\:focus\\:bg-yellow-darker[data-v-ad49e094]:focus {\n    background-color: #684f1d;\n}\n.sm\\:focus\\:bg-yellow-dark[data-v-ad49e094]:focus {\n    background-color: #f2d024;\n}\n.sm\\:focus\\:bg-yellow[data-v-ad49e094]:focus {\n    background-color: #ffed4a;\n}\n.sm\\:focus\\:bg-yellow-light[data-v-ad49e094]:focus {\n    background-color: #fff382;\n}\n.sm\\:focus\\:bg-yellow-lighter[data-v-ad49e094]:focus {\n    background-color: #fff9c2;\n}\n.sm\\:focus\\:bg-yellow-lightest[data-v-ad49e094]:focus {\n    background-color: #fcfbeb;\n}\n.sm\\:focus\\:bg-green-darkest[data-v-ad49e094]:focus {\n    background-color: #0f2f21;\n}\n.sm\\:focus\\:bg-green-darker[data-v-ad49e094]:focus {\n    background-color: #1a4731;\n}\n.sm\\:focus\\:bg-green-dark[data-v-ad49e094]:focus {\n    background-color: #1f9d55;\n}\n.sm\\:focus\\:bg-green[data-v-ad49e094]:focus {\n    background-color: #38c172;\n}\n.sm\\:focus\\:bg-green-light[data-v-ad49e094]:focus {\n    background-color: #51d88a;\n}\n.sm\\:focus\\:bg-green-lighter[data-v-ad49e094]:focus {\n    background-color: #a2f5bf;\n}\n.sm\\:focus\\:bg-green-lightest[data-v-ad49e094]:focus {\n    background-color: #e3fcec;\n}\n.sm\\:focus\\:bg-teal-darkest[data-v-ad49e094]:focus {\n    background-color: #0d3331;\n}\n.sm\\:focus\\:bg-teal-darker[data-v-ad49e094]:focus {\n    background-color: #20504f;\n}\n.sm\\:focus\\:bg-teal-dark[data-v-ad49e094]:focus {\n    background-color: #38a89d;\n}\n.sm\\:focus\\:bg-teal[data-v-ad49e094]:focus {\n    background-color: #4dc0b5;\n}\n.sm\\:focus\\:bg-teal-light[data-v-ad49e094]:focus {\n    background-color: #64d5ca;\n}\n.sm\\:focus\\:bg-teal-lighter[data-v-ad49e094]:focus {\n    background-color: #a0f0ed;\n}\n.sm\\:focus\\:bg-teal-lightest[data-v-ad49e094]:focus {\n    background-color: #e8fffe;\n}\n.sm\\:focus\\:bg-blue-darkest[data-v-ad49e094]:focus {\n    background-color: #12283a;\n}\n.sm\\:focus\\:bg-blue-darker[data-v-ad49e094]:focus {\n    background-color: #1c3d5a;\n}\n.sm\\:focus\\:bg-blue-dark[data-v-ad49e094]:focus {\n    background-color: #2779bd;\n}\n.sm\\:focus\\:bg-blue[data-v-ad49e094]:focus {\n    background-color: #3490dc;\n}\n.sm\\:focus\\:bg-blue-light[data-v-ad49e094]:focus {\n    background-color: #6cb2eb;\n}\n.sm\\:focus\\:bg-blue-lighter[data-v-ad49e094]:focus {\n    background-color: #bcdefa;\n}\n.sm\\:focus\\:bg-blue-lightest[data-v-ad49e094]:focus {\n    background-color: #eff8ff;\n}\n.sm\\:focus\\:bg-indigo-darkest[data-v-ad49e094]:focus {\n    background-color: #191e38;\n}\n.sm\\:focus\\:bg-indigo-darker[data-v-ad49e094]:focus {\n    background-color: #2f365f;\n}\n.sm\\:focus\\:bg-indigo-dark[data-v-ad49e094]:focus {\n    background-color: #5661b3;\n}\n.sm\\:focus\\:bg-indigo[data-v-ad49e094]:focus {\n    background-color: #6574cd;\n}\n.sm\\:focus\\:bg-indigo-light[data-v-ad49e094]:focus {\n    background-color: #7886d7;\n}\n.sm\\:focus\\:bg-indigo-lighter[data-v-ad49e094]:focus {\n    background-color: #b2b7ff;\n}\n.sm\\:focus\\:bg-indigo-lightest[data-v-ad49e094]:focus {\n    background-color: #e6e8ff;\n}\n.sm\\:focus\\:bg-purple-darkest[data-v-ad49e094]:focus {\n    background-color: #21183c;\n}\n.sm\\:focus\\:bg-purple-darker[data-v-ad49e094]:focus {\n    background-color: #382b5f;\n}\n.sm\\:focus\\:bg-purple-dark[data-v-ad49e094]:focus {\n    background-color: #794acf;\n}\n.sm\\:focus\\:bg-purple[data-v-ad49e094]:focus {\n    background-color: #9561e2;\n}\n.sm\\:focus\\:bg-purple-light[data-v-ad49e094]:focus {\n    background-color: #a779e9;\n}\n.sm\\:focus\\:bg-purple-lighter[data-v-ad49e094]:focus {\n    background-color: #d6bbfc;\n}\n.sm\\:focus\\:bg-purple-lightest[data-v-ad49e094]:focus {\n    background-color: #f3ebff;\n}\n.sm\\:focus\\:bg-pink-darkest[data-v-ad49e094]:focus {\n    background-color: #451225;\n}\n.sm\\:focus\\:bg-pink-darker[data-v-ad49e094]:focus {\n    background-color: #6f213f;\n}\n.sm\\:focus\\:bg-pink-dark[data-v-ad49e094]:focus {\n    background-color: #eb5286;\n}\n.sm\\:focus\\:bg-pink[data-v-ad49e094]:focus {\n    background-color: #f66d9b;\n}\n.sm\\:focus\\:bg-pink-light[data-v-ad49e094]:focus {\n    background-color: #fa7ea8;\n}\n.sm\\:focus\\:bg-pink-lighter[data-v-ad49e094]:focus {\n    background-color: #ffbbca;\n}\n.sm\\:focus\\:bg-pink-lightest[data-v-ad49e094]:focus {\n    background-color: #ffebef;\n}\n.sm\\:bg-bottom[data-v-ad49e094] {\n    background-position: bottom;\n}\n.sm\\:bg-center[data-v-ad49e094] {\n    background-position: center;\n}\n.sm\\:bg-left[data-v-ad49e094] {\n    background-position: left;\n}\n.sm\\:bg-left-bottom[data-v-ad49e094] {\n    background-position: left bottom;\n}\n.sm\\:bg-left-top[data-v-ad49e094] {\n    background-position: left top;\n}\n.sm\\:bg-right[data-v-ad49e094] {\n    background-position: right;\n}\n.sm\\:bg-right-bottom[data-v-ad49e094] {\n    background-position: right bottom;\n}\n.sm\\:bg-right-top[data-v-ad49e094] {\n    background-position: right top;\n}\n.sm\\:bg-top[data-v-ad49e094] {\n    background-position: top;\n}\n.sm\\:bg-repeat[data-v-ad49e094] {\n    background-repeat: repeat;\n}\n.sm\\:bg-no-repeat[data-v-ad49e094] {\n    background-repeat: no-repeat;\n}\n.sm\\:bg-repeat-x[data-v-ad49e094] {\n    background-repeat: repeat-x;\n}\n.sm\\:bg-repeat-y[data-v-ad49e094] {\n    background-repeat: repeat-y;\n}\n.sm\\:bg-auto[data-v-ad49e094] {\n    background-size: auto;\n}\n.sm\\:bg-cover[data-v-ad49e094] {\n    background-size: cover;\n}\n.sm\\:bg-contain[data-v-ad49e094] {\n    background-size: contain;\n}\n.sm\\:border-transparent[data-v-ad49e094] {\n    border-color: transparent;\n}\n.sm\\:border-black[data-v-ad49e094] {\n    border-color: #22292f;\n}\n.sm\\:border-grey-darkest[data-v-ad49e094] {\n    border-color: #3d4852;\n}\n.sm\\:border-grey-darker[data-v-ad49e094] {\n    border-color: #606f7b;\n}\n.sm\\:border-grey-dark[data-v-ad49e094] {\n    border-color: #8795a1;\n}\n.sm\\:border-grey[data-v-ad49e094] {\n    border-color: #b8c2cc;\n}\n.sm\\:border-grey-light[data-v-ad49e094] {\n    border-color: #dae1e7;\n}\n.sm\\:border-grey-lighter[data-v-ad49e094] {\n    border-color: #f1f5f8;\n}\n.sm\\:border-grey-lightest[data-v-ad49e094] {\n    border-color: #f8fafc;\n}\n.sm\\:border-white[data-v-ad49e094] {\n    border-color: #fff;\n}\n.sm\\:border-red-darkest[data-v-ad49e094] {\n    border-color: #3b0d0c;\n}\n.sm\\:border-red-darker[data-v-ad49e094] {\n    border-color: #621b18;\n}\n.sm\\:border-red-dark[data-v-ad49e094] {\n    border-color: #cc1f1a;\n}\n.sm\\:border-red[data-v-ad49e094] {\n    border-color: #e3342f;\n}\n.sm\\:border-red-light[data-v-ad49e094] {\n    border-color: #ef5753;\n}\n.sm\\:border-red-lighter[data-v-ad49e094] {\n    border-color: #f9acaa;\n}\n.sm\\:border-red-lightest[data-v-ad49e094] {\n    border-color: #fcebea;\n}\n.sm\\:border-orange-darkest[data-v-ad49e094] {\n    border-color: #462a16;\n}\n.sm\\:border-orange-darker[data-v-ad49e094] {\n    border-color: #613b1f;\n}\n.sm\\:border-orange-dark[data-v-ad49e094] {\n    border-color: #de751f;\n}\n.sm\\:border-orange[data-v-ad49e094] {\n    border-color: #f6993f;\n}\n.sm\\:border-orange-light[data-v-ad49e094] {\n    border-color: #faad63;\n}\n.sm\\:border-orange-lighter[data-v-ad49e094] {\n    border-color: #fcd9b6;\n}\n.sm\\:border-orange-lightest[data-v-ad49e094] {\n    border-color: #fff5eb;\n}\n.sm\\:border-yellow-darkest[data-v-ad49e094] {\n    border-color: #453411;\n}\n.sm\\:border-yellow-darker[data-v-ad49e094] {\n    border-color: #684f1d;\n}\n.sm\\:border-yellow-dark[data-v-ad49e094] {\n    border-color: #f2d024;\n}\n.sm\\:border-yellow[data-v-ad49e094] {\n    border-color: #ffed4a;\n}\n.sm\\:border-yellow-light[data-v-ad49e094] {\n    border-color: #fff382;\n}\n.sm\\:border-yellow-lighter[data-v-ad49e094] {\n    border-color: #fff9c2;\n}\n.sm\\:border-yellow-lightest[data-v-ad49e094] {\n    border-color: #fcfbeb;\n}\n.sm\\:border-green-darkest[data-v-ad49e094] {\n    border-color: #0f2f21;\n}\n.sm\\:border-green-darker[data-v-ad49e094] {\n    border-color: #1a4731;\n}\n.sm\\:border-green-dark[data-v-ad49e094] {\n    border-color: #1f9d55;\n}\n.sm\\:border-green[data-v-ad49e094] {\n    border-color: #38c172;\n}\n.sm\\:border-green-light[data-v-ad49e094] {\n    border-color: #51d88a;\n}\n.sm\\:border-green-lighter[data-v-ad49e094] {\n    border-color: #a2f5bf;\n}\n.sm\\:border-green-lightest[data-v-ad49e094] {\n    border-color: #e3fcec;\n}\n.sm\\:border-teal-darkest[data-v-ad49e094] {\n    border-color: #0d3331;\n}\n.sm\\:border-teal-darker[data-v-ad49e094] {\n    border-color: #20504f;\n}\n.sm\\:border-teal-dark[data-v-ad49e094] {\n    border-color: #38a89d;\n}\n.sm\\:border-teal[data-v-ad49e094] {\n    border-color: #4dc0b5;\n}\n.sm\\:border-teal-light[data-v-ad49e094] {\n    border-color: #64d5ca;\n}\n.sm\\:border-teal-lighter[data-v-ad49e094] {\n    border-color: #a0f0ed;\n}\n.sm\\:border-teal-lightest[data-v-ad49e094] {\n    border-color: #e8fffe;\n}\n.sm\\:border-blue-darkest[data-v-ad49e094] {\n    border-color: #12283a;\n}\n.sm\\:border-blue-darker[data-v-ad49e094] {\n    border-color: #1c3d5a;\n}\n.sm\\:border-blue-dark[data-v-ad49e094] {\n    border-color: #2779bd;\n}\n.sm\\:border-blue[data-v-ad49e094] {\n    border-color: #3490dc;\n}\n.sm\\:border-blue-light[data-v-ad49e094] {\n    border-color: #6cb2eb;\n}\n.sm\\:border-blue-lighter[data-v-ad49e094] {\n    border-color: #bcdefa;\n}\n.sm\\:border-blue-lightest[data-v-ad49e094] {\n    border-color: #eff8ff;\n}\n.sm\\:border-indigo-darkest[data-v-ad49e094] {\n    border-color: #191e38;\n}\n.sm\\:border-indigo-darker[data-v-ad49e094] {\n    border-color: #2f365f;\n}\n.sm\\:border-indigo-dark[data-v-ad49e094] {\n    border-color: #5661b3;\n}\n.sm\\:border-indigo[data-v-ad49e094] {\n    border-color: #6574cd;\n}\n.sm\\:border-indigo-light[data-v-ad49e094] {\n    border-color: #7886d7;\n}\n.sm\\:border-indigo-lighter[data-v-ad49e094] {\n    border-color: #b2b7ff;\n}\n.sm\\:border-indigo-lightest[data-v-ad49e094] {\n    border-color: #e6e8ff;\n}\n.sm\\:border-purple-darkest[data-v-ad49e094] {\n    border-color: #21183c;\n}\n.sm\\:border-purple-darker[data-v-ad49e094] {\n    border-color: #382b5f;\n}\n.sm\\:border-purple-dark[data-v-ad49e094] {\n    border-color: #794acf;\n}\n.sm\\:border-purple[data-v-ad49e094] {\n    border-color: #9561e2;\n}\n.sm\\:border-purple-light[data-v-ad49e094] {\n    border-color: #a779e9;\n}\n.sm\\:border-purple-lighter[data-v-ad49e094] {\n    border-color: #d6bbfc;\n}\n.sm\\:border-purple-lightest[data-v-ad49e094] {\n    border-color: #f3ebff;\n}\n.sm\\:border-pink-darkest[data-v-ad49e094] {\n    border-color: #451225;\n}\n.sm\\:border-pink-darker[data-v-ad49e094] {\n    border-color: #6f213f;\n}\n.sm\\:border-pink-dark[data-v-ad49e094] {\n    border-color: #eb5286;\n}\n.sm\\:border-pink[data-v-ad49e094] {\n    border-color: #f66d9b;\n}\n.sm\\:border-pink-light[data-v-ad49e094] {\n    border-color: #fa7ea8;\n}\n.sm\\:border-pink-lighter[data-v-ad49e094] {\n    border-color: #ffbbca;\n}\n.sm\\:border-pink-lightest[data-v-ad49e094] {\n    border-color: #ffebef;\n}\n.sm\\:hover\\:border-transparent[data-v-ad49e094]:hover {\n    border-color: transparent;\n}\n.sm\\:hover\\:border-black[data-v-ad49e094]:hover {\n    border-color: #22292f;\n}\n.sm\\:hover\\:border-grey-darkest[data-v-ad49e094]:hover {\n    border-color: #3d4852;\n}\n.sm\\:hover\\:border-grey-darker[data-v-ad49e094]:hover {\n    border-color: #606f7b;\n}\n.sm\\:hover\\:border-grey-dark[data-v-ad49e094]:hover {\n    border-color: #8795a1;\n}\n.sm\\:hover\\:border-grey[data-v-ad49e094]:hover {\n    border-color: #b8c2cc;\n}\n.sm\\:hover\\:border-grey-light[data-v-ad49e094]:hover {\n    border-color: #dae1e7;\n}\n.sm\\:hover\\:border-grey-lighter[data-v-ad49e094]:hover {\n    border-color: #f1f5f8;\n}\n.sm\\:hover\\:border-grey-lightest[data-v-ad49e094]:hover {\n    border-color: #f8fafc;\n}\n.sm\\:hover\\:border-white[data-v-ad49e094]:hover {\n    border-color: #fff;\n}\n.sm\\:hover\\:border-red-darkest[data-v-ad49e094]:hover {\n    border-color: #3b0d0c;\n}\n.sm\\:hover\\:border-red-darker[data-v-ad49e094]:hover {\n    border-color: #621b18;\n}\n.sm\\:hover\\:border-red-dark[data-v-ad49e094]:hover {\n    border-color: #cc1f1a;\n}\n.sm\\:hover\\:border-red[data-v-ad49e094]:hover {\n    border-color: #e3342f;\n}\n.sm\\:hover\\:border-red-light[data-v-ad49e094]:hover {\n    border-color: #ef5753;\n}\n.sm\\:hover\\:border-red-lighter[data-v-ad49e094]:hover {\n    border-color: #f9acaa;\n}\n.sm\\:hover\\:border-red-lightest[data-v-ad49e094]:hover {\n    border-color: #fcebea;\n}\n.sm\\:hover\\:border-orange-darkest[data-v-ad49e094]:hover {\n    border-color: #462a16;\n}\n.sm\\:hover\\:border-orange-darker[data-v-ad49e094]:hover {\n    border-color: #613b1f;\n}\n.sm\\:hover\\:border-orange-dark[data-v-ad49e094]:hover {\n    border-color: #de751f;\n}\n.sm\\:hover\\:border-orange[data-v-ad49e094]:hover {\n    border-color: #f6993f;\n}\n.sm\\:hover\\:border-orange-light[data-v-ad49e094]:hover {\n    border-color: #faad63;\n}\n.sm\\:hover\\:border-orange-lighter[data-v-ad49e094]:hover {\n    border-color: #fcd9b6;\n}\n.sm\\:hover\\:border-orange-lightest[data-v-ad49e094]:hover {\n    border-color: #fff5eb;\n}\n.sm\\:hover\\:border-yellow-darkest[data-v-ad49e094]:hover {\n    border-color: #453411;\n}\n.sm\\:hover\\:border-yellow-darker[data-v-ad49e094]:hover {\n    border-color: #684f1d;\n}\n.sm\\:hover\\:border-yellow-dark[data-v-ad49e094]:hover {\n    border-color: #f2d024;\n}\n.sm\\:hover\\:border-yellow[data-v-ad49e094]:hover {\n    border-color: #ffed4a;\n}\n.sm\\:hover\\:border-yellow-light[data-v-ad49e094]:hover {\n    border-color: #fff382;\n}\n.sm\\:hover\\:border-yellow-lighter[data-v-ad49e094]:hover {\n    border-color: #fff9c2;\n}\n.sm\\:hover\\:border-yellow-lightest[data-v-ad49e094]:hover {\n    border-color: #fcfbeb;\n}\n.sm\\:hover\\:border-green-darkest[data-v-ad49e094]:hover {\n    border-color: #0f2f21;\n}\n.sm\\:hover\\:border-green-darker[data-v-ad49e094]:hover {\n    border-color: #1a4731;\n}\n.sm\\:hover\\:border-green-dark[data-v-ad49e094]:hover {\n    border-color: #1f9d55;\n}\n.sm\\:hover\\:border-green[data-v-ad49e094]:hover {\n    border-color: #38c172;\n}\n.sm\\:hover\\:border-green-light[data-v-ad49e094]:hover {\n    border-color: #51d88a;\n}\n.sm\\:hover\\:border-green-lighter[data-v-ad49e094]:hover {\n    border-color: #a2f5bf;\n}\n.sm\\:hover\\:border-green-lightest[data-v-ad49e094]:hover {\n    border-color: #e3fcec;\n}\n.sm\\:hover\\:border-teal-darkest[data-v-ad49e094]:hover {\n    border-color: #0d3331;\n}\n.sm\\:hover\\:border-teal-darker[data-v-ad49e094]:hover {\n    border-color: #20504f;\n}\n.sm\\:hover\\:border-teal-dark[data-v-ad49e094]:hover {\n    border-color: #38a89d;\n}\n.sm\\:hover\\:border-teal[data-v-ad49e094]:hover {\n    border-color: #4dc0b5;\n}\n.sm\\:hover\\:border-teal-light[data-v-ad49e094]:hover {\n    border-color: #64d5ca;\n}\n.sm\\:hover\\:border-teal-lighter[data-v-ad49e094]:hover {\n    border-color: #a0f0ed;\n}\n.sm\\:hover\\:border-teal-lightest[data-v-ad49e094]:hover {\n    border-color: #e8fffe;\n}\n.sm\\:hover\\:border-blue-darkest[data-v-ad49e094]:hover {\n    border-color: #12283a;\n}\n.sm\\:hover\\:border-blue-darker[data-v-ad49e094]:hover {\n    border-color: #1c3d5a;\n}\n.sm\\:hover\\:border-blue-dark[data-v-ad49e094]:hover {\n    border-color: #2779bd;\n}\n.sm\\:hover\\:border-blue[data-v-ad49e094]:hover {\n    border-color: #3490dc;\n}\n.sm\\:hover\\:border-blue-light[data-v-ad49e094]:hover {\n    border-color: #6cb2eb;\n}\n.sm\\:hover\\:border-blue-lighter[data-v-ad49e094]:hover {\n    border-color: #bcdefa;\n}\n.sm\\:hover\\:border-blue-lightest[data-v-ad49e094]:hover {\n    border-color: #eff8ff;\n}\n.sm\\:hover\\:border-indigo-darkest[data-v-ad49e094]:hover {\n    border-color: #191e38;\n}\n.sm\\:hover\\:border-indigo-darker[data-v-ad49e094]:hover {\n    border-color: #2f365f;\n}\n.sm\\:hover\\:border-indigo-dark[data-v-ad49e094]:hover {\n    border-color: #5661b3;\n}\n.sm\\:hover\\:border-indigo[data-v-ad49e094]:hover {\n    border-color: #6574cd;\n}\n.sm\\:hover\\:border-indigo-light[data-v-ad49e094]:hover {\n    border-color: #7886d7;\n}\n.sm\\:hover\\:border-indigo-lighter[data-v-ad49e094]:hover {\n    border-color: #b2b7ff;\n}\n.sm\\:hover\\:border-indigo-lightest[data-v-ad49e094]:hover {\n    border-color: #e6e8ff;\n}\n.sm\\:hover\\:border-purple-darkest[data-v-ad49e094]:hover {\n    border-color: #21183c;\n}\n.sm\\:hover\\:border-purple-darker[data-v-ad49e094]:hover {\n    border-color: #382b5f;\n}\n.sm\\:hover\\:border-purple-dark[data-v-ad49e094]:hover {\n    border-color: #794acf;\n}\n.sm\\:hover\\:border-purple[data-v-ad49e094]:hover {\n    border-color: #9561e2;\n}\n.sm\\:hover\\:border-purple-light[data-v-ad49e094]:hover {\n    border-color: #a779e9;\n}\n.sm\\:hover\\:border-purple-lighter[data-v-ad49e094]:hover {\n    border-color: #d6bbfc;\n}\n.sm\\:hover\\:border-purple-lightest[data-v-ad49e094]:hover {\n    border-color: #f3ebff;\n}\n.sm\\:hover\\:border-pink-darkest[data-v-ad49e094]:hover {\n    border-color: #451225;\n}\n.sm\\:hover\\:border-pink-darker[data-v-ad49e094]:hover {\n    border-color: #6f213f;\n}\n.sm\\:hover\\:border-pink-dark[data-v-ad49e094]:hover {\n    border-color: #eb5286;\n}\n.sm\\:hover\\:border-pink[data-v-ad49e094]:hover {\n    border-color: #f66d9b;\n}\n.sm\\:hover\\:border-pink-light[data-v-ad49e094]:hover {\n    border-color: #fa7ea8;\n}\n.sm\\:hover\\:border-pink-lighter[data-v-ad49e094]:hover {\n    border-color: #ffbbca;\n}\n.sm\\:hover\\:border-pink-lightest[data-v-ad49e094]:hover {\n    border-color: #ffebef;\n}\n.sm\\:focus\\:border-transparent[data-v-ad49e094]:focus {\n    border-color: transparent;\n}\n.sm\\:focus\\:border-black[data-v-ad49e094]:focus {\n    border-color: #22292f;\n}\n.sm\\:focus\\:border-grey-darkest[data-v-ad49e094]:focus {\n    border-color: #3d4852;\n}\n.sm\\:focus\\:border-grey-darker[data-v-ad49e094]:focus {\n    border-color: #606f7b;\n}\n.sm\\:focus\\:border-grey-dark[data-v-ad49e094]:focus {\n    border-color: #8795a1;\n}\n.sm\\:focus\\:border-grey[data-v-ad49e094]:focus {\n    border-color: #b8c2cc;\n}\n.sm\\:focus\\:border-grey-light[data-v-ad49e094]:focus {\n    border-color: #dae1e7;\n}\n.sm\\:focus\\:border-grey-lighter[data-v-ad49e094]:focus {\n    border-color: #f1f5f8;\n}\n.sm\\:focus\\:border-grey-lightest[data-v-ad49e094]:focus {\n    border-color: #f8fafc;\n}\n.sm\\:focus\\:border-white[data-v-ad49e094]:focus {\n    border-color: #fff;\n}\n.sm\\:focus\\:border-red-darkest[data-v-ad49e094]:focus {\n    border-color: #3b0d0c;\n}\n.sm\\:focus\\:border-red-darker[data-v-ad49e094]:focus {\n    border-color: #621b18;\n}\n.sm\\:focus\\:border-red-dark[data-v-ad49e094]:focus {\n    border-color: #cc1f1a;\n}\n.sm\\:focus\\:border-red[data-v-ad49e094]:focus {\n    border-color: #e3342f;\n}\n.sm\\:focus\\:border-red-light[data-v-ad49e094]:focus {\n    border-color: #ef5753;\n}\n.sm\\:focus\\:border-red-lighter[data-v-ad49e094]:focus {\n    border-color: #f9acaa;\n}\n.sm\\:focus\\:border-red-lightest[data-v-ad49e094]:focus {\n    border-color: #fcebea;\n}\n.sm\\:focus\\:border-orange-darkest[data-v-ad49e094]:focus {\n    border-color: #462a16;\n}\n.sm\\:focus\\:border-orange-darker[data-v-ad49e094]:focus {\n    border-color: #613b1f;\n}\n.sm\\:focus\\:border-orange-dark[data-v-ad49e094]:focus {\n    border-color: #de751f;\n}\n.sm\\:focus\\:border-orange[data-v-ad49e094]:focus {\n    border-color: #f6993f;\n}\n.sm\\:focus\\:border-orange-light[data-v-ad49e094]:focus {\n    border-color: #faad63;\n}\n.sm\\:focus\\:border-orange-lighter[data-v-ad49e094]:focus {\n    border-color: #fcd9b6;\n}\n.sm\\:focus\\:border-orange-lightest[data-v-ad49e094]:focus {\n    border-color: #fff5eb;\n}\n.sm\\:focus\\:border-yellow-darkest[data-v-ad49e094]:focus {\n    border-color: #453411;\n}\n.sm\\:focus\\:border-yellow-darker[data-v-ad49e094]:focus {\n    border-color: #684f1d;\n}\n.sm\\:focus\\:border-yellow-dark[data-v-ad49e094]:focus {\n    border-color: #f2d024;\n}\n.sm\\:focus\\:border-yellow[data-v-ad49e094]:focus {\n    border-color: #ffed4a;\n}\n.sm\\:focus\\:border-yellow-light[data-v-ad49e094]:focus {\n    border-color: #fff382;\n}\n.sm\\:focus\\:border-yellow-lighter[data-v-ad49e094]:focus {\n    border-color: #fff9c2;\n}\n.sm\\:focus\\:border-yellow-lightest[data-v-ad49e094]:focus {\n    border-color: #fcfbeb;\n}\n.sm\\:focus\\:border-green-darkest[data-v-ad49e094]:focus {\n    border-color: #0f2f21;\n}\n.sm\\:focus\\:border-green-darker[data-v-ad49e094]:focus {\n    border-color: #1a4731;\n}\n.sm\\:focus\\:border-green-dark[data-v-ad49e094]:focus {\n    border-color: #1f9d55;\n}\n.sm\\:focus\\:border-green[data-v-ad49e094]:focus {\n    border-color: #38c172;\n}\n.sm\\:focus\\:border-green-light[data-v-ad49e094]:focus {\n    border-color: #51d88a;\n}\n.sm\\:focus\\:border-green-lighter[data-v-ad49e094]:focus {\n    border-color: #a2f5bf;\n}\n.sm\\:focus\\:border-green-lightest[data-v-ad49e094]:focus {\n    border-color: #e3fcec;\n}\n.sm\\:focus\\:border-teal-darkest[data-v-ad49e094]:focus {\n    border-color: #0d3331;\n}\n.sm\\:focus\\:border-teal-darker[data-v-ad49e094]:focus {\n    border-color: #20504f;\n}\n.sm\\:focus\\:border-teal-dark[data-v-ad49e094]:focus {\n    border-color: #38a89d;\n}\n.sm\\:focus\\:border-teal[data-v-ad49e094]:focus {\n    border-color: #4dc0b5;\n}\n.sm\\:focus\\:border-teal-light[data-v-ad49e094]:focus {\n    border-color: #64d5ca;\n}\n.sm\\:focus\\:border-teal-lighter[data-v-ad49e094]:focus {\n    border-color: #a0f0ed;\n}\n.sm\\:focus\\:border-teal-lightest[data-v-ad49e094]:focus {\n    border-color: #e8fffe;\n}\n.sm\\:focus\\:border-blue-darkest[data-v-ad49e094]:focus {\n    border-color: #12283a;\n}\n.sm\\:focus\\:border-blue-darker[data-v-ad49e094]:focus {\n    border-color: #1c3d5a;\n}\n.sm\\:focus\\:border-blue-dark[data-v-ad49e094]:focus {\n    border-color: #2779bd;\n}\n.sm\\:focus\\:border-blue[data-v-ad49e094]:focus {\n    border-color: #3490dc;\n}\n.sm\\:focus\\:border-blue-light[data-v-ad49e094]:focus {\n    border-color: #6cb2eb;\n}\n.sm\\:focus\\:border-blue-lighter[data-v-ad49e094]:focus {\n    border-color: #bcdefa;\n}\n.sm\\:focus\\:border-blue-lightest[data-v-ad49e094]:focus {\n    border-color: #eff8ff;\n}\n.sm\\:focus\\:border-indigo-darkest[data-v-ad49e094]:focus {\n    border-color: #191e38;\n}\n.sm\\:focus\\:border-indigo-darker[data-v-ad49e094]:focus {\n    border-color: #2f365f;\n}\n.sm\\:focus\\:border-indigo-dark[data-v-ad49e094]:focus {\n    border-color: #5661b3;\n}\n.sm\\:focus\\:border-indigo[data-v-ad49e094]:focus {\n    border-color: #6574cd;\n}\n.sm\\:focus\\:border-indigo-light[data-v-ad49e094]:focus {\n    border-color: #7886d7;\n}\n.sm\\:focus\\:border-indigo-lighter[data-v-ad49e094]:focus {\n    border-color: #b2b7ff;\n}\n.sm\\:focus\\:border-indigo-lightest[data-v-ad49e094]:focus {\n    border-color: #e6e8ff;\n}\n.sm\\:focus\\:border-purple-darkest[data-v-ad49e094]:focus {\n    border-color: #21183c;\n}\n.sm\\:focus\\:border-purple-darker[data-v-ad49e094]:focus {\n    border-color: #382b5f;\n}\n.sm\\:focus\\:border-purple-dark[data-v-ad49e094]:focus {\n    border-color: #794acf;\n}\n.sm\\:focus\\:border-purple[data-v-ad49e094]:focus {\n    border-color: #9561e2;\n}\n.sm\\:focus\\:border-purple-light[data-v-ad49e094]:focus {\n    border-color: #a779e9;\n}\n.sm\\:focus\\:border-purple-lighter[data-v-ad49e094]:focus {\n    border-color: #d6bbfc;\n}\n.sm\\:focus\\:border-purple-lightest[data-v-ad49e094]:focus {\n    border-color: #f3ebff;\n}\n.sm\\:focus\\:border-pink-darkest[data-v-ad49e094]:focus {\n    border-color: #451225;\n}\n.sm\\:focus\\:border-pink-darker[data-v-ad49e094]:focus {\n    border-color: #6f213f;\n}\n.sm\\:focus\\:border-pink-dark[data-v-ad49e094]:focus {\n    border-color: #eb5286;\n}\n.sm\\:focus\\:border-pink[data-v-ad49e094]:focus {\n    border-color: #f66d9b;\n}\n.sm\\:focus\\:border-pink-light[data-v-ad49e094]:focus {\n    border-color: #fa7ea8;\n}\n.sm\\:focus\\:border-pink-lighter[data-v-ad49e094]:focus {\n    border-color: #ffbbca;\n}\n.sm\\:focus\\:border-pink-lightest[data-v-ad49e094]:focus {\n    border-color: #ffebef;\n}\n.sm\\:rounded-none[data-v-ad49e094] {\n    border-radius: 0;\n}\n.sm\\:rounded-sm[data-v-ad49e094] {\n    border-radius: .125rem;\n}\n.sm\\:rounded[data-v-ad49e094] {\n    border-radius: .25rem;\n}\n.sm\\:rounded-lg[data-v-ad49e094] {\n    border-radius: .5rem;\n}\n.sm\\:rounded-full[data-v-ad49e094] {\n    border-radius: 9999px;\n}\n.sm\\:rounded-t-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n.sm\\:rounded-r-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.sm\\:rounded-b-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.sm\\:rounded-l-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.sm\\:rounded-t-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n}\n.sm\\:rounded-r-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n}\n.sm\\:rounded-b-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.sm\\:rounded-l-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.sm\\:rounded-t[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n}\n.sm\\:rounded-r[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n}\n.sm\\:rounded-b[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.sm\\:rounded-l[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.sm\\:rounded-t-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n}\n.sm\\:rounded-r-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n}\n.sm\\:rounded-b-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.sm\\:rounded-l-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.sm\\:rounded-t-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n}\n.sm\\:rounded-r-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n}\n.sm\\:rounded-b-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.sm\\:rounded-l-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.sm\\:rounded-tl-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n}\n.sm\\:rounded-tr-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n}\n.sm\\:rounded-br-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n}\n.sm\\:rounded-bl-none[data-v-ad49e094] {\n    border-bottom-left-radius: 0;\n}\n.sm\\:rounded-tl-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n}\n.sm\\:rounded-tr-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n}\n.sm\\:rounded-br-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n}\n.sm\\:rounded-bl-sm[data-v-ad49e094] {\n    border-bottom-left-radius: .125rem;\n}\n.sm\\:rounded-tl[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n}\n.sm\\:rounded-tr[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n}\n.sm\\:rounded-br[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n}\n.sm\\:rounded-bl[data-v-ad49e094] {\n    border-bottom-left-radius: .25rem;\n}\n.sm\\:rounded-tl-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n}\n.sm\\:rounded-tr-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n}\n.sm\\:rounded-br-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n}\n.sm\\:rounded-bl-lg[data-v-ad49e094] {\n    border-bottom-left-radius: .5rem;\n}\n.sm\\:rounded-tl-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n}\n.sm\\:rounded-tr-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n}\n.sm\\:rounded-br-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n}\n.sm\\:rounded-bl-full[data-v-ad49e094] {\n    border-bottom-left-radius: 9999px;\n}\n.sm\\:border-solid[data-v-ad49e094] {\n    border-style: solid;\n}\n.sm\\:border-dashed[data-v-ad49e094] {\n    border-style: dashed;\n}\n.sm\\:border-dotted[data-v-ad49e094] {\n    border-style: dotted;\n}\n.sm\\:border-none[data-v-ad49e094] {\n    border-style: none;\n}\n.sm\\:border-0[data-v-ad49e094] {\n    border-width: 0;\n}\n.sm\\:border-2[data-v-ad49e094] {\n    border-width: 2px;\n}\n.sm\\:border-4[data-v-ad49e094] {\n    border-width: 4px;\n}\n.sm\\:border-8[data-v-ad49e094] {\n    border-width: 8px;\n}\n.sm\\:border[data-v-ad49e094] {\n    border-width: 1px;\n}\n.sm\\:border-t-0[data-v-ad49e094] {\n    border-top-width: 0;\n}\n.sm\\:border-r-0[data-v-ad49e094] {\n    border-right-width: 0;\n}\n.sm\\:border-b-0[data-v-ad49e094] {\n    border-bottom-width: 0;\n}\n.sm\\:border-l-0[data-v-ad49e094] {\n    border-left-width: 0;\n}\n.sm\\:border-t-2[data-v-ad49e094] {\n    border-top-width: 2px;\n}\n.sm\\:border-r-2[data-v-ad49e094] {\n    border-right-width: 2px;\n}\n.sm\\:border-b-2[data-v-ad49e094] {\n    border-bottom-width: 2px;\n}\n.sm\\:border-l-2[data-v-ad49e094] {\n    border-left-width: 2px;\n}\n.sm\\:border-t-4[data-v-ad49e094] {\n    border-top-width: 4px;\n}\n.sm\\:border-r-4[data-v-ad49e094] {\n    border-right-width: 4px;\n}\n.sm\\:border-b-4[data-v-ad49e094] {\n    border-bottom-width: 4px;\n}\n.sm\\:border-l-4[data-v-ad49e094] {\n    border-left-width: 4px;\n}\n.sm\\:border-t-8[data-v-ad49e094] {\n    border-top-width: 8px;\n}\n.sm\\:border-r-8[data-v-ad49e094] {\n    border-right-width: 8px;\n}\n.sm\\:border-b-8[data-v-ad49e094] {\n    border-bottom-width: 8px;\n}\n.sm\\:border-l-8[data-v-ad49e094] {\n    border-left-width: 8px;\n}\n.sm\\:border-t[data-v-ad49e094] {\n    border-top-width: 1px;\n}\n.sm\\:border-r[data-v-ad49e094] {\n    border-right-width: 1px;\n}\n.sm\\:border-b[data-v-ad49e094] {\n    border-bottom-width: 1px;\n}\n.sm\\:border-l[data-v-ad49e094] {\n    border-left-width: 1px;\n}\n.sm\\:cursor-auto[data-v-ad49e094] {\n    cursor: auto;\n}\n.sm\\:cursor-default[data-v-ad49e094] {\n    cursor: default;\n}\n.sm\\:cursor-pointer[data-v-ad49e094] {\n    cursor: pointer;\n}\n.sm\\:cursor-wait[data-v-ad49e094] {\n    cursor: wait;\n}\n.sm\\:cursor-move[data-v-ad49e094] {\n    cursor: move;\n}\n.sm\\:cursor-not-allowed[data-v-ad49e094] {\n    cursor: not-allowed;\n}\n.sm\\:block[data-v-ad49e094] {\n    display: block;\n}\n.sm\\:inline-block[data-v-ad49e094] {\n    display: inline-block;\n}\n.sm\\:inline[data-v-ad49e094] {\n    display: inline;\n}\n.sm\\:table[data-v-ad49e094] {\n    display: table;\n}\n.sm\\:table-row[data-v-ad49e094] {\n    display: table-row;\n}\n.sm\\:table-cell[data-v-ad49e094] {\n    display: table-cell;\n}\n.sm\\:hidden[data-v-ad49e094] {\n    display: none;\n}\n.sm\\:flex[data-v-ad49e094] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.sm\\:inline-flex[data-v-ad49e094] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.sm\\:flex-row[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n.sm\\:flex-row-reverse[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n}\n.sm\\:flex-col[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.sm\\:flex-col-reverse[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n}\n.sm\\:flex-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.sm\\:flex-wrap-reverse[data-v-ad49e094] {\n    -ms-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n}\n.sm\\:flex-no-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n.sm\\:items-start[data-v-ad49e094] {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.sm\\:items-end[data-v-ad49e094] {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.sm\\:items-center[data-v-ad49e094] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.sm\\:items-baseline[data-v-ad49e094] {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.sm\\:items-stretch[data-v-ad49e094] {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n}\n.sm\\:self-auto[data-v-ad49e094] {\n    -ms-flex-item-align: auto;\n        align-self: auto;\n}\n.sm\\:self-start[data-v-ad49e094] {\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n}\n.sm\\:self-end[data-v-ad49e094] {\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n.sm\\:self-center[data-v-ad49e094] {\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n.sm\\:self-stretch[data-v-ad49e094] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n}\n.sm\\:justify-start[data-v-ad49e094] {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.sm\\:justify-end[data-v-ad49e094] {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.sm\\:justify-center[data-v-ad49e094] {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.sm\\:justify-between[data-v-ad49e094] {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.sm\\:justify-around[data-v-ad49e094] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.sm\\:content-center[data-v-ad49e094] {\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n.sm\\:content-start[data-v-ad49e094] {\n    -ms-flex-line-pack: start;\n        align-content: flex-start;\n}\n.sm\\:content-end[data-v-ad49e094] {\n    -ms-flex-line-pack: end;\n        align-content: flex-end;\n}\n.sm\\:content-between[data-v-ad49e094] {\n    -ms-flex-line-pack: justify;\n        align-content: space-between;\n}\n.sm\\:content-around[data-v-ad49e094] {\n    -ms-flex-line-pack: distribute;\n        align-content: space-around;\n}\n.sm\\:flex-1[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.sm\\:flex-auto[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: auto;\n            flex: auto;\n}\n.sm\\:flex-initial[data-v-ad49e094] {\n    -webkit-box-flex: initial;\n        -ms-flex: initial;\n            flex: initial;\n}\n.sm\\:flex-none[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n}\n.sm\\:flex-grow[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.sm\\:flex-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n}\n.sm\\:flex-no-grow[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n.sm\\:flex-no-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.sm\\:float-right[data-v-ad49e094] {\n    float: right;\n}\n.sm\\:float-left[data-v-ad49e094] {\n    float: left;\n}\n.sm\\:float-none[data-v-ad49e094] {\n    float: none;\n}\n.sm\\:clearfix[data-v-ad49e094]:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n.sm\\:font-sans[data-v-ad49e094] {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n.sm\\:font-serif[data-v-ad49e094] {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n.sm\\:font-mono[data-v-ad49e094] {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n.sm\\:font-hairline[data-v-ad49e094] {\n    font-weight: 100;\n}\n.sm\\:font-thin[data-v-ad49e094] {\n    font-weight: 200;\n}\n.sm\\:font-light[data-v-ad49e094] {\n    font-weight: 300;\n}\n.sm\\:font-normal[data-v-ad49e094] {\n    font-weight: 400;\n}\n.sm\\:font-medium[data-v-ad49e094] {\n    font-weight: 500;\n}\n.sm\\:font-semibold[data-v-ad49e094] {\n    font-weight: 600;\n}\n.sm\\:font-bold[data-v-ad49e094] {\n    font-weight: 700;\n}\n.sm\\:font-extrabold[data-v-ad49e094] {\n    font-weight: 800;\n}\n.sm\\:font-black[data-v-ad49e094] {\n    font-weight: 900;\n}\n.sm\\:hover\\:font-hairline[data-v-ad49e094]:hover {\n    font-weight: 100;\n}\n.sm\\:hover\\:font-thin[data-v-ad49e094]:hover {\n    font-weight: 200;\n}\n.sm\\:hover\\:font-light[data-v-ad49e094]:hover {\n    font-weight: 300;\n}\n.sm\\:hover\\:font-normal[data-v-ad49e094]:hover {\n    font-weight: 400;\n}\n.sm\\:hover\\:font-medium[data-v-ad49e094]:hover {\n    font-weight: 500;\n}\n.sm\\:hover\\:font-semibold[data-v-ad49e094]:hover {\n    font-weight: 600;\n}\n.sm\\:hover\\:font-bold[data-v-ad49e094]:hover {\n    font-weight: 700;\n}\n.sm\\:hover\\:font-extrabold[data-v-ad49e094]:hover {\n    font-weight: 800;\n}\n.sm\\:hover\\:font-black[data-v-ad49e094]:hover {\n    font-weight: 900;\n}\n.sm\\:focus\\:font-hairline[data-v-ad49e094]:focus {\n    font-weight: 100;\n}\n.sm\\:focus\\:font-thin[data-v-ad49e094]:focus {\n    font-weight: 200;\n}\n.sm\\:focus\\:font-light[data-v-ad49e094]:focus {\n    font-weight: 300;\n}\n.sm\\:focus\\:font-normal[data-v-ad49e094]:focus {\n    font-weight: 400;\n}\n.sm\\:focus\\:font-medium[data-v-ad49e094]:focus {\n    font-weight: 500;\n}\n.sm\\:focus\\:font-semibold[data-v-ad49e094]:focus {\n    font-weight: 600;\n}\n.sm\\:focus\\:font-bold[data-v-ad49e094]:focus {\n    font-weight: 700;\n}\n.sm\\:focus\\:font-extrabold[data-v-ad49e094]:focus {\n    font-weight: 800;\n}\n.sm\\:focus\\:font-black[data-v-ad49e094]:focus {\n    font-weight: 900;\n}\n.sm\\:h-1[data-v-ad49e094] {\n    height: .25rem;\n}\n.sm\\:h-2[data-v-ad49e094] {\n    height: .5rem;\n}\n.sm\\:h-3[data-v-ad49e094] {\n    height: .75rem;\n}\n.sm\\:h-4[data-v-ad49e094] {\n    height: 1rem;\n}\n.sm\\:h-5[data-v-ad49e094] {\n    height: 1.25rem;\n}\n.sm\\:h-6[data-v-ad49e094] {\n    height: 1.5rem;\n}\n.sm\\:h-8[data-v-ad49e094] {\n    height: 2rem;\n}\n.sm\\:h-10[data-v-ad49e094] {\n    height: 2.5rem;\n}\n.sm\\:h-12[data-v-ad49e094] {\n    height: 3rem;\n}\n.sm\\:h-16[data-v-ad49e094] {\n    height: 4rem;\n}\n.sm\\:h-24[data-v-ad49e094] {\n    height: 6rem;\n}\n.sm\\:h-32[data-v-ad49e094] {\n    height: 8rem;\n}\n.sm\\:h-48[data-v-ad49e094] {\n    height: 12rem;\n}\n.sm\\:h-64[data-v-ad49e094] {\n    height: 16rem;\n}\n.sm\\:h-auto[data-v-ad49e094] {\n    height: auto;\n}\n.sm\\:h-px[data-v-ad49e094] {\n    height: 1px;\n}\n.sm\\:h-full[data-v-ad49e094] {\n    height: 100%;\n}\n.sm\\:h-screen[data-v-ad49e094] {\n    height: 100vh;\n}\n.sm\\:leading-none[data-v-ad49e094] {\n    line-height: 1;\n}\n.sm\\:leading-tight[data-v-ad49e094] {\n    line-height: 1.25;\n}\n.sm\\:leading-normal[data-v-ad49e094] {\n    line-height: 1.5;\n}\n.sm\\:leading-loose[data-v-ad49e094] {\n    line-height: 2;\n}\n.sm\\:m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.sm\\:m-1[data-v-ad49e094] {\n    margin: .25rem;\n}\n.sm\\:m-2[data-v-ad49e094] {\n    margin: .5rem;\n}\n.sm\\:m-3[data-v-ad49e094] {\n    margin: .75rem;\n}\n.sm\\:m-4[data-v-ad49e094] {\n    margin: 1rem;\n}\n.sm\\:m-5[data-v-ad49e094] {\n    margin: 1.25rem;\n}\n.sm\\:m-6[data-v-ad49e094] {\n    margin: 1.5rem;\n}\n.sm\\:m-8[data-v-ad49e094] {\n    margin: 2rem;\n}\n.sm\\:m-10[data-v-ad49e094] {\n    margin: 2.5rem;\n}\n.sm\\:m-12[data-v-ad49e094] {\n    margin: 3rem;\n}\n.sm\\:m-16[data-v-ad49e094] {\n    margin: 4rem;\n}\n.sm\\:m-20[data-v-ad49e094] {\n    margin: 5rem;\n}\n.sm\\:m-24[data-v-ad49e094] {\n    margin: 6rem;\n}\n.sm\\:m-32[data-v-ad49e094] {\n    margin: 8rem;\n}\n.sm\\:m-auto[data-v-ad49e094] {\n    margin: auto;\n}\n.sm\\:m-px[data-v-ad49e094] {\n    margin: 1px;\n}\n.sm\\:my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.sm\\:mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.sm\\:my-1[data-v-ad49e094] {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n}\n.sm\\:mx-1[data-v-ad49e094] {\n    margin-left: .25rem;\n    margin-right: .25rem;\n}\n.sm\\:my-2[data-v-ad49e094] {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n}\n.sm\\:mx-2[data-v-ad49e094] {\n    margin-left: .5rem;\n    margin-right: .5rem;\n}\n.sm\\:my-3[data-v-ad49e094] {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n}\n.sm\\:mx-3[data-v-ad49e094] {\n    margin-left: .75rem;\n    margin-right: .75rem;\n}\n.sm\\:my-4[data-v-ad49e094] {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n}\n.sm\\:mx-4[data-v-ad49e094] {\n    margin-left: 1rem;\n    margin-right: 1rem;\n}\n.sm\\:my-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n.sm\\:mx-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n    margin-right: 1.25rem;\n}\n.sm\\:my-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n}\n.sm\\:mx-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n}\n.sm\\:my-8[data-v-ad49e094] {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n}\n.sm\\:mx-8[data-v-ad49e094] {\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n.sm\\:my-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n    margin-bottom: 2.5rem;\n}\n.sm\\:mx-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n    margin-right: 2.5rem;\n}\n.sm\\:my-12[data-v-ad49e094] {\n    margin-top: 3rem;\n    margin-bottom: 3rem;\n}\n.sm\\:mx-12[data-v-ad49e094] {\n    margin-left: 3rem;\n    margin-right: 3rem;\n}\n.sm\\:my-16[data-v-ad49e094] {\n    margin-top: 4rem;\n    margin-bottom: 4rem;\n}\n.sm\\:mx-16[data-v-ad49e094] {\n    margin-left: 4rem;\n    margin-right: 4rem;\n}\n.sm\\:my-20[data-v-ad49e094] {\n    margin-top: 5rem;\n    margin-bottom: 5rem;\n}\n.sm\\:mx-20[data-v-ad49e094] {\n    margin-left: 5rem;\n    margin-right: 5rem;\n}\n.sm\\:my-24[data-v-ad49e094] {\n    margin-top: 6rem;\n    margin-bottom: 6rem;\n}\n.sm\\:mx-24[data-v-ad49e094] {\n    margin-left: 6rem;\n    margin-right: 6rem;\n}\n.sm\\:my-32[data-v-ad49e094] {\n    margin-top: 8rem;\n    margin-bottom: 8rem;\n}\n.sm\\:mx-32[data-v-ad49e094] {\n    margin-left: 8rem;\n    margin-right: 8rem;\n}\n.sm\\:my-auto[data-v-ad49e094] {\n    margin-top: auto;\n    margin-bottom: auto;\n}\n.sm\\:mx-auto[data-v-ad49e094] {\n    margin-left: auto;\n    margin-right: auto;\n}\n.sm\\:my-px[data-v-ad49e094] {\n    margin-top: 1px;\n    margin-bottom: 1px;\n}\n.sm\\:mx-px[data-v-ad49e094] {\n    margin-left: 1px;\n    margin-right: 1px;\n}\n.sm\\:mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.sm\\:mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.sm\\:mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.sm\\:ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.sm\\:mt-1[data-v-ad49e094] {\n    margin-top: .25rem;\n}\n.sm\\:mr-1[data-v-ad49e094] {\n    margin-right: .25rem;\n}\n.sm\\:mb-1[data-v-ad49e094] {\n    margin-bottom: .25rem;\n}\n.sm\\:ml-1[data-v-ad49e094] {\n    margin-left: .25rem;\n}\n.sm\\:mt-2[data-v-ad49e094] {\n    margin-top: .5rem;\n}\n.sm\\:mr-2[data-v-ad49e094] {\n    margin-right: .5rem;\n}\n.sm\\:mb-2[data-v-ad49e094] {\n    margin-bottom: .5rem;\n}\n.sm\\:ml-2[data-v-ad49e094] {\n    margin-left: .5rem;\n}\n.sm\\:mt-3[data-v-ad49e094] {\n    margin-top: .75rem;\n}\n.sm\\:mr-3[data-v-ad49e094] {\n    margin-right: .75rem;\n}\n.sm\\:mb-3[data-v-ad49e094] {\n    margin-bottom: .75rem;\n}\n.sm\\:ml-3[data-v-ad49e094] {\n    margin-left: .75rem;\n}\n.sm\\:mt-4[data-v-ad49e094] {\n    margin-top: 1rem;\n}\n.sm\\:mr-4[data-v-ad49e094] {\n    margin-right: 1rem;\n}\n.sm\\:mb-4[data-v-ad49e094] {\n    margin-bottom: 1rem;\n}\n.sm\\:ml-4[data-v-ad49e094] {\n    margin-left: 1rem;\n}\n.sm\\:mt-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n}\n.sm\\:mr-5[data-v-ad49e094] {\n    margin-right: 1.25rem;\n}\n.sm\\:mb-5[data-v-ad49e094] {\n    margin-bottom: 1.25rem;\n}\n.sm\\:ml-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n}\n.sm\\:mt-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n}\n.sm\\:mr-6[data-v-ad49e094] {\n    margin-right: 1.5rem;\n}\n.sm\\:mb-6[data-v-ad49e094] {\n    margin-bottom: 1.5rem;\n}\n.sm\\:ml-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n}\n.sm\\:mt-8[data-v-ad49e094] {\n    margin-top: 2rem;\n}\n.sm\\:mr-8[data-v-ad49e094] {\n    margin-right: 2rem;\n}\n.sm\\:mb-8[data-v-ad49e094] {\n    margin-bottom: 2rem;\n}\n.sm\\:ml-8[data-v-ad49e094] {\n    margin-left: 2rem;\n}\n.sm\\:mt-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n}\n.sm\\:mr-10[data-v-ad49e094] {\n    margin-right: 2.5rem;\n}\n.sm\\:mb-10[data-v-ad49e094] {\n    margin-bottom: 2.5rem;\n}\n.sm\\:ml-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n}\n.sm\\:mt-12[data-v-ad49e094] {\n    margin-top: 3rem;\n}\n.sm\\:mr-12[data-v-ad49e094] {\n    margin-right: 3rem;\n}\n.sm\\:mb-12[data-v-ad49e094] {\n    margin-bottom: 3rem;\n}\n.sm\\:ml-12[data-v-ad49e094] {\n    margin-left: 3rem;\n}\n.sm\\:mt-16[data-v-ad49e094] {\n    margin-top: 4rem;\n}\n.sm\\:mr-16[data-v-ad49e094] {\n    margin-right: 4rem;\n}\n.sm\\:mb-16[data-v-ad49e094] {\n    margin-bottom: 4rem;\n}\n.sm\\:ml-16[data-v-ad49e094] {\n    margin-left: 4rem;\n}\n.sm\\:mt-20[data-v-ad49e094] {\n    margin-top: 5rem;\n}\n.sm\\:mr-20[data-v-ad49e094] {\n    margin-right: 5rem;\n}\n.sm\\:mb-20[data-v-ad49e094] {\n    margin-bottom: 5rem;\n}\n.sm\\:ml-20[data-v-ad49e094] {\n    margin-left: 5rem;\n}\n.sm\\:mt-24[data-v-ad49e094] {\n    margin-top: 6rem;\n}\n.sm\\:mr-24[data-v-ad49e094] {\n    margin-right: 6rem;\n}\n.sm\\:mb-24[data-v-ad49e094] {\n    margin-bottom: 6rem;\n}\n.sm\\:ml-24[data-v-ad49e094] {\n    margin-left: 6rem;\n}\n.sm\\:mt-32[data-v-ad49e094] {\n    margin-top: 8rem;\n}\n.sm\\:mr-32[data-v-ad49e094] {\n    margin-right: 8rem;\n}\n.sm\\:mb-32[data-v-ad49e094] {\n    margin-bottom: 8rem;\n}\n.sm\\:ml-32[data-v-ad49e094] {\n    margin-left: 8rem;\n}\n.sm\\:mt-auto[data-v-ad49e094] {\n    margin-top: auto;\n}\n.sm\\:mr-auto[data-v-ad49e094] {\n    margin-right: auto;\n}\n.sm\\:mb-auto[data-v-ad49e094] {\n    margin-bottom: auto;\n}\n.sm\\:ml-auto[data-v-ad49e094] {\n    margin-left: auto;\n}\n.sm\\:mt-px[data-v-ad49e094] {\n    margin-top: 1px;\n}\n.sm\\:mr-px[data-v-ad49e094] {\n    margin-right: 1px;\n}\n.sm\\:mb-px[data-v-ad49e094] {\n    margin-bottom: 1px;\n}\n.sm\\:ml-px[data-v-ad49e094] {\n    margin-left: 1px;\n}\n.sm\\:max-h-full[data-v-ad49e094] {\n    max-height: 100%;\n}\n.sm\\:max-h-screen[data-v-ad49e094] {\n    max-height: 100vh;\n}\n.sm\\:max-w-xs[data-v-ad49e094] {\n    max-width: 20rem;\n}\n.sm\\:max-w-sm[data-v-ad49e094] {\n    max-width: 30rem;\n}\n.sm\\:max-w-md[data-v-ad49e094] {\n    max-width: 40rem;\n}\n.sm\\:max-w-lg[data-v-ad49e094] {\n    max-width: 50rem;\n}\n.sm\\:max-w-xl[data-v-ad49e094] {\n    max-width: 60rem;\n}\n.sm\\:max-w-2xl[data-v-ad49e094] {\n    max-width: 70rem;\n}\n.sm\\:max-w-3xl[data-v-ad49e094] {\n    max-width: 80rem;\n}\n.sm\\:max-w-4xl[data-v-ad49e094] {\n    max-width: 90rem;\n}\n.sm\\:max-w-5xl[data-v-ad49e094] {\n    max-width: 100rem;\n}\n.sm\\:max-w-full[data-v-ad49e094] {\n    max-width: 100%;\n}\n.sm\\:min-h-0[data-v-ad49e094] {\n    min-height: 0;\n}\n.sm\\:min-h-full[data-v-ad49e094] {\n    min-height: 100%;\n}\n.sm\\:min-h-screen[data-v-ad49e094] {\n    min-height: 100vh;\n}\n.sm\\:min-w-0[data-v-ad49e094] {\n    min-width: 0;\n}\n.sm\\:min-w-full[data-v-ad49e094] {\n    min-width: 100%;\n}\n.sm\\:-m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.sm\\:-m-1[data-v-ad49e094] {\n    margin: -0.25rem;\n}\n.sm\\:-m-2[data-v-ad49e094] {\n    margin: -0.5rem;\n}\n.sm\\:-m-3[data-v-ad49e094] {\n    margin: -0.75rem;\n}\n.sm\\:-m-4[data-v-ad49e094] {\n    margin: -1rem;\n}\n.sm\\:-m-5[data-v-ad49e094] {\n    margin: -1.25rem;\n}\n.sm\\:-m-6[data-v-ad49e094] {\n    margin: -1.5rem;\n}\n.sm\\:-m-8[data-v-ad49e094] {\n    margin: -2rem;\n}\n.sm\\:-m-10[data-v-ad49e094] {\n    margin: -2.5rem;\n}\n.sm\\:-m-12[data-v-ad49e094] {\n    margin: -3rem;\n}\n.sm\\:-m-16[data-v-ad49e094] {\n    margin: -4rem;\n}\n.sm\\:-m-20[data-v-ad49e094] {\n    margin: -5rem;\n}\n.sm\\:-m-24[data-v-ad49e094] {\n    margin: -6rem;\n}\n.sm\\:-m-32[data-v-ad49e094] {\n    margin: -8rem;\n}\n.sm\\:-m-px[data-v-ad49e094] {\n    margin: -1px;\n}\n.sm\\:-my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.sm\\:-mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.sm\\:-my-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n}\n.sm\\:-mx-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n}\n.sm\\:-my-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n}\n.sm\\:-mx-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n}\n.sm\\:-my-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n}\n.sm\\:-mx-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n}\n.sm\\:-my-4[data-v-ad49e094] {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n}\n.sm\\:-mx-4[data-v-ad49e094] {\n    margin-left: -1rem;\n    margin-right: -1rem;\n}\n.sm\\:-my-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n    margin-bottom: -1.25rem;\n}\n.sm\\:-mx-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n    margin-right: -1.25rem;\n}\n.sm\\:-my-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n}\n.sm\\:-mx-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n}\n.sm\\:-my-8[data-v-ad49e094] {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n}\n.sm\\:-mx-8[data-v-ad49e094] {\n    margin-left: -2rem;\n    margin-right: -2rem;\n}\n.sm\\:-my-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n    margin-bottom: -2.5rem;\n}\n.sm\\:-mx-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n    margin-right: -2.5rem;\n}\n.sm\\:-my-12[data-v-ad49e094] {\n    margin-top: -3rem;\n    margin-bottom: -3rem;\n}\n.sm\\:-mx-12[data-v-ad49e094] {\n    margin-left: -3rem;\n    margin-right: -3rem;\n}\n.sm\\:-my-16[data-v-ad49e094] {\n    margin-top: -4rem;\n    margin-bottom: -4rem;\n}\n.sm\\:-mx-16[data-v-ad49e094] {\n    margin-left: -4rem;\n    margin-right: -4rem;\n}\n.sm\\:-my-20[data-v-ad49e094] {\n    margin-top: -5rem;\n    margin-bottom: -5rem;\n}\n.sm\\:-mx-20[data-v-ad49e094] {\n    margin-left: -5rem;\n    margin-right: -5rem;\n}\n.sm\\:-my-24[data-v-ad49e094] {\n    margin-top: -6rem;\n    margin-bottom: -6rem;\n}\n.sm\\:-mx-24[data-v-ad49e094] {\n    margin-left: -6rem;\n    margin-right: -6rem;\n}\n.sm\\:-my-32[data-v-ad49e094] {\n    margin-top: -8rem;\n    margin-bottom: -8rem;\n}\n.sm\\:-mx-32[data-v-ad49e094] {\n    margin-left: -8rem;\n    margin-right: -8rem;\n}\n.sm\\:-my-px[data-v-ad49e094] {\n    margin-top: -1px;\n    margin-bottom: -1px;\n}\n.sm\\:-mx-px[data-v-ad49e094] {\n    margin-left: -1px;\n    margin-right: -1px;\n}\n.sm\\:-mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.sm\\:-mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.sm\\:-mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.sm\\:-ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.sm\\:-mt-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n}\n.sm\\:-mr-1[data-v-ad49e094] {\n    margin-right: -0.25rem;\n}\n.sm\\:-mb-1[data-v-ad49e094] {\n    margin-bottom: -0.25rem;\n}\n.sm\\:-ml-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n}\n.sm\\:-mt-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n}\n.sm\\:-mr-2[data-v-ad49e094] {\n    margin-right: -0.5rem;\n}\n.sm\\:-mb-2[data-v-ad49e094] {\n    margin-bottom: -0.5rem;\n}\n.sm\\:-ml-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n}\n.sm\\:-mt-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n}\n.sm\\:-mr-3[data-v-ad49e094] {\n    margin-right: -0.75rem;\n}\n.sm\\:-mb-3[data-v-ad49e094] {\n    margin-bottom: -0.75rem;\n}\n.sm\\:-ml-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n}\n.sm\\:-mt-4[data-v-ad49e094] {\n    margin-top: -1rem;\n}\n.sm\\:-mr-4[data-v-ad49e094] {\n    margin-right: -1rem;\n}\n.sm\\:-mb-4[data-v-ad49e094] {\n    margin-bottom: -1rem;\n}\n.sm\\:-ml-4[data-v-ad49e094] {\n    margin-left: -1rem;\n}\n.sm\\:-mt-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n}\n.sm\\:-mr-5[data-v-ad49e094] {\n    margin-right: -1.25rem;\n}\n.sm\\:-mb-5[data-v-ad49e094] {\n    margin-bottom: -1.25rem;\n}\n.sm\\:-ml-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n}\n.sm\\:-mt-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n}\n.sm\\:-mr-6[data-v-ad49e094] {\n    margin-right: -1.5rem;\n}\n.sm\\:-mb-6[data-v-ad49e094] {\n    margin-bottom: -1.5rem;\n}\n.sm\\:-ml-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n}\n.sm\\:-mt-8[data-v-ad49e094] {\n    margin-top: -2rem;\n}\n.sm\\:-mr-8[data-v-ad49e094] {\n    margin-right: -2rem;\n}\n.sm\\:-mb-8[data-v-ad49e094] {\n    margin-bottom: -2rem;\n}\n.sm\\:-ml-8[data-v-ad49e094] {\n    margin-left: -2rem;\n}\n.sm\\:-mt-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n}\n.sm\\:-mr-10[data-v-ad49e094] {\n    margin-right: -2.5rem;\n}\n.sm\\:-mb-10[data-v-ad49e094] {\n    margin-bottom: -2.5rem;\n}\n.sm\\:-ml-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n}\n.sm\\:-mt-12[data-v-ad49e094] {\n    margin-top: -3rem;\n}\n.sm\\:-mr-12[data-v-ad49e094] {\n    margin-right: -3rem;\n}\n.sm\\:-mb-12[data-v-ad49e094] {\n    margin-bottom: -3rem;\n}\n.sm\\:-ml-12[data-v-ad49e094] {\n    margin-left: -3rem;\n}\n.sm\\:-mt-16[data-v-ad49e094] {\n    margin-top: -4rem;\n}\n.sm\\:-mr-16[data-v-ad49e094] {\n    margin-right: -4rem;\n}\n.sm\\:-mb-16[data-v-ad49e094] {\n    margin-bottom: -4rem;\n}\n.sm\\:-ml-16[data-v-ad49e094] {\n    margin-left: -4rem;\n}\n.sm\\:-mt-20[data-v-ad49e094] {\n    margin-top: -5rem;\n}\n.sm\\:-mr-20[data-v-ad49e094] {\n    margin-right: -5rem;\n}\n.sm\\:-mb-20[data-v-ad49e094] {\n    margin-bottom: -5rem;\n}\n.sm\\:-ml-20[data-v-ad49e094] {\n    margin-left: -5rem;\n}\n.sm\\:-mt-24[data-v-ad49e094] {\n    margin-top: -6rem;\n}\n.sm\\:-mr-24[data-v-ad49e094] {\n    margin-right: -6rem;\n}\n.sm\\:-mb-24[data-v-ad49e094] {\n    margin-bottom: -6rem;\n}\n.sm\\:-ml-24[data-v-ad49e094] {\n    margin-left: -6rem;\n}\n.sm\\:-mt-32[data-v-ad49e094] {\n    margin-top: -8rem;\n}\n.sm\\:-mr-32[data-v-ad49e094] {\n    margin-right: -8rem;\n}\n.sm\\:-mb-32[data-v-ad49e094] {\n    margin-bottom: -8rem;\n}\n.sm\\:-ml-32[data-v-ad49e094] {\n    margin-left: -8rem;\n}\n.sm\\:-mt-px[data-v-ad49e094] {\n    margin-top: -1px;\n}\n.sm\\:-mr-px[data-v-ad49e094] {\n    margin-right: -1px;\n}\n.sm\\:-mb-px[data-v-ad49e094] {\n    margin-bottom: -1px;\n}\n.sm\\:-ml-px[data-v-ad49e094] {\n    margin-left: -1px;\n}\n.sm\\:opacity-0[data-v-ad49e094] {\n    opacity: 0;\n}\n.sm\\:opacity-25[data-v-ad49e094] {\n    opacity: .25;\n}\n.sm\\:opacity-50[data-v-ad49e094] {\n    opacity: .5;\n}\n.sm\\:opacity-75[data-v-ad49e094] {\n    opacity: .75;\n}\n.sm\\:opacity-100[data-v-ad49e094] {\n    opacity: 1;\n}\n.sm\\:overflow-auto[data-v-ad49e094] {\n    overflow: auto;\n}\n.sm\\:overflow-hidden[data-v-ad49e094] {\n    overflow: hidden;\n}\n.sm\\:overflow-visible[data-v-ad49e094] {\n    overflow: visible;\n}\n.sm\\:overflow-scroll[data-v-ad49e094] {\n    overflow: scroll;\n}\n.sm\\:overflow-x-auto[data-v-ad49e094] {\n    overflow-x: auto;\n}\n.sm\\:overflow-y-auto[data-v-ad49e094] {\n    overflow-y: auto;\n}\n.sm\\:overflow-x-hidden[data-v-ad49e094] {\n    overflow-x: hidden;\n}\n.sm\\:overflow-y-hidden[data-v-ad49e094] {\n    overflow-y: hidden;\n}\n.sm\\:overflow-x-visible[data-v-ad49e094] {\n    overflow-x: visible;\n}\n.sm\\:overflow-y-visible[data-v-ad49e094] {\n    overflow-y: visible;\n}\n.sm\\:overflow-x-scroll[data-v-ad49e094] {\n    overflow-x: scroll;\n}\n.sm\\:overflow-y-scroll[data-v-ad49e094] {\n    overflow-y: scroll;\n}\n.sm\\:scrolling-touch[data-v-ad49e094] {\n    -webkit-overflow-scrolling: touch;\n}\n.sm\\:scrolling-auto[data-v-ad49e094] {\n    -webkit-overflow-scrolling: auto;\n}\n.sm\\:p-0[data-v-ad49e094] {\n    padding: 0;\n}\n.sm\\:p-1[data-v-ad49e094] {\n    padding: .25rem;\n}\n.sm\\:p-2[data-v-ad49e094] {\n    padding: .5rem;\n}\n.sm\\:p-3[data-v-ad49e094] {\n    padding: .75rem;\n}\n.sm\\:p-4[data-v-ad49e094] {\n    padding: 1rem;\n}\n.sm\\:p-5[data-v-ad49e094] {\n    padding: 1.25rem;\n}\n.sm\\:p-6[data-v-ad49e094] {\n    padding: 1.5rem;\n}\n.sm\\:p-8[data-v-ad49e094] {\n    padding: 2rem;\n}\n.sm\\:p-10[data-v-ad49e094] {\n    padding: 2.5rem;\n}\n.sm\\:p-12[data-v-ad49e094] {\n    padding: 3rem;\n}\n.sm\\:p-16[data-v-ad49e094] {\n    padding: 4rem;\n}\n.sm\\:p-20[data-v-ad49e094] {\n    padding: 5rem;\n}\n.sm\\:p-24[data-v-ad49e094] {\n    padding: 6rem;\n}\n.sm\\:p-32[data-v-ad49e094] {\n    padding: 8rem;\n}\n.sm\\:p-px[data-v-ad49e094] {\n    padding: 1px;\n}\n.sm\\:py-0[data-v-ad49e094] {\n    padding-top: 0;\n    padding-bottom: 0;\n}\n.sm\\:px-0[data-v-ad49e094] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.sm\\:py-1[data-v-ad49e094] {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n}\n.sm\\:px-1[data-v-ad49e094] {\n    padding-left: .25rem;\n    padding-right: .25rem;\n}\n.sm\\:py-2[data-v-ad49e094] {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n}\n.sm\\:px-2[data-v-ad49e094] {\n    padding-left: .5rem;\n    padding-right: .5rem;\n}\n.sm\\:py-3[data-v-ad49e094] {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n}\n.sm\\:px-3[data-v-ad49e094] {\n    padding-left: .75rem;\n    padding-right: .75rem;\n}\n.sm\\:py-4[data-v-ad49e094] {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n}\n.sm\\:px-4[data-v-ad49e094] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n}\n.sm\\:py-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n    padding-bottom: 1.25rem;\n}\n.sm\\:px-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n}\n.sm\\:py-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n}\n.sm\\:px-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n}\n.sm\\:py-8[data-v-ad49e094] {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n}\n.sm\\:px-8[data-v-ad49e094] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n.sm\\:py-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n    padding-bottom: 2.5rem;\n}\n.sm\\:px-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n    padding-right: 2.5rem;\n}\n.sm\\:py-12[data-v-ad49e094] {\n    padding-top: 3rem;\n    padding-bottom: 3rem;\n}\n.sm\\:px-12[data-v-ad49e094] {\n    padding-left: 3rem;\n    padding-right: 3rem;\n}\n.sm\\:py-16[data-v-ad49e094] {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n}\n.sm\\:px-16[data-v-ad49e094] {\n    padding-left: 4rem;\n    padding-right: 4rem;\n}\n.sm\\:py-20[data-v-ad49e094] {\n    padding-top: 5rem;\n    padding-bottom: 5rem;\n}\n.sm\\:px-20[data-v-ad49e094] {\n    padding-left: 5rem;\n    padding-right: 5rem;\n}\n.sm\\:py-24[data-v-ad49e094] {\n    padding-top: 6rem;\n    padding-bottom: 6rem;\n}\n.sm\\:px-24[data-v-ad49e094] {\n    padding-left: 6rem;\n    padding-right: 6rem;\n}\n.sm\\:py-32[data-v-ad49e094] {\n    padding-top: 8rem;\n    padding-bottom: 8rem;\n}\n.sm\\:px-32[data-v-ad49e094] {\n    padding-left: 8rem;\n    padding-right: 8rem;\n}\n.sm\\:py-px[data-v-ad49e094] {\n    padding-top: 1px;\n    padding-bottom: 1px;\n}\n.sm\\:px-px[data-v-ad49e094] {\n    padding-left: 1px;\n    padding-right: 1px;\n}\n.sm\\:pt-0[data-v-ad49e094] {\n    padding-top: 0;\n}\n.sm\\:pr-0[data-v-ad49e094] {\n    padding-right: 0;\n}\n.sm\\:pb-0[data-v-ad49e094] {\n    padding-bottom: 0;\n}\n.sm\\:pl-0[data-v-ad49e094] {\n    padding-left: 0;\n}\n.sm\\:pt-1[data-v-ad49e094] {\n    padding-top: .25rem;\n}\n.sm\\:pr-1[data-v-ad49e094] {\n    padding-right: .25rem;\n}\n.sm\\:pb-1[data-v-ad49e094] {\n    padding-bottom: .25rem;\n}\n.sm\\:pl-1[data-v-ad49e094] {\n    padding-left: .25rem;\n}\n.sm\\:pt-2[data-v-ad49e094] {\n    padding-top: .5rem;\n}\n.sm\\:pr-2[data-v-ad49e094] {\n    padding-right: .5rem;\n}\n.sm\\:pb-2[data-v-ad49e094] {\n    padding-bottom: .5rem;\n}\n.sm\\:pl-2[data-v-ad49e094] {\n    padding-left: .5rem;\n}\n.sm\\:pt-3[data-v-ad49e094] {\n    padding-top: .75rem;\n}\n.sm\\:pr-3[data-v-ad49e094] {\n    padding-right: .75rem;\n}\n.sm\\:pb-3[data-v-ad49e094] {\n    padding-bottom: .75rem;\n}\n.sm\\:pl-3[data-v-ad49e094] {\n    padding-left: .75rem;\n}\n.sm\\:pt-4[data-v-ad49e094] {\n    padding-top: 1rem;\n}\n.sm\\:pr-4[data-v-ad49e094] {\n    padding-right: 1rem;\n}\n.sm\\:pb-4[data-v-ad49e094] {\n    padding-bottom: 1rem;\n}\n.sm\\:pl-4[data-v-ad49e094] {\n    padding-left: 1rem;\n}\n.sm\\:pt-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n}\n.sm\\:pr-5[data-v-ad49e094] {\n    padding-right: 1.25rem;\n}\n.sm\\:pb-5[data-v-ad49e094] {\n    padding-bottom: 1.25rem;\n}\n.sm\\:pl-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n}\n.sm\\:pt-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n}\n.sm\\:pr-6[data-v-ad49e094] {\n    padding-right: 1.5rem;\n}\n.sm\\:pb-6[data-v-ad49e094] {\n    padding-bottom: 1.5rem;\n}\n.sm\\:pl-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n}\n.sm\\:pt-8[data-v-ad49e094] {\n    padding-top: 2rem;\n}\n.sm\\:pr-8[data-v-ad49e094] {\n    padding-right: 2rem;\n}\n.sm\\:pb-8[data-v-ad49e094] {\n    padding-bottom: 2rem;\n}\n.sm\\:pl-8[data-v-ad49e094] {\n    padding-left: 2rem;\n}\n.sm\\:pt-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n}\n.sm\\:pr-10[data-v-ad49e094] {\n    padding-right: 2.5rem;\n}\n.sm\\:pb-10[data-v-ad49e094] {\n    padding-bottom: 2.5rem;\n}\n.sm\\:pl-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n}\n.sm\\:pt-12[data-v-ad49e094] {\n    padding-top: 3rem;\n}\n.sm\\:pr-12[data-v-ad49e094] {\n    padding-right: 3rem;\n}\n.sm\\:pb-12[data-v-ad49e094] {\n    padding-bottom: 3rem;\n}\n.sm\\:pl-12[data-v-ad49e094] {\n    padding-left: 3rem;\n}\n.sm\\:pt-16[data-v-ad49e094] {\n    padding-top: 4rem;\n}\n.sm\\:pr-16[data-v-ad49e094] {\n    padding-right: 4rem;\n}\n.sm\\:pb-16[data-v-ad49e094] {\n    padding-bottom: 4rem;\n}\n.sm\\:pl-16[data-v-ad49e094] {\n    padding-left: 4rem;\n}\n.sm\\:pt-20[data-v-ad49e094] {\n    padding-top: 5rem;\n}\n.sm\\:pr-20[data-v-ad49e094] {\n    padding-right: 5rem;\n}\n.sm\\:pb-20[data-v-ad49e094] {\n    padding-bottom: 5rem;\n}\n.sm\\:pl-20[data-v-ad49e094] {\n    padding-left: 5rem;\n}\n.sm\\:pt-24[data-v-ad49e094] {\n    padding-top: 6rem;\n}\n.sm\\:pr-24[data-v-ad49e094] {\n    padding-right: 6rem;\n}\n.sm\\:pb-24[data-v-ad49e094] {\n    padding-bottom: 6rem;\n}\n.sm\\:pl-24[data-v-ad49e094] {\n    padding-left: 6rem;\n}\n.sm\\:pt-32[data-v-ad49e094] {\n    padding-top: 8rem;\n}\n.sm\\:pr-32[data-v-ad49e094] {\n    padding-right: 8rem;\n}\n.sm\\:pb-32[data-v-ad49e094] {\n    padding-bottom: 8rem;\n}\n.sm\\:pl-32[data-v-ad49e094] {\n    padding-left: 8rem;\n}\n.sm\\:pt-px[data-v-ad49e094] {\n    padding-top: 1px;\n}\n.sm\\:pr-px[data-v-ad49e094] {\n    padding-right: 1px;\n}\n.sm\\:pb-px[data-v-ad49e094] {\n    padding-bottom: 1px;\n}\n.sm\\:pl-px[data-v-ad49e094] {\n    padding-left: 1px;\n}\n.sm\\:pointer-events-none[data-v-ad49e094] {\n    pointer-events: none;\n}\n.sm\\:pointer-events-auto[data-v-ad49e094] {\n    pointer-events: auto;\n}\n.sm\\:static[data-v-ad49e094] {\n    position: static;\n}\n.sm\\:fixed[data-v-ad49e094] {\n    position: fixed;\n}\n.sm\\:absolute[data-v-ad49e094] {\n    position: absolute;\n}\n.sm\\:relative[data-v-ad49e094] {\n    position: relative;\n}\n.sm\\:sticky[data-v-ad49e094] {\n    position: -webkit-sticky;\n    position: sticky;\n}\n.sm\\:pin-none[data-v-ad49e094] {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n}\n.sm\\:pin[data-v-ad49e094] {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.sm\\:pin-y[data-v-ad49e094] {\n    top: 0;\n    bottom: 0;\n}\n.sm\\:pin-x[data-v-ad49e094] {\n    right: 0;\n    left: 0;\n}\n.sm\\:pin-t[data-v-ad49e094] {\n    top: 0;\n}\n.sm\\:pin-r[data-v-ad49e094] {\n    right: 0;\n}\n.sm\\:pin-b[data-v-ad49e094] {\n    bottom: 0;\n}\n.sm\\:pin-l[data-v-ad49e094] {\n    left: 0;\n}\n.sm\\:resize-none[data-v-ad49e094] {\n    resize: none;\n}\n.sm\\:resize-y[data-v-ad49e094] {\n    resize: vertical;\n}\n.sm\\:resize-x[data-v-ad49e094] {\n    resize: horizontal;\n}\n.sm\\:resize[data-v-ad49e094] {\n    resize: both;\n}\n.sm\\:shadow[data-v-ad49e094] {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.sm\\:shadow-md[data-v-ad49e094] {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:shadow-lg[data-v-ad49e094] {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:shadow-inner[data-v-ad49e094] {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.sm\\:shadow-outline[data-v-ad49e094] {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.sm\\:shadow-none[data-v-ad49e094] {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.sm\\:hover\\:shadow[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.sm\\:hover\\:shadow-md[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:hover\\:shadow-lg[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:hover\\:shadow-inner[data-v-ad49e094]:hover {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.sm\\:hover\\:shadow-outline[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.sm\\:hover\\:shadow-none[data-v-ad49e094]:hover {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.sm\\:focus\\:shadow[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.sm\\:focus\\:shadow-md[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:focus\\:shadow-lg[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.sm\\:focus\\:shadow-inner[data-v-ad49e094]:focus {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.sm\\:focus\\:shadow-outline[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.sm\\:focus\\:shadow-none[data-v-ad49e094]:focus {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.sm\\:table-auto[data-v-ad49e094] {\n    table-layout: auto;\n}\n.sm\\:table-fixed[data-v-ad49e094] {\n    table-layout: fixed;\n}\n.sm\\:text-left[data-v-ad49e094] {\n    text-align: left;\n}\n.sm\\:text-center[data-v-ad49e094] {\n    text-align: center;\n}\n.sm\\:text-right[data-v-ad49e094] {\n    text-align: right;\n}\n.sm\\:text-justify[data-v-ad49e094] {\n    text-align: justify;\n}\n.sm\\:text-transparent[data-v-ad49e094] {\n    color: transparent;\n}\n.sm\\:text-black[data-v-ad49e094] {\n    color: #22292f;\n}\n.sm\\:text-grey-darkest[data-v-ad49e094] {\n    color: #3d4852;\n}\n.sm\\:text-grey-darker[data-v-ad49e094] {\n    color: #606f7b;\n}\n.sm\\:text-grey-dark[data-v-ad49e094] {\n    color: #8795a1;\n}\n.sm\\:text-grey[data-v-ad49e094] {\n    color: #b8c2cc;\n}\n.sm\\:text-grey-light[data-v-ad49e094] {\n    color: #dae1e7;\n}\n.sm\\:text-grey-lighter[data-v-ad49e094] {\n    color: #f1f5f8;\n}\n.sm\\:text-grey-lightest[data-v-ad49e094] {\n    color: #f8fafc;\n}\n.sm\\:text-white[data-v-ad49e094] {\n    color: #fff;\n}\n.sm\\:text-red-darkest[data-v-ad49e094] {\n    color: #3b0d0c;\n}\n.sm\\:text-red-darker[data-v-ad49e094] {\n    color: #621b18;\n}\n.sm\\:text-red-dark[data-v-ad49e094] {\n    color: #cc1f1a;\n}\n.sm\\:text-red[data-v-ad49e094] {\n    color: #e3342f;\n}\n.sm\\:text-red-light[data-v-ad49e094] {\n    color: #ef5753;\n}\n.sm\\:text-red-lighter[data-v-ad49e094] {\n    color: #f9acaa;\n}\n.sm\\:text-red-lightest[data-v-ad49e094] {\n    color: #fcebea;\n}\n.sm\\:text-orange-darkest[data-v-ad49e094] {\n    color: #462a16;\n}\n.sm\\:text-orange-darker[data-v-ad49e094] {\n    color: #613b1f;\n}\n.sm\\:text-orange-dark[data-v-ad49e094] {\n    color: #de751f;\n}\n.sm\\:text-orange[data-v-ad49e094] {\n    color: #f6993f;\n}\n.sm\\:text-orange-light[data-v-ad49e094] {\n    color: #faad63;\n}\n.sm\\:text-orange-lighter[data-v-ad49e094] {\n    color: #fcd9b6;\n}\n.sm\\:text-orange-lightest[data-v-ad49e094] {\n    color: #fff5eb;\n}\n.sm\\:text-yellow-darkest[data-v-ad49e094] {\n    color: #453411;\n}\n.sm\\:text-yellow-darker[data-v-ad49e094] {\n    color: #684f1d;\n}\n.sm\\:text-yellow-dark[data-v-ad49e094] {\n    color: #f2d024;\n}\n.sm\\:text-yellow[data-v-ad49e094] {\n    color: #ffed4a;\n}\n.sm\\:text-yellow-light[data-v-ad49e094] {\n    color: #fff382;\n}\n.sm\\:text-yellow-lighter[data-v-ad49e094] {\n    color: #fff9c2;\n}\n.sm\\:text-yellow-lightest[data-v-ad49e094] {\n    color: #fcfbeb;\n}\n.sm\\:text-green-darkest[data-v-ad49e094] {\n    color: #0f2f21;\n}\n.sm\\:text-green-darker[data-v-ad49e094] {\n    color: #1a4731;\n}\n.sm\\:text-green-dark[data-v-ad49e094] {\n    color: #1f9d55;\n}\n.sm\\:text-green[data-v-ad49e094] {\n    color: #38c172;\n}\n.sm\\:text-green-light[data-v-ad49e094] {\n    color: #51d88a;\n}\n.sm\\:text-green-lighter[data-v-ad49e094] {\n    color: #a2f5bf;\n}\n.sm\\:text-green-lightest[data-v-ad49e094] {\n    color: #e3fcec;\n}\n.sm\\:text-teal-darkest[data-v-ad49e094] {\n    color: #0d3331;\n}\n.sm\\:text-teal-darker[data-v-ad49e094] {\n    color: #20504f;\n}\n.sm\\:text-teal-dark[data-v-ad49e094] {\n    color: #38a89d;\n}\n.sm\\:text-teal[data-v-ad49e094] {\n    color: #4dc0b5;\n}\n.sm\\:text-teal-light[data-v-ad49e094] {\n    color: #64d5ca;\n}\n.sm\\:text-teal-lighter[data-v-ad49e094] {\n    color: #a0f0ed;\n}\n.sm\\:text-teal-lightest[data-v-ad49e094] {\n    color: #e8fffe;\n}\n.sm\\:text-blue-darkest[data-v-ad49e094] {\n    color: #12283a;\n}\n.sm\\:text-blue-darker[data-v-ad49e094] {\n    color: #1c3d5a;\n}\n.sm\\:text-blue-dark[data-v-ad49e094] {\n    color: #2779bd;\n}\n.sm\\:text-blue[data-v-ad49e094] {\n    color: #3490dc;\n}\n.sm\\:text-blue-light[data-v-ad49e094] {\n    color: #6cb2eb;\n}\n.sm\\:text-blue-lighter[data-v-ad49e094] {\n    color: #bcdefa;\n}\n.sm\\:text-blue-lightest[data-v-ad49e094] {\n    color: #eff8ff;\n}\n.sm\\:text-indigo-darkest[data-v-ad49e094] {\n    color: #191e38;\n}\n.sm\\:text-indigo-darker[data-v-ad49e094] {\n    color: #2f365f;\n}\n.sm\\:text-indigo-dark[data-v-ad49e094] {\n    color: #5661b3;\n}\n.sm\\:text-indigo[data-v-ad49e094] {\n    color: #6574cd;\n}\n.sm\\:text-indigo-light[data-v-ad49e094] {\n    color: #7886d7;\n}\n.sm\\:text-indigo-lighter[data-v-ad49e094] {\n    color: #b2b7ff;\n}\n.sm\\:text-indigo-lightest[data-v-ad49e094] {\n    color: #e6e8ff;\n}\n.sm\\:text-purple-darkest[data-v-ad49e094] {\n    color: #21183c;\n}\n.sm\\:text-purple-darker[data-v-ad49e094] {\n    color: #382b5f;\n}\n.sm\\:text-purple-dark[data-v-ad49e094] {\n    color: #794acf;\n}\n.sm\\:text-purple[data-v-ad49e094] {\n    color: #9561e2;\n}\n.sm\\:text-purple-light[data-v-ad49e094] {\n    color: #a779e9;\n}\n.sm\\:text-purple-lighter[data-v-ad49e094] {\n    color: #d6bbfc;\n}\n.sm\\:text-purple-lightest[data-v-ad49e094] {\n    color: #f3ebff;\n}\n.sm\\:text-pink-darkest[data-v-ad49e094] {\n    color: #451225;\n}\n.sm\\:text-pink-darker[data-v-ad49e094] {\n    color: #6f213f;\n}\n.sm\\:text-pink-dark[data-v-ad49e094] {\n    color: #eb5286;\n}\n.sm\\:text-pink[data-v-ad49e094] {\n    color: #f66d9b;\n}\n.sm\\:text-pink-light[data-v-ad49e094] {\n    color: #fa7ea8;\n}\n.sm\\:text-pink-lighter[data-v-ad49e094] {\n    color: #ffbbca;\n}\n.sm\\:text-pink-lightest[data-v-ad49e094] {\n    color: #ffebef;\n}\n.sm\\:hover\\:text-transparent[data-v-ad49e094]:hover {\n    color: transparent;\n}\n.sm\\:hover\\:text-black[data-v-ad49e094]:hover {\n    color: #22292f;\n}\n.sm\\:hover\\:text-grey-darkest[data-v-ad49e094]:hover {\n    color: #3d4852;\n}\n.sm\\:hover\\:text-grey-darker[data-v-ad49e094]:hover {\n    color: #606f7b;\n}\n.sm\\:hover\\:text-grey-dark[data-v-ad49e094]:hover {\n    color: #8795a1;\n}\n.sm\\:hover\\:text-grey[data-v-ad49e094]:hover {\n    color: #b8c2cc;\n}\n.sm\\:hover\\:text-grey-light[data-v-ad49e094]:hover {\n    color: #dae1e7;\n}\n.sm\\:hover\\:text-grey-lighter[data-v-ad49e094]:hover {\n    color: #f1f5f8;\n}\n.sm\\:hover\\:text-grey-lightest[data-v-ad49e094]:hover {\n    color: #f8fafc;\n}\n.sm\\:hover\\:text-white[data-v-ad49e094]:hover {\n    color: #fff;\n}\n.sm\\:hover\\:text-red-darkest[data-v-ad49e094]:hover {\n    color: #3b0d0c;\n}\n.sm\\:hover\\:text-red-darker[data-v-ad49e094]:hover {\n    color: #621b18;\n}\n.sm\\:hover\\:text-red-dark[data-v-ad49e094]:hover {\n    color: #cc1f1a;\n}\n.sm\\:hover\\:text-red[data-v-ad49e094]:hover {\n    color: #e3342f;\n}\n.sm\\:hover\\:text-red-light[data-v-ad49e094]:hover {\n    color: #ef5753;\n}\n.sm\\:hover\\:text-red-lighter[data-v-ad49e094]:hover {\n    color: #f9acaa;\n}\n.sm\\:hover\\:text-red-lightest[data-v-ad49e094]:hover {\n    color: #fcebea;\n}\n.sm\\:hover\\:text-orange-darkest[data-v-ad49e094]:hover {\n    color: #462a16;\n}\n.sm\\:hover\\:text-orange-darker[data-v-ad49e094]:hover {\n    color: #613b1f;\n}\n.sm\\:hover\\:text-orange-dark[data-v-ad49e094]:hover {\n    color: #de751f;\n}\n.sm\\:hover\\:text-orange[data-v-ad49e094]:hover {\n    color: #f6993f;\n}\n.sm\\:hover\\:text-orange-light[data-v-ad49e094]:hover {\n    color: #faad63;\n}\n.sm\\:hover\\:text-orange-lighter[data-v-ad49e094]:hover {\n    color: #fcd9b6;\n}\n.sm\\:hover\\:text-orange-lightest[data-v-ad49e094]:hover {\n    color: #fff5eb;\n}\n.sm\\:hover\\:text-yellow-darkest[data-v-ad49e094]:hover {\n    color: #453411;\n}\n.sm\\:hover\\:text-yellow-darker[data-v-ad49e094]:hover {\n    color: #684f1d;\n}\n.sm\\:hover\\:text-yellow-dark[data-v-ad49e094]:hover {\n    color: #f2d024;\n}\n.sm\\:hover\\:text-yellow[data-v-ad49e094]:hover {\n    color: #ffed4a;\n}\n.sm\\:hover\\:text-yellow-light[data-v-ad49e094]:hover {\n    color: #fff382;\n}\n.sm\\:hover\\:text-yellow-lighter[data-v-ad49e094]:hover {\n    color: #fff9c2;\n}\n.sm\\:hover\\:text-yellow-lightest[data-v-ad49e094]:hover {\n    color: #fcfbeb;\n}\n.sm\\:hover\\:text-green-darkest[data-v-ad49e094]:hover {\n    color: #0f2f21;\n}\n.sm\\:hover\\:text-green-darker[data-v-ad49e094]:hover {\n    color: #1a4731;\n}\n.sm\\:hover\\:text-green-dark[data-v-ad49e094]:hover {\n    color: #1f9d55;\n}\n.sm\\:hover\\:text-green[data-v-ad49e094]:hover {\n    color: #38c172;\n}\n.sm\\:hover\\:text-green-light[data-v-ad49e094]:hover {\n    color: #51d88a;\n}\n.sm\\:hover\\:text-green-lighter[data-v-ad49e094]:hover {\n    color: #a2f5bf;\n}\n.sm\\:hover\\:text-green-lightest[data-v-ad49e094]:hover {\n    color: #e3fcec;\n}\n.sm\\:hover\\:text-teal-darkest[data-v-ad49e094]:hover {\n    color: #0d3331;\n}\n.sm\\:hover\\:text-teal-darker[data-v-ad49e094]:hover {\n    color: #20504f;\n}\n.sm\\:hover\\:text-teal-dark[data-v-ad49e094]:hover {\n    color: #38a89d;\n}\n.sm\\:hover\\:text-teal[data-v-ad49e094]:hover {\n    color: #4dc0b5;\n}\n.sm\\:hover\\:text-teal-light[data-v-ad49e094]:hover {\n    color: #64d5ca;\n}\n.sm\\:hover\\:text-teal-lighter[data-v-ad49e094]:hover {\n    color: #a0f0ed;\n}\n.sm\\:hover\\:text-teal-lightest[data-v-ad49e094]:hover {\n    color: #e8fffe;\n}\n.sm\\:hover\\:text-blue-darkest[data-v-ad49e094]:hover {\n    color: #12283a;\n}\n.sm\\:hover\\:text-blue-darker[data-v-ad49e094]:hover {\n    color: #1c3d5a;\n}\n.sm\\:hover\\:text-blue-dark[data-v-ad49e094]:hover {\n    color: #2779bd;\n}\n.sm\\:hover\\:text-blue[data-v-ad49e094]:hover {\n    color: #3490dc;\n}\n.sm\\:hover\\:text-blue-light[data-v-ad49e094]:hover {\n    color: #6cb2eb;\n}\n.sm\\:hover\\:text-blue-lighter[data-v-ad49e094]:hover {\n    color: #bcdefa;\n}\n.sm\\:hover\\:text-blue-lightest[data-v-ad49e094]:hover {\n    color: #eff8ff;\n}\n.sm\\:hover\\:text-indigo-darkest[data-v-ad49e094]:hover {\n    color: #191e38;\n}\n.sm\\:hover\\:text-indigo-darker[data-v-ad49e094]:hover {\n    color: #2f365f;\n}\n.sm\\:hover\\:text-indigo-dark[data-v-ad49e094]:hover {\n    color: #5661b3;\n}\n.sm\\:hover\\:text-indigo[data-v-ad49e094]:hover {\n    color: #6574cd;\n}\n.sm\\:hover\\:text-indigo-light[data-v-ad49e094]:hover {\n    color: #7886d7;\n}\n.sm\\:hover\\:text-indigo-lighter[data-v-ad49e094]:hover {\n    color: #b2b7ff;\n}\n.sm\\:hover\\:text-indigo-lightest[data-v-ad49e094]:hover {\n    color: #e6e8ff;\n}\n.sm\\:hover\\:text-purple-darkest[data-v-ad49e094]:hover {\n    color: #21183c;\n}\n.sm\\:hover\\:text-purple-darker[data-v-ad49e094]:hover {\n    color: #382b5f;\n}\n.sm\\:hover\\:text-purple-dark[data-v-ad49e094]:hover {\n    color: #794acf;\n}\n.sm\\:hover\\:text-purple[data-v-ad49e094]:hover {\n    color: #9561e2;\n}\n.sm\\:hover\\:text-purple-light[data-v-ad49e094]:hover {\n    color: #a779e9;\n}\n.sm\\:hover\\:text-purple-lighter[data-v-ad49e094]:hover {\n    color: #d6bbfc;\n}\n.sm\\:hover\\:text-purple-lightest[data-v-ad49e094]:hover {\n    color: #f3ebff;\n}\n.sm\\:hover\\:text-pink-darkest[data-v-ad49e094]:hover {\n    color: #451225;\n}\n.sm\\:hover\\:text-pink-darker[data-v-ad49e094]:hover {\n    color: #6f213f;\n}\n.sm\\:hover\\:text-pink-dark[data-v-ad49e094]:hover {\n    color: #eb5286;\n}\n.sm\\:hover\\:text-pink[data-v-ad49e094]:hover {\n    color: #f66d9b;\n}\n.sm\\:hover\\:text-pink-light[data-v-ad49e094]:hover {\n    color: #fa7ea8;\n}\n.sm\\:hover\\:text-pink-lighter[data-v-ad49e094]:hover {\n    color: #ffbbca;\n}\n.sm\\:hover\\:text-pink-lightest[data-v-ad49e094]:hover {\n    color: #ffebef;\n}\n.sm\\:focus\\:text-transparent[data-v-ad49e094]:focus {\n    color: transparent;\n}\n.sm\\:focus\\:text-black[data-v-ad49e094]:focus {\n    color: #22292f;\n}\n.sm\\:focus\\:text-grey-darkest[data-v-ad49e094]:focus {\n    color: #3d4852;\n}\n.sm\\:focus\\:text-grey-darker[data-v-ad49e094]:focus {\n    color: #606f7b;\n}\n.sm\\:focus\\:text-grey-dark[data-v-ad49e094]:focus {\n    color: #8795a1;\n}\n.sm\\:focus\\:text-grey[data-v-ad49e094]:focus {\n    color: #b8c2cc;\n}\n.sm\\:focus\\:text-grey-light[data-v-ad49e094]:focus {\n    color: #dae1e7;\n}\n.sm\\:focus\\:text-grey-lighter[data-v-ad49e094]:focus {\n    color: #f1f5f8;\n}\n.sm\\:focus\\:text-grey-lightest[data-v-ad49e094]:focus {\n    color: #f8fafc;\n}\n.sm\\:focus\\:text-white[data-v-ad49e094]:focus {\n    color: #fff;\n}\n.sm\\:focus\\:text-red-darkest[data-v-ad49e094]:focus {\n    color: #3b0d0c;\n}\n.sm\\:focus\\:text-red-darker[data-v-ad49e094]:focus {\n    color: #621b18;\n}\n.sm\\:focus\\:text-red-dark[data-v-ad49e094]:focus {\n    color: #cc1f1a;\n}\n.sm\\:focus\\:text-red[data-v-ad49e094]:focus {\n    color: #e3342f;\n}\n.sm\\:focus\\:text-red-light[data-v-ad49e094]:focus {\n    color: #ef5753;\n}\n.sm\\:focus\\:text-red-lighter[data-v-ad49e094]:focus {\n    color: #f9acaa;\n}\n.sm\\:focus\\:text-red-lightest[data-v-ad49e094]:focus {\n    color: #fcebea;\n}\n.sm\\:focus\\:text-orange-darkest[data-v-ad49e094]:focus {\n    color: #462a16;\n}\n.sm\\:focus\\:text-orange-darker[data-v-ad49e094]:focus {\n    color: #613b1f;\n}\n.sm\\:focus\\:text-orange-dark[data-v-ad49e094]:focus {\n    color: #de751f;\n}\n.sm\\:focus\\:text-orange[data-v-ad49e094]:focus {\n    color: #f6993f;\n}\n.sm\\:focus\\:text-orange-light[data-v-ad49e094]:focus {\n    color: #faad63;\n}\n.sm\\:focus\\:text-orange-lighter[data-v-ad49e094]:focus {\n    color: #fcd9b6;\n}\n.sm\\:focus\\:text-orange-lightest[data-v-ad49e094]:focus {\n    color: #fff5eb;\n}\n.sm\\:focus\\:text-yellow-darkest[data-v-ad49e094]:focus {\n    color: #453411;\n}\n.sm\\:focus\\:text-yellow-darker[data-v-ad49e094]:focus {\n    color: #684f1d;\n}\n.sm\\:focus\\:text-yellow-dark[data-v-ad49e094]:focus {\n    color: #f2d024;\n}\n.sm\\:focus\\:text-yellow[data-v-ad49e094]:focus {\n    color: #ffed4a;\n}\n.sm\\:focus\\:text-yellow-light[data-v-ad49e094]:focus {\n    color: #fff382;\n}\n.sm\\:focus\\:text-yellow-lighter[data-v-ad49e094]:focus {\n    color: #fff9c2;\n}\n.sm\\:focus\\:text-yellow-lightest[data-v-ad49e094]:focus {\n    color: #fcfbeb;\n}\n.sm\\:focus\\:text-green-darkest[data-v-ad49e094]:focus {\n    color: #0f2f21;\n}\n.sm\\:focus\\:text-green-darker[data-v-ad49e094]:focus {\n    color: #1a4731;\n}\n.sm\\:focus\\:text-green-dark[data-v-ad49e094]:focus {\n    color: #1f9d55;\n}\n.sm\\:focus\\:text-green[data-v-ad49e094]:focus {\n    color: #38c172;\n}\n.sm\\:focus\\:text-green-light[data-v-ad49e094]:focus {\n    color: #51d88a;\n}\n.sm\\:focus\\:text-green-lighter[data-v-ad49e094]:focus {\n    color: #a2f5bf;\n}\n.sm\\:focus\\:text-green-lightest[data-v-ad49e094]:focus {\n    color: #e3fcec;\n}\n.sm\\:focus\\:text-teal-darkest[data-v-ad49e094]:focus {\n    color: #0d3331;\n}\n.sm\\:focus\\:text-teal-darker[data-v-ad49e094]:focus {\n    color: #20504f;\n}\n.sm\\:focus\\:text-teal-dark[data-v-ad49e094]:focus {\n    color: #38a89d;\n}\n.sm\\:focus\\:text-teal[data-v-ad49e094]:focus {\n    color: #4dc0b5;\n}\n.sm\\:focus\\:text-teal-light[data-v-ad49e094]:focus {\n    color: #64d5ca;\n}\n.sm\\:focus\\:text-teal-lighter[data-v-ad49e094]:focus {\n    color: #a0f0ed;\n}\n.sm\\:focus\\:text-teal-lightest[data-v-ad49e094]:focus {\n    color: #e8fffe;\n}\n.sm\\:focus\\:text-blue-darkest[data-v-ad49e094]:focus {\n    color: #12283a;\n}\n.sm\\:focus\\:text-blue-darker[data-v-ad49e094]:focus {\n    color: #1c3d5a;\n}\n.sm\\:focus\\:text-blue-dark[data-v-ad49e094]:focus {\n    color: #2779bd;\n}\n.sm\\:focus\\:text-blue[data-v-ad49e094]:focus {\n    color: #3490dc;\n}\n.sm\\:focus\\:text-blue-light[data-v-ad49e094]:focus {\n    color: #6cb2eb;\n}\n.sm\\:focus\\:text-blue-lighter[data-v-ad49e094]:focus {\n    color: #bcdefa;\n}\n.sm\\:focus\\:text-blue-lightest[data-v-ad49e094]:focus {\n    color: #eff8ff;\n}\n.sm\\:focus\\:text-indigo-darkest[data-v-ad49e094]:focus {\n    color: #191e38;\n}\n.sm\\:focus\\:text-indigo-darker[data-v-ad49e094]:focus {\n    color: #2f365f;\n}\n.sm\\:focus\\:text-indigo-dark[data-v-ad49e094]:focus {\n    color: #5661b3;\n}\n.sm\\:focus\\:text-indigo[data-v-ad49e094]:focus {\n    color: #6574cd;\n}\n.sm\\:focus\\:text-indigo-light[data-v-ad49e094]:focus {\n    color: #7886d7;\n}\n.sm\\:focus\\:text-indigo-lighter[data-v-ad49e094]:focus {\n    color: #b2b7ff;\n}\n.sm\\:focus\\:text-indigo-lightest[data-v-ad49e094]:focus {\n    color: #e6e8ff;\n}\n.sm\\:focus\\:text-purple-darkest[data-v-ad49e094]:focus {\n    color: #21183c;\n}\n.sm\\:focus\\:text-purple-darker[data-v-ad49e094]:focus {\n    color: #382b5f;\n}\n.sm\\:focus\\:text-purple-dark[data-v-ad49e094]:focus {\n    color: #794acf;\n}\n.sm\\:focus\\:text-purple[data-v-ad49e094]:focus {\n    color: #9561e2;\n}\n.sm\\:focus\\:text-purple-light[data-v-ad49e094]:focus {\n    color: #a779e9;\n}\n.sm\\:focus\\:text-purple-lighter[data-v-ad49e094]:focus {\n    color: #d6bbfc;\n}\n.sm\\:focus\\:text-purple-lightest[data-v-ad49e094]:focus {\n    color: #f3ebff;\n}\n.sm\\:focus\\:text-pink-darkest[data-v-ad49e094]:focus {\n    color: #451225;\n}\n.sm\\:focus\\:text-pink-darker[data-v-ad49e094]:focus {\n    color: #6f213f;\n}\n.sm\\:focus\\:text-pink-dark[data-v-ad49e094]:focus {\n    color: #eb5286;\n}\n.sm\\:focus\\:text-pink[data-v-ad49e094]:focus {\n    color: #f66d9b;\n}\n.sm\\:focus\\:text-pink-light[data-v-ad49e094]:focus {\n    color: #fa7ea8;\n}\n.sm\\:focus\\:text-pink-lighter[data-v-ad49e094]:focus {\n    color: #ffbbca;\n}\n.sm\\:focus\\:text-pink-lightest[data-v-ad49e094]:focus {\n    color: #ffebef;\n}\n.sm\\:text-xs[data-v-ad49e094] {\n    font-size: .75rem;\n}\n.sm\\:text-sm[data-v-ad49e094] {\n    font-size: .875rem;\n}\n.sm\\:text-base[data-v-ad49e094] {\n    font-size: 1rem;\n}\n.sm\\:text-lg[data-v-ad49e094] {\n    font-size: 1.125rem;\n}\n.sm\\:text-xl[data-v-ad49e094] {\n    font-size: 1.25rem;\n}\n.sm\\:text-2xl[data-v-ad49e094] {\n    font-size: 1.5rem;\n}\n.sm\\:text-3xl[data-v-ad49e094] {\n    font-size: 1.875rem;\n}\n.sm\\:text-4xl[data-v-ad49e094] {\n    font-size: 2.25rem;\n}\n.sm\\:text-5xl[data-v-ad49e094] {\n    font-size: 3rem;\n}\n.sm\\:italic[data-v-ad49e094] {\n    font-style: italic;\n}\n.sm\\:roman[data-v-ad49e094] {\n    font-style: normal;\n}\n.sm\\:uppercase[data-v-ad49e094] {\n    text-transform: uppercase;\n}\n.sm\\:lowercase[data-v-ad49e094] {\n    text-transform: lowercase;\n}\n.sm\\:capitalize[data-v-ad49e094] {\n    text-transform: capitalize;\n}\n.sm\\:normal-case[data-v-ad49e094] {\n    text-transform: none;\n}\n.sm\\:underline[data-v-ad49e094] {\n    text-decoration: underline;\n}\n.sm\\:line-through[data-v-ad49e094] {\n    text-decoration: line-through;\n}\n.sm\\:no-underline[data-v-ad49e094] {\n    text-decoration: none;\n}\n.sm\\:antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.sm\\:subpixel-antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.sm\\:hover\\:italic[data-v-ad49e094]:hover {\n    font-style: italic;\n}\n.sm\\:hover\\:roman[data-v-ad49e094]:hover {\n    font-style: normal;\n}\n.sm\\:hover\\:uppercase[data-v-ad49e094]:hover {\n    text-transform: uppercase;\n}\n.sm\\:hover\\:lowercase[data-v-ad49e094]:hover {\n    text-transform: lowercase;\n}\n.sm\\:hover\\:capitalize[data-v-ad49e094]:hover {\n    text-transform: capitalize;\n}\n.sm\\:hover\\:normal-case[data-v-ad49e094]:hover {\n    text-transform: none;\n}\n.sm\\:hover\\:underline[data-v-ad49e094]:hover {\n    text-decoration: underline;\n}\n.sm\\:hover\\:line-through[data-v-ad49e094]:hover {\n    text-decoration: line-through;\n}\n.sm\\:hover\\:no-underline[data-v-ad49e094]:hover {\n    text-decoration: none;\n}\n.sm\\:hover\\:antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.sm\\:hover\\:subpixel-antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.sm\\:focus\\:italic[data-v-ad49e094]:focus {\n    font-style: italic;\n}\n.sm\\:focus\\:roman[data-v-ad49e094]:focus {\n    font-style: normal;\n}\n.sm\\:focus\\:uppercase[data-v-ad49e094]:focus {\n    text-transform: uppercase;\n}\n.sm\\:focus\\:lowercase[data-v-ad49e094]:focus {\n    text-transform: lowercase;\n}\n.sm\\:focus\\:capitalize[data-v-ad49e094]:focus {\n    text-transform: capitalize;\n}\n.sm\\:focus\\:normal-case[data-v-ad49e094]:focus {\n    text-transform: none;\n}\n.sm\\:focus\\:underline[data-v-ad49e094]:focus {\n    text-decoration: underline;\n}\n.sm\\:focus\\:line-through[data-v-ad49e094]:focus {\n    text-decoration: line-through;\n}\n.sm\\:focus\\:no-underline[data-v-ad49e094]:focus {\n    text-decoration: none;\n}\n.sm\\:focus\\:antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.sm\\:focus\\:subpixel-antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.sm\\:tracking-tight[data-v-ad49e094] {\n    letter-spacing: -0.05em;\n}\n.sm\\:tracking-normal[data-v-ad49e094] {\n    letter-spacing: 0;\n}\n.sm\\:tracking-wide[data-v-ad49e094] {\n    letter-spacing: .05em;\n}\n.sm\\:select-none[data-v-ad49e094] {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.sm\\:select-text[data-v-ad49e094] {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n}\n.sm\\:align-baseline[data-v-ad49e094] {\n    vertical-align: baseline;\n}\n.sm\\:align-top[data-v-ad49e094] {\n    vertical-align: top;\n}\n.sm\\:align-middle[data-v-ad49e094] {\n    vertical-align: middle;\n}\n.sm\\:align-bottom[data-v-ad49e094] {\n    vertical-align: bottom;\n}\n.sm\\:align-text-top[data-v-ad49e094] {\n    vertical-align: text-top;\n}\n.sm\\:align-text-bottom[data-v-ad49e094] {\n    vertical-align: text-bottom;\n}\n.sm\\:visible[data-v-ad49e094] {\n    visibility: visible;\n}\n.sm\\:invisible[data-v-ad49e094] {\n    visibility: hidden;\n}\n.sm\\:whitespace-normal[data-v-ad49e094] {\n    white-space: normal;\n}\n.sm\\:whitespace-no-wrap[data-v-ad49e094] {\n    white-space: nowrap;\n}\n.sm\\:whitespace-pre[data-v-ad49e094] {\n    white-space: pre;\n}\n.sm\\:whitespace-pre-line[data-v-ad49e094] {\n    white-space: pre-line;\n}\n.sm\\:whitespace-pre-wrap[data-v-ad49e094] {\n    white-space: pre-wrap;\n}\n.sm\\:break-words[data-v-ad49e094] {\n    word-wrap: break-word;\n}\n.sm\\:break-normal[data-v-ad49e094] {\n    word-wrap: normal;\n}\n.sm\\:truncate[data-v-ad49e094] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.sm\\:w-1[data-v-ad49e094] {\n    width: .25rem;\n}\n.sm\\:w-2[data-v-ad49e094] {\n    width: .5rem;\n}\n.sm\\:w-3[data-v-ad49e094] {\n    width: .75rem;\n}\n.sm\\:w-4[data-v-ad49e094] {\n    width: 1rem;\n}\n.sm\\:w-5[data-v-ad49e094] {\n    width: 1.25rem;\n}\n.sm\\:w-6[data-v-ad49e094] {\n    width: 1.5rem;\n}\n.sm\\:w-8[data-v-ad49e094] {\n    width: 2rem;\n}\n.sm\\:w-10[data-v-ad49e094] {\n    width: 2.5rem;\n}\n.sm\\:w-12[data-v-ad49e094] {\n    width: 3rem;\n}\n.sm\\:w-16[data-v-ad49e094] {\n    width: 4rem;\n}\n.sm\\:w-24[data-v-ad49e094] {\n    width: 6rem;\n}\n.sm\\:w-32[data-v-ad49e094] {\n    width: 8rem;\n}\n.sm\\:w-48[data-v-ad49e094] {\n    width: 12rem;\n}\n.sm\\:w-64[data-v-ad49e094] {\n    width: 16rem;\n}\n.sm\\:w-auto[data-v-ad49e094] {\n    width: auto;\n}\n.sm\\:w-px[data-v-ad49e094] {\n    width: 1px;\n}\n.sm\\:w-1\\/2[data-v-ad49e094] {\n    width: 50%;\n}\n.sm\\:w-1\\/3[data-v-ad49e094] {\n    width: 33.33333%;\n}\n.sm\\:w-2\\/3[data-v-ad49e094] {\n    width: 66.66667%;\n}\n.sm\\:w-1\\/4[data-v-ad49e094] {\n    width: 25%;\n}\n.sm\\:w-3\\/4[data-v-ad49e094] {\n    width: 75%;\n}\n.sm\\:w-1\\/5[data-v-ad49e094] {\n    width: 20%;\n}\n.sm\\:w-2\\/5[data-v-ad49e094] {\n    width: 40%;\n}\n.sm\\:w-3\\/5[data-v-ad49e094] {\n    width: 60%;\n}\n.sm\\:w-4\\/5[data-v-ad49e094] {\n    width: 80%;\n}\n.sm\\:w-1\\/6[data-v-ad49e094] {\n    width: 16.66667%;\n}\n.sm\\:w-5\\/6[data-v-ad49e094] {\n    width: 83.33333%;\n}\n.sm\\:w-full[data-v-ad49e094] {\n    width: 100%;\n}\n.sm\\:w-screen[data-v-ad49e094] {\n    width: 100vw;\n}\n.sm\\:z-0[data-v-ad49e094] {\n    z-index: 0;\n}\n.sm\\:z-10[data-v-ad49e094] {\n    z-index: 10;\n}\n.sm\\:z-20[data-v-ad49e094] {\n    z-index: 20;\n}\n.sm\\:z-30[data-v-ad49e094] {\n    z-index: 30;\n}\n.sm\\:z-40[data-v-ad49e094] {\n    z-index: 40;\n}\n.sm\\:z-50[data-v-ad49e094] {\n    z-index: 50;\n}\n.sm\\:z-auto[data-v-ad49e094] {\n    z-index: auto;\n}\n}\n@media (min-width: 768px) {\n.md\\:list-reset[data-v-ad49e094] {\n    list-style: none;\n    padding: 0;\n}\n.md\\:appearance-none[data-v-ad49e094] {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n}\n.md\\:bg-fixed[data-v-ad49e094] {\n    background-attachment: fixed;\n}\n.md\\:bg-local[data-v-ad49e094] {\n    background-attachment: local;\n}\n.md\\:bg-scroll[data-v-ad49e094] {\n    background-attachment: scroll;\n}\n.md\\:bg-transparent[data-v-ad49e094] {\n    background-color: transparent;\n}\n.md\\:bg-black[data-v-ad49e094] {\n    background-color: #22292f;\n}\n.md\\:bg-grey-darkest[data-v-ad49e094] {\n    background-color: #3d4852;\n}\n.md\\:bg-grey-darker[data-v-ad49e094] {\n    background-color: #606f7b;\n}\n.md\\:bg-grey-dark[data-v-ad49e094] {\n    background-color: #8795a1;\n}\n.md\\:bg-grey[data-v-ad49e094] {\n    background-color: #b8c2cc;\n}\n.md\\:bg-grey-light[data-v-ad49e094] {\n    background-color: #dae1e7;\n}\n.md\\:bg-grey-lighter[data-v-ad49e094] {\n    background-color: #f1f5f8;\n}\n.md\\:bg-grey-lightest[data-v-ad49e094] {\n    background-color: #f8fafc;\n}\n.md\\:bg-white[data-v-ad49e094] {\n    background-color: #fff;\n}\n.md\\:bg-red-darkest[data-v-ad49e094] {\n    background-color: #3b0d0c;\n}\n.md\\:bg-red-darker[data-v-ad49e094] {\n    background-color: #621b18;\n}\n.md\\:bg-red-dark[data-v-ad49e094] {\n    background-color: #cc1f1a;\n}\n.md\\:bg-red[data-v-ad49e094] {\n    background-color: #e3342f;\n}\n.md\\:bg-red-light[data-v-ad49e094] {\n    background-color: #ef5753;\n}\n.md\\:bg-red-lighter[data-v-ad49e094] {\n    background-color: #f9acaa;\n}\n.md\\:bg-red-lightest[data-v-ad49e094] {\n    background-color: #fcebea;\n}\n.md\\:bg-orange-darkest[data-v-ad49e094] {\n    background-color: #462a16;\n}\n.md\\:bg-orange-darker[data-v-ad49e094] {\n    background-color: #613b1f;\n}\n.md\\:bg-orange-dark[data-v-ad49e094] {\n    background-color: #de751f;\n}\n.md\\:bg-orange[data-v-ad49e094] {\n    background-color: #f6993f;\n}\n.md\\:bg-orange-light[data-v-ad49e094] {\n    background-color: #faad63;\n}\n.md\\:bg-orange-lighter[data-v-ad49e094] {\n    background-color: #fcd9b6;\n}\n.md\\:bg-orange-lightest[data-v-ad49e094] {\n    background-color: #fff5eb;\n}\n.md\\:bg-yellow-darkest[data-v-ad49e094] {\n    background-color: #453411;\n}\n.md\\:bg-yellow-darker[data-v-ad49e094] {\n    background-color: #684f1d;\n}\n.md\\:bg-yellow-dark[data-v-ad49e094] {\n    background-color: #f2d024;\n}\n.md\\:bg-yellow[data-v-ad49e094] {\n    background-color: #ffed4a;\n}\n.md\\:bg-yellow-light[data-v-ad49e094] {\n    background-color: #fff382;\n}\n.md\\:bg-yellow-lighter[data-v-ad49e094] {\n    background-color: #fff9c2;\n}\n.md\\:bg-yellow-lightest[data-v-ad49e094] {\n    background-color: #fcfbeb;\n}\n.md\\:bg-green-darkest[data-v-ad49e094] {\n    background-color: #0f2f21;\n}\n.md\\:bg-green-darker[data-v-ad49e094] {\n    background-color: #1a4731;\n}\n.md\\:bg-green-dark[data-v-ad49e094] {\n    background-color: #1f9d55;\n}\n.md\\:bg-green[data-v-ad49e094] {\n    background-color: #38c172;\n}\n.md\\:bg-green-light[data-v-ad49e094] {\n    background-color: #51d88a;\n}\n.md\\:bg-green-lighter[data-v-ad49e094] {\n    background-color: #a2f5bf;\n}\n.md\\:bg-green-lightest[data-v-ad49e094] {\n    background-color: #e3fcec;\n}\n.md\\:bg-teal-darkest[data-v-ad49e094] {\n    background-color: #0d3331;\n}\n.md\\:bg-teal-darker[data-v-ad49e094] {\n    background-color: #20504f;\n}\n.md\\:bg-teal-dark[data-v-ad49e094] {\n    background-color: #38a89d;\n}\n.md\\:bg-teal[data-v-ad49e094] {\n    background-color: #4dc0b5;\n}\n.md\\:bg-teal-light[data-v-ad49e094] {\n    background-color: #64d5ca;\n}\n.md\\:bg-teal-lighter[data-v-ad49e094] {\n    background-color: #a0f0ed;\n}\n.md\\:bg-teal-lightest[data-v-ad49e094] {\n    background-color: #e8fffe;\n}\n.md\\:bg-blue-darkest[data-v-ad49e094] {\n    background-color: #12283a;\n}\n.md\\:bg-blue-darker[data-v-ad49e094] {\n    background-color: #1c3d5a;\n}\n.md\\:bg-blue-dark[data-v-ad49e094] {\n    background-color: #2779bd;\n}\n.md\\:bg-blue[data-v-ad49e094] {\n    background-color: #3490dc;\n}\n.md\\:bg-blue-light[data-v-ad49e094] {\n    background-color: #6cb2eb;\n}\n.md\\:bg-blue-lighter[data-v-ad49e094] {\n    background-color: #bcdefa;\n}\n.md\\:bg-blue-lightest[data-v-ad49e094] {\n    background-color: #eff8ff;\n}\n.md\\:bg-indigo-darkest[data-v-ad49e094] {\n    background-color: #191e38;\n}\n.md\\:bg-indigo-darker[data-v-ad49e094] {\n    background-color: #2f365f;\n}\n.md\\:bg-indigo-dark[data-v-ad49e094] {\n    background-color: #5661b3;\n}\n.md\\:bg-indigo[data-v-ad49e094] {\n    background-color: #6574cd;\n}\n.md\\:bg-indigo-light[data-v-ad49e094] {\n    background-color: #7886d7;\n}\n.md\\:bg-indigo-lighter[data-v-ad49e094] {\n    background-color: #b2b7ff;\n}\n.md\\:bg-indigo-lightest[data-v-ad49e094] {\n    background-color: #e6e8ff;\n}\n.md\\:bg-purple-darkest[data-v-ad49e094] {\n    background-color: #21183c;\n}\n.md\\:bg-purple-darker[data-v-ad49e094] {\n    background-color: #382b5f;\n}\n.md\\:bg-purple-dark[data-v-ad49e094] {\n    background-color: #794acf;\n}\n.md\\:bg-purple[data-v-ad49e094] {\n    background-color: #9561e2;\n}\n.md\\:bg-purple-light[data-v-ad49e094] {\n    background-color: #a779e9;\n}\n.md\\:bg-purple-lighter[data-v-ad49e094] {\n    background-color: #d6bbfc;\n}\n.md\\:bg-purple-lightest[data-v-ad49e094] {\n    background-color: #f3ebff;\n}\n.md\\:bg-pink-darkest[data-v-ad49e094] {\n    background-color: #451225;\n}\n.md\\:bg-pink-darker[data-v-ad49e094] {\n    background-color: #6f213f;\n}\n.md\\:bg-pink-dark[data-v-ad49e094] {\n    background-color: #eb5286;\n}\n.md\\:bg-pink[data-v-ad49e094] {\n    background-color: #f66d9b;\n}\n.md\\:bg-pink-light[data-v-ad49e094] {\n    background-color: #fa7ea8;\n}\n.md\\:bg-pink-lighter[data-v-ad49e094] {\n    background-color: #ffbbca;\n}\n.md\\:bg-pink-lightest[data-v-ad49e094] {\n    background-color: #ffebef;\n}\n.md\\:hover\\:bg-transparent[data-v-ad49e094]:hover {\n    background-color: transparent;\n}\n.md\\:hover\\:bg-black[data-v-ad49e094]:hover {\n    background-color: #22292f;\n}\n.md\\:hover\\:bg-grey-darkest[data-v-ad49e094]:hover {\n    background-color: #3d4852;\n}\n.md\\:hover\\:bg-grey-darker[data-v-ad49e094]:hover {\n    background-color: #606f7b;\n}\n.md\\:hover\\:bg-grey-dark[data-v-ad49e094]:hover {\n    background-color: #8795a1;\n}\n.md\\:hover\\:bg-grey[data-v-ad49e094]:hover {\n    background-color: #b8c2cc;\n}\n.md\\:hover\\:bg-grey-light[data-v-ad49e094]:hover {\n    background-color: #dae1e7;\n}\n.md\\:hover\\:bg-grey-lighter[data-v-ad49e094]:hover {\n    background-color: #f1f5f8;\n}\n.md\\:hover\\:bg-grey-lightest[data-v-ad49e094]:hover {\n    background-color: #f8fafc;\n}\n.md\\:hover\\:bg-white[data-v-ad49e094]:hover {\n    background-color: #fff;\n}\n.md\\:hover\\:bg-red-darkest[data-v-ad49e094]:hover {\n    background-color: #3b0d0c;\n}\n.md\\:hover\\:bg-red-darker[data-v-ad49e094]:hover {\n    background-color: #621b18;\n}\n.md\\:hover\\:bg-red-dark[data-v-ad49e094]:hover {\n    background-color: #cc1f1a;\n}\n.md\\:hover\\:bg-red[data-v-ad49e094]:hover {\n    background-color: #e3342f;\n}\n.md\\:hover\\:bg-red-light[data-v-ad49e094]:hover {\n    background-color: #ef5753;\n}\n.md\\:hover\\:bg-red-lighter[data-v-ad49e094]:hover {\n    background-color: #f9acaa;\n}\n.md\\:hover\\:bg-red-lightest[data-v-ad49e094]:hover {\n    background-color: #fcebea;\n}\n.md\\:hover\\:bg-orange-darkest[data-v-ad49e094]:hover {\n    background-color: #462a16;\n}\n.md\\:hover\\:bg-orange-darker[data-v-ad49e094]:hover {\n    background-color: #613b1f;\n}\n.md\\:hover\\:bg-orange-dark[data-v-ad49e094]:hover {\n    background-color: #de751f;\n}\n.md\\:hover\\:bg-orange[data-v-ad49e094]:hover {\n    background-color: #f6993f;\n}\n.md\\:hover\\:bg-orange-light[data-v-ad49e094]:hover {\n    background-color: #faad63;\n}\n.md\\:hover\\:bg-orange-lighter[data-v-ad49e094]:hover {\n    background-color: #fcd9b6;\n}\n.md\\:hover\\:bg-orange-lightest[data-v-ad49e094]:hover {\n    background-color: #fff5eb;\n}\n.md\\:hover\\:bg-yellow-darkest[data-v-ad49e094]:hover {\n    background-color: #453411;\n}\n.md\\:hover\\:bg-yellow-darker[data-v-ad49e094]:hover {\n    background-color: #684f1d;\n}\n.md\\:hover\\:bg-yellow-dark[data-v-ad49e094]:hover {\n    background-color: #f2d024;\n}\n.md\\:hover\\:bg-yellow[data-v-ad49e094]:hover {\n    background-color: #ffed4a;\n}\n.md\\:hover\\:bg-yellow-light[data-v-ad49e094]:hover {\n    background-color: #fff382;\n}\n.md\\:hover\\:bg-yellow-lighter[data-v-ad49e094]:hover {\n    background-color: #fff9c2;\n}\n.md\\:hover\\:bg-yellow-lightest[data-v-ad49e094]:hover {\n    background-color: #fcfbeb;\n}\n.md\\:hover\\:bg-green-darkest[data-v-ad49e094]:hover {\n    background-color: #0f2f21;\n}\n.md\\:hover\\:bg-green-darker[data-v-ad49e094]:hover {\n    background-color: #1a4731;\n}\n.md\\:hover\\:bg-green-dark[data-v-ad49e094]:hover {\n    background-color: #1f9d55;\n}\n.md\\:hover\\:bg-green[data-v-ad49e094]:hover {\n    background-color: #38c172;\n}\n.md\\:hover\\:bg-green-light[data-v-ad49e094]:hover {\n    background-color: #51d88a;\n}\n.md\\:hover\\:bg-green-lighter[data-v-ad49e094]:hover {\n    background-color: #a2f5bf;\n}\n.md\\:hover\\:bg-green-lightest[data-v-ad49e094]:hover {\n    background-color: #e3fcec;\n}\n.md\\:hover\\:bg-teal-darkest[data-v-ad49e094]:hover {\n    background-color: #0d3331;\n}\n.md\\:hover\\:bg-teal-darker[data-v-ad49e094]:hover {\n    background-color: #20504f;\n}\n.md\\:hover\\:bg-teal-dark[data-v-ad49e094]:hover {\n    background-color: #38a89d;\n}\n.md\\:hover\\:bg-teal[data-v-ad49e094]:hover {\n    background-color: #4dc0b5;\n}\n.md\\:hover\\:bg-teal-light[data-v-ad49e094]:hover {\n    background-color: #64d5ca;\n}\n.md\\:hover\\:bg-teal-lighter[data-v-ad49e094]:hover {\n    background-color: #a0f0ed;\n}\n.md\\:hover\\:bg-teal-lightest[data-v-ad49e094]:hover {\n    background-color: #e8fffe;\n}\n.md\\:hover\\:bg-blue-darkest[data-v-ad49e094]:hover {\n    background-color: #12283a;\n}\n.md\\:hover\\:bg-blue-darker[data-v-ad49e094]:hover {\n    background-color: #1c3d5a;\n}\n.md\\:hover\\:bg-blue-dark[data-v-ad49e094]:hover {\n    background-color: #2779bd;\n}\n.md\\:hover\\:bg-blue[data-v-ad49e094]:hover {\n    background-color: #3490dc;\n}\n.md\\:hover\\:bg-blue-light[data-v-ad49e094]:hover {\n    background-color: #6cb2eb;\n}\n.md\\:hover\\:bg-blue-lighter[data-v-ad49e094]:hover {\n    background-color: #bcdefa;\n}\n.md\\:hover\\:bg-blue-lightest[data-v-ad49e094]:hover {\n    background-color: #eff8ff;\n}\n.md\\:hover\\:bg-indigo-darkest[data-v-ad49e094]:hover {\n    background-color: #191e38;\n}\n.md\\:hover\\:bg-indigo-darker[data-v-ad49e094]:hover {\n    background-color: #2f365f;\n}\n.md\\:hover\\:bg-indigo-dark[data-v-ad49e094]:hover {\n    background-color: #5661b3;\n}\n.md\\:hover\\:bg-indigo[data-v-ad49e094]:hover {\n    background-color: #6574cd;\n}\n.md\\:hover\\:bg-indigo-light[data-v-ad49e094]:hover {\n    background-color: #7886d7;\n}\n.md\\:hover\\:bg-indigo-lighter[data-v-ad49e094]:hover {\n    background-color: #b2b7ff;\n}\n.md\\:hover\\:bg-indigo-lightest[data-v-ad49e094]:hover {\n    background-color: #e6e8ff;\n}\n.md\\:hover\\:bg-purple-darkest[data-v-ad49e094]:hover {\n    background-color: #21183c;\n}\n.md\\:hover\\:bg-purple-darker[data-v-ad49e094]:hover {\n    background-color: #382b5f;\n}\n.md\\:hover\\:bg-purple-dark[data-v-ad49e094]:hover {\n    background-color: #794acf;\n}\n.md\\:hover\\:bg-purple[data-v-ad49e094]:hover {\n    background-color: #9561e2;\n}\n.md\\:hover\\:bg-purple-light[data-v-ad49e094]:hover {\n    background-color: #a779e9;\n}\n.md\\:hover\\:bg-purple-lighter[data-v-ad49e094]:hover {\n    background-color: #d6bbfc;\n}\n.md\\:hover\\:bg-purple-lightest[data-v-ad49e094]:hover {\n    background-color: #f3ebff;\n}\n.md\\:hover\\:bg-pink-darkest[data-v-ad49e094]:hover {\n    background-color: #451225;\n}\n.md\\:hover\\:bg-pink-darker[data-v-ad49e094]:hover {\n    background-color: #6f213f;\n}\n.md\\:hover\\:bg-pink-dark[data-v-ad49e094]:hover {\n    background-color: #eb5286;\n}\n.md\\:hover\\:bg-pink[data-v-ad49e094]:hover {\n    background-color: #f66d9b;\n}\n.md\\:hover\\:bg-pink-light[data-v-ad49e094]:hover {\n    background-color: #fa7ea8;\n}\n.md\\:hover\\:bg-pink-lighter[data-v-ad49e094]:hover {\n    background-color: #ffbbca;\n}\n.md\\:hover\\:bg-pink-lightest[data-v-ad49e094]:hover {\n    background-color: #ffebef;\n}\n.md\\:focus\\:bg-transparent[data-v-ad49e094]:focus {\n    background-color: transparent;\n}\n.md\\:focus\\:bg-black[data-v-ad49e094]:focus {\n    background-color: #22292f;\n}\n.md\\:focus\\:bg-grey-darkest[data-v-ad49e094]:focus {\n    background-color: #3d4852;\n}\n.md\\:focus\\:bg-grey-darker[data-v-ad49e094]:focus {\n    background-color: #606f7b;\n}\n.md\\:focus\\:bg-grey-dark[data-v-ad49e094]:focus {\n    background-color: #8795a1;\n}\n.md\\:focus\\:bg-grey[data-v-ad49e094]:focus {\n    background-color: #b8c2cc;\n}\n.md\\:focus\\:bg-grey-light[data-v-ad49e094]:focus {\n    background-color: #dae1e7;\n}\n.md\\:focus\\:bg-grey-lighter[data-v-ad49e094]:focus {\n    background-color: #f1f5f8;\n}\n.md\\:focus\\:bg-grey-lightest[data-v-ad49e094]:focus {\n    background-color: #f8fafc;\n}\n.md\\:focus\\:bg-white[data-v-ad49e094]:focus {\n    background-color: #fff;\n}\n.md\\:focus\\:bg-red-darkest[data-v-ad49e094]:focus {\n    background-color: #3b0d0c;\n}\n.md\\:focus\\:bg-red-darker[data-v-ad49e094]:focus {\n    background-color: #621b18;\n}\n.md\\:focus\\:bg-red-dark[data-v-ad49e094]:focus {\n    background-color: #cc1f1a;\n}\n.md\\:focus\\:bg-red[data-v-ad49e094]:focus {\n    background-color: #e3342f;\n}\n.md\\:focus\\:bg-red-light[data-v-ad49e094]:focus {\n    background-color: #ef5753;\n}\n.md\\:focus\\:bg-red-lighter[data-v-ad49e094]:focus {\n    background-color: #f9acaa;\n}\n.md\\:focus\\:bg-red-lightest[data-v-ad49e094]:focus {\n    background-color: #fcebea;\n}\n.md\\:focus\\:bg-orange-darkest[data-v-ad49e094]:focus {\n    background-color: #462a16;\n}\n.md\\:focus\\:bg-orange-darker[data-v-ad49e094]:focus {\n    background-color: #613b1f;\n}\n.md\\:focus\\:bg-orange-dark[data-v-ad49e094]:focus {\n    background-color: #de751f;\n}\n.md\\:focus\\:bg-orange[data-v-ad49e094]:focus {\n    background-color: #f6993f;\n}\n.md\\:focus\\:bg-orange-light[data-v-ad49e094]:focus {\n    background-color: #faad63;\n}\n.md\\:focus\\:bg-orange-lighter[data-v-ad49e094]:focus {\n    background-color: #fcd9b6;\n}\n.md\\:focus\\:bg-orange-lightest[data-v-ad49e094]:focus {\n    background-color: #fff5eb;\n}\n.md\\:focus\\:bg-yellow-darkest[data-v-ad49e094]:focus {\n    background-color: #453411;\n}\n.md\\:focus\\:bg-yellow-darker[data-v-ad49e094]:focus {\n    background-color: #684f1d;\n}\n.md\\:focus\\:bg-yellow-dark[data-v-ad49e094]:focus {\n    background-color: #f2d024;\n}\n.md\\:focus\\:bg-yellow[data-v-ad49e094]:focus {\n    background-color: #ffed4a;\n}\n.md\\:focus\\:bg-yellow-light[data-v-ad49e094]:focus {\n    background-color: #fff382;\n}\n.md\\:focus\\:bg-yellow-lighter[data-v-ad49e094]:focus {\n    background-color: #fff9c2;\n}\n.md\\:focus\\:bg-yellow-lightest[data-v-ad49e094]:focus {\n    background-color: #fcfbeb;\n}\n.md\\:focus\\:bg-green-darkest[data-v-ad49e094]:focus {\n    background-color: #0f2f21;\n}\n.md\\:focus\\:bg-green-darker[data-v-ad49e094]:focus {\n    background-color: #1a4731;\n}\n.md\\:focus\\:bg-green-dark[data-v-ad49e094]:focus {\n    background-color: #1f9d55;\n}\n.md\\:focus\\:bg-green[data-v-ad49e094]:focus {\n    background-color: #38c172;\n}\n.md\\:focus\\:bg-green-light[data-v-ad49e094]:focus {\n    background-color: #51d88a;\n}\n.md\\:focus\\:bg-green-lighter[data-v-ad49e094]:focus {\n    background-color: #a2f5bf;\n}\n.md\\:focus\\:bg-green-lightest[data-v-ad49e094]:focus {\n    background-color: #e3fcec;\n}\n.md\\:focus\\:bg-teal-darkest[data-v-ad49e094]:focus {\n    background-color: #0d3331;\n}\n.md\\:focus\\:bg-teal-darker[data-v-ad49e094]:focus {\n    background-color: #20504f;\n}\n.md\\:focus\\:bg-teal-dark[data-v-ad49e094]:focus {\n    background-color: #38a89d;\n}\n.md\\:focus\\:bg-teal[data-v-ad49e094]:focus {\n    background-color: #4dc0b5;\n}\n.md\\:focus\\:bg-teal-light[data-v-ad49e094]:focus {\n    background-color: #64d5ca;\n}\n.md\\:focus\\:bg-teal-lighter[data-v-ad49e094]:focus {\n    background-color: #a0f0ed;\n}\n.md\\:focus\\:bg-teal-lightest[data-v-ad49e094]:focus {\n    background-color: #e8fffe;\n}\n.md\\:focus\\:bg-blue-darkest[data-v-ad49e094]:focus {\n    background-color: #12283a;\n}\n.md\\:focus\\:bg-blue-darker[data-v-ad49e094]:focus {\n    background-color: #1c3d5a;\n}\n.md\\:focus\\:bg-blue-dark[data-v-ad49e094]:focus {\n    background-color: #2779bd;\n}\n.md\\:focus\\:bg-blue[data-v-ad49e094]:focus {\n    background-color: #3490dc;\n}\n.md\\:focus\\:bg-blue-light[data-v-ad49e094]:focus {\n    background-color: #6cb2eb;\n}\n.md\\:focus\\:bg-blue-lighter[data-v-ad49e094]:focus {\n    background-color: #bcdefa;\n}\n.md\\:focus\\:bg-blue-lightest[data-v-ad49e094]:focus {\n    background-color: #eff8ff;\n}\n.md\\:focus\\:bg-indigo-darkest[data-v-ad49e094]:focus {\n    background-color: #191e38;\n}\n.md\\:focus\\:bg-indigo-darker[data-v-ad49e094]:focus {\n    background-color: #2f365f;\n}\n.md\\:focus\\:bg-indigo-dark[data-v-ad49e094]:focus {\n    background-color: #5661b3;\n}\n.md\\:focus\\:bg-indigo[data-v-ad49e094]:focus {\n    background-color: #6574cd;\n}\n.md\\:focus\\:bg-indigo-light[data-v-ad49e094]:focus {\n    background-color: #7886d7;\n}\n.md\\:focus\\:bg-indigo-lighter[data-v-ad49e094]:focus {\n    background-color: #b2b7ff;\n}\n.md\\:focus\\:bg-indigo-lightest[data-v-ad49e094]:focus {\n    background-color: #e6e8ff;\n}\n.md\\:focus\\:bg-purple-darkest[data-v-ad49e094]:focus {\n    background-color: #21183c;\n}\n.md\\:focus\\:bg-purple-darker[data-v-ad49e094]:focus {\n    background-color: #382b5f;\n}\n.md\\:focus\\:bg-purple-dark[data-v-ad49e094]:focus {\n    background-color: #794acf;\n}\n.md\\:focus\\:bg-purple[data-v-ad49e094]:focus {\n    background-color: #9561e2;\n}\n.md\\:focus\\:bg-purple-light[data-v-ad49e094]:focus {\n    background-color: #a779e9;\n}\n.md\\:focus\\:bg-purple-lighter[data-v-ad49e094]:focus {\n    background-color: #d6bbfc;\n}\n.md\\:focus\\:bg-purple-lightest[data-v-ad49e094]:focus {\n    background-color: #f3ebff;\n}\n.md\\:focus\\:bg-pink-darkest[data-v-ad49e094]:focus {\n    background-color: #451225;\n}\n.md\\:focus\\:bg-pink-darker[data-v-ad49e094]:focus {\n    background-color: #6f213f;\n}\n.md\\:focus\\:bg-pink-dark[data-v-ad49e094]:focus {\n    background-color: #eb5286;\n}\n.md\\:focus\\:bg-pink[data-v-ad49e094]:focus {\n    background-color: #f66d9b;\n}\n.md\\:focus\\:bg-pink-light[data-v-ad49e094]:focus {\n    background-color: #fa7ea8;\n}\n.md\\:focus\\:bg-pink-lighter[data-v-ad49e094]:focus {\n    background-color: #ffbbca;\n}\n.md\\:focus\\:bg-pink-lightest[data-v-ad49e094]:focus {\n    background-color: #ffebef;\n}\n.md\\:bg-bottom[data-v-ad49e094] {\n    background-position: bottom;\n}\n.md\\:bg-center[data-v-ad49e094] {\n    background-position: center;\n}\n.md\\:bg-left[data-v-ad49e094] {\n    background-position: left;\n}\n.md\\:bg-left-bottom[data-v-ad49e094] {\n    background-position: left bottom;\n}\n.md\\:bg-left-top[data-v-ad49e094] {\n    background-position: left top;\n}\n.md\\:bg-right[data-v-ad49e094] {\n    background-position: right;\n}\n.md\\:bg-right-bottom[data-v-ad49e094] {\n    background-position: right bottom;\n}\n.md\\:bg-right-top[data-v-ad49e094] {\n    background-position: right top;\n}\n.md\\:bg-top[data-v-ad49e094] {\n    background-position: top;\n}\n.md\\:bg-repeat[data-v-ad49e094] {\n    background-repeat: repeat;\n}\n.md\\:bg-no-repeat[data-v-ad49e094] {\n    background-repeat: no-repeat;\n}\n.md\\:bg-repeat-x[data-v-ad49e094] {\n    background-repeat: repeat-x;\n}\n.md\\:bg-repeat-y[data-v-ad49e094] {\n    background-repeat: repeat-y;\n}\n.md\\:bg-auto[data-v-ad49e094] {\n    background-size: auto;\n}\n.md\\:bg-cover[data-v-ad49e094] {\n    background-size: cover;\n}\n.md\\:bg-contain[data-v-ad49e094] {\n    background-size: contain;\n}\n.md\\:border-transparent[data-v-ad49e094] {\n    border-color: transparent;\n}\n.md\\:border-black[data-v-ad49e094] {\n    border-color: #22292f;\n}\n.md\\:border-grey-darkest[data-v-ad49e094] {\n    border-color: #3d4852;\n}\n.md\\:border-grey-darker[data-v-ad49e094] {\n    border-color: #606f7b;\n}\n.md\\:border-grey-dark[data-v-ad49e094] {\n    border-color: #8795a1;\n}\n.md\\:border-grey[data-v-ad49e094] {\n    border-color: #b8c2cc;\n}\n.md\\:border-grey-light[data-v-ad49e094] {\n    border-color: #dae1e7;\n}\n.md\\:border-grey-lighter[data-v-ad49e094] {\n    border-color: #f1f5f8;\n}\n.md\\:border-grey-lightest[data-v-ad49e094] {\n    border-color: #f8fafc;\n}\n.md\\:border-white[data-v-ad49e094] {\n    border-color: #fff;\n}\n.md\\:border-red-darkest[data-v-ad49e094] {\n    border-color: #3b0d0c;\n}\n.md\\:border-red-darker[data-v-ad49e094] {\n    border-color: #621b18;\n}\n.md\\:border-red-dark[data-v-ad49e094] {\n    border-color: #cc1f1a;\n}\n.md\\:border-red[data-v-ad49e094] {\n    border-color: #e3342f;\n}\n.md\\:border-red-light[data-v-ad49e094] {\n    border-color: #ef5753;\n}\n.md\\:border-red-lighter[data-v-ad49e094] {\n    border-color: #f9acaa;\n}\n.md\\:border-red-lightest[data-v-ad49e094] {\n    border-color: #fcebea;\n}\n.md\\:border-orange-darkest[data-v-ad49e094] {\n    border-color: #462a16;\n}\n.md\\:border-orange-darker[data-v-ad49e094] {\n    border-color: #613b1f;\n}\n.md\\:border-orange-dark[data-v-ad49e094] {\n    border-color: #de751f;\n}\n.md\\:border-orange[data-v-ad49e094] {\n    border-color: #f6993f;\n}\n.md\\:border-orange-light[data-v-ad49e094] {\n    border-color: #faad63;\n}\n.md\\:border-orange-lighter[data-v-ad49e094] {\n    border-color: #fcd9b6;\n}\n.md\\:border-orange-lightest[data-v-ad49e094] {\n    border-color: #fff5eb;\n}\n.md\\:border-yellow-darkest[data-v-ad49e094] {\n    border-color: #453411;\n}\n.md\\:border-yellow-darker[data-v-ad49e094] {\n    border-color: #684f1d;\n}\n.md\\:border-yellow-dark[data-v-ad49e094] {\n    border-color: #f2d024;\n}\n.md\\:border-yellow[data-v-ad49e094] {\n    border-color: #ffed4a;\n}\n.md\\:border-yellow-light[data-v-ad49e094] {\n    border-color: #fff382;\n}\n.md\\:border-yellow-lighter[data-v-ad49e094] {\n    border-color: #fff9c2;\n}\n.md\\:border-yellow-lightest[data-v-ad49e094] {\n    border-color: #fcfbeb;\n}\n.md\\:border-green-darkest[data-v-ad49e094] {\n    border-color: #0f2f21;\n}\n.md\\:border-green-darker[data-v-ad49e094] {\n    border-color: #1a4731;\n}\n.md\\:border-green-dark[data-v-ad49e094] {\n    border-color: #1f9d55;\n}\n.md\\:border-green[data-v-ad49e094] {\n    border-color: #38c172;\n}\n.md\\:border-green-light[data-v-ad49e094] {\n    border-color: #51d88a;\n}\n.md\\:border-green-lighter[data-v-ad49e094] {\n    border-color: #a2f5bf;\n}\n.md\\:border-green-lightest[data-v-ad49e094] {\n    border-color: #e3fcec;\n}\n.md\\:border-teal-darkest[data-v-ad49e094] {\n    border-color: #0d3331;\n}\n.md\\:border-teal-darker[data-v-ad49e094] {\n    border-color: #20504f;\n}\n.md\\:border-teal-dark[data-v-ad49e094] {\n    border-color: #38a89d;\n}\n.md\\:border-teal[data-v-ad49e094] {\n    border-color: #4dc0b5;\n}\n.md\\:border-teal-light[data-v-ad49e094] {\n    border-color: #64d5ca;\n}\n.md\\:border-teal-lighter[data-v-ad49e094] {\n    border-color: #a0f0ed;\n}\n.md\\:border-teal-lightest[data-v-ad49e094] {\n    border-color: #e8fffe;\n}\n.md\\:border-blue-darkest[data-v-ad49e094] {\n    border-color: #12283a;\n}\n.md\\:border-blue-darker[data-v-ad49e094] {\n    border-color: #1c3d5a;\n}\n.md\\:border-blue-dark[data-v-ad49e094] {\n    border-color: #2779bd;\n}\n.md\\:border-blue[data-v-ad49e094] {\n    border-color: #3490dc;\n}\n.md\\:border-blue-light[data-v-ad49e094] {\n    border-color: #6cb2eb;\n}\n.md\\:border-blue-lighter[data-v-ad49e094] {\n    border-color: #bcdefa;\n}\n.md\\:border-blue-lightest[data-v-ad49e094] {\n    border-color: #eff8ff;\n}\n.md\\:border-indigo-darkest[data-v-ad49e094] {\n    border-color: #191e38;\n}\n.md\\:border-indigo-darker[data-v-ad49e094] {\n    border-color: #2f365f;\n}\n.md\\:border-indigo-dark[data-v-ad49e094] {\n    border-color: #5661b3;\n}\n.md\\:border-indigo[data-v-ad49e094] {\n    border-color: #6574cd;\n}\n.md\\:border-indigo-light[data-v-ad49e094] {\n    border-color: #7886d7;\n}\n.md\\:border-indigo-lighter[data-v-ad49e094] {\n    border-color: #b2b7ff;\n}\n.md\\:border-indigo-lightest[data-v-ad49e094] {\n    border-color: #e6e8ff;\n}\n.md\\:border-purple-darkest[data-v-ad49e094] {\n    border-color: #21183c;\n}\n.md\\:border-purple-darker[data-v-ad49e094] {\n    border-color: #382b5f;\n}\n.md\\:border-purple-dark[data-v-ad49e094] {\n    border-color: #794acf;\n}\n.md\\:border-purple[data-v-ad49e094] {\n    border-color: #9561e2;\n}\n.md\\:border-purple-light[data-v-ad49e094] {\n    border-color: #a779e9;\n}\n.md\\:border-purple-lighter[data-v-ad49e094] {\n    border-color: #d6bbfc;\n}\n.md\\:border-purple-lightest[data-v-ad49e094] {\n    border-color: #f3ebff;\n}\n.md\\:border-pink-darkest[data-v-ad49e094] {\n    border-color: #451225;\n}\n.md\\:border-pink-darker[data-v-ad49e094] {\n    border-color: #6f213f;\n}\n.md\\:border-pink-dark[data-v-ad49e094] {\n    border-color: #eb5286;\n}\n.md\\:border-pink[data-v-ad49e094] {\n    border-color: #f66d9b;\n}\n.md\\:border-pink-light[data-v-ad49e094] {\n    border-color: #fa7ea8;\n}\n.md\\:border-pink-lighter[data-v-ad49e094] {\n    border-color: #ffbbca;\n}\n.md\\:border-pink-lightest[data-v-ad49e094] {\n    border-color: #ffebef;\n}\n.md\\:hover\\:border-transparent[data-v-ad49e094]:hover {\n    border-color: transparent;\n}\n.md\\:hover\\:border-black[data-v-ad49e094]:hover {\n    border-color: #22292f;\n}\n.md\\:hover\\:border-grey-darkest[data-v-ad49e094]:hover {\n    border-color: #3d4852;\n}\n.md\\:hover\\:border-grey-darker[data-v-ad49e094]:hover {\n    border-color: #606f7b;\n}\n.md\\:hover\\:border-grey-dark[data-v-ad49e094]:hover {\n    border-color: #8795a1;\n}\n.md\\:hover\\:border-grey[data-v-ad49e094]:hover {\n    border-color: #b8c2cc;\n}\n.md\\:hover\\:border-grey-light[data-v-ad49e094]:hover {\n    border-color: #dae1e7;\n}\n.md\\:hover\\:border-grey-lighter[data-v-ad49e094]:hover {\n    border-color: #f1f5f8;\n}\n.md\\:hover\\:border-grey-lightest[data-v-ad49e094]:hover {\n    border-color: #f8fafc;\n}\n.md\\:hover\\:border-white[data-v-ad49e094]:hover {\n    border-color: #fff;\n}\n.md\\:hover\\:border-red-darkest[data-v-ad49e094]:hover {\n    border-color: #3b0d0c;\n}\n.md\\:hover\\:border-red-darker[data-v-ad49e094]:hover {\n    border-color: #621b18;\n}\n.md\\:hover\\:border-red-dark[data-v-ad49e094]:hover {\n    border-color: #cc1f1a;\n}\n.md\\:hover\\:border-red[data-v-ad49e094]:hover {\n    border-color: #e3342f;\n}\n.md\\:hover\\:border-red-light[data-v-ad49e094]:hover {\n    border-color: #ef5753;\n}\n.md\\:hover\\:border-red-lighter[data-v-ad49e094]:hover {\n    border-color: #f9acaa;\n}\n.md\\:hover\\:border-red-lightest[data-v-ad49e094]:hover {\n    border-color: #fcebea;\n}\n.md\\:hover\\:border-orange-darkest[data-v-ad49e094]:hover {\n    border-color: #462a16;\n}\n.md\\:hover\\:border-orange-darker[data-v-ad49e094]:hover {\n    border-color: #613b1f;\n}\n.md\\:hover\\:border-orange-dark[data-v-ad49e094]:hover {\n    border-color: #de751f;\n}\n.md\\:hover\\:border-orange[data-v-ad49e094]:hover {\n    border-color: #f6993f;\n}\n.md\\:hover\\:border-orange-light[data-v-ad49e094]:hover {\n    border-color: #faad63;\n}\n.md\\:hover\\:border-orange-lighter[data-v-ad49e094]:hover {\n    border-color: #fcd9b6;\n}\n.md\\:hover\\:border-orange-lightest[data-v-ad49e094]:hover {\n    border-color: #fff5eb;\n}\n.md\\:hover\\:border-yellow-darkest[data-v-ad49e094]:hover {\n    border-color: #453411;\n}\n.md\\:hover\\:border-yellow-darker[data-v-ad49e094]:hover {\n    border-color: #684f1d;\n}\n.md\\:hover\\:border-yellow-dark[data-v-ad49e094]:hover {\n    border-color: #f2d024;\n}\n.md\\:hover\\:border-yellow[data-v-ad49e094]:hover {\n    border-color: #ffed4a;\n}\n.md\\:hover\\:border-yellow-light[data-v-ad49e094]:hover {\n    border-color: #fff382;\n}\n.md\\:hover\\:border-yellow-lighter[data-v-ad49e094]:hover {\n    border-color: #fff9c2;\n}\n.md\\:hover\\:border-yellow-lightest[data-v-ad49e094]:hover {\n    border-color: #fcfbeb;\n}\n.md\\:hover\\:border-green-darkest[data-v-ad49e094]:hover {\n    border-color: #0f2f21;\n}\n.md\\:hover\\:border-green-darker[data-v-ad49e094]:hover {\n    border-color: #1a4731;\n}\n.md\\:hover\\:border-green-dark[data-v-ad49e094]:hover {\n    border-color: #1f9d55;\n}\n.md\\:hover\\:border-green[data-v-ad49e094]:hover {\n    border-color: #38c172;\n}\n.md\\:hover\\:border-green-light[data-v-ad49e094]:hover {\n    border-color: #51d88a;\n}\n.md\\:hover\\:border-green-lighter[data-v-ad49e094]:hover {\n    border-color: #a2f5bf;\n}\n.md\\:hover\\:border-green-lightest[data-v-ad49e094]:hover {\n    border-color: #e3fcec;\n}\n.md\\:hover\\:border-teal-darkest[data-v-ad49e094]:hover {\n    border-color: #0d3331;\n}\n.md\\:hover\\:border-teal-darker[data-v-ad49e094]:hover {\n    border-color: #20504f;\n}\n.md\\:hover\\:border-teal-dark[data-v-ad49e094]:hover {\n    border-color: #38a89d;\n}\n.md\\:hover\\:border-teal[data-v-ad49e094]:hover {\n    border-color: #4dc0b5;\n}\n.md\\:hover\\:border-teal-light[data-v-ad49e094]:hover {\n    border-color: #64d5ca;\n}\n.md\\:hover\\:border-teal-lighter[data-v-ad49e094]:hover {\n    border-color: #a0f0ed;\n}\n.md\\:hover\\:border-teal-lightest[data-v-ad49e094]:hover {\n    border-color: #e8fffe;\n}\n.md\\:hover\\:border-blue-darkest[data-v-ad49e094]:hover {\n    border-color: #12283a;\n}\n.md\\:hover\\:border-blue-darker[data-v-ad49e094]:hover {\n    border-color: #1c3d5a;\n}\n.md\\:hover\\:border-blue-dark[data-v-ad49e094]:hover {\n    border-color: #2779bd;\n}\n.md\\:hover\\:border-blue[data-v-ad49e094]:hover {\n    border-color: #3490dc;\n}\n.md\\:hover\\:border-blue-light[data-v-ad49e094]:hover {\n    border-color: #6cb2eb;\n}\n.md\\:hover\\:border-blue-lighter[data-v-ad49e094]:hover {\n    border-color: #bcdefa;\n}\n.md\\:hover\\:border-blue-lightest[data-v-ad49e094]:hover {\n    border-color: #eff8ff;\n}\n.md\\:hover\\:border-indigo-darkest[data-v-ad49e094]:hover {\n    border-color: #191e38;\n}\n.md\\:hover\\:border-indigo-darker[data-v-ad49e094]:hover {\n    border-color: #2f365f;\n}\n.md\\:hover\\:border-indigo-dark[data-v-ad49e094]:hover {\n    border-color: #5661b3;\n}\n.md\\:hover\\:border-indigo[data-v-ad49e094]:hover {\n    border-color: #6574cd;\n}\n.md\\:hover\\:border-indigo-light[data-v-ad49e094]:hover {\n    border-color: #7886d7;\n}\n.md\\:hover\\:border-indigo-lighter[data-v-ad49e094]:hover {\n    border-color: #b2b7ff;\n}\n.md\\:hover\\:border-indigo-lightest[data-v-ad49e094]:hover {\n    border-color: #e6e8ff;\n}\n.md\\:hover\\:border-purple-darkest[data-v-ad49e094]:hover {\n    border-color: #21183c;\n}\n.md\\:hover\\:border-purple-darker[data-v-ad49e094]:hover {\n    border-color: #382b5f;\n}\n.md\\:hover\\:border-purple-dark[data-v-ad49e094]:hover {\n    border-color: #794acf;\n}\n.md\\:hover\\:border-purple[data-v-ad49e094]:hover {\n    border-color: #9561e2;\n}\n.md\\:hover\\:border-purple-light[data-v-ad49e094]:hover {\n    border-color: #a779e9;\n}\n.md\\:hover\\:border-purple-lighter[data-v-ad49e094]:hover {\n    border-color: #d6bbfc;\n}\n.md\\:hover\\:border-purple-lightest[data-v-ad49e094]:hover {\n    border-color: #f3ebff;\n}\n.md\\:hover\\:border-pink-darkest[data-v-ad49e094]:hover {\n    border-color: #451225;\n}\n.md\\:hover\\:border-pink-darker[data-v-ad49e094]:hover {\n    border-color: #6f213f;\n}\n.md\\:hover\\:border-pink-dark[data-v-ad49e094]:hover {\n    border-color: #eb5286;\n}\n.md\\:hover\\:border-pink[data-v-ad49e094]:hover {\n    border-color: #f66d9b;\n}\n.md\\:hover\\:border-pink-light[data-v-ad49e094]:hover {\n    border-color: #fa7ea8;\n}\n.md\\:hover\\:border-pink-lighter[data-v-ad49e094]:hover {\n    border-color: #ffbbca;\n}\n.md\\:hover\\:border-pink-lightest[data-v-ad49e094]:hover {\n    border-color: #ffebef;\n}\n.md\\:focus\\:border-transparent[data-v-ad49e094]:focus {\n    border-color: transparent;\n}\n.md\\:focus\\:border-black[data-v-ad49e094]:focus {\n    border-color: #22292f;\n}\n.md\\:focus\\:border-grey-darkest[data-v-ad49e094]:focus {\n    border-color: #3d4852;\n}\n.md\\:focus\\:border-grey-darker[data-v-ad49e094]:focus {\n    border-color: #606f7b;\n}\n.md\\:focus\\:border-grey-dark[data-v-ad49e094]:focus {\n    border-color: #8795a1;\n}\n.md\\:focus\\:border-grey[data-v-ad49e094]:focus {\n    border-color: #b8c2cc;\n}\n.md\\:focus\\:border-grey-light[data-v-ad49e094]:focus {\n    border-color: #dae1e7;\n}\n.md\\:focus\\:border-grey-lighter[data-v-ad49e094]:focus {\n    border-color: #f1f5f8;\n}\n.md\\:focus\\:border-grey-lightest[data-v-ad49e094]:focus {\n    border-color: #f8fafc;\n}\n.md\\:focus\\:border-white[data-v-ad49e094]:focus {\n    border-color: #fff;\n}\n.md\\:focus\\:border-red-darkest[data-v-ad49e094]:focus {\n    border-color: #3b0d0c;\n}\n.md\\:focus\\:border-red-darker[data-v-ad49e094]:focus {\n    border-color: #621b18;\n}\n.md\\:focus\\:border-red-dark[data-v-ad49e094]:focus {\n    border-color: #cc1f1a;\n}\n.md\\:focus\\:border-red[data-v-ad49e094]:focus {\n    border-color: #e3342f;\n}\n.md\\:focus\\:border-red-light[data-v-ad49e094]:focus {\n    border-color: #ef5753;\n}\n.md\\:focus\\:border-red-lighter[data-v-ad49e094]:focus {\n    border-color: #f9acaa;\n}\n.md\\:focus\\:border-red-lightest[data-v-ad49e094]:focus {\n    border-color: #fcebea;\n}\n.md\\:focus\\:border-orange-darkest[data-v-ad49e094]:focus {\n    border-color: #462a16;\n}\n.md\\:focus\\:border-orange-darker[data-v-ad49e094]:focus {\n    border-color: #613b1f;\n}\n.md\\:focus\\:border-orange-dark[data-v-ad49e094]:focus {\n    border-color: #de751f;\n}\n.md\\:focus\\:border-orange[data-v-ad49e094]:focus {\n    border-color: #f6993f;\n}\n.md\\:focus\\:border-orange-light[data-v-ad49e094]:focus {\n    border-color: #faad63;\n}\n.md\\:focus\\:border-orange-lighter[data-v-ad49e094]:focus {\n    border-color: #fcd9b6;\n}\n.md\\:focus\\:border-orange-lightest[data-v-ad49e094]:focus {\n    border-color: #fff5eb;\n}\n.md\\:focus\\:border-yellow-darkest[data-v-ad49e094]:focus {\n    border-color: #453411;\n}\n.md\\:focus\\:border-yellow-darker[data-v-ad49e094]:focus {\n    border-color: #684f1d;\n}\n.md\\:focus\\:border-yellow-dark[data-v-ad49e094]:focus {\n    border-color: #f2d024;\n}\n.md\\:focus\\:border-yellow[data-v-ad49e094]:focus {\n    border-color: #ffed4a;\n}\n.md\\:focus\\:border-yellow-light[data-v-ad49e094]:focus {\n    border-color: #fff382;\n}\n.md\\:focus\\:border-yellow-lighter[data-v-ad49e094]:focus {\n    border-color: #fff9c2;\n}\n.md\\:focus\\:border-yellow-lightest[data-v-ad49e094]:focus {\n    border-color: #fcfbeb;\n}\n.md\\:focus\\:border-green-darkest[data-v-ad49e094]:focus {\n    border-color: #0f2f21;\n}\n.md\\:focus\\:border-green-darker[data-v-ad49e094]:focus {\n    border-color: #1a4731;\n}\n.md\\:focus\\:border-green-dark[data-v-ad49e094]:focus {\n    border-color: #1f9d55;\n}\n.md\\:focus\\:border-green[data-v-ad49e094]:focus {\n    border-color: #38c172;\n}\n.md\\:focus\\:border-green-light[data-v-ad49e094]:focus {\n    border-color: #51d88a;\n}\n.md\\:focus\\:border-green-lighter[data-v-ad49e094]:focus {\n    border-color: #a2f5bf;\n}\n.md\\:focus\\:border-green-lightest[data-v-ad49e094]:focus {\n    border-color: #e3fcec;\n}\n.md\\:focus\\:border-teal-darkest[data-v-ad49e094]:focus {\n    border-color: #0d3331;\n}\n.md\\:focus\\:border-teal-darker[data-v-ad49e094]:focus {\n    border-color: #20504f;\n}\n.md\\:focus\\:border-teal-dark[data-v-ad49e094]:focus {\n    border-color: #38a89d;\n}\n.md\\:focus\\:border-teal[data-v-ad49e094]:focus {\n    border-color: #4dc0b5;\n}\n.md\\:focus\\:border-teal-light[data-v-ad49e094]:focus {\n    border-color: #64d5ca;\n}\n.md\\:focus\\:border-teal-lighter[data-v-ad49e094]:focus {\n    border-color: #a0f0ed;\n}\n.md\\:focus\\:border-teal-lightest[data-v-ad49e094]:focus {\n    border-color: #e8fffe;\n}\n.md\\:focus\\:border-blue-darkest[data-v-ad49e094]:focus {\n    border-color: #12283a;\n}\n.md\\:focus\\:border-blue-darker[data-v-ad49e094]:focus {\n    border-color: #1c3d5a;\n}\n.md\\:focus\\:border-blue-dark[data-v-ad49e094]:focus {\n    border-color: #2779bd;\n}\n.md\\:focus\\:border-blue[data-v-ad49e094]:focus {\n    border-color: #3490dc;\n}\n.md\\:focus\\:border-blue-light[data-v-ad49e094]:focus {\n    border-color: #6cb2eb;\n}\n.md\\:focus\\:border-blue-lighter[data-v-ad49e094]:focus {\n    border-color: #bcdefa;\n}\n.md\\:focus\\:border-blue-lightest[data-v-ad49e094]:focus {\n    border-color: #eff8ff;\n}\n.md\\:focus\\:border-indigo-darkest[data-v-ad49e094]:focus {\n    border-color: #191e38;\n}\n.md\\:focus\\:border-indigo-darker[data-v-ad49e094]:focus {\n    border-color: #2f365f;\n}\n.md\\:focus\\:border-indigo-dark[data-v-ad49e094]:focus {\n    border-color: #5661b3;\n}\n.md\\:focus\\:border-indigo[data-v-ad49e094]:focus {\n    border-color: #6574cd;\n}\n.md\\:focus\\:border-indigo-light[data-v-ad49e094]:focus {\n    border-color: #7886d7;\n}\n.md\\:focus\\:border-indigo-lighter[data-v-ad49e094]:focus {\n    border-color: #b2b7ff;\n}\n.md\\:focus\\:border-indigo-lightest[data-v-ad49e094]:focus {\n    border-color: #e6e8ff;\n}\n.md\\:focus\\:border-purple-darkest[data-v-ad49e094]:focus {\n    border-color: #21183c;\n}\n.md\\:focus\\:border-purple-darker[data-v-ad49e094]:focus {\n    border-color: #382b5f;\n}\n.md\\:focus\\:border-purple-dark[data-v-ad49e094]:focus {\n    border-color: #794acf;\n}\n.md\\:focus\\:border-purple[data-v-ad49e094]:focus {\n    border-color: #9561e2;\n}\n.md\\:focus\\:border-purple-light[data-v-ad49e094]:focus {\n    border-color: #a779e9;\n}\n.md\\:focus\\:border-purple-lighter[data-v-ad49e094]:focus {\n    border-color: #d6bbfc;\n}\n.md\\:focus\\:border-purple-lightest[data-v-ad49e094]:focus {\n    border-color: #f3ebff;\n}\n.md\\:focus\\:border-pink-darkest[data-v-ad49e094]:focus {\n    border-color: #451225;\n}\n.md\\:focus\\:border-pink-darker[data-v-ad49e094]:focus {\n    border-color: #6f213f;\n}\n.md\\:focus\\:border-pink-dark[data-v-ad49e094]:focus {\n    border-color: #eb5286;\n}\n.md\\:focus\\:border-pink[data-v-ad49e094]:focus {\n    border-color: #f66d9b;\n}\n.md\\:focus\\:border-pink-light[data-v-ad49e094]:focus {\n    border-color: #fa7ea8;\n}\n.md\\:focus\\:border-pink-lighter[data-v-ad49e094]:focus {\n    border-color: #ffbbca;\n}\n.md\\:focus\\:border-pink-lightest[data-v-ad49e094]:focus {\n    border-color: #ffebef;\n}\n.md\\:rounded-none[data-v-ad49e094] {\n    border-radius: 0;\n}\n.md\\:rounded-sm[data-v-ad49e094] {\n    border-radius: .125rem;\n}\n.md\\:rounded[data-v-ad49e094] {\n    border-radius: .25rem;\n}\n.md\\:rounded-lg[data-v-ad49e094] {\n    border-radius: .5rem;\n}\n.md\\:rounded-full[data-v-ad49e094] {\n    border-radius: 9999px;\n}\n.md\\:rounded-t-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n.md\\:rounded-r-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.md\\:rounded-b-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.md\\:rounded-l-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.md\\:rounded-t-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n}\n.md\\:rounded-r-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n}\n.md\\:rounded-b-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.md\\:rounded-l-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.md\\:rounded-t[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n}\n.md\\:rounded-r[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n}\n.md\\:rounded-b[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.md\\:rounded-l[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.md\\:rounded-t-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n}\n.md\\:rounded-r-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n}\n.md\\:rounded-b-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.md\\:rounded-l-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.md\\:rounded-t-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n}\n.md\\:rounded-r-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n}\n.md\\:rounded-b-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.md\\:rounded-l-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.md\\:rounded-tl-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n}\n.md\\:rounded-tr-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n}\n.md\\:rounded-br-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n}\n.md\\:rounded-bl-none[data-v-ad49e094] {\n    border-bottom-left-radius: 0;\n}\n.md\\:rounded-tl-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n}\n.md\\:rounded-tr-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n}\n.md\\:rounded-br-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n}\n.md\\:rounded-bl-sm[data-v-ad49e094] {\n    border-bottom-left-radius: .125rem;\n}\n.md\\:rounded-tl[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n}\n.md\\:rounded-tr[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n}\n.md\\:rounded-br[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n}\n.md\\:rounded-bl[data-v-ad49e094] {\n    border-bottom-left-radius: .25rem;\n}\n.md\\:rounded-tl-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n}\n.md\\:rounded-tr-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n}\n.md\\:rounded-br-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n}\n.md\\:rounded-bl-lg[data-v-ad49e094] {\n    border-bottom-left-radius: .5rem;\n}\n.md\\:rounded-tl-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n}\n.md\\:rounded-tr-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n}\n.md\\:rounded-br-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n}\n.md\\:rounded-bl-full[data-v-ad49e094] {\n    border-bottom-left-radius: 9999px;\n}\n.md\\:border-solid[data-v-ad49e094] {\n    border-style: solid;\n}\n.md\\:border-dashed[data-v-ad49e094] {\n    border-style: dashed;\n}\n.md\\:border-dotted[data-v-ad49e094] {\n    border-style: dotted;\n}\n.md\\:border-none[data-v-ad49e094] {\n    border-style: none;\n}\n.md\\:border-0[data-v-ad49e094] {\n    border-width: 0;\n}\n.md\\:border-2[data-v-ad49e094] {\n    border-width: 2px;\n}\n.md\\:border-4[data-v-ad49e094] {\n    border-width: 4px;\n}\n.md\\:border-8[data-v-ad49e094] {\n    border-width: 8px;\n}\n.md\\:border[data-v-ad49e094] {\n    border-width: 1px;\n}\n.md\\:border-t-0[data-v-ad49e094] {\n    border-top-width: 0;\n}\n.md\\:border-r-0[data-v-ad49e094] {\n    border-right-width: 0;\n}\n.md\\:border-b-0[data-v-ad49e094] {\n    border-bottom-width: 0;\n}\n.md\\:border-l-0[data-v-ad49e094] {\n    border-left-width: 0;\n}\n.md\\:border-t-2[data-v-ad49e094] {\n    border-top-width: 2px;\n}\n.md\\:border-r-2[data-v-ad49e094] {\n    border-right-width: 2px;\n}\n.md\\:border-b-2[data-v-ad49e094] {\n    border-bottom-width: 2px;\n}\n.md\\:border-l-2[data-v-ad49e094] {\n    border-left-width: 2px;\n}\n.md\\:border-t-4[data-v-ad49e094] {\n    border-top-width: 4px;\n}\n.md\\:border-r-4[data-v-ad49e094] {\n    border-right-width: 4px;\n}\n.md\\:border-b-4[data-v-ad49e094] {\n    border-bottom-width: 4px;\n}\n.md\\:border-l-4[data-v-ad49e094] {\n    border-left-width: 4px;\n}\n.md\\:border-t-8[data-v-ad49e094] {\n    border-top-width: 8px;\n}\n.md\\:border-r-8[data-v-ad49e094] {\n    border-right-width: 8px;\n}\n.md\\:border-b-8[data-v-ad49e094] {\n    border-bottom-width: 8px;\n}\n.md\\:border-l-8[data-v-ad49e094] {\n    border-left-width: 8px;\n}\n.md\\:border-t[data-v-ad49e094] {\n    border-top-width: 1px;\n}\n.md\\:border-r[data-v-ad49e094] {\n    border-right-width: 1px;\n}\n.md\\:border-b[data-v-ad49e094] {\n    border-bottom-width: 1px;\n}\n.md\\:border-l[data-v-ad49e094] {\n    border-left-width: 1px;\n}\n.md\\:cursor-auto[data-v-ad49e094] {\n    cursor: auto;\n}\n.md\\:cursor-default[data-v-ad49e094] {\n    cursor: default;\n}\n.md\\:cursor-pointer[data-v-ad49e094] {\n    cursor: pointer;\n}\n.md\\:cursor-wait[data-v-ad49e094] {\n    cursor: wait;\n}\n.md\\:cursor-move[data-v-ad49e094] {\n    cursor: move;\n}\n.md\\:cursor-not-allowed[data-v-ad49e094] {\n    cursor: not-allowed;\n}\n.md\\:block[data-v-ad49e094] {\n    display: block;\n}\n.md\\:inline-block[data-v-ad49e094] {\n    display: inline-block;\n}\n.md\\:inline[data-v-ad49e094] {\n    display: inline;\n}\n.md\\:table[data-v-ad49e094] {\n    display: table;\n}\n.md\\:table-row[data-v-ad49e094] {\n    display: table-row;\n}\n.md\\:table-cell[data-v-ad49e094] {\n    display: table-cell;\n}\n.md\\:hidden[data-v-ad49e094] {\n    display: none;\n}\n.md\\:flex[data-v-ad49e094] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.md\\:inline-flex[data-v-ad49e094] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.md\\:flex-row[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n.md\\:flex-row-reverse[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n}\n.md\\:flex-col[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.md\\:flex-col-reverse[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n}\n.md\\:flex-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.md\\:flex-wrap-reverse[data-v-ad49e094] {\n    -ms-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n}\n.md\\:flex-no-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n.md\\:items-start[data-v-ad49e094] {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.md\\:items-end[data-v-ad49e094] {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.md\\:items-center[data-v-ad49e094] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.md\\:items-baseline[data-v-ad49e094] {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.md\\:items-stretch[data-v-ad49e094] {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n}\n.md\\:self-auto[data-v-ad49e094] {\n    -ms-flex-item-align: auto;\n        align-self: auto;\n}\n.md\\:self-start[data-v-ad49e094] {\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n}\n.md\\:self-end[data-v-ad49e094] {\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n.md\\:self-center[data-v-ad49e094] {\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n.md\\:self-stretch[data-v-ad49e094] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n}\n.md\\:justify-start[data-v-ad49e094] {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.md\\:justify-end[data-v-ad49e094] {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.md\\:justify-center[data-v-ad49e094] {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.md\\:justify-between[data-v-ad49e094] {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.md\\:justify-around[data-v-ad49e094] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.md\\:content-center[data-v-ad49e094] {\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n.md\\:content-start[data-v-ad49e094] {\n    -ms-flex-line-pack: start;\n        align-content: flex-start;\n}\n.md\\:content-end[data-v-ad49e094] {\n    -ms-flex-line-pack: end;\n        align-content: flex-end;\n}\n.md\\:content-between[data-v-ad49e094] {\n    -ms-flex-line-pack: justify;\n        align-content: space-between;\n}\n.md\\:content-around[data-v-ad49e094] {\n    -ms-flex-line-pack: distribute;\n        align-content: space-around;\n}\n.md\\:flex-1[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.md\\:flex-auto[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: auto;\n            flex: auto;\n}\n.md\\:flex-initial[data-v-ad49e094] {\n    -webkit-box-flex: initial;\n        -ms-flex: initial;\n            flex: initial;\n}\n.md\\:flex-none[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n}\n.md\\:flex-grow[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.md\\:flex-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n}\n.md\\:flex-no-grow[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n.md\\:flex-no-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.md\\:float-right[data-v-ad49e094] {\n    float: right;\n}\n.md\\:float-left[data-v-ad49e094] {\n    float: left;\n}\n.md\\:float-none[data-v-ad49e094] {\n    float: none;\n}\n.md\\:clearfix[data-v-ad49e094]:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n.md\\:font-sans[data-v-ad49e094] {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n.md\\:font-serif[data-v-ad49e094] {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n.md\\:font-mono[data-v-ad49e094] {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n.md\\:font-hairline[data-v-ad49e094] {\n    font-weight: 100;\n}\n.md\\:font-thin[data-v-ad49e094] {\n    font-weight: 200;\n}\n.md\\:font-light[data-v-ad49e094] {\n    font-weight: 300;\n}\n.md\\:font-normal[data-v-ad49e094] {\n    font-weight: 400;\n}\n.md\\:font-medium[data-v-ad49e094] {\n    font-weight: 500;\n}\n.md\\:font-semibold[data-v-ad49e094] {\n    font-weight: 600;\n}\n.md\\:font-bold[data-v-ad49e094] {\n    font-weight: 700;\n}\n.md\\:font-extrabold[data-v-ad49e094] {\n    font-weight: 800;\n}\n.md\\:font-black[data-v-ad49e094] {\n    font-weight: 900;\n}\n.md\\:hover\\:font-hairline[data-v-ad49e094]:hover {\n    font-weight: 100;\n}\n.md\\:hover\\:font-thin[data-v-ad49e094]:hover {\n    font-weight: 200;\n}\n.md\\:hover\\:font-light[data-v-ad49e094]:hover {\n    font-weight: 300;\n}\n.md\\:hover\\:font-normal[data-v-ad49e094]:hover {\n    font-weight: 400;\n}\n.md\\:hover\\:font-medium[data-v-ad49e094]:hover {\n    font-weight: 500;\n}\n.md\\:hover\\:font-semibold[data-v-ad49e094]:hover {\n    font-weight: 600;\n}\n.md\\:hover\\:font-bold[data-v-ad49e094]:hover {\n    font-weight: 700;\n}\n.md\\:hover\\:font-extrabold[data-v-ad49e094]:hover {\n    font-weight: 800;\n}\n.md\\:hover\\:font-black[data-v-ad49e094]:hover {\n    font-weight: 900;\n}\n.md\\:focus\\:font-hairline[data-v-ad49e094]:focus {\n    font-weight: 100;\n}\n.md\\:focus\\:font-thin[data-v-ad49e094]:focus {\n    font-weight: 200;\n}\n.md\\:focus\\:font-light[data-v-ad49e094]:focus {\n    font-weight: 300;\n}\n.md\\:focus\\:font-normal[data-v-ad49e094]:focus {\n    font-weight: 400;\n}\n.md\\:focus\\:font-medium[data-v-ad49e094]:focus {\n    font-weight: 500;\n}\n.md\\:focus\\:font-semibold[data-v-ad49e094]:focus {\n    font-weight: 600;\n}\n.md\\:focus\\:font-bold[data-v-ad49e094]:focus {\n    font-weight: 700;\n}\n.md\\:focus\\:font-extrabold[data-v-ad49e094]:focus {\n    font-weight: 800;\n}\n.md\\:focus\\:font-black[data-v-ad49e094]:focus {\n    font-weight: 900;\n}\n.md\\:h-1[data-v-ad49e094] {\n    height: .25rem;\n}\n.md\\:h-2[data-v-ad49e094] {\n    height: .5rem;\n}\n.md\\:h-3[data-v-ad49e094] {\n    height: .75rem;\n}\n.md\\:h-4[data-v-ad49e094] {\n    height: 1rem;\n}\n.md\\:h-5[data-v-ad49e094] {\n    height: 1.25rem;\n}\n.md\\:h-6[data-v-ad49e094] {\n    height: 1.5rem;\n}\n.md\\:h-8[data-v-ad49e094] {\n    height: 2rem;\n}\n.md\\:h-10[data-v-ad49e094] {\n    height: 2.5rem;\n}\n.md\\:h-12[data-v-ad49e094] {\n    height: 3rem;\n}\n.md\\:h-16[data-v-ad49e094] {\n    height: 4rem;\n}\n.md\\:h-24[data-v-ad49e094] {\n    height: 6rem;\n}\n.md\\:h-32[data-v-ad49e094] {\n    height: 8rem;\n}\n.md\\:h-48[data-v-ad49e094] {\n    height: 12rem;\n}\n.md\\:h-64[data-v-ad49e094] {\n    height: 16rem;\n}\n.md\\:h-auto[data-v-ad49e094] {\n    height: auto;\n}\n.md\\:h-px[data-v-ad49e094] {\n    height: 1px;\n}\n.md\\:h-full[data-v-ad49e094] {\n    height: 100%;\n}\n.md\\:h-screen[data-v-ad49e094] {\n    height: 100vh;\n}\n.md\\:leading-none[data-v-ad49e094] {\n    line-height: 1;\n}\n.md\\:leading-tight[data-v-ad49e094] {\n    line-height: 1.25;\n}\n.md\\:leading-normal[data-v-ad49e094] {\n    line-height: 1.5;\n}\n.md\\:leading-loose[data-v-ad49e094] {\n    line-height: 2;\n}\n.md\\:m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.md\\:m-1[data-v-ad49e094] {\n    margin: .25rem;\n}\n.md\\:m-2[data-v-ad49e094] {\n    margin: .5rem;\n}\n.md\\:m-3[data-v-ad49e094] {\n    margin: .75rem;\n}\n.md\\:m-4[data-v-ad49e094] {\n    margin: 1rem;\n}\n.md\\:m-5[data-v-ad49e094] {\n    margin: 1.25rem;\n}\n.md\\:m-6[data-v-ad49e094] {\n    margin: 1.5rem;\n}\n.md\\:m-8[data-v-ad49e094] {\n    margin: 2rem;\n}\n.md\\:m-10[data-v-ad49e094] {\n    margin: 2.5rem;\n}\n.md\\:m-12[data-v-ad49e094] {\n    margin: 3rem;\n}\n.md\\:m-16[data-v-ad49e094] {\n    margin: 4rem;\n}\n.md\\:m-20[data-v-ad49e094] {\n    margin: 5rem;\n}\n.md\\:m-24[data-v-ad49e094] {\n    margin: 6rem;\n}\n.md\\:m-32[data-v-ad49e094] {\n    margin: 8rem;\n}\n.md\\:m-auto[data-v-ad49e094] {\n    margin: auto;\n}\n.md\\:m-px[data-v-ad49e094] {\n    margin: 1px;\n}\n.md\\:my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.md\\:mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.md\\:my-1[data-v-ad49e094] {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n}\n.md\\:mx-1[data-v-ad49e094] {\n    margin-left: .25rem;\n    margin-right: .25rem;\n}\n.md\\:my-2[data-v-ad49e094] {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n}\n.md\\:mx-2[data-v-ad49e094] {\n    margin-left: .5rem;\n    margin-right: .5rem;\n}\n.md\\:my-3[data-v-ad49e094] {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n}\n.md\\:mx-3[data-v-ad49e094] {\n    margin-left: .75rem;\n    margin-right: .75rem;\n}\n.md\\:my-4[data-v-ad49e094] {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n}\n.md\\:mx-4[data-v-ad49e094] {\n    margin-left: 1rem;\n    margin-right: 1rem;\n}\n.md\\:my-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n.md\\:mx-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n    margin-right: 1.25rem;\n}\n.md\\:my-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n}\n.md\\:mx-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n}\n.md\\:my-8[data-v-ad49e094] {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n}\n.md\\:mx-8[data-v-ad49e094] {\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n.md\\:my-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n    margin-bottom: 2.5rem;\n}\n.md\\:mx-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n    margin-right: 2.5rem;\n}\n.md\\:my-12[data-v-ad49e094] {\n    margin-top: 3rem;\n    margin-bottom: 3rem;\n}\n.md\\:mx-12[data-v-ad49e094] {\n    margin-left: 3rem;\n    margin-right: 3rem;\n}\n.md\\:my-16[data-v-ad49e094] {\n    margin-top: 4rem;\n    margin-bottom: 4rem;\n}\n.md\\:mx-16[data-v-ad49e094] {\n    margin-left: 4rem;\n    margin-right: 4rem;\n}\n.md\\:my-20[data-v-ad49e094] {\n    margin-top: 5rem;\n    margin-bottom: 5rem;\n}\n.md\\:mx-20[data-v-ad49e094] {\n    margin-left: 5rem;\n    margin-right: 5rem;\n}\n.md\\:my-24[data-v-ad49e094] {\n    margin-top: 6rem;\n    margin-bottom: 6rem;\n}\n.md\\:mx-24[data-v-ad49e094] {\n    margin-left: 6rem;\n    margin-right: 6rem;\n}\n.md\\:my-32[data-v-ad49e094] {\n    margin-top: 8rem;\n    margin-bottom: 8rem;\n}\n.md\\:mx-32[data-v-ad49e094] {\n    margin-left: 8rem;\n    margin-right: 8rem;\n}\n.md\\:my-auto[data-v-ad49e094] {\n    margin-top: auto;\n    margin-bottom: auto;\n}\n.md\\:mx-auto[data-v-ad49e094] {\n    margin-left: auto;\n    margin-right: auto;\n}\n.md\\:my-px[data-v-ad49e094] {\n    margin-top: 1px;\n    margin-bottom: 1px;\n}\n.md\\:mx-px[data-v-ad49e094] {\n    margin-left: 1px;\n    margin-right: 1px;\n}\n.md\\:mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.md\\:mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.md\\:mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.md\\:ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.md\\:mt-1[data-v-ad49e094] {\n    margin-top: .25rem;\n}\n.md\\:mr-1[data-v-ad49e094] {\n    margin-right: .25rem;\n}\n.md\\:mb-1[data-v-ad49e094] {\n    margin-bottom: .25rem;\n}\n.md\\:ml-1[data-v-ad49e094] {\n    margin-left: .25rem;\n}\n.md\\:mt-2[data-v-ad49e094] {\n    margin-top: .5rem;\n}\n.md\\:mr-2[data-v-ad49e094] {\n    margin-right: .5rem;\n}\n.md\\:mb-2[data-v-ad49e094] {\n    margin-bottom: .5rem;\n}\n.md\\:ml-2[data-v-ad49e094] {\n    margin-left: .5rem;\n}\n.md\\:mt-3[data-v-ad49e094] {\n    margin-top: .75rem;\n}\n.md\\:mr-3[data-v-ad49e094] {\n    margin-right: .75rem;\n}\n.md\\:mb-3[data-v-ad49e094] {\n    margin-bottom: .75rem;\n}\n.md\\:ml-3[data-v-ad49e094] {\n    margin-left: .75rem;\n}\n.md\\:mt-4[data-v-ad49e094] {\n    margin-top: 1rem;\n}\n.md\\:mr-4[data-v-ad49e094] {\n    margin-right: 1rem;\n}\n.md\\:mb-4[data-v-ad49e094] {\n    margin-bottom: 1rem;\n}\n.md\\:ml-4[data-v-ad49e094] {\n    margin-left: 1rem;\n}\n.md\\:mt-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n}\n.md\\:mr-5[data-v-ad49e094] {\n    margin-right: 1.25rem;\n}\n.md\\:mb-5[data-v-ad49e094] {\n    margin-bottom: 1.25rem;\n}\n.md\\:ml-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n}\n.md\\:mt-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n}\n.md\\:mr-6[data-v-ad49e094] {\n    margin-right: 1.5rem;\n}\n.md\\:mb-6[data-v-ad49e094] {\n    margin-bottom: 1.5rem;\n}\n.md\\:ml-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n}\n.md\\:mt-8[data-v-ad49e094] {\n    margin-top: 2rem;\n}\n.md\\:mr-8[data-v-ad49e094] {\n    margin-right: 2rem;\n}\n.md\\:mb-8[data-v-ad49e094] {\n    margin-bottom: 2rem;\n}\n.md\\:ml-8[data-v-ad49e094] {\n    margin-left: 2rem;\n}\n.md\\:mt-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n}\n.md\\:mr-10[data-v-ad49e094] {\n    margin-right: 2.5rem;\n}\n.md\\:mb-10[data-v-ad49e094] {\n    margin-bottom: 2.5rem;\n}\n.md\\:ml-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n}\n.md\\:mt-12[data-v-ad49e094] {\n    margin-top: 3rem;\n}\n.md\\:mr-12[data-v-ad49e094] {\n    margin-right: 3rem;\n}\n.md\\:mb-12[data-v-ad49e094] {\n    margin-bottom: 3rem;\n}\n.md\\:ml-12[data-v-ad49e094] {\n    margin-left: 3rem;\n}\n.md\\:mt-16[data-v-ad49e094] {\n    margin-top: 4rem;\n}\n.md\\:mr-16[data-v-ad49e094] {\n    margin-right: 4rem;\n}\n.md\\:mb-16[data-v-ad49e094] {\n    margin-bottom: 4rem;\n}\n.md\\:ml-16[data-v-ad49e094] {\n    margin-left: 4rem;\n}\n.md\\:mt-20[data-v-ad49e094] {\n    margin-top: 5rem;\n}\n.md\\:mr-20[data-v-ad49e094] {\n    margin-right: 5rem;\n}\n.md\\:mb-20[data-v-ad49e094] {\n    margin-bottom: 5rem;\n}\n.md\\:ml-20[data-v-ad49e094] {\n    margin-left: 5rem;\n}\n.md\\:mt-24[data-v-ad49e094] {\n    margin-top: 6rem;\n}\n.md\\:mr-24[data-v-ad49e094] {\n    margin-right: 6rem;\n}\n.md\\:mb-24[data-v-ad49e094] {\n    margin-bottom: 6rem;\n}\n.md\\:ml-24[data-v-ad49e094] {\n    margin-left: 6rem;\n}\n.md\\:mt-32[data-v-ad49e094] {\n    margin-top: 8rem;\n}\n.md\\:mr-32[data-v-ad49e094] {\n    margin-right: 8rem;\n}\n.md\\:mb-32[data-v-ad49e094] {\n    margin-bottom: 8rem;\n}\n.md\\:ml-32[data-v-ad49e094] {\n    margin-left: 8rem;\n}\n.md\\:mt-auto[data-v-ad49e094] {\n    margin-top: auto;\n}\n.md\\:mr-auto[data-v-ad49e094] {\n    margin-right: auto;\n}\n.md\\:mb-auto[data-v-ad49e094] {\n    margin-bottom: auto;\n}\n.md\\:ml-auto[data-v-ad49e094] {\n    margin-left: auto;\n}\n.md\\:mt-px[data-v-ad49e094] {\n    margin-top: 1px;\n}\n.md\\:mr-px[data-v-ad49e094] {\n    margin-right: 1px;\n}\n.md\\:mb-px[data-v-ad49e094] {\n    margin-bottom: 1px;\n}\n.md\\:ml-px[data-v-ad49e094] {\n    margin-left: 1px;\n}\n.md\\:max-h-full[data-v-ad49e094] {\n    max-height: 100%;\n}\n.md\\:max-h-screen[data-v-ad49e094] {\n    max-height: 100vh;\n}\n.md\\:max-w-xs[data-v-ad49e094] {\n    max-width: 20rem;\n}\n.md\\:max-w-sm[data-v-ad49e094] {\n    max-width: 30rem;\n}\n.md\\:max-w-md[data-v-ad49e094] {\n    max-width: 40rem;\n}\n.md\\:max-w-lg[data-v-ad49e094] {\n    max-width: 50rem;\n}\n.md\\:max-w-xl[data-v-ad49e094] {\n    max-width: 60rem;\n}\n.md\\:max-w-2xl[data-v-ad49e094] {\n    max-width: 70rem;\n}\n.md\\:max-w-3xl[data-v-ad49e094] {\n    max-width: 80rem;\n}\n.md\\:max-w-4xl[data-v-ad49e094] {\n    max-width: 90rem;\n}\n.md\\:max-w-5xl[data-v-ad49e094] {\n    max-width: 100rem;\n}\n.md\\:max-w-full[data-v-ad49e094] {\n    max-width: 100%;\n}\n.md\\:min-h-0[data-v-ad49e094] {\n    min-height: 0;\n}\n.md\\:min-h-full[data-v-ad49e094] {\n    min-height: 100%;\n}\n.md\\:min-h-screen[data-v-ad49e094] {\n    min-height: 100vh;\n}\n.md\\:min-w-0[data-v-ad49e094] {\n    min-width: 0;\n}\n.md\\:min-w-full[data-v-ad49e094] {\n    min-width: 100%;\n}\n.md\\:-m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.md\\:-m-1[data-v-ad49e094] {\n    margin: -0.25rem;\n}\n.md\\:-m-2[data-v-ad49e094] {\n    margin: -0.5rem;\n}\n.md\\:-m-3[data-v-ad49e094] {\n    margin: -0.75rem;\n}\n.md\\:-m-4[data-v-ad49e094] {\n    margin: -1rem;\n}\n.md\\:-m-5[data-v-ad49e094] {\n    margin: -1.25rem;\n}\n.md\\:-m-6[data-v-ad49e094] {\n    margin: -1.5rem;\n}\n.md\\:-m-8[data-v-ad49e094] {\n    margin: -2rem;\n}\n.md\\:-m-10[data-v-ad49e094] {\n    margin: -2.5rem;\n}\n.md\\:-m-12[data-v-ad49e094] {\n    margin: -3rem;\n}\n.md\\:-m-16[data-v-ad49e094] {\n    margin: -4rem;\n}\n.md\\:-m-20[data-v-ad49e094] {\n    margin: -5rem;\n}\n.md\\:-m-24[data-v-ad49e094] {\n    margin: -6rem;\n}\n.md\\:-m-32[data-v-ad49e094] {\n    margin: -8rem;\n}\n.md\\:-m-px[data-v-ad49e094] {\n    margin: -1px;\n}\n.md\\:-my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.md\\:-mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.md\\:-my-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n}\n.md\\:-mx-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n}\n.md\\:-my-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n}\n.md\\:-mx-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n}\n.md\\:-my-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n}\n.md\\:-mx-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n}\n.md\\:-my-4[data-v-ad49e094] {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n}\n.md\\:-mx-4[data-v-ad49e094] {\n    margin-left: -1rem;\n    margin-right: -1rem;\n}\n.md\\:-my-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n    margin-bottom: -1.25rem;\n}\n.md\\:-mx-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n    margin-right: -1.25rem;\n}\n.md\\:-my-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n}\n.md\\:-mx-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n}\n.md\\:-my-8[data-v-ad49e094] {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n}\n.md\\:-mx-8[data-v-ad49e094] {\n    margin-left: -2rem;\n    margin-right: -2rem;\n}\n.md\\:-my-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n    margin-bottom: -2.5rem;\n}\n.md\\:-mx-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n    margin-right: -2.5rem;\n}\n.md\\:-my-12[data-v-ad49e094] {\n    margin-top: -3rem;\n    margin-bottom: -3rem;\n}\n.md\\:-mx-12[data-v-ad49e094] {\n    margin-left: -3rem;\n    margin-right: -3rem;\n}\n.md\\:-my-16[data-v-ad49e094] {\n    margin-top: -4rem;\n    margin-bottom: -4rem;\n}\n.md\\:-mx-16[data-v-ad49e094] {\n    margin-left: -4rem;\n    margin-right: -4rem;\n}\n.md\\:-my-20[data-v-ad49e094] {\n    margin-top: -5rem;\n    margin-bottom: -5rem;\n}\n.md\\:-mx-20[data-v-ad49e094] {\n    margin-left: -5rem;\n    margin-right: -5rem;\n}\n.md\\:-my-24[data-v-ad49e094] {\n    margin-top: -6rem;\n    margin-bottom: -6rem;\n}\n.md\\:-mx-24[data-v-ad49e094] {\n    margin-left: -6rem;\n    margin-right: -6rem;\n}\n.md\\:-my-32[data-v-ad49e094] {\n    margin-top: -8rem;\n    margin-bottom: -8rem;\n}\n.md\\:-mx-32[data-v-ad49e094] {\n    margin-left: -8rem;\n    margin-right: -8rem;\n}\n.md\\:-my-px[data-v-ad49e094] {\n    margin-top: -1px;\n    margin-bottom: -1px;\n}\n.md\\:-mx-px[data-v-ad49e094] {\n    margin-left: -1px;\n    margin-right: -1px;\n}\n.md\\:-mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.md\\:-mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.md\\:-mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.md\\:-ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.md\\:-mt-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n}\n.md\\:-mr-1[data-v-ad49e094] {\n    margin-right: -0.25rem;\n}\n.md\\:-mb-1[data-v-ad49e094] {\n    margin-bottom: -0.25rem;\n}\n.md\\:-ml-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n}\n.md\\:-mt-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n}\n.md\\:-mr-2[data-v-ad49e094] {\n    margin-right: -0.5rem;\n}\n.md\\:-mb-2[data-v-ad49e094] {\n    margin-bottom: -0.5rem;\n}\n.md\\:-ml-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n}\n.md\\:-mt-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n}\n.md\\:-mr-3[data-v-ad49e094] {\n    margin-right: -0.75rem;\n}\n.md\\:-mb-3[data-v-ad49e094] {\n    margin-bottom: -0.75rem;\n}\n.md\\:-ml-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n}\n.md\\:-mt-4[data-v-ad49e094] {\n    margin-top: -1rem;\n}\n.md\\:-mr-4[data-v-ad49e094] {\n    margin-right: -1rem;\n}\n.md\\:-mb-4[data-v-ad49e094] {\n    margin-bottom: -1rem;\n}\n.md\\:-ml-4[data-v-ad49e094] {\n    margin-left: -1rem;\n}\n.md\\:-mt-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n}\n.md\\:-mr-5[data-v-ad49e094] {\n    margin-right: -1.25rem;\n}\n.md\\:-mb-5[data-v-ad49e094] {\n    margin-bottom: -1.25rem;\n}\n.md\\:-ml-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n}\n.md\\:-mt-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n}\n.md\\:-mr-6[data-v-ad49e094] {\n    margin-right: -1.5rem;\n}\n.md\\:-mb-6[data-v-ad49e094] {\n    margin-bottom: -1.5rem;\n}\n.md\\:-ml-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n}\n.md\\:-mt-8[data-v-ad49e094] {\n    margin-top: -2rem;\n}\n.md\\:-mr-8[data-v-ad49e094] {\n    margin-right: -2rem;\n}\n.md\\:-mb-8[data-v-ad49e094] {\n    margin-bottom: -2rem;\n}\n.md\\:-ml-8[data-v-ad49e094] {\n    margin-left: -2rem;\n}\n.md\\:-mt-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n}\n.md\\:-mr-10[data-v-ad49e094] {\n    margin-right: -2.5rem;\n}\n.md\\:-mb-10[data-v-ad49e094] {\n    margin-bottom: -2.5rem;\n}\n.md\\:-ml-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n}\n.md\\:-mt-12[data-v-ad49e094] {\n    margin-top: -3rem;\n}\n.md\\:-mr-12[data-v-ad49e094] {\n    margin-right: -3rem;\n}\n.md\\:-mb-12[data-v-ad49e094] {\n    margin-bottom: -3rem;\n}\n.md\\:-ml-12[data-v-ad49e094] {\n    margin-left: -3rem;\n}\n.md\\:-mt-16[data-v-ad49e094] {\n    margin-top: -4rem;\n}\n.md\\:-mr-16[data-v-ad49e094] {\n    margin-right: -4rem;\n}\n.md\\:-mb-16[data-v-ad49e094] {\n    margin-bottom: -4rem;\n}\n.md\\:-ml-16[data-v-ad49e094] {\n    margin-left: -4rem;\n}\n.md\\:-mt-20[data-v-ad49e094] {\n    margin-top: -5rem;\n}\n.md\\:-mr-20[data-v-ad49e094] {\n    margin-right: -5rem;\n}\n.md\\:-mb-20[data-v-ad49e094] {\n    margin-bottom: -5rem;\n}\n.md\\:-ml-20[data-v-ad49e094] {\n    margin-left: -5rem;\n}\n.md\\:-mt-24[data-v-ad49e094] {\n    margin-top: -6rem;\n}\n.md\\:-mr-24[data-v-ad49e094] {\n    margin-right: -6rem;\n}\n.md\\:-mb-24[data-v-ad49e094] {\n    margin-bottom: -6rem;\n}\n.md\\:-ml-24[data-v-ad49e094] {\n    margin-left: -6rem;\n}\n.md\\:-mt-32[data-v-ad49e094] {\n    margin-top: -8rem;\n}\n.md\\:-mr-32[data-v-ad49e094] {\n    margin-right: -8rem;\n}\n.md\\:-mb-32[data-v-ad49e094] {\n    margin-bottom: -8rem;\n}\n.md\\:-ml-32[data-v-ad49e094] {\n    margin-left: -8rem;\n}\n.md\\:-mt-px[data-v-ad49e094] {\n    margin-top: -1px;\n}\n.md\\:-mr-px[data-v-ad49e094] {\n    margin-right: -1px;\n}\n.md\\:-mb-px[data-v-ad49e094] {\n    margin-bottom: -1px;\n}\n.md\\:-ml-px[data-v-ad49e094] {\n    margin-left: -1px;\n}\n.md\\:opacity-0[data-v-ad49e094] {\n    opacity: 0;\n}\n.md\\:opacity-25[data-v-ad49e094] {\n    opacity: .25;\n}\n.md\\:opacity-50[data-v-ad49e094] {\n    opacity: .5;\n}\n.md\\:opacity-75[data-v-ad49e094] {\n    opacity: .75;\n}\n.md\\:opacity-100[data-v-ad49e094] {\n    opacity: 1;\n}\n.md\\:overflow-auto[data-v-ad49e094] {\n    overflow: auto;\n}\n.md\\:overflow-hidden[data-v-ad49e094] {\n    overflow: hidden;\n}\n.md\\:overflow-visible[data-v-ad49e094] {\n    overflow: visible;\n}\n.md\\:overflow-scroll[data-v-ad49e094] {\n    overflow: scroll;\n}\n.md\\:overflow-x-auto[data-v-ad49e094] {\n    overflow-x: auto;\n}\n.md\\:overflow-y-auto[data-v-ad49e094] {\n    overflow-y: auto;\n}\n.md\\:overflow-x-hidden[data-v-ad49e094] {\n    overflow-x: hidden;\n}\n.md\\:overflow-y-hidden[data-v-ad49e094] {\n    overflow-y: hidden;\n}\n.md\\:overflow-x-visible[data-v-ad49e094] {\n    overflow-x: visible;\n}\n.md\\:overflow-y-visible[data-v-ad49e094] {\n    overflow-y: visible;\n}\n.md\\:overflow-x-scroll[data-v-ad49e094] {\n    overflow-x: scroll;\n}\n.md\\:overflow-y-scroll[data-v-ad49e094] {\n    overflow-y: scroll;\n}\n.md\\:scrolling-touch[data-v-ad49e094] {\n    -webkit-overflow-scrolling: touch;\n}\n.md\\:scrolling-auto[data-v-ad49e094] {\n    -webkit-overflow-scrolling: auto;\n}\n.md\\:p-0[data-v-ad49e094] {\n    padding: 0;\n}\n.md\\:p-1[data-v-ad49e094] {\n    padding: .25rem;\n}\n.md\\:p-2[data-v-ad49e094] {\n    padding: .5rem;\n}\n.md\\:p-3[data-v-ad49e094] {\n    padding: .75rem;\n}\n.md\\:p-4[data-v-ad49e094] {\n    padding: 1rem;\n}\n.md\\:p-5[data-v-ad49e094] {\n    padding: 1.25rem;\n}\n.md\\:p-6[data-v-ad49e094] {\n    padding: 1.5rem;\n}\n.md\\:p-8[data-v-ad49e094] {\n    padding: 2rem;\n}\n.md\\:p-10[data-v-ad49e094] {\n    padding: 2.5rem;\n}\n.md\\:p-12[data-v-ad49e094] {\n    padding: 3rem;\n}\n.md\\:p-16[data-v-ad49e094] {\n    padding: 4rem;\n}\n.md\\:p-20[data-v-ad49e094] {\n    padding: 5rem;\n}\n.md\\:p-24[data-v-ad49e094] {\n    padding: 6rem;\n}\n.md\\:p-32[data-v-ad49e094] {\n    padding: 8rem;\n}\n.md\\:p-px[data-v-ad49e094] {\n    padding: 1px;\n}\n.md\\:py-0[data-v-ad49e094] {\n    padding-top: 0;\n    padding-bottom: 0;\n}\n.md\\:px-0[data-v-ad49e094] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.md\\:py-1[data-v-ad49e094] {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n}\n.md\\:px-1[data-v-ad49e094] {\n    padding-left: .25rem;\n    padding-right: .25rem;\n}\n.md\\:py-2[data-v-ad49e094] {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n}\n.md\\:px-2[data-v-ad49e094] {\n    padding-left: .5rem;\n    padding-right: .5rem;\n}\n.md\\:py-3[data-v-ad49e094] {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n}\n.md\\:px-3[data-v-ad49e094] {\n    padding-left: .75rem;\n    padding-right: .75rem;\n}\n.md\\:py-4[data-v-ad49e094] {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n}\n.md\\:px-4[data-v-ad49e094] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n}\n.md\\:py-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n    padding-bottom: 1.25rem;\n}\n.md\\:px-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n}\n.md\\:py-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n}\n.md\\:px-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n}\n.md\\:py-8[data-v-ad49e094] {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n}\n.md\\:px-8[data-v-ad49e094] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n.md\\:py-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n    padding-bottom: 2.5rem;\n}\n.md\\:px-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n    padding-right: 2.5rem;\n}\n.md\\:py-12[data-v-ad49e094] {\n    padding-top: 3rem;\n    padding-bottom: 3rem;\n}\n.md\\:px-12[data-v-ad49e094] {\n    padding-left: 3rem;\n    padding-right: 3rem;\n}\n.md\\:py-16[data-v-ad49e094] {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n}\n.md\\:px-16[data-v-ad49e094] {\n    padding-left: 4rem;\n    padding-right: 4rem;\n}\n.md\\:py-20[data-v-ad49e094] {\n    padding-top: 5rem;\n    padding-bottom: 5rem;\n}\n.md\\:px-20[data-v-ad49e094] {\n    padding-left: 5rem;\n    padding-right: 5rem;\n}\n.md\\:py-24[data-v-ad49e094] {\n    padding-top: 6rem;\n    padding-bottom: 6rem;\n}\n.md\\:px-24[data-v-ad49e094] {\n    padding-left: 6rem;\n    padding-right: 6rem;\n}\n.md\\:py-32[data-v-ad49e094] {\n    padding-top: 8rem;\n    padding-bottom: 8rem;\n}\n.md\\:px-32[data-v-ad49e094] {\n    padding-left: 8rem;\n    padding-right: 8rem;\n}\n.md\\:py-px[data-v-ad49e094] {\n    padding-top: 1px;\n    padding-bottom: 1px;\n}\n.md\\:px-px[data-v-ad49e094] {\n    padding-left: 1px;\n    padding-right: 1px;\n}\n.md\\:pt-0[data-v-ad49e094] {\n    padding-top: 0;\n}\n.md\\:pr-0[data-v-ad49e094] {\n    padding-right: 0;\n}\n.md\\:pb-0[data-v-ad49e094] {\n    padding-bottom: 0;\n}\n.md\\:pl-0[data-v-ad49e094] {\n    padding-left: 0;\n}\n.md\\:pt-1[data-v-ad49e094] {\n    padding-top: .25rem;\n}\n.md\\:pr-1[data-v-ad49e094] {\n    padding-right: .25rem;\n}\n.md\\:pb-1[data-v-ad49e094] {\n    padding-bottom: .25rem;\n}\n.md\\:pl-1[data-v-ad49e094] {\n    padding-left: .25rem;\n}\n.md\\:pt-2[data-v-ad49e094] {\n    padding-top: .5rem;\n}\n.md\\:pr-2[data-v-ad49e094] {\n    padding-right: .5rem;\n}\n.md\\:pb-2[data-v-ad49e094] {\n    padding-bottom: .5rem;\n}\n.md\\:pl-2[data-v-ad49e094] {\n    padding-left: .5rem;\n}\n.md\\:pt-3[data-v-ad49e094] {\n    padding-top: .75rem;\n}\n.md\\:pr-3[data-v-ad49e094] {\n    padding-right: .75rem;\n}\n.md\\:pb-3[data-v-ad49e094] {\n    padding-bottom: .75rem;\n}\n.md\\:pl-3[data-v-ad49e094] {\n    padding-left: .75rem;\n}\n.md\\:pt-4[data-v-ad49e094] {\n    padding-top: 1rem;\n}\n.md\\:pr-4[data-v-ad49e094] {\n    padding-right: 1rem;\n}\n.md\\:pb-4[data-v-ad49e094] {\n    padding-bottom: 1rem;\n}\n.md\\:pl-4[data-v-ad49e094] {\n    padding-left: 1rem;\n}\n.md\\:pt-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n}\n.md\\:pr-5[data-v-ad49e094] {\n    padding-right: 1.25rem;\n}\n.md\\:pb-5[data-v-ad49e094] {\n    padding-bottom: 1.25rem;\n}\n.md\\:pl-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n}\n.md\\:pt-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n}\n.md\\:pr-6[data-v-ad49e094] {\n    padding-right: 1.5rem;\n}\n.md\\:pb-6[data-v-ad49e094] {\n    padding-bottom: 1.5rem;\n}\n.md\\:pl-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n}\n.md\\:pt-8[data-v-ad49e094] {\n    padding-top: 2rem;\n}\n.md\\:pr-8[data-v-ad49e094] {\n    padding-right: 2rem;\n}\n.md\\:pb-8[data-v-ad49e094] {\n    padding-bottom: 2rem;\n}\n.md\\:pl-8[data-v-ad49e094] {\n    padding-left: 2rem;\n}\n.md\\:pt-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n}\n.md\\:pr-10[data-v-ad49e094] {\n    padding-right: 2.5rem;\n}\n.md\\:pb-10[data-v-ad49e094] {\n    padding-bottom: 2.5rem;\n}\n.md\\:pl-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n}\n.md\\:pt-12[data-v-ad49e094] {\n    padding-top: 3rem;\n}\n.md\\:pr-12[data-v-ad49e094] {\n    padding-right: 3rem;\n}\n.md\\:pb-12[data-v-ad49e094] {\n    padding-bottom: 3rem;\n}\n.md\\:pl-12[data-v-ad49e094] {\n    padding-left: 3rem;\n}\n.md\\:pt-16[data-v-ad49e094] {\n    padding-top: 4rem;\n}\n.md\\:pr-16[data-v-ad49e094] {\n    padding-right: 4rem;\n}\n.md\\:pb-16[data-v-ad49e094] {\n    padding-bottom: 4rem;\n}\n.md\\:pl-16[data-v-ad49e094] {\n    padding-left: 4rem;\n}\n.md\\:pt-20[data-v-ad49e094] {\n    padding-top: 5rem;\n}\n.md\\:pr-20[data-v-ad49e094] {\n    padding-right: 5rem;\n}\n.md\\:pb-20[data-v-ad49e094] {\n    padding-bottom: 5rem;\n}\n.md\\:pl-20[data-v-ad49e094] {\n    padding-left: 5rem;\n}\n.md\\:pt-24[data-v-ad49e094] {\n    padding-top: 6rem;\n}\n.md\\:pr-24[data-v-ad49e094] {\n    padding-right: 6rem;\n}\n.md\\:pb-24[data-v-ad49e094] {\n    padding-bottom: 6rem;\n}\n.md\\:pl-24[data-v-ad49e094] {\n    padding-left: 6rem;\n}\n.md\\:pt-32[data-v-ad49e094] {\n    padding-top: 8rem;\n}\n.md\\:pr-32[data-v-ad49e094] {\n    padding-right: 8rem;\n}\n.md\\:pb-32[data-v-ad49e094] {\n    padding-bottom: 8rem;\n}\n.md\\:pl-32[data-v-ad49e094] {\n    padding-left: 8rem;\n}\n.md\\:pt-px[data-v-ad49e094] {\n    padding-top: 1px;\n}\n.md\\:pr-px[data-v-ad49e094] {\n    padding-right: 1px;\n}\n.md\\:pb-px[data-v-ad49e094] {\n    padding-bottom: 1px;\n}\n.md\\:pl-px[data-v-ad49e094] {\n    padding-left: 1px;\n}\n.md\\:pointer-events-none[data-v-ad49e094] {\n    pointer-events: none;\n}\n.md\\:pointer-events-auto[data-v-ad49e094] {\n    pointer-events: auto;\n}\n.md\\:static[data-v-ad49e094] {\n    position: static;\n}\n.md\\:fixed[data-v-ad49e094] {\n    position: fixed;\n}\n.md\\:absolute[data-v-ad49e094] {\n    position: absolute;\n}\n.md\\:relative[data-v-ad49e094] {\n    position: relative;\n}\n.md\\:sticky[data-v-ad49e094] {\n    position: -webkit-sticky;\n    position: sticky;\n}\n.md\\:pin-none[data-v-ad49e094] {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n}\n.md\\:pin[data-v-ad49e094] {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.md\\:pin-y[data-v-ad49e094] {\n    top: 0;\n    bottom: 0;\n}\n.md\\:pin-x[data-v-ad49e094] {\n    right: 0;\n    left: 0;\n}\n.md\\:pin-t[data-v-ad49e094] {\n    top: 0;\n}\n.md\\:pin-r[data-v-ad49e094] {\n    right: 0;\n}\n.md\\:pin-b[data-v-ad49e094] {\n    bottom: 0;\n}\n.md\\:pin-l[data-v-ad49e094] {\n    left: 0;\n}\n.md\\:resize-none[data-v-ad49e094] {\n    resize: none;\n}\n.md\\:resize-y[data-v-ad49e094] {\n    resize: vertical;\n}\n.md\\:resize-x[data-v-ad49e094] {\n    resize: horizontal;\n}\n.md\\:resize[data-v-ad49e094] {\n    resize: both;\n}\n.md\\:shadow[data-v-ad49e094] {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.md\\:shadow-md[data-v-ad49e094] {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.md\\:shadow-lg[data-v-ad49e094] {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.md\\:shadow-inner[data-v-ad49e094] {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.md\\:shadow-outline[data-v-ad49e094] {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.md\\:shadow-none[data-v-ad49e094] {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.md\\:hover\\:shadow[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.md\\:hover\\:shadow-md[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.md\\:hover\\:shadow-lg[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.md\\:hover\\:shadow-inner[data-v-ad49e094]:hover {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.md\\:hover\\:shadow-outline[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.md\\:hover\\:shadow-none[data-v-ad49e094]:hover {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.md\\:focus\\:shadow[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.md\\:focus\\:shadow-md[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.md\\:focus\\:shadow-lg[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.md\\:focus\\:shadow-inner[data-v-ad49e094]:focus {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.md\\:focus\\:shadow-outline[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.md\\:focus\\:shadow-none[data-v-ad49e094]:focus {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.md\\:table-auto[data-v-ad49e094] {\n    table-layout: auto;\n}\n.md\\:table-fixed[data-v-ad49e094] {\n    table-layout: fixed;\n}\n.md\\:text-left[data-v-ad49e094] {\n    text-align: left;\n}\n.md\\:text-center[data-v-ad49e094] {\n    text-align: center;\n}\n.md\\:text-right[data-v-ad49e094] {\n    text-align: right;\n}\n.md\\:text-justify[data-v-ad49e094] {\n    text-align: justify;\n}\n.md\\:text-transparent[data-v-ad49e094] {\n    color: transparent;\n}\n.md\\:text-black[data-v-ad49e094] {\n    color: #22292f;\n}\n.md\\:text-grey-darkest[data-v-ad49e094] {\n    color: #3d4852;\n}\n.md\\:text-grey-darker[data-v-ad49e094] {\n    color: #606f7b;\n}\n.md\\:text-grey-dark[data-v-ad49e094] {\n    color: #8795a1;\n}\n.md\\:text-grey[data-v-ad49e094] {\n    color: #b8c2cc;\n}\n.md\\:text-grey-light[data-v-ad49e094] {\n    color: #dae1e7;\n}\n.md\\:text-grey-lighter[data-v-ad49e094] {\n    color: #f1f5f8;\n}\n.md\\:text-grey-lightest[data-v-ad49e094] {\n    color: #f8fafc;\n}\n.md\\:text-white[data-v-ad49e094] {\n    color: #fff;\n}\n.md\\:text-red-darkest[data-v-ad49e094] {\n    color: #3b0d0c;\n}\n.md\\:text-red-darker[data-v-ad49e094] {\n    color: #621b18;\n}\n.md\\:text-red-dark[data-v-ad49e094] {\n    color: #cc1f1a;\n}\n.md\\:text-red[data-v-ad49e094] {\n    color: #e3342f;\n}\n.md\\:text-red-light[data-v-ad49e094] {\n    color: #ef5753;\n}\n.md\\:text-red-lighter[data-v-ad49e094] {\n    color: #f9acaa;\n}\n.md\\:text-red-lightest[data-v-ad49e094] {\n    color: #fcebea;\n}\n.md\\:text-orange-darkest[data-v-ad49e094] {\n    color: #462a16;\n}\n.md\\:text-orange-darker[data-v-ad49e094] {\n    color: #613b1f;\n}\n.md\\:text-orange-dark[data-v-ad49e094] {\n    color: #de751f;\n}\n.md\\:text-orange[data-v-ad49e094] {\n    color: #f6993f;\n}\n.md\\:text-orange-light[data-v-ad49e094] {\n    color: #faad63;\n}\n.md\\:text-orange-lighter[data-v-ad49e094] {\n    color: #fcd9b6;\n}\n.md\\:text-orange-lightest[data-v-ad49e094] {\n    color: #fff5eb;\n}\n.md\\:text-yellow-darkest[data-v-ad49e094] {\n    color: #453411;\n}\n.md\\:text-yellow-darker[data-v-ad49e094] {\n    color: #684f1d;\n}\n.md\\:text-yellow-dark[data-v-ad49e094] {\n    color: #f2d024;\n}\n.md\\:text-yellow[data-v-ad49e094] {\n    color: #ffed4a;\n}\n.md\\:text-yellow-light[data-v-ad49e094] {\n    color: #fff382;\n}\n.md\\:text-yellow-lighter[data-v-ad49e094] {\n    color: #fff9c2;\n}\n.md\\:text-yellow-lightest[data-v-ad49e094] {\n    color: #fcfbeb;\n}\n.md\\:text-green-darkest[data-v-ad49e094] {\n    color: #0f2f21;\n}\n.md\\:text-green-darker[data-v-ad49e094] {\n    color: #1a4731;\n}\n.md\\:text-green-dark[data-v-ad49e094] {\n    color: #1f9d55;\n}\n.md\\:text-green[data-v-ad49e094] {\n    color: #38c172;\n}\n.md\\:text-green-light[data-v-ad49e094] {\n    color: #51d88a;\n}\n.md\\:text-green-lighter[data-v-ad49e094] {\n    color: #a2f5bf;\n}\n.md\\:text-green-lightest[data-v-ad49e094] {\n    color: #e3fcec;\n}\n.md\\:text-teal-darkest[data-v-ad49e094] {\n    color: #0d3331;\n}\n.md\\:text-teal-darker[data-v-ad49e094] {\n    color: #20504f;\n}\n.md\\:text-teal-dark[data-v-ad49e094] {\n    color: #38a89d;\n}\n.md\\:text-teal[data-v-ad49e094] {\n    color: #4dc0b5;\n}\n.md\\:text-teal-light[data-v-ad49e094] {\n    color: #64d5ca;\n}\n.md\\:text-teal-lighter[data-v-ad49e094] {\n    color: #a0f0ed;\n}\n.md\\:text-teal-lightest[data-v-ad49e094] {\n    color: #e8fffe;\n}\n.md\\:text-blue-darkest[data-v-ad49e094] {\n    color: #12283a;\n}\n.md\\:text-blue-darker[data-v-ad49e094] {\n    color: #1c3d5a;\n}\n.md\\:text-blue-dark[data-v-ad49e094] {\n    color: #2779bd;\n}\n.md\\:text-blue[data-v-ad49e094] {\n    color: #3490dc;\n}\n.md\\:text-blue-light[data-v-ad49e094] {\n    color: #6cb2eb;\n}\n.md\\:text-blue-lighter[data-v-ad49e094] {\n    color: #bcdefa;\n}\n.md\\:text-blue-lightest[data-v-ad49e094] {\n    color: #eff8ff;\n}\n.md\\:text-indigo-darkest[data-v-ad49e094] {\n    color: #191e38;\n}\n.md\\:text-indigo-darker[data-v-ad49e094] {\n    color: #2f365f;\n}\n.md\\:text-indigo-dark[data-v-ad49e094] {\n    color: #5661b3;\n}\n.md\\:text-indigo[data-v-ad49e094] {\n    color: #6574cd;\n}\n.md\\:text-indigo-light[data-v-ad49e094] {\n    color: #7886d7;\n}\n.md\\:text-indigo-lighter[data-v-ad49e094] {\n    color: #b2b7ff;\n}\n.md\\:text-indigo-lightest[data-v-ad49e094] {\n    color: #e6e8ff;\n}\n.md\\:text-purple-darkest[data-v-ad49e094] {\n    color: #21183c;\n}\n.md\\:text-purple-darker[data-v-ad49e094] {\n    color: #382b5f;\n}\n.md\\:text-purple-dark[data-v-ad49e094] {\n    color: #794acf;\n}\n.md\\:text-purple[data-v-ad49e094] {\n    color: #9561e2;\n}\n.md\\:text-purple-light[data-v-ad49e094] {\n    color: #a779e9;\n}\n.md\\:text-purple-lighter[data-v-ad49e094] {\n    color: #d6bbfc;\n}\n.md\\:text-purple-lightest[data-v-ad49e094] {\n    color: #f3ebff;\n}\n.md\\:text-pink-darkest[data-v-ad49e094] {\n    color: #451225;\n}\n.md\\:text-pink-darker[data-v-ad49e094] {\n    color: #6f213f;\n}\n.md\\:text-pink-dark[data-v-ad49e094] {\n    color: #eb5286;\n}\n.md\\:text-pink[data-v-ad49e094] {\n    color: #f66d9b;\n}\n.md\\:text-pink-light[data-v-ad49e094] {\n    color: #fa7ea8;\n}\n.md\\:text-pink-lighter[data-v-ad49e094] {\n    color: #ffbbca;\n}\n.md\\:text-pink-lightest[data-v-ad49e094] {\n    color: #ffebef;\n}\n.md\\:hover\\:text-transparent[data-v-ad49e094]:hover {\n    color: transparent;\n}\n.md\\:hover\\:text-black[data-v-ad49e094]:hover {\n    color: #22292f;\n}\n.md\\:hover\\:text-grey-darkest[data-v-ad49e094]:hover {\n    color: #3d4852;\n}\n.md\\:hover\\:text-grey-darker[data-v-ad49e094]:hover {\n    color: #606f7b;\n}\n.md\\:hover\\:text-grey-dark[data-v-ad49e094]:hover {\n    color: #8795a1;\n}\n.md\\:hover\\:text-grey[data-v-ad49e094]:hover {\n    color: #b8c2cc;\n}\n.md\\:hover\\:text-grey-light[data-v-ad49e094]:hover {\n    color: #dae1e7;\n}\n.md\\:hover\\:text-grey-lighter[data-v-ad49e094]:hover {\n    color: #f1f5f8;\n}\n.md\\:hover\\:text-grey-lightest[data-v-ad49e094]:hover {\n    color: #f8fafc;\n}\n.md\\:hover\\:text-white[data-v-ad49e094]:hover {\n    color: #fff;\n}\n.md\\:hover\\:text-red-darkest[data-v-ad49e094]:hover {\n    color: #3b0d0c;\n}\n.md\\:hover\\:text-red-darker[data-v-ad49e094]:hover {\n    color: #621b18;\n}\n.md\\:hover\\:text-red-dark[data-v-ad49e094]:hover {\n    color: #cc1f1a;\n}\n.md\\:hover\\:text-red[data-v-ad49e094]:hover {\n    color: #e3342f;\n}\n.md\\:hover\\:text-red-light[data-v-ad49e094]:hover {\n    color: #ef5753;\n}\n.md\\:hover\\:text-red-lighter[data-v-ad49e094]:hover {\n    color: #f9acaa;\n}\n.md\\:hover\\:text-red-lightest[data-v-ad49e094]:hover {\n    color: #fcebea;\n}\n.md\\:hover\\:text-orange-darkest[data-v-ad49e094]:hover {\n    color: #462a16;\n}\n.md\\:hover\\:text-orange-darker[data-v-ad49e094]:hover {\n    color: #613b1f;\n}\n.md\\:hover\\:text-orange-dark[data-v-ad49e094]:hover {\n    color: #de751f;\n}\n.md\\:hover\\:text-orange[data-v-ad49e094]:hover {\n    color: #f6993f;\n}\n.md\\:hover\\:text-orange-light[data-v-ad49e094]:hover {\n    color: #faad63;\n}\n.md\\:hover\\:text-orange-lighter[data-v-ad49e094]:hover {\n    color: #fcd9b6;\n}\n.md\\:hover\\:text-orange-lightest[data-v-ad49e094]:hover {\n    color: #fff5eb;\n}\n.md\\:hover\\:text-yellow-darkest[data-v-ad49e094]:hover {\n    color: #453411;\n}\n.md\\:hover\\:text-yellow-darker[data-v-ad49e094]:hover {\n    color: #684f1d;\n}\n.md\\:hover\\:text-yellow-dark[data-v-ad49e094]:hover {\n    color: #f2d024;\n}\n.md\\:hover\\:text-yellow[data-v-ad49e094]:hover {\n    color: #ffed4a;\n}\n.md\\:hover\\:text-yellow-light[data-v-ad49e094]:hover {\n    color: #fff382;\n}\n.md\\:hover\\:text-yellow-lighter[data-v-ad49e094]:hover {\n    color: #fff9c2;\n}\n.md\\:hover\\:text-yellow-lightest[data-v-ad49e094]:hover {\n    color: #fcfbeb;\n}\n.md\\:hover\\:text-green-darkest[data-v-ad49e094]:hover {\n    color: #0f2f21;\n}\n.md\\:hover\\:text-green-darker[data-v-ad49e094]:hover {\n    color: #1a4731;\n}\n.md\\:hover\\:text-green-dark[data-v-ad49e094]:hover {\n    color: #1f9d55;\n}\n.md\\:hover\\:text-green[data-v-ad49e094]:hover {\n    color: #38c172;\n}\n.md\\:hover\\:text-green-light[data-v-ad49e094]:hover {\n    color: #51d88a;\n}\n.md\\:hover\\:text-green-lighter[data-v-ad49e094]:hover {\n    color: #a2f5bf;\n}\n.md\\:hover\\:text-green-lightest[data-v-ad49e094]:hover {\n    color: #e3fcec;\n}\n.md\\:hover\\:text-teal-darkest[data-v-ad49e094]:hover {\n    color: #0d3331;\n}\n.md\\:hover\\:text-teal-darker[data-v-ad49e094]:hover {\n    color: #20504f;\n}\n.md\\:hover\\:text-teal-dark[data-v-ad49e094]:hover {\n    color: #38a89d;\n}\n.md\\:hover\\:text-teal[data-v-ad49e094]:hover {\n    color: #4dc0b5;\n}\n.md\\:hover\\:text-teal-light[data-v-ad49e094]:hover {\n    color: #64d5ca;\n}\n.md\\:hover\\:text-teal-lighter[data-v-ad49e094]:hover {\n    color: #a0f0ed;\n}\n.md\\:hover\\:text-teal-lightest[data-v-ad49e094]:hover {\n    color: #e8fffe;\n}\n.md\\:hover\\:text-blue-darkest[data-v-ad49e094]:hover {\n    color: #12283a;\n}\n.md\\:hover\\:text-blue-darker[data-v-ad49e094]:hover {\n    color: #1c3d5a;\n}\n.md\\:hover\\:text-blue-dark[data-v-ad49e094]:hover {\n    color: #2779bd;\n}\n.md\\:hover\\:text-blue[data-v-ad49e094]:hover {\n    color: #3490dc;\n}\n.md\\:hover\\:text-blue-light[data-v-ad49e094]:hover {\n    color: #6cb2eb;\n}\n.md\\:hover\\:text-blue-lighter[data-v-ad49e094]:hover {\n    color: #bcdefa;\n}\n.md\\:hover\\:text-blue-lightest[data-v-ad49e094]:hover {\n    color: #eff8ff;\n}\n.md\\:hover\\:text-indigo-darkest[data-v-ad49e094]:hover {\n    color: #191e38;\n}\n.md\\:hover\\:text-indigo-darker[data-v-ad49e094]:hover {\n    color: #2f365f;\n}\n.md\\:hover\\:text-indigo-dark[data-v-ad49e094]:hover {\n    color: #5661b3;\n}\n.md\\:hover\\:text-indigo[data-v-ad49e094]:hover {\n    color: #6574cd;\n}\n.md\\:hover\\:text-indigo-light[data-v-ad49e094]:hover {\n    color: #7886d7;\n}\n.md\\:hover\\:text-indigo-lighter[data-v-ad49e094]:hover {\n    color: #b2b7ff;\n}\n.md\\:hover\\:text-indigo-lightest[data-v-ad49e094]:hover {\n    color: #e6e8ff;\n}\n.md\\:hover\\:text-purple-darkest[data-v-ad49e094]:hover {\n    color: #21183c;\n}\n.md\\:hover\\:text-purple-darker[data-v-ad49e094]:hover {\n    color: #382b5f;\n}\n.md\\:hover\\:text-purple-dark[data-v-ad49e094]:hover {\n    color: #794acf;\n}\n.md\\:hover\\:text-purple[data-v-ad49e094]:hover {\n    color: #9561e2;\n}\n.md\\:hover\\:text-purple-light[data-v-ad49e094]:hover {\n    color: #a779e9;\n}\n.md\\:hover\\:text-purple-lighter[data-v-ad49e094]:hover {\n    color: #d6bbfc;\n}\n.md\\:hover\\:text-purple-lightest[data-v-ad49e094]:hover {\n    color: #f3ebff;\n}\n.md\\:hover\\:text-pink-darkest[data-v-ad49e094]:hover {\n    color: #451225;\n}\n.md\\:hover\\:text-pink-darker[data-v-ad49e094]:hover {\n    color: #6f213f;\n}\n.md\\:hover\\:text-pink-dark[data-v-ad49e094]:hover {\n    color: #eb5286;\n}\n.md\\:hover\\:text-pink[data-v-ad49e094]:hover {\n    color: #f66d9b;\n}\n.md\\:hover\\:text-pink-light[data-v-ad49e094]:hover {\n    color: #fa7ea8;\n}\n.md\\:hover\\:text-pink-lighter[data-v-ad49e094]:hover {\n    color: #ffbbca;\n}\n.md\\:hover\\:text-pink-lightest[data-v-ad49e094]:hover {\n    color: #ffebef;\n}\n.md\\:focus\\:text-transparent[data-v-ad49e094]:focus {\n    color: transparent;\n}\n.md\\:focus\\:text-black[data-v-ad49e094]:focus {\n    color: #22292f;\n}\n.md\\:focus\\:text-grey-darkest[data-v-ad49e094]:focus {\n    color: #3d4852;\n}\n.md\\:focus\\:text-grey-darker[data-v-ad49e094]:focus {\n    color: #606f7b;\n}\n.md\\:focus\\:text-grey-dark[data-v-ad49e094]:focus {\n    color: #8795a1;\n}\n.md\\:focus\\:text-grey[data-v-ad49e094]:focus {\n    color: #b8c2cc;\n}\n.md\\:focus\\:text-grey-light[data-v-ad49e094]:focus {\n    color: #dae1e7;\n}\n.md\\:focus\\:text-grey-lighter[data-v-ad49e094]:focus {\n    color: #f1f5f8;\n}\n.md\\:focus\\:text-grey-lightest[data-v-ad49e094]:focus {\n    color: #f8fafc;\n}\n.md\\:focus\\:text-white[data-v-ad49e094]:focus {\n    color: #fff;\n}\n.md\\:focus\\:text-red-darkest[data-v-ad49e094]:focus {\n    color: #3b0d0c;\n}\n.md\\:focus\\:text-red-darker[data-v-ad49e094]:focus {\n    color: #621b18;\n}\n.md\\:focus\\:text-red-dark[data-v-ad49e094]:focus {\n    color: #cc1f1a;\n}\n.md\\:focus\\:text-red[data-v-ad49e094]:focus {\n    color: #e3342f;\n}\n.md\\:focus\\:text-red-light[data-v-ad49e094]:focus {\n    color: #ef5753;\n}\n.md\\:focus\\:text-red-lighter[data-v-ad49e094]:focus {\n    color: #f9acaa;\n}\n.md\\:focus\\:text-red-lightest[data-v-ad49e094]:focus {\n    color: #fcebea;\n}\n.md\\:focus\\:text-orange-darkest[data-v-ad49e094]:focus {\n    color: #462a16;\n}\n.md\\:focus\\:text-orange-darker[data-v-ad49e094]:focus {\n    color: #613b1f;\n}\n.md\\:focus\\:text-orange-dark[data-v-ad49e094]:focus {\n    color: #de751f;\n}\n.md\\:focus\\:text-orange[data-v-ad49e094]:focus {\n    color: #f6993f;\n}\n.md\\:focus\\:text-orange-light[data-v-ad49e094]:focus {\n    color: #faad63;\n}\n.md\\:focus\\:text-orange-lighter[data-v-ad49e094]:focus {\n    color: #fcd9b6;\n}\n.md\\:focus\\:text-orange-lightest[data-v-ad49e094]:focus {\n    color: #fff5eb;\n}\n.md\\:focus\\:text-yellow-darkest[data-v-ad49e094]:focus {\n    color: #453411;\n}\n.md\\:focus\\:text-yellow-darker[data-v-ad49e094]:focus {\n    color: #684f1d;\n}\n.md\\:focus\\:text-yellow-dark[data-v-ad49e094]:focus {\n    color: #f2d024;\n}\n.md\\:focus\\:text-yellow[data-v-ad49e094]:focus {\n    color: #ffed4a;\n}\n.md\\:focus\\:text-yellow-light[data-v-ad49e094]:focus {\n    color: #fff382;\n}\n.md\\:focus\\:text-yellow-lighter[data-v-ad49e094]:focus {\n    color: #fff9c2;\n}\n.md\\:focus\\:text-yellow-lightest[data-v-ad49e094]:focus {\n    color: #fcfbeb;\n}\n.md\\:focus\\:text-green-darkest[data-v-ad49e094]:focus {\n    color: #0f2f21;\n}\n.md\\:focus\\:text-green-darker[data-v-ad49e094]:focus {\n    color: #1a4731;\n}\n.md\\:focus\\:text-green-dark[data-v-ad49e094]:focus {\n    color: #1f9d55;\n}\n.md\\:focus\\:text-green[data-v-ad49e094]:focus {\n    color: #38c172;\n}\n.md\\:focus\\:text-green-light[data-v-ad49e094]:focus {\n    color: #51d88a;\n}\n.md\\:focus\\:text-green-lighter[data-v-ad49e094]:focus {\n    color: #a2f5bf;\n}\n.md\\:focus\\:text-green-lightest[data-v-ad49e094]:focus {\n    color: #e3fcec;\n}\n.md\\:focus\\:text-teal-darkest[data-v-ad49e094]:focus {\n    color: #0d3331;\n}\n.md\\:focus\\:text-teal-darker[data-v-ad49e094]:focus {\n    color: #20504f;\n}\n.md\\:focus\\:text-teal-dark[data-v-ad49e094]:focus {\n    color: #38a89d;\n}\n.md\\:focus\\:text-teal[data-v-ad49e094]:focus {\n    color: #4dc0b5;\n}\n.md\\:focus\\:text-teal-light[data-v-ad49e094]:focus {\n    color: #64d5ca;\n}\n.md\\:focus\\:text-teal-lighter[data-v-ad49e094]:focus {\n    color: #a0f0ed;\n}\n.md\\:focus\\:text-teal-lightest[data-v-ad49e094]:focus {\n    color: #e8fffe;\n}\n.md\\:focus\\:text-blue-darkest[data-v-ad49e094]:focus {\n    color: #12283a;\n}\n.md\\:focus\\:text-blue-darker[data-v-ad49e094]:focus {\n    color: #1c3d5a;\n}\n.md\\:focus\\:text-blue-dark[data-v-ad49e094]:focus {\n    color: #2779bd;\n}\n.md\\:focus\\:text-blue[data-v-ad49e094]:focus {\n    color: #3490dc;\n}\n.md\\:focus\\:text-blue-light[data-v-ad49e094]:focus {\n    color: #6cb2eb;\n}\n.md\\:focus\\:text-blue-lighter[data-v-ad49e094]:focus {\n    color: #bcdefa;\n}\n.md\\:focus\\:text-blue-lightest[data-v-ad49e094]:focus {\n    color: #eff8ff;\n}\n.md\\:focus\\:text-indigo-darkest[data-v-ad49e094]:focus {\n    color: #191e38;\n}\n.md\\:focus\\:text-indigo-darker[data-v-ad49e094]:focus {\n    color: #2f365f;\n}\n.md\\:focus\\:text-indigo-dark[data-v-ad49e094]:focus {\n    color: #5661b3;\n}\n.md\\:focus\\:text-indigo[data-v-ad49e094]:focus {\n    color: #6574cd;\n}\n.md\\:focus\\:text-indigo-light[data-v-ad49e094]:focus {\n    color: #7886d7;\n}\n.md\\:focus\\:text-indigo-lighter[data-v-ad49e094]:focus {\n    color: #b2b7ff;\n}\n.md\\:focus\\:text-indigo-lightest[data-v-ad49e094]:focus {\n    color: #e6e8ff;\n}\n.md\\:focus\\:text-purple-darkest[data-v-ad49e094]:focus {\n    color: #21183c;\n}\n.md\\:focus\\:text-purple-darker[data-v-ad49e094]:focus {\n    color: #382b5f;\n}\n.md\\:focus\\:text-purple-dark[data-v-ad49e094]:focus {\n    color: #794acf;\n}\n.md\\:focus\\:text-purple[data-v-ad49e094]:focus {\n    color: #9561e2;\n}\n.md\\:focus\\:text-purple-light[data-v-ad49e094]:focus {\n    color: #a779e9;\n}\n.md\\:focus\\:text-purple-lighter[data-v-ad49e094]:focus {\n    color: #d6bbfc;\n}\n.md\\:focus\\:text-purple-lightest[data-v-ad49e094]:focus {\n    color: #f3ebff;\n}\n.md\\:focus\\:text-pink-darkest[data-v-ad49e094]:focus {\n    color: #451225;\n}\n.md\\:focus\\:text-pink-darker[data-v-ad49e094]:focus {\n    color: #6f213f;\n}\n.md\\:focus\\:text-pink-dark[data-v-ad49e094]:focus {\n    color: #eb5286;\n}\n.md\\:focus\\:text-pink[data-v-ad49e094]:focus {\n    color: #f66d9b;\n}\n.md\\:focus\\:text-pink-light[data-v-ad49e094]:focus {\n    color: #fa7ea8;\n}\n.md\\:focus\\:text-pink-lighter[data-v-ad49e094]:focus {\n    color: #ffbbca;\n}\n.md\\:focus\\:text-pink-lightest[data-v-ad49e094]:focus {\n    color: #ffebef;\n}\n.md\\:text-xs[data-v-ad49e094] {\n    font-size: .75rem;\n}\n.md\\:text-sm[data-v-ad49e094] {\n    font-size: .875rem;\n}\n.md\\:text-base[data-v-ad49e094] {\n    font-size: 1rem;\n}\n.md\\:text-lg[data-v-ad49e094] {\n    font-size: 1.125rem;\n}\n.md\\:text-xl[data-v-ad49e094] {\n    font-size: 1.25rem;\n}\n.md\\:text-2xl[data-v-ad49e094] {\n    font-size: 1.5rem;\n}\n.md\\:text-3xl[data-v-ad49e094] {\n    font-size: 1.875rem;\n}\n.md\\:text-4xl[data-v-ad49e094] {\n    font-size: 2.25rem;\n}\n.md\\:text-5xl[data-v-ad49e094] {\n    font-size: 3rem;\n}\n.md\\:italic[data-v-ad49e094] {\n    font-style: italic;\n}\n.md\\:roman[data-v-ad49e094] {\n    font-style: normal;\n}\n.md\\:uppercase[data-v-ad49e094] {\n    text-transform: uppercase;\n}\n.md\\:lowercase[data-v-ad49e094] {\n    text-transform: lowercase;\n}\n.md\\:capitalize[data-v-ad49e094] {\n    text-transform: capitalize;\n}\n.md\\:normal-case[data-v-ad49e094] {\n    text-transform: none;\n}\n.md\\:underline[data-v-ad49e094] {\n    text-decoration: underline;\n}\n.md\\:line-through[data-v-ad49e094] {\n    text-decoration: line-through;\n}\n.md\\:no-underline[data-v-ad49e094] {\n    text-decoration: none;\n}\n.md\\:antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.md\\:subpixel-antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.md\\:hover\\:italic[data-v-ad49e094]:hover {\n    font-style: italic;\n}\n.md\\:hover\\:roman[data-v-ad49e094]:hover {\n    font-style: normal;\n}\n.md\\:hover\\:uppercase[data-v-ad49e094]:hover {\n    text-transform: uppercase;\n}\n.md\\:hover\\:lowercase[data-v-ad49e094]:hover {\n    text-transform: lowercase;\n}\n.md\\:hover\\:capitalize[data-v-ad49e094]:hover {\n    text-transform: capitalize;\n}\n.md\\:hover\\:normal-case[data-v-ad49e094]:hover {\n    text-transform: none;\n}\n.md\\:hover\\:underline[data-v-ad49e094]:hover {\n    text-decoration: underline;\n}\n.md\\:hover\\:line-through[data-v-ad49e094]:hover {\n    text-decoration: line-through;\n}\n.md\\:hover\\:no-underline[data-v-ad49e094]:hover {\n    text-decoration: none;\n}\n.md\\:hover\\:antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.md\\:hover\\:subpixel-antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.md\\:focus\\:italic[data-v-ad49e094]:focus {\n    font-style: italic;\n}\n.md\\:focus\\:roman[data-v-ad49e094]:focus {\n    font-style: normal;\n}\n.md\\:focus\\:uppercase[data-v-ad49e094]:focus {\n    text-transform: uppercase;\n}\n.md\\:focus\\:lowercase[data-v-ad49e094]:focus {\n    text-transform: lowercase;\n}\n.md\\:focus\\:capitalize[data-v-ad49e094]:focus {\n    text-transform: capitalize;\n}\n.md\\:focus\\:normal-case[data-v-ad49e094]:focus {\n    text-transform: none;\n}\n.md\\:focus\\:underline[data-v-ad49e094]:focus {\n    text-decoration: underline;\n}\n.md\\:focus\\:line-through[data-v-ad49e094]:focus {\n    text-decoration: line-through;\n}\n.md\\:focus\\:no-underline[data-v-ad49e094]:focus {\n    text-decoration: none;\n}\n.md\\:focus\\:antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.md\\:focus\\:subpixel-antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.md\\:tracking-tight[data-v-ad49e094] {\n    letter-spacing: -0.05em;\n}\n.md\\:tracking-normal[data-v-ad49e094] {\n    letter-spacing: 0;\n}\n.md\\:tracking-wide[data-v-ad49e094] {\n    letter-spacing: .05em;\n}\n.md\\:select-none[data-v-ad49e094] {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.md\\:select-text[data-v-ad49e094] {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n}\n.md\\:align-baseline[data-v-ad49e094] {\n    vertical-align: baseline;\n}\n.md\\:align-top[data-v-ad49e094] {\n    vertical-align: top;\n}\n.md\\:align-middle[data-v-ad49e094] {\n    vertical-align: middle;\n}\n.md\\:align-bottom[data-v-ad49e094] {\n    vertical-align: bottom;\n}\n.md\\:align-text-top[data-v-ad49e094] {\n    vertical-align: text-top;\n}\n.md\\:align-text-bottom[data-v-ad49e094] {\n    vertical-align: text-bottom;\n}\n.md\\:visible[data-v-ad49e094] {\n    visibility: visible;\n}\n.md\\:invisible[data-v-ad49e094] {\n    visibility: hidden;\n}\n.md\\:whitespace-normal[data-v-ad49e094] {\n    white-space: normal;\n}\n.md\\:whitespace-no-wrap[data-v-ad49e094] {\n    white-space: nowrap;\n}\n.md\\:whitespace-pre[data-v-ad49e094] {\n    white-space: pre;\n}\n.md\\:whitespace-pre-line[data-v-ad49e094] {\n    white-space: pre-line;\n}\n.md\\:whitespace-pre-wrap[data-v-ad49e094] {\n    white-space: pre-wrap;\n}\n.md\\:break-words[data-v-ad49e094] {\n    word-wrap: break-word;\n}\n.md\\:break-normal[data-v-ad49e094] {\n    word-wrap: normal;\n}\n.md\\:truncate[data-v-ad49e094] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.md\\:w-1[data-v-ad49e094] {\n    width: .25rem;\n}\n.md\\:w-2[data-v-ad49e094] {\n    width: .5rem;\n}\n.md\\:w-3[data-v-ad49e094] {\n    width: .75rem;\n}\n.md\\:w-4[data-v-ad49e094] {\n    width: 1rem;\n}\n.md\\:w-5[data-v-ad49e094] {\n    width: 1.25rem;\n}\n.md\\:w-6[data-v-ad49e094] {\n    width: 1.5rem;\n}\n.md\\:w-8[data-v-ad49e094] {\n    width: 2rem;\n}\n.md\\:w-10[data-v-ad49e094] {\n    width: 2.5rem;\n}\n.md\\:w-12[data-v-ad49e094] {\n    width: 3rem;\n}\n.md\\:w-16[data-v-ad49e094] {\n    width: 4rem;\n}\n.md\\:w-24[data-v-ad49e094] {\n    width: 6rem;\n}\n.md\\:w-32[data-v-ad49e094] {\n    width: 8rem;\n}\n.md\\:w-48[data-v-ad49e094] {\n    width: 12rem;\n}\n.md\\:w-64[data-v-ad49e094] {\n    width: 16rem;\n}\n.md\\:w-auto[data-v-ad49e094] {\n    width: auto;\n}\n.md\\:w-px[data-v-ad49e094] {\n    width: 1px;\n}\n.md\\:w-1\\/2[data-v-ad49e094] {\n    width: 50%;\n}\n.md\\:w-1\\/3[data-v-ad49e094] {\n    width: 33.33333%;\n}\n.md\\:w-2\\/3[data-v-ad49e094] {\n    width: 66.66667%;\n}\n.md\\:w-1\\/4[data-v-ad49e094] {\n    width: 25%;\n}\n.md\\:w-3\\/4[data-v-ad49e094] {\n    width: 75%;\n}\n.md\\:w-1\\/5[data-v-ad49e094] {\n    width: 20%;\n}\n.md\\:w-2\\/5[data-v-ad49e094] {\n    width: 40%;\n}\n.md\\:w-3\\/5[data-v-ad49e094] {\n    width: 60%;\n}\n.md\\:w-4\\/5[data-v-ad49e094] {\n    width: 80%;\n}\n.md\\:w-1\\/6[data-v-ad49e094] {\n    width: 16.66667%;\n}\n.md\\:w-5\\/6[data-v-ad49e094] {\n    width: 83.33333%;\n}\n.md\\:w-full[data-v-ad49e094] {\n    width: 100%;\n}\n.md\\:w-screen[data-v-ad49e094] {\n    width: 100vw;\n}\n.md\\:z-0[data-v-ad49e094] {\n    z-index: 0;\n}\n.md\\:z-10[data-v-ad49e094] {\n    z-index: 10;\n}\n.md\\:z-20[data-v-ad49e094] {\n    z-index: 20;\n}\n.md\\:z-30[data-v-ad49e094] {\n    z-index: 30;\n}\n.md\\:z-40[data-v-ad49e094] {\n    z-index: 40;\n}\n.md\\:z-50[data-v-ad49e094] {\n    z-index: 50;\n}\n.md\\:z-auto[data-v-ad49e094] {\n    z-index: auto;\n}\n}\n@media (min-width: 992px) {\n.lg\\:list-reset[data-v-ad49e094] {\n    list-style: none;\n    padding: 0;\n}\n.lg\\:appearance-none[data-v-ad49e094] {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n}\n.lg\\:bg-fixed[data-v-ad49e094] {\n    background-attachment: fixed;\n}\n.lg\\:bg-local[data-v-ad49e094] {\n    background-attachment: local;\n}\n.lg\\:bg-scroll[data-v-ad49e094] {\n    background-attachment: scroll;\n}\n.lg\\:bg-transparent[data-v-ad49e094] {\n    background-color: transparent;\n}\n.lg\\:bg-black[data-v-ad49e094] {\n    background-color: #22292f;\n}\n.lg\\:bg-grey-darkest[data-v-ad49e094] {\n    background-color: #3d4852;\n}\n.lg\\:bg-grey-darker[data-v-ad49e094] {\n    background-color: #606f7b;\n}\n.lg\\:bg-grey-dark[data-v-ad49e094] {\n    background-color: #8795a1;\n}\n.lg\\:bg-grey[data-v-ad49e094] {\n    background-color: #b8c2cc;\n}\n.lg\\:bg-grey-light[data-v-ad49e094] {\n    background-color: #dae1e7;\n}\n.lg\\:bg-grey-lighter[data-v-ad49e094] {\n    background-color: #f1f5f8;\n}\n.lg\\:bg-grey-lightest[data-v-ad49e094] {\n    background-color: #f8fafc;\n}\n.lg\\:bg-white[data-v-ad49e094] {\n    background-color: #fff;\n}\n.lg\\:bg-red-darkest[data-v-ad49e094] {\n    background-color: #3b0d0c;\n}\n.lg\\:bg-red-darker[data-v-ad49e094] {\n    background-color: #621b18;\n}\n.lg\\:bg-red-dark[data-v-ad49e094] {\n    background-color: #cc1f1a;\n}\n.lg\\:bg-red[data-v-ad49e094] {\n    background-color: #e3342f;\n}\n.lg\\:bg-red-light[data-v-ad49e094] {\n    background-color: #ef5753;\n}\n.lg\\:bg-red-lighter[data-v-ad49e094] {\n    background-color: #f9acaa;\n}\n.lg\\:bg-red-lightest[data-v-ad49e094] {\n    background-color: #fcebea;\n}\n.lg\\:bg-orange-darkest[data-v-ad49e094] {\n    background-color: #462a16;\n}\n.lg\\:bg-orange-darker[data-v-ad49e094] {\n    background-color: #613b1f;\n}\n.lg\\:bg-orange-dark[data-v-ad49e094] {\n    background-color: #de751f;\n}\n.lg\\:bg-orange[data-v-ad49e094] {\n    background-color: #f6993f;\n}\n.lg\\:bg-orange-light[data-v-ad49e094] {\n    background-color: #faad63;\n}\n.lg\\:bg-orange-lighter[data-v-ad49e094] {\n    background-color: #fcd9b6;\n}\n.lg\\:bg-orange-lightest[data-v-ad49e094] {\n    background-color: #fff5eb;\n}\n.lg\\:bg-yellow-darkest[data-v-ad49e094] {\n    background-color: #453411;\n}\n.lg\\:bg-yellow-darker[data-v-ad49e094] {\n    background-color: #684f1d;\n}\n.lg\\:bg-yellow-dark[data-v-ad49e094] {\n    background-color: #f2d024;\n}\n.lg\\:bg-yellow[data-v-ad49e094] {\n    background-color: #ffed4a;\n}\n.lg\\:bg-yellow-light[data-v-ad49e094] {\n    background-color: #fff382;\n}\n.lg\\:bg-yellow-lighter[data-v-ad49e094] {\n    background-color: #fff9c2;\n}\n.lg\\:bg-yellow-lightest[data-v-ad49e094] {\n    background-color: #fcfbeb;\n}\n.lg\\:bg-green-darkest[data-v-ad49e094] {\n    background-color: #0f2f21;\n}\n.lg\\:bg-green-darker[data-v-ad49e094] {\n    background-color: #1a4731;\n}\n.lg\\:bg-green-dark[data-v-ad49e094] {\n    background-color: #1f9d55;\n}\n.lg\\:bg-green[data-v-ad49e094] {\n    background-color: #38c172;\n}\n.lg\\:bg-green-light[data-v-ad49e094] {\n    background-color: #51d88a;\n}\n.lg\\:bg-green-lighter[data-v-ad49e094] {\n    background-color: #a2f5bf;\n}\n.lg\\:bg-green-lightest[data-v-ad49e094] {\n    background-color: #e3fcec;\n}\n.lg\\:bg-teal-darkest[data-v-ad49e094] {\n    background-color: #0d3331;\n}\n.lg\\:bg-teal-darker[data-v-ad49e094] {\n    background-color: #20504f;\n}\n.lg\\:bg-teal-dark[data-v-ad49e094] {\n    background-color: #38a89d;\n}\n.lg\\:bg-teal[data-v-ad49e094] {\n    background-color: #4dc0b5;\n}\n.lg\\:bg-teal-light[data-v-ad49e094] {\n    background-color: #64d5ca;\n}\n.lg\\:bg-teal-lighter[data-v-ad49e094] {\n    background-color: #a0f0ed;\n}\n.lg\\:bg-teal-lightest[data-v-ad49e094] {\n    background-color: #e8fffe;\n}\n.lg\\:bg-blue-darkest[data-v-ad49e094] {\n    background-color: #12283a;\n}\n.lg\\:bg-blue-darker[data-v-ad49e094] {\n    background-color: #1c3d5a;\n}\n.lg\\:bg-blue-dark[data-v-ad49e094] {\n    background-color: #2779bd;\n}\n.lg\\:bg-blue[data-v-ad49e094] {\n    background-color: #3490dc;\n}\n.lg\\:bg-blue-light[data-v-ad49e094] {\n    background-color: #6cb2eb;\n}\n.lg\\:bg-blue-lighter[data-v-ad49e094] {\n    background-color: #bcdefa;\n}\n.lg\\:bg-blue-lightest[data-v-ad49e094] {\n    background-color: #eff8ff;\n}\n.lg\\:bg-indigo-darkest[data-v-ad49e094] {\n    background-color: #191e38;\n}\n.lg\\:bg-indigo-darker[data-v-ad49e094] {\n    background-color: #2f365f;\n}\n.lg\\:bg-indigo-dark[data-v-ad49e094] {\n    background-color: #5661b3;\n}\n.lg\\:bg-indigo[data-v-ad49e094] {\n    background-color: #6574cd;\n}\n.lg\\:bg-indigo-light[data-v-ad49e094] {\n    background-color: #7886d7;\n}\n.lg\\:bg-indigo-lighter[data-v-ad49e094] {\n    background-color: #b2b7ff;\n}\n.lg\\:bg-indigo-lightest[data-v-ad49e094] {\n    background-color: #e6e8ff;\n}\n.lg\\:bg-purple-darkest[data-v-ad49e094] {\n    background-color: #21183c;\n}\n.lg\\:bg-purple-darker[data-v-ad49e094] {\n    background-color: #382b5f;\n}\n.lg\\:bg-purple-dark[data-v-ad49e094] {\n    background-color: #794acf;\n}\n.lg\\:bg-purple[data-v-ad49e094] {\n    background-color: #9561e2;\n}\n.lg\\:bg-purple-light[data-v-ad49e094] {\n    background-color: #a779e9;\n}\n.lg\\:bg-purple-lighter[data-v-ad49e094] {\n    background-color: #d6bbfc;\n}\n.lg\\:bg-purple-lightest[data-v-ad49e094] {\n    background-color: #f3ebff;\n}\n.lg\\:bg-pink-darkest[data-v-ad49e094] {\n    background-color: #451225;\n}\n.lg\\:bg-pink-darker[data-v-ad49e094] {\n    background-color: #6f213f;\n}\n.lg\\:bg-pink-dark[data-v-ad49e094] {\n    background-color: #eb5286;\n}\n.lg\\:bg-pink[data-v-ad49e094] {\n    background-color: #f66d9b;\n}\n.lg\\:bg-pink-light[data-v-ad49e094] {\n    background-color: #fa7ea8;\n}\n.lg\\:bg-pink-lighter[data-v-ad49e094] {\n    background-color: #ffbbca;\n}\n.lg\\:bg-pink-lightest[data-v-ad49e094] {\n    background-color: #ffebef;\n}\n.lg\\:hover\\:bg-transparent[data-v-ad49e094]:hover {\n    background-color: transparent;\n}\n.lg\\:hover\\:bg-black[data-v-ad49e094]:hover {\n    background-color: #22292f;\n}\n.lg\\:hover\\:bg-grey-darkest[data-v-ad49e094]:hover {\n    background-color: #3d4852;\n}\n.lg\\:hover\\:bg-grey-darker[data-v-ad49e094]:hover {\n    background-color: #606f7b;\n}\n.lg\\:hover\\:bg-grey-dark[data-v-ad49e094]:hover {\n    background-color: #8795a1;\n}\n.lg\\:hover\\:bg-grey[data-v-ad49e094]:hover {\n    background-color: #b8c2cc;\n}\n.lg\\:hover\\:bg-grey-light[data-v-ad49e094]:hover {\n    background-color: #dae1e7;\n}\n.lg\\:hover\\:bg-grey-lighter[data-v-ad49e094]:hover {\n    background-color: #f1f5f8;\n}\n.lg\\:hover\\:bg-grey-lightest[data-v-ad49e094]:hover {\n    background-color: #f8fafc;\n}\n.lg\\:hover\\:bg-white[data-v-ad49e094]:hover {\n    background-color: #fff;\n}\n.lg\\:hover\\:bg-red-darkest[data-v-ad49e094]:hover {\n    background-color: #3b0d0c;\n}\n.lg\\:hover\\:bg-red-darker[data-v-ad49e094]:hover {\n    background-color: #621b18;\n}\n.lg\\:hover\\:bg-red-dark[data-v-ad49e094]:hover {\n    background-color: #cc1f1a;\n}\n.lg\\:hover\\:bg-red[data-v-ad49e094]:hover {\n    background-color: #e3342f;\n}\n.lg\\:hover\\:bg-red-light[data-v-ad49e094]:hover {\n    background-color: #ef5753;\n}\n.lg\\:hover\\:bg-red-lighter[data-v-ad49e094]:hover {\n    background-color: #f9acaa;\n}\n.lg\\:hover\\:bg-red-lightest[data-v-ad49e094]:hover {\n    background-color: #fcebea;\n}\n.lg\\:hover\\:bg-orange-darkest[data-v-ad49e094]:hover {\n    background-color: #462a16;\n}\n.lg\\:hover\\:bg-orange-darker[data-v-ad49e094]:hover {\n    background-color: #613b1f;\n}\n.lg\\:hover\\:bg-orange-dark[data-v-ad49e094]:hover {\n    background-color: #de751f;\n}\n.lg\\:hover\\:bg-orange[data-v-ad49e094]:hover {\n    background-color: #f6993f;\n}\n.lg\\:hover\\:bg-orange-light[data-v-ad49e094]:hover {\n    background-color: #faad63;\n}\n.lg\\:hover\\:bg-orange-lighter[data-v-ad49e094]:hover {\n    background-color: #fcd9b6;\n}\n.lg\\:hover\\:bg-orange-lightest[data-v-ad49e094]:hover {\n    background-color: #fff5eb;\n}\n.lg\\:hover\\:bg-yellow-darkest[data-v-ad49e094]:hover {\n    background-color: #453411;\n}\n.lg\\:hover\\:bg-yellow-darker[data-v-ad49e094]:hover {\n    background-color: #684f1d;\n}\n.lg\\:hover\\:bg-yellow-dark[data-v-ad49e094]:hover {\n    background-color: #f2d024;\n}\n.lg\\:hover\\:bg-yellow[data-v-ad49e094]:hover {\n    background-color: #ffed4a;\n}\n.lg\\:hover\\:bg-yellow-light[data-v-ad49e094]:hover {\n    background-color: #fff382;\n}\n.lg\\:hover\\:bg-yellow-lighter[data-v-ad49e094]:hover {\n    background-color: #fff9c2;\n}\n.lg\\:hover\\:bg-yellow-lightest[data-v-ad49e094]:hover {\n    background-color: #fcfbeb;\n}\n.lg\\:hover\\:bg-green-darkest[data-v-ad49e094]:hover {\n    background-color: #0f2f21;\n}\n.lg\\:hover\\:bg-green-darker[data-v-ad49e094]:hover {\n    background-color: #1a4731;\n}\n.lg\\:hover\\:bg-green-dark[data-v-ad49e094]:hover {\n    background-color: #1f9d55;\n}\n.lg\\:hover\\:bg-green[data-v-ad49e094]:hover {\n    background-color: #38c172;\n}\n.lg\\:hover\\:bg-green-light[data-v-ad49e094]:hover {\n    background-color: #51d88a;\n}\n.lg\\:hover\\:bg-green-lighter[data-v-ad49e094]:hover {\n    background-color: #a2f5bf;\n}\n.lg\\:hover\\:bg-green-lightest[data-v-ad49e094]:hover {\n    background-color: #e3fcec;\n}\n.lg\\:hover\\:bg-teal-darkest[data-v-ad49e094]:hover {\n    background-color: #0d3331;\n}\n.lg\\:hover\\:bg-teal-darker[data-v-ad49e094]:hover {\n    background-color: #20504f;\n}\n.lg\\:hover\\:bg-teal-dark[data-v-ad49e094]:hover {\n    background-color: #38a89d;\n}\n.lg\\:hover\\:bg-teal[data-v-ad49e094]:hover {\n    background-color: #4dc0b5;\n}\n.lg\\:hover\\:bg-teal-light[data-v-ad49e094]:hover {\n    background-color: #64d5ca;\n}\n.lg\\:hover\\:bg-teal-lighter[data-v-ad49e094]:hover {\n    background-color: #a0f0ed;\n}\n.lg\\:hover\\:bg-teal-lightest[data-v-ad49e094]:hover {\n    background-color: #e8fffe;\n}\n.lg\\:hover\\:bg-blue-darkest[data-v-ad49e094]:hover {\n    background-color: #12283a;\n}\n.lg\\:hover\\:bg-blue-darker[data-v-ad49e094]:hover {\n    background-color: #1c3d5a;\n}\n.lg\\:hover\\:bg-blue-dark[data-v-ad49e094]:hover {\n    background-color: #2779bd;\n}\n.lg\\:hover\\:bg-blue[data-v-ad49e094]:hover {\n    background-color: #3490dc;\n}\n.lg\\:hover\\:bg-blue-light[data-v-ad49e094]:hover {\n    background-color: #6cb2eb;\n}\n.lg\\:hover\\:bg-blue-lighter[data-v-ad49e094]:hover {\n    background-color: #bcdefa;\n}\n.lg\\:hover\\:bg-blue-lightest[data-v-ad49e094]:hover {\n    background-color: #eff8ff;\n}\n.lg\\:hover\\:bg-indigo-darkest[data-v-ad49e094]:hover {\n    background-color: #191e38;\n}\n.lg\\:hover\\:bg-indigo-darker[data-v-ad49e094]:hover {\n    background-color: #2f365f;\n}\n.lg\\:hover\\:bg-indigo-dark[data-v-ad49e094]:hover {\n    background-color: #5661b3;\n}\n.lg\\:hover\\:bg-indigo[data-v-ad49e094]:hover {\n    background-color: #6574cd;\n}\n.lg\\:hover\\:bg-indigo-light[data-v-ad49e094]:hover {\n    background-color: #7886d7;\n}\n.lg\\:hover\\:bg-indigo-lighter[data-v-ad49e094]:hover {\n    background-color: #b2b7ff;\n}\n.lg\\:hover\\:bg-indigo-lightest[data-v-ad49e094]:hover {\n    background-color: #e6e8ff;\n}\n.lg\\:hover\\:bg-purple-darkest[data-v-ad49e094]:hover {\n    background-color: #21183c;\n}\n.lg\\:hover\\:bg-purple-darker[data-v-ad49e094]:hover {\n    background-color: #382b5f;\n}\n.lg\\:hover\\:bg-purple-dark[data-v-ad49e094]:hover {\n    background-color: #794acf;\n}\n.lg\\:hover\\:bg-purple[data-v-ad49e094]:hover {\n    background-color: #9561e2;\n}\n.lg\\:hover\\:bg-purple-light[data-v-ad49e094]:hover {\n    background-color: #a779e9;\n}\n.lg\\:hover\\:bg-purple-lighter[data-v-ad49e094]:hover {\n    background-color: #d6bbfc;\n}\n.lg\\:hover\\:bg-purple-lightest[data-v-ad49e094]:hover {\n    background-color: #f3ebff;\n}\n.lg\\:hover\\:bg-pink-darkest[data-v-ad49e094]:hover {\n    background-color: #451225;\n}\n.lg\\:hover\\:bg-pink-darker[data-v-ad49e094]:hover {\n    background-color: #6f213f;\n}\n.lg\\:hover\\:bg-pink-dark[data-v-ad49e094]:hover {\n    background-color: #eb5286;\n}\n.lg\\:hover\\:bg-pink[data-v-ad49e094]:hover {\n    background-color: #f66d9b;\n}\n.lg\\:hover\\:bg-pink-light[data-v-ad49e094]:hover {\n    background-color: #fa7ea8;\n}\n.lg\\:hover\\:bg-pink-lighter[data-v-ad49e094]:hover {\n    background-color: #ffbbca;\n}\n.lg\\:hover\\:bg-pink-lightest[data-v-ad49e094]:hover {\n    background-color: #ffebef;\n}\n.lg\\:focus\\:bg-transparent[data-v-ad49e094]:focus {\n    background-color: transparent;\n}\n.lg\\:focus\\:bg-black[data-v-ad49e094]:focus {\n    background-color: #22292f;\n}\n.lg\\:focus\\:bg-grey-darkest[data-v-ad49e094]:focus {\n    background-color: #3d4852;\n}\n.lg\\:focus\\:bg-grey-darker[data-v-ad49e094]:focus {\n    background-color: #606f7b;\n}\n.lg\\:focus\\:bg-grey-dark[data-v-ad49e094]:focus {\n    background-color: #8795a1;\n}\n.lg\\:focus\\:bg-grey[data-v-ad49e094]:focus {\n    background-color: #b8c2cc;\n}\n.lg\\:focus\\:bg-grey-light[data-v-ad49e094]:focus {\n    background-color: #dae1e7;\n}\n.lg\\:focus\\:bg-grey-lighter[data-v-ad49e094]:focus {\n    background-color: #f1f5f8;\n}\n.lg\\:focus\\:bg-grey-lightest[data-v-ad49e094]:focus {\n    background-color: #f8fafc;\n}\n.lg\\:focus\\:bg-white[data-v-ad49e094]:focus {\n    background-color: #fff;\n}\n.lg\\:focus\\:bg-red-darkest[data-v-ad49e094]:focus {\n    background-color: #3b0d0c;\n}\n.lg\\:focus\\:bg-red-darker[data-v-ad49e094]:focus {\n    background-color: #621b18;\n}\n.lg\\:focus\\:bg-red-dark[data-v-ad49e094]:focus {\n    background-color: #cc1f1a;\n}\n.lg\\:focus\\:bg-red[data-v-ad49e094]:focus {\n    background-color: #e3342f;\n}\n.lg\\:focus\\:bg-red-light[data-v-ad49e094]:focus {\n    background-color: #ef5753;\n}\n.lg\\:focus\\:bg-red-lighter[data-v-ad49e094]:focus {\n    background-color: #f9acaa;\n}\n.lg\\:focus\\:bg-red-lightest[data-v-ad49e094]:focus {\n    background-color: #fcebea;\n}\n.lg\\:focus\\:bg-orange-darkest[data-v-ad49e094]:focus {\n    background-color: #462a16;\n}\n.lg\\:focus\\:bg-orange-darker[data-v-ad49e094]:focus {\n    background-color: #613b1f;\n}\n.lg\\:focus\\:bg-orange-dark[data-v-ad49e094]:focus {\n    background-color: #de751f;\n}\n.lg\\:focus\\:bg-orange[data-v-ad49e094]:focus {\n    background-color: #f6993f;\n}\n.lg\\:focus\\:bg-orange-light[data-v-ad49e094]:focus {\n    background-color: #faad63;\n}\n.lg\\:focus\\:bg-orange-lighter[data-v-ad49e094]:focus {\n    background-color: #fcd9b6;\n}\n.lg\\:focus\\:bg-orange-lightest[data-v-ad49e094]:focus {\n    background-color: #fff5eb;\n}\n.lg\\:focus\\:bg-yellow-darkest[data-v-ad49e094]:focus {\n    background-color: #453411;\n}\n.lg\\:focus\\:bg-yellow-darker[data-v-ad49e094]:focus {\n    background-color: #684f1d;\n}\n.lg\\:focus\\:bg-yellow-dark[data-v-ad49e094]:focus {\n    background-color: #f2d024;\n}\n.lg\\:focus\\:bg-yellow[data-v-ad49e094]:focus {\n    background-color: #ffed4a;\n}\n.lg\\:focus\\:bg-yellow-light[data-v-ad49e094]:focus {\n    background-color: #fff382;\n}\n.lg\\:focus\\:bg-yellow-lighter[data-v-ad49e094]:focus {\n    background-color: #fff9c2;\n}\n.lg\\:focus\\:bg-yellow-lightest[data-v-ad49e094]:focus {\n    background-color: #fcfbeb;\n}\n.lg\\:focus\\:bg-green-darkest[data-v-ad49e094]:focus {\n    background-color: #0f2f21;\n}\n.lg\\:focus\\:bg-green-darker[data-v-ad49e094]:focus {\n    background-color: #1a4731;\n}\n.lg\\:focus\\:bg-green-dark[data-v-ad49e094]:focus {\n    background-color: #1f9d55;\n}\n.lg\\:focus\\:bg-green[data-v-ad49e094]:focus {\n    background-color: #38c172;\n}\n.lg\\:focus\\:bg-green-light[data-v-ad49e094]:focus {\n    background-color: #51d88a;\n}\n.lg\\:focus\\:bg-green-lighter[data-v-ad49e094]:focus {\n    background-color: #a2f5bf;\n}\n.lg\\:focus\\:bg-green-lightest[data-v-ad49e094]:focus {\n    background-color: #e3fcec;\n}\n.lg\\:focus\\:bg-teal-darkest[data-v-ad49e094]:focus {\n    background-color: #0d3331;\n}\n.lg\\:focus\\:bg-teal-darker[data-v-ad49e094]:focus {\n    background-color: #20504f;\n}\n.lg\\:focus\\:bg-teal-dark[data-v-ad49e094]:focus {\n    background-color: #38a89d;\n}\n.lg\\:focus\\:bg-teal[data-v-ad49e094]:focus {\n    background-color: #4dc0b5;\n}\n.lg\\:focus\\:bg-teal-light[data-v-ad49e094]:focus {\n    background-color: #64d5ca;\n}\n.lg\\:focus\\:bg-teal-lighter[data-v-ad49e094]:focus {\n    background-color: #a0f0ed;\n}\n.lg\\:focus\\:bg-teal-lightest[data-v-ad49e094]:focus {\n    background-color: #e8fffe;\n}\n.lg\\:focus\\:bg-blue-darkest[data-v-ad49e094]:focus {\n    background-color: #12283a;\n}\n.lg\\:focus\\:bg-blue-darker[data-v-ad49e094]:focus {\n    background-color: #1c3d5a;\n}\n.lg\\:focus\\:bg-blue-dark[data-v-ad49e094]:focus {\n    background-color: #2779bd;\n}\n.lg\\:focus\\:bg-blue[data-v-ad49e094]:focus {\n    background-color: #3490dc;\n}\n.lg\\:focus\\:bg-blue-light[data-v-ad49e094]:focus {\n    background-color: #6cb2eb;\n}\n.lg\\:focus\\:bg-blue-lighter[data-v-ad49e094]:focus {\n    background-color: #bcdefa;\n}\n.lg\\:focus\\:bg-blue-lightest[data-v-ad49e094]:focus {\n    background-color: #eff8ff;\n}\n.lg\\:focus\\:bg-indigo-darkest[data-v-ad49e094]:focus {\n    background-color: #191e38;\n}\n.lg\\:focus\\:bg-indigo-darker[data-v-ad49e094]:focus {\n    background-color: #2f365f;\n}\n.lg\\:focus\\:bg-indigo-dark[data-v-ad49e094]:focus {\n    background-color: #5661b3;\n}\n.lg\\:focus\\:bg-indigo[data-v-ad49e094]:focus {\n    background-color: #6574cd;\n}\n.lg\\:focus\\:bg-indigo-light[data-v-ad49e094]:focus {\n    background-color: #7886d7;\n}\n.lg\\:focus\\:bg-indigo-lighter[data-v-ad49e094]:focus {\n    background-color: #b2b7ff;\n}\n.lg\\:focus\\:bg-indigo-lightest[data-v-ad49e094]:focus {\n    background-color: #e6e8ff;\n}\n.lg\\:focus\\:bg-purple-darkest[data-v-ad49e094]:focus {\n    background-color: #21183c;\n}\n.lg\\:focus\\:bg-purple-darker[data-v-ad49e094]:focus {\n    background-color: #382b5f;\n}\n.lg\\:focus\\:bg-purple-dark[data-v-ad49e094]:focus {\n    background-color: #794acf;\n}\n.lg\\:focus\\:bg-purple[data-v-ad49e094]:focus {\n    background-color: #9561e2;\n}\n.lg\\:focus\\:bg-purple-light[data-v-ad49e094]:focus {\n    background-color: #a779e9;\n}\n.lg\\:focus\\:bg-purple-lighter[data-v-ad49e094]:focus {\n    background-color: #d6bbfc;\n}\n.lg\\:focus\\:bg-purple-lightest[data-v-ad49e094]:focus {\n    background-color: #f3ebff;\n}\n.lg\\:focus\\:bg-pink-darkest[data-v-ad49e094]:focus {\n    background-color: #451225;\n}\n.lg\\:focus\\:bg-pink-darker[data-v-ad49e094]:focus {\n    background-color: #6f213f;\n}\n.lg\\:focus\\:bg-pink-dark[data-v-ad49e094]:focus {\n    background-color: #eb5286;\n}\n.lg\\:focus\\:bg-pink[data-v-ad49e094]:focus {\n    background-color: #f66d9b;\n}\n.lg\\:focus\\:bg-pink-light[data-v-ad49e094]:focus {\n    background-color: #fa7ea8;\n}\n.lg\\:focus\\:bg-pink-lighter[data-v-ad49e094]:focus {\n    background-color: #ffbbca;\n}\n.lg\\:focus\\:bg-pink-lightest[data-v-ad49e094]:focus {\n    background-color: #ffebef;\n}\n.lg\\:bg-bottom[data-v-ad49e094] {\n    background-position: bottom;\n}\n.lg\\:bg-center[data-v-ad49e094] {\n    background-position: center;\n}\n.lg\\:bg-left[data-v-ad49e094] {\n    background-position: left;\n}\n.lg\\:bg-left-bottom[data-v-ad49e094] {\n    background-position: left bottom;\n}\n.lg\\:bg-left-top[data-v-ad49e094] {\n    background-position: left top;\n}\n.lg\\:bg-right[data-v-ad49e094] {\n    background-position: right;\n}\n.lg\\:bg-right-bottom[data-v-ad49e094] {\n    background-position: right bottom;\n}\n.lg\\:bg-right-top[data-v-ad49e094] {\n    background-position: right top;\n}\n.lg\\:bg-top[data-v-ad49e094] {\n    background-position: top;\n}\n.lg\\:bg-repeat[data-v-ad49e094] {\n    background-repeat: repeat;\n}\n.lg\\:bg-no-repeat[data-v-ad49e094] {\n    background-repeat: no-repeat;\n}\n.lg\\:bg-repeat-x[data-v-ad49e094] {\n    background-repeat: repeat-x;\n}\n.lg\\:bg-repeat-y[data-v-ad49e094] {\n    background-repeat: repeat-y;\n}\n.lg\\:bg-auto[data-v-ad49e094] {\n    background-size: auto;\n}\n.lg\\:bg-cover[data-v-ad49e094] {\n    background-size: cover;\n}\n.lg\\:bg-contain[data-v-ad49e094] {\n    background-size: contain;\n}\n.lg\\:border-transparent[data-v-ad49e094] {\n    border-color: transparent;\n}\n.lg\\:border-black[data-v-ad49e094] {\n    border-color: #22292f;\n}\n.lg\\:border-grey-darkest[data-v-ad49e094] {\n    border-color: #3d4852;\n}\n.lg\\:border-grey-darker[data-v-ad49e094] {\n    border-color: #606f7b;\n}\n.lg\\:border-grey-dark[data-v-ad49e094] {\n    border-color: #8795a1;\n}\n.lg\\:border-grey[data-v-ad49e094] {\n    border-color: #b8c2cc;\n}\n.lg\\:border-grey-light[data-v-ad49e094] {\n    border-color: #dae1e7;\n}\n.lg\\:border-grey-lighter[data-v-ad49e094] {\n    border-color: #f1f5f8;\n}\n.lg\\:border-grey-lightest[data-v-ad49e094] {\n    border-color: #f8fafc;\n}\n.lg\\:border-white[data-v-ad49e094] {\n    border-color: #fff;\n}\n.lg\\:border-red-darkest[data-v-ad49e094] {\n    border-color: #3b0d0c;\n}\n.lg\\:border-red-darker[data-v-ad49e094] {\n    border-color: #621b18;\n}\n.lg\\:border-red-dark[data-v-ad49e094] {\n    border-color: #cc1f1a;\n}\n.lg\\:border-red[data-v-ad49e094] {\n    border-color: #e3342f;\n}\n.lg\\:border-red-light[data-v-ad49e094] {\n    border-color: #ef5753;\n}\n.lg\\:border-red-lighter[data-v-ad49e094] {\n    border-color: #f9acaa;\n}\n.lg\\:border-red-lightest[data-v-ad49e094] {\n    border-color: #fcebea;\n}\n.lg\\:border-orange-darkest[data-v-ad49e094] {\n    border-color: #462a16;\n}\n.lg\\:border-orange-darker[data-v-ad49e094] {\n    border-color: #613b1f;\n}\n.lg\\:border-orange-dark[data-v-ad49e094] {\n    border-color: #de751f;\n}\n.lg\\:border-orange[data-v-ad49e094] {\n    border-color: #f6993f;\n}\n.lg\\:border-orange-light[data-v-ad49e094] {\n    border-color: #faad63;\n}\n.lg\\:border-orange-lighter[data-v-ad49e094] {\n    border-color: #fcd9b6;\n}\n.lg\\:border-orange-lightest[data-v-ad49e094] {\n    border-color: #fff5eb;\n}\n.lg\\:border-yellow-darkest[data-v-ad49e094] {\n    border-color: #453411;\n}\n.lg\\:border-yellow-darker[data-v-ad49e094] {\n    border-color: #684f1d;\n}\n.lg\\:border-yellow-dark[data-v-ad49e094] {\n    border-color: #f2d024;\n}\n.lg\\:border-yellow[data-v-ad49e094] {\n    border-color: #ffed4a;\n}\n.lg\\:border-yellow-light[data-v-ad49e094] {\n    border-color: #fff382;\n}\n.lg\\:border-yellow-lighter[data-v-ad49e094] {\n    border-color: #fff9c2;\n}\n.lg\\:border-yellow-lightest[data-v-ad49e094] {\n    border-color: #fcfbeb;\n}\n.lg\\:border-green-darkest[data-v-ad49e094] {\n    border-color: #0f2f21;\n}\n.lg\\:border-green-darker[data-v-ad49e094] {\n    border-color: #1a4731;\n}\n.lg\\:border-green-dark[data-v-ad49e094] {\n    border-color: #1f9d55;\n}\n.lg\\:border-green[data-v-ad49e094] {\n    border-color: #38c172;\n}\n.lg\\:border-green-light[data-v-ad49e094] {\n    border-color: #51d88a;\n}\n.lg\\:border-green-lighter[data-v-ad49e094] {\n    border-color: #a2f5bf;\n}\n.lg\\:border-green-lightest[data-v-ad49e094] {\n    border-color: #e3fcec;\n}\n.lg\\:border-teal-darkest[data-v-ad49e094] {\n    border-color: #0d3331;\n}\n.lg\\:border-teal-darker[data-v-ad49e094] {\n    border-color: #20504f;\n}\n.lg\\:border-teal-dark[data-v-ad49e094] {\n    border-color: #38a89d;\n}\n.lg\\:border-teal[data-v-ad49e094] {\n    border-color: #4dc0b5;\n}\n.lg\\:border-teal-light[data-v-ad49e094] {\n    border-color: #64d5ca;\n}\n.lg\\:border-teal-lighter[data-v-ad49e094] {\n    border-color: #a0f0ed;\n}\n.lg\\:border-teal-lightest[data-v-ad49e094] {\n    border-color: #e8fffe;\n}\n.lg\\:border-blue-darkest[data-v-ad49e094] {\n    border-color: #12283a;\n}\n.lg\\:border-blue-darker[data-v-ad49e094] {\n    border-color: #1c3d5a;\n}\n.lg\\:border-blue-dark[data-v-ad49e094] {\n    border-color: #2779bd;\n}\n.lg\\:border-blue[data-v-ad49e094] {\n    border-color: #3490dc;\n}\n.lg\\:border-blue-light[data-v-ad49e094] {\n    border-color: #6cb2eb;\n}\n.lg\\:border-blue-lighter[data-v-ad49e094] {\n    border-color: #bcdefa;\n}\n.lg\\:border-blue-lightest[data-v-ad49e094] {\n    border-color: #eff8ff;\n}\n.lg\\:border-indigo-darkest[data-v-ad49e094] {\n    border-color: #191e38;\n}\n.lg\\:border-indigo-darker[data-v-ad49e094] {\n    border-color: #2f365f;\n}\n.lg\\:border-indigo-dark[data-v-ad49e094] {\n    border-color: #5661b3;\n}\n.lg\\:border-indigo[data-v-ad49e094] {\n    border-color: #6574cd;\n}\n.lg\\:border-indigo-light[data-v-ad49e094] {\n    border-color: #7886d7;\n}\n.lg\\:border-indigo-lighter[data-v-ad49e094] {\n    border-color: #b2b7ff;\n}\n.lg\\:border-indigo-lightest[data-v-ad49e094] {\n    border-color: #e6e8ff;\n}\n.lg\\:border-purple-darkest[data-v-ad49e094] {\n    border-color: #21183c;\n}\n.lg\\:border-purple-darker[data-v-ad49e094] {\n    border-color: #382b5f;\n}\n.lg\\:border-purple-dark[data-v-ad49e094] {\n    border-color: #794acf;\n}\n.lg\\:border-purple[data-v-ad49e094] {\n    border-color: #9561e2;\n}\n.lg\\:border-purple-light[data-v-ad49e094] {\n    border-color: #a779e9;\n}\n.lg\\:border-purple-lighter[data-v-ad49e094] {\n    border-color: #d6bbfc;\n}\n.lg\\:border-purple-lightest[data-v-ad49e094] {\n    border-color: #f3ebff;\n}\n.lg\\:border-pink-darkest[data-v-ad49e094] {\n    border-color: #451225;\n}\n.lg\\:border-pink-darker[data-v-ad49e094] {\n    border-color: #6f213f;\n}\n.lg\\:border-pink-dark[data-v-ad49e094] {\n    border-color: #eb5286;\n}\n.lg\\:border-pink[data-v-ad49e094] {\n    border-color: #f66d9b;\n}\n.lg\\:border-pink-light[data-v-ad49e094] {\n    border-color: #fa7ea8;\n}\n.lg\\:border-pink-lighter[data-v-ad49e094] {\n    border-color: #ffbbca;\n}\n.lg\\:border-pink-lightest[data-v-ad49e094] {\n    border-color: #ffebef;\n}\n.lg\\:hover\\:border-transparent[data-v-ad49e094]:hover {\n    border-color: transparent;\n}\n.lg\\:hover\\:border-black[data-v-ad49e094]:hover {\n    border-color: #22292f;\n}\n.lg\\:hover\\:border-grey-darkest[data-v-ad49e094]:hover {\n    border-color: #3d4852;\n}\n.lg\\:hover\\:border-grey-darker[data-v-ad49e094]:hover {\n    border-color: #606f7b;\n}\n.lg\\:hover\\:border-grey-dark[data-v-ad49e094]:hover {\n    border-color: #8795a1;\n}\n.lg\\:hover\\:border-grey[data-v-ad49e094]:hover {\n    border-color: #b8c2cc;\n}\n.lg\\:hover\\:border-grey-light[data-v-ad49e094]:hover {\n    border-color: #dae1e7;\n}\n.lg\\:hover\\:border-grey-lighter[data-v-ad49e094]:hover {\n    border-color: #f1f5f8;\n}\n.lg\\:hover\\:border-grey-lightest[data-v-ad49e094]:hover {\n    border-color: #f8fafc;\n}\n.lg\\:hover\\:border-white[data-v-ad49e094]:hover {\n    border-color: #fff;\n}\n.lg\\:hover\\:border-red-darkest[data-v-ad49e094]:hover {\n    border-color: #3b0d0c;\n}\n.lg\\:hover\\:border-red-darker[data-v-ad49e094]:hover {\n    border-color: #621b18;\n}\n.lg\\:hover\\:border-red-dark[data-v-ad49e094]:hover {\n    border-color: #cc1f1a;\n}\n.lg\\:hover\\:border-red[data-v-ad49e094]:hover {\n    border-color: #e3342f;\n}\n.lg\\:hover\\:border-red-light[data-v-ad49e094]:hover {\n    border-color: #ef5753;\n}\n.lg\\:hover\\:border-red-lighter[data-v-ad49e094]:hover {\n    border-color: #f9acaa;\n}\n.lg\\:hover\\:border-red-lightest[data-v-ad49e094]:hover {\n    border-color: #fcebea;\n}\n.lg\\:hover\\:border-orange-darkest[data-v-ad49e094]:hover {\n    border-color: #462a16;\n}\n.lg\\:hover\\:border-orange-darker[data-v-ad49e094]:hover {\n    border-color: #613b1f;\n}\n.lg\\:hover\\:border-orange-dark[data-v-ad49e094]:hover {\n    border-color: #de751f;\n}\n.lg\\:hover\\:border-orange[data-v-ad49e094]:hover {\n    border-color: #f6993f;\n}\n.lg\\:hover\\:border-orange-light[data-v-ad49e094]:hover {\n    border-color: #faad63;\n}\n.lg\\:hover\\:border-orange-lighter[data-v-ad49e094]:hover {\n    border-color: #fcd9b6;\n}\n.lg\\:hover\\:border-orange-lightest[data-v-ad49e094]:hover {\n    border-color: #fff5eb;\n}\n.lg\\:hover\\:border-yellow-darkest[data-v-ad49e094]:hover {\n    border-color: #453411;\n}\n.lg\\:hover\\:border-yellow-darker[data-v-ad49e094]:hover {\n    border-color: #684f1d;\n}\n.lg\\:hover\\:border-yellow-dark[data-v-ad49e094]:hover {\n    border-color: #f2d024;\n}\n.lg\\:hover\\:border-yellow[data-v-ad49e094]:hover {\n    border-color: #ffed4a;\n}\n.lg\\:hover\\:border-yellow-light[data-v-ad49e094]:hover {\n    border-color: #fff382;\n}\n.lg\\:hover\\:border-yellow-lighter[data-v-ad49e094]:hover {\n    border-color: #fff9c2;\n}\n.lg\\:hover\\:border-yellow-lightest[data-v-ad49e094]:hover {\n    border-color: #fcfbeb;\n}\n.lg\\:hover\\:border-green-darkest[data-v-ad49e094]:hover {\n    border-color: #0f2f21;\n}\n.lg\\:hover\\:border-green-darker[data-v-ad49e094]:hover {\n    border-color: #1a4731;\n}\n.lg\\:hover\\:border-green-dark[data-v-ad49e094]:hover {\n    border-color: #1f9d55;\n}\n.lg\\:hover\\:border-green[data-v-ad49e094]:hover {\n    border-color: #38c172;\n}\n.lg\\:hover\\:border-green-light[data-v-ad49e094]:hover {\n    border-color: #51d88a;\n}\n.lg\\:hover\\:border-green-lighter[data-v-ad49e094]:hover {\n    border-color: #a2f5bf;\n}\n.lg\\:hover\\:border-green-lightest[data-v-ad49e094]:hover {\n    border-color: #e3fcec;\n}\n.lg\\:hover\\:border-teal-darkest[data-v-ad49e094]:hover {\n    border-color: #0d3331;\n}\n.lg\\:hover\\:border-teal-darker[data-v-ad49e094]:hover {\n    border-color: #20504f;\n}\n.lg\\:hover\\:border-teal-dark[data-v-ad49e094]:hover {\n    border-color: #38a89d;\n}\n.lg\\:hover\\:border-teal[data-v-ad49e094]:hover {\n    border-color: #4dc0b5;\n}\n.lg\\:hover\\:border-teal-light[data-v-ad49e094]:hover {\n    border-color: #64d5ca;\n}\n.lg\\:hover\\:border-teal-lighter[data-v-ad49e094]:hover {\n    border-color: #a0f0ed;\n}\n.lg\\:hover\\:border-teal-lightest[data-v-ad49e094]:hover {\n    border-color: #e8fffe;\n}\n.lg\\:hover\\:border-blue-darkest[data-v-ad49e094]:hover {\n    border-color: #12283a;\n}\n.lg\\:hover\\:border-blue-darker[data-v-ad49e094]:hover {\n    border-color: #1c3d5a;\n}\n.lg\\:hover\\:border-blue-dark[data-v-ad49e094]:hover {\n    border-color: #2779bd;\n}\n.lg\\:hover\\:border-blue[data-v-ad49e094]:hover {\n    border-color: #3490dc;\n}\n.lg\\:hover\\:border-blue-light[data-v-ad49e094]:hover {\n    border-color: #6cb2eb;\n}\n.lg\\:hover\\:border-blue-lighter[data-v-ad49e094]:hover {\n    border-color: #bcdefa;\n}\n.lg\\:hover\\:border-blue-lightest[data-v-ad49e094]:hover {\n    border-color: #eff8ff;\n}\n.lg\\:hover\\:border-indigo-darkest[data-v-ad49e094]:hover {\n    border-color: #191e38;\n}\n.lg\\:hover\\:border-indigo-darker[data-v-ad49e094]:hover {\n    border-color: #2f365f;\n}\n.lg\\:hover\\:border-indigo-dark[data-v-ad49e094]:hover {\n    border-color: #5661b3;\n}\n.lg\\:hover\\:border-indigo[data-v-ad49e094]:hover {\n    border-color: #6574cd;\n}\n.lg\\:hover\\:border-indigo-light[data-v-ad49e094]:hover {\n    border-color: #7886d7;\n}\n.lg\\:hover\\:border-indigo-lighter[data-v-ad49e094]:hover {\n    border-color: #b2b7ff;\n}\n.lg\\:hover\\:border-indigo-lightest[data-v-ad49e094]:hover {\n    border-color: #e6e8ff;\n}\n.lg\\:hover\\:border-purple-darkest[data-v-ad49e094]:hover {\n    border-color: #21183c;\n}\n.lg\\:hover\\:border-purple-darker[data-v-ad49e094]:hover {\n    border-color: #382b5f;\n}\n.lg\\:hover\\:border-purple-dark[data-v-ad49e094]:hover {\n    border-color: #794acf;\n}\n.lg\\:hover\\:border-purple[data-v-ad49e094]:hover {\n    border-color: #9561e2;\n}\n.lg\\:hover\\:border-purple-light[data-v-ad49e094]:hover {\n    border-color: #a779e9;\n}\n.lg\\:hover\\:border-purple-lighter[data-v-ad49e094]:hover {\n    border-color: #d6bbfc;\n}\n.lg\\:hover\\:border-purple-lightest[data-v-ad49e094]:hover {\n    border-color: #f3ebff;\n}\n.lg\\:hover\\:border-pink-darkest[data-v-ad49e094]:hover {\n    border-color: #451225;\n}\n.lg\\:hover\\:border-pink-darker[data-v-ad49e094]:hover {\n    border-color: #6f213f;\n}\n.lg\\:hover\\:border-pink-dark[data-v-ad49e094]:hover {\n    border-color: #eb5286;\n}\n.lg\\:hover\\:border-pink[data-v-ad49e094]:hover {\n    border-color: #f66d9b;\n}\n.lg\\:hover\\:border-pink-light[data-v-ad49e094]:hover {\n    border-color: #fa7ea8;\n}\n.lg\\:hover\\:border-pink-lighter[data-v-ad49e094]:hover {\n    border-color: #ffbbca;\n}\n.lg\\:hover\\:border-pink-lightest[data-v-ad49e094]:hover {\n    border-color: #ffebef;\n}\n.lg\\:focus\\:border-transparent[data-v-ad49e094]:focus {\n    border-color: transparent;\n}\n.lg\\:focus\\:border-black[data-v-ad49e094]:focus {\n    border-color: #22292f;\n}\n.lg\\:focus\\:border-grey-darkest[data-v-ad49e094]:focus {\n    border-color: #3d4852;\n}\n.lg\\:focus\\:border-grey-darker[data-v-ad49e094]:focus {\n    border-color: #606f7b;\n}\n.lg\\:focus\\:border-grey-dark[data-v-ad49e094]:focus {\n    border-color: #8795a1;\n}\n.lg\\:focus\\:border-grey[data-v-ad49e094]:focus {\n    border-color: #b8c2cc;\n}\n.lg\\:focus\\:border-grey-light[data-v-ad49e094]:focus {\n    border-color: #dae1e7;\n}\n.lg\\:focus\\:border-grey-lighter[data-v-ad49e094]:focus {\n    border-color: #f1f5f8;\n}\n.lg\\:focus\\:border-grey-lightest[data-v-ad49e094]:focus {\n    border-color: #f8fafc;\n}\n.lg\\:focus\\:border-white[data-v-ad49e094]:focus {\n    border-color: #fff;\n}\n.lg\\:focus\\:border-red-darkest[data-v-ad49e094]:focus {\n    border-color: #3b0d0c;\n}\n.lg\\:focus\\:border-red-darker[data-v-ad49e094]:focus {\n    border-color: #621b18;\n}\n.lg\\:focus\\:border-red-dark[data-v-ad49e094]:focus {\n    border-color: #cc1f1a;\n}\n.lg\\:focus\\:border-red[data-v-ad49e094]:focus {\n    border-color: #e3342f;\n}\n.lg\\:focus\\:border-red-light[data-v-ad49e094]:focus {\n    border-color: #ef5753;\n}\n.lg\\:focus\\:border-red-lighter[data-v-ad49e094]:focus {\n    border-color: #f9acaa;\n}\n.lg\\:focus\\:border-red-lightest[data-v-ad49e094]:focus {\n    border-color: #fcebea;\n}\n.lg\\:focus\\:border-orange-darkest[data-v-ad49e094]:focus {\n    border-color: #462a16;\n}\n.lg\\:focus\\:border-orange-darker[data-v-ad49e094]:focus {\n    border-color: #613b1f;\n}\n.lg\\:focus\\:border-orange-dark[data-v-ad49e094]:focus {\n    border-color: #de751f;\n}\n.lg\\:focus\\:border-orange[data-v-ad49e094]:focus {\n    border-color: #f6993f;\n}\n.lg\\:focus\\:border-orange-light[data-v-ad49e094]:focus {\n    border-color: #faad63;\n}\n.lg\\:focus\\:border-orange-lighter[data-v-ad49e094]:focus {\n    border-color: #fcd9b6;\n}\n.lg\\:focus\\:border-orange-lightest[data-v-ad49e094]:focus {\n    border-color: #fff5eb;\n}\n.lg\\:focus\\:border-yellow-darkest[data-v-ad49e094]:focus {\n    border-color: #453411;\n}\n.lg\\:focus\\:border-yellow-darker[data-v-ad49e094]:focus {\n    border-color: #684f1d;\n}\n.lg\\:focus\\:border-yellow-dark[data-v-ad49e094]:focus {\n    border-color: #f2d024;\n}\n.lg\\:focus\\:border-yellow[data-v-ad49e094]:focus {\n    border-color: #ffed4a;\n}\n.lg\\:focus\\:border-yellow-light[data-v-ad49e094]:focus {\n    border-color: #fff382;\n}\n.lg\\:focus\\:border-yellow-lighter[data-v-ad49e094]:focus {\n    border-color: #fff9c2;\n}\n.lg\\:focus\\:border-yellow-lightest[data-v-ad49e094]:focus {\n    border-color: #fcfbeb;\n}\n.lg\\:focus\\:border-green-darkest[data-v-ad49e094]:focus {\n    border-color: #0f2f21;\n}\n.lg\\:focus\\:border-green-darker[data-v-ad49e094]:focus {\n    border-color: #1a4731;\n}\n.lg\\:focus\\:border-green-dark[data-v-ad49e094]:focus {\n    border-color: #1f9d55;\n}\n.lg\\:focus\\:border-green[data-v-ad49e094]:focus {\n    border-color: #38c172;\n}\n.lg\\:focus\\:border-green-light[data-v-ad49e094]:focus {\n    border-color: #51d88a;\n}\n.lg\\:focus\\:border-green-lighter[data-v-ad49e094]:focus {\n    border-color: #a2f5bf;\n}\n.lg\\:focus\\:border-green-lightest[data-v-ad49e094]:focus {\n    border-color: #e3fcec;\n}\n.lg\\:focus\\:border-teal-darkest[data-v-ad49e094]:focus {\n    border-color: #0d3331;\n}\n.lg\\:focus\\:border-teal-darker[data-v-ad49e094]:focus {\n    border-color: #20504f;\n}\n.lg\\:focus\\:border-teal-dark[data-v-ad49e094]:focus {\n    border-color: #38a89d;\n}\n.lg\\:focus\\:border-teal[data-v-ad49e094]:focus {\n    border-color: #4dc0b5;\n}\n.lg\\:focus\\:border-teal-light[data-v-ad49e094]:focus {\n    border-color: #64d5ca;\n}\n.lg\\:focus\\:border-teal-lighter[data-v-ad49e094]:focus {\n    border-color: #a0f0ed;\n}\n.lg\\:focus\\:border-teal-lightest[data-v-ad49e094]:focus {\n    border-color: #e8fffe;\n}\n.lg\\:focus\\:border-blue-darkest[data-v-ad49e094]:focus {\n    border-color: #12283a;\n}\n.lg\\:focus\\:border-blue-darker[data-v-ad49e094]:focus {\n    border-color: #1c3d5a;\n}\n.lg\\:focus\\:border-blue-dark[data-v-ad49e094]:focus {\n    border-color: #2779bd;\n}\n.lg\\:focus\\:border-blue[data-v-ad49e094]:focus {\n    border-color: #3490dc;\n}\n.lg\\:focus\\:border-blue-light[data-v-ad49e094]:focus {\n    border-color: #6cb2eb;\n}\n.lg\\:focus\\:border-blue-lighter[data-v-ad49e094]:focus {\n    border-color: #bcdefa;\n}\n.lg\\:focus\\:border-blue-lightest[data-v-ad49e094]:focus {\n    border-color: #eff8ff;\n}\n.lg\\:focus\\:border-indigo-darkest[data-v-ad49e094]:focus {\n    border-color: #191e38;\n}\n.lg\\:focus\\:border-indigo-darker[data-v-ad49e094]:focus {\n    border-color: #2f365f;\n}\n.lg\\:focus\\:border-indigo-dark[data-v-ad49e094]:focus {\n    border-color: #5661b3;\n}\n.lg\\:focus\\:border-indigo[data-v-ad49e094]:focus {\n    border-color: #6574cd;\n}\n.lg\\:focus\\:border-indigo-light[data-v-ad49e094]:focus {\n    border-color: #7886d7;\n}\n.lg\\:focus\\:border-indigo-lighter[data-v-ad49e094]:focus {\n    border-color: #b2b7ff;\n}\n.lg\\:focus\\:border-indigo-lightest[data-v-ad49e094]:focus {\n    border-color: #e6e8ff;\n}\n.lg\\:focus\\:border-purple-darkest[data-v-ad49e094]:focus {\n    border-color: #21183c;\n}\n.lg\\:focus\\:border-purple-darker[data-v-ad49e094]:focus {\n    border-color: #382b5f;\n}\n.lg\\:focus\\:border-purple-dark[data-v-ad49e094]:focus {\n    border-color: #794acf;\n}\n.lg\\:focus\\:border-purple[data-v-ad49e094]:focus {\n    border-color: #9561e2;\n}\n.lg\\:focus\\:border-purple-light[data-v-ad49e094]:focus {\n    border-color: #a779e9;\n}\n.lg\\:focus\\:border-purple-lighter[data-v-ad49e094]:focus {\n    border-color: #d6bbfc;\n}\n.lg\\:focus\\:border-purple-lightest[data-v-ad49e094]:focus {\n    border-color: #f3ebff;\n}\n.lg\\:focus\\:border-pink-darkest[data-v-ad49e094]:focus {\n    border-color: #451225;\n}\n.lg\\:focus\\:border-pink-darker[data-v-ad49e094]:focus {\n    border-color: #6f213f;\n}\n.lg\\:focus\\:border-pink-dark[data-v-ad49e094]:focus {\n    border-color: #eb5286;\n}\n.lg\\:focus\\:border-pink[data-v-ad49e094]:focus {\n    border-color: #f66d9b;\n}\n.lg\\:focus\\:border-pink-light[data-v-ad49e094]:focus {\n    border-color: #fa7ea8;\n}\n.lg\\:focus\\:border-pink-lighter[data-v-ad49e094]:focus {\n    border-color: #ffbbca;\n}\n.lg\\:focus\\:border-pink-lightest[data-v-ad49e094]:focus {\n    border-color: #ffebef;\n}\n.lg\\:rounded-none[data-v-ad49e094] {\n    border-radius: 0;\n}\n.lg\\:rounded-sm[data-v-ad49e094] {\n    border-radius: .125rem;\n}\n.lg\\:rounded[data-v-ad49e094] {\n    border-radius: .25rem;\n}\n.lg\\:rounded-lg[data-v-ad49e094] {\n    border-radius: .5rem;\n}\n.lg\\:rounded-full[data-v-ad49e094] {\n    border-radius: 9999px;\n}\n.lg\\:rounded-t-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n.lg\\:rounded-r-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.lg\\:rounded-b-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.lg\\:rounded-l-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.lg\\:rounded-t-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n}\n.lg\\:rounded-r-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n}\n.lg\\:rounded-b-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.lg\\:rounded-l-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.lg\\:rounded-t[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n}\n.lg\\:rounded-r[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n}\n.lg\\:rounded-b[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.lg\\:rounded-l[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.lg\\:rounded-t-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n}\n.lg\\:rounded-r-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n}\n.lg\\:rounded-b-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.lg\\:rounded-l-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.lg\\:rounded-t-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n}\n.lg\\:rounded-r-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n}\n.lg\\:rounded-b-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.lg\\:rounded-l-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.lg\\:rounded-tl-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n}\n.lg\\:rounded-tr-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n}\n.lg\\:rounded-br-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n}\n.lg\\:rounded-bl-none[data-v-ad49e094] {\n    border-bottom-left-radius: 0;\n}\n.lg\\:rounded-tl-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n}\n.lg\\:rounded-tr-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n}\n.lg\\:rounded-br-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n}\n.lg\\:rounded-bl-sm[data-v-ad49e094] {\n    border-bottom-left-radius: .125rem;\n}\n.lg\\:rounded-tl[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n}\n.lg\\:rounded-tr[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n}\n.lg\\:rounded-br[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n}\n.lg\\:rounded-bl[data-v-ad49e094] {\n    border-bottom-left-radius: .25rem;\n}\n.lg\\:rounded-tl-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n}\n.lg\\:rounded-tr-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n}\n.lg\\:rounded-br-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n}\n.lg\\:rounded-bl-lg[data-v-ad49e094] {\n    border-bottom-left-radius: .5rem;\n}\n.lg\\:rounded-tl-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n}\n.lg\\:rounded-tr-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n}\n.lg\\:rounded-br-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n}\n.lg\\:rounded-bl-full[data-v-ad49e094] {\n    border-bottom-left-radius: 9999px;\n}\n.lg\\:border-solid[data-v-ad49e094] {\n    border-style: solid;\n}\n.lg\\:border-dashed[data-v-ad49e094] {\n    border-style: dashed;\n}\n.lg\\:border-dotted[data-v-ad49e094] {\n    border-style: dotted;\n}\n.lg\\:border-none[data-v-ad49e094] {\n    border-style: none;\n}\n.lg\\:border-0[data-v-ad49e094] {\n    border-width: 0;\n}\n.lg\\:border-2[data-v-ad49e094] {\n    border-width: 2px;\n}\n.lg\\:border-4[data-v-ad49e094] {\n    border-width: 4px;\n}\n.lg\\:border-8[data-v-ad49e094] {\n    border-width: 8px;\n}\n.lg\\:border[data-v-ad49e094] {\n    border-width: 1px;\n}\n.lg\\:border-t-0[data-v-ad49e094] {\n    border-top-width: 0;\n}\n.lg\\:border-r-0[data-v-ad49e094] {\n    border-right-width: 0;\n}\n.lg\\:border-b-0[data-v-ad49e094] {\n    border-bottom-width: 0;\n}\n.lg\\:border-l-0[data-v-ad49e094] {\n    border-left-width: 0;\n}\n.lg\\:border-t-2[data-v-ad49e094] {\n    border-top-width: 2px;\n}\n.lg\\:border-r-2[data-v-ad49e094] {\n    border-right-width: 2px;\n}\n.lg\\:border-b-2[data-v-ad49e094] {\n    border-bottom-width: 2px;\n}\n.lg\\:border-l-2[data-v-ad49e094] {\n    border-left-width: 2px;\n}\n.lg\\:border-t-4[data-v-ad49e094] {\n    border-top-width: 4px;\n}\n.lg\\:border-r-4[data-v-ad49e094] {\n    border-right-width: 4px;\n}\n.lg\\:border-b-4[data-v-ad49e094] {\n    border-bottom-width: 4px;\n}\n.lg\\:border-l-4[data-v-ad49e094] {\n    border-left-width: 4px;\n}\n.lg\\:border-t-8[data-v-ad49e094] {\n    border-top-width: 8px;\n}\n.lg\\:border-r-8[data-v-ad49e094] {\n    border-right-width: 8px;\n}\n.lg\\:border-b-8[data-v-ad49e094] {\n    border-bottom-width: 8px;\n}\n.lg\\:border-l-8[data-v-ad49e094] {\n    border-left-width: 8px;\n}\n.lg\\:border-t[data-v-ad49e094] {\n    border-top-width: 1px;\n}\n.lg\\:border-r[data-v-ad49e094] {\n    border-right-width: 1px;\n}\n.lg\\:border-b[data-v-ad49e094] {\n    border-bottom-width: 1px;\n}\n.lg\\:border-l[data-v-ad49e094] {\n    border-left-width: 1px;\n}\n.lg\\:cursor-auto[data-v-ad49e094] {\n    cursor: auto;\n}\n.lg\\:cursor-default[data-v-ad49e094] {\n    cursor: default;\n}\n.lg\\:cursor-pointer[data-v-ad49e094] {\n    cursor: pointer;\n}\n.lg\\:cursor-wait[data-v-ad49e094] {\n    cursor: wait;\n}\n.lg\\:cursor-move[data-v-ad49e094] {\n    cursor: move;\n}\n.lg\\:cursor-not-allowed[data-v-ad49e094] {\n    cursor: not-allowed;\n}\n.lg\\:block[data-v-ad49e094] {\n    display: block;\n}\n.lg\\:inline-block[data-v-ad49e094] {\n    display: inline-block;\n}\n.lg\\:inline[data-v-ad49e094] {\n    display: inline;\n}\n.lg\\:table[data-v-ad49e094] {\n    display: table;\n}\n.lg\\:table-row[data-v-ad49e094] {\n    display: table-row;\n}\n.lg\\:table-cell[data-v-ad49e094] {\n    display: table-cell;\n}\n.lg\\:hidden[data-v-ad49e094] {\n    display: none;\n}\n.lg\\:flex[data-v-ad49e094] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.lg\\:inline-flex[data-v-ad49e094] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.lg\\:flex-row[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n.lg\\:flex-row-reverse[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n}\n.lg\\:flex-col[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.lg\\:flex-col-reverse[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n}\n.lg\\:flex-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.lg\\:flex-wrap-reverse[data-v-ad49e094] {\n    -ms-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n}\n.lg\\:flex-no-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n.lg\\:items-start[data-v-ad49e094] {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.lg\\:items-end[data-v-ad49e094] {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.lg\\:items-center[data-v-ad49e094] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.lg\\:items-baseline[data-v-ad49e094] {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.lg\\:items-stretch[data-v-ad49e094] {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n}\n.lg\\:self-auto[data-v-ad49e094] {\n    -ms-flex-item-align: auto;\n        align-self: auto;\n}\n.lg\\:self-start[data-v-ad49e094] {\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n}\n.lg\\:self-end[data-v-ad49e094] {\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n.lg\\:self-center[data-v-ad49e094] {\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n.lg\\:self-stretch[data-v-ad49e094] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n}\n.lg\\:justify-start[data-v-ad49e094] {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.lg\\:justify-end[data-v-ad49e094] {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.lg\\:justify-center[data-v-ad49e094] {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.lg\\:justify-between[data-v-ad49e094] {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.lg\\:justify-around[data-v-ad49e094] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.lg\\:content-center[data-v-ad49e094] {\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n.lg\\:content-start[data-v-ad49e094] {\n    -ms-flex-line-pack: start;\n        align-content: flex-start;\n}\n.lg\\:content-end[data-v-ad49e094] {\n    -ms-flex-line-pack: end;\n        align-content: flex-end;\n}\n.lg\\:content-between[data-v-ad49e094] {\n    -ms-flex-line-pack: justify;\n        align-content: space-between;\n}\n.lg\\:content-around[data-v-ad49e094] {\n    -ms-flex-line-pack: distribute;\n        align-content: space-around;\n}\n.lg\\:flex-1[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.lg\\:flex-auto[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: auto;\n            flex: auto;\n}\n.lg\\:flex-initial[data-v-ad49e094] {\n    -webkit-box-flex: initial;\n        -ms-flex: initial;\n            flex: initial;\n}\n.lg\\:flex-none[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n}\n.lg\\:flex-grow[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.lg\\:flex-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n}\n.lg\\:flex-no-grow[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n.lg\\:flex-no-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.lg\\:float-right[data-v-ad49e094] {\n    float: right;\n}\n.lg\\:float-left[data-v-ad49e094] {\n    float: left;\n}\n.lg\\:float-none[data-v-ad49e094] {\n    float: none;\n}\n.lg\\:clearfix[data-v-ad49e094]:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n.lg\\:font-sans[data-v-ad49e094] {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n.lg\\:font-serif[data-v-ad49e094] {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n.lg\\:font-mono[data-v-ad49e094] {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n.lg\\:font-hairline[data-v-ad49e094] {\n    font-weight: 100;\n}\n.lg\\:font-thin[data-v-ad49e094] {\n    font-weight: 200;\n}\n.lg\\:font-light[data-v-ad49e094] {\n    font-weight: 300;\n}\n.lg\\:font-normal[data-v-ad49e094] {\n    font-weight: 400;\n}\n.lg\\:font-medium[data-v-ad49e094] {\n    font-weight: 500;\n}\n.lg\\:font-semibold[data-v-ad49e094] {\n    font-weight: 600;\n}\n.lg\\:font-bold[data-v-ad49e094] {\n    font-weight: 700;\n}\n.lg\\:font-extrabold[data-v-ad49e094] {\n    font-weight: 800;\n}\n.lg\\:font-black[data-v-ad49e094] {\n    font-weight: 900;\n}\n.lg\\:hover\\:font-hairline[data-v-ad49e094]:hover {\n    font-weight: 100;\n}\n.lg\\:hover\\:font-thin[data-v-ad49e094]:hover {\n    font-weight: 200;\n}\n.lg\\:hover\\:font-light[data-v-ad49e094]:hover {\n    font-weight: 300;\n}\n.lg\\:hover\\:font-normal[data-v-ad49e094]:hover {\n    font-weight: 400;\n}\n.lg\\:hover\\:font-medium[data-v-ad49e094]:hover {\n    font-weight: 500;\n}\n.lg\\:hover\\:font-semibold[data-v-ad49e094]:hover {\n    font-weight: 600;\n}\n.lg\\:hover\\:font-bold[data-v-ad49e094]:hover {\n    font-weight: 700;\n}\n.lg\\:hover\\:font-extrabold[data-v-ad49e094]:hover {\n    font-weight: 800;\n}\n.lg\\:hover\\:font-black[data-v-ad49e094]:hover {\n    font-weight: 900;\n}\n.lg\\:focus\\:font-hairline[data-v-ad49e094]:focus {\n    font-weight: 100;\n}\n.lg\\:focus\\:font-thin[data-v-ad49e094]:focus {\n    font-weight: 200;\n}\n.lg\\:focus\\:font-light[data-v-ad49e094]:focus {\n    font-weight: 300;\n}\n.lg\\:focus\\:font-normal[data-v-ad49e094]:focus {\n    font-weight: 400;\n}\n.lg\\:focus\\:font-medium[data-v-ad49e094]:focus {\n    font-weight: 500;\n}\n.lg\\:focus\\:font-semibold[data-v-ad49e094]:focus {\n    font-weight: 600;\n}\n.lg\\:focus\\:font-bold[data-v-ad49e094]:focus {\n    font-weight: 700;\n}\n.lg\\:focus\\:font-extrabold[data-v-ad49e094]:focus {\n    font-weight: 800;\n}\n.lg\\:focus\\:font-black[data-v-ad49e094]:focus {\n    font-weight: 900;\n}\n.lg\\:h-1[data-v-ad49e094] {\n    height: .25rem;\n}\n.lg\\:h-2[data-v-ad49e094] {\n    height: .5rem;\n}\n.lg\\:h-3[data-v-ad49e094] {\n    height: .75rem;\n}\n.lg\\:h-4[data-v-ad49e094] {\n    height: 1rem;\n}\n.lg\\:h-5[data-v-ad49e094] {\n    height: 1.25rem;\n}\n.lg\\:h-6[data-v-ad49e094] {\n    height: 1.5rem;\n}\n.lg\\:h-8[data-v-ad49e094] {\n    height: 2rem;\n}\n.lg\\:h-10[data-v-ad49e094] {\n    height: 2.5rem;\n}\n.lg\\:h-12[data-v-ad49e094] {\n    height: 3rem;\n}\n.lg\\:h-16[data-v-ad49e094] {\n    height: 4rem;\n}\n.lg\\:h-24[data-v-ad49e094] {\n    height: 6rem;\n}\n.lg\\:h-32[data-v-ad49e094] {\n    height: 8rem;\n}\n.lg\\:h-48[data-v-ad49e094] {\n    height: 12rem;\n}\n.lg\\:h-64[data-v-ad49e094] {\n    height: 16rem;\n}\n.lg\\:h-auto[data-v-ad49e094] {\n    height: auto;\n}\n.lg\\:h-px[data-v-ad49e094] {\n    height: 1px;\n}\n.lg\\:h-full[data-v-ad49e094] {\n    height: 100%;\n}\n.lg\\:h-screen[data-v-ad49e094] {\n    height: 100vh;\n}\n.lg\\:leading-none[data-v-ad49e094] {\n    line-height: 1;\n}\n.lg\\:leading-tight[data-v-ad49e094] {\n    line-height: 1.25;\n}\n.lg\\:leading-normal[data-v-ad49e094] {\n    line-height: 1.5;\n}\n.lg\\:leading-loose[data-v-ad49e094] {\n    line-height: 2;\n}\n.lg\\:m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.lg\\:m-1[data-v-ad49e094] {\n    margin: .25rem;\n}\n.lg\\:m-2[data-v-ad49e094] {\n    margin: .5rem;\n}\n.lg\\:m-3[data-v-ad49e094] {\n    margin: .75rem;\n}\n.lg\\:m-4[data-v-ad49e094] {\n    margin: 1rem;\n}\n.lg\\:m-5[data-v-ad49e094] {\n    margin: 1.25rem;\n}\n.lg\\:m-6[data-v-ad49e094] {\n    margin: 1.5rem;\n}\n.lg\\:m-8[data-v-ad49e094] {\n    margin: 2rem;\n}\n.lg\\:m-10[data-v-ad49e094] {\n    margin: 2.5rem;\n}\n.lg\\:m-12[data-v-ad49e094] {\n    margin: 3rem;\n}\n.lg\\:m-16[data-v-ad49e094] {\n    margin: 4rem;\n}\n.lg\\:m-20[data-v-ad49e094] {\n    margin: 5rem;\n}\n.lg\\:m-24[data-v-ad49e094] {\n    margin: 6rem;\n}\n.lg\\:m-32[data-v-ad49e094] {\n    margin: 8rem;\n}\n.lg\\:m-auto[data-v-ad49e094] {\n    margin: auto;\n}\n.lg\\:m-px[data-v-ad49e094] {\n    margin: 1px;\n}\n.lg\\:my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.lg\\:mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.lg\\:my-1[data-v-ad49e094] {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n}\n.lg\\:mx-1[data-v-ad49e094] {\n    margin-left: .25rem;\n    margin-right: .25rem;\n}\n.lg\\:my-2[data-v-ad49e094] {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n}\n.lg\\:mx-2[data-v-ad49e094] {\n    margin-left: .5rem;\n    margin-right: .5rem;\n}\n.lg\\:my-3[data-v-ad49e094] {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n}\n.lg\\:mx-3[data-v-ad49e094] {\n    margin-left: .75rem;\n    margin-right: .75rem;\n}\n.lg\\:my-4[data-v-ad49e094] {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n}\n.lg\\:mx-4[data-v-ad49e094] {\n    margin-left: 1rem;\n    margin-right: 1rem;\n}\n.lg\\:my-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n.lg\\:mx-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n    margin-right: 1.25rem;\n}\n.lg\\:my-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n}\n.lg\\:mx-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n}\n.lg\\:my-8[data-v-ad49e094] {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n}\n.lg\\:mx-8[data-v-ad49e094] {\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n.lg\\:my-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n    margin-bottom: 2.5rem;\n}\n.lg\\:mx-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n    margin-right: 2.5rem;\n}\n.lg\\:my-12[data-v-ad49e094] {\n    margin-top: 3rem;\n    margin-bottom: 3rem;\n}\n.lg\\:mx-12[data-v-ad49e094] {\n    margin-left: 3rem;\n    margin-right: 3rem;\n}\n.lg\\:my-16[data-v-ad49e094] {\n    margin-top: 4rem;\n    margin-bottom: 4rem;\n}\n.lg\\:mx-16[data-v-ad49e094] {\n    margin-left: 4rem;\n    margin-right: 4rem;\n}\n.lg\\:my-20[data-v-ad49e094] {\n    margin-top: 5rem;\n    margin-bottom: 5rem;\n}\n.lg\\:mx-20[data-v-ad49e094] {\n    margin-left: 5rem;\n    margin-right: 5rem;\n}\n.lg\\:my-24[data-v-ad49e094] {\n    margin-top: 6rem;\n    margin-bottom: 6rem;\n}\n.lg\\:mx-24[data-v-ad49e094] {\n    margin-left: 6rem;\n    margin-right: 6rem;\n}\n.lg\\:my-32[data-v-ad49e094] {\n    margin-top: 8rem;\n    margin-bottom: 8rem;\n}\n.lg\\:mx-32[data-v-ad49e094] {\n    margin-left: 8rem;\n    margin-right: 8rem;\n}\n.lg\\:my-auto[data-v-ad49e094] {\n    margin-top: auto;\n    margin-bottom: auto;\n}\n.lg\\:mx-auto[data-v-ad49e094] {\n    margin-left: auto;\n    margin-right: auto;\n}\n.lg\\:my-px[data-v-ad49e094] {\n    margin-top: 1px;\n    margin-bottom: 1px;\n}\n.lg\\:mx-px[data-v-ad49e094] {\n    margin-left: 1px;\n    margin-right: 1px;\n}\n.lg\\:mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.lg\\:mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.lg\\:mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.lg\\:ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.lg\\:mt-1[data-v-ad49e094] {\n    margin-top: .25rem;\n}\n.lg\\:mr-1[data-v-ad49e094] {\n    margin-right: .25rem;\n}\n.lg\\:mb-1[data-v-ad49e094] {\n    margin-bottom: .25rem;\n}\n.lg\\:ml-1[data-v-ad49e094] {\n    margin-left: .25rem;\n}\n.lg\\:mt-2[data-v-ad49e094] {\n    margin-top: .5rem;\n}\n.lg\\:mr-2[data-v-ad49e094] {\n    margin-right: .5rem;\n}\n.lg\\:mb-2[data-v-ad49e094] {\n    margin-bottom: .5rem;\n}\n.lg\\:ml-2[data-v-ad49e094] {\n    margin-left: .5rem;\n}\n.lg\\:mt-3[data-v-ad49e094] {\n    margin-top: .75rem;\n}\n.lg\\:mr-3[data-v-ad49e094] {\n    margin-right: .75rem;\n}\n.lg\\:mb-3[data-v-ad49e094] {\n    margin-bottom: .75rem;\n}\n.lg\\:ml-3[data-v-ad49e094] {\n    margin-left: .75rem;\n}\n.lg\\:mt-4[data-v-ad49e094] {\n    margin-top: 1rem;\n}\n.lg\\:mr-4[data-v-ad49e094] {\n    margin-right: 1rem;\n}\n.lg\\:mb-4[data-v-ad49e094] {\n    margin-bottom: 1rem;\n}\n.lg\\:ml-4[data-v-ad49e094] {\n    margin-left: 1rem;\n}\n.lg\\:mt-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n}\n.lg\\:mr-5[data-v-ad49e094] {\n    margin-right: 1.25rem;\n}\n.lg\\:mb-5[data-v-ad49e094] {\n    margin-bottom: 1.25rem;\n}\n.lg\\:ml-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n}\n.lg\\:mt-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n}\n.lg\\:mr-6[data-v-ad49e094] {\n    margin-right: 1.5rem;\n}\n.lg\\:mb-6[data-v-ad49e094] {\n    margin-bottom: 1.5rem;\n}\n.lg\\:ml-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n}\n.lg\\:mt-8[data-v-ad49e094] {\n    margin-top: 2rem;\n}\n.lg\\:mr-8[data-v-ad49e094] {\n    margin-right: 2rem;\n}\n.lg\\:mb-8[data-v-ad49e094] {\n    margin-bottom: 2rem;\n}\n.lg\\:ml-8[data-v-ad49e094] {\n    margin-left: 2rem;\n}\n.lg\\:mt-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n}\n.lg\\:mr-10[data-v-ad49e094] {\n    margin-right: 2.5rem;\n}\n.lg\\:mb-10[data-v-ad49e094] {\n    margin-bottom: 2.5rem;\n}\n.lg\\:ml-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n}\n.lg\\:mt-12[data-v-ad49e094] {\n    margin-top: 3rem;\n}\n.lg\\:mr-12[data-v-ad49e094] {\n    margin-right: 3rem;\n}\n.lg\\:mb-12[data-v-ad49e094] {\n    margin-bottom: 3rem;\n}\n.lg\\:ml-12[data-v-ad49e094] {\n    margin-left: 3rem;\n}\n.lg\\:mt-16[data-v-ad49e094] {\n    margin-top: 4rem;\n}\n.lg\\:mr-16[data-v-ad49e094] {\n    margin-right: 4rem;\n}\n.lg\\:mb-16[data-v-ad49e094] {\n    margin-bottom: 4rem;\n}\n.lg\\:ml-16[data-v-ad49e094] {\n    margin-left: 4rem;\n}\n.lg\\:mt-20[data-v-ad49e094] {\n    margin-top: 5rem;\n}\n.lg\\:mr-20[data-v-ad49e094] {\n    margin-right: 5rem;\n}\n.lg\\:mb-20[data-v-ad49e094] {\n    margin-bottom: 5rem;\n}\n.lg\\:ml-20[data-v-ad49e094] {\n    margin-left: 5rem;\n}\n.lg\\:mt-24[data-v-ad49e094] {\n    margin-top: 6rem;\n}\n.lg\\:mr-24[data-v-ad49e094] {\n    margin-right: 6rem;\n}\n.lg\\:mb-24[data-v-ad49e094] {\n    margin-bottom: 6rem;\n}\n.lg\\:ml-24[data-v-ad49e094] {\n    margin-left: 6rem;\n}\n.lg\\:mt-32[data-v-ad49e094] {\n    margin-top: 8rem;\n}\n.lg\\:mr-32[data-v-ad49e094] {\n    margin-right: 8rem;\n}\n.lg\\:mb-32[data-v-ad49e094] {\n    margin-bottom: 8rem;\n}\n.lg\\:ml-32[data-v-ad49e094] {\n    margin-left: 8rem;\n}\n.lg\\:mt-auto[data-v-ad49e094] {\n    margin-top: auto;\n}\n.lg\\:mr-auto[data-v-ad49e094] {\n    margin-right: auto;\n}\n.lg\\:mb-auto[data-v-ad49e094] {\n    margin-bottom: auto;\n}\n.lg\\:ml-auto[data-v-ad49e094] {\n    margin-left: auto;\n}\n.lg\\:mt-px[data-v-ad49e094] {\n    margin-top: 1px;\n}\n.lg\\:mr-px[data-v-ad49e094] {\n    margin-right: 1px;\n}\n.lg\\:mb-px[data-v-ad49e094] {\n    margin-bottom: 1px;\n}\n.lg\\:ml-px[data-v-ad49e094] {\n    margin-left: 1px;\n}\n.lg\\:max-h-full[data-v-ad49e094] {\n    max-height: 100%;\n}\n.lg\\:max-h-screen[data-v-ad49e094] {\n    max-height: 100vh;\n}\n.lg\\:max-w-xs[data-v-ad49e094] {\n    max-width: 20rem;\n}\n.lg\\:max-w-sm[data-v-ad49e094] {\n    max-width: 30rem;\n}\n.lg\\:max-w-md[data-v-ad49e094] {\n    max-width: 40rem;\n}\n.lg\\:max-w-lg[data-v-ad49e094] {\n    max-width: 50rem;\n}\n.lg\\:max-w-xl[data-v-ad49e094] {\n    max-width: 60rem;\n}\n.lg\\:max-w-2xl[data-v-ad49e094] {\n    max-width: 70rem;\n}\n.lg\\:max-w-3xl[data-v-ad49e094] {\n    max-width: 80rem;\n}\n.lg\\:max-w-4xl[data-v-ad49e094] {\n    max-width: 90rem;\n}\n.lg\\:max-w-5xl[data-v-ad49e094] {\n    max-width: 100rem;\n}\n.lg\\:max-w-full[data-v-ad49e094] {\n    max-width: 100%;\n}\n.lg\\:min-h-0[data-v-ad49e094] {\n    min-height: 0;\n}\n.lg\\:min-h-full[data-v-ad49e094] {\n    min-height: 100%;\n}\n.lg\\:min-h-screen[data-v-ad49e094] {\n    min-height: 100vh;\n}\n.lg\\:min-w-0[data-v-ad49e094] {\n    min-width: 0;\n}\n.lg\\:min-w-full[data-v-ad49e094] {\n    min-width: 100%;\n}\n.lg\\:-m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.lg\\:-m-1[data-v-ad49e094] {\n    margin: -0.25rem;\n}\n.lg\\:-m-2[data-v-ad49e094] {\n    margin: -0.5rem;\n}\n.lg\\:-m-3[data-v-ad49e094] {\n    margin: -0.75rem;\n}\n.lg\\:-m-4[data-v-ad49e094] {\n    margin: -1rem;\n}\n.lg\\:-m-5[data-v-ad49e094] {\n    margin: -1.25rem;\n}\n.lg\\:-m-6[data-v-ad49e094] {\n    margin: -1.5rem;\n}\n.lg\\:-m-8[data-v-ad49e094] {\n    margin: -2rem;\n}\n.lg\\:-m-10[data-v-ad49e094] {\n    margin: -2.5rem;\n}\n.lg\\:-m-12[data-v-ad49e094] {\n    margin: -3rem;\n}\n.lg\\:-m-16[data-v-ad49e094] {\n    margin: -4rem;\n}\n.lg\\:-m-20[data-v-ad49e094] {\n    margin: -5rem;\n}\n.lg\\:-m-24[data-v-ad49e094] {\n    margin: -6rem;\n}\n.lg\\:-m-32[data-v-ad49e094] {\n    margin: -8rem;\n}\n.lg\\:-m-px[data-v-ad49e094] {\n    margin: -1px;\n}\n.lg\\:-my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.lg\\:-mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.lg\\:-my-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n}\n.lg\\:-mx-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n}\n.lg\\:-my-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n}\n.lg\\:-mx-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n}\n.lg\\:-my-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n}\n.lg\\:-mx-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n}\n.lg\\:-my-4[data-v-ad49e094] {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n}\n.lg\\:-mx-4[data-v-ad49e094] {\n    margin-left: -1rem;\n    margin-right: -1rem;\n}\n.lg\\:-my-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n    margin-bottom: -1.25rem;\n}\n.lg\\:-mx-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n    margin-right: -1.25rem;\n}\n.lg\\:-my-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n}\n.lg\\:-mx-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n}\n.lg\\:-my-8[data-v-ad49e094] {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n}\n.lg\\:-mx-8[data-v-ad49e094] {\n    margin-left: -2rem;\n    margin-right: -2rem;\n}\n.lg\\:-my-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n    margin-bottom: -2.5rem;\n}\n.lg\\:-mx-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n    margin-right: -2.5rem;\n}\n.lg\\:-my-12[data-v-ad49e094] {\n    margin-top: -3rem;\n    margin-bottom: -3rem;\n}\n.lg\\:-mx-12[data-v-ad49e094] {\n    margin-left: -3rem;\n    margin-right: -3rem;\n}\n.lg\\:-my-16[data-v-ad49e094] {\n    margin-top: -4rem;\n    margin-bottom: -4rem;\n}\n.lg\\:-mx-16[data-v-ad49e094] {\n    margin-left: -4rem;\n    margin-right: -4rem;\n}\n.lg\\:-my-20[data-v-ad49e094] {\n    margin-top: -5rem;\n    margin-bottom: -5rem;\n}\n.lg\\:-mx-20[data-v-ad49e094] {\n    margin-left: -5rem;\n    margin-right: -5rem;\n}\n.lg\\:-my-24[data-v-ad49e094] {\n    margin-top: -6rem;\n    margin-bottom: -6rem;\n}\n.lg\\:-mx-24[data-v-ad49e094] {\n    margin-left: -6rem;\n    margin-right: -6rem;\n}\n.lg\\:-my-32[data-v-ad49e094] {\n    margin-top: -8rem;\n    margin-bottom: -8rem;\n}\n.lg\\:-mx-32[data-v-ad49e094] {\n    margin-left: -8rem;\n    margin-right: -8rem;\n}\n.lg\\:-my-px[data-v-ad49e094] {\n    margin-top: -1px;\n    margin-bottom: -1px;\n}\n.lg\\:-mx-px[data-v-ad49e094] {\n    margin-left: -1px;\n    margin-right: -1px;\n}\n.lg\\:-mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.lg\\:-mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.lg\\:-mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.lg\\:-ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.lg\\:-mt-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n}\n.lg\\:-mr-1[data-v-ad49e094] {\n    margin-right: -0.25rem;\n}\n.lg\\:-mb-1[data-v-ad49e094] {\n    margin-bottom: -0.25rem;\n}\n.lg\\:-ml-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n}\n.lg\\:-mt-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n}\n.lg\\:-mr-2[data-v-ad49e094] {\n    margin-right: -0.5rem;\n}\n.lg\\:-mb-2[data-v-ad49e094] {\n    margin-bottom: -0.5rem;\n}\n.lg\\:-ml-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n}\n.lg\\:-mt-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n}\n.lg\\:-mr-3[data-v-ad49e094] {\n    margin-right: -0.75rem;\n}\n.lg\\:-mb-3[data-v-ad49e094] {\n    margin-bottom: -0.75rem;\n}\n.lg\\:-ml-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n}\n.lg\\:-mt-4[data-v-ad49e094] {\n    margin-top: -1rem;\n}\n.lg\\:-mr-4[data-v-ad49e094] {\n    margin-right: -1rem;\n}\n.lg\\:-mb-4[data-v-ad49e094] {\n    margin-bottom: -1rem;\n}\n.lg\\:-ml-4[data-v-ad49e094] {\n    margin-left: -1rem;\n}\n.lg\\:-mt-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n}\n.lg\\:-mr-5[data-v-ad49e094] {\n    margin-right: -1.25rem;\n}\n.lg\\:-mb-5[data-v-ad49e094] {\n    margin-bottom: -1.25rem;\n}\n.lg\\:-ml-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n}\n.lg\\:-mt-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n}\n.lg\\:-mr-6[data-v-ad49e094] {\n    margin-right: -1.5rem;\n}\n.lg\\:-mb-6[data-v-ad49e094] {\n    margin-bottom: -1.5rem;\n}\n.lg\\:-ml-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n}\n.lg\\:-mt-8[data-v-ad49e094] {\n    margin-top: -2rem;\n}\n.lg\\:-mr-8[data-v-ad49e094] {\n    margin-right: -2rem;\n}\n.lg\\:-mb-8[data-v-ad49e094] {\n    margin-bottom: -2rem;\n}\n.lg\\:-ml-8[data-v-ad49e094] {\n    margin-left: -2rem;\n}\n.lg\\:-mt-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n}\n.lg\\:-mr-10[data-v-ad49e094] {\n    margin-right: -2.5rem;\n}\n.lg\\:-mb-10[data-v-ad49e094] {\n    margin-bottom: -2.5rem;\n}\n.lg\\:-ml-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n}\n.lg\\:-mt-12[data-v-ad49e094] {\n    margin-top: -3rem;\n}\n.lg\\:-mr-12[data-v-ad49e094] {\n    margin-right: -3rem;\n}\n.lg\\:-mb-12[data-v-ad49e094] {\n    margin-bottom: -3rem;\n}\n.lg\\:-ml-12[data-v-ad49e094] {\n    margin-left: -3rem;\n}\n.lg\\:-mt-16[data-v-ad49e094] {\n    margin-top: -4rem;\n}\n.lg\\:-mr-16[data-v-ad49e094] {\n    margin-right: -4rem;\n}\n.lg\\:-mb-16[data-v-ad49e094] {\n    margin-bottom: -4rem;\n}\n.lg\\:-ml-16[data-v-ad49e094] {\n    margin-left: -4rem;\n}\n.lg\\:-mt-20[data-v-ad49e094] {\n    margin-top: -5rem;\n}\n.lg\\:-mr-20[data-v-ad49e094] {\n    margin-right: -5rem;\n}\n.lg\\:-mb-20[data-v-ad49e094] {\n    margin-bottom: -5rem;\n}\n.lg\\:-ml-20[data-v-ad49e094] {\n    margin-left: -5rem;\n}\n.lg\\:-mt-24[data-v-ad49e094] {\n    margin-top: -6rem;\n}\n.lg\\:-mr-24[data-v-ad49e094] {\n    margin-right: -6rem;\n}\n.lg\\:-mb-24[data-v-ad49e094] {\n    margin-bottom: -6rem;\n}\n.lg\\:-ml-24[data-v-ad49e094] {\n    margin-left: -6rem;\n}\n.lg\\:-mt-32[data-v-ad49e094] {\n    margin-top: -8rem;\n}\n.lg\\:-mr-32[data-v-ad49e094] {\n    margin-right: -8rem;\n}\n.lg\\:-mb-32[data-v-ad49e094] {\n    margin-bottom: -8rem;\n}\n.lg\\:-ml-32[data-v-ad49e094] {\n    margin-left: -8rem;\n}\n.lg\\:-mt-px[data-v-ad49e094] {\n    margin-top: -1px;\n}\n.lg\\:-mr-px[data-v-ad49e094] {\n    margin-right: -1px;\n}\n.lg\\:-mb-px[data-v-ad49e094] {\n    margin-bottom: -1px;\n}\n.lg\\:-ml-px[data-v-ad49e094] {\n    margin-left: -1px;\n}\n.lg\\:opacity-0[data-v-ad49e094] {\n    opacity: 0;\n}\n.lg\\:opacity-25[data-v-ad49e094] {\n    opacity: .25;\n}\n.lg\\:opacity-50[data-v-ad49e094] {\n    opacity: .5;\n}\n.lg\\:opacity-75[data-v-ad49e094] {\n    opacity: .75;\n}\n.lg\\:opacity-100[data-v-ad49e094] {\n    opacity: 1;\n}\n.lg\\:overflow-auto[data-v-ad49e094] {\n    overflow: auto;\n}\n.lg\\:overflow-hidden[data-v-ad49e094] {\n    overflow: hidden;\n}\n.lg\\:overflow-visible[data-v-ad49e094] {\n    overflow: visible;\n}\n.lg\\:overflow-scroll[data-v-ad49e094] {\n    overflow: scroll;\n}\n.lg\\:overflow-x-auto[data-v-ad49e094] {\n    overflow-x: auto;\n}\n.lg\\:overflow-y-auto[data-v-ad49e094] {\n    overflow-y: auto;\n}\n.lg\\:overflow-x-hidden[data-v-ad49e094] {\n    overflow-x: hidden;\n}\n.lg\\:overflow-y-hidden[data-v-ad49e094] {\n    overflow-y: hidden;\n}\n.lg\\:overflow-x-visible[data-v-ad49e094] {\n    overflow-x: visible;\n}\n.lg\\:overflow-y-visible[data-v-ad49e094] {\n    overflow-y: visible;\n}\n.lg\\:overflow-x-scroll[data-v-ad49e094] {\n    overflow-x: scroll;\n}\n.lg\\:overflow-y-scroll[data-v-ad49e094] {\n    overflow-y: scroll;\n}\n.lg\\:scrolling-touch[data-v-ad49e094] {\n    -webkit-overflow-scrolling: touch;\n}\n.lg\\:scrolling-auto[data-v-ad49e094] {\n    -webkit-overflow-scrolling: auto;\n}\n.lg\\:p-0[data-v-ad49e094] {\n    padding: 0;\n}\n.lg\\:p-1[data-v-ad49e094] {\n    padding: .25rem;\n}\n.lg\\:p-2[data-v-ad49e094] {\n    padding: .5rem;\n}\n.lg\\:p-3[data-v-ad49e094] {\n    padding: .75rem;\n}\n.lg\\:p-4[data-v-ad49e094] {\n    padding: 1rem;\n}\n.lg\\:p-5[data-v-ad49e094] {\n    padding: 1.25rem;\n}\n.lg\\:p-6[data-v-ad49e094] {\n    padding: 1.5rem;\n}\n.lg\\:p-8[data-v-ad49e094] {\n    padding: 2rem;\n}\n.lg\\:p-10[data-v-ad49e094] {\n    padding: 2.5rem;\n}\n.lg\\:p-12[data-v-ad49e094] {\n    padding: 3rem;\n}\n.lg\\:p-16[data-v-ad49e094] {\n    padding: 4rem;\n}\n.lg\\:p-20[data-v-ad49e094] {\n    padding: 5rem;\n}\n.lg\\:p-24[data-v-ad49e094] {\n    padding: 6rem;\n}\n.lg\\:p-32[data-v-ad49e094] {\n    padding: 8rem;\n}\n.lg\\:p-px[data-v-ad49e094] {\n    padding: 1px;\n}\n.lg\\:py-0[data-v-ad49e094] {\n    padding-top: 0;\n    padding-bottom: 0;\n}\n.lg\\:px-0[data-v-ad49e094] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.lg\\:py-1[data-v-ad49e094] {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n}\n.lg\\:px-1[data-v-ad49e094] {\n    padding-left: .25rem;\n    padding-right: .25rem;\n}\n.lg\\:py-2[data-v-ad49e094] {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n}\n.lg\\:px-2[data-v-ad49e094] {\n    padding-left: .5rem;\n    padding-right: .5rem;\n}\n.lg\\:py-3[data-v-ad49e094] {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n}\n.lg\\:px-3[data-v-ad49e094] {\n    padding-left: .75rem;\n    padding-right: .75rem;\n}\n.lg\\:py-4[data-v-ad49e094] {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n}\n.lg\\:px-4[data-v-ad49e094] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n}\n.lg\\:py-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n    padding-bottom: 1.25rem;\n}\n.lg\\:px-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n}\n.lg\\:py-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n}\n.lg\\:px-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n}\n.lg\\:py-8[data-v-ad49e094] {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n}\n.lg\\:px-8[data-v-ad49e094] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n.lg\\:py-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n    padding-bottom: 2.5rem;\n}\n.lg\\:px-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n    padding-right: 2.5rem;\n}\n.lg\\:py-12[data-v-ad49e094] {\n    padding-top: 3rem;\n    padding-bottom: 3rem;\n}\n.lg\\:px-12[data-v-ad49e094] {\n    padding-left: 3rem;\n    padding-right: 3rem;\n}\n.lg\\:py-16[data-v-ad49e094] {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n}\n.lg\\:px-16[data-v-ad49e094] {\n    padding-left: 4rem;\n    padding-right: 4rem;\n}\n.lg\\:py-20[data-v-ad49e094] {\n    padding-top: 5rem;\n    padding-bottom: 5rem;\n}\n.lg\\:px-20[data-v-ad49e094] {\n    padding-left: 5rem;\n    padding-right: 5rem;\n}\n.lg\\:py-24[data-v-ad49e094] {\n    padding-top: 6rem;\n    padding-bottom: 6rem;\n}\n.lg\\:px-24[data-v-ad49e094] {\n    padding-left: 6rem;\n    padding-right: 6rem;\n}\n.lg\\:py-32[data-v-ad49e094] {\n    padding-top: 8rem;\n    padding-bottom: 8rem;\n}\n.lg\\:px-32[data-v-ad49e094] {\n    padding-left: 8rem;\n    padding-right: 8rem;\n}\n.lg\\:py-px[data-v-ad49e094] {\n    padding-top: 1px;\n    padding-bottom: 1px;\n}\n.lg\\:px-px[data-v-ad49e094] {\n    padding-left: 1px;\n    padding-right: 1px;\n}\n.lg\\:pt-0[data-v-ad49e094] {\n    padding-top: 0;\n}\n.lg\\:pr-0[data-v-ad49e094] {\n    padding-right: 0;\n}\n.lg\\:pb-0[data-v-ad49e094] {\n    padding-bottom: 0;\n}\n.lg\\:pl-0[data-v-ad49e094] {\n    padding-left: 0;\n}\n.lg\\:pt-1[data-v-ad49e094] {\n    padding-top: .25rem;\n}\n.lg\\:pr-1[data-v-ad49e094] {\n    padding-right: .25rem;\n}\n.lg\\:pb-1[data-v-ad49e094] {\n    padding-bottom: .25rem;\n}\n.lg\\:pl-1[data-v-ad49e094] {\n    padding-left: .25rem;\n}\n.lg\\:pt-2[data-v-ad49e094] {\n    padding-top: .5rem;\n}\n.lg\\:pr-2[data-v-ad49e094] {\n    padding-right: .5rem;\n}\n.lg\\:pb-2[data-v-ad49e094] {\n    padding-bottom: .5rem;\n}\n.lg\\:pl-2[data-v-ad49e094] {\n    padding-left: .5rem;\n}\n.lg\\:pt-3[data-v-ad49e094] {\n    padding-top: .75rem;\n}\n.lg\\:pr-3[data-v-ad49e094] {\n    padding-right: .75rem;\n}\n.lg\\:pb-3[data-v-ad49e094] {\n    padding-bottom: .75rem;\n}\n.lg\\:pl-3[data-v-ad49e094] {\n    padding-left: .75rem;\n}\n.lg\\:pt-4[data-v-ad49e094] {\n    padding-top: 1rem;\n}\n.lg\\:pr-4[data-v-ad49e094] {\n    padding-right: 1rem;\n}\n.lg\\:pb-4[data-v-ad49e094] {\n    padding-bottom: 1rem;\n}\n.lg\\:pl-4[data-v-ad49e094] {\n    padding-left: 1rem;\n}\n.lg\\:pt-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n}\n.lg\\:pr-5[data-v-ad49e094] {\n    padding-right: 1.25rem;\n}\n.lg\\:pb-5[data-v-ad49e094] {\n    padding-bottom: 1.25rem;\n}\n.lg\\:pl-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n}\n.lg\\:pt-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n}\n.lg\\:pr-6[data-v-ad49e094] {\n    padding-right: 1.5rem;\n}\n.lg\\:pb-6[data-v-ad49e094] {\n    padding-bottom: 1.5rem;\n}\n.lg\\:pl-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n}\n.lg\\:pt-8[data-v-ad49e094] {\n    padding-top: 2rem;\n}\n.lg\\:pr-8[data-v-ad49e094] {\n    padding-right: 2rem;\n}\n.lg\\:pb-8[data-v-ad49e094] {\n    padding-bottom: 2rem;\n}\n.lg\\:pl-8[data-v-ad49e094] {\n    padding-left: 2rem;\n}\n.lg\\:pt-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n}\n.lg\\:pr-10[data-v-ad49e094] {\n    padding-right: 2.5rem;\n}\n.lg\\:pb-10[data-v-ad49e094] {\n    padding-bottom: 2.5rem;\n}\n.lg\\:pl-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n}\n.lg\\:pt-12[data-v-ad49e094] {\n    padding-top: 3rem;\n}\n.lg\\:pr-12[data-v-ad49e094] {\n    padding-right: 3rem;\n}\n.lg\\:pb-12[data-v-ad49e094] {\n    padding-bottom: 3rem;\n}\n.lg\\:pl-12[data-v-ad49e094] {\n    padding-left: 3rem;\n}\n.lg\\:pt-16[data-v-ad49e094] {\n    padding-top: 4rem;\n}\n.lg\\:pr-16[data-v-ad49e094] {\n    padding-right: 4rem;\n}\n.lg\\:pb-16[data-v-ad49e094] {\n    padding-bottom: 4rem;\n}\n.lg\\:pl-16[data-v-ad49e094] {\n    padding-left: 4rem;\n}\n.lg\\:pt-20[data-v-ad49e094] {\n    padding-top: 5rem;\n}\n.lg\\:pr-20[data-v-ad49e094] {\n    padding-right: 5rem;\n}\n.lg\\:pb-20[data-v-ad49e094] {\n    padding-bottom: 5rem;\n}\n.lg\\:pl-20[data-v-ad49e094] {\n    padding-left: 5rem;\n}\n.lg\\:pt-24[data-v-ad49e094] {\n    padding-top: 6rem;\n}\n.lg\\:pr-24[data-v-ad49e094] {\n    padding-right: 6rem;\n}\n.lg\\:pb-24[data-v-ad49e094] {\n    padding-bottom: 6rem;\n}\n.lg\\:pl-24[data-v-ad49e094] {\n    padding-left: 6rem;\n}\n.lg\\:pt-32[data-v-ad49e094] {\n    padding-top: 8rem;\n}\n.lg\\:pr-32[data-v-ad49e094] {\n    padding-right: 8rem;\n}\n.lg\\:pb-32[data-v-ad49e094] {\n    padding-bottom: 8rem;\n}\n.lg\\:pl-32[data-v-ad49e094] {\n    padding-left: 8rem;\n}\n.lg\\:pt-px[data-v-ad49e094] {\n    padding-top: 1px;\n}\n.lg\\:pr-px[data-v-ad49e094] {\n    padding-right: 1px;\n}\n.lg\\:pb-px[data-v-ad49e094] {\n    padding-bottom: 1px;\n}\n.lg\\:pl-px[data-v-ad49e094] {\n    padding-left: 1px;\n}\n.lg\\:pointer-events-none[data-v-ad49e094] {\n    pointer-events: none;\n}\n.lg\\:pointer-events-auto[data-v-ad49e094] {\n    pointer-events: auto;\n}\n.lg\\:static[data-v-ad49e094] {\n    position: static;\n}\n.lg\\:fixed[data-v-ad49e094] {\n    position: fixed;\n}\n.lg\\:absolute[data-v-ad49e094] {\n    position: absolute;\n}\n.lg\\:relative[data-v-ad49e094] {\n    position: relative;\n}\n.lg\\:sticky[data-v-ad49e094] {\n    position: -webkit-sticky;\n    position: sticky;\n}\n.lg\\:pin-none[data-v-ad49e094] {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n}\n.lg\\:pin[data-v-ad49e094] {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.lg\\:pin-y[data-v-ad49e094] {\n    top: 0;\n    bottom: 0;\n}\n.lg\\:pin-x[data-v-ad49e094] {\n    right: 0;\n    left: 0;\n}\n.lg\\:pin-t[data-v-ad49e094] {\n    top: 0;\n}\n.lg\\:pin-r[data-v-ad49e094] {\n    right: 0;\n}\n.lg\\:pin-b[data-v-ad49e094] {\n    bottom: 0;\n}\n.lg\\:pin-l[data-v-ad49e094] {\n    left: 0;\n}\n.lg\\:resize-none[data-v-ad49e094] {\n    resize: none;\n}\n.lg\\:resize-y[data-v-ad49e094] {\n    resize: vertical;\n}\n.lg\\:resize-x[data-v-ad49e094] {\n    resize: horizontal;\n}\n.lg\\:resize[data-v-ad49e094] {\n    resize: both;\n}\n.lg\\:shadow[data-v-ad49e094] {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.lg\\:shadow-md[data-v-ad49e094] {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:shadow-lg[data-v-ad49e094] {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:shadow-inner[data-v-ad49e094] {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.lg\\:shadow-outline[data-v-ad49e094] {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.lg\\:shadow-none[data-v-ad49e094] {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.lg\\:hover\\:shadow[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.lg\\:hover\\:shadow-md[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:hover\\:shadow-lg[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:hover\\:shadow-inner[data-v-ad49e094]:hover {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.lg\\:hover\\:shadow-outline[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.lg\\:hover\\:shadow-none[data-v-ad49e094]:hover {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.lg\\:focus\\:shadow[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.lg\\:focus\\:shadow-md[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:focus\\:shadow-lg[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.lg\\:focus\\:shadow-inner[data-v-ad49e094]:focus {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.lg\\:focus\\:shadow-outline[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.lg\\:focus\\:shadow-none[data-v-ad49e094]:focus {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.lg\\:table-auto[data-v-ad49e094] {\n    table-layout: auto;\n}\n.lg\\:table-fixed[data-v-ad49e094] {\n    table-layout: fixed;\n}\n.lg\\:text-left[data-v-ad49e094] {\n    text-align: left;\n}\n.lg\\:text-center[data-v-ad49e094] {\n    text-align: center;\n}\n.lg\\:text-right[data-v-ad49e094] {\n    text-align: right;\n}\n.lg\\:text-justify[data-v-ad49e094] {\n    text-align: justify;\n}\n.lg\\:text-transparent[data-v-ad49e094] {\n    color: transparent;\n}\n.lg\\:text-black[data-v-ad49e094] {\n    color: #22292f;\n}\n.lg\\:text-grey-darkest[data-v-ad49e094] {\n    color: #3d4852;\n}\n.lg\\:text-grey-darker[data-v-ad49e094] {\n    color: #606f7b;\n}\n.lg\\:text-grey-dark[data-v-ad49e094] {\n    color: #8795a1;\n}\n.lg\\:text-grey[data-v-ad49e094] {\n    color: #b8c2cc;\n}\n.lg\\:text-grey-light[data-v-ad49e094] {\n    color: #dae1e7;\n}\n.lg\\:text-grey-lighter[data-v-ad49e094] {\n    color: #f1f5f8;\n}\n.lg\\:text-grey-lightest[data-v-ad49e094] {\n    color: #f8fafc;\n}\n.lg\\:text-white[data-v-ad49e094] {\n    color: #fff;\n}\n.lg\\:text-red-darkest[data-v-ad49e094] {\n    color: #3b0d0c;\n}\n.lg\\:text-red-darker[data-v-ad49e094] {\n    color: #621b18;\n}\n.lg\\:text-red-dark[data-v-ad49e094] {\n    color: #cc1f1a;\n}\n.lg\\:text-red[data-v-ad49e094] {\n    color: #e3342f;\n}\n.lg\\:text-red-light[data-v-ad49e094] {\n    color: #ef5753;\n}\n.lg\\:text-red-lighter[data-v-ad49e094] {\n    color: #f9acaa;\n}\n.lg\\:text-red-lightest[data-v-ad49e094] {\n    color: #fcebea;\n}\n.lg\\:text-orange-darkest[data-v-ad49e094] {\n    color: #462a16;\n}\n.lg\\:text-orange-darker[data-v-ad49e094] {\n    color: #613b1f;\n}\n.lg\\:text-orange-dark[data-v-ad49e094] {\n    color: #de751f;\n}\n.lg\\:text-orange[data-v-ad49e094] {\n    color: #f6993f;\n}\n.lg\\:text-orange-light[data-v-ad49e094] {\n    color: #faad63;\n}\n.lg\\:text-orange-lighter[data-v-ad49e094] {\n    color: #fcd9b6;\n}\n.lg\\:text-orange-lightest[data-v-ad49e094] {\n    color: #fff5eb;\n}\n.lg\\:text-yellow-darkest[data-v-ad49e094] {\n    color: #453411;\n}\n.lg\\:text-yellow-darker[data-v-ad49e094] {\n    color: #684f1d;\n}\n.lg\\:text-yellow-dark[data-v-ad49e094] {\n    color: #f2d024;\n}\n.lg\\:text-yellow[data-v-ad49e094] {\n    color: #ffed4a;\n}\n.lg\\:text-yellow-light[data-v-ad49e094] {\n    color: #fff382;\n}\n.lg\\:text-yellow-lighter[data-v-ad49e094] {\n    color: #fff9c2;\n}\n.lg\\:text-yellow-lightest[data-v-ad49e094] {\n    color: #fcfbeb;\n}\n.lg\\:text-green-darkest[data-v-ad49e094] {\n    color: #0f2f21;\n}\n.lg\\:text-green-darker[data-v-ad49e094] {\n    color: #1a4731;\n}\n.lg\\:text-green-dark[data-v-ad49e094] {\n    color: #1f9d55;\n}\n.lg\\:text-green[data-v-ad49e094] {\n    color: #38c172;\n}\n.lg\\:text-green-light[data-v-ad49e094] {\n    color: #51d88a;\n}\n.lg\\:text-green-lighter[data-v-ad49e094] {\n    color: #a2f5bf;\n}\n.lg\\:text-green-lightest[data-v-ad49e094] {\n    color: #e3fcec;\n}\n.lg\\:text-teal-darkest[data-v-ad49e094] {\n    color: #0d3331;\n}\n.lg\\:text-teal-darker[data-v-ad49e094] {\n    color: #20504f;\n}\n.lg\\:text-teal-dark[data-v-ad49e094] {\n    color: #38a89d;\n}\n.lg\\:text-teal[data-v-ad49e094] {\n    color: #4dc0b5;\n}\n.lg\\:text-teal-light[data-v-ad49e094] {\n    color: #64d5ca;\n}\n.lg\\:text-teal-lighter[data-v-ad49e094] {\n    color: #a0f0ed;\n}\n.lg\\:text-teal-lightest[data-v-ad49e094] {\n    color: #e8fffe;\n}\n.lg\\:text-blue-darkest[data-v-ad49e094] {\n    color: #12283a;\n}\n.lg\\:text-blue-darker[data-v-ad49e094] {\n    color: #1c3d5a;\n}\n.lg\\:text-blue-dark[data-v-ad49e094] {\n    color: #2779bd;\n}\n.lg\\:text-blue[data-v-ad49e094] {\n    color: #3490dc;\n}\n.lg\\:text-blue-light[data-v-ad49e094] {\n    color: #6cb2eb;\n}\n.lg\\:text-blue-lighter[data-v-ad49e094] {\n    color: #bcdefa;\n}\n.lg\\:text-blue-lightest[data-v-ad49e094] {\n    color: #eff8ff;\n}\n.lg\\:text-indigo-darkest[data-v-ad49e094] {\n    color: #191e38;\n}\n.lg\\:text-indigo-darker[data-v-ad49e094] {\n    color: #2f365f;\n}\n.lg\\:text-indigo-dark[data-v-ad49e094] {\n    color: #5661b3;\n}\n.lg\\:text-indigo[data-v-ad49e094] {\n    color: #6574cd;\n}\n.lg\\:text-indigo-light[data-v-ad49e094] {\n    color: #7886d7;\n}\n.lg\\:text-indigo-lighter[data-v-ad49e094] {\n    color: #b2b7ff;\n}\n.lg\\:text-indigo-lightest[data-v-ad49e094] {\n    color: #e6e8ff;\n}\n.lg\\:text-purple-darkest[data-v-ad49e094] {\n    color: #21183c;\n}\n.lg\\:text-purple-darker[data-v-ad49e094] {\n    color: #382b5f;\n}\n.lg\\:text-purple-dark[data-v-ad49e094] {\n    color: #794acf;\n}\n.lg\\:text-purple[data-v-ad49e094] {\n    color: #9561e2;\n}\n.lg\\:text-purple-light[data-v-ad49e094] {\n    color: #a779e9;\n}\n.lg\\:text-purple-lighter[data-v-ad49e094] {\n    color: #d6bbfc;\n}\n.lg\\:text-purple-lightest[data-v-ad49e094] {\n    color: #f3ebff;\n}\n.lg\\:text-pink-darkest[data-v-ad49e094] {\n    color: #451225;\n}\n.lg\\:text-pink-darker[data-v-ad49e094] {\n    color: #6f213f;\n}\n.lg\\:text-pink-dark[data-v-ad49e094] {\n    color: #eb5286;\n}\n.lg\\:text-pink[data-v-ad49e094] {\n    color: #f66d9b;\n}\n.lg\\:text-pink-light[data-v-ad49e094] {\n    color: #fa7ea8;\n}\n.lg\\:text-pink-lighter[data-v-ad49e094] {\n    color: #ffbbca;\n}\n.lg\\:text-pink-lightest[data-v-ad49e094] {\n    color: #ffebef;\n}\n.lg\\:hover\\:text-transparent[data-v-ad49e094]:hover {\n    color: transparent;\n}\n.lg\\:hover\\:text-black[data-v-ad49e094]:hover {\n    color: #22292f;\n}\n.lg\\:hover\\:text-grey-darkest[data-v-ad49e094]:hover {\n    color: #3d4852;\n}\n.lg\\:hover\\:text-grey-darker[data-v-ad49e094]:hover {\n    color: #606f7b;\n}\n.lg\\:hover\\:text-grey-dark[data-v-ad49e094]:hover {\n    color: #8795a1;\n}\n.lg\\:hover\\:text-grey[data-v-ad49e094]:hover {\n    color: #b8c2cc;\n}\n.lg\\:hover\\:text-grey-light[data-v-ad49e094]:hover {\n    color: #dae1e7;\n}\n.lg\\:hover\\:text-grey-lighter[data-v-ad49e094]:hover {\n    color: #f1f5f8;\n}\n.lg\\:hover\\:text-grey-lightest[data-v-ad49e094]:hover {\n    color: #f8fafc;\n}\n.lg\\:hover\\:text-white[data-v-ad49e094]:hover {\n    color: #fff;\n}\n.lg\\:hover\\:text-red-darkest[data-v-ad49e094]:hover {\n    color: #3b0d0c;\n}\n.lg\\:hover\\:text-red-darker[data-v-ad49e094]:hover {\n    color: #621b18;\n}\n.lg\\:hover\\:text-red-dark[data-v-ad49e094]:hover {\n    color: #cc1f1a;\n}\n.lg\\:hover\\:text-red[data-v-ad49e094]:hover {\n    color: #e3342f;\n}\n.lg\\:hover\\:text-red-light[data-v-ad49e094]:hover {\n    color: #ef5753;\n}\n.lg\\:hover\\:text-red-lighter[data-v-ad49e094]:hover {\n    color: #f9acaa;\n}\n.lg\\:hover\\:text-red-lightest[data-v-ad49e094]:hover {\n    color: #fcebea;\n}\n.lg\\:hover\\:text-orange-darkest[data-v-ad49e094]:hover {\n    color: #462a16;\n}\n.lg\\:hover\\:text-orange-darker[data-v-ad49e094]:hover {\n    color: #613b1f;\n}\n.lg\\:hover\\:text-orange-dark[data-v-ad49e094]:hover {\n    color: #de751f;\n}\n.lg\\:hover\\:text-orange[data-v-ad49e094]:hover {\n    color: #f6993f;\n}\n.lg\\:hover\\:text-orange-light[data-v-ad49e094]:hover {\n    color: #faad63;\n}\n.lg\\:hover\\:text-orange-lighter[data-v-ad49e094]:hover {\n    color: #fcd9b6;\n}\n.lg\\:hover\\:text-orange-lightest[data-v-ad49e094]:hover {\n    color: #fff5eb;\n}\n.lg\\:hover\\:text-yellow-darkest[data-v-ad49e094]:hover {\n    color: #453411;\n}\n.lg\\:hover\\:text-yellow-darker[data-v-ad49e094]:hover {\n    color: #684f1d;\n}\n.lg\\:hover\\:text-yellow-dark[data-v-ad49e094]:hover {\n    color: #f2d024;\n}\n.lg\\:hover\\:text-yellow[data-v-ad49e094]:hover {\n    color: #ffed4a;\n}\n.lg\\:hover\\:text-yellow-light[data-v-ad49e094]:hover {\n    color: #fff382;\n}\n.lg\\:hover\\:text-yellow-lighter[data-v-ad49e094]:hover {\n    color: #fff9c2;\n}\n.lg\\:hover\\:text-yellow-lightest[data-v-ad49e094]:hover {\n    color: #fcfbeb;\n}\n.lg\\:hover\\:text-green-darkest[data-v-ad49e094]:hover {\n    color: #0f2f21;\n}\n.lg\\:hover\\:text-green-darker[data-v-ad49e094]:hover {\n    color: #1a4731;\n}\n.lg\\:hover\\:text-green-dark[data-v-ad49e094]:hover {\n    color: #1f9d55;\n}\n.lg\\:hover\\:text-green[data-v-ad49e094]:hover {\n    color: #38c172;\n}\n.lg\\:hover\\:text-green-light[data-v-ad49e094]:hover {\n    color: #51d88a;\n}\n.lg\\:hover\\:text-green-lighter[data-v-ad49e094]:hover {\n    color: #a2f5bf;\n}\n.lg\\:hover\\:text-green-lightest[data-v-ad49e094]:hover {\n    color: #e3fcec;\n}\n.lg\\:hover\\:text-teal-darkest[data-v-ad49e094]:hover {\n    color: #0d3331;\n}\n.lg\\:hover\\:text-teal-darker[data-v-ad49e094]:hover {\n    color: #20504f;\n}\n.lg\\:hover\\:text-teal-dark[data-v-ad49e094]:hover {\n    color: #38a89d;\n}\n.lg\\:hover\\:text-teal[data-v-ad49e094]:hover {\n    color: #4dc0b5;\n}\n.lg\\:hover\\:text-teal-light[data-v-ad49e094]:hover {\n    color: #64d5ca;\n}\n.lg\\:hover\\:text-teal-lighter[data-v-ad49e094]:hover {\n    color: #a0f0ed;\n}\n.lg\\:hover\\:text-teal-lightest[data-v-ad49e094]:hover {\n    color: #e8fffe;\n}\n.lg\\:hover\\:text-blue-darkest[data-v-ad49e094]:hover {\n    color: #12283a;\n}\n.lg\\:hover\\:text-blue-darker[data-v-ad49e094]:hover {\n    color: #1c3d5a;\n}\n.lg\\:hover\\:text-blue-dark[data-v-ad49e094]:hover {\n    color: #2779bd;\n}\n.lg\\:hover\\:text-blue[data-v-ad49e094]:hover {\n    color: #3490dc;\n}\n.lg\\:hover\\:text-blue-light[data-v-ad49e094]:hover {\n    color: #6cb2eb;\n}\n.lg\\:hover\\:text-blue-lighter[data-v-ad49e094]:hover {\n    color: #bcdefa;\n}\n.lg\\:hover\\:text-blue-lightest[data-v-ad49e094]:hover {\n    color: #eff8ff;\n}\n.lg\\:hover\\:text-indigo-darkest[data-v-ad49e094]:hover {\n    color: #191e38;\n}\n.lg\\:hover\\:text-indigo-darker[data-v-ad49e094]:hover {\n    color: #2f365f;\n}\n.lg\\:hover\\:text-indigo-dark[data-v-ad49e094]:hover {\n    color: #5661b3;\n}\n.lg\\:hover\\:text-indigo[data-v-ad49e094]:hover {\n    color: #6574cd;\n}\n.lg\\:hover\\:text-indigo-light[data-v-ad49e094]:hover {\n    color: #7886d7;\n}\n.lg\\:hover\\:text-indigo-lighter[data-v-ad49e094]:hover {\n    color: #b2b7ff;\n}\n.lg\\:hover\\:text-indigo-lightest[data-v-ad49e094]:hover {\n    color: #e6e8ff;\n}\n.lg\\:hover\\:text-purple-darkest[data-v-ad49e094]:hover {\n    color: #21183c;\n}\n.lg\\:hover\\:text-purple-darker[data-v-ad49e094]:hover {\n    color: #382b5f;\n}\n.lg\\:hover\\:text-purple-dark[data-v-ad49e094]:hover {\n    color: #794acf;\n}\n.lg\\:hover\\:text-purple[data-v-ad49e094]:hover {\n    color: #9561e2;\n}\n.lg\\:hover\\:text-purple-light[data-v-ad49e094]:hover {\n    color: #a779e9;\n}\n.lg\\:hover\\:text-purple-lighter[data-v-ad49e094]:hover {\n    color: #d6bbfc;\n}\n.lg\\:hover\\:text-purple-lightest[data-v-ad49e094]:hover {\n    color: #f3ebff;\n}\n.lg\\:hover\\:text-pink-darkest[data-v-ad49e094]:hover {\n    color: #451225;\n}\n.lg\\:hover\\:text-pink-darker[data-v-ad49e094]:hover {\n    color: #6f213f;\n}\n.lg\\:hover\\:text-pink-dark[data-v-ad49e094]:hover {\n    color: #eb5286;\n}\n.lg\\:hover\\:text-pink[data-v-ad49e094]:hover {\n    color: #f66d9b;\n}\n.lg\\:hover\\:text-pink-light[data-v-ad49e094]:hover {\n    color: #fa7ea8;\n}\n.lg\\:hover\\:text-pink-lighter[data-v-ad49e094]:hover {\n    color: #ffbbca;\n}\n.lg\\:hover\\:text-pink-lightest[data-v-ad49e094]:hover {\n    color: #ffebef;\n}\n.lg\\:focus\\:text-transparent[data-v-ad49e094]:focus {\n    color: transparent;\n}\n.lg\\:focus\\:text-black[data-v-ad49e094]:focus {\n    color: #22292f;\n}\n.lg\\:focus\\:text-grey-darkest[data-v-ad49e094]:focus {\n    color: #3d4852;\n}\n.lg\\:focus\\:text-grey-darker[data-v-ad49e094]:focus {\n    color: #606f7b;\n}\n.lg\\:focus\\:text-grey-dark[data-v-ad49e094]:focus {\n    color: #8795a1;\n}\n.lg\\:focus\\:text-grey[data-v-ad49e094]:focus {\n    color: #b8c2cc;\n}\n.lg\\:focus\\:text-grey-light[data-v-ad49e094]:focus {\n    color: #dae1e7;\n}\n.lg\\:focus\\:text-grey-lighter[data-v-ad49e094]:focus {\n    color: #f1f5f8;\n}\n.lg\\:focus\\:text-grey-lightest[data-v-ad49e094]:focus {\n    color: #f8fafc;\n}\n.lg\\:focus\\:text-white[data-v-ad49e094]:focus {\n    color: #fff;\n}\n.lg\\:focus\\:text-red-darkest[data-v-ad49e094]:focus {\n    color: #3b0d0c;\n}\n.lg\\:focus\\:text-red-darker[data-v-ad49e094]:focus {\n    color: #621b18;\n}\n.lg\\:focus\\:text-red-dark[data-v-ad49e094]:focus {\n    color: #cc1f1a;\n}\n.lg\\:focus\\:text-red[data-v-ad49e094]:focus {\n    color: #e3342f;\n}\n.lg\\:focus\\:text-red-light[data-v-ad49e094]:focus {\n    color: #ef5753;\n}\n.lg\\:focus\\:text-red-lighter[data-v-ad49e094]:focus {\n    color: #f9acaa;\n}\n.lg\\:focus\\:text-red-lightest[data-v-ad49e094]:focus {\n    color: #fcebea;\n}\n.lg\\:focus\\:text-orange-darkest[data-v-ad49e094]:focus {\n    color: #462a16;\n}\n.lg\\:focus\\:text-orange-darker[data-v-ad49e094]:focus {\n    color: #613b1f;\n}\n.lg\\:focus\\:text-orange-dark[data-v-ad49e094]:focus {\n    color: #de751f;\n}\n.lg\\:focus\\:text-orange[data-v-ad49e094]:focus {\n    color: #f6993f;\n}\n.lg\\:focus\\:text-orange-light[data-v-ad49e094]:focus {\n    color: #faad63;\n}\n.lg\\:focus\\:text-orange-lighter[data-v-ad49e094]:focus {\n    color: #fcd9b6;\n}\n.lg\\:focus\\:text-orange-lightest[data-v-ad49e094]:focus {\n    color: #fff5eb;\n}\n.lg\\:focus\\:text-yellow-darkest[data-v-ad49e094]:focus {\n    color: #453411;\n}\n.lg\\:focus\\:text-yellow-darker[data-v-ad49e094]:focus {\n    color: #684f1d;\n}\n.lg\\:focus\\:text-yellow-dark[data-v-ad49e094]:focus {\n    color: #f2d024;\n}\n.lg\\:focus\\:text-yellow[data-v-ad49e094]:focus {\n    color: #ffed4a;\n}\n.lg\\:focus\\:text-yellow-light[data-v-ad49e094]:focus {\n    color: #fff382;\n}\n.lg\\:focus\\:text-yellow-lighter[data-v-ad49e094]:focus {\n    color: #fff9c2;\n}\n.lg\\:focus\\:text-yellow-lightest[data-v-ad49e094]:focus {\n    color: #fcfbeb;\n}\n.lg\\:focus\\:text-green-darkest[data-v-ad49e094]:focus {\n    color: #0f2f21;\n}\n.lg\\:focus\\:text-green-darker[data-v-ad49e094]:focus {\n    color: #1a4731;\n}\n.lg\\:focus\\:text-green-dark[data-v-ad49e094]:focus {\n    color: #1f9d55;\n}\n.lg\\:focus\\:text-green[data-v-ad49e094]:focus {\n    color: #38c172;\n}\n.lg\\:focus\\:text-green-light[data-v-ad49e094]:focus {\n    color: #51d88a;\n}\n.lg\\:focus\\:text-green-lighter[data-v-ad49e094]:focus {\n    color: #a2f5bf;\n}\n.lg\\:focus\\:text-green-lightest[data-v-ad49e094]:focus {\n    color: #e3fcec;\n}\n.lg\\:focus\\:text-teal-darkest[data-v-ad49e094]:focus {\n    color: #0d3331;\n}\n.lg\\:focus\\:text-teal-darker[data-v-ad49e094]:focus {\n    color: #20504f;\n}\n.lg\\:focus\\:text-teal-dark[data-v-ad49e094]:focus {\n    color: #38a89d;\n}\n.lg\\:focus\\:text-teal[data-v-ad49e094]:focus {\n    color: #4dc0b5;\n}\n.lg\\:focus\\:text-teal-light[data-v-ad49e094]:focus {\n    color: #64d5ca;\n}\n.lg\\:focus\\:text-teal-lighter[data-v-ad49e094]:focus {\n    color: #a0f0ed;\n}\n.lg\\:focus\\:text-teal-lightest[data-v-ad49e094]:focus {\n    color: #e8fffe;\n}\n.lg\\:focus\\:text-blue-darkest[data-v-ad49e094]:focus {\n    color: #12283a;\n}\n.lg\\:focus\\:text-blue-darker[data-v-ad49e094]:focus {\n    color: #1c3d5a;\n}\n.lg\\:focus\\:text-blue-dark[data-v-ad49e094]:focus {\n    color: #2779bd;\n}\n.lg\\:focus\\:text-blue[data-v-ad49e094]:focus {\n    color: #3490dc;\n}\n.lg\\:focus\\:text-blue-light[data-v-ad49e094]:focus {\n    color: #6cb2eb;\n}\n.lg\\:focus\\:text-blue-lighter[data-v-ad49e094]:focus {\n    color: #bcdefa;\n}\n.lg\\:focus\\:text-blue-lightest[data-v-ad49e094]:focus {\n    color: #eff8ff;\n}\n.lg\\:focus\\:text-indigo-darkest[data-v-ad49e094]:focus {\n    color: #191e38;\n}\n.lg\\:focus\\:text-indigo-darker[data-v-ad49e094]:focus {\n    color: #2f365f;\n}\n.lg\\:focus\\:text-indigo-dark[data-v-ad49e094]:focus {\n    color: #5661b3;\n}\n.lg\\:focus\\:text-indigo[data-v-ad49e094]:focus {\n    color: #6574cd;\n}\n.lg\\:focus\\:text-indigo-light[data-v-ad49e094]:focus {\n    color: #7886d7;\n}\n.lg\\:focus\\:text-indigo-lighter[data-v-ad49e094]:focus {\n    color: #b2b7ff;\n}\n.lg\\:focus\\:text-indigo-lightest[data-v-ad49e094]:focus {\n    color: #e6e8ff;\n}\n.lg\\:focus\\:text-purple-darkest[data-v-ad49e094]:focus {\n    color: #21183c;\n}\n.lg\\:focus\\:text-purple-darker[data-v-ad49e094]:focus {\n    color: #382b5f;\n}\n.lg\\:focus\\:text-purple-dark[data-v-ad49e094]:focus {\n    color: #794acf;\n}\n.lg\\:focus\\:text-purple[data-v-ad49e094]:focus {\n    color: #9561e2;\n}\n.lg\\:focus\\:text-purple-light[data-v-ad49e094]:focus {\n    color: #a779e9;\n}\n.lg\\:focus\\:text-purple-lighter[data-v-ad49e094]:focus {\n    color: #d6bbfc;\n}\n.lg\\:focus\\:text-purple-lightest[data-v-ad49e094]:focus {\n    color: #f3ebff;\n}\n.lg\\:focus\\:text-pink-darkest[data-v-ad49e094]:focus {\n    color: #451225;\n}\n.lg\\:focus\\:text-pink-darker[data-v-ad49e094]:focus {\n    color: #6f213f;\n}\n.lg\\:focus\\:text-pink-dark[data-v-ad49e094]:focus {\n    color: #eb5286;\n}\n.lg\\:focus\\:text-pink[data-v-ad49e094]:focus {\n    color: #f66d9b;\n}\n.lg\\:focus\\:text-pink-light[data-v-ad49e094]:focus {\n    color: #fa7ea8;\n}\n.lg\\:focus\\:text-pink-lighter[data-v-ad49e094]:focus {\n    color: #ffbbca;\n}\n.lg\\:focus\\:text-pink-lightest[data-v-ad49e094]:focus {\n    color: #ffebef;\n}\n.lg\\:text-xs[data-v-ad49e094] {\n    font-size: .75rem;\n}\n.lg\\:text-sm[data-v-ad49e094] {\n    font-size: .875rem;\n}\n.lg\\:text-base[data-v-ad49e094] {\n    font-size: 1rem;\n}\n.lg\\:text-lg[data-v-ad49e094] {\n    font-size: 1.125rem;\n}\n.lg\\:text-xl[data-v-ad49e094] {\n    font-size: 1.25rem;\n}\n.lg\\:text-2xl[data-v-ad49e094] {\n    font-size: 1.5rem;\n}\n.lg\\:text-3xl[data-v-ad49e094] {\n    font-size: 1.875rem;\n}\n.lg\\:text-4xl[data-v-ad49e094] {\n    font-size: 2.25rem;\n}\n.lg\\:text-5xl[data-v-ad49e094] {\n    font-size: 3rem;\n}\n.lg\\:italic[data-v-ad49e094] {\n    font-style: italic;\n}\n.lg\\:roman[data-v-ad49e094] {\n    font-style: normal;\n}\n.lg\\:uppercase[data-v-ad49e094] {\n    text-transform: uppercase;\n}\n.lg\\:lowercase[data-v-ad49e094] {\n    text-transform: lowercase;\n}\n.lg\\:capitalize[data-v-ad49e094] {\n    text-transform: capitalize;\n}\n.lg\\:normal-case[data-v-ad49e094] {\n    text-transform: none;\n}\n.lg\\:underline[data-v-ad49e094] {\n    text-decoration: underline;\n}\n.lg\\:line-through[data-v-ad49e094] {\n    text-decoration: line-through;\n}\n.lg\\:no-underline[data-v-ad49e094] {\n    text-decoration: none;\n}\n.lg\\:antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.lg\\:subpixel-antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.lg\\:hover\\:italic[data-v-ad49e094]:hover {\n    font-style: italic;\n}\n.lg\\:hover\\:roman[data-v-ad49e094]:hover {\n    font-style: normal;\n}\n.lg\\:hover\\:uppercase[data-v-ad49e094]:hover {\n    text-transform: uppercase;\n}\n.lg\\:hover\\:lowercase[data-v-ad49e094]:hover {\n    text-transform: lowercase;\n}\n.lg\\:hover\\:capitalize[data-v-ad49e094]:hover {\n    text-transform: capitalize;\n}\n.lg\\:hover\\:normal-case[data-v-ad49e094]:hover {\n    text-transform: none;\n}\n.lg\\:hover\\:underline[data-v-ad49e094]:hover {\n    text-decoration: underline;\n}\n.lg\\:hover\\:line-through[data-v-ad49e094]:hover {\n    text-decoration: line-through;\n}\n.lg\\:hover\\:no-underline[data-v-ad49e094]:hover {\n    text-decoration: none;\n}\n.lg\\:hover\\:antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.lg\\:hover\\:subpixel-antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.lg\\:focus\\:italic[data-v-ad49e094]:focus {\n    font-style: italic;\n}\n.lg\\:focus\\:roman[data-v-ad49e094]:focus {\n    font-style: normal;\n}\n.lg\\:focus\\:uppercase[data-v-ad49e094]:focus {\n    text-transform: uppercase;\n}\n.lg\\:focus\\:lowercase[data-v-ad49e094]:focus {\n    text-transform: lowercase;\n}\n.lg\\:focus\\:capitalize[data-v-ad49e094]:focus {\n    text-transform: capitalize;\n}\n.lg\\:focus\\:normal-case[data-v-ad49e094]:focus {\n    text-transform: none;\n}\n.lg\\:focus\\:underline[data-v-ad49e094]:focus {\n    text-decoration: underline;\n}\n.lg\\:focus\\:line-through[data-v-ad49e094]:focus {\n    text-decoration: line-through;\n}\n.lg\\:focus\\:no-underline[data-v-ad49e094]:focus {\n    text-decoration: none;\n}\n.lg\\:focus\\:antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.lg\\:focus\\:subpixel-antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.lg\\:tracking-tight[data-v-ad49e094] {\n    letter-spacing: -0.05em;\n}\n.lg\\:tracking-normal[data-v-ad49e094] {\n    letter-spacing: 0;\n}\n.lg\\:tracking-wide[data-v-ad49e094] {\n    letter-spacing: .05em;\n}\n.lg\\:select-none[data-v-ad49e094] {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.lg\\:select-text[data-v-ad49e094] {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n}\n.lg\\:align-baseline[data-v-ad49e094] {\n    vertical-align: baseline;\n}\n.lg\\:align-top[data-v-ad49e094] {\n    vertical-align: top;\n}\n.lg\\:align-middle[data-v-ad49e094] {\n    vertical-align: middle;\n}\n.lg\\:align-bottom[data-v-ad49e094] {\n    vertical-align: bottom;\n}\n.lg\\:align-text-top[data-v-ad49e094] {\n    vertical-align: text-top;\n}\n.lg\\:align-text-bottom[data-v-ad49e094] {\n    vertical-align: text-bottom;\n}\n.lg\\:visible[data-v-ad49e094] {\n    visibility: visible;\n}\n.lg\\:invisible[data-v-ad49e094] {\n    visibility: hidden;\n}\n.lg\\:whitespace-normal[data-v-ad49e094] {\n    white-space: normal;\n}\n.lg\\:whitespace-no-wrap[data-v-ad49e094] {\n    white-space: nowrap;\n}\n.lg\\:whitespace-pre[data-v-ad49e094] {\n    white-space: pre;\n}\n.lg\\:whitespace-pre-line[data-v-ad49e094] {\n    white-space: pre-line;\n}\n.lg\\:whitespace-pre-wrap[data-v-ad49e094] {\n    white-space: pre-wrap;\n}\n.lg\\:break-words[data-v-ad49e094] {\n    word-wrap: break-word;\n}\n.lg\\:break-normal[data-v-ad49e094] {\n    word-wrap: normal;\n}\n.lg\\:truncate[data-v-ad49e094] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.lg\\:w-1[data-v-ad49e094] {\n    width: .25rem;\n}\n.lg\\:w-2[data-v-ad49e094] {\n    width: .5rem;\n}\n.lg\\:w-3[data-v-ad49e094] {\n    width: .75rem;\n}\n.lg\\:w-4[data-v-ad49e094] {\n    width: 1rem;\n}\n.lg\\:w-5[data-v-ad49e094] {\n    width: 1.25rem;\n}\n.lg\\:w-6[data-v-ad49e094] {\n    width: 1.5rem;\n}\n.lg\\:w-8[data-v-ad49e094] {\n    width: 2rem;\n}\n.lg\\:w-10[data-v-ad49e094] {\n    width: 2.5rem;\n}\n.lg\\:w-12[data-v-ad49e094] {\n    width: 3rem;\n}\n.lg\\:w-16[data-v-ad49e094] {\n    width: 4rem;\n}\n.lg\\:w-24[data-v-ad49e094] {\n    width: 6rem;\n}\n.lg\\:w-32[data-v-ad49e094] {\n    width: 8rem;\n}\n.lg\\:w-48[data-v-ad49e094] {\n    width: 12rem;\n}\n.lg\\:w-64[data-v-ad49e094] {\n    width: 16rem;\n}\n.lg\\:w-auto[data-v-ad49e094] {\n    width: auto;\n}\n.lg\\:w-px[data-v-ad49e094] {\n    width: 1px;\n}\n.lg\\:w-1\\/2[data-v-ad49e094] {\n    width: 50%;\n}\n.lg\\:w-1\\/3[data-v-ad49e094] {\n    width: 33.33333%;\n}\n.lg\\:w-2\\/3[data-v-ad49e094] {\n    width: 66.66667%;\n}\n.lg\\:w-1\\/4[data-v-ad49e094] {\n    width: 25%;\n}\n.lg\\:w-3\\/4[data-v-ad49e094] {\n    width: 75%;\n}\n.lg\\:w-1\\/5[data-v-ad49e094] {\n    width: 20%;\n}\n.lg\\:w-2\\/5[data-v-ad49e094] {\n    width: 40%;\n}\n.lg\\:w-3\\/5[data-v-ad49e094] {\n    width: 60%;\n}\n.lg\\:w-4\\/5[data-v-ad49e094] {\n    width: 80%;\n}\n.lg\\:w-1\\/6[data-v-ad49e094] {\n    width: 16.66667%;\n}\n.lg\\:w-5\\/6[data-v-ad49e094] {\n    width: 83.33333%;\n}\n.lg\\:w-full[data-v-ad49e094] {\n    width: 100%;\n}\n.lg\\:w-screen[data-v-ad49e094] {\n    width: 100vw;\n}\n.lg\\:z-0[data-v-ad49e094] {\n    z-index: 0;\n}\n.lg\\:z-10[data-v-ad49e094] {\n    z-index: 10;\n}\n.lg\\:z-20[data-v-ad49e094] {\n    z-index: 20;\n}\n.lg\\:z-30[data-v-ad49e094] {\n    z-index: 30;\n}\n.lg\\:z-40[data-v-ad49e094] {\n    z-index: 40;\n}\n.lg\\:z-50[data-v-ad49e094] {\n    z-index: 50;\n}\n.lg\\:z-auto[data-v-ad49e094] {\n    z-index: auto;\n}\n}\n@media (min-width: 1200px) {\n.xl\\:list-reset[data-v-ad49e094] {\n    list-style: none;\n    padding: 0;\n}\n.xl\\:appearance-none[data-v-ad49e094] {\n    -webkit-appearance: none;\n       -moz-appearance: none;\n            appearance: none;\n}\n.xl\\:bg-fixed[data-v-ad49e094] {\n    background-attachment: fixed;\n}\n.xl\\:bg-local[data-v-ad49e094] {\n    background-attachment: local;\n}\n.xl\\:bg-scroll[data-v-ad49e094] {\n    background-attachment: scroll;\n}\n.xl\\:bg-transparent[data-v-ad49e094] {\n    background-color: transparent;\n}\n.xl\\:bg-black[data-v-ad49e094] {\n    background-color: #22292f;\n}\n.xl\\:bg-grey-darkest[data-v-ad49e094] {\n    background-color: #3d4852;\n}\n.xl\\:bg-grey-darker[data-v-ad49e094] {\n    background-color: #606f7b;\n}\n.xl\\:bg-grey-dark[data-v-ad49e094] {\n    background-color: #8795a1;\n}\n.xl\\:bg-grey[data-v-ad49e094] {\n    background-color: #b8c2cc;\n}\n.xl\\:bg-grey-light[data-v-ad49e094] {\n    background-color: #dae1e7;\n}\n.xl\\:bg-grey-lighter[data-v-ad49e094] {\n    background-color: #f1f5f8;\n}\n.xl\\:bg-grey-lightest[data-v-ad49e094] {\n    background-color: #f8fafc;\n}\n.xl\\:bg-white[data-v-ad49e094] {\n    background-color: #fff;\n}\n.xl\\:bg-red-darkest[data-v-ad49e094] {\n    background-color: #3b0d0c;\n}\n.xl\\:bg-red-darker[data-v-ad49e094] {\n    background-color: #621b18;\n}\n.xl\\:bg-red-dark[data-v-ad49e094] {\n    background-color: #cc1f1a;\n}\n.xl\\:bg-red[data-v-ad49e094] {\n    background-color: #e3342f;\n}\n.xl\\:bg-red-light[data-v-ad49e094] {\n    background-color: #ef5753;\n}\n.xl\\:bg-red-lighter[data-v-ad49e094] {\n    background-color: #f9acaa;\n}\n.xl\\:bg-red-lightest[data-v-ad49e094] {\n    background-color: #fcebea;\n}\n.xl\\:bg-orange-darkest[data-v-ad49e094] {\n    background-color: #462a16;\n}\n.xl\\:bg-orange-darker[data-v-ad49e094] {\n    background-color: #613b1f;\n}\n.xl\\:bg-orange-dark[data-v-ad49e094] {\n    background-color: #de751f;\n}\n.xl\\:bg-orange[data-v-ad49e094] {\n    background-color: #f6993f;\n}\n.xl\\:bg-orange-light[data-v-ad49e094] {\n    background-color: #faad63;\n}\n.xl\\:bg-orange-lighter[data-v-ad49e094] {\n    background-color: #fcd9b6;\n}\n.xl\\:bg-orange-lightest[data-v-ad49e094] {\n    background-color: #fff5eb;\n}\n.xl\\:bg-yellow-darkest[data-v-ad49e094] {\n    background-color: #453411;\n}\n.xl\\:bg-yellow-darker[data-v-ad49e094] {\n    background-color: #684f1d;\n}\n.xl\\:bg-yellow-dark[data-v-ad49e094] {\n    background-color: #f2d024;\n}\n.xl\\:bg-yellow[data-v-ad49e094] {\n    background-color: #ffed4a;\n}\n.xl\\:bg-yellow-light[data-v-ad49e094] {\n    background-color: #fff382;\n}\n.xl\\:bg-yellow-lighter[data-v-ad49e094] {\n    background-color: #fff9c2;\n}\n.xl\\:bg-yellow-lightest[data-v-ad49e094] {\n    background-color: #fcfbeb;\n}\n.xl\\:bg-green-darkest[data-v-ad49e094] {\n    background-color: #0f2f21;\n}\n.xl\\:bg-green-darker[data-v-ad49e094] {\n    background-color: #1a4731;\n}\n.xl\\:bg-green-dark[data-v-ad49e094] {\n    background-color: #1f9d55;\n}\n.xl\\:bg-green[data-v-ad49e094] {\n    background-color: #38c172;\n}\n.xl\\:bg-green-light[data-v-ad49e094] {\n    background-color: #51d88a;\n}\n.xl\\:bg-green-lighter[data-v-ad49e094] {\n    background-color: #a2f5bf;\n}\n.xl\\:bg-green-lightest[data-v-ad49e094] {\n    background-color: #e3fcec;\n}\n.xl\\:bg-teal-darkest[data-v-ad49e094] {\n    background-color: #0d3331;\n}\n.xl\\:bg-teal-darker[data-v-ad49e094] {\n    background-color: #20504f;\n}\n.xl\\:bg-teal-dark[data-v-ad49e094] {\n    background-color: #38a89d;\n}\n.xl\\:bg-teal[data-v-ad49e094] {\n    background-color: #4dc0b5;\n}\n.xl\\:bg-teal-light[data-v-ad49e094] {\n    background-color: #64d5ca;\n}\n.xl\\:bg-teal-lighter[data-v-ad49e094] {\n    background-color: #a0f0ed;\n}\n.xl\\:bg-teal-lightest[data-v-ad49e094] {\n    background-color: #e8fffe;\n}\n.xl\\:bg-blue-darkest[data-v-ad49e094] {\n    background-color: #12283a;\n}\n.xl\\:bg-blue-darker[data-v-ad49e094] {\n    background-color: #1c3d5a;\n}\n.xl\\:bg-blue-dark[data-v-ad49e094] {\n    background-color: #2779bd;\n}\n.xl\\:bg-blue[data-v-ad49e094] {\n    background-color: #3490dc;\n}\n.xl\\:bg-blue-light[data-v-ad49e094] {\n    background-color: #6cb2eb;\n}\n.xl\\:bg-blue-lighter[data-v-ad49e094] {\n    background-color: #bcdefa;\n}\n.xl\\:bg-blue-lightest[data-v-ad49e094] {\n    background-color: #eff8ff;\n}\n.xl\\:bg-indigo-darkest[data-v-ad49e094] {\n    background-color: #191e38;\n}\n.xl\\:bg-indigo-darker[data-v-ad49e094] {\n    background-color: #2f365f;\n}\n.xl\\:bg-indigo-dark[data-v-ad49e094] {\n    background-color: #5661b3;\n}\n.xl\\:bg-indigo[data-v-ad49e094] {\n    background-color: #6574cd;\n}\n.xl\\:bg-indigo-light[data-v-ad49e094] {\n    background-color: #7886d7;\n}\n.xl\\:bg-indigo-lighter[data-v-ad49e094] {\n    background-color: #b2b7ff;\n}\n.xl\\:bg-indigo-lightest[data-v-ad49e094] {\n    background-color: #e6e8ff;\n}\n.xl\\:bg-purple-darkest[data-v-ad49e094] {\n    background-color: #21183c;\n}\n.xl\\:bg-purple-darker[data-v-ad49e094] {\n    background-color: #382b5f;\n}\n.xl\\:bg-purple-dark[data-v-ad49e094] {\n    background-color: #794acf;\n}\n.xl\\:bg-purple[data-v-ad49e094] {\n    background-color: #9561e2;\n}\n.xl\\:bg-purple-light[data-v-ad49e094] {\n    background-color: #a779e9;\n}\n.xl\\:bg-purple-lighter[data-v-ad49e094] {\n    background-color: #d6bbfc;\n}\n.xl\\:bg-purple-lightest[data-v-ad49e094] {\n    background-color: #f3ebff;\n}\n.xl\\:bg-pink-darkest[data-v-ad49e094] {\n    background-color: #451225;\n}\n.xl\\:bg-pink-darker[data-v-ad49e094] {\n    background-color: #6f213f;\n}\n.xl\\:bg-pink-dark[data-v-ad49e094] {\n    background-color: #eb5286;\n}\n.xl\\:bg-pink[data-v-ad49e094] {\n    background-color: #f66d9b;\n}\n.xl\\:bg-pink-light[data-v-ad49e094] {\n    background-color: #fa7ea8;\n}\n.xl\\:bg-pink-lighter[data-v-ad49e094] {\n    background-color: #ffbbca;\n}\n.xl\\:bg-pink-lightest[data-v-ad49e094] {\n    background-color: #ffebef;\n}\n.xl\\:hover\\:bg-transparent[data-v-ad49e094]:hover {\n    background-color: transparent;\n}\n.xl\\:hover\\:bg-black[data-v-ad49e094]:hover {\n    background-color: #22292f;\n}\n.xl\\:hover\\:bg-grey-darkest[data-v-ad49e094]:hover {\n    background-color: #3d4852;\n}\n.xl\\:hover\\:bg-grey-darker[data-v-ad49e094]:hover {\n    background-color: #606f7b;\n}\n.xl\\:hover\\:bg-grey-dark[data-v-ad49e094]:hover {\n    background-color: #8795a1;\n}\n.xl\\:hover\\:bg-grey[data-v-ad49e094]:hover {\n    background-color: #b8c2cc;\n}\n.xl\\:hover\\:bg-grey-light[data-v-ad49e094]:hover {\n    background-color: #dae1e7;\n}\n.xl\\:hover\\:bg-grey-lighter[data-v-ad49e094]:hover {\n    background-color: #f1f5f8;\n}\n.xl\\:hover\\:bg-grey-lightest[data-v-ad49e094]:hover {\n    background-color: #f8fafc;\n}\n.xl\\:hover\\:bg-white[data-v-ad49e094]:hover {\n    background-color: #fff;\n}\n.xl\\:hover\\:bg-red-darkest[data-v-ad49e094]:hover {\n    background-color: #3b0d0c;\n}\n.xl\\:hover\\:bg-red-darker[data-v-ad49e094]:hover {\n    background-color: #621b18;\n}\n.xl\\:hover\\:bg-red-dark[data-v-ad49e094]:hover {\n    background-color: #cc1f1a;\n}\n.xl\\:hover\\:bg-red[data-v-ad49e094]:hover {\n    background-color: #e3342f;\n}\n.xl\\:hover\\:bg-red-light[data-v-ad49e094]:hover {\n    background-color: #ef5753;\n}\n.xl\\:hover\\:bg-red-lighter[data-v-ad49e094]:hover {\n    background-color: #f9acaa;\n}\n.xl\\:hover\\:bg-red-lightest[data-v-ad49e094]:hover {\n    background-color: #fcebea;\n}\n.xl\\:hover\\:bg-orange-darkest[data-v-ad49e094]:hover {\n    background-color: #462a16;\n}\n.xl\\:hover\\:bg-orange-darker[data-v-ad49e094]:hover {\n    background-color: #613b1f;\n}\n.xl\\:hover\\:bg-orange-dark[data-v-ad49e094]:hover {\n    background-color: #de751f;\n}\n.xl\\:hover\\:bg-orange[data-v-ad49e094]:hover {\n    background-color: #f6993f;\n}\n.xl\\:hover\\:bg-orange-light[data-v-ad49e094]:hover {\n    background-color: #faad63;\n}\n.xl\\:hover\\:bg-orange-lighter[data-v-ad49e094]:hover {\n    background-color: #fcd9b6;\n}\n.xl\\:hover\\:bg-orange-lightest[data-v-ad49e094]:hover {\n    background-color: #fff5eb;\n}\n.xl\\:hover\\:bg-yellow-darkest[data-v-ad49e094]:hover {\n    background-color: #453411;\n}\n.xl\\:hover\\:bg-yellow-darker[data-v-ad49e094]:hover {\n    background-color: #684f1d;\n}\n.xl\\:hover\\:bg-yellow-dark[data-v-ad49e094]:hover {\n    background-color: #f2d024;\n}\n.xl\\:hover\\:bg-yellow[data-v-ad49e094]:hover {\n    background-color: #ffed4a;\n}\n.xl\\:hover\\:bg-yellow-light[data-v-ad49e094]:hover {\n    background-color: #fff382;\n}\n.xl\\:hover\\:bg-yellow-lighter[data-v-ad49e094]:hover {\n    background-color: #fff9c2;\n}\n.xl\\:hover\\:bg-yellow-lightest[data-v-ad49e094]:hover {\n    background-color: #fcfbeb;\n}\n.xl\\:hover\\:bg-green-darkest[data-v-ad49e094]:hover {\n    background-color: #0f2f21;\n}\n.xl\\:hover\\:bg-green-darker[data-v-ad49e094]:hover {\n    background-color: #1a4731;\n}\n.xl\\:hover\\:bg-green-dark[data-v-ad49e094]:hover {\n    background-color: #1f9d55;\n}\n.xl\\:hover\\:bg-green[data-v-ad49e094]:hover {\n    background-color: #38c172;\n}\n.xl\\:hover\\:bg-green-light[data-v-ad49e094]:hover {\n    background-color: #51d88a;\n}\n.xl\\:hover\\:bg-green-lighter[data-v-ad49e094]:hover {\n    background-color: #a2f5bf;\n}\n.xl\\:hover\\:bg-green-lightest[data-v-ad49e094]:hover {\n    background-color: #e3fcec;\n}\n.xl\\:hover\\:bg-teal-darkest[data-v-ad49e094]:hover {\n    background-color: #0d3331;\n}\n.xl\\:hover\\:bg-teal-darker[data-v-ad49e094]:hover {\n    background-color: #20504f;\n}\n.xl\\:hover\\:bg-teal-dark[data-v-ad49e094]:hover {\n    background-color: #38a89d;\n}\n.xl\\:hover\\:bg-teal[data-v-ad49e094]:hover {\n    background-color: #4dc0b5;\n}\n.xl\\:hover\\:bg-teal-light[data-v-ad49e094]:hover {\n    background-color: #64d5ca;\n}\n.xl\\:hover\\:bg-teal-lighter[data-v-ad49e094]:hover {\n    background-color: #a0f0ed;\n}\n.xl\\:hover\\:bg-teal-lightest[data-v-ad49e094]:hover {\n    background-color: #e8fffe;\n}\n.xl\\:hover\\:bg-blue-darkest[data-v-ad49e094]:hover {\n    background-color: #12283a;\n}\n.xl\\:hover\\:bg-blue-darker[data-v-ad49e094]:hover {\n    background-color: #1c3d5a;\n}\n.xl\\:hover\\:bg-blue-dark[data-v-ad49e094]:hover {\n    background-color: #2779bd;\n}\n.xl\\:hover\\:bg-blue[data-v-ad49e094]:hover {\n    background-color: #3490dc;\n}\n.xl\\:hover\\:bg-blue-light[data-v-ad49e094]:hover {\n    background-color: #6cb2eb;\n}\n.xl\\:hover\\:bg-blue-lighter[data-v-ad49e094]:hover {\n    background-color: #bcdefa;\n}\n.xl\\:hover\\:bg-blue-lightest[data-v-ad49e094]:hover {\n    background-color: #eff8ff;\n}\n.xl\\:hover\\:bg-indigo-darkest[data-v-ad49e094]:hover {\n    background-color: #191e38;\n}\n.xl\\:hover\\:bg-indigo-darker[data-v-ad49e094]:hover {\n    background-color: #2f365f;\n}\n.xl\\:hover\\:bg-indigo-dark[data-v-ad49e094]:hover {\n    background-color: #5661b3;\n}\n.xl\\:hover\\:bg-indigo[data-v-ad49e094]:hover {\n    background-color: #6574cd;\n}\n.xl\\:hover\\:bg-indigo-light[data-v-ad49e094]:hover {\n    background-color: #7886d7;\n}\n.xl\\:hover\\:bg-indigo-lighter[data-v-ad49e094]:hover {\n    background-color: #b2b7ff;\n}\n.xl\\:hover\\:bg-indigo-lightest[data-v-ad49e094]:hover {\n    background-color: #e6e8ff;\n}\n.xl\\:hover\\:bg-purple-darkest[data-v-ad49e094]:hover {\n    background-color: #21183c;\n}\n.xl\\:hover\\:bg-purple-darker[data-v-ad49e094]:hover {\n    background-color: #382b5f;\n}\n.xl\\:hover\\:bg-purple-dark[data-v-ad49e094]:hover {\n    background-color: #794acf;\n}\n.xl\\:hover\\:bg-purple[data-v-ad49e094]:hover {\n    background-color: #9561e2;\n}\n.xl\\:hover\\:bg-purple-light[data-v-ad49e094]:hover {\n    background-color: #a779e9;\n}\n.xl\\:hover\\:bg-purple-lighter[data-v-ad49e094]:hover {\n    background-color: #d6bbfc;\n}\n.xl\\:hover\\:bg-purple-lightest[data-v-ad49e094]:hover {\n    background-color: #f3ebff;\n}\n.xl\\:hover\\:bg-pink-darkest[data-v-ad49e094]:hover {\n    background-color: #451225;\n}\n.xl\\:hover\\:bg-pink-darker[data-v-ad49e094]:hover {\n    background-color: #6f213f;\n}\n.xl\\:hover\\:bg-pink-dark[data-v-ad49e094]:hover {\n    background-color: #eb5286;\n}\n.xl\\:hover\\:bg-pink[data-v-ad49e094]:hover {\n    background-color: #f66d9b;\n}\n.xl\\:hover\\:bg-pink-light[data-v-ad49e094]:hover {\n    background-color: #fa7ea8;\n}\n.xl\\:hover\\:bg-pink-lighter[data-v-ad49e094]:hover {\n    background-color: #ffbbca;\n}\n.xl\\:hover\\:bg-pink-lightest[data-v-ad49e094]:hover {\n    background-color: #ffebef;\n}\n.xl\\:focus\\:bg-transparent[data-v-ad49e094]:focus {\n    background-color: transparent;\n}\n.xl\\:focus\\:bg-black[data-v-ad49e094]:focus {\n    background-color: #22292f;\n}\n.xl\\:focus\\:bg-grey-darkest[data-v-ad49e094]:focus {\n    background-color: #3d4852;\n}\n.xl\\:focus\\:bg-grey-darker[data-v-ad49e094]:focus {\n    background-color: #606f7b;\n}\n.xl\\:focus\\:bg-grey-dark[data-v-ad49e094]:focus {\n    background-color: #8795a1;\n}\n.xl\\:focus\\:bg-grey[data-v-ad49e094]:focus {\n    background-color: #b8c2cc;\n}\n.xl\\:focus\\:bg-grey-light[data-v-ad49e094]:focus {\n    background-color: #dae1e7;\n}\n.xl\\:focus\\:bg-grey-lighter[data-v-ad49e094]:focus {\n    background-color: #f1f5f8;\n}\n.xl\\:focus\\:bg-grey-lightest[data-v-ad49e094]:focus {\n    background-color: #f8fafc;\n}\n.xl\\:focus\\:bg-white[data-v-ad49e094]:focus {\n    background-color: #fff;\n}\n.xl\\:focus\\:bg-red-darkest[data-v-ad49e094]:focus {\n    background-color: #3b0d0c;\n}\n.xl\\:focus\\:bg-red-darker[data-v-ad49e094]:focus {\n    background-color: #621b18;\n}\n.xl\\:focus\\:bg-red-dark[data-v-ad49e094]:focus {\n    background-color: #cc1f1a;\n}\n.xl\\:focus\\:bg-red[data-v-ad49e094]:focus {\n    background-color: #e3342f;\n}\n.xl\\:focus\\:bg-red-light[data-v-ad49e094]:focus {\n    background-color: #ef5753;\n}\n.xl\\:focus\\:bg-red-lighter[data-v-ad49e094]:focus {\n    background-color: #f9acaa;\n}\n.xl\\:focus\\:bg-red-lightest[data-v-ad49e094]:focus {\n    background-color: #fcebea;\n}\n.xl\\:focus\\:bg-orange-darkest[data-v-ad49e094]:focus {\n    background-color: #462a16;\n}\n.xl\\:focus\\:bg-orange-darker[data-v-ad49e094]:focus {\n    background-color: #613b1f;\n}\n.xl\\:focus\\:bg-orange-dark[data-v-ad49e094]:focus {\n    background-color: #de751f;\n}\n.xl\\:focus\\:bg-orange[data-v-ad49e094]:focus {\n    background-color: #f6993f;\n}\n.xl\\:focus\\:bg-orange-light[data-v-ad49e094]:focus {\n    background-color: #faad63;\n}\n.xl\\:focus\\:bg-orange-lighter[data-v-ad49e094]:focus {\n    background-color: #fcd9b6;\n}\n.xl\\:focus\\:bg-orange-lightest[data-v-ad49e094]:focus {\n    background-color: #fff5eb;\n}\n.xl\\:focus\\:bg-yellow-darkest[data-v-ad49e094]:focus {\n    background-color: #453411;\n}\n.xl\\:focus\\:bg-yellow-darker[data-v-ad49e094]:focus {\n    background-color: #684f1d;\n}\n.xl\\:focus\\:bg-yellow-dark[data-v-ad49e094]:focus {\n    background-color: #f2d024;\n}\n.xl\\:focus\\:bg-yellow[data-v-ad49e094]:focus {\n    background-color: #ffed4a;\n}\n.xl\\:focus\\:bg-yellow-light[data-v-ad49e094]:focus {\n    background-color: #fff382;\n}\n.xl\\:focus\\:bg-yellow-lighter[data-v-ad49e094]:focus {\n    background-color: #fff9c2;\n}\n.xl\\:focus\\:bg-yellow-lightest[data-v-ad49e094]:focus {\n    background-color: #fcfbeb;\n}\n.xl\\:focus\\:bg-green-darkest[data-v-ad49e094]:focus {\n    background-color: #0f2f21;\n}\n.xl\\:focus\\:bg-green-darker[data-v-ad49e094]:focus {\n    background-color: #1a4731;\n}\n.xl\\:focus\\:bg-green-dark[data-v-ad49e094]:focus {\n    background-color: #1f9d55;\n}\n.xl\\:focus\\:bg-green[data-v-ad49e094]:focus {\n    background-color: #38c172;\n}\n.xl\\:focus\\:bg-green-light[data-v-ad49e094]:focus {\n    background-color: #51d88a;\n}\n.xl\\:focus\\:bg-green-lighter[data-v-ad49e094]:focus {\n    background-color: #a2f5bf;\n}\n.xl\\:focus\\:bg-green-lightest[data-v-ad49e094]:focus {\n    background-color: #e3fcec;\n}\n.xl\\:focus\\:bg-teal-darkest[data-v-ad49e094]:focus {\n    background-color: #0d3331;\n}\n.xl\\:focus\\:bg-teal-darker[data-v-ad49e094]:focus {\n    background-color: #20504f;\n}\n.xl\\:focus\\:bg-teal-dark[data-v-ad49e094]:focus {\n    background-color: #38a89d;\n}\n.xl\\:focus\\:bg-teal[data-v-ad49e094]:focus {\n    background-color: #4dc0b5;\n}\n.xl\\:focus\\:bg-teal-light[data-v-ad49e094]:focus {\n    background-color: #64d5ca;\n}\n.xl\\:focus\\:bg-teal-lighter[data-v-ad49e094]:focus {\n    background-color: #a0f0ed;\n}\n.xl\\:focus\\:bg-teal-lightest[data-v-ad49e094]:focus {\n    background-color: #e8fffe;\n}\n.xl\\:focus\\:bg-blue-darkest[data-v-ad49e094]:focus {\n    background-color: #12283a;\n}\n.xl\\:focus\\:bg-blue-darker[data-v-ad49e094]:focus {\n    background-color: #1c3d5a;\n}\n.xl\\:focus\\:bg-blue-dark[data-v-ad49e094]:focus {\n    background-color: #2779bd;\n}\n.xl\\:focus\\:bg-blue[data-v-ad49e094]:focus {\n    background-color: #3490dc;\n}\n.xl\\:focus\\:bg-blue-light[data-v-ad49e094]:focus {\n    background-color: #6cb2eb;\n}\n.xl\\:focus\\:bg-blue-lighter[data-v-ad49e094]:focus {\n    background-color: #bcdefa;\n}\n.xl\\:focus\\:bg-blue-lightest[data-v-ad49e094]:focus {\n    background-color: #eff8ff;\n}\n.xl\\:focus\\:bg-indigo-darkest[data-v-ad49e094]:focus {\n    background-color: #191e38;\n}\n.xl\\:focus\\:bg-indigo-darker[data-v-ad49e094]:focus {\n    background-color: #2f365f;\n}\n.xl\\:focus\\:bg-indigo-dark[data-v-ad49e094]:focus {\n    background-color: #5661b3;\n}\n.xl\\:focus\\:bg-indigo[data-v-ad49e094]:focus {\n    background-color: #6574cd;\n}\n.xl\\:focus\\:bg-indigo-light[data-v-ad49e094]:focus {\n    background-color: #7886d7;\n}\n.xl\\:focus\\:bg-indigo-lighter[data-v-ad49e094]:focus {\n    background-color: #b2b7ff;\n}\n.xl\\:focus\\:bg-indigo-lightest[data-v-ad49e094]:focus {\n    background-color: #e6e8ff;\n}\n.xl\\:focus\\:bg-purple-darkest[data-v-ad49e094]:focus {\n    background-color: #21183c;\n}\n.xl\\:focus\\:bg-purple-darker[data-v-ad49e094]:focus {\n    background-color: #382b5f;\n}\n.xl\\:focus\\:bg-purple-dark[data-v-ad49e094]:focus {\n    background-color: #794acf;\n}\n.xl\\:focus\\:bg-purple[data-v-ad49e094]:focus {\n    background-color: #9561e2;\n}\n.xl\\:focus\\:bg-purple-light[data-v-ad49e094]:focus {\n    background-color: #a779e9;\n}\n.xl\\:focus\\:bg-purple-lighter[data-v-ad49e094]:focus {\n    background-color: #d6bbfc;\n}\n.xl\\:focus\\:bg-purple-lightest[data-v-ad49e094]:focus {\n    background-color: #f3ebff;\n}\n.xl\\:focus\\:bg-pink-darkest[data-v-ad49e094]:focus {\n    background-color: #451225;\n}\n.xl\\:focus\\:bg-pink-darker[data-v-ad49e094]:focus {\n    background-color: #6f213f;\n}\n.xl\\:focus\\:bg-pink-dark[data-v-ad49e094]:focus {\n    background-color: #eb5286;\n}\n.xl\\:focus\\:bg-pink[data-v-ad49e094]:focus {\n    background-color: #f66d9b;\n}\n.xl\\:focus\\:bg-pink-light[data-v-ad49e094]:focus {\n    background-color: #fa7ea8;\n}\n.xl\\:focus\\:bg-pink-lighter[data-v-ad49e094]:focus {\n    background-color: #ffbbca;\n}\n.xl\\:focus\\:bg-pink-lightest[data-v-ad49e094]:focus {\n    background-color: #ffebef;\n}\n.xl\\:bg-bottom[data-v-ad49e094] {\n    background-position: bottom;\n}\n.xl\\:bg-center[data-v-ad49e094] {\n    background-position: center;\n}\n.xl\\:bg-left[data-v-ad49e094] {\n    background-position: left;\n}\n.xl\\:bg-left-bottom[data-v-ad49e094] {\n    background-position: left bottom;\n}\n.xl\\:bg-left-top[data-v-ad49e094] {\n    background-position: left top;\n}\n.xl\\:bg-right[data-v-ad49e094] {\n    background-position: right;\n}\n.xl\\:bg-right-bottom[data-v-ad49e094] {\n    background-position: right bottom;\n}\n.xl\\:bg-right-top[data-v-ad49e094] {\n    background-position: right top;\n}\n.xl\\:bg-top[data-v-ad49e094] {\n    background-position: top;\n}\n.xl\\:bg-repeat[data-v-ad49e094] {\n    background-repeat: repeat;\n}\n.xl\\:bg-no-repeat[data-v-ad49e094] {\n    background-repeat: no-repeat;\n}\n.xl\\:bg-repeat-x[data-v-ad49e094] {\n    background-repeat: repeat-x;\n}\n.xl\\:bg-repeat-y[data-v-ad49e094] {\n    background-repeat: repeat-y;\n}\n.xl\\:bg-auto[data-v-ad49e094] {\n    background-size: auto;\n}\n.xl\\:bg-cover[data-v-ad49e094] {\n    background-size: cover;\n}\n.xl\\:bg-contain[data-v-ad49e094] {\n    background-size: contain;\n}\n.xl\\:border-transparent[data-v-ad49e094] {\n    border-color: transparent;\n}\n.xl\\:border-black[data-v-ad49e094] {\n    border-color: #22292f;\n}\n.xl\\:border-grey-darkest[data-v-ad49e094] {\n    border-color: #3d4852;\n}\n.xl\\:border-grey-darker[data-v-ad49e094] {\n    border-color: #606f7b;\n}\n.xl\\:border-grey-dark[data-v-ad49e094] {\n    border-color: #8795a1;\n}\n.xl\\:border-grey[data-v-ad49e094] {\n    border-color: #b8c2cc;\n}\n.xl\\:border-grey-light[data-v-ad49e094] {\n    border-color: #dae1e7;\n}\n.xl\\:border-grey-lighter[data-v-ad49e094] {\n    border-color: #f1f5f8;\n}\n.xl\\:border-grey-lightest[data-v-ad49e094] {\n    border-color: #f8fafc;\n}\n.xl\\:border-white[data-v-ad49e094] {\n    border-color: #fff;\n}\n.xl\\:border-red-darkest[data-v-ad49e094] {\n    border-color: #3b0d0c;\n}\n.xl\\:border-red-darker[data-v-ad49e094] {\n    border-color: #621b18;\n}\n.xl\\:border-red-dark[data-v-ad49e094] {\n    border-color: #cc1f1a;\n}\n.xl\\:border-red[data-v-ad49e094] {\n    border-color: #e3342f;\n}\n.xl\\:border-red-light[data-v-ad49e094] {\n    border-color: #ef5753;\n}\n.xl\\:border-red-lighter[data-v-ad49e094] {\n    border-color: #f9acaa;\n}\n.xl\\:border-red-lightest[data-v-ad49e094] {\n    border-color: #fcebea;\n}\n.xl\\:border-orange-darkest[data-v-ad49e094] {\n    border-color: #462a16;\n}\n.xl\\:border-orange-darker[data-v-ad49e094] {\n    border-color: #613b1f;\n}\n.xl\\:border-orange-dark[data-v-ad49e094] {\n    border-color: #de751f;\n}\n.xl\\:border-orange[data-v-ad49e094] {\n    border-color: #f6993f;\n}\n.xl\\:border-orange-light[data-v-ad49e094] {\n    border-color: #faad63;\n}\n.xl\\:border-orange-lighter[data-v-ad49e094] {\n    border-color: #fcd9b6;\n}\n.xl\\:border-orange-lightest[data-v-ad49e094] {\n    border-color: #fff5eb;\n}\n.xl\\:border-yellow-darkest[data-v-ad49e094] {\n    border-color: #453411;\n}\n.xl\\:border-yellow-darker[data-v-ad49e094] {\n    border-color: #684f1d;\n}\n.xl\\:border-yellow-dark[data-v-ad49e094] {\n    border-color: #f2d024;\n}\n.xl\\:border-yellow[data-v-ad49e094] {\n    border-color: #ffed4a;\n}\n.xl\\:border-yellow-light[data-v-ad49e094] {\n    border-color: #fff382;\n}\n.xl\\:border-yellow-lighter[data-v-ad49e094] {\n    border-color: #fff9c2;\n}\n.xl\\:border-yellow-lightest[data-v-ad49e094] {\n    border-color: #fcfbeb;\n}\n.xl\\:border-green-darkest[data-v-ad49e094] {\n    border-color: #0f2f21;\n}\n.xl\\:border-green-darker[data-v-ad49e094] {\n    border-color: #1a4731;\n}\n.xl\\:border-green-dark[data-v-ad49e094] {\n    border-color: #1f9d55;\n}\n.xl\\:border-green[data-v-ad49e094] {\n    border-color: #38c172;\n}\n.xl\\:border-green-light[data-v-ad49e094] {\n    border-color: #51d88a;\n}\n.xl\\:border-green-lighter[data-v-ad49e094] {\n    border-color: #a2f5bf;\n}\n.xl\\:border-green-lightest[data-v-ad49e094] {\n    border-color: #e3fcec;\n}\n.xl\\:border-teal-darkest[data-v-ad49e094] {\n    border-color: #0d3331;\n}\n.xl\\:border-teal-darker[data-v-ad49e094] {\n    border-color: #20504f;\n}\n.xl\\:border-teal-dark[data-v-ad49e094] {\n    border-color: #38a89d;\n}\n.xl\\:border-teal[data-v-ad49e094] {\n    border-color: #4dc0b5;\n}\n.xl\\:border-teal-light[data-v-ad49e094] {\n    border-color: #64d5ca;\n}\n.xl\\:border-teal-lighter[data-v-ad49e094] {\n    border-color: #a0f0ed;\n}\n.xl\\:border-teal-lightest[data-v-ad49e094] {\n    border-color: #e8fffe;\n}\n.xl\\:border-blue-darkest[data-v-ad49e094] {\n    border-color: #12283a;\n}\n.xl\\:border-blue-darker[data-v-ad49e094] {\n    border-color: #1c3d5a;\n}\n.xl\\:border-blue-dark[data-v-ad49e094] {\n    border-color: #2779bd;\n}\n.xl\\:border-blue[data-v-ad49e094] {\n    border-color: #3490dc;\n}\n.xl\\:border-blue-light[data-v-ad49e094] {\n    border-color: #6cb2eb;\n}\n.xl\\:border-blue-lighter[data-v-ad49e094] {\n    border-color: #bcdefa;\n}\n.xl\\:border-blue-lightest[data-v-ad49e094] {\n    border-color: #eff8ff;\n}\n.xl\\:border-indigo-darkest[data-v-ad49e094] {\n    border-color: #191e38;\n}\n.xl\\:border-indigo-darker[data-v-ad49e094] {\n    border-color: #2f365f;\n}\n.xl\\:border-indigo-dark[data-v-ad49e094] {\n    border-color: #5661b3;\n}\n.xl\\:border-indigo[data-v-ad49e094] {\n    border-color: #6574cd;\n}\n.xl\\:border-indigo-light[data-v-ad49e094] {\n    border-color: #7886d7;\n}\n.xl\\:border-indigo-lighter[data-v-ad49e094] {\n    border-color: #b2b7ff;\n}\n.xl\\:border-indigo-lightest[data-v-ad49e094] {\n    border-color: #e6e8ff;\n}\n.xl\\:border-purple-darkest[data-v-ad49e094] {\n    border-color: #21183c;\n}\n.xl\\:border-purple-darker[data-v-ad49e094] {\n    border-color: #382b5f;\n}\n.xl\\:border-purple-dark[data-v-ad49e094] {\n    border-color: #794acf;\n}\n.xl\\:border-purple[data-v-ad49e094] {\n    border-color: #9561e2;\n}\n.xl\\:border-purple-light[data-v-ad49e094] {\n    border-color: #a779e9;\n}\n.xl\\:border-purple-lighter[data-v-ad49e094] {\n    border-color: #d6bbfc;\n}\n.xl\\:border-purple-lightest[data-v-ad49e094] {\n    border-color: #f3ebff;\n}\n.xl\\:border-pink-darkest[data-v-ad49e094] {\n    border-color: #451225;\n}\n.xl\\:border-pink-darker[data-v-ad49e094] {\n    border-color: #6f213f;\n}\n.xl\\:border-pink-dark[data-v-ad49e094] {\n    border-color: #eb5286;\n}\n.xl\\:border-pink[data-v-ad49e094] {\n    border-color: #f66d9b;\n}\n.xl\\:border-pink-light[data-v-ad49e094] {\n    border-color: #fa7ea8;\n}\n.xl\\:border-pink-lighter[data-v-ad49e094] {\n    border-color: #ffbbca;\n}\n.xl\\:border-pink-lightest[data-v-ad49e094] {\n    border-color: #ffebef;\n}\n.xl\\:hover\\:border-transparent[data-v-ad49e094]:hover {\n    border-color: transparent;\n}\n.xl\\:hover\\:border-black[data-v-ad49e094]:hover {\n    border-color: #22292f;\n}\n.xl\\:hover\\:border-grey-darkest[data-v-ad49e094]:hover {\n    border-color: #3d4852;\n}\n.xl\\:hover\\:border-grey-darker[data-v-ad49e094]:hover {\n    border-color: #606f7b;\n}\n.xl\\:hover\\:border-grey-dark[data-v-ad49e094]:hover {\n    border-color: #8795a1;\n}\n.xl\\:hover\\:border-grey[data-v-ad49e094]:hover {\n    border-color: #b8c2cc;\n}\n.xl\\:hover\\:border-grey-light[data-v-ad49e094]:hover {\n    border-color: #dae1e7;\n}\n.xl\\:hover\\:border-grey-lighter[data-v-ad49e094]:hover {\n    border-color: #f1f5f8;\n}\n.xl\\:hover\\:border-grey-lightest[data-v-ad49e094]:hover {\n    border-color: #f8fafc;\n}\n.xl\\:hover\\:border-white[data-v-ad49e094]:hover {\n    border-color: #fff;\n}\n.xl\\:hover\\:border-red-darkest[data-v-ad49e094]:hover {\n    border-color: #3b0d0c;\n}\n.xl\\:hover\\:border-red-darker[data-v-ad49e094]:hover {\n    border-color: #621b18;\n}\n.xl\\:hover\\:border-red-dark[data-v-ad49e094]:hover {\n    border-color: #cc1f1a;\n}\n.xl\\:hover\\:border-red[data-v-ad49e094]:hover {\n    border-color: #e3342f;\n}\n.xl\\:hover\\:border-red-light[data-v-ad49e094]:hover {\n    border-color: #ef5753;\n}\n.xl\\:hover\\:border-red-lighter[data-v-ad49e094]:hover {\n    border-color: #f9acaa;\n}\n.xl\\:hover\\:border-red-lightest[data-v-ad49e094]:hover {\n    border-color: #fcebea;\n}\n.xl\\:hover\\:border-orange-darkest[data-v-ad49e094]:hover {\n    border-color: #462a16;\n}\n.xl\\:hover\\:border-orange-darker[data-v-ad49e094]:hover {\n    border-color: #613b1f;\n}\n.xl\\:hover\\:border-orange-dark[data-v-ad49e094]:hover {\n    border-color: #de751f;\n}\n.xl\\:hover\\:border-orange[data-v-ad49e094]:hover {\n    border-color: #f6993f;\n}\n.xl\\:hover\\:border-orange-light[data-v-ad49e094]:hover {\n    border-color: #faad63;\n}\n.xl\\:hover\\:border-orange-lighter[data-v-ad49e094]:hover {\n    border-color: #fcd9b6;\n}\n.xl\\:hover\\:border-orange-lightest[data-v-ad49e094]:hover {\n    border-color: #fff5eb;\n}\n.xl\\:hover\\:border-yellow-darkest[data-v-ad49e094]:hover {\n    border-color: #453411;\n}\n.xl\\:hover\\:border-yellow-darker[data-v-ad49e094]:hover {\n    border-color: #684f1d;\n}\n.xl\\:hover\\:border-yellow-dark[data-v-ad49e094]:hover {\n    border-color: #f2d024;\n}\n.xl\\:hover\\:border-yellow[data-v-ad49e094]:hover {\n    border-color: #ffed4a;\n}\n.xl\\:hover\\:border-yellow-light[data-v-ad49e094]:hover {\n    border-color: #fff382;\n}\n.xl\\:hover\\:border-yellow-lighter[data-v-ad49e094]:hover {\n    border-color: #fff9c2;\n}\n.xl\\:hover\\:border-yellow-lightest[data-v-ad49e094]:hover {\n    border-color: #fcfbeb;\n}\n.xl\\:hover\\:border-green-darkest[data-v-ad49e094]:hover {\n    border-color: #0f2f21;\n}\n.xl\\:hover\\:border-green-darker[data-v-ad49e094]:hover {\n    border-color: #1a4731;\n}\n.xl\\:hover\\:border-green-dark[data-v-ad49e094]:hover {\n    border-color: #1f9d55;\n}\n.xl\\:hover\\:border-green[data-v-ad49e094]:hover {\n    border-color: #38c172;\n}\n.xl\\:hover\\:border-green-light[data-v-ad49e094]:hover {\n    border-color: #51d88a;\n}\n.xl\\:hover\\:border-green-lighter[data-v-ad49e094]:hover {\n    border-color: #a2f5bf;\n}\n.xl\\:hover\\:border-green-lightest[data-v-ad49e094]:hover {\n    border-color: #e3fcec;\n}\n.xl\\:hover\\:border-teal-darkest[data-v-ad49e094]:hover {\n    border-color: #0d3331;\n}\n.xl\\:hover\\:border-teal-darker[data-v-ad49e094]:hover {\n    border-color: #20504f;\n}\n.xl\\:hover\\:border-teal-dark[data-v-ad49e094]:hover {\n    border-color: #38a89d;\n}\n.xl\\:hover\\:border-teal[data-v-ad49e094]:hover {\n    border-color: #4dc0b5;\n}\n.xl\\:hover\\:border-teal-light[data-v-ad49e094]:hover {\n    border-color: #64d5ca;\n}\n.xl\\:hover\\:border-teal-lighter[data-v-ad49e094]:hover {\n    border-color: #a0f0ed;\n}\n.xl\\:hover\\:border-teal-lightest[data-v-ad49e094]:hover {\n    border-color: #e8fffe;\n}\n.xl\\:hover\\:border-blue-darkest[data-v-ad49e094]:hover {\n    border-color: #12283a;\n}\n.xl\\:hover\\:border-blue-darker[data-v-ad49e094]:hover {\n    border-color: #1c3d5a;\n}\n.xl\\:hover\\:border-blue-dark[data-v-ad49e094]:hover {\n    border-color: #2779bd;\n}\n.xl\\:hover\\:border-blue[data-v-ad49e094]:hover {\n    border-color: #3490dc;\n}\n.xl\\:hover\\:border-blue-light[data-v-ad49e094]:hover {\n    border-color: #6cb2eb;\n}\n.xl\\:hover\\:border-blue-lighter[data-v-ad49e094]:hover {\n    border-color: #bcdefa;\n}\n.xl\\:hover\\:border-blue-lightest[data-v-ad49e094]:hover {\n    border-color: #eff8ff;\n}\n.xl\\:hover\\:border-indigo-darkest[data-v-ad49e094]:hover {\n    border-color: #191e38;\n}\n.xl\\:hover\\:border-indigo-darker[data-v-ad49e094]:hover {\n    border-color: #2f365f;\n}\n.xl\\:hover\\:border-indigo-dark[data-v-ad49e094]:hover {\n    border-color: #5661b3;\n}\n.xl\\:hover\\:border-indigo[data-v-ad49e094]:hover {\n    border-color: #6574cd;\n}\n.xl\\:hover\\:border-indigo-light[data-v-ad49e094]:hover {\n    border-color: #7886d7;\n}\n.xl\\:hover\\:border-indigo-lighter[data-v-ad49e094]:hover {\n    border-color: #b2b7ff;\n}\n.xl\\:hover\\:border-indigo-lightest[data-v-ad49e094]:hover {\n    border-color: #e6e8ff;\n}\n.xl\\:hover\\:border-purple-darkest[data-v-ad49e094]:hover {\n    border-color: #21183c;\n}\n.xl\\:hover\\:border-purple-darker[data-v-ad49e094]:hover {\n    border-color: #382b5f;\n}\n.xl\\:hover\\:border-purple-dark[data-v-ad49e094]:hover {\n    border-color: #794acf;\n}\n.xl\\:hover\\:border-purple[data-v-ad49e094]:hover {\n    border-color: #9561e2;\n}\n.xl\\:hover\\:border-purple-light[data-v-ad49e094]:hover {\n    border-color: #a779e9;\n}\n.xl\\:hover\\:border-purple-lighter[data-v-ad49e094]:hover {\n    border-color: #d6bbfc;\n}\n.xl\\:hover\\:border-purple-lightest[data-v-ad49e094]:hover {\n    border-color: #f3ebff;\n}\n.xl\\:hover\\:border-pink-darkest[data-v-ad49e094]:hover {\n    border-color: #451225;\n}\n.xl\\:hover\\:border-pink-darker[data-v-ad49e094]:hover {\n    border-color: #6f213f;\n}\n.xl\\:hover\\:border-pink-dark[data-v-ad49e094]:hover {\n    border-color: #eb5286;\n}\n.xl\\:hover\\:border-pink[data-v-ad49e094]:hover {\n    border-color: #f66d9b;\n}\n.xl\\:hover\\:border-pink-light[data-v-ad49e094]:hover {\n    border-color: #fa7ea8;\n}\n.xl\\:hover\\:border-pink-lighter[data-v-ad49e094]:hover {\n    border-color: #ffbbca;\n}\n.xl\\:hover\\:border-pink-lightest[data-v-ad49e094]:hover {\n    border-color: #ffebef;\n}\n.xl\\:focus\\:border-transparent[data-v-ad49e094]:focus {\n    border-color: transparent;\n}\n.xl\\:focus\\:border-black[data-v-ad49e094]:focus {\n    border-color: #22292f;\n}\n.xl\\:focus\\:border-grey-darkest[data-v-ad49e094]:focus {\n    border-color: #3d4852;\n}\n.xl\\:focus\\:border-grey-darker[data-v-ad49e094]:focus {\n    border-color: #606f7b;\n}\n.xl\\:focus\\:border-grey-dark[data-v-ad49e094]:focus {\n    border-color: #8795a1;\n}\n.xl\\:focus\\:border-grey[data-v-ad49e094]:focus {\n    border-color: #b8c2cc;\n}\n.xl\\:focus\\:border-grey-light[data-v-ad49e094]:focus {\n    border-color: #dae1e7;\n}\n.xl\\:focus\\:border-grey-lighter[data-v-ad49e094]:focus {\n    border-color: #f1f5f8;\n}\n.xl\\:focus\\:border-grey-lightest[data-v-ad49e094]:focus {\n    border-color: #f8fafc;\n}\n.xl\\:focus\\:border-white[data-v-ad49e094]:focus {\n    border-color: #fff;\n}\n.xl\\:focus\\:border-red-darkest[data-v-ad49e094]:focus {\n    border-color: #3b0d0c;\n}\n.xl\\:focus\\:border-red-darker[data-v-ad49e094]:focus {\n    border-color: #621b18;\n}\n.xl\\:focus\\:border-red-dark[data-v-ad49e094]:focus {\n    border-color: #cc1f1a;\n}\n.xl\\:focus\\:border-red[data-v-ad49e094]:focus {\n    border-color: #e3342f;\n}\n.xl\\:focus\\:border-red-light[data-v-ad49e094]:focus {\n    border-color: #ef5753;\n}\n.xl\\:focus\\:border-red-lighter[data-v-ad49e094]:focus {\n    border-color: #f9acaa;\n}\n.xl\\:focus\\:border-red-lightest[data-v-ad49e094]:focus {\n    border-color: #fcebea;\n}\n.xl\\:focus\\:border-orange-darkest[data-v-ad49e094]:focus {\n    border-color: #462a16;\n}\n.xl\\:focus\\:border-orange-darker[data-v-ad49e094]:focus {\n    border-color: #613b1f;\n}\n.xl\\:focus\\:border-orange-dark[data-v-ad49e094]:focus {\n    border-color: #de751f;\n}\n.xl\\:focus\\:border-orange[data-v-ad49e094]:focus {\n    border-color: #f6993f;\n}\n.xl\\:focus\\:border-orange-light[data-v-ad49e094]:focus {\n    border-color: #faad63;\n}\n.xl\\:focus\\:border-orange-lighter[data-v-ad49e094]:focus {\n    border-color: #fcd9b6;\n}\n.xl\\:focus\\:border-orange-lightest[data-v-ad49e094]:focus {\n    border-color: #fff5eb;\n}\n.xl\\:focus\\:border-yellow-darkest[data-v-ad49e094]:focus {\n    border-color: #453411;\n}\n.xl\\:focus\\:border-yellow-darker[data-v-ad49e094]:focus {\n    border-color: #684f1d;\n}\n.xl\\:focus\\:border-yellow-dark[data-v-ad49e094]:focus {\n    border-color: #f2d024;\n}\n.xl\\:focus\\:border-yellow[data-v-ad49e094]:focus {\n    border-color: #ffed4a;\n}\n.xl\\:focus\\:border-yellow-light[data-v-ad49e094]:focus {\n    border-color: #fff382;\n}\n.xl\\:focus\\:border-yellow-lighter[data-v-ad49e094]:focus {\n    border-color: #fff9c2;\n}\n.xl\\:focus\\:border-yellow-lightest[data-v-ad49e094]:focus {\n    border-color: #fcfbeb;\n}\n.xl\\:focus\\:border-green-darkest[data-v-ad49e094]:focus {\n    border-color: #0f2f21;\n}\n.xl\\:focus\\:border-green-darker[data-v-ad49e094]:focus {\n    border-color: #1a4731;\n}\n.xl\\:focus\\:border-green-dark[data-v-ad49e094]:focus {\n    border-color: #1f9d55;\n}\n.xl\\:focus\\:border-green[data-v-ad49e094]:focus {\n    border-color: #38c172;\n}\n.xl\\:focus\\:border-green-light[data-v-ad49e094]:focus {\n    border-color: #51d88a;\n}\n.xl\\:focus\\:border-green-lighter[data-v-ad49e094]:focus {\n    border-color: #a2f5bf;\n}\n.xl\\:focus\\:border-green-lightest[data-v-ad49e094]:focus {\n    border-color: #e3fcec;\n}\n.xl\\:focus\\:border-teal-darkest[data-v-ad49e094]:focus {\n    border-color: #0d3331;\n}\n.xl\\:focus\\:border-teal-darker[data-v-ad49e094]:focus {\n    border-color: #20504f;\n}\n.xl\\:focus\\:border-teal-dark[data-v-ad49e094]:focus {\n    border-color: #38a89d;\n}\n.xl\\:focus\\:border-teal[data-v-ad49e094]:focus {\n    border-color: #4dc0b5;\n}\n.xl\\:focus\\:border-teal-light[data-v-ad49e094]:focus {\n    border-color: #64d5ca;\n}\n.xl\\:focus\\:border-teal-lighter[data-v-ad49e094]:focus {\n    border-color: #a0f0ed;\n}\n.xl\\:focus\\:border-teal-lightest[data-v-ad49e094]:focus {\n    border-color: #e8fffe;\n}\n.xl\\:focus\\:border-blue-darkest[data-v-ad49e094]:focus {\n    border-color: #12283a;\n}\n.xl\\:focus\\:border-blue-darker[data-v-ad49e094]:focus {\n    border-color: #1c3d5a;\n}\n.xl\\:focus\\:border-blue-dark[data-v-ad49e094]:focus {\n    border-color: #2779bd;\n}\n.xl\\:focus\\:border-blue[data-v-ad49e094]:focus {\n    border-color: #3490dc;\n}\n.xl\\:focus\\:border-blue-light[data-v-ad49e094]:focus {\n    border-color: #6cb2eb;\n}\n.xl\\:focus\\:border-blue-lighter[data-v-ad49e094]:focus {\n    border-color: #bcdefa;\n}\n.xl\\:focus\\:border-blue-lightest[data-v-ad49e094]:focus {\n    border-color: #eff8ff;\n}\n.xl\\:focus\\:border-indigo-darkest[data-v-ad49e094]:focus {\n    border-color: #191e38;\n}\n.xl\\:focus\\:border-indigo-darker[data-v-ad49e094]:focus {\n    border-color: #2f365f;\n}\n.xl\\:focus\\:border-indigo-dark[data-v-ad49e094]:focus {\n    border-color: #5661b3;\n}\n.xl\\:focus\\:border-indigo[data-v-ad49e094]:focus {\n    border-color: #6574cd;\n}\n.xl\\:focus\\:border-indigo-light[data-v-ad49e094]:focus {\n    border-color: #7886d7;\n}\n.xl\\:focus\\:border-indigo-lighter[data-v-ad49e094]:focus {\n    border-color: #b2b7ff;\n}\n.xl\\:focus\\:border-indigo-lightest[data-v-ad49e094]:focus {\n    border-color: #e6e8ff;\n}\n.xl\\:focus\\:border-purple-darkest[data-v-ad49e094]:focus {\n    border-color: #21183c;\n}\n.xl\\:focus\\:border-purple-darker[data-v-ad49e094]:focus {\n    border-color: #382b5f;\n}\n.xl\\:focus\\:border-purple-dark[data-v-ad49e094]:focus {\n    border-color: #794acf;\n}\n.xl\\:focus\\:border-purple[data-v-ad49e094]:focus {\n    border-color: #9561e2;\n}\n.xl\\:focus\\:border-purple-light[data-v-ad49e094]:focus {\n    border-color: #a779e9;\n}\n.xl\\:focus\\:border-purple-lighter[data-v-ad49e094]:focus {\n    border-color: #d6bbfc;\n}\n.xl\\:focus\\:border-purple-lightest[data-v-ad49e094]:focus {\n    border-color: #f3ebff;\n}\n.xl\\:focus\\:border-pink-darkest[data-v-ad49e094]:focus {\n    border-color: #451225;\n}\n.xl\\:focus\\:border-pink-darker[data-v-ad49e094]:focus {\n    border-color: #6f213f;\n}\n.xl\\:focus\\:border-pink-dark[data-v-ad49e094]:focus {\n    border-color: #eb5286;\n}\n.xl\\:focus\\:border-pink[data-v-ad49e094]:focus {\n    border-color: #f66d9b;\n}\n.xl\\:focus\\:border-pink-light[data-v-ad49e094]:focus {\n    border-color: #fa7ea8;\n}\n.xl\\:focus\\:border-pink-lighter[data-v-ad49e094]:focus {\n    border-color: #ffbbca;\n}\n.xl\\:focus\\:border-pink-lightest[data-v-ad49e094]:focus {\n    border-color: #ffebef;\n}\n.xl\\:rounded-none[data-v-ad49e094] {\n    border-radius: 0;\n}\n.xl\\:rounded-sm[data-v-ad49e094] {\n    border-radius: .125rem;\n}\n.xl\\:rounded[data-v-ad49e094] {\n    border-radius: .25rem;\n}\n.xl\\:rounded-lg[data-v-ad49e094] {\n    border-radius: .5rem;\n}\n.xl\\:rounded-full[data-v-ad49e094] {\n    border-radius: 9999px;\n}\n.xl\\:rounded-t-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-top-right-radius: 0;\n}\n.xl\\:rounded-r-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n    border-bottom-right-radius: 0;\n}\n.xl\\:rounded-b-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.xl\\:rounded-l-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n    border-bottom-left-radius: 0;\n}\n.xl\\:rounded-t-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-top-right-radius: .125rem;\n}\n.xl\\:rounded-r-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n    border-bottom-right-radius: .125rem;\n}\n.xl\\:rounded-b-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.xl\\:rounded-l-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n    border-bottom-left-radius: .125rem;\n}\n.xl\\:rounded-t[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-top-right-radius: .25rem;\n}\n.xl\\:rounded-r[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n    border-bottom-right-radius: .25rem;\n}\n.xl\\:rounded-b[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.xl\\:rounded-l[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n    border-bottom-left-radius: .25rem;\n}\n.xl\\:rounded-t-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-top-right-radius: .5rem;\n}\n.xl\\:rounded-r-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n    border-bottom-right-radius: .5rem;\n}\n.xl\\:rounded-b-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.xl\\:rounded-l-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n    border-bottom-left-radius: .5rem;\n}\n.xl\\:rounded-t-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-top-right-radius: 9999px;\n}\n.xl\\:rounded-r-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n    border-bottom-right-radius: 9999px;\n}\n.xl\\:rounded-b-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.xl\\:rounded-l-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n    border-bottom-left-radius: 9999px;\n}\n.xl\\:rounded-tl-none[data-v-ad49e094] {\n    border-top-left-radius: 0;\n}\n.xl\\:rounded-tr-none[data-v-ad49e094] {\n    border-top-right-radius: 0;\n}\n.xl\\:rounded-br-none[data-v-ad49e094] {\n    border-bottom-right-radius: 0;\n}\n.xl\\:rounded-bl-none[data-v-ad49e094] {\n    border-bottom-left-radius: 0;\n}\n.xl\\:rounded-tl-sm[data-v-ad49e094] {\n    border-top-left-radius: .125rem;\n}\n.xl\\:rounded-tr-sm[data-v-ad49e094] {\n    border-top-right-radius: .125rem;\n}\n.xl\\:rounded-br-sm[data-v-ad49e094] {\n    border-bottom-right-radius: .125rem;\n}\n.xl\\:rounded-bl-sm[data-v-ad49e094] {\n    border-bottom-left-radius: .125rem;\n}\n.xl\\:rounded-tl[data-v-ad49e094] {\n    border-top-left-radius: .25rem;\n}\n.xl\\:rounded-tr[data-v-ad49e094] {\n    border-top-right-radius: .25rem;\n}\n.xl\\:rounded-br[data-v-ad49e094] {\n    border-bottom-right-radius: .25rem;\n}\n.xl\\:rounded-bl[data-v-ad49e094] {\n    border-bottom-left-radius: .25rem;\n}\n.xl\\:rounded-tl-lg[data-v-ad49e094] {\n    border-top-left-radius: .5rem;\n}\n.xl\\:rounded-tr-lg[data-v-ad49e094] {\n    border-top-right-radius: .5rem;\n}\n.xl\\:rounded-br-lg[data-v-ad49e094] {\n    border-bottom-right-radius: .5rem;\n}\n.xl\\:rounded-bl-lg[data-v-ad49e094] {\n    border-bottom-left-radius: .5rem;\n}\n.xl\\:rounded-tl-full[data-v-ad49e094] {\n    border-top-left-radius: 9999px;\n}\n.xl\\:rounded-tr-full[data-v-ad49e094] {\n    border-top-right-radius: 9999px;\n}\n.xl\\:rounded-br-full[data-v-ad49e094] {\n    border-bottom-right-radius: 9999px;\n}\n.xl\\:rounded-bl-full[data-v-ad49e094] {\n    border-bottom-left-radius: 9999px;\n}\n.xl\\:border-solid[data-v-ad49e094] {\n    border-style: solid;\n}\n.xl\\:border-dashed[data-v-ad49e094] {\n    border-style: dashed;\n}\n.xl\\:border-dotted[data-v-ad49e094] {\n    border-style: dotted;\n}\n.xl\\:border-none[data-v-ad49e094] {\n    border-style: none;\n}\n.xl\\:border-0[data-v-ad49e094] {\n    border-width: 0;\n}\n.xl\\:border-2[data-v-ad49e094] {\n    border-width: 2px;\n}\n.xl\\:border-4[data-v-ad49e094] {\n    border-width: 4px;\n}\n.xl\\:border-8[data-v-ad49e094] {\n    border-width: 8px;\n}\n.xl\\:border[data-v-ad49e094] {\n    border-width: 1px;\n}\n.xl\\:border-t-0[data-v-ad49e094] {\n    border-top-width: 0;\n}\n.xl\\:border-r-0[data-v-ad49e094] {\n    border-right-width: 0;\n}\n.xl\\:border-b-0[data-v-ad49e094] {\n    border-bottom-width: 0;\n}\n.xl\\:border-l-0[data-v-ad49e094] {\n    border-left-width: 0;\n}\n.xl\\:border-t-2[data-v-ad49e094] {\n    border-top-width: 2px;\n}\n.xl\\:border-r-2[data-v-ad49e094] {\n    border-right-width: 2px;\n}\n.xl\\:border-b-2[data-v-ad49e094] {\n    border-bottom-width: 2px;\n}\n.xl\\:border-l-2[data-v-ad49e094] {\n    border-left-width: 2px;\n}\n.xl\\:border-t-4[data-v-ad49e094] {\n    border-top-width: 4px;\n}\n.xl\\:border-r-4[data-v-ad49e094] {\n    border-right-width: 4px;\n}\n.xl\\:border-b-4[data-v-ad49e094] {\n    border-bottom-width: 4px;\n}\n.xl\\:border-l-4[data-v-ad49e094] {\n    border-left-width: 4px;\n}\n.xl\\:border-t-8[data-v-ad49e094] {\n    border-top-width: 8px;\n}\n.xl\\:border-r-8[data-v-ad49e094] {\n    border-right-width: 8px;\n}\n.xl\\:border-b-8[data-v-ad49e094] {\n    border-bottom-width: 8px;\n}\n.xl\\:border-l-8[data-v-ad49e094] {\n    border-left-width: 8px;\n}\n.xl\\:border-t[data-v-ad49e094] {\n    border-top-width: 1px;\n}\n.xl\\:border-r[data-v-ad49e094] {\n    border-right-width: 1px;\n}\n.xl\\:border-b[data-v-ad49e094] {\n    border-bottom-width: 1px;\n}\n.xl\\:border-l[data-v-ad49e094] {\n    border-left-width: 1px;\n}\n.xl\\:cursor-auto[data-v-ad49e094] {\n    cursor: auto;\n}\n.xl\\:cursor-default[data-v-ad49e094] {\n    cursor: default;\n}\n.xl\\:cursor-pointer[data-v-ad49e094] {\n    cursor: pointer;\n}\n.xl\\:cursor-wait[data-v-ad49e094] {\n    cursor: wait;\n}\n.xl\\:cursor-move[data-v-ad49e094] {\n    cursor: move;\n}\n.xl\\:cursor-not-allowed[data-v-ad49e094] {\n    cursor: not-allowed;\n}\n.xl\\:block[data-v-ad49e094] {\n    display: block;\n}\n.xl\\:inline-block[data-v-ad49e094] {\n    display: inline-block;\n}\n.xl\\:inline[data-v-ad49e094] {\n    display: inline;\n}\n.xl\\:table[data-v-ad49e094] {\n    display: table;\n}\n.xl\\:table-row[data-v-ad49e094] {\n    display: table-row;\n}\n.xl\\:table-cell[data-v-ad49e094] {\n    display: table-cell;\n}\n.xl\\:hidden[data-v-ad49e094] {\n    display: none;\n}\n.xl\\:flex[data-v-ad49e094] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n}\n.xl\\:inline-flex[data-v-ad49e094] {\n    display: -webkit-inline-box;\n    display: -ms-inline-flexbox;\n    display: inline-flex;\n}\n.xl\\:flex-row[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: row;\n            flex-direction: row;\n}\n.xl\\:flex-row-reverse[data-v-ad49e094] {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: row-reverse;\n            flex-direction: row-reverse;\n}\n.xl\\:flex-col[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n}\n.xl\\:flex-col-reverse[data-v-ad49e094] {\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: reverse;\n        -ms-flex-direction: column-reverse;\n            flex-direction: column-reverse;\n}\n.xl\\:flex-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: wrap;\n        flex-wrap: wrap;\n}\n.xl\\:flex-wrap-reverse[data-v-ad49e094] {\n    -ms-flex-wrap: wrap-reverse;\n        flex-wrap: wrap-reverse;\n}\n.xl\\:flex-no-wrap[data-v-ad49e094] {\n    -ms-flex-wrap: nowrap;\n        flex-wrap: nowrap;\n}\n.xl\\:items-start[data-v-ad49e094] {\n    -webkit-box-align: start;\n        -ms-flex-align: start;\n            align-items: flex-start;\n}\n.xl\\:items-end[data-v-ad49e094] {\n    -webkit-box-align: end;\n        -ms-flex-align: end;\n            align-items: flex-end;\n}\n.xl\\:items-center[data-v-ad49e094] {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n}\n.xl\\:items-baseline[data-v-ad49e094] {\n    -webkit-box-align: baseline;\n        -ms-flex-align: baseline;\n            align-items: baseline;\n}\n.xl\\:items-stretch[data-v-ad49e094] {\n    -webkit-box-align: stretch;\n        -ms-flex-align: stretch;\n            align-items: stretch;\n}\n.xl\\:self-auto[data-v-ad49e094] {\n    -ms-flex-item-align: auto;\n        align-self: auto;\n}\n.xl\\:self-start[data-v-ad49e094] {\n    -ms-flex-item-align: start;\n        align-self: flex-start;\n}\n.xl\\:self-end[data-v-ad49e094] {\n    -ms-flex-item-align: end;\n        align-self: flex-end;\n}\n.xl\\:self-center[data-v-ad49e094] {\n    -ms-flex-item-align: center;\n        align-self: center;\n}\n.xl\\:self-stretch[data-v-ad49e094] {\n    -ms-flex-item-align: stretch;\n        align-self: stretch;\n}\n.xl\\:justify-start[data-v-ad49e094] {\n    -webkit-box-pack: start;\n        -ms-flex-pack: start;\n            justify-content: flex-start;\n}\n.xl\\:justify-end[data-v-ad49e094] {\n    -webkit-box-pack: end;\n        -ms-flex-pack: end;\n            justify-content: flex-end;\n}\n.xl\\:justify-center[data-v-ad49e094] {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n}\n.xl\\:justify-between[data-v-ad49e094] {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.xl\\:justify-around[data-v-ad49e094] {\n    -ms-flex-pack: distribute;\n        justify-content: space-around;\n}\n.xl\\:content-center[data-v-ad49e094] {\n    -ms-flex-line-pack: center;\n        align-content: center;\n}\n.xl\\:content-start[data-v-ad49e094] {\n    -ms-flex-line-pack: start;\n        align-content: flex-start;\n}\n.xl\\:content-end[data-v-ad49e094] {\n    -ms-flex-line-pack: end;\n        align-content: flex-end;\n}\n.xl\\:content-between[data-v-ad49e094] {\n    -ms-flex-line-pack: justify;\n        align-content: space-between;\n}\n.xl\\:content-around[data-v-ad49e094] {\n    -ms-flex-line-pack: distribute;\n        align-content: space-around;\n}\n.xl\\:flex-1[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n}\n.xl\\:flex-auto[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex: auto;\n            flex: auto;\n}\n.xl\\:flex-initial[data-v-ad49e094] {\n    -webkit-box-flex: initial;\n        -ms-flex: initial;\n            flex: initial;\n}\n.xl\\:flex-none[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex: none;\n            flex: none;\n}\n.xl\\:flex-grow[data-v-ad49e094] {\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n}\n.xl\\:flex-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 1;\n        flex-shrink: 1;\n}\n.xl\\:flex-no-grow[data-v-ad49e094] {\n    -webkit-box-flex: 0;\n        -ms-flex-positive: 0;\n            flex-grow: 0;\n}\n.xl\\:flex-no-shrink[data-v-ad49e094] {\n    -ms-flex-negative: 0;\n        flex-shrink: 0;\n}\n.xl\\:float-right[data-v-ad49e094] {\n    float: right;\n}\n.xl\\:float-left[data-v-ad49e094] {\n    float: left;\n}\n.xl\\:float-none[data-v-ad49e094] {\n    float: none;\n}\n.xl\\:clearfix[data-v-ad49e094]:after {\n    content: \"\";\n    display: table;\n    clear: both;\n}\n.xl\\:font-sans[data-v-ad49e094] {\n    font-family: system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n}\n.xl\\:font-serif[data-v-ad49e094] {\n    font-family: Constantia, Lucida Bright, Lucidabright, Lucida Serif, Lucida, DejaVu Serif, Bitstream Vera Serif, Liberation Serif, Georgia, serif;\n}\n.xl\\:font-mono[data-v-ad49e094] {\n    font-family: Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;\n}\n.xl\\:font-hairline[data-v-ad49e094] {\n    font-weight: 100;\n}\n.xl\\:font-thin[data-v-ad49e094] {\n    font-weight: 200;\n}\n.xl\\:font-light[data-v-ad49e094] {\n    font-weight: 300;\n}\n.xl\\:font-normal[data-v-ad49e094] {\n    font-weight: 400;\n}\n.xl\\:font-medium[data-v-ad49e094] {\n    font-weight: 500;\n}\n.xl\\:font-semibold[data-v-ad49e094] {\n    font-weight: 600;\n}\n.xl\\:font-bold[data-v-ad49e094] {\n    font-weight: 700;\n}\n.xl\\:font-extrabold[data-v-ad49e094] {\n    font-weight: 800;\n}\n.xl\\:font-black[data-v-ad49e094] {\n    font-weight: 900;\n}\n.xl\\:hover\\:font-hairline[data-v-ad49e094]:hover {\n    font-weight: 100;\n}\n.xl\\:hover\\:font-thin[data-v-ad49e094]:hover {\n    font-weight: 200;\n}\n.xl\\:hover\\:font-light[data-v-ad49e094]:hover {\n    font-weight: 300;\n}\n.xl\\:hover\\:font-normal[data-v-ad49e094]:hover {\n    font-weight: 400;\n}\n.xl\\:hover\\:font-medium[data-v-ad49e094]:hover {\n    font-weight: 500;\n}\n.xl\\:hover\\:font-semibold[data-v-ad49e094]:hover {\n    font-weight: 600;\n}\n.xl\\:hover\\:font-bold[data-v-ad49e094]:hover {\n    font-weight: 700;\n}\n.xl\\:hover\\:font-extrabold[data-v-ad49e094]:hover {\n    font-weight: 800;\n}\n.xl\\:hover\\:font-black[data-v-ad49e094]:hover {\n    font-weight: 900;\n}\n.xl\\:focus\\:font-hairline[data-v-ad49e094]:focus {\n    font-weight: 100;\n}\n.xl\\:focus\\:font-thin[data-v-ad49e094]:focus {\n    font-weight: 200;\n}\n.xl\\:focus\\:font-light[data-v-ad49e094]:focus {\n    font-weight: 300;\n}\n.xl\\:focus\\:font-normal[data-v-ad49e094]:focus {\n    font-weight: 400;\n}\n.xl\\:focus\\:font-medium[data-v-ad49e094]:focus {\n    font-weight: 500;\n}\n.xl\\:focus\\:font-semibold[data-v-ad49e094]:focus {\n    font-weight: 600;\n}\n.xl\\:focus\\:font-bold[data-v-ad49e094]:focus {\n    font-weight: 700;\n}\n.xl\\:focus\\:font-extrabold[data-v-ad49e094]:focus {\n    font-weight: 800;\n}\n.xl\\:focus\\:font-black[data-v-ad49e094]:focus {\n    font-weight: 900;\n}\n.xl\\:h-1[data-v-ad49e094] {\n    height: .25rem;\n}\n.xl\\:h-2[data-v-ad49e094] {\n    height: .5rem;\n}\n.xl\\:h-3[data-v-ad49e094] {\n    height: .75rem;\n}\n.xl\\:h-4[data-v-ad49e094] {\n    height: 1rem;\n}\n.xl\\:h-5[data-v-ad49e094] {\n    height: 1.25rem;\n}\n.xl\\:h-6[data-v-ad49e094] {\n    height: 1.5rem;\n}\n.xl\\:h-8[data-v-ad49e094] {\n    height: 2rem;\n}\n.xl\\:h-10[data-v-ad49e094] {\n    height: 2.5rem;\n}\n.xl\\:h-12[data-v-ad49e094] {\n    height: 3rem;\n}\n.xl\\:h-16[data-v-ad49e094] {\n    height: 4rem;\n}\n.xl\\:h-24[data-v-ad49e094] {\n    height: 6rem;\n}\n.xl\\:h-32[data-v-ad49e094] {\n    height: 8rem;\n}\n.xl\\:h-48[data-v-ad49e094] {\n    height: 12rem;\n}\n.xl\\:h-64[data-v-ad49e094] {\n    height: 16rem;\n}\n.xl\\:h-auto[data-v-ad49e094] {\n    height: auto;\n}\n.xl\\:h-px[data-v-ad49e094] {\n    height: 1px;\n}\n.xl\\:h-full[data-v-ad49e094] {\n    height: 100%;\n}\n.xl\\:h-screen[data-v-ad49e094] {\n    height: 100vh;\n}\n.xl\\:leading-none[data-v-ad49e094] {\n    line-height: 1;\n}\n.xl\\:leading-tight[data-v-ad49e094] {\n    line-height: 1.25;\n}\n.xl\\:leading-normal[data-v-ad49e094] {\n    line-height: 1.5;\n}\n.xl\\:leading-loose[data-v-ad49e094] {\n    line-height: 2;\n}\n.xl\\:m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.xl\\:m-1[data-v-ad49e094] {\n    margin: .25rem;\n}\n.xl\\:m-2[data-v-ad49e094] {\n    margin: .5rem;\n}\n.xl\\:m-3[data-v-ad49e094] {\n    margin: .75rem;\n}\n.xl\\:m-4[data-v-ad49e094] {\n    margin: 1rem;\n}\n.xl\\:m-5[data-v-ad49e094] {\n    margin: 1.25rem;\n}\n.xl\\:m-6[data-v-ad49e094] {\n    margin: 1.5rem;\n}\n.xl\\:m-8[data-v-ad49e094] {\n    margin: 2rem;\n}\n.xl\\:m-10[data-v-ad49e094] {\n    margin: 2.5rem;\n}\n.xl\\:m-12[data-v-ad49e094] {\n    margin: 3rem;\n}\n.xl\\:m-16[data-v-ad49e094] {\n    margin: 4rem;\n}\n.xl\\:m-20[data-v-ad49e094] {\n    margin: 5rem;\n}\n.xl\\:m-24[data-v-ad49e094] {\n    margin: 6rem;\n}\n.xl\\:m-32[data-v-ad49e094] {\n    margin: 8rem;\n}\n.xl\\:m-auto[data-v-ad49e094] {\n    margin: auto;\n}\n.xl\\:m-px[data-v-ad49e094] {\n    margin: 1px;\n}\n.xl\\:my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.xl\\:mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.xl\\:my-1[data-v-ad49e094] {\n    margin-top: .25rem;\n    margin-bottom: .25rem;\n}\n.xl\\:mx-1[data-v-ad49e094] {\n    margin-left: .25rem;\n    margin-right: .25rem;\n}\n.xl\\:my-2[data-v-ad49e094] {\n    margin-top: .5rem;\n    margin-bottom: .5rem;\n}\n.xl\\:mx-2[data-v-ad49e094] {\n    margin-left: .5rem;\n    margin-right: .5rem;\n}\n.xl\\:my-3[data-v-ad49e094] {\n    margin-top: .75rem;\n    margin-bottom: .75rem;\n}\n.xl\\:mx-3[data-v-ad49e094] {\n    margin-left: .75rem;\n    margin-right: .75rem;\n}\n.xl\\:my-4[data-v-ad49e094] {\n    margin-top: 1rem;\n    margin-bottom: 1rem;\n}\n.xl\\:mx-4[data-v-ad49e094] {\n    margin-left: 1rem;\n    margin-right: 1rem;\n}\n.xl\\:my-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n    margin-bottom: 1.25rem;\n}\n.xl\\:mx-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n    margin-right: 1.25rem;\n}\n.xl\\:my-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n    margin-bottom: 1.5rem;\n}\n.xl\\:mx-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n    margin-right: 1.5rem;\n}\n.xl\\:my-8[data-v-ad49e094] {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n}\n.xl\\:mx-8[data-v-ad49e094] {\n    margin-left: 2rem;\n    margin-right: 2rem;\n}\n.xl\\:my-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n    margin-bottom: 2.5rem;\n}\n.xl\\:mx-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n    margin-right: 2.5rem;\n}\n.xl\\:my-12[data-v-ad49e094] {\n    margin-top: 3rem;\n    margin-bottom: 3rem;\n}\n.xl\\:mx-12[data-v-ad49e094] {\n    margin-left: 3rem;\n    margin-right: 3rem;\n}\n.xl\\:my-16[data-v-ad49e094] {\n    margin-top: 4rem;\n    margin-bottom: 4rem;\n}\n.xl\\:mx-16[data-v-ad49e094] {\n    margin-left: 4rem;\n    margin-right: 4rem;\n}\n.xl\\:my-20[data-v-ad49e094] {\n    margin-top: 5rem;\n    margin-bottom: 5rem;\n}\n.xl\\:mx-20[data-v-ad49e094] {\n    margin-left: 5rem;\n    margin-right: 5rem;\n}\n.xl\\:my-24[data-v-ad49e094] {\n    margin-top: 6rem;\n    margin-bottom: 6rem;\n}\n.xl\\:mx-24[data-v-ad49e094] {\n    margin-left: 6rem;\n    margin-right: 6rem;\n}\n.xl\\:my-32[data-v-ad49e094] {\n    margin-top: 8rem;\n    margin-bottom: 8rem;\n}\n.xl\\:mx-32[data-v-ad49e094] {\n    margin-left: 8rem;\n    margin-right: 8rem;\n}\n.xl\\:my-auto[data-v-ad49e094] {\n    margin-top: auto;\n    margin-bottom: auto;\n}\n.xl\\:mx-auto[data-v-ad49e094] {\n    margin-left: auto;\n    margin-right: auto;\n}\n.xl\\:my-px[data-v-ad49e094] {\n    margin-top: 1px;\n    margin-bottom: 1px;\n}\n.xl\\:mx-px[data-v-ad49e094] {\n    margin-left: 1px;\n    margin-right: 1px;\n}\n.xl\\:mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.xl\\:mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.xl\\:mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.xl\\:ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.xl\\:mt-1[data-v-ad49e094] {\n    margin-top: .25rem;\n}\n.xl\\:mr-1[data-v-ad49e094] {\n    margin-right: .25rem;\n}\n.xl\\:mb-1[data-v-ad49e094] {\n    margin-bottom: .25rem;\n}\n.xl\\:ml-1[data-v-ad49e094] {\n    margin-left: .25rem;\n}\n.xl\\:mt-2[data-v-ad49e094] {\n    margin-top: .5rem;\n}\n.xl\\:mr-2[data-v-ad49e094] {\n    margin-right: .5rem;\n}\n.xl\\:mb-2[data-v-ad49e094] {\n    margin-bottom: .5rem;\n}\n.xl\\:ml-2[data-v-ad49e094] {\n    margin-left: .5rem;\n}\n.xl\\:mt-3[data-v-ad49e094] {\n    margin-top: .75rem;\n}\n.xl\\:mr-3[data-v-ad49e094] {\n    margin-right: .75rem;\n}\n.xl\\:mb-3[data-v-ad49e094] {\n    margin-bottom: .75rem;\n}\n.xl\\:ml-3[data-v-ad49e094] {\n    margin-left: .75rem;\n}\n.xl\\:mt-4[data-v-ad49e094] {\n    margin-top: 1rem;\n}\n.xl\\:mr-4[data-v-ad49e094] {\n    margin-right: 1rem;\n}\n.xl\\:mb-4[data-v-ad49e094] {\n    margin-bottom: 1rem;\n}\n.xl\\:ml-4[data-v-ad49e094] {\n    margin-left: 1rem;\n}\n.xl\\:mt-5[data-v-ad49e094] {\n    margin-top: 1.25rem;\n}\n.xl\\:mr-5[data-v-ad49e094] {\n    margin-right: 1.25rem;\n}\n.xl\\:mb-5[data-v-ad49e094] {\n    margin-bottom: 1.25rem;\n}\n.xl\\:ml-5[data-v-ad49e094] {\n    margin-left: 1.25rem;\n}\n.xl\\:mt-6[data-v-ad49e094] {\n    margin-top: 1.5rem;\n}\n.xl\\:mr-6[data-v-ad49e094] {\n    margin-right: 1.5rem;\n}\n.xl\\:mb-6[data-v-ad49e094] {\n    margin-bottom: 1.5rem;\n}\n.xl\\:ml-6[data-v-ad49e094] {\n    margin-left: 1.5rem;\n}\n.xl\\:mt-8[data-v-ad49e094] {\n    margin-top: 2rem;\n}\n.xl\\:mr-8[data-v-ad49e094] {\n    margin-right: 2rem;\n}\n.xl\\:mb-8[data-v-ad49e094] {\n    margin-bottom: 2rem;\n}\n.xl\\:ml-8[data-v-ad49e094] {\n    margin-left: 2rem;\n}\n.xl\\:mt-10[data-v-ad49e094] {\n    margin-top: 2.5rem;\n}\n.xl\\:mr-10[data-v-ad49e094] {\n    margin-right: 2.5rem;\n}\n.xl\\:mb-10[data-v-ad49e094] {\n    margin-bottom: 2.5rem;\n}\n.xl\\:ml-10[data-v-ad49e094] {\n    margin-left: 2.5rem;\n}\n.xl\\:mt-12[data-v-ad49e094] {\n    margin-top: 3rem;\n}\n.xl\\:mr-12[data-v-ad49e094] {\n    margin-right: 3rem;\n}\n.xl\\:mb-12[data-v-ad49e094] {\n    margin-bottom: 3rem;\n}\n.xl\\:ml-12[data-v-ad49e094] {\n    margin-left: 3rem;\n}\n.xl\\:mt-16[data-v-ad49e094] {\n    margin-top: 4rem;\n}\n.xl\\:mr-16[data-v-ad49e094] {\n    margin-right: 4rem;\n}\n.xl\\:mb-16[data-v-ad49e094] {\n    margin-bottom: 4rem;\n}\n.xl\\:ml-16[data-v-ad49e094] {\n    margin-left: 4rem;\n}\n.xl\\:mt-20[data-v-ad49e094] {\n    margin-top: 5rem;\n}\n.xl\\:mr-20[data-v-ad49e094] {\n    margin-right: 5rem;\n}\n.xl\\:mb-20[data-v-ad49e094] {\n    margin-bottom: 5rem;\n}\n.xl\\:ml-20[data-v-ad49e094] {\n    margin-left: 5rem;\n}\n.xl\\:mt-24[data-v-ad49e094] {\n    margin-top: 6rem;\n}\n.xl\\:mr-24[data-v-ad49e094] {\n    margin-right: 6rem;\n}\n.xl\\:mb-24[data-v-ad49e094] {\n    margin-bottom: 6rem;\n}\n.xl\\:ml-24[data-v-ad49e094] {\n    margin-left: 6rem;\n}\n.xl\\:mt-32[data-v-ad49e094] {\n    margin-top: 8rem;\n}\n.xl\\:mr-32[data-v-ad49e094] {\n    margin-right: 8rem;\n}\n.xl\\:mb-32[data-v-ad49e094] {\n    margin-bottom: 8rem;\n}\n.xl\\:ml-32[data-v-ad49e094] {\n    margin-left: 8rem;\n}\n.xl\\:mt-auto[data-v-ad49e094] {\n    margin-top: auto;\n}\n.xl\\:mr-auto[data-v-ad49e094] {\n    margin-right: auto;\n}\n.xl\\:mb-auto[data-v-ad49e094] {\n    margin-bottom: auto;\n}\n.xl\\:ml-auto[data-v-ad49e094] {\n    margin-left: auto;\n}\n.xl\\:mt-px[data-v-ad49e094] {\n    margin-top: 1px;\n}\n.xl\\:mr-px[data-v-ad49e094] {\n    margin-right: 1px;\n}\n.xl\\:mb-px[data-v-ad49e094] {\n    margin-bottom: 1px;\n}\n.xl\\:ml-px[data-v-ad49e094] {\n    margin-left: 1px;\n}\n.xl\\:max-h-full[data-v-ad49e094] {\n    max-height: 100%;\n}\n.xl\\:max-h-screen[data-v-ad49e094] {\n    max-height: 100vh;\n}\n.xl\\:max-w-xs[data-v-ad49e094] {\n    max-width: 20rem;\n}\n.xl\\:max-w-sm[data-v-ad49e094] {\n    max-width: 30rem;\n}\n.xl\\:max-w-md[data-v-ad49e094] {\n    max-width: 40rem;\n}\n.xl\\:max-w-lg[data-v-ad49e094] {\n    max-width: 50rem;\n}\n.xl\\:max-w-xl[data-v-ad49e094] {\n    max-width: 60rem;\n}\n.xl\\:max-w-2xl[data-v-ad49e094] {\n    max-width: 70rem;\n}\n.xl\\:max-w-3xl[data-v-ad49e094] {\n    max-width: 80rem;\n}\n.xl\\:max-w-4xl[data-v-ad49e094] {\n    max-width: 90rem;\n}\n.xl\\:max-w-5xl[data-v-ad49e094] {\n    max-width: 100rem;\n}\n.xl\\:max-w-full[data-v-ad49e094] {\n    max-width: 100%;\n}\n.xl\\:min-h-0[data-v-ad49e094] {\n    min-height: 0;\n}\n.xl\\:min-h-full[data-v-ad49e094] {\n    min-height: 100%;\n}\n.xl\\:min-h-screen[data-v-ad49e094] {\n    min-height: 100vh;\n}\n.xl\\:min-w-0[data-v-ad49e094] {\n    min-width: 0;\n}\n.xl\\:min-w-full[data-v-ad49e094] {\n    min-width: 100%;\n}\n.xl\\:-m-0[data-v-ad49e094] {\n    margin: 0;\n}\n.xl\\:-m-1[data-v-ad49e094] {\n    margin: -0.25rem;\n}\n.xl\\:-m-2[data-v-ad49e094] {\n    margin: -0.5rem;\n}\n.xl\\:-m-3[data-v-ad49e094] {\n    margin: -0.75rem;\n}\n.xl\\:-m-4[data-v-ad49e094] {\n    margin: -1rem;\n}\n.xl\\:-m-5[data-v-ad49e094] {\n    margin: -1.25rem;\n}\n.xl\\:-m-6[data-v-ad49e094] {\n    margin: -1.5rem;\n}\n.xl\\:-m-8[data-v-ad49e094] {\n    margin: -2rem;\n}\n.xl\\:-m-10[data-v-ad49e094] {\n    margin: -2.5rem;\n}\n.xl\\:-m-12[data-v-ad49e094] {\n    margin: -3rem;\n}\n.xl\\:-m-16[data-v-ad49e094] {\n    margin: -4rem;\n}\n.xl\\:-m-20[data-v-ad49e094] {\n    margin: -5rem;\n}\n.xl\\:-m-24[data-v-ad49e094] {\n    margin: -6rem;\n}\n.xl\\:-m-32[data-v-ad49e094] {\n    margin: -8rem;\n}\n.xl\\:-m-px[data-v-ad49e094] {\n    margin: -1px;\n}\n.xl\\:-my-0[data-v-ad49e094] {\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.xl\\:-mx-0[data-v-ad49e094] {\n    margin-left: 0;\n    margin-right: 0;\n}\n.xl\\:-my-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n    margin-bottom: -0.25rem;\n}\n.xl\\:-mx-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n    margin-right: -0.25rem;\n}\n.xl\\:-my-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n    margin-bottom: -0.5rem;\n}\n.xl\\:-mx-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n}\n.xl\\:-my-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n    margin-bottom: -0.75rem;\n}\n.xl\\:-mx-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n    margin-right: -0.75rem;\n}\n.xl\\:-my-4[data-v-ad49e094] {\n    margin-top: -1rem;\n    margin-bottom: -1rem;\n}\n.xl\\:-mx-4[data-v-ad49e094] {\n    margin-left: -1rem;\n    margin-right: -1rem;\n}\n.xl\\:-my-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n    margin-bottom: -1.25rem;\n}\n.xl\\:-mx-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n    margin-right: -1.25rem;\n}\n.xl\\:-my-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n    margin-bottom: -1.5rem;\n}\n.xl\\:-mx-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n    margin-right: -1.5rem;\n}\n.xl\\:-my-8[data-v-ad49e094] {\n    margin-top: -2rem;\n    margin-bottom: -2rem;\n}\n.xl\\:-mx-8[data-v-ad49e094] {\n    margin-left: -2rem;\n    margin-right: -2rem;\n}\n.xl\\:-my-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n    margin-bottom: -2.5rem;\n}\n.xl\\:-mx-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n    margin-right: -2.5rem;\n}\n.xl\\:-my-12[data-v-ad49e094] {\n    margin-top: -3rem;\n    margin-bottom: -3rem;\n}\n.xl\\:-mx-12[data-v-ad49e094] {\n    margin-left: -3rem;\n    margin-right: -3rem;\n}\n.xl\\:-my-16[data-v-ad49e094] {\n    margin-top: -4rem;\n    margin-bottom: -4rem;\n}\n.xl\\:-mx-16[data-v-ad49e094] {\n    margin-left: -4rem;\n    margin-right: -4rem;\n}\n.xl\\:-my-20[data-v-ad49e094] {\n    margin-top: -5rem;\n    margin-bottom: -5rem;\n}\n.xl\\:-mx-20[data-v-ad49e094] {\n    margin-left: -5rem;\n    margin-right: -5rem;\n}\n.xl\\:-my-24[data-v-ad49e094] {\n    margin-top: -6rem;\n    margin-bottom: -6rem;\n}\n.xl\\:-mx-24[data-v-ad49e094] {\n    margin-left: -6rem;\n    margin-right: -6rem;\n}\n.xl\\:-my-32[data-v-ad49e094] {\n    margin-top: -8rem;\n    margin-bottom: -8rem;\n}\n.xl\\:-mx-32[data-v-ad49e094] {\n    margin-left: -8rem;\n    margin-right: -8rem;\n}\n.xl\\:-my-px[data-v-ad49e094] {\n    margin-top: -1px;\n    margin-bottom: -1px;\n}\n.xl\\:-mx-px[data-v-ad49e094] {\n    margin-left: -1px;\n    margin-right: -1px;\n}\n.xl\\:-mt-0[data-v-ad49e094] {\n    margin-top: 0;\n}\n.xl\\:-mr-0[data-v-ad49e094] {\n    margin-right: 0;\n}\n.xl\\:-mb-0[data-v-ad49e094] {\n    margin-bottom: 0;\n}\n.xl\\:-ml-0[data-v-ad49e094] {\n    margin-left: 0;\n}\n.xl\\:-mt-1[data-v-ad49e094] {\n    margin-top: -0.25rem;\n}\n.xl\\:-mr-1[data-v-ad49e094] {\n    margin-right: -0.25rem;\n}\n.xl\\:-mb-1[data-v-ad49e094] {\n    margin-bottom: -0.25rem;\n}\n.xl\\:-ml-1[data-v-ad49e094] {\n    margin-left: -0.25rem;\n}\n.xl\\:-mt-2[data-v-ad49e094] {\n    margin-top: -0.5rem;\n}\n.xl\\:-mr-2[data-v-ad49e094] {\n    margin-right: -0.5rem;\n}\n.xl\\:-mb-2[data-v-ad49e094] {\n    margin-bottom: -0.5rem;\n}\n.xl\\:-ml-2[data-v-ad49e094] {\n    margin-left: -0.5rem;\n}\n.xl\\:-mt-3[data-v-ad49e094] {\n    margin-top: -0.75rem;\n}\n.xl\\:-mr-3[data-v-ad49e094] {\n    margin-right: -0.75rem;\n}\n.xl\\:-mb-3[data-v-ad49e094] {\n    margin-bottom: -0.75rem;\n}\n.xl\\:-ml-3[data-v-ad49e094] {\n    margin-left: -0.75rem;\n}\n.xl\\:-mt-4[data-v-ad49e094] {\n    margin-top: -1rem;\n}\n.xl\\:-mr-4[data-v-ad49e094] {\n    margin-right: -1rem;\n}\n.xl\\:-mb-4[data-v-ad49e094] {\n    margin-bottom: -1rem;\n}\n.xl\\:-ml-4[data-v-ad49e094] {\n    margin-left: -1rem;\n}\n.xl\\:-mt-5[data-v-ad49e094] {\n    margin-top: -1.25rem;\n}\n.xl\\:-mr-5[data-v-ad49e094] {\n    margin-right: -1.25rem;\n}\n.xl\\:-mb-5[data-v-ad49e094] {\n    margin-bottom: -1.25rem;\n}\n.xl\\:-ml-5[data-v-ad49e094] {\n    margin-left: -1.25rem;\n}\n.xl\\:-mt-6[data-v-ad49e094] {\n    margin-top: -1.5rem;\n}\n.xl\\:-mr-6[data-v-ad49e094] {\n    margin-right: -1.5rem;\n}\n.xl\\:-mb-6[data-v-ad49e094] {\n    margin-bottom: -1.5rem;\n}\n.xl\\:-ml-6[data-v-ad49e094] {\n    margin-left: -1.5rem;\n}\n.xl\\:-mt-8[data-v-ad49e094] {\n    margin-top: -2rem;\n}\n.xl\\:-mr-8[data-v-ad49e094] {\n    margin-right: -2rem;\n}\n.xl\\:-mb-8[data-v-ad49e094] {\n    margin-bottom: -2rem;\n}\n.xl\\:-ml-8[data-v-ad49e094] {\n    margin-left: -2rem;\n}\n.xl\\:-mt-10[data-v-ad49e094] {\n    margin-top: -2.5rem;\n}\n.xl\\:-mr-10[data-v-ad49e094] {\n    margin-right: -2.5rem;\n}\n.xl\\:-mb-10[data-v-ad49e094] {\n    margin-bottom: -2.5rem;\n}\n.xl\\:-ml-10[data-v-ad49e094] {\n    margin-left: -2.5rem;\n}\n.xl\\:-mt-12[data-v-ad49e094] {\n    margin-top: -3rem;\n}\n.xl\\:-mr-12[data-v-ad49e094] {\n    margin-right: -3rem;\n}\n.xl\\:-mb-12[data-v-ad49e094] {\n    margin-bottom: -3rem;\n}\n.xl\\:-ml-12[data-v-ad49e094] {\n    margin-left: -3rem;\n}\n.xl\\:-mt-16[data-v-ad49e094] {\n    margin-top: -4rem;\n}\n.xl\\:-mr-16[data-v-ad49e094] {\n    margin-right: -4rem;\n}\n.xl\\:-mb-16[data-v-ad49e094] {\n    margin-bottom: -4rem;\n}\n.xl\\:-ml-16[data-v-ad49e094] {\n    margin-left: -4rem;\n}\n.xl\\:-mt-20[data-v-ad49e094] {\n    margin-top: -5rem;\n}\n.xl\\:-mr-20[data-v-ad49e094] {\n    margin-right: -5rem;\n}\n.xl\\:-mb-20[data-v-ad49e094] {\n    margin-bottom: -5rem;\n}\n.xl\\:-ml-20[data-v-ad49e094] {\n    margin-left: -5rem;\n}\n.xl\\:-mt-24[data-v-ad49e094] {\n    margin-top: -6rem;\n}\n.xl\\:-mr-24[data-v-ad49e094] {\n    margin-right: -6rem;\n}\n.xl\\:-mb-24[data-v-ad49e094] {\n    margin-bottom: -6rem;\n}\n.xl\\:-ml-24[data-v-ad49e094] {\n    margin-left: -6rem;\n}\n.xl\\:-mt-32[data-v-ad49e094] {\n    margin-top: -8rem;\n}\n.xl\\:-mr-32[data-v-ad49e094] {\n    margin-right: -8rem;\n}\n.xl\\:-mb-32[data-v-ad49e094] {\n    margin-bottom: -8rem;\n}\n.xl\\:-ml-32[data-v-ad49e094] {\n    margin-left: -8rem;\n}\n.xl\\:-mt-px[data-v-ad49e094] {\n    margin-top: -1px;\n}\n.xl\\:-mr-px[data-v-ad49e094] {\n    margin-right: -1px;\n}\n.xl\\:-mb-px[data-v-ad49e094] {\n    margin-bottom: -1px;\n}\n.xl\\:-ml-px[data-v-ad49e094] {\n    margin-left: -1px;\n}\n.xl\\:opacity-0[data-v-ad49e094] {\n    opacity: 0;\n}\n.xl\\:opacity-25[data-v-ad49e094] {\n    opacity: .25;\n}\n.xl\\:opacity-50[data-v-ad49e094] {\n    opacity: .5;\n}\n.xl\\:opacity-75[data-v-ad49e094] {\n    opacity: .75;\n}\n.xl\\:opacity-100[data-v-ad49e094] {\n    opacity: 1;\n}\n.xl\\:overflow-auto[data-v-ad49e094] {\n    overflow: auto;\n}\n.xl\\:overflow-hidden[data-v-ad49e094] {\n    overflow: hidden;\n}\n.xl\\:overflow-visible[data-v-ad49e094] {\n    overflow: visible;\n}\n.xl\\:overflow-scroll[data-v-ad49e094] {\n    overflow: scroll;\n}\n.xl\\:overflow-x-auto[data-v-ad49e094] {\n    overflow-x: auto;\n}\n.xl\\:overflow-y-auto[data-v-ad49e094] {\n    overflow-y: auto;\n}\n.xl\\:overflow-x-hidden[data-v-ad49e094] {\n    overflow-x: hidden;\n}\n.xl\\:overflow-y-hidden[data-v-ad49e094] {\n    overflow-y: hidden;\n}\n.xl\\:overflow-x-visible[data-v-ad49e094] {\n    overflow-x: visible;\n}\n.xl\\:overflow-y-visible[data-v-ad49e094] {\n    overflow-y: visible;\n}\n.xl\\:overflow-x-scroll[data-v-ad49e094] {\n    overflow-x: scroll;\n}\n.xl\\:overflow-y-scroll[data-v-ad49e094] {\n    overflow-y: scroll;\n}\n.xl\\:scrolling-touch[data-v-ad49e094] {\n    -webkit-overflow-scrolling: touch;\n}\n.xl\\:scrolling-auto[data-v-ad49e094] {\n    -webkit-overflow-scrolling: auto;\n}\n.xl\\:p-0[data-v-ad49e094] {\n    padding: 0;\n}\n.xl\\:p-1[data-v-ad49e094] {\n    padding: .25rem;\n}\n.xl\\:p-2[data-v-ad49e094] {\n    padding: .5rem;\n}\n.xl\\:p-3[data-v-ad49e094] {\n    padding: .75rem;\n}\n.xl\\:p-4[data-v-ad49e094] {\n    padding: 1rem;\n}\n.xl\\:p-5[data-v-ad49e094] {\n    padding: 1.25rem;\n}\n.xl\\:p-6[data-v-ad49e094] {\n    padding: 1.5rem;\n}\n.xl\\:p-8[data-v-ad49e094] {\n    padding: 2rem;\n}\n.xl\\:p-10[data-v-ad49e094] {\n    padding: 2.5rem;\n}\n.xl\\:p-12[data-v-ad49e094] {\n    padding: 3rem;\n}\n.xl\\:p-16[data-v-ad49e094] {\n    padding: 4rem;\n}\n.xl\\:p-20[data-v-ad49e094] {\n    padding: 5rem;\n}\n.xl\\:p-24[data-v-ad49e094] {\n    padding: 6rem;\n}\n.xl\\:p-32[data-v-ad49e094] {\n    padding: 8rem;\n}\n.xl\\:p-px[data-v-ad49e094] {\n    padding: 1px;\n}\n.xl\\:py-0[data-v-ad49e094] {\n    padding-top: 0;\n    padding-bottom: 0;\n}\n.xl\\:px-0[data-v-ad49e094] {\n    padding-left: 0;\n    padding-right: 0;\n}\n.xl\\:py-1[data-v-ad49e094] {\n    padding-top: .25rem;\n    padding-bottom: .25rem;\n}\n.xl\\:px-1[data-v-ad49e094] {\n    padding-left: .25rem;\n    padding-right: .25rem;\n}\n.xl\\:py-2[data-v-ad49e094] {\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n}\n.xl\\:px-2[data-v-ad49e094] {\n    padding-left: .5rem;\n    padding-right: .5rem;\n}\n.xl\\:py-3[data-v-ad49e094] {\n    padding-top: .75rem;\n    padding-bottom: .75rem;\n}\n.xl\\:px-3[data-v-ad49e094] {\n    padding-left: .75rem;\n    padding-right: .75rem;\n}\n.xl\\:py-4[data-v-ad49e094] {\n    padding-top: 1rem;\n    padding-bottom: 1rem;\n}\n.xl\\:px-4[data-v-ad49e094] {\n    padding-left: 1rem;\n    padding-right: 1rem;\n}\n.xl\\:py-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n    padding-bottom: 1.25rem;\n}\n.xl\\:px-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n}\n.xl\\:py-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n    padding-bottom: 1.5rem;\n}\n.xl\\:px-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n    padding-right: 1.5rem;\n}\n.xl\\:py-8[data-v-ad49e094] {\n    padding-top: 2rem;\n    padding-bottom: 2rem;\n}\n.xl\\:px-8[data-v-ad49e094] {\n    padding-left: 2rem;\n    padding-right: 2rem;\n}\n.xl\\:py-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n    padding-bottom: 2.5rem;\n}\n.xl\\:px-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n    padding-right: 2.5rem;\n}\n.xl\\:py-12[data-v-ad49e094] {\n    padding-top: 3rem;\n    padding-bottom: 3rem;\n}\n.xl\\:px-12[data-v-ad49e094] {\n    padding-left: 3rem;\n    padding-right: 3rem;\n}\n.xl\\:py-16[data-v-ad49e094] {\n    padding-top: 4rem;\n    padding-bottom: 4rem;\n}\n.xl\\:px-16[data-v-ad49e094] {\n    padding-left: 4rem;\n    padding-right: 4rem;\n}\n.xl\\:py-20[data-v-ad49e094] {\n    padding-top: 5rem;\n    padding-bottom: 5rem;\n}\n.xl\\:px-20[data-v-ad49e094] {\n    padding-left: 5rem;\n    padding-right: 5rem;\n}\n.xl\\:py-24[data-v-ad49e094] {\n    padding-top: 6rem;\n    padding-bottom: 6rem;\n}\n.xl\\:px-24[data-v-ad49e094] {\n    padding-left: 6rem;\n    padding-right: 6rem;\n}\n.xl\\:py-32[data-v-ad49e094] {\n    padding-top: 8rem;\n    padding-bottom: 8rem;\n}\n.xl\\:px-32[data-v-ad49e094] {\n    padding-left: 8rem;\n    padding-right: 8rem;\n}\n.xl\\:py-px[data-v-ad49e094] {\n    padding-top: 1px;\n    padding-bottom: 1px;\n}\n.xl\\:px-px[data-v-ad49e094] {\n    padding-left: 1px;\n    padding-right: 1px;\n}\n.xl\\:pt-0[data-v-ad49e094] {\n    padding-top: 0;\n}\n.xl\\:pr-0[data-v-ad49e094] {\n    padding-right: 0;\n}\n.xl\\:pb-0[data-v-ad49e094] {\n    padding-bottom: 0;\n}\n.xl\\:pl-0[data-v-ad49e094] {\n    padding-left: 0;\n}\n.xl\\:pt-1[data-v-ad49e094] {\n    padding-top: .25rem;\n}\n.xl\\:pr-1[data-v-ad49e094] {\n    padding-right: .25rem;\n}\n.xl\\:pb-1[data-v-ad49e094] {\n    padding-bottom: .25rem;\n}\n.xl\\:pl-1[data-v-ad49e094] {\n    padding-left: .25rem;\n}\n.xl\\:pt-2[data-v-ad49e094] {\n    padding-top: .5rem;\n}\n.xl\\:pr-2[data-v-ad49e094] {\n    padding-right: .5rem;\n}\n.xl\\:pb-2[data-v-ad49e094] {\n    padding-bottom: .5rem;\n}\n.xl\\:pl-2[data-v-ad49e094] {\n    padding-left: .5rem;\n}\n.xl\\:pt-3[data-v-ad49e094] {\n    padding-top: .75rem;\n}\n.xl\\:pr-3[data-v-ad49e094] {\n    padding-right: .75rem;\n}\n.xl\\:pb-3[data-v-ad49e094] {\n    padding-bottom: .75rem;\n}\n.xl\\:pl-3[data-v-ad49e094] {\n    padding-left: .75rem;\n}\n.xl\\:pt-4[data-v-ad49e094] {\n    padding-top: 1rem;\n}\n.xl\\:pr-4[data-v-ad49e094] {\n    padding-right: 1rem;\n}\n.xl\\:pb-4[data-v-ad49e094] {\n    padding-bottom: 1rem;\n}\n.xl\\:pl-4[data-v-ad49e094] {\n    padding-left: 1rem;\n}\n.xl\\:pt-5[data-v-ad49e094] {\n    padding-top: 1.25rem;\n}\n.xl\\:pr-5[data-v-ad49e094] {\n    padding-right: 1.25rem;\n}\n.xl\\:pb-5[data-v-ad49e094] {\n    padding-bottom: 1.25rem;\n}\n.xl\\:pl-5[data-v-ad49e094] {\n    padding-left: 1.25rem;\n}\n.xl\\:pt-6[data-v-ad49e094] {\n    padding-top: 1.5rem;\n}\n.xl\\:pr-6[data-v-ad49e094] {\n    padding-right: 1.5rem;\n}\n.xl\\:pb-6[data-v-ad49e094] {\n    padding-bottom: 1.5rem;\n}\n.xl\\:pl-6[data-v-ad49e094] {\n    padding-left: 1.5rem;\n}\n.xl\\:pt-8[data-v-ad49e094] {\n    padding-top: 2rem;\n}\n.xl\\:pr-8[data-v-ad49e094] {\n    padding-right: 2rem;\n}\n.xl\\:pb-8[data-v-ad49e094] {\n    padding-bottom: 2rem;\n}\n.xl\\:pl-8[data-v-ad49e094] {\n    padding-left: 2rem;\n}\n.xl\\:pt-10[data-v-ad49e094] {\n    padding-top: 2.5rem;\n}\n.xl\\:pr-10[data-v-ad49e094] {\n    padding-right: 2.5rem;\n}\n.xl\\:pb-10[data-v-ad49e094] {\n    padding-bottom: 2.5rem;\n}\n.xl\\:pl-10[data-v-ad49e094] {\n    padding-left: 2.5rem;\n}\n.xl\\:pt-12[data-v-ad49e094] {\n    padding-top: 3rem;\n}\n.xl\\:pr-12[data-v-ad49e094] {\n    padding-right: 3rem;\n}\n.xl\\:pb-12[data-v-ad49e094] {\n    padding-bottom: 3rem;\n}\n.xl\\:pl-12[data-v-ad49e094] {\n    padding-left: 3rem;\n}\n.xl\\:pt-16[data-v-ad49e094] {\n    padding-top: 4rem;\n}\n.xl\\:pr-16[data-v-ad49e094] {\n    padding-right: 4rem;\n}\n.xl\\:pb-16[data-v-ad49e094] {\n    padding-bottom: 4rem;\n}\n.xl\\:pl-16[data-v-ad49e094] {\n    padding-left: 4rem;\n}\n.xl\\:pt-20[data-v-ad49e094] {\n    padding-top: 5rem;\n}\n.xl\\:pr-20[data-v-ad49e094] {\n    padding-right: 5rem;\n}\n.xl\\:pb-20[data-v-ad49e094] {\n    padding-bottom: 5rem;\n}\n.xl\\:pl-20[data-v-ad49e094] {\n    padding-left: 5rem;\n}\n.xl\\:pt-24[data-v-ad49e094] {\n    padding-top: 6rem;\n}\n.xl\\:pr-24[data-v-ad49e094] {\n    padding-right: 6rem;\n}\n.xl\\:pb-24[data-v-ad49e094] {\n    padding-bottom: 6rem;\n}\n.xl\\:pl-24[data-v-ad49e094] {\n    padding-left: 6rem;\n}\n.xl\\:pt-32[data-v-ad49e094] {\n    padding-top: 8rem;\n}\n.xl\\:pr-32[data-v-ad49e094] {\n    padding-right: 8rem;\n}\n.xl\\:pb-32[data-v-ad49e094] {\n    padding-bottom: 8rem;\n}\n.xl\\:pl-32[data-v-ad49e094] {\n    padding-left: 8rem;\n}\n.xl\\:pt-px[data-v-ad49e094] {\n    padding-top: 1px;\n}\n.xl\\:pr-px[data-v-ad49e094] {\n    padding-right: 1px;\n}\n.xl\\:pb-px[data-v-ad49e094] {\n    padding-bottom: 1px;\n}\n.xl\\:pl-px[data-v-ad49e094] {\n    padding-left: 1px;\n}\n.xl\\:pointer-events-none[data-v-ad49e094] {\n    pointer-events: none;\n}\n.xl\\:pointer-events-auto[data-v-ad49e094] {\n    pointer-events: auto;\n}\n.xl\\:static[data-v-ad49e094] {\n    position: static;\n}\n.xl\\:fixed[data-v-ad49e094] {\n    position: fixed;\n}\n.xl\\:absolute[data-v-ad49e094] {\n    position: absolute;\n}\n.xl\\:relative[data-v-ad49e094] {\n    position: relative;\n}\n.xl\\:sticky[data-v-ad49e094] {\n    position: -webkit-sticky;\n    position: sticky;\n}\n.xl\\:pin-none[data-v-ad49e094] {\n    top: auto;\n    right: auto;\n    bottom: auto;\n    left: auto;\n}\n.xl\\:pin[data-v-ad49e094] {\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n}\n.xl\\:pin-y[data-v-ad49e094] {\n    top: 0;\n    bottom: 0;\n}\n.xl\\:pin-x[data-v-ad49e094] {\n    right: 0;\n    left: 0;\n}\n.xl\\:pin-t[data-v-ad49e094] {\n    top: 0;\n}\n.xl\\:pin-r[data-v-ad49e094] {\n    right: 0;\n}\n.xl\\:pin-b[data-v-ad49e094] {\n    bottom: 0;\n}\n.xl\\:pin-l[data-v-ad49e094] {\n    left: 0;\n}\n.xl\\:resize-none[data-v-ad49e094] {\n    resize: none;\n}\n.xl\\:resize-y[data-v-ad49e094] {\n    resize: vertical;\n}\n.xl\\:resize-x[data-v-ad49e094] {\n    resize: horizontal;\n}\n.xl\\:resize[data-v-ad49e094] {\n    resize: both;\n}\n.xl\\:shadow[data-v-ad49e094] {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.xl\\:shadow-md[data-v-ad49e094] {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:shadow-lg[data-v-ad49e094] {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:shadow-inner[data-v-ad49e094] {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.xl\\:shadow-outline[data-v-ad49e094] {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.xl\\:shadow-none[data-v-ad49e094] {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.xl\\:hover\\:shadow[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.xl\\:hover\\:shadow-md[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:hover\\:shadow-lg[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:hover\\:shadow-inner[data-v-ad49e094]:hover {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.xl\\:hover\\:shadow-outline[data-v-ad49e094]:hover {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.xl\\:hover\\:shadow-none[data-v-ad49e094]:hover {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.xl\\:focus\\:shadow[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n            box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);\n}\n.xl\\:focus\\:shadow-md[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, .12), 0 2px 4px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:focus\\:shadow-lg[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n            box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .11), 0 5px 15px 0 rgba(0, 0, 0, .08);\n}\n.xl\\:focus\\:shadow-inner[data-v-ad49e094]:focus {\n    -webkit-box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, .06);\n}\n.xl\\:focus\\:shadow-outline[data-v-ad49e094]:focus {\n    -webkit-box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n            box-shadow: 0 0 0 3px rgba(52, 144, 220, .5);\n}\n.xl\\:focus\\:shadow-none[data-v-ad49e094]:focus {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n}\n.xl\\:table-auto[data-v-ad49e094] {\n    table-layout: auto;\n}\n.xl\\:table-fixed[data-v-ad49e094] {\n    table-layout: fixed;\n}\n.xl\\:text-left[data-v-ad49e094] {\n    text-align: left;\n}\n.xl\\:text-center[data-v-ad49e094] {\n    text-align: center;\n}\n.xl\\:text-right[data-v-ad49e094] {\n    text-align: right;\n}\n.xl\\:text-justify[data-v-ad49e094] {\n    text-align: justify;\n}\n.xl\\:text-transparent[data-v-ad49e094] {\n    color: transparent;\n}\n.xl\\:text-black[data-v-ad49e094] {\n    color: #22292f;\n}\n.xl\\:text-grey-darkest[data-v-ad49e094] {\n    color: #3d4852;\n}\n.xl\\:text-grey-darker[data-v-ad49e094] {\n    color: #606f7b;\n}\n.xl\\:text-grey-dark[data-v-ad49e094] {\n    color: #8795a1;\n}\n.xl\\:text-grey[data-v-ad49e094] {\n    color: #b8c2cc;\n}\n.xl\\:text-grey-light[data-v-ad49e094] {\n    color: #dae1e7;\n}\n.xl\\:text-grey-lighter[data-v-ad49e094] {\n    color: #f1f5f8;\n}\n.xl\\:text-grey-lightest[data-v-ad49e094] {\n    color: #f8fafc;\n}\n.xl\\:text-white[data-v-ad49e094] {\n    color: #fff;\n}\n.xl\\:text-red-darkest[data-v-ad49e094] {\n    color: #3b0d0c;\n}\n.xl\\:text-red-darker[data-v-ad49e094] {\n    color: #621b18;\n}\n.xl\\:text-red-dark[data-v-ad49e094] {\n    color: #cc1f1a;\n}\n.xl\\:text-red[data-v-ad49e094] {\n    color: #e3342f;\n}\n.xl\\:text-red-light[data-v-ad49e094] {\n    color: #ef5753;\n}\n.xl\\:text-red-lighter[data-v-ad49e094] {\n    color: #f9acaa;\n}\n.xl\\:text-red-lightest[data-v-ad49e094] {\n    color: #fcebea;\n}\n.xl\\:text-orange-darkest[data-v-ad49e094] {\n    color: #462a16;\n}\n.xl\\:text-orange-darker[data-v-ad49e094] {\n    color: #613b1f;\n}\n.xl\\:text-orange-dark[data-v-ad49e094] {\n    color: #de751f;\n}\n.xl\\:text-orange[data-v-ad49e094] {\n    color: #f6993f;\n}\n.xl\\:text-orange-light[data-v-ad49e094] {\n    color: #faad63;\n}\n.xl\\:text-orange-lighter[data-v-ad49e094] {\n    color: #fcd9b6;\n}\n.xl\\:text-orange-lightest[data-v-ad49e094] {\n    color: #fff5eb;\n}\n.xl\\:text-yellow-darkest[data-v-ad49e094] {\n    color: #453411;\n}\n.xl\\:text-yellow-darker[data-v-ad49e094] {\n    color: #684f1d;\n}\n.xl\\:text-yellow-dark[data-v-ad49e094] {\n    color: #f2d024;\n}\n.xl\\:text-yellow[data-v-ad49e094] {\n    color: #ffed4a;\n}\n.xl\\:text-yellow-light[data-v-ad49e094] {\n    color: #fff382;\n}\n.xl\\:text-yellow-lighter[data-v-ad49e094] {\n    color: #fff9c2;\n}\n.xl\\:text-yellow-lightest[data-v-ad49e094] {\n    color: #fcfbeb;\n}\n.xl\\:text-green-darkest[data-v-ad49e094] {\n    color: #0f2f21;\n}\n.xl\\:text-green-darker[data-v-ad49e094] {\n    color: #1a4731;\n}\n.xl\\:text-green-dark[data-v-ad49e094] {\n    color: #1f9d55;\n}\n.xl\\:text-green[data-v-ad49e094] {\n    color: #38c172;\n}\n.xl\\:text-green-light[data-v-ad49e094] {\n    color: #51d88a;\n}\n.xl\\:text-green-lighter[data-v-ad49e094] {\n    color: #a2f5bf;\n}\n.xl\\:text-green-lightest[data-v-ad49e094] {\n    color: #e3fcec;\n}\n.xl\\:text-teal-darkest[data-v-ad49e094] {\n    color: #0d3331;\n}\n.xl\\:text-teal-darker[data-v-ad49e094] {\n    color: #20504f;\n}\n.xl\\:text-teal-dark[data-v-ad49e094] {\n    color: #38a89d;\n}\n.xl\\:text-teal[data-v-ad49e094] {\n    color: #4dc0b5;\n}\n.xl\\:text-teal-light[data-v-ad49e094] {\n    color: #64d5ca;\n}\n.xl\\:text-teal-lighter[data-v-ad49e094] {\n    color: #a0f0ed;\n}\n.xl\\:text-teal-lightest[data-v-ad49e094] {\n    color: #e8fffe;\n}\n.xl\\:text-blue-darkest[data-v-ad49e094] {\n    color: #12283a;\n}\n.xl\\:text-blue-darker[data-v-ad49e094] {\n    color: #1c3d5a;\n}\n.xl\\:text-blue-dark[data-v-ad49e094] {\n    color: #2779bd;\n}\n.xl\\:text-blue[data-v-ad49e094] {\n    color: #3490dc;\n}\n.xl\\:text-blue-light[data-v-ad49e094] {\n    color: #6cb2eb;\n}\n.xl\\:text-blue-lighter[data-v-ad49e094] {\n    color: #bcdefa;\n}\n.xl\\:text-blue-lightest[data-v-ad49e094] {\n    color: #eff8ff;\n}\n.xl\\:text-indigo-darkest[data-v-ad49e094] {\n    color: #191e38;\n}\n.xl\\:text-indigo-darker[data-v-ad49e094] {\n    color: #2f365f;\n}\n.xl\\:text-indigo-dark[data-v-ad49e094] {\n    color: #5661b3;\n}\n.xl\\:text-indigo[data-v-ad49e094] {\n    color: #6574cd;\n}\n.xl\\:text-indigo-light[data-v-ad49e094] {\n    color: #7886d7;\n}\n.xl\\:text-indigo-lighter[data-v-ad49e094] {\n    color: #b2b7ff;\n}\n.xl\\:text-indigo-lightest[data-v-ad49e094] {\n    color: #e6e8ff;\n}\n.xl\\:text-purple-darkest[data-v-ad49e094] {\n    color: #21183c;\n}\n.xl\\:text-purple-darker[data-v-ad49e094] {\n    color: #382b5f;\n}\n.xl\\:text-purple-dark[data-v-ad49e094] {\n    color: #794acf;\n}\n.xl\\:text-purple[data-v-ad49e094] {\n    color: #9561e2;\n}\n.xl\\:text-purple-light[data-v-ad49e094] {\n    color: #a779e9;\n}\n.xl\\:text-purple-lighter[data-v-ad49e094] {\n    color: #d6bbfc;\n}\n.xl\\:text-purple-lightest[data-v-ad49e094] {\n    color: #f3ebff;\n}\n.xl\\:text-pink-darkest[data-v-ad49e094] {\n    color: #451225;\n}\n.xl\\:text-pink-darker[data-v-ad49e094] {\n    color: #6f213f;\n}\n.xl\\:text-pink-dark[data-v-ad49e094] {\n    color: #eb5286;\n}\n.xl\\:text-pink[data-v-ad49e094] {\n    color: #f66d9b;\n}\n.xl\\:text-pink-light[data-v-ad49e094] {\n    color: #fa7ea8;\n}\n.xl\\:text-pink-lighter[data-v-ad49e094] {\n    color: #ffbbca;\n}\n.xl\\:text-pink-lightest[data-v-ad49e094] {\n    color: #ffebef;\n}\n.xl\\:hover\\:text-transparent[data-v-ad49e094]:hover {\n    color: transparent;\n}\n.xl\\:hover\\:text-black[data-v-ad49e094]:hover {\n    color: #22292f;\n}\n.xl\\:hover\\:text-grey-darkest[data-v-ad49e094]:hover {\n    color: #3d4852;\n}\n.xl\\:hover\\:text-grey-darker[data-v-ad49e094]:hover {\n    color: #606f7b;\n}\n.xl\\:hover\\:text-grey-dark[data-v-ad49e094]:hover {\n    color: #8795a1;\n}\n.xl\\:hover\\:text-grey[data-v-ad49e094]:hover {\n    color: #b8c2cc;\n}\n.xl\\:hover\\:text-grey-light[data-v-ad49e094]:hover {\n    color: #dae1e7;\n}\n.xl\\:hover\\:text-grey-lighter[data-v-ad49e094]:hover {\n    color: #f1f5f8;\n}\n.xl\\:hover\\:text-grey-lightest[data-v-ad49e094]:hover {\n    color: #f8fafc;\n}\n.xl\\:hover\\:text-white[data-v-ad49e094]:hover {\n    color: #fff;\n}\n.xl\\:hover\\:text-red-darkest[data-v-ad49e094]:hover {\n    color: #3b0d0c;\n}\n.xl\\:hover\\:text-red-darker[data-v-ad49e094]:hover {\n    color: #621b18;\n}\n.xl\\:hover\\:text-red-dark[data-v-ad49e094]:hover {\n    color: #cc1f1a;\n}\n.xl\\:hover\\:text-red[data-v-ad49e094]:hover {\n    color: #e3342f;\n}\n.xl\\:hover\\:text-red-light[data-v-ad49e094]:hover {\n    color: #ef5753;\n}\n.xl\\:hover\\:text-red-lighter[data-v-ad49e094]:hover {\n    color: #f9acaa;\n}\n.xl\\:hover\\:text-red-lightest[data-v-ad49e094]:hover {\n    color: #fcebea;\n}\n.xl\\:hover\\:text-orange-darkest[data-v-ad49e094]:hover {\n    color: #462a16;\n}\n.xl\\:hover\\:text-orange-darker[data-v-ad49e094]:hover {\n    color: #613b1f;\n}\n.xl\\:hover\\:text-orange-dark[data-v-ad49e094]:hover {\n    color: #de751f;\n}\n.xl\\:hover\\:text-orange[data-v-ad49e094]:hover {\n    color: #f6993f;\n}\n.xl\\:hover\\:text-orange-light[data-v-ad49e094]:hover {\n    color: #faad63;\n}\n.xl\\:hover\\:text-orange-lighter[data-v-ad49e094]:hover {\n    color: #fcd9b6;\n}\n.xl\\:hover\\:text-orange-lightest[data-v-ad49e094]:hover {\n    color: #fff5eb;\n}\n.xl\\:hover\\:text-yellow-darkest[data-v-ad49e094]:hover {\n    color: #453411;\n}\n.xl\\:hover\\:text-yellow-darker[data-v-ad49e094]:hover {\n    color: #684f1d;\n}\n.xl\\:hover\\:text-yellow-dark[data-v-ad49e094]:hover {\n    color: #f2d024;\n}\n.xl\\:hover\\:text-yellow[data-v-ad49e094]:hover {\n    color: #ffed4a;\n}\n.xl\\:hover\\:text-yellow-light[data-v-ad49e094]:hover {\n    color: #fff382;\n}\n.xl\\:hover\\:text-yellow-lighter[data-v-ad49e094]:hover {\n    color: #fff9c2;\n}\n.xl\\:hover\\:text-yellow-lightest[data-v-ad49e094]:hover {\n    color: #fcfbeb;\n}\n.xl\\:hover\\:text-green-darkest[data-v-ad49e094]:hover {\n    color: #0f2f21;\n}\n.xl\\:hover\\:text-green-darker[data-v-ad49e094]:hover {\n    color: #1a4731;\n}\n.xl\\:hover\\:text-green-dark[data-v-ad49e094]:hover {\n    color: #1f9d55;\n}\n.xl\\:hover\\:text-green[data-v-ad49e094]:hover {\n    color: #38c172;\n}\n.xl\\:hover\\:text-green-light[data-v-ad49e094]:hover {\n    color: #51d88a;\n}\n.xl\\:hover\\:text-green-lighter[data-v-ad49e094]:hover {\n    color: #a2f5bf;\n}\n.xl\\:hover\\:text-green-lightest[data-v-ad49e094]:hover {\n    color: #e3fcec;\n}\n.xl\\:hover\\:text-teal-darkest[data-v-ad49e094]:hover {\n    color: #0d3331;\n}\n.xl\\:hover\\:text-teal-darker[data-v-ad49e094]:hover {\n    color: #20504f;\n}\n.xl\\:hover\\:text-teal-dark[data-v-ad49e094]:hover {\n    color: #38a89d;\n}\n.xl\\:hover\\:text-teal[data-v-ad49e094]:hover {\n    color: #4dc0b5;\n}\n.xl\\:hover\\:text-teal-light[data-v-ad49e094]:hover {\n    color: #64d5ca;\n}\n.xl\\:hover\\:text-teal-lighter[data-v-ad49e094]:hover {\n    color: #a0f0ed;\n}\n.xl\\:hover\\:text-teal-lightest[data-v-ad49e094]:hover {\n    color: #e8fffe;\n}\n.xl\\:hover\\:text-blue-darkest[data-v-ad49e094]:hover {\n    color: #12283a;\n}\n.xl\\:hover\\:text-blue-darker[data-v-ad49e094]:hover {\n    color: #1c3d5a;\n}\n.xl\\:hover\\:text-blue-dark[data-v-ad49e094]:hover {\n    color: #2779bd;\n}\n.xl\\:hover\\:text-blue[data-v-ad49e094]:hover {\n    color: #3490dc;\n}\n.xl\\:hover\\:text-blue-light[data-v-ad49e094]:hover {\n    color: #6cb2eb;\n}\n.xl\\:hover\\:text-blue-lighter[data-v-ad49e094]:hover {\n    color: #bcdefa;\n}\n.xl\\:hover\\:text-blue-lightest[data-v-ad49e094]:hover {\n    color: #eff8ff;\n}\n.xl\\:hover\\:text-indigo-darkest[data-v-ad49e094]:hover {\n    color: #191e38;\n}\n.xl\\:hover\\:text-indigo-darker[data-v-ad49e094]:hover {\n    color: #2f365f;\n}\n.xl\\:hover\\:text-indigo-dark[data-v-ad49e094]:hover {\n    color: #5661b3;\n}\n.xl\\:hover\\:text-indigo[data-v-ad49e094]:hover {\n    color: #6574cd;\n}\n.xl\\:hover\\:text-indigo-light[data-v-ad49e094]:hover {\n    color: #7886d7;\n}\n.xl\\:hover\\:text-indigo-lighter[data-v-ad49e094]:hover {\n    color: #b2b7ff;\n}\n.xl\\:hover\\:text-indigo-lightest[data-v-ad49e094]:hover {\n    color: #e6e8ff;\n}\n.xl\\:hover\\:text-purple-darkest[data-v-ad49e094]:hover {\n    color: #21183c;\n}\n.xl\\:hover\\:text-purple-darker[data-v-ad49e094]:hover {\n    color: #382b5f;\n}\n.xl\\:hover\\:text-purple-dark[data-v-ad49e094]:hover {\n    color: #794acf;\n}\n.xl\\:hover\\:text-purple[data-v-ad49e094]:hover {\n    color: #9561e2;\n}\n.xl\\:hover\\:text-purple-light[data-v-ad49e094]:hover {\n    color: #a779e9;\n}\n.xl\\:hover\\:text-purple-lighter[data-v-ad49e094]:hover {\n    color: #d6bbfc;\n}\n.xl\\:hover\\:text-purple-lightest[data-v-ad49e094]:hover {\n    color: #f3ebff;\n}\n.xl\\:hover\\:text-pink-darkest[data-v-ad49e094]:hover {\n    color: #451225;\n}\n.xl\\:hover\\:text-pink-darker[data-v-ad49e094]:hover {\n    color: #6f213f;\n}\n.xl\\:hover\\:text-pink-dark[data-v-ad49e094]:hover {\n    color: #eb5286;\n}\n.xl\\:hover\\:text-pink[data-v-ad49e094]:hover {\n    color: #f66d9b;\n}\n.xl\\:hover\\:text-pink-light[data-v-ad49e094]:hover {\n    color: #fa7ea8;\n}\n.xl\\:hover\\:text-pink-lighter[data-v-ad49e094]:hover {\n    color: #ffbbca;\n}\n.xl\\:hover\\:text-pink-lightest[data-v-ad49e094]:hover {\n    color: #ffebef;\n}\n.xl\\:focus\\:text-transparent[data-v-ad49e094]:focus {\n    color: transparent;\n}\n.xl\\:focus\\:text-black[data-v-ad49e094]:focus {\n    color: #22292f;\n}\n.xl\\:focus\\:text-grey-darkest[data-v-ad49e094]:focus {\n    color: #3d4852;\n}\n.xl\\:focus\\:text-grey-darker[data-v-ad49e094]:focus {\n    color: #606f7b;\n}\n.xl\\:focus\\:text-grey-dark[data-v-ad49e094]:focus {\n    color: #8795a1;\n}\n.xl\\:focus\\:text-grey[data-v-ad49e094]:focus {\n    color: #b8c2cc;\n}\n.xl\\:focus\\:text-grey-light[data-v-ad49e094]:focus {\n    color: #dae1e7;\n}\n.xl\\:focus\\:text-grey-lighter[data-v-ad49e094]:focus {\n    color: #f1f5f8;\n}\n.xl\\:focus\\:text-grey-lightest[data-v-ad49e094]:focus {\n    color: #f8fafc;\n}\n.xl\\:focus\\:text-white[data-v-ad49e094]:focus {\n    color: #fff;\n}\n.xl\\:focus\\:text-red-darkest[data-v-ad49e094]:focus {\n    color: #3b0d0c;\n}\n.xl\\:focus\\:text-red-darker[data-v-ad49e094]:focus {\n    color: #621b18;\n}\n.xl\\:focus\\:text-red-dark[data-v-ad49e094]:focus {\n    color: #cc1f1a;\n}\n.xl\\:focus\\:text-red[data-v-ad49e094]:focus {\n    color: #e3342f;\n}\n.xl\\:focus\\:text-red-light[data-v-ad49e094]:focus {\n    color: #ef5753;\n}\n.xl\\:focus\\:text-red-lighter[data-v-ad49e094]:focus {\n    color: #f9acaa;\n}\n.xl\\:focus\\:text-red-lightest[data-v-ad49e094]:focus {\n    color: #fcebea;\n}\n.xl\\:focus\\:text-orange-darkest[data-v-ad49e094]:focus {\n    color: #462a16;\n}\n.xl\\:focus\\:text-orange-darker[data-v-ad49e094]:focus {\n    color: #613b1f;\n}\n.xl\\:focus\\:text-orange-dark[data-v-ad49e094]:focus {\n    color: #de751f;\n}\n.xl\\:focus\\:text-orange[data-v-ad49e094]:focus {\n    color: #f6993f;\n}\n.xl\\:focus\\:text-orange-light[data-v-ad49e094]:focus {\n    color: #faad63;\n}\n.xl\\:focus\\:text-orange-lighter[data-v-ad49e094]:focus {\n    color: #fcd9b6;\n}\n.xl\\:focus\\:text-orange-lightest[data-v-ad49e094]:focus {\n    color: #fff5eb;\n}\n.xl\\:focus\\:text-yellow-darkest[data-v-ad49e094]:focus {\n    color: #453411;\n}\n.xl\\:focus\\:text-yellow-darker[data-v-ad49e094]:focus {\n    color: #684f1d;\n}\n.xl\\:focus\\:text-yellow-dark[data-v-ad49e094]:focus {\n    color: #f2d024;\n}\n.xl\\:focus\\:text-yellow[data-v-ad49e094]:focus {\n    color: #ffed4a;\n}\n.xl\\:focus\\:text-yellow-light[data-v-ad49e094]:focus {\n    color: #fff382;\n}\n.xl\\:focus\\:text-yellow-lighter[data-v-ad49e094]:focus {\n    color: #fff9c2;\n}\n.xl\\:focus\\:text-yellow-lightest[data-v-ad49e094]:focus {\n    color: #fcfbeb;\n}\n.xl\\:focus\\:text-green-darkest[data-v-ad49e094]:focus {\n    color: #0f2f21;\n}\n.xl\\:focus\\:text-green-darker[data-v-ad49e094]:focus {\n    color: #1a4731;\n}\n.xl\\:focus\\:text-green-dark[data-v-ad49e094]:focus {\n    color: #1f9d55;\n}\n.xl\\:focus\\:text-green[data-v-ad49e094]:focus {\n    color: #38c172;\n}\n.xl\\:focus\\:text-green-light[data-v-ad49e094]:focus {\n    color: #51d88a;\n}\n.xl\\:focus\\:text-green-lighter[data-v-ad49e094]:focus {\n    color: #a2f5bf;\n}\n.xl\\:focus\\:text-green-lightest[data-v-ad49e094]:focus {\n    color: #e3fcec;\n}\n.xl\\:focus\\:text-teal-darkest[data-v-ad49e094]:focus {\n    color: #0d3331;\n}\n.xl\\:focus\\:text-teal-darker[data-v-ad49e094]:focus {\n    color: #20504f;\n}\n.xl\\:focus\\:text-teal-dark[data-v-ad49e094]:focus {\n    color: #38a89d;\n}\n.xl\\:focus\\:text-teal[data-v-ad49e094]:focus {\n    color: #4dc0b5;\n}\n.xl\\:focus\\:text-teal-light[data-v-ad49e094]:focus {\n    color: #64d5ca;\n}\n.xl\\:focus\\:text-teal-lighter[data-v-ad49e094]:focus {\n    color: #a0f0ed;\n}\n.xl\\:focus\\:text-teal-lightest[data-v-ad49e094]:focus {\n    color: #e8fffe;\n}\n.xl\\:focus\\:text-blue-darkest[data-v-ad49e094]:focus {\n    color: #12283a;\n}\n.xl\\:focus\\:text-blue-darker[data-v-ad49e094]:focus {\n    color: #1c3d5a;\n}\n.xl\\:focus\\:text-blue-dark[data-v-ad49e094]:focus {\n    color: #2779bd;\n}\n.xl\\:focus\\:text-blue[data-v-ad49e094]:focus {\n    color: #3490dc;\n}\n.xl\\:focus\\:text-blue-light[data-v-ad49e094]:focus {\n    color: #6cb2eb;\n}\n.xl\\:focus\\:text-blue-lighter[data-v-ad49e094]:focus {\n    color: #bcdefa;\n}\n.xl\\:focus\\:text-blue-lightest[data-v-ad49e094]:focus {\n    color: #eff8ff;\n}\n.xl\\:focus\\:text-indigo-darkest[data-v-ad49e094]:focus {\n    color: #191e38;\n}\n.xl\\:focus\\:text-indigo-darker[data-v-ad49e094]:focus {\n    color: #2f365f;\n}\n.xl\\:focus\\:text-indigo-dark[data-v-ad49e094]:focus {\n    color: #5661b3;\n}\n.xl\\:focus\\:text-indigo[data-v-ad49e094]:focus {\n    color: #6574cd;\n}\n.xl\\:focus\\:text-indigo-light[data-v-ad49e094]:focus {\n    color: #7886d7;\n}\n.xl\\:focus\\:text-indigo-lighter[data-v-ad49e094]:focus {\n    color: #b2b7ff;\n}\n.xl\\:focus\\:text-indigo-lightest[data-v-ad49e094]:focus {\n    color: #e6e8ff;\n}\n.xl\\:focus\\:text-purple-darkest[data-v-ad49e094]:focus {\n    color: #21183c;\n}\n.xl\\:focus\\:text-purple-darker[data-v-ad49e094]:focus {\n    color: #382b5f;\n}\n.xl\\:focus\\:text-purple-dark[data-v-ad49e094]:focus {\n    color: #794acf;\n}\n.xl\\:focus\\:text-purple[data-v-ad49e094]:focus {\n    color: #9561e2;\n}\n.xl\\:focus\\:text-purple-light[data-v-ad49e094]:focus {\n    color: #a779e9;\n}\n.xl\\:focus\\:text-purple-lighter[data-v-ad49e094]:focus {\n    color: #d6bbfc;\n}\n.xl\\:focus\\:text-purple-lightest[data-v-ad49e094]:focus {\n    color: #f3ebff;\n}\n.xl\\:focus\\:text-pink-darkest[data-v-ad49e094]:focus {\n    color: #451225;\n}\n.xl\\:focus\\:text-pink-darker[data-v-ad49e094]:focus {\n    color: #6f213f;\n}\n.xl\\:focus\\:text-pink-dark[data-v-ad49e094]:focus {\n    color: #eb5286;\n}\n.xl\\:focus\\:text-pink[data-v-ad49e094]:focus {\n    color: #f66d9b;\n}\n.xl\\:focus\\:text-pink-light[data-v-ad49e094]:focus {\n    color: #fa7ea8;\n}\n.xl\\:focus\\:text-pink-lighter[data-v-ad49e094]:focus {\n    color: #ffbbca;\n}\n.xl\\:focus\\:text-pink-lightest[data-v-ad49e094]:focus {\n    color: #ffebef;\n}\n.xl\\:text-xs[data-v-ad49e094] {\n    font-size: .75rem;\n}\n.xl\\:text-sm[data-v-ad49e094] {\n    font-size: .875rem;\n}\n.xl\\:text-base[data-v-ad49e094] {\n    font-size: 1rem;\n}\n.xl\\:text-lg[data-v-ad49e094] {\n    font-size: 1.125rem;\n}\n.xl\\:text-xl[data-v-ad49e094] {\n    font-size: 1.25rem;\n}\n.xl\\:text-2xl[data-v-ad49e094] {\n    font-size: 1.5rem;\n}\n.xl\\:text-3xl[data-v-ad49e094] {\n    font-size: 1.875rem;\n}\n.xl\\:text-4xl[data-v-ad49e094] {\n    font-size: 2.25rem;\n}\n.xl\\:text-5xl[data-v-ad49e094] {\n    font-size: 3rem;\n}\n.xl\\:italic[data-v-ad49e094] {\n    font-style: italic;\n}\n.xl\\:roman[data-v-ad49e094] {\n    font-style: normal;\n}\n.xl\\:uppercase[data-v-ad49e094] {\n    text-transform: uppercase;\n}\n.xl\\:lowercase[data-v-ad49e094] {\n    text-transform: lowercase;\n}\n.xl\\:capitalize[data-v-ad49e094] {\n    text-transform: capitalize;\n}\n.xl\\:normal-case[data-v-ad49e094] {\n    text-transform: none;\n}\n.xl\\:underline[data-v-ad49e094] {\n    text-decoration: underline;\n}\n.xl\\:line-through[data-v-ad49e094] {\n    text-decoration: line-through;\n}\n.xl\\:no-underline[data-v-ad49e094] {\n    text-decoration: none;\n}\n.xl\\:antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.xl\\:subpixel-antialiased[data-v-ad49e094] {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.xl\\:hover\\:italic[data-v-ad49e094]:hover {\n    font-style: italic;\n}\n.xl\\:hover\\:roman[data-v-ad49e094]:hover {\n    font-style: normal;\n}\n.xl\\:hover\\:uppercase[data-v-ad49e094]:hover {\n    text-transform: uppercase;\n}\n.xl\\:hover\\:lowercase[data-v-ad49e094]:hover {\n    text-transform: lowercase;\n}\n.xl\\:hover\\:capitalize[data-v-ad49e094]:hover {\n    text-transform: capitalize;\n}\n.xl\\:hover\\:normal-case[data-v-ad49e094]:hover {\n    text-transform: none;\n}\n.xl\\:hover\\:underline[data-v-ad49e094]:hover {\n    text-decoration: underline;\n}\n.xl\\:hover\\:line-through[data-v-ad49e094]:hover {\n    text-decoration: line-through;\n}\n.xl\\:hover\\:no-underline[data-v-ad49e094]:hover {\n    text-decoration: none;\n}\n.xl\\:hover\\:antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.xl\\:hover\\:subpixel-antialiased[data-v-ad49e094]:hover {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.xl\\:focus\\:italic[data-v-ad49e094]:focus {\n    font-style: italic;\n}\n.xl\\:focus\\:roman[data-v-ad49e094]:focus {\n    font-style: normal;\n}\n.xl\\:focus\\:uppercase[data-v-ad49e094]:focus {\n    text-transform: uppercase;\n}\n.xl\\:focus\\:lowercase[data-v-ad49e094]:focus {\n    text-transform: lowercase;\n}\n.xl\\:focus\\:capitalize[data-v-ad49e094]:focus {\n    text-transform: capitalize;\n}\n.xl\\:focus\\:normal-case[data-v-ad49e094]:focus {\n    text-transform: none;\n}\n.xl\\:focus\\:underline[data-v-ad49e094]:focus {\n    text-decoration: underline;\n}\n.xl\\:focus\\:line-through[data-v-ad49e094]:focus {\n    text-decoration: line-through;\n}\n.xl\\:focus\\:no-underline[data-v-ad49e094]:focus {\n    text-decoration: none;\n}\n.xl\\:focus\\:antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n}\n.xl\\:focus\\:subpixel-antialiased[data-v-ad49e094]:focus {\n    -webkit-font-smoothing: auto;\n    -moz-osx-font-smoothing: auto;\n}\n.xl\\:tracking-tight[data-v-ad49e094] {\n    letter-spacing: -0.05em;\n}\n.xl\\:tracking-normal[data-v-ad49e094] {\n    letter-spacing: 0;\n}\n.xl\\:tracking-wide[data-v-ad49e094] {\n    letter-spacing: .05em;\n}\n.xl\\:select-none[data-v-ad49e094] {\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n.xl\\:select-text[data-v-ad49e094] {\n    -webkit-user-select: text;\n       -moz-user-select: text;\n        -ms-user-select: text;\n            user-select: text;\n}\n.xl\\:align-baseline[data-v-ad49e094] {\n    vertical-align: baseline;\n}\n.xl\\:align-top[data-v-ad49e094] {\n    vertical-align: top;\n}\n.xl\\:align-middle[data-v-ad49e094] {\n    vertical-align: middle;\n}\n.xl\\:align-bottom[data-v-ad49e094] {\n    vertical-align: bottom;\n}\n.xl\\:align-text-top[data-v-ad49e094] {\n    vertical-align: text-top;\n}\n.xl\\:align-text-bottom[data-v-ad49e094] {\n    vertical-align: text-bottom;\n}\n.xl\\:visible[data-v-ad49e094] {\n    visibility: visible;\n}\n.xl\\:invisible[data-v-ad49e094] {\n    visibility: hidden;\n}\n.xl\\:whitespace-normal[data-v-ad49e094] {\n    white-space: normal;\n}\n.xl\\:whitespace-no-wrap[data-v-ad49e094] {\n    white-space: nowrap;\n}\n.xl\\:whitespace-pre[data-v-ad49e094] {\n    white-space: pre;\n}\n.xl\\:whitespace-pre-line[data-v-ad49e094] {\n    white-space: pre-line;\n}\n.xl\\:whitespace-pre-wrap[data-v-ad49e094] {\n    white-space: pre-wrap;\n}\n.xl\\:break-words[data-v-ad49e094] {\n    word-wrap: break-word;\n}\n.xl\\:break-normal[data-v-ad49e094] {\n    word-wrap: normal;\n}\n.xl\\:truncate[data-v-ad49e094] {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n}\n.xl\\:w-1[data-v-ad49e094] {\n    width: .25rem;\n}\n.xl\\:w-2[data-v-ad49e094] {\n    width: .5rem;\n}\n.xl\\:w-3[data-v-ad49e094] {\n    width: .75rem;\n}\n.xl\\:w-4[data-v-ad49e094] {\n    width: 1rem;\n}\n.xl\\:w-5[data-v-ad49e094] {\n    width: 1.25rem;\n}\n.xl\\:w-6[data-v-ad49e094] {\n    width: 1.5rem;\n}\n.xl\\:w-8[data-v-ad49e094] {\n    width: 2rem;\n}\n.xl\\:w-10[data-v-ad49e094] {\n    width: 2.5rem;\n}\n.xl\\:w-12[data-v-ad49e094] {\n    width: 3rem;\n}\n.xl\\:w-16[data-v-ad49e094] {\n    width: 4rem;\n}\n.xl\\:w-24[data-v-ad49e094] {\n    width: 6rem;\n}\n.xl\\:w-32[data-v-ad49e094] {\n    width: 8rem;\n}\n.xl\\:w-48[data-v-ad49e094] {\n    width: 12rem;\n}\n.xl\\:w-64[data-v-ad49e094] {\n    width: 16rem;\n}\n.xl\\:w-auto[data-v-ad49e094] {\n    width: auto;\n}\n.xl\\:w-px[data-v-ad49e094] {\n    width: 1px;\n}\n.xl\\:w-1\\/2[data-v-ad49e094] {\n    width: 50%;\n}\n.xl\\:w-1\\/3[data-v-ad49e094] {\n    width: 33.33333%;\n}\n.xl\\:w-2\\/3[data-v-ad49e094] {\n    width: 66.66667%;\n}\n.xl\\:w-1\\/4[data-v-ad49e094] {\n    width: 25%;\n}\n.xl\\:w-3\\/4[data-v-ad49e094] {\n    width: 75%;\n}\n.xl\\:w-1\\/5[data-v-ad49e094] {\n    width: 20%;\n}\n.xl\\:w-2\\/5[data-v-ad49e094] {\n    width: 40%;\n}\n.xl\\:w-3\\/5[data-v-ad49e094] {\n    width: 60%;\n}\n.xl\\:w-4\\/5[data-v-ad49e094] {\n    width: 80%;\n}\n.xl\\:w-1\\/6[data-v-ad49e094] {\n    width: 16.66667%;\n}\n.xl\\:w-5\\/6[data-v-ad49e094] {\n    width: 83.33333%;\n}\n.xl\\:w-full[data-v-ad49e094] {\n    width: 100%;\n}\n.xl\\:w-screen[data-v-ad49e094] {\n    width: 100vw;\n}\n.xl\\:z-0[data-v-ad49e094] {\n    z-index: 0;\n}\n.xl\\:z-10[data-v-ad49e094] {\n    z-index: 10;\n}\n.xl\\:z-20[data-v-ad49e094] {\n    z-index: 20;\n}\n.xl\\:z-30[data-v-ad49e094] {\n    z-index: 30;\n}\n.xl\\:z-40[data-v-ad49e094] {\n    z-index: 40;\n}\n.xl\\:z-50[data-v-ad49e094] {\n    z-index: 50;\n}\n.xl\\:z-auto[data-v-ad49e094] {\n    z-index: auto;\n}\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(30)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "login" }, [
      _c("form", { staticClass: "form" }, [
        _c("input", {
          staticClass: "input",
          attrs: { type: "text", placeholder: "seu e-mail" }
        }),
        _vm._v(" "),
        _c("input", {
          staticClass: "input",
          attrs: { type: "password", placeholder: "sua senha" }
        }),
        _vm._v(" "),
        _c("button", { staticClass: "button" }, [_vm._v("Entrar")])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-ad49e094", module.exports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'Login'
});

/***/ })
/******/ ]);