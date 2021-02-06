namespace webglEngine
{
    class CollisionData
    {
        public a:CollisionComponent;
        public b:CollisionComponent;
        public time:number;

        constructor(time:number, a:CollisionComponent, b:CollisionComponent)
        {
            this.time = time;
            this.a = a;
            this.b = b;
        }
    }

    export class CollisionManager
    {
        private static _totalTime:number;
        private static _components:CollisionComponent[] = [];
        private static _collisionData:CollisionData[] = [];

        private constructor()
        {

        }

        public static registerCollisionComponent(component:CollisionComponent):void
        {
            CollisionManager._components.push(component);
        }

        public static unregisterCollisionComponent(component:CollisionComponent):void
        {
            let index = CollisionManager._components.indexOf(component);
            if(index !== -1)
            {
                CollisionManager._components.slice(index, 1);
            }
        }

        public static clear():void
        {
            CollisionManager._components.length = 0;
        }

        public static update(time:number):void
        {
            CollisionManager._totalTime += time;
            // TODO: improve and reduce number of checks
            for(let c = 0; c < CollisionManager._components.length; ++c)
            {
                let comp = CollisionManager._components[c];
                for(let o = 0; o < CollisionManager._components.length; ++o)
                {
                    let other = CollisionManager._components[o];

                    // do net check against collision with self
                    if(comp===other)
                    {
                        continue;
                    }

                    if(comp.shape.intersects(other.shape))
                    {
                        // we have a collision!
                        let exists:boolean = false;
                        for(let d = 0; d < CollisionManager._collisionData.length; ++d)
                        {
                            let data = CollisionManager._collisionData[d];

                            if((data.a === comp && data.b === other) || 
                               (data.a === other && data.b === comp))
                            {
                                // we have existing data. update it
                                comp.onCollisionUpdate(other);
                                other.onCollisionUpdate(comp);
                                data.time = CollisionManager._totalTime;
                                exists = true;
                                break;
                            }
                        }

                        if(!exists)
                        {
                            // create a new collision
                            comp.onCollisionEntry(other);
                            other.onCollisionEntry(comp);
                            let col = new CollisionData(CollisionManager._totalTime, comp, other);
                            this._collisionData.push(col);
                        }
                    }
                }
            }

            // remove stale collision data
            let removeData:CollisionData[] = [];
            for(let d = 0; d < CollisionManager._collisionData.length; ++d)
            {
                let data = CollisionManager._collisionData[d];
                if(data.time !== CollisionManager._totalTime)
                {
                    // old collision data
                    removeData.push(data);
                    data.a.onCollisionExit(data.b);
                    data.b.onCollisionExit(data.a);
                }
            }

            while(removeData.length !== 0)
            {
                let index = CollisionManager._collisionData.indexOf(removeData[0]);
                CollisionManager._collisionData.splice(index, 1);
                removeData.shift();
            }
        }
    }
}