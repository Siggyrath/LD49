import * as PIXI from 'pixi.js';

import { Timer } from '../base/timer';
import { Light, LightColor } from './light';
import { Game, Difficulty } from '../game';

export class ProgressPanel extends PIXI.Container {

    private _lights: Array<Light> = [];
    private _timer: Timer;
    private _nextLight: number;

    public constructor() {

        super();

        for (let i = 0; i < 12; i++) {
            let light = new Light(i < 4 ? LightColor.Green : (i < 8 ? LightColor.Yellow : LightColor.Red));
            light.position.set(i * 64 + 128, 672);
            this._lights.push(light);
            this.addChild(light);
        }

        this._nextLight = 0;
        this._timer = new Timer(11750, () => {

            this._lights[this._nextLight++].setOn();
            if (this._nextLight >= this._lights.length) {
                Game.IsWon = true;
                this._timer.stop();
                return;
            }
            
            if (this._nextLight === 4 && Game.Difficulty === Difficulty.Easy) {
                Game.Difficulty = Difficulty.Medium;
            }
            else if (this._nextLight === 8 && Game.Difficulty === Difficulty.Medium) {
                Game.Difficulty = Difficulty.Hard;
            }
        });
    }

    public start(): void {
        
        this._lights.forEach(light => {
            light.setOff();
        });
        this._nextLight = 0;
        this._timer.loop();
    }

    public stop(): void {

        this._timer.stop();
    }

    public tick(delta: number): void {

        this._timer.tick(delta);
    }
};