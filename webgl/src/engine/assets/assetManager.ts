namespace webglEngine
{
    export const MESSAGE_ASSET_LOADER_ASSET_LOADED = "MESSAGE_ASSET_LOADER_ASSET_LOADED::";

    export class AssetManager
    {
        private static _loaders:IAssetLoader[] = [];
        private static _loadedAssets:{[name:string]:IAsset} = {};

        private constructor()
        {

        }

        public static initialize():void
        {
            AssetManager._loaders.push(new ImageAssetLoader());
        }

        public static registerLoader(loader:IAssetLoader):void
        {
            AssetManager._loaders.push(loader);
        }

        public static onAssetLoaded(asset:IAsset):void
        {
            AssetManager._loadedAssets[asset.name] = asset;
            Message.send(MESSAGE_ASSET_LOADER_ASSET_LOADED + asset.name, this, asset);
        }

        public static loadAsset(assetName:string):void
        {
            let extension = assetName.split('.').pop()?.toLowerCase();
            if(extension === undefined)
            {
                console.warn("Unable to load extension for: " + assetName);
                return;
            }
            for(let l of AssetManager._loaders)
            {
                if(l.supportedExtensions.indexOf(extension) !== -1)
                {
                    l.loadAsset(assetName);
                    return;
                }
            }
            console.warn("Unable to load asset with extension " + extension + ". There is not loader associated with it.");
        }

        public static isAssetLoaded(assetName:string):boolean
        {
            return AssetManager._loadedAssets[assetName] !== undefined;
        }

        public static getAsset(assetName:string):IAsset | undefined
        {
            if(this.isAssetLoaded(assetName))
            {
                return AssetManager._loadedAssets[assetName];
            } else {
                AssetManager.loadAsset(assetName);
            }
            return undefined;
        }
    }
}