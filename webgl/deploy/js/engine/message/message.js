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
        /**
         * sends a normal-priority message with the provided parameters
         * @param code the code for this message, which is subscribed to and listened for
         * @param sender the class instance which sent thes message
         * @param context free-form context data to be included with this message
         */
        Message.send = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        };
        /**
         * sends a high-priority message with the provided parameters
         * @param code the code for this message, which is subscribed to and listened for
         * @param sender the class instance which sent this message
         * @param context free-form context data to be included with this message
         */
        Message.sendPriority = function (code, sender, context) {
            webglEngine.MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
        };
        /**
         * subscribes the provided handler to listen for the message code provided
         * @param code the code to listen for
         * @param handler the message handler to be called when a message containing the provided code is sent
         */
        Message.subscribe = function (code, handler) {
            webglEngine.MessageBus.addSubscription(code, handler);
        };
        /**
         * unsubscribes the provided handler from listening for the message code provided
         * @param code the code to no longer listen for
         * @param handler the message handler to unsubscribe
         */
        Message.unsubscribe = function (code, handler) {
            webglEngine.MessageBus.removeSubscription(code, handler);
        };
        return Message;
    }());
    webglEngine.Message = Message;
})(webglEngine || (webglEngine = {}));
