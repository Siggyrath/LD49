import * as PIXI from 'pixi.js';

import { Timer } from '../base/timer';
import { Light, LightColor } from './light';
import { RotateButton } from './rotate-button';
import { Assets } from '../assets';
import { Game, Difficulty } from '../game';
import { Input } from '../input';
import { InputState } from '../base/input-manager';

export class RotateButtonPanel extends PIXI.Container {

    private _button: RotateButton;
    private _lights: Array<Light> = [];
    private _targetMarker: number;
    private _lightUpTimer: Timer;
    private _blockingButtons: Array<InputState> = [];
    private _texts: Array<PIXI.Text>;

    public constructor() {

        super();

        this._button = new RotateButton(Input.Buttons.Q, Input.Buttons.E);        
        this._button.position.set(64, 80);
        this.addChild(this._button);

        for (let i = 0; i < 5; i++) {
            let light = new Light(LightColor.Red);
            this._lights.push(light);
            this.addChild(light);
        }
        this._lights[0].position.set(96-69, 112-40);
        this._lights[1].position.set(96-40, 112-69);
        this._lights[2].position.set(96-0, 112-80);
        this._lights[3].position.set(96+40, 112-69);
        this._lights[4].position.set(96+69, 112-40);
        this._lights[0].setOn();

        this._targetMarker = 0;
        this._lightUpTimer = new Timer(this.nextLightUp(), () => {

            while (true) {
                let marker = Math.floor(Math.random() * this._lights.length);
                if (marker === this._targetMarker) {
                    continue;
                }
                this._targetMarker = marker;
                break;
            }
            this._lights.forEach(light => {
                light.setOff();            
            });
            this._lights[this._targetMarker].setOn();
            this._lightUpTimer.setTime(this.nextLightUp());
        });
        this._lightUpTimer.loop();

        this._blockingButtons = [
            Input.Buttons.A,
            Input.Buttons.S,
            Input.Buttons.D,
            Input.Buttons.W,
            Input.Buttons.J,
            Input.Buttons.L,
            Input.Buttons.K
        ];

        this._texts = [
            new PIXI.Text('Q', Assets.UI.FontDark),
            new PIXI.Text('E', Assets.UI.FontDark),
        ];
        this._texts[0].position.set(50, 128);
        this._texts[1].position.set(192, 128);
        this._texts.forEach(text => {
            this.addChild(text);
        });
    }

    public reset(): void {

        this._lights.forEach(light => {
            light.setOff();
        });
        this._lights[0].setOn();
        this._targetMarker = 0;
        this._lightUpTimer.setTime(this.nextLightUp());
        this._lightUpTimer.loop();
        this._button.reset();
    }

    public tick(delta: number): void {

        this._lightUpTimer.tick(delta);
        this._button.tick(delta);

        if (this._button.marker !== this._targetMarker) {
            this._blockingButtons.forEach(button => {
                button.isDown = false;
                button.nextFrame();
                button.update();
            });
        }
    }

    private nextLightUp(): number {
        
        switch (Game.Difficulty) {
            case Difficulty.Easy:
                return Math.random() * 2000 + 6000; // 6s-8s
            case Difficulty.Medium:
                return Math.random() * 2000 + 4000; // 4s-6s
            case Difficulty.Hard:
                return Math.random() * 1000 + 3000; // 3s-4s
        }
    }
};