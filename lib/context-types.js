"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prop_types_1 = require("prop-types");
var contextTypes = {
    reflexbox: prop_types_1.shape({
        breakpoints: prop_types_1.arrayOf(prop_types_1.number),
        space: prop_types_1.arrayOf(prop_types_1.number),
    })
};
exports.default = contextTypes;
