var webglEngine;
(function (webglEngine) {
    /**
     * the message manager responsible for sending message across the system
     */
    var MessageBus = /** @class */ (function () {
        function MessageBus() {
        }
        /**
         * adds a subscription to the provided code using the provided handler.
         * @param code the code to listen for
         * @param handler the handler to be subscribed.
         */
        MessageBus.addSubscription = function (code, handler) {
            if (MessageBus._subscriptions[code] === undefined) {
                MessageBus._subscriptions[code] = [];
            }
            if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
                console.warn("Attempting to add a duplicate handler to code: " + code + ". Subscrition not added.");
            }
            else {
                MessageBus._subscriptions[code].push(handler);
            }
        };
        /**
         * removed a subscription to the provided code using the provided handler
         * @param code the cod eto no longer listen for
         * @param handler the handler to be unsubscribed
         */
        MessageBus.removeSubscription = function (code, handler) {
            if (MessageBus._subscriptions[code] === undefined) {
                console.warn("Cannot unsubscribe handler from code: " + code + ". That code is not subscribed to.");
                return;
            }
            var nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
            if (nodeIndex !== -1) {
                MessageBus._subscriptions[code].splice(nodeIndex, 1);
            }
        };
        /**
         * posts the provided message to the message system
         * @param message the message to be sent
         */
        MessageBus.post = function (message) {
            console.log("Message posted: ", message);
            var handlers = MessageBus._subscriptions[message.code];
            if (handlers === undefined) {
                return;
            }
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var h = handlers_1[_i];
                if (message.priority === webglEngine.MessagePriority.HIGH) {
                    h.onMessage(message);
                }
                else {
                    MessageBus._normalMessageQueue.push(new webglEngine.MessageSubscriptionNode(message, h));
                }
            }
        };
        /**
         * updated messages and computes up do normalQueueMessagePerUpdate messages
         */
        MessageBus.update = function (time) {
            if (MessageBus._normalMessageQueue.length === 0) {
                return;
            }
            var messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
            for (var i = 0; i < messageLimit; ++i) {
                var node = MessageBus._normalMessageQueue.pop();
                node === null || node === void 0 ? void 0 : node.handler.onMessage(node.message);
            }
        };
        MessageBus._subscriptions = {};
        MessageBus._normalQueueMessagePerUpdate = 10;
        MessageBus._normalMessageQueue = [];
        return MessageBus;
    }());
    webglEngine.MessageBus = MessageBus;
})(webglEngine || (webglEngine = {}));
