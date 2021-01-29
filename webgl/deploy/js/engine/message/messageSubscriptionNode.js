"use strict";
var webglEngine;
(function (webglEngine) {
    var MessageSubscriptionNode = /** @class */ (function () {
        function MessageSubscriptionNode(message, handler) {
            this.message = message;
            this.handler = handler;
        }
        return MessageSubscriptionNode;
    }());
    webglEngine.MessageSubscriptionNode = MessageSubscriptionNode;
})(webglEngine || (webglEngine = {}));
