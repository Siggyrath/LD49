import * as PIXI from 'pixi.js';

import { TextBlock } from './text-block';

export class LCDPanel extends PIXI.Container {

    private _startText: TextBlock;
    private _panelTexts: Array<TextBlock> = [];
    private _continueText: TextBlock;
    private _errorTexts: Array<TextBlock> = [];
    private _endText: TextBlock;
    private _countdownTexts: Array<TextBlock> = [];

    public constructor() {

        super();

        this._startText = new TextBlock([
            'Ready to initiate',
            '"UNSTABLE" sequence.',
            '',
            'Press <Y> to',
            'begin...'
        ]);
        this.addChild(this._startText);

        this._panelTexts.push(new TextBlock([
            '=====================',
            '2. Input Select',
            '=====================',
            'Rotate the knob to',
            'select active input.',
            '',
            'WARNING: Incorrect',
            'selection will block',
            'unit input.'
        ]));

        this._panelTexts.push(new TextBlock([
            '=====================',
            '1. Key Sequence',
            '=====================',
            'Press the lit keys as',
            'they appear.',
            '',
            'WARNING: Do not let',
            'the sequence expire.'
        ]));

        this._panelTexts.push(new TextBlock([
            '=====================',
            '3. Energy Charge',
            '=====================',
            'Tap the lit keys to',
            'charge the unit.',
            '',
            'WARNING: Overcharge',
            'will block input.'
        ]));

        this._panelTexts.push(new TextBlock([
            '=====================',
            '4. Flux Stabilize',
            '=====================',
            'Hold the button to',
            'stabilize flux.',
            '',
            'WARNING: Do not let',
            'flux exceed safety',
            'parameters.'
        ]));

        this._panelTexts.forEach(text => {
            this.addChild(text);
        });

        this._continueText = new TextBlock([
            'Maintain parameters',
            'to finalize sequence.'
        ]);
        this.addChild(this._continueText);

        this._errorTexts.push(new TextBlock([
            'ERROR!',
            'Key sequence not',
            'entered.',
            '',
            'Press <Y> to try',
            'again.'
        ], true));

        this._errorTexts.push(new TextBlock([
            'ERROR!',
            'Incorrect key',
            'sequence entered.',
            '',
            'Press <Y> to try',
            'again.'
        ], true));

        this._errorTexts.push(new TextBlock([
            'ERROR!',
            'Insufficient',
            'charge.',
            '',
            'Press <Y> to try',
            'again.'
        ], true));

        this._errorTexts.push(new TextBlock([
            'ERROR!',
            'Flux safety',
            'parameters',
            'exceeded.',
            '',
            'Press <Y> to try',
            'again.'
        ], true));

        this._errorTexts.forEach(text => {
            this.addChild(text);
        });

        this._endText = new TextBlock([
            'Sequence succesful.',
            '"UNSTABLE" protocol',
            'activated.',
            '',
            'Detonation in:'
        ]);
        this.addChild(this._endText);

        for (let i = 0; i < 5; i++) {
            let text = new TextBlock([
                (5 - i) + ' seconds'
            ]);
            text.position.set(0, 90);
            this._countdownTexts.push(text);
            this.addChild(text);
        }

        this.hideText();
        this._startText.visible = true;
    }

    private hideText(): void {

        this._startText.visible = false;
        this._panelTexts.forEach(text => {
            text.visible = false;
        });
        this._continueText.visible = false;
        this._errorTexts.forEach(text => {
            text.visible = false;
        });
        this._endText.visible = false;
        this._countdownTexts.forEach(text => {
            text.visible = false;
        });
    }

    public showPanelText(index: number): void {

        this.hideText();
        this._panelTexts[index].visible = true;
    }

    public showContinueText(): void {

        this.hideText();
        this._continueText.visible = true;
    }

    public showErrorText(index: number): void {

        this.hideText();
        this._errorTexts[index].visible = true;
    }

    public showCountdownText(index: number): void {

        this.hideText();
        this._endText.visible = true;
        this._countdownTexts[index].visible = true;
    }
};