"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = void 0;
const index_1 = require("../index");
const broadcast = (msg) => {
    index_1.io.to('global').emit('broadcast message', `${msg.user.name}: ${msg.message}`);
};
exports.broadcast = broadcast;
//# sourceMappingURL=socketActions.js.map