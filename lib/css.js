"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sheet_1 = require("./sheet");
var REG = /^([wmp][trblxy]?|flex|wrap|column|auto|align|justify|order)$/;
var cache = {};
var isString = function (item) { return typeof item === "string"; };
var createRule = function (breaks, sx) { return function (key, val) {
    var classNames = [];
    var id = '_Rfx' + sheet_1.default.cssRules.length.toString(36);
    var k = key.charAt(0);
    var style = sx[key] || sx[k];
    var rules = toArr(val).map(function (v, i) {
        var bp = breaks[i];
        var decs = style(key, v);
        var cn = id + '_' + (bp || '');
        var body = "." + cn + "{" + decs + "}";
        var rule = media(bp, body);
        var _key = decs + (bp || '');
        if (cache[_key]) {
            classNames.push(cache[_key]);
            return null;
        }
        else {
            classNames.push(cn);
            cache[_key] = cn;
            return rule;
        }
    }).filter(isString);
    sheet_1.default.insert(rules);
    return classNames;
}; };
var configure = function (config) { return function (props) {
    var next = {};
    var classNames = [];
    var breaks = [0].concat(config.breakpoints);
    var sx = stylers(config);
    for (var key in props) {
        var val = props[key];
        if (!REG.test(key)) {
            next[key] = val;
            continue;
        }
        var cx = createRule(breaks, sx)(key, val);
        cx.forEach(function (cn) { return classNames.push(cn); });
    }
    next.className = join.apply(void 0, [next.className].concat(classNames));
    var result = next;
    return result;
}; };
var reset = function () {
    Object.keys(cache).forEach(function (key) {
        delete cache[key];
    });
    while (sheet_1.default.cssRules.length) {
        sheet_1.default.deleteRule(0);
    }
};
// class CSSThing {
//   reset: () => void
//   call: (config: Config) => (props: {[key: string]: any}) => {[key: string]: string}
//   constructor() {
//     this.call = cssCall
//     this.reset = cssReset
//   }
// }
exports.css = {
    configure: configure,
    reset: reset,
};
var toArr = function (n) { return Array.isArray(n) ? n : [n]; };
var num = function (n) { return typeof n === 'number' && !isNaN(n); };
var join = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (args
        .filter(function (a) { return !!a; })
        .join(' '));
};
var dec = function (pair) { return pair.join(':'); };
var rule = function (rules) { return rules.join(';'); };
var media = function (bp, body) { return bp ? "@media screen and (min-width:" + bp + "em){" + body + "}" : body; };
var width = function (key, n) { return dec(['width', !num(n) || n > 1 ? px(n) : (n * 100) + '%']); };
var px = function (n) { return num(n) ? n + 'px' : n; };
var directions = {
    t: ['-top'],
    r: ['-right'],
    b: ['-bottom'],
    l: ['-left'],
    x: ['-left', '-right'],
    y: ['-top', '-bottom'],
};
var space = function (scale) { return function (key, n) {
    var _a = key.split(''), a = _a[0], b = _a[1];
    var prop = a === 'm' ? 'margin' : 'padding';
    var dirs = directions[b] || [''];
    var neg = n < 0 ? -1 : 1;
    var val = !num(n) ? n : px((scale[Math.abs(n)] || Math.abs(n)) * neg);
    return rule(dirs.map(function (d) { return dec([prop + d, val]); }));
}; };
var flex = function (_key, n) { return dec(['display', n ? 'flex' : 'block']); };
var wrap = function (_key, n) { return dec(['flex-wrap', n ? 'wrap' : 'nowrap']); };
var auto = function (_key, n) { return dec(['flex', '1 1 auto']); };
var column = function (_key, n) { return dec(['flex-direction', n ? 'column' : 'row']); };
var align = function (_key, n) { return dec(['align-items', n.toString()]); };
var justify = function (_key, n) { return dec(['justify-content', n.toString()]); };
var order = function (_key, n) { return dec(['order', n.toString()]); };
var stylers = function (config) { return ({
    w: width,
    m: space(config.space),
    p: space(config.space),
    flex: flex,
    wrap: wrap,
    auto: auto,
    column: column,
    align: align,
    justify: justify,
    order: order
}); };
exports.default = exports.css;
