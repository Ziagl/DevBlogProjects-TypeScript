namespace webglEngine
{
    export class SimObject
    {
        private _id:number;
        private _children:SimObject[] = [];
        private _parent:SimObject;
        private _isLoaded:boolean = false;
        private _scene:Scene;
        private _components:IComponent[] = [];
        private _behaviors:IBehavior[] = [];

        private _localMatrix:Matrix4x4 = Matrix4x4.identity();
        private _worldMatrix:Matrix4x4 = Matrix4x4.identity();

        public name:string;
        public transform:Transform = new Transform();

        constructor(id:number, name:string, scene?:Scene)
        {
            this._id = id;
            this.name = name;
            this._scene = scene;
        }

        public get id():number
        {
            return this._id;
        }

        public get parent():SimObject
        {
            return this._parent;
        }

        public get worldMatrix():Matrix4x4
        {
            return this._worldMatrix;
        }

        public get isLoaded():boolean
        {
            return this._isLoaded;
        }

        /**
         * add child to this object
         * @param child child to add
         */
        public addChild(child:SimObject):void
        {
            child._parent = this;
            this._children.push(child);
            child.onAdded(this._scene);
        }

        /**
         * removed child of this object if found
         * @param child child to remove
         */
        public removeChild(child:SimObject):void
        {
            let index = this._children.indexOf(child);
            if(index !== -1)
            {
                child._parent = undefined;
                this._children.splice(index, 1);
            }
        }

        /**
         * find an object by name recursively all the scene graph
         * @param name name of object to be found
         */
        public getObjectByName(name:string):SimObject
        {
            if(this.name === name)
            {
                return this;
            }

            for(let child of this._children)
            {
                let result = child.getObjectByName(name);
                if(result !== undefined)
                {
                    return result;
                }
            }

            return undefined;
        }

        public addComponent(component:IComponent):void
        {
            this._components.push(component);
            component.setOwner(this);
        }

        public addBehavior(behavior:IBehavior):void
        {
            this._behaviors.push(behavior);
            behavior.setOwner(this);
        }

        public load():void
        {
            this._isLoaded = true;

            for(let c of this._components)
            {
                c.load();
            }

            for(let c of this._children)
            {
                c.load();
            }
        }

        public update(time:number):void
        {
            //TODO only do if there was a change!!!
            this._localMatrix = this.transform.getTransformationMatrix();
            this.updateWorldMatrix((this._parent !== undefined)?this._parent.worldMatrix:undefined );

            for(let c of this._components)
            {
                c.update(time);
            }

            for(let b of this._behaviors)
            {
                b.update(time);
            }

            for(let c of this._children)
            {
                c.update(time);
            }
        }

        public render(shader:Shader):void
        {
            for(let c of this._components)
            {
                c.render(shader);
            }

            for(let c of this._children)
            {
                c.render(shader);
            }
        }

        /** Returns the world position of this entity. */
        public getWorldPosition(): Vector3 {
            return new Vector3( this._worldMatrix.data[12], this._worldMatrix.data[13], this._worldMatrix.data[14] );
        }

        protected onAdded(scene:Scene):void
        {
            this._scene = scene;
        }

        private updateWorldMatrix(parentWorldMatrix:Matrix4x4):void
        {
            if(parentWorldMatrix !== undefined)
            {
                this._worldMatrix = Matrix4x4.multiply(parentWorldMatrix, this._localMatrix);
            } else {
                this._worldMatrix.copyFrom(this._localMatrix);
            }
        }
    }
}