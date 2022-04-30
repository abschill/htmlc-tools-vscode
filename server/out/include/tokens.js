"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXT_TOKEN_MAP = void 0;
const constants_1 = require("html-chunk-loader/lib/compiler/parser/constants");
__exportStar(require("html-chunk-loader/lib/compiler/parser/constants.js"), exports);
exports.EXT_TOKEN_MAP = [
    {
        signature: constants_1.AST_RENDER_REGGIE,
        diagnosticName: 'Render Matcher',
        diagnosticMsg: 'html-chunk-loader value insertion directive(regex)',
        detailMsg: 'loads a variable from your runtime/inline configuration to the template'
    },
    {
        signature: constants_1.AST_PARTIAL_REGGIE,
        diagnosticName: 'Partial Matcher',
        diagnosticMsg: 'html-chunk-loader partial',
        detailMsg: 'loads a partial chunk from the configured path by name'
    },
    {
        signature: new RegExp(constants_1.AST_LOOP_SIGNATURE),
        diagnosticName: 'Loop Signature',
        diagnosticMsg: 'html-chunk-loader iterator',
        detailMsg: 'gives you the ability to iterate over variables defined in a template'
    },
    {
        signature: new RegExp(constants_1.AST_OPEN_SCOPE + constants_1.AST_DT),
        diagnosticName: 'Open Scope',
        diagnosticMsg: 'html-chunk-loader scope open',
        detailMsg: 'opens scope for html template variable'
    },
    {
        signature: new RegExp(constants_1.AST_CLOSE_SCOPE),
        diagnosticName: 'Close Scope',
        diagnosticMsg: 'html-chunk-loader scope close',
        detailMsg: 'closes block scope in html template'
    }
];
//# sourceMappingURL=tokens.js.map