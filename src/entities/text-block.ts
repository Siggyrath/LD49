import * as PIXI from 'pixi.js';

import { Assets } from '../assets';

export class TextBlock extends PIXI.Container {

    private _texts: Array<PIXI.Text> = [];

    public constructor(lines: Array<string>, isError: boolean = false) {

        super();

        lines.forEach((line, index) => {
            let text = new PIXI.Text(line, isError ? Assets.UI.FontRed : Assets.UI.FontLight);
            text.position.set(0, index * 18);
            this._texts.push(text);
            this.addChild(text);
        });
    }
};