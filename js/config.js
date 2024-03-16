class Config {
    constructor() {
        this.righe = 7;
        this.colonne = 6;
        this.i_wild = 0; // indice del wild
        this.i_scatter = 0; // indice dello scatter
        // this.emoji = [
        //     '💲',
        //     '🛸',
        //     '👽',
        //     '🛰️',
        //     '🚀',
        //     '📡',
        //     '🌍'
        // ];
        this.emoji = [
            '<img src="./img/panda.png"></img>', // 0 - wild e scatter
            '<img src="./img/katana.png"></img>', // 1
            '<img src="./img/bonsai.png"></img>', // 2
            '<img src="./img/torii.png"></img>', // 3
            '<img src="./img/sushi.png"></img>', // 4
            '<img src="./img/bamboo.png"></img>', // 5
            '<img src="./img/card_a.png"></img>', // 6
            '<img src="./img/card_k.png"></img>', // 7
            '<img src="./img/card_q.png"></img>', // 8
            '<img src="./img/card_j.png"></img>', // 9
            '<img src="./img/card_10.png"></img>', // 10
            '<img src="./img/card_9.png"></img>', // 11
        ];
        this.n_emoji = this.emoji.length;
        this.max_random_number = 10000;
        this.rarita = [
            10, // 0
            15, // 1
            18, // 2
            21, // 3
            24, // 4
            27, // 5
            35, // 6
            37, // 7
            39, // 8
            42, // 9
            42, // 10
            42, // 11
        ];
        this.moltiplicatori = [
            [0], // 0
            [0.5, 1.0, 1.5, 2.5, 5], // 1
            [0.5, 1.0, 1.8, 3.0], // 2
            [0.5, 0.9, 1.6, 2.5], // 3
            [0.5, 0.8, 1.4, 2.2], // 4
            [0.5, 0.7, 1.2, 2.0], // 5
            [0.3, 0.5, 0.8, 1.3], // 6
            [0.3, 0.5, 0.7, 1.2], // 7
            [0.3, 0.5, 0.7, 1.1], // 8
            [0.2, 0.4, 0.6, 1.0], // 9
            [0.2, 0.4, 0.6, 1.0], // 10
            [0.2, 0.4, 0.6, 1.0], // 11
        ]
    }
}

const config = new Config();