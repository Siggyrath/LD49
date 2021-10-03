import { Engine } from './base/engine';
import { Assets } from './assets';
import { Input } from './input';
import { MainScene } from './scenes/main-scene';

const engine = new Engine(1024, 768);

engine
    .setAssets(new Assets())
    .setInput(new Input())
    .loadScene(new MainScene())
    .run();