class Config {
    constructor() {
        this.version = '1.2.0';
        this.righe = 7;
        this.colonne = 6;
        this.i_wild = 0; // indice del wild
        this.i_scatter = 0; // indice dello scatter
        this.default_wallet = 5000;
        this.moltiplicatore_acquista_bonus = 150;
        this.emoji = [
            '<img src="./img/panda.png"></img>', // 0 - wild e scatter
            '<img src="./img/katana.png"></img>', // 1
            '<img src="./img/lanterna.png"></img>', // 2
            '<img src="./img/ventaglio.png"></img>', // 3
            '<img src="./img/sushi.png"></img>', // 4
            '<img src="./img/bamboo.png"></img>', // 5
            '<img src="./img/card_a.png"></img>', // 6
            '<img src="./img/card_k.png"></img>', // 7
            '<img src="./img/card_q.png"></img>', // 8
            '<img src="./img/card_j.png"></img>', // 9
            '<img src="./img/card_10.png"></img>', // 10
            '<img src="./img/card_9.png"></img>', // 11
        ];
        this.nomi_emoji = [
            'Panda',
            'Katana',
            'Lanterna',
            'Ventaglio',
            'Sushi',
            'Bamboo',
            'A',
            'K',
            'Q',
            'J',
            '10',
            '9',
        ]
        this.n_emoji = this.emoji.length;
        this.max_random_number = 10000;
        this.rarita = [
            1.75, // 0
            7, // 1
            8.5, // 2
            10, // 3
            11.5, // 4
            13, // 5
            14.5, // 6
            15, // 7
            15.5, // 8
            16, // 9
            16, // 10
            16, // 11
        ];
        this.moltiplicatori = [
            [5.0], // 0
            [0.5, 1.0, 1.5, 2.5, 5.0], // 1
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

/**

3 Capricciose
Olive
Salamino
Prosciutto e Funghi

 */