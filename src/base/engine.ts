import * as PIXI from 'pixi.js';

import { AssetManager } from './asset-manager';
import { InputManager } from './input-manager';
import { Scene } from './scene';

export class Engine {

    private _app: PIXI.Application;
    private _assets: AssetManager;
    private _input: InputManager;
    private _currentScene: Scene;
    private _nextScene: Scene;

    public app(): PIXI.Application {
        return this._app;
    }

    public constructor(width: number, height: number) {

        this._app = new PIXI.Application({
            width: width,
            height: height,
            backgroundColor: 0x000000
        });

        document.body.appendChild(this._app.view);
    }

    public setAssets(assets: AssetManager): Engine {
        
        this._assets = assets;

        return this;
    }

    public setInput(input: InputManager): Engine {
        
        this._input = input;

        return this;
    }

    public loadScene(scene: Scene): Engine {

        this._nextScene = scene;

        return this;
    }

    public run(): void {

        this._input.configure();
        this._assets.init(this._app, () => {
            this._app.ticker.add(this.tick, this);
        });
    }

    private tick(): void {
        
        let delta = this._app.ticker.deltaMS;

        this._input.update();

        if (this._nextScene) {

            if (this._currentScene) {
                this._currentScene.onEnd();
                this._app.stage.removeChild(this._currentScene.container);
            }

            this._currentScene = this._nextScene;
            this._app.stage.addChild(this._currentScene.container);
            this._currentScene.onStart();
            this._nextScene = null;
        }

        if (this._currentScene) {            
            this._currentScene.onTick(delta);
        }
    }
};