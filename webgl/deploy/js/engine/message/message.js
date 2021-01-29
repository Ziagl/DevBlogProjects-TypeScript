"use strict";
var webglEngine;
(function (webglEngine) {
    var MessagePriority;
    (function (MessagePriority) {
        MessagePriority[MessagePriority["NORMAL"] = 0] = "NORMAL";
        MessagePriority[MessagePriority["HIGH"] = 1] = "HIGH";
    })(MessagePriority = webglEngine.MessagePriority || (webglEngine.MessagePriority = {}));
    var Message = /** @class */ (function () {
        function Message(code, sender, context, priority) {
            if (priority === void 0) { priority = MessagePriority.NORMAL; }
            this.code = code;
            this.sender = sender;
            this.context = context;
            this.priority = priority;
        }
        Message.send = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        };
        Message.sendPriority = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
        };
        Message.subscribe = function (code, handler) {
            webglEngine.MessageBus.addSubscription(code, handler);
        };
        Message.unsubscribe = function (code, handler) {
            webglEngine.MessageBus.removeSubscription(code, handler);
        };
        return Message;
    }());
    webglEngine.Message = Message;
})(webglEngine || (webglEngine = {}));
