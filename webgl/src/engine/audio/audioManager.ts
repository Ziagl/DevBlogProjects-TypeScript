namespace webglEngine
{
    /**
     * represents one single sound effect from a file
     */
    export class SoundEffect
    {
        private _player:HTMLAudioElement;
        
        constructor(assetPath:string, loop:boolean)
        {
            this._player = new Audio(assetPath);
            this._player.loop = loop;
        }

        public get loop():boolean
        {
            return this._player.loop;
        }

        public set loop(value:boolean)
        {
            this._player.loop = value;
        }

        public destroy():void
        {
            this._player = undefined;
        }

        public play():void
        {
            if(!this._player.paused)
            {
                this.stop();
            }
            this._player.play();
        }

        public pause():void
        {
            this._player.pause();
        }

        public stop():void
        {
            this._player.pause();
            this._player.currentTime = 0;
        }
    }

    /**
     * audio manager holds a dictionary of registered sound effects and manages play, pause and stop
     */
    export class AudioManager
    {
        private static _soundEffects:{[name:string]:SoundEffect} = {};   

        public static loadSoundFile(name:string, assetPath:string, loop:boolean = false):void
        {
            AudioManager._soundEffects[name] = new SoundEffect(assetPath, loop);
        }

        public static playSound(name:string):void
        {
            if(AudioManager._soundEffects[name] !== undefined)
            {
                AudioManager._soundEffects[name].play();
            }
        }

        public static stopSound(name:string):void
        {
            if(AudioManager._soundEffects[name] !== undefined)
            {
                AudioManager._soundEffects[name].stop();
            }
        }

        public static pauseSound(name:string):void
        {
            if(AudioManager._soundEffects[name] !== undefined)
            {
                AudioManager._soundEffects[name].pause();
            }
        }

        public static pauseAll():void
        {
            for(let sfx in AudioManager._soundEffects)
            {
                AudioManager._soundEffects[sfx].pause;
            }
        }

        public static stopAll():void
        {
            for(let sfx in AudioManager._soundEffects)
            {
                AudioManager._soundEffects[sfx].stop;
            }
        }
    }
}