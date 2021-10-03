import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { InputState } from '../base/input-manager';

export class HoldButton extends PIXI.Container {

    private _button: InputState;
    private _upSprite: PIXI.Sprite;
    private _downSprite: PIXI.Sprite;
    private _text: PIXI.Text;
    
    public isDown: boolean;
    
    public constructor(button: InputState, text: string) {

        super();

        this._button = button;
        
        this._upSprite = new PIXI.Sprite(Assets.Sprites.Buttons['hold_up']);
        this.addChild(this._upSprite);
        
        this._downSprite = new PIXI.Sprite(Assets.Sprites.Buttons['hold_down']);
        this._downSprite.visible = false;
        this.addChild(this._downSprite);

        this._text = new PIXI.Text(text, Assets.UI.FontDark);
        this._text.position.set(58, 50);
        this.addChild(this._text);

        this.reset();
    }

    public reset(): void {
        this.isDown = false;
        this.updateSprites();
    }

    public tick(delta: number): void {
        
        this.isDown = this._button.isDown;
        this.updateSprites();
    }

    private updateSprites(): void {

        this._upSprite.visible = !this.isDown;
        this._downSprite.visible = this.isDown;
    }
};