import * as PIXI from 'pixi.js';

import { Assets } from '../assets';

export enum LightColor {
    Green,
    Yellow,
    Red
}

export class Light extends PIXI.Container {

    private _offSprite: PIXI.Sprite;
    private _onSprite: PIXI.Sprite;

    public isOn: boolean;

    public constructor(color: LightColor) {

        super();

        switch (color) {
            case LightColor.Green:
                this._offSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_green_off']);
                this._onSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_green_on']);
                break;

            case LightColor.Yellow:
                this._offSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_yellow_off']);
                this._onSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_yellow_on']);
                break;

            case LightColor.Red:
                this._offSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_red_off']);
                this._onSprite = new PIXI.Sprite(Assets.Sprites.Buttons['light_red_on']);
                break;
        }
        this.addChild(this._offSprite);
        this.addChild(this._onSprite);

        this.setOff();
    }

    public setOff(): void {

        this.isOn = false;
        this._offSprite.visible = true;
        this._onSprite.visible = false;
    }

    public setOn(): void {

        this.isOn = true;
        this._offSprite.visible = false;
        this._onSprite.visible = true;
    }
}