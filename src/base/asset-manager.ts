import * as PIXI from 'pixi.js';

export interface Resource {
    name: string,
    url: string
};

export abstract class AssetManager {

    public init(app: PIXI.Application, callback: () => void): void {

        this.onAdd(app);

        app.loader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {            
            this.onLoaded(app, resources);
            callback();
        });
    }

    public abstract onAdd(app: PIXI.Application): void;

    public abstract onLoaded(app: PIXI.Application, resources: Partial<Record<string, PIXI.LoaderResource>>): void;

    protected addResources(app: PIXI.Application, resources: Array<Resource>): void {

        resources.forEach((value: Resource) => {
            app.loader.add(value.name, value.url);
        });
    }
};