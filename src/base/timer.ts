export class Timer {

    private _time: number;
    private _elapsed: number;
    private _isLooped: boolean;
    private _callback: () => void;

    public isRunning: boolean;

    public constructor(time: number, callback: () => void = null) {
        this._time = time;
        this._callback = callback;
    }

    public setTime(time: number): void {        
        this._time = time;
    }

    public start(): void {
        this.isRunning = true;
        this._isLooped = false;
        this._elapsed = this._time;
    }

    public loop(): void {
        this.isRunning = true;
        this._isLooped = true;
        this._elapsed = this._time;
    }

    public stop(): void {
        this.isRunning = false;
        this._isLooped = false;
    }

    public resume(): void {
        this.isRunning = true;
    }

    public tick(delta: number): void {

        if (!this.isRunning) {
            return;
        }

        this._elapsed -= delta;
        if (this._elapsed > 0) {
            return;
        }

        if (this._callback) {
            this._callback();
        }

        if (!this._isLooped) {
            this.isRunning = false;
            return;
        }

        this._elapsed = this._time;
    }
};