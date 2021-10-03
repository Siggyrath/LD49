import * as PIXI from 'pixi.js';

import { Assets } from '../assets';

export class CreditsPanel extends PIXI.Container {

    private _texts: Array<PIXI.Text> = [];
    private _avatar: PIXI.Sprite;

    public constructor() {

        super();

        this._texts.push(new PIXI.Text('Thank you for playing "Sequence: "UNSTABLE"', Assets.UI.FontLarge));
        this._texts.push(new PIXI.Text('A game made for Ludum Dare 49 by', Assets.UI.FontLarge));
        this._texts.push(new PIXI.Text('Sigrath', Assets.UI.FontLarge));

        this._texts[0].position.set(100, 200);
        this._texts[1].position.set(170, 240);
        this._texts[2].position.set(405, 480);

        this._texts.forEach(text => {
            this.addChild(text);
        });

        this._avatar = new PIXI.Sprite(Assets.Sprites.Avatar);
        this._avatar.position.set(385, 290);
        this.addChild(this._avatar);
    }
};