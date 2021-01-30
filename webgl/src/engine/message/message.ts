namespace webglEngine
{
    export enum MessagePriority
    {
        NORMAL,
        HIGH
    }

    export class Message
    {
        public code:string;
        public context:any;
        public sender:any;
        public priority:MessagePriority;

        constructor(code:string, sender:any, context?:any, priority:MessagePriority = MessagePriority.NORMAL)
        {
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
        public static send(code:string, sender:any, context?:any):void
        {
            MessageBus.post(new Message(code, sender, context, MessagePriority.NORMAL));
        }

        /**
         * sends a high-priority message with the provided parameters
         * @param code the code for this message, which is subscribed to and listened for
         * @param sender the class instance which sent this message
         * @param context free-form context data to be included with this message
         */
        public static sendPriority(code:string, sender:any, context?:any):void
        {
            MessageBus.post(new Message(code, sender, context, MessagePriority.HIGH));
        }

        /**
         * subscribes the provided handler to listen for the message code provided
         * @param code the code to listen for
         * @param handler the message handler to be called when a message containing the provided code is sent
         */
        public static subscribe(code:string, handler:IMessageHandler):void
        {
            MessageBus.addSubscription(code, handler);
        }

        /**
         * unsubscribes the provided handler from listening for the message code provided
         * @param code the code to no longer listen for
         * @param handler the message handler to unsubscribe
         */
        public static unsubscribe(code:string, handler:IMessageHandler):void
        {
            MessageBus.removeSubscription(code, handler);
        }
    }
}