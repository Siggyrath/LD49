import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { InputState } from '../base/input-manager';

export class PushButton extends PIXI.Container {

    private _button: InputState;
    private _onSprites: Array<PIXI.Sprite>;
    private _offSprites: Array<PIXI.Sprite>;
    private _text: PIXI.Text;
    
    public isOn: boolean;
    public isPressed: boolean;
    public isDown: boolean;
    
    public constructor(button: InputState, text: string) {

        super();

        this._button = button;

        this._onSprites = [
            new PIXI.Sprite(Assets.Sprites.Buttons['push_on_up']),
            new PIXI.Sprite(Assets.Sprites.Buttons['push_on_down'])
        ];
        this._onSprites.forEach(sprite => {
            this.addChild(sprite);
        });

        this._offSprites = [
            new PIXI.Sprite(Assets.Sprites.Buttons['push_off_up']),
            new PIXI.Sprite(Assets.Sprites.Buttons['push_off_down'])
        ];
        this._offSprites.forEach(sprite => {
            this.addChild(sprite);
        });

        this._text = new PIXI.Text(text, Assets.UI.FontDark);
        this._text.position.set(24, 24);
        this.addChild(this._text);

        this.reset();
    }

    public reset(): void {
        this.isOn = false;
        this.isPressed = false;
        this.isDown = false;
        this.updateSprites();
    }

    public tick(delta: number): void {
        
        this.isPressed = false;

        if (this._button.isPressed) {
            this.isPressed = true;
            this.isDown = true;
            this.updateSprites();
        }
        else if (this.isDown && !this._button.isDown) {
            this.isPressed = false;
            this.isDown = false;
            this.updateSprites();
        }
    }

    public setOn(): void {

        this.isOn = true;
        this.updateSprites();
    }

    public setOff(): void {

        this.isOn = false;
        this.updateSprites();
    }

    private updateSprites(): void {

        this._offSprites[0].visible = !this.isOn && !this.isDown;
        this._offSprites[1].visible = !this.isOn && this.isDown;
        this._onSprites[0].visible = this.isOn && !this.isDown;
        this._onSprites[1].visible = this.isOn && this.isDown;
    }
};