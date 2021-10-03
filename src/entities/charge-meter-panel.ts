import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { ChargeMeter } from './charge-meter';
import { Light, LightColor } from './light';
import { PushButton } from './push-button';
import { Game } from '../game';
import { Input } from '../input';

export class ChargeMeterPanel extends PIXI.Container {

    private _meter: ChargeMeter;
    private _baseSprite: PIXI.Sprite;
    private _buttons: Array<PushButton>;
    private _nextButton: number;
    private _light: Light;

    public constructor() {

        super();

        this._baseSprite = new PIXI.Sprite(Assets.Sprites.Buttons['charge_base']);
        this._baseSprite.position.set(64, 32);
        this.addChild(this._baseSprite);

        this._meter = new ChargeMeter();
        this._meter.position.set(64, 32);
        this.addChild(this._meter);

        this._buttons = [
            new PushButton(Input.Buttons.J, 'J'),
            new PushButton(Input.Buttons.L, 'L')
        ];
        this._buttons[0].position.set(48, 160);
        this._buttons[1].position.set(144, 160);
        this._buttons.forEach(button => {
            this.addChild(button);
        });
        this._buttons[1].setOn();
        this._nextButton = 1;

        this._light = new Light(LightColor.Red);
        this._light.position.set(144, 0);
        this.addChild(this._light);
    }

    public reset(): void {
        this._meter.reset();
        this._buttons.forEach(button => {
            button.reset();
        });
        this._buttons[1].setOn();
        this._nextButton = 1;
        this._light.setOff();
    }

    public tick(delta: number): void {

        let charge: boolean = false;
        this._buttons.forEach((button, index) => {
            button.tick(delta);
            if (button.isPressed && index == this._nextButton) {
                this._buttons[this._nextButton].setOff();
                this._nextButton = 1 - this._nextButton;
                this._buttons[this._nextButton].setOn();
                charge = true;
            }
        });

        this._meter.isCharging = charge;
        this._meter.tick(delta);
        if (this._meter.isEmpty) {
            Game.ErrorMessage = 2;
            Game.IsGameOver = true;
        }
        if (this._meter.isOvercharged) {
            this._light.setOn();
        }
        else if (this._light.isOn) {
            this._light.setOff();
        }
    }
};