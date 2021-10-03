import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { InputState } from '../base/input-manager';

export class RotateButton extends PIXI.Container {

    private _buttonLeft: InputState;
    private _buttonRight: InputState;
    private _baseSprite: PIXI.Sprite;
    private _arrowSprite: PIXI.Sprite;
    
    public marker: number;
    
    public constructor(buttonLeft: InputState, buttonRight: InputState) {

        super();

        this._buttonLeft = buttonLeft;
        this._buttonRight = buttonRight;

        this._baseSprite = new PIXI.Sprite(Assets.Sprites.Buttons['rotate_base']);
        this.addChild(this._baseSprite);

        this._arrowSprite = new PIXI.Sprite(Assets.Sprites.Buttons['rotate_arrow']);
        this._arrowSprite.pivot.set(64, 64);
        this._arrowSprite.position.set(64, 64);
        this._arrowSprite.angle = -60;
        this.addChild(this._arrowSprite);

        this.marker = 0;
    }

    public reset(): void {
        this.marker = 0;
        this._arrowSprite.angle = -60;
    }

    public tick(delta: number): void {
     
        if (this._buttonRight.isPressed && this.marker < 4) {
            this._arrowSprite.angle += 30;
            this.marker++;
        }
        else if (this._buttonLeft.isPressed && this.marker > 0) {
            this._arrowSprite.angle -= 30;
            this.marker--;
        }
    }
};