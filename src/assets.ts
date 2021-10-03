import * as PIXI from 'pixi.js';
import sound from 'pixi-sound';

import { AssetManager } from './base/asset-manager';

const RESOURCES = {
    SPRITES: [
        { name: 'spriteLevel', url: 'assets/sprites/level.png' },
        { name: 'spritePanels', url: 'assets/sprites/panels.json' },
        { name: 'spriteButtons', url: 'assets/sprites/buttons.json' },
        { name: 'spriteAvatar', url: 'assets/sprites/avatar.png' },
    ],
    MUSIC: [
        { name: 'musicMain', url: 'assets/music/kevin-macleod-hall-of-the-mountain-king.ogg' },
    ],
    AUDIO: [
        { name: 'audioPanelOpen', url: 'assets/audio/panel_open.wav' },
        { name: 'audioExplosion', url: 'assets/audio/explosion.wav' },
    ]
};

export class Assets extends AssetManager {

    public static Sprites: any = {
        Level: PIXI.Texture,
        Panels: Array<PIXI.Texture>(),
        Buttons: Array<PIXI.Texture>(),
        Avatar: PIXI.Texture,
    };

    public static Music: any = {
        Main: sound.Sound
    };

    public static Audio: any = {
        PanelOpen: sound.Sound,
        Explosion: sound.Sound
    };

    public static UI: any = {
        FontDark: PIXI.TextStyle,
        FontLight: PIXI.TextStyle,
        FontRed: PIXI.TextStyle,
        FontLarge: PIXI.TextStyle
    };

    public onAdd(app: PIXI.Application): void {
        this.addResources(app, RESOURCES.SPRITES);
        this.addResources(app, RESOURCES.MUSIC);
        this.addResources(app, RESOURCES.AUDIO);
    }

    public onLoaded(app: PIXI.Application, resources: Partial<Record<string, PIXI.LoaderResource>>): void {        
        
        Assets.Sprites.Level = resources['spriteLevel'].texture;
        Assets.Sprites.Panels = resources['spritePanels'].textures;
        Assets.Sprites.Buttons = resources['spriteButtons'].textures;
        Assets.Sprites.Avatar = resources['spriteAvatar'].texture;
        Assets.Music.Main = resources['musicMain'].sound;
        Assets.Audio.PanelOpen = resources['audioPanelOpen'].sound;
        Assets.Audio.Explosion = resources['audioExplosion'].sound;

        Assets.UI.FontDark = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 24,
            fontWeight: 'bold',
            fill: '#222'
        });
        Assets.UI.FontLight = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 16,
            fill: '#eee'
        });
        Assets.UI.FontRed = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 16,
            fill: '#ff0000'
        });
        Assets.UI.FontLarge = new PIXI.TextStyle({
            fontFamily: 'Courier',
            fontSize: 32,
            fill: '#eee'
        });

        Assets.Music.Main.volume = 0.3;
        Assets.Audio.PanelOpen.volume = 0.3;
        Assets.Audio.Explosion.volume = 0.3;
    }
};