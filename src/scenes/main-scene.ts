import * as PIXI from 'pixi.js';

import { Assets } from '../assets';
import { Scene } from '../base/scene';
import { Timer } from '../base/timer';
import { ChargeMeterPanel } from '../entities/charge-meter-panel';
import { CreditsPanel } from '../entities/credits-panel';
import { HoldButtonPanel } from '../entities/hold-button-panel';
import { LCDPanel } from '../entities/lcd-panel';
import { PanelContainer, PanelState } from '../entities/panel-container';
import { ProgressPanel } from '../entities/progress-panel';
import { PushButtonPanel } from '../entities/push-button-panel';
import { RotateButtonPanel } from '../entities/rotate-button-panel';
import { Difficulty, Game } from '../game';
import { Input } from '../input';

enum GameState {
    Menu,
    Playing,
    Finished,
    End,
    Credits
};

export class MainScene extends Scene {

    public pushButtonPanel: PushButtonPanel;
    public rotateButtonPanel: RotateButtonPanel;
    public chargeMeterPanel: ChargeMeterPanel;
    public holdButtonPanel: HoldButtonPanel;
    public progressPanel: ProgressPanel;
    public lcdPanel: LCDPanel;
    public creditsPanel: CreditsPanel;

    private _background: PIXI.Sprite;
    private _panels: Array<PanelContainer> = [];
    private _panelTimer: Timer;
    private _state: GameState;
    private _endTimer: Timer;
    private _countdown: number;

    public onStart(): void {

        this.pushButtonPanel = new PushButtonPanel();
        this.rotateButtonPanel = new RotateButtonPanel();
        this.chargeMeterPanel = new ChargeMeterPanel();
        this.holdButtonPanel = new HoldButtonPanel();

        let panelContainers = [
            this.rotateButtonPanel,
            this.pushButtonPanel,
            this.chargeMeterPanel,
            this.holdButtonPanel
        ];
        for (let i = 0; i < 4; i++) {
            let panel = new PanelContainer(panelContainers[i]);
            this._panels.push(panel);
            this.container.addChild(panel);
        }
        this._panels[0].position.set(640, 64);
        this._panels[1].position.set(128, 64);
        this._panels[2].position.set(128, 384);
        this._panels[3].position.set(640, 384);

        this._background = new PIXI.Sprite(Assets.Sprites.Level);
        this.container.addChild(this._background);

        this.lcdPanel = new LCDPanel();
        this.lcdPanel.position.set(410, 200);
        this.container.addChild(this.lcdPanel);

        this.progressPanel = new ProgressPanel();
        this.container.addChild(this.progressPanel);

        this.creditsPanel = new CreditsPanel();
        this.creditsPanel.visible = false;
        this.container.addChild(this.creditsPanel);

        this._panelTimer = new Timer(18000, () => {

            if (this._panels[3].state === PanelState.Open) {
                this.lcdPanel.showContinueText();
                this._panelTimer.stop();
            }
            else if (this._panels[2].state === PanelState.Open) {
                this._panels[3].open();
                this.lcdPanel.showPanelText(3);
                Assets.Audio.PanelOpen.play();
            }
            else if (this._panels[0].state === PanelState.Open) {
                this._panels[2].open();
                this.lcdPanel.showPanelText(2);
                Assets.Audio.PanelOpen.play();
            }
            else if (this._panels[1].state === PanelState.Open) {
                this._panels[0].open();
                this.lcdPanel.showPanelText(0);
                Assets.Audio.PanelOpen.play();
            }
        });

        this._state = GameState.Menu;

        this._endTimer = new Timer(1000, () => {

            this._countdown++
            if (this._countdown > 7) {
                this.creditsPanel.visible = true;
                this._endTimer.stop();
                return;
            }
            else if (this._countdown == 5) {
                this.hide();
                Assets.Audio.Explosion.play();
                return;
            }
            else if (this._countdown < 5) {
                this.lcdPanel.showCountdownText(this._countdown);
            }
        });
        this._countdown = 0;
    }

    public onEnd(): void {
    }

    public onTick(delta: number): void {

        if (this._state === GameState.End) {
            return;
        }

        if (this._state === GameState.Menu && Input.Buttons.Y.isPressed) {
            this.startGame();
        }        
        else if (this._state === GameState.Playing) {
            if (Game.IsGameOver) {
                this.loseGame();
            }
            else if (Game.IsWon) {
                this.winGame();
            }
        }

        if (this._state !== GameState.Playing) {
            this._panels.forEach(panel => {
                if (panel.state === PanelState.Open) {
                    panel.close();
                }
            });
        }

        this._panels.forEach(panel => {
            panel.tick(delta);
        });

        this._panelTimer.tick(delta);
        this.progressPanel.tick(delta);
        this._endTimer.tick(delta);
    }

    private startGame(): void {

        if (this._state !== GameState.Menu) {
            return;
        }

        let canStart: boolean = true;
        this._panels.forEach(panel => {
            if (panel.state !== PanelState.Closed) {
                canStart = false;
            }
        });
        if (!canStart) {
            return;
        }

        Game.Difficulty = Difficulty.Easy;
        Game.IsGameOver = false;
        Game.IsWon = false;

        this._state = GameState.Playing;
        Assets.Music.Main.play();
        this._panels[1].open();
        Assets.Audio.PanelOpen.play();
        this._panelTimer.loop();
        this.progressPanel.start();
        this.lcdPanel.showPanelText(1);
    }

    private loseGame(): void {

        if (this._state !== GameState.Playing) {
            return;
        }

        this._state = GameState.Menu;
        Assets.Music.Main.stop();
        this._panels.forEach(panel => {
            panel.close();
        });
        Assets.Audio.PanelOpen.play();
        this._panelTimer.stop();
        this.progressPanel.stop();
        this.lcdPanel.showErrorText(Game.ErrorMessage);
    }

    private winGame(): void {

        if (this._state !== GameState.Playing) {
            return;
        }

        this._state = GameState.Finished;
        this._panels.forEach(panel => {
            panel.close();
        });
        this._panelTimer.stop();
        this.progressPanel.stop();
        this.lcdPanel.showCountdownText(0);
        this._endTimer.loop();
    }

    private hide(): void {

        this._background.visible = false;
        this._panels.forEach(panel => {
            panel.visible = false;
        });
        this.progressPanel.visible = false;
        this.lcdPanel.visible = false;
    }
};