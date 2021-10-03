export class InputState {

    public previousDown: boolean;
    public isDown: boolean;
    public isPressed: boolean;
    public isReleased: boolean;

    public nextFrame(): void {        
        this.previousDown = this.isDown;
        this.isDown = false;
    }

    public update(): void {
        this.isPressed = this.isDown && !this.previousDown;
        this.isReleased = !this.isDown && this.previousDown;
    }
};

export class KeyMapping extends InputState {

    public key: string;

    public map(key: string): KeyMapping {

        this.key = key;

        return this;
    }
};

export abstract class InputManager {

    public static MouseX: number;
    public static MouseY: number;

    private _keyMappings: Array<KeyMapping> = [];
    private _downKeys: Array<string> = [];

    public abstract configure(): void;

    public constructor() {

        document.addEventListener('keydown', this.onKeyDown.bind(this), false);
        document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    }

    protected addKeyMapping(): KeyMapping {

        let keyMapping = new KeyMapping();
        this._keyMappings.push(keyMapping);

        return keyMapping;
    }

    public update(): void {
        
        this._keyMappings.forEach(keyMapping => {            
            keyMapping.nextFrame();            
            keyMapping.isDown = (this._downKeys.indexOf(keyMapping.key) > -1);
            keyMapping.update();
        });
    }

    private onKeyDown(e: KeyboardEvent): void {

        if (this._downKeys.indexOf(e.key) === -1) {
            this._downKeys.push(e.key);
        }        
    }

    private onKeyUp(e: KeyboardEvent): void {
        
        let index = this._downKeys.indexOf(e.key);
        if (index > -1) {
            this._downKeys = this._downKeys.filter(item => item !== e.key);
        }
    }
};