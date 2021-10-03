export enum Difficulty {
    Easy,
    Medium,
    Hard
};

export class Game {

    public static Difficulty: Difficulty = Difficulty.Easy;
    public static IsGameOver: boolean = false;
    public static IsWon: boolean = false;
    public static ErrorMessage: number;
};