import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { Game } from '../game';

export class HoldMeter extends PIXI.Container {

    private _meterSprite: PIXI.Sprite;
    private _arrowSprite: PIXI.Sprite;

    public isCharging: boolean;
    
    public constructor() {

        super();

        this._meterSprite = new PIXI.Sprite(Assets.Sprites.Buttons['hold_meter']);
        this.addChild(this._meterSprite);

        this._arrowSprite = new PIXI.Sprite(Assets.Sprites.Buttons['hold_arrow']);
        this._arrowSprite.position.set(64, 0);
        this.addChild(this._arrowSprite);

        this.reset();
    }

    public reset(): void {
        this.isCharging = false;
        this._arrowSprite.position.set(64, 0);
    }

    public tick(delta: number): void {
     
        if (this.isCharging) {
            this._arrowSprite.x += delta * 0.05;
            if (this._arrowSprite.x >= 150) {
                this._arrowSprite.x = 150;
                Game.ErrorMessage = 3;
                Game.IsGameOver = true;
            }
        }
        else {
            this._arrowSprite.x -= delta * HoldMeter.CHARGE_TIMES[Game.Difficulty];
            if (this._arrowSprite.x <= -20) {
                this._arrowSprite.x = -20;
                Game.ErrorMessage = 3;
                Game.IsGameOver = true;
            }
        }
    }

    private static CHARGE_TIMES: Array<number> = [0.01, 0.015, 0.025];
};