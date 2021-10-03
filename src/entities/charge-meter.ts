import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { Game } from '../game';

export class ChargeMeter extends PIXI.Container {

    private _sprite: PIXI.Sprite;

    public isCharging: boolean;
    public isEmpty: boolean;
    public isOvercharged: boolean;
    
    public constructor() {

        super();

        this._sprite = new PIXI.Sprite(Assets.Sprites.Buttons['charge_arrow']);
        this._sprite.pivot.set(64, 64);
        this._sprite.position.set(64, 64);
        this._sprite.angle = 80;
        this.addChild(this._sprite);

        this.reset();
    }

    public reset(): void {
        this.isCharging = false;
        this.isEmpty = false;
        this.isOvercharged = false;
        this._sprite.angle = 80;
    }

    public tick(delta: number): void {
     
        if (this.isOvercharged && this._sprite.angle <= 15) {
            this.isOvercharged = false;
        }

        if (this.isCharging && !this.isOvercharged) {
            this._sprite.angle += delta * 0.5;
            if (this._sprite.angle >= 90) {
                this._sprite.angle = 90;
            }
            if (this._sprite.angle > 80) {
                this.isOvercharged = true;
            }
        }
        else {
            this._sprite.angle -= delta * ChargeMeter.CHARGE_TIMES[Game.Difficulty];
            if (this._sprite.angle <= -90) {
                this._sprite.angle = -90;
                this.isEmpty = true;
            }
        }
    }

    private static CHARGE_TIMES: Array<number> = [0.01, 0.015, 0.025];
};