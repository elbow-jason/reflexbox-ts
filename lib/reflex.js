"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var css_1 = require("./css");
var config_1 = require("./config");
var context_types_1 = require("./context-types");
var reflex = function (component) {
    var Reflex = function (props, context) {
        var config = Object.assign({}, config_1.default(), context.reflexbox);
        var next = css_1.default.configure(config)(props);
        return React.createElement(component, next);
    };
    Reflex.contextTypes = context_types_1.default;
    return Reflex;
};
exports.default = reflex;
