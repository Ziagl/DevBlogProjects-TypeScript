namespace webglEngine
{
    /**
     * the message manager responsible for sending message across the system
     */
    export class MessageBus
    {
        private static _subscriptions:{[code:string]:IMessageHandler[]} = {};
        private static _normalQueueMessagePerUpdate:number = 10;
        private static _normalMessageQueue:MessageSubscriptionNode[] = [];

        private constructor()
        {

        }

        /**
         * adds a subscription to the provided code using the provided handler.
         * @param code the code to listen for
         * @param handler the handler to be subscribed.
         */
        public static addSubscription(code:string, handler:IMessageHandler):void
        {
            if(MessageBus._subscriptions[code] === undefined)
            {
                MessageBus._subscriptions[code] = [];
            }

            if(MessageBus._subscriptions[code].indexOf(handler) !== -1)
            {
                console.warn("Attempting to add a duplicate handler to code: " + code + ". Subscrition not added.");
            } else {
                MessageBus._subscriptions[code].push(handler);
            }
        }

        /**
         * removed a subscription to the provided code using the provided handler
         * @param code the cod eto no longer listen for
         * @param handler the handler to be unsubscribed
         */
        public static removeSubscription(code:string, handler:IMessageHandler):void
        {
            if(MessageBus._subscriptions[code] === undefined)
            {
                console.warn("Cannot unsubscribe handler from code: " + code + ". That code is not subscribed to.");
                return;
            }

            let nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
            if(nodeIndex !== -1)
            {
                MessageBus._subscriptions[code].splice(nodeIndex, 1);
            }
        }

        /**
         * posts the provided message to the message system
         * @param message the message to be sent
         */
        public static post(message:Message):void
        {
            console.log("Message posted: ",message);
            let handlers = MessageBus._subscriptions[message.code];
            if(handlers === undefined)
            {
                return;
            }

            for(let h of handlers)
            {
                if(message.priority === MessagePriority.HIGH)
                {
                    h.onMessage(message);
                } else {
                    MessageBus._normalMessageQueue.push(new MessageSubscriptionNode(message, h));
                }
            }
        }

        /**
         * updated messages and computes up do normalQueueMessagePerUpdate messages
         */
        public static update(time:number):void
        {
            if(MessageBus._normalMessageQueue.length === 0)
            {
                return;
            }

            let messageLimit = Math.min(MessageBus._normalQueueMessagePerUpdate, MessageBus._normalMessageQueue.length);
            for(let i = 0; i < messageLimit; ++i)
            {
                let node = MessageBus._normalMessageQueue.pop();
                node?.handler.onMessage(node.message);
            }
        }
    }
}