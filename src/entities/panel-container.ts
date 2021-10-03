import * as PIXI from 'pixi.js';

import { Assets } from '../assets';

export enum PanelState {
    Closed,
    Opening,
    Raising,
    Open,
    Lowering,
    Closing
}

export abstract class Panel extends PIXI.Container {
    
    public abstract tick(delta: number): void;

    public abstract reset(): void;
}

export class PanelContainer extends PIXI.Container {

    public state: PanelState;

    private _backgroundSprite: PIXI.Sprite;
    private _shutterSprite: PIXI.Sprite;
    private _baseSprite: PIXI.Sprite;
    private _panelContainer: Panel;
    
    public constructor(panelContainer: Panel) {

        super();

        this.state = PanelState.Closed;

        this._backgroundSprite = new PIXI.Sprite(Assets.Sprites.Panels['panels_background']);
        this.addChild(this._backgroundSprite);

        this._baseSprite = new PIXI.Sprite(Assets.Sprites.Panels['panels_base']);
        this._baseSprite.y = 128;
        this.addChild(this._baseSprite);

        this._panelContainer = panelContainer;
        this._panelContainer.y = this._baseSprite.y;
        this.addChild(this._panelContainer);

        this._shutterSprite = new PIXI.Sprite(Assets.Sprites.Panels['panels_shutter']);
        this.addChild(this._shutterSprite);

        let mask = new PIXI.Sprite(PIXI.Texture.WHITE);
        mask.x = this.x;
        mask.y = this.y;
        mask.width = 256;
        mask.height = 256;
        this.addChild(mask);
        this.mask = mask;
    }

    public open() {

        if (this.state !== PanelState.Closed) {
            return;
        }

        this.state = PanelState.Opening;
        this._panelContainer.reset();
    }

    public close() {

        if (this.state !== PanelState.Open) {
            return;
        }

        this.state = PanelState.Lowering;
    }

    public tick(delta: number): void {

        if (this.state === PanelState.Opening) {
            this._shutterSprite.y -= delta * 0.45;
            if (this._shutterSprite.y <= -256) {
                this._shutterSprite.y = -256;
                this.state = PanelState.Raising;
            }
        }
        else if (this.state === PanelState.Raising) {
            this._baseSprite.y -= delta * 0.125;
            if (this._baseSprite.y <= 0) {
                this._baseSprite.y = 0;
                this.state = PanelState.Open;
            }
            this._panelContainer.y = this._baseSprite.y;
        }
        else if (this.state === PanelState.Open) {
            this._panelContainer.tick(delta);
        }
        else if (this.state === PanelState.Lowering) {
            this._baseSprite.y += delta * 0.125;
            if (this._baseSprite.y >= 128) {
                this._baseSprite.y = 128;
                this.state = PanelState.Closing;
            }
            this._panelContainer.y = this._baseSprite.y;
        }
        else if (this.state === PanelState.Closing) {
            this._shutterSprite.y += delta * 0.45;
            if (this._shutterSprite.y >= 0) {
                this._shutterSprite.y = 0;
                this.state = PanelState.Closed;
            }
        }
    }
};