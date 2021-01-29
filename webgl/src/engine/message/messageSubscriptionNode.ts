namespace webglEngine
{
    export class MessageSubscriptionNode
    {
        public message:Message;
        public handler:IMessageHandler;

        constructor(message:Message, handler:IMessageHandler)
        {
            this.message = message;
            this.handler = handler;
        }
    }
}