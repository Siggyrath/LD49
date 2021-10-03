import * as PIXI from 'pixi.js';

export abstract class Scene {

    public container: PIXI.Container;

    public constructor() {
        this.container = new PIXI.Container();
    }

    public abstract onStart(): void;

    public abstract onEnd(): void;

    public abstract onTick(delta: number): void;
};