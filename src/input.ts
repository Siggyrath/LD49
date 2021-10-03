import { InputState, InputManager } from './base/input-manager';

export class Input extends InputManager {

    public static Buttons: any = {
        A: InputState,
        S: InputState,
        D: InputState,
        W: InputState,
        Q: InputState,
        E: InputState,
        J: InputState,
        L: InputState,
        K: InputState,
        Y: InputState
    };

    public configure(): void {

        Input.Buttons.A = this.addKeyMapping().map('a');
        Input.Buttons.S = this.addKeyMapping().map('s');
        Input.Buttons.D = this.addKeyMapping().map('d');
        Input.Buttons.W = this.addKeyMapping().map('w');
        Input.Buttons.Q = this.addKeyMapping().map('q');
        Input.Buttons.E = this.addKeyMapping().map('e');
        Input.Buttons.J = this.addKeyMapping().map('j');
        Input.Buttons.L = this.addKeyMapping().map('l');
        Input.Buttons.K = this.addKeyMapping().map('k');
        Input.Buttons.Y = this.addKeyMapping().map('y');
    }
};