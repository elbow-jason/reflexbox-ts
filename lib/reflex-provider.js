"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var context_types_1 = require("./context-types");
var ReflexProvider = /** @class */ (function (_super) {
    __extends(ReflexProvider, _super);
    function ReflexProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.childContextTypes = context_types_1.default;
        return _this;
    }
    ReflexProvider.prototype.getChildContext = function () {
        return {
            reflexbox: this.props
        };
    };
    ReflexProvider.prototype.render = function () {
        return React.Children.only(this.props.children);
    };
    return ReflexProvider;
}(React.Component));
exports.default = ReflexProvider;
