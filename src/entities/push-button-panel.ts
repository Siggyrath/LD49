import * as PIXI from 'pixi.js';

import { Timer } from '../base/timer';
import { Light, LightColor } from './light';
import { Game, Difficulty } from '../game';
import { PushButton } from './push-button';
import { Input} from '../input';

export class PushButtonPanel extends PIXI.Container {

    private _buttons: Array<PushButton>;
    private _lights: Array<Light> = [];
    private _life: number;
    private _lifeTimer: Timer;
    private _lightUpTimer: Timer;
    private _lightCount: number;

    public constructor() {

        super();

        this._buttons = [
            new PushButton(Input.Buttons.A, 'A'),
            new PushButton(Input.Buttons.S, 'S'),
            new PushButton(Input.Buttons.D, 'D'),
            new PushButton(Input.Buttons.W, 'W'),
        ];
        this._buttons[0].position.set(32, 160);
        this._buttons[1].position.set(96, 160);
        this._buttons[2].position.set(160, 160);
        this._buttons[3].position.set(96, 96);
        this._buttons.forEach(button => {
            this.addChild(button);    
        });

        for (let i = 0; i < 4; i++) {
            let light = new Light(LightColor.Red);
            light.position.set(i * 48 + 24, 16);
            light.setOn();
            this._lights.push(light);
            this.addChild(light);
        }

        this._life = this._lights.length;
        this._lifeTimer = new Timer(PushButtonPanel.LIFE_TIMES[0], () => {
            if (this._life > 0) {
                this._life--;
            }
            else {
                Game.ErrorMessage = 0;
                Game.IsGameOver = true;
            }
            this._lifeTimer.setTime(PushButtonPanel.LIFE_TIMES[Game.Difficulty]);
        });

        this._lightCount = 0;
        this._lightUpTimer = new Timer(this.nextLightUp(), () => {

            if (this._lightCount < this._buttons.length) {
                while (true) {
                    let index = Math.floor(Math.random() * this._buttons.length);
                    if (this._buttons[index].isOn) {
                        continue;
                    }
                    this._buttons[index].setOn();
                    this._lightCount++;
                    break;
                }
            }
            if (!this._lifeTimer.isRunning) {
                this._lifeTimer.loop();
            }

            this._lightUpTimer.setTime(this.nextLightUp());
        });
        this._lightUpTimer.loop();
    }

    public reset(): void {

        this._lights.forEach(light => {
            light.setOn();
        });
        this._life = this._lights.length;
        this._lifeTimer.setTime(PushButtonPanel.LIFE_TIMES[Game.Difficulty]);
        this._lifeTimer.stop();
        this._lightCount = 0;
        this._lightUpTimer.setTime(this.nextLightUp());
        this._lightUpTimer.loop();
        this._buttons.forEach(button => {
            button.reset();
        });
    }

    public tick(delta: number): void {

        this._lightUpTimer.tick(delta);

        this._buttons.forEach(button => {
            button.tick(delta);
            if (button.isPressed) {
                if (button.isOn) {
                    button.setOff();
                    this._lightCount--;
                }
                else {
                    if (this._life > 0) {
                        this._life--;
                    }
                    else {
                        Game.ErrorMessage = 1;
                        Game.IsGameOver = true;
                    }
                }
            }
        });
        if (this._lightCount === 0 && this._lifeTimer.isRunning) {
            this._lifeTimer.stop();
            this._life = this._lights.length;
        }

        this._lifeTimer.tick(delta);

        for (let i = 0; i < this._lights.length; i++) {
            if (i + 1 <= this._life) {
                this._lights[i].setOn();
            }
            else {
                this._lights[i].setOff();
            }
        }
    }

    private nextLightUp(): number {

        switch (Game.Difficulty) {
            case Difficulty.Easy:
                return Math.random() * 1000 + 3000; // 3s-4s
            case Difficulty.Medium:
                return Math.random() * 1000 + 2000; // 2s-3s
            case Difficulty.Hard:
                return Math.random() * 1000 + 1000; // 1s-2s
        }
    }

    private static LIFE_TIMES: Array<number> = [2000, 1500, 1250];
};