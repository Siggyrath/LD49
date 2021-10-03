import * as PIXI from 'pixi.js';

import { HoldButton } from './hold-button';
import { HoldMeter } from './hold-meter';
import { Input} from '../input';

export class HoldButtonPanel extends PIXI.Container {

    private _button: HoldButton;
    private _holdMeter: HoldMeter;

    public constructor() {

        super();

        this._button = new HoldButton(Input.Buttons.K, 'K');
        this._button.position.set(64, 96);
        this.addChild(this._button);

        this._holdMeter = new HoldMeter();
        this._holdMeter.position.set(32, 32);
        this.addChild(this._holdMeter);
    }

    public reset(): void {
        this._holdMeter.reset();
        this._button.reset();
    }

    public tick(delta: number): void {

        this._button.tick(delta);

        this._holdMeter.isCharging = this._button.isDown;
        this._holdMeter.tick(delta);
    }
};